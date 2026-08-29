import urllib.request
import urllib.parse
import re

def search_ddg(query):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            # Extract links from result__url or uddg=
            raw_links = re.findall(r'uddg=([^&"\']+)', html)
            decoded = [urllib.parse.unquote(l) for l in raw_links]
            return list(dict.fromkeys(decoded))
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    queries = [
        'site:santafe.gob.ar "ascenso" "escalafon"',
        'site:santafe.gob.ar "material de estudio" "ascenso"',
        'site:santafe.gob.ar "concurso de ascensos" pdf',
        '"Oficial de Policía" "Escalafón General" "Subinspector" pdf',
        'site:isepsantafe.edu.ar "ascenso"'
    ]
    for q in queries:
        print(f"=== Query: {q} ===")
        res = search_ddg(q)
        for r in res[:10]:
            print(r)
