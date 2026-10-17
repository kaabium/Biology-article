/* lessons-L1.js — lessons A1, A2, A3, B1, B2 (scope L1). Each lesson only ADDS to window.LESSON_CONTENT. */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(

/* ============================================================================================== A1 */
{
  id: 'A1',
  // Track A is plain words only: every glossary term used before its home lesson is explained in one plain sentence right where it first appears.
  defines: ['nsclc', 'cancer', 'cell', 'tumor', 'gene', 'rna', 'protein', 'lncrna', 'kras', 'crispr', 'guide-rna', 'crispr-library', 'a549', 'h460', 'screen', 'hallmark', 'proliferation', 'cisplatin', 'migration', 'hit', 'aso', 'knockdown', 'rna-therapeutics', 'chill1', 'gcawkr', 'spheroid', 'organoid', 'cytoplasm', 'nucleus', 'apoptosis', 'g2-phase'],
  body: [
    { k: 'h', text: 'The question' },
    { k: 'plain', source: ['intro-p1'], html:
      `<p>A group of lung cancers called <b>NSCLC</b> (non-small cell lung cancer) is the leading cause of cancer deaths worldwide. <b>Cancer</b> starts when <b>cells</b>, the tiny living units your body is made of, keep growing and dividing when they should have stopped, often forming a lump called a <b>tumor</b>. Today’s treatments run into trouble: some targets cannot be reached by drugs, treatments can be toxic, and cancers become resistant.</p>` },
    { k: 'plain', source: ['intro-p2'], html:
      `<p>Each cell keeps its instructions as <b>genes</b>. To use one, the cell makes a working copy called <b>RNA</b>. Many RNAs carry the recipe for a <b>protein</b>, one of the cell’s tiny machines. But a huge group, the <b>long noncoding RNAs</b> (<b>lncRNAs</b>), carry no such recipe. The paper says there are probably more than 100,000 of them and that more than 98% are “uncharacterised”: nobody knows what they do.</p>` },
    { k: 'plain', source: ['intro-p1', 'intro-p5', 'intro-p6'], html:
      `<p>The authors focus on the most common kind of NSCLC, in which a gene called <b>KRAS</b> carries a cancer-driving change (the paper writes “KRAS+”). Their question: <i>which lncRNAs help these lung cancer cells thrive, and could one of them be a weak spot for a new medicine?</i> They wanted answers that hold up, so they looked for lncRNAs that matter for several cancer abilities at once, and in more than one type of cancer cell.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> imagine a giant control panel with thousands of unlabeled switches. The authors switch off a few hundred of them, one at a time, and watch which ones dim the cancer’s lights.</p>` },

    { k: 'h', text: 'The whole study on one page' },
    { k: 'svg', caption: 'The study in six stages. The small print under each title is the paper’s own name for that stage.',
      svg: `<svg viewBox="0 0 480 378" role="img" aria-label="The study as six stages from top to bottom: a library of guides, put it into lung cancer cells, run three screens, combine the evidence, test the best with ASOs, and how the two winners work"><rect x="54" y="8" width="420" height="52" rx="10" class="f-blue"/><circle cx="26" cy="34" r="16" class="f-blue"/><text x="26" y="40" class="mid b">1</text><text x="68" y="31" class="b">A library of guides</text><text x="68" y="50" class="s m">Paper: library design · 10 guide pairs per target</text><path d="M26 53 V68" class="arrow"/><rect x="54" y="70" width="420" height="52" rx="10" class="f-teal"/><circle cx="26" cy="96" r="16" class="f-teal"/><text x="26" y="102" class="mid b">2</text><text x="68" y="93" class="b">Put it into lung cancer cells</text><text x="68" y="112" class="s m">Paper: A549 and H460, two cancer cell types</text><path d="M26 115 V130" class="arrow"/><rect x="54" y="132" width="420" height="52" rx="10" class="f-green"/><circle cx="26" cy="158" r="16" class="f-green"/><text x="26" y="164" class="mid b">3</text><text x="68" y="155" class="b">Run three screens</text><text x="68" y="174" class="s m">Paper: proliferation · cisplatin · migration</text><path d="M26 177 V192" class="arrow"/><rect x="54" y="194" width="420" height="52" rx="10" class="f-orange"/><circle cx="26" cy="220" r="16" class="f-orange"/><text x="26" y="226" class="mid b">4</text><text x="68" y="217" class="b">Combine the evidence</text><text x="68" y="236" class="s m">Paper: multi-hallmark integration → 80 hits</text><path d="M26 239 V254" class="arrow"/><rect x="54" y="256" width="420" height="52" rx="10" class="f-purple"/><circle cx="26" cy="282" r="16" class="f-purple"/><text x="26" y="288" class="mid b">5</text><text x="68" y="279" class="b">Test the best with ASOs</text><text x="68" y="298" class="s m">Paper: RNA therapeutics · 9 → 5 → 2</text><path d="M26 301 V316" class="arrow"/><rect x="54" y="318" width="420" height="52" rx="10" class="f-red"/><circle cx="26" cy="344" r="16" class="f-red"/><text x="26" y="350" class="mid b">6</text><text x="68" y="341" class="b">How do the two winners work?</text><text x="68" y="360" class="s m">Paper: CHiLL1 vs GCAWKR, distinct modes of action</text></svg>` },
    { k: 'plain', source: ['res-pipeline-p1', 'res-pipeline-p2', 'res-pipeline-p4'], html:
      `<p><b>A library of guides.</b> The team chose <b>831</b> lncRNAs that are detected in lung cancer cells. To switch one off, they use <b>CRISPR</b>, a tool that works like molecular scissors, to cut out the spot where the cell starts copying that lncRNA’s gene. Short <b>guide</b> molecules, used in pairs, steer the scissors to the right place. Each target got ten guide pairs, about 12,000 in all. A big collection like this is called a <b>library</b>.</p>` },
    { k: 'plain', source: ['res-pipeline-p5'], html:
      `<p><b>Put it into lung cancer cells.</b> They delivered the library into two types of lung cancer cells grown in the lab, called <b>A549</b> and <b>H460</b>. Two cell types show whether a result holds beyond one kind of cell.</p>` },
    { k: 'bgnd', html:
      `<p>In a pooled experiment like this, the guides are mixed and delivered so that most cells receive just one guide pair. Each cell then loses just one lncRNA, and thousands of different cells grow side by side in the same culture.</p>` },
    { k: 'plain', source: ['intro-p6', 'res-multipheno-p1', 'res-multipheno-p2', 'res-multipheno-p7'], html:
      `<p><b>Run three screens.</b> A <b>screen</b> is a big test of many things at once. Each one asks about an ability that helps cancer cells (the paper calls such abilities <b>hallmarks</b>). Do cells that lost this lncRNA multiply (<b>proliferate</b>) more slowly? Are they hurt more by <b>cisplatin</b>, a standard cell-killing cancer drug? Do they <b>migrate</b> (crawl from place to place) less? At the end the team counts which guides became rarer or commoner; the lncRNAs behind them are the suspects. The paper reports eight screens in all.</p>` },
    { k: 'plain', source: ['res-integration-p1', 'res-integration-p2', 'res-integration-p3'], html:
      `<p><b>Combine the evidence.</b> The team merged all the screens into one ranking. It was better than single screens at telling known cancer-helping genes from neutral spots. The lncRNAs that stand out are called <b>hits</b>: <b>80</b> of them, about 8% of those screened, and 73 had not been linked to NSCLC before. Hits from a single screen often worked in only one cell type; the combined hits tended to be active in both.</p>` },
    { k: 'plain', source: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3'], html:
      `<p><b>Test the best with ASOs.</b> Next, the authors tried to switch off hit lncRNAs the way a medicine could. <b>ASOs</b> (antisense oligonucleotides) are short man-made strands that stick to one chosen RNA and lower its amount, a so-called <b>knockdown</b>. The paper counts them among <b>RNA therapeutics</b>: medicines that act on RNA. They tested nine hits. Five slowed cancer-cell growth with two different ASOs. Two of the five, which the authors named <b>CHiLL1</b> and <b>GCAWKR</b>, had a weaker effect on normal lung cells.</p>` },
    { k: 'plain', source: ['res-aso-p6', 'res-aso-p7', 'res-aso-p8'], html:
      `<p>The two were then pushed further. Their ASOs left fewer living cells among ball-shaped cell clusters (<b>spheroids</b>), and CHiLL1’s ASOs also among <b>organoids</b>, mini-tumors grown in the lab from a patient’s tumor cells. A mix of the two ASOs worked better than either alone at the same total dose.</p>` },
    { k: 'plain', source: ['res-mechanism-p1', 'res-mechanism-p5', 'res-mechanism-p6', 'res-mechanism-p8'], html:
      `<p><b>How do the two winners work?</b> CHiLL1 and GCAWKR look alike in the cancer tests, but under a microscope CHiLL1 sits mainly in the <b>cytoplasm</b> (a cell’s inside, outside its control room) and GCAWKR in the <b>nucleus</b> (the control room). Switching each one down changes a different, non-overlapping set of genes. Knocking down CHiLL1 raised the number of cells in early <b>apoptosis</b> (programmed self-destruction). Knocking down GCAWKR raised the number of cells in <b>G2</b>, the stage just before a cell divides, and made cells migrate less.</p>` },
    { k: 'figure', id: 'ga', html: `<p>The authors’ own graphical abstract tells the same story in one picture.</p>` },

    { k: 'h', text: 'Take-home' },
    { k: 'why', source: ['discussion-p5'], html:
      `<p>All of this was done in lab dishes, cell clusters and organoids, not in patients. The authors say the ASOs still need refining and a way to be delivered in a living body, so this is a starting point for new medicines, not a medicine yet.</p>` },
  ],
  appears: [
    { ref: 'summary-p1', note: 'The authors’ own five-sentence summary of the whole study.' },
    { ref: 'intro-p6', note: 'What they did: eight screens, three cancer abilities, two lung cancer cell types.' },
    { ref: 'fig1A', note: 'The pipeline as the authors draw it: library design, pooled cells, three phenotypes.' },
    { ref: 'res-aso-p3', note: 'The funnel ends with CHiLL1 and GCAWKR.' },
  ],
  checks: [
    { q: 'Two tools appear in the story: CRISPR guides and ASOs. Which description is right?',
      options: [
        { t: 'CRISPR cuts out the start of each lncRNA’s gene in the screens; ASOs lower a chosen RNA in the follow-up tests', ok: true, why: 'Right: CRISPR guides are used in the big screens (stage 1), ASOs in the later tests of the best hits (stage 5).' },
        { t: 'ASOs cut out the start of the gene in the screens; CRISPR lowers the RNA afterward', ok: false, why: 'This swaps the two tools. ASOs do not cut DNA; they stick to an RNA and lower its amount.' },
        { t: 'Both are medicines that kill cancer cells directly', ok: false, why: 'Neither is a cell-killing drug here. Both are research tools to switch one lncRNA off and see what happens (the cell-killing drug in the story is cisplatin).' },
      ], source: ['res-pipeline-p1', 'res-aso-p1'] },
    { q: 'Why did the authors run three different screens (growth, cisplatin and migration) instead of one?',
      options: [
        { t: 'They wanted lncRNAs that matter for several cancer abilities at once, not just one', ok: true, why: 'Right: the paper says an ideal screen should prioritize lncRNAs that affect multiple hallmarks and work in more than one cell type.' },
        { t: 'Each screen tested a different cancer drug', ok: false, why: 'Only cisplatin is used as a drug, and only in the drug-survival screen. The other screens measure growth and movement.' },
        { t: 'Three screens were needed to count all 831 lncRNAs', ok: false, why: 'Counting is not the aim. The library already lists the 831 targets; the screens ask what happens when each one is removed.' },
      ], source: ['intro-p5', 'res-multipheno-p2'] },
    { q: 'How do the two finalists, CHiLL1 and GCAWKR, differ?',
      options: [
        { t: 'CHiLL1 sits mainly in the cytoplasm and GCAWKR in the nucleus, and they change largely different sets of genes', ok: true, why: 'Right: the paper stresses their contrasting locations and non-overlapping downstream gene networks.' },
        { t: 'Both sit in the nucleus and change the same genes', ok: false, why: 'The authors call it surprising that, despite similar roles in cancer, the two sit in different places and act through different gene networks.' },
        { t: 'CHiLL1 sits in the nucleus and GCAWKR in the cytoplasm', ok: false, why: 'This reverses the paper: CHiLL1 is found mainly in the cytoplasm, GCAWKR in the nucleus.' },
      ], source: ['res-mechanism-p1', 'res-mechanism-p8'] },
  ],
}

);
