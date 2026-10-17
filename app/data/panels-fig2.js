window.PANELS = window.PANELS || {};

/* ======================================================================== Figure 2A */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig2A: {
    short: 'Two screens for cell growth',
    question: 'How do the authors screen for lncRNAs that cells need in order to grow (proliferate), and why do they run two formats side by side?',
    howToRead: `<p>This is a cartoon of the experiment, not a data plot. On the left is a <b>pool of cells in many colors</b>. The colors show that the cells are all different: each cell carries its own pair of guide RNAs (pgRNAs), so a different lncRNA start site is deleted in each. The whole pool grows together, and DNA sequencing later counts how common each pgRNA has become.</p>
<p>The two arrows are two ways of asking the same question: <i>which deleted lncRNAs slow the cells down?</i></p>
<ul>
<li><b>Dropout assay (lower arrow).</b> The pool simply keeps growing for weeks. Cells that lost a lncRNA they need grow badly, so their pgRNAs become rarer. The empty red outlines in the drawing are cells that have dropped out. This is the <b>negative</b> format: you look for pgRNAs that are <b>depleted</b>.</li>
<li><b>CFSE assay (upper arrow).</b> The cells are stained with a fluorescent dye called CFSE and later sorted by brightness: the brightest cells are the "Slow growing" group and the dimmest cells are the "Fast growing" group (see the <a href="#/read/m-screens/m-screen-prolif-p1">Methods</a>). This is the <b>positive</b> format: you look for pgRNAs that are <b>enriched</b> in the slow-growing group, because cells that lost a growth-promoting lncRNA divide less.</li>
</ul>
<p>What a good result looks like: a lncRNA that cells really need for growth shows up in both assays. Its pgRNAs fall in the dropout assay <i>and</i> pile up in the slow-growing cells.</p>`,
    shows: `<p>The panel gives the plan for the first hallmark, proliferation: a classical <b>negative-selection</b> (dropout) screen combined with a <b>positive-selection</b> (CFSE) screen. The authors' reason is sensitivity: "To boost sensitivity, we implemented complementary “positive” screens". The gain was real but small. Using the area under the ROC curve (AUC), a score for how well a screen tells the known positive controls from the neutral controls, the text gives A549 proliferation 0.7 versus 0.67 (the cisplatin comparison is in panel B). The authors therefore kept the complementary screens for the later analyses.</p>
<p>Panel I shows how the two formats performed: the dropout screens give many more hits than the CFSE screens.</p>`,
    keyNumbers: [
      { value: 'AUC 0.7 vs 0.67', meaning: 'A549 proliferation: complementary screens (dropout + CFSE) versus dropout alone, "a modest but consistent benefit in accuracy"', source: ['res-multipheno-p2'] },
      { value: '20% brightest / 20% dimmest', meaning: 'the two groups of cells sorted as "slow-growing" and "fast-growing" in the CFSE screens (Methods)', source: ['m-screen-prolif-p1'] },
      { value: '14 and 21 days', meaning: 'when cells were harvested in the dropout screens (21 days = 3 weeks, the time point called T3)', source: ['m-screen-prolif-p1', 'fig2D'] },
      { value: 'coverage >1,000X', meaning: 'every pgRNA starts in about a thousand cells or more, so a guide cannot "drop out" just by bad luck (coverage = number of cells divided by number of unique library sequences)', source: ['m-screen-prolif-p1'] },
      { value: '77 and 63 vs 7 and 6', meaning: 'hits found by the dropout screens (A549, H460) versus the CFSE screens (A549, H460), as shown in panel I', source: ['fig2I'] },
    ],
    background: `<p>CFSE (carboxyfluorescein succinimidyl ester) is a fluorescent dye that gets trapped inside living cells. When a cell divides, its dye is shared between the two daughter cells, so every division roughly halves the brightness. After a few days, cells that divided many times are dim and cells that divided rarely are still bright. A flow cytometer can then sort the cells by brightness.</p>`,
    memory: 'A dropout screen is a roll call over several weeks: the names that vanish from the list belong to cells that could not keep up. CFSE is a drop of paint that is shared at every split: the cells that split least stay the most colorful. (Where the analogy breaks down: the "names" are pgRNA sequences, counted by DNA sequencing.)',
    flags: [
      `The legend does not say which cell line was used, how long the cells grew, or how the two CFSE groups were separated. The Methods give these details (flow-cytometry sorting of the brightest and dimmest cells; harvest of the dropout cells after two and after three weeks): see the CRISPR screens section of the STAR Methods.`,
      `The legend says the CFSE format makes pgRNAs "enriched" but not where. The main text says: in slow-growing cells.`,
      `The small arrows inside the cells (down for "Fast growing", up for "Slow growing") and the colors of the cells are not explained anywhere. Here the arrows are read as dye brightness and the colors as "each cell is different"; that is a reading of the picture, not a statement by the authors.`,
      `The picture does not show the reference sample that "depleted" and "enriched" are measured against. For the dropout screens the comparison is T3 against T0 (legend of panel E).`,
      `In A549 the text reports that the CFSE results did not show the expected opposite pattern to the dropout results (they did in H460), "possibly for technical reasons" (Figure S2B, which is not in your PDF).`,
      `The AUC sentence reads "A549 proliferation 0.7 versus 0.67, A549 cisplatin 0.77 versus 0.73, respectively" and does not label the numbers. Reading it as "with complementary screens versus dropout alone" is an interpretation. The authors call the benefit "modest", and the Discussion calls it "marginal improvements in accuracy" that must be weighed against the extra resources needed.`,
    ],
    chartTypes: [],
    examQ: {
      q: 'Figure 2A shows two ways to screen for proliferation. Describe each one, say what happens to the pgRNAs of a growth-promoting lncRNA in each, and explain why the authors used both.',
      a: 'Dropout assay (negative selection): the pool grows for weeks; cells that lost a growth-promoting lncRNA grow poorly, so their pgRNAs are depleted. CFSE assay (positive selection): cells are stained with a dye that is diluted at each division and are sorted into fast-growing (dim) and slow-growing (bright) groups; pgRNAs of growth-promoting lncRNAs are enriched in the slow-growing cells. The authors added the positive format to boost sensitivity; in A549 proliferation it gave a modest but consistent gain (AUC 0.7 versus 0.67, as the sentence is read here).',
    },
  },
});

/* ======================================================================== Figure 2B */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig2B: {
    short: 'Cisplatin: survival and death screens',
    question: 'How do the authors screen for lncRNAs that help lung cancer cells resist the drug cisplatin?',
    howToRead: `<p>A cartoon of the design, not a data plot. The same pool of different cells is treated with <b>cisplatin</b> (a chemotherapy drug) in two ways. In "IC20", "IC30" and "IC80" the number is the percent by which the dose slows growth (the Methods say IC30 "decreases cell proliferation by about 30%"), so IC20 is a lower dose and IC80 a higher one.</p>
<ul>
<li><b>Survival assay (lower arrow, + IC30 &amp; IC80):</b> high doses; the cells that <i>survive</i> are collected. This is the <b>negative (dropout)</b> format: pgRNAs of lncRNAs that help cells resist the drug are <b>depleted</b> in the survivors, because cells without those lncRNAs die.</li>
<li><b>Death assay (upper arrow, + IC20):</b> a low dose; the cells that <i>die</i> are collected. This is the <b>positive</b> format: pgRNAs of resistance-promoting lncRNAs are <b>enriched</b> in the dying cells, because deleting such a lncRNA makes cells easy to kill.</li>
</ul>
<p>A resistance-promoting lncRNA should therefore score in both formats, in opposite directions.</p>`,
    shows: `<p>Panel B applies the same "complementary" idea as panel A to drug resistance. The survival screen uses two doses (a mild and a high one) and the death screen one low dose. The text reports a small gain in accuracy for A549 cisplatin when the complementary screen is added: AUC 0.77 versus 0.73 (0.7 versus 0.67 for proliferation, panel A). The reason for studying resistance: patients with KRAS+ tumors are usually treated with platinum chemotherapy, "but tumors frequently evolve resistance".</p>`,
    keyNumbers: [
      { value: 'AUC 0.77 vs 0.73', meaning: 'A549 cisplatin: complementary screens versus dropout alone', source: ['res-multipheno-p2'] },
      { value: '6.5 µM and 25 µM', meaning: 'the two survival-screen doses for A549, which the Methods say correspond to IC30 and IC80', source: ['m-screen-cisplatin-p1'] },
      { value: 'every 24 h, five days', meaning: 'in the death screen, floating (dead) cells were collected daily and pooled', source: ['m-screen-cisplatin-p1'] },
      { value: '60 · 39 · 15', meaning: 'A549 hits in the Cis 6.5µM, Cis 25µM and Death screens (panel I)', source: ['fig2I'] },
    ],
    memory: 'A lifeboat drill. Survival screen: count who is in the boats afterwards; people whose life jacket (a resistance lncRNA) was removed are missing (depleted). Death screen: count who ended up in the water; people without life jackets are over-represented there (enriched).',
    flags: [
      `The legend calls IC30 and IC80 "high" doses, but the Methods call IC30 "a mild concentration". "High" only makes sense relative to the IC20 dose of the death screen.`,
      `The legend gives no cell line, concentrations or timing. The Methods say A549 cells, and print the death-screen dose as two concentrations for the single IC20 level, without explaining why.`,
      `As in panel A, the picture does not show the reference sample that depletion and enrichment are measured against.`,
    ],
    derived: ['30'],
    chartTypes: [],
    examQ: {
      q: 'Compare the "survival" and "death" cisplatin screens of Figure 2B: which cells are collected, at what kind of dose, and where are the pgRNAs of a resistance-promoting lncRNA depleted or enriched?',
      a: 'Survival screen (negative/dropout format): high doses (IC30 and IC80), surviving cells collected; pgRNAs of resistance-promoting lncRNAs are depleted there, because cells lacking such a lncRNA die. Death screen (positive format): a low dose (IC20), dying cells collected; those pgRNAs are enriched there, because cells lacking the lncRNA are easier to kill. The two formats are complementary (AUC 0.77 versus 0.73 in A549).',
    },
  },
});

/* ======================================================================== Figure 2C */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig2C: {
    short: 'Migration screen with transwells',
    question: 'How do the authors screen for lncRNAs that help cancer cells migrate?',
    howToRead: `<p>A cartoon of a <b>transwell assay</b>, not a data plot. The pool of different cells is placed in the upper part of a small cup whose floor is a <b>porous membrane</b> (tiny holes that a cell passes only by actively moving). The upper part holds medium without serum and the lower part medium with 10% serum, a lure that pulls cells downward (<a href="#/read/m-screens/m-screen-migration-p1">Methods</a>). After 48 h two groups are collected: the cells that crossed (<b>"Accelerated"</b>) and the cells that stayed on top (<b>"Impaired"</b>). Their pgRNAs are counted by sequencing.</p>
<p>The rule in the legend: migration-promoting lncRNAs are identified by their pgRNAs being <b>enriched in the migration-impaired cells</b>. Delete a lncRNA that cells need for moving, and the cells carrying that deletion tend to stay behind.</p>`,
    shows: `<p>Panel C covers the third hallmark, migration, which the text calls "a key hallmark underlying the invasion and metastasis of tumor cells". It is a positive-selection design in which the informative group is the cells that fail to cross. The screen "yielded 65 lncRNAs, of which ten were already associated with migration and invasion in numerous cancer types including SNHG6 and SNHG12". The 48 h end point was chosen after a set-up test with assays stopped between 5 h and 48 h (Figure S2G is not in your PDF).</p>`,
    keyNumbers: [
      { value: '48 h', meaning: 'how long cells were allowed to migrate before the two groups were collected', source: ['res-multipheno-p7', 'm-screen-migration-p1'] },
      { value: '65 lncRNAs', meaning: 'hits of the migration screen; ten of them were already linked to migration and invasion', source: ['res-multipheno-p7'] },
      { value: '10% FBS', meaning: 'serum in the lower part (none in the upper part): the lure that makes cells cross the membrane', source: ['m-screen-migration-p1'] },
      { value: '0.5 M cells per insert, 32 inserts', meaning: 'about 16 M infected cells were divided over 32 transwell inserts', source: ['m-screen-migration-p1'] },
    ],
    memory: 'A fence with food on the far side (the serum). Cells that squeeze through the gaps are the movers; cells left on the near side are the "impaired". A cell missing a "mover" lncRNA gets stuck at the fence.',
    flags: [
      `The legend omits the cell line, the time and the serum lure. The Methods give them: A549 cells, 48 h, 10% serum in the lower part.`,
      `The picture says "Accelerated" and "Impaired"; the legend says "capable/incapable of migrating". "Accelerated" just means "crossed the membrane", not faster than normal.`,
      `The legend does not say what "enrichment" is measured against. The Methods say that control cells that did not go through the assay were harvested as a reference population.`,
    ],
    chartTypes: [],
    examQ: {
      q: 'In the migration screen of Figure 2C, which cell population is used to identify migration-promoting lncRNAs, and why?',
      a: 'The migration-impaired cells, those that stayed on the upper side of the porous membrane. Deleting a lncRNA that cells need for migration makes them less able to cross, so its pgRNAs are enriched among the impaired cells (compared with a reference population). In the Methods, 10% serum below the membrane lures cells and the assay runs for 48 h.',
    },
  },
});

/* ======================================================================== Figure 2D */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig2D: {
    short: 'Do replicate read counts agree?',
    question: 'Do the two biologically independent replicates of the A549 dropout screen give similar pgRNA read counts, at the start (T0) and after three weeks (T3)?',
    howToRead: `<p>Four samples are compared in every pair: two replicates at the start (<b>T0</b>, Rep1 and Rep2) and two three weeks later (<b>T3</b>). The sample names sit on the diagonal, like a mileage chart. <b>Lower left:</b> each scatter plot has one dot per pgRNA, placed by its read count in two samples (log2 scale: one unit up is a doubling). <b>Upper right:</b> the Pearson correlation (R) of the same pair, with *** for significance; the tile colors repeat R (redder = higher) and there is no color key.</p>
<p>A good result: the dots hug the diagonal and R is close to 1, meaning that two independent attempts give nearly the same counts.</p>`,
    shows: `<p>All six pairs correlate strongly and significantly: R from 0.808 to 0.959, all marked ***. The two T0 replicates agree best (R=0.959), the two T3 replicates a little less (R=0.869), and the lowest value (R=0.808) is T0 Rep2 against T3 Rep2. The text lists this as the first of several levels of reproducibility, "from raw pgRNA read counts (Figure 2D) to pgRNA fold changes and target-level fold changes"; panel E is the next level.</p>`,
    keyNumbers: [
      { value: 'R=0.959', meaning: 'T0 Rep1 against T0 Rep2: the highest of the six pairs', source: ['fig2D'] },
      { value: 'R=0.869', meaning: 'T3 Rep1 against T3 Rep2: the two replicates after three weeks', source: ['fig2D'] },
      { value: 'R=0.808', meaning: 'T0 Rep2 against T3 Rep2: the lowest of the six pairs, still high', source: ['fig2D'] },
      { value: '***', meaning: 'printed on every R tile; the legend does not define the stars (usually a very small P value)', source: ['fig2D'] },
    ],
    background: `<p>Raw read counts differ a lot from one pgRNA to the next in every sample, which makes two samples correlate strongly even when nothing biological happens. So a high R here mostly shows clean, reproducible sequencing; the tougher test is whether the <i>changes</i> agree (panel E).</p>`,
    memory: 'Two teachers marking the same exams: if their marks line up on the diagonal, you can trust the marks.',
    flags: [
      `The legend says "Z score-transformed log2 values", but the axes read "Log2 read counts" from 0 to 12 (Z-scores would be centered on zero). The Methods apply the Z-scaling to log2 fold changes (<a href="#/read/m-hits/m-hits-p2">Methods</a>), as in panel E, so the sentence looks copied over from E.`,
      `The legend does not define "***", does not give the number of pgRNAs and does not say whether controls are included (the text says the correlations hold "even when considering lncRNA candidates alone and omitting positive-control targets").`,
      `The flat row of dots along the bottom of several lower plots is not explained; it usually means pgRNAs with no or almost no reads in one sample (a general reading, not stated by the authors).`,
    ],
    derived: ['1'],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: 'What does Figure 2D show, and why does a pooled screen need this check?',
      a: 'It compares pgRNA read counts (log2) between the two biologically independent replicates at T0 and T3 of the A549 dropout screen. All pairs correlate strongly and significantly (R 0.808 to 0.959; 0.959 for the T0 replicates, 0.869 for the T3 replicates). High agreement means the screen is reproducible, so differences between pgRNAs are more likely real than noise.',
    },
  },
});

/* ======================================================================== Figure 2E */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig2E: {
    short: 'Do fold changes agree between replicates?',
    question: 'Do the two replicates of the A549 dropout screen agree on how strongly each lncRNA candidate was depleted?',
    howToRead: `<p>Each black dot is a lncRNA candidate. The x axis is its change from T0 to T3 in replicate 1, the y axis the same in replicate 2. The change is the log2 fold change turned into a <b>Z-score</b>: how many standard deviations it lies from the average of the neutral controls (the Methods scale it this way). Negative means <b>depleted</b>. The thin lines mark zero, so the lower-left corner holds candidates depleted in both replicates. The thick line is the fitted trend and R is the Pearson correlation.</p>
<p>A good result: a cloud along the diagonal, so that a candidate that looks strongly depleted in replicate 1 also does in replicate 2.</p>`,
    shows: `<p>The replicates agree clearly: R=0.66, P<2.2e-16 (software prints this for "too small to display"). Most candidates sit in a round cloud around zero (no real effect). The informative part is the tail toward the lower left, where lncRNAs that cells need are depleted in both replicates, down to Z-scores of about −10 or lower. R is lower than for the raw counts in panel D, which is common: fold changes are small compared with noise for most lncRNAs. R describes all candidates together; it does not say how reproducible individual hits near the cutoff are.</p>`,
    keyNumbers: [
      { value: 'R=0.66', meaning: 'Pearson correlation between replicates of the Z-scored log2 fold changes (T3/T0)', source: ['fig2E'] },
      { value: 'P<2.2e-16', meaning: 'the smallest P value the software prints: "extremely small"', source: ['fig2E'] },
      { value: 'R=0.959 and 0.869', meaning: 'for comparison: replicate agreement of the raw read counts at T0 and T3 (panel D)', source: ['fig2D'] },
    ],
    background: `<p>A Z-score counts how far a value is from an average, in standard deviations. Here the average and standard deviation come from the neutral controls, so −5 means five neutral-control standard deviations below normal.</p>`,
    memory: 'Two doctors screen the same patients. Most are healthy (the round cloud at zero). If both flag the same few (the lower-left tail), the screening is reproducible.',
    flags: [
      `The legend does not say whether a dot is one pgRNA or one target (the text mentions both "pgRNA fold changes and target-level fold changes" for this and the supplementary panels), and the number of dots is not printed.`,
      `The legend says only "Pearson correlation": it does not describe the grey band around the line or say that values were scaled with the neutral controls (that is in the Methods).`,
    ],
    chartTypes: ['F1'],
    examQ: {
      q: 'In Figure 2E, what is plotted, what does R=0.66 tell you, and why Z-scores?',
      a: 'Each black dot is a lncRNA candidate; x and y are its Z-scored log2 fold change (T3/T0) in replicate 1 and replicate 2 of the A549 dropout screen. R=0.66 (P<2.2e-16) means the replicates agree well on which candidates are depleted, so the screen is reproducible at the level of fold changes. Z-scores express each change in units of the neutral-control noise, so the changes are on a common scale.',
    },
  },
});

/* ======================================================================== Figure 2F */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig2F: {
    short: 'Do the controls behave as expected?',
    question: 'Does the A549 dropout screen detect known growth genes (positive controls) but not neutral controls, and how does ORF targeting compare with TSS deletion?',
    howToRead: `<p>Each dot is one target, placed by its <b>P-value</b> in the A549 dropout screen (0 at the bottom, 1 at the top); a small P-value means the target's pgRNAs were significantly depleted. Groups: <b>LncRNAs</b> (n=1003); <b>Neutral controls</b> (n=35; pgRNAs aimed at places that should not matter); <b>Positive ORF</b> (n=51) and <b>Positive TSS</b> (n=58), protein-coding genes known to be needed for growth. For "ORF" the pgRNAs cut inside the coding sequence (the standard way to knock a gene out); for "TSS" they delete the start site, exactly as for lncRNAs (see the two small drawings). In each box the thick line is the median and the box holds the middle half of the dots. The bracket numbers are Wilcoxon P-values (neutral controls versus each positive group); "Kruskal−Wallis, P=4.2e−12" tests whether the four groups differ at all.</p>
<p>A good result: neutral controls stay high (no effect) and positive controls sit low (strong dropout).</p>`,
    shows: `<p>The screen works as designed. Neutral controls are mostly high, while positive controls sit lower: strongly for "Positive ORF" (median near zero; P=4.95e−05 against neutral controls) and less so for "Positive TSS" (P=0.004). The groups differ overall (Kruskal−Wallis P=4.2e−12). The text: "pgRNAs for positive-control genes were significantly depleted in dropout screens, while neutral controls were not". The gap between ORF and TSS is the paper's point about the method: promoter deletion "displayed a detectable but lower phenotypic impact, indicating that CRISPR-del screens for lncRNAs face intrinsically lower sensitivity compared with ORF-targeting screens for PCGs". The lncRNA group looks like the neutral group with a second bulge near zero: most lncRNAs do nothing to growth, a minority do.</p>`,
    keyNumbers: [
      { value: 'n=1003 · 35 · 51 · 58', meaning: 'targets in the lncRNA, neutral-control, Positive ORF and Positive TSS groups', source: ['fig2F'] },
      { value: 'P=4.2e−12', meaning: 'Kruskal−Wallis test: the four groups differ overall', source: ['fig2F'] },
      { value: 'P=4.95e−05', meaning: 'Wilcoxon test: neutral controls versus Positive ORF', source: ['fig2F'] },
      { value: 'P=0.004', meaning: 'Wilcoxon test: neutral controls versus Positive TSS (a weaker difference than for ORF)', source: ['fig2F'] },
      { value: '51 + 58 = 109', meaning: 'the two positive groups add up to the "109 positive controls" of the text', source: ['fig2F', 'res-multipheno-p6'] },
    ],
    background: `<p>Wilcoxon and Kruskal−Wallis tests compare groups by ranking the values, so they do not assume a bell-shaped distribution.</p>`,
    memory: 'A smoke-alarm test: real smoke (positive controls) must make it ring, no smoke (neutral controls) must leave it silent. Only then can you trust it in rooms where you do not know (the lncRNAs).',
    flags: [
      `n=1003 differs from the "831 expressed lncRNAs, corresponding to 998 high-confidence TSSs" in the text (<a href="#/read/res-pipeline/res-pipeline-p2">res-pipeline</a>); Figure 1C also shows 1003. The 35 neutral controls are fewer than the neutral regions described in the Methods and in Figure 1C. The two positive groups add up to 109 (51 + 58), which matches the text. The paper explains none of these differences.`,
      `The legend does not say how each P-value was obtained (the Methods: the screen software CASPR gives FDR-corrected P values at target level), whether the Wilcoxon P values are corrected for several comparisons, or what the whiskers show. No bracket compares lncRNAs with neutral controls.`,
      `Neutral controls and lncRNAs both lie mostly near 1 rather than spread evenly from 0 to 1, which is what a plain test gives when nothing happens. The legend does not explain this.`,
    ],
    derived: ['831', '998', '109'],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: 'What are the "Positive ORF" and "Positive TSS" groups in Figure 2F, and what does the difference between them tell you about CRISPR-del screens for lncRNAs?',
      a: 'Both are protein-coding genes needed for growth. ORF: the pgRNAs cut inside the coding sequence (maximal loss of function). TSS: the pgRNAs delete the start site, as is done for lncRNAs. Both are depleted compared with neutral controls (P=4.95e−05 and P=0.004), but ORF much more strongly (median near zero). So promoter deletion has a detectable but lower impact: CRISPR-del screens for lncRNAs are intrinsically less sensitive than ORF-targeting screens.',
    },
  },
});

/* ======================================================================== Figure 2G */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig2G: {
    short: 'Which lncRNAs drop out in A549?',
    question: 'Which lncRNAs, positive controls and known cancer lncRNAs are significantly depleted in the A549 dropout screen?',
    howToRead: `<p>A volcano-style plot: each dot is one target. <b>x ("Log2 FC"):</b> log2 fold change of pgRNA counts; left of the dashed vertical line (zero) means depleted (−1 is half as many, −2 a quarter), right means enriched. <b>y ("-Log10 FDR"):</b> how sure the screen is; higher is more certain (each unit up is ten times smaller FDR). <b>Dashed horizontal line:</b> the hit cutoff, FDR &lt; 0.2, which sits at about 0.7 because −log10 of 0.2 is about 0.7 (computed here). <b>Colors:</b> black = lncRNA candidates; red = positive controls (protein-coding genes needed for growth); green and blue = lncRNAs that earlier papers linked to NSCLC (green) or to other cancers (blue), named next to their dots.</p>
<p>A dropout hit lies in the <b>upper left</b>: left of zero and above the line. (The <a href="#/read/m-hits/m-hits-p3">Methods</a> require a negative fold change for dropout hits, so dots high up on the right are not hits.)</p>`,
    shows: `<p>The most significant dots are red positive controls in the upper left, as expected. Many black lncRNA dots pass the cutoff too: the text reports 77 lncRNAs necessary for A549 proliferation. The labeled names show that the screen rediscovers lncRNAs already linked to cancer; LINC00115 (blue, top left) is the most significant of them (numbers below). PVT1 and LINC00680 sit close to the cutoff line. Most dots form a mound near zero: no significant effect.</p>`,
    keyNumbers: [
      { value: '77 lncRNAs', meaning: 'identified as necessary for proliferation of A549 cells (the hits of this screen)', source: ['res-multipheno-p4'] },
      { value: 'FDR < 0.2', meaning: 'the cutoff for hits: the dashed horizontal line, about 0.7 on the −log10 axis (computed here)', source: ['fig2G'] },
      { value: 'log2 FC −1.81; FDR 1.2 × 10<sup>−7</sup>', meaning: 'LINC00115 (candidate 205) in A549 dropout, from the text; its dot is the blue one at the top left (x close to −1.81, y close to −log10 of the FDR, about 6.9, computed here)', source: ['res-validation-p1'] },
    ],
    background: `<p>FDR (false discovery rate) is the expected share of false alarms among the hits. At FDR 0.2 about one hit in five could be a false alarm: a loose cutoff that misses fewer real hits but lets in more false ones. The paper does not say why 0.2 was chosen.</p>`,
    memory: 'A volcano seen from the side: the lava (the strongest, most reliable drop-outs) shoots up the left slope; only the upper-left corner sets off the alarm.',
    flags: [
      `PVT1 is written in blue ("other cancer types"), although the text lists PVT1 among "known NSCLC lncRNAs" (<a href="#/read/res-multipheno/res-multipheno-p4">res-multipheno</a>): text and color disagree.`,
      `LINC00511 and SBF2-AS1 are each labeled twice, unexplained. The Figure 1C legend notes that some lncRNA loci have more than one targeted start site, which may be the reason; the paper does not say so here.`,
      `The Limitations section cites Figure 2H for PVT1, LINC00680 and PCAT7 (<a href="#/read/limitations/limitations-p2">limitations</a>), but these names are labeled here, in panel 2G.`,
      `A few red dots lie right of zero (enriched, not depleted), unexplained; the Methods say the control genes include genes that promote cell growth and genes that oppose it (<a href="#/read/m-library-design/m-library-design-p3">library design</a>).`,
      `The legend does not say how log2 FC and FDR were calculated (the Methods: target level, with CASPR) or which time points are compared (panel E: T3 over T0). The number 77 is not printed on the panel, and dots overlap near the cutoff, so you cannot count it from the picture.`,
    ],
    derived: ['0.7', '6.9'],
    chartTypes: ['F2'],
    examQ: {
      q: 'In Figure 2G, how do you decide whether a lncRNA is a hit in the A549 dropout screen, and what do the label colors mean?',
      a: 'A hit lies left of zero (negative log2 FC: pgRNAs depleted) and above the dashed line at FDR 0.2 (about 0.7 on the −log10 FDR axis). Colors: black = lncRNA candidate, red = positive control, green = previously published in NSCLC, blue = previously published in other cancers. The screen found 77 lncRNAs, including known ones such as LINC00115 and SBF2-AS1.',
    },
  },
});

/* ======================================================================== Figure 2H */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig2H: {
    short: 'Do A549 and H460 agree?',
    question: 'Do the two cell lines, A549 and H460, agree on which lncRNAs and positive controls drop out in the dropout screen?',
    howToRead: `<p>Each dot is one target: x is its Z-score in the A549 dropout screen, y its Z-score in the H460 screen. Negative means depleted, so the lower-left corner is depleted in <b>both</b> cell lines. Black dots are lncRNA candidates; red dots are positive controls (the red gene names, such as the ribosomal protein genes RPL3, RPL13, RPL23A and RPS6, dropped out strongly). The black numbers are candidate numbers: the paper's names for its lncRNA targets.</p>
<p>Two lines are fitted, each with its own R and P: <b>red</b> (R=0.4, P=2e−05) and <b>black</b> (R=0.092, P=0.0035). The panel does not say which dots each uses. By color, red should be the positive controls and black the lncRNA candidates (an inference; the P values fit about a hundred and about a thousand dots). Perfect agreement would be a steep line from lower left to upper right.</p>`,
    shows: `<p>Positive controls agree reasonably (R=0.4): the strongly depleted ones at the lower left are depleted in both cell lines. For lncRNA candidates the agreement is small but not zero (R=0.092, P=0.0035); the text calls it "a significant concordance among identified targets, even after omitting positive controls". <b>Significant is not the same as strong:</b> with a thousand or so dots, even a very weak correlation gets a small P value. Later the paper calls the overlap of the two cell lines' dropout hits "a low degree of concordance". For the positive controls the text adds: of 109 in the library, 37 scored in A549 dropout and 16 in H460, and 10 in both (p = 0.011, hypergeometric test); by chance about 5 would overlap (16 × 37 ÷ 109 ≈ 5.4, computed here).</p>`,
    keyNumbers: [
      { value: 'R=0.4, P=2e−05', meaning: 'red line: probably the positive controls (inference); they agree best between the cell lines', source: ['fig2H'] },
      { value: 'R=0.092, P=0.0035', meaning: 'black line: probably the lncRNA candidates (inference); significant but weak agreement', source: ['fig2H'] },
      { value: '109 → 37 · 16 · 10', meaning: 'positive controls in the library → scoring in A549 dropout, scoring in H460 dropout, scoring in both (hypergeometric p = 0.011)', source: ['res-multipheno-p6'] },
      { value: 'four points removed', meaning: 'left out of the picture for clarity but included in the statistics', source: ['fig2H'] },
    ],
    background: `<p>The P value says whether a correlation is likely to be real; R says how strong it is. With many points, even a tiny R can be significant.</p>`,
    flags: [
      `The legend does not say which dots each R and line belong to (see the inference above). The text says the concordance holds "even after omitting positive controls".`,
      `The black numbers are not explained. They are candidate numbers; four of the nine (205, 448, 507, 508) appear in the text (for example candidate 205 is LINC00115 and candidate 507 is LINC00910), but the paper does not say why these were labeled. "TSSCELF1" is printed as one word and never explained.`,
      `Four points were removed "for clearer visualization"; the statistics use all points. Which points were removed is not said.`,
      `The Limitations section cites Figure 2H for PVT1, LINC00680 and PCAT7 (<a href="#/read/limitations/limitations-p2">limitations</a>); those names are labeled in panel 2G, not here.`,
    ],
    derived: ['5.4'],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: 'Figure 2H reports R=0.092 with P=0.0035 for the lncRNA candidates. Is the agreement between A549 and H460 strong? Explain.',
      a: 'No. It is statistically significant (P=0.0035) but weak (R=0.092): with about a thousand points even a tiny correlation is significant. The positive controls agree better (R=0.4). The authors call the concordance significant, even after omitting positive controls, but later describe the overlap of lncRNA hits between the two cell lines as low, which is why they combine several screens and both cell lines.',
    },
  },
});

/* ======================================================================== Figure 2I */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig2I: {
    short: 'Hits across all eight screens',
    question: 'How many lncRNA hits does each of the eight screens find, and how much do the hit lists overlap?',
    howToRead: `<p>An <b>UpSet plot</b> (a Venn diagram for many sets, turned into a table). A hit is a lncRNA with FDR &lt; 0.2 in that screen (<a href="#/read/m-hits/m-hits-p3">Methods</a>: depleted for dropout and cisplatin survival, enriched for CFSE, death and migration). <b>Rows:</b> the eight screens (cell line + assay; Cis = cisplatin; "Cis 6.5µM" and "Cis 25µM" are the two survival doses). <b>Left bars:</b> total hits per screen. <b>Grid:</b> each column is one combination of screens; a single dot means a hit in that screen only; dots joined by a line mean a hit in all of those screens and in no other. <b>Top bars:</b> how many lncRNAs have exactly that combination (number printed above). Dark = "Novel lncRNAs", teal = "Cancer lncRNAs" (already in the CLC2 database of cancer lncRNAs). Columns are sorted: single-screen columns first, then pairs, triples, and the one group of four.</p>`,
    shows: `<p><b>Hit lists differ in size:</b> A549 Dropout 77, A549 Migration 65, H460 Dropout 63, Cis 6.5µM 60, Cis 25µM 39, Death 15, and only 7 (A549) and 6 (H460) for the CFSE screens. <b>Most hits belong to one screen only:</b> the tallest bars are single-screen columns (47 only in Migration, 46 only in H460 Dropout, 42 only in A549 Dropout, 26 and 22 for the two cisplatin doses). The biggest overlap of two screens is 16 hits shared by A549 Dropout and Cis 6.5µM. Only five lncRNAs are hits in both Dropout screens (2 + 1 + 2 from three columns). Adding all 32 bars gives 257 different hits (computed here), more than the shorter integrated "pan-hallmark" list (80) that the paper builds later (<a href="#/read/res-integration/res-integration-p2">res-integration</a>). Teal is the minority: most hits are "novel". The text calls these data "a resource of functional lncRNAs in NSCLC hallmarks".</p>`,
    keyNumbers: [
      { value: '77 · 65 · 63 · 60 · 39 · 15 · 7 · 6', meaning: 'hits per screen: A549 Dropout, A549 Migration, H460 Dropout, Cis 6.5µM, Cis 25µM, Death, A549 CFSE, H460 CFSE', source: ['fig2I'] },
      { value: '77 and 65', meaning: 'the only two totals also given in the text: lncRNAs necessary for A549 proliferation, and migration-promoting lncRNAs', source: ['res-multipheno-p4', 'res-multipheno-p7'] },
      { value: '47 · 46 · 42', meaning: 'the tallest bars: hits found only in A549 Migration, only in H460 Dropout, only in A549 Dropout', source: ['fig2I'] },
      { value: '16', meaning: 'the biggest overlap of two screens: A549 Dropout and A549 Cis 6.5µM', source: ['fig2I'] },
      { value: '8 screens', meaning: '"We perform 8 disease-specific CRISPR screens" in two cell lines for three hallmarks', source: ['intro-p6'] },
    ],
    background: `<p>An UpSet plot is the tidy alternative to a Venn diagram once there are more than three or four sets: each column is one possible membership pattern and its bar counts the items with exactly that pattern.</p>`,
    memory: 'Eight clubs and a list of pupils. Each column of the grid is one membership pattern (for example "chess only" or "chess and drama") and its bar counts the pupils with exactly that pattern; the left bars are the club sizes.',
    flags: [
      `The legend says "light blue bat" (printed "bat", meaning "bar"); the image shows teal and the figure key says "Cancer lncRNAs". It speaks of a "fraction", but the bars show counts: read the fraction as the teal share of each bar. The teal counts are not printed, and "novel" is not defined (from the key: not in the CLC2 list).`,
      `The legend does not explain the row labels or the hit rule. The Methods link Cis 6.5µM and Cis 25µM to IC30 and IC80 in A549; "Death" is shown without a dose.`,
      `Only two of the eight totals appear in the text: 77 and 65. These are per-screen lists, not the final integrated lists. In this panel H460 appears only with Dropout and CFSE.`,
    ],
    derived: ['257'],
    chartTypes: ['F2'],
    examQ: {
      q: 'In Figure 2I, which two screens share the most hits, how many hits are found only in the A549 Dropout screen, and what does the overall pattern suggest?',
      a: 'A549 Dropout and A549 Cis 6.5µM share the most hits (16). 42 of the 77 A549 Dropout hits appear in no other screen. Most hits are specific to one screen (the single-dot columns are the tallest bars) and overlaps are small, for example only five hits are shared by the A549 and H460 Dropout screens. That is why the authors combine several hallmarks and cell lines in an integrated analysis instead of relying on one screen.',
    },
  },
});
