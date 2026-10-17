"""Step 3: classify lines into reading-order flows and assemble paragraphs.

Writes ../paper_raw.json (consumed by build_paper.py) and ../raw/hyphens.json.
"""
import json, re, collections
import extract as X
from lines import fix_glyphs, build_fragments

LEGEND_CONT = {4: 'fig1', 6: 'fig2', 8: 'fig3', 10: 'fig4', 12: 'fig5', 14: 'fig6'}
COL_ORDER = {'F': 0, 'L': 1, 'R': 2}


def is_legend_marker(t):
    return t.strip() in ('(legend continued on next page)', '(legend on next page)')


def classify(pages):
    flows = collections.defaultdict(list)
    figure_letters = collections.defaultdict(list)
    dropped = []
    for pno in range(2, 28):
        ls = pages[pno]
        if pno == 2:
            summ_y = next(l['by'] for l in ls if l['text'].strip() == 'SUMMARY')
            intro_y = next(l['by'] for l in ls if l['text'].strip() == 'INTRODUCTION')
            for l in ls:
                if l['by'] < summ_y - 1:
                    flows['front'].append(l)
                elif l['by'] < intro_y - 1:
                    flows['summary'].append(l)
                else:
                    flows['body'].append(l)
            continue
        if pno in X.FIG_PAGES:
            fig = X.FIG_PAGES[pno]
            title = [l for l in ls if re.match(r'^Figure \d\. ', l['text']) and l['fonts'].get('AdvPSA189', 0) > 3]
            ty = title[0]['by'] if title else 10 ** 6
            for l in ls:
                if is_legend_marker(l['text']):
                    dropped.append((pno, l['text']))
                elif l['by'] < ty - 2:
                    figure_letters[fig].append(l)
                else:
                    flows['legend:' + fig].append(l)
            continue
        if pno in LEGEND_CONT:
            fig = LEGEND_CONT[pno]
            for l in ls:
                if is_legend_marker(l['text']):
                    dropped.append((pno, l['text']))
                elif l['size'] < 8:
                    flows['legend:' + fig].append(l)
                else:
                    flows['body'].append(l)
            continue
        if pno == 15:
            flows['body'].extend(ls)
            continue
        if pno == 16:
            ref_h = next(l for l in ls if l['text'].strip() == 'REFERENCES')
            for l in ls:
                if l['col'] == 'L' and l['by'] < ref_h['by'] - 1:
                    flows['back'].append(l)
                elif l is ref_h:
                    flows['back'].append(l)
                else:
                    flows['refs'].append(l)
            continue
        if pno in (17, 18, 19):
            flows['refs'].extend(ls)
            continue
        if pno in (20, 21):
            for l in ls:
                if l['size'] < 7.6 and not (pno == 20 and l['by'] < 140):
                    flows['krt'].append(l)
                elif l['text'].strip() == '(Continued on next page)':
                    dropped.append((pno, l['text']))
                else:
                    flows['methods'].append(l)
            continue
        flows['methods'].extend(ls)
    # sort each flow in reading order: page, then column, then y
    for k, v in flows.items():
        if k in ('body', 'back', 'refs'):
            v.sort(key=lambda l: (l['page'], 1 if l['col'] == 'F' else COL_ORDER[l['col']], l['by']))
        else:
            v.sort(key=lambda l: (l['page'], l['by'], COL_ORDER[l['col']]))
    return flows, figure_letters, dropped


def legend_starts_new(t):
    return bool(re.match(r'^\(([A-L])(\s*(and|,|–|-)\s*[A-L])*\)\s', t) or re.match(r'^Figure \d\. ', t)
                or re.match(r'^(See also|Data are|Data represent|Statistical|Error bars)', t))


def main():
    pages, vocab = X.main()
    flows, letters, dropped = classify(pages)
    out = {'paras': {}, 'letters': {}, 'dropped': dropped}
    for name, ls in flows.items():
        if name == 'krt':
            continue
        if name == 'refs':
            paras = X.assemble(ls, vocab, name, indent_new=False, short_new=False,
                               starts_new=lambda t: bool(re.match(r'^\d{1,3}\. ', t)))
        elif name.startswith('legend'):
            paras = X.assemble(ls, vocab, name, indent_new=False, short_new=True, starts_new=legend_starts_new)
        elif name in ('front',):
            paras = X.assemble(ls, vocab, name, indent_new=False, short_new=False,
                               starts_new=lambda t: True)
        else:
            paras = X.assemble(ls, vocab, name, indent_new=True, short_new=True,
                               starts_new=lambda t: t.startswith(('●', '○')))
        res = []
        for p in paras:
            runs = X.toks_to_runs(p['toks'])
            res.append({'pages': p['pages'], 'heading': p['heading'], 'text': X.para_text(p['toks']).strip(),
                        'html': X.runs_to_html(runs).strip(), 'lines': p['lines'],
                        'hyph_unknown': p.get('hyph_unknown', [])})
        out['paras'][name] = res
    for fig, ls in letters.items():
        out['letters'][fig] = [{'text': l['text'], 'x0': l['x0'], 'x1': l['x1'], 'by': l['by'], 'size': l['size'],
                                'page': l['page']} for l in ls]
    # key resources table from raw fragments (cells are separated by wide gaps)
    out['krt'] = krt_rows()
    json.dump(out, open('../paper_raw.json', 'w'), indent=1, ensure_ascii=False)
    json.dump(X.HYPHEN_LOG, open('../raw/hyphens.json', 'w'), indent=1, ensure_ascii=False)
    json.dump(sorted(set(X.LOG)), open('../raw/glyph_log.json', 'w'), indent=1, ensure_ascii=False)
    print({k: len(v) for k, v in out['paras'].items()})
    print('dropped', dropped)
    unk = [h for h in X.HYPHEN_LOG if h['decision'] == 'unknown']
    print('hyphens', len(X.HYPHEN_LOG), 'unknown', len(unk))


def krt_rows():
    """Parse the key resources table (pages 20-21) into rows of 3 cells."""
    rows = []
    for pno in (20, 21):
        chars = fix_glyphs(X.DATA[pno - 1]['chars'], [])
        frags = [f for f in build_fragments(chars) if 95 < f['by'] < 750]
        cells = []
        for f in frags:
            if f['size'] > 7.6 and not f.get('orphan'):
                continue
            if f.get('orphan') and f['size'] < 6:
                pass
            if f['x0'] < 255:
                col = 0
            elif f['x0'] < 460:
                col = 1
            else:
                col = 2
            toks = X.tokens_from_chars(sorted(f['chars'], key=lambda c: c['x0']))
            text = ''.join(t['t'] for t in toks)
            if text.strip() in ('(Continued on next page)',):
                continue
            cells.append({'page': pno, 'col': col, 'by': f['by'], 'x0': f['x0'], 'text': text,
                          'html': X.runs_to_html(X.toks_to_runs(toks)),
                          'cat': all(c.get('col') == X.BLUE for c in f['chars'] if c['t'].strip()) and col == 0,
                          'bold_it': any('HI' in c['f'] for c in f['chars'])})
        # stop at the end of the table (first 8.47 heading after it is excluded above)
        cells.sort(key=lambda c: (c['by'], c['col']))
        rows.append(cells)
    return rows


if __name__ == '__main__':
    main()
