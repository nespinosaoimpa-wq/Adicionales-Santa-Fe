import pandas as pd
import re
import json

def extract_all_police_data(file_path):
    # Try different sheets or ranges if needed, but 'Policia' seems right
    df = pd.read_excel(file_path, sheet_name='Policia', header=None)
    results = []
    
    for _, row in df.iterrows():
        # Get all non-null values as strings
        vals = [str(v).strip() for v in row if pd.notnull(v) and str(v).strip() != '']
        if not vals:
            continue
            
        row_str = ' '.join(vals)
        
        # Phone regex: 7 to 11 digits, taking into account common SF prefixes
        # 4xxxxxx, 342xxxxxxx, 0342xxxxxxx, 15xxxxxxx
        phone_matches = re.findall(r'\b(?:\d{7,11})\b', row_str.replace('-', '').replace('/', ' ').replace('(', '').replace(')', ''))
        
        # Filter for likely SF/Police phones
        valid_phones = []
        for p in phone_matches:
            # Basic validation for Santa Fe area
            if len(p) >= 7 and (p.startswith('4') or p.startswith('342') or p.startswith('15') or p.startswith('0342') or p.startswith('45')):
                valid_phones.append(p)
        
        if valid_phones:
            # Try to find the name (parts with letters, avoiding purely numeric ones)
            name_candidates = [v for v in vals if re.search('[a-zA-Z]', v) and len(v) > 3]
            name = ' '.join(name_candidates) if name_candidates else row_str
            
            # Clean up name: remove phone numbers from it
            clean_name = name
            for p in valid_phones:
                clean_name = clean_name.replace(p, '')
            
            # If it's still too long or has too many numbers, trim it
            clean_name = clean_name.strip().strip(',').strip('.')
            
            results.append({
                "name": clean_name[:100], # Cap length
                "phones": list(set(valid_phones)),
                "icon": "shield"
            })
            
    return results

data = extract_all_police_data('d:/Nico/Adicionales-Santa-Fe/telefonos dependencias policiales.xls')

# Wrap in JS
js_content = f"const policeDirectory = {json.dumps(data, indent=2, ensure_ascii=False)};\n\nwindow.policeDirectory = policeDirectory;"

with open('app/js/data/directory.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Total contacts written: {len(data)}")
