/* lessons-L6.js — filled by one content author (scope L6): lessons D6, D7, D8, D9, D10. */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(

/* ============================================================================================== D6 */
{
  id: 'D6',
  body: [
    { k: 'h', text: 'Why not just delete the DNA?' },
    { k: 'bgnd', html: `<p>The CRISPR screens you have met <b>delete DNA</b>. That is powerful, but it has a blind spot: when a stretch of DNA is cut out, you cannot tell whether the effect comes from <i>the DNA itself</i> (it might hold a switch such as an enhancer) or from <i>the RNA</i> that the DNA makes. To test the RNA alone, you leave the DNA untouched and remove only the RNA.</p>
<p>The tool for that is the <b>ASO</b>, an <b>antisense oligonucleotide</b>: a short, man-made strand of nucleotides (usually 15 to 25 letters). "Antisense" means its letters are the base-pairing partner of one stretch of the target RNA, so it sticks to that RNA and, in theory, to nothing else. Lowering an RNA this way is called <b>knockdown</b>: the RNA is turned down, not completely gone, unlike a knockout, where the gene itself is removed.</p>` },
    { k: 'h', text: 'How an ASO lowers an RNA' },
    { k: 'bgnd', html: `<p>An ASO does not cut anything itself. It pairs with its RNA and calls in a cell enzyme, <b>RNase H</b>, which recognizes a stretch where DNA-like letters are paired with RNA and cuts the <i>RNA</i> half. Other enzymes clear away the pieces, and the ASO is free to pair with another copy. RNase H enzymes are found in the nucleus as well as the cytoplasm, so ASOs can reach RNAs in both places.</p>
<p>Many ASOs are therefore built with a DNA-like middle (so RNase H can work) and <b>LNA</b> ends. LNA stands for <b>locked nucleic acid</b>: a nucleotide whose sugar ring is chemically "locked" in shape, so it grips its partner tightly and resists being digested. An ASO is delivered as a finished strand by transfection (lesson D2); no virus is needed.</p>
<p>Two more names. <b>shRNA</b> (short hairpin RNA) is the other popular way to lower an RNA: you deliver a <i>gene</i> (often by lentivirus) that makes a hairpin-shaped RNA inside the cell, which the cell uses to destroy matching RNAs, mostly in the cytoplasm. <b>RNA therapeutics</b> (<b>RNATX</b>) are medicines made of RNA-like molecules, such as ASOs, or acting on RNAs.</p>` },
    { k: 'svg', caption: 'ASO knockdown in three steps: pairing, cutting by RNase H, clean-up.',
      svg: '<svg viewBox="0 0 480 340" role="img" aria-label="Three steps of ASO knockdown: the ASO pairs with its target RNA, the enzyme RNase H cuts the RNA in the paired stretch, and the cut RNA is cleared away while the ASO is free to pair with another RNA">' +
        '<text x="8" y="20" class="b">1. The ASO pairs with its RNA</text>' +
        '<text x="16" y="42" class="s t-orange b">target RNA</text>' +
        '<path d="M16 66 C36 46 56 86 76 66 S116 46 136 66 H344 C364 46 384 86 404 66 S444 46 464 66" class="ln thick s-orange"/>' +
        '<path d="M156 70 V82 M170 70 V82 M184 70 V82 M198 70 V82 M212 70 V82 M226 70 V82 M240 70 V82 M254 70 V82 M268 70 V82 M282 70 V82 M296 70 V82 M310 70 V82 M324 70 V82" class="ln thin"/>' +
        '<rect x="150" y="84" width="36" height="22" rx="4" class="f-purple"/><text x="168" y="100" class="mid s">LNA</text>' +
        '<rect x="186" y="84" width="108" height="22" rx="4" class="f-blue"/><text x="240" y="100" class="mid s">DNA-like middle</text>' +
        '<rect x="294" y="84" width="36" height="22" rx="4" class="f-purple"/><text x="312" y="100" class="mid s">LNA</text>' +
        '<text x="342" y="100" class="s b t-blue">ASO</text>' +
        '<text x="8" y="150" class="b">2. RNase H cuts the RNA in the paired stretch</text>' +
        '<ellipse cx="240" cy="172" rx="58" ry="12" class="f-purple"/><text x="240" y="177" class="mid s b">RNase H</text>' +
        '<path d="M16 196 C36 176 56 216 76 196 S116 176 136 196 H233" class="ln thick s-orange"/>' +
        '<path d="M247 196 H344 C364 176 384 216 404 196 S444 176 464 196" class="ln thick s-orange"/>' +
        '<path d="M234 186 L246 206 M246 186 L234 206" class="ln thick s-red"/>' +
        '<path d="M156 200 V212 M170 200 V212 M184 200 V212 M198 200 V212 M212 200 V212 M226 200 V212 M254 200 V212 M268 200 V212 M282 200 V212 M296 200 V212 M310 200 V212 M324 200 V212" class="ln thin"/>' +
        '<rect x="150" y="214" width="36" height="22" rx="4" class="f-purple"/><rect x="186" y="214" width="108" height="22" rx="4" class="f-blue"/><rect x="294" y="214" width="36" height="22" rx="4" class="f-purple"/>' +
        '<text x="8" y="272" class="b">3. The pieces are cleared away; the ASO goes free</text>' +
        '<path d="M16 306 C26 296 38 316 50 306 S66 296 72 306" class="ln thick dash m"/><path d="M88 306 C98 296 110 316 122 306" class="ln thick dash m"/>' +
        '<text x="16" y="334" class="s m">cut RNA pieces</text>' +
        '<rect x="170" y="294" width="160" height="24" rx="4" class="f-blue"/><text x="250" y="311" class="mid s">ASO, ready to pair again</text>' +
        '<path d="M336 306 H400" class="arrow"/><text x="406" y="311" class="s">next RNA</text></svg>' },
    { k: 'h', text: 'Using ASOs well: controls and checks' },
    { k: 'bgnd', html: `<ul>
<li><b>Non-targeting control ASO.</b> An ASO whose letters match no RNA the experimenter cares about. It gets exactly the same delivery as the real ASO, so it shows what the delivery itself does. Every result is reported relative to it.</li>
<li><b>Knockdown efficiency.</b> How far the target RNA falls compared with the control, as a percentage. If control cells hold 100 units of the RNA and ASO-treated cells 35, the knockdown is 65%. An ASO that does not lower its RNA explains nothing.</li>
<li><b>Two independent ASOs per target.</b> Two ASOs with different sequences bind different spots on the same RNA. Each may also stick to a wrong RNA by accident, but two different sequences are unlikely to make the same mistake. If both give the same result, it is probably an <b>on-target effect</b> (caused by losing the intended RNA) and not an off-target effect (caused by hitting something else).</li>
<li><b>Orthogonal validation.</b> Confirming a result with a different kind of method that has different weaknesses ("orthogonal" = independent), for example a CRISPR deletion and an ASO that point to the same answer.</li>
<li><b>ASO cocktail.</b> A mix of ASOs against different RNAs. For a fair test the <i>total</i> dose stays the same, so a stronger effect cannot simply mean "more drug".</li>
<li><b>Toxicity.</b> Harm to healthy cells (side effects). Researchers give the same ASO to cancer cells and to normal cells; a promising drug hits the cancer cells hard and normal cells little.</li>
</ul>` },
    { k: 'memory', html: `<p><b>Analogy:</b> the RNA is one page in a pile of photocopied recipes. An ASO is a sticky tag that sticks only to a page with the matching text; RNase H is a shredder that destroys any tagged page. A non-targeting control is a tag with nonsense text (a placebo), and two independent ASOs are two witnesses who never met but tell the same story. The analogy breaks where a tag sticks to the wrong page by accident, which is why the controls exist.</p>` },
    { k: 'h', text: 'How this paper uses ASOs' },
    { k: 'paper', ref: 'res-validation-p4', quote: 'genomic deletion cannot distinguish between DNA-dependent (e.g., enhancer) or RNA-dependent mechanisms' },
    { k: 'plain', source: ['res-validation-p4', 'm-aso-p1'], html: `<p>A deletion cannot say whether the DNA or the RNA is responsible, so the authors lowered each RNA with <b>locked nucleic acid</b> ASOs: 3 to 5 designed per target, delivered by transfection at a final 25 nM (10 nM for the normal lines HBEC3-KT and CCD-16LU).</p>` },
    { k: 'paper', ref: 'res-aso-p2', quote: 'For five lncRNAs (Tier 2), we observed reproducible loss of cell proliferation with two distinct ASO sequences, indicating on-target activity.' },
    { k: 'plain', source: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'res-aso-p10'], html: `<p>For each of nine chosen lncRNAs ("Tier 1") they found at least two independent ASOs with at least 40% knockdown. Five lncRNAs ("Tier 2") then slowed cell growth reproducibly with two different ASO sequences each, also in two more KRAS+ lines, H460 and H441. In three non-transformed lung cell lines the same ASOs gave a "diminished or absent response", especially for the first two candidates. Those became Tier 3, CHiLL1 and GCAWKR, which the authors call "potent and low-toxicity".</p>` },
    { k: 'paper', ref: 'res-aso-p8', quote: 'a 50:50 cocktail of CHiLL1/GCAWKR ASOs (Tier 3 cocktail) displayed a greater effect on cell viability compared with an equal dose of either ASO alone' },
    { k: 'plain', source: ['res-aso-p8', 'res-aso-p9', 'fig5G', 'fig5H'], html: `<p>The cocktail beat either ASO alone at the same total dose (25 nM); a five-ASO cocktail for Tier 2 did similarly. The authors say cocktails added no extra toxicity in non-cancerous cells. In TCGA tumor data, 78% of KRAS+ lung adenocarcinomas (n = 101) express at least one of CHiLL1 and GCAWKR, rising to 92% for the Tier 2 set.</p>` },
    { k: 'flag', source: ['res-aso-p3', 'm-aso-p1', 'discussion-p5'], html: `<p>Heads-up: the Results print "CCD-12Lu" but the Methods print CCD-16LU (the same line, a typo as printed). And "low toxicity" is inferred from weaker effects in normal cells in dishes; the Discussion says delivery in vivo is still future work.</p>` },
  ],
  appears: [
    { ref: 'res-aso-p2', note: 'Two distinct ASO sequences per lncRNA give the same growth loss, which the authors read as on-target activity.' },
    { ref: 'm-aso-p1', note: 'LNA ASOs, 3 to 5 designed per target, final 25 nM (10 nM for HBEC3-KT and CCD-16LU).' },
    { ref: 'res-aso-p8', note: 'ASO cocktails beat single ASOs at an equal total dose; the Tier 3 cocktail reaches 78% of tumors, Tier 2 reaches 92% (res-aso-p9).' },
    { ref: 'fig5A', note: 'Heatmap of every ASO in every cancer and normal cell line, relative to the non-targeting control.' },
  ],
  checks: [
    { q: 'How does an LNA-type ASO lower its target RNA?',
      options: [
        { t: 'It pairs with the RNA, and the enzyme RNase H cuts the RNA in the paired stretch', ok: true, why: 'Right: the ASO picks the target by base pairing and RNase H does the cutting; other enzymes clear the pieces.' },
        { t: 'It cuts the gene out of the DNA, like a CRISPR deletion', ok: false, why: 'That is CRISPR-del. An ASO leaves the DNA untouched and acts on the RNA.' },
        { t: 'It is an enzyme that cuts any RNA it meets', ok: false, why: 'An ASO is a short strand of nucleotides, not an enzyme. It only chooses the target; RNase H does the cutting.' },
      ], bg: true },
    { q: 'What is the job of a non-targeting control ASO?',
      options: [
        { t: 'It goes through the same delivery as the real ASO, so differences can be blamed on the real ASO\'s sequence', ok: true, why: 'Right: it is the baseline. Real ASO results are judged against it.' },
        { t: 'It lowers every RNA a little, as a check that the ASOs work at all', ok: false, why: 'A control that lowers RNAs would spoil the baseline. A check that a readout can respond is a <i>positive</i> control, a different thing.' },
        { t: 'It is simply the ASO with the weakest knockdown', ok: false, why: 'A weak real ASO still pairs with its target. The control matches no intended target at all.' },
      ], bg: true },
    { q: 'Why did the authors test two different ASO sequences against each lncRNA?',
      options: [
        { t: 'If both sequences give the same effect, it is unlikely to be an accident of one sequence, so the effect is probably on-target', ok: true, why: 'Right: the paper reads "reproducible loss of cell proliferation with two distinct ASO sequences" as on-target activity.' },
        { t: 'Two ASOs together double the knockdown', ok: false, why: 'The two ASOs were tested as separate reagents, each against its own control. The point was reproducibility, not a bigger dose.' },
        { t: 'One ASO was for cancer cells and the other for normal cells', ok: false, why: 'Both ASOs were tested in both cancer and normal lines (Figure 5A has a column for each ASO in each cell line).' },
      ], source: ['res-aso-p2', 'fig5A'] },
    { q: 'In the cocktail test, the total ASO stayed at 25 nM, the same as for a single ASO. Why?',
      options: [
        { t: 'So that a stronger effect of the mix cannot be explained by simply giving more ASO', ok: true, why: 'Right: the legend says the total amount of ASO did not vary, so any gain comes from combining the targets.' },
        { t: 'Because 25 nM is the only dose at which ASOs can enter cells', ok: false, why: 'Nothing says so, and the Methods use a different dose for two of the normal cell lines.' },
        { t: 'So that the non-targeting control is no longer needed', ok: false, why: 'The control is still the baseline against which every cocktail result is compared.' },
      ], source: ['fig5G', 'res-aso-p8'] },
  ],
},
);
