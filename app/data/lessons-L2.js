/* lessons-L2.js — lessons B3, B4, B5, B6 (scope L2). Each lesson only ADDS to window.LESSON_CONTENT. */

/* ============================================================================================== B3 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'B3',
  defines: ['protein', 'rna'],
  body: [
    { k: 'h', text: 'The problem: how do you say exactly where?' },
    { k: 'bgnd', html:
      `<p>The human genome is about 3 billion letters long, so "somewhere on chromosome 2" is no use if you want to cut at one precise spot or compare two datasets. Scientists need an <b>address</b>: a street, a house number and a city.</p>` },
    { k: 'h', text: 'Genome coordinates and kilobases' },
    { k: 'bgnd', html:
      `<p><b>Genome coordinates</b> have three parts: the <b>chromosome</b> (the street), a <b>position</b> counted in base pairs from the start of that chromosome (the house number), and often the <b>strand</b> (below). A stretch of DNA is written with a start and an end, for example <i>chr2: 1,000,000–1,002,000</i> (made-up numbers). That stretch is about 2,000 letters long.</p>` +
      `<p>A <b>kilobase (kb)</b> is 1,000 letters. It is the usual unit for gene-sized distances, so "less than 2 kb away" means "closer than 2,000 letters".</p>` },
    { k: 'h', text: 'Genome versions: hg19 vs hg38' },
    { k: 'bgnd', html:
      `<p>There is no single, final "human genome file". Scientists publish a <b>reference</b> sequence and keep improving it, filling gaps and fixing mistakes. Each complete release is a <b>genome assembly</b>, or genome version. You will meet two: <b>hg19</b> (also named GRCh37) and the newer <b>hg38</b> (GRCh38).</p>` +
      `<p>Because the sequence was edited, the same spot gets <b>different numbers</b> in different versions, like a city that renumbers its streets. So a coordinate means nothing unless you know its version, and mixing versions sends you to the wrong place. The fix is <b>liftOver</b>, a free tool that converts positions from one version to another. It handles most of the genome, but a few regions that changed a lot cannot be converted.</p>` },
    { k: 'svg', caption: 'Made-up numbers: the same gene sits at different positions in two genome versions. liftOver translates between them.',
      svg: `<svg viewBox="0 0 480 215" role="img" aria-label="Two rulers for the same piece of DNA: in hg19 the gene sits at one set of numbers and in hg38 at shifted numbers; liftOver converts between them">` +
        `<text x="6" y="40" class="b">hg19</text>` +
        `<line x1="60" y1="60" x2="470" y2="60" class="ln thick s-blue"/>` +
        `<path d="M100 54 V66 M200 54 V66 M300 54 V66 M400 54 V66" class="ln thin"/>` +
        `<text x="100" y="82" class="mid s m">1,000</text><text x="200" y="82" class="mid s m">2,000</text><text x="300" y="82" class="mid s m">3,000</text><text x="400" y="82" class="mid s m">4,000</text>` +
        `<rect x="240" y="36" width="80" height="22" rx="5" class="f-orange"/><text x="280" y="52" class="mid s b">gene</text>` +
        `<text x="6" y="130" class="b">hg38</text>` +
        `<line x1="60" y1="150" x2="470" y2="150" class="ln thick s-teal"/>` +
        `<path d="M100 144 V156 M200 144 V156 M300 144 V156 M400 144 V156" class="ln thin"/>` +
        `<text x="100" y="172" class="mid s m">1,000</text><text x="200" y="172" class="mid s m">2,000</text><text x="300" y="172" class="mid s m">3,000</text><text x="400" y="172" class="mid s m">4,000</text>` +
        `<rect x="276" y="126" width="80" height="22" rx="5" class="f-orange"/><text x="316" y="142" class="mid s b">gene</text>` +
        `<path d="M240 58 L276 126 M320 58 L356 126" class="ln dash m"/>` +
        `<text x="64" y="102" class="s">Same DNA,</text><text x="64" y="120" class="s">different numbers</text>` +
        `<text x="240" y="204" class="mid s b t-purple">liftOver converts one set of numbers into the other</text></svg>` },
    { k: 'h', text: 'Two strands, antisense, and "upstream"' },
    { k: 'bgnd', html:
      `<p>DNA has two strands that run in opposite directions (lesson B2). By convention the strand written out in the reference, with numbers growing left to right, is the <b>plus (+) strand</b>; its partner is the <b>minus (−) strand</b>. To use a gene, the cell makes a working copy of it called an <b>RNA</b> (lesson B4), reading along one strand. The gene is "on" that strand and points in its 5′→3′ direction: left to right for a plus-strand gene, right to left for a minus-strand gene. About half of all genes are on each strand.</p>` +
      `<p>The two strands share the same stretch of DNA, so two genes can sit in the same place, one on each strand. A gene that overlaps another but lies on the opposite strand is <b>antisense</b> to it. (Names ending in <b>-AS1</b>, like DNMBP-AS1, usually mean "antisense to the gene named before the dash".)</p>` +
      `<p>Genes have a direction, so the DNA around them is described by it. <b>Downstream</b> is further along the direction the gene points; <b>upstream</b> is back the way you came. For a plus-strand gene, upstream means smaller numbers. For a minus-strand gene it is <i>the other way round</i>: upstream means larger numbers.</p>` },
    { k: 'svg', caption: 'Gene A is on the plus strand and gene B on the minus strand. Up- and downstream flip for B. Overlapping genes on opposite strands are antisense.',
      svg: `<svg viewBox="0 0 480 215" role="img" aria-label="Two DNA strands: gene A on the plus strand points right and an overlapping gene B on the minus strand points left, with upstream and downstream reversed for gene B">` +
        `<text x="4" y="64" class="b">+ strand</text>` +
        `<path d="M84 60 H470" class="arrow"/>` +
        `<text x="90" y="84" class="mid s m">5′</text><text x="466" y="84" class="end s m">3′</text>` +
        `<polygon points="130,46 270,46 290,60 270,74 130,74" class="f-orange"/><text x="205" y="65" class="mid b">gene A</text>` +
        `<text x="88" y="34" class="mid s b t-orange">upstream of A</text><text x="345" y="34" class="mid s b t-orange">downstream of A</text>` +
        `<text x="4" y="144" class="b">− strand</text>` +
        `<path d="M470 140 H84" class="arrow"/>` +
        `<text x="90" y="126" class="mid s m">3′</text><text x="466" y="126" class="end s m">5′</text>` +
        `<polygon points="380,126 240,126 220,140 240,154 380,154" class="f-teal"/><text x="300" y="145" class="mid b">gene B</text>` +
        `<text x="150" y="176" class="mid s b t-teal">downstream of B</text><text x="425" y="176" class="mid s b t-teal">upstream of B</text>` +
        `<text x="240" y="204" class="mid s">A and B overlap but sit on opposite strands: antisense</text></svg>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a genome address is a street address. The <b>chromosome</b> is the street, the <b>position</b> the house number, the <b>genome version</b> the edition of the city map (a new edition may renumber the houses), and <b>liftOver</b> the old-to-new conversion table. The <b>strand</b> is which of two one-way lanes a gene drives in; <b>upstream</b> means "where the traffic comes from". <i>It breaks down</i> because a street has one direction, while DNA has two lanes running in opposite directions in the same place.</p>` },
    { k: 'h', text: 'How this paper uses these ideas' },
    { k: 'paper', ref: 'res-pipeline-p2', quote: 'we omitted any target regions <2 kb from the nearest protein-coding exon' },
    { k: 'plain', source: ['res-pipeline-p2', 'm-library-design-p2'], html:
      `<p>To avoid false alarms from accidentally hitting the wrong DNA, the authors left out any target closer than <b>2 kb</b> to the nearest part of a gene that carries the recipe for a protein (a protein is one of the cell's tiny working machines; lesson B5). The Methods put it as "<2kb up or downstream" of such a gene.</p>` },
    { k: 'paper', ref: 'm-cnv-p2', quote: 'converted to hg19 coordinates using liftOver' },
    { k: 'plain', source: ['m-cnv-p1', 'm-cnv-p2'], html:
      `<p>The Methods compare the positions of the authors' targets with public data on how many copies of each DNA region patient samples and cultured cells carry. The comparison is made in <b>hg19</b>: they "intersected the hg19 coordinates" of their targets with the hg19 coordinates of one dataset, and a second dataset first had to be "converted to hg19 coordinates using liftOver".</p>` },
    { k: 'paper', ref: 'res-aso-p4', quote: 'It is localized upstream and on the same strand of the PCG TNFRSF10B' },
    { k: 'plain', source: ['res-aso-p4', 'res-aso-p3'], html:
      `<p>"It" is CHiLL1, which sits on chromosome 8. Its neighbor TNFRSF10B (a gene that makes a protein, and CHiLL1's "nearest neighbor" in the paper's words) points the same way along the DNA, and CHiLL1 comes first.</p>` },
    { k: 'paper', ref: 'limitations-p1', quote: 'unintentional targeting of overlapping cis- or trans-acting elements, such as DNA regulatory regions or opposite-strand lncRNA genes' },
    { k: 'plain', source: ['limitations-p1'], html:
      `<p>This is the authors' own warning about their DNA-cutting method. A cut meant for one gene can unintentionally disrupt something that overlaps it: DNA that helps control another gene, or a gene on the <b>opposite strand</b>. They say such cases can be resolved afterwards with a different method that targets the RNA copy instead of the DNA (lesson D6), which can show whether an effect really comes from the RNA on the intended strand.</p>` },
    { k: 'flag', source: ['m-library-design-p1', 'm-cnv-p1', 'm-eztracks-p1'], html:
      `<p>The Methods use <b>two</b> genome versions. One of the gene lists used to choose the targets is labeled GRCh37 (the same as hg19), and target positions are given in hg19, while the tracks drawn for the figures use hg38. When you see a position in this paper, check which version it belongs to.</p>` },
  ],
  appears: [
    { ref: 'res-pipeline-p2', note: 'Targets less than 2 kb from the nearest protein-coding exon were left out.' },
    { ref: 'm-cnv-p2', note: 'A dataset is converted to hg19 coordinates with liftOver.' },
    { ref: 'res-aso-p4', note: 'CHiLL1 lies upstream of TNFRSF10B and on the same strand.' },
    { ref: 'limitations-p1', note: 'Opposite-strand genes are a risk of cutting DNA.' },
  ],
  checks: [
    { q: 'A colleague gives you a gene\'s position (chromosome and numbers) but not the genome version. Why is that a problem?',
      options: [
        { t: 'The same numbers can point to a different spot in hg19 than in hg38, so you could end up looking at the wrong DNA', ok: true, why: 'Right: the reference is edited between versions, so positions shift. A coordinate only makes sense together with its version, and liftOver converts between versions.' },
        { t: 'hg19 and hg38 are genome versions of two different species', ok: false, why: 'Both are versions of the same human reference genome. hg38 is the newer one, with errors fixed and gaps filled.' },
        { t: 'Positions only work for genes on the plus strand', ok: false, why: 'Positions work for any stretch of DNA. The strand is extra information about direction, not a limit on where coordinates apply.' },
        { t: 'It is not a problem, because positions never change between versions', ok: false, why: 'They do change when the reference is corrected, which is exactly why a converter such as liftOver exists.' },
      ], bg: true },
    { q: 'A gene sits on the minus strand. Which side of the gene is "upstream"?',
      options: [
        { t: 'The side with larger position numbers (to the right), because this gene points right to left', ok: true, why: 'Right: upstream is back the way the gene points. A minus-strand gene points toward smaller numbers, so its upstream side has larger numbers.' },
        { t: 'The side with smaller numbers, as for every gene', ok: false, why: 'That is true only for plus-strand genes. For a minus-strand gene the direction, and so up and downstream, is reversed.' },
        { t: 'Upstream always means the left side of the page', ok: false, why: 'Upstream and downstream depend on the gene\'s own direction, not on the page. Left is upstream only for a plus-strand gene.' },
        { t: 'Upstream means the inside of the gene', ok: false, why: 'Upstream and downstream describe the DNA outside the gene, before it and after it along its direction.' },
      ], bg: true },
    { q: 'The paper places CHiLL1 upstream of the gene TNFRSF10B and on the same strand as it. What does that tell you?',
      options: [
        { t: 'Both genes point the same way along the DNA, and CHiLL1 comes before TNFRSF10B in that direction', ok: true, why: '"Same strand" means the same direction; "upstream" means CHiLL1 lies before TNFRSF10B along that direction.' },
        { t: 'The two genes overlap on opposite strands, so CHiLL1 is antisense to TNFRSF10B', ok: false, why: '"Same strand" is the opposite of that. Overlapping genes on opposite strands are the antisense case.' },
        { t: 'CHiLL1 and TNFRSF10B are two names for the same gene', ok: false, why: 'The paper treats them as two neighboring genes: it calls TNFRSF10B the nearest neighbor of CHiLL1.' },
        { t: 'CHiLL1 comes after TNFRSF10B in the direction the genes point', ok: false, why: 'Upstream means before: CHiLL1 lies on the side the genes point away from, so it comes first.' },
      ], source: ['res-aso-p4', 'res-aso-p3'] },
  ],
});
