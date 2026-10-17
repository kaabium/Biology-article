/* Mock Exam 1 — "Results and figures" (33 questions: 17 multiple choice, 7 short answer, 5 figure, 4 critique). */
(window.EXAMS = window.EXAMS || []).push({
  id: 'exam-1',
  title: 'Mock Exam 1: Results and figures',
  minutes: 75,
  intro: `This exam covers the whole paper, with the emphasis on the <b>Results and figures</b>: the story and the key numbers, the three phenotype screens, the validation of hits (Figure 3), the integration and tier ranking (Figure 4), the ASO results (Figure 5) and the mechanism of CHiLL1 versus GCAWKR (Figure 6).<br><b>33 questions, 75 minutes, 97 marks.</b><br><b>Part A</b> (Q1 to Q17) is multiple choice, 1 mark each, marked automatically. <b>Part B</b> (Q18 to Q24, short answers), <b>Part C</b> (Q25 to Q29, figure interpretation) and <b>Part D</b> (Q30 to Q33, critique) are written: write your answer first, then compare it with the model answer and tick each checklist point you covered. Each ticked point is worth 1 mark, so the points shown on a question are its marks. Plan about 1 minute per multiple-choice question and 3 to 4 minutes per written question. Where a model answer gives an opinion it starts "In my assessment". Only the main text, the figures and the STAR Methods are examined; the supplementary items are not in your PDF.`,
  questions: [

    /* ======================= PART A: multiple choice (1 mark each) ======================= */

    { type: 'mcq', lesson: 'A2', points: 1,
      source: ['res-pipeline-p2', 'res-integration-p2', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'res-multipheno-p4', 'summary-p1'],
      q: `The paper narrows its targets in stages. Which list gives the number of lncRNAs left after each stage, from the screening library to the final candidates?`,
      options: [
        { t: `831 → 134 → 9 → 5 → 2`, ok: false, why: `134 is the number of hallmark-specific hits (hits in at least one individual hallmark). The funnel follows the pan-hallmark ranking, which gave 80 hits.` },
        { t: `831 → 77 → 9 → 5 → 2`, ok: false, why: `77 is the number of lncRNAs found necessary for proliferation of A549 cells in the dropout screens, which is one single screen. The combined pan-hallmark analysis gave 80 hits.` },
        { t: `831 → 80 → 9 → 5 → 2`, ok: true, why: `Right. 831 expressed lncRNAs were targeted; the pan-hallmark analysis (FDR < 0.2) gave 80 hits; nine were chosen by hand (Tier 1); five showed reproducible loss of proliferation with two ASOs (Tier 2); two, CHiLL1 and GCAWKR, also showed a diminished response in normal cells (Tier 3).` },
        { t: `831 → 80 → 5 → 9 → 2`, ok: false, why: `The groups shrink at every step: Tier 1 is the largest (nine), then Tier 2 (five), then Tier 3 (two). Five cannot come before nine.` },
      ] },

    { type: 'mcq', lesson: 'A1', points: 1,
      source: ['intro-p5', 'intro-p6', 'res-aso-p2'],
      q: `How many CRISPR screens did the authors run, and what was the design meant to achieve?`,
      options: [
        { t: `8 screens covering three hallmarks (proliferation, chemoresistance, invasion) in two KRAS+ NSCLC models (A549 and H460), to find lncRNAs that are both pleiotropic and background independent`, ok: true, why: `Right. Earlier screens usually used one cell line and one hallmark, so their hits risked being specific to that cell background. Several hallmarks in two cell models were meant to prioritize targets that work across hallmarks and across backgrounds.` },
        { t: `One proliferation screen in A549 only, as in earlier studies, ranking hits by effect size`, ok: false, why: `That is the single-background, single-hallmark design the authors set out to improve on, because its hits may not generalize beyond that cell line.` },
        { t: `8 screens in cell lines from six different cancer types, to compare lncRNA activity between tumor types`, ok: false, why: `Six cancer types belong to an earlier CRISPRi study that the authors cite. Here both models are KRAS+ lung cancer lines, so the question is whether hits generalize within one cancer type.` },
        { t: `8 screens in three KRAS+ lines (A549, H460 and H441), one line per hallmark`, ok: false, why: `H441 was not screened. It was used later, together with H460, to retest the ASOs. The screens used A549 and H460.` },
      ] },

    { type: 'mcq', lesson: 'A3', points: 1,
      source: ['res-aso-p3', 'res-validation-p5'],
      q: `In the figures, lncRNAs are often shown by candidate number. Which pairing of candidate numbers and names is correct?`,
      options: [
        { t: `42 = GCAWKR, 240 = CHiLL1, 215 = AC104024.3, 448 = CECR7`, ok: false, why: `The first two are swapped: candidate 42 is CHiLL1 and candidate 240 is GCAWKR.` },
        { t: `42 = CHiLL1, 240 = GCAWKR, 215 = CECR7, 448 = AC104024.3`, ok: false, why: `The last two are swapped: candidate 215 is AC104024.3 and candidate 448 is CECR7.` },
        { t: `42 = CHiLL1, 240 = GCAWKR, 215 = MIR23AHG, 448 = CECR7`, ok: false, why: `MIR23AHG is candidate 489, not 215.` },
        { t: `42 = CHiLL1, 240 = GCAWKR, 215 = AC104024.3, 448 = CECR7`, ok: true, why: `Right. CHiLL1 and GCAWKR are candidates 42 and 240. AC104024.3, CECR7 and MIR23AHG are the migration-screen hits 215, 448 and 489 that were tested with ASOs.` },
      ] },

    { type: 'mcq', lesson: 'D5', points: 1,
      source: ['fig2C', 'res-multipheno-p7'],
      q: `In the migration screen, cells that crossed a porous membrane and cells that did not were collected separately. For one lncRNA, its pgRNAs are enriched in the cells that did NOT cross. How do the authors read this?`,
      options: [
        { t: `The lncRNA suppresses migration: deleting it held the cells back`, ok: false, why: `Deleting a suppressor would let more cells through, so its pgRNAs would be enriched in the migrating group instead.` },
        { t: `The lncRNA promotes migration: deleting it left the cells unable to migrate`, ok: true, why: `Right. In this positive screen, migration-promoting lncRNAs are identified by pgRNAs enriched in the migration-impaired cells.` },
        { t: `The lncRNA promotes proliferation: slow-growing cells collect its pgRNAs`, ok: false, why: `That is the logic of the CFSE proliferation screen. Here the cells were sorted by migration, not by growth rate.` },
        { t: `The lncRNA is a neutral control, because neutral pgRNAs collect in the non-migrating group`, ok: false, why: `Neutral controls should not affect migration, so their pgRNAs should be spread evenly across both groups.` },
      ] },

    { type: 'mcq', lesson: 'D5', points: 1,
      source: ['fig2B', 'res-multipheno-p7'],
      q: `Which statement correctly describes the two complementary cisplatin screens?`,
      options: [
        { t: `Survival screen: cells get high doses (IC30 and IC80) and the pgRNAs of resistance-promoting lncRNAs are depleted in the survivors. Death screen: cells killed by a low dose (IC20) are collected and the same lncRNAs' pgRNAs are enriched.`, ok: true, why: `Right (Figure 2B legend). The two screens read the same biology from opposite ends: losing a resistance-promoting lncRNA makes cells easier to kill, so its pgRNAs vanish from the survivors and pile up in the dying cells.` },
        { t: `Survival screen: pgRNAs of resistance-promoting lncRNAs are enriched in the survivors. Death screen: they are depleted in the dying cells.`, ok: false, why: `Reversed. Deleting a resistance-promoting lncRNA makes cells less resistant, so its pgRNAs are lost from the survivors and enriched in the dying cells.` },
        { t: `Both screens use the same high dose (IC80) and differ only in when the cells are harvested.`, ok: false, why: `The doses differ: high doses (IC30 and IC80) for the survival screen and a low dose (IC20) for the death screen.` },
        { t: `The death screen uses the high doses (IC30 and IC80) and the survival screen the low dose (IC20).`, ok: false, why: `The doses are swapped. The survival screen uses IC30 and IC80; the death screen uses IC20.` },
      ] },

    { type: 'mcq', lesson: 'G-res-multipheno', points: 1,
      source: ['res-multipheno-p4', 'res-multipheno-p7', 'res-integration-p2'],
      q: `How many lncRNAs did the single-screen analyses identify as necessary for proliferation of A549 cells (dropout screens) and as migration-promoting?`,
      options: [
        { t: `65 for proliferation and 77 for migration`, ok: false, why: `The numbers are swapped: 77 for proliferation and 65 for migration.` },
        { t: `80 for proliferation and 134 for migration`, ok: false, why: `80 and 134 are integrated counts: 80 pan-hallmark hits and 134 hallmark-specific hits, not single-screen results.` },
        { t: `77 for proliferation and 65 for migration`, ok: true, why: `Right. The dropout screens gave 77 lncRNAs necessary for A549 proliferation, and the migration screen gave 65, of which ten were already associated with migration and invasion in other cancers.` },
        { t: `77 for proliferation and 10 for migration`, ok: false, why: `Ten is the number among the 65 migration hits that were already associated with migration and invasion, not the total.` },
      ] },

    { type: 'mcq', lesson: 'G-res-validation', points: 1,
      source: ['res-validation-p1', 'res-validation-p3', 'res-validation-p5', 'res-integration-p2'],
      q: `Which lncRNA start sites did the authors pick for detailed validation of proliferation and cisplatin hits in Figure 3, and on what basis?`,
      options: [
        { t: `Candidates 205 and 509, picked at random from the 80 pan-hallmark hits`, ok: false, why: `The candidates were chosen for their top ranking and their consistency between the two cell lines. What was random was the choice of one high-scoring pgRNA for each candidate.` },
        { t: `Candidates 205 and 509, chosen for their top ranking and consistency between the two cell lines`, ok: true, why: `Right. Candidate 205 was a top hit in the dropout screens and candidate 509 a hit in both proliferation and cisplatin. A randomly selected high-scoring pgRNA was then cloned for each.` },
        { t: `CHiLL1 and GCAWKR, because they were the only hits in all three hallmarks`, ok: false, why: `CHiLL1 and GCAWKR emerged later, as Tier 3 after the ASO tests. In the hallmark-specific analysis no lncRNA was a hit in all three hallmarks.` },
        { t: `Candidates 215, 448 and 489, because they were the top hits of the proliferation screen`, ok: false, why: `Those three are migration-screen hits (AC104024.3, CECR7 and MIR23AHG) that were tested with ASOs.` },
      ] },

    { type: 'mcq', lesson: 'G-res-integration', points: 1,
      source: ['res-integration-p2'],
      q: `Hallmark-specific integration yielded 134 hits in at least one hallmark. What does the paper report about hits shared between hallmarks?`,
      options: [
        { t: `19 are hits in two hallmarks and none is a hit in all three`, ok: true, why: `Right. Hits shared by two hallmarks are few (19 of 134) and none were found in all three. The pan-hallmark analysis, which combines all the screens, found 80 hits.` },
        { t: `19 are hits in all three hallmarks`, ok: false, why: `None were found in three hallmarks; the 19 were found in two.` },
        { t: `Most of the 134 are hits in two or three hallmarks`, ok: false, why: `Only 19 of the 134 are found in two hallmarks and none in three, so most hits are specific to a single hallmark.` },
        { t: `The 19 two-hallmark hits are the 80 pan-hallmark hits`, ok: false, why: `These are different analyses with different numbers. The pan-hallmark ranking integrates all the screens together and gave 80 hits at FDR < 0.2.` },
      ] },

    { type: 'mcq', lesson: 'G-res-integration', points: 1,
      source: ['res-integration-p3', 'fig4E', 'limitations-p2'],
      q: `Figure 4E compares hits in A549 and H460 cells. What do the authors conclude?`,
      options: [
        { t: `Hits from the conventional dropout analysis were mostly shared by both cell lines, but pan-hallmark hits were cell-line specific`, ok: false, why: `Reversed. The dropout hits showed low concordance: the figure counts only 5 hits shared by both lines.` },
        { t: `Both kinds of hit were equally cell-line specific, so adding a second cell line gave no benefit`, ok: false, why: `The pan-hallmark hits were active in both cell types. Combining several screens and two cell lines is what produced relatively background-independent hits.` },
        { t: `Dropout hits tend to be active only in the cell line where they were found, whereas pan-hallmark hits are relatively background independent (active in both)`, ok: true, why: `Right. Only 5 dropout hits were shared by A549 and H460, while the pan-hallmark hits (n = 80) show activity in both. This is the main argument for the integrative, multi-cell-line strategy.` },
        { t: `Pan-hallmark hits are active in A549 only, because the library was built from A549 expression data`, ok: false, why: `The text says pan-hallmark hits are active in both cell types (Figure 4E, right). The A549-based expression cutoff shaped which lncRNAs entered the library, but it does not explain this result.` },
      ] },

    { type: 'mcq', lesson: 'G-res-integration', points: 1,
      source: ['fig4H', 'res-integration-p4'],
      q: `Figure 4H compares pan-hallmark hits with non-hits for copy-number changes in tumors (PCAWG). Which result supports the statement that hits "tend to be amplified, but not depleted"?`,
      options: [
        { t: `Both amplification (P = 0.0011) and deletion (P = 0.14) are significantly enriched among hits`, ok: false, why: `P = 0.14 is not a significant result, so deletion is not enriched among the hits.` },
        { t: `Deletion is enriched (P = 0.0011) and amplification is not (P = 0.14)`, ok: false, why: `The P values are swapped: amplification carries P = 0.0011 and deletion P = 0.14.` },
        { t: `Neither is enriched, because hits and non-hits have the same copy-number profile`, ok: false, why: `Amplification is clearly enriched among the hits (P = 0.0011).` },
        { t: `Amplification is enriched among hits (P = 0.0011) but deletion is not (P = 0.14)`, ok: true, why: `Right. A small P for amplification and a large one for deletion (Fisher's exact test, one-sided) match "amplified, but not depleted".` },
      ] },

    { type: 'mcq', lesson: 'G-discussion', points: 1,
      source: ['discussion-p4', 'res-integration-p2', 'intro-p2', 'res-pipeline-p2'],
      q: `In the Discussion, the authors say their data implicate roughly what share of lncRNAs with cell-level functions, and how does that compare with earlier estimates?`,
      options: [
        { t: `About 8%, comparable to the estimates of Liu and of Zhu`, ok: true, why: `Right. The Discussion says the data implicate approximately 8% of lncRNAs with cell-level functions, comparable to Liu's and Zhu's estimates. It matches the 80 pan-hallmark hits, about 8% of those screened.` },
        { t: `About 13%, the share of hallmark-specific hits, far above earlier estimates`, ok: false, why: `About 13% is the share of hallmark-specific hits (134 hits). The Discussion quotes approximately 8% and calls it comparable to earlier estimates.` },
        { t: `More than 98%, because almost all lncRNAs remain uncharacterized`, ok: false, why: `More than 98% is the share of lncRNAs that remain uncharacterized in general (Introduction), not the share with cell-level functions found here.` },
        { t: `About 0.3%, the share of targets with three lncRNA promoters`, ok: false, why: `0.3% is the share of target regions that contain three lncRNA promoters (Results). It has nothing to do with function.` },
      ] },

    { type: 'mcq', lesson: 'G-res-aso', points: 1,
      source: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3'],
      q: `Nine Tier 1 lncRNAs were tested with ASOs. What did five of them have to show to become Tier 2?`,
      options: [
        { t: `Higher expression in lung tumors than in normal lung`, ok: false, why: `Tier 2 lncRNAs turned out to be overexpressed in NSCLC tumors, but the paper says this was not a selection criterion.` },
        { t: `Reproducible loss of cell proliferation with two distinct ASO sequences`, ok: true, why: `Right. Two different ASOs giving the same effect indicates on-target activity.` },
        { t: `A weaker response in normal lung-derived cells`, ok: false, why: `That test came next and defined Tier 3 (CHiLL1 and GCAWKR), not Tier 2.` },
        { t: `At least 40% knockdown by a single ASO`, ok: false, why: `At least two independent ASOs with ≥ 40% knockdown potency had already been identified for every Tier 1 candidate, so this does not separate Tier 2 from Tier 1.` },
      ] },

    { type: 'mcq', lesson: 'G-res-aso', points: 1,
      source: ['res-aso-p2', 'fig5B'],
      q: `Tier 2 lncRNAs are overexpressed in TCGA lung adenocarcinoma tumors compared with normal tissue (Figure 5B; 513 tumor and 59 normal samples). Why do the authors add "despite this not being a selection criterion"?`,
      options: [
        { t: `Because the TCGA data were collected after the screens were finished`, ok: false, why: `The timing of data collection is not the point. The point is that tumor expression played no part in choosing the lncRNAs.` },
        { t: `Because overexpression in tumors proves that the lncRNAs cause cancer`, ok: false, why: `Overexpression is consistent with an oncogenic role but does not prove it. The evidence for function comes from the knockdown experiments.` },
        { t: `Because it makes the overexpression independent support, not something built into how the lncRNAs were chosen`, ok: true, why: `Right. Tier 2 was defined by the ASO results (loss of proliferation with two ASOs), so finding the lncRNAs overexpressed in tumors is an extra, independent line of evidence rather than a circular one.` },
        { t: `Because Tier 2 lncRNAs were chosen for being absent from normal tissue`, ok: false, why: `Tier 2 was defined by the ASO result, a reproducible loss of proliferation with two distinct ASOs, not by expression in normal tissue.` },
      ] },

    { type: 'mcq', lesson: 'G-res-aso', points: 1, derived: ['26', '104', '11'],
      source: ['fig5H', 'res-aso-p9'],
      q: `In KRAS+ lung tumors from TCGA (n = 101), CHiLL1 is expressed in 67% of tumors and GCAWKR in 37%, and 78% express at least one of the two. Using only these numbers, about what percentage of tumors express both?`,
      options: [
        { t: `About 11% (78 − 67)`, ok: false, why: `78 − 67 gives the tumors that express GCAWKR but not CHiLL1, not those that express both.` },
        { t: `About 104% (67 + 37)`, ok: false, why: `A percentage of tumors cannot exceed 100. Adding 67 and 37 counts the tumors that express both genes twice.` },
        { t: `About 37%, because every GCAWKR-positive tumor also expresses CHiLL1`, ok: false, why: `If that were true, the tumors expressing at least one gene would be the 67% that express CHiLL1, not 78%.` },
        { t: `About 26% (67 + 37 − 78)`, ok: true, why: `Right (my calculation, not a number printed in the paper). 67 + 37 = 104 counts the tumors expressing both twice; subtracting the 78 that express at least one leaves 26. That is why the Tier 3 cocktail reaches 78% of patients rather than 104%.` },
      ] },

    { type: 'mcq', lesson: 'G-res-mechanism', points: 1,
      source: ['res-mechanism-p7', 'res-aso-p8', 'fig5G'],
      q: `A 50:50 cocktail of CHiLL1 and GCAWKR ASOs reduced cell viability more than an equal dose of either ASO alone. Which observation do the authors give to explain this additive effect?`,
      options: [
        { t: `Knocking down CHiLL1 raised GCAWKR levels, but not the other way round`, ok: false, why: `Reversed. It is GCAWKR knockdown that raises CHiLL1.` },
        { t: `Knocking down GCAWKR raised CHiLL1 levels, but knocking down CHiLL1 did not raise GCAWKR`, ok: true, why: `Right. The authors report that GCAWKR knockdown significantly upregulates CHiLL1, but not vice versa, and say that this explains the additive effect of the cocktail.` },
        { t: `The cocktail delivered twice the total amount of ASO`, ok: false, why: `The total amount of ASO was kept constant (25 nM) in the cocktail experiments, so the cocktail did not receive a higher dose.` },
        { t: `The cocktail was also more toxic to non-cancerous cells`, ok: false, why: `The paper reports no additional toxicity for non-cancerous cells: the cocktails raised potency without extra toxicity.` },
      ] },

    { type: 'mcq', lesson: 'D10', points: 1,
      source: ['res-mechanism-p2', 'res-mechanism-p6'],
      q: `RNA-seq gave 8.3 TPM for CHiLL1 in control A549 cells and a mean of 2.5 TPM for GCAWKR. How many molecules per cell does the paper say this corresponds to?`,
      options: [
        { t: `8.3 and 2.5 molecules per cell, because TPM counts molecules per cell`, ok: false, why: `TPM is a relative measure (transcripts per million transcripts), not a count per cell. The paper gives the estimated molecules per cell separately.` },
        { t: `About 83 for CHiLL1 and about 25 for GCAWKR`, ok: false, why: `These values are an order of magnitude too high. The paper gives about 4 and about 1.` },
        { t: `About 1 for CHiLL1 and about 4 for GCAWKR`, ok: false, why: `The values are swapped: CHiLL1 is the more abundant of the two.` },
        { t: `About 4 for CHiLL1 and about 1 for GCAWKR`, ok: true, why: `Right. The paper equates 8.3 TPM with about 4 molecules per cell for CHiLL1 and 2.5 TPM with about 1 copy per cell for GCAWKR. Both are low-abundance RNAs.` },
      ] },

    { type: 'mcq', lesson: 'G-res-mechanism', points: 1,
      source: ['res-mechanism-p5', 'res-mechanism-p6'],
      q: `Which pair of knockdown results distinguishes the two lncRNAs?`,
      options: [
        { t: `CHiLL1 knockdown (not GCAWKR) increased early apoptotic cells; GCAWKR knockdown (not CHiLL1) increased cells in the G2 phase`, ok: true, why: `Right (Figures 6G and 6K). GCAWKR knockdown also impaired migration (Figure 6L). The differences fit the two lncRNAs' distinct modes of action.` },
        { t: `GCAWKR knockdown (not CHiLL1) increased early apoptosis; CHiLL1 knockdown (not GCAWKR) increased cells in G2`, ok: false, why: `Reversed. Apoptosis went with CHiLL1 and G2 with GCAWKR.` },
        { t: `Knockdown of either lncRNA increased both early apoptosis and G2 cells equally`, ok: false, why: `Each effect was specific to one lncRNA. That the two differ is the point of the comparison.` },
        { t: `Both lncRNAs' knockdown increased G2 cells, but only CHiLL1's increased apoptosis`, ok: false, why: `Only GCAWKR knockdown increased cells in G2; CHiLL1 knockdown did not.` },
      ] },

    /* ======================= PART B: short answers (marks = checklist points) ======================= */

    { type: 'short', lesson: 'A1', points: 5,
      source: ['intro-p1', 'intro-p2', 'intro-p5', 'intro-p6', 'res-pipeline-p4', 'res-integration-p1'],
      q: `State the problem the paper addresses and how its study design answers it. Say why earlier CRISPR screens were not enough and what the authors did differently.`,
      model: `Non-small cell lung cancer is the leading cause of cancer deaths and its therapies face undruggable mutations, toxicity and resistance, so new targets are needed. lncRNAs (a population likely to exceed 100,000, of which over 98% are uncharacterized) are a fertile source. Earlier CRISPR screens usually used a single cell line and a single hallmark, so they risked finding lncRNAs whose effect is specific to that cell background and does not generalize. The authors therefore ran 8 pooled CRISPR-deletion screens (a library with 10 pgRNAs per target, 12,000 pgRNAs in all) for three hallmarks (proliferation, chemoresistance, invasion) in two KRAS+ NSCLC models (A549 and H460), and integrated them to prioritize lncRNAs that are pleiotropic and background independent. The best hits were then followed up with ASOs as potential RNA therapeutics.`,
      checklist: [
        `Problem: KRAS+ NSCLC is hard to treat, and lncRNAs (over 100,000, most uncharacterized) are a promising source of new therapeutic targets`,
        `Weakness of earlier screens: one cell line and one hallmark, so hits can be specific to that cell background and fail to generalize`,
        `Aim: lncRNA targets that are pleiotropic (several hallmarks) and background independent (several cell models)`,
        `Design: pooled CRISPR deletion of lncRNA start sites (10 pgRNAs per target, 12,000 in all) in A549 and H460 across proliferation, chemoresistance and invasion (8 screens), integrated into one ranking`,
        `Follow-up: ASOs against the best hits as possible RNA therapeutics`,
      ] },

    { type: 'short', lesson: 'D5', points: 5,
      source: ['fig2A', 'fig2B', 'fig2C', 'res-multipheno-p2', 'res-multipheno-p7'],
      q: `The study screened three cancer hallmarks. For each one, say how the screens separated the cells and which pgRNAs mark a lncRNA as promoting that hallmark. Then say what the extra "positive" screens added.`,
      model: `Proliferation: in the negative (dropout) screen, cells are followed for weeks and the pgRNAs of growth-promoting lncRNAs become depleted; in the positive CFSE screen, the same pgRNAs are enriched in the slow-growing cells. Chemoresistance: in the survival screen, cells receive high cisplatin doses (IC30 and IC80) and the pgRNAs of resistance-promoting lncRNAs are depleted in the survivors; in the death screen, cells killed by a low dose (IC20) are collected and the same pgRNAs are enriched. Migration: cells that cross or fail to cross a porous membrane over 48 h are collected separately, and migration-promoting lncRNAs are identified by pgRNAs enriched in the migration-impaired cells. The positive screens gave a modest but consistent gain in accuracy (AUC 0.7 versus 0.67 for A549 proliferation and 0.77 versus 0.73 for A549 cisplatin), so they were kept.`,
      checklist: [
        `Proliferation, dropout screen: pgRNAs of growth-promoting lncRNAs are depleted over time`,
        `Proliferation, CFSE positive screen: those pgRNAs are enriched in slow-growing cells`,
        `Cisplatin: survival screen (high doses IC30 and IC80, pgRNAs depleted in survivors) and death screen (low dose IC20, pgRNAs enriched in the dying cells)`,
        `Migration: cells separated by passage through a porous membrane; pgRNAs enriched in the migration-impaired cells mark migration-promoting lncRNAs`,
        `Positive screens add a modest but consistent accuracy gain (for example AUC 0.7 vs 0.67, and 0.77 vs 0.73)`,
      ] },

    { type: 'short', lesson: 'G-res-integration', points: 4,
      source: ['res-integration-p4', 'res-integration-p1', 'fig4A', 'fig4F', 'fig4G', 'fig4H'],
      q: `Besides the screens themselves, what evidence from patient and tumor data supports the view that the pan-hallmark hits are cancer-promoting? Describe three observations and say why each is expected if the lncRNAs are oncogenic.`,
      model: `Cancer-promoting lncRNAs are expected to be more active in tumors, and the ranking was built only from screen data, so tumor data give independent support. First, pan-hallmark hits are expressed at significantly higher levels than non-hits in KRAS+ lung tumors from TCGA (n = 101; P < 2.2e-16). Second, they are upregulated in tumors compared with normal tissue in an independent cohort (87 tumor and 77 normal samples). Third, in tumor DNA from the PCAWG cohort the hits tend to be amplified (P = 0.0011, one-sided Fisher's exact test) but are not enriched for deletions (P = 0.14): extra gene copies fit an oncogene-like role, whereas losses would not.`,
      checklist: [
        `Hits are expressed higher than non-hits in KRAS+ lung tumors (TCGA, n = 101; P < 2.2e-16)`,
        `Hits are upregulated in tumors compared with normal tissue in an independent cohort (87 tumor vs 77 normal samples)`,
        `Hits tend to be amplified (P = 0.0011) but not depleted (deletion P = 0.14) in tumor DNA (PCAWG)`,
        `Logic: cancer-promoting lncRNAs should be up and amplified in tumors, and these data are independent of the screens used to rank them`,
      ] },

    { type: 'short', lesson: 'A2', points: 5,
      source: ['res-pipeline-p2', 'res-integration-p2', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'summary-p1'],
      q: `Describe the stages that took the study from the screening library to its two final candidates. For each stage give the number of lncRNAs and the rule that decided who went forward.`,
      model: `The library targeted 831 expressed lncRNAs (998 transcription start sites). Integrating all the screens in the pan-hallmark ranking, with an FDR cutoff of 0.2, gave 80 hits (about 8% of those screened), of which 73 were not previously linked to NSCLC. Nine of the top-ranked hits were then chosen by hand for novelty and lack of protein-coding evidence (Tier 1); for each, at least two independent ASOs with at least 40% knockdown were found. Five of them (Tier 2) showed a reproducible loss of proliferation with two distinct ASO sequences, also in H460 and H441. Two of those, CHiLL1 and GCAWKR (Tier 3), were taken forward because normal lung-derived cells showed a diminished or absent response, particularly for these two.`,
      checklist: [
        `831 lncRNAs (998 start sites) were targeted in the library`,
        `80 pan-hallmark hits at FDR < 0.2 (about 8% of those screened; 73 not previously linked to NSCLC)`,
        `9 Tier 1 lncRNAs chosen manually for novelty and lack of protein-coding evidence (at least two ASOs with ≥ 40% knockdown)`,
        `5 Tier 2 lncRNAs with reproducible loss of proliferation with two distinct ASOs (also in H460 and H441)`,
        `2 Tier 3 lncRNAs, CHiLL1 and GCAWKR, selected because normal lung-derived cells responded little or not at all`,
      ] },

    { type: 'short', lesson: 'G-res-aso', points: 5,
      source: ['res-aso-p3', 'res-aso-p4', 'res-aso-p5', 'fig5D'],
      q: `Give the key facts that distinguish CHiLL1 and GCAWKR as genes: chromosome and structure, relationship to neighboring genes or to the genome, and links to patient data.`,
      model: `CHiLL1 (candidate 42) lies on chromosome 8 and has two annotated isoforms that share the first exon. It sits upstream of, and on the same strand as, the protein-coding gene TNFRSF10B, but ESTs and RT-PCR give no evidence of readthrough between the two. To the authors' knowledge it had never been implicated in cancer before, and high expression correlates with poor overall survival. GCAWKR (candidate 240) lies on chromosome 15 and has four isoforms that share a common TSS. Unlike CHiLL1, its locus is frequently amplified in cancer genomes, and it is upregulated in the proximal inflammatory (PI) tumor subtype, which has a poorer prognosis (PI versus PP: p = 4 × 10−5; PI versus TRU: p = 0.008). Both have low protein-coding potential.`,
      checklist: [
        `CHiLL1 (candidate 42): chromosome 8, two annotated isoforms sharing the first exon`,
        `CHiLL1 lies upstream of and on the same strand as the protein-coding gene TNFRSF10B, with no evidence of readthrough (ESTs, RT-PCR)`,
        `CHiLL1: never previously implicated in cancer (to the authors' knowledge); high expression correlates with poor overall survival`,
        `GCAWKR (candidate 240): chromosome 15, four isoforms sharing a common TSS; locus frequently amplified in cancer genomes (unlike CHiLL1)`,
        `GCAWKR is upregulated in the proximal inflammatory (PI) tumor subtype, linked to poorer prognosis (PI vs PP: p = 4 × 10−5; PI vs TRU: p = 0.008)`,
      ] },

    { type: 'short', lesson: 'G-res-aso', points: 5,
      source: ['res-aso-p3', 'res-aso-p6', 'res-aso-p7', 'res-aso-p8', 'res-aso-p9', 'res-aso-p10'],
      q: `Besides growth assays in cell lines grown flat, what evidence does the paper give that CHiLL1 and GCAWKR ASOs could become useful medicines? Cover 3D models, ASO cocktails and the share of patients who might benefit.`,
      model: `In H441 spheroids the CHiLL1 and GCAWKR ASOs reduced viability to a level approaching that of the mTOR positive control, and in BE874 organoids, derived from a KRAS+ patient-derived xenograft, the CHiLL1 ASO significantly reduced viability. A 50:50 Tier 3 cocktail of the two ASOs reduced viability more than an equal dose of either ASO alone, a five-ASO Tier 2 cocktail gave a similar benefit, and cocktails caused no additional toxicity in non-cancerous cells. In TCGA RNA-seq data, 78% of tumors express at least one of CHiLL1 and GCAWKR and could be treated with the Tier 3 cocktail, rising to 92% for Tier 2. The ASOs were also active in additional KRAS+ and EGFR-mutant cell lines, which suggests that their activity does not depend on the tumor subtype.`,
      checklist: [
        `H441 spheroids: CHiLL1 and GCAWKR ASOs reduced viability, approaching the mTOR positive control`,
        `BE874 organoids from a KRAS+ patient-derived xenograft: CHiLL1 ASO significantly reduced viability`,
        `Cocktails: the 50:50 Tier 3 cocktail beat an equal dose of either ASO alone; the five-ASO Tier 2 cocktail gave a similar benefit; no additional toxicity for non-cancerous cells`,
        `Patient reach: 78% of TCGA tumors express at least one of CHiLL1 and GCAWKR; 92% for Tier 2`,
        `Breadth: activity in additional KRAS+ and EGFR-mutant cell lines (subtype independent) with a diminished response in non-transformed cells`,
      ] },

    { type: 'short', lesson: 'G-res-mechanism', points: 6,
      source: ['res-mechanism-p1', 'res-mechanism-p2', 'res-mechanism-p3', 'res-mechanism-p4', 'res-mechanism-p5', 'res-mechanism-p6', 'res-mechanism-p7', 'res-mechanism-p8', 'discussion-p6'],
      q: `Contrast CHiLL1 and GCAWKR: where each RNA is found, how abundant it is, what happens to the cells when it is knocked down, and which pathways its target genes point to.`,
      model: `FISH and cell fractionation show that CHiLL1 is mainly cytoplasmic and GCAWKR mainly nuclear. CHiLL1 is at 8.3 TPM (about 4 molecules per cell) and GCAWKR at 2.5 TPM (about 1 copy per cell). CHiLL1 knockdown, but not GCAWKR knockdown, increases early apoptotic cells, whereas GCAWKR knockdown, but not CHiLL1 knockdown, increases cells in G2 and impairs migration. Enrichment analysis of CHiLL1-regulated genes points to KEGG terms such as non-small cell lung cancer, MAPK, PI3K-Akt and apoptosis (and p53 and mTORC1 signaling in MSigDB), while GCAWKR has partly overlapping terms (p53 pathway, cholesterol homeostasis, epithelial to mesenchymal transition) plus the GCAWKR-specific G2-M checkpoint. The two lncRNAs have non-overlapping downstream gene networks that nevertheless converge on shared oncogenic pathways, and GCAWKR knockdown raises CHiLL1 but not the reverse.`,
      checklist: [
        `Location: CHiLL1 mainly cytoplasmic, GCAWKR nuclear (FISH, confirmed by cell fractionation)`,
        `Abundance: CHiLL1 8.3 TPM (about 4 molecules per cell); GCAWKR 2.5 TPM (about 1 copy per cell)`,
        `Phenotypes: CHiLL1 knockdown (not GCAWKR) raises early apoptosis; GCAWKR knockdown (not CHiLL1) raises G2 cells and impairs migration`,
        `CHiLL1 pathways: KEGG non-small cell lung cancer, MAPK, PI3K-Akt and apoptosis; MSigDB p53 and mTORC1`,
        `GCAWKR pathways: partly overlapping (p53, cholesterol homeostasis, EMT) plus the GCAWKR-specific G2-M checkpoint; target-gene networks non-overlapping overall`,
        `GCAWKR knockdown upregulates CHiLL1 but not vice versa, which the authors say explains the additive effect of the cocktail`,
      ] },

    /* ======================= PART C: figure interpretation (marks = checklist points) ======================= */

    { type: 'figure', img: 'fig3F', lesson: 'G-res-validation', points: 5,
      source: ['fig3F', 'fig3E', 'res-validation-p5'],
      q: `Figure 3F tests ASOs against three migration-screen hits (candidates 215, 448 and 489) in A549 cells. Explain (a) what the two bar charts measure and what the reference bar is, (b) which ASO results are significant and which one is not, (c) what the qRT-PCR bars add, and (d) what you can conclude and what you cannot.`,
      model: `The left chart (qRT-PCR, n = 2) shows how far each ASO lowered its target RNA at 24 h, relative to HPRT1, with the non-targeting "ASO control" as the reference bar (about 1.0). The right chart shows the fraction of migrated cells (crystal violet staining relative to the control, n = 3) for two ASOs against each of candidates 215, 448 and 489. Five of the six ASOs lowered migration significantly (P = 0.029, 0.005, 0.006, 0.006 and 0.031), but ASO2 against candidate 489 (MIR23AHG) did not (P = 0.144). The qRT-PCR bars show that each ASO lowered its target RNA, which ties the effect to loss of the RNA. So, with most ASOs, knocking down these lncRNAs lowers the migration of A549 cells, in line with the screen. In my assessment one cannot conclude that migration itself is impaired, because the assay does not show whether the ASOs simply reduce cell growth or viability (fewer cells would then reach the membrane); a parallel viability measurement or a second cell line would address this. The text's "dramatic impairment" is also stronger than the P = 0.144 for that one ASO.`,
      checklist: [
        `Left chart: qRT-PCR of the target RNA at 24 h relative to HPRT1 (n = 2); right chart: crystal violet signal of migrated cells relative to control (n = 3); reference = non-targeting ASO control`,
        `Two ASOs for each of candidates 215, 448 and 489, so the effect is not tied to one sequence`,
        `Five ASOs significant (P = 0.029, 0.005, 0.006, 0.006, 0.031)`,
        `Exception: ASO2 for candidate 489 (MIR23AHG) is not significant (P = 0.144), so "dramatic impairment" overstates it`,
        `Cannot conclude (own assessment): that migration itself is impaired, since fewer cells could reflect lower growth or viability; measure viability in parallel or add a second cell line`,
      ] },

    { type: 'figure', img: 'fig4D', lesson: 'G-res-integration', points: 5, derived: ['42', '9', '153'],
      source: ['fig4D', 'res-integration-p2'],
      q: `Figure 4D shows stacked bars of the hits from the pan-hallmark integration (Pan) and from the integration within each hallmark (Pro, Cis, Mig), next to the composition of the library. Explain (a) what the four colors mean and what the Pan bar contains, (b) what the control counts say about the quality of the ranking, and (c) how the numbers 50, 38 and 65 of the hallmark bars fit the 134 hallmark-specific hits in the text.`,
      model: `Red segments are positive controls, grey neutral controls, light green previously published lung cancer lncRNAs and blue novel cancer lncRNAs; the printed numbers are counts and the bars are scaled to 100% of the hits. The Pan bar holds 46 positive controls, 3 neutral controls, 7 known lung cancer lncRNAs and 73 novel lncRNAs; "cand hits: 80" counts only the lncRNA candidates (7 + 73), and 73 of them had not been linked to NSCLC before. For comparison the library bar holds 109 positive controls, 35 neutral controls, 90 known and 913 novel lncRNAs (1003 candidates). The controls work as a quality check: 46 of the 109 positive controls (about 42%, my calculation) were called as hits but only 3 of the 35 neutral controls (about 9%), so the ranking favors true growth genes and mostly rejects neutral targets. The hallmark bars list 50 (Pro), 38 (Cis) and 65 (Mig) lncRNA hits, which add up to 153. The text reports 134 different lncRNAs that are hits in at least one hallmark, 19 of them in two hallmarks and none in three; those 19 are counted twice in the bars, so 153 − 19 = 134 (my calculation), which matches.`,
      checklist: [
        `Colors: red = positive controls, grey = neutral controls, light green = known lung cancer lncRNAs, blue = novel cancer lncRNAs; counts are printed in the segments`,
        `Pan bar: 46 positive controls, 3 neutral controls, 7 known and 73 novel lncRNAs; "cand hits: 80" counts the 7 + 73 lncRNAs (73 not previously linked to NSCLC)`,
        `Library bar for comparison: 109 positive controls, 35 neutral controls, 90 known and 913 novel lncRNAs (1003 candidates)`,
        `Quality check (own calculation): 46 of 109 positive controls (about 42%) but only 3 of 35 neutral controls (about 9%) were called as hits`,
        `Reconciliation: 50 + 38 + 65 = 153 hallmark hits; the 19 hits shared by two hallmarks are counted twice, so 153 − 19 = 134 different lncRNAs, none in all three`,
      ] },

    { type: 'figure', img: 'fig4C', lesson: 'F2', points: 5,
      source: ['fig4C', 'res-integration-p2', 'fig2A', 'fig2B', 'fig2C'],
      q: `Figure 4C is a ternary plot of the significant pan-hallmark hits. (In Figure 2 the hallmarks are marked by icons: an infinity loop for proliferation, a circle with a bar for cisplatin, a crown for migration.) Explain (a) what the corners, a dot's position, color and size, and the petal plots represent, (b) what the petal plots of candidate 507 (LINC00910) and candidate 215 (AC104024.3) tell you, and (c) what the plot adds to the list of 80 hits.`,
      model: `The plot shows all hits at FDR < 0.2 in the pan-hallmark analysis. Each corner is one hallmark (cisplatin at the top, proliferation at the bottom left, migration at the bottom right), and the closer a dot sits to a corner, the more its TPP significance comes from that hallmark. Dot color says in which individual hallmark screens the lncRNA is also a hit (for example Pan+Cis), dot size shows the FDR (larger dots have a smaller FDR), and a red ring marks a positive-control gene. Petal plots show the hallmark contributions for selected lncRNAs. Candidate 507 (LINC00910) has one long teal petal, so its signal is mostly in the cisplatin dimension, whereas candidate 215 (AC104024.3) has yellow and pink petals but no teal one, so its signal comes from proliferation and migration. The plot therefore gives each lncRNA a signature in three functional dimensions, in the context of the overall confidence of the pan-hallmark ranking.`,
      checklist: [
        `Shows the significant hits (FDR < 0.2) of the pan-hallmark analysis; the three corners are the three hallmarks (proliferation, cisplatin, migration)`,
        `Position: closer to a corner means more of the significance comes from that hallmark (TPP significance)`,
        `Color = which individual screens also call it a hit (for example Pan+Cis); size = FDR (bigger = smaller FDR); red ring = positive control`,
        `Petal plots show each hallmark's contribution: 507 (LINC00910) has one long cisplatin (teal) petal; 215 (AC104024.3) has proliferation (yellow) and migration (pink) petals and no teal petal`,
        `Added value: a hallmark-specific signature in three dimensions within the overall confidence of the pan-hallmark ranking`,
      ] },

    { type: 'figure', img: 'fig5A', lesson: 'G-res-aso', points: 5,
      source: ['fig5A', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3'],
      q: `Figure 5A summarizes all the ASO tests. Explain (a) how to read the heat map (rows, columns, colors), (b) what the three Tier lines mean, and (c) which pattern in the cancer cells and in the normal cells led the authors to focus on Tier 3.`,
      model: `Each row is a lncRNA and each column an ASO (ASO1, ASO2 or the non-targeting ASO control) in one cell line, with yellow columns for proliferation without drug and teal columns for cisplatin. The color is the mean log2 fold change in viability relative to the non-targeting control ASO: blue means lost viability, white means no change. The vertical lines show the nested tiers: Tier 1 is the nine selected lncRNAs (CHiLL1 to 316), Tier 2 the five with reproducible loss of proliferation with two ASOs (CHiLL1 to 205), and Tier 3 only CHiLL1 and GCAWKR. In the cancer lines (A549, H460, H441) their ASOs give blue cells (reduced viability), but in the non-transformed lung-derived cells (CCD-16Lu, MRC5-CV1, HBEC3-KT) the cells are pale, a diminished or absent response, particularly for these first two lncRNAs. This cancer-selective pattern is why they were chosen. MALAT1 serves as the positive control.`,
      checklist: [
        `Reading: rows = lncRNAs, columns = ASO1, ASO2 and control ASO in each cell line; color = mean log2FC in viability vs the non-targeting control (blue = less viable); yellow = proliferation, teal = + cisplatin`,
        `Each lncRNA was tested with two independent ASOs; MALAT1 is the positive control`,
        `Tiers: 1 = the nine selected lncRNAs; 2 = the five with reproducible loss of proliferation with two ASOs; 3 = CHiLL1 and GCAWKR`,
        `Cancer lines (A549, H460, H441): blue cells (reduced viability) for the CHiLL1 and GCAWKR ASOs`,
        `Normal lung-derived cells (CCD-16Lu, MRC5-CV1, HBEC3-KT): diminished or absent response, especially for CHiLL1 and GCAWKR, hence Tier 3 (cancer-selective)`,
      ] },

    { type: 'figure', img: 'fig6F', lesson: 'D10', points: 5,
      source: ['fig6F', 'res-mechanism-p3'],
      q: `Figure 6F shows KEGG pathway enrichment for the genes changed by CHiLL1 knockdown in A549 and H460 cells. Explain (a) what each dot is and what the two axes show, (b) what the green labels mean and name four of them, (c) what "DEGs, A549 = 2006" and "DEGs, H450 = 3015" refer to, and (d) what the authors conclude and what the plot cannot prove.`,
      model: `Each dot is one KEGG pathway. Its position shows how significant the enrichment of the CHiLL1-regulated genes is in A549 cells (x axis) and in H460 cells (y axis); both axes are labelled "Adjusted P-value" and the legend does not explain the scale, so I read dots farther from the origin as more significant. The green dots are cancer-relevant pathways that are significant in both cell lines, for example non-small cell lung cancer, MAPK signaling, PI3K-Akt signaling, p53 signaling, apoptosis, pathways in cancer, small cell lung cancer, proteoglycans in cancer and VEGF signaling. The numbers are the differentially expressed genes (DEGs) used for each cell line, 2006 in A549 and 3015 in H460 (the label prints "H450"), taken from the genes significantly affected in common by ASO1 and ASO2. The pathway results of the two cell lines correlate (R = 0.48, P < 2.2e-16). The authors conclude that the changes underline disease relevance (non-small cell lung cancer), point to possible mechanistic pathways (MAPK, PI3K-Akt) and, because the two backgrounds agree, support the generality of the CHiLL1 effects across KRAS+ NSCLC cells. In my assessment enrichment shows association only; it does not prove that CHiLL1 acts directly on these pathways.`,
      checklist: [
        `Each dot = one KEGG pathway; x = adjusted P-value (enrichment) in A549, y = in H460 (the legend does not explain the scale)`,
        `Green dots = cancer-relevant pathways significant in both cell lines (for example non-small cell lung cancer, MAPK, PI3K-Akt, p53, apoptosis)`,
        `DEGs: 2006 genes (A549) and 3015 genes (H460, printed "H450"), the genes affected in common by ASO1 and ASO2 in each cell line`,
        `R = 0.48 (P < 2.2e-16): pathway significance agrees between the cell lines, supporting generality across KRAS+ NSCLC cells`,
        `Conclusion and limit: disease relevance and candidate pathways; enrichment is association, not proof of direct action (own assessment)`,
      ] },

    /* ======================= PART D: explain or critique (marks = checklist points) ======================= */

    { type: 'critique', lesson: 'G-res-integration', points: 5,
      source: ['res-integration-p3', 'fig4E', 'fig4B', 'res-multipheno-p6', 'res-aso-p2'],
      q: `The authors argue that hits from conventional dropout screens are cell-line specific (Figure 4E), which motivates combining screens and cell lines. Use the AUC values in Figure 4B and the control counts in the Results to argue that the low overlap between A549 and H460 dropout hits could also have a technical cause, and say what experiment would separate the two explanations.`,
      model: `The paper's reading is biological: only 5 dropout hits are shared by A549 and H460, so lncRNAs "tend to only display activity in the cell type where they were discovered". An alternative is that the H460 dropout screen is simply less sensitive. In Figure 4B the A549 dropout screen has an AUC of 0.73 but the H460 dropout screen only 0.54, barely better than chance at recovering positive controls and rejecting neutral ones, and of the 109 positive controls in the library only 16 scored in the H460 dropout screen against 37 in A549 (10 in both). In my assessment a less sensitive H460 screen would find fewer true hits and so lower the overlap even if many lncRNAs were active in both lines. To separate the explanations one could repeat the H460 screen with more replicates or coverage until its AUC matches that of A549, or test A549-only and H460-only hits directly in both cell lines with ASOs or individual pgRNAs. The paper offers some support: the pan-hallmark hits are active in both cell types and the Tier 2 ASOs gave similar results in H460 and H441, but it does not test the A549-only and H460-only dropout hits in both lines.`,
      checklist: [
        `The paper's reading: only 5 dropout hits are shared between A549 and H460, so hits are cell-line specific (Figure 4E)`,
        `Evidence for a technical difference: H460 dropout AUC 0.54 (near chance) against 0.73 for A549, and only 16 of 109 positive controls scored in H460 against 37 in A549 (10 in both)`,
        `Own assessment: a less sensitive H460 screen finds fewer true hits and lowers the overlap even if many lncRNAs are active in both lines`,
        `Experiment (own assessment): improve or repeat the H460 screen (more replicates, coverage) until its AUC matches A549, or test A549-only and H460-only hits in both lines with ASOs or single pgRNAs`,
        `What the paper offers: pan-hallmark hits are active in both cell types and Tier 2 ASOs gave similar results in H460 and H441, but the A549-only and H460-only dropout hits were not tested in both lines`,
      ] },

    { type: 'critique', img: 'fig5F', lesson: 'C5', points: 5,
      source: ['fig5F', 'fig5E', 'res-aso-p6', 'res-aso-p7', 'discussion-p5'],
      q: `The Results say that CHiLL1 ASOs "resulted in a significant reduction in cell viability" of BE874 organoids (Figure 5F), and the Discussion says that the ASOs were effective in monolayer and 3D KRAS+ NSCLC backgrounds. Look at Figure 5F and at what the paper tested in 3D. How strongly do the data support this, and what would strengthen it?`,
      model: `Support: in Figure 5F the CHiLL1 ASO lowered the luminescence (viability) of BE874 organoids compared with the ASO control in all four independent replicates, significantly in three of them (P = 0.008, P < 1.0e-04 and P = 0.026), on a log scale with n = 4. Limits: replicate 1 is "ns", so the effect is not seen every time; the replicates were read after 6 or 9 days; the tests are one-tailed; the error bars show variability between technical replicates; and the organoids come from a single KRAS+ patient-derived xenograft. Only the CHiLL1 ASO was tested in organoids, while GCAWKR was tested only in H441 spheroids (P = 0.028). In my assessment "effective in 3D" is encouraging but narrow: one organoid model for CHiLL1 and one spheroid model for both lncRNAs, with no normal-organoid comparison and no in vivo test. It would be stronger with GCAWKR ASOs and the cocktail in organoids, organoids from several patients and from normal lung (to test selectivity), and in vivo studies of efficacy and toxicity.`,
      checklist: [
        `Support: the CHiLL1 ASO lowered the viability of BE874 organoids relative to the ASO control; 3 of 4 independent replicates significant (P = 0.008, P < 1.0e-04, P = 0.026)`,
        `Caveats in the figure: replicate 1 is ns; readings at 6 or 9 days; one-tailed tests; error bars show technical variability`,
        `Scope: organoids from a single KRAS+ patient-derived xenograft; only the CHiLL1 ASO tested in organoids (GCAWKR only in H441 spheroids, P = 0.028)`,
        `Own assessment: "effective in 3D" is encouraging but narrow; no normal-organoid comparison and no in vivo test`,
        `Strengthening: GCAWKR ASO and the cocktail in organoids, organoids from several patients and from normal lung, then in vivo efficacy and toxicity`,
      ] },

    { type: 'critique', lesson: 'H4', points: 5,
      source: ['discussion-p5', 'res-aso-p3', 'res-aso-p8', 'm-aso-p1'],
      q: `The Discussion says that the ASO effects "were diminished in non-transformed cells, pointing to reduced non-specific toxicity in vivo". Evaluate how strongly the data support this. Use what the Results and Methods say about the normal cells and the ASO doses, give one alternative explanation, and say what would make the claim stronger.`,
      model: `What the paper shows: the CHiLL1 and GCAWKR ASOs reduced viability in cancer lines but gave a diminished or absent response in three non-transformed lung-derived lines (HBEC3-KT and MRC5-CV1, both immortalized, and a primary line printed as CCD-12Lu in the text and CCD-16Lu elsewhere), and cocktails caused no additional toxicity for non-cancerous cells. In my assessment this is encouraging but limited. Only three lung-derived lines were tested, two of them immortalized, all in culture, and the Discussion itself says that delivery in vivo still has to be addressed. The Methods also list 10 nM ASO for HBEC3-KT and CCD-16LU but 25 nM for the cancer lines and MRC5-CV1, so the comparison is not dose-matched for two of the normal lines. A weaker response could also reflect lower ASO uptake or knockdown, or slower growth of the normal cells, rather than true tolerance. The claim would be stronger with dose-matched comparisons that include measured knockdown in each normal line, more types of normal cell, and toxicity studies in animals.`,
      checklist: [
        `Evidence the paper gives: diminished or absent response in three non-transformed lung-derived lines (HBEC3-KT, MRC5-CV1, CCD-16Lu) and no additional toxicity of cocktails in non-cancerous cells`,
        `Limits: only three lung-derived lines (two immortalized), tested in culture; delivery and toxicity in vivo not yet addressed`,
        `Confound (own assessment): the Methods list 10 nM for HBEC3-KT and CCD-16LU but 25 nM for the cancer lines and MRC5-CV1, so the comparison is not dose-matched`,
        `Alternative explanation (own assessment): lower uptake or knockdown, or slower growth, in normal cells rather than true tolerance`,
        `Strengthening: dose-matched tests with measured knockdown, more normal cell types, and in vivo toxicity studies`,
      ] },

    { type: 'critique', lesson: 'G-res-mechanism', points: 5,
      source: ['res-mechanism-p1', 'res-mechanism-p5', 'res-mechanism-p6', 'res-mechanism-p7', 'res-mechanism-p8', 'discussion-p6'],
      q: `The Results say that CHiLL1 and GCAWKR act through "non-overlapping" downstream gene networks, yet Figure 6 is titled "distinct but overlapping oncogenic pathways" and both lncRNAs show p53-pathway enrichment. (a) Explain how both statements can be true. (b) Give the evidence that the two lncRNAs work differently. (c) What would you want to see to support "non-overlapping" more strongly?`,
      model: `A pathway is a list of many genes, so two lncRNAs can change different genes that belong to the same pathways. Enrichment analysis asks which pathways are over-represented among the changed genes. For CHiLL1 and GCAWKR some terms are shared (p53 pathway, cholesterol homeostasis, epithelial to mesenchymal transition) while the gene networks themselves are described as non-overlapping, and the Discussion says that hundreds of target genes converge on shared oncogenic pathways. Evidence that the two work differently: CHiLL1 is mainly cytoplasmic and GCAWKR nuclear; CHiLL1 knockdown, but not GCAWKR knockdown, raises early apoptosis, whereas GCAWKR knockdown, but not CHiLL1 knockdown, raises cells in G2 and impairs migration; the G2-M checkpoint is a GCAWKR-specific term; and GCAWKR knockdown raises CHiLL1 but not the reverse. In my assessment the main text gives no number for the overlap between the two gene lists, so "non-overlapping" would be better supported by the count of shared genes and a test of whether it is lower than expected by chance. The GCAWKR analysis also rests on a single ASO, so a second ASO would show that its gene list is on-target.`,
      checklist: [
        `Reconciliation: a pathway contains many genes, so different target genes of the two lncRNAs can fall in the same pathways (hundreds of genes converge on shared oncogenic pathways)`,
        `Shared terms: p53 pathway, cholesterol homeostasis, epithelial to mesenchymal transition; the gene networks themselves are described as non-overlapping`,
        `Evidence for different modes of action: location (CHiLL1 cytoplasmic, GCAWKR nuclear); CHiLL1-only apoptosis; GCAWKR-only G2 increase and impaired migration; GCAWKR-specific G2-M checkpoint term`,
        `Interaction: GCAWKR knockdown raises CHiLL1 but not the reverse`,
        `Own assessment: the main text gives no overlap count or test for "non-overlapping", and the GCAWKR analysis used a single ASO; report the shared-gene number and add a second ASO`,
      ] },

  ],
});
