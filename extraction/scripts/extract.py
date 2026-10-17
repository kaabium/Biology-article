"""Step 2 of the text pipeline: line fragments -> reading-order flows -> paragraphs.

Produces extraction/paper_raw.json: every paragraph with a stable ID, page number(s),
plain text and HTML (italics, super/subscripts, citation links, figure cross-refs).
Run from extraction/scripts:  python3 extract.py
"""
import json, re, collections, html as htmllib
from lines import load, fix_glyphs, build_fragments, compose_accents, is_italic

DATA = load('../raw/chars.json')
LOG = []          # every automatic fix, written to QA
HYPHEN_LOG = []   # every line-end hyphen decision

BLUE = [1.0]
SYMBOL_FONTS = ('AdvP4C4E74', 'AdvP7DED', 'AdvPS3F4C13', 'AdvPS480274', 'AdvPSMPi6', 'AdvPSSym', 'AdvPS4731B1', 'AdvHelN-L')
TWO_COL = {2, 4, 6, 8, 10, 12, 14, 15, 16, 17, 18, 19}
FIG_PAGES = {3: 'fig1', 5: 'fig2', 7: 'fig3', 9: 'fig4', 11: 'fig5', 13: 'fig6'}


def is_bold_font(f):
    return f.startswith('AdvPSHN-H') or f.startswith('AdvPSA189') or f.startswith('Helvetica-Bold') \
        or f.endswith('-bi')


def tokens_from_chars(cs):
    """Glyphs (sorted by x) -> style tokens; spaces inferred from gaps."""
    cs = compose_accents(cs)
    toks = []
    prev = None
    for c in cs:
        if prev is not None:
            gap = c['x0'] - prev['x1']
            ref = max(prev['s'], c['s']) if (prev.get('pos') or c.get('pos')) else min(prev['s'], c['s'])
            thr = max(0.55, 0.065 * ref)
            if prev.get('pos') == 'sup' and not c.get('pos') and c['t'] in ';,.):':
                thr = 1.6   # punctuation right after a superscript
            if gap > thr and not (prev['t'] == '\u00b0' and c['t'] == 'C'):
                toks.append({'t': ' ', 'sp': True})
        toks.append({'t': c['t'], 'i': is_italic(c['f']), 'b': is_bold_font(c['f']),
                     'pos': c.get('pos'), 'link': c.get('col') == BLUE and c['f'] in ('AdvPSA183', 'Advhelvneue-italic'),
                     's': c['s'], 'f': c['f'], 'x0': c['x0'], 'x1': c['x1']})
        prev = c
    return toks


def page_lines(pno):
    """Return lines for a page: dicts with x0,x1,by,size,col,tokens,text."""
    p = DATA[pno - 1]
    chars = fix_glyphs(p['chars'], LOG)
    for c in chars:
        if c.get('fixed'):
            LOG.append(f"p{pno}: glyph {c['f']} {c['orig']!r} -> {c['t']!r}")
    frags = build_fragments(chars)
    body = [f for f in frags if 95 < f['by'] < 750]
    orphans = [f for f in frags if f.get('orphan') and 95 < f['by'] < 750]
    for f in orphans:
        LOG.append(f"p{pno}: orphan glyph(s) {''.join(c['t'] for c in f['chars'])!r} at y={f['by']:.1f}")
    # page margin and gutter
    L = 59.75 if any(53 < f['x0'] < 60.5 and f['x0'] > 59 for f in body) and not any(52.5 < f['x0'] < 54 for f in body) else 53.12
    gutter = L + 245
    lines = []
    for f in body:
        if pno in TWO_COL:
            if f['x1'] <= gutter + 3:
                col = 'L'
            elif f['x0'] >= gutter - 3:
                col = 'R'
            else:
                col = 'F'
        else:
            col = 'F'
        f['col'] = col
    # merge fragments on the same baseline within the same column
    groups = collections.defaultdict(list)
    for f in sorted(body, key=lambda f: f['by']):
        key = None
        for (col, by) in list(groups.keys()):
            if col == f['col'] and abs(by - f['by']) < 1.0:
                key = (col, by); break
        groups[key or (f['col'], f['by'])].append(f)
    if 3 <= pno <= 14:
        merged = collections.defaultdict(list)
        for (col, by), fs in groups.items():
            if all(f['size'] < 8 for f in fs):
                k2 = None
                for (c2, b2) in list(merged.keys()):
                    if c2 == 'LEG' and abs(b2 - by) < 1.0:
                        k2 = (c2, b2); break
                merged[k2 or ('LEG', by)].extend(fs)
            else:
                merged[(col, by)].extend(fs)
        groups = {}
        for (col, by), fs in merged.items():
            if col == 'LEG':
                x0 = min(f['x0'] for f in fs); x1 = max(f['x1'] for f in fs)
                col = 'F' if (x0 < gutter - 3 and x1 > gutter + 3) else ('L' if x1 <= gutter + 3 else 'R')
            groups[(col, by)] = fs
    for (col, by), fs in groups.items():
        cs = sorted([c for f in fs for c in f['chars']], key=lambda c: c['x0'])
        toks = tokens_from_chars(cs)
        sizes = [c['s'] for c in cs if c['s'] >= 6.4]
        size = max(set(sizes), key=sizes.count) if sizes else cs[0]['s']
        lines.append({'page': pno, 'col': col, 'by': by, 'x0': min(f['x0'] for f in fs),
                      'x1': max(f['x1'] for f in fs), 'size': size, 'toks': toks,
                      'text': ''.join(t['t'] for t in toks), 'L': L,
                      'fonts': collections.Counter(c['f'] for c in cs),
                      'allbold': all(is_bold_font(c['f']) for c in cs if c['t'].strip() and c['f'] not in SYMBOL_FONTS),
                      'link_any': any(c.get('col') == BLUE for c in cs)})
    order = {'F': 0, 'L': 1, 'R': 2}
    lines.sort(key=lambda l: (l['by'], order[l['col']]))
    return lines


# --------------------------------------------------------------------------------------
# hyphenation
def build_vocab(all_lines):
    """Words seen *inside* lines (not at line breaks), with and without hyphens."""
    vocab = collections.Counter()
    for l in all_lines:
        words = re.findall(r"[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]", l['text'])
        # drop the last word of the line (may be broken)
        if l['text'].rstrip().endswith('-') and words:
            words = words[:-1]
        for w in words:
            vocab[w.lower()] += 1
            for part in w.split('-'):
                vocab[part.lower()] += 1
    return vocab


KEEP_PREFIXES = ('non', 'co', 'self', 'pan', 'multi', 'pre', 'anti', 'cell', 'low', 'high', 'two', 'three',
                 'well', 'long', 'genome', 'tumor', 'tumour', 'background', 'drug', 'growth', 'cancer',
                 'disease', 'single', 'double', 'patient', 'chromatin', 'protein', 'gene', 'hallmark',
                 'transcriptome', 'cisplatin', 'loss', 'gain', 'off', 'on', 'down', 'up', 'out', 'in', 'top',
                 'first', 'second', 'third', 'target', 'cell-type', 'paired', 'migration', 'proliferation',
                 'time', 'dose', 'treatment', 'library', 'flow', 'next', 'ultra', 'semi', 'over', 'under')
# manual overrides (word-before-break, word-after-break) -> 'join' | 'keep'; filled after review
HYPHEN_OVERRIDES = {('CRISPRi', 'based'): 'keep', ('Near', 'optimal'): 'keep', ('chromatin', 'modifying'): 'keep', ('knowledge', 'based'): 'keep', ('paired', 'end'): 'keep', ('three', 'dimensional'): 'keep', ('transcriptome', 'wide'): 'keep', ('lib', 'DECKO'): 'join', ('At', 'tenello'): 'join', ('Bren', 'tani'): 'join', ('Develop', 'ments'): 'join', ('Fortu', 'nately'): 'join', ('Ge', 'nom'): 'join', ('Hal', 'dar'): 'join', ('Je', 'mal'): 'join', ('Kawa', 'kami'): 'join', ('Ku', 'mar'): 'join', ('Kula', 'kovskiy'): 'join', ('Le', 'slie'): 'join', ('Lion', 'tos'): 'join', ('Love', 'land'): 'join', ('Papachatzo', 'poulou'): 'join', ('Pub', 'lishing'): 'join', ('Rose', 'nbloom'): 'join', ('Sys', 'temic'): 'join', ('Waka', 'matsu'): 'join', ('activ', 'ities'): 'join', ('align', 'ments'): 'join', ('approxi', 'mately'): 'join', ('com', 'putations'): 'join', ('cur', 'rent'): 'join', ('engi', 'neered'): 'join', ('fol', 'lows'): 'join', ('hepato', 'cellular'): 'join', ('homeo', 'stasis'): 'join', ('hope', 'fully'): 'join', ('impor', 'tance'): 'join', ('incor', 'rectly'): 'join', ('indi', 'cation'): 'join', ('interro', 'gate'): 'join', ('intersec', 'tion'): 'join', ('malig', 'nancies'): 'join', ('mamma', 'lian'): 'join', ('manipula', 'tion'): 'join', ('maxi', 'mize'): 'join', ('obser', 'vations'): 'join', ('over', 'looked'): 'join', ('pre', 'vented'): 'join', ('priori', 'tize'): 'join', ('pub', 'lished10'): 'join', ('ques', 'tions'): 'join', ('suc', 'cinimidyl'): 'join', ('therapeuti', 'cally'): 'join', ('transcrip', 'tomic'): 'join', ('versa', 'tility'): 'join'}


def hyphen_decision(left, right, vocab):
    """left = word fragment before the line-end hyphen, right = fragment starting next line."""
    key = (left, right)
    if key in HYPHEN_OVERRIDES:
        return HYPHEN_OVERRIDES[key], 'override'
    joined = (left + right).lower()
    hyph = (left + '-' + right).lower()
    if not right or not left:
        return 'keep', 'empty'
    if right[0].isupper() or right[0].isdigit() or left[-1].isdigit() or left[-1].isupper():
        return 'keep', 'case/digit'
    if vocab.get(hyph, 0) > 0 or (hyph.endswith('s') and vocab.get(hyph[:-1], 0) > 0):
        return 'keep', 'hyphenated form seen in text'
    if vocab.get(joined, 0) > 0 or (joined.endswith('s') and vocab.get(joined[:-1], 0) > 0):
        return 'join', 'joined form seen in text'
    if left.lower() in ('pan', 'non', 'self', 'multi', 'cell', 'well'):
        return 'keep', 'compound prefix'
    return 'unknown', 'no evidence'


# --------------------------------------------------------------------------------------
# paragraph assembly
def line_is_heading(l):
    t = l['text'].strip()
    return l['allbold'] and len(t) > 2 and not re.match(r'^\(?[A-L]\)?$', t)


def assemble(lines, vocab, flow_name, indent_new=True, short_new=True, starts_new=None):
    """Join lines of one flow into paragraphs. Returns list of paragraph dicts."""
    paras = []
    cur = None

    def flush():
        nonlocal cur
        if cur and cur['toks']:
            paras.append(cur)
        cur = None

    prev = None
    for l in lines:
        t = l['text'].strip()
        heading = line_is_heading(l)
        colleft = l['L'] if l['col'] in ('L', 'F') else l['L'] + 251.1
        colright = (l['L'] + 239.1) if l['col'] == 'L' else (l['L'] + 490.2)
        indented = l['x0'] > colleft + 4
        new = False
        if cur is None or heading or (prev is not None and prev.get('_heading')):
            new = True
        elif cur is not None and cur['toks'] and cur['toks'][0]['t'] in ('\u25cf', '\u25cb') and \
                not t.startswith(('\u25cf', '\u25cb')) and not heading and \
                not (prev is not None and prev['x1'] < prev['_colright'] - 12 and prev['text'].strip().endswith('.')):
            new = False
        elif indent_new and indented:
            new = True
        elif short_new and prev is not None and prev['x1'] < prev['_colright'] - 12 and \
                re.search(r'[.:)]$|[.:]\s*$', prev['text'].strip()):
            new = True
        elif starts_new and starts_new(t):
            new = True
        if new and cur is not None and heading and cur.get('heading') and prev is not None and prev.get('_heading') \
                and abs(l['by'] - prev['by']) < 14 and l['page'] == prev['page']:
            # multi-line heading
            new = False
        l['_heading'] = heading
        l['_colright'] = colright
        if new:
            flush()
            cur = {'flow': flow_name, 'pages': [l['page']], 'toks': [], 'heading': heading, 'lines': []}
        else:
            # join with previous line
            if l['page'] not in cur['pages']:
                cur['pages'].append(l['page'])
            last_word = re.findall(r'(\S+)\s*$', prev['text'])
            last_word = last_word[0].lstrip('(') if last_word else ''
            if prev['text'].rstrip().endswith('-') and not prev['text'].rstrip().endswith(' -'):
                left = re.findall(r'([A-Za-z0-9]+)-\s*$', prev['text'])
                right = re.findall(r'^\s*([A-Za-z0-9]+)', l['text'])
                left = left[0] if left else ''
                right = right[0] if right else ''
                dec, why = hyphen_decision(left, right, vocab)
                HYPHEN_LOG.append({'left': left, 'right': right, 'decision': dec, 'why': why,
                                   'page': l['page'], 'ctx': prev['text'][-40:] + ' | ' + l['text'][:40]})
                if dec == 'join' or dec == 'unknown':
                    # drop the hyphen token
                    for i in range(len(cur['toks']) - 1, -1, -1):
                        if cur['toks'][i]['t'] == '-':
                            cur['toks'].pop(i); break
                    if dec == 'unknown':
                        cur.setdefault('hyph_unknown', []).append(left + '|' + right)
            elif re.search(r'ENSG\d+$', last_word) and re.match(r'^\d', l['text'].strip()):
                pass  # an Ensembl ID broken across lines
            elif prev['text'].rstrip().endswith(('/', '–', '—')) or \
                    re.match(r'^(https?://|www\.|doi\.org)', last_word) and not last_word.endswith('.'):
                pass  # URL or dash continues without a space
            elif re.match(r'^(https?://|www\.)', last_word) and last_word.endswith('.') and \
                    not re.match(r'^[A-Z]', l['text'].strip()):
                pass
            else:
                cur['toks'].append({'t': ' ', 'sp': True})
        cur['toks'].extend(l['toks'])
        cur['lines'].append({'page': l['page'], 'by': round(l['by'], 1), 'col': l['col'], 'x0': round(l['x0'], 1)})
        prev = l
    flush()
    return paras


# --------------------------------------------------------------------------------------
# markup
def esc(s):
    return htmllib.escape(s, quote=False)


CITE_RE = re.compile(r'^[\d,–\-\s]+$')


def expand_cites(s):
    out = []
    for part in s.split(','):
        part = part.strip()
        if not part:
            continue
        m = re.match(r'^(\d+)\s*[–\-]\s*(\d+)$', part)
        if m:
            a, b = int(m.group(1)), int(m.group(2))
            out.extend(range(a, b + 1))
        elif part.isdigit():
            out.append(int(part))
    return out


def toks_to_runs(toks):
    """Merge tokens with identical style into runs."""
    runs = []
    for t in toks:
        style = (t.get('i', False), t.get('b', False), t.get('pos'), t.get('link', False)) if not t.get('sp') else None
        if t.get('sp'):
            if runs:
                runs[-1]['text'] += ' '
            continue
        if runs and runs[-1]['style'] == style:
            runs[-1]['text'] += t['t']
        else:
            runs.append({'style': style, 'text': t['t']})
    return runs


def runs_to_html(runs):
    out = []
    i = 0
    n = len(runs)
    while i < n:
        r = runs[i]
        it, b, pos, link = r['style']
        text = r['text']
        core = text.rstrip(' ')
        trail = text[len(core):]
        # citations: blue digits (superscript or inline), or black superscript digits that are
        # not exponents (x 10^6, cm^3). Adjacent comma/dash runs are merged into one citation.
        prev_txt = ''.join(o for o in out)[-12:]
        prev_plain = re.sub(r'<[^>]+>', '', prev_txt)
        exponent = bool(re.search(r'(10|cm|mm)$', prev_plain))
        is_cite = core and CITE_RE.match(core) and any(ch.isdigit() for ch in core) and \
            (link or (pos == 'sup' and not exponent)) and not trail.startswith('×')
        if is_cite:
            j = i + 1
            while j < n and not trail and CITE_RE.match(runs[j]['text'].strip() or 'x') and \
                    (runs[j]['style'][3] or runs[j]['style'][2] == 'sup'):
                core += runs[j]['text'].rstrip(' ')
                trail = runs[j]['text'][len(runs[j]['text'].rstrip(' ')):]
                j += 1
            refs = expand_cites(core)
            tag = 'sup' if pos == 'sup' else 'span'
            extra = '' if link else ' data-unlinked="1"'
            out.append(f'<{tag} class="cite" data-refs="{",".join(map(str, refs))}"{extra}>{esc(core)}</{tag}>{trail}')
            i = j
            continue
        lead = core[:len(core) - len(core.lstrip(' '))]
        core2 = core.lstrip(' ')
        h = esc(core2)
        if it:
            h = f'<i>{h}</i>'
        if b:
            h = f'<b>{h}</b>'
        if pos in ('sup', 'sub'):
            h = f'<{pos}>{h}</{pos}>'
        if link:
            h = f'<span class="lk">{h}</span>'
        out.append(lead + h + trail)
        i += 1
    html = ''.join(out)
    # tidy adjacent identical tags
    for tg in ('i', 'b', 'sup', 'sub'):
        html = html.replace(f'</{tg}><{tg}>', '')
    return html


def para_text(toks):
    return ''.join(t['t'] for t in toks)


# --------------------------------------------------------------------------------------
def main():
    pages = {p: page_lines(p) for p in range(1, 28)}
    all_lines = [l for p in pages.values() for l in p]
    vocab = build_vocab(all_lines)
    json.dump({str(p): [{k: v for k, v in l.items() if k not in ('toks', 'fonts')} for l in ls]
               for p, ls in pages.items()}, open('../raw/lines.json', 'w'), indent=0)
    return pages, vocab


if __name__ == '__main__':
    pages, vocab = main()
    print('lines', sum(len(v) for v in pages.values()))
