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
| A | The paper in 5 minutes | 5 | 30 |
| B | Biology from zero | 16 | 118 |
| C | Cancer from zero | 12 | 90 |
| D | Lab tools from zero | 30 | 234 |
| E | Numbers & statistics from zero | 13 | 106 |
| F | How to read figures | 16 | 107 |
| G | The paper, section by section | by paragraph (126 paragraphs, 28 methods sections) | ≈ 400 |
| H | Critical thinking | 9 | 73 |

### Track A — The paper in 5 minutes

The whole study as a simple story, in plain words only, with a one-page map and the 831 → 80 → 9 → 5 → 2 funnel.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| A1 | The whole study as a simple story | 5 | — | — | — |
| A2 | One-page map of the pipeline | 6 | A1 | — | — |
| A3 | The funnel: 831 → 80 → 9 → 5 → 2 | 6 | A2 | Tier (Tier 1 / 2 / 3), Pan-hallmark, CHiLL1, GCAWKR | `res-aso-p3`, `res-aso-p8`, `res-aso-p9`, `fig5B`, `summary-p1`, `res-aso-p5` |
| A4 | Why it matters | 5 | A1 | — | — |
| A5 | Cast of characters: the names you will see | 8 | A3 | candidate number, LINC00115, RP11-206L10.11, DNMBP-AS1, AC104024.3, CECR7, MIR23AHG, LINC00910, TNFRSF10B, ZBTB7A | `res-validation-p2`, `fig5B`, `res-validation-p5`, `res-validation-p1`, `res-validation-p3`, `fig3A` |

### Track B — Biology from zero

Cells, DNA, genes, RNA, proteins, and long noncoding RNAs — everything you need before the paper makes sense.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| B1 | Cells: the tiny rooms of life (nucleus vs cytoplasm) | 6 | — | cell, nucleus, cytoplasm, tissue | `res-mechanism-p1`, `m-fish-p2`, `fig6B`, `fig6C`, `res-integration-p4`, `res-aso-p3` |
| B2 | How cells grow and divide: the cell cycle | 8 | B1 | proliferation, cell cycle, G1 phase, S phase, G2 phase, M phase (mitosis), checkpoint, doubling time | `res-mechanism-p6`, `m-screen-cisplatin-p1`, `summary-p1`, `intro-p4`, `intro-p6`, `res-multipheno-p1` |
| B3 | How cells die: apoptosis (and necrosis) | 6 | B2 | apoptosis, necrosis | `res-mechanism-p4`, `res-mechanism-p5`, `starmethods-toc-p25`, `m-apoptosis-h`, `m-apoptosis-p1`, `fig6G` |
| B4 | DNA: the instruction book | 8 | B1 | DNA, nucleotide (base), base pair (bp), complementary base pairing, 5′ and 3′ ends | `res-pipeline-p1`, `res-integration-p4`, `limitations-p1`, `starmethods-toc-p15`, `starmethods-toc-p18`, `m-gdna-h` |
| B5 | Chromosomes, genes and the genome | 7 | B4 | chromosome, gene, genome, locus | `res-aso-p5`, `m-library-design-p3`, `m-eztracks-p2`, `fig1E`, `res-aso-p4`, `intro-p4` |
| B6 | Genome coordinates, genome versions (hg19/hg38) and strands | 8 | B5 | genome assembly (genome version), hg19, hg38, genome coordinates, kilobase (kb), DNA strand (plus / minus strand), antisense, upstream / downstream, liftOver | `m-cnv-p2`, `m-library-design-p2`, `m-eztracks-p1`, `m-cnv-p1`, `res-aso-p4`, `m-library-design-p1` |
| B7 | From DNA to RNA: transcription, promoters and the TSS | 8 | B5 | transcription, RNA, RNA polymerase, transcript, promoter, transcription start site (TSS), bidirectional promoter | `m-library-design-p2`, `res-pipeline-p1`, `res-pipeline-p2`, `summary-p1`, `res-aso-p4`, `m-qpcr-p1` |
| B8 | Exons, introns, splicing and isoforms | 8 | B7 | exon, intron, splicing, isoform, readthrough transcription | `res-aso-p4`, `fig6A`, `res-pipeline-p2`, `res-mechanism-p1`, `m-library-design-p2`, `m-eztracks-p2` |
| B9 | Proteins, ORFs and protein-coding genes | 8 | B8 | protein, messenger RNA (mRNA), translation, ribosome, open reading frame (ORF), protein-coding gene (PCG), protein-coding potential | `fig3C`, `res-multipheno-p3`, `fig2F`, `res-aso-p1`, `res-aso-p3`, `res-pipeline-p5` |
| B10 | Coding vs noncoding RNA | 6 | B9 | noncoding RNA, microRNA (miRNA) | `summary-p1`, `intro-p2`, `ack-p1` |
| B11 | Long noncoding RNAs (lncRNAs): what they are and how they might work | 9 | B10 | long noncoding RNA (lncRNA), cis- vs trans-acting, MALAT1, PVT1, LINC00680, LINC00511, EZH2, GATA6, LATS2 and p57, named lung-cancer lncRNAs | `intro-p3`, `res-multipheno-p4`, `limitations-p2`, `intro-p2`, `res-multipheno-p7`, `res-aso-p3` |
| B12 | Where RNAs live: nuclear vs cytoplasmic | 6 | B11, B1 | subcellular localization | `res-aso-p4`, `res-mechanism-p1`, `discussion-p6` |
| B13 | Gene catalogs: GENCODE, FANTOM CAT and BIGTranscriptome | 7 | B11 | gene annotation, GENCODE, FANTOM CAT, BIGTranscriptome, transcriptome assembly (StringTie), Ensembl gene ID (ENSG…), GTF file, expressed sequence tag (EST), ortholog | `m-library-design-p1`, `res-aso-p1`, `res-aso-p4`, `m-library-design-p2`, `m-eztracks-p2`, `res-pipeline-p2` |
| B14 | Gene expression: genes turned up and down | 7 | B7 | gene expression, upregulation, downregulation, transcriptome | `res-pipeline-p5`, `res-pipeline-p2`, `res-integration-p4`, `res-aso-p2`, `res-aso-p4`, `res-aso-p5` |
| B15 | Switches on the DNA: enhancers, transcription factors and chromatin | 8 | B14 | enhancer, transcription factor, transcription factor binding site (TFBS), chromatin, DNA regulatory element, ENCODE | `m-library-design-p2`, `res-mechanism-p4`, `m-eztracks-p1`, `res-validation-p4`, `res-pipeline-p1`, `limitations-p1` |
| B16 | How to tell where a gene starts: CAGE, DNase I and ChromHMM | 8 | B15, B13 | CAGE, DNase I hypersensitivity, ChromHMM | `m-library-design-p2`, `fig1B` |

### Track C — Cancer from zero

What cancer is, lung cancer, KRAS, cisplatin, cell lines vs normal cells, 3D models, mice, and patient datasets.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| C1 | What is cancer? | 6 | B2 | cancer, tumor | `summary-p1`, `intro-p2`, `intro-p3`, `res-multipheno-p1`, `res-multipheno-p7`, `res-aso-p2` |
| C2 | The hallmarks of cancer | 7 | C1 | hallmark of cancer, phenotype, pleiotropic | `summary-p1`, `intro-p5`, `res-multipheno-p1`, `discussion-p1`, `discussion-p3`, `intro-p2` |
| C3 | Oncogenes and tumor suppressors | 7 | C2, B5 | oncogene, tumor suppressor | `res-mechanism-p4`, `summary-p1`, `res-integration-p4`, `res-aso-p5`, `res-mechanism-p1`, `discussion-p1` |
| C4 | Mutations, copy-number gains (amplification) and losses (deletion) | 8 | C3, B4 | mutation, copy-number alteration (CNA), amplification, deletion (DNA lost) | `res-multipheno-p3`, `m-cnv-p3`, `summary-p1`, `fig4H`, `intro-p1`, `discussion-p2` |
| C5 | Lung cancer: NSCLC, adenocarcinoma, large cell carcinoma and metastasis | 8 | C1 | non-small cell lung cancer (NSCLC), lung adenocarcinoma (LUAD), large cell carcinoma, metastasis, invasion, cell migration | `intro-p3`, `intro-p6`, `res-multipheno-p2`, `res-aso-p2`, `discussion-p1`, `res-multipheno-p7` |
| C6 | KRAS and EGFR mutations | 7 | C3, C4, C5 | KRAS, EGFR, activating mutation, targeted therapy, KRAS G12C | `intro-p1`, `res-aso-p3`, `discussion-p5`, `m-pdx-p1`, `summary-p1`, `intro-p6` |
| C7 | Chemotherapy, cisplatin, drug resistance and IC20 / IC30 / IC80 | 9 | C5 | chemotherapy, cisplatin, chemoresistance, inhibitory concentration (IC20, IC30, IC80), dose–response, combination therapy | `res-multipheno-p7`, `m-screen-cisplatin-p1`, `intro-p1`, `res-pipeline-p3`, `res-multipheno-p2`, `m-library-design-p3` |
| C8 | Cell lines vs normal lung cells (A549, H460, H441 and others) | 9 | C5 | cell line, A549, H460 (NCI-H460), H441 (NCI-H441), HEK293T, HBEC3-KT, MRC-5, CCD-16Lu, immortalized cells, primary cells, non-transformed (normal) cells, cell background, STR profiling, mycoplasma, generalizability, fetal bovine serum (FBS), culture medium, PBS (phosphate-buffered saline), trypsinization | `m-expmodel-p1`, `m-expmodel-p2`, `m-viability-2d-p1`, `m-aso-p1`, `res-aso-p3`, `res-integration-p3` |
| C9 | Growing cells in 2D, 3D spheroids and organoids | 7 | C8 | 2D culture (monolayer), 3D culture, spheroid, organoid, Matrigel, in vitro / in vivo / ex vivo | `res-aso-p6`, `discussion-p5`, `m-viability-3d-p1`, `m-viability-3d-p3`, `discussion-p1`, `limitations-p2` |
| C10 | Patient-derived xenografts and immunodeficient mice | 7 | C9 | patient-derived xenograft (PDX), xenograft, immunodeficient mouse (NSG), BE874 | `res-aso-p7`, `fig5F`, `m-pdx-p1`, `starmethods-toc-p20`, `m-pdx-h`, `m-pdx-p2` |
| C11 | Patient data collections: TCGA, TANRIC, PCAWG, CCLE and GEO | 8 | C5, B14 | TCGA, TANRIC, PCAWG, CCLE, cohort, GEO (Gene Expression Omnibus), Zenodo | `m-public-rnaseq-p1`, `fig4F`, `fig4H`, `res-aso-p2`, `res-aso-p5`, `res-aso-p9` |
| C12 | Tumor vs normal tissue, survival and tumor subtypes | 7 | C11 | adjacent normal tissue, survival analysis, tumor subtype | `res-aso-p5`, `res-integration-p4`, `m-public-rnaseq-p1`, `res-aso-p4`, `contrib-p1`, `intro-p1` |

### Track D — Lab tools from zero

CRISPR, viruses, pooled screens, ASOs and every validation assay in the paper, plus RNA-seq and pathways.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| D1 | CRISPR-Cas9 and guide RNAs | 8 | B4, B5 | CRISPR, Cas9, guide RNA (gRNA, sgRNA), loss of function (LOF), knockout (KO) | `res-pipeline-p1`, `summary-p1`, `intro-p4`, `intro-p6`, `res-pipeline-h`, `res-multipheno-p1` |
| D2 | CRISPR deletion with paired guides (DECKO): why delete the TSS? | 9 | D1, B7, C4 | CRISPR-del (CRISPR deletion), paired guide RNA (pgRNA), DECKO, guide efficiency score, off-target effect | `res-pipeline-p1`, `res-pipeline-p4`, `m-library-design-p4`, `res-pipeline-p5`, `res-multipheno-p3`, `res-aso-p3` |
| D3 | CRISPRi and Cas13 (only as far as the paper needs them) | 6 | D1, B14 | CRISPRi, Cas13 | `intro-p5`, `limitations-p1`, `limitations-p2` |
| D4 | Plasmids and lentivirus: delivering instructions into cells | 8 | B4, C8 | plasmid, lentivirus, viral titer | `m-lentivirus-p1`, `m-decko-p3`, `starmethods-toc-p13`, `m-titer-h`, `m-titer-p1`, `m-materials-p1` |
| D5 | Transduction, MOI and antibiotic selection | 8 | D4 | transduction, transfection, multiplicity of infection (MOI), antibiotic selection, puromycin, blasticidin, polybrene, stable cell line | `m-titer-p1`, `m-lentivirus-p2`, `m-decko-p3`, `m-rescue-p1`, `m-competition-p1`, `m-lentivirus-p1` |
| D6 | Fluorescent proteins: GFP, mCherry and BFP | 6 | D5 | fluorescent protein, GFP, mCherry, BFP | `m-competition-p1`, `fig3C`, `res-pipeline-p5`, `fig1D`, `res-validation-p3` |
| D7 | Flow cytometry and FACS: counting and sorting cells one by one | 8 | D6, B1 | flow cytometry, FACS, gate (gating), FlowJo | `m-screen-prolif-p1`, `m-cellcycle-p1`, `m-apoptosis-p1`, `fig3C`, `m-lentivirus-p2`, `fig1D` |
| D8 | Pooled screens: testing thousands of suspects in one dish | 9 | D2, D5, D7, E3 | pooled screen, arrayed screen, CRISPR library, screen, hit, candidate | `discussion-p2`, `summary-p1`, `res-pipeline-p2`, `res-pipeline-p5`, `fig3A`, `fig4D` |
| D9 | Libraries, guides per target and coverage | 8 | D8 | libDECKO-NSCLC1, library depth (guides per target), coverage, cloning, CRISPETa, Gini coefficient (library evenness) | `res-pipeline-p4`, `m-library-cloning-p3`, `m-library-design-p4`, `m-library-cloning-p2`, `m-decko-p1`, `discussion-p2` |
| D10 | From cells to counts: PCR, sequencing and read counts | 9 | D9, B4 | genomic DNA (gDNA), PCR, primer, next-generation sequencing (NGS), sequencing read, time point (T0, T2, T3), CASPR, MAGeCK, GuideScan, Sanger sequencing, batch effect, recombination events | `m-hits-p1`, `m-gdna-p2`, `m-library-cloning-p3`, `m-pcr-gdna-p1`, `fig1E`, `m-hits-p2` |
| D11 | Dropout vs positive selection screens | 8 | D8, E2 | dropout screen (negative selection), positive selection screen, depleted guides | `res-multipheno-p2`, `fig2A`, `res-multipheno-p1`, `res-multipheno-p3`, `res-multipheno-p6`, `m-hits-p3` |
| D12 | The proliferation screens: dropout and CFSE | 8 | D11, D7, B2 | CFSE | `res-multipheno-p2`, `res-multipheno-p6`, `m-screen-prolif-p1`, `m-hits-p3`, `fig2A` |
| D13 | The cisplatin screens: survival and death | 8 | D11, C7 | cisplatin survival screen, cisplatin death screen | `m-screen-cisplatin-p1` |
| D14 | The migration screen and the transwell assay | 7 | D11, C5 | transwell assay, migration screen | `res-multipheno-p7`, `fig2C`, `fig3E`, `m-screen-migration-p1`, `m-migration-assay-p1`, `fig6L` |
| D15 | Controls in the screen: neutral, positive, and ORF vs TSS targeting | 9 | D8, D2 | neutral control, positive control, negative (non-targeting) control, AAVS1, RPS5, named positive-control genes, essential gene, intergenic region, ORF targeting | `res-multipheno-p3`, `fig3C`, `res-pipeline-p3`, `m-library-design-p3`, `res-validation-p3`, `res-integration-p2` |
| D16 | ASOs: how a short strand can switch a gene off | 9 | B4, B7 | antisense oligonucleotide (ASO), knockdown, RNase H, locked nucleic acid (LNA), RNA therapeutics (RNATX), shRNA | `discussion-p2`, `summary-p1`, `res-validation-p4`, `res-validation-p5`, `res-aso-p1`, `res-aso-p3` |
| D17 | Using ASOs well: two ASOs per target, controls, knockdown % and cocktails | 9 | D16, D5 | non-targeting control ASO, knockdown efficiency, ASO cocktail, orthogonal validation, on-target effect, toxicity (side effects) | `fig5A`, `m-aso-p2`, `fig5G`, `res-aso-p3`, `res-mechanism-p2`, `res-aso-p8` |
| D18 | DNA gels and genotyping PCR: did the deletion happen? | 7 | D10, D2 | gel electrophoresis, amplicon | `m-library-cloning-p1`, `m-pcr-gdna-p1`, `fig1E` |
| D19 | qRT-PCR: measuring how much RNA is left | 9 | D18, B14, E2 | qRT-PCR (RT-qPCR), cDNA, housekeeping (normalisation) gene, GAPDH, HPRT1 | `m-qpcr-p1`, `fig6C`, `res-aso-p4`, `starmethods-toc-p28`, `m-rescue-p1`, `m-qpcr-h` |
| D20 | The competition assay | 7 | D6, D7, D11 | competition assay | `res-validation-p3`, `starmethods-toc-p19`, `m-competition-h`, `fig3C` |
| D21 | Luminescence viability assays (CellTiter-Glo) | 7 | C8, B3 | cell viability, CellTiter-Glo (luminescence, RLU) | `m-viability-2d-p1`, `m-viability-3d-p1`, `m-viability-3d-p3`, `res-aso-p6`, `res-aso-p7`, `res-aso-p8` |
| D22 | Annexin V: catching cells in the act of dying | 6 | B3, D7 | Annexin V | `m-apoptosis-p1`, `fig6G` |
| D23 | Cell-cycle staining: DAPI and Ki-67 | 7 | B2, D7 | DAPI, Ki-67, cell-cycle assay, Dean-Jett Fox (DJF) model | `m-cellcycle-p1`, `m-fish-p1`, `starmethods-toc-p26`, `m-cellcycle-h`, `fig6K` |
| D24 | Crystal violet migration assay | 6 | D14 | crystal violet, optical density (OD) | `m-migration-assay-p1`, `fig3F`, `fig6L` |
| D25 | RNA-FISH and microscopy | 7 | B12, D6 | RNA-FISH, probe (probe set), confocal microscopy, CellProfiler (SpeckleCounting) | `fig6B`, `m-fish-p1`, `res-mechanism-p1`, `res-mechanism-p2`, `starmethods-toc-p30`, `contrib-p1` |
| D26 | Cell fractionation: nuclear vs cytoplasmic RNA | 6 | B12, D19 | cell fractionation | `res-mechanism-p1`, `starmethods-toc-p30`, `m-fish-h`, `m-fish-p2`, `fig6C` |
| D27 | Overexpression and rescue experiments | 7 | D17, B14 | overexpression experiment, rescue experiment | `res-aso-p3`, `m-rescue-p1`, `starmethods-toc-p24`, `m-rescue-h` |
| D28 | RNA-seq and differentially expressed genes (DEGs) | 9 | E1, B14, D10 | RNA-seq, differentially expressed gene (DEG), transcript quantification (Kallisto, Sleuth), RSEM | `m-library-design-p2`, `fig6D`, `m-quant-p2`, `res-aso-p9`, `res-mechanism-p2`, `starmethods-toc-p17` |
| D29 | Pathway enrichment: KEGG, MSigDB and transcription-factor sites | 9 | D28, E10, E9 | pathway enrichment, KEGG, MSigDB, GSEA, Enrichr (enrichR) | `res-integration-p2`, `res-mechanism-p3`, `m-hits-p5`, `m-rnaseq-p3`, `fig6F`, `fig6J` |
| D30 | What the named pathways roughly do (p53, MAPK, PI3K–Akt, mTORC1 …) | 10 | D29, C3, B3, B2 | signaling pathway, p53 pathway, MAPK pathway, PI3K–Akt pathway, mTORC1 / mTOR, VEGF signaling, glycolysis, epithelial–mesenchymal transition (EMT), TNF-alpha signaling via NF-kB, interferon alpha response, hypoxia, estrogen response, cholesterol homeostasis, mitotic spindle, apical junction, proteoglycans in cancer | `res-mechanism-p4`, `res-mechanism-p6`, `res-mechanism-p3`, `intro-p4`, `res-mechanism-p5`, `discussion-p6` |

### Track E — Numbers & statistics from zero

CPM/TPM/FPKM, fold change and log2, replicates, correlation, p-values, FDR, ROC/AUC and the paper's TPP pipeline.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| E1 | Counting RNA fairly: CPM, TPM and FPKM | 8 | D10, B14 | normalization, CPM (counts per million), TPM (transcripts per million), FPKM | `m-hits-p2`, `m-qpcr-p1`, `fig3F`, `fig5A`, `fig5C`, `fig5G` |
| E2 | Fold change and log2 | 8 | A1 | fold change (FC, log2FC), logarithm (log2, log10) | `res-validation-p1`, `m-hits-p2`, `fig3B`, `fig3E`, `fig5A`, `res-multipheno-p3` |
| E3 | Replicates, mean, SD and error bars | 8 | E2 | replicate (biological vs technical), mean (average), median, standard deviation (SD), error bars, sample size (n), percentile, GraphPad Prism and R | `m-hits-p2`, `fig3F`, `fig5C`, `fig5E`, `fig5F`, `fig5G` |
| E4 | Correlation and regression lines | 8 | E2, E3 | correlation, Pearson correlation (R), regression line (trendline), anti-correlation | `fig6E`, `m-hits-p2`, `fig2D`, `fig2E`, `fig2H`, `fig6F` |
| E5 | Z-scores | 6 | E3 | Z-score | `m-hits-p2`, `fig2D`, `fig2E` |
| E6 | p-values, "significant", "ns" and scientific notation | 9 | E3 | p-value, null hypothesis, statistical significance, ns (not significant), scientific notation | `m-hits-p4`, `fig2F`, `fig6J`, `m-hits-p1`, `m-hits-p5`, `res-multipheno-p3` |
| E7 | One- vs two-tailed tests and t-tests (including Welch's) | 8 | E6 | one-tailed test, two-tailed test, t-test (Student's t test), Welch's t-test | `fig4F`, `fig3D`, `fig3F`, `fig5E`, `fig5F`, `fig6L` |
| E8 | Rank-based tests: Wilcoxon, Mann–Whitney and Kruskal–Wallis | 7 | E7 | non-parametric (rank-based) test, Wilcoxon test, Mann–Whitney test, Kruskal–Wallis test | `fig2F`, `fig5G` |
| E9 | Overlap and enrichment tests: Fisher's exact and hypergeometric | 8 | E6 | Fisher's exact test, hypergeometric test | `m-cnv-p3`, `fig4H`, `res-multipheno-p6` |
| E10 | Many tests at once: multiple testing and FDR (why FDR < 0.2) | 9 | E6, E9 | multiple testing, false discovery rate (FDR), Benjamini–Hochberg procedure, false positive, false negative, q-value (adjusted p-value) | `m-hits-p4`, `m-hits-p5`, `res-validation-p1`, `res-integration-p2`, `m-hits-p1`, `m-hits-p3` |
| E11 | ROC curves and AUC | 8 | E10 | ROC curve, area under the curve (AUC), true-positive rate, false-positive rate | `m-hits-p5`, `res-multipheno-p2`, `fig4B` |
| E12 | Combining screens: rank aggregation, Brown's method and the harmonic-mean p-value (TPP) | 10 | E10, E11, D11 | target prioritization pipeline (TPP), Robust Rank Aggregation (RRA), empirical Brown's method (EBM), harmonic mean p-value (HMP), effect size | `m-hits-p4`, `fig4A`, `res-integration-p1`, `discussion-p3`, `contrib-p1`, `m-data-p2` |
| E13 | Practice: decoding the statistics in the figure legends | 9 | E3, E4, E5, E6, E7, E8, E9, E10, E11, E12 | — | — |

### Track F — How to read figures

One mini-lesson per chart type in the paper, each practised on a real panel.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| F1 | Bar charts with error bars | 6 | E3 | bar chart | — |
| F2 | Box plots and violin plots | 7 | E3, E8 | box plot, violin plot | `fig6D` |
| F3 | Scatter plots with a regression line | 7 | E4 | scatter plot | `fig4E` |
| F4 | Contour (density) plots | 6 | F3 | contour plot | — |
| F5 | Volcano-style plots | 7 | E10, E2, F3 | volcano plot | — |
| F6 | Heatmaps | 7 | E2, E5 | heatmap | — |
| F7 | Time courses and line plots | 7 | E3, D17 | time course | — |
| F8 | ROC curves in a figure | 6 | E11 | — | — |
| F9 | Ternary and petal plots | 8 | E12 | ternary plot, petal plot | `fig4C` |
| F10 | UpSet plots | 6 | D11 | UpSet plot | `m-hits-p6`, `m-quant-p1` |
| F11 | Stacked bars and composition charts | 6 | F1 | stacked bar chart | — |
| F12 | Genome-browser tracks | 9 | B8, B6, B16 | genome-browser track, conservation (phastCons), RIDL, conserved RNA structure (CRS), repeat elements (LINE, SINE, LTR), CpG island, ezTracks | `m-eztracks-p1`, `m-eztracks-p2`, `res-mechanism-p1`, `starmethods-toc-p31`, `m-eztracks-h`, `m-quant-p2` |
| F13 | DNA gels in a figure | 5 | D18 | — | — |
| F14 | Flow cytometry plots | 6 | D7 | FSC-A (forward scatter) | — |
| F15 | Microscopy and FISH images | 7 | D25, D14, C9 | — | — |
| F16 | The small print: n, error bars, P labels, asterisks and "ns" | 7 | E6, E7 | — | — |

### Track G — The paper, section by section

The core: every paragraph (verbatim) with Plain English, why it matters, prerequisites and check questions, plus a guide to every figure panel.

Units follow the paper (see "Track G units" below).

### Track H — Critical thinking

Claims and evidence, controls, alternative explanations, limitations, the patent, strengthening experiments, strengths vs weaknesses.

| ID | Lesson | Min | Needs first | New terms taught | Where the paper uses them (paragraph / panel IDs) |
|---|---|---|---|---|---|
| H1 | The paper's logic as a chain: claim → evidence → figure panel | 9 | F16 | — | — |
| H2 | Every control and why it exists | 9 | H1 | — | — |
| H3 | DNA vs RNA effects: why ASOs were needed | 8 | H1 | — | — |
| H4 | ASO off-target effects and how the paper handles them | 8 | H1 | — | — |
| H5 | Cell-line-specific effects and background independence | 8 | H1 | — | — |
| H6 | The limitations section, line by line | 8 | H1 | — | — |
| H7 | The declared patent and conflict of interest | 6 | H1 | conflict of interest, patent application | `decl-h`, `decl-p1` |
| H8 | Experiments that would strengthen the work | 8 | H3, H4, H5, H6 | — | — |
| H9 | Strengths vs weaknesses: essay-ready summary | 9 | H1, H2, H3, H4, H5, H6, H7, H8 | — | — |

### Track G units (the paper, section by section)

Main text: `summary` → `intro` → `res-pipeline` → `res-multipheno` → `res-validation` → `res-integration` → `res-aso` → `res-mechanism` → `discussion` → `limitations`.

End matter: `decl` → `contrib` → `ack` (the declaration of interests is used by H7).

STAR Methods: `m-krt` → `m-lead-contact` → `m-materials` → `m-data` → `m-expmodel` → `m-lentivirus` → `m-decko` → `m-library-design` → `m-library-cloning` → `m-titer` → `m-screens` → `m-gdna` → `m-hits` → `m-public-rnaseq` → `m-pcr-gdna` → `m-competition` → `m-pdx` → `m-aso` → `m-viability-2d` → `m-viability-3d` → `m-rescue` → `m-apoptosis` → `m-cellcycle` → `m-migration-assay` → `m-qpcr` → `m-rnaseq` → `m-fish` → `m-eztracks` → `m-cnv` → `m-quant`.

Every non-exempt paragraph gets: PAPER (verbatim) → PLAIN ENGLISH → Why it matters → basics you need (links) → 1–2 check questions. Every figure panel gets: the question it answers, how to read it, what it shows, key numbers, a likely exam question.

## Recommended path (prerequisite order)

| # | Step | Needs first |
|---|---|---|
| 1 | A1 · The whole study as a simple story | — |
| 2 | A2 · One-page map of the pipeline | A1 |
| 3 | A3 · The funnel: 831 → 80 → 9 → 5 → 2 | A2 |
| 4 | A4 · Why it matters | A1 |
| 5 | A5 · Cast of characters: the names you will see | A3 |
| 6 | B1 · Cells: the tiny rooms of life (nucleus vs cytoplasm) | — |
| 7 | B2 · How cells grow and divide: the cell cycle | B1 |
| 8 | B3 · How cells die: apoptosis (and necrosis) | B2 |
| 9 | B4 · DNA: the instruction book | B1 |
| 10 | B5 · Chromosomes, genes and the genome | B4 |
| 11 | B6 · Genome coordinates, genome versions (hg19/hg38) and strands | B5 |
| 12 | B7 · From DNA to RNA: transcription, promoters and the TSS | B5 |
| 13 | B8 · Exons, introns, splicing and isoforms | B7 |
| 14 | B9 · Proteins, ORFs and protein-coding genes | B8 |
| 15 | B10 · Coding vs noncoding RNA | B9 |
| 16 | B11 · Long noncoding RNAs (lncRNAs): what they are and how they might work | B10 |
| 17 | B12 · Where RNAs live: nuclear vs cytoplasmic | B11, B1 |
| 18 | B13 · Gene catalogs: GENCODE, FANTOM CAT and BIGTranscriptome | B11 |
| 19 | B14 · Gene expression: genes turned up and down | B7 |
| 20 | B15 · Switches on the DNA: enhancers, transcription factors and chromatin | B14 |
| 21 | B16 · How to tell where a gene starts: CAGE, DNase I and ChromHMM | B15, B13 |
| 22 | C1 · What is cancer? | B2 |
| 23 | C2 · The hallmarks of cancer | C1 |
| 24 | C3 · Oncogenes and tumor suppressors | C2, B5 |
| 25 | C4 · Mutations, copy-number gains (amplification) and losses (deletion) | C3, B4 |
| 26 | C5 · Lung cancer: NSCLC, adenocarcinoma, large cell carcinoma and metastasis | C1 |
| 27 | C6 · KRAS and EGFR mutations | C3, C4, C5 |
| 28 | C7 · Chemotherapy, cisplatin, drug resistance and IC20 / IC30 / IC80 | C5 |
| 29 | C8 · Cell lines vs normal lung cells (A549, H460, H441 and others) | C5 |
| 30 | C9 · Growing cells in 2D, 3D spheroids and organoids | C8 |
| 31 | C10 · Patient-derived xenografts and immunodeficient mice | C9 |
| 32 | C11 · Patient data collections: TCGA, TANRIC, PCAWG, CCLE and GEO | C5, B14 |
| 33 | C12 · Tumor vs normal tissue, survival and tumor subtypes | C11 |
| 34 | D1 · CRISPR-Cas9 and guide RNAs | B4, B5 |
| 35 | D2 · CRISPR deletion with paired guides (DECKO): why delete the TSS? | D1, B7, C4 |
| 36 | D3 · CRISPRi and Cas13 (only as far as the paper needs them) | D1, B14 |
| 37 | D4 · Plasmids and lentivirus: delivering instructions into cells | B4, C8 |
| 38 | D5 · Transduction, MOI and antibiotic selection | D4 |
| 39 | D6 · Fluorescent proteins: GFP, mCherry and BFP | D5 |
| 40 | D7 · Flow cytometry and FACS: counting and sorting cells one by one | D6, B1 |
| 41 | E2 · Fold change and log2 | A1 |
| 42 | E3 · Replicates, mean, SD and error bars | E2 |
| 43 | D8 · Pooled screens: testing thousands of suspects in one dish | D2, D5, D7, E3 |
| 44 | D9 · Libraries, guides per target and coverage | D8 |
| 45 | D10 · From cells to counts: PCR, sequencing and read counts | D9, B4 |
| 46 | E1 · Counting RNA fairly: CPM, TPM and FPKM | D10, B14 |
| 47 | D11 · Dropout vs positive selection screens | D8, E2 |
| 48 | D12 · The proliferation screens: dropout and CFSE | D11, D7, B2 |
| 49 | D13 · The cisplatin screens: survival and death | D11, C7 |
| 50 | D14 · The migration screen and the transwell assay | D11, C5 |
| 51 | D15 · Controls in the screen: neutral, positive, and ORF vs TSS targeting | D8, D2 |
| 52 | D16 · ASOs: how a short strand can switch a gene off | B4, B7 |
| 53 | D17 · Using ASOs well: two ASOs per target, controls, knockdown % and cocktails | D16, D5 |
| 54 | E4 · Correlation and regression lines | E2, E3 |
| 55 | E5 · Z-scores | E3 |
| 56 | D18 · DNA gels and genotyping PCR: did the deletion happen? | D10, D2 |
| 57 | D19 · qRT-PCR: measuring how much RNA is left | D18, B14, E2 |
| 58 | D20 · The competition assay | D6, D7, D11 |
| 59 | D21 · Luminescence viability assays (CellTiter-Glo) | C8, B3 |
| 60 | D22 · Annexin V: catching cells in the act of dying | B3, D7 |
| 61 | D23 · Cell-cycle staining: DAPI and Ki-67 | B2, D7 |
| 62 | D24 · Crystal violet migration assay | D14 |
| 63 | D25 · RNA-FISH and microscopy | B12, D6 |
| 64 | D26 · Cell fractionation: nuclear vs cytoplasmic RNA | B12, D19 |
| 65 | D27 · Overexpression and rescue experiments | D17, B14 |
| 66 | D28 · RNA-seq and differentially expressed genes (DEGs) | E1, B14, D10 |
| 67 | E6 · p-values, "significant", "ns" and scientific notation | E3 |
| 68 | E7 · One- vs two-tailed tests and t-tests (including Welch's) | E6 |
| 69 | E8 · Rank-based tests: Wilcoxon, Mann–Whitney and Kruskal–Wallis | E7 |
| 70 | E9 · Overlap and enrichment tests: Fisher's exact and hypergeometric | E6 |
| 71 | E10 · Many tests at once: multiple testing and FDR (why FDR < 0.2) | E6, E9 |
| 72 | E11 · ROC curves and AUC | E10 |
| 73 | E12 · Combining screens: rank aggregation, Brown's method and the harmonic-mean p-value (TPP) | E10, E11, D11 |
| 74 | E13 · Practice: decoding the statistics in the figure legends | E3, E4, E5, E6, E7, E8, E9, E10, E11, E12 |
| 75 | D29 · Pathway enrichment: KEGG, MSigDB and transcription-factor sites | D28, E10, E9 |
| 76 | D30 · What the named pathways roughly do (p53, MAPK, PI3K–Akt, mTORC1 …) | D29, C3, B3, B2 |
| 77 | F1 · Bar charts with error bars | E3 |
| 78 | F2 · Box plots and violin plots | E3, E8 |
| 79 | F3 · Scatter plots with a regression line | E4 |
| 80 | F4 · Contour (density) plots | F3 |
| 81 | F5 · Volcano-style plots | E10, E2, F3 |
| 82 | F6 · Heatmaps | E2, E5 |
| 83 | F7 · Time courses and line plots | E3, D17 |
| 84 | F8 · ROC curves in a figure | E11 |
| 85 | F9 · Ternary and petal plots | E12 |
| 86 | F10 · UpSet plots | D11 |
| 87 | F11 · Stacked bars and composition charts | F1 |
| 88 | F12 · Genome-browser tracks | B8, B6, B16 |
| 89 | F13 · DNA gels in a figure | D18 |
| 90 | F14 · Flow cytometry plots | D7 |
| 91 | F15 · Microscopy and FISH images | D25, D14, C9 |
| 92 | F16 · The small print: n, error bars, P labels, asterisks and "ns" | E6, E7 |
| 93 | **Track G — main text (summary → limitations)** | all of A–F |
| 94 | **Track G — declaration of interests, contributions, acknowledgments** | all of A–F |
| 95 | **Track G — STAR Methods** | all of A–F |
| 96 | H1 · The paper's logic as a chain: claim → evidence → figure panel | F16 |
| 97 | H2 · Every control and why it exists | H1 |
| 98 | H3 · DNA vs RNA effects: why ASOs were needed | H1 |
| 99 | H4 · ASO off-target effects and how the paper handles them | H1 |
| 100 | H5 · Cell-line-specific effects and background independence | H1 |
| 101 | H6 · The limitations section, line by line | H1 |
| 102 | H7 · The declared patent and conflict of interest | H1 |
| 103 | H8 · Experiments that would strengthen the work | H3, H4, H5, H6 |
| 104 | H9 · Strengths vs weaknesses: essay-ready summary | H1, H2, H3, H4, H5, H6, H7, H8 |

## Prerequisite map

Arrows point from a lesson to the lessons that need it. (The validator checks that every prerequisite comes earlier on the path.)

```
A1   → A2, A4, E2
A2   → A3
A3   → A5
B1   → B2, B4, B12, D7
B2   → B3, C1, D12, D23, D30
B3   → D21, D22, D30
B4   → B5, C4, D1, D4, D10, D16
B5   → B6, B7, C3, D1
B6   → F12
B7   → B8, B14, D2, D16
B8   → B9, F12
B9   → B10
B10  → B11
B11  → B12, B13
B12  → D25, D26
B13  → B16
B14  → B15, C11, D3, D19, D27, D28, E1
B15  → B16
B16  → F12
C1   → C2, C5
C2   → C3
C3   → C4, C6, D30
C4   → C6, D2
C5   → C6, C7, C8, C11, D14
C7   → D13
C8   → C9, D4, D21
C9   → C10, F15
C11  → C12
D1   → D2, D3
D2   → D8, D15, D18
D4   → D5
D5   → D6, D8, D17
D6   → D7, D20, D25
D7   → D8, D12, D20, D22, D23, F14
D8   → D9, D11, D15
D9   → D10
D10  → D18, D28, E1
D11  → D12, D13, D14, D20, E12, F10
D14  → D24, F15
D16  → D17
D17  → D27, F7
D18  → D19, F13
D19  → D26
D25  → F15
D28  → D29
D29  → D30
E1   → D28
E2   → D11, D19, E3, E4, F5, F6
E3   → D8, E4, E5, E6, E13, F1, F2, F7
E4   → E13, F3
E5   → E13, F6
E6   → E7, E9, E10, E13, F16
E7   → E8, E13, F16
E8   → E13, F2
E9   → D29, E10, E13
E10  → D29, E11, E12, E13, F5
E11  → E12, E13, F8
E12  → E13, F9
F1   → F11
F3   → F4, F5
F16  → H1
H1   → H2, H3, H4, H5, H6, H7, H9
H2   → H9
H3   → H8, H9
H4   → H8, H9
H5   → H8, H9
H6   → H8, H9
H7   → H9
H8   → H9
```

## Coverage check: what the paper uses vs what is taught

* 370 glossary terms are planned; 333 of them occur in the main text or figure legends (the others are background needed to understand figures or to compare methods).
* Supplementary items (Figures S1–S6, Tables S1–S3, Data S1–S4) are cited but not in the PDF; lessons teach only what the main text says about them.
* Terms found in the paper text but deliberately **not** given their own entry: catalog numbers, reagent vendor names, R package versions, and purely administrative words.

