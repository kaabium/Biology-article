/* lessons-L4.js — C4, C5, C6, D1 (filled by one content author, scope L4). */

/* ============================================================================================== C4 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'C4',
  defines: ['aso', 'lentivirus'],
  body: [
    { k: 'h', text: 'The problem: you cannot test a cancer idea on a patient first' },
    { k: 'bgnd', html: `<p>Before an idea goes near a patient, scientists try it on <b>models</b>: stand-ins that are easier and safer to handle, most often a dish of living cells. The big question is always: <i>how much does the stand-in behave like the real disease?</i></p>` },

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
      `<p>The Methods list <b>seven</b> human cell lines. <b>A549</b> and <b>H460</b> are called two widely used KRAS+ lung cancer models, and they carry the main experiments. <b>H441</b> is a third KRAS+ line, derived from a pericardial effusion metastasis (cancer that had spread into the fluid around the heart). Three <b>non-transformed lung-derived</b> lines serve as the comparison: <b>HBEC3-KT</b> (bronchial epithelial cells) and <b>MRC-5</b>, both called immortalized, and <b>CCD-16Lu</b>, called primary. <b>HEK293T</b> is the odd one out: it is the line that makes the virus particles (harmless, modified viruses used as delivery vehicles; lesson D2) that carry DNA tools into the lung cells.</p>` },
    { k: 'paper', ref: 'm-expmodel-p1', quote: 'All the cell lines were authenticated using Short Tandem Repeat (STR) profiling (Microsynth Cell Line Typing) and tested negative for mycoplasma contamination.' },
    { k: 'plain', source: ['m-expmodel-p1', 'm-expmodel-p2', 'm-expmodel-p3'], html:
      `<p>Every line was identity-checked by STR profiling and tested negative for mycoplasma. A549 and HEK293T grow in DMEM, MRC-5 in EMEM, and H460, H441 and CCD-16Lu in RPMI-1640, each with 10% fetal bovine serum plus L-glutamine (a nutrient) and the antibiotics penicillin and streptomycin; HBEC3-KT needs a special airway-cell medium. Cells were split every 2–3 days and kept at 37°C in a humid atmosphere with 5% CO2.</p>` },
    { k: 'paper', ref: 'res-aso-p3', quote: 'We evaluated Tier 2 ASOs’ effects on a panel of non-transformed lung-derived cells: HBEC3-KT, MRC5-CV1 (both immortalized), and CCD-12Lu (primary).' },
    { k: 'plain', source: ['res-aso-p3'], html:
      `<p>The authors note that targeting lncRNAs <i>could</i> harm healthy tissue less, but few studies have tested this. So they tried their possible treatments, called <b>ASOs</b> (short strands that silence one chosen RNA; you will study them later), on three non-transformed lung-derived lines. These cells showed a diminished or absent response. That is the hoped-for result: a treatment that spares normal cells should do less harm to a patient.</p>` },
    { k: 'flag', source: ['m-aso-p1', 'res-aso-p3'], html:
      `<p>Heads-up on doses: the Methods give the ASOs at a final 25 nM for A549, H460, NCI-H441 and MRC5-CV1, but 10 nM for HBEC3-KT and CCD-16LU. The paper does not comment on this difference, so keep it in mind when you compare cancer and normal cells.</p>` },
    { k: 'paper', ref: 'res-integration-p3', quote: 'revealed a low degree of concordance—lncRNAs tend to only display activity in the cell type where they were discovered' },
    { k: 'plain', source: ['res-integration-p3'], html:
      `<p>Comparing the lncRNAs that mattered for growth in A549 and in H460 separately, the two lists barely overlapped: most lncRNAs were active only in the cell type where they were found. The lncRNAs that mattered in several tests (the "pan-hallmark" ones) were more <b>background-independent</b>: active in both cell types. That is why the authors use two cancer lines and prefer lncRNAs that work in both.</p>` },
    { k: 'why', source: ['intro-p5'], html:
      `<p>The authors worry that a search in a single cell line may find lncRNAs whose effects are cell-line-specific and "do not generalize to the disease in question". They want lncRNAs that are both pleiotropic (affect several cancer hallmarks) and background independent (effective regardless of cell model).</p>` },
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
    { q: 'Why did the authors test their possible treatments on HBEC3-KT, MRC-5 and CCD-16Lu cells?',
      options: [
        { t: 'To see whether normal-type lung cells respond less than cancer cells, a hint of less harm to a patient', ok: true, why: 'Right: the paper reports a diminished or absent response in these non-transformed lung-derived cells.' },
        { t: 'To make the delivery particles that carry the DNA tools', ok: false, why: 'That is the job of HEK293T, not of these three lines.' },
        { t: 'Because they carry a KRAS mutation just like A549', ok: false, why: 'They are described as non-transformed (normal-type) cells; the KRAS+ lines are A549, H460 and H441.' },
        { t: 'To provide extra cancer cells for the main experiments', ok: false, why: 'They are not cancer cells. Their role is the healthy comparison.' },
      ], source: ['res-aso-p3', 'discussion-p5', 'm-expmodel-p1'] },
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
        { t: 'A mycoplasma test', ok: false, why: 'That checks for bacterial contamination of the culture, not for the identity of the cells.' },
        { t: 'Trypsinization', ok: false, why: 'Trypsin only loosens cells from the dish so they can be counted or split.' },
      ], bg: true },
  ],
});

/* ============================================================================================== C5 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'C5',
  defines: ['aso', 'statistical-significance'],
  body: [
    { k: 'h', text: 'The problem: a dish is flat, a tumor is a lump' },
    { k: 'bgnd', html: `<p>Inside the body a tumor is a crowded, three-dimensional lump, with cells packed against each other, far from the blood supply in the middle. A dish of cells looks nothing like that. So scientists climb a ladder of models: simple and scalable at the bottom, realistic but slow at the top.</p>` },

    { k: 'h', text: '2D culture: flat, cheap and fast' },
    { k: 'bgnd', html: `<p>In <b>2D culture</b> cells sink to the bottom of a dish, stick to the plastic and spread out in one layer, a <b>monolayer</b>. It is cheap, fast and easy to count and treat, and every cell gets the same food, oxygen and drug at the same moment. That makes it the workhorse for big experiments. But a real tumor is not like that.</p>` },

    { k: 'h', text: '3D culture: spheroids, organoids and Matrigel' },
    { k: 'bgnd', html: `<p>In <b>3D culture</b> cells grow as clumps. They touch neighbors on all sides, and cells in the middle get less oxygen, food and drug, much as inside a tumor. A <b>spheroid</b> is a simple ball of cells, often made from a cell line. An <b>organoid</b> is a more elaborate mini-structure grown from cells of a real tissue or tumor: it organizes itself and copies some features of the original.</p>` +
      `<p>3D cultures usually sit in <b>Matrigel</b>, a jelly-like protein mixture (extracted from mouse tumor cells) that works like the scaffold between cells in tissue. The price of realism: 3D models are slower, costlier and harder to scale up.</p>` },

    { k: 'h', text: 'In vitro, in vivo, ex vivo' },
    { k: 'bgnd', html: `<p><i>In vitro</i> (Latin "in glass") means in a dish or tube. <i>In vivo</i> means inside a living animal or person. <i>Ex vivo</i> means living tissue taken from a body and studied outside it with little change, such as a fresh patient sample. Everything in the last lesson was in vitro.</p>` },

    { k: 'h', text: 'Mouse models: xenografts and PDX' },
    { k: 'bgnd', html: `<p>A <b>xenograft</b> is tissue grafted from one species into another ("xeno" means foreign), usually human tumor cells growing in a mouse. In a <b>patient-derived xenograft (PDX)</b> the graft is a piece of a patient's own tumor. For human tissue to grow, the mouse must be <b>immunodeficient</b>: with no working immune system it cannot reject the foreign cells. <b>NSG</b> mice, a common strain, lack the main immune-attacker cells (T, B and natural killer cells).</p>` +
      `<p>A PDX tumor can also be taken out of the mouse and its cells grown as organoids: a dish model that began in a patient.</p>` },
    { k: 'memory', html: `<p><b>Analogy:</b> a 2D dish is a street map: cheap, quick, lots of detail, but flat. A spheroid or organoid is a scale model of the city: you see height and crowding. A PDX mouse is a small pilot town with real traffic: the most realistic, but slow and costly.</p>` },
    { k: 'svg', caption: 'The ladder of lab models. The paper uses the first three for its ASO tests; the mouse is used only to grow the tumor that became BE874.',
      svg: `<svg viewBox="0 0 480 338" role="img" aria-label="Four lab models side by side: 2D culture as a flat row of cells, a spheroid as a ball of cells, an organoid as a cell cluster inside a Matrigel dome, and a PDX as a human tumor on an immunodeficient mouse; below, which paper experiment uses each, and an arrow from easier to scale up to closer to a real tumor">` +
        `<path d="M14 92 H106" class="ln thick"/>` +
        `<circle cx="24" cy="82" r="9" class="f-blue"/><circle cx="42" cy="82" r="9" class="f-blue"/><circle cx="60" cy="82" r="9" class="f-blue"/><circle cx="78" cy="82" r="9" class="f-blue"/><circle cx="96" cy="82" r="9" class="f-blue"/>` +
        `<circle cx="180" cy="70" r="10" class="f-blue"/><circle cx="180" cy="50" r="10" class="f-blue"/><circle cx="197" cy="60" r="10" class="f-blue"/><circle cx="197" cy="80" r="10" class="f-blue"/><circle cx="180" cy="90" r="10" class="f-blue"/><circle cx="163" cy="80" r="10" class="f-blue"/><circle cx="163" cy="60" r="10" class="f-blue"/>` +
        `<text x="300" y="36" class="mid s t-orange b">Matrigel dome</text>` +
        `<path d="M250 100 A50 50 0 0 1 350 100 Z" class="f-orange"/>` +
        `<circle cx="284" cy="88" r="8" class="f-blue"/><circle cx="300" cy="88" r="8" class="f-blue"/><circle cx="316" cy="88" r="8" class="f-blue"/><circle cx="292" cy="74" r="8" class="f-blue"/><circle cx="308" cy="74" r="8" class="f-blue"/>` +
        `<text x="430" y="32" class="mid s t-red b">human tumor</text>` +
        `<ellipse cx="420" cy="78" rx="40" ry="22" class="f-gray"/><ellipse cx="380" cy="72" rx="14" ry="12" class="f-gray"/><path d="M458 82 Q476 72 470 58" class="ln"/>` +
        `<circle cx="430" cy="54" r="12" class="f-red"/>` +
        `<text x="60" y="130" class="mid b">2D culture</text><text x="180" y="130" class="mid b">Spheroid</text><text x="300" y="130" class="mid b">Organoid</text><text x="420" y="130" class="mid b">PDX in a mouse</text>` +
        `<text x="60" y="150" class="mid s">one flat layer</text><text x="60" y="167" class="mid s">on plastic</text>` +
        `<text x="180" y="150" class="mid s">ball of cells</text><text x="180" y="167" class="mid s">stuck together</text>` +
        `<text x="300" y="150" class="mid s">mini-tumor grown</text><text x="300" y="167" class="mid s">from patient cells</text>` +
        `<text x="420" y="150" class="mid s">tumor piece grown</text><text x="420" y="167" class="mid s">in an NSG mouse</text>` +
        `<text x="6" y="204" class="s b m">In this paper:</text>` +
        `<rect x="8" y="214" width="104" height="52" rx="8" class="f-teal"/><text x="60" y="236" class="mid s b">A549, H460</text><text x="60" y="254" class="mid s">(most work)</text>` +
        `<rect x="128" y="214" width="104" height="52" rx="8" class="f-teal"/><text x="180" y="236" class="mid s b">H441</text><text x="180" y="254" class="mid s">spheroids</text>` +
        `<rect x="248" y="214" width="104" height="52" rx="8" class="f-teal"/><text x="300" y="236" class="mid s b">BE874</text><text x="300" y="254" class="mid s">organoids</text>` +
        `<rect x="368" y="214" width="104" height="52" rx="8" class="f-gray"/><text x="420" y="236" class="mid s">source of BE874</text><text x="420" y="254" class="mid s">(no ASO tests)</text>` +
        `<path d="M20 292 H460" class="arrow both"/>` +
        `<text x="20" y="316" class="s m">easier and cheaper to scale up</text><text x="460" y="316" class="s m end">closer to a real tumor</text></svg>` },

    { k: 'h', text: 'How this paper uses it' },
    { k: 'paper', ref: 'res-aso-p6', quote: '3D in vitro models represent a more faithful tumor model compared with monolayer cultures.' },
    { k: 'plain', source: ['res-aso-p6', 'm-viability-3d-p1'], html:
      `<p>The authors say 3D lab models are a more faithful stand-in for a tumor than monolayer (2D) cultures. They delivered the CHiLL1 and GCAWKR ASOs (short strands that silence one chosen RNA; you will study them later) to spheroids of H441 cells and saw a drop in the number of living cells that approached the drop caused by the paper's growth-gene control. In the Methods the spheroids grow in small domes of Matrigel mixed 1:1 with growth medium, with 20,000 cells per dome, and living cells are measured at the start and again after one week.</p>` },
    { k: 'paper', ref: 'res-aso-p7', quote: 'Organoids derived from patient-derived xenografts (PDXs) recapitulate the therapy response of individual patients. Delivery of CHiLL1 ASOs resulted in a significant reduction in cell viability of KRAS+ human NSCLC BE874 organoids (Figure 5F).' },
    { k: 'plain', source: ['m-pdx-p1', 'res-aso-p7', 'm-viability-3d-p3'], html:
      `<p><b>BE874</b> is a patient-derived organoid line from a KRAS+ lung cancer. Its history, from the Methods: pieces of a surgically removed lung tumor were implanted under the skin of the flanks of 6-week-old NSG mice. After the tumor grew, it was removed, its cells were separated, and they were grown as organoids. The KRAS G12C change (the paper writes c.34G&gt;T, p.Gly12Cys) was found in both the organoids and the original cancer. CHiLL1 ASOs then caused a significant reduction (unlikely to be a chance result) in the number of living cells in BE874 organoids, which were also grown in Matrigel domes with 20,000 cells per dome.</p>` },
    { k: 'panel', id: 'fig5F', html: `<p>Each pair of bars is one independent set of BE874 organoids: gray bars are the control and green bars are the CHiLL1 ASO. The legend says n = 4, so the experiment was done on four independent sets of organoids.</p>` },
    { k: 'flag', source: ['m-viability-3d-p3', 'fig5F'], html: `<p>Heads-up: for BE874 the Methods say the measurement was repeated "after one week", while the x axis of Figure 5F labels the measurement times in days. Check the axis when you reach that panel.</p>` },
    { k: 'paper', ref: 'discussion-p5', quote: 'Future efforts will be required to further refine ASO sequences and chemistry and to effectively deliver them in vivo.' },
    { k: 'plain', source: ['discussion-p5', 'limitations-p2', 'm-pdx-p1'], html:
      `<p>The paper describes its ASO tests only in dishes: 2D cells, spheroids and organoids. The mice were used to grow the BE874 tumor, not to test the ASOs; delivering the ASOs in a living animal (in vivo) is listed as future work. The authors also say that their big experiments used two monolayer cell backgrounds and that future work should run in parallel across the widest panel of mutationally matched 2D and 3D models.</p>` },
  ],
  appears: [
    { ref: 'res-aso-p6', note: '3D spheroid cultures of H441 cells as a "more faithful tumor model".' },
    { ref: 'res-aso-p7', note: 'PDX-derived BE874 organoids and the effect of CHiLL1 ASOs.' },
    { ref: 'm-pdx-p1', note: 'How BE874 was made: patient tumor, NSG mice, organoids, KRAS G12C check.' },
    { ref: 'm-viability-3d-p1', note: 'Spheroids in Matrigel domes (H441).' },
    { ref: 'fig5F', note: 'BE874 organoid viability after CHiLL1 ASOs.' },
    { ref: 'discussion-p5', note: 'ASOs worked in monolayer and 3D models; delivery in vivo is future work.' },
  ],
  checks: [
    { q: 'Why does the paper call 3D models "a more faithful tumor model" than monolayer cultures?',
      options: [
        { t: 'Cells in a 3D clump touch neighbors on all sides and the inner ones get less oxygen and drug, as inside a real tumor', ok: true, why: 'Right: that is the realism 3D adds over a flat single layer.' },
        { t: 'Every cell in a 3D culture gets exactly the same food and drug at the same time', ok: false, why: 'That describes a flat monolayer. In 3D, cells in the middle are reached less easily.' },
        { t: 'They are cheaper and easier to scale up than flat dishes', ok: false, why: 'The opposite: 3D models cost more and scale up worse, which is why the big experiments were done in 2D.' },
      ], source: ['res-aso-p6'] },
    { q: 'Why were NSG mice used to produce the BE874 organoids?',
      options: [
        { t: 'They have no working immune system, so the piece of human tumor is not rejected and can grow', ok: true, why: 'Right: an immunodeficient host lets the foreign human tissue engraft.' },
        { t: 'They carry the same KRAS mutation as the patient', ok: false, why: 'The KRAS G12C change was found in the patient\'s cancer and in the organoids, not as a feature of the mice.' },
        { t: 'They were the animals in which the ASOs were tested', ok: false, why: 'The paper lists delivering ASOs in vivo as future work; the mice only grew the tumor.' },
      ], source: ['m-pdx-p1', 'discussion-p5'] },
    { q: 'Where were the CHiLL1 ASOs tested on BE874?',
      options: [
        { t: 'On organoids in a dish (in vitro); the mouse was only the source of the tumor', ok: true, why: 'Right: BE874 organoids were seeded in Matrigel domes and measured in plates.' },
        { t: 'Directly in living NSG mice (in vivo)', ok: false, why: 'The Discussion says effective delivery in vivo still needs future work.' },
        { t: 'In the patient, after the surgery', ok: false, why: 'No patient was treated; the study is lab work in cells and organoids.' },
      ], source: ['m-pdx-p1', 'm-viability-3d-p3', 'discussion-p5'] },
    { q: 'What is Matrigel used for in 3D cultures?',
      options: [
        { t: 'A jelly-like scaffold in which cells are embedded so they can grow in 3D', ok: true, why: 'Right: it mimics the scaffold between cells in real tissue.' },
        { t: 'A drug that kills the cells', ok: false, why: 'It is not a treatment; it is a support gel for the cells.' },
        { t: 'A salt solution used to rinse cells', ok: false, why: 'That is PBS. Matrigel is a gel, not a rinse.' },
      ], bg: true },
  ],
});

/* ============================================================================================== C6 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'C6',
  body: [
    { k: 'h', text: 'The problem: do lab results hold in real patients?' },
    { k: 'bgnd', html: `<p>Cell lines are convenient, but a skeptic asks: does this also happen in real patients? Scientists can answer without recruiting anyone, by reusing data that others have already collected. You only need to know what each collection holds.</p>` },

    { k: 'h', text: 'Public data collections' },
    { k: 'bgnd', html: `<ul>` +
      `<li><b>TCGA</b> (The Cancer Genome Atlas): a large US project that profiled thousands of patient tumors across more than 30 cancer types: DNA changes, RNA levels and clinical details such as survival. <i>TCGA-LUAD</i> is its lung adenocarcinoma part.</li>` +
      `<li><b>TANRIC</b> (Atlas of Noncoding RNAs in Cancer): a web resource with RNA measurements in tumors, made for looking up lncRNAs.</li>` +
      `<li><b>PCAWG</b> (Pan-Cancer Analysis of Whole Genomes): an international project that read the complete DNA of thousands of tumors of many types, so it shows which DNA regions are often gained or lost.</li>` +
      `<li><b>CCLE</b> (Cancer Cell Line Encyclopedia): a catalog of DNA and RNA data for about a thousand cancer cell lines.</li>` +
      `<li><b>GEO</b> (Gene Expression Omnibus): a public archive where scientists <i>deposit</i> their own genomics data for others to download.</li>` +
      `<li><b>Zenodo</b>: a general open archive for research files such as software code, each with a permanent identifier.</li></ul>` +
      `<p>Patient data come as a <b>cohort</b>: a defined group of patients or samples analyzed together, such as all lung adenocarcinomas with a given mutation.</p>` },
    { k: 'svg', caption: 'Which collection answers which question (left to right), and where the paper\'s own results went (bottom).',
      svg: `<svg viewBox="0 0 480 340" role="img" aria-label="The lncRNAs that mattered in the lab tests are checked against four public collections: TCGA and TANRIC for RNA levels in tumors, PCAWG and CCLE for DNA copy number. At the bottom, the paper's own data go to GEO and its code to Zenodo">` +
        `<rect x="6" y="96" width="122" height="100" rx="12" class="f-orange"/>` +
        `<text x="67" y="128" class="mid b">lncRNAs</text><text x="67" y="148" class="mid s">that mattered</text><text x="67" y="166" class="mid s">in the lab tests</text>` +
        `<rect x="176" y="8" width="298" height="56" rx="10" class="f-blue"/><text x="325" y="30" class="mid b">TCGA</text><text x="325" y="50" class="mid s">101 KRAS+ lung tumors: RNA level</text>` +
        `<rect x="176" y="76" width="298" height="56" rx="10" class="f-blue"/><text x="325" y="98" class="mid b">TANRIC</text><text x="325" y="118" class="mid s">87 tumors vs 77 adjacent normal: RNA level</text>` +
        `<rect x="176" y="144" width="298" height="56" rx="10" class="f-purple"/><text x="325" y="166" class="mid b">PCAWG</text><text x="325" y="186" class="mid s">many cancer genomes: DNA gained or lost?</text>` +
        `<rect x="176" y="212" width="298" height="56" rx="10" class="f-purple"/><text x="325" y="234" class="mid b">CCLE</text><text x="325" y="254" class="mid s">copy number of A549 and H460 cells</text>` +
        `<path d="M130 130 C152 130 152 36 172 36" class="arrow"/><path d="M130 142 C152 142 152 104 172 104" class="arrow"/><path d="M130 154 C152 154 152 172 172 172" class="arrow"/><path d="M130 166 C152 166 152 240 172 240" class="arrow"/>` +
        `<rect x="6" y="284" width="468" height="50" rx="10" class="f-gray"/><text x="240" y="305" class="mid b">Going out: the paper's own results</text><text x="240" y="324" class="mid s">sequencing data go to GEO · analysis code goes to Zenodo</text></svg>` },

    { k: 'h', text: 'Three comparisons you can make with patient data' },
    { k: 'bgnd', html: `<p><b>Tumor vs adjacent normal tissue.</b> When a surgeon removes a tumor, a bit of healthy-looking tissue next to it is often collected too. This <b>adjacent normal tissue</b> comes from the same organ, often the same patient, so it is a fair comparison. A gene that is higher in the tumor is a clue (not proof) that tumors use it. Caution: tissue next to a tumor is not always perfectly normal.</p>` +
      `<p><b>Survival analysis.</b> <i>Overall survival</i> is the time from diagnosis until death from any cause. Split patients by how much of a gene their tumors make and compare the groups. If the high group does worse, the gene goes with a <b>poor prognosis</b> (a worse expected outcome). That is an association, not proof of cause.</p>` +
      `<p><b>Tumor subtype.</b> Tumors of one cancer type are not all alike. A <b>tumor subtype</b> is a recognized sub-group, defined by a shared driver mutation (KRAS+ lung cancer is one) or by an overall RNA pattern. Lung adenocarcinoma has three RNA-based subtypes: terminal respiratory unit (TRU), proximal-inflammatory (PI) and proximal-proliferative (PP).</p>` },
    { k: 'worked', html: `<p><b>Made-up numbers.</b> 100 patients: 50 with high levels of a gene and 50 with low levels. After three years 20 of the 50 high patients are alive, but 35 of the 50 low patients. High goes with worse survival. It does not prove the gene causes it: high-gene tumors may simply be more advanced.</p>` },
    { k: 'memory', html: `<p><b>Analogy:</b> a public data collection is a free community bookshelf: you take what others put there. A cohort is a class of students graded together. And tumor vs adjacent normal tissue is like comparing the bruised part of an apple with the healthy flesh right next to it: same fruit, so the difference points to the bruise.</p>` },
    { k: 'svg', caption: 'Schematic (made-up bars and curves): the three comparisons you can make with patient data.',
      svg: `<svg viewBox="0 0 480 246" role="img" aria-label="Three schematic panels: a tumor bar higher than a normal bar; survival curves where the high-expression group falls faster; and bars for three subtypes with the PI subtype highest">` +
        `<text x="80" y="18" class="mid b">Tumor vs normal</text><text x="80" y="38" class="mid s m">RNA level</text>` +
        `<path d="M24 170 H140" class="ln"/><rect x="36" y="130" width="36" height="40" class="f-green"/><rect x="88" y="70" width="36" height="100" class="f-red"/>` +
        `<text x="54" y="190" class="mid s">normal</text><text x="106" y="190" class="mid s">tumor</text>` +
        `<text x="80" y="216" class="mid s">Higher in the</text><text x="80" y="234" class="mid s">tumor?</text>` +
        `<text x="236" y="18" class="mid b">Survival</text><text x="236" y="38" class="mid s m">share of patients alive</text>` +
        `<path d="M178 50 V170 H290" class="ln thin"/>` +
        `<path d="M178 56 H205 V64 H235 V76 H265 V86 H290" class="ln thick s-blue"/><path d="M178 56 H196 V84 H220 V108 H248 V132 H290" class="ln thick s-red"/>` +
        `<text x="294" y="90" class="s t-blue">low</text><text x="294" y="136" class="s t-red">high</text>` +
        `<text x="234" y="190" class="mid s">time</text>` +
        `<text x="236" y="216" class="mid s">Do patients with high</text><text x="236" y="234" class="mid s">levels live less long?</text>` +
        `<text x="405" y="18" class="mid b">Subtypes</text><text x="405" y="38" class="mid s m">RNA level</text>` +
        `<path d="M344 170 H470" class="ln"/><rect x="348" y="140" width="30" height="30" class="f-green"/><rect x="388" y="120" width="30" height="50" class="f-orange"/><rect x="428" y="70" width="30" height="100" class="f-red"/>` +
        `<text x="363" y="190" class="mid s">TRU</text><text x="403" y="190" class="mid s">PP</text><text x="443" y="190" class="mid s">PI</text>` +
        `<text x="405" y="216" class="mid s">Higher in one</text><text x="405" y="234" class="mid s">subtype?</text></svg>` },

    { k: 'h', text: 'How this paper uses it' },
    { k: 'paper', ref: 'm-public-rnaseq-p1', quote: 'Another independent cohort of LUAD RNA-seq ex vivo data, containing 87 tumor and 77 adjacent normal tissue samples, was obtained from the TANRIC.' },
    { k: 'plain', source: ['m-public-rnaseq-p1', 'res-integration-p4'], html:
      `<p>To see whether the lncRNAs that mattered in the lab also look relevant in patients, the authors used two cohorts of lung adenocarcinoma RNA data. From TCGA they took 101 untreated, KRAS-mutated samples. From TANRIC they took an independent cohort of 87 tumors and 77 adjacent normal samples. Their logic: cancer-promoting lncRNAs are expected to be upregulated in tumors. They report that the lncRNAs that mattered in several tests are higher than the other lncRNAs in KRAS+ tumors, and higher in tumors than in adjacent tissue.</p>` },
    { k: 'panel', id: 'fig4G', html: `<p>The left pair of shapes shows non-tumor samples (n = 77) and the right pair tumor samples (n = 87). Each shape shows how the RNA levels spread across the samples.</p>` },
    { k: 'flag', source: ['m-public-rnaseq-p1', 'res-integration-p4', 'fig4G'], html: `<p>Heads-up: the paper names the comparison tissue in several ways: "adjacent normal tissue" (Methods), "adjacent tissue" (main text), "healthy tissues" and "normal" (Figure 4G legend) and "Non-tumour" (printed on the figure). The sample numbers (77) match, so they appear to be the same samples.</p>` },
    { k: 'plain', source: ['res-integration-p4', 'fig4H', 'm-cnv-p1', 'm-cnv-p3'], html:
      `<p>For DNA, the authors used PCAWG's list of regions that are recurrently amplified or deleted across cancers (extra or missing copies of DNA), and CCLE for the copy number of A549 and H460. They report that the lncRNAs that mattered tend to be amplified, but not deleted, in tumor DNA: 13 of the 80 lie in amplified regions versus 52 of 923 others (P = 0.0011); for deletions the difference is not clear (P = 0.14).</p>` },
    { k: 'paper', ref: 'res-aso-p5', quote: 'In TCGA samples, GCAWKR expression is upregulated in the proximal inflammatory (PI) tumor subtype, which is associated with poorer prognosis' },
    { k: 'plain', source: ['res-aso-p5', 'res-aso-p4'], html:
      `<p>In TCGA, GCAWKR is higher in the PI subtype, which goes with poorer prognosis (the paper compares PI with PP and with TRU). For CHiLL1 the main text says that high expression correlates with poor overall survival. Both are associations: they support, but do not prove, a role in the disease.</p>` },
    { k: 'paper', ref: 'm-data-p1', quote: 'The data discussed in this publication have been deposited in NCBI’s Gene Expression Omnibus (GEO) and are publicly available as of the date of publication at GEO: GSE207229.' },
    { k: 'plain', source: ['m-data-p1', 'm-data-p2'], html:
      `<p>Data also go the other way: the authors' own sequencing data are deposited in GEO (accession GSE207229), and the code of their ranking pipeline is in Zenodo (record 6912511), so others can check and reuse them.</p>` },
  ],
  appears: [
    { ref: 'm-public-rnaseq-p1', note: 'The TCGA cohort (101 KRAS+ samples) and the TANRIC cohort (87 tumor, 77 adjacent normal).' },
    { ref: 'res-integration-p4', note: 'Hit lncRNAs are higher in KRAS+ tumors, higher in tumors than adjacent tissue, and tend to be amplified.' },
    { ref: 'fig4H', note: 'PCAWG copy-number comparison of the lncRNAs that mattered versus all others.' },
    { ref: 'm-cnv-p1', note: 'CCLE supplies the copy number of A549 and H460.' },
    { ref: 'res-aso-p4', note: 'High CHiLL1 expression goes with poor overall survival.' },
    { ref: 'res-aso-p5', note: 'GCAWKR is higher in the PI tumor subtype, linked to poorer prognosis.' },
    { ref: 'm-data-p1', note: 'The authors\' sequencing data are in GEO.' },
    { ref: 'm-data-p2', note: 'The authors\' pipeline code is in Zenodo.' },
  ],
  checks: [
    { q: 'What was the TANRIC cohort used for in the paper?',
      options: [
        { t: 'To compare lncRNA levels in 87 tumors with 77 adjacent normal samples', ok: true, why: 'Right: the Methods describe an independent cohort of 87 tumor and 77 adjacent normal tissue samples from TANRIC, used for the tumor-versus-adjacent comparison.' },
        { t: 'To read the copy number of A549 and H460 cells', ok: false, why: 'That came from CCLE (the paper retrieved the copy number status of A549 and H460 from it).' },
        { t: 'To store the authors\' own sequencing data', ok: false, why: 'The authors\' data are in GEO; TANRIC supplied data that were downloaded, not deposited.' },
      ], source: ['m-public-rnaseq-p1', 'm-cnv-p1', 'm-data-p1'] },
    { q: 'Why is adjacent normal tissue a good comparison for a tumor?',
      options: [
        { t: 'It comes from the same organ, often the same patient, so many other differences are matched', ok: true, why: 'Right. That is what makes a tumor-versus-adjacent difference more meaningful than a comparison across unrelated people.' },
        { t: 'It is guaranteed to be perfectly healthy', ok: false, why: 'No: tissue next to a tumor is not always perfectly normal; it is only the fairest simple comparison.' },
        { t: 'It is a slower-growing kind of cancer', ok: false, why: 'Adjacent normal tissue is non-tumor tissue, not a cancer.' },
      ], bg: true },
    { q: 'The main text says high expression of CHiLL1 correlates with poor overall survival. What does that tell you?',
      options: [
        { t: 'High CHiLL1 goes with poorer outcome, which supports but does not prove that it helps drive the cancer', ok: true, why: 'Right: survival analysis shows an association; other differences between the groups could explain it.' },
        { t: 'CHiLL1 has been proven to make patients die sooner', ok: false, why: 'An association cannot prove cause. The paper uses it as supporting evidence only.' },
        { t: 'CHiLL1 plays no role in lung cancer', ok: false, why: 'The opposite: poor survival with high expression is consistent with a cancer-promoting role.' },
      ], source: ['res-aso-p4'] },
    { q: 'Where did the authors deposit their own sequencing data and their analysis code?',
      options: [
        { t: 'The data in GEO and the code in Zenodo', ok: true, why: 'Right (m-data-p1 and m-data-p2): GEO holds the data (GSE207229); Zenodo holds the pipeline code.' },
        { t: 'The data in Zenodo and the code in GEO', ok: false, why: 'Reversed. GEO is the genomics-data archive; the code is at Zenodo.' },
        { t: 'Both in TCGA', ok: false, why: 'TCGA is a collection of patient-tumor data that the authors downloaded; they did not deposit their data there.' },
      ], source: ['m-data-p1', 'm-data-p2'] },
  ],
});

/* ============================================================================================== D1 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'D1',
  defines: ['aso', 'false-positive', 'lentivirus'],
  body: [
    { k: 'h', text: 'The problem: how do you switch off one lncRNA?' },
    { k: 'bgnd', html: `<p>To learn what a lncRNA does, switch it off and watch what changes: a <b>loss-of-function (LOF)</b> experiment. With thousands of lncRNAs to test, you need a tool you can re-aim at any DNA address just by changing a short piece of text. That tool is <b>CRISPR</b>.</p>` },

    { k: 'h', text: 'CRISPR-Cas9: scissors with an address label' },
    { k: 'bgnd', html: `<p>CRISPR began as a bacterial defense against invaders such as viruses (tiny parasites that take over cells). Scientists turned it into an editing tool with two parts. <b>Cas9</b> is the scissors: an enzyme that cuts both strands of DNA. The <b>guide RNA</b> (gRNA, or sgRNA) is the address label: a short RNA whose roughly 20 letters match one place in the genome by complementary base pairing. Cas9 follows the guide, finds the matching DNA and cuts there. Change the guide's letters and the cut moves.</p>` +
      `<p>The cell then repairs the cut, and the repair is often a little sloppy. For a protein-coding gene, one cut inside the reading frame (ORF) can scramble the recipe and leave a <b>knockout (KO)</b>: a gene permanently disabled in the DNA. A lncRNA has no recipe to scramble, so the small errors from one cut usually do not silence it.</p>` },

    { k: 'h', text: 'Two cuts, one deletion: CRISPR-del, pgRNA and DECKO' },
    { k: 'bgnd', html: `<p>The answer is to delete a piece that the lncRNA cannot work without. In <b>CRISPR-del</b> (CRISPR deletion), two guides make two cuts on either side of a region; the cell joins the outer ends and the piece in between is lost. The two guides together are a <b>paired guide RNA (pgRNA)</b>. <b>DECKO</b> (dual-excision CRISPR knockout) is a ready-made design that delivers both guides of a pair into the same cell, made for noncoding targets such as lncRNAs.</p>` +
      `<p>A common choice is to delete the region around the <b>TSS</b>: without its start site, the gene cannot be copied into RNA. Why not the whole gene? Shorter deletions are generally more efficient (both cuts must happen and the ends must rejoin), and a smaller deletion is less likely to remove other DNA regulatory elements that overlap the gene.</p>` },
    { k: 'memory', html: `<p><b>Analogy:</b> cutting a paragraph out of a recipe with two snips and taping the page back together. If the paragraph was the "Step 1: start here" line, the recipe cannot be followed. Likewise, a gene without its TSS cannot be started.</p>` },
    { k: 'svg', caption: 'Paired guides: two Cas9 cuts at the edges of the TSS region; the cell joins the ends and the middle piece is lost.',
      svg: `<svg viewBox="0 0 480 300" role="img" aria-label="Two guide RNAs lead two Cas9 enzymes to the two edges of the TSS region on the DNA; the cell joins the cut ends, the TSS region is lost, and the gene can no longer be copied into RNA">` +
        `<text x="240" y="16" class="mid b">Two guides, two cuts, one deletion</text>` +
        `<text x="10" y="106" class="s m b">before</text>` +
        `<ellipse cx="170" cy="46" rx="26" ry="18" class="f-purple"/><text x="170" y="51" class="mid s">Cas9</text>` +
        `<ellipse cx="280" cy="46" rx="26" ry="18" class="f-purple"/><text x="280" y="51" class="mid s">Cas9</text>` +
        `<path d="M170 64 V104" class="ln thick s-teal"/><path d="M280 64 V104" class="ln thick s-teal"/>` +
        `<text x="160" y="86" class="s t-teal end">guide 1</text><text x="290" y="86" class="s t-teal">guide 2</text>` +
        `<path d="M10 124 H170 M280 124 H290 M460 124 H470" class="ln thick s-blue"/>` +
        `<rect x="170" y="110" width="110" height="28" class="f-red"/><text x="225" y="129" class="mid s b">TSS region</text>` +
        `<rect x="290" y="110" width="170" height="28" rx="6" class="f-orange"/><text x="375" y="129" class="mid b">lncRNA gene</text>` +
        `<path d="M170 100 V148" class="ln thick s-red"/><path d="M280 100 V148" class="ln thick s-red"/>` +
        `<path d="M225 154 V196" class="arrow"/><text x="240" y="180" class="s">cell joins the ends</text>` +
        `<rect x="372" y="160" width="88" height="26" rx="6" class="f-red"/><text x="416" y="178" class="mid s">lost piece</text>` +
        `<text x="10" y="208" class="s m b">after</text>` +
        `<path d="M10 226 H170 M340 226 H470" class="ln thick s-blue"/>` +
        `<rect x="170" y="212" width="170" height="28" rx="6" class="f-gray"/><text x="255" y="231" class="mid s b">gene without its TSS</text>` +
        `<path d="M170 204 V250" class="ln dash m"/>` +
        `<text x="240" y="282" class="mid b">No TSS left: the gene is not copied into RNA</text></svg>` },

    { k: 'h', text: 'Not every guide works, and some hit the wrong place' },
    { k: 'bgnd', html: `<p>Guides differ in how well they cut. A <b>guide efficiency score</b> (Rule Set 2 is a well-known one) predicts, from a guide's letters, how well it will work. For a deletion both cuts must happen, so the real <b>deletion efficiency</b> is lower than for a single cut and harder to predict.</p>` +
      `<p>Another problem is the <b>off-target effect</b>: a guide that resembles a second DNA place may cut there too, or a deletion may damage something it was not meant to touch. Defenses: careful guide design with software filters, several independent guide pairs per target, and a second, independent method to confirm a result (such as ASOs, short strands that silence an RNA directly, taught later).</p>` },

    { k: 'h', text: 'Other CRISPR tools: CRISPRi and Cas13' },
    { k: 'bgnd', html: `<p><b>CRISPRi</b> (CRISPR interference) uses a "dead" Cas9 that cannot cut. A guide parks it on a gene's start site, where it blocks copying; the DNA stays unchanged and the effect is reversible. <b>Cas13</b> is a different enzyme that cuts RNA instead of DNA: a guide RNA leads it to a matching RNA, which it cuts. Tools that act on a DNA region (CRISPR-del, CRISPRi) can also disturb other DNA elements in that region; Cas13 acts on the RNA and avoids this.</p>` },
    { k: 'svg', caption: 'Three ways to switch off a lncRNA. This paper uses the first; the other two appear only in comparisons.',
      svg: `<svg viewBox="0 0 480 346" role="img" aria-label="Three ways to switch off a lncRNA: CRISPR-del cuts the DNA twice and removes the TSS region; CRISPRi parks a dead Cas9 on the start site without cutting; Cas13 cuts the RNA itself">` +
        `<text x="6" y="20" class="b">1 · CRISPR-del: two cuts remove the TSS region</text>` +
        `<path d="M10 64 H170 M250 64 H260 M460 64 H470" class="ln thick s-blue"/>` +
        `<rect x="170" y="50" width="80" height="28" class="f-red"/><text x="210" y="69" class="mid s">TSS region</text>` +
        `<rect x="260" y="50" width="200" height="28" rx="6" class="f-orange"/><text x="360" y="69" class="mid b">gene</text>` +
        `<path d="M170 40 V88" class="ln thick s-red"/><path d="M250 40 V88" class="ln thick s-red"/>` +
        `<text x="6" y="108" class="s m">The DNA is cut and changed for good.</text>` +
        `<text x="6" y="140" class="b">2 · CRISPRi: a "dead" Cas9 blocks the start</text>` +
        `<path d="M10 196 H170 M250 196 H260 M460 196 H470" class="ln thick s-blue"/>` +
        `<rect x="170" y="182" width="80" height="28" class="f-gray"/>` +
        `<rect x="260" y="182" width="200" height="28" rx="6" class="f-orange"/><text x="360" y="201" class="mid b">gene</text>` +
        `<ellipse cx="210" cy="170" rx="42" ry="18" class="f-purple"/><text x="210" y="175" class="mid s">dead Cas9</text>` +
        `<text x="6" y="232" class="s m">No cut: the DNA is unchanged, copying is blocked.</text>` +
        `<text x="6" y="264" class="b">3 · Cas13: cut the RNA instead of the DNA</text>` +
        `<path d="M110 312 C130 296 150 328 170 312 S210 296 230 312 S270 328 290 312 S330 296 350 312 S390 328 410 312" class="ln thick s-orange"/>` +
        `<text x="90" y="316" class="s end t-orange b">RNA</text>` +
        `<ellipse cx="270" cy="288" rx="34" ry="16" class="f-purple"/><text x="270" y="293" class="mid s">Cas13</text>` +
        `<path d="M270 304 V324" class="ln thick s-red"/>` +
        `<text x="6" y="342" class="s m">The RNA is cut; the DNA is not touched.</text></svg>` },

    { k: 'h', text: 'How this paper uses it' },
    { k: 'paper', ref: 'res-pipeline-p1', quote: 'This approach achieves loss-of-function (LOF) perturbations by deleting target genes’ transcription start sites (TSS) via paired guide RNAs (pgRNAs) and effectively inhibits gene expression.' },
    { k: 'plain', source: ['res-pipeline-p1'], html:
      `<p>To find lncRNAs that promote KRAS+ NSCLC, the authors adapted the DECKO CRISPR-del system to a format that tests thousands of targets together. They switch each lncRNA off by deleting its TSS with a pgRNA.</p>` },
    { k: 'paper', ref: 'res-pipeline-p1', quote: 'This perturbation strategy based on the deletion of TSSs rather than entire genes offers several benefits, including uniform and shorter deletions (which are more efficient) and a reduced chance of false positives arising from deleting overlapping DNA regulatory elements.' },
    { k: 'plain', source: ['res-pipeline-p1'], html:
      `<p>Why the TSS and not the whole gene? The deletions are uniform and shorter (more efficient), and there is a smaller chance of <b>false positives</b> (results that look real but are not) from deleting overlapping DNA regulatory elements.</p>` },
    { k: 'panel', id: 'fig1E', html: `<p>Top: the gene map of the lncRNA DNMBP-AS1. The black part of the green bar is the TSS target region. Each thin red line is one pgRNA: as drawn, it runs from the cut site of one guide to the other, so the DNA between them is cut out. This target has ten pgRNAs.</p>` },
    { k: 'paper', ref: 'res-pipeline-p5', quote: 'We observed expected deletion at the target site for 10/12 cases. In terms of impact on target RNA levels, we observed expected downregulations for 7/12' },
    { k: 'plain', source: ['res-pipeline-p5', 'res-pipeline-p4'], html:
      `<p>Does it work? For the known lncRNA DNMBP-AS1, the pgRNAs deleted its promoter region and its expression was lost. In a broader test of 12 pgRNAs aimed at 12 different lncRNA targets, the expected deletion appeared in 10 of 12 cases. The target RNA went down in 7 of 12, did not change in three and went up in two. So the method often works, but not always. A sensible reading: this is why each target gets 10 different pgRNAs.</p>` },
    { k: 'plain', source: ['res-multipheno-p5'], html:
      `<p>What makes a pgRNA delete well is poorly understood. Using growth effect as a stand-in for deletion efficiency, the authors saw the expected link with the predicted sgRNA efficiency (the RuleSet2 score), no link with pgRNA orientation, and only a weak tendency for larger deletions to give stronger effects.</p>` },
    { k: 'flag', source: ['res-pipeline-p2', 'm-library-design-p4'], html:
      `<p>Heads-up: the paper uses "off targeting" in two senses. The main text leaves out target regions closer than 2 kb to a protein-coding exon, to avoid false results from "unintended off targeting" (presumably because a deletion that close could disturb that gene instead). The Methods' "off-targeting filters" of the guide-design software are about guides that match unintended DNA places.</p>` },
    { k: 'paper', ref: 'limitations-p1', quote: 'One important caveat of CRISPR-del, in common with CRISPRi, is the risk of false-positive hits arising from unintentional targeting of overlapping cis- or trans-acting elements, such as DNA regulatory regions or opposite-strand lncRNA genes.' },
    { k: 'plain', source: ['limitations-p1'], html:
      `<p>Both tools act on a DNA region, so both can mislead if it also holds other regulatory DNA or an opposite-strand lncRNA gene. ASO validation can resolve this: 8 of 12 (67%) lncRNAs were validated that way, suggesting that around one-third of the lncRNAs found in the big experiments may act through DNA-dependent mechanisms.</p>` },
    { k: 'paper', ref: 'limitations-p2', quote: 'This may be overcome in the future by employing complementary direct RNA-targeting CRISPR perturbations, such as Cas13.' },
    { k: 'plain', source: ['limitations-p2'], html:
      `<p>The authors add that CRISPR-del is relatively inefficient compared with mutating a protein-coding gene's reading frame, and that known lncRNAs such as MALAT1 and MIAT were missed (reason unclear). They suggest direct RNA-targeting tools such as Cas13 as a future complement.</p>` },
  ],
  appears: [
    { ref: 'res-pipeline-p1', note: 'DECKO CRISPR-del, LOF by deleting the TSS with pgRNAs, and the two benefits of deleting only the TSS.' },
    { ref: 'res-pipeline-p2', note: 'Target regions closer than 2 kb to a protein-coding exon were left out to avoid unintended off targeting.' },
    { ref: 'res-pipeline-p5', note: 'Validation: the DNMBP-AS1 deletion, 10/12 expected deletions, 7/12 expected RNA decreases.' },
    { ref: 'res-multipheno-p5', note: 'RuleSet2 predicted guide efficiency versus observed effects; no link with pgRNA orientation.' },
    { ref: 'limitations-p1', note: 'The caveat shared by CRISPR-del and CRISPRi, and how ASO validation addresses it.' },
    { ref: 'limitations-p2', note: 'CRISPR-del is relatively inefficient; Cas13 is suggested as a complement.' },
    { ref: 'fig1E', note: 'The TSS target region and the ten pgRNAs drawn on the DNMBP-AS1 gene map.' },
  ],
  checks: [
    { q: 'What does the guide RNA do in CRISPR-Cas9?',
      options: [
        { t: 'It matches one DNA address and steers Cas9 there; Cas9 does the cutting', ok: true, why: 'Right: the guide is the address label and Cas9 is the scissors.' },
        { t: 'It cuts the DNA itself', ok: false, why: 'The cutting is done by the Cas9 enzyme. The guide only supplies the address.' },
        { t: 'It repairs the cut afterwards', ok: false, why: 'Repair is done by the cell\'s own machinery, often imperfectly, which is why cuts can disable genes.' },
      ], bg: true },
    { q: 'Why does the paper use a PAIR of guides to delete the TSS region, instead of one guide?',
      options: [
        { t: 'Two cuts on either side of the region let the piece between them be removed, while one cut mostly causes tiny errors that rarely silence a lncRNA', ok: true, why: 'Right: the paper deletes TSSs "via paired guide RNAs"; a lncRNA has no reading frame for a single cut to scramble.' },
        { t: 'One guide cannot find its DNA address, so a second one is needed to help it', ok: false, why: 'A single guide finds its address fine. The second guide marks the other end of the piece to remove.' },
        { t: 'Two guides double the amount of Cas9 in the cell', ok: false, why: 'Guides do not change the amount of Cas9; they only give it two addresses.' },
      ], source: ['res-pipeline-p1'] },
    { q: 'Which benefit of deleting only the TSS rather than the whole gene does the paper give?',
      options: [
        { t: 'The deletions are uniform and shorter (more efficient) and less likely to remove overlapping DNA regulatory elements', ok: true, why: 'Right: these are the two benefits listed in the paper.' },
        { t: 'It guarantees that no off-target effects can happen', ok: false, why: 'Nothing guarantees that: the paper still lists false leads from overlapping DNA elements as a caveat of CRISPR-del.' },
        { t: 'It leaves the lncRNA intact so it can still be measured', ok: false, why: 'The aim is the opposite: removing the TSS stops the lncRNA from being expressed.' },
      ], source: ['res-pipeline-p1', 'limitations-p1'] },
    { q: 'According to the paper, which caveat do CRISPR-del and CRISPRi share?',
      options: [
        { t: 'Both act on a DNA region, so they can disturb overlapping regulatory DNA or an opposite-strand lncRNA gene and give false-positive results', ok: true, why: 'Right (limitations-p1): this is why the authors validated lncRNAs with ASOs, which act on the RNA.' },
        { t: 'Both destroy the RNA directly and therefore miss effects at the DNA level', ok: false, why: 'This describes RNA-targeting tools such as Cas13. CRISPR-del and CRISPRi act on DNA.' },
        { t: 'Both need an immunodeficient mouse to work', ok: false, why: 'Both work in cells in a dish; mice are unrelated to this caveat.' },
      ], source: ['limitations-p1'] },
  ],
});
