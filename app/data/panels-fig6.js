window.PANELS = window.PANELS || {};

/* Figure 6 panel guides (A-L). Numbers that are computed (sums, percentages) are listed in `derived` and are
   called out as "my arithmetic" in the text. Values called "read by eye" come from bar/box heights and are
   approximate (see the matching FIGTEXT entry). */

Object.assign(window.PANELS, {

  fig6A: {
    short: `What features does GCAWKR carry?`,
    question: `Does the GCAWKR gene contain conserved sequences, conserved RNA structures or other known functional elements that could hint at how its RNA works?`,
    howToRead: `<p>This is a <b>gene map</b> (see lesson <a href="#/lesson/F3">F3</a>). The ruler gives positions along Chr15 in kilobases: the labels are 100,850, 100,860 and 100,870, so labeled ticks are 10 kb apart (my arithmetic). Read it left to right, the way the gene runs; the bent arrow at the left end marks where the gene starts.</p>
<p>The top track draws the <b>exons</b> as gray rectangles joined by thin lines for the <b>introns</b>. The methods merge all exons of the locus into one outline (a "meta-transcript"), so you see one combined shape instead of every isoform (<a href="#/read/m-eztracks/m-eztracks-p2">m-eztracks-p2</a>). Pale orange bands run down from each exon through every other track, so a mark inside a band lies inside an exon.</p>
<p>Each lower track is one public annotation on the same coordinates: <b>RIDLs</b> (predicted transposable-element pieces that took on a new job), <b>phastCons</b> (stretches kept similar across species), <b>CRSs</b> (RNA structures conserved in vertebrates), <b>Repeats_byClass</b> (repeat families), a <b>Masked CpG Island</b> and <b>ENCODE_cCRE</b> (candidate regulatory elements). The legend says strand is shown by the direction of a mark, so arrow-shaped marks point the way of their strand. There is no pass or fail here; the question is how much lies inside the exons.</p>`,
    shows: `<p>Marks from several tracks fall inside the exon bands: conserved stretches, some conserved RNA structures, repeat-derived pieces and ENCODE regulatory-element boxes. A CpG island (the purple box) sits at the start of the gene, and one RIDL mark lies in the large central exon. The authors read this as "numerous conserved sequences and structures", "hinting at potential functional elements", in contrast to CHiLL1, whose exons "lack obvious functional elements" (Figure S5E, not in this app).</p>
<p>It is a hint, not a result: the panel only shows where public annotations overlap the gene, and it tests nothing.</p>`,
    keyNumbers: [
      { value: `Chr15`, meaning: `the chromosome that carries GCAWKR; the exon track spans the full width of the ruler.`, source: ['fig6A', 'res-aso-p5'] },
      { value: `100,850 to 100,870 kb`, meaning: `the three labeled positions on the ruler; the picture runs from just before 100,850 to just past 100,870.`, source: ['fig6A'] },
      { value: `GENCODE v36`, meaning: `the gene annotation that supplies the exon track (printed on the track label).`, source: ['fig6A'] }
    ],
    background: `<p>A genome-browser picture lines up many data sets on the same DNA coordinates. <b>Conservation</b> (phastCons) scores how little each stretch of DNA has changed between species; DNA that evolution keeps is often doing something useful. <b>CpG islands</b> are GC-rich stretches often found at the start of genes. <b>ENCODE candidate cis-regulatory elements (cCREs)</b> are stretches whose chemical marks look like promoters or enhancers. <b>LINE, SINE, LTR and DNA</b> are kinds of transposable element ("jumping DNA" that copied itself around the genome long ago), and lncRNAs often contain such fragments. <b>Simple repeat</b> and <b>Low complexity</b> are other repetitive stretches.</p>`,
    memory: `Transparent map overlays on one street plan: the exon track is the street plan and each other track is an overlay you can lift on or off. Where the analogy stops: these overlays come from public databases and predictions, not from experiments in these cells.`,
    flags: [
      `The legend does not explain the bent arrow, the pale orange bands, the orange marks in the phastCons track, or the colors of the other marks. The reading above is the usual convention, not something the paper spells out.`,
      `No genome version is printed in the panel. The methods say these tracks use hg38, while the gene maps in Figure 5D are labeled hg19, so the same gene has different Chr15 numbers there.`,
      `Everything here is annotation from public databases (the legend says the plot was made with ezTracks). Nothing was measured in A549 cells for this panel and no element is tested. The paper itself says only "hinting at potential functional elements".`,
      `The statement that CHiLL1 exons "lack obvious functional elements" rests on Figure S5E, a supplementary figure that is not part of this app.`
    ],
    chartTypes: ['F3'],
    derived: ['10'],
    examQ: {
      q: `What does Figure 6A show, and what do the authors take from it?`,
      a: `It is a gene map of GCAWKR on Chr15 with public annotation tracks (RIDLs, phastCons conserved stretches, conserved RNA structures, repeat families, a CpG island and ENCODE regulatory elements) lined up under its exons. The authors say GCAWKR contains numerous conserved sequences and structures, which hints at potential functional elements, whereas CHiLL1 exons lack obvious ones (Figure S5E). It is only a hint: the panel does not test any of these elements.`
    }
  },

  fig6B: {
    short: `Where in the cell are the RNAs?`,
    question: `Do CHiLL1 and GCAWKR sit mainly in the cytoplasm or in the nucleus of A549 cells?`,
    howToRead: `<p><b>Left:</b> microscope pictures of A549 cells (see lessons <a href="#/lesson/D9">D9</a> and <a href="#/lesson/F3">F3</a>). The big gray ovals are the nuclei (the methods say the cells were counterstained with DAPI). Each tiny bright dot is one RNA molecule, lit up by RNA-FISH: fluorescent probes stick to the RNA you are looking for. The legend says arrows mark <i>selected</i> dots. Arrow colors match the bar colors (CHiLL1 green, GCAWKR orange).</p>
<p><b>Right:</b> the axis says "via spots count", so the dots were counted and turned into one ratio per RNA: cytoplasmic over nuclear (C/N). The methods name a CellProfiler-based pipeline, "SpeckleCounting", for analyzing the data (<a href="#/read/m-fish/m-fish-p2">m-fish-p2</a>). The line at 1.0 means "equal". Above it (arrow C) means more dots outside the nucleus; below it (arrow N) means more inside. A clearly cytoplasmic RNA would sit well above 1.0 and a clearly nuclear one well below.</p>`,
    shows: `<p>In the example pictures, the arrowed CHiLL1 dots lie outside the gray nuclei and the arrowed GCAWKR dots lie on the nuclei. The bars say the same: CHiLL1 is about 1.8 (well above 1.0) and GCAWKR is just under 1.0 (about 0.9), both read by eye. The authors call this a "contrasting localization pattern": CHiLL1 "principally in the cytoplasm" and GCAWKR "in the nucleus", despite their "similar oncogenic roles" (<a href="#/read/res-mechanism/res-mechanism-p1">res-mechanism-p1</a>). Where an RNA sits matters because it gives "important mechanistic clues for lncRNAs".</p>`,
    keyNumbers: [
      { value: `C/N about 1.8`, meaning: `CHiLL1: more dots outside the nucleus than inside (read by eye from the bar).`, source: ['fig6B'] },
      { value: `C/N about 0.9`, meaning: `GCAWKR: just below the equal line, so slightly more dots inside the nucleus (read by eye).`, source: ['fig6B'] },
      { value: `1.0`, meaning: `the black line: equal numbers of dots in cytoplasm and nucleus.`, source: ['fig6B'] },
      { value: `n=1`, meaning: `one experiment; no error bars are drawn.`, source: ['fig6B'] }
    ],
    background: `<p>RNA-FISH (fluorescence in situ hybridization) uses short labeled DNA "probes" that base-pair with the RNA of interest. Many probes bind one RNA molecule, so a single molecule shines bright enough to be seen as one dot.</p>`,
    flags: [
      `The legend says "Nuclear/cytoplasmic (N/C) quantification", but the chart is titled "Cytoplasmic/Nuclear ratio" and its axis says "C/N", the opposite way round. Read the chart as printed: high means cytoplasmic.`,
      `n=1 and no error bars or test: this is a single experiment, so it shows no spread. The paper adds cell fractionation (Figure 6C) and says specificity was validated by knockdown (Figure S5G, not in this app). The legend does not say how many cells or dots were counted.`,
      `GCAWKR is only a little below 1.0 here, so the images and Figure 6C carry the "in the nucleus" claim better than this bar does.`,
      `Arrows mark only selected dots, no scale bar is printed, and the title is printed as "Fluoscence" (kept as in the paper).`
    ],
    chartTypes: ['F3', 'F1'],
    examQ: {
      q: `Figure 6B reports a "C/N ratio via spots count". Which RNA is cytoplasmic and which is nuclear, how can you tell, and what is the weakness of this panel?`,
      a: `CHiLL1 is mainly cytoplasmic: its dots lie outside the nuclei and its C/N bar is about 1.8, above the 1.0 line. GCAWKR is mainly nuclear: its dots lie on the nuclei and its bar is just under 1.0. The weakness is n=1 with no error bars or statistics, and GCAWKR is only slightly below 1.0, which is why the paper backs it up with cell fractionation (Figure 6C).`
    }
  },

  fig6C: {
    short: `Fractionation confirms localization`,
    question: `When A549 cells are split into a nuclear and a cytoplasmic part, where do CHiLL1 and GCAWKR RNAs end up compared with known marker RNAs?`,
    howToRead: `<p>The cells were broken into a nuclear part and a cytoplasmic part (cell fractionation, lesson <a href="#/lesson/D9">D9</a>), and the amount of each RNA in each part was measured by qRT-PCR. Each bar is one RNA's nuclear-to-cytoplasmic ratio on a <b>log2</b> scale: 0 means equal, and each step of one means twice as much on that side.</p>
<p>The axis runs <b>backwards</b> (3 at the left, -2 at the right), so the nuclear side (N) is on the left and the cytoplasmic side (C) on the right.</p>
<p><b>MALAT1</b> and <b>GAPDH</b> are the controls (legend): MALAT1 is a known nuclear RNA and GAPDH a known cytoplasmic one. They show that the fractionation worked. A good result: MALAT1 points left and GAPDH points right. Then you can read the two lncRNAs against them.</p>`,
    shows: `<p>The controls behave: MALAT1 points far left (about 2.6, nuclear) and GAPDH points right (about -1.2, cytoplasmic). GCAWKR points left, almost as far as MALAT1 (about 2.3, which is roughly five times more in the nucleus than in the cytoplasm: 2 to the power 2.3, my arithmetic). CHiLL1 points right (about -0.8), on the cytoplasmic side like GAPDH, though less strongly. The paper says this "corroborated" the FISH result (Figure 6B). All bar values are read by eye.</p>`,
    keyNumbers: [
      { value: `GCAWKR about 2.3`, meaning: `log2 nuclear/cytoplasmic ratio: nuclear side, close to MALAT1 (read by eye).`, source: ['fig6C'] },
      { value: `CHiLL1 about -0.8`, meaning: `cytoplasmic side, like GAPDH but weaker (read by eye).`, source: ['fig6C'] },
      { value: `MALAT1 about 2.6, GAPDH about -1.2`, meaning: `the nuclear and cytoplasmic controls, each on the expected side (read by eye).`, source: ['fig6C'] },
      { value: `n=2`, meaning: `two replicates; the error bars are not defined in the legend.`, source: ['fig6C'] }
    ],
    memory: `Like checking a scale with one known heavy weight and one known light weight before weighing two mystery objects: MALAT1 and GAPDH are the known weights. Where it stops: a scale gives an absolute number, while this ratio only compares the two fractions.`,
    flags: [
      `The legend does not say what the error bars show or whether any test was used, and n=2 appears only in the panel. With two replicates the error bars are crude.`,
      `A ratio shows where an RNA sits, not how much of it there is, and the legend does not say how the nuclear and cytoplasmic amounts were normalized.`,
      `The names in brackets, RP11-875O11 for CHiLL1 and RP11-66B24 for GCAWKR, are older gene names (Figure 5D labels the same genes RP11-875O11.3 and RP11-66B24.2). The paper's text never explains them.`
    ],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: `Why are MALAT1 and GAPDH included in Figure 6C, and what do the CHiLL1 and GCAWKR bars show?`,
      a: `They are controls: MALAT1 is a nuclear RNA and GAPDH a cytoplasmic one, so seeing MALAT1 on the nuclear side and GAPDH on the cytoplasmic side shows the fractionation worked. GCAWKR lies on the nuclear side, close to MALAT1, and CHiLL1 on the cytoplasmic side, like GAPDH, which agrees with the FISH result in Figure 6B. Weakness: n=2 and undefined error bars.`
    }
  },

  fig6D: {
    short: `Did the ASO lower CHiLL1 RNA?`,
    question: `In the RNA-seq samples, did the CHiLL1 ASO (ASO1) lower the amount of CHiLL1 RNA compared with the control ASO?`,
    howToRead: `<p>RNA-seq counts the reads that come from every RNA in the cell (lesson <a href="#/lesson/D10">D10</a>), so it can also count CHiLL1 itself. The panel has two strips: A549 cells treated with <b>ASO1</b> (teal) and cells treated with the non-targeting <b>ASO control</b> (dark gray). Each strip has three RNA-seq replicates, numbered 1 to 3. The y axis is normalized expression per nucleotide (legend): higher means more CHiLL1 RNA.</p>
<p>Careful with the boxes. They do <b>not</b> show how much the replicates differ. They show "the variance of inference using bootstraps generated by Kallisto" (legend): the software re-samples the reads many times, and the box (middle line = median) shows how uncertain its own estimate is for that one replicate. A good knockdown: the ASO1 boxes clearly below the control boxes.</p>`,
    shows: `<p>The control boxes sit high (about 3.4 to 4.3). The ASO1 boxes for replicates 1 and 3 sit lower, around 2, and replicate 2 collapses to a flat line below zero (about -0.7). So CHiLL1 is lower in all three ASO1 replicates (values read by eye). The text says "RNA-seq confirmed ASO knockdown efficiency" and that CHiLL1 expression in control cells was 8.3 transcripts per million (TPM), about 4 molecules per cell and "consistent with FISH" (<a href="#/read/res-mechanism/res-mechanism-p2">res-mechanism-p2</a>).</p>`,
    keyNumbers: [
      { value: `8.3 TPM`, meaning: `CHiLL1 expression in control cells.`, source: ['res-mechanism-p2'] },
      { value: `∼4 molecules per cell`, meaning: `the same expression expressed as molecules per cell; the paper says it is consistent with FISH.`, source: ['res-mechanism-p2'] },
      { value: `3 replicates`, meaning: `three RNA-seq replicates per condition (legend); each box is one replicate.`, source: ['fig6D'] },
      { value: `about 2 versus about 4`, meaning: `typical level of the ASO1 boxes versus the control boxes on the y axis (read by eye).`, source: ['fig6D'] }
    ],
    background: `<p>A bootstrap re-draws the reads at random, with repeats, many times and re-estimates each time. If the estimates barely move, the number is solid; if they scatter, the software is unsure. That scatter is what the boxes draw.</p>`,
    flags: [
      `The y axis shows negative numbers (ASO1 replicate 2 sits near -0.7), which counts cannot be, so the axis must be some transformed scale. The legend only says "normalized expression (counts) per nucleotide".`,
      `ASO1 replicate 2 is a flat line far below the other two. A flat box means all the re-sampled estimates agree, which is what you would see if almost no CHiLL1 reads were left, but the paper does not comment on it.`,
      `The boxes show the software's uncertainty, not variation between experiments, and no P value is shown. So this panel shows the size of the drop but does not test it.`,
      `Only ASO1 is shown here. The paper also cites Figure S6A, a supplementary figure that is not part of this app.`
    ],
    chartTypes: ['F1'],
    examQ: {
      q: `What do the boxes in Figure 6D represent, and what do they tell you about the CHiLL1 ASO?`,
      a: `Each box is one RNA-seq replicate and shows the spread of Kallisto bootstrap estimates of CHiLL1 expression, which is the software's own uncertainty, not the spread between experiments. The ASO1 boxes lie clearly below the ASO control boxes in all three replicates, so ASO1 lowers CHiLL1 RNA; the authors say RNA-seq confirmed the knockdown efficiency. No statistics are shown.`
    }
  },

  fig6E: {
    short: `Two CHiLL1 ASOs, same changes`,
    question: `Do two different ASOs against CHiLL1 change the same genes in the same direction, which would point to the loss of CHiLL1 itself as the cause?`,
    howToRead: `<p>Each dot is one gene. The x axis is how much the gene changed after <b>ASO1</b>, the y axis after <b>ASO2</b>, both as <b>log2FC</b> against control cells (lesson <a href="#/lesson/E1">E1</a>): 0 means no change, positive means up, negative means down, and each step of one is a doubling or halving. The dashed lines at 0 cut the plot into four corners, and the number in each corner is how many genes fall there (legend).</p>
<p>Why two ASOs? They bind different parts of CHiLL1, so their side effects should differ, but the loss of CHiLL1 is the same. If CHiLL1 is the cause, the genes should move together: dots along the diagonal, mostly in the upper-right corner (up with both) and the lower-left corner (down with both).</p>
<p>The blue line is the regression line. <b>R</b> is the Pearson correlation: one means perfect agreement, zero means none. "P<2.2e-16" is the smallest value R prints, meaning "extremely small". The colors (scale "Count") show crowding: a little square with many genes is yellow, one with few is purple; isolated genes are black dots.</p>`,
    shows: `<p>Most genes agree: 874 go up with both ASOs and 808 go down with both, while 171 and 153 disagree. The two agreeing corners hold 1682 of 2006 genes, about 84%, and R=0.75 (sums and percentage are my arithmetic; the four counts add up to 2006, the same number printed as "DEGs, A549" in Figure 6F). The paper reads this as "highly correlated between ASOs", so "the majority of effects arise via on-target perturbation of CHiLL1" (<a href="#/read/res-mechanism/res-mechanism-p2">res-mechanism-p2</a>).</p>`,
    keyNumbers: [
      { value: `R=0.75`, meaning: `Pearson correlation between the two ASOs' effects on gene expression (P<2.2e-16).`, source: ['fig6E'] },
      { value: `874 and 808`, meaning: `genes that go up with both ASOs and genes that go down with both ASOs.`, source: ['fig6E'] },
      { value: `171 and 153`, meaning: `genes that disagree between the two ASOs (the gray corners).`, source: ['fig6E'] },
      { value: `2006`, meaning: `my sum of the four corners; it equals "DEGs, A549" printed in Figure 6F.`, source: ['fig6E', 'fig6F'] },
      { value: `about 84%`, meaning: `share of the genes that sit in the two agreeing corners (my arithmetic: 1682 of 2006).`, source: ['fig6E'] }
    ],
    memory: `Two independent witnesses (the two ASOs) describe the same event (the loss of CHiLL1). If their stories match, the story is probably about the event and not about each witness's quirks. Where it stops: two witnesses can share a bias, so agreement supports the conclusion but does not prove it.`,
    flags: [
      `The legend does not say which genes are plotted or how significance was decided. The corner counts add up to 2006, matching "DEGs, A549" in Figure 6F, so the plotted genes are probably the differentially expressed genes (the methods use a q-value cut-off: <a href="#/read/m-rnaseq/m-rnaseq-p2">m-rnaseq-p2</a>), but this is not stated.`,
      `A correlation says the two ASOs agree, not that they are right. About 16% of the genes sit in the disagreeing corners (324 of 2006, my arithmetic). With so many genes even a weak correlation gives a tiny P, so judge by R and the corner counts, not by P.`,
      `The legend does not describe how the "Count" squares were binned, or how well each ASO lowered CHiLL1 (that is Figure S6A, not in this app).`
    ],
    chartTypes: ['F1', 'F2'],
    derived: ['2006', '1682', '324', '84', '16'],
    examQ: {
      q: `Why did the authors compare two different ASOs against CHiLL1 (Figure 6E), and which numbers support their conclusion?`,
      a: `Two ASOs bind different parts of CHiLL1, so their off-target effects should differ while the loss of CHiLL1 is shared. If the same genes change in the same direction, the changes are most likely caused by CHiLL1 loss (on-target). Here R=0.75 (P<2.2e-16), with 874 genes up and 808 down with both ASOs against only 171 and 153 that disagree. The authors conclude that the majority of effects arise via on-target perturbation of CHiLL1.`
    }
  },

  fig6F: {
    short: `Pathways changed by CHiLL1 loss`,
    question: `Which known pathways (KEGG) are over-represented among the genes changed by CHiLL1 knockdown, and do A549 and H460 cells agree?`,
    howToRead: `<p>Each dot is one <b>KEGG pathway</b>, a catalog entry for a known cell process or disease (for example "p53 signaling pathway"). Its position says how strongly the genes changed by CHiLL1 knockdown are over-represented in that pathway (an <b>enrichment</b> test, lesson <a href="#/lesson/D10">D10</a>): x for A549, y for H460. The panel prints the number of DEGs for each cell line, 2006 in A549 and 3015 in H460, and the legend says genes affected "in common" by ASO1 and ASO2 were used.</p>
<p>The axes are labeled "Adjusted P-value", but here <b>higher means more significant</b> (the significant pathways sit top right), so these cannot be raw adjusted P-values, where smaller is better. They are probably transformed (for example -log10), which the figure does not say. The dashed lines at about 0.7 (the legend does not explain them) look like significance cut-offs: a dot above and to the right of both lines would be significant in both cell lines. Green labels mark the cancer-relevant pathways that are significant in both (legend).</p>
<p><b>R</b> is the Pearson correlation across all pathways: do pathways that score high in A549 also score high in H460? A good result for "the same effect in both cell lines" is a clear positive correlation with the key pathways in the top-right zone.</p>`,
    shows: `<p>Nine pathways are labeled in green, all in the zone significant for both cell lines: Proteoglycans in cancer, p53 signaling pathway, Small cell lung cancer, Non-small cell lung cancer, PI3K-Akt signaling pathway, Apoptosis, Pathways in cancer, MAPK signaling pathway and VEGF signaling pathway. The paper stresses disease relevance ("non-small cell lung cancer"), two possible mechanisms (MAPK and PI3K-Akt) and apoptosis, which it then tests in Figure 6G. It says the "high degree of concordance between the two cell backgrounds" supports the generality of CHiLL1 effects across KRAS+ NSCLC cells (<a href="#/read/res-mechanism/res-mechanism-p3">res-mechanism-p3</a>). The correlation is R=0.48.</p>`,
    keyNumbers: [
      { value: `DEGs: 2006 (A549), 3015 (H460)`, meaning: `the number of differentially expressed genes tested in each cell line; the panel prints "H450", a typo for H460.`, source: ['fig6F'] },
      { value: `R=0.48`, meaning: `correlation of pathway significance between A549 and H460 (P<2.2e-16).`, source: ['fig6F'] },
      { value: `about 0.7`, meaning: `where the dashed cut-off lines sit on both axes (read by eye).`, source: ['fig6F'] },
      { value: `9 green labels`, meaning: `cancer-relevant pathways significant in both cell lines (legend), including apoptosis, MAPK and PI3K-Akt.`, source: ['fig6F', 'res-mechanism-p3'] }
    ],
    background: `<p>An enrichment test asks: do more of my changed genes belong to this pathway than chance alone would give? A small p-value says yes. It does not say whether the pathway as a whole goes up or down.</p>`,
    flags: [
      `The axis labels say "Adjusted P-value", but the numbers (0 to 4) and their direction show a transformed scale that is not named. The legend does not say what the dashed lines mean. For what it is worth, 0.7 is about -log10 of 0.2 (my arithmetic); the paper does not say that this is the cut-off.`,
      `Typo kept as printed: "DEGs, H450 = 3015" should read H460, the cell line used everywhere else.`,
      `R=0.48 is a moderate correlation, while the text speaks of a "high degree of concordance"; judge the agreement from where the top pathways sit as well as from R.`,
      `"Small cell lung cancer", another lung cancer type, is also highlighted but is not discussed in the text. The paper also cites Figure S6D (supplementary, not in this app).`
    ],
    chartTypes: ['F1'],
    derived: ['0.2'],
    examQ: {
      q: `What do the dots, the dashed lines and the green labels in Figure 6F mean, and what do they say about CHiLL1?`,
      a: `Each dot is a KEGG pathway, placed by how strongly it is enriched among the genes changed by CHiLL1 knockdown in A549 (x) and H460 (y). The dashed lines mark a significance cut-off, so dots above and right of both lines are significant in both cell lines; green labels mark the cancer-relevant ones, such as non-small cell lung cancer, MAPK, PI3K-Akt and apoptosis. R=0.48 between the two cell lines supports that CHiLL1 effects are similar in both, and apoptosis is then tested in Figure 6G.`
    }
  },

  fig6G: {
    short: `Does knockdown trigger apoptosis?`,
    question: `Do more cells die by apoptosis after CHiLL1 or GCAWKR knockdown?`,
    howToRead: `<p>Cells were stained with <b>Annexin V</b> (marks cells that are starting to die) and a <b>viability dye</b> (marks cells that are already dead) and counted by flow cytometry (lesson <a href="#/lesson/D8">D8</a>), 24 h after the ASOs were transfected. That sorts every cell into one of four groups, the four colors: <b>Alive</b> (blue-gray), <b>Early-apoptotic</b> (pale yellow), <b>Late-apoptotic</b> (dark purple) and <b>Necrotic</b> (black).</p>
<p>Each bar is 100% of the cells in one sample, so compare the <b>height of each color</b>, mainly the pale yellow. The left chart is CHiLL1, the right chart GCAWKR. In each cell line (A549, H460) there are three bars: the non-targeting <b>ASO control</b> (the baseline) and two different ASOs against the same RNA (ASO1, ASO2), so an effect is unlikely to be a quirk of one ASO. Two cell lines show whether the effect is general.</p>`,
    shows: `<p>CHiLL1 knockdown raises the early-apoptotic share: in A549 from about 6% (control) to about 22% and 28% (ASO1, ASO2), and in H460 from about 5% to about 53% and 67% (all read by eye from the bar heights). The GCAWKR bars change much less in H460 (about 7% in the control, then 9% and 6%); in A549 only ASO2 shows a rise (about 9% to 21%). The paper says "knockdown of CHiLL1, but not GCAWKR, resulted in a significant increase of early apoptotic cells" (<a href="#/read/res-mechanism/res-mechanism-p5">res-mechanism-p5</a>), which fits the "apoptosis" pathway in Figure 6F.</p>`,
    keyNumbers: [
      { value: `about 6% to 22% and 28%`, meaning: `CHiLL1 knockdown: early-apoptotic cells in A549 (control, ASO1, ASO2; read by eye).`, source: ['fig6G'] },
      { value: `about 5% to 53% and 67%`, meaning: `the same in H460 (read by eye).`, source: ['fig6G'] },
      { value: `about 9% to 21%`, meaning: `GCAWKR ASO2 in A549: the one visible rise for GCAWKR (read by eye).`, source: ['fig6G'] },
      { value: `n=2`, meaning: `printed above each chart; the legend does not mention n.`, source: ['fig6G'] },
      { value: `24 h`, meaning: `time between ASO transfection and the assay (legend).`, source: ['fig6G'] }
    ],
    background: `<p>Annexin V sticks to a molecule that moves to the outside of the cell membrane early in apoptosis. The viability dye can only enter cells whose membrane has become leaky. Neither signal means alive, Annexin V alone means early apoptotic, both means late apoptotic, and the dye alone means necrotic. This is the usual logic of the assay; the paper does not spell it out.</p>`,
    flags: [
      `No error bars, P values or test are shown, so the word "significant" in the text cannot be checked on this panel. The legend does not mention n; the panel prints n=2.`,
      `In A549, the GCAWKR ASO2 bar also has a taller early-apoptotic band than its control (about 21% versus about 9%), so "but not GCAWKR" holds more clearly in H460. How the authors decided is not shown.`,
      `The stacking order is not explained: in the CHiLL1 chart the order from the bottom is necrotic, early, alive, late, while in the GCAWKR chart the black necrotic band floats inside the H460 bars. Read the sizes of the colors, not their positions.`
    ],
    chartTypes: ['F2', 'F3'],
    examQ: {
      q: `What does Figure 6G show, and why were two ASOs and two cell lines used?`,
      a: `An Annexin V assay: CHiLL1 knockdown increases the early-apoptotic fraction (about 6% to 22-28% in A549 and about 5% to 53-67% in H460), while GCAWKR knockdown changes it little (a rise only with ASO2 in A549). Two different ASOs per RNA make an ASO-specific side effect unlikely, and two cell lines show the effect is general. The text says CHiLL1, but not GCAWKR, significantly increases early apoptotic cells, but the panel shows no statistics.`
    }
  },

  fig6H: {
    short: `Did the ASO lower GCAWKR RNA?`,
    question: `In the RNA-seq samples, did the GCAWKR ASO (ASO2) lower GCAWKR RNA compared with the control ASO?`,
    howToRead: `<p>The design is the same as in Figure 6D, now for GCAWKR: A549 cells treated with <b>ASO2</b> (orange) or the non-targeting <b>ASO control</b> (dark gray), with three RNA-seq replicates each (numbered 1 to 3). The y axis is normalized expression per nucleotide, so higher means more GCAWKR RNA. Each box shows the software's bootstrap uncertainty for one replicate, not the spread between replicates (see 6D). A good knockdown: the ASO2 boxes sit clearly below the control boxes.</p>`,
    shows: `<p>The control boxes sit high (about 3.3 to 3.9). The ASO2 boxes are lower: about 1.3 in replicate 2 and about 0.8 in replicate 3, and replicate 1 is a flat line below zero (about -0.7), all read by eye. So GCAWKR is clearly lower in all three. The paper reports "effective knockdown" using a single ASO. GCAWKR is a rare RNA, with mean expression 2.5 TPM, about 1 copy per cell (<a href="#/read/res-mechanism/res-mechanism-p6">res-mechanism-p6</a>).</p>`,
    keyNumbers: [
      { value: `2.5 TPM`, meaning: `mean expression of GCAWKR.`, source: ['res-mechanism-p6'] },
      { value: `∼1 copy per cell`, meaning: `the same expression as copies per cell.`, source: ['res-mechanism-p6'] },
      { value: `3 replicates`, meaning: `three RNA-seq replicates per condition; each box is one replicate.`, source: ['fig6H'] },
      { value: `about 3.3 to 3.9 versus about 0.8 to 1.3`, meaning: `control boxes versus ASO2 boxes (read by eye); replicate 1 of ASO2 is a flat line near -0.7.`, source: ['fig6H'] }
    ],
    flags: [
      `The legend says "(H) As for (C), for GCAWKR", but this panel mirrors Figure 6D (the RNA-seq boxes), not 6C. Printed that way in the paper.`,
      `Only one ASO (ASO2) was sequenced for GCAWKR, unlike CHiLL1 in Figure 6E, and the paper does not say why. The replicates also differ a lot: replicate 1 is a flat line near -0.7, replicates 2 and 3 are far higher.`,
      `Negative values again (about -0.7): the axis is some transformed scale that the legend does not name. No test or P value is shown, and Figure S6G, also cited, is supplementary.`
    ],
    chartTypes: ['F1'],
    examQ: {
      q: `What does Figure 6H show, and how does it differ from the CHiLL1 version in Figure 6D?`,
      a: `It shows GCAWKR RNA in three RNA-seq replicates of A549 cells treated with ASO2 or a control ASO (the boxes show Kallisto bootstrap uncertainty); the ASO2 boxes are far below the controls, so the knockdown works. Unlike CHiLL1, only a single ASO (ASO2) was sequenced for GCAWKR, and the paper then checks that this ASO gives similar changes in two cell lines (Figure 6I).`
    }
  },

  fig6I: {
    short: `GCAWKR ASO2 in two cell lines`,
    question: `Does the same GCAWKR ASO (ASO2) change genes in the same way in A549 and H460 cells?`,
    howToRead: `<p>Read it like Figure 6E, with one difference. Each dot is a gene; the x axis is its log2FC after ASO2 in <b>A549</b> and the y axis its log2FC after the <b>same ASO2</b> in <b>H460</b> (control = 0, positive = up, negative = down). The dashed lines at 0 cut the plot into four corners with gene counts, R is the Pearson correlation, and the colors ("Count", 5 to 25) show crowding. The legend says the plot compares knockdown "with the same ASO in A549 and H460 cells".</p>
<p>The question is different, too. In 6E the agreement was between two ASOs in one cell line (to argue the changes come from the RNA and not from one ASO). Here it is one ASO in two cell lines, to test whether the effect depends on the cell line. A good result: dots along the diagonal, mostly in the upper-right corner (up in both) and the lower-left corner (down in both).</p>`,
    shows: `<p>The cell lines agree strongly: 1098 genes go up in both and 1194 go down in both, against only 132 and 69 that disagree. That is about 92% in the agreeing corners (the four counts add up to 2493; my arithmetic), with R=0.8. The paper calls these "cell-type-independent effects" of GCAWKR knockdown (<a href="#/read/res-mechanism/res-mechanism-p6">res-mechanism-p6</a>).</p>`,
    keyNumbers: [
      { value: `R=0.8`, meaning: `Pearson correlation between the A549 and H460 effects of GCAWKR ASO2 (P<2.2e-16).`, source: ['fig6I'] },
      { value: `1098 and 1194`, meaning: `genes that go up in both cell lines and genes that go down in both.`, source: ['fig6I'] },
      { value: `132 and 69`, meaning: `genes that disagree between the cell lines (the gray corners).`, source: ['fig6I'] },
      { value: `2493`, meaning: `my sum of the four corners; the paper does not print this total.`, source: ['fig6I'] },
      { value: `about 92%`, meaning: `share of genes in the two agreeing corners (my arithmetic).`, source: ['fig6I'] }
    ],
    memory: `The same witness (ASO2) questioned in two towns (A549 and H460): the same story in both towns shows it is not a local rumor. Where it stops: it does not show the witness is right, because the witness could be wrong in the same way in both towns.`,
    flags: [
      `The legend says "(I) As for (D)", but this scatter plot mirrors Figure 6E. It also writes "p = 2.2 × 10−16" while the panel prints "P<2.2e-16"; read it as "less than".`,
      `What this can and cannot show: the same ASO is used in both cell lines, so an off-target effect of that ASO would be shared too. The panel supports generality across cell lines; by itself it does not show the changes are on-target (that needs a second ASO, as in 6E). Figure S6G, cited with it, is supplementary.`,
      `The legend does not say which genes are plotted. The methods say the common genes deregulated in A549 and H460 were selected for GCAWKR (<a href="#/read/m-rnaseq/m-rnaseq-p2">m-rnaseq-p2</a>).`,
      `Paragraph <a href="#/read/res-mechanism/res-mechanism-p6">res-mechanism-p6</a> does cite this panel ("Figures 6H, 6I, and S6G"), even if the list of citing paragraphs below does not show it.`
    ],
    chartTypes: ['F1', 'F2'],
    derived: ['2493', '92'],
    examQ: {
      q: `Compare what Figure 6E and Figure 6I test. Why are the designs different?`,
      a: `Figure 6E compares two different ASOs against CHiLL1 in one cell line (A549): their strong agreement argues that the changes come from the loss of CHiLL1 rather than from one ASO. Figure 6I compares the same GCAWKR ASO (ASO2) in two cell lines (A549 and H460): agreement (R=0.8; 1098 genes up and 1194 down in both) shows the effect is not specific to one cell line, the paper's "cell-type-independent effects". Because only one ASO was sequenced for GCAWKR, 6I does not by itself exclude an off-target effect shared by both cell lines.`
    }
  },

  fig6J: {
    short: `Themes changed by GCAWKR loss`,
    question: `Which broad biological themes (MSigDB terms) are over-represented among the genes changed by GCAWKR knockdown in both cell lines?`,
    howToRead: `<p>Each bar is one <b>MSigDB term</b>, a named list of genes that belong to one biological theme (lesson <a href="#/lesson/D10">D10</a>). The genes tested are the DEGs "in common between A549 and H460" (legend). A longer bar means a more significant over-representation. The terms are sorted from most to least significant, and only "the most significant terms are shown" (legend), 14 of them here. All bars have the same color, so color carries no meaning.</p>
<p>The value axis is called "Significance" and runs 0 to 8. The legend calls it "adjusted p value (q value)", but a q-value cannot be above 1, so the axis must be a transformed scale (probably -log10, which the figure does not say). Read it as: longer means stronger evidence. Enrichment says that many changed genes belong to a theme; it does not say whether the theme goes up or down.</p>`,
    shows: `<p>The top term is the p53 Pathway (about 8.3, read by eye), followed by Glycolysis (about 5.9) and mTORC1 Signaling (about 4.8). The text says several terms overlap with CHiLL1 (p53 pathway, cholesterol homeostasis, epithelial to mesenchymal transition), while "G2-M checkpoint" is one of the GCAWKR-specific terms that relate to cell-cycle progression (<a href="#/read/res-mechanism/res-mechanism-p6">res-mechanism-p6</a>). That led to the cell-cycle test in Figure 6K. This is the "distinct but overlapping" of the figure title: the paper's closing sentence calls the gene networks "non-overlapping", yet some themes recur.</p>`,
    keyNumbers: [
      { value: `p53 Pathway about 8.3`, meaning: `the most significant term; its bar runs just past the 8 tick (read by eye).`, source: ['fig6J'] },
      { value: `G2-M Checkpoint about 4.5`, meaning: `the cell-cycle term the paper names; it led to the cell-cycle test in Figure 6K.`, source: ['fig6J', 'res-mechanism-p6'] },
      { value: `14 terms`, meaning: `shown on the plot: the most significant ones only (I counted them).`, source: ['fig6J'] },
      { value: `Apoptosis about 3.4`, meaning: `appears on the list, although early apoptosis does not clearly rise with GCAWKR knockdown in Figure 6G.`, source: ['fig6J'] }
    ],
    flags: [
      `The legend says "y axis: adjusted p value (q value)", but in the image the bars run horizontally and the value axis (x) is labeled "Significance" with ticks 0 to 8, which cannot be raw q-values. The transformation is not stated.`,
      `The legend does not say how many terms were tested, where the cut-off for "most significant" lies, or which MSigDB collection was used. (Background: these names match MSigDB's "Hallmark" gene sets; that "Hallmark" has nothing to do with the "hallmarks of cancer".)`,
      `"Apoptosis" is on the list, but enrichment shows only that apoptosis genes changed, not that apoptosis increased. CHiLL1's own MSigDB results are in Figure S6E (supplementary), so the "overlap" with CHiLL1 cannot be checked here.`
    ],
    chartTypes: ['F1'],
    derived: ['14'],
    examQ: {
      q: `Which cell-cycle-related term appears in Figure 6J, and which experiment tests the idea?`,
      a: `"G2-M Checkpoint" appears among the GCAWKR terms (about 4.5 on the significance axis). The paper follows it up in Figure 6K: knocking down GCAWKR, but not CHiLL1, increases the share of A549 cells in the G2 phase.`
    }
  },

  fig6K: {
    short: `GCAWKR loss piles cells up in G2`,
    question: `Does knocking down CHiLL1 or GCAWKR change which phase of the cell cycle A549 cells are in?`,
    howToRead: `<p>The cell-cycle assay stains the DNA of each cell and counts the cells by flow cytometry (lesson <a href="#/lesson/D8">D8</a>). A cell with one set of DNA is in <b>G1</b>, one that is copying its DNA is in <b>S</b>, and one that has finished copying is in <b>G2</b>, about to divide. Each group of bars is one phase and each bar is the percent of cells in that phase, so the three bars of one color add up to roughly all the cells. In each group: the non-targeting <b>ASO control</b> (black), <b>CHiLL1 ASO1</b> (teal) and <b>GCAWKR ASO2</b> (orange).</p>
<p>The legend says the error bars are the SD, n = 2 biological replicates, and the P values come from a two-tailed Student's t test. The line under a P value seems to show which bars were compared (control versus GCAWKR ASO2); "ns" means not significant. A block in the cycle would show as more cells in one phase and fewer in another.</p>`,
    shows: `<p>GCAWKR knockdown shifts cells toward G2: the G2 bar rises from about 21% (control) to about 40% (P=0.009), while the G1 bar falls from about 65% to about 56% (P=0.036); values read by eye. CHiLL1 knockdown changes nothing significant (ns in G1 and G2). The paper: "knockdown of GCAWKR, but not CHiLL1, led to an increase of cells in the G2 phase" (<a href="#/read/res-mechanism/res-mechanism-p6">res-mechanism-p6</a>), which follows from the "G2-M checkpoint" term in Figure 6J.</p>`,
    keyNumbers: [
      { value: `P=0.009`, meaning: `G2 phase: GCAWKR ASO2 versus control (two-tailed t test).`, source: ['fig6K'] },
      { value: `P=0.036`, meaning: `G1 phase: GCAWKR ASO2 versus control.`, source: ['fig6K'] },
      { value: `about 21% to 40%`, meaning: `share of cells in G2: control versus GCAWKR ASO2 (read by eye).`, source: ['fig6K'] },
      { value: `n=2`, meaning: `biological replicates; error bars are SD (legend).`, source: ['fig6K'] },
      { value: `24 h`, meaning: `time between ASO transfection and the assay.`, source: ['fig6K'] }
    ],
    background: `<p>A DNA stain measures how much DNA a cell holds. It cannot tell a G2 cell from a cell in mitosis (M), because both hold the same amount; the paper says "G2 phase".</p>`,
    memory: `Cells queue at the gate between G2 and division; a bigger queue in the G2 waiting room means the gate is slow or shut. Where it stops: one photo of the queue cannot tell slow from shut.`,
    flags: [
      `With only two replicates per bar, a t test (and the SD) rests on very little data, so treat P=0.009 and P=0.036 as suggestive.`,
      `The legend does not say which pairs were compared (the lines suggest control versus GCAWKR ASO2), or whether any correction for many comparisons was used.`,
      `Only one ASO per RNA and only A549 are used here, unlike the apoptosis assay in Figure 6G. One snapshot at 24 h cannot tell cells that are slowed in G2 from cells that are stuck there.`
    ],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: `What does Figure 6K show about GCAWKR, and how strong is the evidence?`,
      a: `In A549 cells, GCAWKR ASO2 increases the share of cells in G2 (about 21% to 40%, P=0.009) and lowers G1 (P=0.036), while CHiLL1 ASO1 does not change the cell cycle significantly (ns). This fits the G2-M checkpoint term in Figure 6J. The evidence is limited: n=2 biological replicates, a two-tailed Student's t test, one ASO, one cell line and one time point (24 h).`
    }
  },

  fig6L: {
    short: `GCAWKR loss reduces migration`,
    question: `Do A549 cells with GCAWKR knocked down cross a porous membrane less well than control cells?`,
    howToRead: `<p>This is a <b>transwell (Boyden chamber) assay</b> (lesson <a href="#/lesson/D8">D8</a>). Cells start in an upper chamber with plain medium; the lower chamber holds serum-rich medium, which attracts them. After a day, the cells that squeezed through the pores to the underside are stained with <b>crystal violet</b> (purple), the cells left on top are wiped away, the dye is dissolved and its <b>optical density (OD)</b> is read: more cells crossed means more dye and a higher OD.</p>
<p>The bar shows OD relative to the control, which is set to 1.0. The legend says the error bars are the SD, n = 4 biological replicates, and the P value comes from a one-tailed Student's t test. The two photos show stained membranes, and each purple dot is a cell. Compare the amount of purple, not the background color, which differs between the photos.</p>`,
    shows: `<p>The GCAWKR ASO2 bar is about 0.4 of the control (roughly 60% lower, my arithmetic; P=0.002), and the left photo has far fewer purple cells than the control photo on the right. The paper says GCAWKR "knockdown led to impaired cell migratory capability" (<a href="#/read/res-mechanism/res-mechanism-p6">res-mechanism-p6</a>).</p>`,
    keyNumbers: [
      { value: `P=0.002`, meaning: `GCAWKR ASO2 versus control (one-tailed Student's t test, legend).`, source: ['fig6L'] },
      { value: `about 0.4`, meaning: `GCAWKR ASO2 bar relative to the control bar of 1.0 (read by eye).`, source: ['fig6L'] },
      { value: `n=4`, meaning: `biological replicates; error bars are SD (legend).`, source: ['fig6L'] }
    ],
    flags: [
      `A one-tailed test only asks whether the knockdown value is lower, so it reaches significance more easily than the two-tailed test used in Figure 6K. The legend states the choice but the paper does not explain it.`,
      `The assay counts cells that reached the underside after a fixed time. Fewer crossed cells could also come from slower growth or more cell death, and this panel cannot separate those from reduced movement (a general caution, not a statement in the paper).`,
      `Only GCAWKR, one ASO (ASO2) and one cell line (A549) are shown; CHiLL1 has no migration panel here. No scale bar is printed, and the legend does not say the photos are representative.`,
      `The text says GCAWKR targets are "enriched for migration genes" but cites no panel for it. The closest terms in Figure 6J are Epithelial Mesenchymal Transition and Apical Junction, which the figure does not label as migration.`
    ],
    chartTypes: ['F1', 'F3', 'F4'],
    derived: ['60'],
    examQ: {
      q: `How does the assay in Figure 6L measure migration, and what does the result show?`,
      a: `It is a transwell assay: cells in the upper chamber move toward serum in the lower chamber, those that cross the membrane are stained with crystal violet, and the dissolved dye's optical density is read. With GCAWKR ASO2 the OD is about 0.4 of the control (P=0.002, one-tailed t test, n=4) and the photo shows far fewer purple cells, so GCAWKR knockdown impairs migration. Caveats: one ASO, one cell line, and fewer cells could also reflect slower growth.`
    }
  },

});
