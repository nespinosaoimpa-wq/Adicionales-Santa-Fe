import urllib.request

url = "https://www.santafe.gob.ar/normativa/item.php?id=339434&cod=11dabbae11573e7fd0fbef1a7d790198"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        with open("scratch/fetched_item.html", "w", encoding="utf-8") as f:
            f.write(html)
        print("Fetched item page written successfully.")
except Exception as e:
    print("Error:", e)
