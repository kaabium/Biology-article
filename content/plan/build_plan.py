"""Builds content/plan.json, app/data/curriculum.js and CURRICULUM.md from the track files.
Run:  python3 content/plan/build_plan.py"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)
import track_a, track_b, track_c, track_d, track_efh

OLD_LESSONS = track_a.LESSONS + track_b.LESSONS + track_c.LESSONS + track_d.LESSONS + track_efh.LESSONS
assert len({l['id'] for l in OLD_LESSONS}) == len(OLD_LESSONS), 'duplicate lesson id'
import merge  # lean curriculum: the fine-grained lessons are merged into ~41 lessons (see merge.py)
LESSONS, OLD2NEW = merge.apply(OLD_LESSONS)
BYID = {l['id']: l for l in LESSONS}
json.dump(OLD2NEW, open(os.path.join(HERE, 'merge_map.json'), 'w'), indent=1)

TRACKS = [
 {'id': 'A', 'title': 'The paper in 5 minutes', 'desc': 'The whole study as a simple story, in plain words only, with a one-page map and the 831 → 80 → 9 → 5 → 2 funnel.'},
 {'id': 'B', 'title': 'Biology from zero', 'desc': 'Cells, DNA, genes, RNA, proteins, and long noncoding RNAs — everything you need before the paper makes sense.'},
 {'id': 'C', 'title': 'Cancer from zero', 'desc': 'What cancer is, lung cancer, KRAS, cisplatin, cell lines vs normal cells, 3D models, mice, and patient datasets.'},
 {'id': 'D', 'title': 'Lab tools from zero', 'desc': 'CRISPR, viruses, pooled screens, ASOs and every validation assay in the paper, plus RNA-seq and pathways.'},
 {'id': 'E', 'title': 'Numbers & statistics from zero', 'desc': 'CPM/TPM/FPKM, fold change and log2, replicates, correlation, p-values, FDR, ROC/AUC and the paper\'s TPP pipeline.'},
 {'id': 'F', 'title': 'How to read figures', 'desc': 'One mini-lesson per chart type in the paper, each practised on a real panel.'},
 {'id': 'G', 'title': 'The paper, section by section', 'desc': 'The core: every paragraph (verbatim) with Plain English, why it matters, prerequisites and check questions, plus a guide to every figure panel.'},
 {'id': 'H', 'title': 'Critical thinking', 'desc': 'Claims and evidence, controls, alternative explanations, limitations, the patent, strengthening experiments, strengths vs weaknesses.'},
]

# ---- recommended path (prerequisite order, tracks interleaved only where a later track is needed)
PATH = merge.PATH
assert sorted(x for x in PATH if x[0] != 'G') == sorted(BYID), set(BYID) ^ set(x for x in PATH if x[0] != 'G')

# G units (Track G) — IDs must match the reading units of the app (see extraction/paper.json sections)
G_MAIN = ['summary', 'intro', 'res-pipeline', 'res-multipheno', 'res-validation', 'res-integration', 'res-aso', 'res-mechanism', 'discussion', 'limitations']
G_BACK = ['decl', 'contrib', 'ack']          # end matter that the H lessons use (declaration of interests)
G_METHODS = ['m-krt', 'm-lead-contact', 'm-materials', 'm-data', 'm-expmodel', 'm-lentivirus', 'm-decko', 'm-library-design', 'm-library-cloning', 'm-titer', 'm-screens', 'm-gdna',
             'm-hits', 'm-public-rnaseq', 'm-pcr-gdna', 'm-competition', 'm-pdx', 'm-aso', 'm-viability-2d', 'm-viability-3d', 'm-rescue', 'm-apoptosis',
             'm-cellcycle', 'm-migration-assay', 'm-qpcr', 'm-rnaseq', 'm-fish', 'm-eztracks', 'm-cnv', 'm-quant']

# ---- check prerequisites come earlier on the path
pos = {x: i for i, x in enumerate(PATH)}
firstG = pos['G-main']
for l in LESSONS:
    for p in l['prereqs']:
        assert p in BYID, (l['id'], p)
        assert pos[p] < pos[l['id']], f"prereq {p} of {l['id']} comes later on the path"

# ---- terms
TERMS = []
seen = {}
for l in LESSONS:
    for t in l['teaches']:
        assert t['id'] not in seen, ('duplicate term id', t['id'])
        seen[t['id']] = l['id']
        TERMS.append(t)
# the display name without its parenthetical is also a match string (except very generic words)
NO_CLEAN = {'mean', 'conservation', 'gate'}
for t in TERMS:
    clean = re.sub(r'\s*\(.*?\)', '', t['term']).strip()
    names = [a.lower() for a in t['aliases']]
    if clean and ' / ' not in clean and clean.lower() not in NO_CLEAN and clean.lower() not in names and clean != t['term']:
        t['aliases'].append(clean)
    elif clean and clean == t['term'] and clean.lower() not in NO_CLEAN and clean.lower() not in names:
        t['aliases'].append(clean)
# alias collisions (case-insensitive)
al = {}
for t in TERMS:
    for a in [t['term']] + t['aliases']:
        k = a.lower() if not t['cs'] else a
        if k in al and al[k] != t['id']:
            print('ALIAS COLLISION', repr(a), al[k], t['id'])
        al[k] = t['id']

plan = {
    'tracks': TRACKS,
    'lessons': [{k: v for k, v in l.items() if k != 'teaches'} | {'teaches': [t['id'] for t in l['teaches']]} for l in LESSONS],
    'terms': TERMS,
    'path': PATH,
    'g': {'main': G_MAIN, 'back': G_BACK, 'methods': G_METHODS},
}
json.dump(plan, open(os.path.join(ROOT, 'content', 'plan.json'), 'w'), indent=1, ensure_ascii=False)

# ---- app/data/curriculum.js (merged into the app at load)
cur = {
    'tracks': TRACKS,
    'lessons': [{'id': l['id'], 'track': l['track'], 'title': l['title'], 'minutes': l['minutes'], 'prereqs': l['prereqs'], 'goal': l['goal']} for l in LESSONS],
    'terms': [{k: t[k] for k in ('id', 'term', 'aliases', 'cat', 'kind', 'cs', 'taughtIn')} for t in TERMS],
    'path': PATH,
    'gMain': G_MAIN, 'gBack': G_BACK, 'gMethods': G_METHODS,
}
with open(os.path.join(ROOT, 'app', 'data', 'curriculum.js'), 'w') as f:
    f.write('/* Generated by content/plan/build_plan.py — lessons (metadata), glossary term metadata and the recommended path. Do not edit by hand. */\n')
    f.write('window.CURRICULUM = ' + json.dumps(cur, ensure_ascii=False) + ';\n')

print('lessons', len(LESSONS), 'terms', len(TERMS), 'path', len(PATH))

import make_md
