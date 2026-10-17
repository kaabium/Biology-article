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
    { type: 'mcq', lesson: 'D1', points: 1, source: ['intro-p4', 'intro-p5', 'limitations-p2', 'res-pipeline-p1'],
      q: `The paper mentions three CRISPR-based ways of perturbing a lncRNA. Which description is correct?`,
      options: [
        { t: `CRISPRi deletes the TSS with paired guides, CRISPR deletion turns transcription down without cutting the DNA, and Cas13 is a nuclease that cuts the DNA at the TSS.`, ok: false, why: `The methods are mixed up. The paper’s CRISPR deletion is the one that uses paired guide RNAs (pgRNAs) to delete the TSS.` },
        { t: `All three approaches remove the lncRNA gene from the genome and differ only in how the guide RNAs are designed.`, ok: false, why: `Only CRISPR deletion removes DNA. CRISPRi leaves the DNA in place, and Cas13 acts on RNA.` },
        { t: `CRISPR deletion (used here) cuts the TSS out of the DNA with paired guides, CRISPRi turns transcription down without cutting, and Cas13 targets the RNA.`, ok: true, why: `Right. The Introduction lists “targeted genomic deletions or transcriptional inhibition” as two ways of silencing expression, and the Limitations suggest “direct RNA-targeting CRISPR perturbations, such as Cas13” as a complementary approach. (How CRISPRi works inside the cell is background.)` },
        { t: `CRISPR deletion and CRISPRi both act on the RNA, whereas Cas13 is the approach that changes the DNA.`, ok: false, why: `This is reversed. CRISPR deletion changes the DNA, CRISPRi acts on the gene’s transcription, and Cas13 is the “direct RNA-targeting” tool.` },
      ] },
    /* 2 */
    { type: 'short', lesson: 'D1', points: 5, source: ['res-pipeline-p1'],
      q: `Explain how the authors switch off a lncRNA gene with CRISPR deletion (DECKO). Why do they delete the transcription start site (TSS) rather than the whole gene, and why does the method need a pair of guides?`,
      model: `A pair of guide RNAs (a pgRNA) steers Cas9 to cut on both sides of the gene’s TSS, so the DNA between the cuts is lost and the gene is no longer expressed (loss of function). Background: one cut alone only makes small random changes, whereas two cuts remove a defined segment, and a lncRNA has no protein-coding open reading frame (ORF) that could simply be disrupted, so cutting out the TSS region is the practical route. Deleting only the TSS rather than the whole gene gives uniform, shorter deletions, which are more efficient. It also lowers the chance of false positives caused by deleting overlapping DNA regulatory elements.`,
      checklist: [
        `A pair of guide RNAs (pgRNA) directs Cas9 to cut either side of the TSS, so the DNA between the cuts is deleted (loss of function)`,
        `Without its TSS, where copying into RNA starts, the gene is not expressed`,
        `Benefit: the deletions are uniform and shorter, which makes them more efficient`,
        `Benefit: less chance of false positives from deleting overlapping DNA regulatory elements`,
        `Why a pair (background): one cut gives only small random changes, two cuts remove a defined segment that contains the TSS`,
      ] },
    /* 3 */
    { type: 'mcq', lesson: 'G-res-pipeline', points: 1, source: ['res-pipeline-p2', 'm-library-design-p2', 'm-library-design-p4'],
      q: `The library leaves out every lncRNA whose TSS is within 2 kb of a protein-coding exon. What was the authors’ reason?`,
      options: [
        { t: `To avoid false-positive hits caused by unintended (off-target) effects on a neighboring protein-coding gene.`, ok: true, why: `Right. The Results say this was done “to avoid the known issues of false-positive results that may occur via unintended off targeting”. If a deletion next to a coding exon changed the protein-coding gene, you could not tell which gene caused the phenotype.` },
        { t: `Because lncRNAs that lie close to coding exons are usually not expressed in A549 cells and would give no signal in the screen.`, ok: false, why: `Expression was handled by a separate filter (transcripts below a minimum FPKM in A549 were removed). The distance rule is about unintended effects on coding genes.` },
        { t: `Because guide RNAs cannot be designed within 2 kb of an exon, so those lncRNAs could not be targeted by any pgRNA pair.`, ok: false, why: `Guides can be designed there in principle. The rule is a deliberate design filter, and the off-target filters of the design software (CRISPETa) were applied as well.` },
        { t: `Because lncRNAs with bidirectional promoters must be removed so that each target has a single TSS that can be deleted cleanly.`, ok: false, why: `They were not removed. Candidates with bidirectional promoters or with overlapping TSSs were merged into a single TSS target.` },
      ] },
    /* 4 */
    { type: 'mcq', lesson: 'D5', points: 1, source: ['m-library-design-p3', 'res-pipeline-p3', 'm-hits-p2', 'm-hits-p5'],
      q: `Neutral-control pgRNAs target AAVS1 loci, random intergenic regions and introns. What is their job in the screen analysis?`,
      options: [
        { t: `They are guides with no target in the human genome, so Cas9 never cuts in these cells and growth is unaffected.`, ok: false, why: `No. Neutral controls do target real DNA (AAVS1, intergenic and intronic regions), so they control for the effect of cutting and deleting DNA itself. A guide with no target would not do that.` },
        { t: `They target essential protein-coding genes, to prove that a dropout of pgRNAs can be detected and that the screen worked.`, ok: false, why: `That describes the positive controls (protein-coding genes with known roles in cell growth and cisplatin resistance), not the neutral ones.` },
        { t: `They are the least expressed lncRNAs in the library, used as a baseline for comparison with the other targets.`, ok: false, why: `Neutral controls are not lncRNAs. They are chosen by location (regions not expected to change the phenotype), not by expression level.` },
        { t: `They are deletion guides placed in regions not expected to change the phenotype, so they show what “no effect” looks like.`, ok: true, why: `Right. Neutral controls are placed in “genomic regions not expected to affect cell phenotype” (10 AAVS1 regions, 65 intergenic regions and 25 intronic regions). Their mean and SD were used to z-scale the fold changes, and they were treated as the “false positives/true negatives” in the ROC analysis.` },
      ] },
    /* 5 */
    { type: 'figure', img: 'fig1E', lesson: 'D7', points: 1, source: ['fig1E', 'res-pipeline-p5', 'm-pcr-gdna-p1'],
      q: `The gel in Figure 1E tests whether the TSS of DNMBP-AS1 was deleted in A549 cells. PCR primers (F and R) sit on either side of the target region, and the lanes are pgRNA_9, Control and H2O. What can you conclude?`,
      options: [
        { t: `Deletion was complete in all cells: the pgRNA_9 lane shows the 500 bp deletion band and no unedited DNA is left, so every copy of the TSS region was cut out.`, ok: false, why: `A wild-type band at 2.5 kb is still visible in the pgRNA_9 lane, so some unedited copies remain.` },
        { t: `Deletion occurred in some copies of the target but not all: the pgRNA_9 lane shows both the 500 bp deletion band (KO) and a fainter 2.5 kb wild-type band.`, ok: true, why: `Right. Because the primers flank the target, an intact locus gives a 2.5 kb product and a deleted locus a much shorter one (500 bp). Both bands in the pgRNA_9 lane mean that some copies of the target were cut out and some were not. The cell lines are non-clonal (mixed populations), so a mixture is expected.` },
        { t: `The 500 bp band proves that the RNA level of DNMBP-AS1 fell, because a shorter DNA product means less RNA.`, ok: false, why: `The gel tests the DNA (genomic DNA from the cells). Whether the RNA fell was tested separately by qRT-PCR (Figure 1F).` },
        { t: `The strong 2.5 kb band in the Control lane shows that the control guides also deleted the TSS, but less efficiently than pgRNA_9 did, since the wild-type band is still strong.`, ok: false, why: `The Control lane holds cells with a non-targeting pgRNA: its single 2.5 kb band is the size of the intact locus and is the reference. The H2O lane (no DNA) is empty, which shows that the bands come from the cells’ DNA and not from contamination of the PCR.` },
      ] },
    /* 6 */
    { type: 'mcq', lesson: 'D2', points: 1, source: ['m-lentivirus-p2', 'res-pipeline-p5', 'm-decko-p3'],
      q: `How did the authors make sure that the A549 and H460 cells used for the screens carried Cas9?`,
      options: [
        { t: `They picked single-cell clones and checked each clone for Cas9 by sequencing before using it for the screens.`, ok: false, why: `The Results say that non-clonal lines were generated, and Cas9 was tracked by BFP fluorescence, not by sequencing clones.` },
        { t: `They delivered Cas9 and the pgRNAs together in the same lentivirus, so that every infected cell carried both.`, ok: false, why: `Cas9 was introduced first, to make stable cell lines. The screen virus carries the pgRNAs, and after infection puromycin (2 µg/mL) keeps the infected cells.` },
        { t: `They made non-clonal lines that stably express Cas9 linked to BFP and sorted them twice by FACS for at least 60% BFP-positive cells.`, ok: true, why: `Right. The Cas9 vector (pLentiCas9-T2A-BFP) makes BFP together with Cas9, so BFP fluorescence reports Cas9 expression. The cells were selected with blasticidin and then FACS-sorted two times. “Non-clonal” means a mixed population, not a single clone.` },
        { t: `They selected the cells with puromycin, because only cells that express Cas9 are resistant to it.`, ok: false, why: `The Cas9 lines were selected with blasticidin (8 µg/mL). Puromycin was used later, after the pgRNA library had been introduced.` },
      ] },
    /* 7 */
    { type: 'mcq', lesson: 'C4', points: 1, source: ['m-expmodel-p1', 'm-library-cloning-p3', 'm-lentivirus-p2'],
      q: `All the cell lines in the paper were authenticated by STR profiling and tested for mycoplasma. Why does this matter for the conclusions?`,
      options: [
        { t: `STR profiling confirms that each line is what it is claimed to be, and a negative mycoplasma test shows that the cultures were free of a common contamination.`, ok: true, why: `Right. The Methods state that all lines were “authenticated using Short Tandem Repeat (STR) profiling” and “tested negative for mycoplasma contamination”. A result obtained in the wrong cell line, or in contaminated cells, could not be trusted. (Why mycoplasma matters is background.)` },
        { t: `STR profiling reads out the KRAS mutation of each line, and the mycoplasma test measures how fast the cells grow.`, ok: false, why: `STR profiling reads short repeated DNA sequences that act like a genetic fingerprint of a cell line; it does not report mutations such as KRAS. The mycoplasma test looks for a bacterial contamination and does not measure growth.` },
        { t: `Both tests were run on the ASO-treated cells, to show that the ASOs did not make the cultures sick, change their identity or contaminate them with bacteria.`, ok: false, why: `They were run on the cell lines themselves, to authenticate them and to check the cultures. Toxicity of the ASOs was assessed with normal lung cells and viability assays.` },
        { t: `STR profiling shows that Cas9 is expressed in the cells, and the mycoplasma test shows that the pgRNA library is evenly distributed across them, so the screen can be trusted.`, ok: false, why: `Cas9 expression was followed with BFP, and the evenness of the library was checked by sequencing the plasmid library. Neither test is related to STR profiling or mycoplasma.` },
      ] },
    /* 8 */
    { type: 'mcq', lesson: 'D2', points: 1, source: ['m-titer-p1', 'fig1A'],
      q: `The pgRNA library was delivered at a multiplicity of infection (MOI) of 0.3 and the cells were then kept in puromycin. What is the logic of this design?`,
      options: [
        { t: `An MOI of 0.3 means that 30% of the library sequences were lost, so the coverage had to be raised by 30% to compensate for the loss.`, ok: false, why: `MOI is the average number of virus particles per cell, not a loss of library sequences. Coverage is a different quantity (cells per library sequence).` },
        { t: `At a low MOI most infected cells receive a single virus, so each cell carries one pgRNA pair; puromycin then removes uninfected cells.`, ok: true, why: `Right (the “one guide per cell” logic is background; the numbers are from the Methods). The MOI was measured in a titration: the number of cells surviving in a puromycin well divided by the number in a puromycin-free well after 72 h. The aim was 0.3 to 0.4, and 0.3 was used for all screens.` },
        { t: `A low MOI gives every cell many different pgRNAs, which makes a deletion of the target more likely.`, ok: false, why: `It is the other way round: a low MOI means most cells get at most one virus. Many guides in one cell would make it impossible to tell which one caused a phenotype.` },
        { t: `Puromycin kills the cells in which the TSS was deleted, so only unedited cells remain to be screened.`, ok: false, why: `Puromycin resistance comes from the vector, so puromycin only selects cells that were infected. It says nothing about whether a deletion happened.` },
      ] },
    /* 9 */
    { type: 'mcq', lesson: 'D3', points: 1, source: ['m-library-cloning-p2', 'm-library-cloning-p3', 'm-screens-p1', 'm-screen-prolif-p1', 'm-gdna-p2', 'res-pipeline-p4', 'm-titer-p1'],
      q: `The Methods mention a library coverage of 66.7X at the cloning step and a coverage of more than 1,000x in the screens. Which statement is correct?`,
      options: [
        { t: `66.7X is the sequencing depth per pgRNA reached when the plasmid library was checked, and more than 1,000x is the number of cells that were infected by the virus.`, ok: false, why: `Sequencing depth is given in reads (20M reads for the plasmid library check, 40M reads per screen sample), not as coverage. The 1,000x value is cells per library sequence, not infected cells.` },
        { t: `Both values count cells per library sequence, one measured before puromycin selection and one after it, so that the two show how many cells were lost during selection.`, ok: false, why: `Only the screen coverage counts cells. The 66.7X value counts bacterial colonies at the cloning step.` },
        { t: `66.7X is the percentage of pgRNAs that match perfectly, and more than 1,000x is the infection rate of the virus in the A549 and H460 cells after puromycin selection.`, ok: false, why: `The perfect-match figure is a different number (60.8% perfect match across both spacers), and infection is described by the MOI (0.3), not by coverage.` },
        { t: `66.7X is bacterial colonies divided by the 12,000 library sequences (cloning); more than 1,000x is cells divided by unique library sequences (screen).`, ok: true, why: `Right. At cloning, 66.7X means each sequence was probably represented many times. In the screens, 16M cells at T0 gave more than 1,000x. High coverage keeps every pgRNA in many cells, so a random loss of cells is not mistaken for dropout.` },
      ] },
    /* 10 */
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
    /* 11 */
    { type: 'mcq', lesson: 'G-res-multipheno', points: 1, source: ['res-multipheno-p5', 'res-pipeline-p1'],
      q: `Which result did the authors report about factors that influence how well a pgRNA deletes its target?`,
      options: [
        { t: `pgRNA orientation was the strongest predictor of success, and predicted guide efficiency did not matter.`, ok: false, why: `The Results report no relationship with orientation and the expected correlation with predicted efficiency.` },
        { t: `Predicted efficiency matched the growth phenotype, orientation made no difference, and larger deletions tended weakly to give stronger phenotypes.`, ok: true, why: `Right. The Results report “the expected correlation” with predicted sgRNA efficiency, “no relationship with pgRNA orientation” and “a weak tendency for larger deletions to produce stronger phenotypes”. Note the assumption behind this analysis: the growth phenotype is used as a proxy for deletion efficiency.` },
        { t: `Deletion size was the only factor that mattered, and shorter deletions were clearly less effective than longer ones at producing a growth phenotype in A549 cells.`, ok: false, why: `The tendency was weak, not clear, and predicted efficiency mattered too. The statement that shorter deletions are more efficient compares deleting the TSS with deleting the whole gene, a much bigger difference in size.` },
        { t: `No factor could be examined, because deletion efficiency was never measured or approximated in the screens.`, ok: false, why: `It was not measured directly, but the authors used the growth phenotype as a proxy for deletion efficiency and compared it with predicted efficiency, orientation and deletion size.` },
      ] },
    /* 12 */
    { type: 'figure', img: 'fig2D', lesson: 'E2', points: 4, source: ['fig2D', 'fig2E', 'res-multipheno-p3', 'res-pipeline-p4'],
      q: `Figure 2D compares the read counts of two biological replicates of the A549 dropout screen at the start (T0) and after 3 weeks (T3). (a) What do the numbers in the upper-right tiles show, and how were they calculated? (b) Compare the replicate pairs at T0 and T3 and say what you conclude about reproducibility. (c) Why is a high correlation of raw read counts a fairly easy test, and what stricter test did the authors add?`,
      model: `Each tile gives the Pearson correlation coefficient (R) between two samples, calculated on Z score-transformed log2 read counts, and all are marked as significant (***). The two T0 replicates agree most closely (R=0.959), the two T3 replicates agree well (R=0.869), and T0 against T3 is somewhat lower (0.808 to 0.917), as expected when some pgRNAs have dropped out over the 3 weeks; all values are high, so the biological replicates are reproducible. In my assessment raw counts correlate partly because pgRNAs already differ in abundance in the starting library (the 90th to 10th percentile count ratio was 4.6-fold), so the counts would correlate even if the screen added no signal. The authors therefore also correlated the fold changes (T3/T0) of the lncRNA candidates alone, without positive controls, which is the stricter test (R=0.66 in Figure 2E).`,
      checklist: [
        `Each tile is a Pearson correlation (R) between two samples, calculated on Z score-transformed log2 read counts; all are significant`,
        `The T0 replicates agree most (R=0.959), the T3 replicates also agree well (R=0.869), and T0 versus T3 is lower (0.808 to 0.917) because some pgRNAs dropped out; conclusion: the replicates are reproducible`,
        `Own assessment: raw counts correlate partly because pgRNAs differ in abundance from the start (the starting library has a 4.6-fold 90th to 10th percentile ratio), so this is an easy test`,
        `The stricter test: correlating the fold changes (T3/T0) of the lncRNA candidates alone, without positive controls (R=0.66 in Figure 2E)`,
      ] },
    /* 13 */
    { type: 'mcq', lesson: 'D4', points: 1, source: ['m-gdna-p1', 'm-gdna-p2', 'm-library-design-p5', 'm-screen-prolif-p1'],
      q: `How was the abundance of each pgRNA in a screen sample measured?`,
      options: [
        { t: `RNA was extracted from the harvested cells and the guide RNAs were counted by RNA-seq, with the reads per guide giving its abundance in each sample.`, ok: false, why: `The pgRNAs were read from genomic DNA, which is what the Methods describe (gDNA extraction and PCR). RNA-seq was used elsewhere, to study how ASO knockdown changes the transcriptome.` },
        { t: `The pgRNAs were counted under the microscope by following the fluorescent proteins carried by each cell.`, ok: false, why: `Fluorescent proteins (BFP, mCherry, GFP) mark cells; they cannot tell the 12,000 different pgRNAs apart. Telling them apart needs sequencing.` },
        { t: `Genomic DNA was extracted from the cells, the pgRNA region was amplified by PCR with a barcoded primer per sample, and the products were sequenced.`, ok: true, why: `Right. The Methods describe gDNA isolation, PCR in 100 µL reactions (at most 4 µg of gDNA each, 22 cycles) with a uniquely barcoded primer per sample, and sequencing at about 40M reads per sample. The pgRNAs sit in the cells’ DNA, so a pgRNA’s count follows how many cells carry it.` },
        { t: `Cells were sorted by FACS one pgRNA at a time, and the number of cells in each sorted group was counted.`, ok: false, why: `FACS was used to sort cells by phenotype (for example the 20% brightest and the 20% least bright cells in the CFSE screen), not by which pgRNA they carry. The pgRNA is read afterwards by sequencing.` },
      ] },
    /* 14 */
    { type: 'mcq', lesson: 'D5', points: 1, source: ['m-screen-cisplatin-p1'],
      q: `How did the authors choose the cisplatin concentrations for the screens (IC30, IC80 and IC20)?`,
      options: [
        { t: `They ran a dose-response (viability after 72 h) and measured cell doubling times in A549 and H460 cells, then picked doses with the wanted effect.`, ok: true, why: `Right. The Methods describe a dose-response (3,000 cells per well in 96-well plates, ten concentrations from 0.5 to 50 µM, luminescence after 72 h) and doubling-time experiments (living cells counted every 2 to 3 days for up to 14 days). A mild dose (IC30) slows proliferation by about 30%, while high doses cause arrest or death.` },
        { t: `They took the IC values from earlier publications and used the same doses for every cell line without testing them in their own cells or measuring doubling times.`, ok: false, why: `The Methods describe the authors’ own dose-response and doubling-time experiments in A549 and H460 cells.` },
        { t: `They used a dose high enough to kill every cell in the dish, because only dead cells carry information about which lncRNAs promote cisplatin resistance.`, ok: false, why: `The IC doses reduce viability by a chosen share and do not kill everything. A screen needs living cells to read out pgRNA changes. Only the death screen collects dying cells, and it uses a low dose (IC20).` },
        { t: `They chose the doses after sequencing the screens, so that as many pgRNAs as possible showed a change.`, ok: false, why: `The doses were established before the screens, from the dose-response and doubling-time experiments, not from the sequencing results.` },
      ] },
    /* 15 */
    { type: 'mcq', lesson: 'D4', points: 1, source: ['m-hits-p3'], derived: ['1.2', '0.05', '0.5'],
      q: `Apply the hit rule: FDR below 0.2 and the right sign of the log2 fold change (LFC). Using these hypothetical results, which one would be called a single-screen hit?`,
      options: [
        { t: `Dropout screen: LFC = +1.2, FDR = 0.05.`, ok: false, why: `The FDR passes, but a positive LFC in a dropout screen means the pgRNAs became more common, not depleted, so it is not a hit.` },
        { t: `CFSE screen: LFC = +1.2, FDR = 0.5.`, ok: false, why: `The sign is right for a positive screen, but an FDR of 0.5 is far above the cutoff of 0.2.` },
        { t: `Migration screen: LFC = −1.2, FDR = 0.05.`, ok: false, why: `The FDR passes, but migration is a positive screen, so a hit needs a positive LFC (pgRNAs enriched).` },
        { t: `Dropout screen: LFC = −1.2, FDR = 0.05.`, ok: true, why: `Right. The FDR is below 0.2 and the sign is negative, as required for a dropout screen, in which the pgRNAs of a real hit are depleted.` },
      ] },
    /* 16 */
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
    /* 17 */
    { type: 'mcq', lesson: 'E1', points: 1, source: ['m-hits-p2', 'fig1F'],
      q: `The target-level log2FC was the median of the log2FC values of the target’s pgRNAs (or the average of the top 3 guides). Suppose that for one target three of its ten pgRNAs are strongly depleted and the other seven have no effect. What happens?`,
      options: [
        { t: `Both summaries show a strong effect, because both are built from the guides that are depleted in the screen.`, ok: false, why: `Only the top-3 average does. The median ignores the three strong guides because seven of the ten values are near zero.` },
        { t: `The average of the top 3 guides shows a strong effect, but the median of all ten stays close to zero.`, ok: true, why: `Right. The median is the middle value, and seven of the ten values are near zero, so it ignores the three strong guides. The top-3 average is built from exactly those guides. The median is robust to a few unusual guides but can miss a target that only some guides hit; the top-3 average catches such a target but is easier to inflate by chance (background).` },
        { t: `The median shows a strong effect and the top-3 average stays close to zero, because the median uses the strongest guides.`, ok: false, why: `This is reversed. The top-3 average uses the three strongest guides, whereas the median uses the middle of all ten.` },
        { t: `Neither can be calculated, because a target needs all ten pgRNAs to be depleted for a value to exist at all.`, ok: false, why: `Nothing requires every guide to work. Individual guides often fail (for example pgRNA 1 and 7 in Figure 1F), which is why several guides are summarized.` },
      ] },
    /* 18 */
    { type: 'mcq', lesson: 'E4', points: 1, source: ['m-hits-p4', 'res-integration-p2'], derived: ['16', '20'],
      q: `The pan-hallmark analysis called 80 lncRNAs as hits at FDR &lt; 0.2. What does that threshold mean?`,
      options: [
        { t: `Each hit has only a 20% chance of being real, so most of the 80 hits are expected to be false.`, ok: false, why: `It is the other way round: on average at least 80% of the hits are expected to be real. The 0.2 limits the share of false ones.` },
        { t: `Every hit had an uncorrected p-value below 0.2 in at least one individual screen, before any correction.`, ok: false, why: `FDR values are corrected values (Benjamini-Hochberg), not raw p-values. The correction is needed because many targets were tested together.` },
        { t: `On average up to about one in five of the called hits may be false positives (roughly 16 of the 80; computed here).`, ok: true, why: `Right. The FDR is the expected share of false discoveries among the hits (the 16 is computed here, not stated in the paper). Because many targets are tested at once, the authors used the Benjamini-Hochberg method and accepted a fairly lenient 0.2, which suits a discovery screen whose hits are checked later with ASOs and other assays (background reasoning).` },
        { t: `About 20% of all the targets in the library are false positives, whether or not they were called as hits.`, ok: false, why: `The FDR describes the share of false discoveries among the called hits, not among all targets in the library.` },
      ] },
    /* 19 */
    { type: 'mcq', lesson: 'E1', points: 1, source: ['res-validation-p1'], derived: ['2', '3.5', '0.29'],
      q: `Candidate 205 was a top dropout hit in A549 (log2 fold change = −1.81, FDR = 1.2 × 10<sup>−7</sup>). How should you read these two numbers?`,
      options: [
        { t: `Its pgRNAs became 1.81 times more abundant than in the reference sample, because the sign shows an increase rather than a decrease in abundance.`, ok: false, why: `The minus sign means a decrease (depletion), as expected when cells need the gene for growth. Also, a log2 value of −1.81 is not a factor of 1.81.` },
        { t: `Its pgRNAs fell by 1.81% compared with the reference sample, which is a very small change that is unlikely to matter for the screen.`, ok: false, why: `Log2 fold changes are not percentages. Each whole unit is a doubling or a halving, so −1.81 is a much bigger drop than 1.81%.` },
        { t: `The RNA of candidate 205 fell about 3.5-fold after the deletion, as measured in the screen.`, ok: false, why: `The log2 fold change comes from pgRNA read counts in the screen, which reflect how well cells carrying that pgRNA grew. It is not a measurement of RNA. RNA levels were checked by separate experiments such as qRT-PCR.` },
        { t: `Its pgRNAs became about 3.5-fold less abundant than in the reference (2^1.81 ≈ 3.5), and the tiny FDR makes chance very unlikely.`, ok: true, why: `Right. A log2 fold change is a power of 2: −1.81 means a drop to about 2^−1.81 ≈ 0.29 of the starting level, which is 3.5-fold lower. The FDR is a corrected p-value, so it already allows for testing many targets at once, and 1.2 × 10<sup>−7</sup> is tiny. (The 3.5 and 0.29 are computed here, not stated in the paper.)` },
      ] },
    /* 20 */
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
    /* 21 */
    { type: 'mcq', lesson: 'D7', points: 1, source: ['m-qpcr-p1', 'fig3D', 'fig1F'],
      q: `In the qRT-PCR bar charts the vertical axis reads “Relative expression (Normalised to HPRT1)” and the bar for the control ASO is set to about 1.0. What does a bar at 0.5 for an ASO mean?`,
      options: [
        { t: `The target RNA is about half as abundant as in control-ASO cells, after correcting for loaded material with the housekeeping gene HPRT1.`, ok: true, why: `Right. qRT-PCR copies RNA into DNA and measures how much there is. Dividing by a housekeeping RNA that should not change (the Methods name HPRT1 as the internal control) corrects for differences in cell number and RNA quality. Heads-up: the axis of Figure 1F says “Normalised to GAPDH”, and the paper does not explain the difference.` },
        { t: `Half of the cells died after the ASO treatment, because HPRT1 is only made in living cells and so reports how many cells survived the transfection.`, ok: false, why: `Cell death is measured with other assays (viability, Annexin V). Normalizing to HPRT1 removes differences in loaded material; it does not count dead cells.` },
        { t: `The ASO lowered HPRT1 itself by half, which is the intended effect, and the lncRNA is shown relative to it.`, ok: false, why: `HPRT1 is the reference and is assumed not to change; if the ASO changed it, the normalization would be invalid. The ASO is designed against the lncRNA.` },
        { t: `The ASO is half as potent as the control ASO, so a higher concentration would be needed to reach full knockdown.`, ok: false, why: `The control ASO is non-targeting, so it has no knockdown to compare with. The bar shows how far the target RNA fell relative to that control.` },
      ] },
    /* 22 */
    { type: 'mcq', lesson: 'E3', points: 1, source: ['res-multipheno-p6'], derived: ['5.4'],
      q: `Of the 109 positive controls in the library, 37 scored as hits in the A549 dropout screen and 16 in the H460 dropout screen, and 10 scored in both (p = 0.011, hypergeometric test). What does the p-value say?`,
      options: [
        { t: `1.1% of the 109 positive controls are false positives, so the overlap of 10 shared controls is unreliable as evidence of agreement between the cell lines.`, ok: false, why: `A p-value is not a false-positive rate for the controls. It says how surprising the overlap is if the two lists were unrelated.` },
        { t: `The correlation between the two cell lines’ log2 fold changes is 0.011, a very weak correlation.`, ok: false, why: `Correlation is reported as Pearson’s R (for example in Figure 2H), not with a hypergeometric test. This test compares two lists of hits, not fold changes.` },
        { t: `An overlap of 10 or more controls would be unusual if the two cell lines picked hits independently, so they agree beyond chance.`, ok: true, why: `Right. A hypergeometric test asks how likely an overlap this large is by chance, given the sizes of the three groups. By chance you would expect only about 5.4 shared controls (37 × 16 ÷ 109, computed here), and 10 were seen.` },
        { t: `There is a 98.9% chance that the two cell lines respond identically to the deletion of the controls, because the p-value is small and the overlap is large.`, ok: false, why: `A p-value is not the probability that a hypothesis is true. Also, only 10 controls were shared, so the cell lines clearly do not respond identically.` },
      ] },
    /* 23 */
    { type: 'critique', lesson: 'H2', points: 5, source: ['limitations-p1', 'res-validation-p2', 'res-validation-p4', 'discussion-p6', 'fig3D'],
      q: `A genomic deletion removes DNA, so a phenotype after CRISPR deletion could come from loss of the RNA or from loss of the DNA itself. Explain why this matters for the paper, how the authors used ASOs to deal with it (use candidate 205 as the example), and what remains uncertain even after the ASO result.`,
      model: `Deleting a TSS region can also remove DNA regulatory elements (for example an enhancer) or an overlapping gene on the opposite strand, which the Limitations name as a risk of false positives, so a phenotype after deletion does not prove that the RNA of the lncRNA is responsible. ASOs lower the RNA without cutting any DNA, so a phenotype after ASO treatment points to an RNA-dependent mechanism. Candidate 205 overlaps the TSS of two bidirectional genes, LINC00115 and RP11-206L10.11; two gene-specific ASOs for each showed that LINC00115, but not RP11-206L10.11, drives proliferation through an RNA-dependent mechanism. In my assessment some uncertainty remains: an ASO result shows that the RNA is needed, not what it does, and the paper itself says that the genes act via “an RNA transcript or at least the production thereof”. A failed ASO could also reflect poor knockdown rather than a DNA-dependent mechanism, so comparing ASO and deletion phenotypes for the same target, or testing ASOs at several positions of the transcript, would help to separate the two.`,
      checklist: [
        `Deletion can also remove DNA regulatory elements (for example enhancers) or an overlapping opposite-strand gene (a false-positive risk), so a phenotype is not proof of an RNA effect`,
        `ASOs lower the RNA without cutting DNA, so an ASO phenotype supports an RNA-dependent mechanism`,
        `Candidate 205 overlaps LINC00115 and RP11-206L10.11: two ASOs per gene implicated LINC00115, not RP11-206L10.11`,
        `Remaining uncertainty (own assessment): the ASO result does not show what the RNA does; the paper says “an RNA transcript or at least the production thereof”`,
        `A fitting follow-up (own assessment), for example comparing ASO and deletion phenotypes for the same target, or testing ASOs at several positions, to separate DNA from RNA effects`,
      ] },
    /* 24 */
    { type: 'short', lesson: 'D6', points: 6, source: ['m-aso-p1', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'fig5A', 'fig5E'],
      q: `Explain how the ASO experiments were designed so that a phenotype could be blamed on loss of the target lncRNA and not on the treatment itself or on off-target effects. Include the controls and the role of the normal lung cells.`,
      model: `Several locked nucleic acid ASOs (3 to 5) were designed for each target, and for every selected candidate at least two independent ASOs with ≥40% knockdown were identified. Every experiment included a non-targeting control ASO delivered in the same way, and results are expressed relative to it, so the effect of transfection itself cancels out; MALAT1 (in the summary heat map) and an mTOR ASO (in spheroids) were positive controls whose knockdown is expected to lower viability. Getting the same phenotype with two different ASO sequences argues for on-target activity, because different sequences are unlikely to share the same off-target effects, and knockdown was measured together with the phenotype. The Tier 2 ASOs were also tested in H460 and H441 cells, and in non-transformed lung cells (HBEC3-KT, MRC5-CV1 and CCD-12Lu, as printed) the response was diminished or absent, which suggests low toxicity for normal cells.`,
      checklist: [
        `Several ASOs per target (3 to 5 designed); at least two independent ASOs with ≥40% knockdown were identified for each candidate`,
        `A non-targeting control ASO, with results normalized to it, rules out effects of the transfection itself`,
        `Positive controls whose knockdown should lower viability (MALAT1 in the summary panel; an mTOR ASO in spheroids)`,
        `Two distinct ASO sequences giving the same phenotype indicates on-target activity (different sequences, different off-targets)`,
        `Knockdown efficiency was measured together with the phenotype, so the effect can be tied to loss of the RNA`,
        `Normal (non-transformed) lung cells showed a diminished or absent response, suggesting selectivity and low toxicity; other KRAS+ lines (H460, H441) were tested for generality`,
      ] },
    /* 25 */
    { type: 'mcq', lesson: 'C5', points: 1, source: ['m-pdx-p1', 'res-aso-p7', 'res-aso-p6', 'res-aso-p3'],
      q: `The authors tested CHiLL1 ASOs in organoids called BE874. How were these organoids made and checked?`,
      options: [
        { t: `A549 lung cancer cells were grown as spheres in Matrigel, and these spheres were then called organoids.`, ok: false, why: `Spheroids of H441 cells were a separate 3D model. BE874 comes from a patient tumor, which is why it is called patient-derived.` },
        { t: `A resected KRAS-mutant lung cancer was grown in NSG mice (PDX), its cells made the organoids, and sequencing confirmed the KRAS mutation.`, ok: true, why: `Right. Pieces of the surgically removed tumor were implanted in immunodeficient (NSG) mice as a patient-derived xenograft (PDX), and single cells from the resulting tumor were used for the organoids. KRAS c.34G>T (p.Gly12Cys) was found in both the organoids and the corresponding primary cancer (targeted Sanger sequencing), so the model kept the patient’s driver mutation.` },
        { t: `Healthy lung tissue from the same patient was grown as the normal comparison for the organoid experiments.`, ok: false, why: `The normal comparison cells in the paper were non-transformed lung cell lines (HBEC3-KT, MRC5-CV1 and CCD-12Lu, as printed), not organoids from the same patient.` },
        { t: `The tumor cells were grown directly in culture, and their KRAS status was taken from the clinical file without any testing of the organoids.`, ok: false, why: `The mutation was tested: KRAS was sequenced in both the organoids and the primary cancer.` },
      ] },
    /* 26 */
    { type: 'short', lesson: 'D8', points: 6, source: ['m-viability-2d-p1', 'm-viability-3d-p1', 'm-apoptosis-p1', 'm-cellcycle-p1', 'm-migration-assay-p1', 'res-mechanism-p5', 'res-mechanism-p6'],
      q: `After ASO knockdown the authors measured viability, apoptosis, the cell cycle and migration. For each assay, say what is read out and how, and what it is compared with. Then explain why using several assays makes the conclusions stronger.`,
      model: `Viability: CellTiter-Glo luminescence, which reports the number of viable cells, was read over several days (CellTiter-Glo 3D for spheroids and organoids), and each ASO was compared with a non-targeting control ASO. Apoptosis: cells 24 h after transfection were stained with Annexin V (marks early apoptotic cells) and a viability dye (marks dead cells) and read by flow cytometry, with unstained cells as a staining control. Cell cycle: cells fixed 24 h after transfection were stained with Ki-67 and DAPI (DNA content) for flow cytometry, and the phases were assigned with the Dean-Jett-Fox model. Migration: cells were put in the upper part of a Boyden chamber in serum-free medium with 10% FBS below as the attractant; after 24 h the migrated cells were stained with crystal violet, dissolved, and read as absorbance at 595 nm, relative to the non-targeting ASO. Several assays strengthen the conclusions because fewer viable cells alone cannot tell death from slower growth, and because the RNA-seq enrichment predicted what to test (the apoptosis term led to the Annexin V assay and the G2-M checkpoint term to the cell-cycle assay), so molecular and cellular data can be checked against each other.`,
      checklist: [
        `Viability: CellTiter-Glo (the 3D version for spheroids and organoids) luminescence reports the number of viable cells; compared with a non-targeting ASO`,
        `Apoptosis: Annexin V (early apoptotic) plus a viability dye (dead cells) by flow cytometry 24 h after transfection; unstained cells as the staining control`,
        `Cell cycle: Ki-67 and DAPI flow cytometry, with the phases assigned by the Dean-Jett-Fox model`,
        `Migration: Boyden chamber, serum-free medium above and 10% FBS below, crystal violet absorbance (595 nm) relative to the non-targeting ASO`,
        `Why several assays: fewer viable cells alone cannot distinguish cell death from slower growth, so apoptosis and cell-cycle assays are needed`,
        `Why several assays: the RNA-seq enrichment predicted what to test (apoptosis term, G2-M checkpoint term), so molecular and cellular results can be cross-checked`,
      ] },
    /* 27 */
    { type: 'figure', img: 'fig6G', lesson: 'D8', points: 4, source: ['fig6G', 'm-apoptosis-p1', 'res-mechanism-p5'],
      q: `Figure 6G shows the Annexin V apoptosis assay 24 h after ASO transfection. (a) What do the four colors mean, and what is the reference for comparison? (b) What does the CHiLL1 panel show compared with the GCAWKR panel? (c) The Results call the CHiLL1 effect “significant”. What does the panel itself, and its legend, not tell you?`,
      model: `Annexin V marks cells in early apoptosis and a viability dye marks dead cells, so flow cytometry sorts the cells into alive, early-apoptotic, late-apoptotic and necrotic fractions (the colors of the stacked bars); the non-targeting ASO control bars are the reference, and unstained cells served as the staining control. With both CHiLL1 ASOs the early-apoptotic fraction rises, most strongly in H460 cells, whereas the GCAWKR ASOs change it less. The panel prints n=2 but shows no error bars, P values or test, and the legend names none, so the “significant increase” in the text cannot be checked from the figure. In my assessment two replicates give weak statistical power, and the size of the H460 effect and the agreement of two ASOs in two cell lines are more convincing than a missing P value would be.`,
      checklist: [
        `Colors: alive, early-apoptotic (Annexin V positive), late-apoptotic and necrotic cells, read by flow cytometry 24 h after transfection; the non-targeting ASO control is the reference`,
        `Both CHiLL1 ASOs raise the early-apoptotic fraction in A549 and H460 cells (strongest in H460); the GCAWKR ASOs change it less`,
        `Missing statistics: n=2 is printed, but no error bars, P values or test are shown or named in the legend, although the text says “significant”`,
        `Own assessment: with only two replicates the evidence is weak; the large H460 effect and the agreement of two ASOs in two cell lines carry more weight than a missing P value`,
      ] },
    /* 28 */
    { type: 'figure', img: 'fig6K', lesson: 'D8', points: 1, source: ['fig6K', 'res-mechanism-p6'],
      q: `Figure 6K shows the cell-cycle assay in A549 cells 24 h after ASO transfection. The Results say that GCAWKR knockdown, but not CHiLL1 knockdown, increased the share of cells in G2. What does the panel support?`,
      options: [
        { t: `Both ASOs shift cells into G2: the CHiLL1 ASO1 bar is also higher than the control in G2, though a little less than GCAWKR ASO2.`, ok: false, why: `The CHiLL1 ASO1 bars are labeled “ns” in G1 and in G2, so their difference from the control is not significant. Only GCAWKR ASO2 carries P values.` },
        { t: `GCAWKR knockdown blocks the cells in S phase, because the S-phase bar is the lowest of the three treatments.`, ok: false, why: `The S-phase bar of GCAWKR ASO2 is labeled “ns”, so it cannot be read as a block in S. The significant changes are the fall in G1 and the rise in G2.` },
        { t: `The panel shows that GCAWKR arrests the cell cycle in every KRAS-mutant cell line, because both P values are below 0.05.`, ok: false, why: `The assay was done in A549 cells only, with n=2. Nothing in the panel shows the effect in every KRAS-mutant line, and two replicates are too few for such a claim.` },
        { t: `GCAWKR ASO2 lowers G1 (P=0.036) and raises G2 (P=0.009) compared with the control while CHiLL1 ASO1 is “ns”, but each result comes from two replicates.`, ok: true, why: `Right. The panel labels P=0.036 over the G1 bars and P=0.009 over the G2 bars (control against GCAWKR ASO2) and “ns” for CHiLL1 ASO1, which matches the Results. The legend gives n = 2 biological replicates and a two-tailed Student’s t test, so the evidence rests on very few replicates. Note also that the panel uses CHiLL1 ASO1 but GCAWKR ASO2, so each gene is tested with only one ASO here.` },
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
        { t: `Arrayed ASO libraries would have to be custom-made for each cell model, which is prohibitively expensive, whereas CRISPR libraries are quick to generate.`, ok: true, why: `Right. The Discussion says that bespoke ASO libraries would have to be created for the lncRNAs expressed in every cell or disease model, would be prohibitively expensive and cannot adapt to evolving lncRNA annotations, whereas CRISPR libraries can be generated rapidly. It adds that CRISPR gives improved perturbation and on-target rates compared with shRNA and finds lncRNAs through their cell-level function.` },
        { t: `A pooled CRISPR screen measures the knockdown efficiency of each ASO directly, which an arrayed screen cannot do because it tests the ASOs one by one in each cell model.`, ok: false, why: `Pooled CRISPR screens do not use ASOs. They find targets by deleting DNA; ASOs were designed and tested afterwards, one target at a time.` },
        { t: `Pooled screening removes the need for any follow-up validation, because the pooled readout is already definitive.`, ok: false, why: `The paper itself follows up with ASOs and other assays, and the Limitations section points to likely false positives among the hits.` },
        { t: `Pooled screening gives a direct readout of RNA levels in every cell, which an arrayed ASO screen cannot provide.`, ok: false, why: `The readout of a pooled screen is the abundance of each pgRNA (measured by sequencing), not RNA levels. RNA levels were measured in separate experiments such as qRT-PCR.` },
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
