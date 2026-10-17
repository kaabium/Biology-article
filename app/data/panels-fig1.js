window.PANELS = window.PANELS || {};

/* Figure 1 (A-F) and the graphical abstract. Written item by item. */

Object.assign(window.PANELS, {

  ga: {
    short: 'The paper in one picture',
    question: 'How does the graphical abstract summarize the paper, from the screen to the two final lncRNAs?',
    howToRead: `<p>Read the two columns from top to bottom. The <b>left column</b> shows how the screen was done. The <b>right column</b> shows what it found and what the authors did next.</p>
<ul>
<li><b>CRISPR-deletion screen.</b> Two Cas9 "scissors" cut the DNA on both sides of a gene's start (the bent arrow is the TSS). The piece in between is lost, so the gene can no longer be copied into RNA.</li>
<li><b>libDECKO-NSCLC1, &gt;1000 lncRNAs.</b> The four circles are plasmids. Each one carries the guide pair for one target. Together they form the library.</li>
<li><b>Lentiviral pool.</b> The plasmids are packed into viruses, which carry them into cells.</li>
<li><b>NSCLC cells.</b> The lung with a tumor stands for the lung cancer cells that receive the library.</li>
<li><b>Multi-phenotype landscape.</b> The triangle has one corner for each hallmark that was measured: <b>Proliferation</b> (the infinity sign), <b>Cisplatin</b> (a "no" sign) and <b>Migration</b> (a crown-like icon). The small dots stand for individual lncRNAs. In the real plot (<a href="#/panel/fig4C">Figure 4C</a>) a dot sits closer to a corner when that lncRNA's effect on that hallmark is more significant. The picture here is a simplified version.</li>
<li><b>CHiLL1 and GCAWKR.</b> Two lncRNAs are left at the end. The bold letters spell out the first name: <b>C</b>ancer <b>H</b>allmark <b>i</b>n <b>L</b>ung <b>L</b>ncRNA. The picture does not explain the name "GCAWKR".</li>
<li><b>Antisense oligonucleotides treatment.</b> The ASOs (short black strands) stick to the two RNAs (green and orange). The RNAs are broken up (crossed out), and the last lung shows a smaller tumor.</li>
</ul>`,
    shows: `<p>The picture squeezes the whole paper into one path. <b>Left:</b> the authors delete the start sites of more than 1000 lncRNA targets (the picture's words) in lung cancer cells, using a library delivered by viruses. This is Figure 1 and the first Results section. <b>Top right:</b> the cells are tested for three hallmarks, and the results are combined with the paper's TPP pipeline into a "multi-phenotype landscape" (<a href="#/figure/fig2">Figure 2</a> and <a href="#/figure/fig4">Figure 4</a>). <b>Middle right:</b> the list is narrowed to two lncRNAs, CHiLL1 and GCAWKR (<a href="#/figure/fig5">Figure 5</a>). <b>Bottom right:</b> ASOs switch the two RNAs off, and in the cartoon the tumor shrinks (Figures 5 and 6).</p>
<p>The Summary says the same in words. Pooled CRISPR deletion perturbed 831 lncRNAs in KRAS-mutant NSCLC, and their contribution to proliferation, chemoresistance and migration was measured in two cell backgrounds. Combining the data gave 80 high-confidence oncogenic lncRNAs. A follow-up ASO screen shortlisted two candidates, CHiLL1 and GCAWKR, whose knockdown suppressed cancer hallmarks in two- and three-dimension tumor models.</p>
<p>What the picture leaves out: the two cell lines (A549 and H460), the control targets, the funnel (831 lncRNAs, 80 hits, then nine tested with ASOs, five that reproduced and two final), and the tests on normal lung cells.</p>`,
    keyNumbers: [
      { value: '&gt;1000 lncRNAs', meaning: 'printed under "libDECKO-NSCLC1". The Summary and Results say 831 lncRNAs (998 TSSs), and the bar in Figure 1C says 1003 targets', source: ['ga', 'summary-p1', 'res-pipeline-p2', 'fig1C'] },
      { value: '831 → 80', meaning: 'lncRNAs perturbed → high-confidence oncogenic lncRNAs (the Summary)', source: ['summary-p1'] },
      { value: '9 → 5 → 2', meaning: 'the funnel after the screens: nine lncRNAs tested with ASOs (Tier 1), five with reproducible effects (Tier 2), two final (Tier 3: CHiLL1 and GCAWKR)', source: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3'] },
      { value: '3 hallmarks', meaning: 'the three corners of the triangle: proliferation, chemoresistance (cisplatin) and invasion (migration)', source: ['intro-p6'] },
    ],
    background: `<p>An <b>antisense oligonucleotide (ASO)</b> is a short strand of nucleic acid built to stick to one chosen RNA. The cell's own enzymes (often one called RNase H) then cut up the RNA that has an ASO stuck to it, so the amount of that RNA falls. This is called <b>knockdown</b>. The cartoon shows exactly this: the black strands bind the green and orange RNAs, and the RNAs end up crossed out.</p>`,
    memory: 'Left column: how the detectives collect evidence (the screen). Right column: the suspects who are left standing, and what happens when you silence the last two.',
    flags: [
      'The lncRNA count does not match the rest of the paper. The picture says "&gt;1000 lncRNAs", the Summary and Results say 831 lncRNAs (998 TSSs), and the bar in Figure 1C says 1003. The paper does not reconcile them.',
      'The first name is written in three ways. The Results say "Cancer Hallmark in Lung LncRNA 1", the picture drops the "1", and the Summary says "Cancer Hallmarks in Lung LncRNA 1" (with an s).',
      'The triangle corners are placed differently from Figure 4C. Here Proliferation is at the top, Cisplatin at the left and Migration at the right. In Figure 4C the cisplatin symbol is at the top, proliferation at the bottom left and migration at the bottom right. A triangle can be turned around, so this is only a drawing choice, but do not let it confuse you when you compare the two.',
      'The last lung, with a smaller tumor, is a cartoon. The ASOs were tested in cells, in 3D spheroids and in patient-derived organoids, not in animals or patients. The Discussion says that delivering ASOs in a living body still needs work (<a href="#/read/discussion/discussion-p5">discussion-p5</a>). The picture also does not show that the effect was weaker in normal lung cells, which is a main reason these two lncRNAs were chosen.',
    ],
    derived: ['831', '80', '998', '1003', '1'],   // 1 = the "1" in the name "…LncRNA 1" quoted from the Summary
    chartTypes: [],
    examQ: {
      q: 'Using the graphical abstract, describe the paper in order, from the screen to the final treatment idea.',
      a: 'The authors build a CRISPR-deletion library (libDECKO-NSCLC1) that deletes the start sites of more than 1000 lncRNA targets, pack it into a lentiviral pool and deliver it to NSCLC cells. They measure proliferation, cisplatin response and migration to build a multi-phenotype landscape. Two lncRNAs, CHiLL1 and GCAWKR (Cancer Hallmark in Lung LncRNA), come out on top. Antisense oligonucleotides then destroy these two RNAs, which in the cartoon shrinks the tumor. In the paper this was shown in cells, 3D cultures and organoids, not in patients.',
    },
  },

});

Object.assign(window.PANELS, {

  fig1A: {
    short: 'The screen, step by step',
    question: 'What are the steps of the pooled CRISPR screen, from the guide library to the three tests at the end?',
    howToRead: `<p>Read the top row from left to right. Each arrow is one step, and the small drawing under each title shows what is in the dish at that moment. The wheel on the right is the final set of tests.</p>
<ul>
<li><b>Library Design.</b> Pick the DNA targets and design <b>10 guide pairs (pgRNAs) for each one</b> ("Depth: 10 pgRNAs"). In the drawing, each line with two colored ends is one guide pair: two cut sites, with the stretch between them to be deleted.</li>
<li><b>DECKO Cloning.</b> Build each guide pair into its own small DNA circle (a plasmid). The colored blobs are the guides.</li>
<li><b>Lentiviral pool.</b> Pack the plasmids into lentiviruses and mix them into one pool.</li>
<li><b>Transduction, MOI 0.3.</b> Use the virus pool to infect the cancer cells. MOI 0.3 is a low dose, so most infected cells receive just one virus, and so one guide pair.</li>
<li><b>+ Puro.</b> Puromycin is an antibiotic. It kills the cells that did not take up a plasmid (the grey cells in the drawing). Only the colored cells stay, each color a different guide pair.</li>
<li><b>Harvest cells, Coverage 1000x.</b> Keep the cells in large numbers: about 1,000 cells for each guide-pair sequence, so that no guide pair is lost by chance.</li>
</ul>
<p>The <b>wheel</b> shows what the cells are then tested for: <b>Proliferation</b> (how fast they grow), <b>Cisplatin</b> (whether they survive this chemotherapy drug) and <b>Migration</b> (whether they move through a porous membrane). The italic lines count the study: <b>2 NSCLC cell lines</b>, <b>3 phenotypes</b>, <b>5 functional assays</b>.</p>`,
    shows: `<p>Figure 1A is the one-picture version of the method. A library of guide pairs is cloned into plasmids, packed into a pool of lentiviruses and delivered, at a low dose, into lung cancer cells that already make Cas9 (<a href="#/panel/fig1D">Figure 1D</a>). Puromycin removes the cells without a plasmid. The surviving cells, kept at high coverage, are then tested for three cancer hallmarks in two NSCLC cell lines.</p>
<p>Each target is switched off by <b>deleting its TSS</b> with a pair of guides. The authors say that deleting only the start site, not the whole gene, gives shorter and more uniform deletions (which are more efficient) and lowers the chance of false positives caused by deleting overlapping DNA regulatory elements. They adapted the DECKO system to this pooled format.</p>`,
    keyNumbers: [
      { value: '10 pgRNAs', meaning: 'guide pairs for each target ("Depth"); the text also says "a depth of 10 unique pgRNAs per target"', source: ['fig1A', 'res-pipeline-p4'] },
      { value: 'MOI 0.3', meaning: 'the low virus dose used for transduction, so most infected cells carry one guide pair', source: ['fig1A'] },
      { value: 'Coverage 1000x', meaning: 'about 1,000 cells for each unique guide-pair sequence; the Methods define coverage as the number of cells divided by the number of unique library sequences', source: ['fig1A', 'm-screen-prolif-p1'] },
      { value: '2 · 3 · 5', meaning: '2 NSCLC cell lines (A549 and H460), 3 phenotypes (proliferation, cisplatin, migration) and 5 functional assays (not listed next to the panel)', source: ['fig1A', 'res-pipeline-p5'] },
      { value: '1,200 targets', meaning: 'printed in the panel; it does not match the other target counts in the paper (see the flag below)', source: ['fig1A', 'res-pipeline-p2', 'res-pipeline-p4'] },
    ],
    background: `<p><b>Why this design?</b> Testing a thousand targets one dish at a time would take far too long. So all the guide pairs go into one big batch of cells (a <b>pooled screen</b>), and afterwards you read which guide pairs became more or less common. This only works if each cell carries <b>one</b> guide pair. That is why the virus dose is low (if a cell got several viruses, you could not tell which deletion caused a change) and why puromycin removes cells with no plasmid (they would only dilute the result). High <b>coverage</b> matters because a guide pair carried by only a few cells could vanish by chance, and that loss would look like a real effect.</p>`,
    memory: 'Picture a race in which every runner wears a different bib number (one guide pair per cell). Afterwards you do not need to watch the race: you just count which bib numbers have become rare. (A real screen reads the "bib numbers" by sequencing.)',
    flags: [
      'The label says "1,200 targets (Depth: 10 pgRNAs)". The Results text counts 831 lncRNAs, corresponding to 998 TSSs, and says the library has 12,000 pgRNAs with 10 per target. Figure 1B prints "1200 pgRNAs library", and the bar in Figure 1C says 1003. The paper does not explain these differences. The <a href="#/panel/fig1C">Figure 1C guide</a> works through the arithmetic.',
      '"5 Functional assays" is not defined next to this panel. The Introduction speaks of eight screens (<a href="#/read/intro/intro-p6">intro-p6</a>). The Figure 2 legends describe five screen formats (dropout and CFSE for proliferation, survival and death for cisplatin, and migration), which may be what the "5" means, but the paper does not say so.',
      'The legend is a single line. It does not explain the wheel, the symbols, MOI, "+ Puro" or "Coverage". Some steps are not drawn: the cells already make Cas9 (Figure 1D), and the sequencing that reads which guide pairs are present is missing.',
    ],
    derived: ['831', '998', '12000', '1003'],
    chartTypes: [],
    examQ: {
      q: 'Walk through Figure 1A. What happens between "Library Design" and the three phenotype tests, and why are the cells infected at a low MOI and then treated with puromycin?',
      a: 'Ten guide pairs (pgRNAs) per target are designed, cloned into DECKO plasmids, packed into a lentiviral pool and used to transduce the cells at MOI 0.3. The low dose means most infected cells receive just one virus, so each cell carries one deletion. Puromycin then kills the cells that got no plasmid. The cells are harvested at 1000x coverage, so every guide pair is well represented, and they are tested for proliferation, cisplatin survival and migration in two NSCLC cell lines.',
    },
  },

});

Object.assign(window.PANELS, {

  fig1B: {
    short: 'Choosing the targets',
    question: 'How did the authors choose which lncRNA start sites to delete, and how many guide pairs did each one get?',
    howToRead: `<p>This is a <b>flow chart</b>. Solid arrows are the main path, from top to bottom. Dashed arrows point sideways: to a filter that throws things out, or to a piece of evidence that is used on the way.</p>
<ul>
<li><b>Four catalogs.</b> Three published lists of known RNAs (GENCODE, BigTranscriptome, FANTOM5) and the authors' own "A549 novel assembly", built from RNA sequencing of A549 cells, are merged into one <b>Merged Assembly</b>.</li>
<li><b>Filter 1, distance.</b> The dashed arrow marked <b>&lt;2kb</b> points to "TSS close to protein coding exon". Start sites closer than 2 kb to a protein-coding exon are removed.</li>
<li><b>Filter 2, expression.</b> The dashed arrow marked <b>&lt;0.1FPKM</b> points to "Low expression". RNAs that A549 cells make at less than 0.1 FPKM (measured in the "A549 RNAseq" data) are removed.</li>
<li><b>Clustered TSSs.</b> Start sites closer together than 300 bp are grouped into one target.</li>
<li><b>Evidence.</b> Three clues that a real, active start site sits there (<b>CAGE</b>, <b>ChromHMM</b> and <b>DNase I hypersensitivity</b>) are used to select the start sites.</li>
<li><b>998 Candidates, then CRISPETa.</b> This design software makes <b>10 guide-pair designs for every candidate</b> ("Depth:10 pgRNAs"). The little plate at the bottom stands for the finished library.</li>
</ul>
<p>The <b>sketch at the bottom left</b> shows the rules on a map. Green is a protein-coding gene. Blue shows four versions of a lncRNA: the boxes are exons and each bent arrow is a TSS. The red arrow marked <b>&gt;2 Kb</b> is the minimum gap to the protein-coding gene. The light-blue stripe, with the black <b>TSS target region</b> bar above it, covers three TSSs that lie close together and become one target. The fourth TSS lies outside it.</p>`,
    shows: `<p>The chart is a funnel. Four gene catalogs go in at the top and <b>998 candidate start sites</b> come out at the bottom. The text puts it this way: "a final target set of 831 expressed lncRNAs, corresponding to 998 high-confidence TSSs". The distance filter is there, the authors say, to avoid false positives from unintended off-targeting. Candidates with bidirectional promoters or overlapping TSSs were merged into a single TSS.</p>
<p>The legend says the candidates were "selected based on" the three evidence sources. The Methods add how: candidate start-site clusters were prioritized by the number of evidence sources behind them (<a href="#/read/m-library-design/m-library-design-p2">m-library-design-p2</a>). Last, CRISPETa designed 10 pgRNAs for every candidate.</p>`,
    keyNumbers: [
      { value: '&lt;2 kb', meaning: 'start sites closer than this to a protein-coding exon are excluded (to avoid false positives from unintended off-targeting)', source: ['fig1B', 'res-pipeline-p2'] },
      { value: '&lt;0.1 FPKM', meaning: 'RNAs expressed below this level in A549 cells are excluded', source: ['fig1B'] },
      { value: '300 bp', meaning: 'start sites closer together than this are clustered into one target region', source: ['fig1B', 'm-library-design-p2'] },
      { value: '998 Candidates', meaning: 'high-confidence TSS targets (the text: 831 expressed lncRNAs, corresponding to 998 TSSs)', source: ['fig1B', 'res-pipeline-p2'] },
      { value: '10 pgRNAs', meaning: 'guide-pair designs for each candidate, made with CRISPETa', source: ['fig1B'] },
      { value: '1200 pgRNAs library', meaning: 'printed in the panel, but the text says the library has 12,000 pgRNAs. Figure 1A says "1,200 targets" with 10 pgRNAs each, and 1,200 × 10 = 12,000, so the label may have lost a zero (my reading, not stated in the paper)', source: ['fig1B', 'fig1A', 'res-pipeline-p4'] },
    ],
    background: `<p><b>Annotation</b> means a catalog that says where genes are on the DNA and where each RNA starts and ends. Different catalogs list different lncRNAs, so merging them gives the widest list. <b>FPKM</b> is a unit for how much RNA a gene makes (it corrects for gene length and for how deeply the sample was sequenced); 0.1 is very low. The three kinds of evidence each point to a real start site. <b>CAGE</b> catches the very first letters of RNAs. <b>ChromHMM</b> is a computer program that labels each stretch of DNA with a "state", such as "active TSS". <b>DNase I hypersensitivity</b> marks open stretches of DNA that proteins can reach. A start site backed by more of them is more likely to be real.</p>`,
    memory: 'A funnel with filters: many candidates go in at the top, and only the start sites that pass every filter come out at the bottom.',
    flags: [
      'The label under CRISPETa says "1200 pgRNAs library including controls", but the Results text gives a much larger pgRNA total for the library (see the last key number).',
      'The black bar in the sketch is labelled ">300bp", while the legend says that start sites "closer than 300 bp" are clustered. The panel does not say what the label measures.',
      'The legend does not say how many candidates remain after each filter, so you cannot follow the numbers down the funnel. The text cites Figure S1A for the annotation step; it is a supplementary figure and is not in your PDF.',
      'Names differ a little: the panel says "FANTOM5", while the Methods list "FANTOM CAT" and write "BIGTranscriptome" in capitals (<a href="#/read/m-library-design/m-library-design-p1">m-library-design-p1</a>).',
    ],
    chartTypes: [],
    examQ: {
      q: 'Describe the filters in Figure 1B that turn four gene catalogs into the guide-pair library. Give the cutoff for each filter.',
      a: 'The catalogs are merged. Start sites closer than 2 kb to a protein-coding exon are removed (to avoid false positives from unintended off-targeting). RNAs expressed below 0.1 FPKM in A549 cells are removed. Start sites closer than 300 bp are clustered into one target region, and CAGE, ChromHMM and DNase I hypersensitivity are the evidence used to select start sites. That leaves 998 candidates, and CRISPETa designs 10 pgRNAs for each one.',
    },
  },

});
