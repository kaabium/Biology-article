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
        `<circle cx="38" cy="96" r="11" class="f-orange"/><circle cx="76" cy="96" r="11" class="f-gray"/><circle cx="114" cy="96" r="11" class="f-gray"/>` +
        `<text x="76" y="126" class="mid s">cargo plasmid</text><text x="76" y="142" class="mid s">+ helper plasmids</text>` +
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

/* ============================================================================================== D3 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'D3',
  defines: ['fsc-a'],
  body: [
    { k: 'h', text: 'Seeing and sorting cells by color' },
    { k: 'bgnd', html: `<p>Lesson D2 gave you cells that glow. <b>Flow cytometry</b> reads that glow: cells in liquid pass single file through a laser, and detectors record, for each cell, how much light it scatters (roughly its size, called <b>FSC-A</b> or forward scatter) and how brightly it shines in each color. Thousands of cells pass per second, and the result is a plot where <i>each dot is one cell</i>.</p>` +
      `<p><b>FACS</b> (fluorescence-activated cell sorting) is a flow cytometer that can also <i>collect</i> cells: it steers the ones you want into a tube. To say which ones, you draw a <b>gate</b>, a box around one cloud of dots; only cells inside it are counted or collected. <b>FlowJo</b> is a program for drawing gates and reading off percentages.</p>` },
    { k: 'panel', id: 'fig1D', html: `<p>Each dot is one A549 cell carrying Cas9 and BFP. The vertical axis is FSC-A; the horizontal axis is the blue channel ("Pacific Blue") where BFP is read. The black box is the gate: it holds 75.7% of the cells, the strongly blue ones used in the screens. The paper names FlowJo as its analysis program (for example for the green/red mixing test of lesson D7).</p>` },

    { k: 'h', text: 'Screens: pooled or arrayed' },
    { k: 'bgnd', html: `<p>A <b>screen</b> tests many targets at once to find the ones that matter for a trait; the targets that stand out are <b>hits</b>. Every target on the list is a <b>candidate</b> (the paper numbers them: "candidate 205").</p>` +
      `<p>In an <b>arrayed screen</b> each target gets its own well on a plate. You always know which well is which and can measure almost anything, but you need thousands of wells, robots and custom reagents. In a <b>pooled screen</b> the whole mixture of guides goes into <i>one</i> dish: each cell receives one guide pair (the point of MOI 0.3), all the cells grow together, and afterwards you count the guides to see which cells did better or worse. The guide works as a barcode for its cell.</p>` },
    { k: 'svg', caption: 'Arrayed: one target per well. Pooled: every target in one dish, told apart afterwards by its guide.',
      svg: `<svg viewBox="0 0 480 236" role="img" aria-label="Left: a plate where each well holds a different colored target. Right: one dish in which cells with many different guides are mixed together">` +
        `<text x="117" y="22" class="mid b">Arrayed</text><text x="363" y="22" class="mid b">Pooled</text>` +
        `<rect x="6" y="34" width="222" height="150" rx="12" class="f-gray"/><rect x="252" y="34" width="222" height="150" rx="12" class="f-gray"/>` +
        `<circle cx="36" cy="66" r="14" class="f-blue"/><circle cx="78" cy="66" r="14" class="f-green"/><circle cx="120" cy="66" r="14" class="f-orange"/><circle cx="162" cy="66" r="14" class="f-purple"/><circle cx="204" cy="66" r="14" class="f-red"/>` +
        `<circle cx="36" cy="104" r="14" class="f-orange"/><circle cx="78" cy="104" r="14" class="f-purple"/><circle cx="120" cy="104" r="14" class="f-red"/><circle cx="162" cy="104" r="14" class="f-teal"/><circle cx="204" cy="104" r="14" class="f-yellow"/>` +
        `<circle cx="36" cy="142" r="14" class="f-red"/><circle cx="78" cy="142" r="14" class="f-teal"/><circle cx="120" cy="142" r="14" class="f-yellow"/><circle cx="162" cy="142" r="14" class="f-blue"/><circle cx="204" cy="142" r="14" class="f-green"/>` +
        `<circle cx="363" cy="109" r="62" class="f-none"/>` +
        `<circle cx="336" cy="86" r="6" class="solid-blue"/><circle cx="362" cy="76" r="6" class="solid-green"/><circle cx="390" cy="88" r="6" class="solid-orange"/><circle cx="346" cy="108" r="6" class="solid-purple"/>` +
        `<circle cx="372" cy="104" r="6" class="solid-red"/><circle cx="400" cy="116" r="6" class="solid-teal"/><circle cx="332" cy="130" r="6" class="solid-yellow"/><circle cx="358" cy="128" r="6" class="solid-blue"/>` +
        `<circle cx="386" cy="134" r="6" class="solid-green"/><circle cx="344" cy="150" r="6" class="solid-orange"/><circle cx="372" cy="152" r="6" class="solid-purple"/><circle cx="378" cy="124" r="6" class="solid-red"/>` +
        `<text x="117" y="206" class="mid s">one target per well</text><text x="117" y="223" class="mid s">easy to track, costly at scale</text>` +
        `<text x="363" y="206" class="mid s">all targets in one dish</text><text x="363" y="223" class="mid s">guides counted afterwards</text></svg>` },
    { k: 'paper', ref: 'discussion-p2', quote: 'Pooled CRISPR screening is emerging as a powerful tool for target discovery in RNATX thanks to its practicality and versatility.' },
    { k: 'plain', source: ['discussion-p2'], html: `<p>The authors argue that arrayed screening would need a custom reagent set for every cell model, which would be prohibitively expensive and could not keep up with changing lncRNA annotations. A pooled CRISPR library is practical, versatile and can be rebuilt quickly.</p>` },

    { k: 'h', text: 'The library: libDECKO-NSCLC1' },
    { k: 'bgnd', html: `<p>A <b>CRISPR library</b> is the mixture of guide constructs used in a pooled screen. Its <b>depth</b> is the number of guides per target: single guides differ in how well they work, so you aim several at each target. Building a library has two steps. Software (here <b>CRISPETa</b>) designs the guide pairs and filters out those likely to cut elsewhere. Then the DNA pieces are inserted into the plasmid backbone, called <b>cloning</b>, and bacteria copy the plasmids so you have plenty of every one.</p>` },
    { k: 'paper', ref: 'res-pipeline-p4', quote: 'a CRISPR-del library with a depth of 10 unique pgRNAs per target, comprising altogether 12,000 pgRNAs' },
    { k: 'plain', source: ['res-pipeline-p4', 'm-library-design-p4'], html: `<p>The authors' library, <b>libDECKO-NSCLC1</b>, has a depth of 10 unique pgRNAs per target and 12,000 pgRNAs in total. CRISPETa designed them with its off-target filters on. It began with the strictest setting and relaxed the rules step by step until 10 pgRNAs were found for every target.</p>` },
    { k: 'why', source: ['res-pipeline-p5', 'fig1F'], html: `<p><b>Why 10 and not 1?</b> The paper's own tests show single guides often fail. Of 12 randomly chosen pgRNAs, deletion worked for 10 and the target RNA went down for 7. In Figure 1F, two of nine guide pairs for one lncRNA gave no clear drop. With several guides per target, a call rests on the group, not on one guide's luck.</p>` },

    { k: 'h', text: 'Is the library any good? Evenness and the Gini coefficient' },
    { k: 'bgnd', html: `<p>A pooled experiment assumes every guide pair starts at a similar level. If some were rare from the start, you could not tell "rare because it dropped out" from "rare because it was never common". So after cloning, the mixture is checked by reading its DNA and counting each guide pair.</p>` +
      `<p>Two checks: how many reads match the design exactly (<b>perfect match</b>), and how even the counts are. The <b>Gini coefficient</b> (borrowed from economics, where it measures income inequality) sums up evenness: 0 means all guides are equally common, 1 means one guide has everything. A <b>Lorenz curve</b> draws the same idea: a straight diagonal is perfectly even, and the more the curve sags, the more uneven. A simpler measure compares the 90th and the 10th percentile guide.</p>` },
    { k: 'plain', source: ['res-pipeline-p4', 'm-library-cloning-p3', 'm-library-cloning-p2'], html: `<p>After cloning into the DECKO backbone, reading the pool showed 60.8% perfect match across both spacers (both guides of the pair) and a 90th-to-10th percentile count ratio of 4.6-fold. The authors also computed a Lorenz curve and Gini coefficient; the main text points to Figure S1C and gives no value. During cloning, bacterial colonies counted per library sequence gave a "library coverage of 66.7X".</p>` },

    { k: 'h', text: 'Coverage: enough cells for every guide' },
    { k: 'bgnd', html: `<p><b>Coverage</b> is the number of cells divided by the number of different guide pairs. At 1,000× each guide pair sits in about a thousand cells. Why so many? Cells are lost at random whenever you split or harvest them. With only a few cells per guide, luck alone could remove a guide and fake a hit; with a thousand, random losses average out.</p>` },
    { k: 'worked', html: `<p><b>Worked example (my arithmetic, not the paper's).</b> 16,000,000 cells ÷ 12,000 pgRNAs ≈ 1,333 cells per pgRNA, above 1,000×. The infection started with 120 million cells of which about 30% were infected (lesson D2): roughly 36 million cells, or about 3,000 per pgRNA, a comfortable margin.</p>` },
    { k: 'plain', source: ['m-screens-p1', 'm-screen-prolif-p1'], html: `<p>One week after infection the authors took a reference sample of 16M cells, a library coverage of more than 1,000X. They define coverage as the number of cells divided by the number of unique library sequences, and kept it above 1,000X when passaging.</p>` },
    { k: 'flag', source: ['m-library-cloning-p2', 'm-screen-prolif-p1', 'res-pipeline-p4', 'fig1A', 'fig1B'], html: `<p><b>Two traps.</b> "Coverage" means two different things: 66.7X counts bacterial colonies per library sequence (cloning), while more than 1,000X counts cells per library sequence (the screens). And the text says 12,000 pgRNAs (10 per target) but Figure 1A prints "1,200 targets" and Figure 1B "1200 pgRNAs library including controls"; learn the text's numbers and expect the figure label to be a slip.</p>` },
    { k: 'memory', html: `<p><b>Analogy:</b> a pooled library is a locksmith's tray with <b>ten keys cut for every lock</b> (depth): some keys come out bent, but the lock still gets tried. <b>Coverage</b> is how many copies of each key you hand out: with a thousand, losing a few by accident does not matter. Where it breaks down: a "bent" guide does no harm, it simply does nothing.</p>` },
  ],
  appears: [
    { ref: 'res-pipeline-p4', note: 'libDECKO-NSCLC1: depth of 10 pgRNAs per target, 12,000 pgRNAs; 60.8% perfect match and a 4.6-fold 90th/10th percentile ratio.' },
    { ref: 'm-library-cloning-p3', note: 'Library quality check: single colonies, then the whole pool, with a Lorenz curve and Gini coefficient.' },
    { ref: 'm-screen-prolif-p1', note: 'Coverage defined as cells divided by unique library sequences; more than 1,000X.' },
    { ref: 'fig1D', note: 'A FACS plot with a gate around the BFP-positive Cas9 cells (75.7%).' },
    { ref: 'discussion-p2', note: 'Why a pooled CRISPR screen rather than an arrayed one.' },
  ],
  checks: [
    { q: 'On a flow cytometry plot, what does a "gate" do?',
      options: [
        { t: 'It selects one group of dots (cells), so only those cells are counted or, in FACS, collected', ok: true, why: 'Right. A gate is a box drawn around one population, for example the strongly blue cells.' },
        { t: 'It lets dye pass through the cell membrane', ok: false, why: 'A gate is a region drawn on the plot, not a physical opening in a cell.' },
        { t: 'It counts how many viruses entered each cell', ok: false, why: 'Flow cytometry reads light from each cell; it does not count viruses. A gate only selects dots on the plot.' },
        { t: 'It breaks the cells open to release their DNA', ok: false, why: 'Cells stay intact in flow cytometry; DNA is extracted in a separate step.' },
      ], bg: true },
    { q: 'What is the key difference between a pooled and an arrayed screen?',
      options: [
        { t: 'In a pooled screen all guides share one dish and are counted afterwards; in an arrayed screen each target has its own well', ok: true, why: 'Right. That is why a pooled screen needs far less equipment, but can only read out traits that change how common a guide is.' },
        { t: 'A pooled screen puts one target in each well of a plate', ok: false, why: 'That describes an arrayed screen.' },
        { t: 'Only an arrayed screen can use CRISPR guides', ok: false, why: 'Both formats can use CRISPR; the difference is how the targets are arranged, not the tool.' },
        { t: 'In a pooled screen you know each cell\'s guide from its color', ok: false, why: 'Cells in a pooled screen mostly look alike; each cell\'s guide is recovered later by reading DNA.' },
      ], bg: true },
    { q: 'Why does libDECKO-NSCLC1 aim 10 pgRNAs at every target instead of just one?',
      options: [
        { t: 'Single pgRNAs often fail (in the paper\'s test only 7 of 12 random ones lowered their target RNA), so several guides make a target\'s result dependable', ok: true, why: 'Right (res-pipeline-p5): the test gave expected RNA decreases for 7 of 12 pgRNAs, so one guide alone can mislead.' },
        { t: 'Each cell must receive ten guide pairs for Cas9 to cut', ok: false, why: 'Each infected cell gets just one guide pair (the point of MOI 0.3); the ten pairs are spread over different cells.' },
        { t: 'Ten guides per target are needed to reach 1,000x coverage', ok: false, why: 'Coverage is the number of cells per guide pair, not guides per target.' },
        { t: 'More guides make the library cheaper to synthesize', ok: false, why: 'More guides make the library bigger, not cheaper; the aim was reliability.' },
      ], source: ['res-pipeline-p4', 'res-pipeline-p5', 'm-titer-p1'] },
    { q: 'The authors kept their cells at a coverage of more than 1,000X. What is the purpose?',
      options: [
        { t: 'Random loss of cells then cannot wipe out a guide pair by chance, so a real drop in a guide stands out from noise', ok: true, why: 'Right. With a thousand cells per guide pair, chance losses average out.' },
        { t: 'To make sure every cell carries 1,000 guide pairs', ok: false, why: 'Each infected cell carries one guide pair; coverage is the ratio of cells to different guide pairs.' },
        { t: 'To raise the MOI above 1', ok: false, why: 'Coverage and MOI are different things: MOI is viruses per cell, coverage is cells per guide pair.' },
        { t: 'To make cells grow faster by crowding the dish', ok: false, why: 'Coverage is a count of cells per guide pair; it does not speed up growth.' },
      ], source: ['m-screen-prolif-p1'] },
  ],
});

/* ============================================================================================== D4 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'D4',
  defines: ['fdr', 'auc'],
  body: [
    { k: 'h', text: 'From a dish of cells to a table of counts' },
    { k: 'bgnd', html: `<p>At the end of a screen you have a dish of cells and no way to read their guides by eye. So each guide is turned into a <i>count</i>. Every cell carries its guide pair written into its own DNA: collect the cells, extract their DNA, copy only the guide part, read it, and count how often each pair shows up.</p>` },
    { k: 'svg', caption: 'The lab path from collected cells to a count for every guide pair.',
      svg: `<svg viewBox="0 0 480 266" role="img" aria-label="Five steps: collect cells, extract genomic DNA, copy the guide part by PCR, read it by next-generation sequencing, count the reads per guide pair">` +
        `<rect x="6" y="8" width="124" height="32" rx="8" class="f-blue"/><text x="68" y="29" class="mid b">1 Collect cells</text><text x="140" y="29" class="s">T0 and later time points</text>` +
        `<path d="M68 40 V60" class="arrow"/>` +
        `<rect x="6" y="62" width="124" height="32" rx="8" class="f-teal"/><text x="68" y="83" class="mid b">2 Extract gDNA</text><text x="140" y="83" class="s">all the DNA of the cells</text>` +
        `<path d="M68 94 V114" class="arrow"/>` +
        `<rect x="6" y="116" width="124" height="32" rx="8" class="f-green"/><text x="68" y="137" class="mid b">3 PCR</text><text x="140" y="137" class="s">copy the guide part; primers label each sample</text>` +
        `<path d="M68 148 V168" class="arrow"/>` +
        `<rect x="6" y="170" width="124" height="32" rx="8" class="f-orange"/><text x="68" y="191" class="mid b">4 NGS</text><text x="140" y="191" class="s">millions of sequencing reads</text>` +
        `<path d="M68 202 V222" class="arrow"/>` +
        `<rect x="6" y="224" width="124" height="32" rx="8" class="f-purple"/><text x="68" y="245" class="mid b">5 Count reads</text><text x="140" y="245" class="s">per guide pair, then compare with T0</text></svg>` },

    { k: 'h', text: 'gDNA, PCR, primers, NGS and reads' },
    { k: 'bgnd', html: `<p><b>Genomic DNA (gDNA)</b> is all the DNA of the cells, purified from the collected pellet; the guide cassette is hidden in it among a whole genome. <b>PCR</b> (polymerase chain reaction) copies one chosen stretch of DNA again and again, doubling it each cycle, so that stretch becomes abundant. <b>Primers</b> are short DNA pieces matching the two ends of that stretch: they tell PCR what to copy, and can carry a barcode that labels the sample.</p>` +
      `<p><b>Next-generation sequencing (NGS)</b> reads millions of short DNA pieces at once. Each piece read is a <b>sequencing read</b>. Barcoded samples can share one run and be separated afterwards. The reads are matched to the list of designed guide pairs and counted: a pair's <b>read count</b> is roughly how many cells carried it.</p>` },
    { k: 'plain', source: ['m-gdna-p2'], html: `<p>In the paper, gDNA was copied by PCR with a universal forward primer and a uniquely barcoded P7 primer for each sample (22 cycles). The products were read on an Illumina HiSeq2000 with paired-end 150 bp reads, 40M reads per sample.</p>` },

    { k: 'h', text: 'Time points' },
    { k: 'bgnd', html: `<p>A <b>time point</b> is a labelled moment when cells are collected. <b>T0</b> is the starting reference sample; later points are named after the time passed. Comparing them with T0 shows which guide pairs gained or lost cells in between.</p>` },
    { k: 'plain', source: ['m-screens-p1', 'm-screen-prolif-p1', 'fig3B'], html: `<p>One week after infection the authors counted the cells and took the reference sample T0 (16M cells, coverage above 1,000X). In the dropout screens, cells were harvested after 14 and 21 days; the paper calls these T2 (2 weeks) and T3 (3 weeks).</p>` },

    { k: 'h', text: 'Cleaning the counts' },
    { k: 'bgnd', html: `<p>Raw counts need cleaning. A <b>batch effect</b> is a difference between samples caused by <i>when or how</i> they were handled (another day, reagent lot or run), not by biology. If every T0 sample ran on Monday and every T3 sample on Friday, you could mistake that gap for a real effect, so a correction removes the shared offset.</p>` +
      `<p>In a library where each construct holds two guides, pieces of different constructs can get shuffled during copying, giving reads whose guides were never paired by design: <b>recombination events</b> (the paper does not define the term; this is the usual meaning). <b>Sanger sequencing</b> is the older method that reads one fragment at a time very accurately, ideal for checking a single bacterial colony; NGS reads the whole pool.</p>` },
    { k: 'plain', source: ['m-hits-p1'], derived: ['3'], html: `<p>The raw reads were analyzed with <b>CASPR</b>, a pipeline that also monitored quality: overall 36% of the reads were usable, and recombination events affected typically less than 3% of reads. Low-scoring guides were removed with <b>GuideScan</b>, a batch effect correction was applied with MageckFlute (a companion of the <b>MAGeCK</b> toolkit for CRISPR screens), and CASPR then calculated log2 fold changes and confidence scores for each target.</p>` },
    { k: 'plain', source: ['m-pcr-gdna-p1', 'fig1E', 'm-library-cloning-p3'], html: `<p>PCR is also used to check a deletion. Primers flanking the deleted region copy a long fragment from intact DNA and a short one if the region is gone: in Figure 1E the control shows a 2.5kb band (WT) and the pgRNA_9 sample a 500bp band (KO). Single clones of the library were checked by colony PCR and Sanger sequencing, the whole pool by NGS.</p>` },

    { k: 'h', text: 'Dropout versus positive selection' },
    { k: 'bgnd', html: `<p>In a <b>dropout screen</b> (negative selection) you compare cells at a later time point with T0. A guide whose target the cells need becomes rarer: it is <b>depleted</b>. Delete a growth-promoting gene and those cells fall behind, so the guide's read count falls from, say, 1,000 to 250 (four-fold lower, a log2 fold change of −2). Dropout reads "who is missing".</p>` +
      `<p>In a <b>positive selection screen</b> you instead <i>collect</i> the cells that show the trait (the slowest-growing, say) and ask which guide pairs are enriched there compared with a reference. It reads "who is over-represented". Why run both? Dropout is a loss of signal, which can be noisy when counts are small; positive selection is a gain of signal.</p>` },
    { k: 'svg', caption: 'One guide pair, two ways to see an effect (made-up read counts).',
      svg: `<svg viewBox="0 0 480 204" role="img" aria-label="Left: in a dropout screen a guide's read count is high at T0 and low at T3, so it is depleted. Right: in positive selection a guide has a low count in the reference and a high count in the collected cells, so it is enriched">` +
        `<text x="120" y="22" class="mid b">Dropout screen</text><text x="360" y="22" class="mid b">Positive selection</text>` +
        `<path d="M30 150 H230" class="ln thin m"/><path d="M270 150 H470" class="ln thin m"/>` +
        `<rect x="50" y="60" width="44" height="90" class="f-blue"/><text x="72" y="54" class="mid s">1,000</text><text x="72" y="168" class="mid s">T0</text>` +
        `<rect x="150" y="126" width="44" height="24" class="f-red"/><text x="172" y="120" class="mid s">250</text><text x="172" y="168" class="mid s">T3</text>` +
        `<path d="M104 84 L142 118" class="arrow"/>` +
        `<rect x="290" y="126" width="44" height="24" class="f-blue"/><text x="312" y="120" class="mid s">250</text><text x="312" y="168" class="mid s">reference</text>` +
        `<rect x="390" y="60" width="44" height="90" class="f-green"/><text x="412" y="54" class="mid s">1,000</text><text x="412" y="168" class="mid s">collected cells</text>` +
        `<path d="M344 120 L384 84" class="arrow"/>` +
        `<text x="120" y="192" class="mid s">depleted = fewer reads later</text><text x="360" y="192" class="mid s">enriched = more reads in the group</text></svg>` },
    { k: 'paper', ref: 'res-multipheno-p2', quote: 'To boost sensitivity, we implemented complementary “positive” screens, where pgRNAs of interest are enriched.' },
    { k: 'plain', source: ['res-multipheno-p1', 'res-multipheno-p2', 'discussion-p3'], html: `<p>Earlier CRISPR screens were mostly negative "dropout" screens. Adding complementary positive screens gave a modest but consistent gain in accuracy (A549 proliferation 0.7 versus 0.67; A549 cisplatin 0.77 versus 0.73; these are AUC scores, lesson E4). The Discussion adds that the gain is marginal and costs extra resources.</p>` },
    { k: 'plain', source: ['m-hits-p3'], html: `<p>A single screen's hit rule: FDR&lt;0.2 together with LFC&gt;0 (guide enriched) in the positive screens, and FDR&lt;0.2 with LFC&lt;0 (guide depleted) in the dropout and cisplatin screens. FDR is a confidence cutoff (lesson E4); LFC is the log2 fold change. The screens themselves are the subject of the next lesson.</p>` },
    { k: 'memory', html: `<p><b>Analogy:</b> name tags in a crowd. You cannot read tags in a dish, but you can count them from the DNA. <b>Dropout</b>: count the tags at the start of a long hike and again at the end; missing tags belong to people who dropped out. <b>Positive selection</b>: stand at the "slow lane" gate and count whose tags are over-represented there.</p>` },
  ],
  appears: [
    { ref: 'm-hits-p1', note: 'CASPR pipeline, GuideScan filtering, batch effect correction; 36% of reads usable; recombination events typically <3%.' },
    { ref: 'm-gdna-p2', note: 'gDNA, PCR with barcoded primers, Illumina sequencing at 40M reads per sample.' },
    { ref: 'm-screens-p1', note: 'T0, the reference sample: 16M cells at more than 1,000x coverage.' },
    { ref: 'm-pcr-gdna-p1', note: 'PCR on gDNA with primers flanking the deleted region, to check a deletion.' },
    { ref: 'fig1E', note: 'Gel of a deletion check: 2.5kb (WT) versus 500bp (KO).' },
  ],
  checks: [
    { q: 'Why is PCR needed between extracting the DNA and sequencing it?',
      options: [
        { t: 'The guide part is a tiny fraction of the genomic DNA, so PCR copies just that part until there is enough to read', ok: true, why: 'Right. Primers mark the stretch to copy, so the guide cassette becomes abundant while the rest of the genome is left alone.' },
        { t: 'PCR kills the cells that did not receive a guide', ok: false, why: 'That is antibiotic selection, done on living cells earlier. PCR works on extracted DNA.' },
        { t: 'PCR reads the DNA letters', ok: false, why: 'PCR only copies DNA. Reading the letters is the job of sequencing (NGS).' },
        { t: 'PCR adds Cas9 to the DNA', ok: false, why: 'PCR makes copies of a stretch of DNA; it does not add Cas9.' },
      ], bg: true },
    { q: 'At T3, one guide pair has far fewer reads than at T0. What does this most likely mean?',
      options: [
        { t: 'Cells carrying it grew worse or died, so its target probably helps growth or survival (the guide is depleted)', ok: true, why: 'Right. That is what a dropout screen detects.' },
        { t: 'Its target holds growth back, like a brake', ok: false, why: 'Removing a brake would make cells grow faster, and the guide would become <b>enriched</b>, the opposite of what is seen.' },
        { t: 'The guide was never delivered into any cell', ok: false, why: 'The pair was present at T0 (it had more reads then), so the fall points to the cells carrying it doing worse. (Individual guides can fail technically, which is why several guides per target are used.)' },
        { t: 'The sequencing machine misread that one guide', ok: false, why: 'Counts come from millions of reads; a misreading would not make one guide steadily fall between time points.' },
      ], bg: true },
    { q: 'In the positive screens, the paper counts a target as a hit when its guides are …',
      options: [
        { t: 'enriched: LFC above 0, together with FDR below 0.2', ok: true, why: 'Right (m-hits-p3): FDR<0.2 and LFC>0 for the positive screens.' },
        { t: 'depleted: LFC below 0, together with FDR below 0.2', ok: false, why: 'That is the rule for the dropout and cisplatin screens, not for the positive screens.' },
        { t: 'unchanged: LFC of exactly 0', ok: false, why: 'A guide with no change is not a hit in any of the screens.' },
      ], source: ['m-hits-p3'] },
    { q: 'Why did the authors add positive selection screens on top of the dropout screens?',
      options: [
        { t: 'To boost sensitivity: complementary positive screens gave a modest but consistent accuracy gain over dropout alone', ok: true, why: 'Right (res-multipheno-p2). The Discussion adds that the gain is marginal given the extra resources required.' },
        { t: 'Because dropout screens cannot be run in A549 cells', ok: false, why: 'The paper runs dropout screens in A549 and H460 cells; positive screens were added as a complement.' },
        { t: 'Because positive screens are cheaper and faster', ok: false, why: 'The Discussion says the benefit should be weighed against the extra resources required, so they are not cheaper.' },
        { t: 'Because positive screens are the only way to measure cisplatin resistance', ok: false, why: 'Cisplatin resistance was also measured in a dropout-type (survival) format; the positive format was added as a complement.' },
      ], source: ['res-multipheno-p2', 'discussion-p3', 'res-multipheno-p7', 'fig2B'] },
  ],
});

/* ============================================================================================== D5 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'D5',
  defines: ['p-value'],
  body: [
    { k: 'h', text: 'Three hallmarks, eight screens' },
    { k: 'plain', source: ['intro-p6', 'res-multipheno-p2', 'res-multipheno-p7'], html: `<p>The paper runs 8 CRISPR screens for three hallmarks (proliferation, chemoresistance and invasion, the last tested as migration) in two lung cancer cell lines. Each is a different way of reading guide counts, always asking: which guides are depleted, which enriched?</p>` },
    { k: 'svg', caption: 'The five kinds of screen at a glance: which cells are read out, and which way a hit\'s guides move.',
      svg: `<svg viewBox="0 0 480 272" role="img" aria-label="Table of five screens: proliferation dropout, proliferation CFSE, cisplatin survival, cisplatin death and migration transwell, with the cells read out and whether a hit's guides are depleted or enriched">` +
        `<text x="14" y="20" class="b s">Screen</text><text x="172" y="20" class="b s">Cells read out</text><text x="356" y="20" class="b s">A hit's guides are</text>` +
        `<rect x="6" y="32" width="468" height="38" rx="8" class="f-yellow"/><text x="14" y="56" class="s b">Proliferation · dropout</text><text x="172" y="56" class="s">all cells, 14 and 21 days</text><rect x="356" y="39" width="108" height="24" rx="6" class="f-red"/><text x="410" y="56" class="mid s">depleted</text>` +
        `<rect x="6" y="76" width="468" height="38" rx="8" class="f-yellow"/><text x="14" y="100" class="s b">Proliferation · CFSE</text><text x="172" y="100" class="s">slowest 20% (dye-bright)</text><rect x="356" y="83" width="108" height="24" rx="6" class="f-green"/><text x="410" y="100" class="mid s">enriched</text>` +
        `<rect x="6" y="120" width="468" height="38" rx="8" class="f-teal"/><text x="14" y="144" class="s b">Cisplatin · survival</text><text x="172" y="144" class="s">survivors of IC30 and IC80</text><rect x="356" y="127" width="108" height="24" rx="6" class="f-red"/><text x="410" y="144" class="mid s">depleted</text>` +
        `<rect x="6" y="164" width="468" height="38" rx="8" class="f-teal"/><text x="14" y="188" class="s b">Cisplatin · death</text><text x="172" y="188" class="s">dead cells at a low dose</text><rect x="356" y="171" width="108" height="24" rx="6" class="f-green"/><text x="410" y="188" class="mid s">enriched</text>` +
        `<rect x="6" y="208" width="468" height="38" rx="8" class="f-purple"/><text x="14" y="232" class="s b">Migration · transwell</text><text x="172" y="232" class="s">cells that did not cross</text><rect x="356" y="215" width="108" height="24" rx="6" class="f-green"/><text x="410" y="232" class="mid s">enriched</text>` +
        `<text x="6" y="266" class="s m">depleted = fewer reads than the reference; enriched = more</text></svg>` },

    { k: 'h', text: 'Proliferation: dropout and CFSE' },
    { k: 'bgnd', html: `<p><b>CFSE</b> is a dye that stains every cell. At each division the dye is shared between the two daughters, so fast dividers turn dim and slow dividers stay bright. After staining, a FACS machine collects the brightest and the dimmest groups. Guides enriched among the bright (slow) cells point to growth-promoting targets: a positive selection screen.</p>` },
    { k: 'plain', source: ['m-screen-prolif-p1'], html: `<p>Dropout screens: 16M cells at T0, passaged to keep coverage above 1,000X, harvested at 14 and 21 days. CFSE screens: stained cells grew for five days, then the 20% brightest (slow-growing) and the 20% least bright (fast-growing) were sorted; both groups were replated and, five days later, stained and sorted again.</p>` },
    { k: 'flag', source: ['m-screen-prolif-p1'], html: `<p>The CFSE paragraph labels its steps T7, T5 and T10, which do not line up with T0, T2 and T3. Just keep the order of events.</p>` },

    { k: 'h', text: 'Cisplatin: survival and death' },
    { k: 'bgnd', html: `<p>Cisplatin damages DNA (lesson C3); IC30 and IC80 are doses that cut growth by about 30% and 80%. In the <b>cisplatin survival screen</b> the cells stay in the drug, and guides of resistance-promoting lncRNAs are depleted among the survivors (a dropout format). In the <b>cisplatin death screen</b> a low dose is used and the <i>dead</i>, floating cells are collected: guides enriched among the dead point to resistance-promoting lncRNAs (positive selection).</p>` },
    { k: 'paper', ref: 'm-screen-cisplatin-p1', quote: 'Two different cisplatin concentrations were used to increase the dynamic range of the screens and account for diverging effects of different doses' },
    { k: 'plain', source: ['m-screen-cisplatin-p1'], html: `<p>Survival screen: 48M and 96M A549 cells were treated with 6.5 and 25 µM cisplatin (IC30 and IC80), and cell pellets collected after 14 and 21 days. Death screen: 144M cells at a low dose (IC20); every 24 hours for five days the floating (dead) cells were collected and pooled.</p>` },
    { k: 'flag', source: ['m-screen-cisplatin-p1'], html: `<p>The death-screen dose is printed as "2 and 1 µM (IC20) for A549": two numbers for one IC20. The paper does not say what they refer to.</p>` },

    { k: 'h', text: 'Migration: the transwell' },
    { k: 'bgnd', html: `<p>A <b>transwell</b> (Boyden chamber) is a cup with a porous floor. Cells go in without serum; the chamber below holds serum, which attracts them. Cells that can move squeeze through; those that cannot stay above. In the <b>migration screen</b>, a migration-promoting target is enriched among the cells that stayed above, because removing it left them impaired.</p>` },
    { k: 'plain', source: ['m-screen-migration-p1', 'res-multipheno-p7'], html: `<p>A pilot chose 48 hours as the assay length. About 16M infected cells were split over 32 transwell inserts (0.5M each), serum-free medium above and 10% FBS below. After 48 hours the cells above (impaired migration) and below (accelerated migration) were collected separately, regrown for 48 hours and counted before DNA extraction; untreated cells were the reference. The screen found 65 migration-promoting lncRNAs.</p>` },

    { k: 'h', text: 'The controls: what "no effect" and "a real effect" look like' },
    { k: 'bgnd', html: `<p>A screen is only believable if it passes its own tests, so the library holds targets whose outcome you already know. <b>Neutral controls</b> aim at DNA where cutting should do nothing: a "safe harbor" such as <b>AAVS1</b>, <b>intergenic regions</b> (DNA between genes) and long introns. Cut like every other target, they show what <i>no effect</i> looks like and absorb the stress that cutting DNA puts on cells. <b>Positive controls</b> should show an effect, such as an <b>essential gene</b> (cells cannot live without it, like the ribosomal gene <b>RPS5</b>): their guides should be depleted in a dropout screen. Beware of the word <b>negative</b>: usually it means a do-nothing control, but this paper uses it differently (below).</p>` },
    { k: 'plain', source: ['m-library-design-p3', 'res-pipeline-p3', 'fig4C'], html: `<p>Neutral controls: pgRNAs in 10 AAVS1 regions, 65 random intergenic regions (more than 10 kb from any gene) and 25 intronic regions (in introns longer than 5 kb). Positive controls: protein-coding genes with known roles in cell growth and cisplatin resistance, 53 "positive" (promoting growth) and 50 "negative" (opposing growth), picked from the literature. So here "negative" does not mean "does nothing". On the plots, such genes are labeled by name, for example XPA, ATR, BRCA2, ERCC1, PLK1, EIF5B and SNRNP200.</p>` },
    { k: 'flag', source: ['fig1C', 'fig2F', 'res-multipheno-p6'], html: `<p>The control counts differ between places: Figure 1C shows 62 intergenic regions, 25 introns and 1 AAVS1 region; Figure 2F plots n=35 neutral controls; the Results mention 109 positive controls. Learn what each control is for, not one printed count.</p>` },

    { k: 'h', text: 'ORF versus TSS: how much weaker is promoter deletion?' },
    { k: 'bgnd', html: `<p>A protein-coding gene is normally broken by cutting inside its coding sequence (<b>ORF targeting</b>), which should give the maximal loss of function. A lncRNA has no protein to break, so the paper deletes its TSS. To measure the cost of that, positive-control genes were targeted both ways.</p>` },
    { k: 'paper', ref: 'res-multipheno-p3', quote: 'Promoter-deletion pgRNAs displayed a detectable but lower phenotypic impact, indicating that CRISPR-del screens for lncRNAs face intrinsically lower sensitivity compared with ORF-targeting screens for PCGs' },
    { k: 'panel', id: 'fig2F', html: `<p>Each dot is one target's score in the A549 dropout screen (a P value, lesson E2: small means a stronger effect). Neutral controls sit high (no effect). Both kinds of positive control sit lower, and the ORF-targeting ones differ from the neutral controls more clearly (4.95e-05) than the TSS-targeting ones (0.004).</p>` },
    { k: 'plain', source: ['res-multipheno-p3', 'limitations-p2', 'fig3C', 'res-validation-p3'], html: `<p>Positive-control genes were clearly depleted in dropout screens; neutral controls were not. The Limitations section adds that many valuable targets were probably overlooked because CRISPR-del is less efficient than ORF mutation; it names MALAT1 and MIAT as surprising misses, for unclear reasons. In the mixing test of Figure 3C (lesson D7), AAVS1 guides mark the control cells and RPS5 guides are the positive control (P=3.8e-4); the paper says its two validated candidates lost to the control cells with an effect comparable to inactivating RPS5.</p>` },
    { k: 'memory', html: `<p><b>Analogy:</b> calibrating a kitchen scale. A <b>neutral control</b> is the empty tray: it should read zero, and if it does not, the scale is off. A <b>positive control</b> is a known 1 kg weight: it shows the scale can detect something. ORF versus TSS is weighing that same weight with a clumsy method to see how much it under-reads.</p>` },
  ],
  appears: [
    { ref: 'res-multipheno-p3', note: 'Positive controls depleted, neutral controls not; ORF targeting versus promoter deletion (Figure 2F).' },
    { ref: 'm-library-design-p3', note: 'The neutral controls (AAVS1, intergenic, intronic) and the positive and negative protein-coding controls.' },
    { ref: 'fig3C', note: 'Mixing test: AAVS1 as neutral control and RPS5 as positive control.' },
    { ref: 'm-screen-cisplatin-p1', note: 'Cisplatin doses for the survival (IC30, IC80) and death (IC20) screens.' },
    { ref: 'm-screen-migration-p1', note: 'The 48-hour transwell migration screen and its serum gradient (none above, 10% FBS below).' },
  ],
  checks: [
    { q: 'In the CFSE screen, which cells were collected as the slow-growing ones?',
      options: [
        { t: 'The 20% brightest cells, because they kept most of their dye', ok: true, why: 'Right. Each division halves the dye, so cells that divided least stay bright (the paper: 20% brightest = slow-growing).' },
        { t: 'The 20% least bright cells', ok: false, why: 'Those divided most and diluted the dye; the paper calls them fast-growing.' },
        { t: 'The cells that died', ok: false, why: 'Dead cells are collected in the cisplatin death screen, not in the CFSE screen.' },
        { t: 'The cells that did not take up the dye', ok: false, why: 'All cells are stained; they are separated afterwards by how bright they are.' },
      ], source: ['m-screen-prolif-p1'] },
    { q: 'In the cisplatin death screen, where do the guides of a resistance-promoting lncRNA end up?',
      options: [
        { t: 'Enriched among the collected dead cells, because cells lacking that lncRNA die more easily', ok: true, why: 'Right (Figure 2B): in the positive "death" screen, enriched pgRNAs identify resistance-promoting lncRNAs.' },
        { t: 'Depleted among the dead cells', ok: false, why: 'That would mean cells lacking the lncRNA die less, the opposite of a resistance-promoting lncRNA.' },
        { t: 'Only among the survivors', ok: false, why: 'Cells lacking a resistance-promoting lncRNA are more vulnerable, so their guides are expected among the dead.' },
        { t: 'Unchanged, because every cell carries the same guide', ok: false, why: 'Cells carry different guides; the screen compares guide counts in the dead cells with a reference.' },
      ], source: ['fig2B', 'm-screen-cisplatin-p1'] },
    { q: 'Why does the cisplatin survival screen use two doses, IC30 and IC80?',
      options: [
        { t: 'To widen the dynamic range and capture the different effects of a mild and a high dose', ok: true, why: 'Right: a mild dose slows proliferation by about 30%, while high doses cause arrest or death.' },
        { t: 'One dose for each cell line', ok: false, why: 'Both doses (6.5 and 25 µM) were used on A549 cells.' },
        { t: 'To repeat the same experiment twice', ok: false, why: 'The doses have different effects, so they are not replicates of each other.' },
      ], source: ['m-screen-cisplatin-p1'] },
    { q: 'Why were the positive-control genes targeted both in the ORF and at the TSS?',
      options: [
        { t: 'To measure how much less effective TSS deletion (the lncRNA strategy) is than conventional ORF mutation', ok: true, why: 'Right: promoter deletion showed a detectable but lower impact, so lncRNA screens are expected to be less sensitive.' },
        { t: 'Because TSS deletion cannot be done on protein-coding genes', ok: false, why: 'It can: the paper did exactly that and found a lower effect than ORF targeting.' },
        { t: 'To double the number of neutral controls', ok: false, why: 'These are positive controls; the aim was to compare two ways of disrupting the same kind of gene.' },
        { t: 'Because ORF guides were expected to have no effect', ok: false, why: 'ORF mutation is expected to give the maximal loss of function.' },
      ], source: ['res-multipheno-p3'] },
    { q: 'What is the job of neutral controls such as AAVS1 guides?',
      options: [
        { t: 'To show what "no effect" looks like (including the stress of cutting), so real hits stand out', ok: true, why: 'Right: neutral controls were not depleted in the dropout screen, which is what a fair screen should show.' },
        { t: 'To kill the cells that were not infected', ok: false, why: 'That is the job of the antibiotic (puromycin), not of a control.' },
        { t: 'To prove that the screen can detect a strong effect', ok: false, why: 'That is the job of positive controls such as essential genes.' },
        { t: 'To serve as the starting reference sample of the screen', ok: false, why: 'The starting sample (T0) is a sample of cells; neutral controls are guides inside the library.' },
      ], source: ['res-pipeline-p3', 'res-multipheno-p3'] },
  ],
});
