import os
import sys

base_dir = r"c:\Users\Notebook4-OIMPA\Desktop\Adicionales Santa Fe\Material_de_Ascenso_ISEP"

total_files = 0
total_size = 0

print("=== INVENTARIO DE MATERIAL DE ASCENSO ISEP ===\n")

for root, dirs, files in os.walk(base_dir):
    rel_path = os.path.relpath(root, base_dir)
    folder_name = "Concurso 2026 Vigente (Principal)" if rel_path == "." else rel_path
    print(f"CARPETA: {folder_name}")
    folder_size = 0
    for f in sorted(files):
        fp = os.path.join(root, f)
        sz = os.path.getsize(fp)
        folder_size += sz
        total_files += 1
        total_size += sz
        print(f"   - {f} ({(sz / (1024*1024)):.2f} MB)")
    print(f"   Subtotal: {len(files)} archivos ({(folder_size / (1024*1024)):.2f} MB)\n")

print(f"TOTAL GENERAL: {total_files} archivos descargados ({(total_size / (1024*1024)):.2f} MB)")
