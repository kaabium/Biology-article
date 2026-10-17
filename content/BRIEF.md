# LEAN MODE (read first — this overrides anything heavier below and in AUTHORING.md)

The person who commissioned the app said: *"This is a simple article for an exam. Don't over-engineer it. Finish it faster."* So:

* **Time-box: about 15–20 minutes of work.** Write directly and concisely. Do not polish, re-read endlessly or "improve" finished items.
* **Validator: run it at most 3 times** (`node tools/validate.mjs <your scope flag>`), fix every **error** once, **ignore warnings** (term-order notes are only warnings now; a few are fine). Do not chase 0 warnings.
* **No screenshot loops.** At most one `tools/preview.mjs` look at one of your pages if you drew an SVG; otherwise skip previews.
* Lessons are **compact**: 450–800 words of teaching text, 3–5 short headed sections, 1 (max 2) simple SVG, 1 memory aid, `appears` 2–4 links, **3 check questions** (4 options each is fine, 3 allowed; every option still needs a `why`). Each lesson **merges several small topics** (its plan entry lists what it teaches): cover each topic briefly, one clear example/analogy per topic.
* Glossary entries: `short` (1 line), `long` (40–90 words), `analogy` (1 sentence), `see` (2–3 ids), `source` for paper terms, `paperUse` only when there is an obvious verbatim sentence. Keep them tight.
* Track G study layers: `plain` + `why` + **1** check per paragraph (2 only for a key Results paragraph); `flags`/`memory`/`prereqs` only when useful (prereqs: use the NEW lesson ids from `node tools/q.mjs path`).
* Panel guides: all fields, but short; FIGTEXT only the main labels/numbers (use `[?]` when unsure).
* Accuracy still comes first: never invent a paper fact or number; every paper fact has a `source`. Everything else in this file still applies.
* The lesson ids are the NEW merged ids from `content/plan.json` (41 lessons: A1–A3, B1–B8, C1–C6, D1–D11, E1–E5, F1–F4, H1–H4). Use `node tools/q.mjs lesson <id>` — the lessons listed in any older text (e.g. "B7", "D28") may no longer exist.

---

# Brief for every content-authoring agent (read this first, then AUTHORING.md)

You are one of several authors writing **in parallel** for an offline study app. The app takes a complete beginner to mastery of
ONE paper — Esposito, Polidori et al. (2022), *Multi-hallmark long noncoding RNA maps reveal non-small cell lung cancer
vulnerabilities*, Cell Genomics 2, 100171. The person who commissioned the app asked for **"the most useful thing you can make"**
and will sit an exam on the paper. A skeptical expert will review everything you write. Aim for content you would be proud to
hand to a smart student who has never studied biology.

## Ground rules for the session

* Work in `/home/user/Biology-article`. **Do not run any `git` command, do not run `tools/build.mjs`, do not edit any file that is not
  in your assignment** (other authors are editing the others at the same moment). Put scratch files in `/tmp/<your-scope>-*`.
* Read, completely and before writing anything: `content/AUTHORING.md` (rules, formats, tools), then the two gold-standard example
  files `content/examples/ex-lessons.js` and `content/examples/ex-rest.js`. Match their depth, tone, structure and data shapes.
* The paper is the only source of truth for paper-specific facts. Read the paragraphs you rely on with `node tools/q.mjs show <id…>`,
  `unit <unit>`, `panel <id>`, `find <words>`. Never invent a paper fact, number, name or mechanism. If you are not sure the paper says
  it, leave it out or label it BACKGROUND ("general knowledge, not from the paper").
* Background (textbook) science must be **correct**. If you are not sure of a detail, keep it general or leave it out. Say "usually",
  "often", "in this paper" where that is the truth. Mention where an analogy breaks down.
* Wet-lab methods are explained as a textbook would: **what is done and why** (purpose, logic, what a good result looks like).
  Never write step-by-step protocols, reagent amounts or troubleshooting.
* Plain, simple English; short sentences; "you"; US spelling; no jargon before it is taught (the validator checks term order against
  `content/plan.json`). Prefer one clear everyday example over three abstract sentences. Define by example. Be a patient tutor, not a textbook.
* Never "fix" the paper's typos or inconsistencies; flag them gently (see AUTHORING.md rule 7 and `extraction/QA.md` §7).

## How to work (this matters — runs can be long)

1. Explore with `node tools/q.mjs …` (lesson plan entry, terms you may/must not use yet, paper paragraphs). View panel/figure images with the
   Read tool when your assignment touches them (`app/img/panels/figXY.webp`, `app/img/figures/figN.webp`).
2. **Write incrementally.** Each data file only *adds* to a global collection, so append one finished item at a time with a quoted heredoc
   (`cat >> app/data/<file>.js <<'EOF' … EOF` — the quotes stop the shell from touching backticks and `${}`), then validate. Never hold a
   whole file in your head. Use template literals (backticks) for long HTML and escape any literal backtick or `${`.
   If you must rewrite a file, rewrite it whole with the Write tool. Check syntax with `node --check app/data/<file>.js`.
3. **Validate early and often** with the command in your assignment. It must end with `0 error(s)` for your scope. Read the warnings too.
   Fix errors by improving the text (rephrase in everyday words, cite the right paragraph, quote exactly) — not by weakening content. If the
   validator seems wrong, or the plan forces a term-order conflict, use the sanctioned escape hatches (`defines`, `derived`) sparingly and
   report it in your final message.
4. **Look at your work.** `node tools/preview.mjs '#/lesson/B7' /tmp/<scope>-x.png --full` (default width is 390 = phone; `--width 1100` for desktop;
   `--scroll 0.5` jumps to mid-page) and open the PNG with the Read tool (crop tall pages with Python PIL first so the text stays legible). Fix clipped or overlapping
   SVG text, awkward layout, and anything you would not want a beginner to see.
5. Before you finish, re-read your own output as the skeptical expert: Is every sentence true? Does any sentence use a word the learner has not
   met? Is every analogy accurate enough? Does each quiz option teach something? Is there anything padded that can be cut?

## What "excellent" looks like

* **Lessons** (tracks A–F, H): one idea; 450–1000 words of teaching text; opens with the problem/hook; 3–5 short headed sections; one everyday
  analogy (`memory`); at least one self-drawn SVG that shows the *mechanism* (two if the idea has two parts); a "How this paper uses it"
  pair (`paper` quote + `plain` translation with `source`) wherever the plan lists paper paragraphs; `appears` links; 3–5 check questions whose
  wrong options are real misconceptions and whose explanations teach; for tracks C–F at least one check ties to the paper (with `source`).
  A good lesson answers: *What is it? Why should I care for this paper? How does it work, in one picture? How do I recognise it in the paper?*
* **Glossary entries**: `short` is a definition a 12-year-old could repeat; `long` explains with a mini-example; `analogy` is vivid and accurate;
  `see` links related terms; `paperUse` is a verbatim sentence (exact substring) showing the paper's own use. No circular definitions.
* **Study layers / panel guides / questions**: faithful to the paper, every number sourced, every "why" genuinely explaining the design logic
  (what would go wrong without this step or control?).
* Quantity matters as well as quality: do **all** items in your assignment, fully. Do not stub, do not skip hard ones, do not shorten later items
  because you are tired of the work.

## Final message (≤ 15 lines)

Files written · counts (lessons / glossary entries / paragraphs / panels …) · the last line of your validator run (must show `0 error(s)` for your scope)
· anything you could not do · problems you noticed elsewhere (plan, paper text, term-order conflicts you worked around with `defines`, validator oddities).
