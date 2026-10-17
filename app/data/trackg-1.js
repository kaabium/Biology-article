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
