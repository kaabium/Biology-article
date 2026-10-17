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
