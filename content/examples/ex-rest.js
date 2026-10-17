/* GOLD-STANDARD EXAMPLES for glossary, Track G, panel guides, cards, quizzes, exams, explain, numbers.
   Validate with:  node tools/validate.mjs --include content/examples/ex-rest.js --files ex-rest */

/* ----------------------------------------------------------------------------- glossary content (merged with plan metadata by id) */
(window.GLOSSARY_CONTENT = window.GLOSSARY_CONTENT || []).push(
{
  id: 'tss',                       // plan: transcription start site (TSS), home lesson B7, kind background
  full: 'transcription start site',
  short: 'The exact DNA position where an RNA starts being copied from a gene.',
  long: '<p>Before a gene can be copied, the copying machine (RNA polymerase) has to land on the DNA and begin at one particular letter. That first letter is the TSS. A gene can have more than one TSS, and one stretch of DNA can hold the TSSs of two genes that face opposite ways.</p>' +
        '<p>Because the TSS is where copying begins, removing it is a clean way to stop a gene from being copied.</p>',
  analogy: 'The "Start" line on a running track: the race (the copy) cannot begin anywhere else.',
  see: ['promoter', 'transcript', 'bidirectional-promoter'],
  paperUse: { ref: 'res-pipeline-p1', quote: 'deleting target genes’ transcription start sites (TSS)' },
},
{
  id: 'chill1',                     // plan: paper-specific, home lesson A3, kind paper -> source required
  full: 'Cancer Hallmark in Lung LncRNA 1',
  short: 'One of the two final lncRNAs: switching it off with ASOs slowed lung cancer cells in several test systems.',
  long: '<p>CHiLL1 was originally one of the 831 targets (the paper\'s text calls it candidate 42). It survived every narrowing step and was renamed by the authors. Silencing it with ASOs reduced the growth of cancer cells, including in organoids, and the effect was weaker in normal lung cells.</p>',
  analogy: 'The last suspect left standing after the detective has eliminated everyone else.',
  source: ['res-pipeline-p2', 'res-aso-p3', 'res-aso-p7'],
  see: ['gcawkr'],
  paperUse: { ref: 'res-aso-p4', quote: 'It is located on Chromosome 8 and consists of two annotated isoforms' },
}
);

/* ----------------------------------------------------------------------------- Track G (study layer for paper paragraphs + units) */
window.TRACKG = window.TRACKG || { paras: {}, units: {} };
Object.assign(window.TRACKG.paras, {
  'res-pipeline-p1': {
    plain: '<p>The authors wanted to find lncRNAs that help lung cancer cells. They adapted a CRISPR method called DECKO so that thousands of lncRNAs can be tested together in one batch (a "pooled" experiment).</p>' +
           '<p>Their way of switching a gene off is to <b>delete its TSS</b> using a pair of guide RNAs (pgRNAs); this stops the gene being expressed. They explain that deleting only the start site, rather than the whole gene, has two advantages: the deletions are all alike and short (shorter deletions work more efficiently), and there is less chance of accidentally removing nearby DNA regulatory elements, which could cause false hits.</p>',
    why: 'This paragraph states the central design choice (delete the TSS, not the whole gene) that every screen in the paper relies on.',
    memory: 'Like pulling a car\'s ignition key instead of scrapping the whole car: the car is "off", and you did not damage the neighbours in the car park.',
    flags: [],
    prereqs: ['B7', 'D2', 'D8'],
    checks: [
      { q: 'According to the paper, why delete only the TSS rather than the entire gene?',
        options: [
          { t: 'The deletions are uniform and shorter (more efficient), and there is less risk of removing overlapping DNA regulatory elements', ok: true, why: 'Right: these are the two benefits the paragraph lists.' },
          { t: 'The whole gene is too large to fit into a plasmid', ok: false, why: 'The paragraph says nothing about plasmid size; the stated reasons are efficiency and avoiding regulatory DNA.' },
          { t: 'Deleting the whole gene would not stop the RNA being made', ok: false, why: 'Deleting a whole gene would stop it too. The point is that the TSS approach is cleaner and more efficient.' },
        ] },
      { q: 'What is a pgRNA used for in the DECKO approach?',
        options: [
          { t: 'A pair of guide RNAs that steer the scissors to remove the TSS region between two cuts', ok: true, why: 'Right: "paired guide RNAs" delete the TSS (the paper says TSSs are deleted "via paired guide RNAs").' },
          { t: 'A single guide that switches the gene off without cutting', ok: false, why: 'That describes a different technique (CRISPRi). Here the DNA is cut and a piece is deleted.' },
          { t: 'A dye that marks the gene so it can be seen under the microscope', ok: false, why: 'pgRNAs are not dyes; they point the scissors at DNA positions.' },
        ] },
    ],
  },
});
Object.assign(window.TRACKG.units, {
  'res-pipeline': {
    intro: '<p>This first Results section describes <b>how the experiment was built</b>: the cutting method (delete the start site of each lncRNA gene), the collection of 831 targets, the controls, and a first test that the method really works.</p>',
    recap: '<p>The method deletes each lncRNA\'s start site using paired guides. The library targets 831 lncRNAs (998 start sites) plus controls, and a first validation (DNMBP-AS1) shows the deletion and the loss of RNA happen as expected.</p>',
  },
});

/* ----------------------------------------------------------------------------- panel guide + transcribed in-image text */
Object.assign((window.FIGTEXT = window.FIGTEXT || {}), {
  fig1A: 'Transcribed from the image by eye. Flow: "Library Design" (1,200 targets; Depth: 10 pgRNAs) -> "DECKO Cloning" -> "Lentiviral pool" -> "Transduction" (MOI 0.3, + Puro) -> "Harvest cells" (Coverage 1000x). Wheel: Proliferation, Cisplatin, Migration. Text: "2 NSCLC cell lines", "3 Phenotypes", "5 Functional assays".',
  fig1B: 'Transcribed from the image by eye. "Library design workflow": GENCODE, BigTranscriptome, FANTOM5, A549 novel assembly -> Merged Assembly; A549 RNAseq; "TSS close to protein coding exon" <2kb; "Low expression" <0.1FPKM; Clustered TSSs; TSS target region >300bp; Long noncoding; Protein coding; >2 Kb; CAGE; ChromHMM; DNAse I Hypersensitivity; 998 Candidates; CRISPETa; Depth:10 pgRNAs; 1200 pgRNAs library including controls.',
  fig1F: 'Transcribed from the image by eye. Title: "RT-qPCR (A549)". Y axis: "DNMBP-AS1 expression (Normalised to GAPDH)", ticks 0.0, 0.5, 1.0 and a broken axis up to 2.2. "n=3". X axis label "pgRNAs": Control, 1, 2, 3, 4, 5, 6, 7, 9, 10 (pgRNA 8 is not shown). Labels above the bars: pgRNA 1 "ns"; 2 "P=5e-4"; 3 "P=0.001"; 4 "P=0.005"; 5 "P=0.003"; 6 "P=0.008"; 7 "ns"; 9 "P=0.02"; 10 "P=0.04". Control bar = 1.0.',
});
Object.assign((window.PANELS = window.PANELS || {}), {
  fig1F: {
    short: 'Did the guides lower DNMBP-AS1 RNA?',
    question: 'When the start site of the known lung-cancer lncRNA DNMBP-AS1 is deleted with each of nine different guide pairs, does the amount of its RNA go down?',
    howToRead: '<p>Each bar is the amount of DNMBP-AS1 RNA after using one guide pair (pgRNA), <b>relative to the control</b> (the black bar, set to 1.0). The RNA amount was measured by qRT-PCR and divided by the amount of the housekeeping RNA GAPDH, so differences in cell number do not matter. The numbers above the bars are P values: a small P means "unlikely to be a chance difference from the control"; <b>ns</b> means not significant.</p>',
    shows: '<p>Seven of the nine guide pairs lower DNMBP-AS1 RNA significantly (P values from 5e-4 to 0.04). Two (pgRNA 1 and pgRNA 7) are labelled "ns". pgRNA 7 even looks slightly higher than the control. So the method works for most, but not all, guides, which is why the library uses ten guide pairs per target.</p>',
    keyNumbers: [
      { value: 'n=3', meaning: 'the experiment was repeated three times', source: ['fig1F'] },
      { value: 'P=5e-4', meaning: 'the strongest effect (pgRNA 2)', source: ['fig1F'] },
      { value: 'ns (pgRNA 1 and 7)', meaning: 'no significant drop for these two guide pairs', source: ['fig1F'] },
    ],
    background: '<p>qRT-PCR first converts RNA into DNA, then copies that DNA so many times that its amount can be read from a fluorescent signal.</p>',
    flags: ['The legend does not say what the error bars show or which statistical test gave the P values.', 'The x axis lists pgRNAs 1–7, 9 and 10; pgRNA 8 (shown in Figure 1E) is not in this panel.'],
    chartTypes: ['F1'],
    examQ: { q: 'What does Figure 1F show, and why do 2 of the 9 guide pairs matter?', a: 'It shows DNMBP-AS1 RNA (relative to a control and normalised to GAPDH) after each guide pair; most lower the RNA significantly, but pgRNA 1 and 7 do not, so individual guide pairs can fail and each target needs several.' },
  },
});

/* ----------------------------------------------------------------------------- flashcards */
(window.CARDS = window.CARDS || []).push(
  { id: 'ex-t-tss', deck: 'terms', kind: 'background', lesson: 'B7', front: 'What is a <b>TSS</b>?', back: 'The <b>transcription start site</b>: the exact DNA position where copying of a gene into RNA begins.' },
  { id: 'ex-a-pgrna', deck: 'abbr', kind: 'paper', lesson: 'D2', source: ['res-pipeline-p1'], front: '<b>pgRNA</b> stands for …', back: '<b>p</b>aired <b>g</b>uide <b>RNA</b>: a pair of guides that lets the scissors cut twice and delete the TSS between the cuts.' },
  { id: 'ex-n-831', deck: 'numbers', kind: 'paper', lesson: 'G-res-pipeline', source: ['res-pipeline-p2'], front: 'How many expressed lncRNAs were in the final target set (and how many TSSs)?', back: '<b>831</b> lncRNAs, corresponding to <b>998</b> high-confidence TSSs.' },
  { id: 'ex-w-tss', deck: 'why', kind: 'paper', lesson: 'G-res-pipeline', source: ['res-pipeline-p1'], front: 'Why delete the <b>TSS</b> instead of the whole gene?', back: 'Deletions are uniform and shorter (more efficient), and there is less chance of false positives from removing overlapping DNA regulatory elements.' },
  { id: 'ex-f-1F', deck: 'figures', kind: 'paper', lesson: 'G-res-pipeline', img: 'fig1F', source: ['fig1F', 'res-pipeline-p5'], front: 'What does this panel show?', back: 'DNMBP-AS1 RNA after CRISPR deletion with different guide pairs: most pgRNAs lower it significantly, pgRNA 1 and 7 are "ns".' },
);

/* ----------------------------------------------------------------------------- quizzes / exams / explain / numbers / summary */
(window.QUIZZES = window.QUIZZES || []).push({
  _example: true, id: 'ex-quiz', kind: 'figure', ref: 'fig1', title: 'Figure 1 (example)', desc: 'Example shape only.',
  questions: [
    { img: 'fig1F', q: 'In Figure 1F, what does the black "Control" bar represent?',
      options: [
        { t: 'Cells with a non-targeting guide pair, set to 1.0 for comparison', ok: true, why: 'Right: every other bar is compared with this control (the legend says control = non-targeting pgRNA in Figure 1E).' },
        { t: 'Cells in which DNMBP-AS1 was completely deleted', ok: false, why: 'A full deletion would show a very low bar, not 1.0.' },
        { t: 'The housekeeping gene GAPDH', ok: false, why: 'GAPDH is used to normalise the values, but it is not drawn as a bar.' },
      ], source: ['fig1F', 'fig1E'] },
  ],
});
(window.EXAMS = window.EXAMS || []).push({
  _example: true, id: 'ex-exam', title: 'Example exam', minutes: 60, intro: 'Example shape only.',
  questions: [
    { type: 'mcq', q: 'Which of these is a benefit of deleting the TSS rather than the whole gene?', source: ['res-pipeline-p1'], points: 1, lesson: 'D2',
      options: [{ t: 'Shorter, more uniform deletions', ok: true, why: 'Right (res-pipeline-p1).' }, { t: 'It removes the need for guide RNAs', ok: false, why: 'Guide RNAs are still needed.' }, { t: 'It deletes the neighbouring genes too', ok: false, why: 'The aim is to avoid damaging nearby regulatory DNA.' }] },
    { type: 'short', q: 'Explain why the authors used ten guide pairs per target.', source: ['res-pipeline-p3', 'fig1F'], points: 3,
      model: 'Not every guide pair works: in Figure 1F two of the nine tested guide pairs did not significantly lower the RNA. Using ten guide pairs per target means that most targets are hit efficiently by at least some guides.',
      checklist: ['Says that individual guide pairs can fail', 'Cites the evidence (e.g. pgRNA 1 and 7 "ns" in Figure 1F)', 'Concludes that several guides per target make the screen more reliable'] },
  ],
});
(window.EXPLAIN = window.EXPLAIN || []).push({
  id: 'ex-explain', title: 'Why delete the TSS?', prompt: 'In your own words, explain how the authors switch a lncRNA gene off, and why they delete the TSS rather than the whole gene.',
  model: '<p>They use CRISPR scissors steered by a pair of guide RNAs to cut out the transcription start site of the gene, the spot where copying into RNA begins. Without it the gene is not expressed. Deleting just the start site gives short, uniform deletions that are more efficient and are less likely to cut out nearby DNA regulatory elements that could cause false results.</p>',
  checklist: ['Names CRISPR / paired guide RNAs as the tool', 'Says the TSS is the start of copying, so removing it silences the gene', 'Gives the efficiency reason (uniform, shorter deletions)', 'Gives the false-positive reason (overlapping regulatory elements)'],
  source: ['res-pipeline-p1'],
});
(window.NUMBERS = window.NUMBERS || []).push(
  { group: 'The library', value: '831 → 998', meaning: 'lncRNAs in the final target set → their high-confidence TSSs.', source: ['res-pipeline-p2'] },
  { group: 'The library', value: '12,000 / 1,200 / 1200', meaning: 'pgRNAs in the library (text), vs the figure labels "1,200 targets" (Fig 1A) and "1200 pgRNAs library" (Fig 1B).', conflict: true, note: 'The text says 12,000 pgRNAs (10 per target); the figure labels say 1,200 — likely a different count (targets) or a typo. Both are shown as printed.', source: ['res-pipeline-p4', 'fig1A', 'fig1B'] },
);
window.SUMMARY = window.SUMMARY || {};
