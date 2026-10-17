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

(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(

/* ============================================================================================== D7 */
{
  id: 'D7',
  defines: ['normalization'],
  body: [
    { k: 'h', text: '1. Did the DNA change? PCR and a gel' },
    { k: 'bgnd', html: `<p>After a deletion, the first question is simple: <b>is the piece really gone?</b> Run a PCR (lesson D4) with one primer on each side of the region. The piece that PCR copies, from one primer to the other, is the <b>amplicon</b>. If the region is intact the amplicon is long; if it was deleted the primers sit closer and the amplicon is shorter.</p>
<p>To see the length, the copies are run through a gel. In <b>gel electrophoresis</b> the DNA is loaded into a slab of agarose jelly and an electric field is switched on. DNA is negatively charged, so it moves toward the positive end; small pieces slip through the jelly faster than big ones, so the pieces end up sorted by size, and a dye shows them as <b>bands</b>. A <b>ladder</b> lane (pieces of known sizes) is the ruler. A lane with water instead of DNA should stay empty: it shows the reagents were clean.</p>
<p>Two cautions. A mixed population of cells gives both bands (some copies edited, some not), so a gel shows whether the short product exists, not exactly how many cells carry it; PCR also copies short pieces more easily than long ones. And a gel with more agarose (2%) separates small pieces better than one with less (1%).</p>` },
    { k: 'svg', caption: 'Same primers, shorter amplicon after a deletion; on the gel the short piece runs farther.',
      svg: '<svg viewBox="0 0 480 350" role="img" aria-label="Top: the same two primers give a long amplicon on intact DNA and a short amplicon when the target region is deleted. Bottom: a gel with a ladder lane, a control lane with a strong 2.5 kb band, an edited lane with a 500 bp band and a faint 2.5 kb band, and an empty water lane">' +
        '<text x="8" y="20" class="b">Same primers, different amplicon length</text>' +
        '<text x="8" y="58" class="s">intact DNA</text>' +
        '<path d="M110 52 H470" class="ln thick"/><rect x="190" y="44" width="200" height="16" rx="3" class="f-orange"/><text x="290" y="57" class="mid s">target region</text>' +
        '<path d="M116 38 H146" class="arrow s-blue"/><text x="108" y="34" class="s t-blue b">F</text><path d="M464 38 H434" class="arrow s-blue"/><text x="458" y="34" class="s t-blue b">R</text>' +
        '<path d="M110 74 H470" class="ln thin"/><text x="290" y="92" class="mid s">long amplicon: 2.5 kb</text>' +
        '<text x="8" y="132" class="s">region deleted</text>' +
        '<path d="M110 126 H182" class="ln thick"/>' +
        '<path d="M114 112 H138" class="arrow s-blue"/><text x="106" y="108" class="s t-blue b">F</text><path d="M178 112 H154" class="arrow s-blue"/><text x="172" y="108" class="s t-blue b">R</text>' +
        '<path d="M110 146 H182" class="ln thin"/><text x="194" y="150" class="s">short amplicon: 500 bp</text>' +
        '<rect x="20" y="186" width="330" height="140" rx="8" class="f-gray"/>' +
        '<text x="76" y="178" class="mid s">ladder</text><text x="156" y="178" class="mid s">control</text><text x="236" y="178" class="mid s">edited</text><text x="316" y="178" class="mid s">water</text>' +
        '<rect x="58" y="190" width="36" height="5" class="f-none"/><rect x="138" y="190" width="36" height="5" class="f-none"/><rect x="218" y="190" width="36" height="5" class="f-none"/><rect x="298" y="190" width="36" height="5" class="f-none"/>' +
        '<rect x="58" y="206" width="36" height="4" class="solid-gray"/><rect x="58" y="232" width="36" height="4" class="solid-gray"/><rect x="58" y="272" width="36" height="4" class="solid-gray"/><rect x="58" y="306" width="36" height="4" class="solid-gray"/>' +
        '<text x="52" y="211" class="s end">10 kb</text><text x="52" y="237" class="s end">3 kb</text><text x="52" y="277" class="s end">1 kb</text><text x="52" y="311" class="s end">250 bp</text>' +
        '<rect x="136" y="234" width="40" height="9" rx="2" class="solid-text"/>' +
        '<rect x="216" y="236" width="40" height="5" rx="2" class="solid-gray"/><rect x="216" y="285" width="40" height="9" rx="2" class="solid-text"/>' +
        '<path d="M372 196 V310" class="arrow"/><text x="384" y="244" class="s">short pieces</text><text x="384" y="262" class="s">run farther</text>' +
        '<text x="240" y="344" class="mid s">upper band: region intact (2.5 kb); lower band: deleted (500 bp)</text></svg>' },
    { k: 'h', text: '2. Did the RNA go down? qRT-PCR' },
    { k: 'bgnd', html: `<p>PCR copies DNA, not RNA. So to measure an RNA you first turn it into DNA: the enzyme <b>reverse transcriptase</b> reads each RNA and writes a matching DNA copy, called <b>cDNA</b> (complementary DNA). Then a PCR is run on the cDNA while a fluorescent dye reports how much DNA there is after every cycle. This is <b>qRT-PCR</b> (quantitative reverse-transcription PCR, also written RT-qPCR). The more RNA you start with, the earlier the glow appears: very roughly, one cycle later means half as much starting RNA.</p>
<p>Tubes never hold exactly the same amount of material, so every sample is also measured for a <b>housekeeping gene</b>: a gene every cell needs all the time, whose RNA level is expected to stay steady whatever you do, such as <b>GAPDH</b> or <b>HPRT1</b>. Dividing the target's signal by the housekeeping signal removes the tube-to-tube differences. This kind of adjustment is called <b>normalization</b> (lesson D10 returns to it). Then the treated sample is compared with the control, which is set to 1.0. No gene is perfectly constant, so the reference should be one that the treatment does not change.</p>` },
    { k: 'worked', html: `<p><b>Worked example (made-up numbers).</b> Target signal ÷ housekeeping signal: control cells 1.00, ASO-treated cells 0.35. The RNA fell to 35% of the control, a knockdown of 65%.</p>` },
    { k: 'h', text: '3. Do the edited cells really grow worse? The competition assay' },
    { k: 'bgnd', html: `<p>Instead of growing edited and control cells in separate dishes, a <b>competition assay</b> mixes them in one dish, usually 1:1, and lets them compete. Each type carries a different fluorescent colour (green GFP, red mCherry; lesson D2), and flow cytometry (lesson D3) counts the share of each colour over time. Both types share the same medium, crowding and drugs, so a change in the ratio can only come from the difference between them. Even a small growth difference adds up as the cells keep dividing. An edit that harms growth makes its colour fall below 50%.</p>
<p>Controls make it readable: a <b>neutral control</b> (cells edited at AAVS1) should stay near 50:50, and a <b>positive control</b> (a gene cells cannot live without, such as RPS5) should lose share quickly.</p>` },
    { k: 'svg', caption: 'Competition assay: with a neutral edit the colours stay 50:50; an edit that harms growth loses share.',
      svg: '<svg viewBox="0 0 480 230" role="img" aria-label="Two small charts of the percentage of each colour of cell over seven days. Left: neutral control, both colours stay near 50 percent. Right: an edit that harms growth, the red edited cells fall while the green control cells rise">' +
        '<text x="126" y="22" class="mid s b">Neutral control (both AAVS1)</text><text x="366" y="22" class="mid s b">Edit that harms growth</text>' +
        '<path d="M44 36 V170 H216" class="ln thin"/><path d="M284 36 V170 H456" class="ln thin"/>' +
        '<path d="M44 104 H216" class="ln thin dash m"/><path d="M284 104 H456" class="ln thin dash m"/>' +
        '<text x="38" y="108" class="s end">50%</text>' +
        '<path d="M44 102 L130 100 L216 98" class="ln thick s-green"/><path d="M44 106 L130 108 L216 110" class="ln thick s-red"/>' +
        '<path d="M284 104 L370 88 L456 72" class="ln thick s-green"/><path d="M284 104 L370 120 L456 136" class="ln thick s-red"/>' +
        '<text x="44" y="190" class="s">day 0</text><text x="216" y="190" class="s end">day 7</text><text x="284" y="190" class="s">day 0</text><text x="456" y="190" class="s end">day 7</text>' +
        '<circle cx="40" cy="214" r="5" class="solid-green"/><text x="52" y="219" class="s">control cells (GFP)</text><circle cx="236" cy="214" r="5" class="solid-red"/><text x="248" y="219" class="s">edited cells (mCherry)</text></svg>' },
    { k: 'memory', html: `<p><b>Analogy:</b> the gel is a ruler (shorter piece, farther run). qRT-PCR is a bathroom scale that you check against a standard weight every time (the housekeeping gene), so a drifting scale does not fool you. The competition assay is two runners in different coloured shirts on one track: the track is identical, so the shirt (the edit) is the only difference.</p>` },
    { k: 'h', text: 'How this paper uses these checks' },
    { k: 'paper', ref: 'm-pcr-gdna-p1', quote: 'The PCR was done with genomic primers flanking the deleted region' },
    { k: 'plain', source: ['fig1E', 'm-pcr-gdna-p1', 'm-library-cloning-p1'], html: `<p>In Figure 1E the primers (F and R) sit on both sides of the TSS target region of DNMBP-AS1. The expected lengths are labelled: 2.5 kb for wild type (WT) and 500 bp for the deletion (KO). Control cells give one strong 2.5 kb band; cells with the deleting guide pair pgRNA_9 give a 500 bp band plus a fainter band at the WT position; the water lane is empty. The genotyping gel was 1% agarose; a 2% gel checked the size of the library's PCR product.</p>` },
    { k: 'panel', id: 'fig1E', html: `<p>Find the ladder, the Control lane, the pgRNA_9 lane and the water (H2O) lane, then the two labelled sizes, 2.5kb (WT) and 500bp (KO).</p>` },
    { k: 'paper', ref: 'm-qpcr-p1', quote: 'The expression of HPRT1 was used as an internal control for normalization.' },
    { k: 'plain', source: ['m-qpcr-p1', 'fig1F', 'fig3D'], html: `<p>The Methods name HPRT1 as the reference gene for RT-qPCR. Figure 1F (DNMBP-AS1 RNA after the deletion, n = 3) is labelled "Normalised to GAPDH", and the RNA panels of Figure 3D "Normalised to HPRT1". So the paper uses both reference genes, in different experiments.</p>` },
    { k: 'paper', ref: 'res-validation-p3', quote: 'mCherry+ cells expressing pgRNAs were out-competed by control cells (GFP+, expressing pgRNA for AAVS1), with an effect comparable to inactivation of essential ribosomal gene RPS5' },
    { k: 'plain', source: ['res-validation-p3', 'm-competition-p1', 'fig3C'], html: `<p>For the two validated hits, candidates 205 and 509, the red cells carrying their pgRNAs lost share to the green AAVS1 control cells, about as much as cells lacking the essential gene RPS5 (the positive control). After seven days of puromycin selection the cells were mixed 1:1 (150,000 cells in a six-well plate) and followed for 7 days by flow cytometry. Figure 3C prints P = 3.8e-4 for RPS5, 0.005 for candidate 205 and 0.004 for candidate 509 (lesson E2 explains what P means). The pgRNA for candidate 509 also sensitized cells to cisplatin (P = 0.031).</p>` },
    { k: 'flag', source: ['fig1E', 'm-qpcr-p1', 'fig1F', 'm-competition-p1'], html: `<p>Heads-up: the legend does not explain the fainter upper band in the pgRNA_9 lane. The Methods name only HPRT1, yet Figure 1F uses GAPDH. And the Methods print the control as "pgRNAs-AASV1-GFP+" (a typo for AAVS1).</p>` },
  ],
  appears: [
    { ref: 'fig1E', note: 'The genotyping gel: expected WT amplicon 2.5 kb and deletion (KO) amplicon 500 bp.' },
    { ref: 'm-qpcr-p1', note: 'RNA is reverse transcribed to cDNA; HPRT1 is the internal control.' },
    { ref: 'fig1F', note: 'qRT-PCR of DNMBP-AS1 after deletion, divided by GAPDH.' },
    { ref: 'res-validation-p3', note: 'Competition assay: edited mCherry+ cells are out-competed by AAVS1 GFP+ control cells, like the RPS5 positive control.' },
  ],
  checks: [
    { q: 'In Figure 1E the pgRNA_9 lane has a band at the 500 bp mark. What does it tell you?',
      options: [
        { t: 'Some copies of the DNA lost the region between the primers, so the PCR product is shorter', ok: true, why: 'Right: with the same two primers, a deletion brings them closer, so the amplicon is shorter (500 bp instead of 2.5 kb) and runs farther down the gel.' },
        { t: 'That DNA is longer and heavier, so it sank to the bottom', ok: false, why: 'It is the other way round: in a gel, shorter pieces slip through faster and run farther.' },
        { t: 'The RNA level of the gene has dropped', ok: false, why: 'This PCR was done on genomic DNA, so it reports DNA length, not RNA amount. RNA is measured by qRT-PCR.' },
      ], source: ['fig1E', 'm-pcr-gdna-p1'] },
    { q: 'Why is a housekeeping gene measured in every qRT-PCR sample?',
      options: [
        { t: 'To correct for different amounts of RNA or cDNA in each tube, so samples can be compared fairly', ok: true, why: 'Right: dividing by a steady reference removes tube-to-tube differences.' },
        { t: 'To prove the knockdown worked, because the housekeeping gene should fall too', ok: false, why: 'A good housekeeping gene should <i>not</i> change with the treatment. If it fell, it would be a poor reference.' },
        { t: 'Because housekeeping genes are easier to turn into cDNA', ok: false, why: 'Ease of copying is not the reason. The point is a steady yardstick.' },
      ], bg: true },
    { q: 'In a competition assay, which result shows that an edit harms cell growth?',
      options: [
        { t: 'The edited (mCherry) cells fall below half of the mixture while the control (GFP) cells rise', ok: true, why: 'Right (res-validation-p3): the edited cells were "out-competed" by the AAVS1 control cells, as with the RPS5 positive control.' },
        { t: 'Both colours stay at about 50% in the mixture', ok: false, why: 'That is what the neutral control does: no growth difference.' },
        { t: 'The mCherry cells glow brighter than the GFP cells', ok: false, why: 'Brightness is just the label. What counts is the share of each colour over time.' },
      ], source: ['res-validation-p3'] },
  ],
},
);
