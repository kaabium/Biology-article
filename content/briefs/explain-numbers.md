# Brief: "Explain it back" prompts and the key-numbers sheet

## `app/data/explain.js` — ≥ 16 prompts (`(window.EXPLAIN = window.EXPLAIN || []).push({...})`)
Shape: `{id, title, prompt, model, checklist[≥ 4–7], source:[ids], derived?}`; the model answer is a plain-English `<p>…</p>` (80–200 words, every number sourced);
checklist = the key points a good answer contains (each a short sentence). Order them from easy to hard. Suggested prompts (adapt as the paper allows; add more):
the paper in 60 seconds · what a lncRNA is and why look for them in lung cancer · how a pooled CRISPR-deletion screen works from library to hits · why delete the TSS ·
dropout vs positive selection (what each phenotype screen measured) · the funnel 831 → 80 → 9 → 5 → 2 (how and why it narrows) · why ASOs after CRISPR (DNA vs RNA effect) ·
the controls in the screens and in the ASO experiments (what each rules out) · CHiLL1 vs GCAWKR (what was found, how they differ) · how hits were called (m-hits) ·
FDR and multiple testing in one paragraph · cell lines vs normal cells vs PDX/3D (what each adds) · RNA-seq + pathway analysis (what they did, what they found) ·
reading a bar chart from this paper (what to check in the legend) · the limitations and why they matter · strengths and weaknesses of the paper (essay answer) · the patent/COI declaration.

## `app/data/numbers.js` — ≥ 80 entries (`(window.NUMBERS = window.NUMBERS || []).push(...)`)
Shape: `{group, value, meaning, note?, conflict?, source:[ids], derived?}`. One row per number a student must remember, grouped (suggested groups: The funnel · The library · Cell models ·
Screen design · Phenotypes & assays · Hit calling & statistics · ASO experiments · Mechanism & RNA-seq · Public data sets). `value` is the number as printed (keep minus signs, units,
scientific notation); `meaning` says what it counts/measures in plain English. **If the paper gives different numbers for the same thing (text vs figure vs legend vs methods), show both
in `value`, set `conflict:true` and explain in `note` — but only for conflicts you have verified in the text/legends/figure text; never guess.** Read the Results, the legends
and STAR Methods carefully (and `FIGTEXT` / figure images when numbers sit only inside figures) — sweep for numbers systematically unit by unit (`node tools/q.mjs unit <unit>`).

**LEAN MODE:** exactly one author writes both files: explain.js with 14 prompts, numbers.js with ≥ 60 entries. Write quickly; validator at most 3 runs, fix errors only.
