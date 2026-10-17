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
      <i>Evidence:</i> dropout hits tend to be active only in the cell type where they were found (the key of fig4E lists A549 dropout hits n=72, H460 dropout hits n=58 and hits in both n=5). The 80 pan-hallmark hits are active in both. They are expressed higher than non-hits in KRAS+ tumors, are upregulated in tumors compared with non-tumor tissue, and are amplified more often (P=0.0011).<br>
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
        <li><b>Non-targeting guide pair</b>: in the DNMBP-AS1 gel the control lane (non-targeting pgRNA) sits beside the pgRNA_9 lane, and the control bar in the RNA chart sits at about 1.0.</li>
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

(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(
/* ============================================================================================== H2 */
{
  id: 'H2',
  body: [
    { k: 'h', text: 'Two ways a good result can fool you' },
    { k: 'bgnd', html: `
      <p>An experiment can "work" and still mislead you. Either it hit <b>something other than the RNA you meant</b> (the DNA around it, or a different RNA), or it works <b>only in the one cell line</b> you tried. This lesson takes each worry in turn.</p>` },
    { k: 'h', text: 'DNA effect or RNA effect? Why ASOs followed CRISPR' },
    { k: 'bgnd', html: `
      <p>CRISPR-del cuts a stretch of <b>DNA</b> out at a gene's start. That piece may hold more than the start site: a DNA regulatory element such as an enhancer, or the start of a gene on the opposite strand. So a growth defect after deletion can be a <b>DNA-dependent</b> effect (a lost DNA element) or an <b>RNA-dependent</b> one (the RNA product is gone).</p>
      <p>An <b>ASO</b> works later. It grabs the finished RNA and gets it destroyed, and it leaves the DNA alone. If the ASO gives the same phenotype, the RNA (or its production) matters. An ASO is built to match one RNA, so it can also tell apart two genes that share a start site.</p>` },
    { k: 'svg', caption: 'Deletion removes DNA, so it cannot separate a DNA effect from an RNA effect. An ASO leaves the DNA intact and destroys only the RNA.',
      svg: `<svg viewBox="0 0 480 304" role="img" aria-label="Two panels. Left: CRISPR deletion cuts a piece of DNA out at the gene start, which may also remove an enhancer or an opposite-strand gene. Right: an ASO leaves the DNA intact and destroys only the RNA. Below: the same phenotype with both methods points to an RNA-dependent effect.">
        <text x="120" y="20" class="mid b">CRISPR-del: cut the DNA</text>
        <text x="360" y="20" class="mid b">ASO: destroy the RNA</text>
        <path d="M12 70 H92" class="ln thick s-blue"/><path d="M148 70 H228" class="ln thick s-blue"/>
        <text x="120" y="50" class="mid s b">TSS region</text>
        <path d="M92 58 V84" class="ln dash s-red"/><path d="M148 58 V84" class="ln dash s-red"/>
        <path d="M120 76 V95" class="arrow s-red"/>
        <rect x="92" y="98" width="56" height="26" rx="5" class="f-red"/><text x="120" y="116" class="mid s">deleted</text>
        <text x="120" y="144" class="mid s m">no start site, no RNA</text>
        <path d="M252 70 H468" class="ln thick s-blue"/>
        <text x="360" y="50" class="mid s m">DNA stays intact</text>
        <path d="M290 76 V108" class="arrow s-orange"/>
        <path d="M284 112 H436" class="ln thick s-orange"/>
        <rect x="322" y="100" width="64" height="24" rx="5" class="f-purple"/><text x="354" y="117" class="mid s b">ASO</text>
        <path d="M404 102 L424 122 M424 102 L404 122" class="ln thick s-red"/>
        <text x="360" y="144" class="mid s m">only the RNA is destroyed</text>
        <rect x="6" y="158" width="228" height="70" rx="8" class="f-orange"/>
        <text x="120" y="178" class="mid s">The deleted piece may also</text><text x="120" y="196" class="mid s">hold an enhancer, or the start</text><text x="120" y="214" class="mid s">of a gene on the other strand</text>
        <rect x="246" y="158" width="228" height="70" rx="8" class="f-green"/>
        <text x="360" y="178" class="mid s">Only the RNA is targeted:</text><text x="360" y="196" class="mid s">if growth still drops, the RNA</text><text x="360" y="214" class="mid s">(or making it) is what matters</text>
        <rect x="6" y="240" width="468" height="56" rx="8" class="f-yellow"/>
        <text x="240" y="262" class="mid b">Same phenotype with both methods → RNA-dependent</text>
        <text x="240" y="282" class="mid s">Deletion only → maybe DNA-dependent (or a weak ASO)</text>
      </svg>` },
    { k: 'paper', ref: 'res-validation-p4', quote: `genomic deletion cannot distinguish between DNA-dependent (e.g., enhancer) or RNA-dependent mechanisms (e.g., mature lncRNA, or its transcription)` },
    { k: 'plain', source: ['res-validation-p2', 'res-validation-p4', 'fig3A', 'fig3D'], html: `
      <p>Candidate 205 sits where two genes on opposite strands, LINC00115 and RP11-206L10.11, share a start region (fig3A). The authors used two ASOs per gene in A549 cells. Both LINC00115 ASOs slowed growth (P=0.034 and P=0.018 at 72 h), but the RP11-206L10.11 ASOs had no significant effect (ns). Each growth curve has a qPCR panel beside it showing the RNA level at 72 h (fig3D). The authors conclude that LINC00115, not RP11-206L10.11, drives proliferation, through an RNA-dependent mechanism.</p>` },
    { k: 'bgnd', html: `
      <p>A "no effect" result only counts if the ASO really lowered its RNA. That is why the qPCR panel matters: it lets you check that each ASO did its job, so the silence of the other gene is a real answer.</p>` },
    { k: 'plain', source: ['limitations-p1'], html: `
      <p>Across their ASO tests the authors report that 8/12 (67%) of the hits they tested were confirmed, and they say this suggests that around one-third of screen hits may act via DNA-dependent mechanisms. Lesson <a href="#/lesson/H3">H3</a> reads that sentence closely.</p>` },
    { k: 'h', text: 'Off-target effects: what they are, and how the paper guards against them' },
    { k: 'bgnd', html: `
      <p>An ASO is a short strand built to match one RNA. A short match can turn up by chance in other RNAs, so an ASO can lower an unintended RNA, or stress the cell for reasons unrelated to its target. That is an <b>off-target effect</b>, and one ASO cannot rule it out. The usual defenses: (1) several different ASO sequences for the same target, because different sequences have different off-targets but share the on-target effect; (2) a non-targeting control ASO; (3) a second, independent method; (4) a rescue.</p>` },
    { k: 'plain', source: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'res-mechanism-p2', 'res-mechanism-p3', 'res-mechanism-p6', 'fig6E', 'fig6I', 'fig5A'], html: `
      <p><b>What the paper did:</b></p>
      <ul>
        <li>Each of the nine Tier 1 lncRNAs got at least two independent ASOs with ≥40% knockdown. A phenotype counted as on-target when two distinct ASO sequences reproduced it.</li>
        <li>For CHiLL1 and GCAWKR, the same phenotype also appeared with CRISPR-del using multiple pgRNAs, and with two independent ASOs per gene.</li>
        <li>For CHiLL1 RNA-seq, two ASOs gave highly correlated gene changes (R=0.75), read as most effects being on-target. The pathway analysis used only genes changed by both ASOs.</li>
        <li>For GCAWKR, RNA-seq used a single ASO, compared across A549 and H460 (R=0.8).</li>
        <li>ASO results are normalized to a non-targeting control ASO.</li>
      </ul>` },
    { k: 'paper', ref: 'res-aso-p3', quote: `overexpression of neither CHiLL1 nor GCAWKR could rescue ASO-induced phenotypes` },
    { k: 'plain', source: ['res-aso-p3', 'm-rescue-p1'], html: `
      <p>The classic extra test, putting the RNA back, did not work here. The authors offer two possible reasons: a cis-regulatory mechanism (although they saw no such effect on CHiLL1's nearest neighbor, TNFRSF10B), or the loci may act via functional transcript isoforms that remain unannotated and were not tested. They do not say which is right.</p>` },
    { k: 'paper', ref: 'discussion-p5', quote: `strongly suggested that observed phenotypic and molecular effects occur on target (via the intended lncRNA)` },
    { k: 'bgnd', html: `
      <p><b>What this does and does not prove (my evaluation).</b> Several independent lines agree, so a purely off-target explanation would need the same accident to happen with different ASO sequences and with a DNA deletion. That is unlikely. But no single experiment excludes it, and the missing rescue is a real gap (see <a href="#/lesson/H4">H4</a>). Notice the authors' own verb: "strongly suggested", not "proved". Copy that caution in exam answers.</p>` },
    { k: 'h', text: 'Cell-line-specific effects and "background independence"' },
    { k: 'bgnd', html: `
      <p>Each cell line is a different cancer with its own mutations and quirks, its <b>cell background</b>. A gene that matters in one line may matter only because of that line's quirks. A hit that works in <b>different backgrounds</b> is more likely to be a general weak spot. That is what "background independent" means: the same effect in more than one background. It is a step toward generality, not proof of it.</p>` },
    { k: 'paper', ref: 'intro-p5', quote: `Highly focused single background/single hallmark screen designs, including those above, are vulnerable to discovering lncRNAs promoting cell-line-specific phenotypes that do not generalize to the disease in question.` },
    { k: 'plain', source: ['res-integration-p3', 'res-multipheno-p6', 'fig4E'], html: `
      <p>The authors tested this worry on their own data. Hits from ordinary dropout screens tend to be active only in the cell type where they were discovered (fig4E, left: the key lists A549 dropout hits n=72, H460 dropout hits n=58 and hits in both n=5). The pan-hallmark hits (n=80) are active in both cell types (fig4E, right). Even the positive controls overlapped only partly: of the 109 in the library, 37 scored in A549 and 16 in H460, and 10 in both (p=0.011, hypergeometric test).</p>` },
    { k: 'flag', source: ['res-multipheno-p6', 'res-integration-p3'], html: `
      <p>The paper words the A549 vs H460 comparison in two ways: "a significant concordance among identified targets" (res-multipheno-p6) and "a low degree of concordance" (res-integration-p3). They probably measure different things (the scores of all targets, and the lists of called hits). A significant correlation can still be weak, so read "low" as "weak overlap of hits", not "none".</p>` },
    { k: 'plain', source: ['res-aso-p2', 'res-aso-p3', 'res-aso-p6', 'res-aso-p7', 'res-mechanism-p2', 'fig6I'], html: `
      <p>They then tested more models. ASOs were retested in H460 and H441 with similar results, and were active in additional KRAS+ and EGFR-mutant cell lines, in H441 spheroids and in a patient-derived organoid. The gene changes after CHiLL1 knockdown correlated between A549 and H460, and so did those after GCAWKR knockdown (R=0.8). In normal lung cells the response was diminished or absent.</p>` },
    { k: 'flag', source: ['res-aso-p3', 'fig5A', 'm-expmodel-p1'], html: `
      <p>One of the normal lines is printed "CCD-12Lu" in the text of res-aso-p3, but CCD-16Lu in Figure 5A and in the Methods. It is probably one cell line with a typo in one place.</p>` },
    { k: 'plain', source: ['limitations-p2'], html: `
      <p>The authors themselves say that they screened in two monolayer cell backgrounds, and that future screens should be run in parallel across the widest panel of mutationally matched 2D and 3D models.</p>` },
    { k: 'memory', html: `
      <p><b>Analogy: a recipe page in a cookbook.</b> CRISPR-del <i>tears the page out</i>. The recipe is gone, but so is anything else printed on that page: a margin note (an enhancer) or the start of another recipe on the back (the opposite-strand gene). An ASO <i>shreds only the photocopy</i> the cook is holding. If the dish still fails without the photocopy, the recipe matters, not the page.</p>
      <p>For cell lines: a recipe that works only in one oven may just suit that oven. A recipe that works in two different ovens is a better bet.</p>
      <p>Where the analogy breaks: a cell keeps making new photocopies from the page, so an ASO has to keep up with the supply.</p>` },
  ],
  appears: [
    { ref: 'limitations-p1', note: 'False positives from DNA effects; ASO validation resolves them; 8/12 confirmed.' },
    { ref: 'res-validation-p4', note: 'Deletion cannot tell DNA from RNA effects; two ASOs per gene pick LINC00115 at candidate 205.' },
    { ref: 'res-aso-p3', note: 'Two independent ASOs, CRISPR-del replication, and overexpression that could not rescue.' },
    { ref: 'res-mechanism-p2', note: 'Two CHiLL1 ASOs give highly correlated RNA-seq changes, read as on-target.' },
    { ref: 'res-integration-p3', note: 'Single-screen hits are cell-line specific; pan-hallmark hits are active in both cell types.' },
    { ref: 'fig4E', note: 'The cell-line-specific effects plot: dropout hits vs pan-hallmark hits in A549 and H460.' },
  ],
  checks: [
    { q: 'At candidate 205 two genes share one start region. Which result let the authors point to LINC00115 rather than RP11-206L10.11?',
      options: [
        { t: 'ASOs against LINC00115 slowed A549 growth, while ASOs against RP11-206L10.11 did not', ok: true, why: 'Right (fig3D): gene-specific ASOs can separate two genes that a deletion hits together.' },
        { t: 'The CRISPR deletion removed the start of LINC00115 only', ok: false, why: 'The two genes share the start region, so one deletion removes both. That is exactly why ASOs were needed.' },
        { t: 'A gel showed a deletion band only with LINC00115 guides', ok: false, why: 'A gel shows that DNA was cut, not which of two overlapping genes matters. The paper used gene-specific ASOs for that.' },
        { t: 'RNA-seq showed that only LINC00115 is expressed in A549', ok: false, why: 'The paper does not use expression levels to decide. It used gene-specific ASOs.' },
      ], source: ['res-validation-p4', 'fig3D'] },
    { q: 'Why does reproducing a CRISPR-del phenotype with ASOs point to an RNA-dependent mechanism?',
      options: [
        { t: 'An ASO leaves the DNA intact and destroys only the RNA, so a lost DNA element cannot explain the phenotype', ok: true, why: 'Right: deletion alone cannot separate DNA-dependent from RNA-dependent mechanisms (res-validation-p4), but an ASO can.' },
        { t: 'An ASO deletes DNA more precisely than CRISPR does', ok: false, why: 'ASOs do not touch DNA at all. They act on the RNA.' },
        { t: 'An ASO raises RNA levels, which compensates for the deletion', ok: false, why: 'The opposite: ASOs lower the amount of their target RNA.' },
        { t: 'The ASO experiment is done in a second cell line', ok: false, why: 'The cell line is not the point. The point is that ASOs act on RNA and not on DNA.' },
      ], source: ['res-validation-p4'] },
    { q: 'Which observation shows that ordinary dropout hits are more cell-line-specific than the pan-hallmark hits?',
      options: [
        { t: 'Dropout hits tended to work only in the cell line where they were found (n=72 and n=58 against n=5 in both), while the 80 pan-hallmark hits were active in both cell types', ok: true, why: 'Right (res-integration-p3, fig4E): single-screen hits tend to be active only in the cell type where they were discovered.' },
        { t: 'Most dropout hits were shared by A549 and H460', ok: false, why: 'Reversed: hits tend to be active only where they were discovered, and the key of fig4E lists just n=5 hits in both.' },
        { t: 'The pan-hallmark hits were found only in A549', ok: false, why: 'They were active in both cell types (fig4E, right).' },
        { t: 'All 109 positive controls scored in both cell lines', ok: false, why: 'No: 37 scored in A549 and 16 in H460, and only 10 in both (res-multipheno-p6).' },
      ], source: ['res-integration-p3', 'fig4E', 'res-multipheno-p6'] },
  ],
}
);

(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(
/* ============================================================================================== H3 */
{
  id: 'H3',
  body: [
    { k: 'h', text: 'Why read the limitations first?' },
    { k: 'bgnd', html: `
      <p>Authors know their own work best. The <b>Limitations</b> section is where they say, in their own words, what the study cannot show. For an exam it is gold: a good critique can be built from it. Below, each sentence is quoted and then translated into plain words. My own notes on <b>why it matters</b> sit in separate amber boxes, so you can tell the paper's words from my reasoning.</p>` },
    { k: 'svg', caption: 'Three places where a hit list can be wrong, as the authors describe them: lncRNAs never screened, known lncRNAs missed, and hits that are not really RNA effects.',
      svg: `<svg viewBox="0 0 480 252" role="img" aria-label="A four-step pipeline from catalog to screen to hit list to ASO check, with red notes showing where the list can be wrong: lncRNAs never screened or with the wrong start site, known lncRNAs missed as false negatives, and DNA-dependent false positives getting into the hit list.">
        <rect x="190" y="8" width="284" height="44" rx="8" class="f-blue"/>
        <text x="332" y="28" class="mid b">Catalog: 831 lncRNAs</text><text x="332" y="45" class="mid s">expressed in A549 cells</text>
        <path d="M332 52 V71" class="arrow"/>
        <rect x="190" y="72" width="284" height="44" rx="8" class="f-green"/>
        <text x="332" y="92" class="mid b">Screen: CRISPR-del</text><text x="332" y="109" class="mid s">two monolayer cell lines</text>
        <path d="M332 116 V135" class="arrow"/>
        <rect x="190" y="136" width="284" height="44" rx="8" class="f-orange"/>
        <text x="332" y="156" class="mid b">Hit list</text><text x="332" y="173" class="mid s">what the screen calls a hit</text>
        <path d="M332 180 V199" class="arrow"/>
        <rect x="190" y="200" width="284" height="44" rx="8" class="f-teal"/>
        <text x="332" y="220" class="mid b">ASO check</text><text x="332" y="237" class="mid s">8 of 12 hits confirmed</text>
        <path d="M188 30 H162" class="arrow s-red"/>
        <text x="156" y="25" class="end s t-red">never screened,</text><text x="156" y="41" class="end s t-red">wrong start site</text>
        <path d="M188 90 H162" class="arrow s-red"/>
        <text x="156" y="78" class="end s t-red">missed hits:</text><text x="156" y="94" class="end s t-red">MALAT1, MIAT</text><text x="156" y="110" class="end s t-red">(false negatives)</text>
        <path d="M162 154 H188" class="arrow s-red"/>
        <text x="156" y="142" class="end s t-red">false positives:</text><text x="156" y="158" class="end s t-red">DNA-dependent,</text><text x="156" y="174" class="end s t-red">e.g. 408, 316</text>
      </svg>` },

    { k: 'h', text: 'Paragraph 1: the risk of false positives' },
    { k: 'paper', ref: 'limitations-p1', quote: `One important caveat of CRISPR-del, in common with CRISPRi, is the risk of false-positive hits arising from unintentional targeting of overlapping cis- or trans-acting elements, such as DNA regulatory regions or opposite-strand lncRNA genes.` },
    { k: 'plain', source: ['limitations-p1'], html: `<p>The main caveat of the deletion method (CRISPRi shares it) is false positives. The cut may disturb other DNA that overlaps the target, such as a regulatory region or a gene on the opposite strand, so a growth defect may not come from the lncRNA at all.</p>` },
    { k: 'paper', ref: 'limitations-p1', quote: `Fortunately, these cases can be resolved by ASO validation, which can assign correct-strand RNA-mediated mechanisms for observed phenotypes.` },
    { k: 'plain', source: ['limitations-p1'], html: `<p>The cure is to test hits with ASOs. An ASO acts on the RNA from one strand, so it shows whether the RNA is responsible, and which strand's gene it is.</p>` },
    { k: 'bgnd', html: `<p><b>Why the first two sentences matter.</b> A screen hit says "cutting here hurt the cells", not "the RNA made here does something". That gap is why the ASO follow-up exists. Treat the hit list as strong leads, not as proven RNA-dependent genes. See <a href="#/lesson/H2">H2</a>.</p>` },
    { k: 'paper', ref: 'limitations-p1', quote: `Our careful ASO validation indicated that while the majority of screen hits arise via the intended lncRNA-dependent mechanism, there were instances of likely false positives, i.e., candidates 408/316 (Figure 5A).` },
    { k: 'plain', source: ['limitations-p1'], html: `<p>Their ASO tests suggest that most tested hits work through the intended lncRNA, but a few are probably false positives. They name candidates 408 and 316 (rows in fig5A).</p>` },
    { k: 'paper', ref: 'limitations-p1', quote: `A similar strategy could also narrow down LINC00115 as the functional lncRNA in the bidirectional locus candidate 205 (Figure 3A).` },
    { k: 'plain', source: ['limitations-p1', 'res-validation-p4', 'fig3D'], html: `<p>The same ASO strategy can pick LINC00115 as the working gene at candidate 205, where two genes share one start region. (The Results already do this with two ASOs per gene: fig3D.)</p>` },
    { k: 'paper', ref: 'limitations-p1', quote: `Overall, we could validate 8/12 (67%) lncRNA hits using ASOs (9 for proliferation/cisplatin, 3 for migration), suggesting that around one-third of screen hits may act via DNA-dependent mechanisms.` },
    { k: 'plain', source: ['limitations-p1', 'res-aso-p1'], html: `<p>Overall, ASOs confirmed 8 of 12 hits (67%): 9 were tested for proliferation/cisplatin and 3 for migration. The authors read this as: around one-third of screen hits may act through DNA rather than RNA. The nine lncRNAs tested for proliferation and cisplatin sensitivity (Tier 1) were chosen manually from top-ranked hits for novelty and lack of protein-coding evidence.</p>` },
    { k: 'flag', source: ['limitations-p1', 'fig5B', 'res-validation-p5', 'res-aso-p2'], html: `<p><b>Counting note (my reading).</b> Candidate 215 is named among the five Tier 2 lncRNAs (the legend of fig5B lists the other four and says data were not available for 215) and also among the three migration validations. So "12" probably counts 215 once for each phenotype. The paper does not explain its counting: quote its numbers as printed.</p>` },
    { k: 'bgnd', html: `<p><b>Why the last three sentences matter.</b> Reporting your own failures is a mark of honest work. But 8/12 comes from a small set that the authors chose, so "one-third" is a rough estimate, not a measured rate for all hits. An ASO can also fail for technical reasons, so "not confirmed" does not prove a DNA-dependent mechanism.</p>` },

    { k: 'h', text: 'Paragraph 2: what remains to be done' },
    { k: 'paper', ref: 'limitations-p2', quote: `Nonetheless, several issues remain to be addressed in the future. This study identified known and new lncRNAs promoting NSCLC but is clearly not comprehensive in terms of excluding that other lncRNAs play important disease roles.` },
    { k: 'plain', source: ['limitations-p2'], html: `<p>Several issues remain. The study found known and new lncRNAs that promote NSCLC, but it cannot rule out that other lncRNAs matter too. The hit list is not a complete census.</p>` },
    { k: 'bgnd', html: `<p><b>Why it matters.</b> A hit list is a floor, not a ceiling. "Not a hit" does not mean "no role". In an exam, never write that the paper showed other lncRNAs are unimportant.</p>` },
    { k: 'paper', ref: 'limitations-p2', quote: `Despite targeting an extensive catalog comprising 831 lncRNAs detected at a permissive expression cutoff in A549 cells, it is likely that we overlooked many valuable targets due to the relative inefficiency of CRISPR-del as a perturbation compared with ORF mutation and also due to ongoing annotation incompleteness, resulting in lncRNAs that were either not screened or whose TSS was incorrectly targeted.` },
    { k: 'plain', source: ['limitations-p2', 'res-multipheno-p3', 'fig2F'], html: `<p>Even with 831 lncRNAs detected in A549 cells (at a permissive expression cutoff), many valuable targets were probably missed, for two reasons. Deleting a start site is less efficient than breaking the protein-coding sequence directly (ORF mutation). And the catalogs are still incomplete, so some lncRNAs were never screened, or the wrong start site was cut. (The Results show the first gap: promoter-deleting guides had a detectable but lower impact than ORF-targeting guides, fig2F.)</p>` },
    { k: 'bgnd', html: `<p><b>Why it matters.</b> Three gaps hide in this sentence: which lncRNAs were in the library at all (the catalog came from one cell line's expression data), how well the tool switches genes off, and whether the start site is where the catalog says it is. Each gap lowers the number of true hits you can find.</p>` },
    { k: 'paper', ref: 'limitations-p2', quote: `For example, we could correctly identify some lncRNAs known to be involved in lung cancer pathogenesis like PVT1, LINC00680, and PCAT7 (Figure 2H) but, surprisingly, not MALAT1 or MIAT.` },
    { k: 'plain', source: ['limitations-p2'], html: `<p>As a check, the screen did find known lung-cancer lncRNAs (PVT1, LINC00680, PCAT7) but, surprisingly, missed MALAT1 and MIAT.</p>` },
    { k: 'flag', source: ['limitations-p2', 'fig2G', 'fig2H'], html: `<p>The sentence cites Figure 2H, but PVT1, LINC00680 and PCAT7 are labelled in fig2G (the A549 dropout plot), not in fig2H. It is probably a panel-letter slip: look in fig2G.</p>` },
    { k: 'paper', ref: 'limitations-p2', quote: `The reason for the latter false negatives is unclear, although it may reflect their unusually high expression and/or else the presence of alternative TSSs that compensate for the loss of the targeted promoter.` },
    { k: 'plain', source: ['limitations-p2'], html: `<p>The authors do not know why those two were missed. Two possible reasons: unusually high expression, and/or alternative start sites that keep the gene on when the targeted promoter is deleted.</p>` },
    { k: 'paper', ref: 'limitations-p2', quote: `This may be overcome in the future by employing complementary direct RNA-targeting CRISPR perturbations, such as Cas13.` },
    { k: 'plain', source: ['limitations-p2'], html: `<p>A fix for the future: add CRISPR tools that attack the RNA directly, such as Cas13.</p>` },
    { k: 'bgnd', html: `<p><b>Why the last three sentences matter.</b> Known genes work as a built-in sensitivity test: finding some shows the screen can see real ones, and missing two shows it cannot see all. The two reasons are hypotheses; the sentence itself calls the cause "unclear". In an exam write "may reflect", not "was caused by". A tool that works on the RNA would not care which start site made it.</p>` },
    { k: 'paper', ref: 'limitations-p2', quote: `We screened in two monolayer cell backgrounds; however, future screens should be performed in parallel across the widest panel of mutationally matched 2D and 3D models.` },
    { k: 'plain', source: ['limitations-p2'], html: `<p>The screens used only two cell backgrounds, both grown flat (monolayer). Future screens should run in parallel across the widest panel of 2D and 3D models that match in their mutations.</p>` },
    { k: 'paper', ref: 'limitations-p2', quote: `Finally, our screens discovered scores of lncRNAs that could not be followed up here and hopefully will provide a fertile source of new targets in the future.` },
    { k: 'plain', source: ['limitations-p2'], html: `<p>Many lncRNAs found in the screens were not followed up. The authors hope they will be a source of new targets.</p>` },
    { k: 'bgnd', html: `<p><b>Why the last two sentences matter.</b> Everything the screens themselves found rests on two cell lines. Matching mutations matters because, if models differ in several ways at once, you cannot tell which difference explains a result. And the unexplored hits are both a selling point (a resource) and a limit: they have screen-level evidence only.</p>` },

    { k: 'h', text: 'The declared patent and conflict of interest' },
    { k: 'paper', ref: 'decl-p1', quote: `T.P., R.E., and R.J. have filed a patent application (21202363.4) relating to the therapeutic targeting of lncRNAs identified here. Applicant: University of Bern. R.J. is a paid consultant for NextRNA (USA).` },
    { k: 'plain', source: ['decl-p1', 'contrib-p1'], html: `
      <ul>
        <li>Three of the authors, named by initials, have <b>filed</b> a patent application (number 21202363.4) about the therapeutic targeting of the lncRNAs identified in this paper. The applicant is the University of Bern.</li>
        <li>One of them, R.J., is a paid consultant for NextRNA (USA).</li>
        <li>The author contributions (contrib-p1) list the same three as the people who conceived and designed the experiment procedure, did data analysis and interpretation, and wrote the manuscript.</li>
        <li>The declaration does not say what the patent covers beyond that one sentence, whether it has been granted, or what NextRNA does.</li>
      </ul>` },
    { k: 'plain', source: ['ack-p1'], html: `<p>The acknowledgments name these funders: the Swiss National Science Foundation, the Medical Faculty and University Hospital of Bern, the Helmut Horten Stiftung, the Swiss Cancer Research Foundation and Science Foundation Ireland. NextRNA is not named there.</p>` },
    { k: 'bgnd', html: `
      <p><b>Patent application.</b> A <b>patent</b> is a legal right, granted by a state patent office, to stop others from making or selling an invention for a limited time. A <b>patent application</b> is only the request. It can be granted, narrowed or refused. Universities often file as the "applicant" while the researchers who made the invention are named as inventors.</p>
      <p><b>Conflict of interest.</b> A <b>conflict of interest</b> is a situation where something outside the research, such as money, a job or a patent, could influence (or could look as if it influences) a person's judgment. Journals ask authors to declare such "competing interests" so that readers can take them into account. A declaration is not an accusation and does not show that the results are wrong. It is a transparency step. In medical research it is common for the people who do the work to also be the inventors.</p>` },
    { k: 'bgnd', html: `<p><b>How a fair critic uses this.</b> State what is declared, neutrally. Then ask whether the claims that matter commercially, here that these lncRNAs are promising drug targets, are backed by controls and by evidence that other people could repeat. Do <i>not</i> argue "they have a patent, so the data are unreliable": that is not evidence about the data. Independent replication by other labs, and tests in animals, would be the cleanest way to settle any doubt (see <a href="#/lesson/H4">H4</a>).</p>` },
    { k: 'memory', html: `
      <p><b>Analogy: a food label.</b> The limitations are the "may contain traces of…" line: honest, specific, and useful to the person who has to decide. The declaration of interests is like a note that the chef also owns the farm. It is not a reason to throw the food away, but you want to know it when you judge the taste test.</p>
      <p>Where the analogy breaks: a regulator checks a food label, but the authors write both the limitations and the declaration themselves.</p>` },
  ],
  appears: [
    { ref: 'limitations-p1', note: 'Sentence by sentence: false positives, ASO validation, candidates 408/316, 8/12 (67%).' },
    { ref: 'limitations-p2', note: 'Not comprehensive, false negatives (MALAT1, MIAT), Cas13 as a fix, two monolayer cell lines.' },
    { ref: 'decl-p1', note: 'The declared patent application and the paid consultancy.' },
    { ref: 'contrib-p1', note: 'Who conceived and designed the experiments and wrote the manuscript.' },
    { ref: 'res-validation-p4', note: 'The candidate 205 example: two ASOs per gene pick LINC00115.' },
  ],
  checks: [
    { q: 'According to the Limitations, how can the false-positive risk of CRISPR-del (a hit that is really a DNA effect) be resolved?',
      options: [
        { t: 'By ASO validation, which can assign correct-strand RNA-mediated mechanisms to the phenotype', ok: true, why: 'Right (limitations-p1): ASOs act on the RNA of one strand, so they separate RNA effects from DNA effects.' },
        { t: 'By repeating the screen in a third cell line', ok: false, why: 'A third line would test generality. It would not separate a DNA effect from an RNA effect.' },
        { t: 'By Cas13 screens, which the paper uses to settle DNA vs RNA effects', ok: false, why: 'Cas13 appears in limitations-p2 as a future fix for missed hits (false negatives), not as the tool used here for DNA vs RNA.' },
        { t: 'By checking whether the hit is amplified in tumors', ok: false, why: 'Amplification in tumors is supporting evidence of relevance (fig4H). It says nothing about whether the effect works through DNA or RNA.' },
      ], source: ['limitations-p1'] },
    { q: 'MALAT1 and MIAT, both known lung-cancer lncRNAs, were not found as hits. Which explanation do the authors offer as possible?',
      options: [
        { t: 'Unusually high expression, and/or alternative start sites that compensate for the deleted promoter', ok: true, why: 'Right (limitations-p2): they call the reason "unclear" and give these two possibilities.' },
        { t: 'ASOs against them were toxic to normal cells', ok: false, why: 'ASOs are not part of this explanation. The misses are false negatives of the deletion screen.' },
        { t: 'They were left out of the library because they lie close to a protein-coding exon', ok: false, why: 'The paper does not give this reason. It says the cause is unclear and offers only the two possibilities above.' },
        { t: 'The authors showed that they have no role in lung cancer', ok: false, why: 'The paper calls them lncRNAs known to be involved in lung cancer pathogenesis. It does not say they are unimportant.' },
      ], source: ['limitations-p2'] },
    { q: 'A reader wants to weigh the declared patent application and consultancy fairly. Which response is most reasonable?',
      options: [
        { t: 'Note it as a declared interest, then check whether the key claims are backed by controls and by evidence others could repeat', ok: true, why: 'Right: a declaration is transparency, not an accusation. It tells you where to look carefully (decl-p1).' },
        { t: 'Reject the paper, because authors who file a patent cannot be trusted', ok: false, why: 'A declared interest does not by itself show that the data are wrong. It is a reason for extra care, not for rejection.' },
        { t: 'Ignore it: declarations are only required when fraud is suspected', ok: false, why: 'Journals ask for declarations so that readers can weigh possible influence. Fraud is a separate matter.' },
        { t: 'Conclude that the patent proves the targets work', ok: false, why: 'The paragraph says a patent application was filed. That is a request, not a result, and it is not evidence that the targets work.' },
      ], source: ['decl-p1'] },
  ],
}
);

(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(
/* ============================================================================================== H4 */
{
  id: 'H4',
  body: [
    { k: 'h', text: 'Claim → Check → Gap → Fix' },
    { k: 'bgnd', html: `
      <p>A good critique is not "is it good or bad?". It has four steps: the <b>Claim</b>; the <b>Checks</b> that support it (H1); the <b>Gap</b> that remains (H3); and the <b>Fix</b>, the experiment that would close the gap. A fix is only useful if you also say what each possible result would mean.</p>
      <p>Everything under "Fix" in this lesson is <b>my reasoning</b>, not the paper's. What the paper itself says stays in the blue boxes, with sources.</p>` },
    { k: 'svg', caption: 'One worked example of the four-step habit, using this paper. The Gap and Fix boxes are my evaluation; the Claim and Check boxes restate what the paper reports.',
      svg: `<svg viewBox="0 0 480 304" role="img" aria-label="Four stacked boxes joined by arrows: Claim, knocking down CHiLL1 or GCAWKR slows lung cancer cells; Check, two ASOs, a control ASO, CRISPR-del agrees, flat cultures, spheroids and one organoid line; Gap, no rescue, no animal test, one organoid line, small n in some panels; Fix, a working rescue, a mouse test with RNA level measured, more organoid lines, more replicates.">
        <rect x="6" y="6" width="96" height="58" rx="8" class="f-blue"/><text x="54" y="41" class="mid b l">CLAIM</text>
        <rect x="112" y="6" width="362" height="58" rx="8" class="f-blue"/><text x="124" y="30" class="s">Knocking down CHiLL1 or GCAWKR slows lung</text><text x="124" y="49" class="s">cancer cells, and less so normal lung cells</text>
        <path d="M54 64 V83" class="arrow"/>
        <rect x="6" y="84" width="96" height="58" rx="8" class="f-green"/><text x="54" y="119" class="mid b l">CHECK</text>
        <rect x="112" y="84" width="362" height="58" rx="8" class="f-green"/><text x="124" y="108" class="s">Two ASOs, a control ASO, CRISPR-del agrees,</text><text x="124" y="127" class="s">flat cultures, spheroids, one organoid line</text>
        <path d="M54 142 V161" class="arrow"/>
        <rect x="6" y="162" width="96" height="58" rx="8" class="f-orange"/><text x="54" y="197" class="mid b l">GAP</text>
        <rect x="112" y="162" width="362" height="58" rx="8" class="f-orange"/><text x="124" y="186" class="s">No rescue, no animal test, one organoid line,</text><text x="124" y="205" class="s">small n in some mechanism panels</text>
        <path d="M54 220 V239" class="arrow"/>
        <rect x="6" y="240" width="96" height="58" rx="8" class="f-purple"/><text x="54" y="275" class="mid b l">FIX</text>
        <rect x="112" y="240" width="362" height="58" rx="8" class="f-purple"/><text x="124" y="264" class="s">A rescue that works, a mouse test with RNA</text><text x="124" y="283" class="s">level measured, more organoid lines, more n</text>
      </svg>` },

    { k: 'h', text: 'Open points, from the paper' },
    { k: 'plain', source: ['limitations-p1', 'res-aso-p1', 'res-aso-p3', 'res-aso-p7', 'discussion-p5', 'limitations-p2', 'fig5A', 'fig5F', 'fig6B', 'fig6K', 'fig3D', 'fig5E', 'fig6L', 'm-aso-p1'], html: `
      <ul>
        <li><b>DNA-dependent hits.</b> The authors say around one-third of screen hits may act via DNA-dependent mechanisms, based on 8/12 hits confirmed by ASOs. The nine proliferation/cisplatin hits were chosen manually (limitations-p1, res-aso-p1).</li>
        <li><b>No rescue.</b> Overexpression of neither CHiLL1 nor GCAWKR could rescue ASO-induced phenotypes (res-aso-p3).</li>
        <li><b>No in vivo delivery yet.</b> The Discussion says future efforts will be required to refine ASO sequences and chemistry and to deliver them in vivo (discussion-p5). The ASO tests in the main text are in cultured cells, spheroids and organoids.</li>
        <li><b>One organoid line.</b> The organoid test used BE874, grown from a single KRAS+ patient-derived xenograft, and the main text describes CHiLL1 ASOs only (fig5F, res-aso-p7).</li>
        <li><b>Two screening backgrounds</b> (limitations-p2).</li>
        <li><b>Small n.</b> The cell-cycle assay has n = 2 biological replicates (fig6K), and the FISH ratio panel prints n=1 (fig6B).</li>
        <li><b>One-tailed tests.</b> Several legends report one-tailed t tests (fig3D, fig5E, fig5F, fig6L).</li>
        <li><b>Different doses.</b> The Methods give 25 nM ASO for A549, H460, NCI-H441 and MRC5-CV1 but 10 nM for HBEC3-KT and CCD-16LU, and do not say why (m-aso-p1). For the normal cells, fig5A reports the change in viability; the main text does not report the knockdown level there.</li>
      </ul>` },
    { k: 'bgnd', html: `
      <p><b>How I weigh them (my evaluation).</b> None of these is an error. Each is a place where the evidence is thinner than a bigger claim would need. The paper's claim is smaller than "this is a drug": it says promising <i>targets</i>, with delivery still to be solved. So judge each weakness against the claim actually made.</p>
      <p>Two points deserve a question. The dose difference: a lower dose may have been chosen to limit transfection toxicity (the Methods do not say), but it means a smaller response in those two lines cannot yet be read as pure cancer selectivity. And one-tailed tests only ask "is it lower?", an easier bar than a two-tailed test; they are fair when the direction was fixed in advance, but a skeptic would prefer two-tailed.</p>` },

    { k: 'h', text: 'Experiments that would strengthen the work' },
    { k: 'bgnd', label: '📚 Background · my suggestions, not from the paper', html: `
      <p><b>1. A rescue that can work.</b><br><i>Weak spot:</i> overexpression did not rescue the ASO phenotype, so "on-target" rests on indirect evidence.<br><i>Experiment:</i> put the RNA back from a construct the ASO cannot recognize (for example with the ASO's target site altered), then treat with the ASO.<br><i>If growth returns:</i> strong proof that the RNA is the cause. <i>If not:</i> either the effect is off-target, or the lncRNA works only when made at its own locus (the cis idea the authors raise). Those two options then need separate tests.</p>
      <p><b>2. A second, ASO-independent knockdown.</b><br><i>Weak spot:</i> the on-target case leans on ASOs, and CRISPR-del acts on DNA.<br><i>Experiment:</i> remove the two RNAs by a method that works differently, such as Cas13 (which the authors suggest for another purpose).<br><i>Same phenotypes:</i> an ASO-specific artifact becomes very unlikely. <i>Different phenotypes:</i> look for something particular to the ASOs.</p>
      <p><b>3. A matched-dose comparison with normal cells.</b><br><i>Weak spot:</i> two normal lines got a lower dose than the cancer lines, and the knockdown in normal cells is not reported in the main text.<br><i>Experiment:</i> for the same ASOs, measure RNA knockdown and a dose-response curve (several concentrations) in cancer and normal lines.<br><i>Equal knockdown but normal cells barely react:</i> a real safety window. <i>Weaker knockdown, or reactions only at higher doses:</i> the "low toxicity" claim is weaker than it looks.</p>
      <p><b>4. More models.</b><br><i>Weak spot:</i> two screening backgrounds, and organoid data from one patient-derived line.<br><i>Experiment:</i> test both ASOs in organoids from several patients, KRAS+ and others, and ask whether the response follows the lncRNA's expression level.<br><i>Most respond:</i> good generality. <i>Only some respond:</i> you learn which tumors might benefit, which is useful in itself.</p>
      <p><b>5. An animal test with a delivery readout.</b><br><i>Weak spot:</i> no in vivo delivery is shown.<br><i>Experiment:</i> treat mice carrying human tumors with the ASO or a non-targeting control ASO, and measure the RNA level in the tumor, tumor growth and signs of toxicity (such as body weight).<br><i>Tumors shrink, RNA is down, no toxicity:</i> the strongest support so far. <i>No shrinkage:</i> the tumor RNA level tells you why. RNA not lowered means a delivery problem. RNA lowered but no effect means the dependence seen in dishes does not hold in a tumor.</p>
      <p><b>6. A bigger, unbiased ASO test of screen hits.</b><br><i>Weak spot:</i> the confirmation rate comes from a small set the authors chose, yet it is used to say how many hits may be DNA-dependent.<br><i>Experiment:</i> pick hits at random, including weaker ones, test each with two ASOs, and report the confirmation rate with a confidence interval.<br><i>Stays near two-thirds:</i> the estimate stands. <i>Much lower:</i> the screen has more DNA-dependent false positives than the paper says. <i>Higher:</i> fewer.</p>
      <p><b>7. (Cheap) More replicates.</b> Repeat the n = 2 and n=1 mechanism panels with more replicates and a two-tailed test fixed in advance. If the pattern holds, the mechanism details are solid. If not, drop the detail.</p>` },

    { k: 'h', text: 'Strengths and weaknesses, side by side' },
    { k: 'plain', source: ['res-integration-p3', 'res-multipheno-p3', 'res-aso-p3', 'res-aso-p6', 'res-aso-p7', 'limitations-p1', 'limitations-p2', 'discussion-p2', 'discussion-p4', 'fig4B', 'fig4E', 'fig2F', 'fig6E', 'fig5C', 'fig5E', 'fig5F'], html: `
      <p><b>Strengths the paper shows:</b></p>
      <ul>
        <li><b>Two backgrounds, three hallmarks, one ranking.</b> Parallel screens in A549 and H460, and a combined ranking that classified controls better than single dropout screens (fig4B). Pan-hallmark hits were active in both cell types (fig4E).</li>
        <li><b>Controls behaved.</b> Positive-control guides were depleted and neutral ones were not (fig2F).</li>
        <li><b>Independent confirmation.</b> Two ASOs per gene plus CRISPR-del for the final two, and highly correlated RNA-seq changes between two CHiLL1 ASOs (res-aso-p3, fig6E).</li>
        <li><b>Escalating models.</b> Flat cultures, spheroids and a patient-derived organoid line (fig5C, fig5E, fig5F).</li>
        <li><b>A diminished or absent response in normal lung cells</b> (res-aso-p3).</li>
        <li><b>Open about limits.</b> The Limitations name likely false positives and known lncRNAs that were missed (limitations-p1, limitations-p2).</li>
        <li><b>A resource.</b> The library and the maps are offered for future discovery (discussion-p2, discussion-p4).</li>
      </ul>` },
    { k: 'bgnd', html: `<p><b>Weaknesses, in one line each (from the open points above).</b> On-target proof is indirect (no rescue). Everything is in cultured cells, with delivery unsolved. Generality rests on two screening backgrounds and one organoid line. The normal-cell comparison used different doses. A few mechanism panels have n = 2 or n=1. Notice the pattern: most weaknesses are <i>what a first paper cannot yet do</i>, not mistakes in what it did.</p>` },
    { k: 'h', text: 'A sample essay answer' },
    { k: 'bgnd', label: '📚 Background · a sample answer, in my words', html: `
      <p><b>Question:</b> <i>"Critically evaluate the evidence that CHiLL1 and GCAWKR are promising therapeutic targets in lung cancer."</i></p>
      <p><b>1. Position.</b> The evidence makes them credible <i>candidate</i> targets. It does not yet show that they are validated drug targets.</p>
      <p><b>2. Strengths.</b> They emerged from a systematic screen across three hallmarks and two cell lines, ranked by a method that classified control genes better than single dropout screens (AUC 0.82 against 0.73 and 0.54). Their phenotypes were reproduced with two independent ASOs per gene and with CRISPR deletion, and gene changes after two CHiLL1 ASOs were highly correlated (R=0.75). The effect held in spheroids and in one organoid line, and was diminished or absent in three non-transformed lung cell lines.</p>
      <p><b>3. Weaknesses.</b> Overexpression did not rescue the ASO phenotype, so the on-target case is indirect. No in vivo delivery is shown, and the authors say it is still needed. The organoid data come from one patient-derived line, with CHiLL1 ASOs only in the main text. The normal-cell comparison used a lower dose in two of the three lines, and some mechanism panels have n = 2 or n=1.</p>
      <p><b>4. What would help.</b> A rescue with an ASO-resistant construct, a matched-dose comparison in normal cells, and a mouse study that measures knockdown in the tumor.</p>
      <p><b>5. Verdict.</b> Careful, well-controlled discovery work with an honest limitations section. The therapeutic claim is framed as "potential", which fits the evidence; the next step is in vivo evidence.</p>` },
    { k: 'memory', html: `
      <p><b>Memory aid: Claim, Check, Gap, Fix.</b> Think of a bridge inspector's report. <b>Claim:</b> the bridge holds forty tons. <b>Check:</b> the load tests already done. <b>Gap:</b> the part not yet tested. <b>Fix:</b> the extra test that would settle it, and what each result would mean.</p>
      <p>Where the analogy breaks: nobody can test everything in biology either, so the skill is to say which gap matters most for the claim actually made.</p>` },
  ],
  appears: [
    { ref: 'discussion-p5', note: 'What makes CHiLL1 and GCAWKR promising, and what future work (in vivo delivery) must do.' },
    { ref: 'limitations-p1', note: 'The 8/12 confirmation rate and the "around one-third" estimate.' },
    { ref: 'limitations-p2', note: 'Two monolayer cell lines, missed lncRNAs, and Cas13 as a future tool.' },
    { ref: 'res-aso-p3', note: 'Normal cells, two independent ASOs, and the overexpression that could not rescue.' },
    { ref: 'res-aso-p7', note: 'The organoid test: CHiLL1 ASOs in one patient-derived line.' },
    { ref: 'm-aso-p1', note: 'Final ASO doses: 25 nM for most lines, 10 nM for two of the normal lines.' },
  ],
  checks: [
    { q: 'The overexpression rescue did not work. Which new experiment would best strengthen the claim that the RNA itself causes the ASO phenotype?',
      options: [
        { t: 'Re-express the lncRNA from a construct the ASO cannot bind, then add the ASO and see whether growth returns', ok: true, why: 'Right: if growth returns, the RNA is the cause. If it does not, you must ask whether the effect is off-target or needs the RNA to be made at its own locus (res-aso-p3).' },
        { t: 'Test the same ASOs in more cell lines', ok: false, why: 'More cell lines test generality. They do not show that the RNA causes the effect.' },
        { t: 'Count how many TCGA tumors express the lncRNA', ok: false, why: 'Expression in tumors shows relevance, not cause.' },
        { t: 'Give the normal cells a higher ASO dose', ok: false, why: 'That addresses safety, not whether the cancer-cell effect is on-target.' },
      ], source: ['res-aso-p3'] },
    { q: 'A mouse tumor treated with a CHiLL1 ASO does not shrink. Which extra measurement best tells you whether delivery or biology is the problem?',
      options: [
        { t: 'The CHiLL1 RNA level in the treated tumor', ok: true, why: 'Right: if the RNA is not lowered, the ASO did not reach or act in the tumor (the delivery problem the authors say is still to be solved, discussion-p5). If it is lowered but the tumor still grows, the dependence seen in culture does not hold in vivo.' },
        { t: 'The body weight of the mice', ok: false, why: 'Body weight is a toxicity readout. It does not tell you whether the ASO reached the tumor.' },
        { t: 'The A549 growth curve in a dish', ok: false, why: 'That repeats the culture result. It says nothing about what happened inside the mouse.' },
        { t: 'The share of patient tumors that express CHiLL1', ok: false, why: 'This is a population statistic. It is unrelated to what happened in one mouse tumor.' },
      ], source: ['discussion-p5'] },
    { q: 'The authors infer "around one-third of screen hits may act via DNA-dependent mechanisms" from 8/12 hits confirmed by ASOs. What is the fairest caution?',
      options: [
        { t: 'Only 12 hits were tested, the authors chose them, and an ASO that fails may fail for technical reasons, so "one-third" is a rough estimate', ok: true, why: 'Right (limitations-p1, res-aso-p1): the set was small and chosen, and "not confirmed" is not proof of a DNA-dependent mechanism.' },
        { t: '8/12 is under 50%, so most hits are false positives', ok: false, why: '8/12 is 67%, which is more than half. The authors infer that roughly the remaining one-third may act via DNA.' },
        { t: 'ASO validation cannot say anything about DNA versus RNA mechanisms', ok: false, why: 'It can: an ASO acts on the RNA only, which is how the paper separates the two (res-validation-p4).' },
        { t: 'The estimate is invalid because no control ASO was used', ok: false, why: 'A non-targeting control ASO was used: ASO results are normalized to it (fig5A).' },
      ], source: ['limitations-p1', 'res-aso-p1', 'res-validation-p4', 'fig5A'] },
  ],
}
);
