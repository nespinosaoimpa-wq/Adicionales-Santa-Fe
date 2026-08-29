import urllib.request
import urllib.parse
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch_subpages():
    base = "https://www.santafe.gov.ar"
    main_urls = [
        "https://www.santafe.gov.ar/index.php/web/content/view/full/239105",
        "https://www.santafe.gov.ar/index.php/web/content/view/full/251445",
        "https://www.santafe.gov.ar/index.php/web/content/view/full/259712/(subtema)/239105",
        "https://www.santafe.gov.ar/index.php/web/content/view/full/259713/(subtema)/"
    ]
    
    visited = set()
    all_pdfs = {}
    queue = list(main_urls)

    while queue:
        u = queue.pop(0)
        if u in visited:
            continue
        visited.add(u)
        print(f"=== Crawling {u} ===")
        try:
            req = urllib.request.Request(u, headers=headers)
            with urllib.request.urlopen(req) as resp:
                html = resp.read().decode('utf-8', errors='ignore')
                
                # find standard a tags with regex
                matches = re.findall(r'<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', html, re.DOTALL | re.IGNORECASE)
                for href, text in matches:
                    clean_text = re.sub(r'<[^>]+>', '', text).strip()
                    if href.startswith('/'):
                        href = base + href
                    
                    if '.pdf' in href.lower() or 'download' in href.lower():
                        all_pdfs[href] = clean_text
                    elif 'content/view/full/' in href:
                        if href not in visited and href not in queue and len(visited) < 25:
                            # Only follow relevant sections
                            if '239105' in href or 'ascenso' in href.lower() or 'concurso' in href.lower() or 'subtema' in href.lower():
                                queue.append(href)
        except Exception as e:
            print(f"Error {u}: {e}")

    print("\nTotal PDF links found from main sections:")
    for k, v in all_pdfs.items():
        print(f"  {v} -> {k}")

if __name__ == '__main__':
    fetch_subpages()
