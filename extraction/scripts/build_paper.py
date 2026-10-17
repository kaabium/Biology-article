"""Step 4: paper_raw.json -> app/data/paper.js (+ extraction/paper.json).

Assigns stable IDs to every paragraph, groups them into sections, attaches figure
legends to figures/panels, parses references and the key resources table, and turns
blue link text into structured cross-references (figures, supplementary items,
citations). Only extraction artifacts are changed; wording is verbatim.
"""
import json, re, html as htmllib, collections, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
RAW = json.load(open(os.path.join(ROOT, 'extraction', 'paper_raw.json')))
LINES = json.load(open(os.path.join(ROOT, 'extraction', 'raw', 'lines.json')))
FIXLOG = []


def printed_page(p):
    if p == 1:
        return 'cover'
    if p <= 19:
        return str(p - 1)
    return 'e' + str(p - 19)


def slug(s):
    s = re.sub(r'<[^>]+>', '', s).lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s[:40].rstrip('-')


def strip_tags(h):
    h = re.sub(r'<br\s*/?>', ' ', h)
    return htmllib.unescape(re.sub(r'<[^>]+>', '', h))


def plain_no_cites(h):
    h = re.sub(r'<(sup|span) class="cite"[^>]*>.*?</\1>', '', h)
    return strip_tags(h)


def norm_quotes(h):
    # the PDF encodes double quotes as two single-quote glyphs
    n = h.count('‘‘') + h.count('’’')
    h = h.replace('‘‘', '“').replace('’’', '”')
    return h, n


def merge_bold(h):
    # <b>a</b> <b><i>b</i></b> -> <b>a <i>b</i></b>
    prev = None
    while prev != h:
        prev = h
        h = re.sub(r'</b>(\s*)<b>', r'\1', h)
    return h


TOC_LINKS = {'KEY RESOURCES TABLE': 'm-krt', 'RESOURCE AVAILABILITY': 'm-resource',
             'EXPERIMENTAL MODEL AND SUBJECT DETAILS': 'm-expmodel', 'METHOD DETAILS': 'm-details',
             'QUANTIFICATION AND STATISTICAL ANALYSIS': 'm-quant'}
SUPP_ITEMS = ('Figure', 'Figures', 'Table', 'Tables', 'Data', 'File')


def xrefs(h):
    """Turn blue link spans into structured cross-references."""
    out = []
    pos = 0
    last_kind = None
    for m in re.finditer(r'<span class="lk">(.*?)</span>', h):
        out.append(h[pos:m.start()])
        inner = m.group(1)
        txt = strip_tags(inner)
        after = h[m.end():]
        mm = re.match(r'^(Figures?|Tables?|Data|File)?\s*(S?)(\d+)$', txt)
        if mm and (mm.group(1) or last_kind):
            kind = mm.group(1) or last_kind
            last_kind = kind
            supp = mm.group(2) == 'S'
            num = mm.group(3)
            # panel letters immediately after the link (A, A–2C, A–S2F)
            pm = re.match(r'^([A-L])(?:–(S?\d+)?([A-L]))?', after)
            panels = ''
            consumed = ''
            if pm and kind.startswith('Figure'):
                consumed = pm.group(0)
                a = pm.group(1)
                b = pm.group(3)
                panels = a if not b else ''.join(chr(c) for c in range(ord(a), ord(b) + 1))
            label = txt + consumed
            kind1 = 'Figure' if kind.startswith('Figure') else ('Table' if kind.startswith('Table') else kind)
            if supp or kind1 in ('Data', 'File') or kind1 == 'Table':
                target = f'{kind1} S{num}' if supp else f'{kind1} {num}'
                out.append(f'<a class="xref supp" data-supp="{target}" data-panels="{panels}">{label}</a>')
            else:
                out.append(f'<a class="xref fig" data-fig="fig{num}" data-panels="{panels}">{label}</a>')
            pos = m.end() + len(consumed)
            continue
        last_kind = None
        if re.match(r'^(https?://|www\.|[a-z0-9.-]+\.(org|com|eu|ie)\b)', txt):
            href = txt if txt.startswith('http') else 'https://' + txt
            out.append(f'<a class="ext" href="{htmllib.escape(href)}" target="_blank" rel="noopener">{inner}</a>')
        elif re.match(r'^[\w.]+@[\w.]+$', txt):
            out.append(f'<a class="ext" href="mailto:{txt}">{inner}</a>')
        elif txt in ('STAR Methods', 'Method Details'):
            out.append(f'<a class="xref sec" data-sec="{"methods" if txt == "STAR Methods" else "m-details"}">{inner}</a>')
        elif txt in TOC_LINKS:
            out.append(f'<a class="xref sec" data-sec="{TOC_LINKS[txt]}">{inner}</a>')
        elif txt == 'key resources table':
            out.append(f'<a class="xref sec" data-sec="m-krt">{inner}</a>')
        elif txt == 'lead contact':
            out.append(f'<a class="xref sec" data-sec="m-lead-contact">{inner}</a>')
        else:
            out.append(f'<span class="lk">{inner}</span>')
        pos = m.end()
    out.append(h[pos:])
    return ''.join(out)


def finish(h):
    h = re.sub(r'</span>(\s*)<span class="lk">', r'\1', h)
    h, nq = norm_quotes(h)
    h = merge_bold(h)
    h = xrefs(h)
    return h, nq


# ---------------------------------------------------------------------------------------------
blocks = []       # reading-order blocks
sections = []     # section index
QUOTES = [0]


def add_section(sid, title, level, parent, kind='main'):
    sections.append({'id': sid, 'title': title, 'level': level, 'parent': parent, 'kind': kind})


def add_block(bid, sec, typ, html, pages, extra=None):
    h, nq = finish(html)
    QUOTES[0] += nq
    b = {'id': bid, 'sec': sec, 'type': typ, 'html': h, 'text': plain_no_cites(h),
         'pages': pages, 'printed': [printed_page(p) for p in pages]}
    if extra:
        b.update(extra)
    blocks.append(b)
    return b


# ---- cover page (PDF page 1)
def cover():
    L = LINES['1']
    def txt(pred):
        return [l for l in L if pred(l)]
    add_section('cover', 'Cover page', 1, None, 'front')
    add_block('cover-title', 'cover', 'title', 'Multi-hallmark long noncoding RNA maps reveal non-small cell lung cancer vulnerabilities', [1])
    add_block('cover-authors', 'cover', 'p', '<b>Authors</b><br>Roberta Esposito, Taisia Polidori, Dominik F. Meise, ..., Adrian F. Ochsenbein, Carsten Riether, Rory Johnson', [1])
    add_block('cover-correspondence', 'cover', 'p', '<b>Correspondence</b><br><span class="lk">rory.johnson@ucd.ie</span>', [1])
    add_block('cover-inbrief', 'cover', 'p', '<b>In brief</b><br>Esposito, Polidori, and colleagues present a CRISPR-based pipeline to comprehensively map functional long noncoding RNAs across disease hallmarks of KRAS<sup>+</sup> non-small cell lung cancer. This reveals therapeutic vulnerabilities that could be targeted by potent antisense oligonucleotide inhibitors in a range of tumor models.', [1])
    add_block('cover-highlight-1', 'cover', 'li', 'CRISPR-based screening pipeline for lncRNAs promoting multiple cancer hallmarks', [1], {'label': 'Highlights'})
    add_block('cover-highlight-2', 'cover', 'li', 'Comprehensive, multi-dimensional functional map of lncRNAs in KRAS<sup>+</sup> NSCLC', [1], {'label': 'Highlights'})
    add_block('cover-highlight-3', 'cover', 'li', 'lncRNA vulnerabilities can be targeted by ASOs in 2D and 3D tumor models', [1], {'label': 'Highlights'})
    add_block('cover-citation', 'cover', 'p', 'Esposito et al., 2022, Cell Genomics <i>2</i>, 100171<br>September 14, 2022 © 2022 The Author(s).<br><span class="lk">https://doi.org/10.1016/j.xgen.2022.100171</span>', [1])
    # verify the hand-assembled cover text against the extracted lines (words must all be present)
    cover_words = re.findall(r'[A-Za-z]{4,}', ' '.join(l['text'] for l in L))
    cover_words = set(w.lower() for w in cover_words)
    for b in blocks:
        if b['sec'] != 'cover':
            continue
        for w in re.findall(r'[A-Za-z]{4,}', b['text']):
            wl = w.lower()
            if wl not in cover_words and wl not in ('hallmarks', 'cancer', 'vulnerabilities', 'highlights', 'authors', 'correspondence'):
                # words split by hyphenation on the cover are checked by halves
                if not any(wl.startswith(c) for c in cover_words if len(c) >= 4):
                    FIXLOG.append(f'COVER CHECK: word {w!r} not found on page 1')


def front():
    add_section('front', 'Title, authors and affiliations', 1, None, 'front')
    add_block('front-title', 'front', 'title', 'Multi-hallmark long noncoding RNA maps reveal non-small cell lung cancer vulnerabilities', [2])
    # authors: all 8.97-size lines in reading order
    L = [l for l in LINES['2'] if 170 < l['by'] < 220]
    L.sort(key=lambda l: (round(l['by']), l['x0']))
    paras = RAW['paras']['front']
    # use the html runs from the raw paragraphs (they carry the superscripts) in y/x order
    auth = [p for p in paras if re.search(r'<sup', p['html']) and not re.match(r'^<sup', p['html'])]
    auth.sort(key=lambda p: (round(p['lines'][0]['by']), p['lines'][0]['x0']))
    names_html = ' '.join(p['html'] for p in auth)
    names_html = re.sub(r'<sup class="cite" data-refs="[^"]*" data-unlinked="1">([^<]*)</sup>', r'<sup class="aff">\1</sup>', names_html)
    names_html = names_html.replace('</sup>*', '</sup><sup class="aff">*</sup>')
    add_block('front-authors', 'front', 'p', names_html, [2])
    affs = [p for p in paras if re.match(r'^<sup', p['html'])]
    # affiliation 8 and 10 continue on the next line
    cont = {p['html']: p for p in paras if p['html'] in ('518057, China', 'Spain')}
    n = 0
    for p in paras:
        h = p['html']
        if re.match(r'^<sup', h):
            n += 1
            h = re.sub(r'^<sup class="cite" data-refs="(\d+)" data-unlinked="1">(\d+)</sup>', r'<sup class="aff">\2</sup>', h)
            add_block(f'front-affil-{n}', 'front', 'aff', h, [2])
        elif h in ('518057, China', 'Spain'):
            blocks[-1]['html'] += ' ' + h
            blocks[-1]['text'] += ' ' + h
    add_block('front-correspondence', 'front', 'p', '*Correspondence: <span class="lk">rory.johnson@ucd.ie</span>', [2])
    add_block('front-doi', 'front', 'p', '<span class="lk">https://doi.org/10.1016/j.xgen.2022.100171</span>', [2])
    add_block('front-license', 'front', 'p', 'Cell Genomics <i>2</i>, 100171, September 14, 2022 © 2022 The Author(s).<br>This is an open access article under the CC BY-NC-ND license (<span class="lk">http://creativecommons.org/licenses/by-nc-nd/4.0/</span>).', [2])


RES_IDS = {
    'A versatile CRISPR screening pipeline for lncRNAs in NSCLC': 'res-pipeline',
    'Multi-phenotype mapping of NSCLC lncRNAs': 'res-multipheno',
    'Screen hits can be validated and function via RNA products': 'res-validation',
    'Multi-hallmark screen integration for target discovery': 'res-integration',
    'RNA therapeutics targeting NSCLC lncRNAs': 'res-aso',
    'CHiLL1 and GCAWKR ASOs regulate cancer hallmarks via distinct modes of action': 'res-mechanism',
}
TOP = {'SUMMARY': ('summary', 'Summary'), 'INTRODUCTION': ('intro', 'Introduction'), 'RESULTS': ('results', 'Results'),
       'DISCUSSION': ('discussion', 'Discussion'), 'STAR★METHODS': ('starmethods-toc', 'STAR★Methods (contents list)'),
       'SUPPLEMENTAL INFORMATION': ('suppinfo', 'Supplemental information')}


def body():
    paras = RAW['paras']['summary'] + RAW['paras']['body']
    sec = None
    counts = collections.Counter()
    for p in paras:
        t = strip_tags(p['html']).strip()
        if p['heading']:
            if t in TOP:
                sid, title = TOP[t]
                add_section(sid, title, 1, None)
                sec = sid
                add_block(f'{sid}-h', sid, 'h1', p['html'], p['pages'])
            elif t in RES_IDS:
                sid = RES_IDS[t]
                add_section(sid, t, 2, 'results')
                sec = sid
                add_block(f'{sid}-h', sid, 'h2', p['html'], p['pages'])
            elif t == 'Limitations of the study':
                add_section('limitations', 'Limitations of the study', 2, 'discussion')
                sec = 'limitations'
                add_block('limitations-h', 'limitations', 'h2', p['html'], p['pages'])
            else:
                raise SystemExit('unknown heading ' + t)
            continue
        counts[sec] += 1
        typ = 'li' if t.startswith(('●', '○')) else 'p'
        extra = {}
        if typ == 'li':
            extra['level'] = 1 if t.startswith('●') else 2
            p['html'] = re.sub(r'^[●○]\s*', '', p['html'])
        extra['pos'] = p['lines'][0]
        add_block(f'{sec}-p{counts[sec]}', sec, typ, p['html'], p['pages'], extra)


def back():
    names = {'ACKNOWLEDGMENTS': ('ack', 'Acknowledgments'), 'AUTHOR CONTRIBUTIONS': ('contrib', 'Author contributions'),
             'DECLARATION OF INTERESTS': ('decl', 'Declaration of interests'), 'REFERENCES': ('refs', 'References')}
    sec = None
    for p in RAW['paras']['back']:
        t = strip_tags(p['html']).strip()
        if p['heading']:
            sid, title = names[t]
            add_section(sid, title, 1, None, 'back')
            sec = sid
            add_block(f'{sid}-h', sid, 'h1', p['html'], p['pages'])
            continue
        if t.startswith('Received:'):
            add_section('dates', 'Article history', 1, None, 'back')
            h = p['html'].replace(' Revised:', '<br>Revised:').replace(' Accepted:', '<br>Accepted:').replace(' Published:', '<br>Published:')
            add_block('dates-p1', 'dates', 'p', h, p['pages'])
            continue
        add_block(f'{sec}-p1', sec, 'p', p['html'], p['pages'])


def references():
    refs = []
    for p in RAW['paras']['refs']:
        h = p['html']
        h = re.sub(r'^<span class="lk">', '', h)
        m = re.match(r'^(\d+)\.\s*', strip_tags(h))
        n = int(m.group(1))
        # remove the leading number (it may sit inside a link span)
        h2 = re.sub(r'^(<span class="lk">)?\d+\.\s*', r'\1', p['html'])
        h2 = re.sub(r'<span class="lk">(.*?)</span>', r'\1', h2)   # whole reference is blue in the PDF
        h2, nq = norm_quotes(h2)
        QUOTES[0] += nq
        text = strip_tags(h2)
        doi = re.search(r'https?://doi\.org/\S+', text)
        refs.append({'n': n, 'html': h2, 'text': text, 'pages': p['pages'], 'printed': [printed_page(x) for x in p['pages']],
                     'doi': doi.group(0).rstrip('.') if doi else None})
    assert [r['n'] for r in refs] == list(range(1, len(refs) + 1)), 'reference numbering broken'
    return refs


def legends():
    figs = []
    for k in sorted(RAW['paras']):
        if not k.startswith('legend:'):
            continue
        fid = k.split(':')[1]
        num = int(fid[3:])
        paras = RAW['paras'][k]
        title = paras[0]
        th, _ = finish(title['html'])
        th = re.sub(r'^<b>Figure \d\.\s*', '<b>', th)
        fig = {'id': fid, 'num': num, 'titleHtml': th, 'title': strip_tags(th).strip(), 'pages': sorted(set(x for p in paras for x in p['pages'])),
               'panels': [], 'notes': []}
        for p in paras[1:]:
            h, nq = finish(p['html'])
            QUOTES[0] += nq
            t = strip_tags(h)
            m = re.match(r'^\(([A-L])\)\s', t)
            if m:
                fig['panels'].append({'id': f'{fid}{m.group(1)}', 'letter': m.group(1), 'legendHtml': h,
                                      'legend': plain_no_cites(h), 'pages': p['pages'], 'pos': p['lines'][0]})
            else:
                fig['notes'].append({'html': h, 'text': plain_no_cites(h), 'pages': p['pages']})
        figs.append(fig)
    return figs


METHOD_TOP = {'KEY RESOURCES TABLE': ('m-krt', 'Key resources table'), 'RESOURCE AVAILABILITY': ('m-resource', 'Resource availability'),
              'EXPERIMENTAL MODEL AND SUBJECT DETAILS': ('m-expmodel', 'Experimental model and subject details'),
              'METHOD DETAILS': ('m-details', 'Method details'),
              'QUANTIFICATION AND STATISTICAL ANALYSIS': ('m-quant', 'Quantification and statistical analysis')}


METHOD_IDS = {
    'Lead contact': 'm-lead-contact', 'Materials availability': 'm-materials', 'Data and code availability': 'm-data',
    'Lentivirus and stable cell line production': 'm-lentivirus', 'DECKO and lentiviral production': 'm-decko',
    'Library design': 'm-library-design', 'Library cloning': 'm-library-cloning',
    'Lentiviral titer calculation and infection': 'm-titer', 'CRISPR screens': 'm-screens',
    'Proliferation': 'm-screen-prolif', 'Cisplatin screen': 'm-screen-cisplatin', 'Migration screen': 'm-screen-migration',
    'Genomic DNA preparation and sequencing': 'm-gdna', 'Screen hit identification and prioritization': 'm-hits',
    'Public RNA-sequencing data': 'm-public-rnaseq', 'PCR amplification from genomic DNA': 'm-pcr-gdna',
    'Competition assay': 'm-competition', 'Patient-derived xenograft organoids': 'm-pdx',
    'Antisense oligonucleotides': 'm-aso', '2D cell viability assay': 'm-viability-2d', '3D cell viability assay': 'm-viability-3d',
    'Rescue experiments': 'm-rescue', 'Apoptosis assay': 'm-apoptosis', 'Cell cycle assay': 'm-cellcycle',
    'Low-throughput migration assay': 'm-migration-assay', 'RNA isolation and RT–qPCR': 'm-qpcr',
    'RNA-sequencing and analysis': 'm-rnaseq', 'FISH and cell fractionation': 'm-fish',
    'ezTracks visualization of RNA elements': 'm-eztracks', 'Copy number status of pan-hallmark candidates': 'm-cnv',
}


def methods():
    sec = None
    parent = None
    counts = collections.Counter()
    sub_parent = None
    for p in RAW['paras']['methods']:
        t = strip_tags(p['html']).strip()
        if p['heading']:
            if t == 'STAR★METHODS':
                add_section('methods', 'STAR★Methods', 1, None, 'methods')
                add_block('methods-h', 'methods', 'h1', p['html'], p['pages'])
                sec = parent = 'methods'
                continue
            if t in METHOD_TOP:
                sid, title = METHOD_TOP[t]
                add_section(sid, title, 2, 'methods', 'methods')
                add_block(f'{sid}-h', sid, 'h2', p['html'], p['pages'])
                sec = parent = sid
                continue
            italic = '<i>' in p['html']
            sid = METHOD_IDS.get(t) or ('m-' + slug(t))
            if italic:
                add_section(sid, t, 4, sub_parent, 'methods')
                add_block(f'{sid}-h', sid, 'h4', p['html'], p['pages'])
            else:
                add_section(sid, t, 3, parent, 'methods')
                add_block(f'{sid}-h', sid, 'h3', p['html'], p['pages'])
                sub_parent = sid
            sec = sid
            continue
        counts[sec] += 1
        typ = 'li' if t.startswith('●') else 'p'
        extra = {'level': 1} if typ == 'li' else {}
        h = re.sub(r'^[●]\s*', '', p['html'])
        add_block(f'{sec}-p{counts[sec]}', sec, typ, h, p['pages'], extra)


def krt():
    """Rows of the key resources table: [{category, rows:[{id, cells:[html,html,html], page}]}]"""
    out = []
    for cells in RAW['krt']:
        # cluster by baseline
        rows = []
        for c in cells:
            if re.fullmatch(r'\d', c['text'].strip()) and c['col'] == 1:
                c['by'] += 3.3   # superscript citation glyphs sit above their row's baseline
        for c in sorted(cells, key=lambda c: (c['by'], c['col'], c['x0'])):
            if c['text'].strip() in ('Continued',):
                continue
            if rows and abs(rows[-1]['by'] - c['by']) < 1.2:
                rows[-1]['cells'].append(c)
            else:
                rows.append({'by': c['by'], 'cells': [c], 'page': c['page']})
        for r in rows:
            cols = {0: [], 1: [], 2: []}
            for c in sorted(r['cells'], key=lambda c: c['x0']):
                cols[c['col']].append(c)
            r['cols'] = cols
        cur_cat = None
        prev_row = None
        for r in rows:
            cols = r['cols']
            t0 = ' '.join(c['text'] for c in cols[0]).strip()
            if t0 == 'REAGENT or RESOURCE':
                continue
            if cols[0] and all(c['cat'] for c in cols[0]) and not cols[1] and not cols[2]:
                cur_cat = {'category': t0, 'rows': []}
                out.append(cur_cat)
                prev_row = None
                continue
            def cell_html(cs):
                h = ''
                for c in cs:
                    piece = c['html']
                    if h and not strip_tags(h).endswith(('-', '/')) and not re.match(r'^<sup', piece) and \
                            not (re.fullmatch(r'\d', strip_tags(piece)) and re.search(r'\d</span>$', h)):
                        h += ' '
                    h += piece
                return h
            is_cont = prev_row is not None and (r['by'] - prev_row['by'] < 11.0) and \
                sum(1 for k in (0, 1, 2) if cols[k]) == 1 and not (cols[2])
            if is_cont:
                for k in (0, 1, 2):
                    if cols[k]:
                        add = cell_html(cols[k])
                        base = prev_row['cells'][k]
                        sep = '' if strip_tags(base).endswith(('-', '/')) else ' '
                        prev_row['cells'][k] = base + sep + add
                prev_row['by'] = r['by']
                continue
            row = {'cells': [cell_html(cols[0]), cell_html(cols[1]), cell_html(cols[2])], 'page': r['page'], 'by': r['by']}
            cur_cat['rows'].append(row)
            prev_row = row
    # tidy: the CRISPETa source is a superscript citation (92) set in a tiny font
    n = 0
    for cat in out:
        for row in cat['rows']:
            n += 1
            row['id'] = f'krt-{n}'
            for k in range(3):
                h = row['cells'][k]
                if strip_tags(h).replace(' ', '') == '92' and 'CRISPETa' in row['cells'][0]:
                    row['cells'][k] = '<sup class="cite" data-refs="92">92</sup>'
                    FIXLOG.append('KRT: CRISPETa source is the superscript citation 92 (two tiny glyphs merged)')
                h2, nq = finish(row['cells'][k])
                row['cells'][k] = h2
            row['text'] = ' | '.join(strip_tags(c) for c in row['cells'])
            del row['by']
    return out


cover()
front()
body()
back()
REFS = references()
FIGS = legends()
methods()
KRT = krt()

# place figure blocks after the first paragraph that cites them
first_cite = {}
for b in blocks:
    for m in re.finditer(r'data-fig="(fig\d)"', b['html']):
        first_cite.setdefault(m.group(1), b['id'])
ordered = []
for b in blocks:
    ordered.append(b)
    for f in FIGS:
        if first_cite.get(f['id']) == b['id']:
            ordered.append({'id': f'{f["id"]}-block', 'sec': b['sec'], 'type': 'figure', 'fig': f['id'], 'pages': f['pages'],
                            'printed': [printed_page(x) for x in f['pages']], 'html': '', 'text': ''})
blocks = ordered

# unique IDs
ids = [b['id'] for b in blocks]
dups = [i for i, c in collections.Counter(ids).items() if c > 1]
assert not dups, dups

GA = {'id': 'ga', 'title': 'Graphical abstract', 'pages': [1], 'printed': ['cover'],
      'note': 'The graphical abstract has no panel letters and no legend in the PDF.'}

meta = {
    'title': 'Multi-hallmark long noncoding RNA maps reveal non-small cell lung cancer vulnerabilities',
    'authorsShort': 'Esposito R, Polidori T, Meise DF, et al.',
    'journal': 'Cell Genomics', 'volume': '2', 'article': '100171', 'date': 'September 14, 2022', 'year': 2022,
    'doi': '10.1016/j.xgen.2022.100171',
    'citation': 'Esposito, R., Polidori, T., Meise, D.F., Pulido-Quetglas, C., Chouvardas, P., Forster, S., et al. (2022). Multi-hallmark long noncoding RNA maps reveal non-small cell lung cancer vulnerabilities. Cell Genomics 2, 100171. https://doi.org/10.1016/j.xgen.2022.100171',
    'license': '© 2022 The Author(s). Open access article under the CC BY-NC-ND 4.0 license (http://creativecommons.org/licenses/by-nc-nd/4.0/). Used here for personal, non-commercial study.',
    'pdfPages': 27,
}

paper = {'meta': meta, 'sections': sections, 'blocks': blocks, 'figures': FIGS, 'ga': GA, 'references': REFS, 'krt': KRT}
os.makedirs(os.path.join(ROOT, 'app', 'data'), exist_ok=True)
json.dump(paper, open(os.path.join(ROOT, 'extraction', 'paper.json'), 'w'), indent=1, ensure_ascii=False)
with open(os.path.join(ROOT, 'app', 'data', 'paper.js'), 'w') as f:
    f.write('/* Generated by extraction/scripts/build_paper.py from the PDF text layer. Do not edit by hand. */\n')
    f.write('window.PAPER = ')
    import copy
    pj = copy.deepcopy(paper)
    for b in pj['blocks']:
        b.pop('pos', None)
    for fg in pj['figures']:
        for pn in fg['panels']:
            pn.pop('pos', None)
    json.dump(pj, f, ensure_ascii=False)
    f.write(';\n')
json.dump({'fixlog': FIXLOG, 'quote_pairs_normalized': QUOTES[0]}, open(os.path.join(ROOT, 'extraction', 'raw', 'build_log.json'), 'w'), indent=1)
print('blocks', len(blocks), 'sections', len(sections), 'figs', len(FIGS), 'panels', sum(len(f['panels']) for f in FIGS),
      'refs', len(REFS), 'krt rows', sum(len(c['rows']) for c in KRT), 'quotes', QUOTES[0])
print('\n'.join(FIXLOG))
