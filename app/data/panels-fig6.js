window.PANELS = window.PANELS || {};

/* Figure 6 panel guides (A-L). Numbers that are computed or read off bars/boxes by eye are listed in `derived`
   and are called out as "read by eye" / "my sum" in the text. */

Object.assign(window.PANELS, {

  fig6A: {
    short: 'What features does GCAWKR carry?',
    question: 'Does the GCAWKR gene contain conserved sequences, conserved RNA structures or other known functional elements that could hint at how its RNA works?',
    howToRead: `<p>This is a <b>gene map</b> (a genome-browser picture; see lesson <a href="#/lesson/F12">F12</a>). The ruler at the top gives positions along Chr15 in kilobases (kb). The labels are 100,850, 100,860 and 100,870, so the labeled ticks are 10 kb apart (I computed this from the labels). The picture is read left to right, the way the gene is read: the bent arrow at the left end shows where the gene starts and which way it runs.</p>
<p>The first track draws the <b>exons</b> of GCAWKR as gray rectangles, joined by thin lines for the <b>introns</b>. The methods merge all exons of the locus into one outline (a "meta-transcript"), so you see one combined shape instead of every isoform (<a href="#/read/m-eztracks/m-eztracks-p2">m-eztracks-p2</a>). Pale orange bands run down from each exon through all the other tracks, so you can see which marks fall <i>inside</i> an exon (inside a band) and which fall in an intron (between bands).</p>
<p>Every lower track is one kind of public annotation drawn on the same coordinates: <b>RIDLs</b> (predicted pieces of transposable elements that took on a new job), <b>phastCons</b> (stretches of DNA kept similar across species), <b>CRSs</b> (RNA structures conserved in vertebrates), <b>Repeats_byClass</b> (repeat families: DNA, LINE, Low complexity, LTR, Simple repeat, SINE), a <b>Masked CpG Island</b> and <b>ENCODE_cCRE</b> (candidate regulatory elements). The legend says the strand is shown by the direction of a mark, so arrow-shaped marks point the way of the strand they sit on.</p>
<p>There is no pass or fail here. The question is simply how much is going on inside the exons.</p>`,
    shows: `<p>Marks from several tracks fall inside the shaded exon bands: conserved stretches (phastCons), some conserved RNA structures (CRSs), repeat-derived pieces and ENCODE regulatory-element boxes. A CpG island (the purple box) sits right at the start of the gene, and there is one RIDL mark, inside the large central exon. The authors read this as "numerous conserved sequences and structures", "hinting at potential functional elements". They contrast it with CHiLL1, whose exons "lack obvious functional elements" (Figure S5E, which is not part of this app).</p>
<p>This is a hint, not a result. The panel only shows where public annotations overlap the gene. It does not test whether any of these elements matter for what GCAWKR does.</p>`,
    keyNumbers: [
      { value: 'Chr15', meaning: 'the chromosome that carries GCAWKR; the exon track spans the full width of the ruler.', source: ['fig6A', 'res-aso-p5'] },
      { value: '100,850 to 100,870 kb', meaning: 'the three labeled positions on the ruler; the picture runs from just before 100,850 to just past 100,870.', source: ['fig6A'] },
      { value: 'GENCODE v36', meaning: 'the gene annotation that supplies the exon track (printed on the track label).', source: ['fig6A', 'm-rnaseq-p2'] }
    ],
    background: `<p>A genome-browser picture lines up many data sets on the same DNA coordinates. <b>Conservation</b> (phastCons) scores how little each stretch of DNA has changed between species; DNA that evolution keeps is often doing something useful. <b>CpG islands</b> are GC-rich stretches that are often found at the start of genes. <b>ENCODE candidate cis-regulatory elements (cCREs)</b> are stretches whose chemical marks look like promoters or enhancers. <b>LINE, SINE, LTR and DNA</b> are kinds of transposable element ("jumping DNA" that copied itself around the genome long ago), and lncRNAs often contain such fragments. <b>Simple repeat</b> and <b>Low complexity</b> are other repetitive stretches.</p>`,
    memory: `Transparent map overlays on one street plan: the exon track is the street plan, and each other track is an overlay you can lift on or off. Where the analogy stops: these overlays come from public databases and predictions, not from experiments in these cells.`,
    flags: [
      `The legend does not explain the bent arrow, the pale orange bands, the orange marks in the phastCons track, or the colors of the other marks. The reading above is the usual convention, not something the paper spells out.`,
      `No genome version is printed in the panel. The methods say these tracks use hg38, while the gene maps in Figure 5D are labeled hg19, so the same gene has different Chr15 numbers there.`,
      `Everything here is annotation from public databases (the legend says the plot was made with ezTracks). Nothing was measured in A549 cells for this panel, and no element is tested. The paper itself says only "hinting at potential functional elements".`,
      `The statement that CHiLL1 exons "lack obvious functional elements" rests on Figure S5E, a supplementary figure that is not part of this app.`
    ],
    chartTypes: ['F12'],
    derived: ['10'],
    examQ: {
      q: 'What does Figure 6A show, and what do the authors take from it?',
      a: 'It is a gene map of GCAWKR on Chr15 with public annotation tracks (RIDLs, phastCons conserved stretches, conserved RNA structures, repeat families, a CpG island and ENCODE regulatory elements) lined up under its exons. The authors say GCAWKR contains numerous conserved sequences and structures, which hints at potential functional elements, whereas CHiLL1 exons lack obvious ones (Figure S5E). It is only a hint: the panel does not test any of these elements.'
    }
  },

});
