/* Figure 5 (panels A-H): panel guides. Numbers marked "by eye" in the text are my own readings of bars/curves
   (listed in `derived`); everything else is printed in the legend, FIGTEXT or the citing paragraphs. */
Object.assign((window.PANELS = window.PANELS || {}), {

/* ------------------------------------------------------------------------------------------ 5A */
fig5A: {
  short: 'Which ASOs hurt which cells?',
  question: 'When each candidate lncRNA is turned down with two different ASOs, do lung cancer cells become less viable (with or without cisplatin) while normal lung cells are spared?',
  howToRead: `<p>Each row is one candidate lncRNA (the plain numbers are library candidate numbers, not data). Each column is one ASO in one cell line; ASO1 and ASO2 are two different sequences against the same lncRNA. The cancer lines (pink: A549, H460, H441) have two ASO-alone columns (yellow, proliferation) and three columns with cisplatin (teal): the non-targeting "ASO control", ASO1 and ASO2. The normal lung lines (green) have only the two ASO-alone columns.</p>
<p>Colour is the mean log2 fold change in viability against the non-targeting control ASO: white = no change, blue = fewer living cells (darker = bigger drop; −1 is half as many), light orange = slightly more. No numbers are printed, so you judge the shade.</p>
<ul>
<li><b>Two ASOs per lncRNA:</b> if two different sequences give the same drop, the effect is more likely on-target.</li>
<li><b>MALAT1</b> (bottom row) is the positive control: its knockdown is expected to lower viability. Grey squares have no value (the legend does not say why).</li>
<li><b>Cisplatin columns:</b> cisplatin alone also lowers viability, so compare ASO + cisplatin with the "ASO control" square beside it.</li>
<li><b>Normal cells</b> test for harm to healthy tissue; <b>three cancer lines</b> test how general the effect is.</li>
<li><b>Tier lines</b> (1, 2, 3) are the selection funnel: nine candidates, then five (CHiLL1, GCAWKR, 215, 507, 205) with reproducible loss of proliferation with two ASOs, then two (CHiLL1, GCAWKR). Only the five rows are shown in the other blocks.</li>
<li><b>Left sketch:</b> the same ASO-treated cells are checked twice: knock-down (did the ASO lower its target RNA?) and viability.</li>
</ul>
<p>A good target: blue for both ASOs in the cancer lines, pale or white in the normal cells.</p>`,
  shows: `<p>The five Tier 2 rows are blue (pale to medium) for both ASOs in the cancer lines and darker with cisplatin; for CHiLL1 and GCAWKR the ASO + cisplatin squares are darker than the "ASO control" square in all three lines. The darkest square is candidate 215 with ASO2 + cisplatin in H460. The other Tier 1 rows (311, 509, 408, 316) are much paler, and the paper names 408 and 316 as likely false positives. Normal cells show "diminished or absent response, particularly for the first two candidate lncRNAs", so CHiLL1 and GCAWKR became Tier 3. The MALAT1 positive control is only pale blue.</p>`,
  keyNumbers: [
    { value: '831 → 80 → 9 → 5 → 2', meaning: 'the funnel: lncRNAs screened → high-confidence hits → Tier 1 (nine) → Tier 2 (five) → Tier 3 (CHiLL1 and GCAWKR). This panel covers the last three steps.', source: ['summary-p1', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3'] },
    { value: '2 ASOs per lncRNA', meaning: 'ASO1 and ASO2 are independent sequences; agreement between them makes an on-target effect more likely.', source: ['fig5A', 'res-aso-p2'] },
    { value: '−5 … 0 … 1', meaning: 'the Log2FC colour scale: 0 = same viability as the control ASO, −1 = half, −5 = a very large drop, positive = more viable.', source: ['fig5A'] },
    { value: '≥40%', meaning: 'knockdown potency reached by at least two independent ASOs per candidate (measured in a supplementary figure, not in this panel).', source: ['res-aso-p1'] },
    { value: '408 and 316', meaning: 'Tier 1 candidates the paper calls likely false positives after ASO validation.', source: ['limitations-p1', 'fig5A'] },
    { value: '25 nM vs 10 nM', meaning: 'ASO dose in the Methods: 25 nM for A549, H460, H441 and MRC5-CV1; 10 nM for HBEC3-KT and CCD-16LU.', source: ['m-aso-p1'] },
  ],
  background: `<p>A log2 fold change compares two amounts on a doubling scale: 0 = no change, −1 = half as much as the control, −2 = a quarter, +1 = twice as much. Logs put "half" and "double" the same distance from zero, so one colour bar can show drops and rises.</p>`,
  memory: `Read it like a weather map: you do not read every number, you look for the cold (blue) patches. Unlike a weather map, the colour shows change against a control, not an absolute value.`,
  flags: [
    `The legend does not say how the cisplatin columns were normalized or what the "ASO control" column is. That column is coloured (not white), so it is probably the control ASO plus cisplatin compared with the control ASO without cisplatin, i.e. the effect of cisplatin alone. It is also not the same in every row (in H460 it is darker for 215, 507 and 205 than for CHiLL1 and GCAWKR), and the legend does not explain why.`,
    `Missing from the legend: what the grey squares mean, the cisplatin dose, the time point and assay behind "viability", and any error bars or P values. It gives only "n > 2" (more than two replicates). The knock-down measurements are not in this panel.`,
    `The text says the Tier 2 ASOs gave "similar results" in H460 and H441, but in H460 several ASO-alone squares are very pale (candidate 507 is almost white) and much of the H460 cisplatin colour comes from cisplatin alone. Treat "similar" as a broad summary.`,
    `Name mismatch: the figure and the Methods call the first normal line "CCD-16Lu", but the Results text (res-aso-p3) writes "CCD-12Lu"; probably a typo in the text.`,
    `The ASO dose is not in the legend. The Methods (m-aso-p1) give 25 nM for A549, H460, H441 and MRC5-CV1 but 10 nM for HBEC3-KT and CCD-16LU, so a weaker response in two of the three normal lines could partly reflect a lower dose; the paper does not discuss this.`,
  ],
  derived: ['25', '10'],
  chartTypes: ['F2'],
  examQ: {
    q: 'Figure 5A narrows nine candidate lncRNAs (Tier 1) to five (Tier 2) and then to two (Tier 3). Which features of the heatmap support each step, and why are normal lung cells included?',
    a: 'Tier 2: CHiLL1, GCAWKR, 215, 507 and 205 are blue for both ASO1 and ASO2 (reproducible with two sequences) and also in H460 and H441; the other Tier 1 rows (311, 509, 408, 316) are much paler, and 408 and 316 are named as likely false positives. Tier 3: normal lung cells (CCD-16Lu, MRC5-CV1, HBEC3-KT) show a diminished or absent response, especially to CHiLL1 and GCAWKR, so these two look selective for cancer cells. Normal cells are included because a therapy should spare healthy tissue.',
  },
},

/* ------------------------------------------------------------------------------------------ 5B */
fig5B: {
  short: 'Higher in tumors than normal',
  question: 'Are four of the Tier 2 lncRNAs more strongly expressed in lung adenocarcinoma tumors than in normal samples in the public TCGA data?',
  howToRead: `<p>Four small bar charts: CHiLL1, GCAWKR and candidates 507 and 205 (LINC00910 and LINC00115 per the legend). In each, the green bar is lung adenocarcinoma tumors (LUAD, 513 samples) and the grey bar is normal samples (59 samples) from TCGA RNA-seq. Height is expression on a "Log2 (FPKM + 1)" axis: FPKM counts RNA reads fairly (corrected for gene length and sequencing depth), "+ 1" lets a zero be logged, and 0 means not detected. The axis is already a log scale, so a bar twice as tall is not twice the RNA. Four stars mean p &lt; 0.0001 (Student's t test).</p>
<p>Why check? A cancer-promoting gene should be more active in tumors than in normal tissue, and the authors note this was not a selection criterion, so it is independent support. A good result: green clearly taller than grey. Each chart has its own y axis (CHiLL1's stops near 0.4, the others a little above 0.6), so do not compare bar heights between charts.</p>`,
  shows: `<p>All four tumor bars are taller than the normal bars and carry four stars. The gap is clearest for CHiLL1, GCAWKR and 205 and smallest for 507. So lncRNAs found in a dish screen are also more active in patient tumors, as expected for cancer-promoting genes. Candidate 215, the fifth Tier 2 gene, is missing: the legend says TCGA had no data for it.</p>`,
  keyNumbers: [
    { value: '513 vs 59', meaning: 'LUAD tumor samples vs normal samples in the TCGA RNA-seq data', source: ['fig5B'] },
    { value: '**** (p &lt; 0.0001)', meaning: 'Student\'s t test, LUAD vs normal, shown in all four charts', source: ['fig5B'] },
    { value: 'Log2 (FPKM + 1)', meaning: 'the y axis: expression on a log2 scale; 0 means not detected', source: ['fig5B'] },
    { value: '4 of 5', meaning: 'Tier 2 lncRNAs plotted; no TCGA data for candidate 215', source: ['fig5B', 'res-aso-p2'] },
  ],
  background: `<p>TCGA (The Cancer Genome Atlas) is a public collection of tumor and normal samples with their RNA-seq data. "LUAD" is lung adenocarcinoma, one common type of non-small cell lung cancer.</p>`,
  flags: [
    `The legend does not say what the bar heights are (means? medians?), what the tiny error bars show, which tissue "normal" is, or whether the t test was one- or two-tailed. Four stars say a difference is unlikely to be chance, not that it is large: with 513 versus 59 samples even a modest gap can earn them (candidate 507's gap is the smallest).`,
    `The legend says no TCGA data were available for candidate 215, yet Figure 5H shows candidate 215 in 4% of TCGA tumors. The paper does not explain this; the two panels may use different TCGA data, but that is only a guess.`,
    `The text says Tier 2 lncRNAs are overexpressed "in NSCLC tumors", but this panel shows lung adenocarcinoma only (one type of NSCLC) and four of the five genes.`,
  ],
  chartTypes: ['F1', 'F4'],
  examQ: {
    q: 'Why did the authors look at TCGA tumor data for the Tier 2 lncRNAs, and what does "****" in Figure 5B tell you (and not tell you)?',
    a: 'Cancer-promoting lncRNAs are expected to be more active in tumors than in normal tissue, and this was not a selection criterion, so it is independent support. LUAD (513 samples) bars are above normal (59 samples) bars for CHiLL1, GCAWKR, 507 and 205 (no data for 215). "****" means p < 0.0001 in a Student\'s t test: a gap this size is unlikely to be chance, but the stars do not measure how big the gap is.',
  },
},

/* ------------------------------------------------------------------------------------------ 5C */
fig5C: {
  short: 'Two ASOs slow A549 growth',
  question: 'Over four days, do two different ASOs against CHiLL1 and two against GCAWKR slow the growth of A549 cells, and do they add to the effect of cisplatin?',
  howToRead: `<p>Two time courses in A549 cells (x = hours after ASO delivery, 0 to 96; y = relative growth). Every value is divided by the non-targeting control ASO at the same time, so the black "ASO control" line is flat at 1.0: it is the ruler, not a sign that the cells stopped growing. Squares = ASO alone (ASO1 and ASO2, two different sequences, in a dark and a light shade of teal for CHiLL1 and orange for GCAWKR). Circles = plus cisplatin ("+ Cis"); "ASO control + Cis" is cisplatin alone, so compare the red and pink "+ Cis" curves with it. Error bars are SD, n=4 biological replicates. The coloured P values (two-tailed Student's t test) match the curve colours, and the stars seem to follow them.</p>
<p>A good result: both ASOs bend below 1.0, the two ASOs agree, and the "+ Cis" curves sit below "ASO control + Cis".</p>`,
  shows: `<p><b>CHiLL1:</b> with the ASO alone, growth falls to about 0.6 (ASO1) and 0.7 (ASO2) by 96 h (P=8.0e-4 and P=0.002). With cisplatin the ASO curves end at about 0.5 (P=0.013 and P=0.027), lower than cisplatin with the control ASO (about 0.6). <b>GCAWKR:</b> ASO1 ends near 0.6 and ASO2 near 0.75 (both P=0.001); with cisplatin both end at about 0.5. In both plots the ASO-alone curves fall about as far as cisplatin alone. Because two different sequences push the same way, the effect more likely comes from losing the intended RNA than from one sequence's side effects (the paper calls this on-target activity). The "about" values are my readings of the curves.</p>`,
  keyNumbers: [
    { value: 'n=4', meaning: 'four biological replicates; error bars are SD', source: ['fig5C'] },
    { value: 'P=8.0e-4 · P=0.002', meaning: 'CHiLL1: ASO1 alone (teal) and ASO2 alone (light teal)', source: ['fig5C'] },
    { value: 'P=0.013 · P=0.027', meaning: 'CHiLL1: ASO1 + Cis (red) and ASO2 + Cis (pink)', source: ['fig5C'] },
    { value: 'P=0.001 (both)', meaning: 'GCAWKR: ASO1 (orange) and ASO2 (light orange) alone', source: ['fig5C'] },
    { value: '1.0', meaning: 'the non-targeting control ASO at every time point: the reference line', source: ['fig5C'] },
  ],
  flags: [
    `The legend does not say which time point or comparison each P value belongs to. In the CHiLL1 plot the stars sit next to the 96 h points for the ASO-alone curves and next to the 72 h points for the red and pink "+ Cis" curves, so the tests may use different time points. In the GCAWKR plot no P value is shown for the "+ Cis" curves.`,
    `The cisplatin dose and exposure time are not given. Because "ASO control + Cis" falls below 1.0, the "+ Cis" curves must also be divided by the control without cisplatin, but the legend does not say so.`,
    `Error bars (SD, n=4) are large at 24 h and 48 h, so the early curves overlap. Only A549 is shown. The legend says "two-tailed Student's t test" here, while Figures 5E and 5F use one-tailed t tests and 5G a one-tailed Mann-Whitney test; the paper does not say why they differ.`,
  ],
  derived: ['0.6', '0.7', '0.75'],
  chartTypes: ['F1', 'F4'],
  examQ: {
    q: 'In Figure 5C, why is the "ASO control" line flat at 1.0, and what does "ASO1 + Cis" falling below "ASO control + Cis" tell you?',
    a: 'Every value is divided by the non-targeting control ASO at the same time, so the control is the ruler (1.0) and the other curves are growth relative to it. "ASO control + Cis" is cisplatin alone; if "ASO1 + Cis" is lower (for CHiLL1 about 0.5 versus about 0.6 at 96 h), the ASO adds to the effect of cisplatin, i.e. silencing the lncRNA makes the cells more sensitive to the drug.',
  },
},

/* ------------------------------------------------------------------------------------------ 5D */
fig5D: {
  short: 'Where the two genes sit',
  question: 'Where do CHiLL1 and GCAWKR lie on their chromosomes, what do their transcripts look like, and where do the ASOs and primers bind?',
  howToRead: `<p>Each box is a zoomed map of one gene in the hg19 genome version: gene name with its candidate number (CHiLL1 = 42, GCAWKR = 240), chromosome, a scale bar (2 kb versus 10 kb, so the two boxes are zoomed differently) and coordinate marks.</p>
<ul>
<li><b>ASOs/Primers</b> (grey band): where ASO1 and ASO2 bind. F and R presumably mark forward and reverse PCR primers (the legend does not define them). Two ASOs at two places are two independent sequences.</li>
<li><b>GENCODE Version 19</b> (green): thick blocks are exons, thin lines are introns, the small arrowheads show the reading direction, and the bent arrow marks the start (TSS) and direction.</li>
<li><b>Petal plot</b> (left): as in Figure 4C, it shows how much each screen contributed to the gene's ranking. Icons as in Figure 1A: infinity = proliferation (yellow), circle with a slash = cisplatin (teal), crown = migration (pink).</li>
</ul>`,
  shows: `<p>CHiLL1 is on Chromosome 8 with two annotated isoforms that share the first exon. It is read from right to left; ASO2 sits on that first exon and ASO1 further along. Its petal plot is dominated by one long yellow (proliferation) petal. GCAWKR is on Chromosome 15 with four isoforms that share a common TSS and is read from left to right; ASO1 is about midway and ASO2 near the right end. Its petal plot has teal (cisplatin), yellow (proliferation) and small pink (migration) petals.</p>`,
  keyNumbers: [
    { value: '2 isoforms', meaning: 'CHiLL1 (Chromosome 8) has two annotated isoforms sharing the first exon', source: ['res-aso-p4'] },
    { value: '4 isoforms', meaning: 'GCAWKR (Chromosome 15) has four isoforms sharing a common TSS (the track itself draws six transcript lines)', source: ['res-aso-p5', 'fig5D'] },
    { value: '42 and 240', meaning: 'candidate numbers of CHiLL1 and GCAWKR in the screen library', source: ['fig5D', 'res-aso-p3'] },
    { value: '2 kb vs 10 kb', meaning: 'the two scale bars: the boxes are not drawn to the same scale', source: ['fig5D'] },
  ],
  background: `<p>Exons are the parts that stay in the finished RNA; introns are cut out (splicing). Isoforms are different ways of joining the exons of one gene. hg19 is a genome version (a coordinate system); positions from different versions do not match.</p>`,
  memory: `Like a street map zoomed in on two blocks: the scale bar tells you how far, the coordinates are house numbers, and the small arrowheads are one-way arrows showing which way the gene is read.`,
  flags: [
    `The legend is one line. It does not explain F and R, the bent arrow, the petal plots or the icons; the explanations above come from the panel labels, Figure 1A and the Figure 4C legend. It also does not say which isoforms each ASO is meant to hit (in the GCAWKR box ASO2 lies under the long last exon of just one drawn transcript, the line labelled RP11-66B24.7).`,
    `The text says GCAWKR has four isoforms sharing one TSS, but the GENCODE track draws six transcript lines under two names (RP11-66B24.2 and RP11-66B24.7); the legend does not say how they map to the four isoforms.`,
    `For CHiLL1 the text says the GENCODE start may lie slightly downstream of the true TSS, which still falls inside the deleted region (res-aso-p4). So the bent arrow marks the annotated start, not necessarily the exact true start.`,
  ],
  chartTypes: ['F3', 'F2'],
  examQ: {
    q: 'Using Figure 5D, state each gene\'s chromosome and isoform count as the text reports them, and explain why two ASOs per gene are drawn at different positions.',
    a: 'CHiLL1 (candidate 42) is on Chromosome 8 with two annotated isoforms sharing the first exon; GCAWKR (candidate 240) is on Chromosome 15 with four isoforms sharing a common TSS. The two ASOs are independent sequences that bind different places; if both give the same phenotype, it is more likely due to losing the intended RNA than to a side effect of one sequence.',
  },
},

/* ------------------------------------------------------------------------------------------ 5E */
fig5E: {
  short: 'ASOs shrink 3D spheroids',
  question: 'Do the CHiLL1 and GCAWKR ASOs also lower viability in 3D tumor spheroids of H441 cells, not just in flat dishes?',
  howToRead: `<p>Bars show relative growth (viability) of H441 spheroids 7 days after ASO delivery (25 nM); the control is about 1.0 and lower means fewer living cells. The first two bars are control ASOs (the legend does not explain "control2"). <b>mTOR</b> is the positive control: an ASO expected to cut growth, which proves the assay can detect a drop. <b>CHiLL1 ASO1</b> and <b>GCAWKR ASO1</b> are the test ASOs. Error bars are SD (drawn upward only), n=4 biological replicates, and the rotated P values come from a one-tailed Student's t test. The photos are representative images with 200 µm scale bars. Why spheroids? The paper says 3D models are a "more faithful tumor model" than flat cultures.</p>`,
  shows: `<p>Both controls sit near 1.0. The mTOR bar falls to about 0.43, CHiLL1 ASO1 to about the same level (about 0.45; P=0.024) and GCAWKR ASO1 to about 0.7 (P=0.028). So CHiLL1's ASO reaches the positive control and GCAWKR's approaches it, as the text says. mTOR's P (0.040) is weaker than CHiLL1's although its bar is as low: its error bar is much longer, and P depends on the spread as well as the size of the drop. The "about" values are my readings of the bars.</p>`,
  keyNumbers: [
    { value: 'n=4', meaning: 'four biological replicates; error bars are SD', source: ['fig5E'] },
    { value: '25 nM · 7 days', meaning: 'ASO amount and time before viability was measured', source: ['fig5E'] },
    { value: 'P=0.040 · 0.024 · 0.028', meaning: 'mTOR, CHiLL1 ASO1 and GCAWKR ASO1 (one-tailed t test)', source: ['fig5E'] },
    { value: '200 µm', meaning: 'scale bar in each photo', source: ['fig5E'] },
  ],
  memory: `A positive control is like the test button on a smoke alarm: it shows the alarm can sound at all, and how loud a full-strength signal is.`,
  flags: [
    `The bars show ASO1 for both genes, but the photos are labelled "CHiLL1 ASO2" and "GCAWKR ASO2"; the legend does not say why, so the photos come from a different ASO than the bars.`,
    `The legend does not explain "ASO control2" or say which control each P value is compared with. A one-tailed test only asks "is it lower?" and gives a smaller P than a two-tailed test on the same data.`,
    `The photos are low-resolution examples with no counts; the bar chart is the only quantitative evidence.`,
  ],
  derived: ['0.43', '0.45', '0.7'],
  chartTypes: ['F1', 'F3', 'F4'],
  examQ: {
    q: 'In Figure 5E, what is the role of the mTOR bar, and how do the CHiLL1 and GCAWKR ASOs compare with it?',
    a: 'The mTOR ASO is a positive control: it is expected to cut viability, so it shows the spheroid assay can detect a drop and sets a benchmark. CHiLL1 ASO1 lowers relative growth to about the same level as mTOR (about 0.45 versus a control of 1.0; P=0.024) and GCAWKR ASO1 to about 0.7 (P=0.028), so both ASOs also work in 3D (n=4, one-tailed t test, 25 nM, 7 days).',
  },
},

/* ------------------------------------------------------------------------------------------ 5F */
fig5F: {
  short: 'ASO weakens patient-derived organoids',
  question: 'Does a CHiLL1 ASO reduce the viability of organoids grown from a real patient\'s KRAS-mutant lung tumor (BE874), and is the result repeatable?',
  howToRead: `<p>A bar chart with a log y axis: luminescence in relative light units (RLU), the raw glow of the viability assay, which rises with the number of living cells. Each labelled tick (10⁰, 10², 10⁴, 10⁶) is 100 times the one before. Four independent replicates (1–4) are shown; 1–2 are labelled "6 days" and 3–4 "9 days". In each pair the grey bar is the control ASO (circles) and the open green bar is the CHiLL1 ASO (squares); the dots appear to be individual wells (technical replicates) and the error bars are their SD. The label over each pair is a one-tailed Student's t test for that pair ("ns" = not significant). Why organoids from a patient-derived xenograft? The paper says they "recapitulate the therapy response of individual patients". A good result: green clearly lower than grey in every replicate.</p>`,
  shows: `<p>In replicate 1 the green bar is only a little lower and the difference is "ns" (the green dots scatter widely). In replicates 2, 3 and 4 the green bars are much lower than the grey ones (by my estimate more than ten times; P=0.008, P&lt;1.0e-04 and P=0.026). So the CHiLL1 ASO lowers BE874 organoid viability in three of the four replicates; the text calls this "a significant reduction".</p>`,
  keyNumbers: [
    { value: 'n=4 · n&gt;3', meaning: 'four biological replicates; more than three technical replicates in each', source: ['fig5F'] },
    { value: 'ns · P=0.008 · P&lt;1.0e-04 · P=0.026', meaning: 'replicates 1, 2, 3 and 4 in turn', source: ['fig5F'] },
    { value: '6 days · 9 days', meaning: 'timing labels under replicates 1–2 and 3–4', source: ['fig5F'] },
    { value: '10⁰ … 10⁶', meaning: 'the log y axis (RLU): every labelled tick is 100 times the previous one', source: ['fig5F'] },
  ],
  memory: `A log axis is like the Richter scale: each step up multiplies the strength instead of adding to it.`,
  flags: [
    `The y-axis label is printed "Luninescence" (a typo for luminescence). The Methods say the second reading was taken "after one week", but the figure labels the replicates "6 days" and "9 days"; the paper does not reconcile these.`,
    `The legend says only "CHiLL1 ASO" (which ASO, 1 or 2?); GCAWKR was not tested here. The grey photo has no scale bar or label and the legend does not mention it.`,
    `Replicate 1 is "ns", so "a significant reduction" (res-aso-p7) holds for three of the four replicates. Each P value presumably comes from technical replicates (wells) within one experiment, so the agreement between independent replicates is what supports the claim.`,
  ],
  derived: ['100'],
  chartTypes: ['F1', 'F4'],
  examQ: {
    q: 'Figure 5F gives four P values for four replicates. How should the claim "CHiLL1 ASOs significantly reduced organoid viability" be worded, and why is a log axis used?',
    a: 'Three of the four independent replicates are significant (P=0.008, P<1.0e-04 and P=0.026) while replicate 1 is ns, so the claim should read "reduced viability in three of four replicates". The luminescence values span several orders of magnitude (the axis runs from 10^0 to 10^6), so a log axis lets large drops and small values be read on one scale.',
  },
},

/* ------------------------------------------------------------------------------------------ 5G */
fig5G: {
  short: 'Cocktail beats single ASOs',
  question: 'Does mixing ASOs against several lncRNAs, at the same total ASO amount, lower A549 growth more than a single ASO does?',
  howToRead: `<p><b>Top cartoon:</b> three ways to treat the same cells: a single ASO, the Tier 3 cocktail (CHiLL1 + GCAWKR ASOs; teal and orange strands, matching the line colours) and the Tier 2 cocktail (five ASOs, one per Tier 2 lncRNA, so the black strands are presumably the other three). "Equal total ASO amount" is the key design rule: every condition gets the same total ASO (25 nM, per the legend) in equal proportions, so a stronger cocktail effect comes from hitting several targets, not from using more ASO. (My arithmetic: each ASO in the two-ASO cocktail gets 12.5 nM, half of the single-ASO dose.)</p>
<p><b>Plot:</b> a time course like Figure 5C (relative growth against 0 to 72 h; control = flat black line at 1.0). Error bars are SD, n=4 biological replicates. The dark red bracket and the colour-coded P values (teal, orange) at the right seem to compare the Tier 3 cocktail with each single ASO. A good result: the cocktail lines sit below both single-ASO lines.</p>`,
  shows: `<p>All treated lines fall below the control. At 72 h the single ASOs are at about 0.7, the five-ASO Tier 2 cocktail is lower (about 0.65) and the two-ASO Tier 3 cocktail is lowest (about 0.6). The Tier 3 cocktail differs from CHiLL1 ASO1 alone (P=0.021) and from GCAWKR ASO1 alone (P=0.030). The text: a 50:50 cocktail of CHiLL1/GCAWKR ASOs "displayed a greater effect on cell viability compared with an equal dose of either ASO alone", and the five-ASO cocktail "yielded a similar benefit". The "about" values are my readings of the curves.</p>`,
  keyNumbers: [
    { value: '25 nM', meaning: 'total ASO amount, the same in every condition', source: ['fig5G'] },
    { value: 'P=0.021 · P=0.030', meaning: 'teal (CHiLL1 ASO1) and orange (GCAWKR ASO1) labels, tied by the bracket to the Tier 3 cocktail', source: ['fig5G'] },
    { value: 'n=4', meaning: 'four biological replicates; error bars are SD; one-tailed Mann-Whitney test', source: ['fig5G'] },
    { value: '50:50 · five ASOs', meaning: 'the Tier 3 cocktail (CHiLL1/GCAWKR) and the Tier 2 cocktail', source: ['res-aso-p8'] },
  ],
  background: `<p>"Additive" means a combination's effect equals the sum of the separate effects; "synergistic" means it is larger than that sum. To claim either, you compare the combination with what the single treatments predict.</p>`,
  flags: [
    `The legend does not say which ASO (1 or 2) of each lncRNA went into the cocktails, what comparison each P value is, or at which time point. No P value is shown for the Tier 2 cocktail. The test here is a one-tailed Mann-Whitney test, whereas Figure 5C used a two-tailed t test; the paper does not say why.`,
    `The paper describes the cocktail effect in different words: "synergistic benefits" (res-aso-p8), "additive effect" (res-mechanism-p7) and "greater than additive" (discussion-p6). This panel only compares the cocktail with each single ASO at an equal total dose; it does not calculate what a purely additive effect would predict.`,
  ],
  derived: ['12.5', '0.7', '0.65', '0.6'],
  chartTypes: ['F1', 'F4'],
  examQ: {
    q: 'Why was the total ASO amount kept equal in all conditions of Figure 5G, and what do P=0.021 and P=0.030 show?',
    a: 'If the cocktail received more ASO, a bigger effect could simply be a higher dose. Keeping the total at 25 nM means each ASO in a 50:50 cocktail is at half the single-ASO amount, so a stronger effect suggests that hitting two targets adds something. The Tier 3 cocktail (CHiLL1 + GCAWKR) is lower than CHiLL1 ASO1 alone (P=0.021) and GCAWKR ASO1 alone (P=0.030) (one-tailed Mann-Whitney, n=4).',
  },
},

/* ------------------------------------------------------------------------------------------ 5H */
fig5H: {
  short: 'How many patients express them?',
  question: 'In KRAS-mutant lung adenocarcinoma patients, what fraction express at least one of the target lncRNAs and so could in principle be treated with the ASO cocktails?',
  howToRead: `<p>Each thin column is one patient (101 KRAS-mutant lung adenocarcinoma tumors from TCGA, "n=101") and each row is one lncRNA. The colour shows how much of that lncRNA's RNA the tumor contains (FPKM; yellow = high, near 7; purple and black = just above 0.5; grey = not counted as expressed, because the legend defines "expressed" as above 0.5 FPKM). Patients are ordered by CHiLL1 (high to low, then grey); the other rows keep that order, so they look scattered. The bars on the right give the % of patients expressing each lncRNA. The two long bars at the bottom ("Cocktails") give the % of patients with <b>at least one</b> lncRNA of the cocktail: "CHiLL1&amp;GCAWKR" is the Tier 3 cocktail and "Tier II" the five-lncRNA Tier 2 cocktail. Why "at least one"? An ASO can only act if its target RNA is present, so a cocktail can help a patient if any one of its targets is expressed.</p>`,
  shows: `<p>CHiLL1 is expressed in 67% of patients, GCAWKR in 37%, candidate 215 in only 4%, 507 in 35% and 205 in 48%. The Tier 3 pair together covers 78% of patients and all five Tier 2 lncRNAs cover 92%; the paper reads this as the fraction who "might be treated". 78% is less than 67% + 37% (104%, my arithmetic) because many patients express both (about 26%).</p>`,
  keyNumbers: [
    { value: 'n=101', meaning: 'KRAS-mutant LUAD patients (TCGA); each column is one patient', source: ['fig5H', 'm-public-rnaseq-p1'] },
    { value: '67% · 37%', meaning: 'patients expressing CHiLL1 · GCAWKR', source: ['fig5H'] },
    { value: '78%', meaning: 'patients with CHiLL1 or GCAWKR: the Tier 3 cocktail', source: ['fig5H', 'res-aso-p9'] },
    { value: '92%', meaning: 'patients with at least one of the five Tier 2 lncRNAs: the Tier 2 cocktail', source: ['fig5H', 'res-aso-p9'] },
    { value: '&gt;0.5 FPKM', meaning: 'the cut-off the legend uses to call a lncRNA expressed', source: ['fig5H'] },
    { value: '4%', meaning: 'candidate 215, expressed in very few patients', source: ['fig5H'] },
  ],
  background: `<p>TCGA RNA-seq measures RNA in a piece of tumor tissue, which holds cancer cells and other cells (such as immune and connective-tissue cells). A lncRNA found in the sample may therefore come from cells other than the cancer cells.</p>`,
  memory: `An ASO is a key cut for one lock (its target RNA). The panel asks how many patients' doors have that lock.`,
  flags: [
    `Expression is not the same as dependence: the panel shows the RNA is present in tumors, not that silencing it would slow every such tumor. The text says only that patients "might be treated". Many CHiLL1 squares are dark purple or black, just above the 0.5 FPKM cut-off, so the percentages depend on where the cut-off is put.`,
    `The panel covers KRAS-mutant lung adenocarcinoma only (n=101), but the text says "TCGA tumors" (res-aso-p9) and "the majority of NSCLC cases" (res-aso-p10). The legend also does not say how patients were ordered, and the image writes "Tier II" where the text writes "Tier 2".`,
    `Candidate 215 appears here in 4% of TCGA tumors, but the legend of Figure 5B says TCGA data were not available for candidate 215. The paper does not explain this.`,
  ],
  derived: ['104', '26'],
  chartTypes: ['F2'],
  examQ: {
    q: 'How were the 78% and 92% in Figure 5H obtained, and why is 78% smaller than the sum of the CHiLL1 (67%) and GCAWKR (37%) percentages?',
    a: 'They are the percentages of the 101 KRAS-mutant LUAD patients (TCGA) whose tumors express (above 0.5 FPKM) at least one lncRNA of the cocktail: CHiLL1 or GCAWKR for 78%, any of the five Tier 2 lncRNAs for 92%. The percentages overlap: 67% + 37% = 104%, so patients who express both are counted once (about 26% express both, my arithmetic).',
  },
},

});
