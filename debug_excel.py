import pandas as pd
import re

df = pd.read_excel('d:/Nico/Adicionales-Santa-Fe/telefonos dependencias policiales.xls', sheet_name='Policia', header=None)
for i, row in df.iterrows():
    v = [str(x) for x in row if pd.notnull(x)]
    if not v: continue
    s = ' | '.join(v)
    if 250 < i < 350:
        print(f"{i}: {s}")
