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
    chartTypes: ['F12'],
    examQ: {
      q: `In Figure 3A, why is candidate 205 harder to interpret than a lncRNA with a lone TSS, and how does the authors' next experiment solve the problem?`,
      a: `Candidate 205 sits on a shared TSS where two genes, LINC00115 and RP11-206L10.11, start back to back and are read in opposite directions. A guide-pair deletion removes the start of both (and any DNA element in that stretch), so the screen cannot say which gene, or whether the DNA or the RNA, causes the growth effect. The authors therefore aimed two ASOs at each RNA separately (Figure 3D). Only the LINC00115 ASOs slowed growth.`,
    },
  },

});
