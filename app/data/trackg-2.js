/* Track G study layer · file trackg-2 · units res-validation, res-integration, res-aso
   Notes for reviewers
   - Numbers printed only inside a figure image (not in the paragraph text or a legend) are listed in `derived`; they were read
     from the panel images by eye. Ratios and unit conversions we computed ourselves are labeled as ours in the text and listed in `derived`.
   - Supplementary items (Figures S1–S6, Tables S1–S3, Data S1–S4) are only ever described as "what the sentence claims". */
window.TRACKG = window.TRACKG || { paras: {}, units: {} };

/* ======================================================================================= res-validation */
Object.assign(window.TRACKG.paras, {

  'res-validation-p1': {
    plain: `<p>Next the authors tested how reliable the screen results are. They chose <b>two</b> lncRNA TSSs (start-site regions) for a closer look. They picked them because they ranked at or near the top and because they behaved consistently in the two cell lines (A549 and H460).</p>
<p><b>Candidate 205</b> was a top hit in the dropout (growth) screens. In A549 cells its log2 fold change was −1.81 and its false discovery rate (FDR) was 1.2 × 10<sup>−7</sup>. A negative log2 fold change means the guides for this target became rarer. For a sense of scale, −1.81 is about a 3.5-fold drop (our own conversion, not the paper's). An FDR this small means the hit is very unlikely to be a false alarm.</p>
<p><b>Candidate 509</b> was a hit in both the proliferation screens and the cisplatin screens (A549: log2 fold change = −1.15, FDR = 9.78 × 10<sup>−7</sup>). That is about a 2.2-fold drop (again our conversion).</p>`,
    why: `A pooled screen can produce false alarms, so the authors re-test two of the best hits before building on the screen. Candidates 205 and 509 are used again in the next paragraphs.`,
    flags: [
      `The paragraph says the two candidates were chosen for “consistency between the two cell lines”, but it quotes only A549 numbers. No H460 numbers are given here, so you cannot check that consistency in this paragraph.`,
      `The numbers for candidate 509 are not tied to one screen: the paragraph says “in both proliferation and cisplatin” and then gives a single A549 log2 fold change and FDR.`,
      `Both candidates were chosen because they ranked at the top. A successful re-test of top hits shows that the screen can find real effects, but not how often an average hit holds up. For an overall rate, see the <a href="#/g/limitations/limitations-p1">Limitations</a>: 8/12 (67%) of hits validated with ASOs.`,
    ],
    prereqs: ['A3', 'E1', 'D4', 'E4'],
    sources: ['limitations-p1'],
    derived: ['3.5', '2.2'],
    checks: [
      { q: `Why did the authors pick candidates 205 and 509 for validation?`,
        options: [
          { t: `They ranked near the top and behaved consistently in the two cell lines.`, ok: true, why: `Right. The paragraph gives “top ranking and consistency between the two cell lines” as the reasons.` },
          { t: `They were drawn at random from all the targets, to avoid any bias.`, ok: false, why: `Random choice comes later, when one guide pair is picked for each candidate. The two candidates themselves were chosen for rank and consistency.` },
          { t: `They were the only two targets already known to promote lung cancer.`, ok: false, why: `The paragraph does not mention earlier studies. It gives the screen ranking and the agreement between cell lines as the reasons.` },
          { t: `They were the only two targets that could be tested one by one.`, ok: false, why: `Nothing in the paragraph limits testing to these two. The stated reasons are rank and consistency.` },
        ], source: ['res-validation-p1'] },
    ],
  },

  'res-validation-p2': {
    plain: `<p>Now the authors describe what lies at each of the two target spots. <i>Where to look: the gene maps in Figure 3A. The little arrows mark where each gene starts.</i></p>
<p><b>Candidate 205</b> overlaps the start sites (TSSs) of two genes that start at the same place and run in opposite directions, on opposite strands of the DNA. The paper calls them “bidirectional antisense” genes. Both are annotated in the GENCODE catalog: <i>LINC00115</i> and <i>RP11-206L10.11</i> (Figure 3A, left). <b>Candidate 509</b> targets a TSS that is shared by several lncRNAs from the BIGTranscriptome catalog (Figure 3A, right).</p>
<p>The authors add that this locus also contains two further hits, candidate 507 (<i>LINC00910</i>) and candidate 508. They say this supports the importance of the locus (Figure S2H, a supplementary figure that is not in your PDF).</p>`,
    why: `It shows what each deletion really removes. At candidate 205 a single deletion hits the start sites of two genes, which is why the authors later need ASOs to tell which gene matters.`,
    memory: `Analogy: one doorway that opens onto two corridors running in opposite directions. Bricking up the doorway blocks both corridors, so you cannot tell which corridor mattered.`,
    flags: [
      `Printed labels differ. The text says candidate 509’s TSS is shared by “BIGTranscriptome lncRNAs”, but the gene track for candidate 509 in Figure 3A is labeled “FANTOM Annotation”. The paper does not explain the difference.`,
      `“it contains two additional hits”: the paragraph does not say what “it” is. We read it as the candidate 509 locus, because the sentence follows the 509 sentence. The evidence for candidates 507 and 508 is in a supplementary figure.`,
    ],
    prereqs: ['A3', 'B4', 'B7', 'F3'],
    checks: [
      { q: `Deleting the TSS region of candidate 205 cannot by itself tell you which gene is responsible. Why not?`,
        options: [
          { t: `The region holds the start sites of two genes that face opposite ways (LINC00115 and RP11-206L10.11), so one deletion removes both.`, ok: true, why: `Right. They are bidirectional antisense genes that share the TSS region, so the deletion cannot separate them.` },
          { t: `The deletion removes only one of the two start sites.`, ok: false, why: `The paragraph says candidate 205 overlaps the TSS of both genes.` },
          { t: `LINC00115 and RP11-206L10.11 sit on different chromosomes.`, ok: false, why: `They overlap the same TSS region, so they sit next to each other on the same chromosome.` },
          { t: `Candidate 205 was not a hit in the dropout screens.`, ok: false, why: `It was described as a top hit in the dropout screens in the previous paragraph. The open question is which gene is behind the effect.` },
        ], source: ['res-validation-p2'] },
    ],
  },

  'res-validation-p3': {
    plain: `<p>To check the effect of the deletions, the authors tested <b>one</b> guide pair (pgRNA) per candidate on its own. They picked it at random from the high-scoring pgRNAs. <i>Where to look: Figure 3B. Each plot follows the ten pgRNAs of one candidate through the dropout screen in A549 cells (time points T0, week two, week three). The arrow marks the pgRNA that was picked.</i></p>
<p>The paper says the candidate 205 pgRNA deleted the targeted region efficiently (Figure S2I, supplementary). For candidate 509 the authors could not design PCR primers to check the deletion directly, but its pgRNA effectively lowered the RNA level (Figure S2J, supplementary).</p>
<p>Both pgRNAs had strong effects on cell <b>fitness</b> (how well cells survive and multiply). In a <b>competition assay</b>, red cells (mCherry+) carrying the candidate pgRNAs were out-competed by green control cells (GFP+) carrying a pgRNA for <i>AAVS1</i>, a neutral spot. The authors say the effect is comparable to switching off <i>RPS5</i>, an essential ribosomal gene (Figure 3C, and Figure S2K in the supplement). <i>Where to look: Figure 3C. The neutral control stays flat, the RPS5 positive control falls, and the red lines for candidates 205 and 509 fall too.</i> A conventional growth assay gave similar results (Figure S2L, supplementary).</p>
<p>Finally, the candidate 509 pgRNA also made cells more sensitive to cisplatin, which fits the screen results (Figure 3C, the plot labeled with cisplatin).</p>`,
    why: `This is the independent check: one guide pair per candidate, tested outside the pool and next to a neutral and a positive control. If the hits were only false alarms of the pooled screen, these assays would show no loss of fitness.`,
    flags: [
      `“randomly selected high-scoring pgRNAs”: the paragraph does not say what “high-scoring” means (a design score, or the screen result). Only one pgRNA per candidate is tested (the arrows in Figure 3B), and in Figure 3B the ten guide lines of a candidate do not all fall by the same amount (for candidate 205 a few stay near zero or even rise). One guide cannot show that every guide works.`,
      `Three claims here rest only on supplementary figures (S2I, S2J and S2L): the deletion for candidate 205, the lowered RNA for candidate 509, and the conventional growth assay. “An effect comparable to inactivation of … RPS5” comes without a number; compare the lines in Figure 3C yourself.`,
    ],
    prereqs: ['D5', 'D7', 'F1'],
    checks: [
      { q: `In the competition assay, why are the control cells (GFP+) grown in the same dish as the candidate cells (mCherry+)?`,
        options: [
          { t: `So both kinds of cells face identical conditions, and a shift in their ratio over time shows a difference in fitness.`, ok: true, why: `Right. The cells compete directly. If the candidate deletion hurts fitness, the red share falls.` },
          { t: `To make the candidate cells fluorescent.`, ok: false, why: `The fluorescent label comes with the pgRNA virus. Mixing the cells does not label them; it lets them compete.` },
          { t: `To check that the pgRNA deleted the targeted region.`, ok: false, why: `Deletion is checked by PCR (or by measuring the RNA level). The competition assay measures fitness.` },
          { t: `To make the cells resistant to cisplatin.`, ok: false, why: `Cisplatin sensitivity is tested separately, and mixing cells does not make them resistant.` },
        ], source: ['res-validation-p3'] },
    ],
  },

  'res-validation-p4': {
    plain: `<p>Two questions were still open. First, candidate 205 overlaps two genes, so it was unclear which one causes the effect. Second, a deletion of DNA cannot tell you <i>how</i> the effect arises. It could be <b>DNA-dependent</b> (for example, the deleted DNA held an enhancer, a stretch of DNA that boosts a nearby gene) or <b>RNA-dependent</b> (the finished lncRNA, or the act of making it, is what matters).</p>
<p>To answer both questions the authors used two ASOs for each gene. ASOs attack the RNA, not the DNA. The result points to <i>LINC00115</i>, but not <i>RP11-206L10.11</i>, as driving cell proliferation through an RNA-dependent mechanism (Figure 3D). <i>Where to look: Figure 3D. The right-hand bars show how much of each RNA is left after the ASOs (qRT-PCR). The left-hand curves show growth over time. Only the LINC00115 growth curves go down; the RP11-206L10.11 curves are labeled “ns” (not significant).</i></p>
<p>The effect was seen again in a 3D spheroid model (Figure S2M, supplementary). The authors say this fits earlier reports linking <i>LINC00115</i> to lung cancer proliferation and migration, and to other cancers. For example, its knockdown is reported to suppress cell proliferation and invasion in breast cancer and prostate cancer, and in colon rectal cancer it could inhibit the cells’ metastatic ability and growth.</p>`,
    why: `CRISPR deletion removes DNA, so it cannot show whether the RNA is responsible. ASOs destroy only the RNA, so they answer both open questions (which gene, and DNA versus RNA). The same logic is why ASOs are the therapeutic tool in the next sections.`,
    memory: `Analogy: deleting a gene’s DNA is like tearing a page out of the cookbook. The dish fails, but you do not know whether the missing page (the DNA) or the photocopies made from it (the RNA) mattered. An ASO shreds only the photocopies. If the dish still fails, the photocopies mattered.`,
    flags: [
      `“RNA-dependent” here includes “its transcription” as well as the finished lncRNA (the paragraph’s own examples). An ASO result by itself does not separate the two, and the paragraph does not try to.`,
      `Legend versus image: the Figure 3D legend says n = 4 for the whole panel, but the two RT-qPCR bar charts in the image are labeled “n=2”. The legend also misprints “lower panels” as “bower panels”, and names a one-tailed Student’s t test (a test that only looks for a decrease).`,
    ],
    prereqs: ['B4', 'B8', 'D6'],
    sources: ['fig3D'],
    checks: [
      { q: `After the CRISPR deletion at candidate 205, why did the authors turn to ASOs?`,
        options: [
          { t: `To find out which of the two overlapping genes is responsible, and whether the effect works through RNA rather than DNA.`, ok: true, why: `Right. The paragraph names exactly these two open questions: a deletion cannot separate the two genes, nor DNA-dependent from RNA-dependent effects.` },
          { t: `Because the CRISPR deletion failed to remove the TSS region.`, ok: false, why: `The candidate 205 pgRNA deleted the region efficiently (previous paragraph). The problem was interpretation, not failure.` },
          { t: `To test the cells in 3D instead of in flat dishes.`, ok: false, why: `The 3D spheroid model is mentioned only afterwards, as further support.` },
          { t: `To check whether the guide RNAs cut at the wrong places.`, ok: false, why: `Off-target cutting is not what the paragraph is about. The ASOs separate the two genes and DNA from RNA effects.` },
        ], source: ['res-validation-p4'] },
      { q: `What did the ASO experiments in Figure 3D show?`,
        options: [
          { t: `ASOs against LINC00115 slowed proliferation; ASOs against RP11-206L10.11 did not.`, ok: true, why: `Right. This is why the authors implicate LINC00115, but not RP11-206L10.11, through an RNA-dependent mechanism.` },
          { t: `ASOs against RP11-206L10.11 slowed proliferation; ASOs against LINC00115 did not.`, ok: false, why: `That is the reverse of the paper's result.` },
          { t: `ASOs against both genes slowed proliferation equally, so the two genes still cannot be told apart.`, ok: false, why: `If both had slowed growth equally the ambiguity would remain. The paper reports an effect only for LINC00115.` },
          { t: `ASOs against neither gene slowed proliferation, so the effect must be DNA-dependent.`, ok: false, why: `The LINC00115 ASOs did slow proliferation, which points to an RNA-dependent mechanism.` },
        ], source: ['res-validation-p4'] },
    ],
  },

  'res-validation-p5': {
    plain: `<p>The authors say that the same kind of check worked well for the migration screens (“similar high validation rates”). They used ASOs to knock down three migration hits: candidate 215 (<i>AC104024.3</i>), candidate 448 (<i>CECR7</i>) and candidate 489 (<i>MIR23AHG</i>). In A549 cells, they report, each knockdown strongly reduced migration (the paper’s words: “dramatic impairment”).</p>
<p><i>Where to look: Figure 3E (left) shows the screen data for candidate 215: each line is one guide, followed between the migrated and the not-migrated cell groups. Figure 3E (right) shows stained cells that crossed the membrane for each ASO next to the control ASO; fewer purple cells means less migration. Figure 3F (left) checks that each ASO lowered its target RNA (qRT-PCR). Figure 3F (right) turns the stained cells into numbers (crystal violet), relative to the control ASO.</i></p>`,
    why: `Validation so far covered growth and cisplatin. This extends it to the third hallmark, migration, again with ASOs, to test whether the RNA matters for all three hallmarks.`,
    flags: [
      `“Similar high validation rates” gives no rate here. Only three migration hits are tested, and the paragraph does not count how many passed. The <a href="#/g/limitations/limitations-p1">Limitations</a> later give an overall figure: 8/12 (67%) of hits validated with ASOs (9 for proliferation/cisplatin, 3 for migration).`,
      `“dramatic impairment” versus the figure: in Figure 3F (right) five of the six P labels are small, but one, for the second ASO against candidate 489, reads P=0.144. That is not significant at the paper’s usual cutoff (p ≤ 0.05 in the Methods). The legend says “three independent biological replicates”, but the RT-qPCR plot in Figure 3F (left) is labeled “n=2” (the crystal violet plot is labeled “n=3”).`,
    ],
    prereqs: ['D5', 'D6', 'D8', 'F1'],
    sources: ['limitations-p1', 'm-quant-p3', 'fig3F'],
    derived: ['0.144'],
    checks: [
      { q: `Why does Figure 3F measure RNA levels (qRT-PCR) as well as migration?`,
        options: [
          { t: `To confirm that each ASO really lowered its target RNA, so a migration defect can be linked to the knockdown.`, ok: true, why: `Right. Without this check you would not know whether the ASO worked at all.` },
          { t: `To count how many cells crossed the membrane.`, ok: false, why: `That is what the crystal violet staining measures.` },
          { t: `To measure how much cisplatin the cells took up.`, ok: false, why: `Cisplatin is not part of this experiment.` },
          { t: `To check that the cells were still alive.`, ok: false, why: `qRT-PCR measures the amount of one specific RNA. It does not measure whether cells are alive.` },
        ], source: ['res-validation-p5', 'fig3F'] },
    ],
  },

  'res-validation-p6': {
    plain: `<p>In summary, the authors say these follow-up results support the ability of CRISPR-del screens (screens that delete start sites) to find lncRNA genes that promote cancer hallmarks through <b>RNA-dependent mechanisms</b>. That means mechanisms that depend on the lncRNA itself, as defined in the previous paragraph, and not only on the DNA.</p>`,
    why: `It closes the section: the screening method is judged trustworthy enough to build the integrated map in the next section.`,
    flags: [
      `This is a broad statement from a small sample: two top-ranked hits (candidates 205 and 509) in competition assays, and ASO tests for LINC00115 and three migration hits. The <a href="#/g/limitations/limitations-p1">Limitations</a> are more cautious: 8/12 (67%) of hits validated with ASOs, “suggesting that around one-third of screen hits may act via DNA-dependent mechanisms”, and candidates 408/316 are named as likely false positives.`,
    ],
    prereqs: ['D1', 'D6'],
    sources: ['res-validation-p1', 'limitations-p1'],
    checks: [
      { q: `In this section, what does “RNA-dependent mechanism” mean?`,
        options: [
          { t: `The effect depends on the lncRNA itself (the finished RNA, or the act of making it), not only on the DNA sequence.`, ok: true, why: `Right. The previous paragraph contrasts it with DNA-dependent mechanisms such as an enhancer, and lists “mature lncRNA, or its transcription” as RNA-dependent examples.` },
          { t: `The lncRNA is translated into a protein that does the work.`, ok: false, why: `lncRNAs are noncoding: they do not carry a recipe for a protein.` },
          { t: `The effect only appears when RNA is added to the cells from outside.`, ok: false, why: `Here the authors lower the cell’s own RNA with ASOs. They do not add RNA from outside.` },
          { t: `An enhancer in the DNA boosts a neighboring gene.`, ok: false, why: `That is the DNA-dependent example given in the paragraph, the opposite of an RNA-dependent mechanism.` },
        ], source: ['res-validation-p4', 'res-validation-p6'] },
    ],
  },

});

window.TRACKG.units['res-validation'] = {
  intro: `<p>A pooled screen tests thousands of targets at once, so some hits can be false alarms. This section asks: <b>do the best hits still work when tested one at a time, and do they work through their RNA?</b> The authors re-test two top hits (candidates 205 and 509) in a competition assay. They use ASOs to find out which of two overlapping genes matters and whether the RNA is the working part. Finally, they test three migration hits with ASOs.</p>`,
  recap: `<p>Both top hits kept their effect when tested alone: cells with the deletions were out-competed by control cells, and candidate 509 also made cells more sensitive to cisplatin. ASOs showed that at candidate 205 the gene <i>LINC00115</i>, but not <i>RP11-206L10.11</i>, drives growth through its RNA, and ASOs against three migration hits slowed A549 cell migration. The authors conclude that CRISPR-del screens can find lncRNAs that act through their RNA, a conclusion the Limitations later qualify (8/12 hits validated with ASOs).</p>`,
};

/* ======================================================================================= res-integration */
Object.assign(window.TRACKG.paras, {

  'res-integration-p1': {
    plain: `<p>Next the authors combine all their screen results into one quantitative map of the lncRNAs that drive the lung cancer hallmarks. The screens differ a lot, so merging them takes care. The aim is to balance two things: the <b>effect size</b> (how big the change is) and the <b>significance</b> (how sure we can be that it is not chance). For this they built a pipeline called <b>TPP</b>, the target prioritization pipeline.</p>
<p><i>Where to look: Figure 4A. Follow the boxes: the log2 fold changes go through a rank-based method (RRA), the P values go through another method (the empirical Brown’s method), the two are merged into one harmonic mean P value, and an FDR cutoff of 0.2 gives a single unified ranking of hits.</i></p>
<p>TPP can be run on all screens together, which gives a <b>“pan-hallmark”</b> ranking, or on the screens of one hallmark at a time, which gives a <b>“hallmark-specific”</b> ranking (details are in the STAR Methods). The authors say that the pan-hallmark ranking does better than common ways of combining screens, and better than the individual screens, at sorting the controls correctly: <b>positive controls</b> (genes that should score as hits) and <b>neutral controls</b> (spots that should not).</p>
<p><i>Where to look: Figure 4B. Each curve is a ROC curve for one method. The higher a curve rises toward the top left, the better, and the AUC values in the box summarize this (bigger is better).</i></p>`,
    why: `This is the method behind the headline result. The authors must merge very different screens into one fair ranking, and show that it recovers known controls better than simpler options, before the 80 hits in the next paragraph can be trusted.`,
    flags: [
      `“Outperforms” is a small step against the closest rival. In Figure 4B the AUC is 0.82 for the pan-hallmark ranking and 0.80 for the simpler RRA ranking. The bigger gaps are to single screens (0.73 for A549 dropout, 0.54 for H460 dropout; an AUC of 0.5 is a coin flip). The panel gives these numbers; the paragraph gives none.`,
      `The test uses controls, not lncRNAs: Figure 4B says there are 109 positive controls and 35 neutral controls. So it shows how well TPP recovers known positives and rejects neutral spots. That is not the same as showing that its lncRNA hits are real, which the validations and the patient-data checks try to do.`,
    ],
    prereqs: ['C1', 'E4', 'E5'],
    sources: ['res-integration-p2', 'm-hits-p4', 'res-multipheno-p6'],
    derived: ['0.82', '0.80', '0.73', '0.54', '0.5', '35'],
    checks: [
      { q: `How do the authors show that the pan-hallmark ranking is better than other methods?`,
        options: [
          { t: `It sorts known positive controls from neutral controls more accurately, measured by the area under a ROC curve (Figure 4B).`, ok: true, why: `Right. Performance is judged on how well each method recalls positive controls and rejects neutral controls.` },
          { t: `It finds more lncRNA hits than any other method.`, ok: false, why: `The comparison is about correctly classifying controls, not about the number of hits.` },
          { t: `Its hits were all confirmed with ASOs.`, ok: false, why: `ASO testing comes in the next section, and only for selected candidates.` },
          { t: `It gives the smallest FDR for every lncRNA.`, ok: false, why: `The comparison uses the controls and the AUC, not the size of the FDR values.` },
        ], source: ['res-integration-p1', 'fig4B'] },
    ],
  },

  'res-integration-p2': {
    plain: `<p>The hallmark-specific results give each lncRNA a three-part “signature”: how much it matters for each of the three hallmarks. This is read against the overall confidence from the pan-hallmark ranking (Figure 4C). <i>Where to look: Figure 4C is a triangle plot. Each dot is a hit (control genes have colored rings). The closer a dot sits to a corner, the more that hallmark drives its result, and the dot size shows the FDR (see the size key).</i></p>
<p>The pan-hallmark analysis alone found <b>80 lncRNA hits</b>, about 8% of those screened (the paper cites Data S2, a supplementary file), at an FDR below 0.2. Of these, <b>73</b> had not been linked to NSCLC before (Figure 4D). <i>Where to look: Figure 4D. The left bar is split into colored parts: blue is “novel cancer lncRNAs”, green is “lung cancer lncRNAs”, and “cand hits: 80” is the total.</i> As expected, positive-control protein-coding genes that promote growth, and known lung cancer lncRNAs, are enriched among the hits, but neutral controls are not. A separate enrichment-score analysis supports this (Figure S3C, supplementary).</p>
<p>Running TPP for each hallmark separately gave <b>134 hits</b> (about 13% of those screened) in at least one hallmark. Of these, <b>19</b> are hits in two hallmarks and none is a hit in all three (Figure S3D, supplementary).</p>`,
    why: `It delivers the headline output of the screens: 80 pan-hallmark hits (73 not linked to NSCLC before) and 134 hallmark-specific hits. The nine ASO candidates in the next section are chosen from the top-ranked hits.`,
    flags: [
      `What are the percentages out of? “∼8%” and “∼13% of those screened” are not tied to a total. Our arithmetic: 80 of 831 is about 9.6% and 134 of 831 about 16%, but 80 of 998 is about 8.0% and 134 of 998 about 13%. So the percentages fit the 998 start-site targets (the “candidates”), not the 831 lncRNAs. That is our inference; the paper does not say. Figure 4D’s library bar is labeled with yet another total, 1003. Keep this in mind for the funnel “831 → 80”: its first number counts lncRNAs, the second seems to count target regions.`,
      `Reading Figure 4D’s left bar: “cand hits: 80” counts the lncRNA hits only (73 novel plus 7 known lung cancer lncRNAs, our subtraction). The bar also counts controls that were called hits: 46 positive controls and 3 neutral controls. So 3 of the library’s 35 neutral controls were still called hits, which fits a lenient cutoff (FDR below 0.2).`,
      `The 134 and the bars: the three hallmark bars in Figure 4D show 50, 38 and 65 candidate hits, which add up to 153, more than 134. That is expected: the 19 hits found in two hallmarks are counted in two bars (134 + 19 = 153).`,
    ],
    prereqs: ['A2', 'E4', 'F2'],
    sources: ['res-pipeline-p2'],
    derived: ['9.6', '16', '1003', '7', '46', '35', '50', '38', '65', '153'],
    checks: [
      { q: `How many lncRNA hits did the pan-hallmark analysis find, and how many of them were not previously linked to NSCLC?`,
        options: [
          { t: `80 hits, of which 73 were not previously linked to NSCLC.`, ok: true, why: `Right. The paragraph says “80 lncRNA hits … of which 73 were not previously linked to NSCLC”.` },
          { t: `134 hits, of which 19 were not previously linked to NSCLC.`, ok: false, why: `134 and 19 belong to the hallmark-specific analysis: 134 hits in at least one hallmark, 19 of them in two hallmarks.` },
          { t: `80 hits, of which 7 were not previously linked to NSCLC.`, ok: false, why: `Reversed. It is 73 that were not previously linked; the other 7 (80 − 73) were already known lung cancer lncRNAs.` },
          { t: `831 hits, of which 80 were not previously linked to NSCLC.`, ok: false, why: `831 is the number of lncRNAs in the target set, not the number of hits.` },
        ], source: ['res-integration-p2'] },
      { q: `How do the 80 and the 134 hits differ?`,
        options: [
          { t: `The 80 come from running TPP on all screens together (pan-hallmark); the 134 come from running it for each hallmark separately and counting hits in at least one hallmark.`, ok: true, why: `Right. They are two different TPP analyses.` },
          { t: `The 80 were validated with ASOs; the 134 were not.`, ok: false, why: `Neither number comes from ASO validation. Both come from TPP analyses of the screens.` },
          { t: `The 80 are hits in A549 and the 134 are hits in H460.`, ok: false, why: `The split is by type of analysis (all screens together versus single hallmarks), not by cell line.` },
          { t: `The 134 are the 80 plus 54 control genes.`, ok: false, why: `The paper does not describe the 134 that way. Both numbers count lncRNA hits, and controls are counted separately in Figure 4D.` },
        ], source: ['res-integration-p2'] },
    ],
  },

  'res-integration-p3': {
    plain: `<p>Earlier CRISPR screens found that lncRNAs needed for cell growth tend to act in some cell types only (“highly cell-type-specific”). The authors saw the same. When they compared the hits of the ordinary dropout screens in A549 and in H460 cells, the overlap was low: a lncRNA that scored in one cell line usually did not score in the other (Figure 4E, left). <i>Where to look: Figure 4E (left). Each dot is a hit placed by its log2 fold change in A549 (x axis) and in H460 (y axis). The two arrows show the middle of each group and point in different directions: A549 hits and H460 hits are mostly different lncRNAs.</i></p>
<p>The pan-hallmark hits are different: they are active in both cell types, so they depend much less on the “cell background” (Figure 4E, right). <i>Where to look: Figure 4E (right). The cloud of dots and its arrow sit below zero on both axes.</i> The authors conclude that combining several screens and several cell lines is a useful strategy for finding therapeutic targets.</p>`,
    why: `This paragraph explains why the authors use several cell lines and integrate screens: if a hit works in only one cell line, a single-line screen can mislead. The pan-hallmark list is meant to avoid that.`,
    memory: `Analogy: a band that sells out in its home town but plays to empty halls elsewhere is a poor bet for a world tour. You want acts that fill every city; here the cities are the two cell lines.`,
    flags: [
      `“Low” or “significant” concordance? For the same A549 versus H460 dropout comparison, the paper earlier says “There was a significant concordance among identified targets” (<a href="#/g/res-multipheno/res-multipheno-p6">Figure 2H</a>). Here it calls the concordance “low”. Both can be true: some overlap beyond chance, but most hits are cell-line-specific. The paragraph gives no statistic for “low”.`,
      `Count check: the key of Figure 4E lists A549 dropout hits (n=72), H460 dropout hits (n=58) and “A549+H460 hits (n=5)”. The text earlier says 77 lncRNAs were needed for proliferation of A549 cells. Since 72 + 5 = 77, the key’s groups seem to be “A549 only”, “H460 only” and “both”; the key does not say so.`,
      `Some activity in both lines is expected by construction: the pan-hallmark hits are built from the screens of both cell lines. The figure shows that this list is much less line-specific than single-screen hit lists, which is the paper’s point, but the paragraph gives no statistic.`,
    ],
    prereqs: ['C4', 'E2', 'F2'],
    sources: ['res-multipheno-p4'],
    derived: ['72', '58', '5'],
    checks: [
      { q: `What contrast does Figure 4E draw?`,
        options: [
          { t: `Dropout hits from A549 and H460 mostly do not overlap, but the pan-hallmark hits are active in both cell lines.`, ok: true, why: `Right. This is why the authors favor combining several screens and cell lines.` },
          { t: `Dropout hits are shared by both cell lines, but pan-hallmark hits work in only one.`, ok: false, why: `That is the reverse of the paragraph.` },
          { t: `Pan-hallmark hits come only from the cisplatin screens.`, ok: false, why: `Pan-hallmark analysis integrates all the screens, not only the cisplatin ones.` },
          { t: `Both kinds of hits are active in both cell lines, so the cell line does not matter.`, ok: false, why: `The paragraph says dropout hits show a low degree of concordance, so for them the cell line does matter.` },
        ], source: ['res-integration-p3'] },
    ],
  },

  'res-integration-p4': {
    plain: `<p>The authors now look for extra clues, separate from the screens, that the hit lncRNAs really promote cancer. The logic: a lncRNA that helps cancer grow should be turned up (<b>upregulated</b>) in tumors.</p>
<p>First, in lung tumors that carry a KRAS mutation, the pan-hallmark hits are expressed at significantly higher levels than the other screened lncRNAs, the “non-hits” (Figure 4F). <i>Where to look: Figure 4F. Compare the two violins, “Hits” and “Non-hits”; the hits sit a little higher.</i> Second, the hits are also upregulated in tumors compared with the tissue next to the tumor (Figure 4G). <i>Where to look: Figure 4G. Four violins: hits and non-hits, in non-tumor and tumor samples, with P labels above them.</i></p>
<p>Third, the hits tend to lie in DNA regions that are <b>amplified</b> (extra copies), but not in regions that are lost, in tumors (Figures 4H and S3E) and in cell lines (Figure S3F). <i>Where to look: Figure 4H. Compare the green “Amplified” slice of the “Candidate Hits” bar with the same slice of the “Candidate Non-hits” bar. The labels give P = 0.0011 for amplified and P = 0.14 for deleted.</i></p>`,
    why: `These are independent clues from patient tumor data and DNA copy-number data, not from the screens, that the hits behave like cancer-promoting genes. If the hits were random lncRNAs, these patterns would not be expected.`,
    flags: [
      `“amplified, but not depleted”: “depleted” here means DNA regions lost in tumors (the key in Figure 4H says “Deleted”), not “depleted guides” as in a dropout screen. The claim rests on the two P labels: 0.0011 for “Amplified” and 0.14 for “Deleted”.`,
      `Different data sets: Figure 4F uses KRAS-mutant lung adenocarcinoma samples from TCGA (n = 101), Figure 4G another cohort (87 tumor, 77 normal), and Figure 4H a pan-cancer collection (PCAWG), not only lung tumors. The text says “adjacent tissue”, the legend of 4G says “healthy tissues”, and the Methods say “adjacent normal tissue samples”.`,
      `The legends give the number of samples but not what each point in a violin is (a lncRNA, or a lncRNA in one patient). That affects how much weight very small P values deserve.`,
    ],
    prereqs: ['C2', 'C6', 'F1'],
    sources: ['fig4F', 'fig4G', 'm-public-rnaseq-p1'],
    derived: ['0.0011', '0.14'],
    checks: [
      { q: `Why do the authors check whether the hit lncRNAs are more highly expressed in tumors?`,
        options: [
          { t: `A lncRNA that promotes cancer is expected to be upregulated in tumors, so higher expression is an independent clue that the hits really are cancer-promoting.`, ok: true, why: `Right. The paragraph calls these “additional lines of evidence” that do not depend on the screens.` },
          { t: `Because lncRNAs are only made in tumors and never in normal tissue.`, ok: false, why: `The claim is only that cancer-promoting lncRNAs are expected to be higher in tumors. Figure 4G also shows expression in non-tumor tissue.` },
          { t: `Because high expression proves that the lncRNA causes the cancer.`, ok: false, why: `Expression is a supporting clue, not proof of cause.` },
          { t: `Because the screens measured RNA levels directly in tumors.`, ok: false, why: `The screens counted guides in cultured cells. The tumor data come from separate patient cohorts.` },
        ], source: ['res-integration-p4'] },
    ],
  },

  'res-integration-p5': {
    plain: `<p>In summary, the authors say that integrating the different screens gives <b>accurate maps</b> of functional lncRNAs. The hits are enriched for meaningful clinical features (such as higher expression in tumors and amplification), and they are active whichever cell line you look in (“cell background-independent activity”).</p>`,
    why: `It closes the section and hands the 80 hits on to the ASO work in the next section.`,
    flags: [
      `“Accurate” is a strong word. The evidence in this section is better recovery of controls, activity in two cell lines, and enrichment for tumor-expression and copy-number patterns. The cutoff for hits is a lenient FDR below 0.2 (about one hit in five could be a false alarm), and the Summary calls the same 80 “high-confidence oncogenic lncRNAs”. The Limitations admit that the study “is clearly not comprehensive”.`,
    ],
    prereqs: ['A2', 'E5'],
    sources: ['res-integration-p2', 'summary-p1', 'limitations-p2'],
    checks: [
      { q: `Which two properties of the integrated hit list does this summary highlight?`,
        options: [
          { t: `Enrichment for meaningful clinical features (such as higher expression in tumors) and activity that does not depend on the cell line.`, ok: true, why: `Right. These are the two points the paragraph names.` },
          { t: `No false positives and perfect recovery of every control.`, ok: false, why: `The paper claims better recovery of controls, not perfect recovery, and a lenient FDR cutoff means some false alarms are expected.` },
          { t: `Low toxicity and high knockdown potency.`, ok: false, why: `Those describe ASOs, which are tested in the next section.` },
          { t: `Activity in only one cell line, which makes the hits specific.`, ok: false, why: `The opposite: the paragraph claims cell background-independent activity.` },
        ], source: ['res-integration-p5'] },
    ],
  },

});

window.TRACKG.units['res-integration'] = {
  intro: `<p>Up to here each screen was read on its own. This section asks: <b>how can three hallmarks, two cell lines and two kinds of screen be merged into one ranking you can trust, and do the top hits look like cancer-promoting genes?</b> The authors build the TPP pipeline, report 80 pan-hallmark hits (and 134 hallmark-specific hits), show that pan-hallmark hits work in both cell lines, and check them against tumor expression and DNA copy-number data.</p>`,
  recap: `<p>TPP merges effect size and significance across screens into one ranking, and the pan-hallmark version recovers positive and neutral controls better than individual screens. It gives 80 pan-hallmark hits (73 not linked to NSCLC before) and 134 hallmark-specific hits. Pan-hallmark hits work in both A549 and H460, are expressed more highly in tumors, and tend to be amplified, which supports a cancer-promoting role.</p>`,
};

/* ======================================================================================= res-aso */
Object.assign(window.TRACKG.paras, {

  'res-aso-p1': {
    plain: `<p>The authors say the multi-hallmark maps are a resource of targets for therapeutic <b>ASOs</b> (short strands made to silence one chosen RNA). To pick targets, they <b>manually</b> selected <b>nine</b> lncRNAs from the top-ranked hits. Their criteria were novelty and a lack of protein-coding evidence. They call these nine <b>“Tier 1”</b>. Seven are annotated by GENCODE, and two by either FANTOM CAT or BIGTranscriptome (Table S2, supplementary).</p>
<p>For each candidate they designed a series of ASOs. They managed to find <b>at least two independent ASOs</b> with a knockdown potency of at least 40% (Figure S4A, supplementary). Knockdown potency means how much the ASO lowers its target RNA.</p>`,
    why: `This is where the funnel narrows from the screen’s hits to nine ASO candidates (Tier 1). The choice is partly manual and uses novelty, not only statistics. Requiring two independent ASOs per target sets up the on-target test in the next paragraph.`,
    flags: [
      `How many hits were the nine chosen from? The paragraph says only “top-ranked hits”. The funnel 831 → 80 → 9 → 5 → 2 reads them as coming from the 80 pan-hallmark hits, but this paragraph does not say so. Because the choice was manual, the nine are also not simply the nine best-scoring hits.`,
      `“A series of ASOs” is not counted here; the Methods say 3 to 5 ASOs were designed per target. The “≥40%” bar is modest: it allows up to 60% of the RNA to remain (our arithmetic).`,
    ],
    prereqs: ['A2', 'B7', 'D6'],
    sources: ['res-pipeline-p2', 'res-integration-p2', 'res-aso-p2', 'm-aso-p1'],
    derived: ['60'],
    checks: [
      { q: `How were the nine Tier 1 lncRNAs chosen?`,
        options: [
          { t: `Manually, from top-ranked hits, using novelty and a lack of protein-coding evidence as criteria.`, ok: true, why: `Right. That is exactly how the paragraph describes the selection.` },
          { t: `Automatically: they were simply the nine hits with the smallest FDR.`, ok: false, why: `The paragraph says the selection was manual and used novelty and lack of protein-coding evidence, not only statistics.` },
          { t: `They were the nine lncRNAs with the strongest effects in normal lung cells.`, ok: false, why: `Normal lung cells are tested later, on the Tier 2 ASOs.` },
          { t: `They were the nine lncRNAs already known to drive lung cancer.`, ok: false, why: `Novelty was a criterion: the authors wanted lncRNAs that had not been studied before.` },
        ], source: ['res-aso-p1'] },
    ],
  },

  'res-aso-p2': {
    plain: `<p>Next the authors tested what the ASOs do to cells: do they slow growth (proliferation) or change sensitivity to cisplatin? <i>Where to look: Figure 5A (the heat map). Each row is a lncRNA, each column is an ASO in one cell line, and blue means fewer living cells than with a control ASO. The darker the blue, the stronger the effect.</i></p>
<p>For <b>five</b> lncRNAs, called <b>Tier 2</b>, the loss of cell proliferation was reproducible with <b>two distinct ASO sequences</b>. The authors say this indicates <b>on-target activity</b>: the effect comes from silencing the intended RNA and not from a quirk of one ASO.</p>
<p>To see how widely this holds, they retested the ASOs in two other KRAS+ NSCLC cell lines, H460 and H441 (H441 comes from a metastasis found in a pericardial effusion), and saw similar results (Figure 5A, the H460 and H441 columns).</p>
<p>The Tier 2 genes are also turned up when cells are treated with cisplatin, which fits their effects on cisplatin sensitivity (Figure S4B, supplementary). Finally, in data from The Cancer Genome Atlas (TCGA) the Tier 2 lncRNAs are overexpressed in NSCLC tumors, even though that was not a criterion for choosing them (Figure 5B). <i>Where to look: Figure 5B. For each lncRNA compare the green “LUAD” (tumor) bar with the gray “Normal” bar. Four stars means a P value below 0.0001 (from the legend).</i></p>`,
    why: `This is the second narrowing step (nine to five). ASOs are a different tool from the CRISPR deletion, so getting the same effect with two distinct ASO sequences in several cell lines is a stricter test of whether a lncRNA’s RNA is really needed.`,
    memory: `Analogy: two independent witnesses who tell the same story. It is unlikely that both made the same mistake. In the same way, two different ASO sequences giving the same effect make it unlikely that the effect is an accident of one sequence.`,
    flags: [
      `“For five lncRNAs (Tier 2)” does not say that the five come from the nine. The nested Tier brackets at the left of Figure 5A show it: Tier 1 covers nine rows, Tier 2 the first five rows, Tier 3 the first two.`,
      `Look-alike counts: here five of the nine candidates give a reproducible effect with two ASOs. The Limitations report “8/12 (67%) lncRNA hits” validated with ASOs (“9 for proliferation/cisplatin, 3 for migration”). The paper does not show how the 8 are made up, so do not assume the two ratios measure the same thing.`,
      `“overexpressed in NSCLC tumors”: the Figure 5B legend covers lung adenocarcinoma (LUAD) only (513 tumor and 59 normal samples) and only four of the five lncRNAs: “Data were not available for candidate 215 in the TCGA dataset.”`,
    ],
    prereqs: ['C3', 'C4', 'D6', 'F2'],
    sources: ['res-aso-p1', 'res-aso-p3', 'limitations-p1', 'fig5B'],
    checks: [
      { q: `Why did the authors require two distinct ASO sequences to give the same loss of proliferation?`,
        options: [
          { t: `If two different sequences give the same effect, it is unlikely to be an accident of one ASO, so it points to the intended target (on-target activity).`, ok: true, why: `Right. Agreement between independent sequences is the logic behind “indicating on-target activity”.` },
          { t: `Two ASOs are twice as strong as one, so the effect is easier to measure.`, ok: false, why: `Strength is not the point. The logic is agreement between independent sequences.` },
          { t: `Because one ASO would be destroyed by cisplatin.`, ok: false, why: `Nothing in the paragraph suggests this. Cisplatin sensitivity is tested separately.` },
          { t: `To measure toxicity in normal cells.`, ok: false, why: `Normal cells are tested in the next paragraph, as a separate step.` },
        ], source: ['res-aso-p2'] },
    ],
  },

  'res-aso-p3': {
    plain: `<p>It has been suggested that targeting lncRNAs might cause fewer side effects in healthy tissue, but few studies have tested this. So the authors tested the Tier 2 ASOs on a panel of <b>non-transformed</b> (non-cancerous) lung-derived cells: HBEC3-KT and MRC5-CV1 (both <b>immortalized</b>, meaning modified to keep dividing in the lab) and CCD-12Lu (<b>primary</b>, taken straight from tissue). These cells showed a weaker response or none, especially for the first two lncRNAs. <i>Where to look: Figure 5A. Compare the pale “Normal” columns on the right with the blue cancer-cell columns, and look at the top two rows, CHiLL1 and GCAWKR.</i></p>
<p>Because of this, the authors narrowed their focus to these <b>Tier 3</b> lncRNAs: candidate 42 (ENSG00000253616), renamed <b>CHiLL1</b> (Cancer Hallmark in Lung LncRNA 1), and candidate 240 (ENSG00000272808), called <b>GCAWKR</b>. Both have low protein-coding potential (Figure S4D, supplementary).</p>
<p>They then repeated the work. Knockdown strength and effects on cells were confirmed with the CRISPR deletion using several pgRNAs (Figure S3B, supplementary) and, “more importantly” in their words, with two independent ASOs for each gene (Figure 5C, and Figures S4C and S4E, supplementary). <i>Where to look: Figure 5C. Growth curves of A549 cells with each ASO, with and without cisplatin, compared with a control ASO.</i> The ASOs were also active in additional KRAS+ and EGFR-mutant cell lines, which the authors take to suggest activity that does not depend on the tumor subtype (Figure S4F, supplementary).</p>
<p>One result went the other way. Putting extra copies of CHiLL1 or GCAWKR back (overexpression) could not rescue the cells from the ASO effects (Figure S5C, supplementary). The authors offer two possible explanations. It may be due to <b>cis</b>-regulatory mechanisms (effects on neighboring genes), although they saw no such effect for CHiLL1’s nearest neighbor, <i>TNFRSF10B</i> (Figure S5B, supplementary). Or these loci may act through functional transcript isoforms that are not annotated and were not tested.</p>`,
    why: `This is the pivotal paragraph of the funnel. Testing normal lung cells separates targets that hurt only cancer cells from those that hurt every cell, and the replication experiments (plus the failed rescue) set how confident we can be about CHiLL1 and GCAWKR.`,
    memory: `Analogy: a talent show. From many auditions (831 lncRNAs) a first cut leaves 80, the producers hand-pick nine, a callback keeps five (two ASOs agree), and the final keeps two (they spare the healthy cells).`,
    flags: [
      `Names printed differently (kept as printed): this paragraph says “CCD-12Lu”, while Figure 5A and the Methods say CCD-16Lu. The Summary writes “Cancer Hallmarks in Lung LncRNA 1” and this paragraph “Cancer Hallmark in Lung LncRNA 1”. In the Methods the line called “MRC5-CV1” here appears as “Mrc5-SV1” and “MRC-5”. These look like the same cell lines and the same gene, but the paper does not say so.`,
      `Dose: the Methods give 25 nM for A549, H460, H441 and MRC5-CV1 but 10 nM for HBEC3-KT and CCD-16LU. So two of the three normal lines were tested at a lower dose, which the Results do not mention. The “diminished or absent response” could partly reflect that; the paper does not discuss it.`,
      `Rescue: “overexpression of neither CHiLL1 nor GCAWKR could rescue ASO-induced phenotypes”. A rescue is the classic test that an ASO effect is on-target, so a failed rescue weakens that argument. Both explanations offered are untested here; the on-target case rests on the two independent ASOs and the CRISPR-del data. In your PDF only Figures 5A and 5C can be checked for this paragraph; the other claims rest on supplementary figures.`,
    ],
    prereqs: ['B6', 'C4', 'D6', 'D9'],
    sources: ['m-aso-p1'],
    checks: [
      { q: `Which result led the authors to focus on CHiLL1 and GCAWKR (Tier 3) rather than all five Tier 2 lncRNAs?`,
        options: [
          { t: `Non-cancerous lung cells showed a diminished or absent response to the ASOs, especially for these two lncRNAs.`, ok: true, why: `Right. This is the step that narrows Tier 2 to Tier 3 (“Consequently, we narrowed our focus”).` },
          { t: `They were the only two for which overexpression rescued the ASO effect.`, ok: false, why: `The opposite: overexpression of neither CHiLL1 nor GCAWKR could rescue the ASO-induced phenotypes.` },
          { t: `They were the only two with at least two ASOs reaching ≥40% knockdown.`, ok: false, why: `All nine Tier 1 candidates already met that criterion (first paragraph of this section).` },
          { t: `They were the two lncRNAs most highly expressed in tumors.`, ok: false, why: `Tumor expression was described as not being a selection criterion (second paragraph of this section).` },
        ], source: ['res-aso-p3', 'res-aso-p1', 'res-aso-p2'] },
      { q: `Why did the authors test the Tier 2 ASOs on non-transformed lung cells?`,
        options: [
          { t: `To see whether the ASOs spare healthy cells: a medicine should hurt cancer cells more than normal ones.`, ok: true, why: `Right. The paragraph opens with the idea that targeting lncRNAs might cause fewer side effects in healthy tissue.` },
          { t: `To prove that the ASOs have no effect on any cell type.`, ok: false, why: `The aim is a smaller effect in normal cells. The paper reports a “diminished or absent” response, and cancer cells are expected to respond.` },
          { t: `To provide the positive control for the ASO effect.`, ok: false, why: `In Figure 5A the positive control is MALAT1 (see the legend), not normal cells.` },
          { t: `To check which isoform of each lncRNA is expressed.`, ok: false, why: `Isoforms are shown with the gene maps (Figure 5D), not with normal cells.` },
        ], source: ['res-aso-p3', 'fig5A'] },
    ],
  },

  'res-aso-p4': {
    plain: `<p>To the authors’ knowledge, CHiLL1 had never before been linked to cancer. It lies on chromosome 8 and has <b>two annotated isoforms</b> that share the first exon (Figure 5D, top panel). <i>Where to look: Figure 5D (top). Two rows of exons; the shared first exon is at the TSS end, where the arrow is.</i></p>
<p>The GENCODE catalog may start the gene slightly downstream of its true TSS, according to various transcriptome evidence. But the true start falls inside the region targeted by the CRISPR deletion, so it is unlikely to have affected the screening result (Figure S5A, supplementary).</p>
<p>CHiLL1 sits upstream of, and on the same strand as, the protein-coding gene <i>TNFRSF10B</i>, which has been linked to NSCLC before. The authors find no evidence for <b>readthrough</b> (one long RNA running from one gene into the next) between the two loci, based on annotated ESTs (Figure S5A) and RT-PCR (Figure S5B), both supplementary. Finally, they say that high CHiLL1 expression goes with poor overall survival, which supports its relevance (Figure S4G, supplementary).</p>`,
    why: `It introduces CHiLL1 and checks two ways the screen result could mislead: the annotated start might be wrong, and CHiLL1 might merely be part of its protein-coding neighbor’s transcript (presumably the reason for the readthrough check).`,
    flags: [
      `In your PDF only the gene map (Figure 5D, top) can be checked for this paragraph. The start-site point (S5A), the readthrough checks (S5A, S5B) and the survival link (S4G) rest on supplementary figures. The survival link is a correlation, not proof that CHiLL1 drives outcome.`,
    ],
    prereqs: ['B4', 'B7', 'C6', 'F3'],
    checks: [
      { q: `Why does the paragraph discuss a possible mismatch between the GENCODE start and the true TSS of CHiLL1?`,
        options: [
          { t: `To show that the true start still lies inside the region deleted by CRISPR-del, so the screening result is unlikely to be affected.`, ok: true, why: `Right. The paragraph says the true start “falls within the region targeted by CRISPR-del”.` },
          { t: `To argue that CHiLL1 has more than two isoforms.`, ok: false, why: `The paragraph says two annotated isoforms that share the first exon. The TSS comment is about where the gene starts.` },
          { t: `To explain why the ASOs worked poorly.`, ok: false, why: `ASO results are not discussed in this paragraph.` },
          { t: `To show that CHiLL1 is protein-coding.`, ok: false, why: `Its protein-coding potential was described as low in the previous paragraph.` },
        ], source: ['res-aso-p4'] },
    ],
  },

  'res-aso-p5': {
    plain: `<p>GCAWKR lies on Chr15 and has <b>four isoforms</b> that share a common TSS (Figure 5D, bottom panel). The authors say this shared start is supported by several kinds of evidence, including full-length long-read sequencing (Figure S5D, supplementary).</p>
<p>It has been associated with poor prognosis in colon cancer and, while this paper was being prepared, was reported to be an oncogene in gastric cancer. It has a likely <b>ortholog</b> in mouse (the matching gene in another species), a gene called <i>Gm44753</i> that has not been characterized (Figure S5H, supplementary). Unlike CHiLL1, the GCAWKR locus is frequently amplified in cancer genomes (Figure S5F, supplementary).</p>
<p>In TCGA samples, GCAWKR expression is higher in the <b>proximal inflammatory (PI)</b> tumor subtype, which goes with a poorer prognosis. The paper gives <b>p = 4 × 10<sup>−5</sup></b> for PI versus PP and <b>p = 0.008</b> for PI versus TRU (Figures S4H and S4I, supplementary).</p>`,
    why: `It introduces GCAWKR with the same kind of background as CHiLL1 (isoforms, literature, ortholog, amplification, tumor subtype) and contrasts the two. They will later turn out to act in different ways.`,
    flags: [
      `“four isoforms sharing a common TSS”: the GENCODE track in Figure 5D (bottom) draws more than four transcript lines, with labels such as RP11-66B24.2 and RP11-66B24.7. The paper does not say which lines it counts as the four isoforms.`,
      `The p values for PI versus PP and PI versus TRU come from supplementary figures. The paragraph does not name the test or say whether they are adjusted for several comparisons. “PP” and “TRU” are not spelled out here (lesson C6 explains the tumor subtype labels).`,
      `Two sentences report other studies, not this paper’s data: poor prognosis in colon cancer, and an oncogene report in gastric cancer. The name GCAWKR was already used in the cited <a href="#/refs/68">gastric cancer paper</a>; only CHiLL1 is described as renamed here.`,
    ],
    prereqs: ['B4', 'C2', 'C6', 'E2'],
    checks: [
      { q: `In this paragraph, how does GCAWKR differ from CHiLL1?`,
        options: [
          { t: `The GCAWKR locus is frequently amplified in cancer genomes, in contrast to CHiLL1’s.`, ok: true, why: `Right. The paragraph says “In contrast to CHiLL1, the locus of GCAWKR is frequently amplified in cancer genomes”.` },
          { t: `GCAWKR has never been linked to cancer, while CHiLL1 has.`, ok: false, why: `Reversed. CHiLL1 is described as never previously implicated in cancer; GCAWKR is linked to colon cancer and gastric cancer.` },
          { t: `GCAWKR has no ortholog in mouse.`, ok: false, why: `The paragraph says it has a likely mouse ortholog, Gm44753.` },
          { t: `GCAWKR has a single isoform.`, ok: false, why: `The paragraph says four isoforms that share a common TSS.` },
        ], source: ['res-aso-p5'] },
    ],
  },

  'res-aso-p6': {
    plain: `<p>The authors say that 3D lab models are a more faithful tumor model than flat (monolayer) cultures. So they delivered the CHiLL1 and GCAWKR ASOs to <b>spheroid</b> cultures (ball-shaped clusters of cells) of H441 cells. They saw a reduction in viability that approaches the reduction with the <b>positive control</b>, an ASO against <b>mTOR</b> (Figures 5E and S4J). <i>Where to look: Figure 5E. In the bar chart compare the CHiLL1 and GCAWKR bars with the mTOR bar; the photos at the right show the spheroids. Figure S4J is supplementary.</i></p>`,
    why: `Tests the ASOs in a more tumor-like 3D model than flat culture: an effect that holds up here is more convincing for a therapy.`,
    flags: [
      `“approaching that of the positive control”: in Figure 5E the CHiLL1 bar is about as low as the mTOR bar, while the GCAWKR bar is clearly higher, so the phrase fits CHiLL1 better. The bars show ASO1 only (“CHiLL1 ASO1”, “GCAWKR ASO1”); the photos are labeled ASO2.`,
      `The legend names a one-tailed Student’s t test with n = 4. Figure S4J is also cited in the Methods for a different purpose (checking that ASOs enter cells), so the supplementary labels may not line up.`,
    ],
    prereqs: ['C5', 'D8', 'F1'],
    sources: ['fig5E'],
    checks: [
      { q: `Why did the authors test the ASOs in spheroids after testing them in flat cultures?`,
        options: [
          { t: `3D models represent a more faithful tumor model than monolayer cultures, so an effect that holds up there is more convincing.`, ok: true, why: `Right. This is the reason given in the first sentence of the paragraph.` },
          { t: `Spheroids do not need ASO delivery, which makes the test simpler.`, ok: false, why: `The authors delivered the ASOs to the spheroid cultures. Nothing says delivery was unnecessary.` },
          { t: `Because H441 cells cannot grow in flat dishes.`, ok: false, why: `H441 cells were already used in flat cultures earlier in this section.` },
          { t: `To measure toxicity in normal cells.`, ok: false, why: `Toxicity was tested with non-transformed lung cells, earlier in this section.` },
        ], source: ['res-aso-p6', 'res-aso-p2', 'res-aso-p3'] },
    ],
  },

  'res-aso-p7': {
    plain: `<p>The authors state that organoids grown from patient-derived xenografts (PDXs: patient tumor tissue grown in mice) recapitulate (reproduce) the therapy response of individual patients. They delivered <b>CHiLL1</b> ASOs to <b>BE874</b> organoids (a KRAS+ human NSCLC model) and report a significant reduction in cell viability (Figure 5F). <i>Where to look: Figure 5F. Gray bars are the control ASO and green outlined bars the CHiLL1 ASO, for four independent replicates; look at the P label above each pair.</i></p>`,
    why: `Moves closer to patients: organoids from a patient’s tumor (through a PDX). Only CHiLL1 is tested here.`,
    flags: [
      `Only CHiLL1 is tested in organoids here; GCAWKR is not.`,
      `In Figure 5F one of the four independent replicates is labeled “ns” (not significant) and the other three carry P labels, but the paragraph just says “significant reduction”. The legend says the organoids come from “a single KRAS+ patient-derived xenograft”: one patient’s tumor.`,
      `The first sentence is a general claim backed by a citation to earlier work (the <a href="#/refs/74">cited paper’s</a> title is about breast cancer organoids), not by this paper’s data.`,
    ],
    prereqs: ['C5', 'D8'],
    checks: [
      { q: `What does Figure 5F test, and in which model?`,
        options: [
          { t: `The effect of CHiLL1 ASOs on the viability of organoids from a KRAS+ patient-derived xenograft (BE874).`, ok: true, why: `Right. The paragraph reports CHiLL1 ASOs on BE874 organoids.` },
          { t: `The effect of GCAWKR ASOs on normal lung organoids.`, ok: false, why: `The paragraph reports CHiLL1 ASOs and KRAS+ NSCLC (cancer) organoids.` },
          { t: `The effect of a CHiLL1/GCAWKR cocktail on spheroids.`, ok: false, why: `Cocktails are tested in the next paragraph, in A549 cells (Figure 5G).` },
          { t: `The effect of CHiLL1 ASOs given to mice that carry the xenograft.`, ok: false, why: `The ASOs were delivered to organoids grown in the lab, not to mice.` },
        ], source: ['res-aso-p7', 'm-viability-3d-p3'] },
    ],
  },

  'res-aso-p8': {
    plain: `<p>The authors wondered whether hitting two or more different weak spots at once, with <b>cocktails</b> of ASOs, would give <b>synergistic</b> benefits (a combined effect bigger than expected from each alone). A 50:50 mix of the CHiLL1 and GCAWKR ASOs (the <b>Tier 3 cocktail</b>) reduced cell viability more than an equal dose of either ASO alone (Figures 5G and S4K). A five-ASO cocktail for the Tier 2 lncRNAs gave a similar benefit (Figure 5G). <i>Where to look: Figure 5G. These are growth curves of A549 cells: the lowest curve is the Tier 3 cocktail. The legend says the total amount of ASO was the same (25 nM) in every condition.</i></p>
<p>Interestingly, the cocktails added no toxicity for non-cancerous cells (Figure S4L, supplementary). The authors suggest that cocktails might be a strategy for more potency at no cost of toxicity.</p>`,
    why: `Tests the idea of combining ASOs. The mechanism section later explains why it can work: CHiLL1 and GCAWKR act through different gene networks. The cocktail idea returns in the Discussion as a possible personalized therapy.`,
    flags: [
      `“synergistic” versus the evidence: the comparison is “a greater effect … compared with an equal dose of either ASO alone”. Beating each ASO alone is a combined benefit, but not by itself proof that the effect is more than additive. The same result is later called an “additive effect” (<a href="#/g/res-mechanism/res-mechanism-p7">mechanism section</a>) and “greater than additive” (<a href="#/g/discussion/discussion-p6">Discussion</a>).`,
      `Equal total dose means a smaller dose of each ASO in a cocktail. The legend says the total ASO amount did not vary (25 nM) and cocktails had equal proportions, so (our arithmetic) each ASO in the two-ASO mix is at half the dose it had alone (12.5 nM), and in the five-ASO mix at 5 nM.`,
      `In the main text only the Tier 3 cocktail comparisons carry P labels in Figure 5G; the five-ASO cocktail has none, so its “similar benefit” is a visual impression. The “no additional toxicity” claim rests on a supplementary figure (S4L), and the paragraph does not say which non-cancerous cells were used.`,
    ],
    prereqs: ['D6', 'F1'],
    sources: ['fig5G', 'res-mechanism-p7', 'discussion-p6'],
    derived: ['12.5', '5'],
    checks: [
      { q: `In the cocktail experiments the total amount of ASO was kept the same as in the single-ASO experiments. Why?`,
        options: [
          { t: `So that a stronger effect of the cocktail cannot be explained simply by giving more ASO.`, ok: true, why: `Right. At equal total dose, a better result suggests the two ASOs complement each other.` },
          { t: `Because more ASO would have been toxic to normal cells.`, ok: false, why: `Toxicity in non-cancerous cells was assessed separately (Figure S4L, supplementary). The equal dose is about a fair comparison.` },
          { t: `Because the ASOs only work at one particular dose.`, ok: false, why: `Nothing in the paper says that. The aim is a fair comparison.` },
          { t: `So that each ASO in a cocktail is as concentrated as when used alone.`, ok: false, why: `With equal total amount and equal proportions, each ASO in a cocktail is present at a smaller share than when used alone.` },
        ], source: ['res-aso-p8', 'fig5G'] },
    ],
  },

  'res-aso-p9': {
    plain: `<p>The last question: what fraction of patients might benefit from ASO treatment? The authors looked at RNA-seq data from TCGA tumors. They say <b>78%</b> of the tumors express at least one of CHiLL1 and GCAWKR, so they might be treated with the Tier 3 cocktail. For Tier 2 (the five lncRNAs) the share rises to <b>92%</b>. <i>Where to look: Figure 5H. Each column is one patient and each row is one lncRNA; a colored cell means the lncRNA is expressed. The two long bars at the bottom show the share of patients with at least one lncRNA from each cocktail (78% and 92%). The legend says the samples are KRAS+ lung adenocarcinoma tumors (n = 101) and that “expressed” means more than 0.5 FPKM.</i></p>`,
    why: `Turns “works in cells” into “how many patients might it apply to”: it estimates the size of the group of tumors that express the targets.`,
    memory: `Analogy: counting how many doors have a keyhole of the right shape tells you where a key could fit. It does not tell you that the key opens the door.`,
    flags: [
      `The paragraph says “TCGA tumors”; the Figure 5H legend says KRAS+ lung adenocarcinoma tumors (n = 101). The next paragraph then speaks of “the majority of NSCLC cases”.`,
      `“Express” is defined in the legend as more than 0.5 FPKM, a low bar. Expressing a lncRNA does not show that a tumor depends on it or would respond to the ASOs; the paragraph itself says “might be treated”.`,
      `The figure writes “Tier II” where the text writes “Tier 2”. They are the same group.`,
    ],
    prereqs: ['C2', 'C6', 'D10', 'F2'],
    sources: ['fig5H'],
    checks: [
      { q: `What does the 78% in this paragraph mean?`,
        options: [
          { t: `Of the TCGA tumors analyzed, 78% express at least one of CHiLL1 and GCAWKR.`, ok: true, why: `Right. It counts tumors that express the targets, which is the potential patient group.` },
          { t: `78% of treated patients responded to the Tier 3 cocktail.`, ok: false, why: `No patients were treated. The number comes from RNA-seq data of existing tumors.` },
          { t: `The ASOs lowered CHiLL1 and GCAWKR by 78%.`, ok: false, why: `Knockdown is measured in cells. This number counts tumors that express the targets.` },
          { t: `78% of the cell lines in the study were sensitive to the ASOs.`, ok: false, why: `The number comes from tumor expression data (TCGA), not from cell lines.` },
        ], source: ['res-aso-p9'] },
    ],
  },

  'res-aso-p10': {
    plain: `<p>The authors conclude that, taken together, the results demonstrate that the Tier 3 lncRNAs (CHiLL1 and GCAWKR) can be targeted by potent, low-toxicity ASOs. These ASOs may be beneficial alone or in combination for the majority of NSCLC cases (Figure 5H). <i>Where to look: Figure 5H is the only panel cited for “the majority”.</i></p>`,
    why: `This is the take-home claim of the whole ASO section. Read it as the statement to test against the evidence in the paragraphs above.`,
    flags: [
      `“demonstrate” is a strong word next to “might be treated” in the previous paragraph. The evidence is from cell lines, spheroids, organoids from one patient-derived xenograft, and an expression data set. The Discussion lists effective delivery in vivo as future work.`,
      `“the majority of NSCLC cases”: Figure 5H counts KRAS+ lung adenocarcinoma samples from TCGA (n = 101), a subset of NSCLC. A tumor that expresses a target is not the same as a tumor that would respond to the ASO.`,
    ],
    prereqs: ['A3', 'D6'],
    sources: ['res-aso-p9', 'fig5H', 'discussion-p5'],
    checks: [
      { q: `How strong is the evidence behind “potent and low-toxicity ASOs”, according to the paper itself?`,
        options: [
          { t: `It comes from cell lines, 3D cultures, organoids from one patient-derived xenograft, and expression data. The Discussion lists delivery in vivo as future work.`, ok: true, why: `Right. The Discussion says effective delivery in vivo still requires future efforts.` },
          { t: `It comes from treating tumor-bearing mice with the ASOs.`, ok: false, why: `No such experiment is reported. The Discussion lists delivery in vivo as future work.` },
          { t: `It comes from a clinical trial in NSCLC patients.`, ok: false, why: `No patients were treated. Figure 5H uses existing tumor expression data.` },
          { t: `It comes only from computer predictions.`, ok: false, why: `The ASO results come from experiments in cells, spheroids and organoids.` },
        ], source: ['res-aso-p10', 'discussion-p5', 'fig5F'] },
    ],
  },

});

window.TRACKG.units['res-aso'] = {
  intro: `<p>Finding genes that matter for cancer cells is only half of a drug-discovery story. This section asks: <b>can the best lncRNA hits be switched off with ASOs, the tool closest to an RNA medicine, without harming normal cells?</b> It follows the funnel 831 → 80 → 9 → 5 → 2. From the top-ranked hits the authors pick nine ASO candidates (Tier 1), five of them (Tier 2) give a reproducible effect, and two (Tier 3), CHiLL1 and GCAWKR, also spare normal lung cells. The section then tests the two in flat cultures, 3D spheroids and patient-derived organoids, tries ASO cocktails, and asks what share of patients’ tumors express the targets.</p>`,
  recap: `<p>Of nine ASO candidates (Tier 1), five (Tier 2) slowed cell proliferation reproducibly with two different ASOs, and two (Tier 3), CHiLL1 and GCAWKR, also had a weaker effect on normal lung cells. ASOs against them reduced viability in flat cultures and 3D spheroids, CHiLL1 also in patient-derived organoids, and a CHiLL1/GCAWKR cocktail beat either ASO alone at the same total dose. The authors estimate that 78% of the TCGA tumors analyzed (92% for Tier 2) express at least one target; all of this is laboratory evidence, and the Discussion lists delivery in living animals as future work.</p>`,
};
