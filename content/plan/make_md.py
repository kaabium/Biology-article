"""Writes CURRICULUM.md from content/plan.json + extraction/paper.json (used-in-paper index)."""
import json, os, re, collections
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
plan = json.load(open(os.path.join(ROOT, 'content', 'plan.json')))
paper = json.load(open(os.path.join(ROOT, 'extraction', 'paper.json')))

texts = {}
for b in paper['blocks']:
    if b.get('text') and b['type'] != 'figure' and not b['sec'].startswith(('refs', 'cover', 'front')):
        texts[b['id']] = b['text']
for f in paper['figures']:
    for p in f['panels']:
        texts[p['id']] = p['legend']

def rx(t):
    names = sorted([n for n in [t['term']] + t['aliases'] if n], key=len, reverse=True)
    return re.compile(r"(^|[^\w-])(" + '|'.join(re.escape(n) for n in names) + r")(s|es)?(?![\w-])", 0 if t['cs'] else re.I)

lessons = {l['id']: l for l in plan['lessons']}
terms_by_lesson = collections.defaultdict(list)
for t in plan['terms']:
    terms_by_lesson[t['taughtIn']].append(t)
used = {}
for t in plan['terms']:
    r = rx(t)
    used[t['id']] = [i for i, x in texts.items() if r.search(x)]

def paras_for_lesson(lid):
    c = collections.Counter()
    for t in terms_by_lesson[lid]:
        for p in used[t['id']]:
            c[p] += 1
    return [p for p, _ in c.most_common(6)]

out = []
w = out.append
w('# CURRICULUM\n')
w('_Written before any lesson content (Phase 2, step 1). It lists every concept, term and method the paper uses, groups them into 5–10 minute lessons, and fixes the order so that **nothing is used before it is taught**. `content/plan/*.py` is the source; `python3 content/plan/build_plan.py` regenerates this file, `content/plan.json` and `app/data/curriculum.js`._\n')
w('Paper: Esposito, Polidori et al. (2022), *Cell Genomics* 2, 100171.\n')
w('## How the curriculum works\n')
w('* **Eight tracks** (A–H). Track G is the paper itself, section by section; tracks A–F teach everything G needs; track H is critical thinking.')
w('* **One idea per lesson**, each with an everyday analogy, an inline SVG diagram, "where this appears in the paper" links, and 3–5 check questions with explanations for right *and* wrong answers.')
w('* **Glossary-driven teaching.** Every term in the glossary has exactly one *home lesson* (`taughtIn`). A lesson may only use a glossary term if its home lesson is earlier on the recommended path, or the lesson explains the term inline (`defines`). `tools/validate.mjs` enforces this.')
w('* **Track A is plain words only**: every glossary term it uses is explained inline in one plain sentence.')
w('* **Recommended path** (below) is a prerequisite-respecting order; tracks interleave only where a later track is needed (e.g. fold change and replicates before the screens; p-values and FDR before pathway enrichment).')
w('* **Learning science used:** retrieval practice (check questions, flashcards, quizzes, "explain it back"), spaced repetition (SM-2-style flashcards, a living study planner), interleaving (mixed quizzes and mock exams), worked examples (statistics and fold-change lessons), words + pictures (every lesson has a diagram; every panel has a guide).\n')
w('## Tracks\n')
w('| Track | Title | Lessons | Minutes |')
w('|---|---|---|---|')
for t in plan['tracks']:
    ls = [l for l in plan['lessons'] if l['track'] == t['id']]
    mins = sum(l['minutes'] for l in ls)
    w(f"| {t['id']} | {t['title']} | {len(ls) if ls else 'by paragraph (126 paragraphs, 28 methods sections)'} | {mins if ls else '≈ 400'} |")
w('')
for t in plan['tracks']:
    ls = [l for l in plan['lessons'] if l['track'] == t['id']]
    w(f"### Track {t['id']} — {t['title']}\n")
    w(t['desc'] + '\n')
    if not ls:
        w('Units follow the paper (see "Track G units" below).\n')
        continue
    w('| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |')
    w('|---|---|---|---|---|---|')
    for l in ls:
        tl = ', '.join(t2['term'] for t2 in terms_by_lesson[l['id']]) or '—'
        pp = ', '.join(f'`{p}`' for p in paras_for_lesson(l['id'])) or '—'
        w(f"| {l['id']} | {l['title']} | {l['minutes']} | {', '.join(l['prereqs']) or '—'} | {tl} | {pp} |")
    w('')
w('### Track G units (the paper, section by section)\n')
w('Main text: ' + ' → '.join(f'`{u}`' for u in plan['g']['main']) + '.\n')
w('End matter: ' + ' → '.join(f'`{u}`' for u in plan['g']['back']) + ' (the declaration of interests is used by H7).\n')
w('STAR Methods: ' + ' → '.join(f'`{u}`' for u in plan['g']['methods']) + '.\n')
w('Every non-exempt paragraph gets: PAPER (verbatim) → PLAIN ENGLISH → Why it matters → basics you need (links) → 1–2 check questions. Every figure panel gets: the question it answers, how to read it, what it shows, key numbers, a likely exam question.\n')
w('## Recommended path (prerequisite order)\n')
w('| # | Step | Needs first |')
w('|---|---|---|')
for i, s in enumerate(plan['path'], 1):
    if s.startswith('G-'):
        label = {'G-main': 'Track G — main text (summary → limitations)', 'G-back': 'Track G — declaration of interests, contributions, acknowledgments', 'G-methods': 'Track G — STAR Methods'}[s]
        w(f'| {i} | **{label}** | all of A–F |')
    else:
        l = lessons[s]
        w(f"| {i} | {s} · {l['title']} | {', '.join(l['prereqs']) or '—'} |")
w('')
w('## Prerequisite map\n')
w('Arrows point from a lesson to the lessons that need it. (The validator checks that every prerequisite comes earlier on the path.)\n')
w('```')
dep = collections.defaultdict(list)
for l in plan['lessons']:
    for p in l['prereqs']:
        dep[p].append(l['id'])
for l in plan['lessons']:
    if dep[l['id']]:
        w(f"{l['id']:<4} → {', '.join(dep[l['id']])}")
w('```\n')
w('## Coverage check: what the paper uses vs what is taught\n')
nt = len(plan['terms'])
inpaper = sum(1 for t in plan['terms'] if used[t['id']])
w(f'* {nt} glossary terms are planned; {inpaper} of them occur in the main text or figure legends (the others are background needed to understand figures or to compare methods).')
w('* Supplementary items (Figures S1–S6, Tables S1–S3, Data S1–S4) are cited but not in the PDF; lessons teach only what the main text says about them.')
w('* Terms found in the paper text but deliberately **not** given their own entry: catalog numbers, reagent vendor names, R package versions, and purely administrative words.\n')
open(os.path.join(ROOT, 'CURRICULUM.md'), 'w').write('\n'.join(out) + '\n')
print('CURRICULUM.md written,', len(out), 'lines')
