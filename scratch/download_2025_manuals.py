import urllib.request
import os

output_dir = r"c:\Users\Notebook4-OIMPA\Desktop\Adicionales Santa Fe\Material_de_Ascenso_ISEP\Concurso_2025"
os.makedirs(output_dir, exist_ok=True)

files_2025 = [
    {
        "name": "01 - Oficial de Policia - Escalafon General (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283684/1467232/file/1-%20Concursan%20para%20Oficial%20de%20Polic%C3%ADa%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "02 - Oficial de Policia - Escalafon Profesional, Tecnico y Servicios (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283685/1467235/file/2-%20Concursan%20para%20Oficial%20de%20Polic%C3%ADa%20-%20Escalaf%C3%B3n%20Profesional,%20T%C3%A9cnico%20y%20Servicios.pdf"
    },
    {
        "name": "03 - Subinspector - Escalafon General (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283708/1467312/file/3-%20Concursan%20para%20Subinspector%20-%20Escalaf%C3%B3n%20General_compressed.pdf"
    },
    {
        "name": "04 - Subinspector - Escalafon Profesional, Tecnico y Servicios (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283715/1467333/file/4-%20Concursan%20para%20Subinspector%20-%20Escalaf%C3%B3n%20Profesional,%20T%C3%A9cnico%20y%20Servicios.pdf"
    },
    {
        "name": "05 - Inspector - Escalafon General (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283709/1467315/file/5-%20Concursan%20para%20Inspector%20-%20Escalaf%C3%B3n%20General_compressed.pdf"
    },
    {
        "name": "06 - Inspector - Escalafones Profesional, Tecnico y Servicios (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283689/1467247/file/6-%20Concursan%20para%20Inspector%20-%20Escalafones%20Profesional%20-%20T%C3%A9cnico%20y%20Servicios.pdf"
    },
    {
        "name": "07 - Subcomisario - Escalafon General (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283690/1467250/file/7-%20Concursan%20para%20Subcomisario%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "08 - Subcomisario - Escalafones Profesional y Tecnico (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283691/1467253/file/8-%20Concursan%20para%20Subcomisario%20-%20Escalafones%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "09 - Comisario - Escalafon General (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283692/1467256/file/9-%20Concursan%20para%20Comisario%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "10 - Comisario - Escalafones Profesional y Tecnico (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283693/1467259/file/10-%20Concursan%20para%20Comisario%20-%20Escalafones%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "11 - Comisario Supervisor - Escalafon General (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283694/1467262/file/11-%20Concursan%20para%20Comisario%20Supervisor%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "12 - Comisario Supervisor - Escalafones Profesional y Tecnico (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283695/1467265/file/12-%20Concursan%20para%20Comisario%20Supervisor%20-%20Escalafones%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "13 - Subdirector de Policia - Escalafon General (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283696/1467268/file/13-%20Concursan%20para%20Subdirector%20de%20Polic%C3%ADa%20-%20Escalaf%C3%B3n%20General.pdf"
    },
    {
        "name": "14 - Subdirector de Policia - Escalafones Profesional y Tecnico (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283698/1467274/file/14-%20Concursan%20para%20Subdirector%20de%20Polic%C3%ADa%20-%20Escalafones%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "15 - Director de Policia - Escalafones General, Profesional y Tecnico (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283699/1467277/file/15-%20Concursan%20para%20Director%20de%20Polic%C3%ADa%20-%20Escalafones%20General,%20Profesional%20y%20T%C3%A9cnico.pdf"
    },
    {
        "name": "16 - Concursan para todos los Grados y Escalafones (2025).pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283702/1467286/file/16-%20Concursan%20para%20todos%20los%20Grados%20y%20Escalafones.pdf"
    },
    {
        "name": "17 - Guia Elaboracion Proyectos - Agrupamiento Direccion 2025.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283703/1467289/file/17-%20Gu%C3%ADa%20para%20la%20Elaboraci%C3%B3n%20y%20Presentaci%C3%B3n%20de%20Proyectos%20%EF%BF%BD%20Concurso%20de%20Ascenso%202025%20%EF%BF%BD%20Agrupamiento%20Direcci%C3%B3n.pdf"
    },
    {
        "name": "18 - Guia Elaboracion Proyectos - Agrupamiento Supervision 2025.pdf",
        "url": "https://www.santafe.gob.ar/index.php/web/content/download/283704/1467292/file/18-%20Gu%C3%ADa%20para%20la%20Elaboraci%C3%B3n%20y%20Presentaci%C3%B3n%20de%20Proyectos%20%EF%BF%BD%20Concurso%20de%20Ascenso%202025%20%EF%BF%BD%20Agrupamiento%20Supervisi%C3%B3n.pdf"
    }
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def download_file(item):
    filename = item["name"]
    url = item["url"]
    dest_path = os.path.join(output_dir, filename)
    
    print(f"Downloading 2025: {filename}...")
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
    print(f"Starting download of {len(files_2025)} manuals into: {output_dir}\n")
    success_count = 0
    for item in files_2025:
        if download_file(item):
            success_count += 1
    print(f"\nCompleted {success_count}/{len(files_2025)} 2025 downloads.")
