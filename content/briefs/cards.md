# Brief: flashcards (5 decks, ≥ 330 cards in total)

Spaced-repetition cards (the app schedules them SM-2 style; a card **unlocks** once the learner completes its `lesson`).
Data shape and an example of every deck: `content/examples/ex-rest.js` (and AUTHORING.md §3.5). Cards go in `app/data/cards-<deck>.js` as
`(window.CARDS = window.CARDS || []).push({...}, {...})`. Each card: `{id, deck, kind, lesson, front, back, source?, img?, derived?}`.

## Rules that make a good card (retrieval practice)
* **One idea per card.** The front is a real *question or prompt* (not a topic label); the back is the shortest correct answer (≤ 35 words), then,
  if useful, a half-sentence of "why/so what". No yes/no questions. Avoid "list everything" cards (≤ 4 items) — split them.
* Use `<b>` to mark the key word in a question or answer. Plain English; no term the learner has not met at the unlock lesson.
* `kind`: `paper` (states a paper-specific fact → `source:[ids]` **required**, numbers must be in the sources), `background` (general knowledge), `memory`
  (a mnemonic/analogy card).
* `lesson` = the lesson **after which the card unlocks**: for a term or method it is the term's home lesson (`node tools/q.mjs term <word>`); for a paper
  result/number/why-card use `G-<unit>` (e.g. `G-res-aso`, `G-m-hits`, `G-res-pipeline`; `node tools/q.mjs units` lists unit ids). The card may use only the
  terms taught up to that lesson (all of Tracks A–F are available to any `G-…` card). Cards in Tracks A–F whose answer is paper-specific are fine if they use
  `source`.
* IDs unique and meaningful (`t-tss`, `a-moi`, `n-831`, `w-two-asos`, `f-fig4C`, `c-dropout`).
* Mix **directions**: for important items write both "What is X?" and "Which term means …?" or "What is MOI 0.3 for?" and "Why MOI 0.3?".
* Accuracy first: read the paragraph (`node tools/q.mjs show <id>`) before writing a paper card. Use `derived` only for numbers you compute.
* Never use a card to teach a new idea — only to retrieve something a lesson, glossary entry or Track-G paragraph teaches. Align wording with `content/plan.json` terms.
* Do **all** the items requested. Count them at the end (`node -e` on your file) and report the counts per deck.
