"""QA helper: zoom a page region (PDF points) with a 5-pt grid for precise crop/mask placement."""
import sys
from PIL import Image, ImageDraw, ImageFont
S = '/tmp/claude-0/-home-user-Biology-article/3fb02846-5d1b-5065-beda-31ff0c8c6efc/scratchpad'
K = 300 / 72
f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 16)
page, x0, y0, x1, y1, out = int(sys.argv[1]), *map(float, sys.argv[2:6]), sys.argv[6]
img = Image.open(f'../raw/renders/p{page:02d}.png').convert('RGB').crop((int(x0 * K), int(y0 * K), int(x1 * K), int(y1 * K)))
d = ImageDraw.Draw(img)
import math
for x in range(int(math.ceil(x0 / 5) * 5), int(x1) + 1, 5):
    X = (x - x0) * K
    d.line([(X, 0), (X, img.height)], fill=(255, 0, 0) if x % 25 == 0 else (255, 180, 180), width=1)
    if x % 10 == 0: d.text((X + 2, 2), str(x), fill=(200, 0, 0), font=f)
for y in range(int(math.ceil(y0 / 5) * 5), int(y1) + 1, 5):
    Y = (y - y0) * K
    d.line([(0, Y), (img.width, Y)], fill=(0, 0, 255) if y % 25 == 0 else (180, 180, 255), width=1)
    if y % 10 == 0: d.text((2, Y + 2), str(y), fill=(0, 0, 200), font=f)
img.save(f'{S}/{out}.png')
print(img.size)
