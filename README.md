# Study app: Esposito, Polidori et al. (2022) — lncRNA maps in lung cancer

An offline study app that takes you from zero (no biology, cancer, lab or statistics background) to being able to explain,
defend and answer exam questions on one paper:

> Esposito, R., Polidori, T., et al. (2022). *Multi-hallmark long noncoding RNA maps reveal non-small cell lung cancer
> vulnerabilities.* Cell Genomics 2, 100171. https://doi.org/10.1016/j.xgen.2022.100171
> Open access, CC BY-NC-ND 4.0. This app is for personal, non-commercial exam preparation. The paper text is reproduced
> verbatim; every explanation is a separate, clearly labelled layer.

## How to open it

| Where | What to do |
|---|---|
| **Computer** | Double-click `index.html` (the whole folder must stay together), **or** double-click `dist/study-app.html` — a single self-contained file. No internet needed. |
| **Phone** | Copy `dist/study-app.html` to the phone (email it to yourself, cloud drive, USB, AirDrop) and open it in the browser (Chrome / Safari). It works offline; "Add to Home Screen" gives an app icon. |
| **Progress** | Saved automatically in that browser on that device. Move it between devices with **More → Settings → Export / Import** (a file, or copy-paste text). |

Everything is plain HTML/JavaScript: no installs, no fonts or scripts from the internet, dark mode included, figures can be pinch-zoomed.

## The four kinds of content (always visibly different)

| Look | Meaning |
|---|---|
| Grey serif box — **PAPER** | The paper's exact words (only extraction artifacts repaired; the authors' typos are kept) |
| Blue — **PLAIN ENGLISH** | A translation of the paper that adds no new claims; every paper fact shows its source paragraph |
| Amber — **BACKGROUND** | General textbook knowledge, labelled "not from the paper" |
| Purple — **MEMORY AID** | Analogies and mnemonics |

Teal "Why it matters" and yellow "Heads-up" boxes explain a paragraph's job in the argument and flag inconsistencies in the paper itself.

## What is inside

| Track | What you get |
|---|---|
| **A · The paper in 5 minutes** | 3 short lessons in plain words: the whole story, a one-page pipeline map, the funnel 831 → 80 → 9 → 5 → 2 (ending in CHiLL1 and GCAWKR), why it matters, the cast of names |
| **B · Biology from zero** | 8 lessons: cells, DNA, genes, RNA, proteins, lncRNAs, gene catalogs, regulation |
| **C · Cancer from zero** | 6 lessons: cancer, hallmarks, lung cancer, KRAS/EGFR, cisplatin, cell lines, 3D models and mice, patient data sets |
| **D · Lab tools from zero** | 11 lessons: CRISPR deletion (and why delete the TSS), lentivirus and MOI, pooled screens, read counts, the three screens and their controls, ASOs, every validation assay, RNA-seq and pathways |
| **E · Numbers & statistics** | 5 lessons with worked examples: fold change and log2, error bars, correlation, p-values, tests, FDR, ROC/AUC, combining screens, decoding legends |
| **F · How to read figures** | 4 lessons, each practised on real panels of the paper |
| **G · The paper, section by section** | Every paragraph of the main text and of STAR Methods (125 paragraphs): PAPER → PLAIN ENGLISH → why it matters → prerequisite links → a check question. Every one of the 49 figure panels (plus the graphical abstract) has a guide: the question it answers, how to read it, what it shows, key numbers, likely exam question, and what the legend does not say |
| **H · Critical thinking** | 4 lessons: claim → evidence → panel chains, every control and why, DNA vs RNA effects, off-targets, limitations line by line, the patent and conflict of interest, strengthening experiments, strengths vs weaknesses |
| **Practice** | 513 spaced-repetition flashcards (terms, abbreviations, numbers, "why" cards, figure panels, concepts), a quiz for every figure, two 33-question mock exams (multiple choice, short answers with model answers and self-grading checklists, figure interpretation, critique; optional timer), 14 "explain it back" exercises |
| **Reference** | A searchable glossary (370 entries, each with an analogy and links to where the paper uses it), a key-numbers sheet (87 numbers, with the places where the paper itself disagrees), a one-page summary, a printable cheat sheet, a study planner (enter your exam date), global search |

Every paragraph, figure panel, quiz question, flashcard and exam question has an **"Ask Claude"** button: it copies a ready-made
tutor prompt (the exact text plus "I'm a complete beginner studying this paper") to paste into the Claude app.

## Suggested 10-day plan (about 75–100 minutes of new material a day + 10–15 minutes of flashcards)

Start every day with **Practice → Flashcards** (review what is due). Do the lesson check questions as you go.

| Day | Do this |
|---|---|
| 1 | **A1–A3**, **B1–B5** — the whole story in plain words, then cells, DNA, genes, RNA, proteins |
| 2 | **B6–B8**, **C1–C4** — lncRNAs, gene catalogs, switches on DNA; cancer, hallmarks, lung cancer, cisplatin, cell lines |
| 3 | **C5, C6**, **D1, D2, E1, D3, D4** — 3D models, patient data; CRISPR deletion, lentivirus and MOI, fold change and error bars, pooled screens, read counts |
| 4 | **D5–D9**, **E2, E3** — the three screens and controls, ASOs, validation assays, correlation, p-values and tests |
| 5 | **E4, E5, D10, D11**, **F1–F4** — FDR, ROC, combining screens, RNA-seq and pathways, how to read every chart type |
| 6 | **Paper:** Summary, Introduction, Results 1–2 (Figures 1–2): read PAPER → PLAIN ENGLISH, then the panel guides; take the Figure 1 and 2 quizzes |
| 7 | **Paper:** Results 3–5 (Figures 3–5) + quizzes |
| 8 | **Paper:** the CHiLL1 / GCAWKR mechanism section, Discussion, Limitations, declarations (Figure 6) + quiz |
| 9 | **Paper:** STAR Methods (skim catalog details; focus on the "why" boxes), the "why" flashcards, the key-numbers sheet |
| 10 | **H1–H4**, mock exam 1 (and exam 2 if you have time), your weakest topics (shown on Home), the cheat sheet |

Short on time? The Home page's recommended path lets you skip anything. If you already know a topic, skip its lesson and use
the flashcards and quizzes as a test. The **Planner** (More → Planner) builds a day-by-day plan from your exam date and rebuilds
it from your real progress every time you open it.

## Heads-up about the paper

The paper is not perfectly consistent, and the app tells you where. For example the library is described with different
numbers in the text and in the figures (12,000 pgRNAs vs "1,200"; 831 lncRNAs / 998 TSSs vs 1003), control counts differ
between Methods, Results and Figure 1C, and the cell line CCD-16Lu is once printed "CCD-12Lu". These appear as yellow
**Heads-up** boxes and in the Key numbers sheet (marked "conflict"). Figures S1–S6, Tables S1–S3 and Data S1–S4 are **not in the PDF**; the app
says "Supplementary: not in your PDF" wherever the text cites one and never describes what a supplementary panel shows.

## For developers

```
index.html, app/            the app (vanilla JS, no dependencies); data files in app/data/*.js
dist/study-app.html         single-file build (images inlined):  node tools/build.mjs
paper/                      the PDF;  extraction/  scripts + QA notes (extraction/QA.md)
content/                    curriculum plan, authoring guide, briefs;  CURRICULUM.md = the lesson/term plan
tools/validate.mjs          checks sources, numbers, term order, panels, files:  node tools/validate.mjs --final
tools/smoke.mjs             loads every route headlessly:  node tools/smoke.mjs
DECISIONS.md                choices made along the way
```
