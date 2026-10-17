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
    { k: 'bgnd', html: `<p>Many ASOs do not cut anything themselves. They pair with the RNA and call in a cell enzyme, <b>RNase H</b>, which recognizes a stretch where DNA-like letters are paired with RNA and cuts the <i>RNA</i> half. Other enzymes clear away the pieces, and the ASO is free to pair with another copy. RNase H enzymes are found in the nucleus as well as the cytoplasm, so ASOs can reach RNAs in both places.</p>
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
<li><b>Non-targeting control ASO.</b> An ASO designed to match no RNA in the cells. It gets exactly the same delivery as the real ASO, so it shows what the delivery itself does. Every result is reported relative to it.</li>
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
    { k: 'plain', source: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3', 'res-aso-p10'], html: `<p>For each of nine chosen lncRNAs ("Tier 1") they found at least two independent ASOs with at least 40% knockdown. Five lncRNAs ("Tier 2") then slowed cell growth reproducibly with two different ASO sequences each, also in two more KRAS+ lines, H460 and H441. In three non-transformed lung cell lines the same ASOs gave a "diminished or absent response", especially for the first two candidates. Those became Tier 3, CHiLL1 and GCAWKR, whose ASOs the authors call "potent and low-toxicity".</p>` },
    { k: 'paper', ref: 'res-aso-p8', quote: 'a 50:50 cocktail of CHiLL1/GCAWKR ASOs (Tier 3 cocktail) displayed a greater effect on cell viability compared with an equal dose of either ASO alone' },
    { k: 'plain', source: ['res-aso-p8', 'res-aso-p9', 'fig5G', 'fig5H'], html: `<p>The cocktail beat either ASO alone at the same total dose (25 nM); a five-ASO cocktail for Tier 2 did similarly. The authors say cocktails added no extra toxicity in non-cancerous cells. In TCGA tumor data, 78% of KRAS+ lung adenocarcinomas (n = 101) express at least one of CHiLL1 and GCAWKR, rising to 92% for the Tier 2 set.</p>` },
    { k: 'flag', source: ['res-aso-p3', 'm-aso-p1', 'discussion-p5'], html: `<p>Heads-up: the Results print "CCD-12Lu" but the Methods print CCD-16LU (the same line, a typo as printed). "Low toxicity" is inferred from weaker effects in normal cells in dishes; the Discussion says delivery in vivo is still future work. And the paper never names RNase H: it says only that its ASOs are LNA ASOs, so RNase H is the usual explanation, not something the paper tested.</p>` },
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
        '<path d="M110 52 H470" class="ln thick"/><rect x="190" y="44" width="200" height="16" rx="3" class="f-orange"/><text x="290" y="38" class="mid s">target region</text>' +
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

(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(

/* ============================================================================================== D8 */
{
  id: 'D8',
  body: [
    { k: 'h', text: 'One question per assay' },
    { k: 'bgnd', html: `<p>After an RNA is switched off, what changes in the cells? The authors ask four everyday questions, and each has a simple assay: <b>How many cells are alive? Are they dying? Are they dividing less? Do they move less?</b> Each assay gives one number, always compared with a control (the non-targeting ASO).</p>` },
    { k: 'h', text: 'How many cells are alive? Viability and CellTiter-Glo' },
    { k: 'bgnd', html: `<p><b>Cell viability</b> means how many cells in a dish are alive and healthy. A low number can mean slower growth, more death, or both, so viability alone cannot say which. In this paper it is the main readout of how ASOs change "growth".</p>
<p><b>CellTiter-Glo</b> measures viability with light. Living cells make <b>ATP</b>, the cell's energy currency; dead cells stop making it within minutes. The reagent opens the cells and supplies luciferase, the enzyme that makes fireflies glow, which uses ATP to produce light (<b>luminescence</b>). A plate reader reports <b>RLU</b>, relative light units: more living cells, more ATP, more light. A separate "3D" version exists for spheroids and organoids because it opens compact clumps more strongly.</p>` },
    { k: 'h', text: 'Dying, or dividing less? Annexin V and the cell-cycle stain' },
    { k: 'bgnd', html: `<p><b>Annexin V.</b> A healthy cell keeps a fatty molecule called phosphatidylserine on the inner face of its outer membrane. In early apoptosis the molecule flips to the outside, and Annexin V, a protein carrying a fluorescent tag, sticks to it. A second dye (a "viability dye") only enters cells with leaky membranes, which are dead or nearly so. Flow cytometry then classifies cells into four groups: alive (neither stain), <b>early apoptotic</b> (Annexin V only), late apoptotic (both) and necrotic (dye only).</p>
<p><b>Cell-cycle assay.</b> A cell copies its DNA before dividing, so its DNA amount shows where it is in the cell cycle. <b>DAPI</b> is a blue dye that sticks to DNA, so its brightness per cell tracks DNA amount: G1 cells have 1×, G2 and mitotic cells 2×, S-phase cells are in between. Flow cytometry draws a histogram with two peaks and a low plateau. The peaks overlap, so software fits curves to the histogram, the <b>Dean-Jett-Fox (DJF) model</b>, to estimate the share of cells in each phase. A treatment that stalls cells at a checkpoint makes the matching phase grow. <b>Ki-67</b> is a protein found in cells that are actively cycling and missing from resting cells, so a tagged Ki-67 antibody tells cycling cells from resting ones. (DNA amount alone cannot separate G2 from mitosis.)</p>` },
    { k: 'svg', caption: 'A DNA-content histogram: peaks for G1 (1× DNA) and G2/M (2× DNA); a treatment that stalls cells in G2 raises the second peak.',
      svg: '<svg viewBox="0 0 480 300" role="img" aria-label="A histogram of DNA amount per cell with a tall G1 peak, a lower plateau for S phase and a G2 and M peak. A dashed curve shows a treated sample with a lower G1 peak and a higher G2 and M peak">' +
        '<text x="8" y="20" class="b">DNA amount per cell (DAPI brightness)</text>' +
        '<path d="M40 40 V230 H450" class="ln thin"/><text x="50" y="52" class="s">number of cells</text>' +
        '<path d="M60 230 C90 230 100 90 140 90 C180 90 190 190 210 190 C240 190 255 150 290 150 C325 150 330 230 360 230" class="ln thick"/>' +
        '<path d="M60 230 C90 230 100 120 140 120 C180 120 190 190 210 190 C240 190 255 100 290 100 C325 100 330 230 360 230" class="ln thick dash s-orange"/>' +
        '<text x="140" y="252" class="mid s b">G1 (1× DNA)</text><text x="215" y="252" class="mid s b">S</text><text x="300" y="252" class="mid s b">G2/M (2× DNA)</text>' +
        '<text x="245" y="276" class="mid s">DAPI brightness = DNA amount</text>' +
        '<path d="M300 40 H328" class="ln thick"/><text x="334" y="45" class="s">control</text>' +
        '<path d="M300 62 H328" class="ln thick dash s-orange"/><text x="334" y="67" class="s">stalled in G2/M</text></svg>' },
    { k: 'h', text: 'Do they move less? Crystal violet and OD' },
    { k: 'bgnd', html: `<p>In a transwell assay (lesson D5), cells in the upper chamber crawl through tiny pores toward a serum-rich lower chamber. To count those that made it, the cells are stained with <b>crystal violet</b>, a purple dye that sticks to cells. The cells left on top of the membrane are wiped off, and the dye on the underside is dissolved. A plate reader then measures the <b>optical density (OD)</b>, also called absorbance: how much light of one colour the purple liquid soaks up. Over the working range, more dye gives a higher OD, so a higher OD means more cells crossed.</p>
<p>One caution: crystal violet counts cells, so a treatment that simply leaves fewer cells alive can lower the OD even if each cell moves normally. That is why such assays are kept short and read against a control.</p>` },
    { k: 'memory', html: `<p><b>Memory aid:</b> four assays, four "senses". CellTiter-Glo = <i>light</i> from living cells (a glow-stick). Annexin V = a <i>flag</i> on a dying cell. DAPI = a <i>DNA ruler</i>, and Ki-67 = an "I'm in the race" badge. Crystal violet = a <i>purple stain</i>, read like the darkness of paint.</p>` },
    { k: 'h', text: 'How this paper uses them' },
    { k: 'plain', source: ['m-viability-2d-p1', 'm-viability-3d-p1', 'm-viability-3d-p3', 'res-aso-p6', 'fig5E'], html: `<p><b>Viability.</b> In flat (2D) cultures the number of viable cells was estimated with CellTiter-Glo 2.0 at 24, 48, 72, 96 and/or 144 h. H441 spheroids were read with the 3D version at T0 (after 4 h) and again after one week; the BE874 organoids were read the same way, with T0 after 24 h. In Figure 5E (H441 spheroids, 7 days after ASO transfection) the CHiLL1 and GCAWKR ASOs lowered viability, approaching the positive-control ASO.</p>` },
    { k: 'paper', ref: 'res-mechanism-p5', quote: 'knockdown of CHiLL1, but not GCAWKR, resulted in a significant increase of early apoptotic cells' },
    { k: 'plain', source: ['res-mechanism-p5', 'm-apoptosis-p1', 'fig6G'], html: `<p>24 h after ASO transfection, cells were stained with PE-labelled Annexin V and a viability dye (unstained cells served as the control for the gates) and read by flow cytometry. Figure 6G (n = 2) shows the shares of alive, early-apoptotic, late-apoptotic and necrotic cells. CHiLL1 knockdown, but not GCAWKR knockdown, raised the early-apoptotic share.</p>` },
    { k: 'paper', ref: 'res-mechanism-p6', quote: 'knockdown of GCAWKR, but not CHiLL1, led to an increase of cells in the G2 phase' },
    { k: 'plain', source: ['res-mechanism-p6', 'm-cellcycle-p1', 'fig6K'], html: `<p>After 24 h the cells were fixed, stained with a Ki-67 antibody and DAPI, read on a flow cytometer, and the phases were assigned with the DJF model. Figure 6K (n = 2 biological replicates) gives the share of cells in G1, S and G2: GCAWKR ASO2 lowers G1 (P = 0.036) and raises G2 (P = 0.009); CHiLL1 ASO1 does not.</p>` },
    { k: 'paper', ref: 'res-mechanism-p6', quote: 'GCAWKR targets are also enriched for migration genes, and knockdown led to impaired cell migratory capability' },
    { k: 'plain', source: ['res-mechanism-p6', 'm-migration-assay-p1', 'fig6L', 'res-validation-p5'], html: `<p>A549 cells were seeded 24 h after ASO transfection (35,000 per transwell) in the upper chamber without serum, with 10% FBS below as the attractant. After 24 h the crossed cells were stained, the dye was dissolved and read at 595 nm. In Figure 6L the GCAWKR ASO2 bar is at about 0.4 of the control, which is set to 1.0 (P = 0.002, n = 4; the 0.4 is read off the bar). ASOs against three screen hits (candidates 215, 448 and 489) also impaired A549 migration (Figures 3E and 3F).</p>` },
    { k: 'flag', source: ['m-cellcycle-p1', 'fig6K', 'fig6G', 'fig3F'], html: `<p>Heads-up: the Methods list both Ki-67 and DAPI, but the text and Figure 6K report only the share of cells in G1, S and G2. Figures 6G and 6K each rest on n = 2 replicates. Figure 3F prints "Cristal violet OD" on its axis (the dye is crystal violet).</p>` },
  ],
  appears: [
    { ref: 'm-viability-3d-p1', note: 'CellTiter-Glo 3D for H441 spheroids: a reading at T0 and another after one week.' },
    { ref: 'm-apoptosis-p1', note: 'Annexin V plus a viability dye detect early apoptotic and dead cells by flow cytometry.' },
    { ref: 'm-cellcycle-p1', note: 'Ki-67 and DAPI staining; phases assigned with the DJF model.' },
    { ref: 'm-migration-assay-p1', note: 'Transwell migration read as crystal violet absorbance at 595 nm.' },
  ],
  checks: [
    { q: 'A CellTiter-Glo well gives more light than a control well. What is the best reading?',
      options: [
        { t: 'There are more living cells: living cells make ATP, and the reagent turns ATP into light', ok: true, why: 'Right: light tracks ATP, and ATP tracks the number of living cells.' },
        { t: 'There are more dead cells, because dead cells give off light', ok: false, why: 'Dead cells stop making ATP quickly, so they add little or no light.' },
        { t: 'The cells are dividing faster, because viability measures only division', ok: false, why: 'Viability counts living cells. It cannot tell faster growth from better survival, which is why other assays are added.' },
      ], bg: true },
    { q: 'In an Annexin V test, a cell stained by Annexin V but not by the viability dye is…',
      options: [
        { t: 'in early apoptosis: its membrane lipid has flipped outward but the membrane is still intact', ok: true, why: 'Right: Annexin V reports the flipped lipid; the dye only enters cells with leaky membranes.' },
        { t: 'alive and healthy', ok: false, why: 'A healthy cell keeps the lipid on the inside, so Annexin V does not stick to it.' },
        { t: 'dead, with a leaky membrane', ok: false, why: 'A leaky membrane would let the viability dye in. This cell is not stained by the dye.' },
      ], bg: true },
    { q: 'What did the cell-cycle assay show after GCAWKR knockdown (Figure 6K)?',
      options: [
        { t: 'More cells in G2 and fewer in G1', ok: true, why: 'Right (res-mechanism-p6): GCAWKR knockdown, but not CHiLL1 knockdown, increased cells in G2.' },
        { t: 'More cells in early apoptosis', ok: false, why: 'That is the CHiLL1 result, seen in the Annexin V assay of Figure 6G.' },
        { t: 'No change in any phase', ok: false, why: 'Figure 6K prints P = 0.036 for G1 and P = 0.009 for G2 for GCAWKR ASO2, so the shares did change.' },
      ], source: ['res-mechanism-p6', 'fig6K'] },
    { q: 'In Figure 6L the control bar is 1.0 and the GCAWKR ASO2 bar is lower. What does a lower crystal violet OD mean?',
      options: [
        { t: 'Less dye was recovered from the underside of the membrane, so fewer cells crossed', ok: true, why: 'Right: OD tracks dye, and dye tracks the number of cells that crossed.' },
        { t: 'The cells that crossed were smaller', ok: false, why: 'OD does not measure cell size; it measures how much dye the solution absorbs.' },
        { t: 'The cells travelled a shorter distance', ok: false, why: 'The assay counts cells that crossed the membrane. It does not measure distance.' },
      ], source: ['fig6L', 'res-mechanism-p6'] },
  ],
},
);

(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(

/* ============================================================================================== D9 */
{
  id: 'D9',
  body: [
    { k: 'h', text: 'Why location matters' },
    { k: 'bgnd', html: `<p>Where an RNA sits in the cell is a clue to what it does. A lncRNA that stays in the nucleus may help control genes, while one in the cytoplasm may influence messenger RNAs or proteins (lesson B6). Location is a clue, not proof. Two methods find the location; a third asks whether the RNA really causes the effect you saw.</p>` },
    { k: 'h', text: 'RNA-FISH: seeing single RNAs' },
    { k: 'bgnd', html: `<p><b>FISH</b> (fluorescence in situ hybridization; "in situ" means in its original place) makes RNA molecules glow where they sit. The cells are fixed (preserved) so that nothing moves. Short, single-stranded DNA <b>probes</b> are then added, each designed to base-pair with the target RNA and each carrying a fluorescent dye. Many probes (a <b>probe set</b>) bind along one RNA, so one RNA molecule lights up as a bright dot, while a probe stuck somewhere by accident gives only a faint glow. The nucleus is stained with DAPI (lesson D8), so you can see whether a dot sits inside or outside it.</p>
<p>Two things make FISH believable. Lowering the target RNA (for example with an ASO) should make the dots disappear. And counting the dots tells you how many RNA molecules a cell holds, often only a few for a lncRNA.</p>` },
    { k: 'svg', caption: 'RNA-FISH: each dot is one RNA molecule covered with dye-carrying probes; the nucleus stain shows where the dot sits.',
      svg: '<svg viewBox="0 0 480 290" role="img" aria-label="Left: a cell with a nucleus; green dots for CHiLL1 lie in the cytoplasm and orange dots for GCAWKR lie in the nucleus. Right: a zoom on one RNA strand with five short probes attached, each carrying a dye, so that one RNA shows as one bright dot">' +
        '<ellipse cx="125" cy="118" rx="112" ry="92" class="f-gray"/><ellipse cx="125" cy="118" rx="50" ry="44" class="f-blue"/>' +
        '<text x="125" y="154" class="mid s b">nucleus</text><text x="125" y="202" class="mid s b">cytoplasm</text>' +
        '<circle cx="108" cy="98" r="4" class="solid-orange"/><circle cx="142" cy="106" r="4" class="solid-orange"/><circle cx="116" cy="130" r="4" class="solid-orange"/><circle cx="140" cy="128" r="4" class="solid-orange"/>' +
        '<circle cx="46" cy="100" r="4" class="solid-green"/><circle cx="52" cy="150" r="4" class="solid-green"/><circle cx="200" cy="96" r="4" class="solid-green"/><circle cx="206" cy="146" r="4" class="solid-green"/><circle cx="150" cy="186" r="4" class="solid-green"/><circle cx="80" cy="182" r="4" class="solid-green"/>' +
        '<circle cx="24" cy="244" r="5" class="solid-green"/><text x="36" y="249" class="s">CHiLL1: mostly cytoplasm</text>' +
        '<circle cx="24" cy="268" r="5" class="solid-orange"/><text x="36" y="273" class="s">GCAWKR: mostly nucleus</text>' +
        '<path d="M222 112 H258" class="arrow"/>' +
        '<rect x="266" y="34" width="208" height="206" rx="10" class="f-none"/>' +
        '<text x="370" y="58" class="mid s b">zoom: one RNA molecule</text>' +
        '<path d="M282 112 C298 92 314 132 330 112 S362 92 378 112 S410 132 426 112 S450 100 458 112" class="ln thick s-orange"/>' +
        '<path d="M300 118 V142 M330 118 V142 M360 118 V142 M390 118 V142 M420 118 V142" class="ln thin s-blue"/>' +
        '<circle cx="300" cy="150" r="6" class="solid-yellow"/><circle cx="330" cy="150" r="6" class="solid-yellow"/><circle cx="360" cy="150" r="6" class="solid-yellow"/><circle cx="390" cy="150" r="6" class="solid-yellow"/><circle cx="420" cy="150" r="6" class="solid-yellow"/>' +
        '<text x="370" y="184" class="mid s">probes, each with a dye</text>' +
        '<text x="370" y="212" class="mid s b">many probes on one RNA</text><text x="370" y="230" class="mid s b">= one bright dot</text></svg>' },
    { k: 'h', text: 'Microscope and software: confocal and CellProfiler' },
    { k: 'bgnd', html: `<p>A <b>confocal microscope</b> scans a laser over the sample and lets only light from one thin plane reach the detector, which cuts out the blur from above and below. That sharpness helps decide whether a dot is inside the nucleus or in the cytoplasm. <b>CellProfiler</b> is free software that analyzes microscope images automatically, with the same rules for every image: it finds each nucleus (from the DAPI stain), outlines each cell and counts the dots in each compartment, so nobody has to count by eye.</p>` },
    { k: 'h', text: 'Fractionation: splitting the cell' },
    { k: 'bgnd', html: `<p><b>Cell fractionation</b> reaches the same question another way. The cells are gently opened and spun so that the nuclei separate from the rest (the cytoplasm). RNA is extracted from each fraction and measured by qRT-PCR (lesson D7), which gives a nucleus-to-cytoplasm ratio for each RNA. Two marker RNAs check that the split worked: one known to live in the nucleus and one known to live in the cytoplasm.</p>
<p>Why use both methods? FISH shows single cells, but counting dots needs care; fractionation is quantitative, but the fractions can contaminate each other. Two methods with different weaknesses that agree are an example of <b>orthogonal validation</b> (lesson D6).</p>` },
    { k: 'h', text: 'Overexpression and rescue: does the RNA really matter?' },
    { k: 'bgnd', html: `<p>Knockdown removes an RNA; an <b>overexpression experiment</b> does the opposite. A plasmid (lesson D2) that carries the RNA's sequence is transfected into cells so they make extra copies. A plasmid with no insert, the <b>empty vector</b>, is the control, because the plasmid itself can affect cells.</p>
<p>Combine the two and you get a <b>rescue experiment</b>: first lower the cell's own RNA with an ASO (the phenotype appears), then add the RNA back from a plasmid. If the phenotype goes away, the loss of that RNA caused it, which is strong evidence for an on-target effect. For this to work, the added copy must escape the ASO (for example by having a different sequence), and the RNA must work when made from a plasmid. That can fail for RNAs that act next to their own gene (cis-acting, lesson B6) or when the right isoform is missing, so a failed rescue does not prove an off-target effect.</p>` },
    { k: 'svg', caption: 'The logic of a rescue experiment (schematic bars, not data).',
      svg: '<svg viewBox="0 0 480 236" role="img" aria-label="Four bars of cell growth: control cells grow well, ASO-treated cells grow less, ASO plus the RNA added back would grow well again if the effect were on-target, and ASO plus the RNA added back is what the paper saw: growth stays low">' +
        '<text x="8" y="40" class="s b">Control cells</text><rect x="220" y="24" width="240" height="22" rx="4" class="f-green"/>' +
        '<text x="8" y="90" class="s b">ASO lowers the RNA</text><rect x="220" y="74" width="100" height="22" rx="4" class="f-red"/>' +
        '<text x="8" y="132" class="s b">ASO + RNA added back</text><text x="8" y="150" class="s m">expected if on-target</text><rect x="220" y="124" width="230" height="22" rx="4" class="f-teal"/><text x="335" y="141" class="mid s t-teal b">rescue</text>' +
        '<text x="8" y="182" class="s b">ASO + RNA added back</text><text x="8" y="200" class="s m">what the paper saw</text><rect x="220" y="174" width="100" height="22" rx="4" class="f-red"/><text x="330" y="191" class="s b">no rescue</text>' +
        '<text x="240" y="228" class="mid s m">bar length = how well the cells grow (schematic)</text></svg>' },
    { k: 'memory', html: `<p><b>Analogy:</b> FISH is a night photo in which every copy of one particular word in a book has a tiny torch taped to it. Fractionation is counting the people in the house and in the garden separately, using one person known to stay in each as a check. A rescue is the "undo" test: remove a worker, watch the factory slow down, bring in a stand-in, and see whether it speeds up again. If it does not, the stand-in may simply be unable to do the job.</p>` },
    { k: 'h', text: 'How this paper uses them' },
    { k: 'paper', ref: 'res-mechanism-p1', quote: 'fluorescence in situ hybridization (FISH) revealed contrasting localization patterns: CHiLL1 is located principally in the cytoplasm, and GCAWKR in the nucleus' },
    { k: 'plain', source: ['res-mechanism-p1', 'm-fish-p1', 'm-fish-p2', 'fig6B', 'fig6C', 'res-mechanism-p2', 'res-mechanism-p6'], html: `<p>In A549 cells, probe sets of 25 probes (CHiLL1) and 48 probes (GCAWKR) were used, nuclei were counterstained with DAPI, and the dots were counted ("spots count") with a CellProfiler-based pipeline called SpeckleCounting. CHiLL1 dots sit mainly in the cytoplasm and GCAWKR dots in the nucleus (Figure 6B plots a cytoplasm-to-nucleus ratio of dot counts; the printed n is 1). Cell fractionation agreed (Figure 6C), with MALAT1 as the nuclear control and GAPDH as the cytosolic control. Counting from the sequencing data (lesson D10) put the copy number low: about 4 molecules per cell for CHiLL1, "consistent with FISH", and about 1 copy per cell for GCAWKR.</p>` },
    { k: 'panel', id: 'fig6B', html: `<p>Look for the arrowed dots (light green for CHiLL1, light orange for GCAWKR) and for the chart at the right, which has a line at 1.0.</p>` },
    { k: 'paper', ref: 'res-aso-p3', quote: 'overexpression of neither CHiLL1 nor GCAWKR could rescue ASO-induced phenotypes (Figure S5C). This may be the result of cis-regulatory mechanisms' },
    { k: 'plain', source: ['res-aso-p3', 'm-rescue-p1', 'res-mechanism-p2', 'discussion-p5'], html: `<p>The full-length sequences were cloned into the pcDNA3.1 plasmid (empty pcDNA3.1 as the control), transfected into A549 cells, selected with puromycin for 96 h, and the extra RNA was confirmed by RT-qPCR. Adding back CHiLL1 or GCAWKR did <b>not</b> rescue the ASO effects. The authors suggest cis-regulatory mechanisms (though they saw no such effect on CHiLL1's nearest neighbor, TNFRSF10B) or functional isoforms that are not annotated. So the case for on-target effects rests on other evidence: two independent ASOs per gene, the CRISPR deletion, and gene-expression changes that agree between the two CHiLL1 ASOs (lesson D10).</p>` },
    { k: 'flag', source: ['fig6B', 'm-fish-p1', 'm-fish-p2', 'm-rescue-p1', 'res-aso-p3'], html: `<p>Heads-up: the Figure 6B legend says "confocal", while the Methods name only a "DeltaVision microscope". The panel title is printed "Fluoscence in-situ hybridisation (FISH)" (typo as printed). The Methods do not say outright that SpeckleCounting analyzed the FISH images (the "spots count" label of Figure 6B points that way). Neither the Results nor the Methods say how the added RNA escaped the ASO, and the rescue data are in supplementary Figure S5C, which is not in your PDF.</p>` },
  ],
  appears: [
    { ref: 'res-mechanism-p1', note: 'FISH puts CHiLL1 mainly in the cytoplasm and GCAWKR in the nucleus; cell fractionation agrees.' },
    { ref: 'm-fish-p1', note: 'Stellaris probe sets of 25 (CHiLL1) and 48 (GCAWKR) probes; DAPI counterstain.' },
    { ref: 'm-fish-p2', note: 'Fractionation, and the CellProfiler-based SpeckleCounting pipeline.' },
    { ref: 'res-aso-p3', note: 'Overexpression of neither CHiLL1 nor GCAWKR rescued the ASO phenotypes.' },
    { ref: 'm-rescue-p1', note: 'Full-length sequences in pcDNA3.1; empty vector as control; puromycin selection.' },
  ],
  checks: [
    { q: 'In RNA-FISH, why do many probes bind along one RNA molecule?',
      options: [
        { t: 'Together they make one RNA bright enough to see as a dot, while a single stray probe gives only a faint glow', ok: true, why: 'Right: many dyes on one molecule give a clear dot; accidental binding of one probe stays dim.' },
        { t: 'Each probe cuts the RNA once, so more probes means more cutting', ok: false, why: 'That describes an ASO plus RNase H. Probes only carry a label and do not cut.' },
        { t: 'The probes hold the RNA inside the nucleus', ok: false, why: 'Probes report where the RNA already is; they do not move it.' },
      ], bg: true },
    { q: 'In the fractionation experiment, what are MALAT1 and GAPDH for?',
      options: [
        { t: 'They are marker RNAs: MALAT1 is the nuclear control and GAPDH the cytosolic control, showing the split worked', ok: true, why: 'Right (Figure 6C legend): if each marker lands in its expected fraction, the nuclei and cytoplasm were separated well.' },
        { t: 'They are the two lncRNAs whose location is being tested', ok: false, why: 'The lncRNAs being tested are CHiLL1 and GCAWKR.' },
        { t: 'They are the ASO controls', ok: false, why: 'ASO controls are non-targeting ASOs. MALAT1 and GAPDH are RNAs measured in the fractions.' },
      ], source: ['fig6C'] },
    { q: 'What happened when CHiLL1 or GCAWKR was overexpressed after ASO knockdown?',
      options: [
        { t: 'It did not rescue the ASO-induced phenotypes', ok: true, why: 'Right (res-aso-p3): the authors suggest cis-regulatory mechanisms or unannotated isoforms as possible reasons.' },
        { t: 'It fully rescued them, proving the ASOs were on-target', ok: false, why: 'The paper reports no rescue. Its on-target case rests on two independent ASOs, the CRISPR deletion and agreeing expression changes.' },
        { t: 'It killed the cells', ok: false, why: 'No such result is reported; the added RNA simply did not reverse the ASO effects.' },
      ], source: ['res-aso-p3'] },
    { q: 'FISH and fractionation both put GCAWKR in the nucleus. This is an example of…',
      options: [
        { t: 'orthogonal validation: two independent methods giving the same answer', ok: true, why: 'Right: the authors say FISH results were "further corroborated by cell fractionation".' },
        { t: 'a rescue experiment', ok: false, why: 'A rescue adds the RNA back after knockdown. Neither FISH nor fractionation does that.' },
        { t: 'a non-targeting control', ok: false, why: 'A non-targeting control is a baseline reagent, not a second method.' },
      ], source: ['res-mechanism-p1'] },
  ],
},
);

(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(

/* ============================================================================================== D10 */
{
  id: 'D10',
  defines: ['signaling-pathway'],
  body: [
    { k: 'h', text: 'RNA-seq: reading all the RNAs at once' },
    { k: 'bgnd', html: `<p>qRT-PCR (lesson D7) measures one RNA at a time. <b>RNA-seq</b> (RNA sequencing) measures nearly all of them in one go. RNA is extracted, turned into cDNA, and a sequencing machine (lesson D4) reads millions of short pieces called reads. Each read is matched to the gene or transcript it came from, and the reads are counted: a gene with many reads was making a lot of RNA. The result is a table with one number per gene per sample, a snapshot of the transcriptome.</p>
<p>The matching and counting is done by <b>quantification</b> software. <b>Kallisto</b> estimates how many reads came from each transcript (isoform) of a reference list such as GENCODE, and repeats the estimate on resampled reads (<b>bootstraps</b>) to show how uncertain it is; <b>Sleuth</b> then compares two conditions. <b>RSEM</b> is another widely used program of this kind.</p>` },
    { k: 'h', text: 'Counting fairly: normalization, CPM, TPM, FPKM' },
    { k: 'bgnd', html: `<p>Raw read counts mislead. A sample sequenced more deeply gives more reads for every gene, and a longer gene gives more reads than a shorter one with the same number of RNA molecules. <b>Normalization</b> means adjusting the numbers so that comparisons are fair. Three common units:</p>
<ul>
<li><b>CPM</b> (counts per million): a gene's reads ÷ all reads in the sample × 1 million. It fixes sequencing depth only, so it suits comparing one gene between samples, or items of equal length such as CRISPR guides.</li>
<li><b>FPKM</b> (fragments per kilobase of transcript per million reads): also divides by the transcript's length, so it fixes depth and length.</li>
<li><b>TPM</b> (transcripts per million): fixes the same two things in the other order (length first, then scaling), so every sample's TPM values add up to 1 million. A TPM is a share: out of every million RNA molecules, this many are this transcript. That makes it easy to compare between samples.</li>
</ul>` },
    { k: 'worked', html: `<p><b>Worked example (made-up numbers).</b> Gene A is 1 kb long and gene B is 4 kb, and both are present as 100 molecules. B gives about four times more reads, so raw counts wrongly say B is four times as abundant; dividing by length (per kb) removes that. If sample 2 is sequenced twice as deeply as sample 1, every count doubles although nothing changed; dividing by total reads (per million) removes that.</p>` },
    { k: 'h', text: 'Differentially expressed genes (DEGs)' },
    { k: 'bgnd', html: `<p>A <b>differentially expressed gene (DEG)</b> is a gene whose RNA level differs between two conditions (here: ASO-treated versus control cells) by more than chance would explain. For each gene the software reports a fold change (lesson E1) and a p-value corrected for testing thousands of genes at once, the q-value (lesson E4). Where to draw the line is the analyst's choice. A DEG list says what changed, not why, and it includes indirect effects.</p>` },
    { k: 'h', text: 'Pathway enrichment: what do the DEGs have in common?' },
    { k: 'bgnd', html: `<p>A list of 2,000 DEGs is hard to read. <b>Pathway enrichment</b> asks: do the DEGs contain more genes from a known group than chance would give? (A pathway is a chain of molecules that pass a message or do a job together.) Suppose 10% of all genes are DEGs. A group of 100 genes should then hold about 10 DEGs by chance; if it holds 35, the group is <i>enriched</i>. The usual test is a hypergeometric or Fisher's exact test (lesson E3), followed by a correction for the many groups tested (lesson E4).</p>
<p>The groups come from databases. <b>KEGG</b> (Kyoto Encyclopedia of Genes and Genomes) holds hand-drawn maps of pathways and diseases, such as "Apoptosis" or "Non-small cell lung cancer". <b>MSigDB</b> (Molecular Signatures Database) is a large collection of gene sets, including 50 "Hallmark" sets with names like "G2-M Checkpoint" (a different list from the hallmarks of cancer, lesson C1). <b>Enrichr</b>, with its R package <b>enrichR</b>, tests a gene list against many such databases at once. <b>GSEA</b> (gene set enrichment analysis) does not cut the list: it ranks all genes, for example by fold change, and checks whether a set's members cluster at the top or bottom. Enrichment is a hint, not proof: it gives you ideas to test.</p>` },
    { k: 'svg', caption: 'From cells to ideas: the RNA-seq pipeline in this lesson (teal = computer steps).',
      svg: '<svg viewBox="0 0 480 362" role="img" aria-label="Flow of six boxes: control and ASO-treated cells, reads counted per transcript, counts made comparable, differentially expressed genes, enriched gene groups, and a testable idea that goes back to the lab">' +
        '<rect x="10" y="10" width="270" height="40" rx="8" class="f-blue"/><text x="145" y="35" class="mid s b">Control vs ASO-treated cells</text>' +
        '<text x="294" y="27" class="s m">RNA to cDNA to sequencer:</text><text x="294" y="44" class="s m">millions of short reads</text>' +
        '<path d="M145 50 V68" class="arrow"/>' +
        '<rect x="10" y="70" width="270" height="40" rx="8" class="f-teal"/><text x="145" y="95" class="mid s b">Reads counted per transcript</text>' +
        '<text x="294" y="87" class="s m">quantification:</text><text x="294" y="104" class="s m">Kallisto, RSEM</text>' +
        '<path d="M145 110 V128" class="arrow"/>' +
        '<rect x="10" y="130" width="270" height="40" rx="8" class="f-teal"/><text x="145" y="155" class="mid s b">Counts made comparable</text>' +
        '<text x="294" y="147" class="s m">normalization:</text><text x="294" y="164" class="s m">CPM, FPKM, TPM</text>' +
        '<path d="M145 170 V188" class="arrow"/>' +
        '<rect x="10" y="190" width="270" height="40" rx="8" class="f-teal"/><text x="145" y="215" class="mid s b">DEGs: genes that go up or down</text>' +
        '<text x="294" y="207" class="s m">a statistical test (Sleuth)</text><text x="294" y="224" class="s m">with a q-value cutoff</text>' +
        '<path d="M145 230 V248" class="arrow"/>' +
        '<rect x="10" y="250" width="270" height="40" rx="8" class="f-teal"/><text x="145" y="275" class="mid s b">Enriched gene groups (pathways)</text>' +
        '<text x="294" y="267" class="s m">KEGG, MSigDB gene sets;</text><text x="294" y="284" class="s m">enrichR, GSEA</text>' +
        '<path d="M145 290 V308" class="arrow"/>' +
        '<rect x="10" y="310" width="270" height="40" rx="8" class="f-orange"/><text x="145" y="335" class="mid s b">A testable idea, back to the lab</text>' +
        '<text x="294" y="327" class="s m">e.g. apoptosis genes lead</text><text x="294" y="344" class="s m">to an Annexin V assay</text></svg>' },
    { k: 'memory', html: `<p><b>Analogy:</b> RNA-seq is a census that counts the inhabitants of every town at once. Normalization adjusts for the size of the sample (sequencing depth) and the size of the town (gene length). Enrichment asks which districts show a surprisingly large share of the people who moved.</p>` },
    { k: 'h', text: 'How this paper uses them' },
    { k: 'paper', ref: 'm-rnaseq-p2', quote: 'Transcript quantification was performed using Kallisto v0.46.0 against GENCODE v36. … Genes with a q-value <0.2 were considered significant.' },
    { k: 'plain', source: ['m-rnaseq-p1', 'm-rnaseq-p2', 'fig6F'], html: `<p>A549 and H460 cells were harvested 24 h after ASO transfection; the RNA-seq libraries were paired-end 150 and sequenced to a depth of 30 million reads per sample. Kallisto quantified the transcripts, isoforms were added up to gene level, and Sleuth tested for DEGs (q-value below 0.2). For CHiLL1 they kept the genes that changed with both ASOs. Figure 6F lists 2006 DEGs for A549 and 3015 for H460 (the panel prints "H450").</p>` },
    { k: 'paper', ref: 'res-mechanism-p2', quote: 'CHiLL1 expression in control cells was 8.3 transcripts per million (TPM)' },
    { k: 'plain', source: ['res-mechanism-p2', 'res-mechanism-p6', 'fig6E'], html: `<p>CHiLL1 is at 8.3 TPM in control cells, which the authors translate as about 4 molecules per cell, "consistent with FISH"; GCAWKR is at 2.5 TPM, about 1 copy per cell. RNA-seq also confirmed the knockdown by the ASOs, and the gene changes caused by the two CHiLL1 ASOs agree: R = 0.75 in Figure 6E, where 874 genes rise with both ASOs, 808 fall with both, and 171 and 153 move in opposite directions. The authors conclude that most effects arise on-target.</p>` },
    { k: 'paper', ref: 'res-mechanism-p3', quote: `we identified enriched KEGG terms (Figures 6F and S6D). These underscored disease relevance (e.g., "non-small cell lung cancer") and also implicated potential mechanistic pathways (MAPK, PI3K-Akt)` },
    { k: 'paper', ref: 'res-mechanism-p4', quote: 'A similar analysis of the Molecular Signatures Database (MSigDB) implicated p53 and mTORC1 signaling' },
    { k: 'plain', source: ['res-mechanism-p3', 'res-mechanism-p6', 'm-rnaseq-p3', 'm-hits-p5', 'fig6F'], html: `<p>The enrichR package ran the enrichment. The CHiLL1 DEGs shared by both ASOs were checked against KEGG; the nine green dots of Figure 6F are cancer-relevant terms that are significant in both cell lines (R = 0.48), among them "non-small cell lung cancer", "apoptosis" and the two named pathways quoted above. The MSigDB analysis added two more, and for GCAWKR it gave terms such as "G2-M checkpoint" (Figure 6J). Lesson D11 explains what these pathways do. GSEA turns up in the screen analysis: enrichment scores (n = 10,000 simulations) checked how well positive and neutral control genes were ranked.</p>` },
    { k: 'panel', id: 'fig6F', html: `<p>Each dot is one KEGG term; the green dots are the cancer-relevant terms. The printed DEG counts are 2006 (A549) and 3015 (H460, printed "H450").</p>` },
    { k: 'why', source: ['res-mechanism-p5', 'res-mechanism-p6', 'discussion-p6'], html: `<p>Enrichment gave ideas that the authors then tested: "apoptosis" for CHiLL1 and the Annexin V assay (more early-apoptotic cells, Figure 6G); "G2-M checkpoint" for GCAWKR and the cell-cycle assay (more cells in G2, Figure 6K); migration genes and the crystal violet assay (impaired migration, Figure 6L).</p>` },
    { k: 'plain', source: ['m-hits-p1', 'm-library-design-p2', 'fig5H', 'res-mechanism-p2', 'res-mechanism-p6'], html: `<p><b>Which unit where?</b> CPM: guide counts in the screens (filtered with "3 > cpm>666"). FPKM: RSEM expression in the library design (transcripts below 0.1 removed) and "expressed" meaning above 0.5 in Figure 5H. TPM: CHiLL1 (8.3) and GCAWKR (2.5).</p>` },
    { k: 'flag', source: ['m-hits-p1', 'fig6F', 'res-mechanism-p2'], html: `<p>Heads-up: the CPM filter is printed "3 > cpm>666", probably meant as "below 3 or above 666" (the paper does not say). Figure 6F prints "H450" for H460. And the paper does not say how 8.3 TPM was converted to "about 4 molecules per cell".</p>` },
  ],
  appears: [
    { ref: 'res-mechanism-p2', note: 'RNA-seq of ASO-treated A549 cells: CHiLL1 at 8.3 TPM; the two ASOs give agreeing changes (R = 0.75, Figure 6E).' },
    { ref: 'm-rnaseq-p2', note: 'Kallisto quantification, Sleuth testing, q-value below 0.2 for DEGs.' },
    { ref: 'res-mechanism-p3', note: 'KEGG enrichment of the CHiLL1 DEGs (Figure 6F).' },
    { ref: 'm-library-design-p2', note: 'RSEM expression with an FPKM cutoff used when designing the library.' },
  ],
  checks: [
    { q: 'Which statement about CPM, FPKM and TPM is correct?',
      options: [
        { t: 'CPM corrects for sequencing depth only; FPKM and TPM correct for depth and transcript length', ok: true, why: 'Right: CPM has no length term, while FPKM and TPM divide by length as well (and TPM then rescales so each sample sums to 1 million).' },
        { t: 'All three correct for transcript length only', ok: false, why: 'All three correct for sequencing depth ("per million"); CPM does not correct for length.' },
        { t: 'TPM corrects for depth only and FPKM for length only', ok: false, why: 'Both TPM and FPKM correct for depth and length; they differ in the order of the steps and in the totals.' },
      ], bg: true },
    { q: 'How were DEGs called in the paper\'s RNA-seq analysis?',
      options: [
        { t: 'Sleuth tested each gene, and genes with a q-value below 0.2 counted as significant', ok: true, why: 'Right (m-rnaseq-p2). For CHiLL1 the paper kept genes that changed with both ASOs.' },
        { t: 'Any gene above 0.5 FPKM in the control cells', ok: false, why: 'That is the cutoff the paper uses to call a gene "expressed" in tumors (Figure 5H), not the rule for DEGs.' },
        { t: 'Any gene that changed with only one of the two ASOs', ok: false, why: 'For CHiLL1 the paper kept genes changed by both ASOs, to avoid the quirks of a single ASO.' },
      ], source: ['m-rnaseq-p2', 'fig5H'] },
    { q: 'In Figure 6E the gene changes caused by two CHiLL1 ASOs agree (R = 0.75). What do the authors conclude?',
      options: [
        { t: 'Most effects arise from lowering CHiLL1 itself (on-target), not from the quirks of one ASO', ok: true, why: 'Right: two different ASOs producing the same changes points to the shared target.' },
        { t: 'Both ASOs bind exactly the same spot on CHiLL1', ok: false, why: 'The ASOs are independent sequences. Agreement of their effects says nothing about identical binding spots.' },
        { t: 'CHiLL1 controls every gene in the cell', ok: false, why: 'The figure shows changes in some genes; it does not say every gene depends on CHiLL1.' },
      ], source: ['res-mechanism-p2', 'fig6E'] },
    { q: 'What does pathway enrichment tell you about a list of DEGs?',
      options: [
        { t: 'Whether a known group of genes appears in the list more often than chance would give, which suggests ideas to test', ok: true, why: 'Right: it finds over-represented groups; the biology still has to be tested.' },
        { t: 'That the enriched pathway causes the changes in the DEGs', ok: false, why: 'Enrichment shows an association. The pathway may be a cause, a consequence or only a neighbor.' },
        { t: 'How many genes each pathway contains', ok: false, why: 'The size of a gene set is known beforehand; enrichment asks about overlap with your list.' },
      ], bg: true },
  ],
},
);
