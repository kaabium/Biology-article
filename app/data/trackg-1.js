window.TRACKG = window.TRACKG || { paras: {}, units: {} };

/* TRACK G, file 1: summary (1), intro (6), res-pipeline (5), res-multipheno (8) = 20 paragraphs + 4 units */

/* ------------------------------------------------------------------------------------------ SUMMARY + INTRODUCTION */
Object.assign(window.TRACKG.paras, {
  'summary-p1': {
    plain: `<p>Long noncoding RNAs (lncRNAs) are RNAs that do not carry the recipe for a protein. They are often “dysregulated” in cancer, which means their normal control is disturbed. Yet what they do for the abilities (hallmarks) that make a cancer dangerous is still unclear.</p>
<p>To find out, the authors used pooled CRISPR deletion to disturb 831 lncRNAs detected in KRAS-mutant non-small cell lung cancer (NSCLC). They measured how much each one contributes to three hallmarks: proliferation (growth), chemoresistance (surviving chemotherapy) and migration (moving), in two cell backgrounds (two lung cancer cell lines).</p>
<p>They say that combining (“integrating”) the data from all the screens finds cancer genes better than conventional “dropout” screens. It also singles out lncRNAs that are <b>pleiotropic</b> (they matter for more than one hallmark) and <b>background independent</b> (they matter in both cell lines). Altogether, 80 high-confidence oncogenic (cancer-promoting) lncRNAs are active in NSCLC. They tend to be amplified (extra copies of their DNA) and overexpressed (more RNA than normal) in tumors.</p>
<p>A follow-up screen with antisense oligonucleotides (ASOs: short strands that make a chosen RNA get destroyed) shortlisted two candidates, Cancer Hallmarks in Lung LncRNA 1 (CHiLL1) and GCAWKR. Knocking either one down consistently weakened cancer hallmarks in two-dimensional models (cells in flat dishes) and three-dimensional models (such as spheroids and organoids). “Molecular phenotyping” (measuring what changes inside the cells) shows that CHiLL1 and GCAWKR control cell-level traits through distinct transcriptional networks (different sets of genes).</p>
<p>The authors conclude that the work reveals a multi-dimensional map of functional lncRNAs in NSCLC, and that this map contains potential therapeutic vulnerabilities (weak spots that treatments could target).</p>`,
    why: `The Summary is the whole paper in miniature: the question, the approach and the headline results (80 hits, then two final candidates). Each later section is the evidence for one of its sentences.`,
    memory: `Picture a funnel: 831 lncRNAs go in at the top, 80 come out of the screens as hits, and two survive the ASO tests (the paper narrows in two more steps in between; lesson A2 shows the whole funnel).`,
    flags: [
      `The Summary states results but shows no evidence. Where to find it: the 80 hits and “amplified and overexpressed” in <a href="#/g/res-integration/res-integration-p2">res-integration-p2</a> and <a href="#/g/res-integration/res-integration-p4">p4</a>; integration beating single dropout screens in <a href="#/g/res-integration/res-integration-p1">res-integration-p1</a>; the two ASO candidates in <a href="#/g/res-aso/res-aso-p3">res-aso-p3</a>; “distinct transcriptional networks” in <a href="#/g/res-mechanism/res-mechanism-p8">res-mechanism-p8</a>.`,
      `“High-confidence” means something specific in the Results: the 80 are hits at a false-discovery-rate cutoff of FDR &lt;0.2 (res-integration-p2), a fairly lenient cutoff that accepts some false hits. Treat them as a ranked candidate list, not 80 proven cancer genes.`,
      `The third hallmark is called “migration” here but “invasion” in the Introduction and the start of the Results. Both words refer to the same screen: cells moving through a porous membrane (Figure 2C).`,
    ],
    prereqs: ['A1', 'A2'],
    checks: [
      { q: 'In the Summary, what is measured for each of the 831 lncRNAs?',
        options: [
          { t: 'Its contribution to proliferation, chemoresistance and migration, in two cell backgrounds', ok: true, why: 'Right: the pooled CRISPR deletion screens test every lncRNA on three hallmarks across two cell backgrounds.' },
          { t: 'Whether it codes for a protein in lung cells', ok: false, why: 'lncRNAs are noncoding by definition. The screens ask what they do for cancer hallmarks, not whether they make protein.' },
          { t: 'How much of it is found in healthy lung versus tumor tissue', ok: false, why: 'Tumor-versus-normal levels are a separate, later line of evidence (“overexpressed in tumors”). The deletion screens measure effects on cell behavior.' },
          { t: 'How tightly it binds the KRAS protein', ok: false, why: 'Nothing in the Summary says lncRNAs are tested for binding KRAS. KRAS is only the mutation that defines the tumor type.' },
        ], source: ['summary-p1'] },
    ],
    sources: ['res-integration-p2'],
  },

  'intro-p1': {
    plain: `<p>Non-small cell lung cancer (NSCLC) is the leading cause of cancer deaths worldwide. The available treatments face a mix of problems: some mutations are “undruggable” (we have no drug that can block them), treatments are toxic, and tumors become resistant to therapy.</p>
<p>The most common NSCLC subtype carries activating KRAS mutations (written KRAS+: mutations that make the KRAS gene overactive). These tumors are routinely treated with platinum chemotherapy, a type of drug that kills cells (“cytotoxic”). Newly approved targeted therapies (drugs aimed at one specific faulty target) only extend life by a few months.</p>`,
    why: `It states the need: even the most common NSCLC type (KRAS+) has limited treatment options. That motivates the search for new drug targets, which the next paragraphs develop.`,
    flags: [`These statements come from cited literature, not from this study's data, and the paragraph gives no numbers for “most common” or for the survival gain.`],
    prereqs: ['C2', 'C3'],
    checks: [
      { q: 'According to this paragraph, how is the most common NSCLC subtype (KRAS+) treated today?',
        options: [
          { t: 'Routinely with cytotoxic platinum chemotherapy; newly approved targeted therapies add only a few months of life', ok: true, why: 'Right: chemotherapy is routine, and the new targeted drugs help only a little.' },
          { t: 'Targeted therapies now cure most of these patients', ok: false, why: 'The paragraph says the new targeted therapies only extend life by a few months.' },
          { t: 'Only with targeted therapies, because chemotherapy does not work on KRAS+ tumors', ok: false, why: 'Platinum chemotherapy is described as the routine treatment.' },
          { t: 'There is no treatment for KRAS+ tumors', ok: false, why: 'Treatments exist; the problem is that they help too little.' },
        ], source: ['intro-p1'] },
    ],
  },

  'intro-p2': {
    plain: `<p>A promising place to look for new drug targets is the long noncoding RNAs (lncRNAs). There are probably more than 100,000 of them, and more than 98% remain “uncharacterized”: nobody has worked out yet what they do.</p>
<p>Hundreds of lncRNAs have been linked to the progression of cancer hallmarks (the abilities cancers acquire, as defined by Hanahan and Weinberg), across many cancer types and through a variety of mechanisms.</p>
<p>Two examples have drawn attention as drug targets: SAMMSON (in melanoma, a skin cancer) and lncGRS-1 (in glioma, a brain cancer). The reason is that tumor cells are strongly and specifically sensitive when these lncRNAs are blocked with antisense oligonucleotide (ASO) therapies: short strands that pair with a chosen RNA so that it is destroyed.</p>`,
    why: `It argues that lncRNAs are worth screening: there are many, almost all are unexplored, and a few already look like drug targets that ASOs can hit. The next paragraph narrows this to lung cancer.`,
    memory: `Think of a library in which more than 98 out of every 100 books have never been opened. Some may hold exactly what you need, but you cannot tell from the covers, which is why a screen is needed.`,
    flags: [`Both big numbers are estimates from the literature (“likely to exceed 100,000”). They describe lncRNAs in general, not results of this study. “Implicated” means linked to disease progression, not necessarily proven to cause it.`],
    prereqs: ['B6', 'C1', 'D6'],
    checks: [
      { q: 'What do “more than 100,000” and “>98%” describe in this paragraph?',
        options: [
          { t: 'The likely total number of lncRNAs, and the share whose function is still unknown', ok: true, why: 'Right: both are rough estimates for lncRNAs in general.' },
          { t: 'The number of lncRNAs this study screened and the share that were hits', ok: false, why: 'Those numbers come later; here both figures are rough estimates for all lncRNAs.' },
          { t: 'The number of lncRNAs linked to lung cancer and the share that are oncogenes', ok: false, why: 'The paragraph says hundreds are linked to cancer, not 100,000, and gives no share of oncogenes.' },
          { t: 'The number of ASOs available and the share approved as drugs', ok: false, why: 'ASOs are mentioned only as a tool; no counts are given.' },
        ], source: ['intro-p2'] },
    ],
  },

  'intro-p3': {
    plain: `<p>There is a lot of evidence that lncRNAs play central roles in lung cancer. For example, PVT1 and MALAT1 are repeatedly found overexpressed (more RNA than normal) or amplified (extra copies of their DNA) in lung tumors. Experimentally changing them (“manipulating” them) alters cell growth and invasiveness, both in cells in dishes (in vitro) and in living animals (in vivo). That makes them promising drug targets.</p>
<p>Other examples: LINC00680 acts by binding to GATA6 (a protein). LINC00511 promotes NSCLC by binding EZH2, an enzyme that modifies chromatin (the packaging of DNA), and by repressing tumor-suppressor genes, including p57 and LATS2.</p>
<p>Even so, how far lncRNAs drive the interlocking (connected) cancer hallmarks in NSCLC, and how they do it, is still unclear.</p>`,
    why: `It narrows the case from cancer in general to lung cancer, with four well-known examples. Its last sentence names the gap the study sets out to fill: how much, and in what way, lncRNAs drive the connected hallmarks of NSCLC.`,
    prereqs: ['B6', 'C1', 'C2'],
    checks: [
      { q: 'What gap does the last sentence of this paragraph point to?',
        options: [
          { t: 'It is still unclear how many lncRNAs drive the connected hallmarks of NSCLC, and how', ok: true, why: 'Right: this is the gap the study sets out to fill.' },
          { t: 'It is unclear whether lncRNAs are present in lung tumors at all', ok: false, why: 'The paragraph says PVT1 and MALAT1 are recurrently overexpressed or amplified in lung tumors.' },
          { t: 'It is unclear whether lung cancer has any hallmarks', ok: false, why: 'Hallmarks are taken as given; what is unclear is which lncRNAs promote them.' },
          { t: 'It is unclear which chemotherapy drug works best', ok: false, why: 'Treatment choice is not the topic here; the gap is about lncRNAs and hallmarks.' },
        ], source: ['intro-p3'] },
    ],
  },

  'intro-p4': {
    plain: `<p>The search for lncRNA drug targets has sped up since CRISPR-Cas genome editing arrived. CRISPR can silence a gene in two ways: by deleting a chosen piece of DNA (“targeted genomic deletion”) or by blocking the gene from being copied into RNA (“transcriptional inhibition”). It is also easy to scale up to the whole transcriptome (all the RNAs a cell makes) with pooled screening, which tests many targets together in one batch of cells.</p>
<p>CRISPR screens have already revealed many lncRNAs (the paper says “scores of” them) that promote disease hallmarks: cell proliferation, pathway activation and therapy resistance.</p>`,
    why: `It shows that the tools to test lncRNAs at large scale already exist and that earlier screens found hallmark-promoting lncRNAs. The next paragraph asks what those earlier screens could not tell us.`,
    flags: [`This paper's own screens use the first way, deletion (“CRISPR-del”), not transcriptional inhibition (CRISPRi). No individual earlier screen is named here; they are cited only by number.`],
    prereqs: ['D1', 'D3'],
    checks: [
      { q: 'Which two ways of silencing a gene with CRISPR does the paragraph name?',
        options: [
          { t: 'Targeted genomic deletion and transcriptional inhibition', ok: true, why: 'Right: delete the DNA, or block the gene from being copied into RNA.' },
          { t: 'Deleting a whole chromosome and destroying the finished RNA', ok: false, why: 'Neither is named. (Destroying finished RNA is what ASOs do, and ASOs are not CRISPR.)' },
          { t: 'Adding extra copies of the gene and blocking translation', ok: false, why: 'Adding copies would raise expression, not silence it, and translation is not mentioned.' },
          { t: 'Editing the RNA and editing the protein', ok: false, why: 'CRISPR as described here acts on DNA (deleting it) or on the copying of DNA into RNA.' },
        ], source: ['intro-p4'] },
    ],
  },

  'intro-p5': {
    plain: `<p>A big problem in drug discovery is that targets found in preclinical tests in cells in dishes (in vitro) often fail to hold up later: the “validation rate” is poor.</p>
<p>Narrowly focused screens, like the earlier ones described above, use one cell background (one cell line) and one hallmark. They can easily find lncRNAs whose effects are specific to that cell line and do not generalize to the disease.</p>
<p>In support, recent CRISPR-inhibition (CRISPRi) screens showed highly specific effects for lncRNAs in cell lines from six different cancer types. But no one has yet asked whether this also happens between cell lines from the same cancer type.</p>
<p>So, to get the most out of the hits it discovers, an ideal screen should prioritize lncRNA targets that are both <b>pleiotropic</b> (they affect several disease hallmarks) and <b>background independent</b> (they work whatever the cell model).</p>`,
    why: `This is the design principle of the whole study. Because single-line, single-hallmark screens can mislead, the paper looks for lncRNAs that matter for several hallmarks and in more than one cell line.`,
    memory: `A recipe that works only in your own oven is not a reliable recipe: a hit that works in just one cell line is like that. A pleiotropic lncRNA is like a multi-tool: one object, several jobs.`,
    flags: [`“Has not been addressed” is the authors' claim about the literature, and “background independent” is a goal here, not yet a result. Their own answer comes later, when they compare the A549 and H460 screens (<a href="#/g/res-multipheno/res-multipheno-p6">res-multipheno-p6</a>, <a href="#/g/res-integration/res-integration-p3">res-integration-p3</a>).`],
    prereqs: ['C1', 'C4', 'D1'],
    checks: [
      { q: 'What does “background independent” mean in this paragraph?',
        options: [
          { t: 'The lncRNA is effective regardless of which cell model is used', ok: true, why: 'Right: the “background” is the cell model (cell line).' },
          { t: 'The lncRNA affects several disease hallmarks', ok: false, why: 'That is “pleiotropic”. Background independence is about the cell model, not the number of hallmarks.' },
          { t: 'The lncRNA works without any guide RNA', ok: false, why: '“Background” refers to the cell background (the cell line), not to the CRISPR tools.' },
          { t: 'The lncRNA is active in healthy as well as cancer cells', ok: false, why: 'The paragraph contrasts different cell lines of one cancer type; healthy cells are not the point of this sentence.' },
        ], source: ['intro-p5'] },
    ],
  },

  'intro-p6': {
    plain: `<p>In this paper the authors map the functional lncRNA landscape of KRAS+ NSCLC: which lncRNAs matter, and for what.</p>
<p>They run 8 disease-specific CRISPR screens for lncRNAs that promote three cancer hallmarks (proliferation, chemoresistance and invasion), in two KRAS+ NSCLC models, the cell lines A549 and H460.</p>
<p>They rebuild the functional lncRNA landscape of NSCLC, which gives a catalog of therapeutic vulnerabilities (weak spots that treatments could target). They say these lncRNAs connect to the hallmarks through complex transcriptional networks (changes in which genes are copied into RNA). They also say the lncRNAs can be targeted by potent, low-toxicity and on-target ASOs, which makes them promising future therapeutics.</p>`,
    why: `It turns the gap from the previous paragraph into the study's plan: 8 screens, three hallmarks, two cell lines, then ASOs. Read it as the table of contents of the Results.`,
    flags: [
      `Look ahead: the 8 screens appear as the eight rows of Figure 2I, which names the cell line and assay of each. “Two models” does not mean every screen was run in both: there, the cisplatin and migration screens are all labeled A549, and H460 appears only for the dropout and CFSE (growth) screens.`,
      `The hallmark is called “invasion” here (and in res-multipheno-p2) but “migration” in the Summary and in the screen itself (Figure 2C shows a migration assay).`,
      `“Potent, low-toxicity, and on-target” is claimed here before any evidence. The tests come in the ASO section; note that <a href="#/g/res-aso/res-aso-p3">res-aso-p3</a> also reports that overexpressing CHiLL1 or GCAWKR did not rescue the ASO-induced phenotypes.`,
    ],
    prereqs: ['A1', 'C1', 'C4'],
    checks: [
      { q: 'Which description of the study design matches this paragraph?',
        options: [
          { t: '8 CRISPR screens for three hallmarks in two KRAS+ NSCLC cell lines (A549 and H460)', ok: true, why: 'Right: 8 screens, three hallmarks, two cell lines.' },
          { t: 'Three CRISPR screens for 8 hallmarks in one cell line', ok: false, why: 'The numbers are reversed: the paper has three hallmarks and two cell lines, and 8 screens.' },
          { t: '8 ASO screens in patients with KRAS+ NSCLC', ok: false, why: 'The 8 screens are CRISPR screens in two cell lines. ASOs are the follow-up, and the paragraph mentions no patients.' },
          { t: '8 screens in two normal lung cell lines', ok: false, why: 'A549 and H460 are KRAS+ NSCLC models, that is, cancer cell lines.' },
        ], source: ['intro-p6'] },
    ],
  },
});

/* ------------------------------------------------------------------------------------------ RES-PIPELINE */
Object.assign(window.TRACKG.paras, {
  'res-pipeline-p1': {
    plain: `<p>To find lncRNAs that help KRAS+ lung cancer cells, the authors adapted a CRISPR method called DECKO (“dual-excision CRISPR knockout”). It deletes a piece of DNA, which is why it belongs to the “CRISPR-del” (CRISPR deletion) family. They turned it into a high-throughput <b>pooled</b> format: many targets are tested together in one batch of cells. Figure 1A strings the workflow together, from library design on the left to the three hallmark tests on the right.</p>
<p>The method switches a gene off (a “loss-of-function”, LOF, change) by <b>deleting its transcription start site (TSS)</b>, the spot where copying into RNA begins. The deletion is made with paired guide RNAs (pgRNAs): two guides that make two cuts, so the DNA between the cuts is removed. The paper says this effectively inhibits expression of the gene.</p>
<p>Why delete only the TSS and not the whole gene? The paper gives two benefits. First, the deletions are all alike and short, and shorter deletions are more efficient. Second, there is a smaller chance of false positives from accidentally deleting overlapping DNA regulatory elements (stretches of DNA that help control genes).</p>`,
    why: `It states the central design choice of the paper: switch each gene off by deleting its start site with paired guides, in a pooled format. Every screen, and the library described next, is built on it.`,
    memory: `Like unplugging a lamp instead of smashing it together with the shelf it stands on: the lamp is off and the neighbors are untouched. Where the analogy breaks down: unplugging can be undone, but a deleted TSS is a permanent change to that cell's DNA.`,
    flags: [
      `“Knockout” in DECKO is used loosely: the method removes the TSS region, not the whole gene.`,
      `“Effectively inhibits gene expression” is a claim made here. The test comes in <a href="#/g/res-pipeline/res-pipeline-p5">res-pipeline-p5</a>, and the result is mixed: in a random test of 12 extra pgRNAs the target RNA fell in only 7. The two benefits of deleting only the TSS are stated without data in this paragraph.`,
    ],
    prereqs: ['B4', 'D1', 'D3'],
    checks: [
      { q: 'According to the paper, why delete only the TSS rather than the entire gene?',
        options: [
          { t: 'The deletions are uniform and shorter (so more efficient), with less chance of false positives from deleting overlapping DNA regulatory elements', ok: true, why: 'Right: these are the two benefits the paragraph lists.' },
          { t: 'A whole-gene deletion would not stop the gene from being expressed', ok: false, why: 'Deleting the whole gene would stop it too. The argument is about efficiency and fewer false positives, not about whether it works.' },
          { t: 'The TSS is the only place on a gene where a guide RNA can bind', ok: false, why: 'The paragraph gives no such limit. The reasons it lists are efficiency and fewer false positives.' },
          { t: 'A TSS deletion is temporary, so cells can recover', ok: false, why: 'Nothing like that is said. A CRISPR deletion is a permanent change to that cell’s DNA.' },
        ], source: ['res-pipeline-p1'] },
      { q: 'What does using a pair of guide RNAs (pgRNAs) allow?',
        options: [
          { t: 'Two cuts, so the DNA between them (the TSS region) is deleted', ok: true, why: 'Right: “paired guide RNAs” delete the TSS region.' },
          { t: 'Blocking the gene from being copied without cutting the DNA', ok: false, why: 'That describes CRISPRi, a different tool. In CRISPR-del the DNA is cut and a piece removed.' },
          { t: 'Marking the gene with a glowing tag so it can be found', ok: false, why: 'pgRNAs steer the cutting; they are not dyes or markers.' },
          { t: 'Destroying the finished RNA after it is made', ok: false, why: 'That is what an ASO does, a different tool. CRISPR-del acts on the DNA.' },
        ], source: ['res-pipeline-p1'] },
    ],
    sources: ['res-pipeline-p5'],
  },

  'res-pipeline-p2': {
    plain: `<p>The authors built a screening library (the collection of guides they would use) to examine the lncRNAs made in NSCLC as completely as possible. To avoid false-positive results from unintended off targeting (a guide acting at the wrong place), they left out any target region closer than 2 kb to the nearest protein-coding exon.</p>
<p>They combined and filtered published and in-house gene annotations (gene catalogs). The result is a final target set of 831 expressed lncRNAs, which correspond to 998 high-confidence TSSs (some lncRNAs have more than one start site). Each target is named “candidate 1” and so on.</p>
<p><b>Look at Figure 1B</b> (the filtering flow chart): the catalogs are merged; start sites within 2 kb of a protein-coding exon, or expressed below 0.1 FPKM in A549, are dropped; start sites closer than 300 bp are clustered; and the ones backed by evidence (CAGE, ChromHMM, DNase I hypersensitivity) are selected. <b>Figure 1C</b> shows what the library contains. (Figures S1A and S1B are supplementary.)</p>
<p>lncRNA candidates with bidirectional promoters, or with overlapping TSSs, were merged into a single TSS (counted as one target). Even so, 95.2% of target regions contain one single lncRNA promoter, 4.5% contain two and 0.3% contain three (Figure S1D, supplementary).</p>`,
    why: `It defines which lncRNAs the screen can test. Regions near protein-coding exons were left out (the stated aim is to avoid false positives from off targeting; presumably an edit there could disturb the neighboring protein-coding gene instead of the lncRNA).`,
    memory: `Merging four address books into one: drop the risky entries (too close to a protein-coding exon) and the empty ones (barely expressed), and merge the duplicates (bidirectional promoters and overlapping TSSs).`,
    flags: [
      `Supplementary: not in your PDF — Figures S1A, S1B and S1D. The 95.2% / 4.5% / 0.3% split is shown only in Figure S1D, so here it is the authors’ statement.`,
      `Numbers: 831 lncRNAs correspond to 998 TSSs, but the lncRNA bar in Figure 1C prints 1003 (Figure 2F’s n label also says 1003), while Figure 1B says “998 Candidates”. The paper does not explain the small difference.`,
      `The sentence does not say whether the “candidate” numbers label the 831 lncRNAs or the 998 TSSs. Later paragraphs use them for TSS targets (res-validation-p2 describes “Candidate 205” as overlapping the TSS of two genes).`,
    ],
    prereqs: ['B4', 'B7', 'D1', 'D3'],
    checks: [
      { q: 'How are the numbers 831 and 998 related in this paragraph?',
        options: [
          { t: '831 expressed lncRNAs correspond to 998 high-confidence TSSs, so some lncRNAs have more than one start site', ok: true, why: 'Right: the 998 are start sites of the 831 lncRNAs.' },
          { t: '831 TSSs correspond to 998 lncRNAs', ok: false, why: 'Reversed. One lncRNA can have several TSSs, so there are more TSSs (998) than lncRNAs (831).' },
          { t: '998 lncRNAs were screened and 831 of them were hits', ok: false, why: 'Both numbers describe the target set, not hits. Hits are picked out of this set later.' },
          { t: '831 lncRNAs plus 998 control regions', ok: false, why: 'The 998 are start sites of the same 831 lncRNAs. The controls are added in the next paragraph.' },
        ], source: ['res-pipeline-p2'] },
    ],
    sources: ['fig1B', 'fig1C', 'fig2F', 'res-validation-p2'],
    derived: ['1003'],
  },

  'res-pipeline-p3': {
    plain: `<p>To the lncRNA targets, the authors added two kinds of control pgRNAs (the “Control” bar in Figure 1C splits them into groups):</p>
<ul><li><b>Neutral control loci</b>: places in the genome that are not expected to influence how the cells look or behave (their phenotype).</li>
<li><b>Positive control protein-coding genes (PCGs)</b>: genes with known roles in cell growth and in cisplatin resistance.</li></ul>`,
    why: `Controls make the screen interpretable: neutral ones show what “no effect” looks like, and positive ones show whether real effects are detected. Figure 2F (res-multipheno-p3) uses them for exactly that.`,
    memory: `A smoke detector is tested twice: with a lit candle (it must go off: the positive control) and in a room with no smoke (it must stay quiet: the neutral control). In the screen, the “alarm” is a change in how common a guide is.`,
    flags: [`No counts are given here, and the paper’s totals for the controls differ between places: the Control bar in Figure 1C, the Methods (m-library-design-p3), “109 positive controls” in res-multipheno-p6, and the n labels in Figure 2F. The paper does not reconcile them, so learn each control’s role rather than the totals.`],
    prereqs: ['D3', 'D5'],
    checks: [
      { q: 'What do the two kinds of control tell you?',
        options: [
          { t: 'Neutral controls show what “no effect” looks like; positive controls show whether the screen can detect a real effect', ok: true, why: 'Right: you need both to judge the lncRNA results.' },
          { t: 'Neutral controls kill the cells; positive controls leave them alone', ok: false, why: 'Reversed. Neutral loci are not expected to change cell behavior; positive controls are genes with known effects.' },
          { t: 'Both are lncRNAs that the paper goes on to study in detail', ok: false, why: 'Neutral loci are harmless places in the genome, and positive controls are protein-coding genes.' },
          { t: 'They make sure each cell receives exactly one guide', ok: false, why: 'Guide delivery per cell depends on the infection conditions, not on controls.' },
        ], source: ['res-pipeline-p3'] },
    ],
    sources: ['res-multipheno-p6'],
  },

  'res-pipeline-p4': {
    plain: `<p>These targets (the lncRNAs plus the controls) form the basis of “libDECKO-NSCLC1”: a CRISPR-del library with a depth of 10 unique pgRNAs per target (ten different guide pairs aimed at each target), 12,000 pgRNAs altogether (Figure 1C; Table S1 is supplementary).</p>
<p>After the library was cloned into the DECKO backbone (the plasmid that carries the guide pairs; Figure S1C is supplementary), sequencing showed high quality in two respects:</p>
<ul><li><b>Sequence identity</b>: 60.8% perfect match across both spacers (the two guide sequences of each pair).</li>
<li><b>Coverage</b>, meaning how evenly the guide pairs are represented: the 90th to 10th percentile count ratio was 4.6-fold. Ranked from rare to common, the guide pair at the 90th percentile had 4.6 times the count of the one at the 10th percentile; a ratio of one would be perfectly even (Figure S1F is supplementary).</li></ul>`,
    why: `It turns the target list into a physical tool and reports, in the authors’ words, that the tool itself is of high quality (the intended sequences are present and fairly evenly represented). That checks the library, not yet whether the guides work in cells; the next paragraph does that.`,
    memory: `A box of 12,000 different keys: before you try them on doors, check that every key is cut as intended (identity) and that no key is nearly absent while another is in huge supply (coverage).`,
    flags: [
      `Number check: the text says 12,000 pgRNAs with 10 per target. Figure 1A says “1,200 targets (Depth: 10 pgRNAs)”, which fits, but Figure 1B says “1200 pgRNAs library including controls”, which looks like a typo for 12,000 (the Methods say 12,000: m-library-design-p5). The paper does not comment.`,
      `The authors call 60.8% “high quality” but the paragraph does not say what the threshold is, what the rest look like, or what the percentage is a percentage of (reads or distinct pgRNAs).`,
      `Supplementary: not in your PDF — Table S1 and Figures S1C and S1F, so the two quality numbers cannot be checked in the main figures.`,
    ],
    prereqs: ['D1', 'D3', 'D4'],
    checks: [
      { q: 'What does “a depth of 10 unique pgRNAs per target” mean, and how big is the whole library?',
        options: [
          { t: 'Each target is aimed at by ten different guide pairs; 12,000 pgRNAs altogether', ok: true, why: 'Right: ten pairs per target, 12,000 in the whole library.' },
          { t: 'Each guide pair is delivered to ten cells; 12,000 cells altogether', ok: false, why: 'Depth is about library design (guide pairs per target). Cells per guide is “coverage”.' },
          { t: 'Each guide pair cuts its target ten times', ok: false, why: 'Depth counts different guide pairs; it says nothing about how often a pair cuts.' },
          { t: 'Each guide pair is aimed at ten different targets', ok: false, why: 'Reversed: ten guide pairs per target, not ten targets per guide pair.' },
        ], source: ['res-pipeline-p4'] },
    ],
    sources: ['fig1A', 'fig1B', 'm-library-design-p5'],
    derived: ['1200'],
  },

  'res-pipeline-p5': {
    plain: `<p>To find hits of general relevance to NSCLC, the authors ran parallel experiments in two widely used KRAS+ NSCLC models: the cell lines A549 and H460. They made non-clonal cell lines (mixed populations, not grown from one single cell) that stably express high levels of the Cas9 protein. The evidence is blue fluorescent protein (BFP), a glowing marker. <b>Figure 1D</b> shows cells being sorted by their blue glow; the box marks the Cas9/BFP-positive cells kept for the screens (Figure S1E is supplementary).</p>
<p>Because the ability of pgRNAs to make the intended deletion efficiently has been called into question, the authors first did extensive validation of the library pgRNAs.</p>
<p><b>Test 1, one known gene.</b> They targeted DNMBP-AS1 (candidate 331), a known NSCLC-promoting lncRNA. Its promoter region was deleted and its expression was lost, which the authors say supports the CRISPR-del strategy (Figures 1E and 1F; Figure S1G is supplementary). <b>In Figure 1E</b>, the top draws the DNMBP-AS1 locus and the ten library pgRNAs; in the gel below, the control lane has one long “wild-type” band, while the pgRNA lane also has a shorter “deletion” band. <b>In Figure 1F</b>, each bar is the DNMBP-AS1 RNA level with one pgRNA, compared with the control bar. Most bars are lower, but two are marked “ns” (not significant).</p>
<p><b>Test 2, twelve more guides.</b> To assess the strategy more generally, they randomly cloned another 12 pgRNAs targeting 12 candidates. The expected deletion at the target site was seen in 10 of 12 cases. For the effect on target RNA levels, the expected decrease was seen in 7 of 12; three targets showed no change and two showed an increase (Figure S3A is supplementary). The authors say this is in line with previous observations from Shkumatava’s group.</p>`,
    why: `It sets up the two cell models and checks that the deletion tool works before the screens are trusted. The answer is “usually, not always”, which fits the design of 10 guide pairs per target and the lower sensitivity admitted in res-multipheno-p3.`,
    flags: [
      `Typo: the paragraph prints “A549 and H460, Non-clonal cell lines were generated…”, with a comma and a capital N where a full stop would be expected.`,
      `Supplementary: not in your PDF — Figures S1E, S1G and S3A. The counts for the 12 extra pgRNAs (10/12, 7/12, three, two) come from Figure S3A, so here they are the authors’ numbers.`,
      `“Resulted in the deletion of its promoter region and loss of expression” is a summary: the gel shows one guide pair and a weaker wild-type band remains, two of the nine bars in Figure 1F are “ns”, and one of the ten guide pairs drawn in Figure 1E is not plotted (the paper does not say why). Also, the expected deletion was seen in 10 of 12 cases but the expected RNA decrease in only 7 of 12; the paragraph does not explain the difference.`,
    ],
    prereqs: ['C4', 'D3', 'D7'],
    checks: [
      { q: 'Why did the authors validate the library pgRNAs before relying on the screens?',
        options: [
          { t: 'Because it had been questioned whether pgRNAs reliably make the intended genomic event', ok: true, why: 'Right: the paragraph says the ability of pgRNAs to do so “has been called into question”.' },
          { t: 'Because the screen results looked wrong', ok: false, why: 'The paragraph says the validation came first (“we first performed extensive validation”).' },
          { t: 'Because Cas9 could not be detected in the cells', ok: false, why: 'The paragraph reports high Cas9 levels, evidenced by BFP.' },
          { t: 'To decide which of the two cell lines to use', ok: false, why: 'A549 and H460 were used in parallel; validation tests the pgRNAs, not the cell lines.' },
        ], source: ['res-pipeline-p5'] },
      { q: 'In the test of 12 randomly cloned pgRNAs, what happened to the target RNA?',
        options: [
          { t: 'It fell for 7, did not change for three and rose for two', ok: true, why: 'Right: 7 + 3 + 2 = 12.' },
          { t: 'It fell for 10 of 12', ok: false, why: '10 of 12 is the number of cases with the expected DNA deletion, not the RNA result.' },
          { t: 'It fell for all 12', ok: false, why: 'Three targets showed no change and two showed an increase.' },
          { t: 'It rose for 7 and fell for two', ok: false, why: 'Reversed: the expected decrease was seen for 7.' },
        ], source: ['res-pipeline-p5'], derived: ['3'] },
    ],
  },
});
Object.assign(window.TRACKG.units, {
  'res-pipeline': {
    intro: `<p>This first Results section explains how the experiment is built: the cutting method (delete each lncRNA’s start site with paired guides), the list of 831 targets and the controls added to it, the library of 12,000 guide pairs, the two cell lines, and the first checks of whether the deletion tool really works.</p><p>The question it answers: <i>can hundreds of lncRNAs be switched off in one experiment, and can we trust the tool?</i></p>`,
    recap: `<p>The authors adapted DECKO to delete transcription start sites in a pooled format and built a library of 12,000 pgRNAs (10 per target) for 831 lncRNAs (998 TSSs) plus neutral and positive controls. They made Cas9-expressing A549 and H460 cells and tested the tool: it worked for DNMBP-AS1, and in a random test of 12 extra pgRNAs the expected deletion was seen in 10 and the expected RNA decrease in 7. So the method usually works, but some guides fail.</p>`,
  },
});
