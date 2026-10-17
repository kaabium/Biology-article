/* "Explain it back" prompts (14), ordered roughly from easy to hard.
   Model answers are plain English; every paper number is in the cited sources. */
(window.EXPLAIN = window.EXPLAIN || []).push(

{
  id: 'xp-60s',
  title: 'The paper in 60 seconds',
  prompt: `A friend asks: "What did this paper do, and what did it find?" Answer in about a minute: the problem, the method, the main results and the take-home message.`,
  model: `<p>Lung cancer needs new drug targets, and long noncoding RNAs (lncRNAs) are a huge, mostly unexplored source of them. The authors used a pooled CRISPR screen that deletes the start site of 831 lncRNAs in two KRAS-mutant lung cancer cell lines. They asked which deletions slow growth, make cells more sensitive to the chemotherapy drug cisplatin, or reduce migration. Combining all the screens gave 80 high-confidence hits. They picked nine for a second test with antisense oligonucleotides (ASOs), which knock down the RNA itself. Five reproducibly slowed growth, and two, CHiLL1 and GCAWKR, had a weaker effect in normal lung cells. Both also worked in 3D cultures, but through different mechanisms. The take-home message: a screen that combines several hallmarks and two cell lines finds better lncRNA targets than a single dropout screen. Caveats: only 8 of 12 hits tested were confirmed by ASOs, and the screen is not comprehensive.</p>`,
  checklist: [
    'Problem: lung cancer needs new targets; lncRNAs are a large, mostly unexplored source',
    'Method: pooled CRISPR deletion of lncRNA start sites in two KRAS+ cell lines',
    'Readouts: proliferation, cisplatin response and migration',
    'Funnel: 831 targets, 80 hits, 9 tested with ASOs, then 5, then 2 (CHiLL1 and GCAWKR)',
    'ASOs work in 3D models and are less active in normal lung cells',
    'The two lncRNAs act by different mechanisms',
    'Names at least one limitation (8 of 12 hits confirmed by ASOs; not comprehensive)',
  ],
  source: ['summary-p1', 'res-integration-p2', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'res-aso-p6', 'res-mechanism-p8', 'limitations-p1', 'limitations-p2'],
},

{
  id: 'xp-lncrna',
  title: 'What is a lncRNA, and why lung cancer?',
  prompt: `What is a long noncoding RNA (lncRNA), and why did the authors go looking for them in lung cancer?`,
  model: `<p>A lncRNA is a long RNA molecule that is copied from DNA but, unlike a messenger RNA, is not turned into a protein (general background). The authors see lncRNAs as a rich place to look for new drug targets: their number is likely to exceed 100,000, and more than 98% are still uncharacterised. Hundreds have already been linked to cancer, and some, such as SAMMSON in melanoma, are sensitive to antisense oligonucleotide (ASO) drugs. Lung cancer needs new targets. Non-small cell lung cancer (NSCLC) is the leading cause of cancer deaths worldwide, and the common KRAS-mutant type is routinely treated with platinum chemotherapy, while newly approved targeted drugs extend life only by a few months. lncRNAs such as PVT1 and MALAT1 are already tied to lung tumors, but which lncRNAs drive several cancer hallmarks at once was unclear.</p>`,
  checklist: [
    'Defines a lncRNA: an RNA copied from DNA that is not made into a protein (background)',
    'Scale: likely more than 100,000, and over 98% uncharacterised',
    'Clinical need: NSCLC is the leading cause of cancer deaths and KRAS+ treatment options are limited',
    'Drug-target idea: ASOs against lncRNAs (SAMMSON); lung examples PVT1 and MALAT1',
    'The gap: which lncRNAs drive several hallmarks in NSCLC was unclear',
  ],
  source: ['intro-p1', 'intro-p2', 'intro-p3'],
},

{
  id: 'xp-pooled-screen',
  title: 'How a pooled CRISPR-deletion screen works',
  prompt: `Walk through the pooled CRISPR-deletion screen from the library to the hit list. What happens at each step, and why?`,
  model: `<p>The authors first designed a library with 10 paired guide RNAs (pgRNAs) per target, 12,000 in all, plus control guides. Each pair steers Cas9 to cut twice and delete a start site. The pgRNAs were cloned into plasmids and packed into lentivirus, which delivered them into Cas9-expressing A549 and H460 cells at a low MOI of 0.3, so that most infected cells receive just one pgRNA pair (the usual reason for a low MOI). Puromycin removed uninfected cells. Enough cells were kept at every step for a coverage above 1,000x, meaning each pgRNA is present in over a thousand cells. The pool then faced a selection: normal growth, cisplatin or migration. At the end, DNA was extracted, the pgRNAs were sequenced and counted, and their counts were compared with the start. A target is a hit if its pgRNAs are significantly depleted or enriched (FDR below 0.2).</p>`,
  checklist: [
    'Library of paired guide RNAs: 10 per target, plus controls',
    'Lentivirus delivers it into Cas9 cells at a low MOI (0.3): about one pgRNA pair per infected cell',
    'Puromycin selects infected cells; coverage is kept above 1,000x',
    'A selection (growth, cisplatin, migration) changes which cells survive, divide or move',
    'Sequencing counts each pgRNA at start versus end; depleted or enriched pgRNAs point to hits',
    'Hits are called statistically (FDR below 0.2)',
  ],
  source: ['res-pipeline-p1', 'res-pipeline-p4', 'res-pipeline-p5', 'm-titer-p1', 'm-screens-p1', 'm-screen-prolif-p1', 'm-hits-p1', 'm-hits-p3'],
},

{
  id: 'xp-tss',
  title: 'Why delete the TSS?',
  prompt: `How do the authors switch a lncRNA gene off, and why do they delete its transcription start site (TSS) rather than the whole gene?`,
  model: `<p>They use CRISPR scissors steered by a pair of guide RNAs to cut out the TSS, the spot where copying of the gene into RNA begins. Without it, the gene is no longer expressed. The authors give two reasons for deleting only the TSS instead of the entire gene. The deletions are uniform and shorter, which makes them more efficient. And there is less chance of false positives from accidentally deleting overlapping DNA regulatory elements. The approach has costs. In the screen, promoter-deletion guides aimed at protein-coding control genes had a detectable but lower effect than guides that mutate the protein-coding region (the ORF), so deletion screens for lncRNAs are intrinsically less sensitive. A DNA deletion also cannot tell you whether the effect comes from the RNA or from the DNA element itself, which is why the authors followed up with ASOs.</p>`,
  checklist: [
    'Names CRISPR with paired guide RNAs as the tool',
    'Says the TSS is where copying starts, so deleting it silences the gene',
    'Gives the efficiency reason: uniform, shorter deletions',
    'Gives the false-positive reason: avoids deleting overlapping regulatory DNA',
    'Names a cost: lower sensitivity than ORF mutation, and DNA versus RNA effects cannot be separated',
  ],
  source: ['res-pipeline-p1', 'res-multipheno-p3', 'res-validation-p4', 'limitations-p1'],
},

{
  id: 'xp-dropout-positive',
  title: 'Dropout versus positive selection',
  prompt: `The authors ran "dropout" (negative) and "positive" screens. Explain what each one measures, using proliferation, cisplatin and migration as examples, and why they combined them.`,
  model: `<p>In a dropout screen you watch which guides disappear. If deleting a lncRNA slows growth, cells carrying its pgRNAs are outgrown, so those pgRNAs are depleted when cells are harvested at 14 and 21 days. In a positive screen you collect a group of cells and look for enriched pgRNAs. For proliferation, the CFSE dye is diluted at each division (general background), so slow-growing cells stay bright. The brightest 20% were sorted, and their enriched pgRNAs point to growth-promoting lncRNAs. For cisplatin, the survival screen (IC30 and IC80 doses) is a dropout, while the death screen collects dying cells at a low IC20 dose. For migration, cells that did or did not move through a porous membrane in 48 h were collected, and pgRNAs enriched in the non-migrating cells mark migration-promoting lncRNAs. Adding positive screens gave a modest but consistent gain in accuracy (area under the curve 0.7 versus 0.67 for A549 proliferation, 0.77 versus 0.73 for cisplatin).</p>`,
  checklist: [
    'Dropout: pgRNAs of growth-promoting lncRNAs are depleted over time (14 and 21 days)',
    'CFSE (positive): pgRNAs enriched in slow-growing cells (the brightest 20%)',
    'Cisplatin: survival screen (dropout, IC30 and IC80) versus death screen (positive, IC20)',
    'Migration: pgRNAs enriched in cells that failed to cross the membrane in 48 h',
    'Why combine: a modest but consistent accuracy gain (AUC 0.7 vs 0.67; 0.77 vs 0.73)',
    'Cost: more resources for a marginal improvement',
  ],
  source: ['res-multipheno-p2', 'res-multipheno-p7', 'm-screen-prolif-p1', 'm-screen-cisplatin-p1', 'm-screen-migration-p1', 'fig2A', 'fig2B', 'fig2C', 'discussion-p3'],
},

{
  id: 'xp-controls',
  title: 'The controls, and what each one rules out',
  prompt: `What controls were used in the CRISPR screens and in the ASO experiments, and what does each one rule out?`,
  model: `<p>The screens used two kinds of control guides. Neutral controls target places that should not change cell behavior (the AAVS1 locus, intergenic and intronic regions). They show what "no effect" looks like and count as the false positives when the ranking is scored. Positive controls target protein-coding genes with known roles in growth or cisplatin resistance. They prove that the screen can detect a real effect, and some were hit both by ORF mutation and by promoter deletion to compare the two. In the validation assays, AAVS1 guides marked with GFP were the neutral competitor and RPS5, an essential ribosomal gene, the positive control. In the ASO experiments, a non-targeting control ASO sets the baseline, MALAT1 was a positive-control knockdown, and an mTOR ASO served in 3D spheroids. Non-cancerous lung cells check for toxicity, and an empty vector controlled the rescue experiments. The counts differ between text (109 positive controls), Methods and figures, so learn the types more than the totals.</p>`,
  checklist: [
    'Neutral controls (AAVS1, intergenic, intronic): show a no-effect baseline and count as false positives',
    'Positive controls (protein-coding genes with known growth or cisplatin roles): show the screen can detect real effects',
    'Notes ORF mutation versus promoter deletion for positive controls',
    'Competition assay: AAVS1 (neutral) and RPS5 (positive) controls',
    'ASO controls: non-targeting ASO; MALAT1 and mTOR ASOs as positive controls; normal cells for toxicity',
    'Notes that control counts differ between text, Methods and figures',
  ],
  source: ['res-pipeline-p3', 'm-library-design-p3', 'res-multipheno-p3', 'res-multipheno-p6', 'm-hits-p5', 'res-validation-p3', 'm-competition-p1', 'fig5A', 'fig5E', 'm-rescue-p1', 'res-aso-p3'],
},

{
  id: 'xp-models',
  title: 'Cell lines, normal cells, spheroids and organoids',
  prompt: `The authors used cancer cell lines, normal lung cells, 3D spheroids and patient-derived organoids. What does each model add to the argument?`,
  model: `<p>Two KRAS-mutant lung cancer cell lines, A549 and H460, were screened in parallel, so hits active in both are more likely to be general than specific to one cell line. For the ASO retest, H441, a line from a metastasis, joined as another cancer background. Three non-cancerous lung cell lines (HBEC3-KT, MRC5-CV1 and the primary line CCD-12Lu, printed CCD-16Lu in the Methods) tested whether the ASOs spare healthy cells. CHiLL1 and GCAWKR gave a diminished or absent response there. Flat 2D cultures are simple, whereas 3D spheroids of H441 are a more faithful tumor model; in them the CHiLL1 and GCAWKR ASOs cut viability close to the positive control. Finally, BE874 organoids grown from a patient-derived xenograft carrying a KRAS mutation recapitulate an individual patient's therapy response, and CHiLL1 ASOs reduced their viability significantly. The limits: these are still laboratory models, and the organoids come from a single patient.</p>`,
  checklist: [
    'Two cancer cell lines (A549, H460) screened in parallel: hits that work in both are more general',
    'More cancer lines for the ASO retests (H441, H460), including EGFR-mutant ones',
    'Normal lung cells (HBEC3-KT, MRC5-CV1, CCD-12Lu) show selectivity and possible lower toxicity',
    '3D spheroids (H441) are more faithful than monolayers',
    'BE874 PDX-derived organoids mimic a patient and carry a KRAS mutation',
    'Limits: laboratory models only; organoids from one patient',
  ],
  source: ['res-pipeline-p5', 'res-aso-p2', 'res-aso-p3', 'res-aso-p6', 'res-aso-p7', 'm-pdx-p1', 'm-expmodel-p1', 'fig5F', 'discussion-p5'],
},

{
  id: 'xp-funnel',
  title: 'The funnel: 831 → 80 → 9 → 5 → 2',
  prompt: `Explain the funnel 831 → 80 → 9 → 5 → 2. How does the list narrow at each step, and why?`,
  model: `<p>The screens targeted 831 expressed lncRNAs. Integrating all of them with the target prioritization pipeline (TPP) at an FDR below 0.2 gave 80 pan-hallmark hits, about 8% of those screened, and 73 of the 80 had not been linked to NSCLC before. From the top-ranked hits the authors manually chose nine ("Tier 1") for novelty and lack of protein-coding evidence, each with at least two independent ASOs that cut the RNA by 40% or more. Five (Tier 2) reproducibly reduced proliferation with two different ASO sequences. Two (Tier 3), CHiLL1 and GCAWKR, were kept because normal lung cells responded weakly or not at all. Each step is stricter and uses different evidence: statistics from the screens, then independent ASO sequences, then selectivity against normal cells. The 3D models and organoids were then used to test the final two.</p>`,
  checklist: [
    '831 lncRNAs screened',
    '80 pan-hallmark hits (FDR below 0.2, about 8%); 73 new to NSCLC',
    '9 in Tier 1: novel, no protein-coding evidence, at least two ASOs with 40% or more knockdown',
    '5 in Tier 2: reproducible loss of proliferation with two ASO sequences',
    '2 in Tier 3: weak response in normal cells (CHiLL1 and GCAWKR)',
    'Explains the logic: each step adds a stricter or different kind of evidence',
  ],
  source: ['res-pipeline-p2', 'res-integration-p2', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'res-aso-p6', 'res-aso-p7', 'm-hits-p4'],
},

{
  id: 'xp-aso-after-crispr',
  title: 'Why ASOs after CRISPR?',
  prompt: `Why did the authors follow the CRISPR screens with ASO experiments? What question can CRISPR deletion not answer, and how do ASOs answer it?`,
  model: `<p>CRISPR deletion removes DNA. If cells grow more slowly afterward, the cause could be loss of the lncRNA molecule, but it could also be loss of a DNA element in the deleted region, such as an enhancer, or of an opposite-strand gene that shares the start site. An ASO is a short strand that pairs with the RNA and leads to its breakdown, leaving the DNA intact (general background). If ASOs reproduce the CRISPR phenotype, the RNA is responsible. At candidate 205 two genes share a start site: ASOs against LINC00115, but not against RP11-206L10.11, slowed growth. Two independent ASO sequences per target also guard against off-target effects. Overall, 8 of 12 hits tested (67%) were validated, so about one-third of screen hits may act via DNA-dependent mechanisms. Because CRISPR and ASO phenotypes matched for CHiLL1 and GCAWKR, they probably act through an RNA transcript or its production.</p>`,
  checklist: [
    'CRISPR deletion cannot separate DNA-dependent from RNA-dependent effects',
    'ASOs knock down only the RNA and leave the DNA intact',
    'Example: candidate 205, where LINC00115 (not RP11-206L10.11) drives the effect',
    'Two independent ASOs per target support on-target activity',
    'Validation rate: 8 of 12 (67%), so about one-third of hits may be DNA-dependent',
    'Matching CRISPR and ASO results for CHiLL1 and GCAWKR suggest an RNA-based mechanism',
  ],
  source: ['res-validation-p4', 'res-validation-p6', 'res-aso-p2', 'limitations-p1', 'discussion-p6'],
},

{
  id: 'xp-hits-fdr',
  title: 'How hits were called, and what FDR means',
  prompt: `How were screen hits called, from raw sequencing reads to the final hit list? In the same answer, explain in a few sentences what FDR means and why multiple testing matters.`,
  model: `<p>Reads were counted per pgRNA with the CASPR pipeline. pgRNAs were filtered by their counts per million and by guide quality, and a batch effect was corrected. For each target, CASPR gives a log2 fold change (treatment versus control) and an FDR-corrected p value. In a single screen a hit has FDR below 0.2 and a fold change below zero for dropout and cisplatin screens, or above zero for CFSE, death and migration screens. To combine screens, the target prioritization pipeline (TPP) ranks targets by effect size (robust rank aggregation) and combines their significance (empirical Brown's method). A harmonic mean p value joins the two, and Benjamini-Hochberg correction gives the FDR; below 0.2 is a hit. Scored against 109 positive and 35 neutral controls, the pan-hallmark ranking reached an AUC of 0.82. FDR is the expected share of false hits among those called (background). With 998 targets, some p values look small by chance, so correcting for multiple testing is essential. The paper does not say why 0.2 was chosen.</p>`,
  checklist: [
    'Reads counted per pgRNA (CASPR); filters and batch correction',
    'Per target: log2 fold change and an FDR-corrected p value',
    'Single-screen rule: FDR below 0.2 with fold change below zero (dropout, cisplatin) or above zero (CFSE, death, migration)',
    'TPP combines effect size (RRA) with significance (EBM) through a harmonic mean p value and Benjamini-Hochberg correction',
    'Defines FDR as the expected share of false hits among those called',
    'Explains multiple testing: many targets are tested, so some small p values arise by chance',
    'Controls (109 positive, 35 neutral) benchmark the ranking (AUC 0.82)',
  ],
  source: ['m-hits-p1', 'm-hits-p3', 'm-hits-p4', 'm-hits-p5', 'res-integration-p1', 'res-pipeline-p2', 'fig4B'],
},

{
  id: 'xp-chill1-gcawkr',
  title: 'CHiLL1 versus GCAWKR',
  prompt: `Compare CHiLL1 and GCAWKR: how were they found, what do their ASOs do in cells, and how do their modes of action differ?`,
  model: `<p>Both lncRNAs came from the screens, passed the ASO tests and showed a weaker response in normal lung cells. CHiLL1 (candidate 42) lies on chromosome 8 and has two isoforms. GCAWKR (candidate 240) lies on chromosome 15 and has four. Their ASOs reduced viability of spheroids, and CHiLL1 ASOs also reduced that of patient-derived organoids. But they act differently. FISH and cell fractionation place CHiLL1 mainly in the cytoplasm and GCAWKR in the nucleus. CHiLL1 is scarce (8.3 TPM, about 4 molecules per cell) and GCAWKR scarcer (2.5 TPM, about 1 copy per cell). RNA-seq showed non-overlapping sets of target genes. Knocking down CHiLL1, but not GCAWKR, raised early apoptosis, while knocking down GCAWKR, but not CHiLL1, increased cells in G2 and impaired migration. GCAWKR knockdown also raised CHiLL1, but not the reverse, which the authors say explains the additive effect of the 50:50 ASO cocktail.</p>`,
  checklist: [
    'Shared: screen hits, two independent ASOs, weaker effect in normal cells, active in 3D',
    'CHiLL1: chromosome 8, two isoforms; GCAWKR: chromosome 15, four isoforms',
    'Localization: CHiLL1 mainly cytoplasm versus GCAWKR nucleus (FISH, fractionation)',
    'Abundance: 8.3 TPM (about 4 molecules per cell) versus 2.5 TPM (about 1 per cell)',
    'Phenotypes: CHiLL1 knockdown gives early apoptosis; GCAWKR knockdown gives more G2 cells and less migration',
    'Non-overlapping target genes; GCAWKR knockdown raises CHiLL1 (not vice versa); the cocktail is additive',
  ],
  source: ['res-aso-p3', 'res-aso-p4', 'res-aso-p5', 'res-aso-p6', 'res-aso-p7', 'res-aso-p8', 'res-mechanism-p1', 'res-mechanism-p2', 'res-mechanism-p5', 'res-mechanism-p6', 'res-mechanism-p7', 'res-mechanism-p8', 'fig5D'],
},

{
  id: 'xp-rnaseq',
  title: 'RNA-seq and pathway analysis',
  prompt: `What did the authors do with RNA sequencing and pathway analysis after knocking down CHiLL1 and GCAWKR, and what did they find?`,
  model: `<p>The authors knocked down each lncRNA with ASOs, collected RNA 24 hours later, sequenced it and used a statistical test to find genes that went up or down (q value below 0.2). For CHiLL1, two different ASOs changed the same genes in the same direction (R = 0.75), which indicates on-target effects, and the changes also agreed between A549 and H460. Enrichment analysis then asked which known gene sets and pathways were over-represented among the changed genes. KEGG pointed to non-small cell lung cancer, MAPK and PI3K-Akt signaling and apoptosis; MSigDB to p53 and mTORC1 signaling; and the transcription factor ZBTB7A was enriched. A follow-up assay agreed: CHiLL1 knockdown, but not GCAWKR, increased early apoptotic cells. For GCAWKR, a single ASO gave similar changes in both cell lines (R = 0.8) and enriched terms that overlap CHiLL1 (p53, cholesterol homeostasis, epithelial to mesenchymal transition), plus G2-M checkpoint and migration. Its knockdown raised G2 cells and impaired migration.</p>`,
  checklist: [
    'RNA-seq 24 h after ASO knockdown; differentially expressed genes called at q below 0.2',
    'Two ASOs agree (R = 0.75) and the cell lines agree, so effects are on-target and general',
    'Enrichment: KEGG (NSCLC, MAPK, PI3K-Akt, apoptosis), MSigDB (p53, mTORC1) and ZBTB7A',
    'Tests the predictions: CHiLL1 gives early apoptosis; GCAWKR gives more G2 cells and less migration',
    'GCAWKR: one ASO, R = 0.8 across cell lines, some overlap with CHiLL1 terms plus cell-cycle terms',
  ],
  source: ['m-rnaseq-p1', 'm-rnaseq-p2', 'res-mechanism-p2', 'res-mechanism-p3', 'res-mechanism-p4', 'res-mechanism-p5', 'res-mechanism-p6', 'fig6E', 'fig6I'],
},

{
  id: 'xp-barchart',
  title: 'Reading a bar chart from this paper',
  prompt: `Look at a bar chart such as Figure 5E (spheroid viability). What should you check in the axes, the controls, the legend and the labels before you trust or interpret it?`,
  model: `<p>Start with the title and the y axis. Figure 5E plots relative growth of H441 spheroids 7 days after ASO transfection (25 nM), with the non-targeting control ASO set to 1.0, so a bar below 1.0 means less growth than control. Next find the controls: the control ASOs give the baseline and an mTOR ASO is the positive control. Then read the legend for n and error bars: n = 4 biological replicates, error bars are SD. Check which test gave the P values: a one-tailed Student's t test, which looks for a change in one direction only and so gives smaller P values than a two-tailed test (background statistics). Compare the labels: P = 0.040 for mTOR, 0.024 for CHiLL1 ASO1 and 0.028 for GCAWKR ASO1, all under the 0.05 cut-off. Finally ask what is missing. There is a second control bar ("ASO control2") that the legend does not explain, only ASO1 is plotted although the photographs show ASO2, and it is one cell line in a dish.</p>`,
  checklist: [
    'Reads the axis: relative growth, control set to 1.0, below 1.0 means less growth',
    'Finds the controls: control ASOs and the mTOR positive control',
    'Finds n and error bars in the legend: n = 4 biological replicates, SD',
    'Names the test (one-tailed Student t test) and the 0.05 threshold',
    'Spots what the legend leaves out (the second control bar; ASO2 only in the photographs)',
    'Avoids over-reading: one cell line, cultures in a dish',
  ],
  source: ['fig5E', 'res-aso-p6', 'm-quant-p3'],
},

{
  id: 'xp-critique',
  title: 'Strengths and weaknesses of the paper',
  prompt: `Write a short critique: what are the main strengths of this paper, what are its limitations or weaknesses, and how serious are they?`,
  model: `<p>Strengths: the design combined three hallmarks, two cell lines and eight screens, and the integrated ranking beat single screens (AUC 0.82 versus 0.73 for A549 dropout and 0.54 for H460 dropout). Hits were active in both cell lines. The follow-up used two independent ASOs per target, normal lung cells, spheroids and organoids, and the library is a shared resource. Weaknesses: deletion is less sensitive than ORF mutation and can hit overlapping DNA elements, so only 8 of 12 hits tested were confirmed by ASOs, and known lncRNAs such as MALAT1 were missed. Screens used just two monolayer backgrounds, and Figure 2I shows cisplatin and migration screens only in A549. ASOs have not been delivered in vivo, overexpression could not rescue the ASO effects, and several mechanism assays have n = 2. The text, Methods and figures also disagree on library and control counts. Overall, these issues limit how far the results generalize rather than overturning the main logic.</p>`,
  checklist: [
    'Strength: multi-hallmark, two-cell-line design; integration beats single screens (AUC 0.82 versus 0.73 and 0.54)',
    'Strength: independent ASOs, normal cells, 3D and organoid models; shared library',
    'Weakness: CRISPR-del sensitivity and DNA-element effects (8 of 12 validated; MALAT1 and MIAT missed)',
    'Weakness: only two monolayer backgrounds; cisplatin and migration screens only in A549',
    'Weakness: no in vivo delivery, failed rescue, small n in mechanism assays',
    'Weakness: inconsistent library and control numbers between text, Methods and figures',
    'Judges the seriousness: limits generality, not the central logic',
  ],
  source: ['summary-p1', 'intro-p6', 'fig4B', 'fig2I', 'res-aso-p3', 'discussion-p2', 'discussion-p5', 'limitations-p1', 'limitations-p2', 'fig6K', 'res-multipheno-p3'],
}

);
