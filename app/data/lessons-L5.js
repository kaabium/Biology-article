/* lessons-L5.js — lessons D2, D3, D4, D5 (filled by one content author, scope L5). */

/* ============================================================================================== D2 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'D2',
  body: [
    { k: 'h', text: 'The problem: getting the guides into the cells' },
    { k: 'bgnd', html: `<p>CRISPR only works if the scissors (<b>Cas9</b>) and the <b>guide RNAs</b> are <i>inside</i> the cells, and cancer cells in a dish will not simply swallow them. The paper needs the guides to reach thousands of cells at once, <b>one guide pair per cell</b>, and to stay for weeks while the cells divide. How?</p>` },

    { k: 'h', text: 'Plasmids, transfection and transduction' },
    { k: 'bgnd', html: `<p>A <b>plasmid</b> is a small ring of DNA used as a carrier: you design it on a computer, order it, and copy it in bacteria. It can hold Cas9, guide sequences, a drug-resistance gene or a gene for a glowing protein.</p>` +
      `<p><b>Transfection</b> pushes plasmid DNA into cells with chemicals (for example Lipofectamine, tiny fat bubbles that fuse with the cell). It is quick, but the plasmid stays separate from the chromosomes and is diluted away as cells divide, so the effect is temporary.</p>` +
      `<p><b>Transduction</b> uses a virus as the delivery truck. A <b>lentivirus</b> inserts its DNA into the cell's <i>own chromosomes</i>, so every daughter cell inherits it, which is what weeks-long experiments need. Lab versions are stripped down so they cannot make new viruses (the paper often says "infected" for transduced). To make the virus, <b>HEK293T</b> cells act as a factory: you transfect them with the cargo plasmid plus helper plasmids, and they release virus particles into the medium.</p>` },
    { k: 'plain', source: ['m-lentivirus-p1'], html: `<p>The authors made their virus in HEK293T cells, transfected (with Lipofectamine2000) with a Cas9 plasmid that also carries blasticidin resistance plus two helper plasmids, psPAX2 and pVsVg. The virus-containing liquid was collected 24, 48 and 72 hours later and concentrated 100-fold.</p>` },
    { k: 'svg', caption: 'From plasmids to a modified cell: HEK293T cells build the virus, the virus inserts its cargo into a target cell, and a drug removes cells without the resistance gene.',
      svg: `<svg viewBox="0 0 480 262" role="img" aria-label="Delivery path: HEK293T cells make lentivirus particles from plasmids; the virus inserts its cargo DNA into a target cell's chromosome; a drug then kills the cells without the resistance gene">` +
        `<rect x="6" y="28" width="140" height="124" rx="12" class="f-blue"/>` +
        `<text x="76" y="50" class="mid b">HEK293T cells</text><text x="76" y="68" class="mid s m">virus factory</text>` +
        `<circle cx="38" cy="100" r="11" class="f-orange"/><circle cx="76" cy="100" r="11" class="f-gray"/><circle cx="114" cy="100" r="11" class="f-gray"/>` +
        `<text x="76" y="136" class="mid s">cargo + helper plasmids</text>` +
        `<path d="M150 90 H188" class="arrow"/>` +
        `<rect x="192" y="28" width="112" height="124" rx="12" class="f-purple"/>` +
        `<text x="248" y="50" class="mid b">Lentivirus</text><text x="248" y="68" class="mid s m">particles</text>` +
        `<circle cx="222" cy="94" r="13" class="f-purple"/><circle cx="222" cy="94" r="4" class="solid-orange"/>` +
        `<circle cx="274" cy="94" r="13" class="f-purple"/><circle cx="274" cy="94" r="4" class="solid-orange"/>` +
        `<circle cx="248" cy="116" r="13" class="f-purple"/><circle cx="248" cy="116" r="4" class="solid-orange"/>` +
        `<text x="248" y="146" class="mid s">+ polybrene</text>` +
        `<path d="M308 90 H340" class="arrow"/>` +
        `<ellipse cx="412" cy="90" rx="64" ry="58" class="f-gray"/><ellipse cx="412" cy="90" rx="40" ry="34" class="f-blue"/>` +
        `<path d="M382 90 H442" class="ln thick s-blue"/><rect x="404" y="81" width="16" height="18" rx="3" class="f-orange"/>` +
        `<text x="412" y="20" class="mid b">Target cell</text>` +
        `<text x="412" y="170" class="mid s">cargo DNA joins</text><text x="412" y="187" class="mid s">a chromosome</text>` +
        `<text x="6" y="214" class="b">Then add the drug:</text>` +
        `<circle cx="30" cy="240" r="12" class="f-green"/><text x="50" y="245" class="s">has the resistance gene: lives</text>` +
        `<circle cx="268" cy="240" r="12" class="f-gray"/><text x="288" y="245" class="s">no gene: dies</text></svg>` },

    { k: 'h', text: 'Titer and MOI: how many viruses per cell?' },
    { k: 'bgnd', html: `<p>Each virus batch has a different strength, its <b>viral titer</b> (infectious particles per volume), so you test a range of volumes: a "titration". The key number is the <b>multiplicity of infection (MOI)</b>: the <i>average number of virus particles per cell</i>. Viruses land on cells at random, like raindrops on paving stones, so some cells get none, some one and some several.</p>` +
      `<p><b>Why a low MOI such as 0.3?</b> Each virus carries <i>one</i> guide pair. A cell with two viruses has two pairs, and you could not tell which caused its behavior. At MOI 0.3 the raindrop maths gives about 74 of 100 cells no virus, 22 exactly one and only about 4 two or more: roughly 86 of every 100 <i>infected</i> cells carry a single guide pair. The price: most cells stay uninfected, so you must remove them and start with many cells.</p>` },
    { k: 'svg', caption: 'How viruses are shared out among cells if they land at random ("Poisson" maths, computed for this lesson, not data from the paper).',
      svg: `<svg viewBox="0 0 480 222" role="img" aria-label="Two stacked bars showing how viruses are shared among cells: at MOI 0.3 about 74% of cells get no virus, 22% exactly one and 4% two or more; at MOI 1 about 37% get none, 37% one and 26% two or more">` +
        `<text x="6" y="22" class="b">How viruses are shared out among cells</text>` +
        `<text x="6" y="66" class="b">MOI 0.3</text>` +
        `<rect x="84" y="44" width="289" height="34" class="f-gray"/><rect x="373" y="44" width="87" height="34" class="f-green"/><rect x="460" y="44" width="14" height="34" class="f-orange"/>` +
        `<text x="228" y="66" class="mid">74%</text><text x="416" y="66" class="mid b">22%</text><text x="467" y="38" class="mid s">4%</text>` +
        `<text x="6" y="136" class="b">MOI 1</text>` +
        `<rect x="84" y="114" width="144" height="34" class="f-gray"/><rect x="228" y="114" width="143" height="34" class="f-green"/><rect x="371" y="114" width="103" height="34" class="f-orange"/>` +
        `<text x="156" y="136" class="mid">37%</text><text x="299" y="136" class="mid">37%</text><text x="422" y="136" class="mid">26%</text>` +
        `<rect x="6" y="170" width="14" height="14" class="f-gray"/><text x="26" y="182" class="s">no virus</text>` +
        `<rect x="110" y="170" width="14" height="14" class="f-green"/><text x="130" y="182" class="s">exactly one</text>` +
        `<rect x="240" y="170" width="14" height="14" class="f-orange"/><text x="260" y="182" class="s">two or more</text>` +
        `<text x="6" y="210" class="s m">At MOI 0.3, about 86% of the infected cells have exactly one virus.</text></svg>` },
    { k: 'paper', ref: 'm-titer-p1', quote: 'After 72 h, the MOI was calculated by dividing the number of surviving cells in the puromycin well, by the number in the puromycin-free well. The MOI of 0.3 was used for all screening experiments.' },
    { k: 'plain', source: ['m-titer-p1'], html: `<p>The authors tested 2.5 to 50 µL of virus on A549 and H460 cells (with 8 µg/mL polybrene), aiming for an MOI of 0.3–0.4. Next day each well was split and one half got puromycin (2 µg/mL); after 72 hours, survivors with puromycin ÷ cells without gave the MOI. They used <b>MOI 0.3</b> for all the main experiments. For the full-scale infection they used 120M cells (2M per well in 12-well plates), pooled them, and kept puromycin on for six days before the phenotype experiments began.</p>` },
    { k: 'flag', source: ['m-titer-p1'], derived: ['30', '0.36'], html: `<p><b>Heads-up.</b> The ratio the paper calls "MOI" is really the <i>fraction of cells infected</i>, about 30% here. By the raindrop maths that equals about 0.36 viruses per cell (my calculation). The message is the same: most cells get no virus and nearly all the rest get one. The paper does not say why 0.3 was chosen; the logic above is the standard one.</p>` },

    { k: 'h', text: 'Selection, polybrene, stable lines and glowing markers' },
    { k: 'bgnd', html: `<p>With a low MOI most cells get nothing, so you remove them by <b>antibiotic selection</b>: the plasmid carries a <i>resistance gene</i> for a drug, and cells without it die when the drug is added. <b>Puromycin</b> and <b>blasticidin</b> are two such drugs; both stop protein production, which kills normal cells. Each needs its own resistance gene, so one drug per plasmid lets you select for each plasmid separately. <b>Polybrene</b> is a helper chemical: cells and viruses both carry a negative charge and repel each other, and polybrene (positive) reduces that repulsion.</p>` +
      `<p>A <b>stable cell line</b> carries a new gene permanently in its own DNA, so all descendants have it. The usual plan: first make cells that stably carry Cas9, then deliver the guides with a second virus.</p>` +
      `<p><b>Fluorescent proteins</b> glow under the right light: <b>GFP</b> green, <b>mCherry</b> red, <b>BFP</b> blue. Put one on a plasmid and every cell that has it becomes a visible, measurable tagged cell.</p>` },
    { k: 'memory', html: `<p><b>Analogy:</b> a wristband party. The virus hands out wristbands (guide pairs) at random; at MOI 0.3 most guests get none and nearly everyone who gets one gets <i>exactly</i> one. The bouncer (the antibiotic) removes guests without a wristband; glowing wristbands (a fluorescent protein) show who is in. Where it breaks down: a lentivirus "wristband" is copied into every daughter cell.</p>` },

    { k: 'h', text: 'How this paper uses it' },
    { k: 'paper', ref: 'm-lentivirus-p2', quote: 'A549 and H460 were incubated for 24 h with a culture medium containing concentrated viral preparation carrying pLentiCas9-T2A-BFP … Infected cells were selected for at least five days with blasticidin' },
    { k: 'plain', source: ['m-lentivirus-p2', 'res-pipeline-p5', 'fig1D'], html: `<p>To give A549 and H460 cells Cas9 permanently, the authors exposed them to a lentivirus for 24 hours (with 8 µg/mL polybrene). The plasmid, pLentiCas9-T2A-BFP, carries Cas9 and the blue marker BFP, so blue cells are Cas9 cells. After at least five days in blasticidin (8 µg/mL), a cell-picking machine (next lessons) selected blue cells twice, until at least 60% were BFP-positive. The result: non-clonal cell lines (a mixed population, not grown from one single cell) that stably make high levels of Cas9.</p>` },
    { k: 'plain', source: ['m-decko-p3', 'm-titer-p1', 'm-library-cloning-p2', 'm-competition-p1'], html: `<p>The guide pairs travel on a second plasmid (the backbone is called pDECKO_mCherry, so guide cells glow red). Cells that received the guide virus were selected with puromycin (2 µg/mL) for at least three days (six days in the full-scale experiment). GFP appears later, in a head-to-head mixing test where control cells glow green and test cells glow red (lesson D7).</p>` },
  ],
  appears: [
    { ref: 'm-titer-p1', note: 'The titration, the puromycin-ratio way of measuring MOI, MOI 0.3 for every screen, and 120M cells for the full-scale infection.' },
    { ref: 'm-lentivirus-p1', note: 'Virus production in HEK293T cells (Cas9 plasmid with blasticidin resistance plus helper plasmids).' },
    { ref: 'm-lentivirus-p2', note: 'Stable Cas9-BFP cell lines: polybrene, blasticidin selection, then picking blue cells.' },
    { ref: 'm-decko-p3', note: 'Puromycin selection of cells infected with the guide virus.' },
    { ref: 'fig1A', note: 'Workflow: lentiviral pool, transduction at MOI 0.3, puromycin, harvest.' },
  ],
  checks: [
    { q: 'The experiment follows cells for weeks while they divide many times. Why is a lentivirus a better delivery method than transfecting a plasmid?',
      options: [
        { t: 'Its DNA is inserted into the cell\'s own chromosomes, so every daughter cell inherits it', ok: true, why: 'Right. A transfected plasmid usually stays separate from the chromosomes and is diluted away as cells divide; integrated lentivirus DNA is copied along with the cell\'s own DNA.' },
        { t: 'Transfection cannot get DNA into cells at all', ok: false, why: 'It can; it just gives a temporary result, because the plasmid is usually lost over successive divisions.' },
        { t: 'The virus makes Cas9 cut more accurately', ok: false, why: 'The delivery method does not change how accurately Cas9 cuts; that depends on the guide design.' },
        { t: 'The virus carries the antibiotic that removes uninfected cells', ok: false, why: 'The antibiotic is added by the scientist. What the virus carries is the <i>resistance gene</i> to it.' },
      ], bg: true },
    { q: 'The authors used an MOI of 0.3 for all their main experiments. What is the main reason for such a low MOI?',
      options: [
        { t: 'Most infected cells then receive just one virus, so each carries a single guide pair', ok: true, why: 'Right. At a low MOI the chance of two viruses in one cell is small, so each infected cell has one guide pair and its behavior can be tied to that pair. (The paper does not spell this out; it is the standard logic.)' },
        { t: 'So that every cell in the dish is infected', ok: false, why: 'The opposite: at 0.3 most cells get no virus at all, and puromycin then removes them.' },
        { t: 'Because puromycin only works when the MOI is below 1', ok: false, why: 'Puromycin kills any cell without the resistance gene, whatever the MOI. The low MOI is about how many viruses each cell gets.' },
        { t: 'Because a higher MOI would make the virus kill the cells', ok: false, why: 'Lab lentiviruses are not designed to kill; a higher MOI mainly puts several guide pairs into one cell.' },
      ], source: ['m-titer-p1'] },
    { q: 'How did the authors work out the MOI of a virus batch?',
      options: [
        { t: 'They split infected cells in two, gave puromycin to one half, and divided the survivors by the cells in the untreated half', ok: true, why: 'Right: after 72 h, the number of surviving cells in the puromycin well was divided by the number in the puromycin-free well.' },
        { t: 'They counted the virus particles under a microscope', ok: false, why: 'The paper does not do this; it used a drug-survival ratio.' },
        { t: 'They counted how many cells glowed blue (BFP)', ok: false, why: 'BFP marks the Cas9 cells in this paper; it was not used to measure the MOI.' },
        { t: 'They divided the volume of virus added by the number of cells', ok: false, why: 'A volume per cell is not an MOI. The paper inferred the infected fraction from how many cells survived the drug.' },
      ], source: ['m-titer-p1'] },
    { q: 'Why did the authors use blasticidin for one set of cells and puromycin for another?',
      options: [
        { t: 'Each drug selects for the resistance gene on a different plasmid: blasticidin for the Cas9 plasmid, puromycin for the guide plasmid', ok: true, why: 'Right. The Cas9 plasmid carries blasticidin resistance (the Cas9 cells were selected with blasticidin), and cells infected with the guide virus were selected with puromycin.' },
        { t: 'Blasticidin kills cancer cells and puromycin kills normal cells', ok: false, why: 'Neither drug tells cell types apart; both kill any cell that lacks the matching resistance gene.' },
        { t: 'Puromycin is needed to make the virus in HEK293T cells', ok: false, why: 'The virus was made by transfecting HEK293T cells; puromycin was used afterward to select infected target cells.' },
        { t: 'One drug alone would not kill all the uninfected cells', ok: false, why: 'The paper gives no such reason. The two drugs serve two different plasmids at two different stages.' },
      ], source: ['m-lentivirus-p1', 'm-lentivirus-p2', 'm-decko-p3'] },
  ],
});
