window.TRACKG = window.TRACKG || { paras: {}, units: {} };

/* ======================================================================================================
   TRACK G, file 1: summary (1), intro (6), res-pipeline (5), res-multipheno (8)  = 20 paragraphs + 4 units
   ====================================================================================================== */

/* ------------------------------------------------------------------------------------------ SUMMARY */
Object.assign(window.TRACKG.paras, {
  'summary-p1': {
    plain: `<p>Long noncoding RNAs (lncRNAs) are RNAs that do not carry the recipe for a protein. They are often “dysregulated” in cancer, which means their normal control is disturbed. Yet what they actually do for the abilities (hallmarks) that make a cancer dangerous is still unclear.</p>
<p>To find out, the authors used pooled CRISPR deletion to disturb 831 lncRNAs detected in KRAS-mutant non-small cell lung cancer (NSCLC). They then measured how much each one contributes to three hallmarks: proliferation (growth), chemoresistance (surviving chemotherapy) and migration (moving). They did this in two cell backgrounds (two different lung cancer cell lines).</p>
<p>The authors say that combining (“integrating”) the data from all these screens finds cancer genes better than conventional “dropout” screens do. It also singles out lncRNAs that are <b>pleiotropic</b> (they matter for more than one hallmark) and <b>background independent</b> (they matter in both cell lines).</p>
<p>Altogether, 80 high-confidence oncogenic (cancer-promoting) lncRNAs are active in NSCLC. They tend to be amplified (extra copies of their DNA) and overexpressed (more RNA than normal) in tumors.</p>
<p>A follow-up screen with antisense oligonucleotides (ASOs: short strands that make a chosen RNA get destroyed) shortlisted two candidates, Cancer Hallmarks in Lung LncRNA 1 (CHiLL1) and GCAWKR. Knocking either one down consistently weakened cancer hallmarks in two-dimensional models (cells in flat dishes) and three-dimensional models (such as spheroids and organoids).</p>
<p>“Molecular phenotyping” (measuring what changes inside the cells) shows that CHiLL1 and GCAWKR control cell-level traits through distinct transcriptional networks (different sets of genes).</p>
<p>The authors conclude that the work reveals a multi-dimensional map of functional lncRNAs in NSCLC, and that this map contains potential therapeutic vulnerabilities (weak spots that treatments could target).</p>`,
    why: `The Summary is the whole paper in miniature: the question, the approach and the headline results (80 hits, then two final candidates). Each later section is the evidence for one of its sentences.`,
    memory: `Picture a funnel. 831 lncRNAs go in at the top, 80 come out of the screens as hits, and two survive the ASO tests. (Between 80 and two the paper narrows in two more steps, to nine and then five; lesson A3 shows the whole funnel.)`,
    flags: [
      `The Summary states results but shows no evidence. To find it: the 80 hits and “amplified and overexpressed” are in <a href="#/g/res-integration/res-integration-p2">res-integration-p2</a> and <a href="#/g/res-integration/res-integration-p4">res-integration-p4</a>; the claim that integration beats single dropout screens is in <a href="#/g/res-integration/res-integration-p1">res-integration-p1</a>; the two ASO candidates are in <a href="#/g/res-aso/res-aso-p3">res-aso-p3</a>; “distinct transcriptional networks” is in <a href="#/g/res-mechanism/res-mechanism-p8">res-mechanism-p8</a>.`,
      `“High-confidence” has a specific meaning in the Results: the 80 are hits at a false-discovery-rate cutoff of FDR &lt;0.2 (res-integration-p2), a fairly lenient cutoff that accepts some false hits. Treat the 80 as a ranked list of candidates, not as 80 proven cancer genes.`,
      `The third hallmark is called “migration” here but “invasion” in the Introduction and at the start of the Results. Both words refer to the same screen: cells moving through a porous membrane (Figure 2C).`,
    ],
    prereqs: ['A1', 'A2', 'A3'],
    checks: [
      { q: 'In the Summary, what is measured for each of the 831 lncRNAs?',
        options: [
          { t: 'Its contribution to proliferation, chemoresistance and migration, in two cell backgrounds', ok: true, why: 'Right: the pooled CRISPR deletion screens test every lncRNA on three hallmarks across two cell backgrounds.' },
          { t: 'Whether it codes for a protein in lung cells', ok: false, why: 'lncRNAs are noncoding by definition. The screens ask what they do for cancer hallmarks, not whether they make protein.' },
          { t: 'How much of it is found in healthy lung versus tumor tissue', ok: false, why: 'Tumor-versus-normal levels are a separate, later line of evidence (“overexpressed in tumors”). The deletion screens measure effects on cell behavior.' },
          { t: 'How tightly it binds the KRAS protein', ok: false, why: 'Nothing in the Summary says lncRNAs are tested for binding KRAS. KRAS is only the mutation that defines the tumor type.' },
        ], source: ['summary-p1'] },
      { q: 'Which statement about the final shortlist matches the Summary?',
        options: [
          { t: 'A follow-up ASO screen shortlisted two candidates, CHiLL1 and GCAWKR, which act through distinct transcriptional networks', ok: true, why: 'Right: the two final candidates come from the ASO follow-up, and the Summary says their networks are distinct.' },
          { t: 'The ASO screen shortlisted all 80 high-confidence lncRNAs', ok: false, why: '80 is the number of high-confidence hits from the CRISPR screens. The ASO screen narrowed the list to two.' },
          { t: 'CHiLL1 and GCAWKR act through the same network, so they are redundant', ok: false, why: 'The Summary says the opposite: they control cell-level phenotypes via distinct transcriptional networks.' },
          { t: 'The ASOs were tested in patients with NSCLC', ok: false, why: 'The Summary mentions two- and three-dimension tumor models, which are laboratory models. It does not mention patients.' },
        ], source: ['summary-p1'] },
    ],
    sources: ['res-integration-p2'],
  },
});
