# CURRICULUM

_Written before any lesson content (Phase 2, step 1). It lists every concept, term and method the paper uses, groups them into 5–10 minute lessons, and fixes the order so that **nothing is used before it is taught**. `content/plan/*.py` is the source; `python3 content/plan/build_plan.py` regenerates this file, `content/plan.json` and `app/data/curriculum.js`._

Paper: Esposito, Polidori et al. (2022), *Cell Genomics* 2, 100171.

## How the curriculum works

* **Eight tracks** (A–H). Track G is the paper itself, section by section; tracks A–F teach everything G needs; track H is critical thinking.
* **One idea per lesson**, each with an everyday analogy, an inline SVG diagram, "where this appears in the paper" links, and 3–5 check questions with explanations for right *and* wrong answers.
* **Glossary-driven teaching.** Every term in the glossary has exactly one *home lesson* (`taughtIn`). A lesson may only use a glossary term if its home lesson is earlier on the recommended path, or the lesson explains the term inline (`defines`). `tools/validate.mjs` enforces this.
* **Track A is plain words only**: every glossary term it uses is explained inline in one plain sentence.
* **Recommended path** (below) is a prerequisite-respecting order; tracks interleave only where a later track is needed (e.g. fold change and replicates before the screens; p-values and FDR before pathway enrichment).
* **Learning science used:** retrieval practice (check questions, flashcards, quizzes, "explain it back"), spaced repetition (SM-2-style flashcards, a living study planner), interleaving (mixed quizzes and mock exams), worked examples (statistics and fold-change lessons), words + pictures (every lesson has a diagram; every panel has a guide).

## Tracks

| Track | Title | Lessons | Minutes |
|---|---|---|---|
| A | The paper in 5 minutes | 3 | 22 |
| B | Biology from zero | 8 | 75 |
| C | Cancer from zero | 6 | 55 |
| D | Lab tools from zero | 11 | 106 |
| E | Numbers & statistics from zero | 5 | 50 |
| F | How to read figures | 4 | 36 |
| G | The paper, section by section | by paragraph (126 paragraphs, 28 methods sections) | ≈ 400 |
| H | Critical thinking | 4 | 38 |

### Track A — The paper in 5 minutes

The whole study as a simple story, in plain words only, with a one-page map and the 831 → 80 → 9 → 5 → 2 funnel.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| A1 | The whole study as a story, and its map | 8 | — | — | — |
| A2 | The funnel: 831 → 80 → 9 → 5 → 2 | 6 | A1 | Tier (Tier 1 / 2 / 3), Pan-hallmark, CHiLL1, GCAWKR | `res-aso-p3`, `res-aso-p8`, `res-aso-p9`, `fig5B`, `summary-p1`, `res-aso-p5` |
| A3 | Why it matters, and the cast of names | 8 | A1, A2 | candidate number, LINC00115, RP11-206L10.11, DNMBP-AS1, AC104024.3, CECR7, MIR23AHG, LINC00910, TNFRSF10B, ZBTB7A | `res-validation-p2`, `fig5B`, `res-validation-p5`, `res-validation-p1`, `res-validation-p3`, `fig3A` |

### Track B — Biology from zero

Cells, DNA, genes, RNA, proteins, and long noncoding RNAs — everything you need before the paper makes sense.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| B1 | Cells, the cell cycle and cell death | 10 | — | cell, nucleus, cytoplasm, tissue, proliferation, cell cycle, G1 phase, S phase, G2 phase, M phase (mitosis), checkpoint, doubling time, apoptosis, necrosis | `res-mechanism-p6`, `res-mechanism-p1`, `m-screen-cisplatin-p1`, `m-fish-p2`, `fig6B`, `fig6C` |
| B2 | DNA, chromosomes, genes and the genome | 9 | B1 | DNA, nucleotide (base), base pair (bp), complementary base pairing, 5′ and 3′ ends, chromosome, gene, genome, locus | `fig1E`, `limitations-p1`, `res-aso-p5`, `m-library-design-p3`, `m-eztracks-p2`, `res-pipeline-p1` |
| B3 | Genome coordinates, genome versions and strands | 8 | B2 | genome assembly (genome version), hg19, hg38, genome coordinates, kilobase (kb), DNA strand (plus / minus strand), antisense, upstream / downstream, liftOver | `m-cnv-p2`, `m-library-design-p2`, `m-eztracks-p1`, `m-cnv-p1`, `res-aso-p4`, `m-library-design-p1` |
| B4 | From DNA to RNA: transcription, the TSS, exons and splicing | 10 | B2 | transcription, RNA, RNA polymerase, transcript, promoter, transcription start site (TSS), bidirectional promoter, exon, intron, splicing, isoform, readthrough transcription | `res-aso-p4`, `m-library-design-p2`, `res-pipeline-p2`, `res-pipeline-p1`, `summary-p1`, `m-qpcr-p1` |
| B5 | Proteins, and coding vs noncoding RNA | 9 | B4 | protein, messenger RNA (mRNA), translation, ribosome, open reading frame (ORF), protein-coding gene (PCG), protein-coding potential, noncoding RNA, microRNA (miRNA) | `fig3C`, `res-multipheno-p3`, `fig2F`, `res-aso-p1`, `res-aso-p3`, `res-pipeline-p5` |
| B6 | Long noncoding RNAs, and where RNAs live | 10 | B5, B1 | long noncoding RNA (lncRNA), cis- vs trans-acting, MALAT1, PVT1, LINC00680, LINC00511, EZH2, GATA6, LATS2 and p57, named lung-cancer lncRNAs, subcellular localization | `intro-p3`, `res-multipheno-p4`, `limitations-p2`, `intro-p2`, `res-multipheno-p7`, `res-aso-p3` |
| B7 | Gene catalogs and gene expression | 10 | B6, B4 | gene annotation, GENCODE, FANTOM CAT, BIGTranscriptome, transcriptome assembly (StringTie), Ensembl gene ID (ENSG…), GTF file, expressed sequence tag (EST), ortholog, gene expression, upregulation, downregulation, transcriptome | `m-library-design-p1`, `res-aso-p4`, `m-library-design-p2`, `res-aso-p1`, `res-pipeline-p2`, `m-eztracks-p2` |
| B8 | Switches on the DNA and finding where a gene starts | 9 | B7 | enhancer, transcription factor, transcription factor binding site (TFBS), chromatin, DNA regulatory element, ENCODE, CAGE, DNase I hypersensitivity, ChromHMM | `m-library-design-p2`, `fig1B`, `res-mechanism-p4`, `m-eztracks-p1`, `res-validation-p4`, `res-pipeline-p1` |

### Track C — Cancer from zero

What cancer is, lung cancer, KRAS, cisplatin, cell lines vs normal cells, 3D models, mice, and patient datasets.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| C1 | What is cancer? Hallmarks, oncogenes and tumor suppressors | 10 | B1, B2 | cancer, tumor, hallmark of cancer, phenotype, pleiotropic, oncogene, tumor suppressor | `summary-p1`, `intro-p3`, `intro-p5`, `res-multipheno-p1`, `discussion-p1`, `intro-p2` |
| C2 | Mutations, copy number, lung cancer, KRAS and EGFR | 10 | C1, B2 | mutation, copy-number alteration (CNA), amplification, deletion (DNA lost), non-small cell lung cancer (NSCLC), lung adenocarcinoma (LUAD), large cell carcinoma, metastasis, invasion, cell migration, KRAS, EGFR, activating mutation, targeted therapy, KRAS G12C | `intro-p1`, `summary-p1`, `m-public-rnaseq-p1`, `m-pdx-p1`, `intro-p3`, `res-pipeline-p1` |
| C3 | Chemotherapy, cisplatin and drug resistance | 8 | C2 | chemotherapy, cisplatin, chemoresistance, inhibitory concentration (IC20, IC30, IC80), dose–response, combination therapy | `res-multipheno-p7`, `m-screen-cisplatin-p1`, `intro-p1`, `res-pipeline-p3`, `res-multipheno-p2`, `m-library-design-p3` |
| C4 | Cell lines vs normal lung cells | 9 | C2 | cell line, A549, H460 (NCI-H460), H441 (NCI-H441), HEK293T, HBEC3-KT, MRC-5, CCD-16Lu, immortalized cells, primary cells, non-transformed (normal) cells, cell background, STR profiling, mycoplasma, generalizability, fetal bovine serum (FBS), culture medium, PBS (phosphate-buffered saline), trypsinization | `m-expmodel-p1`, `m-expmodel-p2`, `m-viability-2d-p1`, `m-aso-p1`, `res-aso-p3`, `res-integration-p3` |
| C5 | 2D, 3D, organoids and mouse models (PDX) | 9 | C4 | 2D culture (monolayer), 3D culture, spheroid, organoid, Matrigel, in vitro / in vivo / ex vivo, patient-derived xenograft (PDX), xenograft, immunodeficient mouse (NSG), BE874 | `res-aso-p6`, `m-viability-3d-p3`, `res-aso-p7`, `fig5F`, `discussion-p5`, `m-viability-3d-p1` |
| C6 | Patient data collections, and tumor vs normal | 9 | C2, B7 | TCGA, TANRIC, PCAWG, CCLE, cohort, GEO (Gene Expression Omnibus), Zenodo, adjacent normal tissue, survival analysis, tumor subtype | `m-public-rnaseq-p1`, `res-aso-p5`, `contrib-p1`, `fig4F`, `fig4H`, `res-aso-p2` |

### Track D — Lab tools from zero

CRISPR, viruses, pooled screens, ASOs and every validation assay in the paper, plus RNA-seq and pathways.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| D1 | CRISPR and paired-guide deletion (DECKO) | 10 | B2, B4, C2, B7 | CRISPR, Cas9, guide RNA (gRNA, sgRNA), loss of function (LOF), knockout (KO), CRISPR-del (CRISPR deletion), paired guide RNA (pgRNA), DECKO, guide efficiency score, off-target effect, CRISPRi, Cas13 | `res-pipeline-p1`, `limitations-p2`, `res-pipeline-p5`, `res-multipheno-p5`, `m-decko-p2`, `m-library-cloning-p2` |
| D2 | Delivering CRISPR: plasmids, lentivirus, MOI and selection | 10 | B2, C4 | plasmid, lentivirus, viral titer, transduction, transfection, multiplicity of infection (MOI), antibiotic selection, puromycin, blasticidin, polybrene, stable cell line, fluorescent protein, GFP, mCherry, BFP | `m-titer-p1`, `m-competition-p1`, `m-decko-p3`, `m-lentivirus-p1`, `m-rescue-p1`, `m-lentivirus-p2` |
| D3 | Flow cytometry, pooled screens and libraries | 10 | D2, B1, D1, E1 | flow cytometry, FACS, gate (gating), FlowJo, pooled screen, arrayed screen, CRISPR library, screen, hit, candidate, libDECKO-NSCLC1, library depth (guides per target), coverage, cloning, CRISPETa, Gini coefficient (library evenness) | `discussion-p2`, `res-pipeline-p4`, `m-screen-prolif-p1`, `res-pipeline-p5`, `m-library-cloning-p2`, `m-library-cloning-p3` |
| D4 | From cells to counts, dropout and positive selection | 10 | D3, B2, E1 | genomic DNA (gDNA), PCR, primer, next-generation sequencing (NGS), sequencing read, time point (T0, T2, T3), CASPR, MAGeCK, GuideScan, Sanger sequencing, batch effect, recombination events, dropout screen (negative selection), positive selection screen, depleted guides | `m-hits-p1`, `m-gdna-p2`, `m-library-cloning-p3`, `m-screen-prolif-p1`, `m-pcr-gdna-p1`, `fig1E` |
| D5 | The three screens and their controls | 10 | D4, D3, B1, C3, C2, D1 | CFSE, cisplatin survival screen, cisplatin death screen, transwell assay, migration screen, neutral control, positive control, negative (non-targeting) control, AAVS1, RPS5, named positive-control genes, essential gene, intergenic region, ORF targeting | `res-multipheno-p3`, `fig3C`, `res-pipeline-p3`, `m-library-design-p3`, `res-validation-p3`, `res-multipheno-p6` |
| D6 | ASOs: switching off an RNA, and using them well | 10 | B2, B4, D2 | antisense oligonucleotide (ASO), knockdown, RNase H, locked nucleic acid (LNA), RNA therapeutics (RNATX), shRNA, non-targeting control ASO, knockdown efficiency, ASO cocktail, orthogonal validation, on-target effect, toxicity (side effects) | `fig5A`, `res-aso-p3`, `res-mechanism-p2`, `discussion-p2`, `m-aso-p2`, `intro-p6` |
| D7 | Checking the work: gels, qRT-PCR and the competition assay | 9 | D4, D1, B7, E1, D2, D3 | gel electrophoresis, amplicon, qRT-PCR (RT-qPCR), cDNA, housekeeping (normalisation) gene, GAPDH, HPRT1, competition assay | `m-qpcr-p1`, `m-library-cloning-p1`, `fig6C`, `m-pcr-gdna-p1`, `fig1E`, `res-aso-p4` |
| D8 | Cell assays: viability, Annexin V, cell cycle, migration | 10 | C4, B1, D3, D5 | cell viability, CellTiter-Glo (luminescence, RLU), Annexin V, DAPI, Ki-67, cell-cycle assay, Dean-Jett Fox (DJF) model, crystal violet, optical density (OD) | `m-cellcycle-p1`, `m-viability-2d-p1`, `m-viability-3d-p1`, `m-viability-3d-p3`, `m-apoptosis-p1`, `m-migration-assay-p1` |
| D9 | Where is it, and does it matter? FISH, fractionation, rescue | 9 | B6, D2, D7, D6, B7 | RNA-FISH, probe (probe set), confocal microscopy, CellProfiler (SpeckleCounting), cell fractionation, overexpression experiment, rescue experiment | `fig6B`, `res-mechanism-p1`, `starmethods-toc-p30`, `m-fish-h`, `m-fish-p1`, `m-fish-p2` |
| D10 | RNA-seq, counting fairly and pathway enrichment | 10 | B7, D4, E4, E3 | RNA-seq, differentially expressed gene (DEG), transcript quantification (Kallisto, Sleuth), RSEM, normalization, CPM (counts per million), TPM (transcripts per million), FPKM, pathway enrichment, KEGG, MSigDB, GSEA, Enrichr (enrichR) | `m-library-design-p2`, `fig6D`, `fig6F`, `fig6J`, `res-mechanism-p2`, `fig5H` |
| D11 | What the named pathways do | 8 | D10, C1, B1 | signaling pathway, p53 pathway, MAPK pathway, PI3K–Akt pathway, mTORC1 / mTOR, VEGF signaling, glycolysis, epithelial–mesenchymal transition (EMT), TNF-alpha signaling via NF-kB, interferon alpha response, hypoxia, estrogen response, cholesterol homeostasis, mitotic spindle, apical junction, proteoglycans in cancer | `res-mechanism-p4`, `res-mechanism-p6`, `res-mechanism-p3`, `intro-p4`, `res-mechanism-p5`, `discussion-p6` |

### Track E — Numbers & statistics from zero

CPM/TPM/FPKM, fold change and log2, replicates, correlation, p-values, FDR, ROC/AUC and the paper's TPP pipeline.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| E1 | Fold change, log2, replicates and error bars | 10 | A1 | fold change (FC, log2FC), logarithm (log2, log10), replicate (biological vs technical), mean (average), median, standard deviation (SD), error bars, sample size (n), percentile, GraphPad Prism and R | `m-hits-p2`, `fig5A`, `fig3F`, `fig5C`, `fig5E`, `fig5F` |
| E2 | Correlation, z-scores and p-values | 10 | E1 | correlation, Pearson correlation (R), regression line (trendline), anti-correlation, Z-score, p-value, null hypothesis, statistical significance, ns (not significant), scientific notation | `fig2D`, `fig2E`, `fig6E`, `m-hits-p2`, `fig2H`, `fig6F` |
| E3 | Choosing a test: t-tests, rank tests, overlap tests | 10 | E2 | one-tailed test, two-tailed test, t-test (Student's t test), Welch's t-test, non-parametric (rank-based) test, Wilcoxon test, Mann–Whitney test, Kruskal–Wallis test, Fisher's exact test, hypergeometric test | `fig4F`, `fig3D`, `fig3F`, `fig4H`, `fig5E`, `fig5F` |
| E4 | Many tests at once (FDR), and ROC / AUC | 10 | E2, E3 | multiple testing, false discovery rate (FDR), Benjamini–Hochberg procedure, false positive, false negative, q-value (adjusted p-value), ROC curve, area under the curve (AUC), true-positive rate, false-positive rate | `m-hits-p5`, `m-hits-p4`, `res-multipheno-p2`, `fig4B`, `res-validation-p1`, `res-integration-p2` |
| E5 | Combining screens, and decoding the legends | 10 | E4, D4, E1, E2, E3 | target prioritization pipeline (TPP), Robust Rank Aggregation (RRA), empirical Brown's method (EBM), harmonic mean p-value (HMP), effect size | `m-hits-p4`, `fig4A`, `res-integration-p1`, `discussion-p3`, `contrib-p1`, `m-data-p2` |

### Track F — How to read figures

One mini-lesson per chart type in the paper, each practised on a real panel.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| F1 | Bars, boxes, scatter plots and time courses | 9 | E1, E3, E2, D6 | bar chart, box plot, violin plot, scatter plot, time course | `fig6D`, `fig4E` |
| F2 | Contour, volcano, heatmap, ROC, ternary, UpSet and stacked plots | 10 | F1, E4, E1, E2, E5, D4 | contour plot, volcano plot, heatmap, ternary plot, petal plot, UpSet plot, stacked bar chart | `fig4C`, `m-hits-p6`, `m-quant-p1` |
| F3 | Genome tracks, gels, flow plots and microscopy | 10 | B4, B3, B8, D7, D3, D9, D5, C5 | genome-browser track, conservation (phastCons), RIDL, conserved RNA structure (CRS), repeat elements (LINE, SINE, LTR), CpG island, ezTracks, FSC-A (forward scatter) | `m-eztracks-p1`, `m-eztracks-p2`, `res-mechanism-p1`, `starmethods-toc-p31`, `m-eztracks-h`, `m-quant-p2` |
| F4 | The small print: n, error bars, P labels and "ns" | 7 | E2, E3 | — | — |

### Track G — The paper, section by section

The core: every paragraph (verbatim) with Plain English, why it matters, prerequisites and check questions, plus a guide to every figure panel.

Units follow the paper (see "Track G units" below).

### Track H — Critical thinking

Claims and evidence, controls, alternative explanations, limitations, the patent, strengthening experiments, strengths vs weaknesses.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| H1 | The paper's logic chain, and every control | 10 | F4 | — | — |
| H2 | DNA vs RNA effects, off-targets and cell-line effects | 10 | H1 | — | — |
| H3 | The limitations, the patent and the conflict of interest | 9 | H1 | conflict of interest, patent application | `decl-h`, `decl-p1` |
| H4 | Strengthening experiments, strengths vs weaknesses | 9 | H2, H3, H1 | — | — |

### Track G units (the paper, section by section)

Main text: `summary` → `intro` → `res-pipeline` → `res-multipheno` → `res-validation` → `res-integration` → `res-aso` → `res-mechanism` → `discussion` → `limitations`.

End matter: `decl` → `contrib` → `ack` (the declaration of interests is used by H7).

STAR Methods: `m-krt` → `m-lead-contact` → `m-materials` → `m-data` → `m-expmodel` → `m-lentivirus` → `m-decko` → `m-library-design` → `m-library-cloning` → `m-titer` → `m-screens` → `m-gdna` → `m-hits` → `m-public-rnaseq` → `m-pcr-gdna` → `m-competition` → `m-pdx` → `m-aso` → `m-viability-2d` → `m-viability-3d` → `m-rescue` → `m-apoptosis` → `m-cellcycle` → `m-migration-assay` → `m-qpcr` → `m-rnaseq` → `m-fish` → `m-eztracks` → `m-cnv` → `m-quant`.

Every non-exempt paragraph gets: PAPER (verbatim) → PLAIN ENGLISH → Why it matters → basics you need (links) → 1–2 check questions. Every figure panel gets: the question it answers, how to read it, what it shows, key numbers, a likely exam question.

## Recommended path (prerequisite order)

| # | Step | Needs first |
|---|---|---|
| 1 | A1 · The whole study as a story, and its map | — |
| 2 | A2 · The funnel: 831 → 80 → 9 → 5 → 2 | A1 |
| 3 | A3 · Why it matters, and the cast of names | A1, A2 |
| 4 | B1 · Cells, the cell cycle and cell death | — |
| 5 | B2 · DNA, chromosomes, genes and the genome | B1 |
| 6 | B3 · Genome coordinates, genome versions and strands | B2 |
| 7 | B4 · From DNA to RNA: transcription, the TSS, exons and splicing | B2 |
| 8 | B5 · Proteins, and coding vs noncoding RNA | B4 |
| 9 | B6 · Long noncoding RNAs, and where RNAs live | B5, B1 |
| 10 | B7 · Gene catalogs and gene expression | B6, B4 |
| 11 | B8 · Switches on the DNA and finding where a gene starts | B7 |
| 12 | C1 · What is cancer? Hallmarks, oncogenes and tumor suppressors | B1, B2 |
| 13 | C2 · Mutations, copy number, lung cancer, KRAS and EGFR | C1, B2 |
| 14 | C3 · Chemotherapy, cisplatin and drug resistance | C2 |
| 15 | C4 · Cell lines vs normal lung cells | C2 |
| 16 | C5 · 2D, 3D, organoids and mouse models (PDX) | C4 |
| 17 | C6 · Patient data collections, and tumor vs normal | C2, B7 |
| 18 | D1 · CRISPR and paired-guide deletion (DECKO) | B2, B4, C2, B7 |
| 19 | D2 · Delivering CRISPR: plasmids, lentivirus, MOI and selection | B2, C4 |
| 20 | E1 · Fold change, log2, replicates and error bars | A1 |
| 21 | D3 · Flow cytometry, pooled screens and libraries | D2, B1, D1, E1 |
| 22 | D4 · From cells to counts, dropout and positive selection | D3, B2, E1 |
| 23 | D5 · The three screens and their controls | D4, D3, B1, C3, C2, D1 |
| 24 | D6 · ASOs: switching off an RNA, and using them well | B2, B4, D2 |
| 25 | D7 · Checking the work: gels, qRT-PCR and the competition assay | D4, D1, B7, E1, D2, D3 |
| 26 | D8 · Cell assays: viability, Annexin V, cell cycle, migration | C4, B1, D3, D5 |
| 27 | D9 · Where is it, and does it matter? FISH, fractionation, rescue | B6, D2, D7, D6, B7 |
| 28 | E2 · Correlation, z-scores and p-values | E1 |
| 29 | E3 · Choosing a test: t-tests, rank tests, overlap tests | E2 |
| 30 | E4 · Many tests at once (FDR), and ROC / AUC | E2, E3 |
| 31 | E5 · Combining screens, and decoding the legends | E4, D4, E1, E2, E3 |
| 32 | D10 · RNA-seq, counting fairly and pathway enrichment | B7, D4, E4, E3 |
| 33 | D11 · What the named pathways do | D10, C1, B1 |
| 34 | F1 · Bars, boxes, scatter plots and time courses | E1, E3, E2, D6 |
| 35 | F2 · Contour, volcano, heatmap, ROC, ternary, UpSet and stacked plots | F1, E4, E1, E2, E5, D4 |
| 36 | F3 · Genome tracks, gels, flow plots and microscopy | B4, B3, B8, D7, D3, D9, D5, C5 |
| 37 | F4 · The small print: n, error bars, P labels and "ns" | E2, E3 |
| 38 | **Track G — main text (summary → limitations)** | all of A–F |
| 39 | **Track G — declaration of interests, contributions, acknowledgments** | all of A–F |
| 40 | **Track G — STAR Methods** | all of A–F |
| 41 | H1 · The paper's logic chain, and every control | F4 |
| 42 | H2 · DNA vs RNA effects, off-targets and cell-line effects | H1 |
| 43 | H3 · The limitations, the patent and the conflict of interest | H1 |
| 44 | H4 · Strengthening experiments, strengths vs weaknesses | H2, H3, H1 |

## Prerequisite map

Arrows point from a lesson to the lessons that need it. (The validator checks that every prerequisite comes earlier on the path.)

```
A1   → A2, A3, E1
A2   → A3
B1   → B2, B6, C1, D3, D5, D8, D11
B2   → B3, B4, C1, C2, D1, D2, D4, D6
B3   → F3
B4   → B5, B7, D1, D6, F3
B5   → B6
B6   → B7, D9
B7   → B8, C6, D1, D7, D9, D10
B8   → F3
C1   → C2, D11
C2   → C3, C4, C6, D1, D5
C3   → D5
C4   → C5, D2, D8
C5   → F3
D1   → D3, D5, D7
D2   → D3, D6, D7, D9
E1   → D3, D4, D7, E2, E5, F1, F2
D3   → D4, D5, D7, D8, F3
D4   → D5, D7, E5, D10, F2
D5   → D8, F3
D6   → D9, F1
D7   → D9, F3
D9   → F3
E2   → E3, E4, E5, F1, F2, F4
E3   → E4, E5, D10, F1, F4
E4   → E5, D10, F2
E5   → F2
D10  → D11
F1   → F2
F4   → H1
H1   → H2, H3, H4
H2   → H4
H3   → H4
```

## Coverage check: what the paper uses vs what is taught

* 370 glossary terms are planned; 333 of them occur in the main text or figure legends (the others are background needed to understand figures or to compare methods).
* Supplementary items (Figures S1–S6, Tables S1–S3, Data S1–S4) are cited but not in the PDF; lessons teach only what the main text says about them.
* Terms found in the paper text but deliberately **not** given their own entry: catalog numbers, reagent vendor names, R package versions, and purely administrative words.

