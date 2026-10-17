# Brief: one-page summary and printable cheat sheet (`app/data/summary.js`)

`window.SUMMARY = { onePage: '<html>', cheat: '<html>', derived: [...] }`. Both are rendered by the app; the cheat sheet prints in two columns.
* **onePage** (300–700 words): a one-page PLAIN ENGLISH summary of the whole paper for someone who has finished the course: the question, the approach (pipeline, in order),
  the funnel and key numbers, the two lead targets and what is known about how they work, why it matters, and the limitations. Use this markup so the colours match the app:
  `<div class="kind k-plain"><div class="klabel">💬 Plain English</div> …<p>…</p> <div class="srcline">Source: <a href="#/read/res-aso/res-aso-p9">Results · RNA therapeutics ¶9</a></div></div>`;
  use `<div class="kind k-bgnd"><div class="klabel">📚 Background · not from the paper</div>…</div>` for textbook context, `k-memory` (💡 Memory aid) for a mnemonic. Every paper fact sits in a `k-plain` block with a Source line (links like `#/read/<unit>/<paragraph-id>`; `node tools/q.mjs find` shows ids).
* **cheat** (≥ 350 words; aim for ~600; must print on 2 pages): compact boxes — `<div class="cs-box"><h3>…</h3>…</div>` — containing: the pipeline as a flow (`<div class="cs-flow"><span>…</span><i>→</i><span>…</span></div>`), the funnel numbers, the key numbers table (`<table class="cs">`), the controls and why, the 10 most important definitions, the statistics decoder (P, FDR, log2, error bars …), the CHiLL1/GCAWKR comparison, and the limitations in one line each. Keep wording telegraphic but exact.
* Every number must exist in the paper (the validator checks them against all paragraphs/legends/figure text); put numbers you computed in `derived` and say so in the text.
* Terms: anything from Tracks A–F is fine. Keep the authors' spelling of names exactly (CHiLL1, GCAWKR, DNMBP-AS1 …).
