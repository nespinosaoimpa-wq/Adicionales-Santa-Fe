import urllib.request
import os
import shutil

root_dir = r"c:\Users\Notebook4-OIMPA\Desktop\Adicionales Santa Fe"
output_dir = os.path.join(root_dir, "Material_de_Ascenso_ISEP", "Normativa_General")
os.makedirs(output_dir, exist_ok=True)

# 1. Download official PDFs from Government of Santa Fe SIN using getFile.php
normativa_files = [
    {
        "name": "Ley 12521 - Ley del Personal Policial de Santa Fe.pdf",
        "url": "https://www.santafe.gob.ar/normativa/index.php/busqueda/pdf/L1252106042006.pdf"
    },
    {
        "name": "Decreto 0461-15 - Regimen Disciplinario Policial.pdf",
        "url": "https://www.santafe.gob.ar/normativa/getFile.php?id=1652373&item=339434&cod=0ed1df5bf3ba6978f6caf9219ecd4a4f"
    }
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for item in normativa_files:
    dest = os.path.join(output_dir, item["name"])
    print(f"Downloading {item['name']}...")
    try:
        req = urllib.request.Request(item["url"], headers=headers)
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            data = resp.read()
            f.write(data)
            print(f"Downloaded {len(data)} bytes.")
    except Exception as e:
        print(f"Failed {item['name']}: {e}")

# 2. Copy local files from root into Normativa_General folder
local_copies = [
    {
        "src": os.path.join(root_dir, "2012MIRAF.pdf"),
        "dest_name": "Manual MIRAF - Armamento y Tiro Policial.pdf"
    },
    {
        "src": os.path.join(root_dir, "Ley 14283.pdf"),
        "dest_name": "Ley 14283 - Reforma Previsional y Emergencia.pdf"
    },
    {
        "src": os.path.join(root_dir, "DEC-2026-00000411-APPSF-PE (1).pdf"),
        "dest_name": "Decreto 0411-26 - Aumento Salarial y Escala 2026.pdf"
    }
]

for item in local_copies:
    dest = os.path.join(output_dir, item["dest_name"])
    if os.path.exists(item["src"]):
        print(f"Copying {item['src']} to {dest}...")
        try:
            shutil.copy2(item["src"], dest)
            print("Copied successfully.")
        except Exception as e:
            print(f"Failed copying: {e}")
    else:
        print(f"Source file {item['src']} does not exist.")

print("\n--- NORMATIVA GENERAL UPDATED SUCCESSFULLY ---")
