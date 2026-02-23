import pandas as pd
import re
import json

def extract_advanced_police_data(file_path):
    df = pd.read_excel(file_path, sheet_name='Policia', header=None)
    results = []
    current_dept = "General"
    
    for _, row in df.iterrows():
        # Clean row: get strings
        vals = [str(v).strip() for v in row if pd.notnull(v) and str(v).strip() != '']
        if not vals: continue
        
        row_str = ' '.join(vals)
        
        # Check if it's a Department Header (usually all caps, no numbers, short)
        if len(vals) == 1 and vals[0].isupper() and not re.search(r'\d', vals[0]):
            current_dept = vals[0]
            continue
            
        # Look for anything that could be a phone number (4 to 12 digits)
        # We also look for decimal area codes like 342.0
        phone_candidates = []
        area_code = ""
        
        for v in vals:
            # Detect area code (usually 3 or 4 digits, sometimes with .0)
            if re.match(r'^(0?\d{3,5})(\.0)?$', v):
                # Possible area code
                code = re.match(r'^(0?\d{3,5})(\.0)?$', v).group(1)
                if 3 <= len(code) <= 5:
                    area_code = code
            
            # Detect phone parts (6 to 9 digits)
            nums = re.findall(r'\b\d{6,9}\b', v.replace('-', '').replace('(', '').replace(')', ''))
            phone_candidates.extend(nums)
        
        if phone_candidates:
            # Find name
            name_parts = [v for v in vals if re.search('[a-zA-Z]', v) and len(v) > 2 and not v.endswith('.0')]
            name = ' '.join(name_parts)
            
            phones = []
            for p in phone_candidates:
                full_phone = p
                if area_code and not p.startswith(area_code):
                    # Combine area code and phone
                    full_phone = f"{area_code}{p}"
                phones.append(full_phone)
            
            results.append({
                "name": f"[{current_dept}] {name}".strip(),
                "phones": list(set(phones)),
                "icon": "shield"
            })
            
    return results

data = extract_advanced_police_data('d:/Nico/Adicionales-Santa-Fe/telefonos dependencias policiales.xls')
js_content = f"const policeDirectory = {json.dumps(data, indent=2, ensure_ascii=False)};\n\nwindow.policeDirectory = policeDirectory;"

with open('app/js/data/directory.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Extraction successful: {len(data)} entries found across all departments.")
