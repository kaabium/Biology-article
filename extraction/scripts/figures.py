"""Phase 1b: render figures and crop every lettered panel.

1. Each figure page is rendered at 300 dpi (pdftoppm, vector-exact).
2. The figure region = all ink between the running header and the legend.
3. Each ink pixel is assigned to the panel letter that sits closest above-left of it
   (letters come from the PDF text layer: Helvetica-Bold 9 pt glyphs).
4. The bounding box of each letter's pixels is the panel crop; manual corrections from
   ../panel_overrides.json are applied last (every crop was inspected by eye).
Outputs app/img/figures/*.jpg, app/img/panels/*.jpg and extraction/raw/panel_boxes.json.

Usage: python3 figures.py [--render]
"""
import json, os, subprocess, sys
import numpy as np
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
PDF = os.path.join(ROOT, 'paper', 'Esposito_Cell_Genomics_2022.pdf')
CACHE = os.path.join(ROOT, 'extraction', 'raw', 'renders')
DPI = 300
K = DPI / 72.0
LETTERS = json.load(open(os.path.join(ROOT, 'extraction', 'raw', 'panel_letters.json')))
LINES = json.load(open(os.path.join(ROOT, 'extraction', 'raw', 'lines.json')))
OVR_PATH = os.path.join(ROOT, 'extraction', 'panel_overrides.json')
OVR = json.load(open(OVR_PATH)) if os.path.exists(OVR_PATH) else {}
OUT_FIG = os.path.join(ROOT, 'app', 'img', 'figures')
OUT_PAN = os.path.join(ROOT, 'app', 'img', 'panels')
os.makedirs(OUT_FIG, exist_ok=True)
os.makedirs(OUT_PAN, exist_ok=True)
os.makedirs(CACHE, exist_ok=True)


def render(page):
    path = os.path.join(CACHE, f'p{page:02d}.png')
    if not os.path.exists(path) or '--render' in sys.argv:
        subprocess.run(['pdftoppm', '-r', str(DPI), '-png', '-singlefile', '-f', str(page), '-l', str(page), PDF,
                        path[:-4]], check=True)
    return Image.open(path).convert('RGB')


def save_img(img, path, q=86):
    img.save(path, 'WEBP', quality=q, method=6)


boxes = {}
for fig, info in sorted(LETTERS.items()):
    page = info['page']
    img = render(page)
    arr = np.asarray(img).astype(np.int16)
    ink = (arr.min(axis=2) < 235)
    # vertical extent: below running header, above legend title / "(legend on next page)"
    lines = LINES[str(page)]
    leg = [l for l in lines if l['text'].startswith(('Figure ', '(legend'))]
    bottom_pt = min(l['by'] - l['size'] for l in leg) - 4 if leg else 740
    top_pt = 92
    y0, y1 = int(top_pt * K), int(bottom_pt * K)
    ink[:y0, :] = False
    ink[y1:, :] = False
    ys, xs = np.nonzero(ink)
    fx0, fx1, fy0, fy1 = xs.min(), xs.max(), ys.min(), ys.max()
    pad = int(6 * K / 3)
    fbox = [max(0, fx0 - pad), max(0, fy0 - pad), min(img.width, fx1 + pad), min(img.height, fy1 + pad)]
    figimg = img.crop(fbox)
    save_img(figimg, os.path.join(OUT_FIG, f'{fig}.webp'))
    # assign ink pixels to letters
    lets = sorted(info['letters'].items())
    ax = np.array([v[0] * K for _, v in lets])
    ay = np.array([v[1] * K for _, v in lets])
    tol = 12 * K
    best = np.full(xs.shape, -1)
    bestscore = np.full(xs.shape, np.inf)
    for i in range(len(lets)):
        ok = (ax[i] <= xs + tol) & (ay[i] <= ys + tol)
        score = (ys - ay[i]) + (xs - ax[i])
        upd = ok & (score < bestscore)
        best[upd] = i
        bestscore[upd] = score[upd]
    fboxes = {}
    for i, (letter, v) in enumerate(lets):
        sel = best == i
        if not sel.any():
            continue
        bx0, bx1 = xs[sel].min(), xs[sel].max()
        by0, by1 = ys[sel].min(), ys[sel].max()
        # the letter itself is always inside its panel
        bx0 = min(bx0, int(v[0] * K)); by0 = min(by0, int(v[1] * K))
        p = int(4 * K)
        b = [int(max(0, bx0 - p)), int(max(0, by0 - p)), int(min(img.width, bx1 + p)), int(min(img.height, by1 + p))]
        pid = f'{fig}{letter}'
        masks = []
        if pid in OVR:
            o = OVR[pid]['box']
            # overrides are in PDF points: [x0, y0, x1, y1]
            b = [int(o[0] * K), int(o[1] * K), int(o[2] * K), int(o[3] * K)]
            masks = OVR[pid].get('mask', [])
        fboxes[letter] = b
        crop = img.crop(b)
        if masks:
            from PIL import ImageDraw
            dr = ImageDraw.Draw(crop)
            for m in masks:
                dr.rectangle([m[0] * K - b[0], m[1] * K - b[1], m[2] * K - b[0], m[3] * K - b[1]], fill='white')
        save_img(crop, os.path.join(OUT_PAN, f'{pid}.webp'))
    boxes[fig] = {'page': page, 'figBox': [int(x) for x in fbox], 'panels': fboxes,
                  'panelsPt': {k: [round(x / K, 1) for x in v] for k, v in fboxes.items()},
                  'size': [figimg.width, figimg.height]}
    print(fig, 'figure', figimg.size, {k: (v[2] - v[0], v[3] - v[1]) for k, v in fboxes.items()})

# graphical abstract: extract the embedded raster image at native resolution
ga_dir = os.path.join(CACHE, 'ga')
os.makedirs(ga_dir, exist_ok=True)
subprocess.run(['pdfimages', '-f', '1', '-l', '1', '-j', PDF, os.path.join(ga_dir, 'img')], check=True)
cands = sorted((os.path.getsize(os.path.join(ga_dir, f)), f) for f in os.listdir(ga_dir))
ga = Image.open(os.path.join(ga_dir, cands[-1][1])).convert('RGB')
save_img(ga, os.path.join(OUT_FIG, 'ga.webp'), q=90)
boxes['ga'] = {'page': 1, 'size': list(ga.size), 'source': 'embedded raster image (pdfimages), native 300 ppi'}
print('ga', ga.size)
json.dump(boxes, open(os.path.join(ROOT, 'extraction', 'raw', 'panel_boxes.json'), 'w'), indent=1)
meta = {}
for fig, info in boxes.items():
    if fig == 'ga':
        meta['ga'] = {'img': 'app/img/figures/ga.webp', 'w': info['size'][0], 'h': info['size'][1], 'page': 1, 'panels': {}}
        continue
    fx0, fy0 = info['figBox'][0], info['figBox'][1]
    W, H = info['size']
    pans = {}
    for L, b in info['panels'].items():
        x0, y0, x1, y1 = b[0] - fx0, b[1] - fy0, b[2] - fx0, b[3] - fy0
        pans[L] = {'img': f'app/img/panels/{fig}{L}.webp', 'w': b[2] - b[0], 'h': b[3] - b[1],
                   # panel rectangle as fractions of the full-figure image (for highlighting)
                   'rect': [round(max(0, x0) / W, 4), round(max(0, y0) / H, 4), round(min(W, x1) / W, 4), round(min(H, y1) / H, 4)]}
    meta[fig] = {'img': f'app/img/figures/{fig}.webp', 'w': W, 'h': H, 'page': info['page'], 'panels': pans}
with open(os.path.join(ROOT, 'app', 'data', 'figmeta.js'), 'w') as f:
    f.write('/* Generated by extraction/scripts/figures.py. Image sizes in pixels (300 dpi renders). */\n')
    f.write('window.FIGMETA = ' + json.dumps(meta) + ';\n')
