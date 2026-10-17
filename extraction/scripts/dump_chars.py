"""Dump every character of the PDF text layer (with font, size, position) to JSON.

Usage: python3 dump_chars.py paper.pdf out.json
pdfplumber is slow on the vector-heavy figure pages, so later steps work from this cache.
"""
import json, sys
import pdfplumber

pdf = pdfplumber.open(sys.argv[1])
out = []
for pno, page in enumerate(pdf.pages, 1):
    chars = []
    for c in page.chars:
        chars.append({
            't': c['text'], 'f': c['fontname'].split('+')[-1], 's': round(c['size'], 2),
            'x0': round(c['x0'], 2), 'x1': round(c['x1'], 2),
            'top': round(c['top'], 2), 'bot': round(c['bottom'], 2),
            'up': c.get('upright', True),
            'col': c.get('non_stroking_color'),
            'bx': round(c['matrix'][4], 2), 'by': round(float(page.height) - c['matrix'][5], 2), 'adv': round(c.get('adv', 0) or 0, 3),
        })
    out.append({'page': pno, 'w': float(page.width), 'h': float(page.height), 'chars': chars})
json.dump(out, open(sys.argv[2], 'w'))
print('pages', len(out), 'chars', sum(len(p['chars']) for p in out))
