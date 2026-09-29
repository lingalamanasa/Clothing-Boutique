import glob
import re

html_files = glob.glob('*.html')
used = {}
for f in html_files:
    content = open(f, encoding='utf-8').read()
    imgs = re.findall(r'src=["\']\./images/([^"\']+)["\']', content)
    for img in imgs:
        if not img.startswith('logo'):
            used.setdefault(img, []).append(f)

print('=== IMAGE USAGE FREQUENCY ===')
for img, files in sorted(used.items(), key=lambda x: len(x[1]), reverse=True):
    print(f'{img}: {len(files)} times across {set(files)}')
