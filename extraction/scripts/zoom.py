"""QA helper: crop the printed line(s) containing given text from the 200-dpi page renders
and stack them into one contact sheet, so extracted text can be compared with the print.

Usage: python3 zoom.py out.png "PAGE|substring" ["PAGE|substring" ...]
"""
import json, sys, os
from PIL import Image, ImageDraw, ImageFont
FONT = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 17)
S = '/tmp/claude-0/-home-user-Biology-article/3fb02846-5d1b-5065-beda-31ff0c8c6efc/scratchpad'
lines = json.load(open('../raw/lines.json'))
DPI = 200
k = DPI / 72.0
out = sys.argv[1]
crops = []
for spec in sys.argv[2:]:
    pg, needle = spec.split('|', 1)
    found = [l for l in lines[pg] if needle in l['text']]
    if not found:
        print('NOT FOUND', spec); continue
    l = found[0]
    img = Image.open(f'{S}/r200/p-{int(pg):02d}.png')
    x0 = max(0, (l['x0'] - 4) * k); x1 = min(img.width, (l['x1'] + 4) * k)
    y0 = (l['by'] - l['size'] * 1.25) * k; y1 = (l['by'] + l['size'] * 0.45) * k
    c = img.crop((int(x0), int(y0), int(x1), int(y1)))
    lab = Image.new('RGB', (c.width, 26), (235, 242, 255))
    ImageDraw.Draw(lab).text((2, 3), f'p{pg}: {l["text"][:140]}', fill=(0, 0, 160), font=FONT)
    crops.append(lab); crops.append(c)
W = max(c.width for c in crops); H = sum(c.height for c in crops) + 4 * len(crops)
sheet = Image.new('RGB', (W, H), 'white')
y = 0
for c in crops:
    sheet.paste(c, (0, y)); y += c.height + 4
sheet.save(out)
print(out, sheet.size)
