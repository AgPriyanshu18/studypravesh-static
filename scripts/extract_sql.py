import csv

def parse_sql_dump(file_path, output_csv):
    print(f"Starting extraction from {file_path}")
    institutes = {}
    options = {}
    
    def get_tuples(file_obj, target_table):
        inside_insert = False
        buffer = ""
        for line in file_obj:
            if line.startswith('INSERT INTO `' + target_table + '`'):
                inside_insert = True
                continue
                
            if inside_insert:
                buffer += line
                # Check if the line ends a tuple
                if line.strip().endswith('),') or line.strip().endswith(');'):
                    clean = buffer.strip()
                    if clean.startswith('('):
                        # remove ( and ), or );
                        clean = clean[1:-2]
                        # Use csv reader to correctly parse quotes and commas
                        reader = csv.reader([clean], quotechar="'", escapechar='\\', doublequote=False)
                        try:
                            yield next(reader)
                        except Exception as e:
                            pass
                    buffer = ""
                    if line.strip().endswith(');'):
                        inside_insert = False
                        
    # Pass 1: Load options
    print("Pass 1: Loading attribute options...")
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        for fields in get_tuples(f, 'sp_eav_attribute_option_value'):
            if len(fields) >= 4:
                options[fields[1].strip()] = fields[3].strip()

    # Pass 2: Extract data
    tables = ['sp_catalog_product_entity_varchar', 'sp_catalog_product_entity_text', 'sp_catalog_product_entity_int']
    for table in tables:
        print(f"Pass 2: Extracting {table}...")
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            for fields in get_tuples(f, table):
                if len(fields) >= 6:
                    attr_id = fields[2].strip()
                    entity_id = fields[4].strip()
                    val = fields[5].strip()
                    
                    if entity_id not in institutes:
                        institutes[entity_id] = {}
                        
                    if attr_id == '71': institutes[entity_id]['name'] = val
                    elif attr_id == '85': institutes[entity_id]['image'] = val
                    elif attr_id == '97': institutes[entity_id]['url_key'] = val
                    elif attr_id == '134': institutes[entity_id]['locality'] = val
                    elif attr_id == '143': 
                        c_ids = val.split(',')
                        institutes[entity_id]['courses'] = ", ".join([options.get(c.strip(), c.strip()) for c in c_ids])
                    elif attr_id == '72': institutes[entity_id]['description'] = val
                    elif attr_id == '73': institutes[entity_id]['address'] = val
                    elif attr_id == '141': institutes[entity_id]['faculties'] = val
                    elif attr_id == '142': institutes[entity_id]['fee_structure'] = val
                    elif attr_id == '144': institutes[entity_id]['results'] = val
                    elif attr_id == '132': institutes[entity_id]['state'] = options.get(val, val)
                    elif attr_id == '133': institutes[entity_id]['city'] = options.get(val, val)

    # Write to CSV
    print(f"Writing to CSV... Found {len(institutes)} entities.")
    fieldnames = [
        'id', 'name', 'url_key', 'category', 'image_url', 'address', 
        'locality', 'city', 'state', 'courses', 'faculties', 
        'fee_structure', 'results', 'description'
    ]
    
    count = 0
    with open(output_csv, 'w', newline='', encoding='utf-8') as out_f:
        writer = csv.DictWriter(out_f, fieldnames=fieldnames)
        writer.writeheader()
        for eid, data in institutes.items():
            if data.get('name'):
                count += 1
                img = data.get('image', '')
                if img and img != 'no_selection':
                    img = f"https://studypravesh.com/media/catalog/product{img}"
                else:
                    img = ''
                
                writer.writerow({
                    'id': eid,
                    'name': data.get('name', ''),
                    'url_key': data.get('url_key', data.get('name', '').lower().replace(' ', '-')),
                    'category': 'School',
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
            
    print(f"Extraction complete. Saved {count} records to {output_csv}")

if __name__ == "__main__":
    parse_sql_dump('u879953308_studypravesh.sql', 'institutes.csv')