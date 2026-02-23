import pandas as pd
import re
import json

def extract_v3(file_path):
    df = pd.read_excel(file_path, sheet_name='Policia', header=None)
    results = []
    
    # 1. ESSENTIAL NUMBERS (Manual set based on user needs and common knowledge)
    essential_keywords = ['911', 'CUERPO MEDICO', 'ASESORIA LETRADA', 'BIENESTAR', 'D-1', 'D-2', 'D-3', 'D-5', 'JEFE']
    
    current_dept = "GENERAL"
    
    for _, row in df.iterrows():
        vals = [str(v).strip() for v in row if pd.notnull(v) and str(v).strip() != '']
        if not vals: continue
        
        row_str = ' '.join(vals)
        
        # Detect Department Headers (usually single cell, uppercase, no digits)
        if len(vals) == 1 and vals[0].isupper() and not re.search(r'\d', vals[0]) and len(vals[0]) > 3:
            current_dept = vals[0]
            continue

        # Extract area codes and phones
        phone_candidates = []
        area_code = ""
        for v in vals:
            if re.match(r'^(0?\d{3,5})(\.0)?$', v):
                area_code = re.match(r'^(0?\d{3,5})(\.0)?$', v).group(1)
            nums = re.findall(r'\b\d{6,9}\b', v.replace('-', '').replace('(', '').replace(')', ''))
            phone_candidates.extend(nums)
            
        if phone_candidates:
            # Clean name
            name_parts = [v for v in vals if re.search('[a-zA-Z]', v) and len(v) > 2 and not v.endswith('.0') and v != current_dept]
            name = ' '.join(name_parts)
            
            phones = []
            for p in phone_candidates:
                full_phone = p
                if area_code and not p.startswith(area_code):
                    full_phone = f"{area_code}{p}"
                phones.append(full_phone)
            
            is_essential = any(k in name.upper() for k in essential_keywords) or any(k in current_dept.upper() for k in essential_keywords)
            
            results.append({
                "name": name.strip(),
                "dept": current_dept,
                "phones": list(set(phones)),
                "is_essential": is_essential,
                "icon": "verified_user" if is_essential else "shield"
            })
            
    return results

data = extract_v3('d:/Nico/Adicionales-Santa-Fe/telefonos dependencias policiales.xls')
js_content = f"const policeDirectory = {json.dumps(data, indent=2, ensure_ascii=False)};\n\nwindow.policeDirectory = policeDirectory;"

with open('app/js/data/directory.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Extraction V3 successful: {len(data)} entries found. Essentials marked.")
