/* lessons-L1.js — lessons A1, A2, A3, B1, B2 (scope L1). Each lesson only ADDS to window.LESSON_CONTENT. */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push(

/* ============================================================================================== A1 */
{
  id: 'A1',
  // Track A is plain words only: every glossary term used before its home lesson is explained in one plain sentence right where it first appears.
  defines: ['nsclc', 'cancer', 'cell', 'tumor', 'gene', 'rna', 'protein', 'lncrna', 'kras', 'crispr', 'guide-rna', 'crispr-library', 'lentivirus', 'transduction', 'a549', 'h460', 'screen', 'hallmark', 'proliferation', 'cisplatin', 'migration', 'hit', 'aso', 'knockdown', 'rna-therapeutics', 'chill1', 'gcawkr', 'spheroid', 'organoid', 'cytoplasm', 'nucleus', 'apoptosis', 'g2-phase'],
  body: [
    { k: 'h', text: 'The question' },
    { k: 'plain', source: ['intro-p1'], html:
      `<p>A group of lung cancers called <b>NSCLC</b> (non-small cell lung cancer) is the leading cause of cancer deaths worldwide. <b>Cancer</b> starts when <b>cells</b>, the tiny living units your body is made of, keep growing and dividing when they should have stopped, often forming a lump called a <b>tumor</b>. Today’s treatments run into trouble: some targets cannot be reached by drugs, treatments can be toxic, and cancers become resistant.</p>` },
    { k: 'plain', source: ['intro-p2'], html:
      `<p>Each cell keeps its instructions as <b>genes</b>. To use one, the cell makes a working copy called <b>RNA</b>. Many RNAs carry the recipe for a <b>protein</b>, one of the cell’s tiny machines. But a huge group, the <b>long noncoding RNAs</b> (<b>lncRNAs</b>), carry no such recipe. The paper says there are probably more than 100,000 of them and that more than 98% are “uncharacterised”: their jobs have not been worked out.</p>` },
    { k: 'plain', source: ['intro-p1', 'intro-p5', 'intro-p6'], html:
      `<p>The authors focus on the most common kind of NSCLC, in which a gene called <b>KRAS</b> carries a cancer-driving change (the paper writes “KRAS+”). Their question: <i>which lncRNAs help these lung cancer cells thrive, and could one of them be a weak spot for a new medicine?</i> They wanted answers that hold up, so they looked for lncRNAs that matter for several cancer abilities at once, and in more than one type of cancer cell.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> imagine a giant control panel with thousands of unlabeled switches. The authors switch off hundreds of them, one at a time, and watch which ones dim the cancer’s lights.</p>` },

    { k: 'h', text: 'The whole study on one page' },
    { k: 'svg', caption: 'The study in six stages. The small print under each title is the paper’s own name for that stage.',
      svg: `<svg viewBox="0 0 480 378" role="img" aria-label="The study as six stages from top to bottom: a library of guides, put it into lung cancer cells, run three screens, combine the evidence, test the best with ASOs, and how the two winners work"><rect x="54" y="8" width="420" height="52" rx="10" class="f-blue"/><circle cx="26" cy="34" r="16" class="f-blue"/><text x="26" y="40" class="mid b">1</text><text x="68" y="31" class="b">A library of guides</text><text x="68" y="50" class="s m">Paper: library design · 10 guide pairs per target</text><path d="M26 53 V68" class="arrow"/><rect x="54" y="70" width="420" height="52" rx="10" class="f-teal"/><circle cx="26" cy="96" r="16" class="f-teal"/><text x="26" y="102" class="mid b">2</text><text x="68" y="93" class="b">Put it into lung cancer cells</text><text x="68" y="112" class="s m">Paper: transduction · A549 and H460 cells</text><path d="M26 115 V130" class="arrow"/><rect x="54" y="132" width="420" height="52" rx="10" class="f-green"/><circle cx="26" cy="158" r="16" class="f-green"/><text x="26" y="164" class="mid b">3</text><text x="68" y="155" class="b">Run three screens</text><text x="68" y="174" class="s m">Paper: proliferation · cisplatin · migration</text><path d="M26 177 V192" class="arrow"/><rect x="54" y="194" width="420" height="52" rx="10" class="f-orange"/><circle cx="26" cy="220" r="16" class="f-orange"/><text x="26" y="226" class="mid b">4</text><text x="68" y="217" class="b">Combine the evidence</text><text x="68" y="236" class="s m">Paper: multi-hallmark integration → 80 hits</text><path d="M26 239 V254" class="arrow"/><rect x="54" y="256" width="420" height="52" rx="10" class="f-purple"/><circle cx="26" cy="282" r="16" class="f-purple"/><text x="26" y="288" class="mid b">5</text><text x="68" y="279" class="b">Test the best with ASOs</text><text x="68" y="298" class="s m">Paper: RNA therapeutics · 9 → 5 → 2</text><path d="M26 301 V316" class="arrow"/><rect x="54" y="318" width="420" height="52" rx="10" class="f-red"/><circle cx="26" cy="344" r="16" class="f-red"/><text x="26" y="350" class="mid b">6</text><text x="68" y="341" class="b">How do the two winners work?</text><text x="68" y="360" class="s m">Paper: CHiLL1 vs GCAWKR, distinct modes of action</text></svg>` },
    { k: 'plain', source: ['res-pipeline-p1', 'res-pipeline-p2', 'res-pipeline-p4'], html:
      `<p><b>A library of guides.</b> The team chose <b>831</b> lncRNAs that are detected in lung cancer cells. To switch one off, they use <b>CRISPR</b>, a tool that works like molecular scissors, to cut out the spot where the cell starts copying that lncRNA’s gene. Short <b>guide</b> molecules, used in pairs, steer the scissors to the right place. Each target got ten guide pairs, about 12,000 in all. A big collection like this is called a <b>library</b>.</p>` },
    { k: 'plain', source: ['res-pipeline-p5'], html:
      `<p><b>Put it into lung cancer cells.</b> They delivered the library into two types of lung cancer cells grown in the lab, called <b>A549</b> and <b>H460</b>. Two cell types show whether a result holds beyond one kind of cell.</p>` },
    { k: 'bgnd', html:
      `<p>The guides travel into the cells inside disarmed viruses, which the paper calls a <b>lentiviral</b> pool; the delivery step is called <b>transduction</b>. In a pooled experiment like this, the guides are mixed and delivered so that most cells receive just one guide pair. Each cell then loses just one lncRNA, and thousands of different cells grow side by side in the same culture.</p>` },
    { k: 'plain', source: ['intro-p6', 'res-multipheno-p1', 'res-multipheno-p2', 'res-multipheno-p7'], html:
      `<p><b>Run three screens.</b> A <b>screen</b> is a big test of many things at once. Each one asks about an ability that helps cancer cells (the paper calls such abilities <b>hallmarks</b>). Do cells that lost this lncRNA multiply (<b>proliferate</b>) more slowly? Are they hurt more by <b>cisplatin</b>, a standard cell-killing cancer drug? Do they <b>migrate</b> (crawl from place to place) less? At the end the team counts which guides became rarer or commoner; the lncRNAs behind them are the suspects. The paper reports eight screens in all.</p>` },
    { k: 'plain', source: ['res-integration-p1', 'res-integration-p2', 'res-integration-p3'], html:
      `<p><b>Combine the evidence.</b> The team merged all the screens into one ranking. It was better than single screens at telling known cancer-helping genes from neutral spots. The lncRNAs that stand out are called <b>hits</b>: <b>80</b> of them, about 8% of those screened, and 73 had not been linked to NSCLC before. Hits from a single screen often worked in only one cell type; the combined hits tended to be active in both.</p>` },
    { k: 'plain', source: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3'], html:
      `<p><b>Test the best with ASOs.</b> Next, the authors tried to switch off hit lncRNAs the way a medicine could. <b>ASOs</b> (antisense oligonucleotides) are short man-made strands that stick to one chosen RNA and lower its amount, a so-called <b>knockdown</b>. The paper counts them among <b>RNA therapeutics</b>: medicines that act on RNA. They tested nine hits. Five slowed cancer-cell growth with two different ASOs. Two of the five, which the authors named <b>CHiLL1</b> and <b>GCAWKR</b>, had a weaker effect on normal lung cells.</p>` },
    { k: 'plain', source: ['res-aso-p6', 'res-aso-p7', 'res-aso-p8'], html:
      `<p>The two were then pushed further. Their ASOs reduced the number of living cells in ball-shaped cell clusters (<b>spheroids</b>), and CHiLL1’s ASOs did so in <b>organoids</b> too: mini-tumors grown in the lab from a patient’s tumor cells. A mix of the two ASOs worked better than either alone at the same total dose.</p>` },
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
    { ref: 'fig1A', note: 'The pipeline as the authors draw it: library design, lentiviral pool, transduction, three cancer abilities.' },
    { ref: 'res-aso-p3', note: 'The funnel ends with CHiLL1 and GCAWKR.' },
  ],
  checks: [
    { q: 'Two tools appear in the story: CRISPR guides and ASOs. Which description is right?',
      options: [
        { t: 'CRISPR cuts out the start of each lncRNA’s gene in the screens; ASOs lower a chosen RNA in the follow-up tests', ok: true, why: 'Right: CRISPR guides are used in the big screens, ASOs in the later tests of the best hits.' },
        { t: 'ASOs cut out the start of the gene in the screens; CRISPR lowers the RNA afterward', ok: false, why: 'This swaps the two tools. ASOs do not cut out the start of a gene; they stick to an RNA and lower its amount.' },
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
        { t: 'CHiLL1 sits mainly in the cytoplasm and GCAWKR in the nucleus, and they change largely different sets of genes', ok: true, why: 'Right: the paper stresses their contrasting locations and non-overlapping gene networks.' },
        { t: 'Both sit in the nucleus and change the same genes', ok: false, why: 'The authors call it surprising that, despite similar roles in cancer, the two sit in different places and act through different gene networks.' },
        { t: 'CHiLL1 sits in the nucleus and GCAWKR in the cytoplasm', ok: false, why: 'This reverses the paper: CHiLL1 is found mainly in the cytoplasm, GCAWKR in the nucleus.' },
      ], source: ['res-mechanism-p1', 'res-mechanism-p8'] },
  ],
}

);

/* ============================================================================================== A2 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'A2',
  defines: ['tpp', 'fdr', 'aso-cocktail', 'candidate'],
  body: [
    { k: 'h', text: 'The funnel at a glance' },
    { k: 'plain', source: ['summary-p1', 'res-pipeline-p2', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3'], html:
      `<p>The whole study can be read as five numbers: <b>831 → 80 → 9 → 5 → 2</b>. Each arrow is one filter, and each filter asks a different question. The authors shortened their list from 831 lncRNAs to 80 hits, then to nine, five and finally two lncRNAs: <b>CHiLL1</b> and <b>GCAWKR</b>. The paper calls every lncRNA target it is considering a <b>candidate</b> and gives each one a number (lesson A3 meets the numbers and names).</p>` },
    { k: 'svg', caption: 'The funnel, not to scale. Each level keeps only the lncRNAs that pass one more question.',
      svg: `<svg viewBox="0 0 480 360" role="img" aria-label="A funnel with five levels, from 831 lncRNAs at the top to 80 hits, 9, 5 and finally 2 at the bottom, each with the question that level asked"><path d="M15 8 H169 L158 72 H26 Z" class="f-blue"/><text x="92" y="48" class="mid b xl">831</text><text x="186" y="28" class="b">831 lncRNAs in the library</text><text x="186" y="46" class="s m">Q: Which do the cancer cells need</text><text x="186" y="62" class="s m">for growth, drug survival or movement?</text><path d="M28 78 H156 L145 142 H39 Z" class="f-teal"/><text x="92" y="118" class="mid b xl">80</text><text x="186" y="98" class="b">80 hits (pan-hallmark)</text><text x="186" y="116" class="s m">Q: Which score best when all the</text><text x="186" y="132" class="s m">screens are combined?</text><path d="M41 148 H143 L132 212 H52 Z" class="f-green"/><text x="92" y="188" class="mid b xl">9</text><text x="186" y="168" class="b">9 picked by hand (Tier 1)</text><text x="186" y="186" class="s m">Q: Which top hits are novel and show</text><text x="186" y="202" class="s m">no sign of a protein recipe?</text><path d="M54 218 H130 L119 282 H65 Z" class="f-orange"/><text x="92" y="258" class="mid b xl">5</text><text x="186" y="238" class="b">5 reproducible (Tier 2)</text><text x="186" y="256" class="s m">Q: Do two different ASOs both slow</text><text x="186" y="272" class="s m">the cancer cells’ growth?</text><path d="M67 288 H117 L106 352 H78 Z" class="f-red"/><text x="92" y="328" class="mid b xl">2</text><text x="186" y="308" class="b">2 finalists (Tier 3)</text><text x="186" y="326" class="s m">Q: Is the effect weaker in normal</text><text x="186" y="342" class="s m">lung cells? CHiLL1 and GCAWKR</text></svg>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a talent show. Hundreds of contestants audition and the scores from every round are added up (the 80 who go through). The organizers hand-pick nine for the callbacks (Tier 1). Five survive a second audition in front of two different judges (Tier 2). Two reach the final because the home audience, the normal cells, hardly reacts to them (Tier 3).</p>` },

    { k: 'h', text: 'Step by step: what each filter asked' },
    { k: 'plain', source: ['res-pipeline-p2', 'res-integration-p1', 'res-integration-p2', 'fig4D'], html:
      `<p><b>831 → 80.</b> The library covers 831 lncRNAs (998 spots where the scissors can cut, because some lncRNAs have more than one). The screens asked whether cancer cells lose out when a lncRNA’s starting spot is removed. The paper merges all the screens into one <b>pan-hallmark</b> ranking: “pan” means “all”, so the ranking uses every screen at once. (The merging software is the target prioritization pipeline, <b>TPP</b>.) A cutoff called <b>FDR</b> below 0.2, a statistical filter against false alarms that is stricter when lower, decides what counts as a hit. The result is <b>80</b> hits, about 8% of those screened. Of these, 73 had not been linked to NSCLC before.</p>` },
    { k: 'plain', source: ['res-aso-p1', 'res-integration-p2'], html:
      `<p><b>80 → 9 (Tier 1).</b> From the top-ranked hits, the authors picked nine by hand. Their criteria, in the paper’s words, were novelty and lack of evidence that the lncRNA carries a protein recipe. These nine are <b>Tier 1</b>. For each of them, the team found at least two different ASOs that lowered the lncRNA’s amount by at least 40%.</p>` },
    { k: 'plain', source: ['res-aso-p2', 'res-aso-p1'], html:
      `<p><b>9 → 5 (Tier 2).</b> Next, the ASOs were tested on cancer cells. For five of the nine, two different ASO sequences both caused a reproducible loss of cell proliferation. When two different ASOs agree, the effect is probably caused by the target lncRNA and not by a quirk of one ASO. These five are <b>Tier 2</b>. The result held in two other lung cancer cell types, and the Tier 2 lncRNAs were also more active in tumors than in normal samples, although the authors had not used that to choose them.</p>` },
    { k: 'plain', source: ['res-aso-p3', 'res-aso-p2'], html:
      `<p><b>5 → 2 (Tier 3).</b> The ASOs were then tried on normal lung cells, to see whether healthy cells are affected less. The response was weaker or absent, especially for two of the five: candidate 42, renamed <b>CHiLL1</b>, and candidate 240, called <b>GCAWKR</b>. These two are <b>Tier 3</b>. The authors add that both look unlikely to carry a protein recipe.</p>` },

    { k: 'h', text: 'Why the labels matter later' },
    { k: 'plain', source: ['res-aso-p8', 'res-aso-p9'], html:
      `<p>The paper keeps using these labels. A <b>cocktail</b> is a mix of ASOs used at the same total dose as a single ASO. The “Tier 3 cocktail” is a 50:50 mix of the CHiLL1 and GCAWKR ASOs, and the “Tier 2 cocktail” mixes five ASOs, one for each Tier 2 lncRNA. Both mixes worked better than a single ASO at an equal dose. In a public dataset of patients’ tumors, 78% of the tumors make at least one of CHiLL1 and GCAWKR, and 92% make at least one of the Tier 2 lncRNAs.</p>` },
    { k: 'flag', source: ['res-aso-p1', 'res-integration-p2'], html:
      `<p>The funnel is the paper’s story drawn as a straight line. The paper says the nine Tier 1 lncRNAs were picked “from top-ranked hits”; it does not say that all nine are among the 80 pan-hallmark hits.</p>` },
    { k: 'flag', source: ['summary-p1', 'res-aso-p3'], html:
      `<p>CHiLL1 is spelled out as “Cancer Hallmark in Lung LncRNA 1” in the Results but “Cancer Hallmarks in Lung LncRNA 1” in the Summary. Both mean the same lncRNA. The paper gives no long form for GCAWKR.</p>` },
    { k: 'flag', source: ['res-integration-p2', 'res-pipeline-p2'], derived: ['9.6', '13.4'], html:
      `<p>The paper says the 80 hits are “∼8% of those screened”. Dividing 80 by the 998 cutting spots gives 8.0%, whereas 80 out of the 831 lncRNAs would be about 9.6% (my own arithmetic). So the paper’s percentage seems to count cutting spots, not lncRNAs, although it does not say so. Its other percentage fits the same way: 134 hits as ∼13%, and 134 out of 998 is 13.4%.</p>` },
  ],
  appears: [
    { ref: 'summary-p1', note: 'The summary names the start (831 lncRNAs), the 80 high-confidence hits and the final two.' },
    { ref: 'res-integration-p2', note: 'The 80 pan-hallmark hits (FDR < 0.2, about 8% of those screened).' },
    { ref: 'res-aso-p1', note: 'Tier 1: nine lncRNAs picked by hand from the top-ranked hits.' },
    { ref: 'res-aso-p3', note: 'Tier 3: CHiLL1 (candidate 42) and GCAWKR (candidate 240) after the normal-cell check.' },
    { ref: 'res-aso-p9', note: 'The Tier 3 and Tier 2 cocktails reach 78% and 92% of the tumors in the patient dataset.' },
  ],
  checks: [
    { q: 'In the funnel 831 → 80 → 9 → 5 → 2, what does the number 9 stand for?',
      options: [
        { t: 'The Tier 1 lncRNAs: top-ranked hits the authors picked by hand for ASO tests', ok: true, why: 'Right: nine lncRNAs, chosen for novelty and for lack of evidence that they carry a protein recipe, form Tier 1.' },
        { t: 'The hits that passed the FDR cutoff in the combined ranking', ok: false, why: 'Those are the 80 hits. The nine come after them, as a hand-picked subset of the top-ranked hits.' },
        { t: 'The lncRNAs that normal lung cells tolerate best', ok: false, why: 'That is the last filter, which leaves two lncRNAs (Tier 3), not nine.' },
      ], source: ['summary-p1', 'res-aso-p1', 'res-aso-p2', 'res-integration-p2'] },
    { q: 'What separates Tier 2 (five lncRNAs) from Tier 1 (nine)?',
      options: [
        { t: 'For the five, two different ASO sequences both caused a reproducible loss of cancer-cell proliferation', ok: true, why: 'Right: agreement between two independent ASOs is the Tier 2 filter and points to an effect caused by the target lncRNA.' },
        { t: 'The five were the lncRNAs found in the most patients’ tumors', ok: false, why: 'The paper notes that Tier 2 lncRNAs are more active in tumors, but says this was not a selection criterion.' },
        { t: 'Only the five had ASOs that lowered the lncRNA by at least 40%', ok: false, why: 'All nine Tier 1 lncRNAs already had at least two independent ASOs with at least 40% knockdown.' },
      ], source: ['res-aso-p1', 'res-aso-p2'] },
    { q: 'Why did the authors narrow the five Tier 2 lncRNAs down to CHiLL1 and GCAWKR?',
      options: [
        { t: 'Normal lung cells responded weakly or not at all to ASOs against these two, a hint of less harm to healthy cells', ok: true, why: 'Right: “diminished or absent response” in normal cells, particularly for these two, led to Tier 3.' },
        { t: 'They were the only Tier 2 lncRNAs whose ASOs slowed cancer-cell growth', ok: false, why: 'All five slowed growth with two ASOs; that is how they became Tier 2.' },
        { t: 'They were the only two that are more active in tumors than in normal samples', ok: false, why: 'The paper says Tier 2 lncRNAs in general are more active in tumors, and that this was not used to choose them.' },
      ], source: ['res-aso-p2', 'res-aso-p3'] },
    { q: 'What does “pan-hallmark” mean in this paper?',
      options: [
        { t: 'One ranking that combines the evidence of all the screens', ok: true, why: 'Right: the paper runs its merging method on all screens for a pan-hallmark ranking, or on one hallmark at a time for hallmark-specific ones.' },
        { t: 'Hits that scored in all three hallmarks', ok: false, why: 'Among the paper’s hallmark-specific hits, 19 were found in two hallmarks and none in three. The pan-hallmark ranking does not require a hit in every hallmark; it combines everything.' },
        { t: 'A ranking from the growth screen alone', ok: false, why: 'A single screen is a one-hallmark view. “Pan” means all, so the ranking uses every screen.' },
      ], source: ['res-integration-p1', 'res-integration-p2'] },
  ],
});

/* ============================================================================================== A3 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'A3',
  defines: ['toxicity', 'glycolysis'],
  body: [
    { k: 'h', text: 'Why this study matters' },
    { k: 'plain', source: ['intro-p1', 'intro-p2'], html:
      `<p><b>Lung cancer needs better options.</b> NSCLC is the leading cause of cancer deaths worldwide. Its most common kind, with the changed KRAS gene, is routinely treated with cell-killing platinum drugs, and newly approved targeted medicines extend life by only a few months. <b>lncRNAs are a huge unexplored hunting ground.</b> There are probably more than 100,000 of them and over 98% are uncharacterised, which the authors call “a fertile source” of new targets. In two other cancers, melanoma and glioma, tumor cells were strongly and specifically sensitive to ASOs against certain lncRNAs.</p>` },
    { k: 'plain', source: ['intro-p6', 'discussion-p5', 'res-aso-p9', 'res-aso-p10'], html:
      `<p><b>ASOs could become low-harm medicines.</b> The authors say the lncRNAs they found can be targeted by potent ASOs of low <b>toxicity</b> (toxicity means harm to healthy cells). They point to the weaker ASO effects in normal lung cells as a sign of this. They hope it allows higher doses and mixes of drugs. They also find that 78% of the tumors in a public patient dataset make at least one of CHiLL1 and GCAWKR, and 92% at least one of the Tier 2 lncRNAs, so most patients might eventually benefit.</p>` },
    { k: 'flag', source: ['discussion-p5', 'res-aso-p9'], html:
      `<p>Keep it in proportion. The tests are in cells and organoids, and the ASOs still need refining and a way to reach tumors in a living body. The 78% and 92% count tumors that contain the RNA; the paper says these patients “might be treated”, not that anyone was.</p>` },

    { k: 'h', text: 'The cast of names' },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a sports team. The numbers are jersey numbers: every target in the library has one. Some players also have a name. A few players do one special job, and two become the stars.</p>` },
    { k: 'svg', caption: 'Where each name appears in the story. The numbers are the paper’s candidate numbers.',
      svg: `<svg viewBox="0 0 480 356" role="img" aria-label="Six rows showing where each name appears in the story: the method test, two checked hits, the migration hits, the two finalists, and clues about CHiLL1"><rect x="8" y="8" width="128" height="50" rx="10" class="f-blue"/><text x="72" y="38" class="mid b s">Method test</text><path d="M138 33 H152" class="ln thin m"/><text x="158" y="29" class="b">DNMBP-AS1</text><text x="158" y="48" class="s m">candidate 331 · known lung-cancer lncRNA</text><rect x="8" y="66" width="128" height="50" rx="10" class="f-green"/><text x="72" y="96" class="mid b s">Checked hit 1</text><path d="M138 91 H152" class="ln thin m"/><text x="158" y="87" class="b">LINC00115 + RP11-206L10.11</text><text x="158" y="106" class="s m">candidate 205 · one shared start region</text><rect x="8" y="124" width="128" height="50" rx="10" class="f-teal"/><text x="72" y="154" class="mid b s">Checked hit 2</text><path d="M138 149 H152" class="ln thin m"/><text x="158" y="145" class="b">LINC00910 (candidate 507)</text><text x="158" y="164" class="s m">next to top hit 509 and to candidate 508</text><rect x="8" y="182" width="128" height="50" rx="10" class="f-orange"/><text x="72" y="212" class="mid b s">Migration hits</text><path d="M138 207 H152" class="ln thin m"/><text x="158" y="203" class="b">AC104024.3 · CECR7 · MIR23AHG</text><text x="158" y="222" class="s m">candidate numbers 215 · 448 · 489</text><rect x="8" y="240" width="128" height="50" rx="10" class="f-red"/><text x="72" y="270" class="mid b s">Two finalists</text><path d="M138 265 H152" class="ln thin m"/><text x="158" y="261" class="b">CHiLL1 · GCAWKR</text><text x="158" y="280" class="s m">candidate numbers 42 and 240</text><rect x="8" y="298" width="128" height="50" rx="10" class="f-purple"/><text x="72" y="328" class="mid b s">CHiLL1 clues</text><path d="M138 323 H152" class="ln thin m"/><text x="158" y="319" class="b">TNFRSF10B · ZBTB7A</text><text x="158" y="338" class="s m">its neighbor · a gene-control protein</text></svg>` },
    { k: 'plain', source: ['res-pipeline-p2', 'res-pipeline-p5', 'res-validation-p2'], html:
      `<p><b>Candidate numbers.</b> The paper calls the library targets “candidate 1” and so on. A target that is a known lncRNA gene also has a name, like candidate 331, DNMBP-AS1. One number can even cover two lncRNAs that start from the same spot, as for candidate 205.</p>` },
    { k: 'plain', source: ['res-pipeline-p5'], html:
      `<p><b>DNMBP-AS1 (candidate 331), the test case.</b> This lncRNA was already known to promote NSCLC. The authors used it to check the method before the big screens: their guides removed its starting region, and its RNA level fell.</p>` },
    { k: 'plain', source: ['res-validation-p1', 'res-validation-p2', 'res-validation-p4'], html:
      `<p><b>LINC00115 and RP11-206L10.11 (candidate 205).</b> Two lncRNA genes start side by side here and face opposite ways, so one cut hits both. Candidate 205 was a top hit in the growth screens. To tell the two genes apart, the authors used separate ASOs: only LINC00115’s ASOs slowed cell growth, so LINC00115, not RP11-206L10.11, drives growth through its RNA. Earlier reports already link LINC00115 to lung cancer growth and movement and to other cancers.</p>` },
    { k: 'plain', source: ['res-validation-p1', 'res-validation-p2', 'res-validation-p3', 'res-multipheno-p4'], html:
      `<p><b>Candidate 509 and LINC00910 (candidate 507).</b> Candidate 509 sits at a starting region shared by several lncRNAs and was a top hit in both the growth and cisplatin screens. In a head-to-head test, cells with the 205 or 509 guides lost out to control cells, and the 509 guides also made cells more sensitive to cisplatin. The same region holds two more hits, candidate 507 (LINC00910) and candidate 508, which the authors say supports its importance. The paper also lists LINC00910 among lncRNAs identified in other cancer types.</p>` },
    { k: 'plain', source: ['res-validation-p5', 'fig5B', 'res-aso-p2'], html:
      `<p><b>AC104024.3, CECR7 and MIR23AHG (candidate numbers 215, 448, 489).</b> These are hits from the tests of how well cells migrate. ASOs against each of them caused a dramatic impairment of migration in A549 cells. Figure 5B’s legend lists four Tier 2 lncRNAs and adds that no data were available for candidate 215, the fifth, so AC104024.3 is a Tier 2 lncRNA too.</p>` },
    { k: 'plain', source: ['res-aso-p3', 'res-aso-p4'], html:
      `<p><b>TNFRSF10B, CHiLL1’s neighbor.</b> TNFRSF10B is a gene that carries a protein recipe and sits right next to CHiLL1; it had been linked to NSCLC before. The authors found no evidence that the two are copied together into one long RNA. They also raise the possibility of a local effect of CHiLL1 on neighboring genes, but say they did not see such an effect for TNFRSF10B.</p>` },
    { k: 'plain', source: ['res-mechanism-p4'], html:
      `<p><b>ZBTB7A, a clue about CHiLL1.</b> After CHiLL1 was switched down, many genes changed. Among them, the places where certain gene-controlling proteins attach were over-represented, including those of ZBTB7A (in both A549 and H460 cells). ZBTB7A has been reported to both promote and restrain cancer and to affect <b>apoptosis</b> and <b>glycolysis</b> (a way cells break down sugar for energy). It is a hint about how CHiLL1 works, not a proof.</p>` },
    { k: 'flag', source: ['res-validation-p2', 'res-validation-p4', 'limitations-p1', 'fig5B'], html:
      `<p>The paper often writes “candidate 205 (LINC00115)” as if one number meant one gene. But candidate 205 covers two genes, and only the ASO tests singled out LINC00115. The authors say so themselves: cutting out the region left it ambiguous which of the two overlapping genes was responsible.</p>` },
  ],
  appears: [
    { ref: 'res-validation-p2', note: 'Candidate 205 (LINC00115 and RP11-206L10.11) and candidate 509 (with 507 = LINC00910).' },
    { ref: 'res-validation-p5', note: 'The three migration hits tested with ASOs: AC104024.3, CECR7 and MIR23AHG.' },
    { ref: 'res-pipeline-p5', note: 'DNMBP-AS1 (candidate 331) is the test case for the deletion method.' },
    { ref: 'fig3A', note: 'Gene maps of the candidate 205 and candidate 509 regions.' },
    { ref: 'fig5B', note: 'The legend names four of the five Tier 2 lncRNAs by candidate number.' },
  ],
  checks: [
    { q: 'Candidate 205 covers two lncRNA genes that start from the same spot. How did the authors find out which one drives cell growth?',
      options: [
        { t: 'They used separate ASOs against each gene; only the LINC00115 ASOs slowed cell growth', ok: true, why: 'Right: cutting out the shared start hits both genes, but gene-specific ASOs can single one out.' },
        { t: 'They made a new cut that removed only LINC00115', ok: false, why: 'The two genes share their start region, so a cut there cannot remove one without the other. That is why ASOs were needed.' },
        { t: 'They compared growth in A549 and H460 cells', ok: false, why: 'Comparing two cell types tests whether a result holds in both, not which of two overlapping genes is responsible.' },
      ], source: ['res-validation-p2', 'res-validation-p4'] },
    { q: 'Why was DNMBP-AS1 (candidate 331) used early in the paper?',
      options: [
        { t: 'It is a known NSCLC-promoting lncRNA, so it could show that the method really removes its target region and lowers its RNA', ok: true, why: 'Right: it served as a test case for the cutting method.' },
        { t: 'It was the top hit when cells were tested for migration', ok: false, why: 'The paper uses it to test the method. The migration hits it checked with ASOs are candidate numbers 215, 448 and 489.' },
        { t: 'It is one of the two final lncRNAs', ok: false, why: 'The two final lncRNAs are CHiLL1 (candidate 42) and GCAWKR (candidate 240).' },
      ], source: ['res-pipeline-p5', 'res-validation-p5', 'res-aso-p3'] },
    { q: 'Which three names are the migration hits tested with ASOs?',
      options: [
        { t: 'AC104024.3, CECR7 and MIR23AHG', ok: true, why: 'Right: candidate numbers 215, 448 and 489, whose ASOs caused a dramatic impairment of A549 migration.' },
        { t: 'LINC00115, LINC00910 and RP11-206L10.11', ok: false, why: 'These come from the growth and cisplatin follow-up: LINC00115 and RP11-206L10.11 are the two genes of candidate 205, and LINC00910 is candidate 507.' },
        { t: 'TNFRSF10B, ZBTB7A and DNMBP-AS1', ok: false, why: 'TNFRSF10B and ZBTB7A come up around CHiLL1, and DNMBP-AS1 is the test case for the method.' },
      ], source: ['res-validation-p5', 'res-validation-p2'] },
    { q: 'What does the paper say about how ready ASO medicines against CHiLL1 or GCAWKR are?',
      options: [
        { t: 'They are promising targets from lab work; refining the ASOs and delivering them in a living body still need work', ok: true, why: 'Right: the authors say future efforts must refine ASO sequences and chemistry and deliver them effectively in a living body.' },
        { t: 'They have already been tested in patients with NSCLC', ok: false, why: 'No patients were treated. The tests were in cells and organoids, and tumor data only showed that the RNAs are present.' },
        { t: 'They are approved and ready for use', ok: false, why: 'The paper calls them a promising foundation for future therapeutics, not an approved treatment.' },
      ], source: ['discussion-p1', 'discussion-p5'] },
  ],
});

/* ============================================================================================== B1 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'B1',
  defines: ['dna', 'rna', 'knockdown', 'aso', 'lncrna', 'protein'],
  body: [
    { k: 'h', text: 'Cells and their two main rooms' },
    { k: 'bgnd', html:
      `<p>A <b>cell</b> is the smallest unit of life: a tiny package, wrapped in a thin skin, that takes in food, uses energy and can copy itself. Your body has many kinds of cells (lung, skin, nerve …). A group of similar cells that do one job together is a <b>tissue</b>, for example lung tissue.</p>` +
      `<p>Inside a human cell there are two main regions. The <b>nucleus</b> is the control room: it holds the cell’s <b>DNA</b>, its long instruction book (you meet DNA properly in the next lesson). Everything else inside the skin is the <b>cytoplasm</b>, the workshop floor where most of the work happens. Copies of single instructions, called <b>RNA</b>, are made in the nucleus and sent out into the cytoplasm.</p>` },
    { k: 'svg', caption: 'A cell: the nucleus holds the DNA, the cytoplasm is the rest of the inside, and RNA copies travel from one to the other.',
      svg: `<svg viewBox="0 0 480 240" role="img" aria-label="A cell drawn as a large oval. Inside it a smaller oval is the nucleus, which holds the DNA. The rest of the inside is the cytoplasm, where small machines sit. An arrow shows RNA copies leaving the nucleus into the cytoplasm"><ellipse cx="240" cy="124" rx="228" ry="104" class="f-gray"/><text x="8" y="16" class="s m">outer skin (membrane)</text><path d="M44 22 L54 66" class="ln thin m"/><ellipse cx="156" cy="124" rx="96" ry="72" class="f-blue"/><text x="156" y="88" class="mid b">Nucleus</text><text x="156" y="106" class="mid s m">holds the DNA</text><path d="M100 136 C118 118 134 154 152 136 S188 118 206 136" class="ln thick s-blue"/><text x="156" y="166" class="mid s">DNA</text><text x="376" y="76" class="mid b">Cytoplasm</text><text x="376" y="94" class="mid s m">the rest of the inside:</text><text x="376" y="110" class="mid s m">most of the work</text><text x="376" y="126" class="mid s m">happens here</text><circle cx="352" cy="206" r="8" class="f-orange"/><circle cx="420" cy="176" r="8" class="f-orange"/><circle cx="440" cy="138" r="8" class="f-orange"/><path d="M230 112 C258 102 290 114 312 146" class="arrow s-orange"/><text x="318" y="176" class="mid s t-orange b">RNA copies travel out</text></svg>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a small factory. The nucleus is the office with the master blueprints; the cytoplasm is the workshop floor where the machines run. Copies of single blueprints are carried out to the floor, while the master set stays in the office. (Where it breaks down: the cytoplasm is a crowded, jelly-like fluid, not an empty floor.)</p>` },

    { k: 'h', text: 'The cell cycle: how one cell becomes two' },
    { k: 'bgnd', html:
      `<p>To <b>proliferate</b> (increase in number), a cell has to copy its DNA and then split in two. It does this in a repeating series of steps called the <b>cell cycle</b>:</p>` +
      `<ul><li><b>G1 phase</b>: the cell grows and does its normal work.</li><li><b>S phase</b>: it copies all of its DNA (S stands for synthesis).</li><li><b>G2 phase</b>: it checks the copy and gets ready to divide.</li><li><b>M phase</b> (<b>mitosis</b>): the copied DNA is pulled into two equal sets and the cell splits into two cells.</li></ul>` +
      `<p>(G stands for “gap”.) Between the steps are <b>checkpoints</b>: quality-control stops where the cell is checked and can be halted. For example, the G2–M checkpoint makes sure the DNA copy is complete and undamaged before the cell may divide. A cell in G2 holds twice as much DNA as a cell in G1, so a dye that stains DNA can sort cells into phases (lesson D8).</p>` },
    { k: 'svg', caption: 'The cell cycle is a loop. One lap turns one cell into two. Not to scale: the real lengths of the phases differ between cell types.',
      svg: `<svg viewBox="0 0 480 300" role="img" aria-label="The cell cycle drawn as a ring with four parts in clockwise order: G1 growth, S copying the DNA, G2 checking the copy, and M dividing into two cells. A checkpoint gate sits between G2 and M"><path d="M150 64 A100 100 0 0 1 200 250.6 L177 210.8 A54 54 0 0 0 150 110 Z" class="f-blue"/><text x="224.4" y="149.1" class="mid b">G1</text><path d="M200 250.6 A100 100 0 0 1 53.4 189.9 L97.8 178 A54 54 0 0 0 177 210.8 Z" class="f-green"/><text x="120.5" y="240.1" class="mid b">S</text><path d="M53.4 189.9 A100 100 0 0 1 92.6 82.1 L119 119.8 A54 54 0 0 0 97.8 178 Z" class="f-orange"/><text x="77.6" y="142.7" class="mid b">G2</text><path d="M92.6 82.1 A100 100 0 0 1 150 64 L150 110 A54 54 0 0 0 119 119.8 Z" class="f-red"/><text x="126.8" y="95.6" class="mid b">M</text><path d="M123.6 126.3 L86.9 73.9" class="ln thick s-red"/><text x="8" y="40" class="s b t-red">checkpoint</text><path d="M62 44 L84.9 70.9" class="ln thin m"/><path d="M189 56.9 A114 114 0 0 1 248.7 107" class="arrow"/><text x="150" y="160" class="mid s">one lap</text><text x="150" y="177" class="mid s">1 → 2 cells</text><rect x="290" y="30" width="22" height="22" rx="5" class="f-blue"/><text x="322" y="42" class="b">G1 · grow</text><text x="322" y="60" class="s m">does its normal work</text><rect x="290" y="80" width="22" height="22" rx="5" class="f-green"/><text x="322" y="92" class="b">S · copy</text><text x="322" y="110" class="s m">copies all its DNA</text><rect x="290" y="130" width="22" height="22" rx="5" class="f-orange"/><text x="322" y="142" class="b">G2 · check</text><text x="322" y="160" class="s m">proofreads the copy</text><rect x="290" y="180" width="22" height="22" rx="5" class="f-red"/><text x="322" y="192" class="b">M · divide</text><text x="322" y="210" class="s m">splits into two cells</text><path d="M301 236 V256" class="ln thick s-red" /><text x="322" y="246" class="b t-red">checkpoint</text><text x="322" y="264" class="s m">a quality-control stop;</text><text x="322" y="280" class="s m">this one is just before M</text></svg>` },
    { k: 'memory', html:
      `<p><b>Memory aid:</b> G1 = <b>G</b>row · S = <b>S</b>elf-copy · G2 = <b>G</b>et ready · M = <b>M</b>ake two. A checkpoint is the security check before boarding: no pass, no flight.</p>` },

    { k: 'h', text: 'Doubling time: how fast a population grows' },
    { k: 'bgnd', html:
      `<p>When cells keep dividing steadily, their number doubles after a fixed time, the <b>doubling time</b>. A shorter doubling time means faster growth. If every cell divides once per lap of the cycle, one lap takes about one doubling time. In a real dish some cells stall or die, so it is a measured average, used for example to choose how much drug to add.</p>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up numbers).</b> Start with 1,000 cells and a doubling time of 24 hours. After 24 h there are 2,000 cells, after 48 h 4,000, after 72 h 8,000. After ten doublings (10 days) you would have about a million cells (1,000 × 1,024).</p>` },

    { k: 'h', text: 'Two ways a cell can die' },
    { k: 'bgnd', html:
      `<p><b>Apoptosis</b> is programmed cell death: a tidy, built-in self-destruct program. The cell shrinks and packs itself up, and its neighbors clean up the pieces, usually without inflammation. The body uses it to remove cells that are damaged, dangerous or no longer needed, and cancer cells often switch it off. A cell that has just started the program is called <i>early apoptotic</i>.</p>` +
      `<p><b>Necrosis</b> is the messy kind of death. After a serious injury, such as a poison or a lack of oxygen, the cell loses control of its skin, swells and bursts, and the spilled contents can inflame the neighborhood. Apoptosis is planned; necrosis is an accident.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> apoptosis is a controlled demolition: the building comes down in an orderly way and the debris is hauled away. Necrosis is a building collapsing in an earthquake: sudden, messy, and damaging to the neighbors.</p>` },

    { k: 'h', text: 'How this paper uses these ideas' },
    { k: 'paper', ref: 'res-mechanism-p1', quote: 'CHiLL1 is located principally in the cytoplasm, and GCAWKR in the nucleus' },
    { k: 'plain', source: ['res-mechanism-p1'], html:
      `<p>With a microscope technique that makes single RNAs glow, the authors saw CHiLL1 mainly in the cytoplasm and GCAWKR mainly in the nucleus. A second test, which separates a cell’s nuclear and cytoplasmic parts, agreed. Where an RNA sits is a clue to what it does.</p>` },
    { k: 'paper', ref: 'res-mechanism-p6', quote: 'knockdown of GCAWKR, but not CHiLL1, led to an increase of cells in the G2 phase' },
    { k: 'plain', source: ['res-mechanism-p6'], html:
      `<p>GCAWKR and CHiLL1 are the two finalist <b>lncRNAs</b> from lesson A2: RNAs that carry no recipe for a <b>protein</b>, one of the cell’s tiny machines. A <b>knockdown</b> lowers the amount of one RNA, here with an <b>ASO</b>, a short strand that sticks to it. After the GCAWKR knockdown, more cells were found in the G2 phase, after DNA copying and before division. The authors had first noticed that genes tied to the “G2-M checkpoint” changed. The CHiLL1 knockdown did not do this.</p>` },
    { k: 'paper', ref: 'res-mechanism-p5', quote: 'knockdown of CHiLL1, but not GCAWKR, resulted in a significant increase of early apoptotic cells' },
    { k: 'plain', source: ['res-mechanism-p5'], html:
      `<p>The opposite pattern appears for cell death: the CHiLL1 knockdown, but not the GCAWKR knockdown, raised the number of early apoptotic cells, cells that had just started the self-destruct program.</p>` },
    { k: 'paper', ref: 'm-screen-cisplatin-p1', quote: 'Optimal cisplatin working concentrations were established via dose-response and cell doubling time' },
    { k: 'plain', source: ['m-screen-cisplatin-p1'], html:
      `<p>To choose how much of the drug cisplatin to use, the authors measured how fast the cells double and how the cells respond to different amounts of the drug.</p>` },
    { k: 'flag', source: ['m-apoptosis-p1'], html:
      `<p>The paper never uses the word necrosis. Its cell-death test is described as detecting “early apoptotic and dead cells”, so you will meet “apoptotic” and “dead” in the paper, not “necrotic”.</p>` },
  ],
  appears: [
    { ref: 'res-mechanism-p1', note: 'CHiLL1 sits mainly in the cytoplasm and GCAWKR in the nucleus.' },
    { ref: 'res-mechanism-p5', note: 'CHiLL1 knockdown, but not GCAWKR knockdown, raises early apoptotic cells.' },
    { ref: 'res-mechanism-p6', note: 'GCAWKR knockdown raises the number of cells in the G2 phase; “G2-M checkpoint” genes change.' },
    { ref: 'm-screen-cisplatin-p1', note: 'Cell doubling time is used to choose the cisplatin concentrations.' },
    { ref: 'fig6B', note: 'Microscope images showing where CHiLL1 and GCAWKR sit in the cell.' },
  ],
  checks: [
    { q: 'In which phase of the cell cycle does a cell copy its DNA?',
      options: [
        { t: 'S phase', ok: true, why: 'Right: S stands for synthesis, the making of a second copy of all the DNA.' },
        { t: 'G1 phase', ok: false, why: 'In G1 the cell grows and does its normal work. Its DNA has not been copied yet.' },
        { t: 'G2 phase', ok: false, why: 'In G2 the copy is already finished; the cell checks it and gets ready to divide.' },
        { t: 'M phase', ok: false, why: 'In M phase (mitosis) the finished copies are pulled apart into two sets and the cell splits.' },
      ], bg: true },
    { q: 'Which statement describes apoptosis rather than necrosis?',
      options: [
        { t: 'A planned, orderly self-destruct program that usually does not inflame the neighborhood', ok: true, why: 'Right: apoptosis is programmed and tidy; the leftovers are packed away and cleaned up.' },
        { t: 'The cell swells and bursts after a poison and spills its contents', ok: false, why: 'That is necrosis: an accidental, messy death after injury.' },
        { t: 'The cell is stopped at a checkpoint so that it can repair its DNA', ok: false, why: 'A checkpoint pause is not death. The cell can resume dividing after repair, although a cell that cannot be repaired may be sent into apoptosis.' },
      ], bg: true },
    { q: 'A population of 1,000 cells has a doubling time of 24 hours. If all the cells keep dividing, about how many cells are there after 48 hours?',
      options: [
        { t: '4,000', ok: true, why: 'Right: 48 hours is two doublings, so 1,000 becomes 2,000 and then 4,000.' },
        { t: '2,000', ok: false, why: 'That is only one doubling (24 hours).' },
        { t: '3,000', ok: false, why: 'That adds 1,000 per day. Doubling multiplies the number each time instead of adding a fixed amount.' },
        { t: '48,000', ok: false, why: 'That multiplies by 48, the number of hours. The number of doublings is what counts.' },
      ], bg: true },
    { q: 'After the GCAWKR knockdown, more cells were found in the G2 phase. What does that mean?',
      options: [
        { t: 'More cells had copied their DNA but had not yet divided', ok: true, why: 'Right: G2 is the stage after DNA copying (S) and before division (M).' },
        { t: 'More cells were busy copying their DNA', ok: false, why: 'Copying happens earlier, in S phase.' },
        { t: 'More cells had started apoptosis', ok: false, why: 'The paper links an increase in early apoptotic cells to the CHiLL1 knockdown, not the GCAWKR knockdown.' },
      ], source: ['res-mechanism-p5', 'res-mechanism-p6'] },
  ],
});

/* ============================================================================================== B2 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'B2',
  defines: ['rna', 'strand', 'kilobase', 'neutral-control'],
  body: [
    { k: 'h', text: 'DNA: an instruction book in four letters' },
    { k: 'bgnd', html:
      `<p><b>DNA</b> is the long molecule in the nucleus that stores a cell’s instructions. It is a chain of small building blocks called <b>nucleotides</b>, usually just called <b>bases</b>. There are four kinds, written with the letters <b>A, C, G and T</b>. The information is in the order of the letters, like the order of letters in a book.</p>` },

    { k: 'h', text: 'Two strands and the pairing rule' },
    { k: 'bgnd', html:
      `<p>DNA is made of two chains, called <b>strands</b>, twisted around each other. The strands are held together by matching letters: <b>A pairs with T</b>, and <b>C pairs with G</b>. This is <b>complementary base pairing</b>. One matched couple is a <b>base pair (bp)</b>, which is also the unit for measuring DNA length: 1,000 bp make one <b>kilobase (kb)</b>.</p>` +
      `<p>Because of the rule, one strand predicts the other: wherever one has A, the partner has T. Cells use this to copy their DNA. Lab tools such as ASOs use the same rule to find their target <b>RNA</b>, a single-stranded working copy of a gene (it uses U where DNA uses T; lesson B4).</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a zipper. Each tooth fits only its partner, so the two sides close only where the letters match. (Where it breaks down: a zipper’s teeth are all alike, while DNA’s letters differ, and their order is the information.)</p>` },
    { k: 'svg', caption: 'Two DNA strands. Each letter on top is joined to its partner below (A with T, C with G), and the strands run in opposite directions.',
      svg: `<svg viewBox="0 0 480 244" role="img" aria-label="Two strands of DNA drawn as rows of letters. Each letter on the top strand is joined to its partner below: A with T and C with G. The top strand runs from its 5 prime end on the left to its 3 prime end on the right; the bottom strand runs the opposite way"><path d="M30 30 H430" class="arrow"/><text x="230" y="22" class="mid s">this strand runs from its 5′ end to its 3′ end</text><rect x="40" y="62" width="32" height="32" rx="6" class="f-teal"/><text x="56" y="84" class="mid b">A</text><path d="M56 98 V146" class="ln thin dash m"/><rect x="40" y="150" width="32" height="32" rx="6" class="f-teal"/><text x="56" y="172" class="mid b">T</text><rect x="84" y="62" width="32" height="32" rx="6" class="f-teal"/><text x="100" y="84" class="mid b">T</text><path d="M100 98 V146" class="ln thin dash m"/><rect x="84" y="150" width="32" height="32" rx="6" class="f-teal"/><text x="100" y="172" class="mid b">A</text><rect x="128" y="62" width="32" height="32" rx="6" class="f-orange"/><text x="144" y="84" class="mid b">G</text><path d="M144 98 V146" class="ln thin dash m"/><rect x="128" y="150" width="32" height="32" rx="6" class="f-orange"/><text x="144" y="172" class="mid b">C</text><rect x="172" y="62" width="32" height="32" rx="6" class="f-orange"/><text x="188" y="84" class="mid b">C</text><path d="M188 98 V146" class="ln thin dash m"/><rect x="172" y="150" width="32" height="32" rx="6" class="f-orange"/><text x="188" y="172" class="mid b">G</text><rect x="216" y="62" width="32" height="32" rx="6" class="f-teal"/><text x="232" y="84" class="mid b">T</text><path d="M232 98 V146" class="ln thin dash m"/><rect x="216" y="150" width="32" height="32" rx="6" class="f-teal"/><text x="232" y="172" class="mid b">A</text><rect x="260" y="62" width="32" height="32" rx="6" class="f-teal"/><text x="276" y="84" class="mid b">A</text><path d="M276 98 V146" class="ln thin dash m"/><rect x="260" y="150" width="32" height="32" rx="6" class="f-teal"/><text x="276" y="172" class="mid b">T</text><rect x="304" y="62" width="32" height="32" rx="6" class="f-orange"/><text x="320" y="84" class="mid b">C</text><path d="M320 98 V146" class="ln thin dash m"/><rect x="304" y="150" width="32" height="32" rx="6" class="f-orange"/><text x="320" y="172" class="mid b">G</text><rect x="348" y="62" width="32" height="32" rx="6" class="f-orange"/><text x="364" y="84" class="mid b">G</text><path d="M364 98 V146" class="ln thin dash m"/><rect x="348" y="150" width="32" height="32" rx="6" class="f-orange"/><text x="364" y="172" class="mid b">C</text><text x="8" y="84" class="b t-blue">5′</text><text x="392" y="84" class="b t-blue">3′</text><text x="8" y="172" class="b t-blue">3′</text><text x="392" y="172" class="b t-blue">5′</text><text x="392" y="128" class="s m">one base</text><text x="392" y="144" class="s m">pair</text><path d="M388 130 L372 118" class="arrow thin"/><path d="M430 214 H30" class="arrow"/><text x="230" y="238" class="mid s">the partner strand runs the opposite way</text></svg>` },

    { k: 'h', text: 'Direction: 5′ and 3′' },
    { k: 'bgnd', html:
      `<p>Each strand has a direction, like a one-way street. Its two ends are named <b>5′</b> (“five prime”) and <b>3′</b> (“three prime”). Cells build new strands in the 5′ to 3′ direction, and sequences are written that way by convention. In the double helix the two strands run in opposite directions: where one goes 5′→3′, its partner goes 3′→5′. So when you write down a partner strand, you must flip it.</p>` },
    { k: 'worked', html:
      `<p><b>Worked example.</b> The strand 5′-AACG-3′ pairs letter by letter with 3′-TTGC-5′ (A–T, A–T, C–G, G–C). Read in the usual 5′→3′ direction, the partner is 5′-CGTT-3′.</p>` },

    { k: 'h', text: 'Chromosomes, genes, the genome and loci' },
    { k: 'bgnd', html:
      `<p>A human cell’s DNA is cut into separate pieces called <b>chromosomes</b>: most cells have 46, in 23 pairs. Each is one very long DNA molecule, named by number (Chr1, Chr8, Chr15 …). A <b>gene</b> is a stretch of DNA that the cell can copy into RNA. For many genes the RNA carries a recipe for a protein; for a lncRNA gene, the RNA itself is the finished product. The <b>genome</b> is the complete set of DNA, all chromosomes together; one full human set is about three billion base pairs long. A <b>locus</b> (plural <i>loci</i>) is a place on a chromosome: the “address” of a gene or of any other stretch of DNA.</p>` },
    { k: 'svg', caption: 'From big to small: the genome holds the chromosomes, a chromosome holds genes, and a locus is the address of one stretch.',
      svg: `<svg viewBox="0 0 480 262" role="img" aria-label="Nested boxes: the genome is all the chromosomes together; one chromosome is a long piece of DNA; a gene is a stretch on the chromosome; the locus is the address of that stretch"><rect x="6" y="6" width="468" height="250" rx="14" class="f-gray"/><text x="20" y="30" class="b">Genome: all the chromosomes of a cell</text><rect x="22" y="44" width="436" height="92" rx="12" class="f-blue"/><text x="36" y="66" class="b s">One chromosome: a very long piece of DNA</text><rect x="40" y="82" width="84" height="30" rx="6" class="f-orange"/><text x="82" y="102" class="mid b">gene</text><rect x="190" y="82" width="64" height="30" rx="6" class="f-orange"/><text x="222" y="102" class="mid b">gene</text><rect x="330" y="82" width="104" height="30" rx="6" class="f-orange"/><text x="382" y="102" class="mid b">gene</text><path d="M40 124 H124" class="ln thick s-red"/><text x="132" y="129" class="s b t-red">← its locus (its address)</text><rect x="22" y="150" width="436" height="30" rx="10" class="f-blue"/><text x="36" y="170" class="s m">another chromosome (humans have 23 pairs in most cells)</text><rect x="22" y="192" width="436" height="30" rx="10" class="f-blue"/><text x="36" y="212" class="s m">and another …</text><text x="240" y="246" class="mid s m">Chromosomes are named by number: Chr1, Chr8, Chr15 …</text></svg>` },

    { k: 'h', text: 'How this paper uses these ideas' },
    { k: 'paper', ref: 'res-aso-p4', quote: 'It is located on Chromosome 8' },
    { k: 'plain', source: ['res-aso-p4', 'res-aso-p5'], html:
      `<p>The paper tells you where each finalist lives: CHiLL1’s gene is on chromosome 8, GCAWKR’s on chromosome 15 (written “Chr15”). They sit on different chromosomes, so they are not neighbors.</p>`, derived: ['15'] },
    { k: 'paper', ref: 'res-pipeline-p3', quote: 'neutral control loci (not expected to influence cell phenotype)' },
    { k: 'plain', source: ['res-pipeline-p3'], html:
      `<p>“Locus” is the paper’s word for a place in the genome. A neutral control is a baseline that should do nothing: neutral control loci are places where cutting is not expected to change how the cells behave, so they give something to compare the lncRNA targets with.</p>` },
    { k: 'paper', ref: 'res-pipeline-p1', quote: 'deleting target genes’ transcription start sites (TSS) via paired guide RNAs (pgRNAs)' },
    { k: 'plain', source: ['res-pipeline-p1'], html:
      `<p>To switch a gene off, the authors cut a short stretch of DNA out of it: the spot where the cell begins copying the gene (lesson B4). Pairs of guide molecules steer the scissors to the two cutting points (lesson D1).</p>` },
    { k: 'panel', id: 'fig1E', derived: ['2500', '2000'], html:
      `<p>The gel at the bottom measures DNA pieces in base pairs. The normal (wild-type) piece is about 2.5 kb long (2,500 bp). After the cut-out the piece is about 500 bp, so roughly 2,000 bp were removed (my own subtraction).</p>` },
  ],
  appears: [
    { ref: 'fig1E', note: 'A gel and a gene map: DNA pieces measured in kb and bp, with the cut-out region marked.' },
    { ref: 'res-aso-p4', note: 'CHiLL1 is located on Chromosome 8.' },
    { ref: 'res-aso-p5', note: 'GCAWKR is on Chr15.' },
    { ref: 'res-pipeline-p3', note: '“Neutral control loci”: places in the genome chosen as a baseline.' },
    { ref: 'm-library-design-p5', note: 'Each library sequence is 165 or 166 bp long.' },
  ],
  checks: [
    { q: 'A short DNA strand reads 5′-AACG-3′. Which strand can pair with it?',
      options: [
        { t: '3′-TTGC-5′', ok: true, why: 'Right: A pairs with T and C with G, and the partner runs the opposite way (3′ to 5′).' },
        { t: '5′-TTGC-3′', ok: false, why: 'The letters are right but the direction is wrong: the two strands of a double helix run in opposite directions.' },
        { t: '3′-CCAT-5′', ok: false, why: 'The letters do not follow the rule. A needs T and C needs G, so the partner of AACG begins TTG…' },
      ], bg: true },
    { q: 'What is a locus?',
      options: [
        { t: 'A position on a chromosome, such as the place where a gene sits', ok: true, why: 'Right: a locus is an address in the genome.' },
        { t: 'The RNA copy of a gene', ok: false, why: 'That is the gene’s product, not a place. A locus is a location on the DNA.' },
        { t: 'The complete set of a cell’s DNA', ok: false, why: 'That is the genome. A locus is one place within it.' },
      ], bg: true },
    { q: 'Which list runs from the biggest to the smallest unit?',
      options: [
        { t: 'Genome, chromosome, gene, base pair', ok: true, why: 'Right: the genome holds the chromosomes, a chromosome holds genes, and a gene is built from base pairs.' },
        { t: 'Chromosome, genome, gene, base pair', ok: false, why: 'The first two are swapped: the genome is all the chromosomes together.' },
        { t: 'Genome, gene, chromosome, base pair', ok: false, why: 'A gene is a stretch on a chromosome, so a chromosome is bigger than a gene.' },
      ], bg: true },
    { q: 'In Figure 1E the DNA piece on the gel is about 2.5 kb long in normal cells and about 500 bp after the guides cut out a stretch. Roughly how much DNA was removed?',
      options: [
        { t: 'About 2,000 base pairs (2.5 kb minus 500 bp)', ok: true, why: 'Right: 2.5 kb is 2,500 bp, and 2,500 minus 500 leaves 2,000 bp removed.' },
        { t: 'About 500 base pairs', ok: false, why: 'That is the length of the piece that is left, not the part that was removed.' },
        { t: 'About 3,000 base pairs', ok: false, why: 'That adds the two lengths instead of subtracting them.' },
      ], source: ['fig1E'], derived: ['2000', '2500'] },
  ],
});
