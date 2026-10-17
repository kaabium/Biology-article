/* Key numbers sheet. Groups: The funnel · The library · Cell models · Screen design · Phenotypes & assays ·
   Hit calling & statistics · ASO experiments · Mechanism & RNA-seq · Public data sets.
   Where the paper prints different numbers for the same thing, `conflict: true` and both are shown.
   "Our sum"/"our arithmetic" = computed here, not printed in the paper (listed in `derived`). */
(window.NUMBERS = window.NUMBERS || []).push(

/* ================================================================ The funnel */
{ group: 'The funnel', value: `&gt;100,000 · &gt;98%`,
  meaning: `The starting point: the number of human lncRNAs is likely to exceed 100,000, and more than 98% of them are still uncharacterised.`,
  source: ['intro-p2'] },

{ group: 'The funnel', value: `831 → 80 → 9 → 5 → 2`,
  meaning: `The funnel: lncRNAs screened → pan-hallmark hits (FDR below 0.2) → "Tier 1" lncRNAs chosen for ASO tests → "Tier 2" (reproducible loss of proliferation with two ASOs) → "Tier 3" (CHiLL1 and GCAWKR, weak effect in normal cells).`,
  source: ['summary-p1', 'res-pipeline-p2', 'res-integration-p2', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3'] },

{ group: 'The funnel', value: `80 (~8%)`, conflict: true,
  meaning: `Pan-hallmark hits (all screens combined, FDR below 0.2). The Discussion also says that approximately 8% of lncRNAs have cell-level functions.`,
  note: `The Summary says 831 lncRNAs were perturbed, but 80/831 = 9.6% (our arithmetic), not about 8%. Both percentages in the Results (about 8% for 80 hits, about 13% for 134 hits) fit the roughly one thousand target regions instead: 80/998 = 8.0% and 134/998 = 13.4%. The paper does not say which denominator it used.`,
  derived: ['9.6', '13.4'],
  source: ['res-integration-p2', 'discussion-p4', 'summary-p1', 'res-pipeline-p2'] },

{ group: 'The funnel', value: `73 of 80`,
  meaning: `Pan-hallmark hits not previously linked to NSCLC. The other 7 are known lung cancer lncRNAs (Fig 4D shows 7 + 73 = 80).`,
  source: ['res-integration-p2', 'fig4D'] },

{ group: 'The funnel', value: `134 (~13%) · 19 · none`,
  meaning: `Hallmark-specific hits (in at least one hallmark): 134, of which 19 are hits in two hallmarks and none in all three. Check with Fig 4D: 50 (proliferation) + 38 (cisplatin) + 65 (migration) = 153, and 153 − 19 = 134 (our sums).`,
  derived: ['153'],
  source: ['res-integration-p2', 'fig4D'] },

{ group: 'The funnel', value: `9 (7 + 2)`,
  meaning: `Tier 1: nine lncRNAs picked by hand from the top-ranked hits (novel, no protein-coding evidence); seven are annotated by GENCODE and two by FANTOM CAT or BIGTranscriptome. Each had at least two independent ASOs with 40% or more knockdown.`,
  source: ['res-aso-p1'] },

{ group: 'The funnel', value: `5`,
  meaning: `Tier 2: five lncRNAs with reproducible loss of cell proliferation using two distinct ASO sequences (on-target activity); results were similar in H460 and H441 cells. In Fig 5A they are CHiLL1, GCAWKR, 215, 507 and 205.`,
  source: ['res-aso-p2', 'fig5A'] },

{ group: 'The funnel', value: `2 → CHiLL1 (candidate 42) and GCAWKR (candidate 240)`,
  meaning: `Tier 3: the two lncRNAs kept because ASOs gave a diminished or absent response in non-transformed lung cells. CHiLL1 is ENSG00000253616; GCAWKR is ENSG00000272808.`,
  source: ['res-aso-p3'] },

{ group: 'The funnel', value: `8/12 (67%)`,
  meaning: `ASO validation rate of screen hits: 12 hits tested (9 for proliferation/cisplatin, 3 for migration), 8 validated. The authors infer that around one-third of screen hits may act via DNA-dependent mechanisms.`,
  source: ['limitations-p1'] },

{ group: 'The funnel', value: `78% · 92%`,
  meaning: `Share of the 101 KRAS+ lung adenocarcinoma patients in TCGA whose tumors express at least one of CHiLL1 and GCAWKR (78%, the Tier 3 cocktail) or at least one of the five Tier 2 lncRNAs (92%). "Expressed" means above 0.5 FPKM.`,
  source: ['res-aso-p9', 'fig5H'] },

{ group: 'The funnel', value: `67% · 37%`,
  meaning: `Share of the same 101 patients expressing CHiLL1 alone (67%) or GCAWKR alone (37%). The text gives only the combined 78%. The other Tier 2 lncRNAs are 4% (215), 35% (507) and 48% (205).`,
  source: ['fig5H', 'res-aso-p9'] },

/* ================================================================ The library */
{ group: 'The library', value: `831 lncRNAs → 998 TSSs`,
  meaning: `The final target set: 831 expressed lncRNAs, corresponding to 998 high-confidence transcription start sites (TSSs), named "candidate 1" and so on. Fig 1B ends with "998 Candidates". Some lncRNA loci are targeted at more than one TSS (Fig 1C legend).`,
  source: ['res-pipeline-p2', 'fig1B', 'fig1C'] },

{ group: 'The library', value: `998 (text, Fig 1B) vs 1003 (Figs 1C, 2F, 4D, 4H) vs &gt;1000 (graphical abstract)`, conflict: true,
  meaning: `How many lncRNA target regions ("candidates") the library has. The paper prints three different numbers.`,
  note: `The text and Fig 1B say 998. The "Candidates" bar in Fig 1C, the n in Fig 2F and "cand hits: 1003" in Fig 4D say 1003, and Fig 4H splits the same group into 80 hits + 923 non-hits (80 + 923 = 1003, our sum). The graphical abstract says "&gt;1000 lncRNAs". The paper does not explain the difference of 5 (our subtraction). Note also that 831 counts lncRNAs, not target regions.`,
  derived: ['5'],
  source: ['res-pipeline-p2', 'fig1B', 'fig1C', 'fig2F', 'fig4D', 'fig4H', 'ga'] },

{ group: 'The library', value: `12,000 pgRNAs (text, Methods) vs 1,200 targets (Fig 1A) vs 1200 pgRNAs (Fig 1B)`, conflict: true,
  meaning: `Size of the library libDECKO-NSCLC1. The text and Methods give 12,000 pgRNAs (10 per target); the figures print 1,200 in two different roles.`,
  note: `Fig 1A says "1,200 targets (Depth: 10 pgRNAs)" and Fig 1B says "1200 pgRNAs library including controls". 1,200 targets × 10 pgRNAs = 12,000 (our arithmetic), so Fig 1A fits the text and the Fig 1B label looks like a count of targets rather than pgRNAs; the paper does not say so.`,
  source: ['res-pipeline-p4', 'm-library-design-p5', 'm-library-cloning-p2', 'fig1A', 'fig1B'] },

{ group: 'The library', value: `10 pgRNAs per target`,
  meaning: `Library depth: 10 unique paired guide RNAs for each target, designed with CRISPETa; the design rules were relaxed step by step until 10 were found.`,
  source: ['res-pipeline-p4', 'm-library-design-p4', 'fig1B'] },

{ group: 'The library', value: `Methods 10 + 65 + 25 = 100 · Fig 1C 1 + 62 + 25 = 88 · Figs 2F, 4B, 4D: 35`, conflict: true,
  meaning: `Neutral (no-effect) control targets. The Methods list 10 AAVS1 regions, 65 intergenic regions and 25 intronic regions. Fig 1C prints 1 (AAVS1), 62 (intergenic) and 25 (introns). The analysis panels use 35 neutral controls.`,
  note: `Only the 25 intronic controls agree between the Methods and Fig 1C, and the paper does not say how these counts relate to the 35 used in Figs 2F, 4B and 4D. The sums 100 and 88 are ours.`,
  derived: ['100', '88'],
  source: ['m-library-design-p3', 'fig1C', 'fig2F', 'fig4B', 'fig4D'] },

{ group: 'The library', value: `109 positive controls (text, Figs 4B, 4D) · 51 + 58 (Fig 2F) · 53 + 50 (Methods) · 70 + 31 + 78 (Fig 1C)`, conflict: true,
  meaning: `Protein-coding gene (PCG) controls with known roles in growth or cisplatin resistance. Text: 109 positive controls in the library. Fig 2F: 51 targeted at the ORF and 58 at the TSS. Methods: 53 positive (growth-promoting) and 50 negative (growth-opposing) PCG controls. Fig 1C: 70 growth repressors, 31 growth activators and 78 cisplatin-sensitivity genes.`,
  note: `51 + 58 = 109 and 31 + 78 = 109 (our sums), so the text, Fig 2F, Figs 4B and 4D, and part of Fig 1C agree on 109. The Methods total (53 + 50 = 103) and the 70 growth repressors in Fig 1C do not fit, and the paper does not reconcile them.`,
  derived: ['103'],
  source: ['res-multipheno-p6', 'fig2F', 'fig4B', 'fig4D', 'm-library-design-p3', 'fig1C'] },

{ group: 'The library', value: `60.8% · 4.6-fold`,
  meaning: `Quality of the cloned library: 60.8% of sequences were a perfect match across both spacers, and the 90th-to-10th percentile count ratio was 4.6-fold.`,
  source: ['res-pipeline-p4'] },

{ group: 'The library', value: `66.7X`,
  meaning: `Coverage of the cloned library in bacteria: the number of colonies divided by the 12,000 different sequences in the design. This is a different quantity from the screen coverage (cells per library sequence).`,
  source: ['m-library-cloning-p2'] },

{ group: 'The library', value: `&lt;2 kb · &lt;0.1 FPKM · 300 bp`,
  meaning: `Library design filters: targets within 2 kb of a protein-coding exon were left out (to avoid off-target false positives); transcripts below 0.1 FPKM in A549 cells were removed; TSSs within 300 bp of each other were clustered into one target.`,
  source: ['res-pipeline-p2', 'm-library-design-p2', 'fig1B'] },

{ group: 'The library', value: `95.2% · 4.5% · 0.3%`,
  meaning: `Share of target regions that contain one, two or three lncRNA promoters (lncRNAs with bidirectional or overlapping TSSs were merged into one target).`,
  source: ['res-pipeline-p2'] },

{ group: 'The library', value: `10/12 · 7/12`,
  meaning: `Pilot test of 12 randomly cloned pgRNAs against 12 candidates: the expected deletion was seen in 10/12 and the expected RNA decrease in 7/12; 3 targets showed no change and 2 an increase.`,
  source: ['res-pipeline-p5'] },

{ group: 'The library', value: `7 of 9 pgRNAs (DNMBP-AS1)`,
  meaning: `Test case candidate 331 (DNMBP-AS1): 7 of the 9 pgRNAs shown in Fig 1F lowered its RNA significantly (P from 5e-4 to 0.04); pgRNA 1 and 7 were "ns". n = 3.`,
  source: ['res-pipeline-p5', 'fig1F'] },

/* ================================================================ Cell models */
{ group: 'Cell models', value: `A549 + H460`,
  meaning: `The two KRAS-mutant NSCLC cell lines used for all the CRISPR screens (stable Cas9 and BFP). A549 is labelled lung adenocarcinoma and H460 large cell lung cancer in Fig 5A.`,
  source: ['res-pipeline-p5', 'intro-p6', 'fig5A'] },

{ group: 'Cell models', value: `75.7% · ≥60%`,
  meaning: `BFP-positive Cas9 cells. Fig 1D prints 75.7% above the BFP+ gate of A549-Cas9-BFP cells; the Methods say the Cas9 lines were FACS-sorted two times to reach at least 60% BFP-positive cells. These are different measurements and the paper does not link them.`,
  source: ['fig1D', 'm-lentivirus-p2'] },

{ group: 'Cell models', value: `HBEC3-KT · MRC5-CV1 · CCD-12Lu (Results) vs CCD-16Lu (Methods, Fig 5A)`, conflict: true,
  meaning: `The three non-transformed lung-derived cell lines used to test ASO selectivity: HBEC3-KT and MRC5-CV1 (both immortalized) and the primary line named CCD-12Lu in the Results.`,
  note: `The Results say CCD-12Lu; the Methods cell-line list, the ASO and 2D viability methods, and Fig 5A print CCD-16Lu / CCD-16LU. MRC5-CV1 (Results, Fig 5A) is also written MRC-5 and Mrc5-SV1 in the Methods. These look like variant spellings of the same lines, but the paper does not say so.`,
  source: ['res-aso-p3', 'm-expmodel-p1', 'm-aso-p1', 'm-viability-2d-p1', 'fig5A'] },

{ group: 'Cell models', value: `H441`,
  meaning: `KRAS+ NSCLC line derived from a pericardial effusion metastasis; used to retest ASOs and to grow 3D spheroids (20,000 cells per Matrigel dome).`,
  source: ['res-aso-p2', 'res-aso-p6', 'm-viability-3d-p1', 'fig5A'] },

{ group: 'Cell models', value: `BE874 · KRAS c.34G&gt;T (p.Gly12Cys)`,
  meaning: `The patient-derived xenograft (PDX) organoid line: grown from a surgically removed KRAS+ lung tumor implanted in NSG mice. The KRAS mutation was found in both the organoids and the original tumor.`,
  source: ['m-pdx-p1', 'res-aso-p7'] },

/* ================================================================ Screen design */
{ group: 'Screen design', value: `8 screens`,
  meaning: `The number of CRISPR screens (Introduction). Fig 2I lists them: A549 dropout, A549 CFSE, A549 cisplatin 6.5 µM, A549 cisplatin 25 µM, A549 death, A549 migration, H460 dropout and H460 CFSE.`,
  source: ['intro-p6', 'fig2I'] },

{ group: 'Screen design', value: `3 hallmarks · 2 cell lines · 5 assays`,
  meaning: `Fig 1A summary: 3 phenotypes (proliferation, cisplatin, migration), 2 NSCLC cell lines and 5 functional assays.`,
  source: ['fig1A', 'intro-p6'] },

{ group: 'Screen design', value: `MOI 0.3`,
  meaning: `Multiplicity of infection used in every screen (the target range was 0.3–0.4). It is measured as the number of cells surviving puromycin divided by the number in a puromycin-free well, so about 30% of cells carry a pgRNA pair; a low MOI keeps most infected cells to one pgRNA pair (background).`,
  derived: ['30'],
  source: ['m-titer-p1', 'fig1A'] },

{ group: 'Screen design', value: `&gt;1,000x · 16M cells`,
  meaning: `Coverage = number of cells divided by the number of unique library sequences. The T0 reference sample (16M cells) and the passaged cells kept coverage above 1,000x, so every pgRNA starts in over a thousand cells.`,
  source: ['m-screens-p1', 'm-screen-prolif-p1', 'fig1A'] },

{ group: 'Screen design', value: `2 µg/mL puromycin · 6 days`,
  meaning: `Infected cells were selected with puromycin (2 µg/mL) for six days before the phenotypic screens began. T0 is one week after infection.`,
  source: ['m-titer-p1', 'm-screens-p1'] },

{ group: 'Screen design', value: `14 and 21 days (T2, T3)`,
  meaning: `Dropout and cisplatin-survival cells were harvested for DNA after 14 and 21 days (2 and 3 weeks; T2 and T3 in Figs 2D and 3B).`,
  source: ['m-screen-prolif-p1', 'm-screen-cisplatin-p1', 'fig3B', 'fig2D'] },

{ group: 'Screen design', value: `40M reads per sample`,
  meaning: `Sequencing depth for each screen sample (paired-end 150 bp reads).`,
  source: ['m-gdna-p2'] },

/* ================================================================ Phenotypes & assays */
{ group: 'Phenotypes & assays', value: `20% brightest · 20% least bright`,
  meaning: `CFSE proliferation screen: after staining, the 20% brightest (slow-growing) and 20% least bright (fast-growing) cells were sorted, in two rounds five days apart.`,
  source: ['m-screen-prolif-p1'] },

{ group: 'Phenotypes & assays', value: `6.5 µM (IC30) · 25 µM (IC80) · IC20 (2 and 1 µM)`,
  meaning: `Cisplatin doses for A549 cells. Survival screens: 6.5 µM (IC30) and 25 µM (IC80); an IC30 dose lowers proliferation by about 30%, and two doses widen the dynamic range. Death screen: a low dose (IC20), collecting floating dead cells every 24 h for five days.`,
  note: `The Methods give the death-screen doses as "2 and 1 µM (IC20)" and do not say which one is the IC20; the numbers are shown as printed.`,
  source: ['m-screen-cisplatin-p1', 'fig2B'] },

{ group: 'Phenotypes & assays', value: `48 h`,
  meaning: `Migration screen: cells moved through a porous membrane (8.0 µm pores) for 48 h, chosen from set-up times between 5 h and 48 h. Cells left in the top chamber = impaired migration; cells in the bottom chamber (10% FBS) = accelerated migration. About 16M cells were spread over 32 inserts (0.5M each).`,
  source: ['m-screen-migration-p1', 'res-multipheno-p7'] },

{ group: 'Phenotypes & assays', value: `24 h · 35,000 cells`,
  meaning: `Low-throughput migration validation (A549, Boyden chambers): 35,000 cells per insert and 24 h, read as crystal violet absorbance at 595 nm. Shorter than the 48 h of the screen.`,
  source: ['m-migration-assay-p1', 'fig3E', 'm-screen-migration-p1'] },

{ group: 'Phenotypes & assays', value: `AUC 0.7 vs 0.67 · 0.77 vs 0.73`,
  meaning: `Benefit of adding a positive-selection screen: area under the ROC curve for A549 proliferation 0.7 (combined) vs 0.67 (dropout only), and for A549 cisplatin 0.77 vs 0.73. The authors call it a modest but consistent benefit.`,
  source: ['res-multipheno-p2', 'discussion-p3'] },

{ group: 'Phenotypes & assays', value: `63 · 6 · 77 · 7 · 60 · 39 · 15 · 65`,
  meaning: `Hits (FDR below 0.2) per single screen (Fig 2I): H460 dropout 63, H460 CFSE 6, A549 dropout 77, A549 CFSE 7, A549 cisplatin 6.5 µM 60, cisplatin 25 µM 39, death 15, migration 65. The text confirms 77 (A549 proliferation) and 65 (migration).`,
  source: ['fig2I', 'res-multipheno-p4', 'res-multipheno-p7'] },

{ group: 'Phenotypes & assays', value: `65 (10 known)`,
  meaning: `Migration-promoting lncRNAs found in the A549 migration screen; ten were already associated with migration and invasion in many cancer types, including SNHG6 and SNHG12.`,
  source: ['res-multipheno-p7'] },

{ group: 'Phenotypes & assays', value: `R = 0.808 to 0.959`,
  meaning: `Correlation of raw log2 read counts in the A549 dropout screen (Fig 2D): between the two T0 replicates 0.959, between the two T3 replicates 0.869; the lowest pair (T0 Rep2 vs T3 Rep2) is 0.808.`,
  source: ['fig2D', 'res-multipheno-p3'] },

{ group: 'Phenotypes & assays', value: `R = 0.66, P &lt; 2.2e-16`,
  meaning: `Correlation of the lncRNA candidates' Z-scored log2 fold changes (T3/T0) between the two A549 dropout replicates (Fig 2E).`,
  source: ['fig2E', 'res-multipheno-p3'] },

{ group: 'Phenotypes & assays', value: `37 · 16 · 10 (p = 0.011)`,
  meaning: `Of the 109 positive controls in the library, 37 scored in the A549 dropout screen and 16 in H460; 10 scored in both (hypergeometric test, p = 0.011).`,
  source: ['res-multipheno-p6'] },

{ group: 'Phenotypes & assays', value: `R = 0.4 (P = 2e-05) · R = 0.092 (P = 0.0035)`,
  meaning: `A549 vs H460 dropout Z-scores (Fig 2H): two fitted lines are printed. The red points (labelled with protein-coding control genes such as RPL3 and RPS6) give R = 0.4; the black points (labelled with candidate numbers) give a much weaker but significant R = 0.092.`,
  note: `The legend does not define the colors; the reading above is from the labels in the panel.`,
  source: ['fig2H', 'res-multipheno-p6'] },

{ group: 'Phenotypes & assays', value: `−1.81 (FDR 1.2e-7) · −1.15 (FDR 9.78e-7)`,
  meaning: `The two lncRNA TSSs chosen for validation: candidate 205 (top dropout hit in A549, log2 fold change −1.81) and candidate 509 (proliferation and cisplatin, log2 fold change −1.15).`,
  source: ['res-validation-p1'] },

{ group: 'Phenotypes & assays', value: `1:1 · 150,000 cells · 7 days`,
  meaning: `Competition assay design (A549): mCherry cells carrying the target's pgRNA are mixed 1:1 with GFP cells carrying a control AAVS1 pgRNA (150,000 cells) and followed for 7 days by flow cytometry (n = 3). RPS5, an essential ribosomal gene, is the positive control.`,
  source: ['m-competition-p1', 'fig3C', 'res-validation-p3'] },

{ group: 'Phenotypes & assays', value: `P = 3.8e-4 · 0.005 · 0.004 · 0.031`,
  meaning: `Competition assay P values at the last time point (Fig 3C, Student's t test, n = 3): RPS5 positive control 3.8e-4; candidate 205 pgRNA 0.005; candidate 509 pgRNA 0.004; candidate 509 plus cisplatin 0.031.`,
  source: ['fig3C'] },

{ group: 'Phenotypes & assays', value: `LINC00115: P = 0.034 and 0.018 · RP11-206L10.11: ns`,
  meaning: `ASO validation of candidate 205 (A549, 72 h, n = 4): ASO1 and ASO2 against LINC00115 slowed growth (P = 0.034 and 0.018), but ASOs against RP11-206L10.11 did not (ns). So LINC00115 drives the effect, through its RNA.`,
  source: ['fig3D', 'res-validation-p4'] },

{ group: 'Phenotypes & assays', value: `215 · 448 · 489`,
  meaning: `Migration hits validated with two ASOs each in A549 (Fig 3F): AC104024.3 (215), CECR7 (448) and MIR23AHG (489). Crystal violet P values: 215 0.029 and 0.005; 448 0.006 and 0.006; 489 0.031 and 0.144.`,
  note: `The text says ASO knockdown of the three hits gave "dramatic impairment" of migration, but 489 ASO2 is not significant (P = 0.144) in the right-hand panel of Fig 3F (n = 3; the legend says one-tailed Student's t test).`,
  source: ['res-validation-p5', 'fig3F'] },

/* ================================================================ Hit calling & statistics */
{ group: 'Hit calling & statistics', value: `FDR &lt; 0.2`,
  meaning: `The hit threshold for every single screen and for the integrated pipeline (TPP): Benjamini-Hochberg-corrected FDR below 0.2. Roughly, up to about one in five hits may be false (general statistics).`,
  source: ['m-hits-p3', 'm-hits-p4', 'res-integration-p2', 'fig2G'] },

{ group: 'Hit calling & statistics', value: `LFC &gt; 0 vs LFC &lt; 0`,
  meaning: `Sign rule for single-screen hits (together with FDR below 0.2): LFC above 0 for the positive screens (CFSE, death and migration); LFC below 0 for the dropout and cisplatin-survival screens.`,
  source: ['m-hits-p3'] },

{ group: 'Hit calling & statistics', value: `p ≤ 0.05`,
  meaning: `Significance level used throughout unless a legend says otherwise. The 2D viability assays use p &lt; 0.05 with Student's t test.`,
  source: ['m-quant-p3', 'm-viability-2d-p1'] },

{ group: 'Hit calling & statistics', value: `36% · &lt;3%`,
  meaning: `Read quality in the screens: overall 36% of the reads were usable, and recombination events typically affected under 3% of reads.`,
  derived: ['3'],   /* quoted from m-hits-p1 ("<3%"), but the validator's tag-stripping hides it there */
  source: ['m-hits-p1'] },

{ group: 'Hit calling & statistics', value: `3 &gt; cpm &gt; 666 (as printed)`,
  meaning: `Count filter applied to pgRNAs (counts per million) before the analysis; the cut-offs shown are 3 and 666.`,
  note: `As printed, "3 > cpm>666" cannot be true for any number, so it is a typo; the intended cut-offs are presumably 3 and 666 cpm, but the paper does not say.`,
  derived: ['3'],   /* quoted from m-hits-p1, hidden from the validator by its tag-stripping of "<3% … 3 >" */
  source: ['m-hits-p1'] },

{ group: 'Hit calling & statistics', value: `AUC 0.82 · 0.73±0.01 · 0.80 · 0.54 · 0.73`,
  meaning: `How well each ranking separates 109 positive controls from 35 neutral controls (Fig 4B): TPP Pan 0.82, TPP Pheno 0.73±0.01, RRA Pan 0.80, H460 dropout 0.54, A549 dropout 0.73 (0.5 is chance, 1 is perfect).`,
  source: ['fig4B', 'res-integration-p1'] },

{ group: 'Hit calling & statistics', value: `46/109 · 3/35`,
  meaning: `Controls among the pan-hallmark hits (Fig 4D): 46 of the 109 positive controls and 3 of the 35 neutral controls are called hits.`,
  source: ['fig4D', 'fig4B'] },

{ group: 'Hit calling & statistics', value: `n = 72 · 58 · 5 · 80`,
  meaning: `Cell-line specificity (Fig 4E): dropout hits in A549 (72), in H460 (58) and in both (5), versus 80 pan-hallmark hits that are active in both cell types. 72 + 5 = 77 and 58 + 5 = 63 match the single-screen counts in Fig 2I (our sums), so the first two counts appear to exclude the shared hits.`,
  source: ['fig4E', 'fig2I', 'res-integration-p3'] },

{ group: 'Hit calling & statistics', value: `KW P = 4.2e-12 · 4.95e-05 · 0.004`,
  meaning: `A549 dropout P-value distributions (Fig 2F; n = 1003 lncRNAs, 35 neutral controls, 51 positive controls targeted at the ORF, 58 at the TSS): Kruskal-Wallis across groups 4.2e-12; neutral vs positive ORF 4.95e-05; neutral vs positive TSS 0.004. Promoter deletion works but less strongly than ORF mutation.`,
  source: ['fig2F', 'res-multipheno-p3'] },

{ group: 'Hit calling & statistics', value: `n = 4 · 3 · 2 · 1`,
  meaning: `Replicates printed in the panels. n = 4: ASO growth curves, spheroids, cocktails and migration (Figs 3D, 5C, 5E, 5G, 6L). n = 3: competition assay and crystal-violet migration (Figs 3C, 3F). n = 2: qRT-PCR in Figs 3D and 3F, cell fractionation, apoptosis and cell cycle (Figs 6C, 6G, 6K). n = 1: the FISH ratio (Fig 6B).`,
  note: `Several mechanism panels have only n = 2, and the legends do not always say whether replicates are biological or technical.`,
  source: ['fig3C', 'fig3D', 'fig3F', 'fig5C', 'fig5E', 'fig5G', 'fig6B', 'fig6C', 'fig6G', 'fig6K', 'fig6L'] },

{ group: 'Hit calling & statistics', value: `10,000`,
  meaning: `Number of simulations in the GSEA used to get enrichment scores and nominal p values for the positive and neutral controls (a check of ranking quality).`,
  source: ['m-hits-p5'] },

/* ================================================================ ASO experiments */
{ group: 'ASO experiments', value: `3–5 ASOs · at least 2 · ≥40%`,
  meaning: `Per target, 3 to 5 locked nucleic acid ASOs were designed; each Tier 1 candidate had at least two independent ASOs with 40% or more knockdown.`,
  source: ['m-aso-p1', 'res-aso-p1'] },

{ group: 'ASO experiments', value: `25 nM · 10 nM`,
  meaning: `Final ASO concentration: 25 nM for A549, H460, H441 and MRC5-CV1; 10 nM for HBEC3-KT and CCD-16LU. In cocktails the total stays at 25 nM.`,
  source: ['m-aso-p1', 'm-aso-p2', 'fig5G'] },

{ group: 'ASO experiments', value: `3,500 cells/well · 24 to 144 h`,
  meaning: `2D viability (CellTiter-Glo, 96-well plates, in triplicate): 3,500 cells per well (3,000 for MRC5, 3,500 for HBEC3-KT, 1,000 for CCD-16LU), read at 24, 48, 72, 96 and/or 144 h; Student's t test, p &lt; 0.05.`,
  source: ['m-viability-2d-p1'] },

{ group: 'ASO experiments', value: `7 days · P = 0.040 · 0.024 · 0.028`,
  meaning: `H441 spheroids (n = 4, 25 nM ASO; 20,000 cells per Matrigel dome): viability 7 days after transfection fell with the mTOR positive-control ASO (P = 0.040), CHiLL1 ASO1 (P = 0.024) and GCAWKR ASO1 (P = 0.028).`,
  source: ['fig5E', 'res-aso-p6', 'm-viability-3d-p1'] },

{ group: 'ASO experiments', value: `6 and 9 days (Fig 5F) vs one week (Methods)`, conflict: true,
  meaning: `BE874 organoid viability after CHiLL1 ASO, four independent replicates: 6 days for replicates 1 and 2 (ns; P = 0.008) and 9 days for replicates 3 and 4 (P &lt; 1.0e-04; P = 0.026).`,
  note: `Fig 5F labels the readouts 6 days and 9 days, whereas the Methods say the measurement was made "after one week"; the paper does not reconcile them. Replicate 1 is not significant.`,
  source: ['fig5F', 'm-viability-3d-p3', 'res-aso-p7'] },

{ group: 'ASO experiments', value: `50:50 · 25 nM · P = 0.021 and 0.030`,
  meaning: `Tier 3 cocktail (equal parts CHiLL1 and GCAWKR ASOs, 25 nM in total) vs the single ASOs at the same total dose (A549, n = 4, 72 h, one-tailed Mann-Whitney test): P = 0.021 (vs CHiLL1 ASO1) and P = 0.030 (vs GCAWKR ASO1). A five-ASO Tier 2 cocktail gave a similar benefit.`,
  source: ['res-aso-p8', 'fig5G'] },

/* ================================================================ Mechanism & RNA-seq */
{ group: 'Mechanism & RNA-seq', value: `8.3 TPM ≈ 4 molecules per cell`,
  meaning: `CHiLL1 expression in control A549 cells (consistent with FISH).`,
  source: ['res-mechanism-p2'] },

{ group: 'Mechanism & RNA-seq', value: `2.5 TPM ≈ 1 copy per cell`,
  meaning: `GCAWKR mean expression: even lower than CHiLL1.`,
  source: ['res-mechanism-p6'] },

{ group: 'Mechanism & RNA-seq', value: `Chr 8 · 2 isoforms`,
  meaning: `CHiLL1 lies on chromosome 8 and has two annotated isoforms sharing the first exon; it sits upstream and on the same strand of the protein-coding gene TNFRSF10B.`,
  source: ['res-aso-p4'] },

{ group: 'Mechanism & RNA-seq', value: `Chr 15 · 4 isoforms`,
  meaning: `GCAWKR lies on chromosome 15 and has four isoforms sharing a common TSS; its locus is frequently amplified in cancer genomes (unlike CHiLL1).`,
  source: ['res-aso-p5', 'fig5D'] },

{ group: 'Mechanism & RNA-seq', value: `24 h · 30M reads`,
  meaning: `RNA-seq of A549 and H460 cells 24 h after ASO transfection, paired-end 150, 30M reads per sample.`,
  source: ['m-rnaseq-p1'] },

{ group: 'Mechanism & RNA-seq', value: `q &lt; 0.2`,
  meaning: `Cut-off for calling a gene differentially expressed in the RNA-seq (Sleuth). For CHiLL1 the genes changed by both ASOs were kept; for GCAWKR the genes shared by A549 and H460.`,
  source: ['m-rnaseq-p2'] },

{ group: 'Mechanism & RNA-seq', value: `R = 0.75 · 874 + 808 vs 171 + 153`,
  meaning: `CHiLL1 ASO1 vs ASO2 fold changes in A549 (Fig 6E): R = 0.75, P &lt; 2.2e-16. 874 genes go up and 808 go down with both ASOs; only 171 and 153 move in opposite directions, so the effects are mostly on-target.`,
  source: ['fig6E', 'res-mechanism-p2'] },

{ group: 'Mechanism & RNA-seq', value: `DEGs: 2006 (A549) · 3015 (H460)`,
  meaning: `Genes changed in common by both CHiLL1 ASOs in each cell line, used for the KEGG enrichment (Fig 6F). The pathway significance values in the two cell lines correlate (R = 0.48).`,
  note: `Fig 6F prints "H450" instead of H460.`,
  source: ['fig6F', 'res-mechanism-p3'] },

{ group: 'Mechanism & RNA-seq', value: `R = 0.8 · 1098 + 1194 vs 132 + 69`,
  meaning: `GCAWKR ASO2 in A549 vs H460 (Fig 6I): R = 0.8, P = 2.2e-16. 1098 genes go up and 1194 go down in both cell lines; 132 and 69 disagree. A cell-type-independent effect from a single ASO.`,
  source: ['fig6I', 'res-mechanism-p6'] },

{ group: 'Mechanism & RNA-seq', value: `P = 0.036 (G1) · 0.009 (G2)`,
  meaning: `Cell-cycle assay in A549 (24 h, n = 2): GCAWKR ASO2 lowers the G1 share (P = 0.036) and raises the G2 share (P = 0.009); CHiLL1 ASO1 changes are "ns".`,
  source: ['fig6K', 'res-mechanism-p6'] },

{ group: 'Mechanism & RNA-seq', value: `P = 0.002 (n = 4)`,
  meaning: `GCAWKR ASO2 reduced A549 migration across transwells (crystal violet, relative to control), consistent with GCAWKR targets being enriched for migration genes.`,
  source: ['fig6L', 'res-mechanism-p6'] },

/* ================================================================ Public data sets */
{ group: 'Public data sets', value: `101 samples`,
  meaning: `TCGA lung adenocarcinoma (LUAD) RNA-seq samples that are untreated and KRAS-mutated; used for expression of hits (Fig 4F) and for the patient-fraction analysis (Fig 5H).`,
  source: ['m-public-rnaseq-p1', 'fig4F', 'fig5H'] },

{ group: 'Public data sets', value: `87 tumor · 77 normal`,
  meaning: `The independent TANRIC LUAD cohort (Fig 4G). Pan-hallmark hits are higher in tumors than in normal tissue (P = 1.7e-10), whereas non-hits are not (P = 0.77).`,
  source: ['m-public-rnaseq-p1', 'fig4G', 'res-integration-p4'] },

{ group: 'Public data sets', value: `513 LUAD · 59 normal`,
  meaning: `TCGA samples used for the Tier 2 lncRNA expression comparison in Fig 5B (****p &lt; 0.0001, Student's t test); no TCGA data were available for candidate 215.`,
  source: ['fig5B'] },

{ group: 'Public data sets', value: `13/80 vs 52/923 · P = 0.0011`,
  meaning: `Copy-number status in the PCAWG pan-cancer cohort (Fig 4H): 13 of 80 hits (16%) lie in recurrently amplified regions vs 52 of 923 non-hits (5.6%), Fisher's exact P = 0.0011. Deletions (7 of 80 vs 127 of 923) do not differ (P = 0.14).`,
  derived: ['16', '5.6'],
  source: ['fig4H', 'res-integration-p4'] },

{ group: 'Public data sets', value: `P = 4e-5 · 0.008`,
  meaning: `GCAWKR is higher in the proximal inflammatory (PI) lung tumor subtype, which has poorer prognosis (TCGA): PI vs PP P = 4e-5; PI vs TRU P = 0.008.`,
  source: ['res-aso-p5'] },

{ group: 'Public data sets', value: `GSE207229 (Data availability) vs GSE207228 and GSE207227 (key resources table)`, conflict: true,
  meaning: `GEO accession(s) of the deposited data: the Data availability section gives one accession; the key resources table lists one for the pooled CRISPR screens (GSE207228) and one for the RNA-seq after ASO treatment (GSE207227).`,
  note: `The paper does not explain how GSE207229 relates to the two accessions in the key resources table.`,
  source: ['m-data-p1', 'krt-28', 'krt-29'] },

{ group: 'Public data sets', value: `Zenodo 6912511 vs doi 10.5281/zenodo.6912510`, conflict: true,
  meaning: `Where the code of the target prioritization pipeline (TPP) is deposited.`,
  note: `The Data availability section says Zenodo 6912511, while the hit-calling Methods and the key resources table link to doi 10.5281/zenodo.6912510. The paper does not explain the one-digit difference.`,
  source: ['m-data-p2', 'm-hits-p4', 'krt-45'] },

{ group: 'Public data sets', value: `GENCODE 19 (hg19) · v36`,
  meaning: `Annotation versions: the library was designed on GENCODE release 19 (GRCh37, hg19); RNA-seq reads were quantified against GENCODE v36 (Kallisto), and the ezTracks figures use hg38.`,
  source: ['m-library-design-p1', 'm-rnaseq-p2', 'm-eztracks-p1'] }

);
