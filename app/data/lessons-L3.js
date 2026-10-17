/* lessons-L3.js — filled by one content author (scope L3). */

/* ============================================================================================== B7 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'B7',
  defines: ['cancer', 'a549', 'rna-seq', 'fpkm'],
  body: [
    { k: 'h', text: 'Who writes the list of genes?' },
    { k: 'bgnd', html:
      `<p>The genome is a huge string of DNA letters with no labels on it. Somebody has to work out where the genes are and write it down. That list is a <b>gene annotation</b>: for every gene, and for every RNA copy (transcript) it can make, it records the chromosome, start, end, strand and exons, plus a name and an ID. To "annotate" a genome means to add these labels.</p>` +
      `<p>An annotation is a set of educated claims built from evidence (sequenced RNA, expert curation, computer predictions). It is useful but never final: a stretch of DNA with no label is not proof that nothing is there. Annotations are also published in numbered <i>releases</i>, so you must always say which one you used.</p>` },
    { k: 'h', text: 'Files and IDs: GTF and ENSG' },
    { k: 'bgnd', html:
      `<p>Annotations are shared as plain-text tables called <b>GTF files</b> (Gene Transfer Format). Each row describes one feature, a gene, a transcript or an exon, with its chromosome, start, end, strand and a few notes. Programs read GTF files to draw gene maps or to count RNA gene by gene.</p>` +
      `<p>Every gene also gets an <b>Ensembl gene ID</b>: the letters <b>ENSG</b> plus a number (for transcripts, <b>ENST</b>). A name such as "MALAT1" is a nickname, and a gene can have several. The ID is the stable address that says exactly which gene is meant.</p>` },
    { k: 'h', text: 'Four catalogs, four maps' },
    { k: 'bgnd', html:
      `<p>Several groups publish human gene catalogs. Each is built from different data and rules, so each contains lncRNAs that the others miss. The paper used four sources:</p>` +
      `<ul><li><b>GENCODE</b>: the standard human annotation. It mixes expert curation with computer pipelines and lists protein-coding genes and noncoding RNAs. It comes in numbered versions (the paper uses release 19 and v36).</li>` +
      `<li><b>FANTOM CAT</b>: a lncRNA catalog from the FANTOM consortium that relies on a method for finding where RNAs begin (lesson B8).</li>` +
      `<li><b>BIGTranscriptome</b>: another published list of human lncRNAs.</li>` +
      `<li>A <b>new transcriptome assembly</b>: the authors read out the RNA made by their own lung cancer cells (a method called RNA-seq, lesson D10) and let a program, <b>StringTie</b>, stitch the short sequenced pieces into whole transcripts, like rebuilding a shredded page by matching the torn edges. This can reveal RNAs that no catalog lists yet.</li></ul>` },
    { k: 'svg', caption: 'How the paper built its target list: four catalogs are merged and filtered, ending with 831 lncRNAs and 998 start sites.',
      svg: `<svg viewBox="0 0 480 358" role="img" aria-label="Flow chart: four gene catalogs (GENCODE, BIGTranscriptome, FANTOM CAT, a new assembly) are merged, then start sites near protein-coding exons and lowly expressed transcripts are dropped, start sites within 300 bp are clustered, clusters with extra evidence are kept, leaving 831 lncRNAs and 998 start sites">` +
        `<rect x="10" y="6" width="224" height="44" rx="8" class="f-blue"/><text x="122" y="25" class="mid b">GENCODE</text><text x="122" y="43" class="mid s m">release 19</text>` +
        `<rect x="246" y="6" width="224" height="44" rx="8" class="f-blue"/><text x="358" y="25" class="mid b">BIGTranscriptome</text><text x="358" y="43" class="mid s m">published lncRNA list</text>` +
        `<rect x="10" y="58" width="224" height="44" rx="8" class="f-blue"/><text x="122" y="77" class="mid b">FANTOM CAT</text><text x="122" y="95" class="mid s m">published lncRNA list</text>` +
        `<rect x="246" y="58" width="224" height="44" rx="8" class="f-blue"/><text x="358" y="77" class="mid b">New assembly</text><text x="358" y="95" class="mid s m">from A549 RNA (StringTie)</text>` +
        `<path d="M240 104 V116" class="arrow"/>` +
        `<rect x="20" y="118" width="440" height="28" rx="8" class="f-green"/><text x="240" y="137" class="mid b">Merged annotation (StringTie merge)</text>` +
        `<path d="M240 146 V158" class="arrow"/>` +
        `<rect x="20" y="158" width="440" height="28" rx="8" class="f-orange"/><text x="240" y="177" class="mid">Drop TSSs under 2 kb from a protein-coding exon</text>` +
        `<path d="M240 186 V198" class="arrow"/>` +
        `<rect x="20" y="198" width="440" height="28" rx="8" class="f-orange"/><text x="240" y="217" class="mid">Drop transcripts under 0.1 FPKM in A549 cells</text>` +
        `<path d="M240 226 V238" class="arrow"/>` +
        `<rect x="20" y="238" width="440" height="28" rx="8" class="f-orange"/><text x="240" y="257" class="mid">Cluster TSSs that lie within 300 bp of each other</text>` +
        `<path d="M240 266 V278" class="arrow"/>` +
        `<rect x="20" y="278" width="440" height="28" rx="8" class="f-purple"/><text x="240" y="297" class="mid">Keep clusters with extra evidence (lesson B8)</text>` +
        `<path d="M240 306 V318" class="arrow"/>` +
        `<rect x="20" y="318" width="440" height="34" rx="8" class="f-teal"/><text x="240" y="340" class="mid b">831 expressed lncRNAs, 998 TSSs</text></svg>` },
    { k: 'h', text: 'How the paper merged the catalogs' },
    { k: 'paper', ref: 'res-pipeline-p2',
      quote: 'We integrated and filtered published and in-house gene annotations … for a final target set of 831 expressed lncRNAs, corresponding to 998 high-confidence TSSs' },
    { k: 'plain', source: ['m-library-design-p1', 'm-library-design-p2', 'res-pipeline-p2'], html:
      `<p>The authors downloaded GTF files from GENCODE (release 19), BIGTranscriptome and FANTOM CAT, and made their own new assembly from RNA-seq of A549 cells (the lung cancer cells they work with; lesson C4). All 4 were merged into one annotation with StringTie’s merge option. Then they filtered the lncRNAs:</p>` +
      `<ul><li>they removed any whose start site overlapped, or lay less than 2 kb up or downstream of, a protein-coding exon in GENCODE;</li>` +
      `<li>they measured expression in A549 cells and removed transcripts below 0.1 FPKM (FPKM is a unit for how much RNA a gene makes; lesson D10);</li>` +
      `<li>they grouped start sites within 300 bp of each other into one cluster;</li>` +
      `<li>they kept clusters backed by extra evidence (next lesson).</li></ul>` +
      `<p>The result: 831 expressed lncRNAs with 998 high-confidence TSSs.</p>` },
    { k: 'bgnd', html:
      `<p><b>Why merge?</b> The paper does not say. A common reason is that every catalog is incomplete, so the union catches more lncRNAs, and the filters then remove entries that would make risky targets.</p>` },
    { k: 'why', source: ['limitations-p2', 'res-aso-p1'], html:
      `<p>The list sets the limits of the study: a lncRNA that is on no list cannot be tested. The authors admit that annotation is still incomplete (limitations-p2), and the follow-up shows that the extra catalogs mattered: of the nine lncRNAs they picked for ASO work, seven are annotated by GENCODE and two by either FANTOM CAT or BIGTranscriptome (res-aso-p1).</p>` },
    { k: 'flag', source: ['m-library-design-p1', 'm-eztracks-p2', 'fig1B'], html:
      `<p>Three small things when you read the Methods. (1) The first Methods sentence is printed as “We alsma, lo generated a novel transcriptome assembly”; this is most likely a typo for “We also generated”. (2) Two GENCODE versions appear: release 19 for building the target list, and v36 for the gene models drawn in the figures. (3) Figure 1B labels one box “FANTOM5” while the text says FANTOM CAT.</p>` },
    { k: 'h', text: 'Two more words from gene maps: EST and ortholog' },
    { k: 'bgnd', html:
      `<p><b>ESTs</b> (expressed sequence tags) are short pieces of sequence read from RNA that cells really made. They are an older, cheap kind of evidence that "this stretch of DNA gets transcribed", and gene maps often show them as little bars. An EST that stretched from one gene into its neighbor would suggest that one long RNA runs through both (readthrough transcription, lesson B4).</p>` +
      `<p>An <b>ortholog</b> is the "same" gene in another species: two genes that descend from one gene in a shared ancestor. Orthologs often (not always) do similar jobs, so a mouse ortholog lets scientists study a human gene in mice. lncRNAs are usually less conserved than protein-coding genes, which makes true orthologs harder to spot, so they are often called "likely" orthologs.</p>` },
    { k: 'paper', ref: 'res-aso-p4',
      quote: 'we find no evidence for readthrough transcription between the two loci as shown by annotated expressed sequence tags (ESTs)' },
    { k: 'plain', source: ['res-aso-p4'], html:
      `<p>CHiLL1 lies upstream of a protein-coding neighbor, TNFRSF10B, on the same strand. The authors checked the annotated ESTs for any sign that one RNA runs from CHiLL1 into TNFRSF10B, and found none. (They add that a second test agrees.) So there is no sign that CHiLL1 is just the front end of its neighbor\u2019s transcript.</p>` },
    { k: 'paper', ref: 'res-aso-p5', quote: 'It has a likely ortholog in mouse, the uncharacterized Gm44753' },
    { k: 'plain', source: ['res-aso-p5'], html:
      `<p>For GCAWKR the authors note a probable counterpart in mouse. It is called Gm44753 and nobody has yet worked out what it does (“uncharacterized”).</p>` },
    { k: 'h', text: 'Gene expression: up, down and the transcriptome' },
    { k: 'bgnd', html:
      `<p>Every cell holds the same genome, but it uses only some genes at any moment. <b>Gene expression</b> means a gene is being used: its DNA is copied into RNA (and for a protein-coding gene that RNA later makes protein). A gene is <b>expressed</b> if its RNA is present, and its <b>expression level</b> is how much RNA there is.</p>` +
      `<p>Expression is always compared with something. <b>Upregulation</b> means more RNA than in the comparison (treated versus untreated cells, or diseased versus healthy tissue). <b>Downregulation</b> means less. "Overexpressed" is used the same way. These words describe a change in RNA amount, not its cause, and not a change in the DNA.</p>` +
      `<p>The <b>transcriptome</b> is all the RNA in a cell or sample, with how much of each. The genome is the same everywhere, but the transcriptome changes with cell type and conditions.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> the genome is a cookbook that every kitchen owns. The annotation is its index (which recipe is on which page, under which name). The transcriptome is the list of recipes being cooked right now, and "upregulated" means more portions than yesterday. <i>Where it breaks:</i> a cookbook index is written by the author, while an annotation is pieced together by outsiders from evidence, so it can be wrong; and the amount of RNA present also depends on how fast it is thrown away, not only on how fast it is made.</p>` },
    { k: 'plain', source: ['res-pipeline-p5', 'res-pipeline-p2', 'res-mechanism-p2'], html:
      `<p><b>Up and down in the paper.</b> After deleting the start site of 12 randomly chosen targets, the authors saw the RNA go down as expected for 7, stay unchanged for 3 and go <i>up</i> for 2. So even a deliberate change can push expression either way; “up” and “down” just report what was measured. The word transcriptome is used in two ways: the catalog of lncRNAs in these lung cancer cells (“the NSCLC lncRNA transcriptome”), and the full set of RNAs measured in a sample (“to quantify the transcriptome of A549 cells”).</p>` },
  ],
  appears: [
    { ref: 'm-library-design-p1', note: 'The four sources (GENCODE release 19, BIGTranscriptome, FANTOM CAT, a new StringTie assembly) are downloaded as GTF files and merged.' },
    { ref: 'm-library-design-p2', note: 'The filters: 2 kb from protein-coding exons, FPKM below 0.1, TSS clusters within 300 bp.' },
    { ref: 'res-pipeline-p2', note: 'The result: 831 expressed lncRNAs with 998 high-confidence TSSs.' },
    { ref: 'res-aso-p4', note: 'ESTs are used to check for readthrough between CHiLL1 and its neighbor TNFRSF10B.' },
    { ref: 'res-aso-p5', note: 'GCAWKR has a likely mouse ortholog, Gm44753.' },
    { ref: 'm-eztracks-p2', note: 'Ensembl gene IDs for CHiLL1 and GCAWKR, taken from a GENCODE GTF file.' },
  ],
  checks: [
    { q: 'What is a gene annotation?',
      options: [
        { t: 'A catalog that records where genes and their transcripts sit in the genome, with names and IDs', ok: true, why: 'Right: it is the set of labels written on top of the DNA sequence. It is usually shared as a GTF file.' },
        { t: 'The DNA sequence of the genome itself', ok: false, why: 'The sequence is the unlabeled "photo". The annotation is the list of labels that says where genes and exons are.' },
        { t: 'A measurement of how much RNA each gene makes', ok: false, why: 'That is expression. An annotation says where a gene is, not how active it is.' },
        { t: 'A chemical tag that switches a gene off', ok: false, why: 'An annotation is information (a list), not a physical tag on the DNA.' },
      ], bg: true },
    { q: 'How did the authors turn four gene catalogs into their final list of targets?',
      options: [
        { t: 'They merged all four into one annotation, then removed lncRNAs close to protein-coding exons or expressed below 0.1 FPKM, among other filters', ok: true, why: 'Right: StringTie merged the four, then the filters (2 kb from a protein-coding exon, FPKM below 0.1, clustering of TSSs within 300 bp, extra evidence) trimmed the list.' },
        { t: 'They kept only the lncRNAs that appear in all four catalogs', ok: false, why: 'No: the catalogs were merged (a union), not intersected. A lncRNA listed in only one catalog can still end up on the final list.' },
        { t: 'They used GENCODE alone because it is the standard', ok: false, why: 'No: of the nine lncRNAs chosen for follow-up, two are annotated by FANTOM CAT or BIGTranscriptome, so the other catalogs mattered.' },
        { t: 'They picked the lncRNAs with the most ESTs', ok: false, why: 'ESTs are not used to pick targets. The paper cites them only when checking whether RNA runs from one gene into its neighbor.' },
      ], source: ['m-library-design-p1', 'm-library-design-p2', 'res-aso-p1'] },
    { q: 'In an experiment, gene X is "upregulated" in treated cells compared with untreated cells. What was measured?',
      options: [
        { t: 'More RNA from gene X in the treated cells', ok: true, why: 'Right: up- and downregulation describe the amount of RNA (expression) compared with a reference.' },
        { t: 'Extra copies of the gene X DNA in the treated cells', ok: false, why: 'That would be a change in the DNA itself. Upregulation is about how much RNA is made, whatever the reason.' },
        { t: 'A change in the DNA letters of gene X', ok: false, why: 'A letter change alters the gene, not how much RNA is made. "Up" refers to RNA amount.' },
        { t: 'Gene X is switched off and no RNA is left', ok: false, why: 'That is the opposite: downregulation, here all the way to zero.' },
      ], bg: true },
    { q: 'The authors checked ESTs around CHiLL1 and its neighbor TNFRSF10B. What did this show?',
      options: [
        { t: 'No evidence that one RNA runs through from one gene into the other', ok: true, why: 'Right: an EST spanning both genes would have suggested readthrough. The paper finds none (and a second test agrees).' },
        { t: 'How much CHiLL1 RNA a cell makes', ok: false, why: 'ESTs show that RNA exists in a region, not how much of it there is.' },
        { t: 'That CHiLL1 has an ortholog in mouse', ok: false, why: 'A likely mouse ortholog is mentioned for GCAWKR, not CHiLL1, and for a different purpose.' },
        { t: 'That CHiLL1 and TNFRSF10B share one ENSG ID', ok: false, why: 'Each gene has its own ENSG ID; sharing one would mean they were the same gene.' },
      ], source: ['res-aso-p4'] },
  ],
});

/* ============================================================================================== B8 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'B8',
  defines: ['aso'],
  body: [
    { k: 'h', text: 'Same DNA, different cells' },
    { k: 'bgnd', html:
      `<p>A lung cell and a skin cell carry exactly the same DNA, yet they use different genes (gene expression, lesson B7). Something must tell each gene when, where and how strongly to be copied. That "something" is written in the DNA too: short stretches that are not copied into a product themselves but control other genes. They are called <b>DNA regulatory elements</b>. They act in <i>cis</i> (lesson B6), meaning on genes of the same DNA molecule, usually nearby. The promoter (lesson B4) is one. The other famous kind is the enhancer.</p>` },
    { k: 'h', text: 'Enhancers, transcription factors and their sites' },
    { k: 'bgnd', html:
      `<p>An <b>enhancer</b> turns a gene’s activity <i>up</i>. Unlike a promoter, it need not sit next to the gene: it can lie thousands of letters away, upstream or downstream, even inside another gene. The DNA bends into a loop so that the enhancer touches the promoter and helps RNA polymerase get started. Enhancers are usually active only in certain cell types, which is one reason a lung cell differs from a skin cell.</p>` +
      `<p>What makes an enhancer or a promoter work? <b>Transcription factors</b> (TFs): proteins that recognize one particular short DNA pattern and stick to it. A bound TF helps RNA polymerase start (an activator) or blocks it (a repressor). The pattern a TF recognizes is its <b>transcription factor binding site</b> (<b>TFBS</b>). It is only a handful of letters long, so one TF can match many places in the genome. Which TFs are active in a cell largely decides which genes are on.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a gene is a lamp. The promoter is the lamp’s own switch at its base. An enhancer is a dimmer in another room, wired to the lamp. A TF is a person who knows exactly which switch to flip, and the TFBS is the shape of the switch that fits their hand. <i>Where it breaks:</i> there is no wire. The "connection" is the DNA folding so two distant spots touch, and an enhancer can serve several genes.</p>` },
    { k: 'h', text: 'Chromatin: DNA is packaged' },
    { k: 'bgnd', html:
      `<p>In the nucleus, DNA is not bare. It is wound around spool-like proteins (histones) and folded into a compact package called <b>chromatin</b>. The packing is uneven. Tightly packed regions hide the DNA from TFs and are usually silent. Open regions can be reached, and they are where regulatory elements are usually active. Chemical tags on the spool proteins help set the packing and act as clues about what a region is doing. (EZH2, from lesson B6, adds a tag that tends to switch nearby genes off.)</p>` },
    { k: 'h', text: 'Finding where a gene really starts: three clues from ENCODE' },
    { k: 'bgnd', html:
      `<p>A gene catalog says where a start site is, but catalogs can be off by a bit, and a deletion has to hit the <i>real</i> start. So the authors looked for independent evidence. <b>ENCODE</b> (Encyclopedia of DNA Elements) is a large public project that measured, in many human cell types, where RNA starts, which DNA is open, and which chemical marks sit on chromatin. Anyone can reuse its data. Three kinds matter here:</p>` +
      `<ul><li><b>CAGE</b> (Cap Analysis of Gene Expression) catches the very first end of RNAs, which carries a special "cap". Short tags from that end are sequenced and placed on the genome. Where many tags pile up, RNAs really begin, so CAGE pinpoints the TSS.</li>` +
      `<li><b>DNase I hypersensitivity</b>: DNase I is an enzyme that cuts DNA, but only where chromatin is open. Places where it cuts easily mark open DNA, often a promoter or enhancer with TFs bound.</li>` +
      `<li><b>ChromHMM</b> is a computer program that reads many chromatin marks and labels each stretch of the genome with a "state", such as Active TSS or Active Enhancer. The states are predictions, not direct measurements.</li></ul>` +
      `<p>Each clue is imperfect, so a start site backed by several clues is more believable than one backed by a single clue.</p>` },
    { k: 'svg', caption: 'A gene’s neighborhood and three clues to its real start. CAGE tags pile up at the TSS, DNase I cuts where DNA is open, and ChromHMM labels the region.',
      svg: `<svg viewBox="0 0 480 336" role="img" aria-label="A stretch of DNA with an enhancer bound by a transcription factor, a loop to a promoter and a gene. Below, three tracks line up at the transcription start site: CAGE tags piling up, DNase I open-DNA humps over the enhancer and promoter, and ChromHMM state labels enhancer and Active TSS">` +
        `<path d="M10 77 H470" class="ln thick s-blue"/>` +
        `<rect x="40" y="62" width="60" height="30" rx="6" class="f-green"/><text x="70" y="82" class="mid s">enhancer</text>` +
        `<circle cx="70" cy="49" r="11" class="f-purple"/><text x="70" y="54" class="mid s b">TF</text>` +
        `<path d="M104 64 C150 14 240 14 270 58" class="arrow s-green"/>` +
        `<text x="190" y="12" class="mid s m">DNA loops: enhancer meets promoter</text>` +
        `<rect x="238" y="62" width="62" height="30" rx="6" class="f-orange"/><text x="269" y="82" class="mid s">promoter</text>` +
        `<rect x="300" y="66" width="164" height="22" rx="6" class="f-blue"/><text x="382" y="82" class="mid s">gene</text>` +
        `<path d="M300 60 V44 H326" class="arrow s-red"/><text x="332" y="49" class="s t-red b">TSS</text>` +
        `<path d="M300 94 V302" class="ln dash m"/>` +
        `<text x="10" y="126" class="b">CAGE</text>` +
        `<path d="M10 166 H470" class="ln thin m"/>` +
        `<path d="M288 166 V158 M294 166 V142 M300 166 V124 M306 166 V144 M312 166 V160 M126 166 V160 M412 166 V161" class="ln s-red"/>` +
        `<text x="332" y="140" class="s">RNA starts pile up</text><text x="332" y="156" class="s">at the TSS</text>` +
        `<text x="10" y="194" class="b">DNase I</text>` +
        `<path d="M10 236 H470" class="ln thin m"/>` +
        `<path d="M40 236 C52 236 56 200 70 200 C84 200 88 236 100 236 Z" class="f-teal"/>` +
        `<path d="M236 236 C250 236 256 196 270 196 C284 196 290 236 304 236 Z" class="f-teal"/>` +
        `<text x="332" y="212" class="s">open DNA: DNase I</text><text x="332" y="228" class="s">cuts easily here</text>` +
        `<text x="10" y="264" class="b">ChromHMM</text>` +
        `<rect x="10" y="272" width="30" height="26" class="f-gray"/><rect x="40" y="272" width="60" height="26" class="f-green"/><rect x="100" y="272" width="132" height="26" class="f-gray"/><rect x="232" y="272" width="78" height="26" class="f-orange"/><rect x="310" y="272" width="160" height="26" class="f-gray"/>` +
        `<text x="70" y="290" class="mid s">enhancer</text><text x="271" y="290" class="mid s">Active TSS</text><text x="390" y="290" class="mid s m">other states</text>` +
        `<text x="240" y="324" class="mid s m">Clues that agree make a start site more believable</text></svg>` },
    { k: 'h', text: 'How this paper uses it' },
    { k: 'paper', ref: 'm-library-design-p2',
      quote: 'TSS clusters were intersected with ENCODE evidence source specific to A549 cells: Cap Analysis of Gene Expression (CAGE), DNAse I hypersensitivity sites, and ChromHMM marks … Candidate TSS clusters were prioritised by the number of evidence sources.' },
    { k: 'plain', source: ['m-library-design-p2', 'fig1B'], html:
      `<p>After clustering start sites, the authors checked each cluster against ENCODE data measured in A549 cells (the lung cancer cells they work with): CAGE, DNase I hypersensitive sites, and ChromHMM states. The states they accepted include several start-site states (such as Active TSS and Bivalent-Poised TSS) and several enhancer states. Clusters were ranked by how many of these evidence sources supported them. Figure 1B names the same three sources.</p>` },
    { k: 'paper', ref: 'res-aso-p4',
      quote: 'The GENCODE annotation may commence slightly downstream of the true TSS, as evidenced by various transcriptomic evidence, but the latter falls within the region targeted by CRISPR-del' },
    { k: 'plain', source: ['res-aso-p4'], html:
      `<p>For CHiLL1, the catalog’s start may sit a little downstream of the real start, as other RNA evidence suggests. But the real start lies inside the stretch of DNA that the authors cut out, so the experiment still hits it. This is exactly why independent start-site evidence matters.</p>` },
    { k: 'paper', ref: 'res-validation-p4',
      quote: 'genomic deletion cannot distinguish between DNA-dependent (e.g., enhancer) or RNA-dependent mechanisms (e.g., mature lncRNA, or its transcription)' },
    { k: 'plain', source: ['res-validation-p4', 'res-pipeline-p1'], html:
      `<p>If deleting a stretch of DNA changes how cells behave, is it because the lncRNA is gone (RNA-dependent), or because the removed DNA also held a regulatory element, such as an enhancer of a neighboring gene (DNA-dependent)? The authors cut only the start-site region, rather than the whole gene, partly to lower this risk (res-pipeline-p1). To separate the two explanations they also used ASOs, short strands that destroy one RNA and leave the DNA alone (lesson D6). For LINC00115 the effect depended on the RNA.</p>` },
    { k: 'paper', ref: 'res-mechanism-p4',
      quote: 'Numerous transcription factor binding sites (TFBS) are enriched in changing genes, including ZBTB7A (in both A549 and H460)' },
    { k: 'plain', source: ['res-mechanism-p4', 'res-mechanism-p2'], html:
      `<p>After CHiLL1 was reduced, many other genes changed their RNA level (res-mechanism-p2). The authors asked what those changing genes share. Binding sites for several TFs turn up more often among them than expected, and ZBTB7A is named, in both cell types. That makes ZBTB7A a TF worth a closer look; the main text does not follow it up with an experiment.</p>` },
  ],
  appears: [
    { ref: 'm-library-design-p2', note: 'Start-site clusters are checked against ENCODE evidence for A549 cells: CAGE, DNase I hypersensitive sites and ChromHMM states.' },
    { ref: 'fig1B', note: 'The library-design flow chart shows CAGE, ChromHMM and DNase I hypersensitivity as the three evidence sources.' },
    { ref: 'res-validation-p4', note: 'Deleting DNA cannot separate an enhancer (DNA-dependent) effect from an RNA-dependent one.' },
    { ref: 'res-mechanism-p4', note: 'Transcription factor binding sites, including ZBTB7A, are enriched among the genes that change.' },
    { ref: 'm-eztracks-p1', note: 'ENCODE candidate cis-regulatory elements are one of the tracks drawn next to the genes.' },
  ],
  checks: [
    { q: 'What does a transcription factor do?',
      options: [
        { t: 'It binds a specific short DNA pattern and turns nearby genes up or down', ok: true, why: 'Right: a TF recognizes its binding site and helps (or blocks) the start of transcription.' },
        { t: 'It copies a gene into RNA', ok: false, why: 'That is RNA polymerase. A TF only helps or blocks the polymerase.' },
        { t: 'It is the DNA position where copying begins', ok: false, why: 'That is the TSS, a place on the DNA. A TF is a protein that lands on DNA.' },
        { t: 'It cuts DNA where chromatin is open', ok: false, why: 'That describes the enzyme DNase I, which is used as a tool to find open DNA.' },
      ], bg: true },
    { q: 'Why does a DNase I hypersensitive site point to regulatory DNA?',
      options: [
        { t: 'DNase I cuts only where DNA is open, and promoters and enhancers with bound TFs are open', ok: true, why: 'Right: easy cutting marks open chromatin, a typical sign of active regulatory DNA. It shows where, not what it does.' },
        { t: 'DNase I measures how much RNA a gene makes', ok: false, why: 'DNase I does not read RNA. Amounts of RNA come from expression measurements.' },
        { t: 'DNase I reads the first letter of each RNA', ok: false, why: 'That is CAGE. DNase I tells you about DNA being open or packed.' },
        { t: 'DNase I deletes the gene so its effect can be seen', ok: false, why: 'Here it is only a probe for open chromatin; nothing is being deleted.' },
      ], bg: true },
    { q: 'Which three kinds of ENCODE evidence did the authors use to support start-site clusters?',
      options: [
        { t: 'CAGE, DNase I hypersensitivity and ChromHMM states', ok: true, why: 'Right (m-library-design-p2; Figure 1B): clusters were ranked by how many of these sources backed them.' },
        { t: 'GENCODE, FANTOM CAT and BIGTranscriptome', ok: false, why: 'Those are the gene catalogs that were merged, not the evidence used afterwards.' },
        { t: 'Enhancers, TFBS and chromatin', ok: false, why: 'These are concepts from this lesson, not measurements the authors intersected with their clusters.' },
        { t: 'ESTs, orthologs and GTF files', ok: false, why: 'These come from the previous lesson. ESTs and orthologs are cited elsewhere, for other reasons.' },
      ], source: ['m-library-design-p2', 'fig1B'] },
    { q: 'Why can deleting a stretch of DNA alone not prove that a lncRNA causes an effect?',
      options: [
        { t: 'The removed DNA might also contain a regulatory element, such as an enhancer, so the effect could be DNA-dependent', ok: true, why: 'Right (res-validation-p4): a deletion cannot tell RNA-dependent from DNA-dependent mechanisms.' },
        { t: 'Because a deletion can never be detected', ok: false, why: 'Deletions can be checked. The problem is interpreting the effect, not seeing the deletion.' },
        { t: 'Because enhancers are made of RNA', ok: false, why: 'Enhancers are stretches of DNA, not RNA molecules.' },
        { t: 'Because deleting DNA always kills the cell', ok: false, why: 'Many deletions leave cells alive. The point is about which part (DNA or RNA) causes the effect.' },
      ], source: ['res-validation-p4'] },
  ],
});
