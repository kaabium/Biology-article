/* Mock Exam 2: Design, methods, statistics and critique. 34 questions (18 mcq, 7 short, 5 figure, 4 critique), 90 minutes. */
(window.EXAMS = window.EXAMS || []).push({
  id: 'exam-2',
  title: 'Mock Exam 2: Design, methods, statistics and critique',
  minutes: 90,
  intro: `<p>This exam asks <b>why</b> the experiments were built the way they were: the CRISPR-deletion screens and their controls, how hits were called and combined, the validation assays, the ASO work, the statistics in the legends, and a critical reading of the limitations. It also samples every part of the paper (Introduction, Results, Discussion, Methods and declarations) with a few key-number questions. The questions follow the workflow of the study, from design to critique.</p>
<ul>
<li><b>Time:</b> 90 minutes. A good plan is about one minute per multiple-choice question and four to six minutes per written question.</li>
<li><b>Marks (94 in total):</b> multiple-choice questions, including the two figure questions that have options, are worth 1 mark each and are marked for you. Short-answer, figure and critique answers are self-marked: after you submit, compare your answer with the model answer and tick the checklist. You get 1 mark for each checklist point your answer covers (the number of marks is shown above each question).</li>
<li><b>Good answers:</b> use full sentences, name the control or the test, quote numbers from the paper, and say what the evidence cannot show as well as what it shows.</li>
<li>Where a model answer gives an opinion instead of a fact from the paper, it starts with “In my assessment”. Supplementary figures and tables are not in your PDF, so no question asks what they show.</li>
</ul>`,
  questions: [
    /* 1 */
    { type: 'mcq', lesson: 'G-intro', points: 1, source: ['intro-p5'],
      q: `According to the Introduction, what is the main weakness of a CRISPR screen that uses one cell line and one cancer hallmark?`,
      options: [
        { t: `It can pick up lncRNAs whose effect is specific to that cell line and does not generalize to the disease, so many hits may fail later.`, ok: true, why: `Right. The Introduction says such designs are “vulnerable to discovering lncRNAs promoting cell-line-specific phenotypes that do not generalize to the disease in question”. That is why the authors aim for lncRNAs that are pleiotropic (several hallmarks) and background independent (several cell models).` },
        { t: `It cannot use CRISPR deletion, so it has to rely on CRISPRi, which does not work for lncRNAs.`, ok: false, why: `Not stated. The Introduction describes both deletion and CRISPRi screens, and it was CRISPRi screens that showed highly specific effects for lncRNAs in cell lines from six cancer types.` },
        { t: `It always finds fewer hits than a multi-hallmark screen.`, ok: false, why: `The concern is the quality and the generality of the hits, not how many there are.` },
        { t: `It cannot find lncRNAs that are overexpressed in tumors.`, ok: false, why: `Nothing in the Introduction says this. Expression in tumors is checked separately, with patient data, after the screens.` },
      ] },
    /* 2 */
    { type: 'short', lesson: 'D1', points: 5, source: ['res-pipeline-p1', 'res-multipheno-p3'],
      q: `Explain how the authors switch off a lncRNA gene with CRISPR deletion (DECKO). Why do they delete the transcription start site (TSS) rather than the whole gene, and what did the protein-coding positive controls show about how well this works?`,
      model: `A pair of guide RNAs (a pgRNA) steers Cas9 to cut on both sides of the gene’s TSS, so the DNA between the cuts is lost and the gene is no longer expressed (loss of function). Deleting only the TSS gives uniform, shorter deletions, which are more efficient, and it lowers the chance of false positives caused by deleting overlapping DNA regulatory elements. Background: a lncRNA has no protein-coding open reading frame (ORF) to disrupt, so removing its promoter region is the practical way to silence it. For protein-coding positive controls the authors compared ORF mutation (expected to give the maximal loss of function) with promoter deletion: promoter-deletion pgRNAs had a detectable but lower effect, so CRISPR-del screens for lncRNAs are intrinsically less sensitive than ORF-targeting screens (Figure 2F).`,
      checklist: [
        `A pair of guide RNAs (pgRNA) directs Cas9 to cut either side of the TSS, so the DNA between the cuts is deleted (loss of function)`,
        `Without its TSS, where copying into RNA starts, the gene is not expressed`,
        `Benefit: the deletions are uniform and shorter, which makes them more efficient`,
        `Benefit: less chance of false positives from deleting overlapping DNA regulatory elements`,
        `Evidence from the controls: promoter-deletion pgRNAs had a detectable but lower effect than ORF mutation, so CRISPR-del is less sensitive for lncRNAs`,
      ] },
    /* 3 */
    { type: 'mcq', lesson: 'G-res-pipeline', points: 1, source: ['res-pipeline-p2', 'm-library-design-p2', 'm-library-design-p4'],
      q: `The library leaves out every lncRNA whose TSS is within 2 kb of a protein-coding exon. What was the authors’ reason?`,
      options: [
        { t: `To avoid false-positive hits caused by unintended (off-target) effects on a neighboring protein-coding gene.`, ok: true, why: `Right. The Results say this was done “to avoid the known issues of false-positive results that may occur via unintended off targeting”. If a deletion next to a coding exon changed the protein-coding gene, you could not tell which gene caused the phenotype.` },
        { t: `Because lncRNAs close to coding exons are usually not expressed in A549 cells.`, ok: false, why: `Expression was handled by a separate filter (transcripts below a minimum FPKM in A549 were removed). The distance rule is about unintended effects on coding genes.` },
        { t: `Because guide RNAs cannot be designed within 2 kb of an exon.`, ok: false, why: `Guides can be designed there in principle. The rule is a deliberate design filter, and the off-target filters of the design software (CRISPETa) were applied as well.` },
        { t: `Because lncRNAs with bidirectional promoters must be removed from the library.`, ok: false, why: `They were not removed. Candidates with bidirectional promoters or with overlapping TSSs were merged into a single TSS target.` },
      ] },
    /* 4 */
    { type: 'mcq', lesson: 'D5', points: 1, source: ['m-library-design-p3', 'res-pipeline-p3', 'm-hits-p2', 'm-hits-p5'],
      q: `Neutral-control pgRNAs target AAVS1 loci, random intergenic regions and introns. What is their job in the screen analysis?`,
      options: [
        { t: `They are deletion guides placed where no phenotype is expected. They show what “no effect” looks like, set the scale for the z-scores, and serve as the true negatives when ranking methods are tested.`, ok: true, why: `Right. Neutral controls are placed in “genomic regions not expected to affect cell phenotype” (10 AAVS1 regions, 65 intergenic regions and 25 intronic regions). Fold changes were z-scaled with their mean and SD, and they were treated as the “false positives/true negatives” in the ROC analysis.` },
        { t: `They are guides with no target in the human genome, so Cas9 never cuts in these cells.`, ok: false, why: `No. Neutral controls do target real DNA (AAVS1, intergenic and intronic regions), so they control for the effect of cutting and deleting DNA itself. A guide with no target would not do that.` },
        { t: `They target essential protein-coding genes to prove that dropout can be detected.`, ok: false, why: `That describes the positive controls (protein-coding genes with known roles in cell growth and cisplatin resistance), not the neutral ones.` },
        { t: `They are the least expressed lncRNAs, used as a baseline.`, ok: false, why: `Neutral controls are not lncRNAs. They are chosen by location (regions not expected to change the phenotype), not by expression level.` },
      ] },
    /* 5 */
    { type: 'figure', img: 'fig1E', lesson: 'D7', points: 1, source: ['fig1E', 'res-pipeline-p5', 'm-pcr-gdna-p1'],
      q: `The gel in Figure 1E tests whether the TSS of DNMBP-AS1 was deleted in A549 cells. PCR primers (F and R) sit on either side of the target region, and the lanes are pgRNA_9, Control and H2O. What can you conclude?`,
      options: [
        { t: `Deletion happened in part of the cell population: the pgRNA_9 lane shows the 500 bp deletion band (KO) but also a fainter 2.5 kb wild-type band.`, ok: true, why: `Right. Because the primers flank the target, an intact locus gives a 2.5 kb product and a deleted locus a much shorter one (500 bp). Both bands in the pgRNA_9 lane mean that many, but not all, copies of the target were cut out. The cell lines are non-clonal (mixed populations), so a mixture is expected.` },
        { t: `Deletion was complete: no unedited DNA is left in any cell.`, ok: false, why: `A wild-type band at 2.5 kb is still visible in the pgRNA_9 lane, so some unedited copies remain.` },
        { t: `The 500 bp band proves that the RNA level of DNMBP-AS1 fell.`, ok: false, why: `The gel tests the DNA (genomic DNA from the cells). Whether the RNA fell was tested separately by qRT-PCR (Figure 1F).` },
        { t: `The strong 2.5 kb band in the Control lane shows that the control guides also deleted the TSS.`, ok: false, why: `The Control lane holds cells with a non-targeting pgRNA: its single 2.5 kb band is the size of the intact locus and is the reference. The H2O lane (no DNA) is empty, which shows that the bands come from the cells’ DNA and not from contamination of the PCR.` },
      ] },
    /* 6 */
    { type: 'mcq', lesson: 'D2', points: 1, source: ['m-lentivirus-p2', 'res-pipeline-p5', 'm-decko-p3'],
      q: `How did the authors make sure that the A549 and H460 cells used for the screens carried Cas9?`,
      options: [
        { t: `They made non-clonal lines that stably express Cas9 linked to a blue fluorescent protein (BFP) and sorted the cells by FACS twice, to keep a population with at least 60% BFP-positive cells.`, ok: true, why: `Right. The Cas9 vector (pLentiCas9-T2A-BFP) makes BFP together with Cas9, so BFP fluorescence reports Cas9 expression. The cells were selected with blasticidin and then FACS-sorted two times. “Non-clonal” means a mixed population, not a single clone.` },
        { t: `They picked single-cell clones and checked each clone for Cas9 by sequencing.`, ok: false, why: `The Results say that non-clonal lines were generated, and Cas9 was tracked by BFP fluorescence, not by sequencing clones.` },
        { t: `They delivered Cas9 and the pgRNAs together in the same lentivirus used for the screen.`, ok: false, why: `Cas9 was introduced first, to make stable cell lines. The screen virus carries the pgRNAs, and after infection puromycin (2 µg/mL) keeps the infected cells.` },
        { t: `They selected the cells with puromycin, which only Cas9-expressing cells survive.`, ok: false, why: `The Cas9 lines were selected with blasticidin (8 µg/mL). Puromycin was used later, after the pgRNA library had been introduced.` },
      ] },
    /* 7 */
    { type: 'mcq', lesson: 'D2', points: 1, source: ['m-titer-p1', 'fig1A'],
      q: `The pgRNA library was delivered at a multiplicity of infection (MOI) of 0.3 and the cells were then kept in puromycin. What is the logic of this design?`,
      options: [
        { t: `At a low MOI most infected cells receive only one virus, so each cell carries one pgRNA pair and its phenotype can be linked to one target. Puromycin then removes the cells that were not infected.`, ok: true, why: `Right (the “one guide per cell” logic is background; the numbers are from the Methods). The MOI was measured in a titration: the number of cells surviving in a puromycin well divided by the number in a puromycin-free well after 72 h. The aim was 0.3 to 0.4, and 0.3 was used for all screens.` },
        { t: `An MOI of 0.3 means that 30% of the library sequences were lost, so the coverage had to be raised by 30%.`, ok: false, why: `MOI is the average number of virus particles per cell, not a loss of library sequences. Coverage is a different quantity (cells per library sequence).` },
        { t: `A low MOI gives every cell many different pgRNAs, which makes deletion more likely.`, ok: false, why: `It is the other way round: a low MOI means most cells get at most one virus. Many guides in one cell would make it impossible to tell which one caused a phenotype.` },
        { t: `Puromycin kills the cells in which the TSS was deleted, so only unedited cells remain to be screened.`, ok: false, why: `Puromycin resistance comes from the vector, so puromycin only selects cells that were infected. It says nothing about whether a deletion happened.` },
      ] },
    /* 8 */
    { type: 'mcq', lesson: 'D3', points: 1, source: ['m-library-cloning-p2', 'm-library-cloning-p3', 'm-screens-p1', 'm-screen-prolif-p1', 'm-gdna-p2', 'res-pipeline-p4', 'm-titer-p1'],
      q: `The Methods mention a library coverage of 66.7X at the cloning step and a coverage of more than 1,000x in the screens. Which statement is correct?`,
      options: [
        { t: `66.7X is the number of bacterial colonies divided by the 12,000 different library sequences; more than 1,000x is the number of cells divided by the number of unique library sequences.`, ok: true, why: `Right. At cloning, 66.7X means each sequence was probably represented many times. In the screens, 16M cells at T0 gave more than 1,000x. High coverage keeps every pgRNA in many cells, so a random loss of cells is not mistaken for dropout.` },
        { t: `66.7X is the sequencing depth per pgRNA, and more than 1,000x is the number of cells that were infected.`, ok: false, why: `Sequencing depth is given in reads (20M reads for the plasmid library check, 40M reads per screen sample), not as coverage. The 1,000x value is cells per library sequence, not infected cells.` },
        { t: `Both values count cells per library sequence, measured before and after puromycin selection.`, ok: false, why: `Only the screen coverage counts cells. The 66.7X value counts bacterial colonies at the cloning step.` },
        { t: `66.7X is the percentage of pgRNAs that match perfectly, and more than 1,000x is the infection rate.`, ok: false, why: `The perfect-match figure is a different number (60.8% perfect match across both spacers), and infection is described by the MOI (0.3), not by coverage.` },
      ] },
    /* 9 */
    { type: 'short', lesson: 'D3', points: 5, source: ['fig1F', 'res-pipeline-p5', 'm-hits-p2', 'res-multipheno-p3', 'fig2E', 'res-multipheno-p4'],
      q: `The library has ten pgRNAs per target, and every screen was done in biological replicate. Explain what problem each choice solves, using evidence from the paper.`,
      model: `Individual pgRNAs differ in efficiency. For DNMBP-AS1 (Figure 1F) seven of the nine pgRNAs shown lowered the RNA significantly, but pgRNA 1 and 7 did not; in a random test of 12 pgRNAs the expected deletion was seen for 10/12 but the RNA fell for only 7/12 (no change for three, up for two). Ten pgRNAs per target let the target-level effect be summarized as the median of its guides (or the average of the top 3), so a few failed guides do not decide the result. Biological replicates show that an effect is reproducible rather than chance: the replicate screens correlated at the level of read counts, pgRNA fold changes and target-level fold changes (for example R=0.66 for the lncRNA candidates in Figure 2E), even when the positive controls were left out. Hits were called from biologically replicated screens, for example 77 lncRNAs needed for proliferation of A549 cells.`,
      checklist: [
        `Guides differ in efficiency: in Figure 1F pgRNA 1 and 7 were not significant, and in the test of 12 pgRNAs the RNA fell for only 7/12 (deletion seen in 10/12)`,
        `Ten pgRNAs per target, summarized by the median (or the average of the top 3), so a few failed guides do not decide a target’s result`,
        `Replicates separate reproducible effects from noise: the replicate screens correlate at read-count, pgRNA and target level (for example R=0.66 in Figure 2E)`,
        `The correlation holds when the positive controls are left out (lncRNA candidates alone), so it is not driven by a few strong controls`,
        `Hits come from biologically replicated screens (for example 77 lncRNAs needed for proliferation of A549 cells)`,
      ] },
    /* 10 */
    { type: 'figure', img: 'fig2F', lesson: 'D5', points: 4, source: ['fig2F', 'res-multipheno-p3'],
      q: `Look at Figure 2F (A549 dropout screen). (a) What do the four groups of dots represent? (b) What does the figure show about deleting a gene’s promoter (TSS) compared with mutating its open reading frame (ORF)? (c) Which statistical tests are shown, and what does each compare?`,
      model: `The dots are P values from the A549 dropout screen for 1003 lncRNA candidates, 35 neutral controls, 51 positive-control protein-coding genes targeted in the ORF and 58 positive-control genes targeted at the TSS (promoter). Neutral controls are not depleted (high P values); both positive-control groups are depleted, but ORF targeting gives the lowest P values (neutral vs ORF, 4.95e-05) while TSS deletion is detectable but weaker (neutral vs TSS, 0.004). The authors conclude that CRISPR-del screens for lncRNAs have intrinsically lower sensitivity than ORF-targeting screens, so some true lncRNA hits will be missed. The Kruskal-Wallis test (P=4.2e-12) asks whether the groups differ overall, and the Wilcoxon tests compare pairs of groups; both are rank-based tests (background).`,
      checklist: [
        `Identifies the groups: lncRNA candidates (n=1003), neutral controls (n=35), positive-control genes targeted in the ORF (n=51) and at the TSS (n=58), shown as P values from the A549 dropout screen`,
        `Neutral controls are not depleted, while the positive controls are significantly depleted`,
        `ORF targeting has the strongest effect (4.95e-05 against neutral) and TSS deletion a detectable but lower one (0.004), so CRISPR-del is intrinsically less sensitive for lncRNAs`,
        `Names the tests: Kruskal-Wallis for global differences (P=4.2e-12) and Wilcoxon for pairwise comparisons`,
      ] },
    /* 11 */
    { type: 'mcq', lesson: 'D4', points: 1, source: ['res-multipheno-p2', 'm-screen-prolif-p1'],
      q: `In the CFSE proliferation screen, in which sorted population should the pgRNAs of a growth-promoting lncRNA be enriched, and why?`,
      options: [
        { t: `In the brightest 20% of cells (slow-growing): the dye is shared out at each division, so slowly dividing cells keep more dye, and losing a growth-promoting lncRNA slows growth.`, ok: true, why: `Right. The Results say growth-promoting lncRNAs are found “by their pgRNAs’ enrichment in slow-growing cells”, and the Methods sorted the 20% brightest (slow-growing) and the 20% least bright (fast-growing) cells. That the dye halves at each division is background.` },
        { t: `In the least bright 20% of cells (fast-growing), because losing the lncRNA makes cells divide faster.`, ok: false, why: `Reversed. Losing a growth-promoting lncRNA slows division, so its pgRNAs pile up in the slow-growing, brightest cells.` },
        { t: `In the dead cells that float in the medium, because dead cells keep the most dye.`, ok: false, why: `Collecting floating dead cells is the logic of the cisplatin death screen, not of CFSE. In the CFSE screen the sorted cells are alive and are separated by how much dye they still carry.` },
        { t: `Equally in both populations, because the dye only labels cells and does not change their growth.`, ok: false, why: `The dye does not change growth, but it lets the cells be sorted by how often they divided. The sort is what creates the enrichment that the screen reads out.` },
      ] },
    /* 12 */
    { type: 'mcq', lesson: 'D5', points: 1, source: ['m-screen-cisplatin-p1', 'fig2B'],
      q: `In the cisplatin survival screen, A549 cells were treated at two doses, IC30 and IC80. Why were two doses used?`,
      options: [
        { t: `To widen the dynamic range and cover different dose effects: a mild dose (IC30) slows proliferation by about 30%, while a high dose (IC80) causes proliferative arrest or cell death.`, ok: true, why: `Right. The Methods give exactly this reason. For A549 the survival-screen doses were 6.5 and 25 µM, corresponding to IC30 and IC80.` },
        { t: `The lower dose is the untreated control and the higher dose is the treatment.`, ok: false, why: `Both doses are treatments. Neither is a control.` },
        { t: `The death screen needed 25 µM and the survival screen needed 6.5 µM.`, ok: false, why: `This is mixed up. The survival screen used 6.5 and 25 µM (IC30 and IC80). The death screen used lower doses (2 and 1 µM, IC20) because it collects the cells that die at a mild dose.` },
        { t: `Two doses were needed so that two independent replicates could be compared.`, ok: false, why: `The Methods give a different reason: to increase the dynamic range of the screens, not to create replicates.` },
      ] },
    /* 13 */
    { type: 'mcq', lesson: 'D4', points: 1, source: ['m-hits-p3', 'fig2A', 'fig2B', 'fig2C'],
      q: `For a single screen, a target was called a hit if its FDR was below 0.2 and its log2 fold change (LFC) had the right sign. Which sign was required?`,
      options: [
        { t: `Positive LFC in the CFSE, death and migration screens (pgRNAs enriched); negative LFC in the dropout and cisplatin survival screens (pgRNAs depleted).`, ok: true, why: `Right. In the positive screens the pgRNAs of interest are enriched in the collected cells (slow-growing, dead or migration-impaired cells), so LFC is above 0. In the dropout and survival screens they are depleted, so LFC is below 0.` },
        { t: `Negative LFC in every screen, because deleting a cancer-promoting lncRNA always lowers the pgRNA count.`, ok: false, why: `In a positive-selection screen the collected population is the one in which the pgRNAs of interest are enriched, so the LFC of a real hit is positive there.` },
        { t: `Positive LFC in the dropout and cisplatin screens, and negative LFC in the CFSE, death and migration screens.`, ok: false, why: `This is the reverse of what the Methods state.` },
        { t: `No sign was needed: FDR below 0.2 alone defines a hit.`, ok: false, why: `The Methods require both FDR below 0.2 and the correct sign of LFC, so that a target depleted when it should be enriched is not called a hit.` },
      ] },
    /* 14 */
    { type: 'short', lesson: 'G-m-hits', points: 6, source: ['m-hits-p1', 'm-hits-p2', 'm-hits-p3', 'm-hits-p4', 'm-hits-p5'],
      q: `Describe, in order, how the raw sequencing reads of a screen were turned into hits (for one screen and for the combined analysis), and how the authors judged the quality of the ranking.`,
      model: `Reads were analyzed with the CASPR pipeline: counts per million were filtered (the printed cutoffs, “3 > cpm>666”, look like a typo), low-scoring guides were removed by GuideScan and a batch-effect correction was applied with MageckFlute. CASPR then gave log2 fold changes and FDR-corrected p-values per target; the target-level log2FC is the median of its pgRNAs (as in MAGeCK’s method) or the average of the top 3, and fold changes can be z-scored using the mean and SD of the neutral controls. In a single screen a hit needs FDR &lt; 0.2 with LFC &gt; 0 for the positive screens (CFSE, death, migration) or LFC &lt; 0 for the dropout and cisplatin screens. To combine screens, the target prioritization pipeline (TPP) runs Robust Rank Aggregation on the effect sizes and an empirical Brown’s method on the p-values in parallel, merges the two with a harmonic mean p-value, corrects with Benjamini-Hochberg and calls hits at FDR &lt; 0.2. Ranking quality was checked with enrichment scores of positive and neutral controls (GSEA simulation, n = 10,000) and with ROC curves that treat positive controls as true positives and neutral controls as true negatives.`,
      checklist: [
        `Pre-processing: counts per million filtered, low-scoring guides removed (GuideScan), batch effect corrected (MageckFlute)`,
        `CASPR gives target-level log2FC (median of its pgRNAs, or the average of the top 3) and FDR-corrected p-values; z-scores use the mean and SD of the neutral controls`,
        `Single-screen hit: FDR &lt; 0.2 with LFC &gt; 0 (CFSE, death, migration) or LFC &lt; 0 (dropout, cisplatin)`,
        `TPP runs RRA (effect size, log2FC) and EBM (p-values) in parallel`,
        `The two scores are merged by a harmonic mean p-value, corrected with Benjamini-Hochberg, and hits are called at FDR &lt; 0.2`,
        `Quality check with controls: enrichment scores (GSEA, 10,000 simulations) and ROC curves with positive controls as true positives and neutral controls as true negatives`,
      ] },
    /* 15 */
    { type: 'mcq', lesson: 'E5', points: 1, source: ['m-hits-p4', 'fig4A', 'res-integration-p2'],
      q: `How does the target prioritization pipeline (TPP) combine the screens?`,
      options: [
        { t: `Robust Rank Aggregation (RRA) ranks targets by effect size (log2FC) across screens, an empirical Brown’s method (EBM) combines their p-values, a harmonic mean p-value merges the two, and Benjamini-Hochberg correction with FDR &lt; 0.2 defines the hits.`, ok: true, why: `Right. The paper applies “two different approaches in parallel”: RRA for effect size and EBM for significance. The RRA score is converted to a p-value so that the two can be merged.` },
        { t: `RRA combines the p-values and EBM ranks the effect sizes, and the harmonic mean then averages the fold changes.`, ok: false, why: `The roles are swapped. RRA works on effect size (log2FC) and EBM on p-values, and the harmonic mean is taken of significance scores (p-values), not fold changes.` },
        { t: `A target is a hit only if it passes FDR &lt; 0.05 in every single screen, and TPP simply counts them.`, ok: false, why: `TPP combines evidence across screens and does not require a hit in each one. In fact the hallmark-specific integration found 19 hits in two hallmarks and none in three.` },
        { t: `EBM first removes weak targets, and RRA then ranks only the survivors.`, ok: false, why: `The two approaches run side by side. They are not sequential steps. Their scores are merged afterwards by the harmonic mean p-value.` },
      ] },
    /* 16 */
    { type: 'mcq', lesson: 'E4', points: 1, source: ['m-hits-p4', 'res-integration-p2'], derived: ['16', '20'],
      q: `The pan-hallmark analysis called 80 lncRNAs as hits at FDR &lt; 0.2. What does that threshold mean?`,
      options: [
        { t: `On average up to about one in five of the called hits may be false positives (roughly 16 of the 80; a number computed here, not stated in the paper).`, ok: true, why: `Right. The FDR is the expected share of false discoveries among the hits. Because many targets are tested at once, the authors used the Benjamini-Hochberg method and accepted a fairly lenient 0.2, which suits a discovery screen whose hits are checked later with ASOs and other assays (background reasoning).` },
        { t: `Each hit has only a 20% chance of being real.`, ok: false, why: `It is the other way round: on average at least 80% of the hits are expected to be real. The 0.2 limits the share of false ones.` },
        { t: `Every hit had an uncorrected p-value below 0.2.`, ok: false, why: `FDR values are corrected values (Benjamini-Hochberg), not raw p-values. The correction is needed because many targets were tested together.` },
        { t: `About 20% of all targets in the library are false positives.`, ok: false, why: `The FDR describes the share of false discoveries among the called hits, not among all targets in the library.` },
      ] },
    /* 17 */
    { type: 'figure', img: 'fig4B', lesson: 'E4', points: 4, source: ['fig4B', 'res-integration-p1', 'm-hits-p5', 'res-pipeline-p3'],
      q: `Figure 4B compares ways of ranking the screen results. (a) How is “performance” measured, and what serves as the truth? (b) Which approaches do best and worst? (c) Name one reason to be careful when reading this figure.`,
      model: `Each ranking is scored with a ROC curve and its area under the curve (AUC): the 109 positive controls count as true positives and the 35 neutral controls as true negatives, so the AUC shows how well a ranking puts positives above neutrals (0.5 would be chance, 1.0 perfect). TPP Pan, which integrates all screens, does best (AUC 0.82), followed by RRA Pan (0.80); TPP Pheno (0.73±0.01) and the A549 dropout screen alone (0.73) are lower, and the H460 dropout screen alone is close to chance (0.54). In my assessment the main cautions are that the controls are not lncRNAs, so the ranking is judged on a stand-in truth, and that the gap between TPP Pan and RRA Pan is small and shown without a statistical test.`,
      checklist: [
        `AUC from ROC curves (true positive rate against false positive rate): 0.5 is chance, 1.0 is perfect`,
        `The truth set is the library controls: 109 positive controls (true positives) and 35 neutral controls (true negatives)`,
        `Best is TPP Pan (0.82), then RRA Pan (0.80); lower are TPP Pheno (0.73±0.01) and A549 dropout (0.73); worst is H460 dropout (0.54, close to chance), so integration beats single screens`,
        `A sensible caution, labeled as opinion: the controls are not lncRNAs, or the TPP Pan versus RRA Pan gap is small, or no test or interval is shown for the AUC differences`,
      ] },
    /* 18 */
    { type: 'mcq', lesson: 'E1', points: 1, source: ['res-validation-p1'], derived: ['2', '3.5', '0.29'],
      q: `Candidate 205 was a top dropout hit in A549 (log2 fold change = −1.81, FDR = 1.2 × 10<sup>−7</sup>). How should you read these two numbers?`,
      options: [
        { t: `Its pgRNAs became about 3.5-fold less abundant than in the reference sample (2^1.81 ≈ 3.5), and the tiny FDR says such a drop is very unlikely to be chance, even after correcting for the many targets tested.`, ok: true, why: `Right. A log2 fold change is a power of 2: −1.81 means a drop to about 2^−1.81 ≈ 0.29 of the starting level, which is 3.5-fold lower. The FDR is a corrected p-value, so it already allows for testing many targets at once. (The 3.5 and 0.29 are computed here, not stated in the paper.)` },
        { t: `Its pgRNAs became 1.81 times more abundant, because the sign shows an increase.`, ok: false, why: `The minus sign means a decrease (depletion), as expected when cells need the gene for growth. Also, a log2 value of −1.81 is not a factor of 1.81.` },
        { t: `Its pgRNAs fell by 1.81%.`, ok: false, why: `Log2 fold changes are not percentages. Each whole unit is a doubling or a halving, so −1.81 is a much bigger drop than 1.81%.` },
        { t: `The RNA of candidate 205 fell 3.5-fold after the deletion.`, ok: false, why: `The log2 fold change comes from pgRNA read counts in the screen, which reflect how well cells carrying that pgRNA grew. It is not a measurement of RNA. RNA levels were checked by separate experiments such as qRT-PCR.` },
      ] },
    /* 19 */
    { type: 'figure', img: 'fig3C', lesson: 'D7', points: 5, source: ['fig3C', 'm-competition-p1', 'res-validation-p3'],
      q: `Figure 3C shows a competition assay in A549 cells. (a) Explain how the assay works and name the neutral control and the positive control. (b) What do the results show for candidates 205 and 509? (c) State one thing this experiment cannot show.`,
      model: `GFP-labeled cells carrying an AAVS1 (neutral) pgRNA are mixed 1:1 with mCherry-labeled cells carrying the pgRNA of interest, and the share of each color is followed by flow cytometry for 7 days; if deleting the target lowers fitness, the mCherry cells are out-competed. In the neutral control two AAVS1 pgRNAs stay roughly equal, so the labels and cutting alone do not change growth, and the positive control (a pgRNA against the ORF of the essential ribosomal gene RPS5) loses clearly (P=3.8e-4). The pgRNAs for candidate 205 (pgRNA_2, P=0.005) and candidate 509 (pgRNA_3, P=0.004) are out-competed with an effect comparable to RPS5, and with cisplatin the candidate 509 cells decline too (P=0.031), consistent with the screen results (n=3, SD error bars, Student’s t test at the last time point). The assay cannot show whether the effect is caused by loss of the RNA or of a DNA element, and it tests one randomly chosen pgRNA per candidate in one cell line (A549).`,
      checklist: [
        `Describes the assay: GFP+ control (AAVS1) cells and mCherry+ cells carrying the test pgRNA are mixed 1:1 and followed by flow cytometry over time`,
        `Neutral control: two AAVS1 pgRNAs stay roughly equal, so labels and cutting alone do not change growth`,
        `Positive control: cells with the RPS5 pgRNA (essential ribosomal gene) are lost (P=3.8e-4)`,
        `Candidates 205 (P=0.005) and 509 (P=0.004) are out-competed, and with cisplatin candidate 509 declines too (P=0.031), consistent with the screens`,
        `A limit: it cannot separate RNA from DNA effects, tests one chosen pgRNA per candidate in A549 only, with n=3 and a Student’s t test at the last time point`,
      ] },
    /* 20 */
    { type: 'mcq', lesson: 'D7', points: 1, source: ['m-qpcr-p1', 'fig3D', 'fig1F'],
      q: `In the qRT-PCR bar charts the vertical axis reads “Relative expression (Normalised to HPRT1)” and the bar for the control ASO is set to about 1.0. What does a bar at 0.5 for an ASO mean?`,
      options: [
        { t: `The target RNA is about half as abundant as in control-ASO cells, after correcting for how much material was loaded by dividing by the housekeeping gene HPRT1.`, ok: true, why: `Right. qRT-PCR copies RNA into DNA and measures how much there is. Dividing by a housekeeping RNA that should not change (the Methods name HPRT1 as the internal control) corrects for differences in cell number and RNA quality. Heads-up: the axis of Figure 1F says “Normalised to GAPDH”, and the paper does not explain the difference.` },
        { t: `Half of the cells died, because HPRT1 is only made in living cells.`, ok: false, why: `Cell death is measured with other assays (viability, Annexin V). Normalizing to HPRT1 removes differences in loaded material; it does not count dead cells.` },
        { t: `The ASO lowered HPRT1 itself by half.`, ok: false, why: `HPRT1 is the reference and is assumed not to change; if the ASO changed it, the normalization would be invalid. The ASO is designed against the lncRNA.` },
        { t: `The ASO is half as potent as the control ASO.`, ok: false, why: `The control ASO is non-targeting, so it has no knockdown to compare with. The bar shows how far the target RNA fell relative to that control.` },
      ] },
    /* 21 */
    { type: 'mcq', lesson: 'E3', points: 1, source: ['res-multipheno-p6'], derived: ['5.4'],
      q: `Of the 109 positive controls in the library, 37 scored as hits in the A549 dropout screen and 16 in the H460 dropout screen, and 10 scored in both (p = 0.011, hypergeometric test). What does the p-value say?`,
      options: [
        { t: `If the two cell lines picked their hits independently from the 109 controls, an overlap of 10 or more would be unusual (p = 0.011), so the cell lines agree more than chance alone would predict.`, ok: true, why: `Right. A hypergeometric test asks how likely an overlap this large is by chance, given the sizes of the three groups. By chance you would expect only about 5.4 shared controls (37 × 16 ÷ 109, computed here), and 10 were seen.` },
        { t: `1.1% of the 109 positive controls are false positives.`, ok: false, why: `A p-value is not a false-positive rate for the controls. It says how surprising the overlap is if the two lists were unrelated.` },
        { t: `The correlation between the two cell lines’ fold changes is 0.011.`, ok: false, why: `Correlation is reported as Pearson’s R (for example in Figure 2H), not with a hypergeometric test. This test compares two lists of hits, not fold changes.` },
        { t: `There is a 98.9% chance that the two cell lines respond identically.`, ok: false, why: `A p-value is not the probability that a hypothesis is true. Also, only 10 controls were shared, so the cell lines clearly do not respond identically.` },
      ] },
    /* 22 */
    { type: 'critique', lesson: 'H2', points: 5, source: ['limitations-p1', 'res-validation-p2', 'res-validation-p4', 'res-aso-p1', 'fig3D'],
      q: `A genomic deletion removes DNA, so a phenotype after CRISPR deletion could come from loss of the RNA or from loss of the DNA itself. Explain why this matters, how the authors used ASOs to deal with it (give the candidate 205 example), and what the 8/12 validation rate implies.`,
      model: `Deleting a TSS region can also remove DNA regulatory elements (for example an enhancer) or an overlapping gene on the opposite strand, so a phenotype does not prove that the RNA of the lncRNA is responsible. ASOs lower the RNA without cutting any DNA, so a phenotype after ASO treatment points to an RNA-dependent mechanism. Candidate 205 overlaps the TSS of two bidirectional genes, LINC00115 and RP11-206L10.11; two gene-specific ASOs for each showed that LINC00115, but not RP11-206L10.11, drives proliferation through an RNA-dependent mechanism. Overall 8/12 (67%) of the hits tested with ASOs were validated (the 12 were 9 for proliferation/cisplatin and 3 for migration), which the authors read as meaning that around one-third of screen hits may act via DNA-dependent mechanisms; candidates 408 and 316 are likely false positives. In my assessment the 67% is only a rough guide, because the 12 tested were top-ranked hits chosen by the authors, and a failed ASO can also reflect weak knockdown rather than a DNA-dependent mechanism.`,
      checklist: [
        `Deletion can also remove DNA regulatory elements (for example enhancers) or an overlapping opposite-strand gene, so a phenotype is not proof of an RNA effect`,
        `ASOs knock down the RNA without cutting DNA, so an ASO phenotype supports an RNA-dependent mechanism`,
        `Candidate 205 overlaps LINC00115 and RP11-206L10.11: two ASOs per gene implicated LINC00115, not RP11-206L10.11`,
        `8/12 (67%) of the hits were validated with ASOs, so about one-third may act via DNA-dependent mechanisms (for example candidates 408/316 are likely false positives)`,
        `In my assessment type caveat: the 12 tested were selected top hits, so 67% may not apply to all hits, or ASO failure can reflect weak knockdown`,
      ] },
    /* 23 */
    { type: 'short', lesson: 'D6', points: 6, source: ['m-aso-p1', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'fig5A', 'fig5E'],
      q: `Explain how the ASO experiments were designed so that a phenotype could be blamed on loss of the target lncRNA and not on the treatment itself or on off-target effects. Include the controls and the role of the normal lung cells.`,
      model: `Several locked nucleic acid ASOs (3 to 5) were designed for each target, and a candidate was only taken forward if at least two independent ASOs gave ≥40% knockdown. Every experiment included a non-targeting control ASO delivered in the same way, and results are expressed relative to it, so the effect of transfection itself cancels out; MALAT1 (in the summary heat map) and an mTOR ASO (in spheroids) were positive controls whose knockdown is expected to lower viability. Getting the same phenotype with two different ASO sequences argues for on-target activity, because different sequences are unlikely to share the same off-target effects, and knockdown was measured together with the phenotype. The Tier 2 ASOs were also tested in H460 and H441 cells, and in non-transformed lung cells (HBEC3-KT, MRC5-CV1 and CCD-12Lu, as printed) the response was diminished or absent, which suggests low toxicity for normal cells.`,
      checklist: [
        `Several ASOs per target (3 to 5 designed); at least two independent ASOs with ≥40% knockdown were needed`,
        `A non-targeting control ASO, with results normalized to it, rules out effects of the transfection itself`,
        `Positive controls whose knockdown should lower viability (MALAT1 in the summary panel; an mTOR ASO in spheroids)`,
        `Two distinct ASO sequences giving the same phenotype indicates on-target activity (different sequences, different off-targets)`,
        `Knockdown efficiency was measured together with the phenotype, so the effect can be tied to loss of the RNA`,
        `Normal (non-transformed) lung cells showed a diminished or absent response, suggesting selectivity and low toxicity; other KRAS+ lines (H460, H441) were tested for generality`,
      ] },
    /* 24 */
    { type: 'mcq', lesson: 'D6', points: 1, source: ['m-aso-p2', 'res-aso-p8', 'fig5G', 'discussion-p7'],
      q: `In the cocktail experiments the total ASO concentration was kept at 25 nM, so a 50:50 CHiLL1/GCAWKR cocktail contained only half as much of each ASO as a single-ASO treatment. Why does this design matter?`,
      options: [
        { t: `It compares the cocktail with an equal dose of a single ASO, so a stronger effect (or any extra toxicity) can be blamed on combining two targets and not on a higher total amount of ASO.`, ok: true, why: `Right. The Results report a greater effect on viability than “an equal dose of either ASO alone” and no additional toxicity for non-cancerous cells, and the Discussion repeats the point (“equal doses of single ASOs”).` },
        { t: `It shows that higher ASO concentrations are more toxic to normal cells.`, ok: false, why: `The concentration was held constant, so this design cannot show a dose-toxicity relationship.` },
        { t: `It guarantees that both ASOs enter every cell.`, ok: false, why: `An equal total concentration says nothing about uptake. Uptake was checked separately with a labeled control ASO.` },
        { t: `It makes the non-targeting control ASO unnecessary.`, ok: false, why: `The non-targeting ASO control stays in the experiment (Figure 5G). Every single ASO and every cocktail is compared with it.` },
      ] },
    /* 25 */
    { type: 'mcq', lesson: 'C5', points: 1, source: ['m-pdx-p1', 'res-aso-p7', 'res-aso-p6', 'res-aso-p3'],
      q: `The authors tested CHiLL1 ASOs in organoids called BE874. How were these organoids made and checked?`,
      options: [
        { t: `Pieces of a surgically removed KRAS-mutant lung cancer were grown in immunodeficient (NSG) mice as a patient-derived xenograft, single cells from that tumor were used to make the organoids, and sequencing confirmed the same KRAS mutation in the organoids and in the patient’s primary cancer.`, ok: true, why: `Right. KRAS c.34G>T (p.Gly12Cys) was found in both the organoids and the corresponding primary cancer (targeted Sanger sequencing). This genotype check shows that the model kept the patient’s driver mutation.` },
        { t: `A549 cells were grown as spheres in Matrigel and then called organoids.`, ok: false, why: `Spheroids of H441 cells were a separate 3D model. BE874 comes from a patient tumor, which is why it is called patient-derived.` },
        { t: `Healthy lung tissue from the same patient was grown as the normal comparison.`, ok: false, why: `The normal comparison cells in the paper were non-transformed lung cell lines (HBEC3-KT, MRC5-CV1 and CCD-12Lu, as printed), not organoids from the same patient.` },
        { t: `The tumor cells were grown directly in culture and assumed to be KRAS-mutant from the clinical file.`, ok: false, why: `The mutation was tested: KRAS was sequenced in both the organoids and the primary cancer.` },
      ] },
    /* 26 */
    { type: 'mcq', lesson: 'G-res-aso', points: 1, source: ['res-aso-p9', 'fig5H', 'res-aso-p10'],
      q: `Figure 5H reports that 78% of KRAS-mutant lung adenocarcinomas in TCGA (n=101) express at least one of CHiLL1 and GCAWKR, and 92% express at least one Tier 2 lncRNA. What does the 78% measure?`,
      options: [
        { t: `The share of tumors whose RNA-seq shows at least one of the two lncRNAs above the expression cutoff (more than 0.5 FPKM): the share of patients who have a target, not the share who would respond.`, ok: true, why: `Right. The legend defines expression as >0.5 FPKM, and the Results say these patients “might be treated by the Tier 3 cocktail”. No patient was treated in the paper, so this is a prediction about who has the target.` },
        { t: `The share of patients whose tumors shrank after CHiLL1/GCAWKR ASO treatment.`, ok: false, why: `No patients were treated. All the ASO work was done in cells, spheroids and organoids.` },
        { t: `The average drop in cell viability caused by the Tier 3 cocktail.`, ok: false, why: `Viability effects are shown in other panels (for example Figure 5G). Figure 5H is based on RNA-seq data from tumors.` },
        { t: `The knockdown efficiency of the cocktail in the 101 tumors.`, ok: false, why: `Knockdown was measured in cultured cells. In the 101 TCGA tumors only expression was read out and nothing was knocked down.` },
      ] },
    /* 27 */
    { type: 'short', lesson: 'D8', points: 6, source: ['m-viability-2d-p1', 'm-viability-3d-p1', 'm-apoptosis-p1', 'm-cellcycle-p1', 'm-migration-assay-p1', 'res-mechanism-p5', 'res-mechanism-p6'],
      q: `After ASO knockdown the authors measured viability, apoptosis, the cell cycle and migration. For each assay, say what is read out and how, and what the comparison was; then name the main result for CHiLL1 or GCAWKR.`,
      model: `Viability: CellTiter-Glo luminescence, which reports the number of viable cells, was read over several days (CellTiter-Glo 3D for spheroids and organoids), and each ASO was compared with a non-targeting control ASO. Apoptosis: cells 24 h after transfection were stained with Annexin V (marks early apoptotic cells) and a viability dye (marks dead cells) and read by flow cytometry, with unstained cells as a staining control. Cell cycle: cells fixed 24 h after transfection were stained with Ki-67 and DAPI (DNA content) for flow cytometry, and the phases were assigned with the Dean-Jett-Fox model. Migration: cells were put in the upper part of a Boyden chamber in serum-free medium with 10% FBS below as the attractant; after 24 h the migrated cells were stained with crystal violet, dissolved, and read as absorbance at 595 nm, relative to the non-targeting ASO. Main results: CHiLL1 knockdown, but not GCAWKR, increased early apoptotic cells; GCAWKR knockdown, but not CHiLL1, increased cells in G2 and impaired migration.`,
      checklist: [
        `Viability: CellTiter-Glo (the 3D version for spheroids and organoids) luminescence reports the number of viable cells, compared with a non-targeting ASO`,
        `Apoptosis: Annexin V (early apoptotic) plus a viability dye (dead cells) by flow cytometry 24 h after transfection, with unstained cells as control`,
        `Cell cycle: Ki-67 and DAPI flow cytometry, with the phases assigned by the Dean-Jett-Fox model`,
        `Migration: Boyden chamber, serum-free medium above and 10% FBS below, crystal violet absorbance (595 nm) relative to the non-targeting ASO`,
        `Result: CHiLL1 (not GCAWKR) knockdown increased early apoptotic cells`,
        `Result: GCAWKR (not CHiLL1) knockdown increased cells in G2 and impaired migration`,
      ] },
    /* 28 */
    { type: 'figure', img: 'fig6C', lesson: 'D9', points: 1, source: ['fig6C', 'res-mechanism-p1'],
      q: `Figure 6C shows RNA measured by qRT-PCR in nuclear and cytoplasmic fractions of A549 cells. The axis is the log2 nuclear/cytoplasmic ratio and it runs backwards (3 on the left, −2 on the right). What are MALAT1 and GAPDH doing in this experiment, and what do the data show?`,
      options: [
        { t: `They are controls for the fractionation (MALAT1 nuclear, GAPDH cytoplasmic). Because they behave as expected, the plot supports GCAWKR being mainly nuclear and CHiLL1 mainly cytoplasmic.`, ok: true, why: `Right. The legend calls them the nuclear and cytosolic controls. On this reversed axis positive values (left) mean nuclear: MALAT1 and GCAWKR point left, GAPDH and CHiLL1 point right. The FISH images gave the same pattern. The panel prints n=2 and no P values.` },
        { t: `They are housekeeping genes used to normalize the CHiLL1 and GCAWKR values.`, ok: false, why: `Normalization uses a housekeeping gene within each sample. Here MALAT1 and GAPDH are measured to show that the fractions were separated properly, and they are expected to land on opposite sides of zero.` },
        { t: `They are the positive and negative controls for ASO knockdown.`, ok: false, why: `No ASO treatment is involved in this panel. It only compares where RNAs sit in untreated cells.` },
        { t: `The bars show that CHiLL1 is nuclear and GCAWKR is cytoplasmic.`, ok: false, why: `This reads the reversed axis the wrong way round. Nuclear is on the left (positive values), so GCAWKR is nuclear and CHiLL1 is cytoplasmic, as in the FISH images.` },
      ] },
    /* 29 */
    { type: 'short', lesson: 'D10', points: 5, source: ['m-rnaseq-p1', 'm-rnaseq-p2', 'res-mechanism-p2', 'res-mechanism-p3', 'res-mechanism-p4', 'res-mechanism-p5', 'res-mechanism-p6', 'fig6E', 'discussion-p6'],
      q: `Explain how RNA-seq and enrichment analysis were used to study what CHiLL1 does: the design choices (timing, ASOs, thresholds), what the enrichment suggested, and what such an analysis cannot prove.`,
      model: `A549 cells (and H460 cells) were harvested 24 h after ASO transfection and sequenced (about 30M reads per sample); transcripts were quantified with Kallisto, differential expression was tested with Sleuth, and genes with a q-value &lt; 0.2 counted as significant. For CHiLL1 the authors kept the genes changed by both of two different ASOs, and the changes caused by the two ASOs were highly correlated (R=0.75), so most effects arise from on-target loss of CHiLL1. Enrichment analysis of these genes (KEGG, MSigDB) pointed to non-small cell lung cancer, MAPK, PI3K-Akt, apoptosis, p53 and mTORC1, with agreement between A549 and H460, and the apoptosis term led to an Annexin V assay that showed more early apoptotic cells. In my assessment enrichment only shows that the changed genes are over-represented in a pathway; it does not prove that CHiLL1 acts directly on that pathway, because some changes 24 h after knockdown are probably secondary effects. For GCAWKR a single ASO was used, so the on-target argument there rests on other evidence.`,
      checklist: [
        `Design: cells harvested 24 h after ASO treatment, about 30M reads per sample, Kallisto and Sleuth, significance at q &lt; 0.2`,
        `CHiLL1: genes changed with both of two ASOs were used, and the changes of the two ASOs correlate (R=0.75), supporting on-target effects`,
        `Enrichment (KEGG, MSigDB) pointed to NSCLC, MAPK, PI3K-Akt, apoptosis, p53 and mTORC1, in agreement between A549 and H460`,
        `Enrichment produced testable predictions that were followed up (the apoptosis term led to the Annexin V assay)`,
        `Limit, as opinion: enrichment shows association, not direct regulation; secondary effects are likely; GCAWKR was analyzed with a single ASO`,
      ] },
    /* 30 */
    { type: 'critique', lesson: 'H2', points: 6, source: ['res-aso-p3', 'discussion-p5', 'res-mechanism-p2', 'res-mechanism-p6', 'm-rescue-p1', 'fig6E'],
      q: `ASOs can have off-target effects. (a) List the evidence the authors give that the CHiLL1 and GCAWKR ASO effects are on-target. (b) What would a successful rescue experiment have shown, and what does the failed rescue mean? (c) What is the weakest part of the on-target argument?`,
      model: `The authors give four lines of evidence: two independent ASO sequences per gene gave the same phenotypes; CRISPR deletion with multiple pgRNAs, a different method with different off-targets, replicated them; for CHiLL1 the RNA-seq changes caused by the two ASOs were highly correlated (R=0.75); and non-transformed cells showed diminished or absent responses, so the effect is not simply general toxicity of the treatment. A successful rescue (overexpressing the lncRNA from a plasmid and finding that the ASO phenotype is reversed) would have been strong proof of on-target action, but overexpression of neither CHiLL1 nor GCAWKR rescued the ASO-induced phenotypes; the authors suggest cis-regulatory mechanisms (although no such effect was seen for CHiLL1’s nearest neighbor TNFRSF10B) or functional isoforms that are unannotated and were not tested. In my assessment the weakest point is that the on-target claim rests on indirect evidence (“strongly suggested”, not proven), and that for GCAWKR the RNA-seq analysis used a single ASO; a plasmid-made RNA may also fail to restore the RNA in the right place, amount or isoform, so the failed rescue does not prove an off-target effect.`,
      checklist: [
        `Two independent ASOs per gene give the same phenotype (different sequences, different off-targets)`,
        `CRISPR deletion with multiple pgRNAs replicates the phenotypes (a different perturbation method)`,
        `RNA-seq: the two CHiLL1 ASOs give highly correlated changes (R=0.75)`,
        `Normal cells show a diminished or absent response, arguing against generic toxicity`,
        `Rescue logic: restoring the RNA should reverse the phenotype; overexpression of neither lncRNA rescued, and the authors suggest cis-regulatory mechanisms or unannotated isoforms`,
        `Opinion: the weakest point is that on-target action is only indirectly supported (failed rescue; a single ASO for GCAWKR RNA-seq), so “strongly suggested” rather than proven`,
      ] },
    /* 31 */
    { type: 'short', lesson: 'F4', points: 6, source: ['fig2F', 'fig3C', 'fig4H', 'fig5G', 'fig3D', 'fig3F', 'fig5E', 'fig5F', 'fig6L', 'fig6K', 'fig6G', 'fig1F', 'res-mechanism-p5', 'm-quant-p3'],
      q: `Read the small print of the legends. (a) Name the statistical test used for the panels in Figures 2F, 3C, 4H and 5G. (b) Give two reasons for caution about the statistics of the ASO experiments. (c) Name two things the legends do not tell you.`,
      model: `Figure 2F uses Wilcoxon (pairwise) and Kruskal-Wallis (global) tests, Figure 3C a Student’s t test at the last time point (n=3, SD error bars), Figure 4H a one-sided Fisher’s exact test, and Figure 5G a one-tailed Mann-Whitney test (n=4). In my assessment the ASO experiments call for caution because many panels use one-tailed t tests (Figures 3D, 3F, 5E, 5F and 6L), which only look for a decrease and give smaller P values than two-tailed tests, and some assays have only n = 2 biological replicates (the cell-cycle assay in Figure 6K), so the P values are fragile. The legends leave out, for example, what the error bars show and which test gave the P values in Figure 1F, and any test, error bar or P value for the apoptosis panel (Figure 6G), although the text calls the increase in early apoptotic cells significant. They also do not always say whether replicates are biological or technical; the legend of Figure 3D says n = 4, but its RT-qPCR panels print n=2; and the Methods only state that p ≤ 0.05 counts as significant unless otherwise specified.`,
      checklist: [
        `Figure 2F: Wilcoxon (pairwise) and Kruskal-Wallis (global); Figure 3C: Student’s t test at the last time point (n=3, SD)`,
        `Figure 4H: Fisher’s exact test (one-sided); Figure 5G: one-tailed Mann-Whitney test (n=4)`,
        `Many ASO panels use one-tailed t tests (for example 3D, 3F, 5E, 5F, 6L): they only look for a decrease, and the choice is not justified in the legends`,
        `Small n: the cell-cycle assay (Figure 6K) has n = 2 biological replicates, so its P values are fragile`,
        `A gap in the legends: Figure 1F gives no error-bar type or test; Figure 6G shows no test, error bars or P values although the text says “significant”`,
        `Another gap: biological versus technical replicates are not always stated; the Figure 3D legend says n = 4 but n=2 is printed in the RT-qPCR panels; no multiple-testing correction is mentioned; the Methods only give p ≤ 0.05`,
      ] },
    /* 32 */
    { type: 'mcq', lesson: 'G-discussion', points: 1, source: ['discussion-p2'],
      q: `Why do the authors consider pooled CRISPR screening a good way to find RNA-therapeutic targets, compared with screening ASOs one by one in an arrayed format?`,
      options: [
        { t: `An arrayed ASO screen would need custom ASO libraries for the lncRNAs expressed in every cell or disease model, which is prohibitively expensive and cannot keep up with changing annotations, whereas CRISPR libraries can be generated rapidly.`, ok: true, why: `Right. This is the argument of the Discussion. It also notes that CRISPR gives improved perturbation and on-target rates compared with shRNA, and that it finds lncRNAs through their cell-level function.` },
        { t: `A pooled CRISPR screen measures the knockdown efficiency of each ASO directly.`, ok: false, why: `Pooled CRISPR screens do not use ASOs. They find targets by deleting DNA; ASOs were designed and tested afterwards, one target at a time.` },
        { t: `Pooled screening removes the need for follow-up validation.`, ok: false, why: `The paper itself follows up with ASOs and other assays, and the Limitations section points to likely false positives among the hits.` },
        { t: `Pooled screening can only be used for protein-coding genes.`, ok: false, why: `This study is itself a pooled screen of lncRNAs.` },
      ] },
    /* 33 */
    { type: 'critique', lesson: 'H4', points: 6, source: ['limitations-p2', 'discussion-p5'],
      q: `The Limitations section admits several weaknesses. Choose three of them. For each one, say why it matters for the conclusions and propose an experiment that would address it. Include at least one experiment that the authors themselves suggest.`,
      model: `First, false negatives: CRISPR-del is a less efficient perturbation than ORF mutation and the annotations are incomplete, so some lncRNAs were not screened or had the wrong TSS targeted, and known lung-cancer lncRNAs such as MALAT1 and MIAT were missed; the list of 831 screened lncRNAs is therefore not comprehensive. The authors suggest complementary direct RNA-targeting CRISPR perturbations such as Cas13. Second, the screens used only two monolayer cell backgrounds, so hits may not hold in tumors; the authors propose parallel screens across the widest panel of mutationally matched 2D and 3D models. Third, in my assessment, the biggest gap is in vivo evidence: every claim of ASO efficacy and low toxicity comes from cultured cells and organoids, so a mouse (xenograft) study of efficacy and toxicity, after the refinement of ASO sequences and chemistry that the Discussion lists as future work, would be the key strengthening experiment.`,
      checklist: [
        `Names a stated limitation: CRISPR-del is less efficient than ORF mutation and annotations are incomplete, giving false negatives (MALAT1 and MIAT were missed)`,
        `Proposes a fitting experiment for it: direct RNA-targeting CRISPR such as Cas13 (the authors’ suggestion)`,
        `Names a second stated limitation: only two monolayer (2D) cell backgrounds were screened`,
        `Proposes a fitting experiment: screens across a wider panel of mutationally matched 2D and 3D models (the authors’ suggestion)`,
        `Names a third limitation or gap (for example many hits not followed up, or no in vivo data) and a fitting experiment (for example a mouse study of ASO efficacy and toxicity)`,
        `Explains why each limitation matters for the conclusions (what could be missed or over-generalized)`,
      ] },
    /* 34 */
    { type: 'critique', lesson: 'H3', points: 5, source: ['decl-p1', 'm-data-p1', 'm-data-p2', 'res-aso-p10', 'discussion-p5', 'limitations-p1'],
      q: `The Declaration of interests reports a patent application and a consulting role. (a) State what is declared. (b) Explain why a reader should keep it in mind when reading the claims about therapeutic potential. (c) Name two features of the paper that let a reader judge the claims independently of the authors’ interests.`,
      model: `T.P., R.E. and R.J. have filed a patent application (21202363.4) on the therapeutic targeting of the lncRNAs identified in the paper (applicant: University of Bern), and R.J. is a paid consultant for NextRNA (USA). A declared interest does not mean the results are wrong, but it tells the reader that some authors could benefit financially if the ASO targets are seen as promising, so statements such as “potent and low-toxicity ASOs” should be checked against the data, which come from cells and organoids only. Features that help independent judgment are the deposition of the sequencing data in GEO and of the TPP code at Zenodo, the use of two independent ASO sequences and normal-cell controls, and the open discussion of limitations such as likely false positives. In my assessment the commercial claim goes beyond the evidence: no in vivo efficacy or safety data are shown, so the patent protects a hypothesis about targets, not a proven therapy.`,
      checklist: [
        `States the patent application (21202363.4) filed by T.P., R.E. and R.J. on therapeutic targeting of the lncRNAs; applicant University of Bern`,
        `States that R.J. is a paid consultant for NextRNA (USA)`,
        `Explains that the declaration flags a possible financial interest in the therapeutic claims without implying that the data are wrong; claims should be checked against the evidence`,
        `Names two checks available to the reader (for example data in GEO and TPP code at Zenodo; two independent ASOs; normal-cell controls; the limitations section)`,
        `Opinion: the therapeutic claims rest on in vitro data only (no in vivo data), so they remain hypotheses`,
      ] },
  ],
});
