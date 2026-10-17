/* lessons-L4.js — C4, C5, C6, D1 (filled by one content author, scope L4). */

/* ============================================================================================== C4 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'C4',
  defines: ['aso'],
  body: [
    { k: 'h', text: 'The problem: you cannot test a cancer idea on a patient first' },
    { k: 'bgnd', html: `<p>Before an idea goes anywhere near a patient, scientists try it on <b>models</b>: stand-ins that are easier and safer to handle. The most common stand-in is a dish of living cells. The big question is always: <i>how much does the stand-in behave like the real disease?</i></p>` },

    { k: 'h', text: 'Cell lines, primary cells and "immortal" cells' },
    { k: 'bgnd', html: `<p>A <b>cell line</b> is a population of cells, all descended from one original sample, that can be grown in the lab for months or years. Labs share them, so results can be compared. Most cancer cell lines began as a piece of a patient's tumor whose cells never stopped dividing.</p>` +
      `<p><b>Primary cells</b> are different: they come straight from a body. They behave most like the real tissue, but they divide only a limited number of times, so you run out. <b>Immortalized</b> cells have passed that limit, either because they came from a cancer or because scientists changed them on purpose.</p>` +
      `<p><b>Immortal does not mean cancerous.</b> Cancer-like cells are called <i>transformed</i>, so normal cells (primary or immortalized) are called <b>non-transformed</b>. "Divides forever" is one trait; "cancerous" needs more.</p>` },

    { k: 'h', text: 'Cell background: why one cell line is not enough' },
    { k: 'bgnd', html: `<p>Two lung cancer lines are not identical twins. Each has its own mix of mutations and quirks, called its <b>cell background</b>. If a gene matters in only one background, the result may be a quirk of that line and not a fact about the disease. A finding that holds in several backgrounds has better <b>generalizability</b>: you can expect it to hold beyond the one dish where it was seen, perhaps even in patients.</p>` },
    { k: 'memory', html: `<p><b>Analogy:</b> a cake recipe that works in only one oven may just be a quirk of that oven. A recipe that works in three different ovens is one you can trust (the oven is the cell background). Normal cells are the lawn: a good weed-killer must spare the grass you want to keep.</p>` },

    { k: 'h', text: 'Keeping cells trustworthy and alive' },
    { k: 'bgnd', html: `<p>Cell lines get mixed up between labs, and tiny invaders can sneak in, so two checks are routine. <b>STR profiling</b> reads a DNA fingerprint (the pattern of short DNA stretches that repeat, like GATAGATAGATA) and compares it with the known fingerprint of that line: are these cells what the label says? A <b>mycoplasma</b> test looks for very small bacteria that can live in a culture without making it look sick, are not stopped by penicillin, and can still change how cells behave.</p>` +
      `<p>Daily care is simple. Cells live in a <b>culture medium</b>, a liquid food of salts, sugars, amino acids and vitamins, usually with <b>fetal bovine serum (FBS)</b>, the liquid part of cattle-fetus blood, rich in growth factors. <b>PBS</b> is a gentle salt-water rinse with about the saltiness of body fluids. To count or split cells that stick to the plastic, the lab loosens them with the enzyme trypsin: <b>trypsinization</b>.</p>` },

    { k: 'h', text: 'How this paper uses it' },
    { k: 'svg', caption: 'The seven cell lines of the paper: lung cancer lines (red), normal lung-derived lines (green) and one helper line (gray). Media are from the Methods.',
      svg: `<svg viewBox="0 0 480 362" role="img" aria-label="The seven cell lines in the paper in three groups: three KRAS+ lung cancer lines (A549, H460, H441), three normal lung-derived lines (HBEC3-KT, MRC-5, CCD-16Lu) and the helper line HEK293T">` +
        `<text x="240" y="20" class="mid b">Lung cancer lines (the test cells)</text>` +
        `<rect x="6" y="30" width="150" height="104" rx="10" class="f-red"/><rect x="165" y="30" width="150" height="104" rx="10" class="f-red"/><rect x="324" y="30" width="150" height="104" rx="10" class="f-red"/>` +
        `<text x="81" y="56" class="mid b l">A549</text><text x="81" y="78" class="mid s">KRAS+ · DMEM</text><text x="81" y="96" class="mid s">widely used model</text><text x="81" y="114" class="mid s">(main experiments)</text>` +
        `<text x="240" y="56" class="mid b l">H460</text><text x="240" y="78" class="mid s">KRAS+ · RPMI-1640</text><text x="240" y="96" class="mid s">widely used model</text><text x="240" y="114" class="mid s">(main experiments)</text>` +
        `<text x="399" y="56" class="mid b l">H441</text><text x="399" y="78" class="mid s">KRAS+ · RPMI-1640</text><text x="399" y="96" class="mid s">from a pericardial</text><text x="399" y="114" class="mid s">effusion metastasis</text>` +
        `<text x="240" y="170" class="mid b">Normal lung-derived lines (the comparison)</text>` +
        `<rect x="6" y="180" width="150" height="104" rx="10" class="f-green"/><rect x="165" y="180" width="150" height="104" rx="10" class="f-green"/><rect x="324" y="180" width="150" height="104" rx="10" class="f-green"/>` +
        `<text x="81" y="206" class="mid b l">HBEC3-KT</text><text x="81" y="228" class="mid s">bronchial epithelial</text><text x="81" y="246" class="mid s">immortalized</text><text x="81" y="264" class="mid s">airway medium</text>` +
        `<text x="240" y="206" class="mid b l">MRC-5</text><text x="240" y="228" class="mid s">immortalized</text><text x="240" y="246" class="mid s">EMEM</text>` +
        `<text x="399" y="206" class="mid b l">CCD-16Lu</text><text x="399" y="228" class="mid s">primary</text><text x="399" y="246" class="mid s">RPMI-1640</text>` +
        `<rect x="6" y="298" width="468" height="56" rx="10" class="f-gray"/>` +
        `<text x="240" y="318" class="mid b">HEK293T · DMEM</text><text x="240" y="338" class="mid s">kidney-derived "factory" cells that make virus particles</text></svg>` },
    { k: 'plain', source: ['m-expmodel-p1', 'res-pipeline-p5', 'res-aso-p2', 'res-aso-p3', 'm-lentivirus-p1'], html:
      `<p>The Methods list <b>seven</b> human cell lines. <b>A549</b> and <b>H460</b> are called two widely used KRAS+ lung cancer models, and they carry the main experiments. <b>H441</b> is a third KRAS+ line, derived from a pericardial effusion metastasis (cancer that had spread into the fluid around the heart). Three <b>non-transformed lung-derived</b> lines serve as the comparison: <b>HBEC3-KT</b> (bronchial epithelial cells) and <b>MRC-5</b>, both called immortalized, and <b>CCD-16Lu</b>, called primary. <b>HEK293T</b> is the odd one out: it is the line that makes the virus particles used to deliver DNA tools into the lung cells (lesson D2).</p>` },
    { k: 'paper', ref: 'm-expmodel-p1', quote: 'All the cell lines were authenticated using Short Tandem Repeat (STR) profiling (Microsynth Cell Line Typing) and tested negative for mycoplasma contamination.' },
    { k: 'plain', source: ['m-expmodel-p1', 'm-expmodel-p2', 'm-expmodel-p3'], html:
      `<p>Every line was identity-checked by STR profiling and tested negative for mycoplasma. A549 and HEK293T grow in DMEM, MRC-5 in EMEM, and H460, H441 and CCD-16Lu in RPMI-1640, each with 10% fetal bovine serum plus L-glutamine (a nutrient) and the antibiotics penicillin and streptomycin; HBEC3-KT needs a special airway-cell medium. Cells were split every 2–3 days and kept at 37°C in a humid atmosphere with 5% CO2.</p>` },
    { k: 'paper', ref: 'res-aso-p3', quote: 'We evaluated Tier 2 ASOs’ effects on a panel of non-transformed lung-derived cells: HBEC3-KT, MRC5-CV1 (both immortalized), and CCD-12Lu (primary).' },
    { k: 'plain', source: ['res-aso-p3'], html:
      `<p>The authors note that targeting lncRNAs <i>could</i> cause lower side effects in healthy tissue, but few studies have tested this. So they tried their candidate treatments, called <b>ASOs</b> (short strands that silence one chosen RNA; you will study them later), on three non-transformed lung-derived lines. These cells showed a diminished or absent response. That is the hoped-for result: a treatment that spares normal cells should cause fewer side effects.</p>` },
    { k: 'flag', source: ['m-aso-p1', 'res-aso-p3'], html:
      `<p>Heads-up on doses: the Methods give the ASOs at a final 25 nM for A549, H460, NCI-H441 and MRC5-CV1, but 10 nM for HBEC3-KT and CCD-16LU. The paper does not comment on this difference, so keep it in mind when you compare cancer and normal cells.</p>` },
    { k: 'paper', ref: 'res-integration-p3', quote: 'revealed a low degree of concordance—lncRNAs tend to only display activity in the cell type where they were discovered' },
    { k: 'plain', source: ['res-integration-p3'], html:
      `<p>Comparing the lncRNAs that mattered for growth in A549 and in H460 separately, the two lists barely overlapped: most lncRNAs were active only in the cell type where they were found. The lncRNAs that mattered in several tests (the "pan-hallmark" ones) were more <b>background-independent</b>: active in both cell types. That is why the authors use two cancer lines and prefer lncRNAs that work in both.</p>` },
    { k: 'why', source: ['intro-p5'], html:
      `<p>The authors' worry is that a search done in a single cell line may find lncRNAs with cell-line-specific effects that "do not generalize to the disease in question". An ideal search should favor lncRNAs that are both pleiotropic (affect several cancer hallmarks) and background independent (effective regardless of cell model).</p>` },
    { k: 'flag', source: ['m-expmodel-p1', 'res-aso-p3', 'm-aso-p1', 'm-viability-2d-p1'], html:
      `<p>Heads-up on names: the Methods list MRC-5 and CCD-16Lu, but the text and other Methods paragraphs also write MRC5-CV1, Mrc5-SV1, CCD-12Lu and CCD-16LU. They most likely refer to the same two lines, but the paper never says so. Do not let the different spellings throw you in the exam.</p>` },
  ],
  appears: [
    { ref: 'm-expmodel-p1', note: 'The seven cell lines, their source, STR authentication and the mycoplasma test.' },
    { ref: 'm-expmodel-p2', note: 'The medium of each line (DMEM, EMEM, RPMI-1640) and the 10% FBS.' },
    { ref: 'res-aso-p3', note: 'The panel of non-transformed lung-derived cells (immortalized HBEC3-KT and MRC5-CV1, primary CCD-12Lu).' },
    { ref: 'res-integration-p3', note: 'Cell-type-specific versus background-independent activity in A549 and H460.' },
    { ref: 'intro-p5', note: 'Why a single cell line can mislead: the generalizability problem.' },
  ],
  checks: [
    { q: 'Why did the authors test their candidate treatments on HBEC3-KT, MRC-5 and CCD-16Lu cells?',
      options: [
        { t: 'To see whether normal-type lung cells respond less than cancer cells, a hint of fewer side effects', ok: true, why: 'Right: the paper reports a diminished or absent response in these non-transformed lung-derived cells.' },
        { t: 'To make the virus particles that deliver the DNA tools', ok: false, why: 'That is the job of HEK293T, not of these three lines.' },
        { t: 'Because they carry a KRAS mutation just like A549', ok: false, why: 'They are described as non-transformed (normal-type) cells; the KRAS+ lines are A549, H460 and H441.' },
        { t: 'To provide extra cancer cells for the main experiments', ok: false, why: 'They are not cancer cells. Their role is the healthy comparison.' },
      ], source: ['res-aso-p3', 'discussion-p5'] },
    { q: 'What is the difference between primary cells and immortalized cells?',
      options: [
        { t: 'Primary cells come straight from a body and divide only a limited number of times; immortalized cells can divide without that limit', ok: true, why: 'Right. Cancer cells are naturally immortal, and normal cells can also be made immortal on purpose.' },
        { t: 'Primary cells are cancerous and immortalized cells are normal', ok: false, why: 'Neither word says "cancerous". The paper calls both immortalized and primary lung cells non-transformed.' },
        { t: 'Primary cells can be grown forever and immortalized cells cannot', ok: false, why: 'This is reversed: it is the primary cells that run out of divisions.' },
      ], source: ['res-aso-p3'] },
    { q: 'In the paper, what does it mean that a lncRNA is "background-independent"?',
      options: [
        { t: 'It stays active in different cell lines (backgrounds), not only in the one where it was found', ok: true, why: 'Right: the paper contrasts lncRNAs active in only one cell type with those active in both A549 and H460.' },
        { t: 'It is made in every tissue of the body', ok: false, why: 'That is about where it is expressed. Background independence is about its effect in different cell models.' },
        { t: 'It is active only in normal cells', ok: false, why: 'The searched-for lncRNAs promote cancer; "background" means the cell line, not normal versus cancer.' },
      ], source: ['intro-p5', 'res-integration-p3'] },
    { q: 'A lab wants to be sure the cells in its freezer really are the cell line on the label. Which routine check is for that?',
      options: [
        { t: 'STR profiling, a DNA fingerprint compared with the known fingerprint of the line', ok: true, why: 'Right: it catches mix-ups and contamination with another line.' },
        { t: 'A mycoplasma test', ok: false, why: 'That checks for a bacterial infection of the culture, not for the identity of the cells.' },
        { t: 'Trypsinization', ok: false, why: 'Trypsin only loosens cells from the dish so they can be counted or split.' },
      ], bg: true },
  ],
});
