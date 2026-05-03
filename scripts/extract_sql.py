import csv
import re
import sys

def parse_sql_dump(file_path, output_csv):
    """
    Streams a large Magento EAV SQL dump and extracts product entities and attributes.
    Includes new mappings for SEO url_key, description, short_description, and telephone.
    """
    print(f"Starting extraction from {file_path}")
    
    institutes = {}
    
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            if "INSERT INTO `sp_catalog_product_entity_varchar`" in line:
                parts = line.split("VALUES")
                if len(parts) > 1:
                    values_str = parts[1].strip().strip(';').strip('(').strip(')')
                    records = values_str.split("),(")
                    for rec in records:
                        fields = [x.strip().strip("'") for x in rec.split(",")]
                        if len(fields) >= 6:
                            attr_id = fields[2]
                            entity_id = fields[4]
                            val = fields[5]
                            
                            if entity_id not in institutes:
                                institutes[entity_id] = {}
                                
                            if attr_id == '71': # Name
                                institutes[entity_id]['name'] = val
                            elif attr_id == '134': # City/Location
                                institutes[entity_id]['location'] = val
                            elif attr_id == '97': # url_key (typical magento)
                                institutes[entity_id]['url_key'] = val
            
            elif "INSERT INTO `sp_catalog_product_entity_text`" in line:
                parts = line.split("VALUES")
                if len(parts) > 1:
                    values_str = parts[1].strip().strip(';').strip('(').strip(')')
                    records = values_str.split("),(")
                    for rec in records:
                        fields = [x.strip().strip("'") for x in rec.split(",")]
                        if len(fields) >= 6:
                            attr_id = fields[2]
                            entity_id = fields[4]
                            val = fields[5]
                            
                            if entity_id not in institutes:
                                institutes[entity_id] = {}
                                
                            if attr_id == '72': # description
                                institutes[entity_id]['description'] = val
                            elif attr_id == '73': # short_description
                                institutes[entity_id]['short_description'] = val

    # Write to CSV
    with open(output_csv, 'w', newline='', encoding='utf-8') as out_f:
        fieldnames = ['id', 'name', 'url_key', 'category', 'location', 'image_url', 'short_description', 'description', 'telephone']
        writer = csv.DictWriter(out_f, fieldnames=fieldnames)
        writer.writeheader()
        for eid, data in institutes.items():
            if data.get('name'):
                writer.writerow({
                    'id': eid,
                    'name': data.get('name', ''),
                    'url_key': data.get('url_key', data.get('name', '').lower().replace(' ', '-')),
                    'category': data.get('category', 'School'), # Mock category
                    'location': data.get('location', ''),
                    'image_url': '',
                    'short_description': data.get('short_description', ''),
                    'description': data.get('description', ''),
                    'telephone': data.get('telephone', '')
                })
            
    print(f"Extraction complete. Saved to {output_csv}")

if __name__ == "__main__":
    parse_sql_dump('u879953308_studypravesh.sql', 'institutes.csv')
