"""QA helper: draw every detected paragraph start (with its ID) on the page renders."""
import json, sys
from PIL import Image, ImageDraw, ImageFont
S = '/tmp/claude-0/-home-user-Biology-article/3fb02846-5d1b-5065-beda-31ff0c8c6efc/scratchpad'
FONT = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 15)
p = json.load(open('../paper.json'))
k = 200 / 72.0
marks = {}
for b in p['blocks']:
    if 'pos' in b:
        marks.setdefault(b['pos']['page'], []).append((b['pos'], b['id']))
for f in p['figures']:
    for pn in f['panels']:
        marks.setdefault(pn['pos']['page'], []).append((pn['pos'], pn['id'] + ' legend'))
for pg in [int(x) for x in sys.argv[1].split(',')]:
    img = Image.open(f'{S}/r200/p-{pg:02d}.png').convert('RGB')
    d = ImageDraw.Draw(img)
    for pos, lab in marks.get(pg, []):
        x, y = pos['x0'] * k, pos['by'] * k
        d.rectangle([x - 14, y - 22, x - 4, y + 2], fill=(220, 0, 0))
        d.text((x + 2, y - 40), lab, fill=(220, 0, 0), font=FONT)
    img = img.resize((img.width * 3 // 4, img.height * 3 // 4))
    img.save(f'{S}/ov{pg:02d}.png')
print('ok')
