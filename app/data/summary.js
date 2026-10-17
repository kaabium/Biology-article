/* One-page summary and printable cheat sheet. Every paper fact in the one-pager sits in a "Plain English" block with a Source line.
   Numbers are the ones the TEXT of the Results/Methods gives. Numbers computed by me are listed in `derived` and flagged in the text. */
window.SUMMARY = {
  onePage: `
<div class="kind k-plain"><div class="klabel">💬 Plain English</div>
<p><b>The question.</b> Non-small cell lung cancer (NSCLC) is the leading cause of cancer deaths worldwide, and its treatments face undruggable mutations, toxicity and resistance. Long noncoding RNAs (lncRNAs) are a mostly unexplored source of new targets. Earlier CRISPR screens typically used one cell line and one hallmark, so their hits can be specific to that cell line. The authors wanted lncRNAs in KRAS+ NSCLC that are <b>pleiotropic</b> (affect several hallmarks) and <b>background independent</b> (work in more than one cell line).</p>
<div class="srcline">Source: <a href="#/read/intro/intro-p1">Intro ¶1</a> · <a href="#/read/intro/intro-p2">¶2</a> · <a href="#/read/intro/intro-p5">¶5</a> · <a href="#/read/intro/intro-p6">¶6</a> · <a href="#/read/discussion/discussion-p3">Discussion ¶3</a></div></div>

<div class="kind k-bgnd"><div class="klabel">📚 Background · not from the paper</div>
<p><b>lncRNA:</b> an RNA that is not made into protein. <b>CRISPR deletion:</b> Cas9 and two guide RNAs cut out the DNA between their two cut sites. <b>Pooled screen:</b> each cell gets one guide; later you count which guides gained or lost ground. <b>ASO:</b> a short synthetic strand that pairs with an RNA, usually leading to its destruction.</p></div>

<div class="kind k-plain"><div class="klabel">💬 Plain English</div>
<p><b>The approach, in order.</b></p>
<ol>
<li><b>Choose targets:</b> 831 expressed lncRNAs (998 start sites, “TSSs”), all at least 2 kb from protein-coding exons, plus control regions and genes.</li>
<li><b>Build a library:</b> 10 paired guide RNAs per target, 12,000 in all.</li>
<li><b>Switch genes off:</b> delete each TSS in two KRAS+ cell lines, A549 and H460.</li>
<li><b>Screen three hallmarks</b> (proliferation, cisplatin resistance, migration): 8 pooled screens, some “dropout” (guides lost), some “positive” (guides gained). Sequencing counts the guides.</li>
<li><b>Combine</b> all screens into one ranking (TPP); FDR &lt; 0.2 defines a hit.</li>
<li><b>Narrow down with ASOs</b>, then study the best two.</li>
</ol>
<div class="srcline">Source: <a href="#/read/res-pipeline/res-pipeline-p1">Pipeline ¶1</a> · <a href="#/read/res-pipeline/res-pipeline-p2">¶2</a> · <a href="#/read/res-pipeline/res-pipeline-p4">¶4</a> · <a href="#/read/res-pipeline/res-pipeline-p5">¶5</a> · <a href="#/read/res-multipheno/res-multipheno-p2">Multi-phenotype ¶2</a> · <a href="#/read/res-integration/res-integration-p1">Integration ¶1</a> · <a href="#/read/intro/intro-p6">Intro ¶6</a></div></div>

<div class="kind k-plain"><div class="klabel">💬 Plain English</div>
<p><b>The funnel.</b> 831 lncRNAs → <b>80</b> pan-hallmark hits (about 8% of those screened; 73 not linked to NSCLC before) → <b>9</b> novel top hits with no protein-coding evidence (Tier 1) → <b>5</b> that reproducibly cut proliferation with two ASOs (Tier 2) → <b>2</b> with little effect on normal lung cells (Tier 3): <b>CHiLL1</b> and <b>GCAWKR</b>. Hallmark by hallmark gave 134 hits (about 13%); 19 act in two hallmarks, none in three. Conventional dropout hits mostly worked in only one cell line; pan-hallmark hits worked in both, are higher in KRAS+ tumors than non-hits, and tend to be amplified, not lost, in tumor DNA. These are the numbers in the Results text; some figure labels differ (see <a href="#/numbers">Key numbers</a>).</p>
<div class="srcline">Source: <a href="#/read/res-integration/res-integration-p2">Integration ¶2</a> · <a href="#/read/res-integration/res-integration-p3">¶3</a> · <a href="#/read/res-integration/res-integration-p4">¶4</a> · <a href="#/read/res-aso/res-aso-p1">RNA therapeutics ¶1</a> · <a href="#/read/res-aso/res-aso-p2">¶2</a> · <a href="#/read/res-aso/res-aso-p3">¶3</a></div></div>

<div class="kind k-plain"><div class="klabel">💬 Plain English</div>
<p><b>The two leads.</b> CHiLL1 (Cancer Hallmark in Lung LncRNA 1) and GCAWKR. Two independent ASOs per gene cut growth in A549 cells, with similar results in H460 and H441 and activity in EGFR-mutant lines. In H441 spheroids viability fell almost as far as with the mTOR positive control; CHiLL1 ASOs also worked in patient-derived BE874 organoids. Non-transformed lung cells responded little or not at all. A 50:50 cocktail beat an equal dose of either ASO alone, without extra toxicity to non-cancerous cells. In TCGA tumors 78% express at least one of the two (92% for the five Tier 2 lncRNAs).</p>
<p><b>How they work.</b> Matching CRISPR and ASO effects mean both act through an RNA product, or at least its production. Otherwise they differ: CHiLL1 sits mainly in the cytoplasm (about 4 molecules per cell), GCAWKR in the nucleus (about 1 copy), and their knockdowns change non-overlapping gene networks. CHiLL1 knockdown raises early apoptosis; GCAWKR knockdown increases cells in G2 and impairs migration. GCAWKR knockdown raises CHiLL1, not the reverse, which the authors use to explain the cocktail’s extra effect. The exact molecular mechanism is open: overexpressing either RNA did not rescue the ASO effect.</p>
<div class="srcline">Source: <a href="#/read/res-aso/res-aso-p2">RNA therapeutics ¶2</a> · <a href="#/read/res-aso/res-aso-p3">¶3</a> · <a href="#/read/res-aso/res-aso-p6">¶6</a> · <a href="#/read/res-aso/res-aso-p7">¶7</a> · <a href="#/read/res-aso/res-aso-p8">¶8</a> · <a href="#/read/res-aso/res-aso-p9">¶9</a> · <a href="#/read/res-mechanism/res-mechanism-p1">Mechanism ¶1</a> · <a href="#/read/res-mechanism/res-mechanism-p2">¶2</a> · <a href="#/read/res-mechanism/res-mechanism-p5">¶5</a> · <a href="#/read/res-mechanism/res-mechanism-p6">¶6</a> · <a href="#/read/res-mechanism/res-mechanism-p7">¶7</a> · <a href="#/read/res-mechanism/res-mechanism-p8">¶8</a> · <a href="#/read/discussion/discussion-p6">Discussion ¶6</a></div></div>

<div class="kind k-plain"><div class="klabel">💬 Plain English</div>
<p><b>Why it matters.</b> The work maps the functional lncRNA landscape of KRAS+ NSCLC (about 8% of lncRNAs have cell-level functions). It gives a reusable library and a design (several cell lines, several hallmarks, one ranking) whose hits hold up across backgrounds. And it offers two ASO-targetable lncRNAs with low toxicity to normal cells, possibly as fixed or patient-tailored cocktails.</p>
<p><b>Limits.</b> CRISPR deletion can hit overlapping DNA elements or opposite-strand genes: only 8 of 12 hits (67%) were confirmed with ASOs, so about one-third may act through DNA. The screens are not comprehensive (deletion is less efficient than mutating the coding sequence, annotation is incomplete, MALAT1 and MIAT were missed) and used two monolayer cell lines. ASO delivery in vivo is future work.</p>
<div class="srcline">Source: <a href="#/read/discussion/discussion-p2">Discussion ¶2</a> · <a href="#/read/discussion/discussion-p4">¶4</a> · <a href="#/read/discussion/discussion-p5">¶5</a> · <a href="#/read/discussion/discussion-p7">¶7</a> · <a href="#/read/limitations/limitations-p1">Limitations ¶1</a> · <a href="#/read/limitations/limitations-p2">¶2</a></div></div>

<div class="kind k-memory"><div class="klabel">💡 Memory aid</div>
<p>Funnel: <b>831</b> screened → <b>80</b> ranked → <b>9</b> picked → <b>5</b> repeated → <b>2</b> spare normal cells. Pipeline: <b>Cut</b> the TSS, <b>Count</b> the guides, <b>Combine</b> the screens, <b>Confirm</b> with ASOs, <b>Characterize</b> the two leads.</p></div>
`,

  cheat: `
<div class="cs-box tiny"><h3>The paper in 2 lines</h3>
<p><b>Q:</b> Which lncRNAs drive KRAS+ NSCLC across hallmarks <i>and</i> cell lines, and can ASOs hit them?<br>
<b>Answer:</b> CRISPR-deletion screens → one ranking (TPP) → 80 hits → 9 → 5 → 2: <b>CHiLL1</b>, <b>GCAWKR</b>.</p></div>

<div class="cs-box tiny"><h3>Pipeline</h3>
<div class="cs-flow"><span>831 lncRNAs / 998 TSSs</span><i>→</i><span>10 pgRNAs each (12,000)</span><i>→</i><span>lentivirus, MOI 0.3</span><i>→</i><span>A549 + H460 (Cas9)</span><i>→</i><span>3 hallmark screens</span><i>→</i><span>count pgRNAs</span><i>→</i><span>TPP, FDR &lt; 0.2</span><i>→</i><span>ASOs 9 → 5 → 2</span><i>→</i><span>RNA-seq, FISH</span></div>
<ul>
<li><b>Proliferation:</b> dropout (hit guides depleted) + CFSE (slow cells, brightest 20%, enriched).</li>
<li><b>Cisplatin:</b> survival at IC30, IC80 (depleted) + death at IC20 (enriched).</li>
<li><b>Migration:</b> 48 h through a membrane; guides enriched in migration-impaired cells.</li>
</ul></div>

<div class="cs-box tiny"><h3>Funnel</h3>
<div class="cs-flow"><span><b>831</b> lncRNAs</span><i>→</i><span><b>80</b> hits</span><i>→</i><span><b>9</b> Tier 1</span><i>→</i><span><b>5</b> Tier 2</span><i>→</i><span><b>2</b> Tier 3</span></div>
<ul>
<li><b>80:</b> pan-hallmark, FDR &lt; 0.2 (~8%; 73 new to NSCLC). By hallmark: 134 (~13%); 19 in two, 0 in three.</li>
<li><b>Tier 1:</b> novel, no protein-coding evidence; at least 2 ASOs with ≥ 40% knockdown.</li>
<li><b>Tier 2:</b> 2 ASOs reproducibly cut growth (A549, H460, H441).</li>
<li><b>Tier 3:</b> weak effect in normal lung cells: CHiLL1 (candidate 42), GCAWKR (candidate 240).</li>
</ul></div>

<div class="cs-box tiny"><h3>Key numbers</h3>
<table class="cs"><tbody class="tiny">
<tr><td>831 · 998</td><td>lncRNAs · TSSs targeted</td></tr>
<tr><td>10 · 12,000</td><td>pgRNAs per target · in the library</td></tr>
<tr><td>0.3 · &gt;1,000x</td><td>MOI · coverage (cells ÷ library sequences)</td></tr>
<tr><td>77 · 65</td><td>hits: A549 proliferation · migration</td></tr>
<tr><td>0.7 vs 0.67</td><td>AUC, A549 proliferation: with vs without positive screens</td></tr>
<tr><td>10/12 · 7/12</td><td>test pgRNAs: deletion seen · RNA lowered</td></tr>
<tr><td>8/12 (67%)</td><td>hits confirmed by ASO</td></tr>
<tr><td>78% · 92%</td><td>TCGA tumors with at least 1 target: Tier 3 · Tier 2</td></tr>
</tbody></table>
<p class="srcline">Computed here: 80 ÷ 998 = 8.0%; 134 ÷ 998 = 13.4% (the paper says ~8% and ~13%).</p></div>

<div class="cs-box tiny"><p><b>⚠ Numbers differ between text and figures</b> (library 12,000 vs 1,200; 998 vs 1003 targets; control counts in Methods vs Results vs Fig 1C) — see the <a href="#/numbers">Key numbers page</a>. This sheet uses the Results text.</p></div>

<div class="cs-box tiny"><h3>Controls and why</h3>
<ul>
<li><b>Neutral regions</b> (AAVS1, intergenic, intronic): no effect expected → baseline, z-score scale, AUC negatives.</li>
<li><b>Positive-control genes:</b> known effects → the screen can find real hits. ORF vs promoter guides on them: promoter deletion is weaker → lncRNA screens are less sensitive.</li>
<li><b>Replicates, day-0 reference, two cell lines:</b> reproducible; change vs start; general vs cell-line-specific hits.</li>
<li><b>Competition assay:</b> AAVS1 guides (GFP+) vs test guides (mCherry+); RPS5 = essential-gene benchmark.</li>
<li><b>ASOs:</b> non-targeting ASO baseline; 2 independent ASOs → on-target; MALAT1, mTOR ASOs = positive controls.</li>
<li><b>Normal lung cells</b> (HBEC3-KT, MRC5-CV1, CCD-12Lu): toxicity check.</li>
</ul></div>

<div class="cs-box tiny"><h3>10 key definitions</h3>
<ol>
<li><b>NSCLC / KRAS+:</b> non-small cell lung cancer / activating KRAS mutation.</li>
<li><b>lncRNA:</b> long RNA not made into protein; over 98% uncharacterised.</li>
<li><b>TSS:</b> where copying into RNA starts; delete it → gene off.</li>
<li><b>pgRNA / CRISPR-del (DECKO):</b> paired guides make Cas9 cut twice, deleting the DNA between.</li>
<li><b>Pooled screen:</b> one guide per cell; hit guides are depleted (<b>dropout</b>) or enriched (<b>positive</b>).</li>
<li><b>Hallmark:</b> cancer capability: proliferation, chemoresistance, migration/invasion.</li>
<li><b>Pleiotropic / background independent:</b> several hallmarks / both cell lines.</li>
<li><b>TPP:</b> one ranking from all screens: effect size (RRA) + p-values (EBM); <b>pan-hallmark</b> = all screens.</li>
<li><b>ASO:</b> synthetic strand pairing with an RNA to lower it (knockdown).</li>
<li><b>On-target:</b> caused by the intended RNA; independent ASOs (and CRISPR-del) agree.</li>
</ol></div>

<div class="cs-box tiny"><h3>Statistics decoder</h3>
<table class="cs"><tbody class="tiny">
<tr><td><b>p, ns</b></td><td>chance of a result this extreme if nothing is going on; p ≤ 0.05 = significant; ns = not significant. One-tailed tests check one direction only.</td></tr>
<tr><td><b>FDR</b></td><td>expected share of false hits among the hits; &lt; 0.2 = up to 20% may be false (Benjamini–Hochberg)</td></tr>
<tr><td><b>log2FC</b></td><td>log2(treated ÷ control): 0 = no change, −1 = half, +1 = double; dropout hits are negative (e.g. −1.81, FDR 1.2 × 10<sup>−7</sup>)</td></tr>
<tr><td><b>z-score</b></td><td>distance from the neutral-control average, in SDs</td></tr>
<tr><td><b>AUC</b></td><td>0.5 = chance, 1 = perfect separation of positive from neutral controls</td></tr>
<tr><td><b>Bars, n</b></td><td>SD where the legend says so (e.g. Fig 3C, 5C, 6K; Fig 1F’s does not); n = 3–4 replicates (Fig 6K: 2)</td></tr>
<tr><td><b>Tests</b></td><td>Pearson (correlation), Student’s t (1- or 2-tailed), Welch (4F), Mann–Whitney (5G), Wilcoxon + Kruskal–Wallis (2F), Fisher (4H), hypergeometric (overlap)</td></tr>
</tbody></table>
<p class="srcline">More: <a href="#/lesson/E1">E1</a> fold change · <a href="#/lesson/E2">E2</a> p-values · <a href="#/lesson/E4">E4</a> FDR, AUC · <a href="#/lesson/E5">E5</a> legends</p></div>

<div class="cs-box tiny"><h3>CHiLL1 vs GCAWKR</h3>
<table class="cs"><tbody class="tiny">
<tr><th></th><th>CHiLL1</th><th>GCAWKR</th></tr>
<tr><td>Locus</td><td>candidate 42, Chr 8; 2 isoforms</td><td>candidate 240, Chr 15; 4 isoforms</td></tr>
<tr><td>Known before</td><td>never linked to cancer</td><td>colon cancer prognosis; gastric oncogene</td></tr>
<tr><td>Patients</td><td>high level ↔ poor survival</td><td>locus often amplified; up in PI subtype</td></tr>
<tr><td>RNA</td><td>no obvious functional elements</td><td>many conserved sequences, structures</td></tr>
<tr><td>Where</td><td>cytoplasm</td><td>nucleus</td></tr>
<tr><td>Amount</td><td>8.3 TPM (~4 per cell)</td><td>2.5 TPM (~1 per cell)</td></tr>
<tr><td>Knockdown</td><td>more early apoptosis</td><td>more G2 cells; impaired migration</td></tr>
<tr><td>Pathways</td><td>MAPK, PI3K-Akt; p53, mTORC1</td><td>G2-M checkpoint, migration genes; shares p53, EMT</td></tr>
<tr><td>Cross-talk</td><td>no rise in GCAWKR</td><td>knockdown raises CHiLL1</td></tr>
</tbody></table>
<p><b>Shared:</b> low protein-coding potential; 2 ASOs each; weak in normal cells; active in 3D; no rescue by overexpression; non-overlapping target genes; cocktail beats either ASO alone.</p></div>

<div class="cs-box tiny"><h3>Limitations, one line each</h3>
<ul>
<li>CRISPR-del can hit overlapping DNA elements or opposite-strand genes → false positives.</li>
<li>Only 8/12 (67%) hits confirmed by ASO; about one-third may act through DNA.</li>
<li>Less sensitive than ORF mutation; annotation incomplete (MALAT1, MIAT missed).</li>
<li>Two monolayer cell lines screened; many hits not followed up.</li>
<li>No rescue by overexpression, so the mechanism is open.</li>
<li>ASO delivery in vivo not done; positive screens added only a modest gain.</li>
<li>Declared: patent application on these lncRNAs; one author consults for NextRNA.</li>
</ul>
<p class="srcline">Deeper: <a href="#/glossary">Glossary</a> · <a href="#/lesson/A2">A2</a> funnel · <a href="#/lesson/H1">H1</a> controls · <a href="#/lesson/H3">H3</a> limitations · <a href="#/summary">One-page summary</a></p></div>
`,

  // numbers computed by me (not printed in the paper): 80/998, 134/998 and FDR 0.2 = 20%
  derived: ['8.0', '13.4', '20']
};
