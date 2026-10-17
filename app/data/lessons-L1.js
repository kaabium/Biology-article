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
  defines: ['tpp', 'fdr', 'aso-cocktail'],
  body: [
    { k: 'h', text: 'The funnel at a glance' },
    { k: 'plain', source: ['summary-p1', 'res-aso-p1', 'res-aso-p2', 'res-aso-p3'], html:
      `<p>The whole study can be read as five numbers: <b>831 → 80 → 9 → 5 → 2</b>. Each arrow is one filter, and each filter asks a different question. The authors shortened their list from 831 lncRNAs to 80 hits, then to nine, five and finally two lncRNAs: <b>CHiLL1</b> and <b>GCAWKR</b>.</p>` },
    { k: 'svg', caption: 'The funnel, not to scale. Each level keeps only the lncRNAs that pass one more question.',
      svg: `<svg viewBox="0 0 480 360" role="img" aria-label="A funnel with five levels, from 831 lncRNAs at the top to 80 hits, 9, 5 and finally 2 at the bottom, each with the question that level asked"><path d="M15 8 H169 L158 72 H26 Z" class="f-blue"/><text x="92" y="48" class="mid b xl">831</text><text x="186" y="28" class="b">831 lncRNAs in the library</text><text x="186" y="46" class="s m">Q: Which do the cancer cells need</text><text x="186" y="62" class="s m">for growth, drug survival or movement?</text><path d="M28 78 H156 L145 142 H39 Z" class="f-teal"/><text x="92" y="118" class="mid b xl">80</text><text x="186" y="98" class="b">80 hits (pan-hallmark)</text><text x="186" y="116" class="s m">Q: Which score best when all the</text><text x="186" y="132" class="s m">screens are combined?</text><path d="M41 148 H143 L132 212 H52 Z" class="f-green"/><text x="92" y="188" class="mid b xl">9</text><text x="186" y="168" class="b">9 picked by hand (Tier 1)</text><text x="186" y="186" class="s m">Q: Which top hits are new and show</text><text x="186" y="202" class="s m">no sign of a protein recipe?</text><path d="M54 218 H130 L119 282 H65 Z" class="f-orange"/><text x="92" y="258" class="mid b xl">5</text><text x="186" y="238" class="b">5 reproducible (Tier 2)</text><text x="186" y="256" class="s m">Q: Do two different ASOs both slow</text><text x="186" y="272" class="s m">the cancer cells’ growth?</text><path d="M67 288 H117 L106 352 H78 Z" class="f-red"/><text x="92" y="328" class="mid b xl">2</text><text x="186" y="308" class="b">2 finalists (Tier 3)</text><text x="186" y="326" class="s m">Q: Is the effect weaker in normal</text><text x="186" y="342" class="s m">lung cells? CHiLL1 and GCAWKR</text></svg>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a talent show. 831 contestants audition and the scores from every round are added up (the 80 who go through). The organizers hand-pick nine for the callbacks (Tier 1). Five survive a second audition in front of two different judges (Tier 2). Two reach the final because the home audience, the normal cells, hardly reacts to them (Tier 3).</p>` },

    { k: 'h', text: 'Step by step: what each filter asked' },
    { k: 'plain', source: ['res-pipeline-p2', 'res-integration-p1', 'res-integration-p2', 'fig4D'], html:
      `<p><b>831 → 80.</b> The library covers 831 lncRNAs (998 spots where the scissors can cut, because some lncRNAs have more than one). The screens asked whether cancer cells lose out when a lncRNA’s starting spot is removed. The paper merges all the screens into one <b>pan-hallmark</b> ranking: “pan” means “all”, so the ranking uses every screen at once. (The merging software is the target prioritization pipeline, <b>TPP</b>.) A cutoff called <b>FDR</b> below 0.2, a statistical filter against false alarms that is stricter when lower, decides what counts as a hit. The result is <b>80</b> hits, about 8% of those screened. Of these, 73 had not been linked to NSCLC before.</p>` },
    { k: 'plain', source: ['res-aso-p1', 'res-integration-p2'], html:
      `<p><b>80 → 9 (Tier 1).</b> From the top-ranked hits, the authors picked nine by hand. They looked for lncRNAs that were new to science and showed no evidence of carrying a protein recipe. These nine are <b>Tier 1</b>. For each of them, the team found at least two different ASOs that lowered the lncRNA’s amount by at least 40%.</p>` },
    { k: 'plain', source: ['res-aso-p2', 'res-aso-p1'], html:
      `<p><b>9 → 5 (Tier 2).</b> Next, the ASOs were tested on cancer cells. For five of the nine, two different ASO sequences both caused a reproducible loss of cell proliferation. When two different ASOs agree, the effect is probably caused by the target lncRNA and not by a quirk of one ASO. These five are <b>Tier 2</b>. The result held in two other lung cancer cell types, and the Tier 2 lncRNAs were also more active in tumors than in normal samples, although the authors had not used that to choose them.</p>` },
    { k: 'plain', source: ['res-aso-p3', 'res-aso-p2'], html:
      `<p><b>5 → 2 (Tier 3).</b> The ASOs were then tried on normal lung cells, as a first check for harm to healthy cells. The response was weaker or absent, especially for two of the five: candidate 42, renamed <b>CHiLL1</b>, and candidate 240, called <b>GCAWKR</b>. These two are <b>Tier 3</b>. The authors add that both look unlikely to carry a protein recipe.</p>` },

    { k: 'h', text: 'Why the labels matter later' },
    { k: 'plain', source: ['res-aso-p8', 'res-aso-p9'], html:
      `<p>The paper keeps using these labels. A <b>cocktail</b> is a mix of ASOs used at the same total dose as a single ASO. The “Tier 3 cocktail” is a 50:50 mix of the CHiLL1 and GCAWKR ASOs, and the “Tier 2 cocktail” mixes five ASOs, one for each Tier 2 lncRNA. Both mixes worked better than a single ASO at an equal dose. In a public dataset of patients’ tumors, 78% of the tumors make at least one of CHiLL1 and GCAWKR, and 92% make at least one of the Tier 2 lncRNAs.</p>` },
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
        { t: 'The Tier 1 lncRNAs: top-ranked hits the authors picked by hand for ASO tests', ok: true, why: 'Right: nine lncRNAs, chosen because they were new and showed no evidence of carrying a protein recipe, form Tier 1.' },
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
    { k: 'plain', source: ['intro-p6', 'discussion-p5', 'res-aso-p9'], html:
      `<p><b>ASOs could become low-harm medicines.</b> The authors say the lncRNAs they found can be targeted by “potent” ASOs of low <b>toxicity</b> (toxicity means harm to healthy cells), because the ASO effects were weaker in normal lung cells. They hope this allows higher doses and mixes of drugs. They also find that 78% of the tumors in a public patient dataset make at least one of CHiLL1 and GCAWKR, and 92% at least one of the Tier 2 lncRNAs, so most patients might eventually benefit.</p>` },
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
      `<p>The paper often writes “candidate 205 (LINC00115)” as if one number meant one gene. But candidate 205 covers two genes, and only the ASO tests singled out LINC00115. The authors say so themselves in the limitations: cutting out the region cannot tell which of two overlapping genes matters.</p>` },
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
