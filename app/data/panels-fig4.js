/* Figure 4 (A-H) panel guides: Functional landscape of lncRNAs in NSCLC. */

/* ------------------------------------------------------------------------------------------ 4A */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig4A: {
    short: 'How TPP combines the screens',
    question: `How do the authors turn the results of many separate screens into one ranked list of hits?`,
    howToRead: `<p>This is a flow chart, not a data plot. Read it from left to right. Each box is one calculation step; each arrow carries a result to the next step.</p>
<p><b>Start.</b> The stack of boxes called "Multiple screens" stands for the paper's screens: the proliferation, cisplatin and migration screens. Every screen gives each target two numbers: a <b>log2 fold change</b> (how strongly the target's guides were lost or gained: the <i>effect size</i>) and a <b>P-value</b> (how surprising a change that big would be if the target had no real effect: the <i>significance</i>). The red labels show which number goes where.</p>
<p><b>Two parallel routes.</b> The P-values go to the <b>empirical Brown's method</b>, which merges the P-values of all the screens into one. The log2FC values go to <b>robust rank aggregation (RRA)</b>, which looks for targets that rank high in many screens when each screen is ordered by effect size. Two routes are used because each kind of evidence can mislead on its own: a big change can be noisy, and a tiny change can be very consistent.</p>
<p><b>Finish.</b> The <b>harmonic mean P-value</b> joins the two routes into one score per target. <b>FDR correction</b> then adjusts for testing thousands of targets at once. The red <b>FDR &lt; 0.2</b> is the cutoff: targets below it are the hits, collected in the last box as the "unified target ranking".</p>`,
    shows: `<p>The chart shows the logic of the <b>target prioritization pipeline (TPP)</b>. Run on all screens together, it gives the <b>pan-hallmark</b> ranking (called "TPP Pan" in panel B). Run on the screens of one phenotype only, for example proliferation or cisplatin response, it gives a hallmark-specific ranking ("TPP pheno"). The legend defines both names; the chart itself draws only the steps they share.</p>
<p>Everything else in Figure 4 builds on this ranking: panel B tests how good it is, panels C and D show the hits it calls at FDR &lt; 0.2, and panels E to H ask whether those hits behave like real cancer genes.</p>`,
    keyNumbers: [
      { value: 'FDR &lt; 0.2', meaning: 'the cutoff that turns the ranking into a list of hits (red text beside the last arrow)', source: ['fig4A', 'm-hits-p4'] },
      { value: 'Log2FC → RRA', meaning: 'the effect-size route: robust rank aggregation ranks targets by fold change across screens', source: ['fig4A', 'm-hits-p4'] },
      { value: `P-value → empirical Brown's method`, meaning: 'the significance route: the P-values of the screens are combined into one', source: ['fig4A', 'm-hits-p4'] },
      { value: 'Harmonic mean P-value', meaning: 'joins both routes into one score before the FDR correction', source: ['fig4A', 'm-hits-p4'] },
    ],
    background: `<p>Brown's method combines several P-values into one while allowing for the P-values being related to each other. That is useful here because the screens are not fully independent: they use the same guide library and some use the same cells. A <i>harmonic mean</i> is an average that is pulled toward the smaller numbers, so a target that is very convincing on one route is not watered down by a weaker score on the other. "FDR &lt; 0.2" means that, on average, up to about one in five of the targets called hits may be false alarms. That is a lenient cutoff, which suits a search where hits are only candidates to be checked by further experiments.</p>`,
    memory: `Choosing a squad from several try-outs. Each try-out tells you how many points a player scored (effect size) and how sure you can be that it was not luck (significance). The pipeline ranks players using both numbers from all try-outs, then draws a line (the FDR cutoff) to decide who makes the squad.`,
    flags: [
      `The chart does not say which screens sit inside "Multiple screens", and "TPP Pan" and "TPP pheno" are defined in the legend but not drawn. The Methods add two details the chart leaves out: the RRA scores are converted to exact P-values before they are combined, and the FDR correction is the Benjamini–Hochberg method (m-hits-p4).`,
      `Hits are called from FDR alone, with one lenient cutoff. A hit is therefore a candidate, not a proven cancer gene: after follow-up with ASOs the authors themselves report some likely false positives among the screen hits (limitations-p1).`,
    ],
    chartTypes: [],
    examQ: {
      q: `In Figure 4A, which two kinds of information from each screen enter the target prioritization pipeline, how are they processed, and what defines a hit?`,
      a: `Effect size (log2 fold change) goes to robust rank aggregation (RRA), and significance (P-values) goes to the empirical Brown's method. The two results are joined into a harmonic mean P-value and corrected for multiple testing (FDR correction). Targets with FDR &lt; 0.2 are the hits of the unified ranking. Using both kinds of evidence balances effect size against significance.`,
    },
  },
});

/* ------------------------------------------------------------------------------------------ 4B */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig4B: {
    short: 'Which ranking finds the controls?',
    question: `Does the combined pan-hallmark ranking recognize the known positive controls and reject the neutral controls better than other integration methods or any single screen?`,
    howToRead: `<p>This is a <b>ROC curve</b> chart. It scores how well each method <i>ranks</i> the targets, using controls whose true answer is known: 109 <b>positive controls</b> (genes that should come out as hits) and 35 <b>neutral controls</b> (places that should not). The lncRNAs themselves are not in the curve, because nobody knows their true answer yet.</p>
<p><b>Axes.</b> Imagine walking down a method's ranked list, starting with the most convincing target. The y axis (true positive rate) is the share of positive controls you have met so far. The x axis (false positive rate) is the share of neutral controls you have wrongly met. Meeting a positive control moves the line up; meeting a neutral control moves it right. That is why the lines are staircases.</p>
<p><b>What good looks like.</b> A line that shoots up the left side and runs along the top: positive controls come first and neutral ones come late. The gray dotted diagonal is what a random ranking gives. The <b>AUC</b> (area under the curve), printed in the box, turns each line into one number: 0.5 is random, 1.0 is perfect.</p>
<p><b>Colors.</b> Dark blue: TPP Pan (all screens combined by TPP). Green: RRA Pan (robust rank aggregation used alone on all screens). Light blue: TPP Pheno (TPP run on the screens of one phenotype); it has a pale band around it and a "±" value. Orange and red: single dropout screens in H460 and A549 cells.</p>`,
    shows: `<p>TPP on all screens ("TPP Pan") has the highest AUC, 0.82. Robust rank aggregation alone ("RRA Pan") comes close at 0.80, so adding the significance route gives only a small gain. TPP on one phenotype's screens ("TPP Pheno") scores 0.73±0.01, the same as the best single screen shown, the A549 dropout screen (0.73). The H460 dropout screen alone scores 0.54, barely above random, and for part of its length its line runs below the diagonal.</p>
<p>The authors' reading: the pan-hallmark ranking "outperforms common integration methods and individual screens in correctly classifying positive and neutral controls" (res-integration-p1). Combining all the screens did better than combining one phenotype's screens, or than using one screen alone.</p>`,
    keyNumbers: [
      { value: '0.82', meaning: 'AUC of TPP Pan (all screens, effect size and significance): the highest', source: ['fig4B'] },
      { value: '0.80', meaning: 'AUC of RRA Pan (robust rank aggregation alone): a close second', source: ['fig4B'] },
      { value: '0.73±0.01', meaning: 'AUC of TPP Pheno (TPP on the screens of one phenotype)', source: ['fig4B'] },
      { value: '0.73 and 0.54', meaning: 'AUCs of the single A549 and H460 dropout screens; 0.54 is barely above random', source: ['fig4B'] },
      { value: '109 and 35', meaning: 'positive and neutral controls used as the answer key', source: ['fig4B', 'res-multipheno-p6'] },
    ],
    background: `<p>Why an ROC chart? Every cutoff on a ranked list trades finding more real hits (up) against letting in more false alarms (right). The ROC curve shows every possible cutoff at once, so nobody has to choose one. The AUC can also be read as a chance: pick one positive control and one neutral control at random, and the AUC is the chance that the method ranks the positive one higher.</p>`,
    memory: `A metal-detector sweep. You dig where it beeps loudest first. Each coin you find moves the line up; each bottle cap moves it right. A good detector finds coins before bottle caps.`,
    flags: [
      `The legend does not say what the pale band around the light blue curve, or the "±0.01" after TPP Pheno, show (for example spread between runs). No other AUC has an uncertainty and no test compares the AUCs, so a small gap such as 0.82 versus 0.80 cannot be judged from the panel.`,
      `Only two single screens are drawn: the A549 and H460 dropout screens. The text says TPP beats "individual screens" (res-integration-p1), but the CFSE, cisplatin and migration screens do not appear as separate curves here.`,
      `The AUCs use only controls, which are protein-coding genes and neutral regions. The paper notes that deleting a promoter has a weaker effect than mutating a gene's coding sequence (res-multipheno-p3), so how well a method does on the controls may not carry over exactly to the lncRNAs (a general caution, not stated in the paper).`,
      `The control counts differ between places in the paper. This panel and the Results say 109 positive controls (res-multipheno-p6), but the Methods describe the control sets with other counts (m-library-design-p3) and Figure 1C shows other numbers again. The paper does not reconcile them.`,
      `The Figure 2 text quotes AUC pairs for A549 screens: 0.7 versus 0.67 for proliferation and 0.77 versus 0.73 for cisplatin (res-multipheno-p2). The 0.73 for "A549 Drop-out" here matches one of those numbers, but the panel does not say which A549 screen or which set of controls it comes from.`,
    ],
    derived: ['0.7', '0.67', '0.77'],
    chartTypes: ['F2'],
    examQ: {
      q: `What does Figure 4B measure, and what do the AUC values 0.82, 0.80 and 0.54 tell you?`,
      a: `It tests how well each ranking puts known positive controls (109) ahead of neutral controls (35); the lncRNAs are not part of the curve. AUC is the area under the ROC curve: 0.5 means a random ranking and 1.0 a perfect one. TPP Pan (0.82) is best, RRA Pan (0.80) is close behind, and the H460 dropout screen (0.54) is barely better than random. So combining all screens with TPP recognizes the controls better than the common alternatives and better than single screens.`,
    },
  },
});

/* ------------------------------------------------------------------------------------------ 4C */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig4C: {
    short: 'Hit map across three hallmarks',
    question: `Which of the three hallmarks (proliferation, cisplatin response, migration) does each pan-hallmark hit act in, and how confident is each hit overall?`,
    howToRead: `<p>This panel combines a <b>triangle map</b> (a ternary plot) with three <b>petal plots</b>. The panel prints a key for each.</p>
<p><b>The triangle.</b> Each dot is one target that passed FDR &lt; 0.2 in the pan-hallmark analysis. The three corners stand for the three hallmarks and are drawn as symbols. A ternary plot shows a balance of three shares: the closer a dot sits to a corner, the more of its evidence comes from that hallmark (the legend says the position is driven by the TPP significance calculated for each hallmark). Near a corner means mostly one hallmark, on an edge means two, in the middle means all three about equally.</p>
<p><b>Which corner is which?</b> The legend does not name the symbols, but the color key does. Teal dots (Pan+Cis) lie toward the top, yellow dots (Pan+Pro) toward the bottom left and pink dots (Pan+Mig) toward the bottom right. So the top corner (circle with a slash) is cisplatin response, the bottom-left corner (infinity sign) is proliferation and the bottom-right corner (crown) is migration. As a check, SNHG6, which the text links to migration (res-multipheno-p7), sits near the migration corner.</p>
<ul>
<li><b>Color</b> ("Hit in:") says which analyses called the target a hit. "Pan" alone (dark brown) means only the all-screens analysis did. "Pan+Pro" means the all-screens analysis and the proliferation analysis did, and so on. "Pan+Pro+Cis+Mig" means all three hallmark analyses did.</li>
<li><b>Size</b> shows the FDR: the bigger the dot, the smaller (better) the FDR. The size key shows 0.2 for the smallest dot, then 1e−16 and 1e−32. This is the "overall confidence defined by pan-hallmark ranking" (res-integration-p2).</li>
<li><b>Outline</b> marks the controls. A red ring is a positive control (a protein-coding gene with a known role in growth or cisplatin response). A gray ring is a neutral control, which should not score at all. No ring means a lncRNA candidate.</li>
<li><b>Labels.</b> Black gene names are protein-coding controls. Black numbers are the candidate numbers of lncRNAs picked for follow-up experiments. Blue names are lncRNAs that earlier studies had linked to lung adenocarcinoma.</li>
</ul>
<p><b>The petal plots.</b> The box on the left is their key. Each petal is one hallmark, with the same colors and directions as the triangle: teal at the top, yellow at the lower left, pink at the lower right. Reading the key by eye, a petal's <i>length</i> shows significance on a log scale (the center is 10⁰ and the rim 10⁻³) and its <i>width</i> shows effect size (the key's scale runs from 0 to 0.05). The gray disc behind the petals shows the pan-hallmark significance, and the small red circle marked 0.2 is the cutoff. A long, wide petal therefore means a strong, significant effect in that hallmark. Thin gray arrows join three examples to their dots: AC104024.3 (candidate 215), LINC00910 (candidate 507) and CECR7 (candidate 448).</p>`,
    shows: `<p>The map gives every hit a signature in three functional dimensions, set in the context of its overall confidence (res-integration-p2). The dots are the lncRNA hits plus the control genes that also passed FDR &lt; 0.2 (panel D counts 80 lncRNA hits, dozens of positive controls and only 3 neutral controls in the pan-hallmark list). They are spread over the whole triangle, so different lncRNAs lean on different hallmarks: some on one, some on two, some on all three about equally.</p>
<p>The three example petal plots show three different signatures. <b>LINC00910</b> has one long, wide teal petal (cisplatin response) and a short yellow one (proliferation). <b>AC104024.3</b> has a long yellow petal and a shorter pink one (proliferation and migration) and no teal petal. <b>CECR7</b> has long yellow and pink petals and only a thin spike for cisplatin.</p>
<p>The controls behave as they should. The biggest dots are mostly red-ringed positive controls, and only a few gray-ringed neutral controls appear. Known lung cancer lncRNAs (the blue labels PCAT7, PVT1, LINC00511 and SNHG6) are among the hits. GCAWKR, one of the paper's two final lncRNAs, is candidate 240 (res-aso-p3): it is the small dark-brown "Pan" dot under the label 240, near the middle.</p>`,
    keyNumbers: [
      { value: 'FDR &lt; 0.2', meaning: 'every dot passed this cutoff in the pan-hallmark analysis', source: ['fig4C'] },
      { value: '80 (73 novel)', meaning: 'lncRNA hits in the pan-hallmark analysis (∼8% of those screened); 73 were not previously linked to NSCLC', source: ['res-integration-p2', 'fig4D'] },
      { value: '134, 19, none', meaning: 'hallmark-specific analyses: 134 hits in at least one hallmark, 19 in two hallmarks, none in three', source: ['res-integration-p2'] },
      { value: '0.2 · 1e−16 · 1e−32', meaning: 'the dot-size key: the bigger the dot, the smaller the FDR', source: ['fig4C'] },
      { value: '10⁻³ to 10⁰; 0 to 0.05', meaning: 'the scales in the petal key: petal length (significance) and petal width (effect)', source: ['fig4C'] },
      { value: '215 · 507 · 448', meaning: 'candidate numbers of the three example petal plots: AC104024.3, LINC00910 and CECR7', source: ['fig4C', 'res-validation-p2', 'res-validation-p5'] },
    ],
    background: `<p>A ternary plot is built from three numbers that are first rescaled so that they add up to 100%. The position therefore shows the <i>balance</i> between the three, not how large they are. That is why this panel adds a second cue, the dot size, for overall confidence. A petal plot is a bar chart bent around a circle: each bar is a petal that points in its own direction.</p>`,
    memory: `A paint-mixing triangle. A point near the red corner is mostly red; a point in the middle is an even mix of all three paints. Here the three "paints" are the hallmarks (proliferation, cisplatin response, migration), and the size of the dot says how sure we are.`,
    flags: [
      `The legend says the corners are "indicated by symbols" but does not say which symbol is which hallmark. Top = cisplatin, bottom left = proliferation and bottom right = migration is my reading of the color key and of where the dots sit.`,
      `The petal key shows a significance scale (10⁰ to 10⁻³) and an effect scale (0 to 0.05), but the legend does not say which quantities these are (a P-value or an FDR; which effect measure) or how three significance values become one position in the triangle. The three example petal plots have rings but no numbers, and different numbers of rings, so compare shapes within one plot, not between plots.`,
      `The color key includes Pan+Pro+Cis+Mig (a hit in all three hallmark analyses), but the text says no lncRNA was a hit in all three (res-integration-p2). Every brown dot of that color that I checked has a red ring, so they are positive-control genes. Neither the legend nor the text says this.`,
      `CHiLL1 is not labeled in this panel, although GCAWKR is. From the panel alone you cannot tell where CHiLL1 sits.`,
    ],
    chartTypes: ['F2'],
    examQ: {
      q: `How do you read a dot in the triangle of Figure 4C (position, color, size and outline), and what profile does the LINC00910 petal plot show?`,
      a: `Position: the balance of the TPP significance across the three hallmarks (near a corner means mostly that hallmark). Color: which analyses called the target a hit (Pan alone, or Pan plus proliferation, cisplatin and/or migration). Size: the FDR in the pan-hallmark analysis (bigger dot, smaller FDR, more confident). Outline: a red ring is a positive control, a gray ring a neutral control, no ring a lncRNA candidate. LINC00910 (candidate 507) has one long, wide teal petal, so most of its evidence comes from cisplatin response, plus a short yellow petal for proliferation and no migration petal.`,
    },
  },
});

/* ------------------------------------------------------------------------------------------ 4D */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig4D: {
    short: 'What the hit lists contain',
    question: `What kinds of targets (controls, known lncRNAs, novel lncRNAs) make up the hit lists of the pan-hallmark and hallmark-specific analyses, compared with the library as a whole?`,
    howToRead: `<p>These are <b>stacked bars</b>: each bar is one list of targets, split into colored segments. The y axis is percent, so every bar has the same height, and the number printed inside a segment is its count. <b>Red</b> = positive controls (genes that should score), <b>gray</b> = neutral controls (should not score), <b>light green</b> = "lung cancer lncRNAs" (lncRNAs already published and functionally validated in lung cancer) and <b>blue</b> = "novel cancer lncRNAs" (all the other lncRNAs). "cand hits" counts the lncRNA candidates in a bar: light green plus blue.</p>
<p><b>Left chart.</b> The hits of the pan-hallmark analysis ("Pan", all screens together) and of the three hallmark-specific analyses (proliferation, cisplatin, migration). A vertical black line separates the pan-hallmark bar from the hallmark-specific ones. <b>Right chart.</b> The same colors for the whole library, as a baseline: if the hit lists were random draws from the library, every hit bar would look like this one. The controls work as an answer key. A good hit list holds many positive controls and very few neutral ones.</p>`,
    shows: `<p>The pan-hallmark list holds 80 lncRNA hits (7 known lung cancer lncRNAs and 73 novel ones; the text says 73 of the 80 were not previously linked to NSCLC), plus 46 positive controls and 3 neutral controls. Positive controls are far more common among the hits than in the library: 46 of the 129 items in the Pan bar (46 + 3 + 7 + 73, about 36%) against 109 of the 1147 items in the library bar (about 9.5%). Neutral controls are not enriched: 3 of 129 against 35 of 1147. That is the pattern a working ranking should give.</p>
<p>The hallmark-specific lists have 50 (proliferation), 38 (cisplatin) and 65 (migration) lncRNA hits. These add up to 153, more than the 134 distinct hits in the text, because the 19 lncRNAs that are hits in two hallmarks are counted twice (153 − 19 = 134). The text puts the pan-hallmark hits at ∼8% and the hallmark-specific hits at ∼13% of the lncRNAs screened.</p>`,
    keyNumbers: [
      { value: '80 = 7 + 73', meaning: 'pan-hallmark lncRNA hits: 7 known lung cancer lncRNAs and 73 novel ones', source: ['fig4D', 'res-integration-p2'] },
      { value: '46 and 3', meaning: 'positive and neutral controls among the pan-hallmark hits', source: ['fig4D'] },
      { value: '109 · 35 · 90 · 913', meaning: 'the library: positive controls, neutral controls, known lung cancer lncRNAs, novel lncRNAs', source: ['fig4D'] },
      { value: '50 · 38 · 65', meaning: 'lncRNA hits ("cand hits") of the proliferation, cisplatin and migration analyses', source: ['fig4D'] },
      { value: '134 (19)', meaning: 'distinct hallmark-specific lncRNA hits; 19 of them are hits in two hallmarks and none in three', source: ['res-integration-p2'] },
      { value: '1003', meaning: 'lncRNA targets in the library bar (913 + 90)', source: ['fig4D'] },
    ],
    memory: `A crate of mixed fruit is the library bar. You pick fruit with a ripeness test (the ranking) and look at what you picked (a hit bar). If the test works, your pick holds far more of the fruit you know is ripe (positive controls) than the crate does, and hardly any of the plastic fruit you slipped in as a check (neutral controls).`,
    flags: [
      `The library bar says "cand hits: 1003", but those are all the lncRNA candidates in the library (913 + 90), not hits. The Results give a different count, 831 lncRNAs (res-pipeline-p2), and do not explain the gap. The text's "∼8%" for 80 hits fits 1003 (80 of 1003 is about 8%); 80 of 831 would be about 10%.`,
      `The text says known lung cancer lncRNAs are "enriched among hits" (res-integration-p2). In this panel they are 7 of the 80 lncRNA hits (about 9%) and 90 of the 1003 library lncRNAs (also about 9%), so no enrichment shows here. The text points to a separate enrichment-score analysis (Figure S3C), which is not in the PDF.`,
      `The y axis says "% of Hits", but each bar contains controls as well as lncRNAs, while the paper's headline counts (80 and 134) are lncRNAs only. Always check which part of the bar a number refers to.`,
      `The control numbers (109 positive, 35 neutral) agree with panel B and, for the positive controls, with the Results (res-multipheno-p6). They do not agree with the control counts listed in the Methods (m-library-design-p3), and the paper does not reconcile them.`,
    ],
    derived: ['129', '1147', '36', '9.5', '153', '831', '10', '9'],
    chartTypes: ['F2'],
    examQ: {
      q: `In Figure 4D, why is a "Library" bar shown beside the hit bars, and what does the comparison tell you about the pan-hallmark hit list?`,
      a: `The library bar is the baseline: the mix of everything that was screened (109 positive controls, 35 neutral controls, 90 known lung cancer lncRNAs, 913 novel lncRNAs). Random picks would give hit bars with the same mix. Instead, positive controls are strongly enriched among the pan-hallmark hits (46 of 129 items, about 36%, against about 9.5% in the library) while neutral controls are not (3 of 129). So the ranking picks out genes that really matter for growth. The 80 lncRNA hits (7 known and 73 novel) are the paper's pan-hallmark hit list.`,
    },
  },
});

/* ------------------------------------------------------------------------------------------ 4E */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig4E: {
    short: 'Hits differ between cell lines',
    question: `Are the lncRNA hits of a single dropout screen active in both lung cancer cell lines (A549 and H460), and what about the pan-hallmark hits?`,
    howToRead: `<p>Two scatterplots with the same axes. Each dot is one lncRNA hit. Across is its effect in the A549 dropout screen and up is its effect in the H460 dropout screen, both as log2FC: 0 means no change, a negative value means its guides were lost (the cells grew worse without it), and the more negative, the stronger the effect. The black lines mark 0. A hit that matters in both cell lines sits in the lower-left quarter.</p>
<p><b>Colors:</b> cyan = A549 dropout hits (n=72), green = H460 dropout hits (n=58), salmon = hits in both (n=5), brown (right plot) = the 80 pan-hallmark hits. The <b>contour lines</b> are density rings that show where dots crowd, like height lines on a map. Each <b>arrow</b> points to the geometric median of a group: a robust "middle point" of the cloud (a median in two dimensions).</p>`,
    shows: `<p><b>Left.</b> The cyan cloud lies left of the vertical line but around the horizontal line: A549 hits are strong in A549 and near zero in H460. The green cloud is the mirror image. Only 5 hits are shared. So hits from a single dropout screen are mostly cell-line specific: lncRNAs "tend to only display activity in the cell type where they were discovered" (res-integration-p3). <b>Right.</b> The 80 pan-hallmark hits form one cloud shifted left and slightly down, so they are negative in both cell lines. The text calls this "relatively background-independent activity" and takes it as support for combining several screens and cell lines.</p>`,
    keyNumbers: [
      { value: 'n=72 · n=58 · n=5', meaning: 'dropout hits of A549, dropout hits of H460, and hits in both', source: ['fig4E'] },
      { value: 'n=80', meaning: 'pan-hallmark hits (the same 80 as in panels C and D)', source: ['fig4E', 'res-integration-p2'] },
      { value: '72 + 5 = 77', meaning: 'my sum: it matches the 77 A549 dropout hits in the text, so n=72 seems to count A549-only hits', source: ['fig4E', 'res-multipheno-p4'] },
    ],
    memory: `Lower left = "ouch in both cell lines".`,
    flags: [
      `The legend says "correlation" but shows no correlation coefficient or test, and it does not explain the contour lines. Both axes are dropout log2FC values, even in the right plot: the pan-hallmark hits come from all the screens, but here they are shown only in the two dropout screens.`,
      `A hit that is missing in one cell line may reflect a noisier screen rather than different biology. Panel B shows the H460 dropout screen recovers the controls barely better than random, and the text says far fewer positive controls scored in H460 than in A549 (res-multipheno-p6). The panel does not separate the two explanations.`,
      `The text also reports a significant concordance between the two dropout screens (res-multipheno-p6). That is a correlation over all targets; this panel looks at strict hit lists. Both can be true, but the panel shows no overlap statistic.`,
    ],
    derived: [],
    chartTypes: ['F2', 'F1'],
    examQ: {
      q: `What does the left plot of Figure 4E show about hits from conventional dropout screens, and how does the right plot support integrating several screens?`,
      a: `A549 hits (n=72) are strongly negative in A549 but near zero in H460, and H460 hits (n=58) are the reverse; only 5 hits are in both. So activity is limited to the cell type where a hit was found. The 80 pan-hallmark hits are shifted negative in both cell lines, which is more background-independent and supports combining screens and cell lines to find therapeutic targets.`,
    },
  },
});

/* ------------------------------------------------------------------------------------------ 4F */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig4F: {
    short: 'Hits are higher in tumors',
    question: `In real KRAS-mutant lung adenocarcinomas, are the pan-hallmark hit lncRNAs expressed more highly than the other screened lncRNAs?`,
    howToRead: `<p>Two <b>violin plots</b> with a small box plot inside each. The outline of a violin shows how the values are spread (wide = many lncRNAs at that level); the box holds the middle half of the values, the line in it is the median, and the dots are extreme values. The y axis is expression in FPKM on a <b>log10 scale</b>: each grid line is ten times the one below, because RNA levels span many orders of magnitude (10⁰ is one FPKM).</p>
<p><b>Blue = "Hits"</b> (the pan-hallmark hits), <b>purple = "Non-hits"</b> (all the other lncRNAs in the screen). The data are RNA-seq of KRAS-mutant lung adenocarcinomas from TCGA (n=101 tumors), matching the KRAS-mutant cell lines of the screens. "P&lt;2.2e-16" means a P-value smaller than 2.2e-16 (R reports tiny values this way), from a one-tailed Welch's t test. It is one-tailed because the question is whether hits are <i>higher</i>. If hits drive cancer, their violin and box should sit higher than the non-hits'.</p>`,
    shows: `<p>The violin and box of the hits sit a little higher than those of the non-hits, so the typical hit lncRNA is expressed at a somewhat higher level in these tumors. With P&lt;2.2e-16 the paper concludes that pan-hallmark hits "are significantly higher expressed than non-hits in KRAS+ lung tumors" (res-integration-p4), as expected for cancer-promoting lncRNAs. Notice the overlap: the two violins cover much the same range, and by eye the medians differ by less than one grid line (less than ten-fold). A tiny P-value says the shift is unlikely to be chance, not that it is large.</p>`,
    keyNumbers: [
      { value: 'n=101', meaning: 'KRAS-mutant lung adenocarcinoma tumors from TCGA', source: ['fig4F', 'm-public-rnaseq-p1'] },
      { value: 'P&lt;2.2e-16', meaning: 'hits versus non-hits, one-tailed Welch\'s t test', source: ['fig4F'] },
      { value: '10⁻² to 10⁴', meaning: 'the log10 axis spans six orders of magnitude, which is why a log scale is used', source: ['fig4F'] },
    ],
    flags: [
      `The legend does not say what one data point is. The thick strings of dots suggest thousands of points, so each point may be one lncRNA in one tumor rather than one lncRNA averaged over the 101 tumors. If so, every lncRNA is counted many times and the P-value looks more impressive than the number of different lncRNAs justifies (a general statistical caution, not discussed in the paper).`,
      `It also does not say how many lncRNAs are in each group, or whether the test used raw or log-transformed values. Higher expression in tumors fits a cancer-promoting role but does not prove one.`,
    ],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: `Figure 4F: what is compared, why is the y axis logarithmic, and what does P&lt;2.2e-16 tell you and not tell you?`,
      a: `The expression (FPKM) of pan-hallmark hit lncRNAs against all other screened lncRNAs in 101 KRAS-mutant lung adenocarcinomas from TCGA. The axis is logarithmic because RNA levels span many orders of magnitude. The one-tailed Welch's t test asks whether hits are higher; P&lt;2.2e-16 means that is very unlikely to be chance, but it does not give the size of the difference, which looks modest by eye.`,
    },
  },
});

/* ------------------------------------------------------------------------------------------ 4G */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig4G: {
    short: 'Hits rise in tumors only',
    question: `In an independent patient group, are the hit lncRNAs expressed more in lung adenocarcinomas than in non-tumor tissue, and is that also true of the non-hits?`,
    howToRead: `<p>Four violins (each with a box) in two pairs. In each pair the blue violin is "hits" and the purple one is "non-hits", as in panel F (panel G prints no color key). The left pair is non-tumor lung tissue (n=77), the right pair is lung adenocarcinomas (n=87). The y axis is log10 FPKM, as in F. Each line with a P-value over it marks the two violins being compared:</p>
<ul><li>violins 1 and 2, and 3 and 4 (hits against non-hits within one tissue): P&lt;2.2e-16 in both;</li><li>violins 1 and 3 (hits, non-tumor against tumor): P=1.7e-10;</li><li>violins 2 and 4 (non-hits, non-tumor against tumor): P=0.77.</li></ul>
<p>The non-hits are the control group: if every lncRNA rose in tumors, they would rise too. The legend names a "pairwise two-tailed Student's t test".</p>`,
    shows: `<p>Hits are expressed higher in tumors than in non-tumor tissue (P=1.7e-10), while non-hits show no difference (P=0.77). So the rise is specific to the hits, in an independent cohort of 87 tumors and 77 non-tumor samples: the text says they are "upregulated in tumors compared with adjacent tissue" (res-integration-p4). Hits also differ from non-hits within each tissue (both P&lt;2.2e-16); by eye hits are a little higher in both, so they are somewhat more expressed than other lncRNAs even in non-tumor lung. Together with panel F, this supports the idea that the hits behave like cancer-promoting lncRNAs.</p>`,
    keyNumbers: [
      { value: 'P=1.7e-10', meaning: 'hits, non-tumor against tumor: higher in tumors', source: ['fig4G'] },
      { value: 'P=0.77', meaning: 'non-hits, non-tumor against tumor: no difference', source: ['fig4G'] },
      { value: 'n=77 and n=87', meaning: 'non-tumor and tumor samples of the TANRIC cohort', source: ['fig4G', 'm-public-rnaseq-p1'] },
      { value: 'P&lt;2.2e-16 (twice)', meaning: 'hits against non-hits within each tissue', source: ['fig4G'] },
    ],
    flags: [
      `Panel G has no color key; blue = hits and purple = non-hits is copied from panel F. For the comparison tissue the legend says "healthy tissues" and "normal", the Results say "adjacent tissue", the Methods say "adjacent normal tissue" (m-public-rnaseq-p1) and the axis says "Non-tumour". Tissue next to a tumor is not necessarily fully healthy.`,
      `By eye the middles of the two blue violins are very close, so the tiny P-value for hits (1.7e-10) probably reflects the very large number of points more than a large shift (the same caution as in panel F about what a data point is). Panel F used a one-tailed Welch's t test and panel G a two-tailed Student's t test; the paper does not say why, and no correction for making four comparisons is mentioned.`,
    ],
    chartTypes: ['F1', 'F4'],
    examQ: {
      q: `In Figure 4G, why are non-hits plotted next to the hits, and what do P=1.7e-10 and P=0.77 show?`,
      a: `The non-hits are a comparison group: if all lncRNAs were higher in tumors, the non-hits would rise too. P=1.7e-10 shows that hits are expressed higher in tumors than in non-tumor tissue; P=0.77 shows that non-hits are not. So the rise is specific to the hits, in an independent cohort (87 tumors, 77 non-tumor samples).`,
    },
  },
});

/* ------------------------------------------------------------------------------------------ 4H */
Object.assign((window.PANELS = window.PANELS || {}), {
  fig4H: {
    short: 'Hits are often amplified',
    question: `Are pan-hallmark hit lncRNAs found more often than non-hits in DNA regions that are recurrently amplified (extra copies) or deleted in cancers?`,
    howToRead: `<p>Two stacked bars, each adding to 100%: the 80 "Candidate Hits" and the 923 "Candidate Non-hits". Segments: <b>light gray</b> = no recurrent copy-number change ("No CNA"), <b>dark gray</b> = "Deleted", <b>green</b> = "Amplified". The N inside a segment is its count; the N above a bar is its total. "Pan-cancer" means the status comes from PCAWG, a set of tumor genomes from many cancer types, not only lung: each lncRNA's position is checked against regions found recurrently amplified or deleted (m-cnv-p3). The P-values in the key come from <b>one-sided Fisher's exact tests</b> that compare hits with non-hits for that category.</p>`,
    shows: `<p>13 of the 80 hits (about 16%) lie in recurrently amplified regions, against 52 of 923 non-hits (about 6%): P = 0.0011, so hits are amplified more often than chance would give. Deleted regions show no such enrichment: 7 of 80 hits (about 9%) against 127 of 923 non-hits (about 14%), P = 0.14. This is the paper's "screen hits tend to be amplified, but not depleted, in DNA from tumors" (res-integration-p4). Extra DNA copies fit the idea that these lncRNAs help cancers grow, but most hits (60 of 80) have no recurrent change.</p>`,
    keyNumbers: [
      { value: 'P = 0.0011', meaning: 'amplified: hits against non-hits (significant)', source: ['fig4H'] },
      { value: 'P = 0.14', meaning: 'deleted: hits against non-hits (not significant)', source: ['fig4H'] },
      { value: '13 of 80 vs 52 of 923', meaning: 'hits and non-hits in amplified regions', source: ['fig4H'] },
      { value: '7 of 80 vs 127 of 923', meaning: 'hits and non-hits in deleted regions', source: ['fig4H'] },
      { value: 'N = 80 and N = 923', meaning: 'the two groups compared', source: ['fig4H'] },
    ],
    flags: [
      `The legend says the tests are one-sided but not in which direction. Re-computing from the counts (my own check, not in the paper) gives both printed P-values: the amplified P-value tests "more amplified among hits" and the deleted P-value tests "fewer deleted among hits". The text says "depleted" where the panel says "Deleted"; I read them as the same thing.`,
      `The status is pan-cancer (PCAWG), not lung-specific, and recurrently amplified regions are large and hold many genes, so the panel cannot show that the lncRNA itself rather than a neighboring gene explains the amplification (a general caution). The text also cites Figures S3E and S3F, which are not in this PDF. The two bars (80 + 923) add up to the same lncRNA total as panel D, which differs from the lncRNA count in the Results (res-pipeline-p2).`,
    ],
    derived: ['16', '6', '9', '14'],
    chartTypes: ['F2', 'F4'],
    examQ: {
      q: `What does Figure 4H test, and what do the P-values 0.0011 and 0.14 mean?`,
      a: `It compares the pan-hallmark hits (80) with the non-hits (923) for recurrent copy-number change in the PCAWG pan-cancer data, using one-sided Fisher's exact tests. Hits are amplified more often (13 of 80 against 52 of 923; P = 0.0011, significant) but not deleted more often (7 of 80 against 127 of 923; P = 0.14, not significant). So hits tend to be amplified, not deleted, which fits oncogenic roles.`,
    },
  },
});
