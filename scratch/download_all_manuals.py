import urllib.request
import os
import sys
import urllib.parse

output_dir = r"c:\Users\Notebook4-OIMPA\Desktop\Adicionales Santa Fe\Material_de_Ascenso_ISEP"
os.makedirs(output_dir, exist_ok=True)

# List of files for 2026 Concurso de Ascenso
files_2026 = [
    {
        "name": "01 - Oficial de Policia - Escalafon General.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285226/1473331/file/1%20-%20Concursan%20para%20Oficial%20de%20Polic%C3%ADa%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "02 - Oficial de Policia - Escalafon Profesional, Tecnico y Servicios.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285227/1473334/file/2%20-%20Concursan%20para%20Oficial%20de%20Polic%C3%ADa%20-%20Escalaf%C3%B3n%20Profesional,%20T%C3%A9cnico%20y%20Servicios.pdf"
    },
    {
        "name": "03 - Subinspector - Escalafon General.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285241/1473376/file/3%20-%20Concursan%20para%20Subinspector%20-%20Escalaf%C3%B3n%20General_compressed.pdf"
    },
    {
        "name": "04 - Subinspector - Escalafon Profesional, Tecnico y Servicios.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285228/1473337/file/4%20-%20Concursan%20para%20Subinspector%20-%20Escalaf%C3%B3n%20Profesional,%20T%C3%A9cnico%20y%20Servicios.pdf"
    },
    {
        "name": "05 - Inspector - Escalafon General.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285242/1473379/file/5%20-%20Concursan%20para%20Inspector%20-%20Escalaf%C3%B3n%20General_compressed.pdf"
    },
    {
        "name": "06 - Inspector - Escalafon Profesional, Tecnico y Servicios.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285229/1473340/file/6%20-%20Concursan%20para%20Inspector%20-%20Escalaf%C3%B3n%20Profesional,%20T%C3%A9cnico%20y%20Servicios.pdf"
    },
    {
        "name": "07 - Subcomisario - Escalafon General.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285230/1473343/file/7-%20Concursan%20para%20Subcomisario%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "08 - Subcomisario - Escalafon Profesional y Tecnico.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285231/1473346/file/8%20-%20Concursan%20para%20Subcomisario%20-%20Escalaf%C3%B3n%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "09 - Comisario - Escalafon General.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285232/1473349/file/9%20-%20Concursan%20para%20Comisario%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "10 - Comisario - Escalafon Profesional y Tecnico.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285233/1473352/file/10%20-%20Concursan%20para%20Comisario%20-%20Escalaf%C3%B3n%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "11 - Comisario Supervisor - Escalafon General.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285234/1473355/file/11%20-%20Concursan%20para%20Comisario%20Supervisor%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "12 - Comisario Supervisor - Escalafon Profesional y Tecnico.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285235/1473358/file/12-%20Concursan%20para%20Comisario%20Supervisor%20-%20Escalaf%C3%B3n%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "13 - Subdirector de Policia - Escalafon General.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285236/1473361/file/13%20-%20Concursan%20para%20Subdirector%20de%20Polic%C3%ADa%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "14 - Subdirector de Policia - Escalafon Profesional y Tecnico.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285237/1473364/file/14%20-%20Concursan%20para%20Subdirector%20de%20Polic%C3%ADa%20-%20Escalaf%C3%B3n%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "15 - Director de Policia - Escalafones General, Profesional y Tecnico.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285238/1473367/file/15%20-%20Concursan%20para%20Director%20de%20Polic%C3%ADa%20-%20Escalafones%20General,%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "16 - Concursan para todos los Grados y Escalafones.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285239/1473370/file/16%20-%20Concursan%20para%20todos%20los%20Grados%20y%20Escalafones.pdf"
    },
    {
        "name": "Bibliografía Orientativa para Elaboracion de Proyectos.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285240/1473373/file/Bibliograf%C3%ADa%20orientativa%20para%20la%20elaboraci%C3%B3n%20de%20proyectos.pdf"
    },
    {
        "name": "Guia Elaboracion Proyectos - Agrupamiento Direccion 2026.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285243/1473382/file/Gu%C3%ADa%20para%20la%20Elaboraci%C3%B3n%20y%20Presentaci%C3%B3n%20de%20Proyectos%20%EF%BF%BD%20Concurso%20de%20Ascenso%202026%20%EF%BF%BD%20Agrupamiento%20Direcci%C3%B3n.pdf"
    },
    {
        "name": "Guia Elaboracion Proyectos - Agrupamiento Supervision 2026.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/285244/1473385/file/Gu%C3%ADa%20para%20la%20Elaboraci%C3%B3n%20y%20Presentaci%C3%B3n%20de%20Proyectos%20%EF%BF%BD%20Concurso%20de%20Ascenso%202026%20%EF%BF%BD%20Agrupamiento%20Supervisi%C3%B3n.pdf"
    }
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def download_file(item):
    filename = item["name"]
    url = item["url"]
    dest_path = os.path.join(output_dir, filename)
    
    print(f"Downloading: {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(dest_path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
            size_mb = len(data) / (1024 * 1024)
            print(f"  SUCCESS: {filename} ({size_mb:.2f} MB)")
            return True
    except Exception as e:
        print(f"  FAILED: {filename} - {e}")
        return False

if __name__ == "__main__":
    print(f"Starting download of {len(files_2026)} manuals into: {output_dir}\n")
    success_count = 0
    for item in files_2026:
        if download_file(item):
            success_count += 1
    print(f"\nCompleted {success_count}/{len(files_2026)} downloads.")
