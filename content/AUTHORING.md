# Authoring guide for the study-app content

You are writing part of an offline study app that takes a **complete beginner** (knows nothing about biology, genetics,
cancer, lab methods, bioinformatics or statistics) to mastery of one paper:

> Esposito, Polidori et al. (2022), *Multi-hallmark long noncoding RNA maps reveal non-small cell lung cancer vulnerabilities*,
> Cell Genomics 2, 100171.

Mastery means the learner can explain the paper's question, approach, results and limitations; read every figure panel;
define every term; justify every design choice and control; and answer detailed exam questions including key numbers.

Read this whole file before writing. The **validator** (`node tools/validate.mjs`) enforces most rules mechanically — run it
on your files until it reports **0 errors**.

---

## 1. The absolute rules

1. **The paper is the only source of truth for paper-specific facts.** Never invent results, numbers, names, claims or
   mechanisms. If the paper does not say it, either leave it out or label it as BACKGROUND (general textbook knowledge).
2. **Four kinds of content, always visibly distinct** (the app colours them; you choose the block kind):
   | kind | meaning | block `k` |
   |---|---|---|
   | PAPER | verbatim text from the paper | `paper` (lessons), or the app's own PAPER boxes |
   | PLAIN ENGLISH | a translation of the paper **that adds no new claims** | `plain`, `why`, `flag` (with `source`) |
   | BACKGROUND | general textbook knowledge, labelled "not from the paper" | `bgnd`, `worked` |
   | MEMORY AID | mnemonics and everyday analogies | `memory` |
3. **Every paper-specific fact needs a `source`**: a paragraph id (`res-aso-p9`), a panel id (`fig5H`), a figure id (`fig5`),
   a reference (`ref-71`) or a key-resources row (`krt-12`). Find ids with `node tools/q.mjs find <words>`.
4. **Every number you state about the paper must appear in the cited source** (digits are compared as values; `1,000`=`1000`;
   `1.2 × 10⁻⁷`=`1.2e-7`; number words *one…twelve* in the source count). Quote numbers exactly (keep minus signs!). If a number is
   intentionally computed (e.g. 80/831 ≈ 10%), list it in `derived: ['10']` on that block/card/question — and say in the text that you computed it.
5. **Never use a term before it is taught.** Every glossary term has one *home lesson* (see `content/plan.json`, or
   `node tools/q.mjs lesson B7`). In a lesson, glossary entry, card, panel guide or study layer you may only use terms whose home lesson is
   earlier on the recommended path (or that you explain inline in one plain sentence and list in `defines`). Rephrase in everyday words
   instead whenever you can. The validator reports every violation with context.
6. **Plain, simple English.** Short sentences. Everyday analogies. Define by example. No jargon you have not taught. Use "you".
   Use US spelling (quoted paper text keeps its own spelling).
7. **Keep the authors' typos and inconsistencies verbatim** (they are listed in `extraction/QA.md` §7). Never "fix" the paper. When one
   matters for a paragraph, mention it in that paragraph's `flags` (Plain-English layer) as a heads-up for the learner.
8. **Supplementary items are not in the PDF** (Figures S1–S6, Tables S1–S3, Data S1–S4). If the main text cites one, teach only
   what the main text says about it. Never describe what a supplementary panel "shows".
9. **Level of lab detail.** Explain wet-lab methods the way a textbook does — *what is done and why* (purpose and logic). Do not
   write step-by-step protocols, reagent quantities, or troubleshooting. Keep the few numbers that matter for understanding the
   design (e.g. MOI 0.3, coverage, time points, which drug concentrations, n) because the learner must know them.
10. **Be careful and honest about uncertainty.** If the paper is ambiguous or the legend does not say something (what error bars show,
    which test was used), say exactly that.
11. **Teach, don't pad.** Each lesson covers one idea in 5–10 minutes. Cut anything that is not needed to understand the paper.
12. **Only edit your own files.** If you find a problem elsewhere (plan, paper text, another author's file), report it in your final
    message instead of changing it.

---

## 2. Repo map and tools

```
content/plan.json            lessons (id, title, minutes, prereqs, goal), glossary term metadata (id, term, aliases, home lesson), the path
content/examples/*.js        GOLD-STANDARD examples of every data format — read them first (ex-lessons.js, ex-rest.js)
extraction/paper.json        the verbatim paper (blocks with ids, figures, panels with legends, references, key-resources table)
app/data/*.js                the data files you write (each file only *adds* to window.* collections)
app/img/panels/figXY.webp    one image per figure panel (view with the Read tool);  app/img/figures/figN.webp  whole figures
tools/q.mjs                  query helper (see below)
tools/validate.mjs           the validator
tools/preview.mjs            screenshot a route so you can SEE your lesson/diagram:  node tools/preview.mjs '#/lesson/B7' out.png --full
```

`node tools/q.mjs …`
- `show <id…>` — verbatim text of paragraphs / legends / references
- `unit <unit-id>` — all paragraphs of a reading unit (e.g. `res-aso`, `m-screens`)
- `panel <fig2G>` — legend, figure notes, the paragraphs that cite the panel, and the image path
- `find <words…>` — search the paper
- `lesson <B7>` — a lesson's plan entry, the terms it teaches, the terms you may use, and the terms you must not use yet
- `term <id|word>` — a term's plan entry (home lesson, aliases); `units`, `path`

Validator: `node tools/validate.mjs --scope B1 --warn` (your files only) · `--files trackg-3,panels-fig2` · add `--include content/examples/ex-lessons.js` to test a copy of a file.
Preview: `node tools/preview.mjs '#/lesson/B7' /tmp/x.png --full` then look at the PNG with the Read tool (crop tall images with Python/PIL).
The app merges your files with `content/plan.json` by `id`.

Source ids: paragraphs `intro-p3`, `res-aso-p9`, `m-screen-prolif-p1` … · panels `fig4C` · figures `fig4` (and `ga` = graphical abstract) ·
references `ref-71` · key-resources rows `krt-12`.

---

## 3. File formats (see `content/examples/` for complete working samples)

All data files are plain browser JavaScript that only **adds** to a global collection:

```js
(window.GLOSSARY_CONTENT = window.GLOSSARY_CONTENT || []).push({ … }, { … });
(window.LESSON_CONTENT   = window.LESSON_CONTENT   || []).push({ … });
window.TRACKG = window.TRACKG || { paras: {}, units: {} };  Object.assign(window.TRACKG.paras, { 'res-aso-p9': { … } });
Object.assign((window.PANELS  = window.PANELS  || {}), { fig1F: { … } });
Object.assign((window.FIGTEXT = window.FIGTEXT || {}), { fig1F: '…' });
(window.CARDS = window.CARDS || []).push({ … });   // QUIZZES, EXAMS, EXPLAIN, NUMBERS likewise;   window.SUMMARY = {onePage, cheat}
```
HTML strings may use `<p> <b> <i> <ul> <li> <sup> <sub> <br>` and internal links like `<a href="#/lesson/B7">`, `#/term/tss`, `#/panel/fig4C`,
`#/read/res-aso/res-aso-p9`. No scripts, no external resources. Use template literals (backticks) for long HTML; escape `` ` `` and `${`.
Check questions and glossary text appear on phones: keep them short.

### 3.1 Lesson (`lessons-<X>.js` → `window.LESSON_CONTENT`)

```js
{ id: 'B7',                    // must be in plan.json; title/minutes/prereqs/goal come from the plan
  defines: ['protein'],        // terms used before their home lesson but explained inline in this lesson (keep this list SHORT)
  body: [ …blocks… ],
  appears: [ { ref: 'res-pipeline-p1', note: 'what appears there' } ],   // 3–6 "where this appears in the paper" links
  checks:  [ …3–5 questions… ] }
```
Block kinds (`k`):
- `{k:'h', text}` — a short heading.
- `{k:'bgnd', html}` — teaching text that is general knowledge (amber, "Background · not from the paper"). **Most teaching text in tracks B–F is `bgnd`.**
- `{k:'memory', html}` — the everyday analogy / mnemonic (purple). **Every lesson needs at least one.**
- `{k:'svg', svg, caption}` — an inline diagram you draw (see §4). **Every lesson needs at least one.**
- `{k:'paper', ref, quote}` — a short **verbatim** quote (an exact substring of the paragraph's text; use `…` to skip words). Keep quotes to 1–2 sentences.
- `{k:'plain', html, source:[ids]}` — Plain-English translation of paper content (blue). Needs `source`. Numbers must be in the sources.
- `{k:'why', html, source}` — why it matters for the paper. `{k:'flag', html, source}` — heads-up about an inconsistency/ambiguity in the paper.
- `{k:'worked', html}` — a worked example with made-up simple numbers (labelled background). Great for statistics.
- `{k:'panel', id:'fig2G', html?, kind?}` — shows a **real** panel image with its verbatim legend (use for chart-type lessons and "see it in the paper"). `html` is your note about it (a `plain` note: numbers must be in the panel's legend/figtext/citing text).
- `{k:'figure', id:'fig2', html?}` — a whole figure.

Lesson structure that works: (1) a one-paragraph hook / the problem; (2) 3–5 short sections, each a heading + a `bgnd` block; (3) the analogy; (4) the diagram;
(5) "How this paper uses it": a `paper` quote + a `plain` translation with `source`; (6) optional `flag`; (7) `appears`; (8) `checks`.
Length: **450–1000 words** of teaching text (hard limits 200 / 1700). For lessons in tracks C–F, tie at least one check question to the paper (with `source`).
For track A write in **plain words only** (every glossary term you use must be in `defines`, explained in one plain sentence).

### 3.2 Check questions (lessons, quizzes, Track G)

```js
{ q: '…?', options: [ {t:'right answer', ok:true, why:'why this is right'}, {t:'plausible wrong answer', ok:false, why:'why this is wrong'}, … ],
  source: ['res-aso-p9'] }        // or  bg: true   for pure background questions
```
3–4 options, **exactly one** `ok:true`, an explanation (`why`) for **every** option (right *and* wrong). Distractors must be plausible (common misconceptions,
near-miss numbers, reversed relationships) — never silly. No "all/none of the above". Test understanding, not memorised wording. Each question needs
`source:[…]` (if it states paper facts) **or** `bg:true`. Numbers in the question and the correct answer must be in the sources; numbers inside *wrong* options are
allowed if they appear in the question/option itself.

### 3.3 Glossary entries (`glossary-<X>.js` → `window.GLOSSARY_CONTENT`)

Write one entry for **every term the plan assigns to your lessons** (`node tools/q.mjs lesson <id>` lists them). Term, aliases, category and home lesson come from the plan; you write:
`short` (one line, 10–25 words), `long` (40–120 words, plain explanation, `<p>` allowed), `analogy` (1–2 sentences, everyday), `see:[ids]` (2–4 related terms),
optional `full` (expansion of an abbreviation), `source:[ids]` (**required** when the plan says kind `paper`), and `paperUse:{ref, quote}` (a verbatim sentence showing the paper using the term; `quote` must be an exact substring).
Background entries stay general (don't describe the paper in `long`; use `paperUse` for that). Only use terms whose home lesson is at or before this entry's home lesson.

### 3.2b Track G study layer (`trackg-<N>.js`)

For **every paragraph id** assigned to you (`node tools/q.mjs unit <unit>`), write `window.TRACKG.paras['<id>']`:
```js
{ plain: '<p>…</p>',          // PLAIN ENGLISH translation: simple words, same facts, same order, NO new claims, keep every number and qualifier ("approximately", "although")
  why:   '1–2 sentences: this paragraph\'s job in the paper\'s logic',
  memory:'optional analogy', flags:['heads-up about typos / inconsistencies / ambiguity, quoting what is printed'],
  prereqs:['B7','D2'],         // 1–4 lesson ids (path order) that help most; the app also adds links automatically from the terms used
  checks:[ …1–2 questions… ], sources:[…optional extra source ids whose numbers you use…], derived:[…] }
```
and one `window.TRACKG.units['<unit-id>'] = { intro, recap }` per unit (what the section is about / a 2–3 sentence recap).
Plain English may use any term taught in tracks A–F. Explain methods paragraphs as *what they did and why* (put the "why" in `why`); keep design-relevant numbers; skip catalog numbers.
Paragraphs that are only affiliations, headings or reference lists are exempt (not assigned to you).

### 3.4 Panel guides (`panels-fig<N>.js`) and transcribed figure text (`figtext-fig<N>.js`)

`FIGTEXT[id]` is a string: **everything legible printed inside the panel image** — title, axis labels and tick numbers (keep minus signs), legend entries, annotations, P values, n, sample labels, colours of series if labelled.
Say "Transcribed from the image by eye." at the start; mark anything you cannot read with `[?]`; never guess. Work systematically (title → axes → legend → annotations → bars/points left to right). These strings are the "source" for numbers in your guide, so they must be right — view the image at full size (`Read` the `.webp`, also the whole figure).
`PANELS[id]` (for every panel of your figure, plus `ga` for the graphical abstract in figure 1's files):
```js
{ short: 'five words', question: 'the question this panel answers',
  howToRead: '<p>axes, colours, symbols, what the controls are, what a "good" result would look like — in plain words</p>',
  shows: '<p>what the panel shows, with the key numbers</p>',
  keyNumbers: [ {value:'P=5e-4', meaning:'…', source:['fig1F']} ],        // 3–6 items; each number must be in legend / FIGTEXT / citing paragraphs
  background: 'optional <p>', memory: 'optional', flags: ['what the legend does not say; inconsistencies between text, legend and image'],
  chartTypes: ['F1'],         // lesson id(s) of the chart-type mini-lessons (F1…F16) that explain this kind of plot
  examQ: { q: 'a likely exam question', a: 'a model answer' } }
```
Numbers in the guide must be in the panel's legend, its FIGTEXT, or the paragraphs that cite it (shown by `node tools/q.mjs panel <id>`).
Be systematic about what is **not** stated: error bars, statistical tests, n, units, scales.

### 3.5 Flashcards (`cards-<deck>.js`)

```js
{ id: 'unique-id', deck: 'terms|abbr|numbers|why|figures|concepts', kind: 'paper|background|memory', lesson: 'B7' /* or 'G-res-aso' */,
  front: 'question or prompt', back: 'short answer (≤ 35 words)', source: [ids] /* required for kind paper */, img: 'fig4C' /* figures deck */ }
```
One idea per card. `lesson` = the lesson after which the card unlocks; the card may only use terms taught by then (for paper-result cards use the `G-<unit>` id, e.g. `G-res-aso`).
Decks: **terms** (what does X mean), **abbr** (what do the letters stand for), **numbers** (what is 80? what is MOI 0.3 for?), **why** ("Why delete the TSS? why MOI 0.3? why two ASOs per target? why two cell lines? why test normal cells? …"), **figures** (front "What does this panel show?" with `img` = panel id; every one of the 49 panels at least once), **concepts** (results, logic, methods, statistics).

### 3.6 Quizzes, exams, explain-it-back, key numbers, summary

See `content/examples/ex-rest.js` for exact shapes. Quizzes: `{id, title, kind:'figure'|'section'|'mixed', ref, desc, questions:[…check questions, optional img:'fig2G', lesson]}`.
Exams: `{id, title, minutes, intro, questions:[{type:'mcq'|'short'|'figure'|'critique', q, options (mcq/figure), model+checklist (written), source, img, points, lesson}]}` — written questions need a model answer and a checklist (≥ 3 key points) the learner ticks to grade themselves.
Explain-it-back: `{id,title,prompt,model,checklist[≥4],source}`. Key numbers: `{group, value, meaning, note?, conflict?, source:[…], derived?}` (if the paper gives different numbers for the same thing, show both, set `conflict:true`, and explain; never guess).

---

## 4. Diagrams (inline SVG) — you draw them

- Start with `<svg viewBox="0 0 480 H" role="img" aria-label="one-sentence description of the picture">`. **Width 480** (max 560), height ≤ 380. No `width`/`height` attributes. Text must stay readable on a phone: the default label size is already right (15 units); use class `s` (13) for small labels, `l` (18) / `xl` (22) for titles; never below 12.
- Style with the app's classes (they adapt to dark mode): fills `f-blue f-green f-orange f-purple f-red f-teal f-yellow f-gray f-none` (soft colour + outline); solids `solid-blue … solid-text`; lines `ln` (+`thin` `thick` `dash` `m`) and stroke colours `s-blue s-green s-orange s-purple s-red s-teal`; arrows `arrow` (also `both`, `start`) — arrowheads are defined globally;
  text modifiers `mid` (centred), `end`, `b` (bold), `m` (muted), `s`, `l`, `xl`, colours `t-blue t-green t-orange t-purple t-red t-teal`. Do **not** use hard-coded colours or `style` attributes with colours.
- Keep it simple: 5–12 shapes, short labels, big gaps; one idea per diagram; show the *mechanism* (what moves, what changes), not decoration. Label directly instead of using legends.
- Draw to teach: arrows for flow/time, size for amount, colour for category (and keep the colour meaning consistent inside a lesson).
- **Look at it** (`tools/preview.mjs`) at phone width (390 px) before finishing. Fix overlaps and clipped text.
- Forbidden in SVG: `<script>`, `<foreignObject>`, `<image>`, external links.

---

## 5. Quality bar (what a skeptical expert reviewer will check)

- Scientific correctness. No oversimplification that became wrong (say "usually", "in this paper", "one way" where needed). Don't call something a mechanism the paper only suggests.
- Plain English layers add no claims; numbers match the paper; minus signs, units (µ vs m) and ≥/≤ are right.
- Analogies are accurate enough not to mislead; where an analogy breaks down, say where.
- Check questions have one clearly right answer and instructive explanations; wrong options teach something.
- Sources are precise (the paragraph that actually says it), not just "somewhere nearby".
- Voice: a patient tutor, not a textbook. Encourage, but never gush.

## 6. Your final message

Keep it short: which files you wrote; counts (lessons / entries / paragraphs / cards …); the last validator line (must be 0 errors for your scope);
anything you could not do or that looks wrong elsewhere (plan problems, paper-text issues, term-order conflicts you had to work around with `defines`).
