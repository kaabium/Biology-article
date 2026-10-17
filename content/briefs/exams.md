# Brief: the two full mock exams

Two exams, each **≥ 32 questions**, in `app/data/exams-1.js` and `app/data/exams-2.js` (`(window.EXAMS = window.EXAMS || []).push({...})`).
Shape and example: `content/examples/ex-rest.js` (`id, title, minutes, intro, questions:[…]`). Question types:
* `mcq` (≥ 16 per exam) — as quiz questions: one right, `why` for every option, `source` or `bg:true`, `points:1`, `lesson`.
* `short` (≥ 7 per exam) — a written answer: `q`, `model` (a model answer in plain English, 2–6 sentences), `checklist` (≥ 3–6 key points the learner ticks to self-grade; each point something a marker could look for), `source`, `points` (= number of checklist items).
* `figure` (≥ 5 per exam) — `img:'fig3B'` (panel or whole figure) + either mcq options or written model+checklist: "interpret this panel", "what is the control", "what can you conclude / not conclude".
* `critique` (≥ 3 per exam) — "explain or critique the design": why a step/control exists, what would go wrong, what alternative explanation remains, what experiment would strengthen it (model + checklist; opinion parts are labelled as reasoning).
Exam 1 = "**Results and figures**" emphasis (the story, funnel and key numbers, panel interpretation, CHiLL1/GCAWKR mechanism). Exam 2 = "**Design, methods, statistics and critique**" emphasis (CRISPR deletion design, screens/controls, hit calling and FDR, assays, tests, limitations, patent/COI). Both must still sample every part of the paper, and neither may repeat the other's questions.
* Realistic exam difficulty: roughly 40 % recall of key facts/numbers, 40 % understanding/interpretation, 20 % reasoning/critique. Include **detailed key-number questions**.
* `minutes`: 75–90. `intro`: instructions and marks. Mark every question with `points`.
* Written questions need rich, correct model answers — these are what the learner will compare their own answers with. Opinions and evaluation must be marked as such in the model answer ("In my assessment …"); paper facts need `source`.
* Terms: only those in Tracks A–F + the paper (all taught before the exams). `lesson` fields feed the "weakest topics" list: use the lesson or `G-<unit>` that teaches the item.
