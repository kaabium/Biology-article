/* Track G study layer · file trackg-2 · units res-validation, res-integration, res-aso
   Notes for reviewers
   - Numbers that are printed only inside a figure image (not in the paragraph text or in a legend) are listed in `derived`.
     They were read from the panel images by eye. The panel id is also listed in `sources` where useful, so they can be
     re-checked automatically once the FIGTEXT files exist.
   - Ratios and unit conversions that we computed ourselves (for example 80/998) are labeled as ours in the text and listed in `derived`.
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
      `The numbers for candidate 509 are not tied to one screen. The paragraph says “in both proliferation and cisplatin” and then gives a single A549 log2 fold change and FDR, without saying which screen they come from.`,
      `Both candidates were chosen because they ranked at the top. A successful re-test of top hits shows that the screen can find real effects, but it does not tell you how often an average hit holds up. For an overall rate, see the <a href="#/g/limitations/limitations-p1">Limitations</a>: 8/12 (67%) of hits validated with ASOs.`,
    ],
    prereqs: ['A5', 'E2', 'D11', 'E10'],
    sources: ['limitations-p1'],
    derived: ['3.5', '2.2'],
    checks: [
      { q: `In the dropout screens, candidate 205 had a log2 fold change of −1.81. What does a negative value like this tell you?`,
        options: [
          { t: `The guides for this target became rarer over the screen, so cells missing the region grew worse.`, ok: true, why: `Right. In a dropout screen a negative log2 fold change means the guides were depleted: cells carrying the deletion were outgrown by the others.` },
          { t: `The guides for this target became more common, so the deletion helped the cells grow.`, ok: false, why: `That is the reverse. A positive value would mean the guides became more common; a negative value means fewer.` },
          { t: `The deletion made the cells more resistant to cisplatin.`, ok: false, why: `Cisplatin is not what this number reports. Candidate 205 is described here as a top hit in the dropout (growth) screens.` },
          { t: `The guides never entered the cells, so nothing changed.`, ok: false, why: `Guides that never entered the cells would give a value near zero, not a strong drop.` },
        ], source: ['res-validation-p1'] },
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
      `“it contains two additional hits”: the paragraph does not say what “it” is. We read it as the candidate 509 locus, because the sentence follows the 509 sentence. The evidence for candidates 507 and 508 is in a supplementary figure, so you cannot check it in your PDF.`,
    ],
    prereqs: ['A5', 'B7', 'B13', 'F12'],
    checks: [
      { q: `Deleting the TSS region of candidate 205 cannot by itself tell you which gene is responsible. Why not?`,
        options: [
          { t: `The region holds the start sites of two genes that face opposite ways (LINC00115 and RP11-206L10.11), so one deletion removes both.`, ok: true, why: `Right. They are bidirectional antisense genes that share the TSS region, so the deletion cannot separate them.` },
          { t: `The deletion removes only one of the two start sites.`, ok: false, why: `The paragraph says candidate 205 overlaps the TSS of both genes.` },
          { t: `LINC00115 and RP11-206L10.11 sit on different chromosomes.`, ok: false, why: `They overlap the same TSS region, so they sit next to each other on the same chromosome.` },
          { t: `Candidate 205 was not a hit in the dropout screens.`, ok: false, why: `It was described as a top hit in the dropout screens in the previous paragraph. The open question is which gene is behind the effect.` },
        ], source: ['res-validation-p2'] },
      { q: `Why does the paragraph say that “this locus” contains two additional hits, candidates 507 and 508?`,
        options: [
          { t: `The authors say it supports the importance of the locus: several nearby targets also score as hits.`, ok: true, why: `Right. The sentence begins “Supporting the importance of this locus”.` },
          { t: `It shows that the candidate 509 guides also cut candidates 507 and 508, so the result is unreliable.`, ok: false, why: `The paragraph presents the extra hits as support. It does not say the guides cut those targets.` },
          { t: `It explains why candidate 509 could not be checked by PCR.`, ok: false, why: `The PCR problem is a separate point, made in the next paragraph (difficulty in designing primers).` },
          { t: `It proves that LINC00910 is a protein-coding gene.`, ok: false, why: `The paragraph says nothing about protein-coding status. The sentence is about neighboring hits.` },
        ], source: ['res-validation-p2'] },
    ],
  },

  'res-validation-p3': {
    plain: `<p>To check the effect of the deletions, the authors tested <b>one</b> guide pair (pgRNA) per candidate on its own. They picked it at random from the high-scoring pgRNAs. <i>Where to look: Figure 3B. Each plot follows the ten pgRNAs of one candidate through the dropout screen in A549 cells (time points T0, week two, week three). The arrow marks the pgRNA that was picked.</i></p>
<p>The paper says the candidate 205 pgRNA deleted the targeted region efficiently (Figure S2I, supplementary). For candidate 509 the authors could not design PCR primers to check the deletion directly, but its pgRNA effectively lowered the RNA level (Figure S2J, supplementary).</p>
<p>Both pgRNAs had strong effects on cell <b>fitness</b> (how well cells survive and multiply). In a <b>competition assay</b>, red cells (mCherry+) carrying the candidate pgRNAs were out-competed by green control cells (GFP+) carrying a pgRNA for <i>AAVS1</i>, a neutral spot. The authors say the effect is comparable to switching off <i>RPS5</i>, an essential ribosomal gene (Figure 3C, and Figure S2K in the supplement). <i>Where to look: Figure 3C. The neutral control stays flat, the RPS5 positive control falls, and the red lines for candidates 205 and 509 fall too.</i> A conventional growth assay gave similar results (Figure S2L, supplementary).</p>
<p>Finally, the candidate 509 pgRNA also made cells more sensitive to cisplatin, which fits the screen results (Figure 3C, the plot labeled with cisplatin).</p>`,
    why: `This is the independent check: one guide pair per candidate, tested outside the pool and next to a neutral and a positive control. If the hits were only false alarms of the pooled screen, these assays would show no loss of fitness.`,
    memory: `Analogy: a relay race on one track between a red team (the candidate deletion) and a green team (the control). If the red team is slower, its share of the crowd shrinks as the race goes on. Putting both teams on the same track gives them exactly the same conditions.`,
    flags: [
      `“randomly selected high-scoring pgRNAs”: the paragraph does not say what “high-scoring” means (a design score, or the screen result). Only one pgRNA per candidate is tested (the arrows in Figure 3B). In Figure 3B the ten guide lines of a candidate do not all fall by the same amount (for candidate 205 a few stay near zero or even rise), so one guide cannot show that every guide works.`,
      `Three claims here rest only on supplementary figures (S2I, S2J and S2L), which are not in your PDF: the deletion for candidate 205, the lowered RNA for candidate 509, and the conventional growth assay.`,
      `“an effect comparable to inactivation of … RPS5” comes without a number. The legend gives P values only for the last time point (Student’s t test). Compare the slopes of the lines in Figure 3C yourself.`,
    ],
    prereqs: ['D15', 'D19', 'D20', 'F7'],
    sources: ['fig3B'],
    checks: [
      { q: `In the competition assay, why are the control cells (GFP+) grown in the same dish as the candidate cells (mCherry+)?`,
        options: [
          { t: `So both kinds of cells face identical conditions, and a shift in their ratio over time shows a difference in fitness.`, ok: true, why: `Right. The cells compete directly. If the candidate deletion hurts fitness, the red share falls.` },
          { t: `To make the candidate cells fluorescent.`, ok: false, why: `The fluorescent label comes with the pgRNA virus. Mixing the cells does not label them; it lets them compete.` },
          { t: `To check that the pgRNA deleted the targeted region.`, ok: false, why: `Deletion is checked by PCR (or by measuring the RNA level), not by the competition assay, which measures fitness.` },
          { t: `To make the cells resistant to cisplatin.`, ok: false, why: `Cisplatin sensitivity is tested separately, and mixing cells does not make them resistant.` },
        ], source: ['res-validation-p3'] },
      { q: `What role does the RPS5 pgRNA play in Figure 3C?`,
        options: [
          { t: `A positive control: RPS5 is an essential ribosomal gene, so switching it off shows what a strong loss of fitness looks like.`, ok: true, why: `Right. The candidate effects are compared with it (“comparable to inactivation of essential ribosomal gene RPS5”).` },
          { t: `A neutral control: a safe place where cutting should not change fitness.`, ok: false, why: `That role belongs to the AAVS1 pgRNA carried by the green (GFP+) control cells.` },
          { t: `The gene under study: RPS5 is candidate 205.`, ok: false, why: `RPS5 is a separate control. The candidates are 205 and 509.` },
          { t: `A fluorescent marker used to count the cells.`, ok: false, why: `The fluorescent markers are GFP and mCherry. RPS5 is a gene.` },
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
      `The spheroid support is in a supplementary figure (S2M), and the statements about LINC00115 in other cancers cite earlier papers: they are not tested in this paper.`,
    ],
    prereqs: ['B7', 'B15', 'D16', 'D17'],
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
      `“dramatic impairment” versus the figure: in Figure 3F (right) five of the six P labels are small, but one, for the second ASO against candidate 489, reads P=0.144. That is not significant at the paper’s usual cutoff (p ≤ 0.05 in the Methods). Judge the strength yourself from the bars and the photos in Figure 3E.`,
      `Replicate counts: the legend says “three independent biological replicates”, but the RT-qPCR plot in Figure 3F (left) is labeled “n=2” (the crystal violet plot is labeled “n=3”).`,
    ],
    prereqs: ['D14', 'D17', 'D24', 'F1'],
    sources: ['limitations-p1', 'm-quant-p3', 'fig3F'],
    derived: ['0.144'],
    checks: [
      { q: `What did the authors find when they knocked down candidates 215, 448 and 489 with ASOs?`,
        options: [
          { t: `Migration of A549 cells was impaired.`, ok: true, why: `Right. The paragraph reports a “dramatic impairment” of A549 migration for the three hits.` },
          { t: `Migration of A549 cells increased.`, ok: false, why: `That is the reverse. These are migration-promoting hits, so knocking them down lowers migration.` },
          { t: `Cell growth, not migration, was reduced.`, ok: false, why: `Figures 3E and 3F measure migration: how many cells cross a membrane.` },
          { t: `Only candidate 215 had an effect.`, ok: false, why: `The paragraph reports impaired migration for all three hits.` },
        ], source: ['res-validation-p5'] },
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
    prereqs: ['D2', 'D16'],
    sources: ['res-validation-p1', 'limitations-p1'],
    checks: [
      { q: `In this section, what does “RNA-dependent mechanism” mean?`,
        options: [
          { t: `The effect depends on the lncRNA itself (the finished RNA, or the act of making it), not only on the DNA sequence.`, ok: true, why: `Right. The previous paragraph contrasts it with DNA-dependent mechanisms such as an enhancer, and lists “mature lncRNA, or its transcription” as RNA-dependent examples.` },
          { t: `The lncRNA is translated into a protein that does the work.`, ok: false, why: `lncRNAs are noncoding: they do not carry a recipe for a protein.` },
          { t: `The effect only appears when RNA is added to the cells from outside.`, ok: false, why: `Here the authors lower the cell’s own RNA with ASOs. They do not add RNA from outside.` },
          { t: `An enhancer in the DNA boosts a neighboring gene.`, ok: false, why: `That is the DNA-dependent example given in the paragraph, the opposite of an RNA-dependent mechanism.` },
        ], source: ['res-validation-p4', 'res-validation-p6'] },
      { q: `The Limitations section reports that 8/12 (67%) hits validated with ASOs. How does this qualify the summary of this section?`,
        options: [
          { t: `Most hits seem to act through RNA, but around one-third of screen hits may act via DNA-dependent mechanisms.`, ok: true, why: `Right. This is the Limitations section’s own reading of the 8/12 ratio.` },
          { t: `Every hit acts through RNA.`, ok: false, why: `If every hit had validated, the ratio would be 12/12. The Limitations say around one-third may act via DNA-dependent mechanisms.` },
          { t: `CRISPR-del cannot be used to study lncRNAs.`, ok: false, why: `The Limitations call false positives an important caveat, but they say ASO validation can resolve them. They do not reject the method.` },
          { t: `ASOs were not needed to tell DNA effects from RNA effects.`, ok: false, why: `The opposite: the Limitations say ASO validation is what lets the authors assign RNA-mediated mechanisms.` },
        ], source: ['res-validation-p6', 'limitations-p1'] },
    ],
  },

});

window.TRACKG.units['res-validation'] = {
  intro: `<p>A pooled screen tests thousands of targets at once, so some hits can be false alarms. This section asks: <b>do the best hits still work when tested one at a time, and do they work through their RNA?</b> The authors re-test two top hits (candidates 205 and 509) in a competition assay. They use ASOs to find out which of two overlapping genes matters and whether the RNA is the working part. Finally, they test three migration hits with ASOs.</p>`,
  recap: `<p>Both top hits kept their effect when tested alone: cells with the deletions were out-competed by control cells, and candidate 509 also made cells more sensitive to cisplatin. ASOs showed that at candidate 205 the gene <i>LINC00115</i>, but not <i>RP11-206L10.11</i>, drives growth through its RNA, and ASOs against three migration hits slowed A549 cell migration. The authors conclude that CRISPR-del screens can find lncRNAs that act through their RNA, a conclusion the Limitations later qualify (8/12 hits validated with ASOs).</p>`,
};
