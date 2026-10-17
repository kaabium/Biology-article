"""Debug helper: print every line fragment per page with position, size and text."""
import sys
from lines import load, fix_glyphs, build_fragments, fragment_text
data = load('../raw/chars.json')
pages = [int(x) for x in sys.argv[1].split(',')] if len(sys.argv) > 1 else range(1, 28)
log = []
for pno in pages:
    p = data[pno - 1]
    F = build_fragments(fix_glyphs(p['chars'], log))
    print(f'=================== PAGE {pno}')
    for f in F:
        plain, html = fragment_text(f)
        print(f"{f['x0']:6.1f} {f['x1']:6.1f} {f['by']:6.1f} {f['size']:5.2f} {'O' if f.get('orphan') else ' '} {html}")
print('\n'.join(sorted(set(log))))
