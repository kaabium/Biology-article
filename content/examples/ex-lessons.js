/* GOLD-STANDARD EXAMPLES — copy the style, not the words.  (Loaded only with:  node tools/validate.mjs --include content/examples/ex-lessons.js --files ex-lessons)
   Lesson B7 shows a "background" lesson; lesson A1 shows a "plain words only" lesson. */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(

/* ============================================================================================== B7 */
{
  id: 'B7',
  defines: ['protein'],            // 'protein' is only taught in B9, so B7 explains it inline in one plain sentence
  body: [
    { k: 'h', text: 'The problem: the DNA never leaves home' },
    { k: 'bgnd', html:
      '<p>Your DNA stays inside the <b>nucleus</b>, packed into its chromosomes. But most of the cell\'s work happens outside the nucleus, in the <b>cytoplasm</b>. So the cell makes a <b>copy of one gene at a time</b> and sends the copy out. That copy is called <b>RNA</b>.</p>' +
      '<p>(What does the work out there? Mostly <b>proteins</b>: tiny machines and building blocks that the cell builds from the instructions in RNA. You will meet them properly in lesson B9.)</p>' },
    { k: 'memory', html:
      '<p><b>Analogy:</b> the DNA is the master cookbook that stays locked in the head chef\'s office. RNA is a photocopy of <i>one recipe</i> that you carry to the kitchen. The cookbook is never damaged, and the kitchen can use many photocopies at once.</p>' },
    { k: 'svg', caption: 'DNA stays in the nucleus; an RNA copy of one gene travels out to the cytoplasm.',
      svg: '<svg viewBox="0 0 480 250" role="img" aria-label="A cell: inside the nucleus a gene on DNA is copied into an RNA strand that moves out into the cytoplasm">' +
        '<ellipse cx="240" cy="125" rx="228" ry="112" class="f-gray"/>' +
        '<ellipse cx="140" cy="125" rx="104" ry="78" class="f-blue"/>' +
        '<text x="140" y="60" class="mid b">Nucleus</text>' +
        '<text x="372" y="56" class="mid b">Cytoplasm</text>' +
        '<path d="M52 122 H228" class="ln thick s-blue"/><path d="M52 138 H228" class="ln thick s-blue"/>' +
        '<rect x="98" y="114" width="84" height="32" rx="6" class="f-orange"/><text x="140" y="136" class="mid b">gene</text>' +
        '<text x="140" y="176" class="mid s m">DNA (stays inside)</text>' +
        '<path d="M150 108 C165 84 205 86 240 98" class="arrow s-orange"/>' +
        '<text x="198" y="78" class="mid s t-orange b">copy = RNA</text>' +
        '<path d="M240 98 C275 98 285 128 318 128 S368 108 398 132 S440 146 458 134" class="ln thick s-orange"/>' +
        '<text x="360" y="186" class="mid s m">RNA moves out to</text><text x="360" y="203" class="mid s m">where the work is done</text></svg>' },
    { k: 'h', text: 'Transcription: copying a gene into RNA' },
    { k: 'bgnd', html:
      '<p><b>Transcription</b> is the copying step. A molecular machine called <b>RNA polymerase</b> slides along the DNA of one gene and builds a matching RNA strand, letter by letter. RNA is written with almost the same alphabet as DNA (it uses a letter U where DNA uses T). The finished copy is called a <b>transcript</b>.</p>' +
      '<p>A DNA molecule has two strands, and the machine reads only one of them for any given gene (lesson B6). Which strand is read, and in which direction, is part of the gene\'s address.</p>' },
    { k: 'h', text: 'Where does copying start? The promoter and the TSS' },
    { k: 'bgnd', html:
      '<p>Just before a gene sits a stretch of DNA called the <b>promoter</b>. It is the landing pad where the copying machine attaches. The exact DNA letter where copying <b>begins</b> is the <b>transcription start site</b>, or <b>TSS</b> (several of them are TSSs).</p>' +
      '<p>If the start site is missing, the machine has nowhere to begin, and the gene is not copied. That simple fact is the trick behind the whole paper.</p>' },
    { k: 'memory', html: '<p><b>Memory aid:</b> promoter = the runway, TSS = the exact spot where the plane leaves the ground, transcript = the flight itself.</p>' },
    { k: 'svg', caption: 'A gene on the DNA: the promoter (landing pad), the TSS (start of the copy), and the transcript (the RNA copy).',
      svg: '<svg viewBox="0 0 480 260" role="img" aria-label="A stretch of DNA drawn as a line, with a promoter box, an arrow marking the transcription start site, a gene box, and the RNA transcript drawn below it">' +
        '<text x="6" y="58" class="b">DNA</text>' +
        '<line x1="52" y1="54" x2="474" y2="54" class="ln thick s-blue"/>' +
        '<rect x="66" y="40" width="112" height="28" rx="6" class="f-green"/><text x="122" y="60" class="mid b">promoter</text>' +
        '<rect x="200" y="40" width="262" height="28" rx="6" class="f-orange"/><text x="331" y="60" class="mid b">the gene</text>' +
        '<path d="M200 38 V18 H232" class="arrow s-red"/>' +
        '<text x="206" y="100" class="s t-red b">TSS: copying starts here</text>' +
        '<path d="M200 70 V150" class="ln dash m"/>' +
        '<text x="6" y="166" class="b">RNA</text>' +
        '<path d="M200 160 H440" class="ln thick s-orange"/>' +
        '<text x="320" y="190" class="mid s">transcript = the RNA copy of the gene</text>' +
        '<path d="M52 232 H440" class="arrow"/><text x="246" y="252" class="mid s m">direction of copying</text></svg>' },
    { k: 'h', text: 'A twist: bidirectional promoters' },
    { k: 'bgnd', html:
      '<p>Some promoters work in <b>both directions</b>. One landing pad then starts <i>two</i> genes that face away from each other, usually one on each strand, so the two TSSs sit almost on top of each other. Two different RNAs can therefore be made from a single place. These are called <b>bidirectional promoters</b>.</p>' },
    { k: 'h', text: 'How this paper uses these ideas' },
    { k: 'paper', ref: 'res-pipeline-p1',
      quote: 'This approach achieves loss-of-function (LOF) perturbations by deleting target genes’ transcription start sites (TSS) via paired guide RNAs (pgRNAs) and effectively inhibits gene expression.' },
    { k: 'plain', source: ['res-pipeline-p1'], html:
      '<p>The authors switch a lncRNA gene off by <b>deleting its TSS</b> (they use pairs of "guide" molecules to steer molecular scissors to the spot). Without its start site the gene can no longer be copied. You will learn how the scissors work in lesson D1.</p>' },
    { k: 'paper', ref: 'res-pipeline-p2',
      quote: 'lncRNA candidates with bidirectional promoters or with overlapping TSSs were merged into a single TSS.' },
    { k: 'plain', source: ['res-pipeline-p2'], html:
      '<p>When two lncRNAs shared one start region (a bidirectional promoter), the authors counted them as <b>one</b> target. They report that 95.2% of target regions contain a single lncRNA promoter, 4.5% contain two, and 0.3% contain three.</p>' },
  ],
  appears: [
    { ref: 'res-pipeline-p1', note: 'The screening method deletes the TSS of each lncRNA gene.' },
    { ref: 'res-pipeline-p2', note: 'Bidirectional promoters and overlapping TSSs are merged into one target; 95.2% / 4.5% / 0.3% of regions contain one / two / three promoters.' },
    { ref: 'fig1E', note: 'The "TSS target region" (black bar) drawn on a gene map.' },
  ],
  checks: [
    { q: 'What is the TSS?',
      options: [
        { t: 'The exact DNA position where copying into RNA begins', ok: true, why: 'Right: TSS = transcription start site, the first DNA letter that gets copied into RNA.' },
        { t: 'The last DNA letter of a gene, where copying stops', ok: false, why: 'That is the opposite end. The TSS is where copying <b>starts</b>.' },
        { t: 'A protein that reads the DNA', ok: false, why: 'The machine that reads DNA is the RNA polymerase. The TSS is a <b>place</b> on the DNA, not a machine.' },
      ], bg: true },
    { q: 'Why does deleting a gene\'s TSS switch the gene off?',
      options: [
        { t: 'Without a start site the copying machine has nowhere to begin, so no RNA is made', ok: true, why: 'Right: no starting point, no transcript.' },
        { t: 'The deleted DNA letters are poisonous to the cell', ok: false, why: 'Nothing in the lesson suggests the deleted DNA is toxic; deleting it simply removes the starting point.' },
        { t: 'The cell destroys any gene that has lost a promoter', ok: false, why: 'The gene is not destroyed; it just cannot be copied. Deleting the TSS silences it without "destroying" the rest.' },
      ], bg: true },
    { q: 'How does RNA differ from DNA, as described in this lesson?',
      options: [
        { t: 'RNA is a temporary single-strand copy of one gene, carried out of the nucleus', ok: true, why: 'Right: DNA is the permanent master copy; RNA is the working photocopy.' },
        { t: 'RNA is the permanent master copy that never leaves the nucleus', ok: false, why: 'That describes DNA. RNA is the portable copy.' },
        { t: 'RNA is made only by the cytoplasm', ok: false, why: 'RNA is made in the nucleus by RNA polymerase, <b>then</b> travels to the cytoplasm.' },
      ], bg: true },
    { q: 'What did the authors do with lncRNAs that shared one promoter region?',
      options: [
        { t: 'Counted them as a single target (merged TSS)', ok: true, why: 'Right (res-pipeline-p2): bidirectional or overlapping TSSs were merged into one.', },
        { t: 'Removed them from the study', ok: false, why: 'They were not removed; they were merged into one target.' },
        { t: 'Gave each of them three guide pairs', ok: false, why: 'The paper says every target got ten guide designs, not three, and merging is a different matter altogether.' },
      ], source: ['res-pipeline-p2', 'res-pipeline-p4'], derived: ['3'] },
  ],
},

/* ============================================================================================== A1 */
{
  id: 'A1',
  defines: ['cell', 'cancer', 'gene', 'rna', 'lncrna', 'crispr', 'hit', 'aso', 'cisplatin', 'organoid', 'nsclc', 'chill1', 'gcawkr'],
  body: [
    { k: 'h', text: 'The question' },
    { k: 'plain', source: ['intro-p1'], html:
      '<p>A very common kind of lung <b>cancer</b> (the paper calls it <b>NSCLC</b>) is the leading cause of cancer deaths worldwide. Your body is built from tiny living units called <b>cells</b>. <i>Cancer</i> is what happens when cells keep growing and dividing when they should have stopped. The medicines we have often stop working, so scientists keep looking for new weak spots.</p>' },
    { k: 'plain', source: ['intro-p2'], html:
      '<p>One place to look is a huge, mysterious group of molecules. Your cells store instructions in <b>genes</b>, and they make working copies of those instructions called <b>RNA</b>. Most RNAs carry a recipe for building something. But there is a group of "long noncoding" RNAs (<b>lncRNAs</b>) that carry <i>no</i> recipe. The paper says there may be more than 100,000 of them, and more than 98% remain uncharacterised, meaning nobody knows what they do.</p>' },
    { k: 'memory', html: '<p><b>Analogy:</b> imagine finding 100,000 unlabelled switches in a power station. Flip them one at a time and see which ones turn off a cancer\'s lights. That is the paper in one sentence.</p>' },
    { k: 'h', text: 'What the authors did' },
    { k: 'plain', source: ['summary-p1', 'res-pipeline-p2'], html:
      '<p>They used <b>CRISPR</b>, a tool that works like molecular scissors, to cut out the "on-switch" of 831 lncRNA genes in lung cancer cells, one gene per cell, thousands of cells at once. Then they watched three things: which cells <b>grow</b> slower, which are less able to <b>survive a cancer drug</b> (cisplatin), and which <b>move</b> less (cancer spreads by cells moving).</p>' },
    { k: 'svg', caption: 'The study in one picture: switch off each suspect, test three abilities, keep the strongest suspects.',
      svg: '<svg viewBox="0 0 480 300" role="img" aria-label="Flow diagram: many cells each missing one RNA switch, then three tests (growth, drug survival, movement), then a short list of suspects">' +
        '<rect x="4" y="100" width="118" height="100" rx="12" class="f-blue"/>' +
        '<text x="63" y="128" class="mid b">Cancer cells</text><text x="63" y="148" class="mid s">each with one</text><text x="63" y="165" class="mid s">RNA switched</text><text x="63" y="182" class="mid s">off</text>' +
        '<path d="M126 150 H150" class="arrow"/>' +
        '<rect x="154" y="14" width="176" height="62" rx="10" class="f-green"/><text x="242" y="40" class="mid b">Do they grow</text><text x="242" y="60" class="mid b">more slowly?</text>' +
        '<rect x="154" y="119" width="176" height="62" rx="10" class="f-orange"/><text x="242" y="145" class="mid b">Do they survive</text><text x="242" y="165" class="mid b">the drug?</text>' +
        '<rect x="154" y="224" width="176" height="62" rx="10" class="f-purple"/><text x="242" y="250" class="mid b">Do they move</text><text x="242" y="270" class="mid b">less?</text>' +
        '<path d="M334 45 H350 V138" class="ln"/><path d="M334 150 H350" class="ln"/><path d="M334 255 H350 V162" class="ln"/><path d="M350 150 H372" class="arrow"/>' +
        '<rect x="376" y="100" width="100" height="100" rx="12" class="f-red"/>' +
        '<text x="426" y="136" class="mid b">Short list</text><text x="426" y="156" class="mid b">of suspects</text><text x="426" y="178" class="mid s">(“hits”)</text></svg>' },
    { k: 'h', text: 'What they found' },
    { k: 'plain', source: ['res-pipeline-p2', 'res-integration-p2', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3'], html:
      '<p>Out of 831 lncRNAs, <b>80</b> stood out as <b>hits</b> (suspects that mattered). The authors picked <b>nine</b> to look at closely, <b>five</b> kept their effect when tested a second way, and <b>two</b> were still convincing after more checks. Those two have been given the names <b>CHiLL1</b> and <b>GCAWKR</b>.</p>' +
      '<p>To switch the two off in a medicine-like way, they used <b>ASOs</b>: short strands that stick to one RNA and get it destroyed. Cancer cell growth dropped in cells grown flat in dishes, in ball-shaped clusters of cells, and also in <b>organoids</b> (small lab-grown copies of a patient\'s cancer). The effect was weaker in normal lung cells.</p>' },
    { k: 'h', text: 'Take-home' },
    { k: 'why', source: ['summary-p1'], html:
      '<p>The paper shows a way to find cancer weak spots among mysterious RNAs, and finds two promising ones. It was all done in cells grown in the lab, not in people, so it is a starting point for new medicines, not a medicine yet.</p>' },
  ],
  appears: [
    { ref: 'summary-p1', note: 'The authors\' own five-sentence summary of the whole study.' },
    { ref: 'intro-p2', note: 'Why lncRNAs are an attractive hunting ground (more than 100,000; more than 98% uncharacterised).' },
    { ref: 'res-aso-p3', note: 'The funnel ends with CHiLL1 and GCAWKR.' },
  ],
  checks: [
    { q: 'What question is the study trying to answer?',
      options: [
        { t: 'Which long noncoding RNAs help lung cancer cells grow, survive a drug, or move?', ok: true, why: 'Right: that is exactly what the three tests measure.' },
        { t: 'Which cancer drug works best on lung cancer?', ok: false, why: 'The drug (cisplatin) is only used as a test of survival; the study is about RNAs, not comparing drugs.' },
        { t: 'How many genes a human has', ok: false, why: 'Counting genes is not part of this paper.' },
      ], source: ['summary-p1'] },
    { q: 'What happens to the 831 lncRNAs as the study goes on?',
      options: [
        { t: 'They are narrowed down step by step, ending with two: CHiLL1 and GCAWKR', ok: true, why: 'Right: 831 → 80 hits → nine → five → two.' },
        { t: 'All 831 turn out to be important', ok: false, why: 'Only 80 were hits, and far fewer survived the later checks.' },
        { t: 'They are combined into one super-RNA', ok: false, why: 'Nothing is combined; the list is narrowed by testing.' },
      ], source: ['res-pipeline-p2', 'res-integration-p2', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3'] },
    { q: 'Is the paper a finished medicine?',
      options: [
        { t: 'No: it is lab work in cells and organoids that points to promising targets', ok: true, why: 'Right: the authors test in cells in dishes, ball-shaped clusters and organoids, not in patients.' },
        { t: 'Yes: it tested the medicine in thousands of patients', ok: false, why: 'No patients were treated in this study.' },
        { t: 'Yes: the ASOs were approved for use', ok: false, why: 'The paper does not say ASOs were approved; it says more work is needed (delivery in living animals).' },
      ], source: ['res-aso-p2', 'discussion-p5'] },
  ],
}
);
