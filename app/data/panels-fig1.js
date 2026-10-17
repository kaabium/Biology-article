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

Object.assign(window.PANELS, {

  fig1C: {
    short: 'What is in the library',
    question: 'How many targets are in the library, and which control targets were added?',
    howToRead: `<p>This is a <b>stacked bar chart</b>. The y axis ("Targets count") counts targeted regions. The <b>lncRNAs</b> bar is the real targets. The <b>Control</b> bar is piled up from colored parts, and the number on each part is how many targets it holds. It is a plain count, so there are no error bars or P values.</p>
<ul>
<li><b>Candidates</b> (bright blue): the lncRNA start sites to be tested.</li>
<li><b>Neutral controls</b> (the greys: Intergenic regions, Introns PC genes, AAVS1): places where a deletion should change nothing. They show what "no effect" looks like. ("PC genes" means protein-coding genes.)</li>
<li><b>Positive controls</b> (khaki and reds: Growth repressors, Growth activators, Cisplatin sensitivity): protein-coding genes with known roles in cell growth and cisplatin resistance. They show that the screen can detect a real effect.</li>
</ul>
<p>The legend does not use the words "neutral" and "positive"; this grouping follows the text (<a href="#/read/res-pipeline/res-pipeline-p3">res-pipeline-p3</a>).</p>`,
    shows: `<p>The lncRNA bar has one part: <b>1003 Candidates</b>. The Control bar is much shorter. From top to bottom it holds <b>62</b> intergenic regions, <b>25</b> introns of protein-coding genes, <b>1</b> AAVS1, <b>70</b> growth repressors, <b>31</b> growth activators and <b>78</b> cisplatin-sensitivity genes. They add up to <b>267</b> (my sum; the figure does not print it). The legend notes that some lncRNA loci are targeted at more than one start site, so the number of targets is larger than the number of lncRNAs (the text: 831 expressed lncRNAs, corresponding to 998 high-confidence TSSs).</p>`,
    keyNumbers: [
      { value: '1003', meaning: 'Candidates: lncRNA targets in the blue bar (the text counts 998 high-confidence TSSs for 831 lncRNAs)', source: ['fig1C', 'res-pipeline-p2'] },
      { value: '62 · 25 · 1', meaning: 'neutral controls: intergenic regions · introns of protein-coding genes · AAVS1', source: ['fig1C'] },
      { value: '70 · 31 · 78', meaning: 'positive controls: growth repressors · growth activators · cisplatin sensitivity', source: ['fig1C'] },
      { value: '12,000 pgRNAs', meaning: 'the whole library: 10 unique pgRNAs for each target', source: ['fig1C', 'res-pipeline-p4'] },
      { value: '998 + 203 ≈ 1,200', meaning: 'my arithmetic, not the paper\'s. The Methods list 10 AAVS1, 65 intergenic and 25 intronic regions plus 53 positive and 50 negative protein-coding controls, which is 203. Added to the 998 candidates this gives about 1,200 targets (as in Figure 1A), or 12,000 pgRNAs at 10 each. The bars here add up to 1003 + 267 = 1,270, which does not fit', source: ['fig1C', 'fig1A', 'm-library-design-p3', 'res-pipeline-p2', 'res-pipeline-p4'], derived: ['203', '267', '1270'] },
    ],
    background: `<p>A <b>stacked bar</b> cuts one bar into parts that add up to its height, so you see both the total and what it is made of. <b>AAVS1</b> is a spot in the human genome that is widely used as a "safe" place to cut, so guides aimed there make a common neutral control.</p>`,
    memory: 'Neutral controls are the blank sample ("nothing should happen"). Positive controls are the sample with a known answer ("something should happen"). A test is only fair with both.',
    flags: [
      'The legend does not define the colors beyond the names in the key. It does not say which groups are neutral or positive, what "Introns PC genes" or "Cisplatin sensitivity" mean, or how the control genes were chosen.',
      'The blue bar says 1003, but the text says the final target set has 998 high-confidence TSSs. The paper does not explain the difference.',
      'The control counts differ from the Methods, which list 10 AAVS1, 65 intergenic and 25 intronic regions and 53 positive and 50 negative protein-coding controls (<a href="#/read/m-library-design/m-library-design-p3">m-library-design-p3</a>). The bars show, for example, 1 AAVS1, 62 intergenic regions and 31 growth activators. The Results mention yet another count, 109 positive controls (<a href="#/read/res-multipheno/res-multipheno-p6">res-multipheno-p6</a>). The paper does not reconcile these.',
    ],
    derived: ['65', '53', '50', '109', '267'],   // 65/53/50/109 = counts quoted from the Methods and Results for comparison; 267 = my sum of the six control segments
    chartTypes: ['F2'],
    examQ: {
      q: 'What control targets are in the library (Figure 1C), and why does a pooled screen need them?',
      a: 'The Control bar holds neutral controls (intergenic regions, introns of protein-coding genes, AAVS1), where deleting DNA should change nothing, and positive controls (growth repressors, growth activators, cisplatin-sensitivity genes), which have known effects. Neutral controls show what "no effect" looks like; positive controls show that the screen can detect a real effect. The lncRNA candidates (1003 targets) are judged against both.',
    },
  },

  fig1D: {
    short: 'Sorting the Cas9 cells',
    question: 'Do the A549 cells make Cas9, and which cells were collected for the screens?',
    howToRead: `<p>This is a <b>flow cytometry</b> dot plot. A machine measured the cells one by one, and each dot is one cell.</p>
<ul>
<li><b>x axis, "Pacific Blue":</b> how brightly a cell glows blue (the blue of BFP). The scale is <b>logarithmic</b>: each tick (10⁰ to 10⁴) is ten times brighter than the one before.</li>
<li><b>y axis, "FSC-A":</b> forward scatter, a rough measure of cell size (0 to 250K). Here it mostly spreads the dots out.</li>
<li><b>Colors:</b> blue dots are a thin crowd; green, yellow and red are denser (red is the most crowded).</li>
<li><b>Cartoon:</b> a plasmid carrying both Cas9 and BFP. A cell that takes it up makes both, so a blue glow means the cell also has Cas9.</li>
<li><b>Black box (the "gate") and 75.7%:</b> the bright-blue cells inside the box are the ones collected for the screens.</li>
</ul>
<p>What you want to see: a clear group of cells far to the right, with most cells inside the box.</p>`,
    shows: `<p>A549 lung cancer cells that carry Cas9 together with BFP. Most cells glow strongly blue and sit in a dense crowd inside the black box (75.7% is printed above it). A smaller, dimmer group lies just left of the box. The legend says the boxes mark the cells that were sorted and used in the screens, so the screened cells could be expected to make Cas9. The text says these are non-clonal cell lines that "stably express high levels of Cas9 protein, as evidenced by" BFP. Both A549 and H460 were made this way; this panel shows A549 only.</p>`,
    keyNumbers: [
      { value: '75.7%', meaning: 'printed above the black box; presumably the share of cells inside it (the legend does not say)', source: ['fig1D'] },
      { value: '10⁰ to 10⁴', meaning: 'the logarithmic Pacific Blue (BFP) scale: each tick is ten times the one before', source: ['fig1D'] },
      { value: '0 to 250K', meaning: 'the FSC-A (forward scatter) scale; no units are given', source: ['fig1D'] },
      { value: 'A549 and H460', meaning: 'the two KRAS+ NSCLC cell lines made to express Cas9; only A549 is plotted here', source: ['res-pipeline-p5'] },
    ],
    background: `<p><b>Flow cytometry</b> sends cells one by one past a laser and records how much light each cell scatters and how brightly it glows. <b>FACS</b> adds a sorter that can put chosen cells into a tube. A <b>gate</b> is the box you draw around the cells you want. BFP glows blue under violet light, and the detector called "Pacific Blue" picks up that light. <b>Why sort on BFP?</b> CRISPR deletion only works in cells that make Cas9. Keeping the bright-blue cells keeps the cells that really have it. The others would carry guides that do nothing and could hide real hits.</p>`,
    memory: 'BFP is the name badge that Cas9-carrying cells wear. The FACS machine is the doorman who lets in only the cells with a badge.',
    flags: [
      'The legend says "Boxes" (plural), but only one box is drawn. Only A549 is shown. The text also cites Figure S1E for this step (a supplementary figure, not in your PDF).',
      'The legend does not say what the 75.7% is, or whether the plot was taken before or after sorting. The Methods describe two rounds of sorting (<a href="#/read/m-lentivirus/m-lentivirus-p2">m-lentivirus-p2</a>).',
      'No units are given for either axis, the number of cells is not stated, and no ordinary A549 sample without BFP is shown for comparison.',
    ],
    chartTypes: ['F3'],
    examQ: {
      q: 'In Figure 1D, what does the black box mark, and why were the cells sorted on BFP before the screens?',
      a: 'The box is a gate around cells with a strong blue (BFP) signal; 75.7% is printed above it. BFP is made together with Cas9, so bright-blue cells are cells that stably express Cas9. CRISPR deletion only works in cells that have Cas9, so the screens used the sorted cells.',
    },
  },

  fig1E: {
    short: 'Checking one deletion',
    question: 'Does a guide pair really delete the start region of DNMBP-AS1, and how can you see it?',
    howToRead: `<p><b>Top: the gene map</b> (a genome-browser view). Left to right runs along the DNA. The scale bar is 2 kb and "hg19" is the genome version.</p>
<ul>
<li><b>Primers:</b> F and R mark where the two PCR primers bind, one on each side of the target.</li>
<li><b>GENCODE v19:</b> known genes. DNMBP (arrowheads pointing left) is protein-coding. <b>DNMBP-AS1</b>, the lncRNA tested (green boxes are exons, arrowheads point right), lies on the opposite strand. The bent arrow is its <b>TSS</b>.</li>
<li><b>Target region:</b> the black part is the TSS target region.</li>
<li><b>pgRNAs:</b> the ten red bars (1 to 10) are the ten guide pairs designed for this target. Each bar runs from one guide's cut site to the other's, so the DNA between them is deleted.</li>
</ul>
<p><b>Bottom: the gel.</b> The PCR used primers F and R, and the gel sorts the DNA pieces by size (short pieces run farther). The left lane is a <b>size ladder</b> (10kb, 3kb, 1kb, 250bp). Then come <b>pgRNA_9</b> (cells given guide pair 9), <b>Control</b> (a non-targeting guide pair) and <b>H₂O</b> (water, no DNA).</p>
<ul>
<li><b>2.5kb band ("WT"):</b> intact DNA. It is long because F and R are far apart.</li>
<li><b>500bp band ("KO"):</b> DNA that lost the piece between the cuts. F and R are now close, so the product is short.</li>
</ul>
<p>The drawing on the right shows the same idea. What you want to see: only the long band in Control, a new short band in the pgRNA_9 lane, and nothing in the water lane.</p>`,
    shows: `<p>DNMBP-AS1 is a known lung-cancer lncRNA (library candidate 331) that the authors used to test the method. In the gel, cells given guide pair 9 show a short band at about 500bp, the size expected after deletion, and the control lacks it. The long 2.5kb band is strong in the control and weaker, but still there, in the pgRNA_9 lane, so not every copy of the DNA was edited. The water lane is empty. The text says targeting DNMBP-AS1 "resulted in the deletion of its promoter region and loss of expression" (with Figure 1F), and that 12 more pgRNAs aimed at 12 other candidates gave the expected deletion in 10 of 12 cases.</p>`,
    keyNumbers: [
      { value: '2.5kb', meaning: 'expected size of the intact ("WT") PCR product', source: ['fig1E'] },
      { value: '500bp', meaning: 'expected size of the product after deletion ("KO")', source: ['fig1E'] },
      { value: 'pgRNA 1–10', meaning: 'the ten guide pairs designed for this target; only pgRNA_9 is run on the gel', source: ['fig1E'] },
      { value: 'candidate 331', meaning: 'the library number of DNMBP-AS1', source: ['res-pipeline-p5'] },
      { value: '10/12', meaning: 'in a separate test of 12 other pgRNAs, the expected deletion was seen in 10 of 12 cases (RNA fell as expected in 7 of 12; Figure S3A, not in your PDF)', source: ['res-pipeline-p5'] },
    ],
    background: `<p><b>PCR</b> copies the stretch of DNA between two primers many times over so you can see it. Far-apart primers give a long product. If a piece between them was cut out, the product is short. That is why "PCR across the deletion" is a simple check of an edit. In <b>gel electrophoresis</b> an electric current pulls DNA through a slab of jelly. Short pieces move farther, and the ladder (pieces of known size) lets you read sizes. A <b>genome-browser</b> view lines up genes, guides and primers along one stretch of DNA.</p>`,
    memory: 'Measure the rope between two posts (the primers). Cut a piece out and tie the ends, and the rope between the posts is shorter. The gel is the tape measure.',
    flags: [
      'The legend says the cells were "transfected" with the guide pairs, but the Methods call them "pDECKO-transduced" (<a href="#/read/m-pcr-gdna/m-pcr-gdna-p1">m-pcr-gdna-p1</a>). The paper does not explain the two words.',
      'The gel shows one guide pair in one run. The legend gives no number of repeats and no estimate of how many cells were edited. The control band is much stronger than the pgRNA_9 band, so do not compare band brightness between lanes. Because a 2.5kb band remains, "KO" here means the deletion product, not a pure knockout.',
      'The legend only calls the pgRNAs "red bars"; reading their ends as cut sites is my reading of the drawing. It also does not explain the green parts of the "Target region" bar or the light-blue part of the drawing.',
    ],
    chartTypes: ['F3'],
    examQ: {
      q: 'Explain the gel in Figure 1E. What do the 2.5kb and 500bp bands mean, and why are there Control and H2O lanes?',
      a: 'Primers F and R flank the target, so the PCR product is 2.5kb if the DNA is intact (WT) and 500bp if the region between the two cuts was deleted (KO). Control cells (non-targeting pgRNA) show only the 2.5kb band. The pgRNA_9 lane also shows the 500bp band, so guide pair 9 deletes the DNMBP-AS1 TSS region. A weaker 2.5kb band remains, so editing is incomplete. The water lane is empty, so the reagents were not contaminated.',
    },
  },

  fig1F: {
    short: 'Does deletion lower the RNA?',
    question: 'After the start site of DNMBP-AS1 is deleted with each of nine guide pairs, how much of its RNA is left?',
    howToRead: `<p>This is a <b>bar chart</b> with error bars. Each bar is the amount of DNMBP-AS1 RNA in A549 cells given one guide pair (pgRNA 1 to 10 on the x axis). It was measured by RT-qPCR, which counts RNA copies, and divided by the amount of GAPDH, a gene that stays active at a steady level ("Normalised to GAPDH"). That division corrects for differences in how much material went into each sample.</p>
<ul>
<li><b>Black Control bar:</b> the reference, about 1.0 (no change). A bar below it means less DNMBP-AS1 RNA, the hoped-for result.</li>
<li><b>Whiskers:</b> error bars show how much the repeats varied; n=3 is printed on the panel.</li>
<li><b>Labels above the bars:</b> a comparison with the control. <b>P=…</b> is a P value (small means a difference this big is unlikely by chance). <b>ns</b> means not significant.</li>
<li><b>Broken y axis</b> (slanted marks between 1.0 and 2.2): the top part is squeezed so that the very long error bar of pgRNA 7 fits.</li>
</ul>
<p>What you want to see: most bars far below the control, with small P values.</p>`,
    shows: `<p>Seven of the nine guide pairs lower DNMBP-AS1 RNA significantly: pgRNAs 2, 3, 4, 5, 6, 9 and 10, with P values from 5e-4 (pgRNA 2, the strongest effect) to 0.04. Two are labelled <b>ns</b>. pgRNA 1 has a bar at about half the control, but a very long error bar, so its repeats varied widely. pgRNA 7 sits slightly above the control. So the method works for most guide pairs, but not all. This is the usual reason for giving every target several guide pairs (10 here); the paper does not spell that out next to the panel.</p>`,
    keyNumbers: [
      { value: 'n=3', meaning: 'repeats printed on the panel (the legend does not say whether they are biological or technical)', source: ['fig1F'] },
      { value: 'P=5e-4', meaning: 'the smallest P value, for pgRNA 2: the strongest and most convincing drop', source: ['fig1F'] },
      { value: 'P=0.04', meaning: 'the largest P value among the significant bars (pgRNA 10); the Methods set p ≤ 0.05 as the default cutoff', source: ['fig1F', 'm-quant-p3'] },
      { value: 'ns · pgRNA 1 and 7', meaning: 'no significant change from the control for these two guide pairs', source: ['fig1F'] },
      { value: '7 of 9', meaning: 'guide pairs with a significant drop (my count from the labels)', source: ['fig1F'] },
      { value: '10/12 and 7/12', meaning: 'a separate test of 12 other pgRNAs: the expected deletion was seen in 10 and the expected RNA decrease in 7 (Figure S3A, not in your PDF)', source: ['res-pipeline-p5'] },
    ],
    background: `<p><b>RT-qPCR</b> first turns RNA into DNA (the "RT", or reverse transcription, step). It then copies that DNA again and again while a dye lights up in proportion to how much DNA there is. The sooner the light appears, the more RNA you started with. <b>Normalizing</b> to a housekeeping gene such as GAPDH corrects for how much material went into each tube, and showing results relative to a control makes 1.0 mean "no change".</p>`,
    memory: 'Read the chart as "how much RNA is left": the shorter a bar is next to the black control, the better that guide pair worked.',
    flags: [
      'The legend is one sentence. It does not say what the error bars show (for example SD or SEM), which test gave the P values, what the control is (in Figure 1E it is a non-targeting pgRNA), whether n=3 means biological or technical repeats, or whether the P values are corrected for comparing many guide pairs.',
      'The y axis says the values are normalized to GAPDH, but the Methods say HPRT1 was the internal control for RT-qPCR (<a href="#/read/m-qpcr/m-qpcr-p1">m-qpcr-p1</a>). The paper does not say whether this panel is an exception.',
      'The x axis lists pgRNAs 1 to 7, 9 and 10. pgRNA 8 is on the map in Figure 1E but is missing here, and the legend does not say why.',
      'The text says the deletion led to "loss of expression" (<a href="#/read/res-pipeline/res-pipeline-p5">res-pipeline-p5</a>). Here the RNA is lowered, not gone, and not for every guide pair: pgRNA 1 is "ns" despite a bar at about half the control, and pgRNA 7 looks slightly higher than the control.',
    ],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: 'What does Figure 1F show, and why does it matter that two of the nine guide pairs are "ns"?',
      a: 'It shows DNMBP-AS1 RNA in A549 cells after CRISPR deletion with nine different guide pairs, measured by RT-qPCR, normalized to GAPDH and compared with a control (n=3). Seven guide pairs lower the RNA significantly (P from 5e-4 to 0.04); pgRNA 1 and 7 do not. So single guide pairs can fail, which is why a target needs several.',
    },
  },

});
