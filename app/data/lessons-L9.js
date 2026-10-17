/* lessons-L9.js — filled by one content author (scope L9). */

(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(
/* ============================================================================================== H1 */
{
  id: 'H1',
  body: [
    { k: 'h', text: 'A paper is an argument' },
    { k: 'bgnd', html: `
      <p>A paper is not a pile of results. It is an <b>argument</b>: a <b>claim</b>, the <b>evidence</b> for it (a figure panel), and an answer to the question every skeptic asks: <i>what else could explain this?</i> Answering that last question is the job of the <b>controls</b>.</p>
      <p>This lesson gives you both tools: the chain from claim to panel, and the list of controls with what each one rules out. This whole track uses four words: <b>Claim, Check, Gap, Fix</b>. Here you practice Claim and Check. Lesson H3 finds the Gaps. Lesson H4 proposes the Fixes.</p>` },
    { k: 'svg', caption: 'The paper as seven linked claims. The ids on the right are the figure panels that carry the evidence for each link.',
      svg: `<svg viewBox="0 0 480 358" role="img" aria-label="Seven linked boxes from top to bottom: A the method works, B the screens are reproducible, C integration finds 80 hits, D hits work in both cell lines, E ASOs confirm nine then five then two, F models cocktails and patients, G two different mechanisms. The figure panels that support each link are written on the right.">
        <rect x="6" y="6" width="300" height="32" rx="8" class="f-blue"/><text x="18" y="27" class="b">A</text><text x="40" y="27">The method switches genes off</text><text x="318" y="26" class="s m">fig1E, fig1F</text>
        <path d="M156 38 V57" class="arrow"/>
        <rect x="6" y="58" width="300" height="32" rx="8" class="f-green"/><text x="18" y="79" class="b">B</text><text x="40" y="79">Screens are reproducible</text><text x="318" y="78" class="s m">fig2D to fig2G</text>
        <path d="M156 90 V109" class="arrow"/>
        <rect x="6" y="110" width="300" height="32" rx="8" class="f-orange"/><text x="18" y="131" class="b">C</text><text x="40" y="131">Integration finds 80 hits</text><text x="318" y="130" class="s m">fig4B to fig4D</text>
        <path d="M156 142 V161" class="arrow"/>
        <rect x="6" y="162" width="300" height="32" rx="8" class="f-purple"/><text x="18" y="183" class="b">D</text><text x="40" y="183">Hits work in both cell lines</text><text x="318" y="182" class="s m">fig4E to fig4H</text>
        <path d="M156 194 V213" class="arrow"/>
        <rect x="6" y="214" width="300" height="32" rx="8" class="f-teal"/><text x="18" y="235" class="b">E</text><text x="40" y="235">ASOs confirm: 9 → 5 → 2</text><text x="318" y="234" class="s m">fig5A</text>
        <path d="M156 246 V265" class="arrow"/>
        <rect x="6" y="266" width="300" height="32" rx="8" class="f-yellow"/><text x="18" y="287" class="b">F</text><text x="40" y="287">Models, cocktails, patients</text><text x="318" y="286" class="s m">fig5C to fig5H</text>
        <path d="M156 298 V317" class="arrow"/>
        <rect x="6" y="318" width="300" height="32" rx="8" class="f-red"/><text x="18" y="339" class="b">G</text><text x="40" y="339">Two different mechanisms</text><text x="318" y="338" class="s m">fig6B to fig6L</text>
      </svg>` },
    { k: 'h', text: 'Claim → evidence → panel' },
    { k: 'plain', source: ['res-pipeline-p5', 'fig1E', 'fig1F'], html: `
      <p><b>A · Claim: the method switches genes off, though not with every guide.</b><br>
      <i>Evidence:</i> for the known lncRNA DNMBP-AS1, a PCR gel shows the shorter "deleted" band and most guide pairs lower its RNA. For 12 other randomly cloned guide pairs, 10/12 gave the expected deletion and 7/12 lowered the target RNA (three showed no change, two went up).<br>
      <i>Where:</i> fig1E, fig1F · res-pipeline-p5</p>` },
    { k: 'plain', source: ['res-multipheno-p3', 'res-multipheno-p4', 'fig2D', 'fig2E', 'fig2F', 'fig2G'], html: `
      <p><b>B · Claim: the screens are reproducible and the controls behave.</b><br>
      <i>Evidence:</i> replicate screens agree (R=0.66 for lncRNA candidates). Guides against positive-control genes are depleted in the A549 dropout screen; neutral controls are not. Known lung-cancer lncRNAs such as PVT1, SBF2-AS1 and LINC00511 come out as hits.<br>
      <i>Where:</i> fig2D, fig2E, fig2F, fig2G · res-multipheno-p3, res-multipheno-p4</p>` },
    { k: 'plain', source: ['res-integration-p1', 'res-integration-p2', 'fig4B', 'fig4C', 'fig4D'], html: `
      <p><b>C · Claim: combining the screens finds 80 hits and ranks controls better than the single dropout screens.</b><br>
      <i>Evidence:</i> the pan-hallmark ranking (TPP) reaches AUC 0.82 at telling positive from neutral controls, against 0.73 for A549 dropout and 0.54 for H460 dropout. It gives 80 hits at FDR &lt;0.2 (about 8% of lncRNAs screened); 73 were not previously linked to NSCLC.<br>
      <i>Where:</i> fig4B, fig4C, fig4D · res-integration-p1, res-integration-p2</p>` },
    { k: 'plain', source: ['res-integration-p3', 'res-integration-p4', 'fig4E', 'fig4F', 'fig4G', 'fig4H'], html: `
      <p><b>D · Claim: the hits are not a one-cell-line quirk, and they look like cancer genes in patient data.</b><br>
      <i>Evidence:</i> dropout hits barely overlap between A549 (n=72) and H460 (n=58): only n=5 are shared. The 80 pan-hallmark hits are active in both. They are expressed higher than non-hits in KRAS+ tumors, are upregulated in tumors compared with non-tumor tissue, and are amplified more often (P=0.0011).<br>
      <i>Where:</i> fig4E, fig4F, fig4G, fig4H · res-integration-p3, res-integration-p4</p>` },
    { k: 'plain', source: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'fig5A'], html: `
      <p><b>E · Claim: ASOs confirm a subset: nine, then five, then two.</b><br>
      <i>Evidence:</i> nine top-ranked lncRNAs (Tier 1) each got at least two independent ASOs with ≥40% knockdown. For five (Tier 2), two distinct ASO sequences gave reproducible loss of proliferation, with similar results in H460 and H441. Three non-transformed lung cell lines showed a diminished or absent response, so the authors narrowed to two (Tier 3): CHiLL1 and GCAWKR.<br>
      <i>Where:</i> fig5A · res-aso-p1, res-aso-p2, res-aso-p3</p>` },
    { k: 'plain', source: ['res-aso-p3', 'res-aso-p6', 'res-aso-p7', 'res-aso-p8', 'res-aso-p9', 'fig5C', 'fig5E', 'fig5F', 'fig5G', 'fig5H'], html: `
      <p><b>F · Claim: the effect holds in more realistic models, and a cocktail works better.</b><br>
      <i>Evidence:</i> A549 growth falls with two independent ASOs per gene; H441 spheroids lose viability (n=4), approaching the mTOR positive control; one patient-derived organoid line (BE874) responds to CHiLL1 ASOs. A CHiLL1/GCAWKR cocktail beats either ASO at the same total dose (25 nM). In TCGA RNA-seq, 78% of KRAS+ tumors express at least one of the two (expression defined as above 0.5 FPKM).<br>
      <i>Where:</i> fig5C, fig5E, fig5F, fig5G, fig5H · res-aso-p6, res-aso-p7, res-aso-p8, res-aso-p9</p>` },
    { k: 'plain', source: ['res-mechanism-p1', 'res-mechanism-p2', 'res-mechanism-p5', 'res-mechanism-p6', 'fig6B', 'fig6C', 'fig6E', 'fig6G', 'fig6K', 'fig6L'], html: `
      <p><b>G · Claim: the two lncRNAs work in different ways.</b><br>
      <i>Evidence:</i> CHiLL1 sits mainly in the cytoplasm and GCAWKR in the nucleus. Gene changes after two CHiLL1 ASOs are highly correlated (R=0.75), read as mostly on-target. CHiLL1 knockdown raises early apoptotic cells; GCAWKR knockdown raises cells in G2 and impairs migration.<br>
      <i>Where:</i> fig6B, fig6C, fig6E, fig6G, fig6K, fig6L · res-mechanism-p1, res-mechanism-p2, res-mechanism-p5, res-mechanism-p6</p>` },

    { k: 'h', text: 'Every control, and what it rules out' },
    { k: 'bgnd', html: `
      <p>A control is a comparison that answers one "what else?" question. Each group below has two parts: first <b>what the paper used</b> (sourced), then <b>what it rules out</b> (the design logic). Only controls the paper really used are listed.</p>` },
    { k: 'h', text: 'Controls on the screens' },
    { k: 'plain', source: ['res-pipeline-p3', 'm-library-design-p3', 'm-hits-p2', 'res-multipheno-p3', 'res-multipheno-p6', 'm-screens-p1', 'm-screen-migration-p1', 'res-pipeline-p5', 'fig2E'], html: `
      <ul>
        <li><b>Neutral control guides</b>: aimed at AAVS1, intergenic and intronic regions that should not change cell behavior. They give the "no effect" baseline, and the Z-scores are scaled to them.</li>
        <li><b>Positive-control genes</b>: protein-coding genes with known roles in growth or cisplatin resistance (109 positive controls). Their guides were significantly depleted in the dropout screens.</li>
        <li><b>ORF guides vs TSS guides</b> for the same positive-control genes: promoter deletion had a detectable but lower impact than breaking the ORF.</li>
        <li><b>Reference samples</b>: cells collected at time zero (T0) and, for migration, a reference population that never ran the assay.</li>
        <li><b>Biological replicates</b>: replicate screens correlate (R=0.66 for lncRNA candidates).</li>
        <li><b>Two cell lines</b>: A549 and H460 screened in parallel.</li>
        <li>The Methods also list growth-opposing genes as "negative" protein-coding controls; the Results do not describe how they were used.</li>
      </ul>` },
    { k: 'why', source: ['res-pipeline-p3', 'res-multipheno-p3', 'm-screens-p1'], html: `
      <ul>
        <li><b>Neutral guides</b> rule out the idea that cutting DNA, infection or selection alone slows growth. Without them any "hit" could be a side effect of the method.</li>
        <li><b>Positive controls</b> rule out a screen that is blind. If they were not depleted, "no hit" would mean nothing.</li>
        <li><b>ORF vs TSS guides</b> rule out overconfidence. A lncRNA that is not a hit may still matter, because promoter deletion is the weaker tool.</li>
        <li><b>Reference samples</b> rule out differences that were already there at the start. A hit is a change from the reference.</li>
        <li><b>Replicates</b> rule out a one-off accident in a single experiment.</li>
        <li><b>Two cell lines</b> rule out a hit that depends on the quirks of one cell line (see H2).</li>
      </ul>` },
    { k: 'h', text: 'Controls on single-gene checks' },
    { k: 'plain', source: ['fig1E', 'fig1F', 'fig3C', 'fig3D', 'm-qpcr-p1', 'm-competition-p1', 'res-validation-p3'], html: `
      <ul>
        <li><b>Non-targeting guide pair</b>: in the DNMBP-AS1 gel the control lane (non-targeting pgRNA) sits beside the pgRNA_9 lane, and the control bar in the RNA chart is set to 1.0.</li>
        <li><b>Housekeeping genes</b>: RNA levels are given relative to GAPDH (DNMBP-AS1 chart) or HPRT1 (the ASO qPCR charts).</li>
        <li><b>AAVS1 guides in the competition assay</b>: control cells (GFP, AAVS1 guides) are mixed 1:1 with cells (mCherry) carrying the guide of interest. One panel pairs two AAVS1 guides, one in each color. RPS5, an essential ribosomal gene, is the positive control.</li>
      </ul>` },
    { k: 'why', source: ['fig1E', 'fig3C', 'm-competition-p1'], html: `
      <ul>
        <li><b>Non-targeting guides</b> rule out the idea that any guide, or the cutting itself, shifts the band or lowers the RNA. The deletion band must appear only with the targeting guide.</li>
        <li><b>Housekeeping genes</b> rule out "less RNA" that only means fewer cells or less material loaded. Each sample is scaled to a gene expected to stay steady.</li>
        <li><b>AAVS1 partner cells</b> rule out colors, virus or drug selection as the cause of a shift. Both cell types share one dish, so only the guide differs. The AAVS1-vs-AAVS1 panel checks that the two colors alone do not drift apart.</li>
        <li><b>RPS5</b> rules out an insensitive assay: an essential gene should lose the competition clearly.</li>
      </ul>` },
    { k: 'h', text: 'Controls on the ASO tests' },
    { k: 'plain', source: ['fig3F', 'fig5A', 'fig5C', 'fig5E', 'fig5G', 'fig6L', 'fig6C', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'res-mechanism-p1', 'm-rescue-p1', 'm-aso-p2'], html: `
      <ul>
        <li><b>Non-targeting control ASO</b>: growth and knockdown are normalized to it (fig3F, fig5A, fig5C, fig5G, fig6L).</li>
        <li><b>Two independent ASO sequences</b> per lncRNA, each with ≥40% knockdown; a phenotype counted as on-target when two distinct sequences reproduced it.</li>
        <li><b>Positive-control ASOs</b>: MALAT1 in the cell-line summary (its knockdown is expected to lower viability) and mTOR in the spheroids.</li>
        <li><b>Non-transformed lung cells</b> (three lines): a diminished or absent response.</li>
        <li><b>Equal total dose</b> in cocktails: the total ASO amount did not vary (25 nM).</li>
        <li><b>Rescue attempt</b>, with the empty vector pcDNA3.1 as its control: overexpressing CHiLL1 or GCAWKR could not rescue the ASO-induced phenotypes.</li>
        <li><b>Marker RNAs</b> for the nucleus/cytoplasm split (MALAT1 nuclear, GAPDH cytosolic), and FISH specificity validated by knockdown.</li>
        <li><b>Delivery check</b>: a FAM-labelled control ASO to see whether ASOs enter the cells.</li>
      </ul>` },
    { k: 'why', source: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'fig5G'], html: `
      <ul>
        <li><b>Control ASO</b> rules out effects of the ASO chemistry, the transfection reagent or the act of transfecting. Only the difference from the control counts.</li>
        <li><b>Two ASO sequences</b> rule out one ASO's own off-target effect. Two different sequences are unlikely to share the same off-target.</li>
        <li><b>Positive-control ASOs</b> rule out an assay that cannot see a drop. ASOs known to hurt cells should show one.</li>
        <li><b>Normal lung cells</b> rule out ASOs that simply poison every cell. A weaker response there points toward a cancer-specific dependence (H4 asks how firmly).</li>
        <li><b>Equal total dose</b> rules out a cocktail that wins only because it holds more ASO.</li>
        <li><b>Rescue</b> would have ruled out off-target effects: put the RNA back and growth should return. It did not work here, so the other controls carry the on-target case (see H2).</li>
        <li><b>Marker RNAs and knockdown-checked FISH</b> rule out a "nuclear" or "cytoplasmic" call that is only an artifact of the method.</li>
        <li><b>Delivery check</b> rules out that "no effect" only means the ASO never entered the cells.</li>
      </ul>` },
    { k: 'memory', html: `
      <p><b>Analogy: a courtroom.</b> The claim is the charge and each panel is an exhibit. A control is a cross-examination question: <i>could something else explain this exhibit?</i> Neutral guides ask "does just being cut matter?" The control ASO asks "does just being treated matter?" Two ASOs ask "is it the suspect, or one witness's quirk?"</p>
      <p>Where the analogy breaks: a jury decides once. In science, controls can only make an alternative less likely, never impossible.</p>` },
  ],
  appears: [
    { ref: 'res-pipeline-p3', note: 'Neutral control and positive control guides are added to the library.' },
    { ref: 'res-multipheno-p3', note: 'Positive controls are depleted, neutral controls are not; ORF guides beat promoter-deletion guides.' },
    { ref: 'fig3C', note: 'Competition assay with AAVS1 neutral guides and the RPS5 positive control.' },
    { ref: 'fig5A', note: 'One summary of every ASO, every cell line, the normal cells and the MALAT1 positive control.' },
    { ref: 'res-aso-p3', note: 'Normal cells, two independent ASOs and the failed rescue, then the narrowing to CHiLL1 and GCAWKR.' },
    { ref: 'res-mechanism-p2', note: 'Two ASOs give highly correlated RNA-seq changes (the on-target argument).' },
  ],
  checks: [
    { q: 'A screen shows that cells with guides against one lncRNA grow slower. Which control tells you that simply being cut, infected and selected is not what slowed them?',
      options: [
        { t: 'Neutral control guides aimed at regions not expected to change cell behavior', ok: true, why: 'Right: they go through the same cutting, infection and selection, so they show the "no effect" baseline (res-pipeline-p3).' },
        { t: 'Positive-control genes with known growth roles', ok: false, why: 'These show that the screen can detect a real growth effect. They do not show what the method alone does.' },
        { t: 'A second cell line, H460', ok: false, why: 'A second line tests whether a hit is general. A method artifact would appear in both lines, so it could not reveal one.' },
        { t: 'Normalizing RNA levels to a housekeeping gene', ok: false, why: 'Normalization corrects qPCR measurements. It plays no part in a growth screen.' },
      ], source: ['res-pipeline-p3', 'm-library-design-p3'] },
    { q: 'Which feature of the ASO experiments best guards against the worry that one ASO\'s sequence also hits a different RNA?',
      options: [
        { t: 'At least two independent ASO sequences per lncRNA, counting an effect only when both reproduce it', ok: true, why: 'Right (res-aso-p1, res-aso-p2): different sequences have different off-targets but share the on-target effect.' },
        { t: 'Normalizing to a non-targeting control ASO', ok: false, why: 'This controls for transfection and ASO chemistry. One ASO\'s own off-target would still be present in the comparison.' },
        { t: 'Growing the cells as spheroids', ok: false, why: 'Spheroids are a more realistic model. They do not separate on-target from off-target effects of a single ASO.' },
        { t: 'Checking nuclear and cytoplasmic marker RNAs', ok: false, why: 'Markers show whether a fractionation worked. They have nothing to do with ASO off-targets.' },
      ], source: ['res-aso-p1', 'res-aso-p2'] },
    { q: 'In the rescue experiments, what happened, and what follows?',
      options: [
        { t: 'Overexpressing CHiLL1 or GCAWKR did not rescue the ASO-induced phenotypes, so the on-target case rests on the other checks', ok: true, why: 'Right (res-aso-p3): the authors offer cis-regulatory mechanisms or unannotated isoforms as possible reasons.' },
        { t: 'Rescue restored growth completely, proving the ASOs are on-target', ok: false, why: 'Reversed: the paper reports that overexpression could not rescue the phenotypes.' },
        { t: 'Rescue was never attempted', ok: false, why: 'It was: the Methods describe the overexpression plasmids (with an empty-vector control) and the Results report the outcome.' },
        { t: 'Rescue worked for CHiLL1 but not for GCAWKR', ok: false, why: 'The paper says overexpression of neither gene rescued.' },
      ], source: ['res-aso-p3', 'm-rescue-p1'] },
  ],
}
);
