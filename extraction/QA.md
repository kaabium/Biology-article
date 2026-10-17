# Extraction QA log

Source: `paper/Esposito_Cell_Genomics_2022.pdf` (27 PDF pages; printed pages 1–18 and e1–e8).
Esposito, Polidori et al. (2022) *Cell Genomics* 2, 100171. CC BY-NC-ND 4.0.

This file logs **every kind of fix** made while turning the PDF into the app's text, the
checks that were run, things that were checked and deliberately **not** fixed (because they
are printed that way), and anything still uncertain. The content QA (scientific review of
lessons, cards and quizzes) is logged in the second half of this file.

---

## 1. Pipeline (how the text was extracted)

| Step | Script | What it does |
|---|---|---|
| 1 | `scripts/dump_chars.py` | Dumps every glyph of the PDF text layer (pdfplumber) with font name, size, colour, bounding box and true baseline → `raw/chars.json`. |
| 2 | `scripts/lines.py` | **Font-aware glyph repair** (table in §2), ligature expansion, accent composition, line building on the true baseline, superscript/subscript detection, inter-word spaces inferred from glyph gaps (the PDF stores no space characters). |
| 3 | `scripts/extract.py` | Column assignment (two-column pages vs full-width), removal of running headers/footers, line-end hyphen decisions, paragraph assembly, HTML markup (italic, bold, sup/sub, citations). |
| 4 | `scripts/flows.py` | Splits each page into reading-order *flows*: front matter, summary, body, figure legends (one flow per figure), back matter, references, STAR Methods, key resources table. Panel letters inside figures are kept as crop anchors only. |
| 5 | `scripts/build_paper.py` | Stable IDs, sections, figures/panels, references, key resources table, cross-references → `paper.json` and `app/data/paper.js`. |
| 6 | `scripts/figures.py` | 300-dpi renders, figure crops, letter-anchored panel crops + manual corrections (`panel_overrides.json`). |
| QA | `scripts/zoom.py`, `overlay.py`, `panel_overlay.py`, `gridzoom.py` | Contact sheets that put the extracted text next to the printed line, paragraph-start overlays on page images, panel-box overlays with a coordinate grid. |

Re-run everything with:

```
cd extraction/scripts
python3 dump_chars.py ../../paper/Esposito_Cell_Genomics_2022.pdf ../raw/chars.json   # slow (~3 min)
python3 flows.py && python3 build_paper.py && python3 figures.py
```

## 2. Glyph repairs (extraction artifacts — fixed)

The PDF text layer stores symbols from special fonts as the wrong ASCII letter or as an
unmapped glyph ID. Because the *font name* identifies them unambiguously, they were repaired
by font, not by guessing from context. Every one of the 78 printed lines that contain a
repaired symbol was compared with the 200-dpi page image (contact sheets, §6) — all match.

| Font in PDF | Glyph in text layer | Printed character | Count | PDF pages |
|---|---|---|---|---|
| `AdvPS3F4C13` | `m` | µ (micro: µL, µg, µM, µm) | 51 | 22–26 |
| `AdvPS480274` | `B` | ○ (open bullet, STAR Methods contents) | 27 | 15 |
| `AdvP4C4E74` | `(cid:4)` | ° (degree: 37°C, −80°C) | 23 | 21–27 |
| `AdvP7DED` | `3` | × (multiplication: 1.2 × 10⁻⁷, 1,500 × g, 95°C × 1 min) | 13 | 6, 10, 14, 22–24 |
| `AdvPSMPi6` | `d` | ● (bullet) | 11 | 1, 15, 21 |
| `AdvP4C4E74` | `(cid:1)` | − (minus: log2FC = −1.81, 10⁻⁷, −80°C) | 7 | 6, 10, 14, 22 |
| `AdvPSSym` | `(cid:2)` | ® | 7 | 20, 21 |
| `AdvP4C4E74` | `(cid:3)` | ∼ (approximately: ∼8%, ∼4 molecules) | 6 | 8, 12, 24, 25 |
| `AdvP4C4E74` | `0` | ′ (prime: 5′, 3′; "Incubate 5′") | 6 | 16, 22–26 |
| `AdvPSSym` | `ª` | © | 2 | 1, 2 |
| `AdvPS480274` | `+` | ★ (STAR★METHODS) | 2 | 15, 20 |
| `AdvPS4731B1` | `R` | ≥ ("≥40% knockdown potency") | 1 | 10 |
| `AdvPS4731B1` | `%` | ≤ ("p ≤ 0.05") | 1 | 27 |
| `AdvPS3F4C13` | `b` | β (Wnt/β-catenin, ref 59) | 1 | 18 |
| `AdvPS3F4C13` | `g` | γ (IL2R γ null, ref 107) | 1 | 19 |

**Negative numbers.** All minus signs in the text layer are in the `AdvP4C4E74` font; all 7
were restored and checked on the page images: `log2 fold change [FC] = −1.81`,
`FDR = 1.2 × 10⁻⁷`, `log2FC = −1.15`, `FDR = 9.78 × 10⁻⁷`, `p = 4 × 10⁻⁵`, `p = 2.2 × 10⁻¹⁶`,
`stored at −80°C`. A regex scan for numbers preceded by a hyphen-minus (`(-1`, `= -0.5`)
found none. Negative values that appear only *inside figures* (e.g., dropout fold changes on
the axes of Figures 2G, 3B, 4E) are drawn as vector outlines, not text; they are described
from the image in the panel guides.

**µ check.** Every `mL / mg / mM` left in the text was checked: `2 mL` (media volume) and
`10 mM Tris-HCl / 0.1 mM EDTA` are real milli-units (plain `m` in the body font); all 51 µ came
from the symbol font.

Other glyph-level fixes:
- **Ligatures** `ﬁ ﬂ` → `fi fl` everywhere.
- **Split accents** (`Andre´ s`, `Lanzo´ s`, `Guigo´`, dotless `ı` + accent) were composed into
  single letters by glyph position: Andrés, Lanzós (×4), Guigó (×4), Arqué (×2), Investigación,
  Núria, Rémy, López, Hämmerle, Marín-Béjar, González, Pérez, Hengstschläger, Bergadà.
- **Double quotes**: the PDF encodes “ ” as two single-quote glyphs (‘‘ ’’). 52 pairs were
  normalised to “ ” (visually identical in print).
- **Degree spacing**: the small degree glyph produced false gaps ("50° C"); the print shows
  "50°C", so no space is inserted between ° and C. "95 °C" (with a space, PDF p22) is printed
  that way and was kept.
- **Superscript + punctuation**: false spaces before `;` `,` `.` `)` after a superscript were
  removed ("10⁻¹⁶; R = 0.8" — print has no space).

## 3. Line breaks and hyphens

- 228 line-end hyphens were found. 197 were joined (soft hyphenation) and 31 kept (real
  hyphens). Decision order: manual override → capital/digit on either side (keep) →
  hyphenated form seen elsewhere inside a line (keep) → joined form seen elsewhere (join) →
  compound prefix (keep) → otherwise **manual review**. All 57 cases without evidence were
  decided by hand (`HYPHEN_OVERRIDES` in `scripts/extract.py`); the full list with context is
  in `raw/hyphens.json`.
- Real hyphens restored at line breaks (pdftotext drops these): chromatin-modifying,
  transcriptome-wide, NSCLC-promoting, growth-promoting, migration-promoting, DNA-dependent,
  three-dimensional, pan-hallmark(s), non-hits, cell-cycle, dose-response, Mann-Whitney,
  two-tailed, paired-end, RNA-seq, Cas9-expressing, LDEV-free, knowledge-based, Near-optimal,
  CRISPRi-based, non-coding, non-small, Cordon-Cardo, Pauli-Behn, KEK 2018-01801.
- Special case: "lib- / DECKO-NSCLC1" (author contributions) is a soft break → `libDECKO-NSCLC1`.
- URLs broken across lines were re-joined without a space
  (`https://www.biosearchtech.com/support/resources/stellaris-protocols`,
  `https://dcc.icgc.org/releases/PCAWG/consensus_cnv/GISTIC_analysis`,
  `https://doi.org/10.1101/gr.254219.119`, `https://www.graphpad.com/scientific-software/prism/`).
- `ENSG000 / 00232386` (an Ensembl ID broken across a line, PDF p27) → `ENSG00000232386`.

## 4. Removed non-text (running heads, footers, figure text)

- Running headers on every page (`ll` logo glyphs, `OPEN ACCESS`, `Article`, `Cell Genomics`)
  and footers (`Cell Genomics 2, 100171, September 14, 2022 N`, `eN`) were removed by position
  (baseline < 95 pt or > 750 pt). The cover footer and the page-1 license line are kept once,
  as their own blocks (`cover-citation`, `front-license`).
- `(legend continued on next page)`, `(legend on next page)` and `(Continued on next page)`
  markers (6 + 1) were removed.
- Text *inside* the figures is vector outlines (not in the text layer), except the panel letters
  (Helvetica-Bold 9 pt). The letters were removed from the text flow and used as crop anchors.

## 5. Structure, IDs and links

- 249 reading-order blocks in 56 sections; 6 figures with 49 lettered panels; 118 references;
  key resources table with 51 rows in 9 categories.
- IDs are stable and human-readable: `intro-p1`, `res-pipeline-p3`, `m-library-design-p2`,
  `fig2F` (panel), `ref-71` (reference 71), `krt-41` (key resources row).
- Paragraph boundaries come from first-line indentation (body, methods) or new-line panel
  labels `(A)` (legends). Paragraph starts were drawn on the page images for pages 4, 6, 8, 10,
  12, 14, 15 and 22 and compared with the print: all match (including the flush-left
  continuation "Complementary screens yielded…" on PDF p6, which is *not* a new paragraph).
- Citations: blue superscript numbers become tappable links; ranges are expanded
  (`2–4` → refs 2, 3, 4). Citation numbers printed at normal size are kept at normal size but
  linked (`colon cancer71` p10, `annotation37` p22, `protocol30,92` p22 — printed like that).
  Black (un-hyperlinked) superscripts that are clearly citations are linked and marked
  `data-unlinked` (`RSEM v1.3⁹⁷`, `Kallisto v0.46.0¹¹⁰`, `Sleuth v0.30¹¹¹`).
  Exponents (`10⁶`, `cm³`) are not treated as citations.
- Figure references ("Figures 1B and S1A") become links to the figure/panel; supplementary
  items (Figures S1–S6, Tables S1–S3, Data S1–S4, Files S1/S5) become "Supplementary: not in
  your PDF" badges.
- Key resources table: multi-line cells were merged; the CRISPETa "source" is a tiny
  superscript citation (92) whose two digits had been split into separate cells.

## 6. Verification performed

1. **Word-level cross-check** against `pdftotext` output: the only differences are removed
   headers/footers, restored hyphens and composed accents (which pdftotext gets wrong).
2. **Number-level cross-check**: every number in pdftotext's output is present in the
   extraction except page numbers/footers and reference list numbers (stored as structure),
   plus two places where pdftotext is wrong (`gr.254219. 119` and `KEK 201801801`).
3. **Symbol contact sheets**: all 78 lines containing a repaired symbol rendered next to the
   extracted text — all correct.
4. **Paragraph-start overlays** on the page images (see §5).
5. **Targeted zooms** of every suspicious spot (listed in §7).

## 7. Checked and kept verbatim (author/typesetter text, not extraction errors)

These are printed exactly like this in the PDF. They are kept verbatim in PAPER text and
explained in the PLAIN ENGLISH layer of the app.

| Where | Printed text | Probably meant |
|---|---|---|
| STAR Methods, Library design (p22, `m-library-design-p1`) | "We alsma, lo generated a novel transcriptome assembly" | "We also generated…" |
| Figure 2I legend | "The light blue bat indicates…" | "bar" |
| Figure 3D legend | "Top panels: LINC00115; bower panels: …" | "lower panels" |
| Figure 3F (in figure) | "Cristal violet OD" | "Crystal violet" |
| Figure 6B (in figure) | "Fluoscence in-situ hybridisation (FISH)" | "Fluorescence" |
| Figure 6F (in figure) | "DEGs, H450 = 3015" | H460 (the cell line used everywhere else) |
| Figure 6 legend (H), (I) | "(H) As for (C), for GCAWKR." / "(I) As for (D), …" | Panels H and I mirror D and E, not C and D |
| Results, `res-aso-p3` | "CCD-12Lu (primary)" | CCD-16Lu everywhere else (Figure 5A, STAR Methods, key resources table) |
| Results, `res-aso-p3` vs Summary | "Cancer Hallmark in Lung LncRNA 1" vs "Cancer Hallmarks in Lung LncRNA 1" | same lncRNA (CHiLL1) |
| Methods | "MRC5-CV1" (`m-aso-p1`, Fig 5A), "Mrc5-SV1" (`m-viability-2d-p1`), "MRC-5" (key resources, `m-expmodel-p1`) | same fibroblast line, three spellings |
| `m-library-cloning-p3` | "digested by BmsbI enzyme" | BsmBI |
| `m-expmodel-p1` | "Switerland", "Ronald Dijkmanthe" | Switzerland; (name kept as printed) |
| `m-competition-p1` | "pgRNAs-AASV1-GFP+" | AAVS1 |
| `m-hits-p1` | "remove sequences with 3 > cpm>666" | probably "cpm < 3 or cpm > 666" |
| `m-rnaseq-p2` | "Kallisto v0.46.0¹¹⁰", "Sleuth v0.30¹¹¹" | refs 116/117 are Kallisto/Sleuth (110 = CellProfiler, 111 = RNA structures) |
| `m-library-design-p2` | "RSEM v1.3⁹⁷" | ref 95 is RSEM (97 = MAGeCK); `m-quant-p2` cites RSEM as 95 |
| `m-quant-p2` | "StringTie⁹⁵ (1.3), RSEM⁹⁵ (1.3)" | ref 95 is RSEM; StringTie is not in the reference list |
| `m-data-p2` vs `m-hits-p4` | Zenodo "6912511" vs "zenodo.6912510" | two different Zenodo record numbers are printed |
| `m-data-p1` vs key resources | GEO "GSE207229" vs "GSE207228" / "GSE207227" | 229 is probably the umbrella SuperSeries of the two |
| Supplementary numbering | ASO sequences: "Table S1" (key resources) vs "Table S2" (`m-aso-p2`); NGS primers: "Table S2" (key resources) vs "Table S3" (`m-library-cloning-p3`, `m-gdna-p2`); library gene list: "Table S1" (`m-library-design-p3`) | inconsistent supplementary numbering |
| Reference 8 | "Nucleic Acids Res. 47, 2699–D134." | page range printed oddly |
| Reference 54 | "…in vitro and in vitro." | "in vitro and in vivo" |
| Reference 107 | "NOD/LtSz- scid IL2R γ null" (with gaps) | as printed |
| Reference 46 | "21, 243 full-length human cDNAs" | 21,243 |
| Reference 88 | "THOR , a conserved…" | as printed |
| `m-library-cloning-p2` | "electrocompetent EnduraTM cells" (TM not raised) | as printed |

**Numbers that differ between places in the paper (shown side by side in the app, never
resolved by guessing):**

- Library size: "12,000 pgRNAs" and "10 unique pgRNAs per target" (text) vs "1,200 targets
  (Depth: 10 pgRNAs)" (Figure 1A) vs "1200 pgRNAs library including controls" (Figure 1B —
  likely a figure typo for 12,000) vs "998 Candidates" (Figure 1B) vs "831 expressed lncRNAs,
  corresponding to 998 high-confidence TSSs" (text) vs "1003" lncRNA targets (Figure 1C bar,
  Figure 2F "n=1003", Figure 4D "Library … 1003").
- Controls: methods list 10 AAVS1 regions, 65 intergenic, 25 intronic, 53 positive and 50
  negative PCG controls; Figure 1C shows Intergenic 62, Introns PC genes 25, AAVS1 1, Growth
  repressors 70, Growth activators 31, Cisplatin sensitivity 78; the Results and Figure 4B say
  "109 positive controls"; Figure 2F shows n=35 neutral, n=51 positive ORF, n=58 positive TSS.
- Coverage: "Coverage 1000x" (Figure 1A), ">1,000x" (CRISPR screens methods), "66.7X"
  (bacterial colonies in library cloning — a different quantity).
- Cisplatin death-screen dose: "2 and 1 µM (IC20) for A549" (methods; two numbers for one IC).
- MOI: "MOI of 0.3–0.4" desired, "MOI of 0.3 was used" (methods), "MOI 0.3" (Figure 1A).

## 8. Uncertainties / open questions

- The meaning of "3 > cpm>666" (§7) cannot be resolved from the paper.
- The death-screen dose "2 and 1 µM (IC20) for A549" may mean 2 µM for one line and 1 µM for
  the other; the paper does not say which.
- Supplementary Figures S1–S6, Tables S1–S3, Data S1–S4 and Files S1/S5 are **not in the PDF**
  and no supplementary file exists in this repository. The app shows "Supplementary: not in
  your PDF" wherever they are cited and teaches only what the main text says about them.

## 9. Figures and panels

- Figures 1–6 rendered from the PDF at 300 dpi (vector-exact); the figure region is the ink
  between the running header and the legend. Graphical abstract: the embedded raster image
  (1191 × 1191 px, its native 300 ppi) extracted losslessly with `pdfimages`.
- 49 panels (Fig 1 A–F, Fig 2 A–I, Fig 3 A–F, Fig 4 A–H, Fig 5 A–H, Fig 6 A–L). Automatic
  crop: each ink pixel goes to the closest panel letter above-left of it. Every crop was then
  inspected by eye on contact sheets; 49/49 needed manual boxes because panels interlock
  (e.g., Fig 4B sits beside the top of the 4C ternary plot; Fig 5A's rotated column labels
  reach into 5C). Where a rectangle cannot avoid a neighbour, small white masks hide the
  neighbour's fragments (`panel_overrides.json`, "mask"). Remaining known compromise: some
  crops show a 1–2 pt sliver of a neighbouring panel's edge.
- Legends are attached verbatim to each figure (title) and each panel (its "(X) …" paragraph).

---

# Content QA log (scientific review)

(Filled in during and after Phase 2–3; see below.)
