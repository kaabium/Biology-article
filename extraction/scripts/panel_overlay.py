"""QA helper: draw panel boxes + a 25-pt grid (labelled in PDF points) on each figure page."""
import json, sys
from PIL import Image, ImageDraw, ImageFont
S = '/tmp/claude-0/-home-user-Biology-article/3fb02846-5d1b-5065-beda-31ff0c8c6efc/scratchpad'
B = json.load(open('../raw/panel_boxes.json'))
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 40)
f2 = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
K = 300 / 72
cols = [(230, 0, 0), (0, 140, 0), (0, 0, 230), (200, 0, 200), (0, 160, 160), (230, 120, 0)]
for fig in sys.argv[1].split(','):
    info = B[fig]
    img = Image.open(f'../raw/renders/p{info["page"]:02d}.png').convert('RGB')
    d = ImageDraw.Draw(img)
    for x in range(0, 603, 25):
        d.line([(x * K, 0), (x * K, img.height)], fill=(200, 200, 255) if x % 100 else (120, 120, 255), width=1)
        if x % 50 == 0: d.text((x * K + 2, 380), str(x), fill=(0, 0, 255), font=f2)
    for y in range(0, 783, 25):
        d.line([(0, y * K), (img.width, y * K)], fill=(200, 200, 255) if y % 100 else (120, 120, 255), width=1)
        if y % 50 == 0: d.text((5, y * K + 2), str(y), fill=(0, 0, 255), font=f2)
    for i, (L, b) in enumerate(sorted(info['panels'].items())):
        c = cols[i % len(cols)]
        d.rectangle(b, outline=c, width=7)
        d.text((b[0] + 10, b[1] + 10), L, fill=c, font=F)
    y1 = max(b[3] for b in info['panels'].values())
    img = img.crop((0, int(90 * K), img.width, min(img.height, y1 + 40)))
    img = img.resize((img.width // 2, img.height // 2))
    img.save(f'{S}/pb_{fig}.png')
print('ok')
