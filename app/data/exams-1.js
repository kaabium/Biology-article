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

    { type: 'mcq', lesson: 'G-res-pipeline', points: 1,
      source: ['res-pipeline-p5'],
      q: `To test their pgRNA strategy more generally, the authors cloned 12 further pgRNAs targeting 12 different candidates. What did they observe?`,
      options: [
        { t: `Deletion at the target site in 12 of 12 cases and a lower target RNA level in 12 of 12`, ok: false, why: `If every pgRNA had worked there would be no failures. The text reports misses at both levels.` },
        { t: `Deletion in 7 of 12 cases and a lower target RNA level in 10 of 12`, ok: false, why: `The numbers are swapped: the expected deletion was seen in 10 of 12 cases and the expected RNA decrease in 7 of 12.` },
        { t: `Deletion in 10 of 12 cases, with a lower target RNA level in all 10`, ok: false, why: `Deletion did not guarantee less RNA: for three targets the RNA did not change, and for two it went up.` },
        { t: `Expected deletion in 10 of 12 cases; the target RNA went down for 7 of 12, was unchanged for three and went up for two`, ok: true, why: `Right. Deletion usually worked (10 of 12) but the expected loss of RNA was less reliable (7 of 12), so an individual pgRNA does not always work.` },
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

    { type: 'mcq', lesson: 'G-res-multipheno', points: 1,
      source: ['res-multipheno-p3', 'limitations-p2', 'res-pipeline-p1'],
      q: `For positive-control protein-coding genes, the authors compared pgRNAs that mutate the open reading frame with pgRNAs that delete the promoter (as is done for lncRNAs). Promoter deletion had a detectable but lower effect. What do they conclude?`,
      options: [
        { t: `Promoter deletion is more efficient than ORF mutation because the deletions are shorter`, ok: false, why: `The measured effect was lower for promoter deletion, not higher. Short, uniform deletions are an advantage of the design, but this control comparison shows a lower impact.` },
        { t: `The positive controls failed, so the screens cannot be trusted`, ok: false, why: `The positive controls behaved as expected: their pgRNAs were significantly depleted in the dropout screens while neutral controls were not.` },
        { t: `Promoter deletion has no effect, so lncRNA hits are unreliable`, ok: false, why: `The effect was detectable, only smaller. It means that some real lncRNA hits can be missed, not that the hits are invalid.` },
        { t: `CRISPR-del screens for lncRNAs have intrinsically lower sensitivity than ORF-targeting screens for protein-coding genes, so real lncRNA hits can be missed`, ok: true, why: `Right. The Limitations section adds that the relative inefficiency of CRISPR-del compared with ORF mutation probably means that many valuable targets were overlooked.` },
      ] },

    { type: 'mcq', lesson: 'H2', points: 1,
      source: ['limitations-p1'],
      q: `How many of the screen hits tested with ASOs were validated, and what does the remainder suggest?`,
      options: [
        { t: `12 of 12; every hit works through its RNA product`, ok: false, why: `Not all were validated. Candidates 408 and 316 were judged likely false positives.` },
        { t: `8 of 12 (67%); around one-third of screen hits may act through DNA-dependent mechanisms`, ok: true, why: `Right. Deleting DNA can also remove regulatory DNA or an opposite-strand gene, so a hit may work through the DNA rather than through its RNA. ASOs, which target only the RNA, help to separate the two.` },
        { t: `9 of 12 (75%); all the proliferation/cisplatin hits validated and the migration hits did not`, ok: false, why: `9 and 3 are the numbers of hits tested for proliferation/cisplatin and for migration (9 + 3 = 12), not the numbers that validated.` },
        { t: `3 of 12 (25%); only the migration hits validated`, ok: false, why: `Three is the number of migration hits tested. In total 8 of the 12 tested hits were validated.` },
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

    { type: 'mcq', lesson: 'E5', points: 1,
      source: ['fig4A', 'res-integration-p1', 'res-integration-p2', 'm-hits-p4'],
      q: `How does the target prioritization pipeline (TPP) turn the individual screens into one pan-hallmark ranking?`,
      options: [
        { t: `It adds up the raw read counts of all screens and calls the 80 lncRNAs with the highest totals`, ok: false, why: `TPP works with fold changes and P values from each screen, not with summed raw counts, and the 80 hits come from an FDR cutoff, not from a fixed top-80 list.` },
        { t: `It keeps, for each lncRNA, only the P value of its strongest single screen`, ok: false, why: `TPP integrates all the screens, which is the point. The integrated ranking performed better than individual screens (Figure 4B).` },
        { t: `It ranks lncRNAs by their expression and survival association in TCGA tumors`, ok: false, why: `Tumor expression and copy number were checked afterwards as independent support (Figures 4F to 4H). They are not inputs to the ranking.` },
        { t: `It combines effect size (robust rank aggregation of log2 fold changes) with significance (empirical Brown's method on P values), merges the two with a harmonic-mean P value and applies FDR correction (hits at FDR < 0.2)`, ok: true, why: `Right (Figure 4A and Methods). Using both effect size and significance balances how big an effect is with how confident the result is.` },
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
        { t: `Amplification is enriched among hits (P = 0.0011) but deletion is not (P = 0.14)`, ok: true, why: `Right. A small P for amplification and a large one for deletion (Fisher's exact test, one-sided) match "amplified, but not depleted".` },
        { t: `Both amplification (P = 0.0011) and deletion (P = 0.14) are significantly enriched among hits`, ok: false, why: `P = 0.14 is not a significant result, so deletion is not enriched among the hits.` },
        { t: `Deletion is enriched (P = 0.0011) and amplification is not (P = 0.14)`, ok: false, why: `The P values are swapped: amplification carries P = 0.0011 and deletion P = 0.14.` },
        { t: `Neither is enriched, because hits and non-hits have the same copy-number profile`, ok: false, why: `Amplification is clearly enriched among the hits (P = 0.0011).` },
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
        { t: `About 4 for CHiLL1 and about 1 for GCAWKR`, ok: true, why: `Right. The paper equates 8.3 TPM with about 4 molecules per cell for CHiLL1 and 2.5 TPM with about 1 copy per cell for GCAWKR. Both are low-abundance RNAs.` },
        { t: `About 1 for CHiLL1 and about 4 for GCAWKR`, ok: false, why: `The values are swapped: CHiLL1 is the more abundant of the two.` },
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

    { type: 'figure', img: 'fig4B', lesson: 'E4', points: 5,
      source: ['fig4B', 'fig4A', 'res-integration-p1', 'm-hits-p5', 'res-pipeline-p3'],
      q: `Figure 4B compares ways of ranking the screen results. Explain (a) what the axes, the dotted diagonal and the AUC values mean, (b) which methods perform best and worst, and (c) the conclusion and one limit of this comparison.`,
      model: `Each curve is a ROC curve. The positive-control genes (109) count as true positives and the neutral controls (35) as false positives: the y axis is the fraction of positive controls recovered and the x axis the fraction of neutral controls wrongly called. The dotted diagonal is chance performance (AUC 0.5); a higher AUC means a better ranking. The pan-hallmark TPP has the highest AUC (0.82), slightly above the common RRA integration (0.80) and clearly above the single screens (A549 dropout 0.73; H460 dropout 0.54, barely better than chance). TPP applied within one phenotype (TPP Pheno) scores 0.73 ± 0.01. So integrating all the screens recovers the controls better than any single screen. In my assessment, a limit is that performance is judged only on control genes: the positive controls are protein-coding genes and there are only 35 neutral controls, so the result may not carry over exactly to lncRNAs.`,
      checklist: [
        `Axes: true positive rate (positive controls recovered) against false positive rate (neutral controls called); 109 positive and 35 neutral controls`,
        `Dotted diagonal = chance (AUC 0.5); a higher AUC means a better ranking`,
        `Best: TPP Pan 0.82, then RRA Pan 0.80; TPP Pheno 0.73 ± 0.01 and A549 dropout 0.73; worst: H460 dropout 0.54 (near chance)`,
        `Conclusion: pan-hallmark integration outperforms the single screens and the common integration method`,
        `Limit (own assessment): judged only on control genes (protein-coding positives, 35 neutral controls), which may not represent lncRNAs`,
      ] },

    { type: 'figure', img: 'fig3D', lesson: 'G-res-validation', points: 5,
      source: ['fig3D', 'res-validation-p4'],
      q: `Figure 3D tests the two genes that share the start site deleted at candidate 205. Explain (a) why ASOs were used here, (b) what the "ASO control" is, (c) what the growth curves and the qRT-PCR bars show for LINC00115 versus RP11-206L10.11, and (d) the conclusion.`,
      model: `Deleting the shared start site cannot show which of the two overlapping genes matters, or whether the effect comes from the DNA (for example an enhancer) or from the RNA. ASOs were therefore used to knock down each RNA separately, with two different ASOs per gene. The "ASO control" is a non-targeting ASO that serves as the reference (set to 1.0). For LINC00115, both ASOs slowed the growth of A549 cells over 72 h (P = 0.034 and P = 0.018; n = 4). For RP11-206L10.11 the growth curves were not significantly different from the control ("ns"), although the qRT-PCR bars (n = 2, no P values printed) suggest that its ASOs did lower its RNA, so the lack of effect is probably not because the ASOs failed. The conclusion is that LINC00115, not RP11-206L10.11, drives proliferation, through an RNA-dependent mechanism.`,
      checklist: [
        `Why ASOs: deletion cannot tell which of two overlapping genes matters, nor DNA-dependent from RNA-dependent effects`,
        `Controls and design: a non-targeting ASO control (the reference) and two different ASOs per gene`,
        `LINC00115: both ASOs reduce growth over 72 h in A549 (P = 0.034; P = 0.018)`,
        `RP11-206L10.11: growth not significantly changed (ns) even though the qRT-PCR bars suggest its RNA was lowered (n = 2, no P values)`,
        `Conclusion: LINC00115 acts through an RNA-dependent mechanism; RP11-206L10.11 is not needed for proliferation`,
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

    { type: 'figure', img: 'fig6C', lesson: 'D9', points: 5,
      source: ['fig6C', 'fig6B', 'res-mechanism-p1'],
      q: `Figure 6C shows nuclear/cytoplasmic fractionation of A549 cells. Explain (a) what MALAT1 and GAPDH are for, (b) how to read the x axis, (c) what the bars say about CHiLL1 and GCAWKR and how this fits Figure 6B, and (d) why location matters for the mechanism.`,
      model: `MALAT1 and GAPDH are control RNAs: MALAT1 marks the nucleus and GAPDH the cytosol, so they show that the fractionation separated the two compartments. The x axis is the log2 of the nuclear/cytoplasmic ratio and it is drawn backwards: positive values on the left (arrow N) mean more RNA in the nucleus and negative values on the right (arrow C) more in the cytoplasm. The MALAT1 and GCAWKR bars point to the nuclear side, while the GAPDH and CHiLL1 bars point to the cytoplasmic side. This agrees with the FISH images and the cytoplasmic/nuclear ratio in Figure 6B, where CHiLL1 is found mainly in the cytoplasm and GCAWKR in the nucleus, so two methods give the same answer. Location is a key clue to mechanism: despite their similar oncogenic roles, the two RNAs probably act in different ways. The panel prints n = 2 but no P values, and the legend does not say what the error bars show.`,
      checklist: [
        `MALAT1 = nuclear marker, GAPDH = cytosolic marker (they check that the fractionation worked)`,
        `Axis = log2 nuclear/cytoplasmic ratio, drawn backwards: left (N) = nuclear, right (C) = cytoplasmic`,
        `GCAWKR bar on the nuclear side (like MALAT1); CHiLL1 bar on the cytoplasmic side (like GAPDH)`,
        `Agrees with FISH in Figure 6B (CHiLL1 mainly cytoplasmic, GCAWKR nuclear): two independent methods`,
        `Location suggests distinct modes of action despite similar oncogenic roles; small print: n = 2, no P values, error bars not defined`,
      ] },

    /* ======================= PART D: explain or critique (marks = checklist points) ======================= */

    { type: 'critique', lesson: 'H2', points: 5,
      source: ['res-aso-p3', 'res-mechanism-p2', 'fig6E', 'discussion-p5', 'discussion-p6', 'm-rescue-p1'],
      q: `ASOs can have off-target effects. (a) Give three pieces of evidence in the paper that the CHiLL1 and GCAWKR effects are on-target. (b) Overexpressing CHiLL1 or GCAWKR did not rescue the ASO-induced phenotypes. Explain what a rescue experiment is meant to show, give the explanations the authors offer for the failure, and suggest one experiment that would strengthen the on-target claim.`,
      model: `On-target evidence: two independent ASO sequences per gene gave knockdown and the same phenotypes; CRISPR-del with several pgRNAs gave concordant phenotypes; for CHiLL1 the transcriptome changes after the two ASOs were highly correlated (R = 0.75), suggesting that most effects arise from CHiLL1 itself; and the ASOs were also active in other KRAS+ and EGFR-mutant cell lines. A rescue experiment re-expresses the RNA from a plasmid (here the full-length sequence of one annotated transcript per gene): if the phenotype is reversed, the ASO was acting through that RNA. Here neither lncRNA rescued. The authors suggest cis-regulatory mechanisms (although they saw no such effect for the nearest neighbor of CHiLL1, TNFRSF10B) or functional transcript isoforms that are unannotated and were not tested. In my assessment, a failed rescue neither proves nor disproves on-target action, but it leaves the argument resting on indirect evidence (agreement between independent tools). The text also does not say whether the added RNA could still be targeted by the ASO, which would also prevent a rescue. A stronger test would be a rescue with all transcript isoforms and an ASO-resistant construct, or additional ASOs with a different design that give the same phenotype.`,
      checklist: [
        `On-target evidence: two independent ASOs per gene gave the same knockdown and phenotypes; CRISPR-del with several pgRNAs agreed`,
        `Further evidence: correlated transcriptome changes between the two CHiLL1 ASOs (R = 0.75) and activity in other KRAS+ and EGFR-mutant cell lines`,
        `Rescue logic: re-express the RNA from a plasmid (one full-length transcript per gene); reversal of the phenotype would show the ASO acted through that RNA; here neither lncRNA rescued`,
        `Authors' explanations: cis-regulatory mechanisms (not seen for the neighbor TNFRSF10B) or unannotated functional isoforms that were not tested`,
        `Own assessment plus a strengthening experiment (for example rescue with all isoforms and an ASO-resistant construct, or extra ASO designs): the failed rescue leaves the on-target claim resting on indirect evidence`,
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

    { type: 'critique', lesson: 'D6', points: 5,
      source: ['res-aso-p8', 'res-mechanism-p7', 'discussion-p6', 'fig5G'],
      q: `The Results say the CHiLL1/GCAWKR cocktail has an "additive" effect, while the Discussion says that mixing the ASOs gave "greater than additive" effects. (a) Describe the cocktail experiment in Figure 5G and why the total ASO amount was kept constant. (b) Give the explanation the authors offer. (c) What would be needed to claim real synergy?`,
      model: `In Figure 5G, the A549 cells received a single ASO (CHiLL1 ASO1 or GCAWKR ASO1), a Tier 3 cocktail of the two in equal proportions, or a non-targeting control, always at the same total ASO amount (25 nM), so that any extra effect cannot simply be due to a higher dose. The cocktail reduced growth more than either single ASO (P = 0.021 and P = 0.030; one-tailed Mann-Whitney test, n = 4). The authors explain this by their finding that GCAWKR knockdown raises CHiLL1 but not vice versa; in the Discussion they also take the greater-than-additive effect as one sign that the two RNAs act through very different mechanisms. In my assessment, the equal-total-dose design fairly shows that the mixture is more potent than a single ASO at the same total dose, but "greater than additive" is a stronger claim: it needs single-ASO arms at the half dose that each ASO contributes to the cocktail, plus a formal model of the expected additive effect (for example Bliss independence), which the legend does not describe. One-tailed tests with four replicates are also only modest evidence.`,
      checklist: [
        `Design: single ASOs vs a Tier 3 cocktail (equal proportions) vs a non-targeting control, all at the same total ASO amount (25 nM), so dose does not explain the extra effect`,
        `Result: the cocktail reduced growth more than either single ASO (P = 0.021 and P = 0.030; one-tailed Mann-Whitney, n = 4)`,
        `Authors' explanation: GCAWKR knockdown upregulates CHiLL1 but not vice versa; the Discussion also reads the effect as a sign of very different mechanisms`,
        `Own assessment: "greater than additive" (Discussion) versus "additive" (Results); true synergy needs half-dose single-ASO arms and a formal additivity model (for example Bliss)`,
        `Own assessment: one-tailed tests with n = 4 give modest evidence; test more doses and cell lines and check toxicity in normal cells (the paper reports no additional toxicity)`,
      ] },

    { type: 'critique', img: 'fig3F', lesson: 'G-res-validation', points: 5,
      source: ['res-validation-p5', 'fig3F', 'fig3E'],
      q: `The text says that ASO knockdown of three migration-screen hits "resulted in dramatic impairment of A549 migration" (Figures 3E and 3F). Look at the P values printed in Figure 3F. How well supported is the statement? Give one alternative explanation for fewer cells in a migration assay, and say what control or experiment would address it.`,
      model: `Support: for the three candidates (215, 448 and 489) two ASOs each were used, and in the crystal violet readout of migrated cells five of the six ASOs lowered migration (P between 0.005 and 0.031); the qRT-PCR bars show that the ASOs lowered the target RNAs. Caveats: the sixth ASO, ASO2 for candidate 489 (MIR23AHG), has P = 0.144, which is not significant, so "dramatic impairment" overstates that result; the tests are one-tailed Student's t tests with n = 3 for migration (n = 2 on the qRT-PCR bars); and only A549 was tested. An alternative explanation is that the ASOs reduce cell growth or viability, so that fewer cells end up on the lower side of the membrane without any change in migration itself. In my assessment, the authors should measure cell number or viability in parallel (or normalize to it), and a second cell line or a rescue would add confidence.`,
      checklist: [
        `Notes the support: both ASOs for most candidates (215, 448, 489) reduce migration (P = 0.029, 0.005, 0.006, 0.006, 0.031) and the target RNAs are lowered`,
        `Spots the exception: ASO2 for candidate 489 (MIR23AHG) has P = 0.144, not significant, so the text overstates it`,
        `Small print: one-tailed Student's t tests, n = 3 for migration and n = 2 for qRT-PCR; only A549 tested`,
        `Alternative explanation (own assessment): the ASOs reduce growth or viability, so fewer cells reach the membrane without a real change in migration`,
        `Control (own assessment): measure viability or cell number in parallel (or normalize), and add a second cell line or a rescue`,
      ] },

  ],
});
