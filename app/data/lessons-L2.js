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
      `<p>DNA has two strands that run in opposite directions (lesson B2). By convention the strand written out in the reference, with numbers growing left to right, is the <b>plus (+) strand</b>; its partner is the <b>minus (−) strand</b>. To use a gene, the cell makes a working copy of it called an <b>RNA</b> (lesson B4), whose letters match one of the two strands. The gene is "on" that strand and points in its 5′→3′ direction: left to right for a plus-strand gene, right to left for a minus-strand gene. About half of all genes are on each strand.</p>` +
      `<p>The two strands share the same stretch of DNA, so two genes can sit in the same place, one on each strand. A gene that overlaps another but lies on the opposite strand is <b>antisense</b> to it. (Gene names ending in <b>-AS1</b> usually mean "antisense to the gene named before the dash".)</p>` +
      `<p>Genes have a direction, so the DNA around them is described by it. <b>Downstream</b> is further along the direction the gene points; <b>upstream</b> is back the way you came. For a plus-strand gene, upstream means smaller numbers. For a minus-strand gene it is <i>the other way round</i>: upstream means larger numbers.</p>` },
    { k: 'svg', caption: 'Gene A is on the plus strand and gene B on the minus strand. Up- and downstream flip for B. Overlapping genes on opposite strands are antisense.',
      svg: `<svg viewBox="0 0 480 215" role="img" aria-label="Two DNA strands: gene A on the plus strand points right and an overlapping gene B on the minus strand points left, with upstream and downstream reversed for gene B">` +
        `<text x="4" y="64" class="b">+ strand</text>` +
        `<path d="M84 60 H130" class="ln"/><path d="M290 60 H470" class="arrow"/>` +
        `<text x="90" y="84" class="mid s m">5′</text><text x="466" y="84" class="end s m">3′</text>` +
        `<polygon points="130,46 270,46 290,60 270,74 130,74" class="f-orange"/><text x="205" y="65" class="mid b">gene A</text>` +
        `<text x="88" y="34" class="mid s b t-orange">upstream of A</text><text x="345" y="34" class="mid s b t-orange">downstream of A</text>` +
        `<text x="4" y="144" class="b">− strand</text>` +
        `<path d="M470 140 H380" class="ln"/><path d="M220 140 H84" class="arrow"/>` +
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
      `<p>The Methods compare the positions of the authors' targets with public data on how many copies of each DNA region patient samples and cultured cells carry. The comparison is made in <b>hg19</b>: they "intersected the hg19 coordinates" of their targets with the hg19 coordinates of one dataset, and a second dataset was first "converted to hg19 coordinates using liftOver".</p>` },
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
        { t: 'CHiLL1 comes after TNFRSF10B in the direction the genes point', ok: false, why: 'Upstream means before: CHiLL1 lies back along the direction the genes point, so it comes first.' },
      ], source: ['res-aso-p4', 'res-aso-p3'] },
  ],
});

/* ============================================================================================== B4 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'B4',
  defines: ['protein'],
  body: [
    { k: 'h', text: 'The problem: the DNA never leaves home' },
    { k: 'bgnd', html:
      `<p>Your DNA stays inside the <b>nucleus</b>. Most of the cell's work is done outside it, in the <b>cytoplasm</b>, mainly by <b>proteins</b> (tiny working machines that the cell builds; lesson B5 explains them). So the cell makes a temporary copy of <i>one gene at a time</i> and sends the copy out. That copy is <b>RNA</b>. Making it is called <b>transcription</b>, and the finished copy is a <b>transcript</b>.</p>` +
      `<p>RNA is a single strand of nucleotides, written with the same alphabet as DNA except that it uses <b>U</b> where DNA uses T. Many RNAs are short-lived, so the cell can make lots of copies and later throw them away while the master DNA stays untouched.</p>` },
    { k: 'h', text: 'Copying a gene: RNA polymerase' },
    { k: 'bgnd', html:
      `<p>The copying machine is <b>RNA polymerase</b>. It attaches to the DNA, opens the two strands a little, and slides along one strand, adding one RNA letter at a time by base pairing (lesson B2). The new RNA is the partner of the strand it reads, so it has the same letters as the <i>other</i> strand, with U for T. That other strand is the one the gene is "on" (lesson B3).</p>` },
    { k: 'h', text: 'Where copying starts: promoter, TSS and a twist' },
    { k: 'bgnd', html:
      `<p>Just upstream of a gene lies a stretch of DNA called the <b>promoter</b>, the landing strip where RNA polymerase attaches. The exact DNA letter where the RNA copy <b>begins</b> is the <b>transcription start site</b>, or <b>TSS</b>. From there the machine moves downstream. A gene can have more than one TSS. If the start site is missing, the machine has nowhere to begin and the gene is not copied. That is the trick behind the whole paper.</p>` +
      `<p>Some promoters work in <b>both directions</b>. One landing strip then starts <i>two</i> genes that point away from each other, one on each strand (lesson B3), with their TSSs almost on top of each other. Such a pair shares a <b>bidirectional promoter</b>, and two different RNAs come from one place.</p>` },
    { k: 'h', text: 'Editing the copy: exons, introns, splicing, isoforms' },
    { k: 'bgnd', html:
      `<p>The first RNA copy is longer than the finished RNA. Genes are built in pieces. <b>Exons</b> are the pieces that stay in the final RNA (the first exon begins at the TSS); <b>introns</b> are the pieces in between that get cut out and discarded. The cutting and joining is <b>splicing</b>. It happens in the nucleus, usually while the RNA is still being made.</p>` +
      `<p>One gene can give several finished RNAs, by starting at different TSSs or by joining different exons. Each version is an <b>isoform</b> (or "alternative transcript").</p>` +
      `<p>One last word. Normally the machine lets go at the end of a gene. Sometimes it does not: it runs on into the next gene on the same strand and makes one long RNA covering both. That is <b>readthrough transcription</b>.</p>` },
    { k: 'svg', caption: 'A gene is copied from the TSS; the first copy is spliced (introns out, exons joined). Different edits of the same gene are isoforms.',
      svg: `<svg viewBox="0 0 480 305" role="img" aria-label="A gene on DNA with a promoter, a TSS arrow and three exons separated by introns; the first RNA copy has the same pieces; splicing cuts out the introns and joins the exons, giving isoform 1 with all three exons and isoform 2 with exon 2 skipped">` +
        `<text x="4" y="63" class="b">DNA</text>` +
        `<path d="M50 58 H56 M122 58 H132 M182 58 H252 M302 58 H372 M422 58 H474" class="ln thick s-blue"/>` +
        `<rect x="56" y="44" width="66" height="28" rx="6" class="f-green"/><text x="89" y="63" class="mid s b">promoter</text>` +
        `<path d="M132 20 V44" class="arrow s-red"/><text x="142" y="28" class="s b t-red">TSS: copying starts</text>` +
        `<rect x="132" y="44" width="50" height="28" rx="4" class="f-orange"/><text x="157" y="63" class="mid s">exon 1</text>` +
        `<rect x="252" y="44" width="50" height="28" rx="4" class="f-orange"/><text x="277" y="63" class="mid s">exon 2</text>` +
        `<rect x="372" y="44" width="50" height="28" rx="4" class="f-orange"/><text x="397" y="63" class="mid s">exon 3</text>` +
        `<text x="217" y="90" class="mid s m">intron</text><text x="337" y="90" class="mid s m">intron</text>` +
        `<path d="M277 98 V128" class="arrow s-purple"/><text x="286" y="118" class="s t-purple b">transcription</text>` +
        `<text x="4" y="155" class="b">RNA copy</text>` +
        `<path d="M182 150 H252 M302 150 H372" class="ln thick s-orange"/>` +
        `<rect x="132" y="136" width="50" height="28" rx="4" class="f-orange"/><text x="157" y="155" class="mid s">exon 1</text>` +
        `<rect x="252" y="136" width="50" height="28" rx="4" class="f-orange"/><text x="277" y="155" class="mid s">exon 2</text>` +
        `<rect x="372" y="136" width="50" height="28" rx="4" class="f-orange"/><text x="397" y="155" class="mid s">exon 3</text>` +
        `<text x="277" y="184" class="mid s m">first copy: exons and introns</text>` +
        `<path d="M277 190 V214" class="arrow s-purple"/><text x="286" y="207" class="s t-purple b">splicing</text>` +
        `<text x="4" y="239" class="b">isoform 1</text>` +
        `<rect x="132" y="224" width="50" height="28" rx="4" class="f-orange"/><text x="157" y="243" class="mid s">exon 1</text>` +
        `<rect x="182" y="224" width="50" height="28" rx="4" class="f-orange"/><text x="207" y="243" class="mid s">exon 2</text>` +
        `<rect x="232" y="224" width="50" height="28" rx="4" class="f-orange"/><text x="257" y="243" class="mid s">exon 3</text>` +
        `<text x="294" y="243" class="s m">all exons kept</text>` +
        `<text x="4" y="283" class="b">isoform 2</text>` +
        `<rect x="132" y="268" width="50" height="28" rx="4" class="f-orange"/><text x="157" y="287" class="mid s">exon 1</text>` +
        `<rect x="182" y="268" width="50" height="28" rx="4" class="f-orange"/><text x="207" y="287" class="mid s">exon 3</text>` +
        `<text x="244" y="287" class="s m">exon 2 skipped</text></svg>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> the DNA is a master cookbook that never leaves the office, and a transcript is a photocopy of one recipe. The promoter is the runway and the TSS is the exact spot where takeoff begins. Then the photocopy is edited like a film: the scenes that stay are <b>exons</b>, the cut scenes are <b>introns</b>, and different edits of the same footage are <b>isoforms</b>. <i>It breaks down</i> because introns are not always useless, and the cell edits while it copies, not afterward.</p>` },
    { k: 'h', text: 'How this paper uses these ideas' },
    { k: 'paper', ref: 'res-pipeline-p1', quote: 'by deleting target genes’ transcription start sites (TSS) via paired guide RNAs (pgRNAs) and effectively inhibits gene expression' },
    { k: 'plain', source: ['res-pipeline-p1'], html:
      `<p>The authors switch a gene off by <b>deleting its TSS</b>, using molecular scissors steered by a pair of short RNA pieces (lesson D1). Without its start site the gene cannot be copied. They give two reasons for deleting only the start region rather than the whole gene: the removed pieces are short and all alike (shorter ones work more efficiently), and there is less chance of false alarms from removing other DNA that overlaps the gene and helps control things.</p>` },
    { k: 'paper', ref: 'res-pipeline-p2', quote: 'lncRNA candidates with bidirectional promoters or with overlapping TSSs were merged into a single TSS' },
    { k: 'plain', source: ['res-pipeline-p2', 'fig1C', 'res-validation-p2'], html:
      `<p>When target genes shared a start region, the authors counted them as <b>one</b> target. They report that 95.2% of target regions contain a single promoter, 4.5% contain two and 0.3% contain three. The final list has 831 genes but 998 TSSs; the Figure 1C legend notes that some loci are represented by more than one TSS. One example is candidate 205, which overlaps the TSSs of two genes, LINC00115 and RP11-206L10.11, that the paper calls "bidirectional antisense" genes.</p>` },
    { k: 'paper', ref: 'res-aso-p4', quote: 'consists of two annotated isoforms, sharing the first exon' },
    { k: 'paper', ref: 'res-aso-p5', quote: 'GCAWKR (Chr15) comprises four isoforms sharing a common TSS' },
    { k: 'plain', source: ['res-aso-p4', 'res-aso-p5'], html:
      `<p>CHiLL1 has two listed isoforms that share their first exon, and GCAWKR has four isoforms that share one TSS. So each of the two final genes comes in several versions. The authors also asked whether CHiLL1 and its neighbor TNFRSF10B are sometimes copied together into one long RNA. They write that they "find no evidence for readthrough transcription between the two loci", citing two kinds of evidence (their Figures S5A and S5B).</p>` },
  ],
  appears: [
    { ref: 'res-pipeline-p1', note: 'The screen switches genes off by deleting their TSS.' },
    { ref: 'res-pipeline-p2', note: 'Bidirectional promoters and overlapping TSSs are merged into one target; 95.2% / 4.5% / 0.3%.' },
    { ref: 'res-aso-p4', note: 'CHiLL1: two isoforms sharing the first exon; no evidence for readthrough with its neighbor.' },
    { ref: 'res-aso-p5', note: 'GCAWKR: four isoforms sharing a common TSS.' },
  ],
  checks: [
    { q: 'What does RNA polymerase do?',
      options: [
        { t: 'It reads one strand of a gene and builds an RNA copy of it, one letter at a time, starting at the TSS', ok: true, why: 'Right: that is transcription, the copying step.' },
        { t: 'It copies the whole genome before a cell divides', ok: false, why: 'Copying the whole genome is a different job, done by different machinery. RNA polymerase copies one gene at a time, into RNA.' },
        { t: 'It cuts the introns out of the RNA', ok: false, why: 'Cutting out introns is splicing, done by another cell machine, usually while the RNA is still being made.' },
        { t: 'It builds a protein straight from the gene', ok: false, why: 'Proteins are built later, from an RNA copy (lesson B5). RNA polymerase only makes the RNA.' },
      ], bg: true },
    { q: 'According to the paper, why delete only the TSS instead of the whole gene?',
      options: [
        { t: 'The removed pieces are shorter and uniform (more efficient), and there is less chance of false alarms from removing overlapping DNA that helps control other genes', ok: true, why: 'Right: these are the two benefits the paragraph lists. And because the TSS is where copying begins, removing it is enough to stop the gene being copied.' },
        { t: 'Deleting the whole gene would not stop the RNA being made', ok: false, why: 'It would stop it. The point is that the TSS-only approach is more efficient and cleaner, not that the whole-gene approach fails.' },
        { t: 'Longer removed pieces are more efficient, so the TSS region is deleted together with its neighbors', ok: false, why: 'The paper says the opposite: shorter pieces are more efficient, and the aim is to avoid removing nearby DNA.' },
        { t: 'The TSS is the only part of a gene that is copied into RNA', ok: false, why: 'The whole gene (all its exons) is copied. The TSS is only the point where copying begins.' },
      ], source: ['res-pipeline-p1'] },
    { q: 'What is splicing?',
      options: [
        { t: 'Cutting the introns out of a new RNA copy and joining the exons together', ok: true, why: 'Right: exons are the kept pieces, introns the cut-out pieces.' },
        { t: 'Joining two genes together in the DNA', ok: false, why: 'Splicing works on the RNA copy. The DNA itself is not changed.' },
        { t: 'Cutting the exons out and keeping the introns', ok: false, why: 'Reversed: the exons are the pieces that stay in the finished RNA.' },
        { t: 'Starting the RNA copy at the TSS', ok: false, why: 'That is the start of transcription. Splicing edits the copy during or after copying.' },
      ], bg: true },
    { q: 'The paper says GCAWKR "comprises four isoforms sharing a common TSS". What does that mean?',
      options: [
        { t: 'Four different RNA versions made from the same gene, all starting at the same place', ok: true, why: 'Right: isoforms are alternative versions of one gene\'s RNA; here they all begin at the same TSS.' },
        { t: 'Four different genes that start at the same landing strip, facing different ways', ok: false, why: 'That would be four genes. Isoforms are versions of the RNA of one gene.' },
        { t: 'Four copies of the same RNA in different parts of the cell', ok: false, why: 'Isoforms differ in their makeup (for example in which exons they contain); they are not copies in different places.' },
        { t: 'Two RNAs made in opposite directions from one promoter', ok: false, why: 'That describes a bidirectional promoter: two genes, one on each strand. Isoforms are alternative versions of one gene\'s RNA.' },
      ], source: ['res-aso-p5'] },
  ],
});

/* ============================================================================================== B5 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'B5',
  defines: ['lncrna', 'rps5'],
  body: [
    { k: 'h', text: 'The problem: what happens to an RNA copy?' },
    { k: 'bgnd', html:
      `<p>Lesson B4 ended with an RNA copy of a gene. What the cell does next depends on the kind of gene. For many genes the RNA is a <b>recipe</b> for building something. For others the RNA <b>is</b> the finished product.</p>` },
    { k: 'h', text: 'Proteins, mRNA and translation' },
    { k: 'bgnd', html:
      `<p>A <b>protein</b> is a chain of small building blocks called amino acids, folded into a precise shape. The order of the blocks sets the shape, and the shape sets the job: proteins digest food, carry oxygen, build the cell's scaffolding and copy DNA. Humans have roughly 20,000 genes with protein recipes.</p>` +
      `<p>The recipe copy is called <b>messenger RNA (mRNA)</b>. It goes to the cytoplasm, where a <b>ribosome</b> (a machine made of RNA and proteins) reads it three letters at a time. Each triplet calls for one amino acid, and the ribosome links them into a chain. This is <b>translation</b>: the message is converted from RNA letters into amino acids. (Do not confuse it with <i>transcription</i>, which copies DNA into RNA.)</p>` },
    { k: 'h', text: 'Reading frames and ORFs' },
    { k: 'bgnd', html:
      `<p>Because the ribosome reads in threes, where it <i>starts</i> matters. Try "THE FAT CAT ATE THE RAT". Grouped in threes it makes sense; shift by one letter and you get "HEF ATC ATA TET HER AT", nonsense. The ribosome starts at a start triplet (AUG) and stops at a stop triplet (UAA, UAG or UGA). A stretch that begins at a start, runs in step and reaches a stop with no other stop in between is an <b>open reading frame (ORF)</b>: "open" means nothing interrupts it. In random letters a stop shows up about every 20 triplets, so a long ORF is a hint that a sequence is meant to be translated.</p>` },
    { k: 'svg', caption: 'An ORF: read in triplets from a start (AUG) to a stop (UAA) with no stop in between. Each triplet adds one amino acid.',
      svg: `<svg viewBox="0 0 480 150" role="img" aria-label="An open reading frame: an RNA read in groups of three letters, from the AUG start triplet to a UAA stop triplet with no stop in between, each triplet adding one amino acid">` +
        `<text x="4" y="55" class="b">RNA</text>` +
        `<rect x="52" y="34" width="40" height="30" rx="5" class="f-green"/><text x="72" y="55" class="mid s b">AUG</text>` +
        `<rect x="98" y="34" width="40" height="30" rx="5" class="f-gray"/><text x="118" y="55" class="mid s">CAG</text>` +
        `<rect x="144" y="34" width="40" height="30" rx="5" class="f-gray"/><text x="164" y="55" class="mid s">GUU</text>` +
        `<rect x="190" y="34" width="40" height="30" rx="5" class="f-gray"/><text x="210" y="55" class="mid s">AAC</text>` +
        `<rect x="236" y="34" width="40" height="30" rx="5" class="f-gray"/><text x="256" y="55" class="mid s">CUG</text>` +
        `<rect x="282" y="34" width="40" height="30" rx="5" class="f-gray"/><text x="302" y="55" class="mid s">GAA</text>` +
        `<rect x="328" y="34" width="40" height="30" rx="5" class="f-red"/><text x="348" y="55" class="mid s b">UAA</text>` +
        `<text x="72" y="24" class="mid s b t-green">start</text><text x="348" y="24" class="mid s b t-red">stop</text>` +
        `<text x="4" y="90" class="s m">adds:</text>` +
        `<text x="72" y="90" class="mid s">Met</text><text x="118" y="90" class="mid s">Gln</text><text x="164" y="90" class="mid s">Val</text><text x="210" y="90" class="mid s">Asn</text><text x="256" y="90" class="mid s">Leu</text><text x="302" y="90" class="mid s">Glu</text><text x="348" y="90" class="mid s m">ends</text>` +
        `<path d="M52 104 V112 H368 V104" class="ln"/>` +
        `<text x="210" y="134" class="mid s b">open reading frame: no stop signal inside</text></svg>` },
    { k: 'h', text: 'Coding vs noncoding' },
    { k: 'bgnd', html:
      `<p>A <b>protein-coding gene (PCG)</b> is a gene whose RNA is translated into a protein. A <b>noncoding RNA</b> is an RNA that is <i>not</i> translated: the RNA itself does the job. Noncoding does not mean useless. The RNAs inside ribosomes and the adapter RNAs that bring amino acids to them are noncoding. Some are tiny: a <b>microRNA (miRNA)</b> is only about 22 letters long and turns down mRNAs that it matches. The ones this paper studies are long (<b>lncRNAs</b>, "long noncoding RNAs": more than about 200 letters; lesson B6).</p>` +
      `<p>You cannot tell by looking whether an RNA is translated, so scientists estimate its <b>protein-coding potential</b> from clues such as a long ORF or a match to known coding sequences. Experiments that detect the protein itself are stronger evidence. "Low potential" is a probability, not a proof: a few RNAs once called noncoding make tiny proteins.</p>` },
    { k: 'svg', caption: 'The same first step (copying a gene into RNA), two different outcomes.',
      svg: `<svg viewBox="0 0 480 290" role="img" aria-label="A gene on DNA is copied into RNA. If the RNA is a messenger RNA, a ribosome translates it into a protein. If it is a noncoding RNA, it is never made into a protein and the RNA itself does a job">` +
        `<rect x="4" y="120" width="58" height="48" rx="8" class="f-blue"/><text x="33" y="141" class="mid b">gene</text><text x="33" y="159" class="mid s">(DNA)</text>` +
        `<path d="M66 144 H146" class="arrow"/><text x="106" y="136" class="mid s">transcription</text>` +
        `<rect x="150" y="122" width="60" height="44" rx="8" class="f-orange"/><text x="180" y="150" class="mid b">RNA</text>` +
        `<path d="M214 136 C238 136 238 66 262 66" class="arrow"/>` +
        `<path d="M214 152 C238 152 238 224 262 224" class="arrow"/>` +
        `<rect x="266" y="22" width="208" height="90" rx="10" class="f-green"/>` +
        `<text x="370" y="46" class="mid b">mRNA (a recipe)</text><text x="370" y="66" class="mid s">a ribosome reads it:</text><text x="370" y="84" class="mid s b">translation</text><text x="370" y="102" class="mid s">→ protein</text>` +
        `<rect x="266" y="178" width="208" height="100" rx="10" class="f-purple"/>` +
        `<text x="370" y="202" class="mid b">Noncoding RNA</text><text x="370" y="222" class="mid s">never made into a protein;</text><text x="370" y="240" class="mid s">the RNA itself does the job</text><text x="370" y="262" class="mid s m">e.g. microRNA, lncRNA</text></svg>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> DNA is the master cookbook, mRNA is a photocopied recipe, the ribosome is the cook who reads three words at a time, and the protein is the dish. A noncoding RNA is not a recipe but a kitchen worker: it does a job itself. An ORF is the stretch of a recipe between "start cooking" and "stop" with no stop sign in the middle. <i>It breaks down</i> because a cook understands the recipe, while a ribosome just follows the triplets mechanically.</p>` },
    { k: 'h', text: 'How this paper uses these ideas' },
    { k: 'paper', ref: 'res-multipheno-p3', quote: '(1) conventional open reading frame (ORF) mutation, expected to yield maximal LOF, and (2) promoter deletion, similar to lncRNAs' },
    { k: 'plain', source: ['res-multipheno-p3', 'res-pipeline-p3'], html:
      `<p>As a yardstick, the authors also targeted protein-coding genes with known roles in cell growth, in two ways: by damaging the ORF (the part that is translated), expected to switch the gene off most completely, or by deleting the promoter, as they do for the lncRNAs. The promoter route had a detectable but lower effect. They conclude that this method is intrinsically less sensitive for lncRNAs than damaging the ORF is for protein-coding genes.</p>` },
    { k: 'paper', ref: 'res-aso-p1', quote: 'based on criteria of novelty and lack of protein-coding evidence' },
    { k: 'paper', ref: 'res-aso-p3', quote: 'Both have low protein-coding potential' },
    { k: 'plain', source: ['res-aso-p1', 'res-aso-p3'], html:
      `<p>For the next stage of the study, the authors chose nine lncRNAs partly because they lacked evidence of coding for a protein. For the final two, CHiLL1 and GCAWKR, the text says both have "low protein-coding potential" (the supporting Figure S4D is in the supplement).</p>` },
    { k: 'why', source: ['res-aso-p1', 'res-aso-p3', 'discussion-p6'], html:
      `<p>Why check? If an RNA could also be translated, an effect seen after switching its gene off might come from a protein rather than from the RNA. Low coding potential makes that less likely. The paper states the selection criterion, not this reasoning, and it stays careful: it says both genes act "via an RNA transcript or at least the production thereof".</p>` },
    { k: 'paper', ref: 'res-validation-p3', quote: 'with an effect comparable to inactivation of essential ribosomal gene RPS5' },
    { k: 'plain', source: ['res-validation-p3', 'fig3C'], html:
      `<p>RPS5 is a gene for a protein that is part of the ribosome. The paper calls it "essential" and uses it as a yardstick for a strong effect on cell fitness (Figure 3C).</p>` },
  ],
  appears: [
    { ref: 'res-multipheno-p3', note: 'ORF mutation vs promoter deletion for protein-coding control genes.' },
    { ref: 'res-aso-p1', note: 'Nine lncRNAs were chosen partly for lack of protein-coding evidence.' },
    { ref: 'res-aso-p3', note: 'CHiLL1 and GCAWKR have low protein-coding potential.' },
    { ref: 'fig3C', note: 'RPS5, a ribosomal protein gene, is the yardstick for a strong effect.' },
  ],
  checks: [
    { q: 'What is translation?',
      options: [
        { t: 'A ribosome reading an mRNA three letters at a time and linking amino acids into a protein', ok: true, why: 'Right: translation turns the mRNA message into a chain of amino acids, which folds into a protein.' },
        { t: 'Copying a gene from DNA into RNA', ok: false, why: 'That is transcription. Translation comes later and uses the mRNA as its recipe.' },
        { t: 'Cutting the introns out of a new RNA copy', ok: false, why: 'That is splicing, which edits the RNA before it is read.' },
        { t: 'Turning a protein back into an RNA', ok: false, why: 'The flow goes DNA to RNA to protein. Nothing in this lesson runs backward from a protein to an RNA.' },
      ], bg: true },
    { q: 'Why does a long open reading frame suggest that an RNA is translated?',
      options: [
        { t: 'In random letters a stop triplet turns up about every 20 triplets, so a long stretch without one is unlikely to be chance', ok: true, why: 'Right: a long run with no stop is a hint that the sequence is meant to be read, though it is not proof.' },
        { t: 'Because every long RNA is translated into a protein', ok: false, why: 'Long noncoding RNAs (more than about 200 letters) are not translated. Length alone does not decide it.' },
        { t: 'Because an ORF is, by definition, a protein', ok: false, why: 'An ORF is a stretch of sequence that could be read. Whether a ribosome really reads it is a separate question.' },
        { t: 'Because stop triplets only occur in noncoding RNAs', ok: false, why: 'Every translated message ends at a stop triplet too. What matters is that none interrupts the frame before the end.' },
      ], bg: true },
    { q: 'Which statement about noncoding RNAs is correct?',
      options: [
        { t: 'They are not translated into protein; the RNA itself does a job, as a microRNA does when it turns down mRNAs', ok: true, why: 'Right: "noncoding" means not translated, not "useless".' },
        { t: 'They are useless leftovers that the cell throws away', ok: false, why: 'Many have essential jobs: the RNAs inside ribosomes, the adapter RNAs of translation and microRNAs are all noncoding.' },
        { t: 'A microRNA is a long RNA of more than 200 letters', ok: false, why: 'A microRNA is only about 22 letters long. The "more than about 200 letters" rule is for long noncoding RNAs.' },
        { t: 'They are only ever found in the nucleus', ok: false, why: 'Noncoding RNAs sit in different places. Where an RNA lives is a clue to its job (lesson B6).' },
      ], bg: true },
    { q: 'The paper says CHiLL1 and GCAWKR "have low protein-coding potential". What does that mean?',
      options: [
        { t: 'Clues in their sequences suggest they are unlikely to be translated into a protein; it is an estimate, not a proof', ok: true, why: '"Potential" is a prediction from clues such as a short ORF. The sentence does not claim proof.' },
        { t: 'Experiments proved that they never make any protein', ok: false, why: 'The text says "low potential", which is a prediction, not a proof that no protein is ever made.' },
        { t: 'They are protein-coding genes that are translated only weakly', ok: false, why: 'Low coding potential means unlikely to be translated at all, not "translated a little".' },
        { t: 'They are microRNAs', ok: false, why: 'MicroRNAs are tiny RNAs, far shorter than lncRNAs. The paper calls these two lncRNAs: long noncoding RNAs.' },
      ], source: ['res-aso-p3', 'discussion-p5'] },
  ],
});

/* ============================================================================================== B6 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'B6',
  defines: ['cancer', 'tumor', 'nsclc', 'tumor-suppressor', 'aso', 'fish'],
  body: [
    { k: 'h', text: 'What is a lncRNA?' },
    { k: 'bgnd', html:
      `<p>Everything so far leads to one kind of RNA. A <b>long noncoding RNA (lncRNA)</b> is a noncoding RNA longer than about 200 letters (a convention that separates it from small ones such as microRNAs). Many are made just like mRNAs, copied from DNA and spliced, but they are not translated. They are usually less abundant than mRNAs and more specific to certain cell types. In names, <b>LINC</b> marks a lncRNA gene lying between other genes and <b>-AS1</b> an antisense one (lesson B3).</p>` +
      `<p>Many lncRNAs are linked to <b>cancer</b> (cells that keep dividing when they should stop; a lump of them is a <b>tumor</b>), which makes them interesting as possible drug targets. A common group of lung cancers is called <b>NSCLC</b> (non-small cell lung cancer).</p>` },
    { k: 'h', text: 'How might a lncRNA work?' },
    { k: 'bgnd', html:
      `<p>For most lncRNAs nobody knows. Ideas that have been shown for some of them:</p>` +
      `<ul><li><b>Guide or scaffold:</b> the RNA grabs a protein and brings it to certain DNA places, for example an enzyme that turns nearby genes down.</li>` +
      `<li><b>Decoy:</b> the RNA soaks up a protein or a microRNA so that it cannot do its job.</li>` +
      `<li><b>Via the act of copying:</b> the DNA of the lncRNA gene, or the act of copying it, affects a neighboring gene, and the finished RNA itself does nothing.</li></ul>` },
    { k: 'h', text: 'Cis or trans?' },
    { k: 'bgnd', html:
      `<p><b>Cis</b> and <b>trans</b> are Latin for "on this side" and "across". A <b>cis-acting</b> lncRNA works on genes right next to where it is made, on the same stretch of DNA. A <b>trans-acting</b> one is made in one place and works somewhere else, even on another chromosome. This matters in experiments: if you remove a trans-acting RNA, extra copies supplied from elsewhere in the cell can put it back. For a cis-acting RNA that usually fails, because it only works at home.</p>` },
    { k: 'svg', caption: 'Cis: the RNA acts next door. Trans: it travels and acts elsewhere.',
      svg: `<svg viewBox="0 0 480 250" role="img" aria-label="A lncRNA gene on one chromosome: a cis arrow reaches a neighboring gene on the same chromosome, while a trans arrow travels to a gene on a different chromosome">` +
        `<path d="M20 72 H130 M220 72 H290 M370 72 H460" class="ln thick s-blue"/>` +
        `<text x="20" y="104" class="s m">chromosome A</text>` +
        `<rect x="130" y="58" width="90" height="28" rx="6" class="f-orange"/><text x="175" y="77" class="mid s b">lncRNA gene</text>` +
        `<rect x="290" y="58" width="80" height="28" rx="6" class="f-blue"/><text x="330" y="77" class="mid s b">neighbor</text>` +
        `<path d="M200 56 C215 14 285 14 300 56" class="arrow s-orange"/>` +
        `<text x="250" y="14" class="mid s b t-orange">cis: acts on its neighbor</text>` +
        `<path d="M20 212 H330 M410 212 H460" class="ln thick s-blue"/>` +
        `<text x="20" y="240" class="s m">chromosome B</text>` +
        `<rect x="330" y="198" width="80" height="28" rx="6" class="f-purple"/><text x="370" y="217" class="mid s b">far gene</text>` +
        `<path d="M175 88 C175 150 250 190 328 204" class="arrow s-purple"/>` +
        `<text x="262" y="140" class="s b t-purple">trans: the RNA travels</text><text x="262" y="158" class="s b t-purple">and acts somewhere else</text></svg>` },
    { k: 'h', text: 'Where an RNA lives is a clue' },
    { k: 'bgnd', html:
      `<p>Where an RNA is found is its <b>subcellular localization</b>. It is a clue to function, not a proof. RNAs found mostly in the <b>nucleus</b> often work on DNA and gene control, or help organize nuclear structures. RNAs found mostly in the <b>cytoplasm</b> meet mRNAs and ribosomes, and may affect how long an mRNA lasts or how well it is translated. Scientists find out by making the RNA glow under a microscope, or by splitting cells into nuclear and cytoplasmic parts and measuring each (lesson D9).</p>` },
    { k: 'svg', caption: 'Location is a hint about job, not a proof.',
      svg: `<svg viewBox="0 0 480 214" role="img" aria-label="A cell with a nucleus: an RNA in the nucleus hints at gene control, an RNA in the cytoplasm hints at work with mRNAs and ribosomes">` +
        `<ellipse cx="240" cy="108" rx="228" ry="100" class="f-gray"/>` +
        `<ellipse cx="150" cy="108" rx="96" ry="72" class="f-blue"/>` +
        `<text x="150" y="62" class="mid b">nucleus</text><text x="365" y="52" class="mid b">cytoplasm</text>` +
        `<path d="M100 96 C112 76 124 116 136 96 S160 76 172 96 S196 116 204 100" class="ln thick s-orange"/>` +
        `<text x="150" y="134" class="mid s">clue: gene control,</text><text x="150" y="152" class="mid s">nuclear structures</text>` +
        `<path d="M300 96 C312 76 324 116 336 96 S360 76 372 96 S396 116 410 100" class="ln thick s-purple"/>` +
        `<text x="360" y="134" class="mid s">clue: meets mRNAs,</text><text x="360" y="152" class="mid s">ribosomes, proteins</text></svg>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a <b>cis</b>-acting lncRNA is a note taped to the door of the room where it was written: it only reaches that room. A <b>trans</b>-acting one is an email: it can be read anywhere. An RNA's <b>location</b> is like where a person works: someone found in the design office (nucleus) is probably handling plans, someone on the kitchen floor (cytoplasm) is probably handling production. <i>It breaks down</i> because a cis effect can come from the DNA or from the act of copying, not only from the finished RNA, and because many RNAs are found in both rooms.</p>` },
    { k: 'h', text: 'What the paper says about named lncRNAs' },
    { k: 'paper', ref: 'intro-p2', quote: 'long noncoding RNAs (lncRNAs), with a population likely to exceed 100,000, of which >98% remain uncharacterised' },
    { k: 'plain', source: ['intro-p2'], html:
      `<p>The paper says the number of lncRNAs is likely to exceed 100,000 and that more than 98% remain uncharacterised: nobody yet knows what they do. Two earlier examples, SAMMSON (melanoma) and lncGRS-1 (glioma), attracted attention as possible drug targets because cancer cells were strongly and specifically sensitive to switching them off with <b>ASOs</b> (short strands that stick to one RNA and get it destroyed; lesson D6).</p>` },
    { k: 'paper', ref: 'intro-p3', quote: 'PVT1 and MALAT1 are recurrently overexpressed or amplified in lung tumors, and their manipulation alters cell growth and invasiveness both in vitro and in vivo' },
    { k: 'paper', ref: 'intro-p3', quote: 'LINC00680, which acts via binding to GATA6, and LINC00511, which promotes NSCLC by binding chromatin-modifying enzyme EZH2 and repressing tumor-suppressor genes, including p57 and LATS2' },
    { k: 'plain', source: ['intro-p3'], html:
      `<p>These are the introduction's examples. <b>PVT1</b> and <b>MALAT1</b> are again and again found at unusually high levels or in extra DNA copies in lung tumors, and changing them alters how cells grow and how readily they spread into surrounding tissue, in dishes and in living animals. <b>LINC00680</b> acts by binding <b>GATA6</b>. <b>LINC00511</b> promotes NSCLC by binding <b>EZH2</b>, an enzyme that modifies how DNA is packaged, and by repressing <b>tumor-suppressor</b> genes (genes that normally keep cell growth in check), including <b>p57</b> and <b>LATS2</b>. The introduction gives no further detail on how any of them work.</p>` },
    { k: 'flag', source: ['intro-p2', 'intro-p3', 'res-multipheno-p4', 'limitations-p2', 'fig2G'], html:
      `<p>The paper groups some names inconsistently. LINC00680 is cited in the introduction as lung-cancer evidence and in the limitations as "known to be involved in lung cancer pathogenesis", yet the Results list it among "lncRNAs identified in other cancer types". And SAMMSON (melanoma) and lncGRS-1 (glioma) are not lung-cancer examples. Treat the green and blue labels in Figure 2G as the authors' groupings.</p>` },
    { k: 'paper', ref: 'res-aso-p3', quote: 'overexpression of neither CHiLL1 nor GCAWKR could rescue ASO-induced phenotypes … This may be the result of cis-regulatory mechanisms' },
    { k: 'plain', source: ['res-aso-p3'], html:
      `<p>When the authors added extra copies of CHiLL1 or GCAWKR to cells whose own copy had been switched off with ASOs, the effects were not reversed. They say this <i>may</i> reflect cis-regulatory mechanisms (effects that stay near where the RNA is made), although they saw no such effect on CHiLL1's nearest neighbor, TNFRSF10B. A second possible explanation they give is that the genes act through functional isoforms that are not yet listed in the gene catalogs and were not tested. The paper does not decide between the two.</p>` },
    { k: 'paper', ref: 'res-mechanism-p1', quote: 'Subcellular localization yields important mechanistic clues for lncRNAs. Surprisingly, despite their similar oncogenic roles, fluorescence in situ hybridization (FISH) revealed contrasting localization patterns: CHiLL1 is located principally in the cytoplasm, and GCAWKR in the nucleus' },
    { k: 'plain', source: ['res-mechanism-p1', 'discussion-p6', 'fig6C'], html:
      `<p>The authors located the two final RNAs with <b>FISH</b>, a microscope method that makes one chosen RNA glow (lesson D9). <b>CHiLL1 sits mainly in the cytoplasm and GCAWKR in the nucleus</b>, and a second method that separates the nuclear and cytoplasmic parts of the cells agreed (Figure 6C, where MALAT1 serves as the nuclear reference). The authors call this surprising because both have similar cancer-promoting roles, and later say the two work through "very different immediate molecular mechanisms", citing their distinct locations among other evidence.</p>` },
  ],
  appears: [
    { ref: 'intro-p2', note: 'More than 100,000 lncRNAs, more than 98% uncharacterised; SAMMSON and lncGRS-1 as drug-target examples.' },
    { ref: 'intro-p3', note: 'PVT1, MALAT1, LINC00680 (GATA6) and LINC00511 (EZH2, p57, LATS2) as lung-cancer lncRNA examples.' },
    { ref: 'res-aso-p3', note: 'Extra copies did not reverse the ASO effects; cis-regulatory mechanisms suggested as one possible reason.' },
    { ref: 'res-mechanism-p1', note: 'CHiLL1 is mainly cytoplasmic, GCAWKR nuclear; localization gives mechanistic clues.' },
  ],
  checks: [
    { q: 'Which description fits a long noncoding RNA (lncRNA)?',
      options: [
        { t: 'An RNA longer than about 200 letters that is not translated into a protein', ok: true, why: 'Right: "long" means more than about 200 letters, and "noncoding" means it is not translated.' },
        { t: 'A very short RNA, about 22 letters, that turns down mRNAs', ok: false, why: 'That is a microRNA. The "long" in lncRNA marks the difference.' },
        { t: 'Any RNA that is found only in the nucleus', ok: false, why: 'Location does not define a lncRNA: some sit mainly in the nucleus and others mainly in the cytoplasm.' },
        { t: 'An mRNA that carries the recipe for a very long protein', ok: false, why: 'An mRNA is translated into a protein. A lncRNA is not.' },
      ], bg: true },
    { q: 'In the paper, extra copies of CHiLL1 or GCAWKR did not reverse the effects of switching the genes off. What do the authors say about this?',
      options: [
        { t: 'It may reflect cis-regulatory mechanisms, or the genes may act through isoforms that are not yet listed and were not tested', ok: true, why: 'Right: these are the two possible explanations offered, and the paper does not decide between them.' },
        { t: 'It proves that the RNAs act in trans', ok: false, why: 'The opposite. A trans-acting RNA is the kind that extra copies from elsewhere can usually restore; the authors raise cis mechanisms as a possibility.' },
        { t: 'It shows that the two RNAs have no role in cancer cell growth', ok: false, why: 'In the paper\'s summary, switching them off consistently suppressed cancer-related features in the lab models. The puzzle is only that adding copies did not bring the effects back.' },
        { t: 'It shows that the ASOs were toxic to the cells', ok: false, why: 'The passage does not offer harm to the cells as an explanation.' },
      ], source: ['res-aso-p3', 'summary-p1'] },
    { q: 'What did the authors find about where CHiLL1 and GCAWKR sit in the cell, and why does it matter?',
      options: [
        { t: 'CHiLL1 is mainly in the cytoplasm and GCAWKR in the nucleus, hinting at different ways of working despite similar roles', ok: true, why: 'Right: the authors call it surprising and later cite the distinct locations as evidence for very different immediate mechanisms.' },
        { t: 'Both are mainly in the nucleus, so both must control genes directly', ok: false, why: 'Only GCAWKR is reported as mainly nuclear, and location is a clue rather than proof of a mechanism.' },
        { t: 'CHiLL1 is mainly in the nucleus and GCAWKR in the cytoplasm', ok: false, why: 'Reversed: CHiLL1 is principally cytoplasmic and GCAWKR nuclear.' },
        { t: 'Both are in the cytoplasm, so neither can affect genes', ok: false, why: 'The paper reports different locations, and no location rules out an effect on genes.' },
      ], source: ['res-mechanism-p1', 'discussion-p6'] },
    { q: 'According to the introduction, how does LINC00511 promote NSCLC?',
      options: [
        { t: 'By binding EZH2 and repressing tumor-suppressor genes, including p57 and LATS2', ok: true, why: 'Right: this is the introduction\'s description of LINC00511.' },
        { t: 'By binding GATA6', ok: false, why: 'The introduction says LINC00680, not LINC00511, acts via binding to GATA6.' },
        { t: 'By being translated into a protein that blocks p57 and LATS2', ok: false, why: 'LINC00511 is a noncoding RNA; it is not translated. The introduction says it works by binding EZH2.' },
        { t: 'By being found in extra DNA copies in lung tumors, as for PVT1 and MALAT1', ok: false, why: 'That is how the introduction describes PVT1 and MALAT1. For LINC00511 it describes binding EZH2.' },
      ], source: ['intro-p3'] },
  ],
});
