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
