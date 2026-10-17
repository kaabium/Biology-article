"""Step 1 of the text pipeline: characters -> corrected glyphs -> line fragments.

Every glyph from the PDF text layer is first passed through a *font-aware* map that
restores the printed character (the text layer of this PDF stores symbols from
special fonts as wrong ASCII letters or unmapped CIDs, e.g. '3' for x, '(cid:1)' for -).
Line fragments are then built per page, superscripts/subscripts are attached to the
line they belong to, and inter-word spaces are inferred from glyph gaps (the PDF
has no explicit space characters).
"""
import json, unicodedata

# (font, glyph) -> printed character. Verified against the rendered pages (see extraction/QA.md).
FONT_MAP = {
    ('AdvP4C4E74', '(cid:1)'): '−',  # minus sign
    ('AdvP4C4E74', '(cid:3)'): '∼',  # tilde operator "approximately" (~)
    ('AdvP4C4E74', '(cid:4)'): '°',  # degree sign
    ('AdvP4C4E74', '0'): '′',        # prime (5', 3')
    ('AdvP7DED', '3'): '×',          # multiplication sign
    ('AdvPS3F4C13', 'm'): 'µ',       # micro sign
    ('AdvPS3F4C13', 'b'): 'β',       # beta
    ('AdvPS3F4C13', 'g'): 'γ',       # gamma
    ('AdvPS480274', '+'): '★',       # black star (STAR*METHODS)
    ('AdvPS480274', 'B'): '○',       # white circle bullet
    ('AdvPSMPi6', 'd'): '●',         # black circle bullet
    ('AdvPSSym', 'ª'): '©',     # copyright sign
    ('AdvPSSym', '(cid:2)'): '®',    # registered sign
    ('AdvPS4731B1', 'R'): '≥',       # greater-than or equal
    ('AdvPS4731B1', '%'): '≤',       # less-than or equal
}
LIGATURES = {'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬀ': 'ff', 'ﬃ': 'ffi', 'ﬄ': 'ffl'}
SPACING_ACCENTS = {'´': '́', '¨': '̈', '`': '̀', 'ˆ': '̂',
                   '˜': '̃', 'ˇ': '̌', '¸': '̧'}
# glyphs that are typeset small but belong to the normal text flow (not superscripts)
INLINE_SMALL = {('AdvP4C4E74', '(cid:4)'), ('AdvP4C4E74', '0'), ('AdvPSMPi6', 'd'), ('AdvPS480274', 'B')}

ITALIC_FONTS = ('italic', '-HI', '-MI', '-bi')
BOLD_FONTS = ('AdvPSHN-H', 'AdvPSA189', 'Helvetica-Bold', '-bi', 'AdvPSHN-M')


def load(path):
    return json.load(open(path))


def fix_glyphs(chars, log):
    out = []
    for c in chars:
        key = (c['f'], c['t'])
        c = dict(c)
        c['orig'] = c['t']
        if key in FONT_MAP:
            c['t'] = FONT_MAP[key]
            c['fixed'] = True
        elif c['t'].startswith('(cid:'):
            log.append(f"UNMAPPED glyph {key}")
        if c['t'] in LIGATURES:
            c['t'] = LIGATURES[c['t']]
        c['inline_small'] = key in INLINE_SMALL
        out.append(c)
    return out


def is_italic(f):
    return any(k in f for k in ITALIC_FONTS)


def is_bold(f):
    return f.startswith('AdvPSHN-H') or f.startswith('AdvPSA189') or f.startswith('Helvetica-Bold') or f.endswith('-bi') or f.startswith('AdvPSHN-M')


def main_size(c):
    return c['s'] >= 6.7 or c.get('inline_small')


def build_fragments(chars, gap_split=7.0):
    """Group main-size glyphs into horizontal fragments (same baseline, no big x gap).

    Uses the true text baseline ('by', from the glyph matrix) so that fonts with
    different descents (regular vs italic) still land on the same line.
    """
    main = [c for c in chars if main_size(c) and c['up']]
    small = [c for c in chars if not main_size(c) and c['up']]
    main_reg = [c for c in main if not c.get('inline_small')]
    rows = []
    for c in sorted(main_reg, key=lambda c: c['by']):
        if rows and abs(rows[-1]['by'] - c['by']) < 1.0:
            rows[-1]['chars'].append(c)
        else:
            rows.append({'by': c['by'], 'chars': [c]})
    frags = []
    for r in rows:
        cs = sorted(r['chars'], key=lambda c: c['x0'])
        cur = [cs[0]]
        for a, b in zip(cs, cs[1:]):
            if b['x0'] - a['x1'] > gap_split:
                frags.append(cur); cur = [b]
            else:
                cur.append(b)
        frags.append(cur)
    F = []
    for cs in frags:
        sizes = [c['s'] for c in cs]
        F.append({'chars': cs, 'x0': min(c['x0'] for c in cs), 'x1': max(c['x1'] for c in cs),
                  'top': min(c['top'] for c in cs), 'bot': max(c['bot'] for c in cs),
                  'by': sorted(c['by'] for c in cs)[len(cs) // 2],
                  'size': max(set(sizes), key=sizes.count)})
    extra = [c for c in main if c.get('inline_small')] + small
    orphans = []
    for c in extra:
        best = None
        for f in F:
            gs = 16.0 if c['t'] in ('\u25cf', '\u25cb') else gap_split
            if f['by'] - 0.75 * f['size'] <= c['by'] <= f['by'] + 0.45 * f['size'] and \
               f['x0'] - gs <= c['x0'] <= f['x1'] + gs:
                d = abs(c['by'] - f['by']) + 0.01 * min(abs(c['x0'] - f['x1']), abs(f['x0'] - c['x1']))
                if best is None or d < best[0]:
                    best = (d, f)
        if best:
            f = best[1]
            if not c.get('inline_small'):
                if c['by'] < f['by'] - 0.8:
                    c['pos'] = 'sup'
                elif c['by'] > f['by'] + 0.8:
                    c['pos'] = 'sub'
            f['chars'].append(c)
            f['x0'] = min(f['x0'], c['x0']); f['x1'] = max(f['x1'], c['x1'])
        else:
            orphans.append(c)
    for c in orphans:
        F.append({'chars': [c], 'x0': c['x0'], 'x1': c['x1'], 'top': c['top'], 'bot': c['bot'],
                  'by': c['by'], 'size': c['s'], 'orphan': True})
    for f in F:
        f['chars'].sort(key=lambda c: c['x0'])
    F.sort(key=lambda f: (round(f['by'], 1), f['x0']))
    return F


def compose_accents(cs):
    """Merge spacing accents (typeset as separate glyphs over a letter) into the letter."""
    out = []
    i = 0
    while i < len(cs):
        c = cs[i]
        if c['t'] in SPACING_ACCENTS:
            comb = SPACING_ACCENTS[c['t']]
            mid = (c['x0'] + c['x1']) / 2
            # the base letter is the neighbour whose x-range contains the accent's centre
            cand = []
            if out and out[-1]['x0'] - 0.6 <= mid <= out[-1]['x1'] + 0.6:
                cand.append(('prev', out[-1]))
            if i + 1 < len(cs) and cs[i + 1]['x0'] - 0.6 <= mid <= cs[i + 1]['x1'] + 0.6:
                cand.append(('next', cs[i + 1]))
            if cand:
                which, base = cand[0]
                b = base['t'].replace('ı', 'i')
                new = dict(base)
                new['t'] = unicodedata.normalize('NFC', b + comb)
                new['x0'] = min(base['x0'], c['x0']); new['x1'] = max(base['x1'], c['x1'])
                new['accent_fixed'] = True
                if which == 'prev':
                    out[-1] = new
                    i += 1
                else:
                    out.append(new)
                    i += 2
                continue
        if c['t'] == 'ı':
            c = dict(c); c['t'] = 'i'
        out.append(c)
        i += 1
    return out


def fragment_text(f, markup=True):
    """Return (plain_text, html) for a fragment, inserting spaces from glyph gaps."""
    cs = compose_accents(f['chars'])
    plain, html = [], []
    prev = None
    cur_tag = None
    for c in cs:
        if prev is not None:
            gap = c['x0'] - prev['x1']
            ref = max(prev['s'], c['s']) if (prev.get('pos') or c.get('pos')) else min(prev['s'], c['s'])
            thr = max(0.55, 0.065 * ref)
            if gap > thr:
                plain.append(' ')
                # close tags before a space
                if cur_tag:
                    html.append('</%s>' % cur_tag); cur_tag = None
                html.append(' ')
        tag = c.get('pos')
        it = is_italic(c['f'])
        want = tag
        if want != cur_tag:
            if cur_tag:
                html.append('</%s>' % cur_tag)
            if want:
                html.append('<%s>' % want)
            cur_tag = want
        t = c['t']
        esc = t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        plain.append(t)
        html.append(esc)
        prev = c
    if cur_tag:
        html.append('</%s>' % cur_tag)
    return ''.join(plain), ''.join(html)
