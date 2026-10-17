/* lessons-L3.js — filled by one content author (scope L3). */

/* ============================================================================================== B7 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'B7',
  defines: ['cancer', 'a549', 'rna-seq', 'fpkm'],
  body: [
    { k: 'h', text: 'Who writes the list of genes?' },
    { k: 'bgnd', html:
      `<p>The genome is a huge string of DNA letters with no labels on it. Somebody has to work out where the genes are and write it down. That list is a <b>gene annotation</b>: for every gene, and for every RNA copy (transcript) it can make, it records the chromosome, start, end, strand and exons, plus a name and an ID.</p>` +
      `<p>An annotation is a set of educated claims built from evidence (sequenced RNA, expert curation, computer predictions). It is useful but never final: a stretch of DNA with no label is not proof that nothing is there.</p>` },
    { k: 'h', text: 'Files and IDs: GTF and ENSG' },
    { k: 'bgnd', html:
      `<p>Annotations are shared as plain-text tables called <b>GTF files</b> (Gene Transfer Format). Each row describes one feature (a gene, a transcript or an exon) with its chromosome, start, end, strand and a few notes. Programs read them to draw gene maps or count RNA by gene.</p>` +
      `<p>Every gene also gets an <b>Ensembl gene ID</b>: the letters <b>ENSG</b> plus a number (for transcripts, <b>ENST</b>). A name such as "MALAT1" is a nickname, and a gene can have several. The ID is the stable address that says exactly which gene is meant.</p>` },
    { k: 'h', text: 'Four catalogs, four maps' },
    { k: 'bgnd', html:
      `<p>Several groups publish human gene catalogs. Each is built from different data and rules, so each contains lncRNAs that the others miss. The paper used four sources:</p>` +
      `<ul><li><b>GENCODE</b>: the standard human annotation. It mixes expert curation with computer pipelines and lists protein-coding genes and noncoding RNAs. It comes in numbered versions (the paper uses release 19 and v36).</li>` +
      `<li><b>FANTOM CAT</b>: a lncRNA catalog from the FANTOM consortium that relies on a method for finding where RNAs begin (lesson B8).</li>` +
      `<li><b>BIGTranscriptome</b>: another published list of human lncRNAs.</li>` +
      `<li>A <b>new transcriptome assembly</b>: the authors read out the RNA of their own lung cancer cells (RNA-seq, lesson D10) and let a program, <b>StringTie</b>, stitch the short pieces into whole transcripts, like rebuilding a shredded page by matching torn edges. It can reveal RNAs that no catalog lists yet.</li></ul>` },
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
      `<p>The authors downloaded GTF files from GENCODE (release 19), BIGTranscriptome and FANTOM CAT, made a new assembly from RNA-seq of A549 cells (the lung cancer cells they work with; lesson C4), and merged all 4 with StringTie’s merge option. They then dropped lncRNAs whose start site overlapped, or lay less than 2 kb up or downstream of, a protein-coding exon in GENCODE; dropped transcripts below 0.1 FPKM in A549 cells (FPKM is a unit for how much RNA a gene makes; lesson D10); grouped start sites within 300 bp into one cluster; and kept clusters backed by extra evidence (next lesson). The result: 831 expressed lncRNAs with 998 high-confidence TSSs.</p>` },
    { k: 'bgnd', html:
      `<p><b>Why merge?</b> The paper does not say. A common reason is that every catalog is incomplete, so merging catches more lncRNAs.</p>` },
    { k: 'why', source: ['limitations-p2', 'res-aso-p1'], html:
      `<p>A lncRNA on no list cannot be tested, so the list sets the study’s limits. The authors admit that annotation is still incomplete (limitations-p2). The extra catalogs did matter: of the nine lncRNAs picked for ASO work, seven are annotated by GENCODE and two by either FANTOM CAT or BIGTranscriptome (res-aso-p1).</p>` },
    { k: 'flag', source: ['m-library-design-p1', 'm-eztracks-p2', 'fig1B'], html:
      `<p>Heads-up for the Methods. (1) The sentence is printed as “We alsma, lo generated a novel transcriptome assembly”, most likely a typo for “We also generated”. (2) Two GENCODE versions appear: release 19 for the target list, v36 for the gene models in the figures. (3) Figure 1B labels one box “FANTOM5”; the text says FANTOM CAT.</p>` },
    { k: 'h', text: 'Two more words from gene maps: EST and ortholog' },
    { k: 'bgnd', html:
      `<p><b>ESTs</b> (expressed sequence tags) are short pieces of sequence read from RNA that cells really made: an older, cheap kind of evidence that "this stretch of DNA gets transcribed". An EST that stretched from one gene into its neighbor would suggest that one long RNA runs through both (readthrough transcription, lesson B4).</p>` +
      `<p>An <b>ortholog</b> is the "same" gene in another species: two genes that descend from one gene in a shared ancestor. Orthologs often (not always) do similar jobs, so a mouse ortholog lets scientists study a human gene in mice. lncRNAs are usually less conserved than protein-coding genes, so their orthologs are hard to spot and often called "likely".</p>` },
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
      `<p><b>Analogy:</b> the genome is a cookbook that every kitchen owns. The annotation is its index. The transcriptome is the list of recipes being cooked right now, and "upregulated" means more portions than yesterday. <i>Where it breaks:</i> an annotation is pieced together by outsiders from evidence, so it can be wrong; and the amount of RNA present also depends on how fast it is thrown away, not only on how fast it is made.</p>` },
    { k: 'plain', source: ['res-pipeline-p5', 'res-pipeline-p2', 'res-mechanism-p2'], html:
      `<p><b>Up and down in the paper.</b> After deleting the start site of 12 randomly chosen targets, the authors saw the RNA go down as expected for 7, stay unchanged for 3 and go <i>up</i> for 2. “Transcriptome” is used in two ways: the catalog of lncRNAs in these lung cancer cells (“the NSCLC lncRNA transcriptome”) and all the RNAs measured in a sample (“to quantify the transcriptome of A549 cells”).</p>` },
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
      `<p>A gene catalog says where a start site is, but catalogs can be off by a bit, and the stretch of DNA that is cut out has to include the <i>real</i> start. So the authors looked for independent evidence. <b>ENCODE</b> (Encyclopedia of DNA Elements) is a large public project that measured, in many human cell types, where RNA starts, which DNA is open, and which chemical marks sit on chromatin. Anyone can reuse its data. Three kinds matter here:</p>` +
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
        { t: 'DNase I deletes the gene so its effect can be seen', ok: false, why: 'Here it is only a tool for finding open chromatin; nothing is being deleted.' },
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
        { t: 'The removed DNA might also contain a regulatory element, such as an enhancer, so the effect could be DNA-dependent', ok: true, why: 'Right (res-validation-p4): deleting DNA cannot tell RNA-dependent from DNA-dependent mechanisms.' },
        { t: 'Because a deletion can never be detected', ok: false, why: 'Deletions can be checked. The problem is interpreting the effect, not seeing the deletion.' },
        { t: 'Because enhancers are made of RNA', ok: false, why: 'Enhancers are stretches of DNA, not RNA molecules.' },
        { t: 'Because deleting DNA always kills the cell', ok: false, why: 'Many deletions leave cells alive. The point is about which part (DNA or RNA) causes the effect.' },
      ], source: ['res-validation-p4'] },
  ],
});

/* ============================================================================================== C1 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'C1',
  defines: ['chemoresistance', 'invasion', 'migration', 'metastasis', 'cell-background', 'cisplatin'],
  body: [
    { k: 'h', text: 'What goes wrong in cancer' },
    { k: 'bgnd', html:
      `<p>A healthy cell divides only when told to, stops when told to, and self-destructs (apoptosis) if it is badly damaged (lesson B1). <b>Cancer</b> is a group of diseases in which cells escape these controls. They keep dividing, ignore "stop" and "die" signals, and can push into nearby tissue and travel to other organs. The cause is damage that builds up in the cell’s DNA, in genes that manage growth, repair and cell death. A tumor’s cells are all descendants of one changed cell, so they inherit its changes.</p>` +
      `<p>A <b>tumor</b> is a lump of cells that has grown more than it should. Not every tumor is cancer: a benign tumor stays put, a malignant one invades its surroundings. (Some cancers, such as leukemia, form no lump at all.)</p>` },
    { k: 'h', text: 'Hallmarks and phenotypes' },
    { k: 'bgnd', html:
      `<p>There are many kinds of cancer, but in 2000 Douglas Hanahan and Robert Weinberg argued that nearly all of them acquire the same few abilities. These are the <b>hallmarks of cancer</b>. The original list, in plain words: grow without being told to, ignore stop signals, resist cell death, divide without limit, build their own blood supply, and invade nearby tissue and spread to distant organs (that spread is called metastasis, lesson C2). Later versions added more, such as changed energy use and hiding from the immune system. A hallmark is an ability, not a gene, and many genes can feed into one hallmark.</p>` +
      `<p>A <b>phenotype</b> is any trait of a cell that you can observe or measure: how fast it divides, whether it survives a drug, how well it moves. (The DNA is the genotype.) Each hallmark shows up as a measurable phenotype, which is how hallmarks can be tested in lab dishes.</p>` +
      `<p><b>Pleiotropic</b> means "one cause, several effects". A pleiotropic gene influences several traits at once. In this paper a pleiotropic lncRNA is one that matters for more than one hallmark, and "multi-hallmark" means tested against several hallmarks instead of one.</p>` },
    { k: 'h', text: 'Accelerators and brakes: oncogenes and tumor suppressors' },
    { k: 'bgnd', html:
      `<p>Genes that control growth fall into two families, and a car is a good picture for both.</p>` +
      `<p>An <b>oncogene</b> is an accelerator pedal stuck down. The normal version of the gene helps cells grow when a signal arrives. If it becomes overactive (stuck "on", or present in too many copies), the cell gets a constant "grow!" order. One overactive copy is usually enough.</p>` +
      `<p>A <b>tumor suppressor</b> is the brake. Its job is to slow division, repair DNA, or trigger cell death. If it is lost or broken, nothing holds the cell back. Because one working copy is often enough, both copies usually have to fail.</p>` },
    { k: 'svg', caption: 'Accelerator and brake: cancer needs a stuck accelerator (oncogene) and/or a failed brake (tumor suppressor).',
      svg: `<svg viewBox="0 0 480 272" role="img" aria-label="A two by two grid. Row one, oncogene as an accelerator: pressed only when told to grow in a healthy cell, stuck down so the cell grows nonstop in a cancer cell. Row two, tumor suppressor as a brake: slows growth when needed in a healthy cell, broken so nothing holds growth back in a cancer cell">` +
        `<text x="210" y="24" class="mid b">Healthy cell</text><text x="390" y="24" class="mid b">Cancer cell</text>` +
        `<text x="62" y="84" class="mid b">Oncogene</text><text x="62" y="102" class="mid s m">(accelerator)</text>` +
        `<text x="62" y="196" class="mid b">Tumor</text><text x="62" y="214" class="mid b">suppressor</text><text x="62" y="232" class="mid s m">(brake)</text>` +
        `<rect x="125" y="40" width="170" height="104" rx="10" class="f-green"/>` +
        `<rect x="182" y="52" width="56" height="28" rx="6" class="f-none"/><text x="210" y="71" class="mid s">gas</text>` +
        `<text x="210" y="108" class="mid s">pressed only when</text><text x="210" y="126" class="mid s">told to grow</text>` +
        `<rect x="305" y="40" width="170" height="104" rx="10" class="f-red"/>` +
        `<path d="M350 52 V80" class="arrow s-red"/>` +
        `<rect x="362" y="60" width="56" height="28" rx="6" class="f-none"/><text x="390" y="79" class="mid s">gas</text>` +
        `<text x="390" y="108" class="mid s">stuck down:</text><text x="390" y="126" class="mid s">grows nonstop</text>` +
        `<rect x="125" y="156" width="170" height="104" rx="10" class="f-green"/>` +
        `<rect x="182" y="168" width="56" height="28" rx="6" class="f-none"/><text x="210" y="187" class="mid s">brake</text>` +
        `<text x="210" y="224" class="mid s">slows growth</text><text x="210" y="242" class="mid s">when needed</text>` +
        `<rect x="305" y="156" width="170" height="104" rx="10" class="f-red"/>` +
        `<rect x="362" y="168" width="56" height="28" rx="6" class="f-none"/><text x="390" y="187" class="mid s">brake</text>` +
        `<path d="M358 164 L422 200 M422 164 L358 200" class="ln thick s-red"/>` +
        `<text x="390" y="224" class="mid s">broken: nothing</text><text x="390" y="242" class="mid s">holds growth back</text></svg>` },
    { k: 'bgnd', html:
      `<p><b>Where the car picture breaks down.</b> (1) A cell has many accelerators and brakes wired into networks, and cancer usually needs several changes, not one stuck pedal. (2) A gene is not fixed in one role: the same gene can act as an oncogene in one cell type and as a tumor suppressor in another. (3) Not every "accelerator" is a protein-coding gene. RNAs can act like one too, and some press down on brake genes. (4) The normal version of an oncogene is not bad: cells need it. It is the stuck-on or over-copied version that causes trouble.</p>` },
    { k: 'memory', html:
      `<p><b>Memory aid:</b> an <b>onco</b>gene is stuck <b>on</b> (accelerator). A tumor <b>suppressor</b> <b>suppresses</b> growth (brake). Hallmarks are the skills every cancer needs, whichever genes got it there.</p>` },
    { k: 'h', text: 'How this paper uses these ideas' },
    { k: 'paper', ref: 'res-multipheno-p1',
      quote: 'Cancers thrive via a variety of phenotypic hallmarks, or biological capabilities acquired by cells during tumor progression.' },
    { k: 'plain', source: ['res-multipheno-p1', 'intro-p6', 'fig1A'], html:
      `<p>Hallmarks are abilities cells acquire, and each shows up as a measurable phenotype. The paper tests three hallmarks: proliferation (growth), chemoresistance (surviving a cancer drug) and invasion. Figure 1A’s wheel names the three phenotypes Proliferation, Cisplatin and Migration, so the invasion hallmark is measured as cell movement (migration). You will meet both words in lesson C2, and cisplatin in C3.</p>` },
    { k: 'flag', source: ['intro-p6', 'res-multipheno-p7', 'fig1A'], html:
      `<p>The third hallmark has two names. The Introduction says “invasion” (intro-p6), Figure 1A labels the wheel “Migration”, and the Results call migration “a key hallmark underlying the invasion and metastasis of tumor cells”. What the experiment actually measures is how cells move.</p>` },
    { k: 'paper', ref: 'intro-p5',
      quote: 'an ideal screen should prioritize lncRNA targets that are both pleiotropic (impact multiple disease hallmarks) and background independent (effective regardless of cell model)' },
    { k: 'plain', source: ['intro-p5'], html:
      `<p>This is the paper’s design goal. A good target should affect several hallmarks (pleiotropic) and should work in different cell models (“background independent”, lesson C4). The authors argue that single-hallmark, single-cell-model designs tend to find effects that do not carry over to the disease.</p>` },
    { k: 'paper', ref: 'intro-p3',
      quote: 'LINC00511, which promotes NSCLC by binding chromatin-modifying enzyme EZH2 and repressing tumor-suppressor genes, including p57 and LATS2' },
    { k: 'plain', source: ['intro-p3', 'summary-p1'], html:
      `<p>This is the "brake" story: LINC00511 helps a common lung cancer by pressing down on tumor-suppressor genes (p57, LATS2). Following that idea, the paper calls lncRNAs that help cancer cells “oncogenic”. Its summary says that 80 high-confidence oncogenic lncRNAs are active in this kind of lung cancer.</p>` },
    { k: 'plain', source: ['res-mechanism-p4'], html:
      `<p><b>A real case of "both".</b> The paper notes that ZBTB7A “has been reported as both an oncogene and tumor suppressor”, so a gene’s role can depend on context.</p>` },
  ],
  appears: [
    { ref: 'intro-p2', note: 'Hallmarks “as defined by Hanahan and Weinberg”.' },
    { ref: 'intro-p5', note: 'The ideal target is both pleiotropic and background independent.' },
    { ref: 'res-multipheno-p1', note: 'Cancers rely on “phenotypic hallmarks”; earlier screens covered one hallmark only.' },
    { ref: 'intro-p3', note: 'LINC00511 represses the tumor-suppressor genes p57 and LATS2.' },
    { ref: 'summary-p1', note: 'The summary: 80 high-confidence oncogenic lncRNAs; “pleiotropic” roles.' },
  ],
  checks: [
    { q: 'A gene that is stuck "on" and keeps telling cells to grow is best described as a(n):',
      options: [
        { t: 'Oncogene', ok: true, why: 'Right: an overactive growth gene is the stuck accelerator.' },
        { t: 'Tumor suppressor', ok: false, why: 'A tumor suppressor is the brake. It causes trouble when it is lost or broken, not when it is stuck on.' },
        { t: 'Hallmark', ok: false, why: 'A hallmark is an ability of cancer cells (for example, unlimited growth), not a gene.' },
        { t: 'Phenotype', ok: false, why: 'A phenotype is an observable trait of a cell, such as growth speed. It is not a type of gene.' },
      ], bg: true },
    { q: 'The authors want targets that are "pleiotropic". What does that mean in the paper?',
      options: [
        { t: 'The lncRNA affects multiple cancer hallmarks', ok: true, why: 'Right (intro-p5): pleiotropic means “impact multiple disease hallmarks”.' },
        { t: 'The lncRNA works in every cell model', ok: false, why: 'That is “background independent”, the second goal in the same sentence.' },
        { t: 'The lncRNA has several isoforms', ok: false, why: 'Isoforms are different versions of a transcript. They have nothing to do with how many hallmarks are affected.' },
        { t: 'The lncRNA makes many different proteins', ok: false, why: 'lncRNAs are noncoding and, by definition, do not make proteins.' },
      ], source: ['intro-p5'] },
    { q: 'Which three cancer hallmarks did the paper test?',
      options: [
        { t: 'Proliferation, chemoresistance and invasion (measured as migration)', ok: true, why: 'Right (intro-p6, with Figure 1A): growth, survival under a cancer drug, and movement.' },
        { t: 'Blood-vessel growth, immune escape and changed energy use', ok: false, why: 'These are real hallmarks in Hanahan and Weinberg’s lists, but the paper did not test them.' },
        { t: 'Proliferation, apoptosis and DNA repair', ok: false, why: 'Apoptosis and DNA repair are related ideas but are not the three hallmarks the paper tested.' },
        { t: 'Oncogene, tumor suppressor and phenotype', ok: false, why: 'These are concepts from this lesson, not hallmarks.' },
      ], source: ['intro-p6', 'fig1A'] },
    { q: 'Which statement shows where the "accelerator and brake" picture is too simple?',
      options: [
        { t: 'Many genes interact, and the same gene can act as an oncogene or as a tumor suppressor depending on context', ok: true, why: 'Right: cells run on networks, and the paper itself notes ZBTB7A “as both an oncogene and tumor suppressor”.' },
        { t: 'Oncogenes never exist in healthy cells', ok: false, why: 'Healthy cells carry the normal versions of these genes and need them. Only the overactive version is the problem.' },
        { t: 'Tumor suppressors speed up cell division', ok: false, why: 'That is reversed: tumor suppressors are the brakes.' },
        { t: 'Only protein-coding genes can promote cancer', ok: false, why: 'The paper calls lncRNAs, which do not code for protein, “oncogenic”.' },
      ], source: ['res-mechanism-p4', 'summary-p1'] },
  ],
});

/* ============================================================================================== C2 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'C2',
  defines: ['h460', 'h441', 'be874', 'tumor-subtype', 'toxicity', 'depletion'],
  body: [
    { k: 'h', text: 'Mutations: typos in the DNA' },
    { k: 'bgnd', html:
      `<p>When a cell copies its DNA, or when DNA is damaged (by tobacco smoke or UV light, for example), letters can change. A lasting change in the DNA sequence is a <b>mutation</b>: one letter swapped for another, letters added or lost, or bigger pieces rearranged. Most mutations do nothing. A few hit genes that control growth, repair or cell death, and those can push a cell toward cancer by switching an oncogene on or breaking a tumor suppressor. All the cell’s descendants inherit the mutation.</p>` +
      `<p>An <b>activating mutation</b> makes a protein more active, or active all the time. That is the typical way an oncogene is created. A mutation that breaks a protein is the typical way a tumor suppressor is lost.</p>` },
    { k: 'h', text: 'Copy-number changes: too many or too few copies' },
    { k: 'bgnd', html:
      `<p>Most genes come in two copies, one from each parent. In tumors, pieces of chromosomes can be copied extra times or lost. These <b>copy-number alterations (CNAs)</b> go in two directions. <b>Amplification</b>: a region is present in many extra copies, so its genes make more RNA and protein. <b>Deletion</b>: a region is lost, so its genes make less or nothing. An amplified oncogene or a deleted tumor suppressor pushes the same way, toward cancer. Amplification is a change in the DNA; upregulation is a change in RNA level (amplification is one possible cause). Heads-up: in this paper "deletion" also means DNA that the authors cut out on purpose in the lab (lesson D1).</p>` },
    { k: 'svg', caption: 'Ways a gene can go wrong in a tumor. Each blue box is one copy of the gene.',
      svg: `<svg viewBox="0 0 480 266" role="img" aria-label="Four rows of gene copies: normal has two copies, mutation has two copies with one marked by a red typo, amplification has six copies, deletion has one copy and one lost copy drawn as a dashed empty box">` +
        `<text x="6" y="30" class="b">Normal</text><text x="6" y="48" class="s m">two copies of the gene</text>` +
        `<rect x="214" y="17" width="36" height="30" rx="6" class="f-blue"/><rect x="258" y="17" width="36" height="30" rx="6" class="f-blue"/>` +
        `<text x="6" y="90" class="b">Mutation</text><text x="6" y="108" class="s m">same number, one has a typo</text>` +
        `<rect x="214" y="77" width="36" height="30" rx="6" class="f-blue"/><rect x="258" y="77" width="36" height="30" rx="6" class="f-blue"/><rect x="269" y="83" width="14" height="9" class="solid-red"/>` +
        `<text x="6" y="150" class="b">Amplification</text><text x="6" y="168" class="s m">many extra copies</text>` +
        `<rect x="214" y="137" width="36" height="30" rx="6" class="f-blue"/><rect x="258" y="137" width="36" height="30" rx="6" class="f-blue"/><rect x="302" y="137" width="36" height="30" rx="6" class="f-blue"/><rect x="346" y="137" width="36" height="30" rx="6" class="f-blue"/><rect x="390" y="137" width="36" height="30" rx="6" class="f-blue"/><rect x="434" y="137" width="36" height="30" rx="6" class="f-blue"/>` +
        `<text x="6" y="210" class="b">Deletion</text><text x="6" y="228" class="s m">a copy is lost</text>` +
        `<rect x="214" y="197" width="36" height="30" rx="6" class="f-blue"/><rect x="258" y="197" width="36" height="30" rx="6" class="ln dash m"/><text x="276" y="217" class="mid s m">lost</text>` +
        `<text x="240" y="256" class="mid s m">red mark = a changed letter</text></svg>` },
    { k: 'h', text: 'Lung cancer and its types' },
    { k: 'bgnd', html:
      `<p>Lung cancer is divided into small cell and <b>non-small cell lung cancer (NSCLC)</b> by how the cells look under a microscope. NSCLC is the larger group. Its main types include <b>lung adenocarcinoma (LUAD)</b>, which starts in gland-like cells that make mucus; squamous cell carcinoma; and <b>large cell carcinoma</b>, whose large, abnormal-looking cells fit none of the others. ("Carcinoma" means a cancer that starts in cells lining surfaces.)</p>` +
      `<p>There is a second way to divide lung cancers: by <i>which gene is changed</i>, such as KRAS-mutant or EGFR-mutant. The two ways cross: a tumor can be an adenocarcinoma <i>and</i> KRAS-mutant. The paper uses both.</p>` },
    { k: 'h', text: 'Spreading: migration, invasion, metastasis' },
    { k: 'bgnd', html:
      `<p><b>Cell migration</b> is a cell crawling from one place to another. Healthy cells do it too (healing a wound, patrolling immune cells). <b>Invasion</b> is cancer cells pushing into and through neighboring tissue. <b>Metastasis</b> is cancer cells travelling, usually through blood or lymph vessels, to distant organs and starting new tumors there. Migration is the crawl, invasion is the break-in, metastasis is setting up a colony far away. Metastasis is what makes many cancers so dangerous.</p>` },
    { k: 'h', text: 'KRAS, EGFR and targeted therapy' },
    { k: 'bgnd', html:
      `<p>Cells grow when a growth signal arrives. <b>EGFR</b> is a protein in the cell’s outer membrane that works like an antenna: when a growth signal binds outside, it passes a message inward. A later link in the chain is <b>KRAS</b>, a small protein that works as an on/off switch. It is on while it passes the message, then switches itself off. Both are oncogenes. An activating mutation in either one can lock the chain "on", so the cell hears "grow!" with no signal. A lung tumor usually has one of them changed, not both.</p>` },
    { k: 'svg', caption: 'The growth-signal chain. An activating mutation in EGFR or KRAS keeps it stuck on; a targeted therapy blocks one protein in the chain.',
      svg: `<svg viewBox="0 0 480 252" role="img" aria-label="Chain: a growth signal outside the cell reaches the EGFR protein in the membrane, which passes a message to the KRAS on/off switch, which makes the cell grow and divide. A red note says an activating mutation in EGFR or KRAS leaves the switch stuck on. A yellow box says a targeted therapy blocks one protein in the chain">` +
        `<text x="240" y="16" class="mid s">growth signal arrives outside the cell</text>` +
        `<path d="M240 22 V38" class="arrow"/>` +
        `<rect x="10" y="50" width="460" height="22" rx="4" class="f-gray"/><text x="464" y="66" class="end s m">cell membrane</text>` +
        `<rect x="196" y="40" width="88" height="42" rx="8" class="f-orange"/><text x="240" y="66" class="mid b">EGFR</text>` +
        `<path d="M240 82 V106" class="arrow"/>` +
        `<rect x="190" y="108" width="100" height="36" rx="18" class="f-purple"/><text x="240" y="132" class="mid b">KRAS</text>` +
        `<text x="240" y="162" class="mid s m">an on/off switch</text>` +
        `<path d="M240 168 V196" class="arrow"/>` +
        `<rect x="150" y="198" width="180" height="36" rx="10" class="f-green"/><text x="240" y="221" class="mid">cell grows and divides</text>` +
        `<rect x="10" y="104" width="136" height="64" rx="10" class="f-yellow"/><text x="78" y="126" class="mid s b">targeted therapy</text><text x="78" y="143" class="mid s">blocks one protein</text><text x="78" y="160" class="mid s">in the chain</text>` +
        `<path d="M146 126 H176" class="ln thick s-orange"/><path d="M180 114 V138" class="ln thick s-orange"/>` +
        `<text x="398" y="112" class="mid s b t-red">activating mutation</text><text x="398" y="130" class="mid s t-red">in EGFR or KRAS:</text><text x="398" y="148" class="mid s t-red">switch stuck ON,</text><text x="398" y="166" class="mid s t-red">"grow!" is sent</text><text x="398" y="184" class="mid s t-red">all the time</text>` +
        `<path d="M332 128 H296" class="arrow s-red"/></svg>` },
    { k: 'bgnd', html:
      `<p>A <b>targeted therapy</b> is a drug built to block one specific molecule that the cancer depends on, such as a mutant EGFR, instead of hitting every dividing cell. KRAS was long called "undruggable" because no drug could grip it. The first drugs for it aim at one particular change, <b>G12C</b>. The name works like a street address: protein building blocks (amino acids) have one-letter codes, so G12C means that the amino acid at position 12 of the protein, glycine (G), has been swapped for cysteine (C).</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> KRAS is a light switch that should click back off by itself; an activating mutation tapes it "on". A targeted therapy is a key cut for one lock, not a battering ram. <i>Where it breaks:</i> mutant KRAS is only mostly stuck on, and tumors usually carry other helpful changes too.</p>` },
    { k: 'h', text: 'How this paper uses these ideas' },
    { k: 'paper', ref: 'intro-p1',
      quote: 'The most common NSCLC subtype, carrying activating KRAS mutations (KRAS+), … newly approved targeted therapies only extend life by a few months.' },
    { k: 'plain', source: ['intro-p1'], html:
      `<p>The paper studies a genetic family of lung cancer that it calls KRAS+: tumors whose KRAS gene carries an activating mutation. It names this the most common NSCLC subtype (a subtype is a sub-group of a cancer type). Current treatment, it says, faces three challenges: undruggable mutations, toxicity (harm to healthy cells) and therapy resistance, and newly approved targeted therapies add only a few months of life.</p>` },
    { k: 'paper', ref: 'm-pdx-p1',
      quote: 'KRAS c.34G>T (p.Gly12Cys) mutation was detected in both BE874 organoids and the corresponding primary cancer' },
    { k: 'plain', source: ['m-pdx-p1'], derived: ['12', '34'], html:
      `<p>In one patient-derived model of lung cancer (named BE874; lesson C5) the authors found the KRAS G12C change, and also in the patient’s original tumor. Two notations appear: <b>c.34G>T</b> is the DNA change (the letter G at position 34 of the gene’s coding DNA is now T), and <b>p.Gly12Cys</b> is the protein change (the 12th amino acid, glycine, is now cysteine). They describe the same event.</p>` },
    { k: 'paper', ref: 'res-aso-p5', quote: 'the locus of GCAWKR is frequently amplified in cancer genomes' },
    { k: 'plain', source: ['res-aso-p5', 'res-integration-p4', 'm-cnv-p3'], html:
      `<p>Tumors often carry extra copies of the DNA region that contains GCAWKR, unlike CHiLL1. More broadly, the authors report that their screen hits tend to be amplified, “but not depleted”, in tumor DNA. The Methods speak of regions that are “amplified or deleted”, so “depleted” (reduced or lost) appears to mean deleted here; the paper does not say so explicitly.</p>` },
    { k: 'plain', source: ['fig5A', 'res-aso-p2', 'res-aso-p3', 'm-public-rnaseq-p1'], html:
      `<p><b>Lung cancer types in the paper.</b> Figure 5A labels the lab-grown cell type A549 as lung adenocarcinoma, H460 as large cell lung cancer and H441 as metastatic adenocarcinoma (the text says H441 comes from a pericardial effusion metastasis). H460 and H441 are lung cancer cell types that you meet in lesson C4. For human tumor data the authors picked 101 samples that are both adenocarcinoma and KRAS-mutated, and they report that their RNA-targeting agents also worked in EGFR-mutant cells: two genetic subtypes, one result.</p>` },
  ],
  appears: [
    { ref: 'intro-p1', note: 'NSCLC, the KRAS+ subtype with activating KRAS mutations, and the limits of targeted therapies.' },
    { ref: 'm-pdx-p1', note: 'The patient-derived model carries KRAS c.34G>T (p.Gly12Cys), that is KRAS G12C.' },
    { ref: 'res-aso-p5', note: 'The GCAWKR locus is frequently amplified in cancer genomes.' },
    { ref: 'res-integration-p4', note: 'Screen hits tend to be amplified, not depleted, in tumor DNA.' },
    { ref: 'm-public-rnaseq-p1', note: 'Human tumor data: KRAS-mutated lung adenocarcinoma (LUAD) samples.' },
    { ref: 'res-aso-p3', note: 'The RNA-targeting agents also act in EGFR-mutant cells.' },
  ],
  checks: [
    { q: 'A tumor has far more copies of one region of its DNA than a normal cell does. What is this called?',
      options: [
        { t: 'Amplification', ok: true, why: 'Right: a copy-number gain. More copies usually mean more RNA and protein from the genes inside.' },
        { t: 'Deletion', ok: false, why: 'Deletion is the opposite: copies are lost.' },
        { t: 'An activating mutation', ok: false, why: 'A mutation changes the letters of the DNA but not how many copies there are.' },
        { t: 'Metastasis', ok: false, why: 'Metastasis is the spread of cancer cells to other organs. It is not a DNA change.' },
      ], bg: true },
    { q: 'What is the difference between invasion and metastasis?',
      options: [
        { t: 'Invasion is pushing into neighboring tissue; metastasis is travelling to distant organs and founding new tumors', ok: true, why: 'Right: invasion is local, metastasis is the distant spread. Migration (cell movement) underlies both.' },
        { t: 'They mean the same thing', ok: false, why: 'They are two stages: invasion usually comes first and makes metastasis possible.' },
        { t: 'Invasion is cells dividing; metastasis is cells moving', ok: false, why: 'Dividing is proliferation. Both invasion and metastasis involve moving.' },
        { t: 'Invasion happens only in the lab; metastasis only in patients', ok: false, why: 'Both are real processes in patients. In the lab, only the cell movement part is measured.' },
      ], bg: true },
    { q: 'What does "G12C" in KRAS G12C mean?',
      options: [
        { t: 'At position 12 of the KRAS protein, glycine (G) is replaced by cysteine (C)', ok: true, why: 'Right (m-pdx-p1): G and C are one-letter codes for amino acids. The DNA change behind it is written c.34G>T.' },
        { t: 'The DNA letter at position 12 changes from G to C', ok: false, why: 'G and C here are amino acids, not DNA letters. The paper writes the DNA change separately as c.34G>T.' },
        { t: 'The KRAS gene is present in 12 copies', ok: false, why: 'That would be an amplification. G12C names a single amino-acid swap.' },
        { t: 'A piece of chromosome 12 is deleted', ok: false, why: 'The 12 is a position in the protein, not a chromosome number, and nothing is deleted.' },
      ], source: ['m-pdx-p1'], derived: ['12', '34'] },
    { q: 'In the paper, what does "KRAS+" mean?',
      options: [
        { t: 'The tumor or cells carry an activating KRAS mutation', ok: true, why: 'Right (intro-p1): “carrying activating KRAS mutations (KRAS+)”.' },
        { t: 'The cells carry extra copies of the KRAS gene', ok: false, why: 'The "+" is not about copy number. It marks a mutation.' },
        { t: 'The cells make more KRAS RNA than normal cells do', ok: false, why: 'That would be upregulation. KRAS+ is defined by a change in the gene itself.' },
        { t: 'The KRAS gene is deleted', ok: false, why: 'If the gene were lost it could not be stuck "on". KRAS+ cells have a changed, overactive KRAS.' },
      ], source: ['intro-p1'] },
    { q: 'The paper says the GCAWKR locus is "frequently amplified in cancer genomes". What does that mean?',
      options: [
        { t: 'Tumors often carry extra copies of the DNA region that contains GCAWKR', ok: true, why: 'Right: amplification is a gain of copies of a DNA region (res-aso-p5).' },
        { t: 'GCAWKR RNA is often more abundant in tumors than in healthy tissue', ok: false, why: 'That would be a statement about expression. Amplification is about DNA copies, although it can cause higher expression.' },
        { t: 'The GCAWKR gene often carries the G12C change', ok: false, why: 'G12C is a KRAS change and is not mentioned for GCAWKR.' },
        { t: 'The GCAWKR region is often lost from tumor DNA', ok: false, why: 'Lost regions are deletions. The paper says amplified, the opposite.' },
      ], source: ['res-aso-p5'] },
  ],
});

/* ============================================================================================== C3 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'C3',
  defines: ['toxicity', 'screen', 'aso', 'aso-cocktail', 'cell-viability'],
  body: [
    { k: 'h', text: 'Chemotherapy and cisplatin' },
    { k: 'bgnd', html:
      `<p>Not every cancer drug aims at one molecule. <b>Chemotherapy</b> means drugs that kill cells, or stop them dividing, and "cytotoxic" means poisonous to cells. Cancer cells divide fast, so they are hit hard. But healthy cells that divide fast (hair roots, the gut lining, blood-forming cells) are hit too, and that harm to healthy tissue is called <b>toxicity</b> (side effects).</p>` +
      `<p><b>Cisplatin</b> is a classic chemotherapy drug built around the metal platinum. Inside a cell it sticks to DNA and ties neighboring letters together. The kinked DNA cannot be copied or read properly, so the cell stops dividing, and if it cannot repair the damage it usually self-destructs by apoptosis (lesson B1).</p>` },
    { k: 'h', text: 'When a drug stops working: chemoresistance' },
    { k: 'bgnd', html:
      `<p>A tumor is a mix of cells that are not identical. A drug may kill most of them, but a cell that happens to tolerate it survives, regrows, and passes the tolerance on. That is natural selection inside the body. Cells can also become resistant by pumping the drug out, repairing its damage faster, or avoiding apoptosis. This is <b>chemoresistance</b> (also "drug resistance"). It is a major reason treatments stop working, and a main reason to look for new targets.</p>` },
    { k: 'h', text: 'Dose–response curves and the IC numbers' },
    { k: 'bgnd', html:
      `<p>How much drug is needed? A <b>dose–response</b> experiment answers it. You give identical cells a series of doses, measure the response (for example how many cells are still alive or growing), and plot dose against response. The curve is usually S-shaped: almost no effect at tiny doses, a steep fall in the middle, a flat floor at high doses.</p>` +
      `<p>The <b>inhibitory concentration (IC)</b> is the dose that lowers the response by a given percentage compared with untreated cells. <b>IC50</b> halves it, <b>IC30</b> lowers it by 30%, <b>IC20</b> by 20% and <b>IC80</b> by 80%. Think of them as dial settings: IC20 is gentle, IC80 is harsh. An IC value belongs to one cell type and one measurement; a dose that is IC30 for one kind of cell may do much less to another.</p>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up numbers).</b> You test doses 0, 1, 2, 4, 8 and 16 (arbitrary units) and find the share of cells still growing: 100%, 95%, 80%, 50%, 20% and 5%. Dose 2 leaves 80%, a 20% drop, so it is the IC20. Dose 4 is the IC50 and dose 8 is the IC80. The IC30 lies between 2 and 4.</p>` },
    { k: 'svg', caption: 'A dose–response curve. IC20, IC30 and IC80 are the doses that cut growth by 20%, 30% and 80%. Resistant cells need a higher dose for the same effect: their curve shifts to the right.',
      svg: `<svg viewBox="0 0 480 292" role="img" aria-label="Dose-response curves: growth falls in an S shape as drug dose rises. Dashed lines mark the doses where growth has dropped to 80, 70 and 20 percent of untreated, labelled IC20, IC30 and IC80. A second dashed curve for resistant cells sits further to the right">` +
        `<path d="M60 24 V240 H462" class="ln"/>` +
        `<text x="64" y="14" class="s m">cells still growing (compared with no drug)</text>` +
        `<text x="54" y="34" class="end s">100%</text><text x="54" y="76" class="end s">80%</text><text x="54" y="97" class="end s">70%</text><text x="54" y="202" class="end s">20%</text><text x="54" y="244" class="end s">0%</text>` +
        `<path d="M60 72 H185 M60 93 H204.5 M60 198 H285" class="ln thin dash m"/>` +
        `<path d="M185 72 V240 M204.5 93 V240 M285 198 V240" class="ln thin dash m"/>` +
        `<path d="M62 30.2 L74 30.2 L86 30.3 L98 30.4 L110 30.6 L122 30.9 L134 31.2 L146 31.7 L158 32.3 L170 33.2 L182 34.4 L194 36.2 L206 38.5 L218 41.7 L230 45.9 L242 51.6 L254 58.9 L266 68.3 L278 79.9 L290 93.6 L302 109.3 L314 126.3 L326 143.7 L338 160.7 L350 176.4 L362 190.1 L374 201.7 L386 211.1 L398 218.4 L410 224.1 L422 228.3 L434 231.5 L446 233.8" class="ln thick dash s-orange"/>` +
        `<path d="M62 31.7 L74 32.4 L86 33.3 L98 34.6 L110 36.3 L122 38.7 L134 42.0 L146 46.3 L158 52.1 L170 59.6 L182 69.2 L194 80.9 L206 94.9 L218 110.7 L230 127.7 L242 145.2 L254 162.1 L266 177.6 L278 191.2 L290 202.6 L302 211.7 L314 218.9 L326 224.5 L338 228.6 L350 231.7 L362 234.0 L374 235.7 L386 236.9 L398 237.8 L410 238.4 L422 238.8 L434 239.2 L446 239.4" class="ln thick s-blue"/>` +
        `<circle cx="185" cy="72" r="4" class="solid-blue"/><circle cx="204.5" cy="93" r="4" class="solid-blue"/><circle cx="285" cy="198" r="4" class="solid-blue"/>` +
        `<text x="192" y="258" class="end s b">IC20</text><text x="200" y="258" class="s b">IC30</text><text x="285" y="258" class="mid s b">IC80</text>` +
        `<text x="260" y="282" class="mid s m">drug dose (low to high)</text>` +
        `<path d="M330 40 H358" class="ln thick s-blue"/><text x="366" y="45" class="s">sensitive cells</text>` +
        `<path d="M330 62 H358" class="ln thick dash s-orange"/><text x="366" y="67" class="s">resistant cells</text>` +
        `<path d="M244 135 H312" class="arrow s-orange"/>` +
        `<text x="400" y="112" class="mid s t-orange">same effect needs</text><text x="400" y="130" class="mid s t-orange">a higher dose</text></svg>` },
    { k: 'h', text: 'How the paper used cisplatin' },
    { k: 'paper', ref: 'res-multipheno-p7',
      quote: 'Patients with KRAS+ tumors are usually treated with cytotoxic platinum-based chemotherapeutics, but tumors frequently evolve resistance.' },
    { k: 'plain', source: ['res-multipheno-p7', 'intro-p1'], html:
      `<p>Cisplatin stands in for the standard drug treatment of KRAS+ lung tumors. The paper names therapy resistance as one of three challenges (intro-p1) and looks for lncRNAs that help cells resist the drug, that is, lncRNAs that promote chemoresistance. Cisplatin was used at “carefully chosen” concentrations.</p>` },
    { k: 'paper', ref: 'm-screen-cisplatin-p1',
      quote: 'a mild concentration (IC30) treatment decreases cell proliferation by about 30%. On the other hand, high concentration treatments induce proliferative arrest or cell death.' },
    { k: 'plain', source: ['m-screen-cisplatin-p1', 'fig2B'], html:
      `<p><b>Step 1, the dose–response.</b> To choose doses, the authors exposed lung cancer cells to cisplatin at a range of concentrations from 0.5 to 50 µM and, after 72 hours, measured how many cells were alive.</p>` +
      `<p><b>Step 2, two higher doses.</b> In the “survival” experiment (one of their large pooled experiments, called screens; lesson D3) they treated A549 cells with 6.5 and 25 µM, which correspond to IC30 and IC80. Their stated reason for two doses: to increase the dynamic range (a wider spread of effects to detect) and to account for the different effects of different doses. </p>` +
      `<p><b>Step 3, one low dose.</b> In the “death” experiment they used IC20 (the Methods list 2 and 1 µM for A549 cells) and collected the floating, dead cells every 24 h for five days. The Figure 2B legend calls this a “low cisplatin concentration (IC20)”.</p>` },
    { k: 'bgnd', html:
      `<p><b>Why a low dose for the death experiment?</b> The paper does not explain the choice, so this is general reasoning, not a paper claim. At a high dose nearly every cell dies, so the dead cells are a random sample of everybody. At a low dose only some die, so the dead cells are a <i>selected</i> group, the ones that coped worst. A lncRNA that protects against cisplatin should then be missing more often than expected among the dead.</p>` },
    { k: 'flag', source: ['m-screen-cisplatin-p1', 'fig2B'], html:
      `<p>Two wrinkles. (1) The Figure 2B legend lists IC30 and IC80 together as “high cisplatin doses”, while the Methods call IC30 “a mild concentration”: “mild” and “high” are relative, so trust the IC number. (2) The Methods give the death-experiment doses as “2 and 1 µM (IC20)”, so it is unclear which number is the IC20.</p>` },
    { k: 'h', text: 'Combination therapy' },
    { k: 'bgnd', html:
      `<p><b>Combination therapy</b> means giving two or more treatments together. The usual reasons: a cell that escapes one drug is less likely to escape two that attack in different ways; the mix may work better than either alone; and sometimes each drug can be used at a lower dose. Adding the single effects is a simple benchmark: 20% plus 30% predicts 50%, and a result of 70% would be <i>synergy</i> (more than the sum). The catch is that harm can add up too, so combinations work best when the drugs spare healthy cells.</p>` },
    { k: 'paper', ref: 'res-aso-p8',
      quote: 'a 50:50 cocktail of CHiLL1/GCAWKR ASOs (Tier 3 cocktail) displayed a greater effect on cell viability compared with an equal dose of either ASO alone' },
    { k: 'plain', source: ['res-aso-p8', 'discussion-p5'], html:
      `<p>The paper’s own combination is a mix of two RNA-targeting agents (ASOs, short strands that destroy one chosen RNA; lesson D6), called a cocktail. An equal-sized 50:50 mix of the CHiLL1 and GCAWKR ASOs had a greater effect on cell viability than an equal dose of either one alone. The authors also hope that low toxicity in healthy cells would allow “not only higher doses but also combination therapies to suppress therapy resistance”.</p>` },
    { k: 'flag', source: ['res-aso-p8', 'res-mechanism-p7', 'discussion-p6'], html:
      `<p>The wording varies: the Results speak of a “greater effect” and a possible “synergistic” benefit (res-aso-p8), a later paragraph of “the additive effect” (res-mechanism-p7), the Discussion of “greater than additive effects” (discussion-p6). These are different claims, so read the figure, not the adjective.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a volume knob and two locks. A dose–response curve is a volume knob: tiny turns do nothing, middle turns change a lot, past a point it is simply "loud". Combination therapy is two different locks on one door. <i>Where it breaks:</i> cells are not thieves; resistance often builds through many small changes, and the second "lock" can fail for different reasons than the first.</p>` },
  ],
  appears: [
    { ref: 'intro-p1', note: 'Platinum chemotherapy is routine for KRAS+ NSCLC; therapy resistance is one of three challenges.' },
    { ref: 'res-multipheno-p7', note: 'Tumors frequently evolve resistance; the paper looks for lncRNAs promoting chemoresistance at carefully chosen cisplatin concentrations.' },
    { ref: 'm-screen-cisplatin-p1', note: 'Dose–response from 0.5 to 50 µM; IC30 and IC80 (6.5 and 25 µM) for the survival experiment; IC20 for the death experiment.' },
    { ref: 'fig2B', note: 'Survival uses IC30 and IC80; death uses the low dose IC20.' },
    { ref: 'res-aso-p8', note: 'A 50:50 ASO cocktail beats either ASO alone at an equal dose.' },
    { ref: 'discussion-p5', note: 'Low toxicity could allow higher doses or combination therapies.' },
  ],
  checks: [
    { q: 'What does "IC30" mean?',
      options: [
        { t: 'The drug concentration that lowers growth by 30% compared with untreated cells', ok: true, why: 'Right: the number after IC is the percentage drop in the measured response. IC30 is a mild dose.' },
        { t: 'A concentration of 30 micromolar', ok: false, why: 'The 30 is a percentage, not a concentration. In the paper, 6.5 µM is the IC30 for A549 cells.' },
        { t: 'The dose at which 30% of the cells have become resistant', ok: false, why: 'IC values describe how much the drug reduces growth, not how many cells are resistant.' },
        { t: 'The dose that kills 30% of cells within the first hour', ok: false, why: 'IC30 is not tied to one hour. It is read from a dose–response curve measured over a set time (72 h in the paper).' },
      ], source: ['m-screen-cisplatin-p1'] },
    { q: 'Cells become resistant to a drug. How does their dose–response curve change?',
      options: [
        { t: 'It shifts to higher doses: the same effect needs more drug', ok: true, why: 'Right: IC values go up, so the curve slides to the right.' },
        { t: 'It shifts to lower doses: less drug gives the same effect', ok: false, why: 'That would mean the cells became more sensitive, not resistant.' },
        { t: 'It becomes a flat line at 0%', ok: false, why: 'A curve at 0% means every cell is gone at every dose. Resistant cells are the ones that keep growing.' },
        { t: 'It does not change, only the drug label does', ok: false, why: 'Resistance changes how the cells respond, which is exactly what the curve shows.' },
      ], bg: true },
    { q: 'Why did the authors use two cisplatin doses (IC30 and IC80) in the survival experiment?',
      options: [
        { t: 'To widen the range of effects they could detect and to account for the different effects of mild and high doses', ok: true, why: 'Right (m-screen-cisplatin-p1): a mild dose lowers growth by about 30%, while high doses cause growth arrest or cell death.' },
        { t: 'Because IC30 was for A549 cells and IC80 for H460 cells', ok: false, why: 'Both doses (6.5 and 25 µM) are given for A549 cells.' },
        { t: 'Because the lower dose killed every cell', ok: false, why: 'The lower dose is the mild one: it lowers growth by only about 30%.' },
        { t: 'To test whether cisplatin works better when combined with another drug', ok: false, why: 'Both doses are cisplatin alone. Combinations are tested with ASO mixes.' },
      ], source: ['m-screen-cisplatin-p1'] },
    { q: 'What did the authors find when they mixed the CHiLL1 and GCAWKR ASOs?',
      options: [
        { t: 'A greater effect than an equal dose of either ASO alone', ok: true, why: 'Right (res-aso-p8): a 50:50 cocktail beat an equal dose of either one alone.' },
        { t: 'The same effect as one ASO alone', ok: false, why: 'The point of the experiment is that the cocktail did better than either ASO alone.' },
        { t: 'A weaker effect, because the ASOs got in each other’s way', ok: false, why: 'The paper reports a greater effect, not interference between the ASOs.' },
        { t: 'Extra harm to non-cancer cells', ok: false, why: 'The authors report no additional toxicity for non-cancer cells (res-aso-p8).' },
      ], source: ['res-aso-p8'] },
  ],
});
