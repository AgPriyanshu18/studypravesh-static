import csv
import re
import sys

def parse_sql_dump(file_path, output_csv):
    """
    Streams a large Magento EAV SQL dump and extracts product entities and attributes.
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
                                
    # Write to CSV
    with open(output_csv, 'w', newline='', encoding='utf-8') as out_f:
        writer = csv.DictWriter(out_f, fieldnames=['entity_id', 'name', 'location', 'type'])
        writer.writeheader()
        for eid, data in institutes.items():
            writer.writerow({
                'entity_id': eid,
                'name': data.get('name', ''),
                'location': data.get('location', ''),
                'type': 'Institute'
            })
            
    print(f"Extraction complete. Saved to {output_csv}")

if __name__ == "__main__":
    parse_sql_dump('u879953308_studypravesh.sql', 'institutes.csv')
