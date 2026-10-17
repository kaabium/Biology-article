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
