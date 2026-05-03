import csv

def parse_sql_dump(file_path, output_csv):
    print(f"Starting extraction from {file_path}")
    
    institutes = {}
    options = {} # For mapping INT to string (City/State/Courses)
    
    # Pass 1: Load options
    print("Pass 1: Loading attribute options...")
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            if "INSERT INTO `sp_eav_attribute_option_value`" in line:
                parts = line.split("VALUES")
                if len(parts) > 1:
                    values_str = parts[1].strip().strip(';').strip('(').strip(')')
                    records = values_str.split("),(")
                    for rec in records:
                        fields = [x.strip().strip("'") for x in rec.split(",")]
                        if len(fields) >= 4:
                            option_id = fields[1]
                            value = fields[3]
                            options[option_id] = value

    # Pass 2: Extract data
    print("Pass 2: Extracting EAV data...")
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            # VARCHAR parsing (Name, Image, URL Key, Locality, Courses)
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
                                
                            if attr_id == '71': institutes[entity_id]['name'] = val
                            elif attr_id == '85': institutes[entity_id]['image'] = val
                            elif attr_id == '97': institutes[entity_id]['url_key'] = val
                            elif attr_id == '134': institutes[entity_id]['locality'] = val
                            elif attr_id == '143': 
                                # Courses are comma separated option IDs
                                c_ids = val.split(',')
                                institutes[entity_id]['courses'] = ", ".join([options.get(c, c) for c in c_ids])
            
            # TEXT parsing (Description, Address, Faculties, Fee Structure, Results)
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
                                
                            if attr_id == '72': institutes[entity_id]['description'] = val
                            elif attr_id == '73': institutes[entity_id]['address'] = val # Labeled short_description but is address
                            elif attr_id == '141': institutes[entity_id]['faculties'] = val
                            elif attr_id == '142': institutes[entity_id]['fee_structure'] = val
                            elif attr_id == '144': institutes[entity_id]['results'] = val

            # INT parsing (State, City)
            elif "INSERT INTO `sp_catalog_product_entity_int`" in line:
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
                                
                            if attr_id == '132': institutes[entity_id]['state'] = options.get(val, val)
                            elif attr_id == '133': institutes[entity_id]['city'] = options.get(val, val)

    # Write to CSV
    print("Writing to CSV...")
    fieldnames = [
        'id', 'name', 'url_key', 'category', 'image_url', 'address', 
        'locality', 'city', 'state', 'courses', 'faculties', 
        'fee_structure', 'results', 'description'
    ]
    with open(output_csv, 'w', newline='', encoding='utf-8') as out_f:
        writer = csv.DictWriter(out_f, fieldnames=fieldnames)
        writer.writeheader()
        for eid, data in institutes.items():
            if data.get('name'):
                
                # Format location for frontend
                loc = f"{data.get('city', '')}, {data.get('state', '')}".strip(', ')
                
                # Format image URL
                img = data.get('image', '')
                if img and img != 'no_selection':
                    img = f"https://studypravesh.com/media/catalog/product{img}"
                else:
                    img = ''
                
                writer.writerow({
                    'id': eid,
                    'name': data.get('name', ''),
                    'url_key': data.get('url_key', data.get('name', '').lower().replace(' ', '-')),
                    'category': 'Institute', # Can add logic here based on ID or attribute sets later
                    'image_url': img,
                    'address': data.get('address', ''),
                    'locality': data.get('locality', ''),
                    'city': data.get('city', ''),
                    'state': data.get('state', ''),
                    'courses': data.get('courses', ''),
                    'faculties': data.get('faculties', ''),
                    'fee_structure': data.get('fee_structure', ''),
                    'results': data.get('results', ''),
                    'description': data.get('description', '')
                })
            
    print(f"Extraction complete. Saved to {output_csv}")

if __name__ == "__main__":
    parse_sql_dump('u879953308_studypravesh.sql', 'institutes.csv')