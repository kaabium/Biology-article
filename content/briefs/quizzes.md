# Brief: quizzes

Quizzes are for **retrieval practice and interleaving**: after a figure or a section, the learner answers 8–12 questions; every option has an explanation.
Shape: `{id, title, kind:'figure'|'section'|'mixed', ref, desc, questions:[ {q, options:[{t, ok, why}…], source:[ids] | bg:true, derived?, img?:'fig2G', lesson?} ]}`
(see `content/examples/ex-rest.js`). Push onto `window.QUIZZES`.

## Question craft
* 3–4 options, **exactly one** right; **every** option (right and wrong) has a `why` that teaches. Distractors = real misconceptions, reversed relationships,
  near-miss numbers, plausible-but-unsupported claims. No "all/none of the above"; no giveaway length; no trick wording.
* Mix levels: recall of a number/name; **read the panel** (axes, control, what a bar/point means); **interpret** (what can/can't be concluded);
  **why was it done this way?** (design/control); **spot the claim–evidence mismatch**; statistics-in-context.
* Every paper-specific question has `source:[...]` (the paragraph(s)/panel(s) that state the facts); background-only questions have `bg:true`.
  Numbers in the stem and the right answer must be in the sources (use `derived` for computed ones).
* Figure quizzes: each question carries `img:'figNX'` (a real panel is shown above the question) — answerable from the image + legend + citing text.
  Use the panel guides/`FIGTEXT` in `app/data/panels-fig*.js`/`figtext-fig*.js` if they exist when you start (they are being written in parallel; re-read before you finish
  and never contradict them; the image and legend always win).
* Use `lesson:'G-<unit>'` (or a lesson id) so wrong answers feed the "weakest topics" list. Terms: only those taught by then (all of A–F for `G-` units).
* Cover the whole material; do not ask the same fact twice in one quiz.
