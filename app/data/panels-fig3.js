window.PANELS = window.PANELS || {};

Object.assign(window.PANELS, {

  /* ====================================================================== 3A */
  fig3A: {
    short: `Maps of the two validated loci`,
    question: `Where do candidates 205 and 509 sit on the genome, which genes start at their TSS, and where were the ten guide pairs, the ASOs and the qPCR primers placed?`,
    howToRead: `<p>Each box is a <b>gene map</b>: a short stretch of one chromosome drawn as a horizontal line and read from left to right. The ruler on top gives positions along the chromosome (<b>Chr1</b> on the left, <b>Chr17</b> on the right) in the genome version <b>hg19</b>. The bar marked 10 kb (20kb on the right) shows how long that many DNA letters are, so the two maps are zoomed differently.</p>
<p>Every row below the ruler is a <b>track</b>, a layer of information about the same stretch of DNA:</p>
<ul>
<li><b>ASOs</b> and <b>Primers qPCR</b>: tick marks showing which part of the gene each ASO is aimed at (an ASO pairs with the RNA copy of that spot) and where the qPCR primer pairs sit (F = forward, R = reverse). The numbers 1 and 2 tell the two ASOs apart.</li>
<li><b>GENCODE Version 19</b> (left) and <b>FANTOM Annotation</b> (right): the genes known at that spot. Thick boxes are exons and thin lines are the stretches between them. A bent black arrow marks a <b>TSS</b> and points the way the gene is read. Two arrows leaving one spot in opposite directions mean a <b>bidirectional promoter</b>: two genes start back to back.</li>
<li><b>Target region</b>: the stretch around the TSS that the screen aimed at.</li>
<li><b>pgRNAs</b>: each red bracket is one guide pair, drawn from its left cut to its right cut. The DNA between the two cuts is what gets deleted, so the brackets should sit over the TSS. The numbers 1 to 10 are the same pgRNA numbers used in panels B and C.</li>
</ul>`,
    shows: `<p><b>Candidate 205 (left).</b> The target is the shared start of two GENCODE genes, <b>LINC00115</b> and <b>RP11-206L10.11</b>, which are read in opposite directions (the text calls them bidirectional antisense genes). All ten guide pairs straddle this shared TSS, so each deletion removes the start of both genes at once. The four ASO marks (1 and 2 for each gene, as Figure 3D explains) are there to hit the two RNAs one at a time.</p>
<p><b>Candidate 509 (right).</b> One TSS is shared by several lncRNA transcripts, which run to the left from the target region (the text calls them BIGTranscriptome lncRNAs). The authors add that the same locus holds two more hits, candidate 507 (LINC00910) and candidate 508, which supports its importance. No ASOs are drawn here. The brackets for pgRNA 8 and pgRNA 3 are much shorter than the rest, so those two guide pairs remove a smaller piece of DNA (by eye). pgRNA 3 is the one used in Figures 3B and 3C.</p>
<p>In both maps the design is the same: guide pairs cut on either side of a TSS to delete it, and ASOs and primers are placed to follow the RNA.</p>`,
    keyNumbers: [
      { value: `10 pgRNAs`, meaning: `guide pairs per target, drawn as red brackets (the ten pgRNAs from the screening library)`, source: ['fig3A'] },
      { value: `205 and 509`, meaning: `the two screen hits chosen for validation (top-ranked and consistent between the two cell lines)`, source: ['fig3A', 'res-validation-p1'] },
      { value: `Chr1 and Chr17, hg19`, meaning: `the two chromosomes shown, in genome version hg19`, source: ['fig3A'] },
      { value: `10 kb and 20 kb`, meaning: `scale bars of the left and right map: the two maps are drawn at different zoom levels`, source: ['fig3A'] },
      { value: `507 and 508`, meaning: `two more screen hits in the candidate 509 locus (candidate 507 is LINC00910)`, source: ['res-validation-p2'] },
    ],
    background: `<p><b>Why show guides, ASOs and primers on one map?</b> They act on different things. A guide pair works on the <b>DNA</b>: it deletes a piece. An ASO works on the <b>RNA</b>: it pairs with one RNA and gets it destroyed. A qPCR primer pair is used to <b>measure</b> how much of an RNA is present. When two genes overlap, as at candidate 205, a DNA deletion hits both at once, while an ASO can be aimed at one RNA at a time.</p>`,
    memory: `A gene map is like a street map with layers: the ruler gives the street numbers, and each track is one layer (shops, bus stops, bike lanes) drawn on the same street. Reading across a column shows everything that happens at one address.`,
    flags: [
      `The legend only says "Primers and ASO sites are indicated above." It does not say which gene each ASO belongs to, what the qPCR primers were used to measure, or what the green and black parts of the "Target region" bar mean (the legend of Figure 1E calls the black part the TSS target region).`,
      `The text says candidate 509 shares its TSS with "BIGTranscriptome" lncRNAs, but this track is labelled "FANTOM Annotation" and the printed names start with ENCT, FTMT and MICT. Four transcript lines are drawn but only three names are printed. The legend explains neither point.`,
      `The two maps are drawn at different scales (10 kb and 20 kb), and the RP11-206L10.11 gene runs off the right edge of the left map. Do not compare lengths between the maps or read them as full gene sizes.`,
      `The limitations paragraph cites this panel and says an ASO strategy "could also narrow down LINC00115" as the functional gene at candidate 205, but the Results already report ASOs against both genes (Figure 3D).`,
    ],
    chartTypes: ['F3'],
    examQ: {
      q: `In Figure 3A, why is candidate 205 harder to interpret than a lncRNA with a lone TSS, and how does the authors' next experiment solve the problem?`,
      a: `Candidate 205 sits on a shared TSS where two genes, LINC00115 and RP11-206L10.11, start back to back and are read in opposite directions. A guide-pair deletion removes the start of both (and any DNA element in that stretch), so the screen cannot say which gene, or whether the DNA or the RNA, causes the growth effect. The authors therefore aimed two ASOs at each RNA separately (Figure 3D). Only the LINC00115 ASOs slowed growth.`,
    },
  },

});

Object.assign(window.PANELS, {

  /* ====================================================================== 3B */
  fig3B: {
    short: `Dropout of each guide pair`,
    question: `In the dropout screen, did the guide pairs aimed at candidates 205 and 509 become rarer over time, and which guide pair was picked from each set for follow-up?`,
    howToRead: `<p>Each coloured line is <b>one of the ten guide pairs (pgRNAs)</b> for a candidate (key on the right). The y axis is the <b>log2 fold change</b> of that guide pair's normalized count compared with the start (T0), so every line starts at 0. The time points are T0 (start), T2 (2 weeks) and T3 (3 weeks). On the log2 scale 0 means unchanged, −1 means half as many reads as at the start, −2 a quarter and −3 an eighth.</p>
<p>In a <b>dropout screen</b> all the cells grow together in one pooled culture, so a falling line means the cells carrying that guide pair grew more slowly than the rest: the guide pair is <b>depleted</b>. That is what you expect if deleting the target slows growth. The black line marks 0 (no change). The arrow beside a key entry marks the guide pair that was chosen at random from the high scorers and cloned on its own for the follow-up tests: pgRNA 2 for candidate 205 and pgRNA 3 for candidate 509.</p>
<p>A convincing target has most of its ten lines well below 0. A line that stays near 0 may be a guide pair that did not work well.</p>`,
    shows: `<p><b>Candidate 205 (left).</b> Most guide pairs fall steeply; the two lowest (pgRNA 9 and pgRNA 6) end below the −3 tick at T3. A few do not fall: pgRNA 7 and pgRNA 3 end slightly above 0 and pgRNA 5 only a little below it (by eye). The arrowed pgRNA 2 ends close to the −2 tick.</p>
<p><b>Candidate 509 (right).</b> All ten lines end below 0 at T3, from just under 0 (pgRNA 9) to below the −2 tick (pgRNA 10). The arrowed pgRNA 3 ends between the −1 and −2 ticks.</p>
<p>So the two chosen guide pairs are clearly depleted, but they are not the most depleted guide pairs of their locus.</p>`,
    keyNumbers: [
      { value: `T2 = 2 weeks · T3 = 3 weeks`, meaning: `time points after the start (legend); the methods say cells were harvested at 14 and 21 days`, source: ['fig3B', 'm-screen-prolif-p1'] },
      { value: `10 pgRNAs`, meaning: `ten coloured lines per candidate, one per guide pair`, source: ['fig3B'] },
      { value: `pgRNA 2 · pgRNA 3`, meaning: `the arrowed guide pairs picked for validation: pgRNA 2 for candidate 205, pgRNA 3 for candidate 509`, source: ['fig3B', 'res-validation-p3'] },
      { value: `log2FC = −1.81, FDR = 1.2 × 10<sup>−7</sup>`, meaning: `candidate 205 in the A549 dropout screens (a target-level value quoted in the text, not one line of the plot)`, source: ['res-validation-p1'] },
      { value: `log2FC = −1.15, FDR = 9.78 × 10<sup>−7</sup>`, meaning: `candidate 509 in A549, proliferation and cisplatin (target-level value quoted in the text)`, source: ['res-validation-p1'] },
    ],
    background: `<p><b>What "normalized counts" means.</b> Each sample is sequenced to a different depth, so raw read counts are rescaled to a common total before samples are compared. A guide pair's normalized count is then roughly its share of the pool, and a falling line means its share shrank.</p>`,
    memory: `Ten kinds of seed are sown together in one field and you count the plants of each kind weeks later. A kind whose count keeps falling grows badly in that field. Here the ten "kinds" are ten attempts at switching off the same target, so you hope most of them agree.`,
    flags: [
      `The legend gives no n, no error bars and no statistics. It does not say whether each point is an average over the screen's replicates.`,
      `T0 to T2 spans 2 weeks but T2 to T3 only one week, yet the x axis spaces the three points evenly. Do not compare the slopes of the two segments.`,
      `The two plots use different y-axis ranges and the right plot has no axis titles. Read the tick labels before comparing them.`,
      `The text says "randomly selected high-scoring pgRNAs"; the legend says "randomly chosen". The panel does not show how "high-scoring" was defined, and the arrowed guide pairs are not the most depleted ones. For candidate 509 the text adds that the deletion itself could not be tested by PCR (primers were hard to design); it relies on an RNA-level result in a supplementary figure that is not in the PDF.`,
      `The text quotes one target-level log2 fold change and FDR per candidate (see the key numbers). This panel shows the individual guide pairs; the methods build the target-level value from them (m-hits-p2).`,
    ],
    chartTypes: ['F1'],
    examQ: {
      q: `What does one line in Figure 3B show, and what would a line that ends at −2 tell you?`,
      a: `One line is one of the ten guide pairs for a candidate: its log2 fold change in normalized count at T2 (2 weeks) and T3 (3 weeks) compared with T0, so every line starts at 0. A line ending at −2 means the guide pair is at a quarter of its starting abundance: cells carrying that deletion grew more slowly than the rest of the pooled cells, so the guide pair is depleted. If most of a target's ten lines behave like this, deleting the target probably slows growth.`,
    },
  },

  /* ====================================================================== 3C */
  fig3C: {
    short: `Red versus green competition test`,
    question: `Do cells carrying a candidate's deletion (red) lose out against control cells (green) in a shared dish, about as much as cells lacking the essential gene RPS5, and do they still lose out with cisplatin?`,
    howToRead: `<p><b>The cartoon.</b> Control cells carry AAVS1 guide pairs and glow <b>green</b> (GFP). Cells carrying guide pairs for a candidate glow <b>red</b> (mCherry). The two batches are mixed 1:1 in one dish and grown together; a <b>flow cytometer</b> then counts how many cells are green and how many are red. Because both kinds share the same dish and medium, any difference in growth shows up as a changing ratio.</p>
<p><b>The graphs.</b> The x axis is time in days, the y axis is the percent of cells; dots are averages with SD error bars (legend). Red and green are shares of the same dish, so when one goes down the other goes up and the two lines open like scissors.</p>
<ul>
<li><b>Neutral control:</b> as the labels suggest, one AAVS1 guide pair in the red cells (AAVS1_1) and another in the green cells (AAVS1_2). AAVS1 is a neutral spot, so the lines should stay together near the half-way mark (between the 40 and 60 ticks). This shows that colour, virus and cutting do not bias the race.</li>
<li><b>Positive control:</b> guide pairs against the protein-coding sequence (ORF) of RPS5, an essential ribosomal gene, against AAVS1 cells. The red cells should lose clearly. It shows what a strong loser looks like and that the assay can detect one.</li>
<li><b>Candidates:</b> candidate 205 (pgRNA_2) and candidate 509 (pgRNA_3), the arrowed guide pairs of panel B, each against AAVS1 cells. The last graph repeats 509 with cisplatin added. The P values come from a Student's t test at the last time point.</li>
</ul>
<p>A good result is a red line that falls and a green line that rises, like the positive control and unlike the flat neutral control.</p>`,
    shows: `<p><b>Neutral control.</b> Red and green stay close together near the half-way mark for the whole 7 days, as they should.</p>
<p><b>Positive control (RPS5).</b> The red cells lose out and the green cells gain: by the end red sits between the 20 and 40 ticks and green between 60 and 80 (P=3.8e-4).</p>
<p><b>Candidates.</b> For candidate 205 (P=0.005) and candidate 509 (P=0.004) the red cells also lose out and the green cells gain. The text says both guide pairs have an effect on fitness "comparable to inactivation of essential ribosomal gene RPS5". By eye that fits candidate 205 well; the fall is smaller for candidate 509.</p>
<p><b>With cisplatin.</b> The candidate 509 red cells still fall behind the green ones (P=0.031). The text says this pgRNA "also sensitized cells to cisplatin, consistent with screen results".</p>`,
    keyNumbers: [
      { value: `P=3.8e-4`, meaning: `positive control: RPS5 cells versus AAVS1 cells`, source: ['fig3C'] },
      { value: `P=0.005`, meaning: `candidate 205 (pgRNA_2) versus AAVS1`, source: ['fig3C'] },
      { value: `P=0.004`, meaning: `candidate 509 (pgRNA_3) versus AAVS1`, source: ['fig3C'] },
      { value: `P=0.031`, meaning: `candidate 509 with cisplatin versus AAVS1 with cisplatin`, source: ['fig3C'] },
      { value: `n = 3, SD, t test`, meaning: `three replicates, error bars are the standard deviation, Student's t test at the last time point (legend)`, source: ['fig3C'] },
    ],
    background: `<p><b>Why mix the cells?</b> Two kinds of cells that grow at slightly different speeds look alike on any single day. In one dish the faster kind takes a larger share every day, so the changing ratio magnifies a small difference. <b>AAVS1</b> is a spot in the human genome that researchers often use as a "safe harbor", where cutting is generally harmless; this fits its use as the neutral control.</p>`,
    memory: `A race between a runner with a pebble in one shoe (red) and a runner without (green) on the same track: the gap widens lap after lap. The neutral control is two runners without pebbles, who stay side by side. Where it breaks down: cells divide, so the "gap" is a changing share of the dish, not a distance.`,
    flags: [
      `The legend says "n = 3, error bars indicate SD ... Student's t test at the last time point". It does not say what the three replicates are, which two groups the test compares (probably red versus green at the last time point), or whether the test is one- or two-sided. Each graph has one test, with no correction for the number of graphs.`,
      `In the Candidate 205 graph the red cells already start clearly below the half-way mark (near the 40 tick) and the two starting points add up to clearly less than 100, so the mix was not exactly 1:1 on day 0 (by eye). The error bars are also much wider there. The legend does not comment, and "% of cells" does not say which cells are counted.`,
      `The cisplatin graph gives no dose. By eye the gap between red and green at the last point is no larger with cisplatin than without it, and candidate 509 already slows growth on its own (previous graph). So the graph shows that the cells still lose out under cisplatin, but it cannot show extra sensitivity by itself; the text's statement leans on the screen result too.`,
      `The y-axis labels of the Positive control graph are broken up in the image (the digits "10, 8, 6, 4, 2" sit between the graphs and a "0" sits beside each tick). Read them as 100, 80, 60, 40, 20 and 0, as in the other graphs.`,
    ],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: `In Figure 3C, why are control and candidate cells mixed 1:1 in one dish, and what do the neutral and positive controls show?`,
      a: `In one dish both kinds of cells share the same medium, so any change in the red:green ratio over the 7 days comes from the pgRNA and measures relative fitness. The neutral control (AAVS1 against AAVS1) stays near half, so colour, virus and cutting do not bias the result. The positive control (RPS5, an essential gene) loses strongly (P=3.8e-4), so the assay can detect a fitness loss. Candidates 205 and 509 behave like the positive control (P=0.005 and P=0.004).`,
    },
  },

  /* ====================================================================== 3D */
  fig3D: {
    short: `Which overlapping gene drives growth?`,
    question: `Candidate 205 covers two genes that share a TSS. When each RNA is knocked down on its own with ASOs, which one slows cell growth, and did the ASOs really lower their target?`,
    howToRead: `<p><b>The cartoon.</b> An <b>ASO</b> is a short strand that pairs with one RNA, and the RNA is then broken up (the dashed grey picture). An ASO acts on the RNA copy, not on the DNA, which is why it can show whether the RNA matters.</p>
<p><b>The layout.</b> Top row: LINC00115. Bottom row: RP11-206L10.11. Left: growth over 72 h as <b>relative growth</b>; the black line (the ASO control, a non-targeting ASO) is the baseline at 1.0. Right: bars showing how much of the RNA was left at 72 h, measured by RT-qPCR and divided by the housekeeping RNA HPRT1 so that samples can be compared.</p>
<p><b>The colours.</b> Pink and teal are two different ASOs (ASO1, ASO2) against the same RNA. Two unrelated sequences giving the same answer makes a side effect of one ASO unlikely. P values are printed in the colour of their ASO; <b>ns</b> means not significant.</p>
<p><b>A good result</b> for a gene that drives growth: both ASOs lower the RNA (bars below the control bar) and both lower growth (curves ending below 1.0 with small P values). The bars also matter for the "no effect" case: a gene is only cleared if its ASOs really did lower its RNA.</p>`,
    shows: `<p><b>LINC00115 (top).</b> Both ASOs lower the RNA (bars a little above the 0.5 tick, control bar just under 1.0) and both slow growth: at 72 h the pink and teal curves end between the 0.5 and 1.0 ticks, with P=0.034 for ASO1 and P=0.018 for ASO2.</p>
<p><b>RP11-206L10.11 (bottom).</b> Both ASOs lower this RNA by about as much (bars near the 0.5 tick), yet growth is not significantly changed: both curves are marked "ns", and the ASO1 curve even ends above the control at 72 h.</p>
<p><b>Conclusion in the text.</b> Because the two ASO sets behave differently, the authors say LINC00115, but not RP11-206L10.11, drives cell proliferation through an RNA-dependent mechanism. They add that a 3D spheroid model corroborated this (a supplementary figure, not shown here) and that earlier reports link LINC00115 to lung cancer.</p>`,
    keyNumbers: [
      { value: `P=0.034 · P=0.018`, meaning: `LINC00115: growth with ASO1 and with ASO2 versus the control ASO`, source: ['fig3D'] },
      { value: `ns · ns`, meaning: `RP11-206L10.11: growth with ASO1 and ASO2 is not significantly different from the control`, source: ['fig3D'] },
      { value: `0, 24, 48, 72 h`, meaning: `time points of the growth curves; the RT-qPCR is read at 72 h`, source: ['fig3D'] },
      { value: `n=4 and n=2`, meaning: `printed on the growth plots and on the RT-qPCR bars; the legend says n = 4 for the whole panel`, source: ['fig3D'] },
      { value: `2 ASOs per gene`, meaning: `two different ASOs (1 and 2) for each of the two genes, plus a control ASO`, source: ['fig3D'] },
    ],
    background: `<p><b>How ASOs usually work.</b> An ASO pairs with the RNA it matches, and the pairing recruits an enzyme (RNase H) that cuts the RNA. The RNA disappears, but the gene on the DNA is untouched and keeps being copied. That is the key difference from a deletion.</p>`,
    memory: `Two bulbs on one switch: pulling out the switch (the deletion) puts out both bulbs. To learn which bulb lights the room, unscrew them one at a time. That is what the two sets of ASOs do. Where it breaks down: an ASO removes the RNA, not the gene, which keeps being copied.`,
    flags: [
      `The legend says "n = 4" for the whole panel, but the RT-qPCR plots are labelled n=2 in the image. With only two values an SD error bar is a rough guide, and the bars carry no P values.`,
      `Significance was estimated by a "one-tailed Student's t test". A one-tailed test only asks whether the ASO value is lower than the control, which is easier to pass than the usual two-tailed test. The legend does not say which time point the P values refer to (they sit at the 72 h end), exactly what is compared, or whether anything is corrected for several tests.`,
      `The legend does not say how growth was measured or how the ASOs were dosed. The methods describe a luminescence-based 2D viability assay (CellTiter-Glo), but the legend does not say that this panel used it.`,
      `"RNA-dependent" does not prove that the finished lncRNA molecule is the active part: the text itself lists "mature lncRNA, or its transcription" as RNA-dependent possibilities, and this panel cannot tell them apart.`,
      `The legend has typos ("bower panels" for lower panels) and says qRT-PCR where the plots say RT-qPCR. The control bars of the RT-qPCR charts are not exactly 1.0 (the RP11-206L10.11 control sits clearly below it), so judge knockdown against the control bar.`,
    ],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: `Why did the authors use ASOs for candidate 205, and what does Figure 3D conclude?`,
      a: `The CRISPR deletion removes the shared TSS of LINC00115 and RP11-206L10.11 (and any DNA element in that stretch), so it cannot say which gene, or whether DNA or RNA, causes the growth effect. ASOs hit one RNA at a time. Two different ASOs against LINC00115 both lowered the RNA and slowed growth (P=0.034 and P=0.018). Two ASOs against RP11-206L10.11 lowered its RNA but growth was "ns". So LINC00115 drives proliferation through an RNA-dependent mechanism.`,
    },
  },

  /* ====================================================================== 3E */
  fig3E: {
    short: `Migration screen lines and photos`,
    question: `How did the ten guide pairs for the migration hit candidate 215 behave in the A549 migration screen, and does knocking down the three migration hits (215, 448, 489) with ASOs reduce how many cells cross a membrane?`,
    howToRead: `<p><b>Left graph: the screen.</b> It reads like panel B, but the two columns are two groups of cells, not two times. In the migration screen cells are placed on a porous membrane; those that cross and those that do not are collected separately. Each of the ten lines is one guide pair for candidate 215. All lines start at 0 at "Migrated" and end at the log2 fold change of that guide pair in "Not Migrated". <b>Up</b> means the guide pair is more common among the cells that did not migrate, so cells missing that target move less: the sign of a migration-promoting gene. <b>Down</b> means the opposite.</p>
<p><b>Right: the ASO follow-up.</b> The table gives the names behind the numbers: 215 is AC104024.3, 448 is CECR7 and 489 is MIR23AHG. Each round photo is a membrane after the test (a transwell assay): purple dots are cells that crossed, so more purple means more migration. The single photo on the left is the control (a non-targeting ASO); the top row is ASO1 and the bottom row ASO2 against each of the three lncRNAs.</p>
<p><b>A good result:</b> most guide pairs rise in the left graph, and both ASOs give clearly fewer purple dots than the control.</p>`,
    shows: `<p><b>Left.</b> Six of the ten guide pairs rise (pgRNA 6 the most, above the 2 tick), two dip slightly below 0 (pgRNA 1 and 4) and pgRNA 10 falls strongly. pgRNA 7 cannot be seen. So most guide pairs point the way a migration hit should: cells lacking this target are over-represented among the cells that did not migrate.</p>
<p><b>Right.</b> The control membrane is densely covered with purple cells. With the ASOs there are fewer, and the emptiest membranes belong to ASO2 against AC104024.3 (215) and ASO2 against CECR7 (448). The measured numbers are in panel F.</p>
<p>The text sums it up: ASO knockdown of the three hits "resulted in dramatic impairment of A549 migration".</p>`,
    keyNumbers: [
      { value: `215 · 448 · 489`, meaning: `the three migration hits tested with ASOs: AC104024.3, CECR7 and MIR23AHG`, source: ['fig3E', 'res-validation-p5'] },
      { value: `24 h`, meaning: `length of the transwell migration test in A549 cells (the screen itself ran for 48 h)`, source: ['fig3E', 'm-screen-migration-p1'] },
      { value: `10 pgRNAs`, meaning: `ten lines for candidate 215, one per guide pair`, source: ['fig3E'] },
      { value: `−1 to 2`, meaning: `range of the y-axis ticks on the left graph; "Migrated" is fixed at 0 for every guide pair`, source: ['fig3E'] },
    ],
    background: `<p><b>What a transwell shows.</b> Cells are put in an upper compartment above a membrane with tiny pores; the lower compartment holds medium that attracts them (the paper's methods use serum-free medium above and serum-rich medium below). After some hours the cells that squeezed through are stained and counted. The count depends on how many cells are alive and healthy as well as on how well they move, so a lower count can mean slower movement, fewer cells, or both.</p>`,
    flags: [
      `The legend of the left graph says only "Log2 fold change of pgRNAs in migrated and non-migrated cell populations". It does not say what the 0 at "Migrated" is measured against, how many screen replicates the lines come from, or give any statistic. Unlike panel B, the y-axis title has no "relative to ...".`,
      `Only nine of the ten lines can be followed to the right-hand end: pgRNA 7 is not visible.`,
      `The guide pairs do not all agree: pgRNA 10 goes strongly the other way and pgRNA 1 and 4 dip slightly. The target-level call uses all ten guide pairs together (the methods give a median or an average of the best few), which this graph cannot show.`,
      `The photographs have no scale bar, and the legend does not say which replicate is shown, what dye was used (crystal violet is named only in the legend of panel F and in the methods) or how many cells were seeded. They are examples, not the measurement: the MIR23AHG ASO1 photo looks about as crowded as the AC104024.3 ASO1 photo, yet its bar in panel F is clearly lower.`,
    ],
    chartTypes: ['F1', 'F3'],
    examQ: {
      q: `In Figure 3E (left), what does a line that rises to "Not Migrated" mean, and why does it point to a migration-promoting gene?`,
      a: `Each line is one guide pair: it starts at 0 in the migrated group and ends at its log2 fold change in the not-migrated group. A rising line means the guide pair is more common among cells that did not cross the membrane: cells that lost the target move less. That is how the migration screen picks genes that promote migration. Six of the ten guide pairs for candidate 215 rise, which supports it as a hit.`,
    },
  },

  /* ====================================================================== 3F */
  fig3F: {
    short: `ASO knockdown and migration counts`,
    question: `Do the six ASOs (two each for 215, 448 and 489) lower their target RNAs, and do they reduce how many A549 cells cross the membrane?`,
    howToRead: `<p>Both graphs use the same seven bars: the black <b>ASO control</b> (a non-targeting ASO), then ASO1 and ASO2 for each of the three lncRNAs, numbered 215, 448 and 489 (the names are in the table of panel E). Colours match across the two graphs.</p>
<p><b>Left: did the ASO work?</b> RNA left after ASO treatment, measured by RT-qPCR and divided by the housekeeping RNA HPRT1 (the legend adds that values are normalized to the non-targeting ASO). A bar below the control bar means <b>knockdown</b>; a bar near 0 means almost no RNA is left.</p>
<p><b>Right: did migration drop?</b> After the migration test the cells that crossed are stained with crystal violet, the dye is dissolved and its absorbance (OD) is read: more cells, more dye. Each bar is divided by the control, so the control is 1.0. The P values compare each ASO with the control (one-tailed Student's t test).</p>
<p><b>A good result:</b> bars well below the control in both graphs, with the two ASOs for the same lncRNA agreeing. Two different sequences giving the same answer makes a side effect of one ASO unlikely.</p>`,
    shows: `<p><b>Knockdown (left).</b> All six ASOs lower their target RNA. The weakest are ASO1 for 215, 448 and 489 (bars close to the 0.5 tick); the strongest is ASO2 for 448 (almost no RNA left).</p>
<p><b>Migration (right).</b> Every ASO lowers the crystal-violet signal. Five of the six differences are significant: P=0.029 and P=0.005 for 215, P=0.006 and P=0.006 for 448, and P=0.031 for ASO1 against 489. The sixth, ASO2 against 489 (MIR23AHG), has P=0.144: its bar is lower than the control, but the difference is not significant.</p>
<p>Together with panel E, this is the evidence behind the text's statement that ASO knockdown of the three hits impaired A549 migration.</p>`,
    keyNumbers: [
      { value: `P=0.029 · P=0.005`, meaning: `215 (AC104024.3): ASO1 and ASO2 versus control`, source: ['fig3F'] },
      { value: `P=0.006 · P=0.006`, meaning: `448 (CECR7): ASO1 and ASO2 versus control`, source: ['fig3F'] },
      { value: `P=0.031 · P=0.144`, meaning: `489 (MIR23AHG): ASO1 is significant, ASO2 is not`, source: ['fig3F'] },
      { value: `n=2 · n=3`, meaning: `as printed: the RT-qPCR graph says n=2, the crystal-violet graph n=3 (the legend says three independent biological replicates)`, source: ['fig3F'] },
    ],
    background: `<p><b>Migration versus growth.</b> A transwell test counts cells that ended up on the far side of the membrane. A lower count can mean slower movement, but also fewer or less healthy cells. A short test (24 h) limits this problem, but the count alone cannot separate the two.</p>`,
    flags: [
      `The legend says the data are "mean ± SD from three independent biological replicates", yet the RT-qPCR graph is labelled n=2 in the image, and the legend gives no time for the RT-qPCR (the axis title says 24h). With two values an SD is only a rough guide.`,
      `The legend says expression was "normalized to a non-targeting ASO"; the axis title says "Normalised to HPRT1". Probably both were done (HPRT1 first, then the control), but the legend does not say so. The control bar in the left graph has no visible error bar.`,
      `All P values come from one-tailed Student's t tests, with no correction for six comparisons. P=0.144 for ASO2 against MIR23AHG is above the paper's usual significance cut-off (STAR Methods, "Quantification and statistical analysis"). The text says three hits were validated ("dramatic impairment"); for MIR23AHG that rests on one significant ASO out of two.`,
      `For MIR23AHG the ASO that lowers the RNA more (ASO2) reduces migration less than ASO1 does. Neither legend nor text comments on this, and with n=2 the RNA bars are rough.`,
      `The right graph is titled "Fraction of migrated cells" but plots crystal-violet absorbance relative to the control: a relative amount of dye, not a literal fraction of cells. The image spells "Crystal" as "Cristal". Only the candidate numbers are printed under the bars; the gene names are in panel E.`,
    ],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: `One ASO in Figure 3F has P=0.144. Which one is it, and does the panel still support the claim that all three migration hits were validated?`,
      a: `It is ASO2 against MIR23AHG (candidate 489): its bar is lower than the control, but the difference is not significant by the paper's usual cut-off. The claim is still reasonably supported because the other ASO against MIR23AHG (P=0.031), both ASOs against AC104024.3 (P=0.029 and P=0.005) and both against CECR7 (P=0.006 each) are significant, and all six ASOs lowered their target RNA. But for MIR23AHG only one of the two independent ASOs reaches significance, so it is the weakest of the three.`,
    },
  },

});
