# Decisions

Choices made while building the study app without asking (as requested), with the reason
for each. Newest decisions are added at the end of each section.

## Repository and delivery

- **Branch.** Work is committed to `claude/study-app` (the session started on a detached
  `main`; changes go on a feature branch rather than straight onto `main`). Merge it into `main`
  when you are happy.
- **The PDF is copied into `paper/`** as `Esposito_Cell_Genomics_2022.pdf` so the extraction can be
  re-run from the repository alone.
- **No build step needed to use the app.** `index.html` + the `app/` folder work by
  double-clicking. `dist/study-app.html` is one self-contained file (≈6 MB) built by
  `node tools/build.mjs` and committed.
- **Data as `<script>` files, not JSON.** Browsers block `fetch()` from `file://` pages, so all
  data lives in `app/data/*.js` files that set `window.X = …`. This is what makes double-clicking
  `index.html` work offline.
- **Vanilla JavaScript, no frameworks, no CDNs, no web fonts.** Fully offline; system font stack.

## Text extraction (details in `extraction/QA.md`)

- **Font-aware glyph repair instead of pattern guessing.** The broken symbols (×, −, µ, °, ′, ≥,
  ≤, ∼, ®, ©, β, γ, ★, bullets) all come from a handful of special fonts, so they are repaired by
  font name — every occurrence, no guessing from context — and then checked on page images.
- **Only extraction artifacts are changed.** Author typos and inconsistencies are kept verbatim
  and listed in `extraction/QA.md` §7; the app explains them in the PLAIN ENGLISH layer.
- **Double quotes normalised.** The PDF stores “ ” as two single-quote glyphs (‘‘ ’’); they are
  shown as “ ” (identical in print).
- **Line-break hyphens decided one by one.** Automatic evidence first (is the hyphenated or the
  joined word used elsewhere in the paper?), then manual decisions for the 57 remaining cases.
- **Stable, readable IDs** (`res-aso-p9`, `fig5H`, `ref-71`, `krt-41`) so sources survive
  re-extraction and can be read by a human.
- **Citations printed at normal size** (e.g. "colon cancer71") are kept at normal size but linked.
  Black superscripts that are clearly citations are linked and marked "unlinked in the PDF".

## Figures

- **300 dpi vector renders** of each figure page (exact, since the figures are vector graphics);
  the graphical abstract is the PDF's embedded 1191 px raster, extracted losslessly.
- **WebP images (quality 86)**: visually identical to the render for small figure text and about
  half the size of JPEG, which keeps the single-file build near 6 MB. All current browsers
  (including iOS Safari 14+) display WebP.
- **Panel crops are anchored on the panel letters** in the PDF text layer, then every crop was
  inspected and corrected by hand; white "masks" hide fragments of neighbouring panels where a
  rectangle cannot avoid them.
- **Text inside figures is not in the PDF text layer** (it is drawn as outlines). Numbers that are
  only printed inside figures were transcribed by eye into `app/data/figtext.js` per panel so
  that flashcards and quizzes can cite them and the validator can check them.

## App design

- **Mobile-first** layout with a bottom tab bar; a sidebar replaces it on wide screens.
- **Four content kinds always look different**: grey serif box = PAPER (verbatim);
  blue = PLAIN ENGLISH; amber = BACKGROUND (not from the paper); purple = MEMORY AID. Two
  helper kinds: teal "Why it matters" and yellow "Heads-up" for author inconsistencies.
- **Pinch-zoom viewer**: at normal size a one-finger swipe scrolls the page (so figures never trap
  you); pinch or double-tap zooms; once zoomed, one finger pans. ⛶ opens full screen.
- **Progress in `localStorage`**, with export/import to a JSON file (or copy/paste text, for
  in-app browsers that cannot download files).
- **"Ask Claude"** copies a tutor prompt (the exact text + "I'm a complete beginner studying this
  paper…") using the Clipboard API, falling back to `execCommand('copy')`, and finally to a text
  box you can copy by hand.

## Curriculum and content (Phase 2–3)

- **Curriculum first, enforced by a program.** `CURRICULUM.md` (generated from `content/plan/*.py` →
  `content/plan.json`) fixes 101 lessons in 8 tracks, 370 glossary terms, and for each term exactly one *home
  lesson*. `tools/validate.mjs` fails if a lesson, glossary entry, card, panel guide or study layer uses a term
  before its home lesson (unless the text explains it inline and lists it in `defines`). This is how "never use a
  term before teaching it" is checked mechanically instead of by hope.
- **Recommended path ≠ track order.** The path interleaves tracks only where a later track is needed (fold change and
  replicates before the screens; p-values/FDR before pathway enrichment). Skipping is always allowed.
- **Track G is "the paper itself", written paragraph by paragraph.** Every paragraph of the main text and of STAR
  Methods gets PAPER (verbatim) → PLAIN ENGLISH → Why it matters → prerequisite links → 1–2 check questions. Pure
  administrative paragraphs (affiliations, reference list, contents list, key-resources rows) are exempt.
- **Lab methods are explained conceptually.** Every wet-lab technique is taught as a textbook does — what is done
  and why, what a good result looks like — never as a step-by-step protocol, reagent quantities or troubleshooting.
  (This also keeps the app focused on understanding rather than bench work, which an exam on the paper needs.)
- **Sources everywhere.** Every paper-specific statement carries a `source` (paragraph / figure-panel / reference /
  key-resources-row ID). The validator also checks that every number in a card, answer, plain-English paragraph or
  guide appears (as a value) in the cited source. Numbers that I computed myself (e.g. 80/831 ≈ 10%) must be
  declared in `derived` and are described as computed.
- **Figure text.** Numbers that exist only inside a figure image are transcribed by eye into `FIGTEXT` (panel by
  panel, with `[?]` for anything unreadable) so they can serve as a checked source. Supplementary items (Figures S1–S6,
  Tables S1–S3, Data S1–S4) are **not in the PDF**; the app says so each time one is cited and never describes what
  a supplementary panel "shows".
- **Opinion is labelled.** Evaluation, critique and "experiments that would strengthen the work" (Track H) are
  BACKGROUND/reasoning blocks (amber), never PLAIN ENGLISH; everything the paper did or found in Track H is a
  sourced PLAIN ENGLISH block.
- **Authors' typos stay.** Inconsistencies are shown as ⚠️ Heads-up notes, not corrected.
- **Parallel authoring, one validator.** Lessons, glossary, panel guides, study layers, cards, quizzes and exams were
  written by separate authors working on separate files against one authoring guide (`content/AUTHORING.md`) and the
  gold-standard examples (`content/examples/`), then validated together and reviewed by independent reviewers.
- **"Ask Claude" is a prompt generator, not an API call.** The app has no network access; it copies a tutor prompt
  (exact text + "I'm a complete beginner…") to the clipboard so you can paste it into the Claude app. It appears on
  every paragraph, figure and panel, lesson, flashcard, quiz question and exam question.

## Scope cut ("it is a simple article for an exam — finish faster")

- **101 lessons → 41.** The fine-grained plan was merged into 8–10-minute lessons (`content/plan/merge.py`; old → new ids in
  `content/plan/merge_map.json`). All 370 glossary terms were kept, each with one home lesson. Statistics (E) sit before the
  lessons that need them; the chart-reading lessons (F) come last before the paper.
- **No review wave, no repeated test rounds.** Authors ran the validator at most a few times; term-order notes became warnings
  (`--strict` makes them errors). The checks that stay errors are the ones that protect the exam facts: every paper fact has a
  valid source, every number appears in its cited source (or is declared as `derived`), verbatim quotes are exact, every panel
  has an image, legend, transcription and guide, files exist, nothing loads from the internet.
- **Section quizzes dropped.** Every lesson and every paper paragraph already has check questions; there is one quiz per figure
  (6, with 10–12 questions each) and two mock exams (33 and 34 questions).
- **One smoke run.** `node tools/smoke.mjs` (index.html and dist/study-app.html, phone and desktop, ~45 routes) passed with no console errors.

## Known quirks (not fixed on purpose)

- The validator's HTML-tag stripping removes text between a `<` and the next `>` in source paragraphs, so a printed "<3%" loses its
  number; authors worked around it with `derived`.
- Several inconsistencies in the paper itself are surfaced as ⚠️ Heads-up boxes and "conflict" rows in Key numbers rather than
  "fixed": library size (12,000 pgRNAs vs "1,200"), 831 / 998 / 1003 targets, control counts, "CCD-12Lu" vs "CCD-16Lu",
  n in legends vs n on plots, GEO / Zenodo accession numbers.
- Model answers in the mock exams use the blue Plain-English box; where they contain opinion it is labelled "In my assessment".
