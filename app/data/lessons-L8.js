/* lessons-L8.js — E4, E5, F1, F2, F3, F4 (scope L8). Each lesson is one push() so the file can grow one lesson at a time. */

/* ============================================================================================== E4 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'E4',
  body: [
    { k: 'h', text: 'The problem: many tests, many flukes' },
    { k: 'bgnd', html:
      `<p>In lesson E2 you met the <b>p-value</b>. A p-value below 0.05 is usually called "significant": if nothing were going on, a result this strong would turn up by luck about 1 time in 20.</p>` +
      `<p>Now think of a screen. It asks the same question for hundreds of targets: "does switching this one off change growth?" Each answer comes with its own p-value. Even if <i>no</i> target mattered, about 1 test in 20 would still pass p &lt; 0.05. Running many tests at once is called <b>multiple testing</b>, and it needs a correction.</p>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up numbers).</b> Test 1,000 genes when none has any real effect. Each test has a 5% chance of a lucky p &lt; 0.05, so you expect 1,000 × 0.05 = <b>50</b> "significant" genes, all of them flukes. Even with only 20 tests, the chance of at least one fluke is 1 − 0.95<sup>20</sup> ≈ 64%.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> five heads in a row looks special (1 chance in 32). But if 1,000 people each toss a coin five times, about 30 of them will see five heads. They are not gifted; that is what many tries produce by luck. A screen runs hundreds of such tosses at once.</p>` },

    { k: 'h', text: 'Two ways to be wrong' },
    { k: 'bgnd', html:
      `<p>A <b>false positive</b> is a "hit" that is not real: a fluke. A <b>false negative</b> is a real effect that the screen missed. A lenient cut-off catches more real effects but lets in more flukes; a strict cut-off does the reverse. You cannot remove both mistakes, so you choose a balance. The grid shows the four outcomes for a made-up screen.</p>` },
    { k: 'svg', caption: 'A made-up screen of 1,000 genes (50 really matter). The three rates differ only in what you divide by.',
      svg: `<svg viewBox="0 0 480 300" role="img" aria-label="A two-by-two grid for a made-up screen of 1,000 genes: 32 true positives, 18 false negatives, 8 false positives and 942 true negatives, with the false discovery rate, true-positive rate and false-positive rate calculated from it">` +
        `<text x="228" y="38" class="mid b">Called a hit (40)</text><text x="394" y="38" class="mid b">Not called (960)</text>` +
        `<text x="6" y="92" class="b">Really matters</text><text x="6" y="110" class="s m">50 genes</text>` +
        `<text x="6" y="178" class="b">Does nothing</text><text x="6" y="196" class="s m">950 genes</text>` +
        `<rect x="146" y="48" width="164" height="82" rx="8" class="f-green"/><text x="228" y="88" class="mid xl b">32</text><text x="228" y="112" class="mid s">true positives</text>` +
        `<rect x="314" y="48" width="160" height="82" rx="8" class="f-orange"/><text x="394" y="88" class="mid xl b">18</text><text x="394" y="112" class="mid s">false negatives (missed)</text>` +
        `<rect x="146" y="136" width="164" height="82" rx="8" class="f-red"/><text x="228" y="176" class="mid xl b">8</text><text x="228" y="200" class="mid s">false positives (flukes)</text>` +
        `<rect x="314" y="136" width="160" height="82" rx="8" class="f-gray"/><text x="394" y="176" class="mid xl b">942</text><text x="394" y="200" class="mid s">true negatives</text>` +
        `<rect x="142" y="44" width="172" height="178" rx="10" class="ln dash s-red"/>` +
        `<text x="6" y="248" class="b t-red">FDR = 8 ÷ 40 = 20%</text><text x="168" y="248" class="s m">flukes ÷ all hits (left column)</text>` +
        `<text x="6" y="270" class="b t-green">True-positive rate = 32 ÷ 50 = 64%</text><text x="290" y="270" class="s m">(top row)</text>` +
        `<text x="6" y="292" class="b">False-positive rate = 8 ÷ 950 ≈ 0.8%</text><text x="314" y="292" class="s m">(bottom row)</text></svg>` },
    { k: 'bgnd', html:
      `<p>Three rates come out of the grid:</p>` +
      `<ul><li><b>False discovery rate (FDR)</b>: flukes ÷ all the hits you called. "What share of my hit list is junk?"</li>` +
      `<li><b>True-positive rate</b>: real effects you caught ÷ all real effects. "How much of the truth did I find?"</li>` +
      `<li><b>False-positive rate</b>: no-effect genes you wrongly called ÷ all no-effect genes. (The ones you correctly left alone are the <b>true negatives</b>.) "How often does a dud fool me?"</li></ul>` +
      `<p>Mixing up the first and the last is the classic mistake: here the FDR is 20%, but the false-positive rate is under 1%.</p>` },

    { k: 'h', text: 'FDR, the Benjamini–Hochberg recipe, and q-values' },
    { k: 'bgnd', html:
      `<p>Instead of asking "how rare is this one result?", FDR control asks "how many flukes am I willing to accept in my hit list?" If you accept an FDR of 0.2, you accept that on average about 1 hit in 5 may be a fluke. The standard recipe is the <b>Benjamini–Hochberg procedure</b> (BH):</p>` +
      `<ul><li><b>1.</b> Sort the p-values from smallest to largest and number them: rank 1, 2, 3 … Call the number of tests m.</li>` +
      `<li><b>2.</b> The p-value allowed at each rank is (rank ÷ m) × q, where q is the FDR you accept.</li>` +
      `<li><b>3.</b> Find the <i>largest</i> rank whose p-value is at or below its allowed value.</li>` +
      `<li><b>4.</b> That item, and every item with a smaller p-value, is a hit.</li></ul>` +
      `<p>Each item also gets a <b>q-value</b> (adjusted p-value): the smallest FDR at which that item would still make the list. For rank i it is (m ÷ i) × p, tidied so that a larger p-value never gets a smaller q. Then you simply keep every item whose q-value is below your FDR cut-off. Papers also say "FDR-corrected p-value" for the same idea.</p>` },
    { k: 'svg', caption: 'BH on ten made-up p-values: dots under the red line are hits (FDR 0.2).',
      svg: `<svg viewBox="0 0 480 300" role="img" aria-label="Ten p-values plotted against their rank from smallest to largest, with a rising red line showing the p-value allowed at each rank for an FDR of 0.2; the first six dots are under the line and count as hits, rank 7 is above it">` +
        `<path d="M60 240 H452" class="ln"/><path d="M60 240 V40" class="ln"/>` +
        `<path d="M60 164 H452" class="ln thin dash m"/><path d="M60 88 H452" class="ln thin dash m"/>` +
        `<text x="54" y="244" class="s end">0</text><text x="54" y="168" class="s end">0.1</text><text x="54" y="92" class="s end">0.2</text>` +
        `<text transform="rotate(-90 14 150)" x="14" y="150" class="mid s">p-value</text>` +
        `<path d="M60 240 L440 88" class="ln thick s-red"/>` +
        `<text x="72" y="56" class="s t-red b">red line: p allowed at each rank</text><text x="72" y="74" class="s t-red b">= (rank ÷ 10) × 0.2</text>` +
        `<circle cx="98" cy="239" r="6" class="solid-green"/><circle cx="136" cy="235" r="6" class="solid-green"/><circle cx="174" cy="228" r="6" class="solid-green"/>` +
        `<circle cx="212" cy="219" r="6" class="solid-green"/><circle cx="250" cy="206" r="6" class="solid-green"/><circle cx="288" cy="172" r="6" class="solid-green"/>` +
        `<circle cx="326" cy="73" r="6" class="solid-gray"/>` +
        `<circle cx="364" cy="50" r="6" class="solid-gray"/><circle cx="402" cy="50" r="6" class="solid-gray"/><circle cx="440" cy="50" r="6" class="solid-gray"/>` +
        `<text x="364" y="38" class="mid s">0.40</text><text x="402" y="38" class="mid s">0.65</text><text x="440" y="38" class="mid s">0.93</text>` +
        `<path d="M292 177 L306 192" class="ln thin m"/><text x="308" y="200" class="s">rank 6: p = 0.09</text>` +
        `<text x="338" y="76" class="s">rank 7: above the line</text>` +
        `<text x="98" y="258" class="mid s">1</text><text x="136" y="258" class="mid s">2</text><text x="174" y="258" class="mid s">3</text><text x="212" y="258" class="mid s">4</text><text x="250" y="258" class="mid s">5</text>` +
        `<text x="288" y="258" class="mid s">6</text><text x="326" y="258" class="mid s">7</text><text x="364" y="258" class="mid s">8</text><text x="402" y="258" class="mid s">9</text><text x="440" y="258" class="mid s">10</text>` +
        `<text x="250" y="278" class="mid s">rank (1 = smallest p-value)</text>` +
        `<text x="250" y="296" class="mid s m">green = hit · grey = not a hit (ranks 8–10 are off the chart)</text></svg>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up).</b> Ten genes, so m = 10. The q-value is (10 ÷ rank) × p.</p>` +
      `<p>rank 1: p = 0.001 → q = 0.01<br>rank 2: p = 0.006 → q = 0.03<br>rank 3: p = 0.016 → q = 0.053<br>rank 4: p = 0.028 → q = 0.07<br>rank 5: p = 0.045 → q = 0.09<br>rank 6: p = 0.09 → q = 0.15<br>rank 7: p = 0.22 → q = 0.31<br>ranks 8–10: p = 0.40, 0.65, 0.93 → q = 0.50, 0.72, 0.93</p>` +
      `<p>Plain p &lt; 0.05 would pick ranks 1–5. FDR &lt; 0.05 keeps only ranks 1–2 (rank 3 has q = 0.053, just over). FDR &lt; 0.2 keeps ranks 1–6, including rank 6, whose raw p of 0.09 would never pass p &lt; 0.05. So FDR &lt; 0.2 is a <b>lenient, discovery-style</b> cut-off.</p>` },

    { k: 'h', text: 'What the paper says about FDR < 0.2' },
    { k: 'paper', ref: 'm-hits-p4', quote: 'These p-values were corrected for multiple hypothesis testing using the Benjamini & Hochberg method, and a cutoff of FDR<0.2 was used to define hits.' },
    { k: 'plain', source: ['m-hits-p4', 'm-hits-p3', 'res-integration-p2'], derived: ['16'], html:
      `<p>Every target's p-value is corrected with the BH method, and a target counts as a hit when its FDR is below 0.2. Single screens use the same cut-off plus a direction: FDR &lt; 0.2 and a log2 fold change above zero for the positive screens (CFSE, death, migration), or below zero for the dropout and cisplatin screens. The pan-hallmark ranking gave 80 hits (about 8% of the lncRNAs screened) at FDR &lt; 0.2. If the procedure works as designed, up to about 16 of those 80 (0.2 × 80, my own arithmetic, not a number from the paper) could be flukes.</p>` },
    { k: 'flag', source: ['m-hits-p3', 'm-hits-p4', 'm-quant-p3'], html:
      `<p>The paper states this cut-off but never says why it chose 0.2 instead of the more familiar 0.05 that it uses elsewhere ("p ≤ 0.05 is considered statistically significant unless otherwise specified"). The reasoning in the next paragraph is background, not the authors' words.</p>` },
    { k: 'bgnd', html:
      `<p>A common reason for a lenient cut-off in a discovery screen is that the hit list is only a list of <i>candidates</i> that later experiments will re-test. A strict cut-off would throw away real hits (false negatives) before anyone could confirm them; a lenient one lets in some flukes, which the follow-up experiments are meant to remove.</p>` },
    { k: 'plain', source: ['res-validation-p1'], html:
      `<p>The two hits the authors chose for follow-up came from the top of the list, not from its edge: their FDRs were 1.2 × 10<sup>−7</sup> and 9.78 × 10<sup>−7</sup>, far below 0.2.</p>` },

    { k: 'h', text: 'ROC curves and AUC: grading a ranking with an answer key' },
    { k: 'bgnd', html:
      `<p>Sometimes you want to know how <i>good</i> a ranking is at separating real effects from non-effects, not just where to cut it. You need an answer key: items you already know are real (<b>positive controls</b>) and items you know are not (<b>neutral controls</b>). Rank everything by score, then slide the cut-off from strict to lenient. At each position, note the true-positive rate and the false-positive rate, and plot them: false-positive rate across, true-positive rate up. That line is the <b>ROC curve</b>.</p>` +
      `<p>A perfect ranking shoots straight up the left edge and across the top. A random ranking follows the diagonal. The <b>area under the curve (AUC)</b> turns the whole curve into one number: 1.0 is perfect, 0.5 is a coin flip. It also has a plain meaning: pick one positive and one negative at random; the AUC is the chance that the positive was ranked higher.</p>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up).</b> Four positive controls (P) and four neutral controls (N), ranked best first: P P N P N P N N. Walk down the list: each P moves the curve up by 1/4, each N moves it right by 1/4. For each P, count the N's ranked below it: 4, 4, 3, 2, which is 13 out of 16 pairs. So AUC = 13 ÷ 16 ≈ <b>0.81</b>.</p>` },
    { k: 'svg', caption: 'The ROC staircase for that ranking. The blue area is the AUC.',
      svg: `<svg viewBox="0 0 480 300" role="img" aria-label="A ROC staircase drawn for the ranking P P N P N P N N: the curve goes up twice, right once, up, right, up, then right twice; the area under it is 13 sixteenths, about 0.81, and a dashed diagonal marks random ranking">` +
        `<path d="M56 250 V150 H106 V100 H156 V50 H256 V250 Z" class="f-blue"/>` +
        `<path d="M56 250 L256 50" class="ln dash m"/>` +
        `<path d="M56 250 V200 V150 H106 V100 H156 V50 H256" class="ln thick s-blue"/>` +
        `<path d="M56 250 H256" class="ln"/><path d="M56 250 V50" class="ln"/>` +
        `<text x="56" y="268" class="mid s">0</text><text x="156" y="268" class="mid s">0.5</text><text x="256" y="268" class="mid s">1</text>` +
        `<text x="50" y="254" class="end s">0</text><text x="50" y="154" class="end s">0.5</text><text x="50" y="54" class="end s">1</text>` +
        `<text x="156" y="290" class="mid s">false-positive rate</text><text transform="rotate(-90 14 150)" x="14" y="150" class="mid s">true-positive rate</text>` +
        `<text x="190" y="214" class="mid s b">AUC = area</text><text x="190" y="232" class="mid s">dashed = random (0.5)</text>` +
        `<text x="276" y="70" class="s b">Ranking, best first:</text>` +
        `<circle cx="284" cy="98" r="10" class="f-green"/><text x="284" y="103" class="mid s">P</text><circle cx="308" cy="98" r="10" class="f-green"/><text x="308" y="103" class="mid s">P</text>` +
        `<circle cx="332" cy="98" r="10" class="f-gray"/><text x="332" y="103" class="mid s">N</text><circle cx="356" cy="98" r="10" class="f-green"/><text x="356" y="103" class="mid s">P</text>` +
        `<circle cx="380" cy="98" r="10" class="f-gray"/><text x="380" y="103" class="mid s">N</text><circle cx="404" cy="98" r="10" class="f-green"/><text x="404" y="103" class="mid s">P</text>` +
        `<circle cx="428" cy="98" r="10" class="f-gray"/><text x="428" y="103" class="mid s">N</text><circle cx="452" cy="98" r="10" class="f-gray"/><text x="452" y="103" class="mid s">N</text>` +
        `<text x="276" y="140" class="s">P = known positive control</text><text x="276" y="160" class="s">N = known neutral control</text>` +
        `<text x="276" y="188" class="s">each P: step up 1/4</text><text x="276" y="208" class="s">each N: step right 1/4</text>` +
        `<text x="276" y="240" class="b t-blue">AUC = 13 ÷ 16 ≈ 0.81</text></svg>` },

    { k: 'h', text: 'How this paper grades its rankings' },
    { k: 'paper', ref: 'm-hits-p5', quote: 'Positive and neutral control genes were also used as “true positives/false negatives” and “false positives/true negatives” respectively to calculate Receiver Operating Characteristics (ROC) curves and associated statistical metrics.' },
    { k: 'plain', source: ['m-hits-p5', 'fig4B', 'res-multipheno-p2'], html:
      `<p>The paper uses the answer-key idea. Its positive controls (genes known to matter) play the "P" role and its neutral controls (loci that should do nothing) play the "N" role. The legend of Figure 4B says performance is measured as the AUC "based on correctly recalling/rejecting library controls". In the text, adding the complementary screens raised the AUC a little: 0.7 versus 0.67 for A549 proliferation, and 0.77 versus 0.73 for A549 cisplatin.</p>` },
    { k: 'plain', source: ['fig4D', 'fig4B', 'res-multipheno-p6'], derived: ['0.42', '0.09'], html:
      `<p><b>A real point on the plot (my arithmetic).</b> Figure 4D counts 46 positive and 3 neutral controls inside the pan-hallmark hit list. The library holds 109 positive and 35 neutral controls. So at the paper's cut-off the true-positive rate is 46 ÷ 109 ≈ 0.42 and the false-positive rate is 3 ÷ 35 ≈ 0.09: one point on a ROC picture. The paper does not report these two rates itself.</p>` },
    { k: 'bgnd', html:
      `<p><b>Caution (background):</b> an AUC built from controls tells you how well the ranking separates <i>those controls</i>. It says less directly about how many of the unknown lncRNAs are real.</p>` },
  ],
  appears: [
    { ref: 'm-hits-p4', note: 'Benjamini–Hochberg correction and the FDR < 0.2 cut-off for the integrated ranking.' },
    { ref: 'm-hits-p3', note: 'The same cut-off for each single screen, plus the direction of the fold change.' },
    { ref: 'm-hits-p5', note: 'Positive and neutral controls used as the answer key for ROC curves.' },
    { ref: 'fig4B', note: 'ROC curves and their AUC for the integrated ranking and for single screens.' },
  ],
  checks: [
    { q: 'You test 1,000 genes and none of them has a real effect. About how many will still pass p < 0.05 by luck?',
      options: [
        { t: 'About 50 (5% of 1,000)', ok: true, why: 'Right: each test has a 5% chance of a lucky p < 0.05, so 1,000 tests give about 50 flukes.' },
        { t: 'About 5', ok: false, why: 'That would be 0.5%. A p < 0.05 cut-off lets through 5% of true nulls, which is 50 of 1,000.' },
        { t: 'None, because nothing is going on', ok: false, why: 'Nothing real is going on, but chance alone still produces small p-values about 5% of the time. That is exactly the multiple-testing problem.' },
        { t: 'About 500', ok: false, why: 'That would be half of the tests. Only about 1 in 20 passes by luck.' },
      ], bg: true },
    { q: 'In a made-up screen of 1,000 genes, 950 do nothing and 50 matter. The screen calls 40 hits: 32 real and 8 flukes. What is the FDR of the hit list?',
      options: [
        { t: '20% (8 flukes ÷ 40 hits)', ok: true, why: 'Right: FDR divides the flukes by all the hits you called.' },
        { t: '0.8% (8 ÷ 950)', ok: false, why: 'That is the false-positive rate: it divides by all the genes that do nothing, not by the hits.' },
        { t: '64% (32 ÷ 50)', ok: false, why: 'That is the true-positive rate: the share of the real effects that were caught.' },
        { t: '36% (18 missed ÷ 50)', ok: false, why: 'That is the share of real effects that were missed (false negatives ÷ real effects), which is not an FDR.' },
      ], bg: true },
    { q: 'The paper corrects p-values with the Benjamini–Hochberg method and calls hits at FDR < 0.2. A target has a q-value (adjusted p-value) of 0.15. By that rule, is it a hit?',
      options: [
        { t: 'Yes: 0.15 is below 0.2', ok: true, why: 'Right (m-hits-p4): "a cutoff of FDR<0.2 was used to define hits". The 0.05 rule applies to other analyses, not to the screens.' },
        { t: 'No: a hit needs a q-value below 0.05', ok: false, why: 'The paper says p ≤ 0.05 is the default "unless otherwise specified", and for hit calling it specifies FDR < 0.2.' },
        { t: 'No: the raw p-value must also be below 0.05', ok: false, why: 'The rule is on the corrected value. As the worked example showed, a raw p of 0.09 can still make the list at FDR < 0.2.' },
      ], source: ['m-hits-p4', 'm-quant-p3'], derived: ['0.15'] },
    { q: 'How does the paper decide which genes count as "true positives" and "true negatives" when it draws ROC curves?',
      options: [
        { t: 'Positive controls are the positives and neutral controls are the negatives', ok: true, why: 'Right (m-hits-p5): known growth-promoting genes and neutral loci form the answer key.' },
        { t: 'The 80 hits are the positives and all other lncRNAs are the negatives', ok: false, why: 'That would grade the ranking with its own output. An answer key has to be known independently of the ranking.' },
        { t: 'Genes that kill the cells are positives and genes that do not are negatives', ok: false, why: 'The paper defines the key by library controls (positive and neutral), not by cell death.' },
      ], source: ['m-hits-p5', 'fig4B'] },
  ],
});

/* ============================================================================================== E5 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'E5',
  body: [
    { k: 'h', text: 'The problem: many screens, one ranking wanted' },
    { k: 'bgnd', html:
      `<p>A screen gives every target two kinds of number. The <b>effect size</b> says how big the change is (for example the log2 fold change from lesson E1). The p-value says how surprising the change would be if nothing were going on. A target can look great on one and weak on the other.</p>` },
    { k: 'svg', caption: 'Effect size is how far from zero; significance is how sure you are the value is not zero.',
      svg: `<svg viewBox="0 0 480 232" role="img" aria-label="Two genes on a log2 fold change axis: Gene A has a big effect but a very wide uncertainty bar (p = 0.20); Gene B has a tiny effect with a very narrow uncertainty bar (p = 0.0001)">` +
        `<path d="M358 30 V184" class="ln thin dash m"/><text x="358" y="22" class="mid s m">0 = no change</text>` +
        `<text x="70" y="46" class="s b">Gene A: big effect, very uncertain (p = 0.20)</text>` +
        `<path d="M48 70 H380" class="ln s-orange"/><path d="M48 62 V78" class="ln s-orange"/><path d="M380 62 V78" class="ln s-orange"/><circle cx="214" cy="70" r="5" class="solid-orange"/>` +
        `<path d="M214 94 H358" class="arrow both s-orange"/><text x="286" y="114" class="mid s">effect size</text>` +
        `<text x="70" y="140" class="s b">Gene B: tiny effect, very certain (p = 0.0001)</text>` +
        `<path d="M336 160 H351" class="ln s-blue"/><path d="M336 152 V168" class="ln s-blue"/><path d="M351 152 V168" class="ln s-blue"/><circle cx="343" cy="160" r="4" class="solid-blue"/>` +
        `<path d="M70 184 H430" class="ln"/>` +
        `<path d="M70 180 V188 M142 180 V188 M214 180 V188 M286 180 V188 M358 180 V188 M430 180 V188" class="ln thin"/>` +
        `<text x="70" y="204" class="mid s">−4</text><text x="142" y="204" class="mid s">−3</text><text x="214" y="204" class="mid s">−2</text><text x="286" y="204" class="mid s">−1</text><text x="358" y="204" class="mid s">0</text><text x="430" y="204" class="mid s">+1</text>` +
        `<text x="250" y="224" class="mid s m">log2 fold change (bars = uncertainty)</text></svg>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up).</b> Gene A: log2 fold change −2.0 (a fourfold drop) but noisy, p = 0.20. Gene B: log2 fold change −0.2 (a drop of about 13%) but measured very precisely, p = 0.0001. A has the bigger <b>effect size</b>; B has the stronger <b>significance</b>. Which should rank higher? Neither number settles it, so a good ranking must use both.</p>` },
    { k: 'plain', source: ['res-integration-p1', 'fig4A'], html:
      `<p>That is the authors' problem too. Each lncRNA has results from several screens, and they wanted to "combine diverse screen results while balancing effect size and significance". Their answer is the <b>target prioritization pipeline</b> (TPP).</p>` },

    { k: 'h', text: 'TPP: two routes, then one answer' },
    { k: 'paper', ref: 'm-hits-p4', quote: 'the Robust Rank Aggregation (RRA) to compute a ranking based on the effect size (CASPR log2FC) across screens, and an empirical adaptation of Brown’s method (EBM) to combine the significance values (CASPR p-value) of each candidate across screens. … Subsequently, the harmonic mean p-value (HMP) was calculated using the two significance scores from RRA and EBM.' },
    { k: 'plain', source: ['m-hits-p4', 'fig4A', 'res-integration-p1'], html:
      `<p>TPP runs two analyses side by side. One (RRA) ranks the targets by effect size, using the log2 fold changes of all screens. The other (EBM) combines each target's p-values across the screens. RRA's scores are turned into p-values, then the HMP merges the two significance scores into one p-value. That p-value is corrected with Benjamini–Hochberg and hits are called at FDR &lt; 0.2 (lesson E4). TPP can be run on all screens ("TPP Pan", the pan-hallmark ranking) or on the screens of one phenotype ("TPP pheno").</p>` },
    { k: 'svg', caption: 'The TPP as the Methods describe it (same steps as the flow chart in Figure 4A).',
      svg: `<svg viewBox="0 0 480 316" role="img" aria-label="Flow chart of the target prioritization pipeline: several screens split into two routes, RRA using log2 fold changes and EBM using p-values; both feed the harmonic mean p-value, which goes to Benjamini-Hochberg correction and the FDR below 0.2 hit list">` +
        `<rect x="100" y="6" width="280" height="48" rx="10" class="f-blue"/><text x="240" y="26" class="mid b">Several screens</text><text x="240" y="45" class="mid s">per target: log2 fold change + p-value</text>` +
        `<path d="M125 54 V84" class="arrow"/><text x="134" y="74" class="s">log2FC</text><path d="M355 54 V84" class="arrow"/><text x="364" y="74" class="s">p-value</text>` +
        `<rect x="16" y="84" width="214" height="64" rx="10" class="f-green"/><text x="123" y="106" class="mid b">RRA · rank aggregation</text><text x="123" y="126" class="mid s">uses effect size (log2FC)</text><text x="123" y="142" class="mid s">→ score → exact p-value</text>` +
        `<rect x="250" y="84" width="214" height="64" rx="10" class="f-orange"/><text x="357" y="106" class="mid b">EBM · Brown's method</text><text x="357" y="126" class="mid s">uses the p-values</text><text x="357" y="142" class="mid s">→ one combined p-value</text>` +
        `<path d="M125 148 V162 H170 V178" class="arrow"/><path d="M355 148 V162 H310 V178" class="arrow"/>` +
        `<rect x="100" y="178" width="280" height="48" rx="10" class="f-purple"/><text x="240" y="198" class="mid b">HMP · harmonic mean p-value</text><text x="240" y="216" class="mid s">merges the two scores (small p dominates)</text>` +
        `<path d="M240 226 V256" class="arrow"/>` +
        `<rect x="100" y="256" width="280" height="48" rx="10" class="f-red"/><text x="240" y="276" class="mid b">Benjamini–Hochberg correction</text><text x="240" y="294" class="mid s">hit = FDR &lt; 0.2 → ranked hit list</text></svg>` },
    { k: 'h', text: 'The three tools, one idea each' },
    { k: 'bgnd', html:
      `<p><b>Robust Rank Aggregation (RRA)</b> works on ranks, not raw values. Each screen ranks the targets from strongest to weakest effect. RRA asks: how unlikely is it that a target would sit this high in so many lists by chance? A target near the top of every list is convincing; one that tops a single list and is average elsewhere is not. "Robust" means one noisy list cannot ruin a target that does well in the others.</p>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up).</b> Three screens each rank 100 genes. By chance, a given gene lands in the top 5 of one list with probability 5/100 = 5%, and in the top 5 of all three with probability 0.05<sup>3</sup> ≈ 1 in 8,000. Gene W has ranks 1, 2 and 4: very unlikely by luck. Gene X has ranks 1, 40 and 77: being top in at least one of three lists happens to about 1 gene in 7 by chance. RRA turns this kind of reasoning into a score.</p>` },
    { k: 'bgnd', html:
      `<p><b>Empirical Brown's method (EBM)</b> merges several p-values for the same target into one. The simplest merging treats the tests as independent witnesses. Brown's method allows the tests to be related, and "empirical" means the relationship is estimated from the data itself.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> three witnesses who never spoke are strong evidence. Three witnesses who compared stories first are worth less, even though all three agree. Brown's method discounts the evidence when the "witnesses" (the tests) are related. The analogy breaks down in one way: the discount is a smooth number, not all-or-nothing.</p>` },
    { k: 'bgnd', html:
      `<p>The <b>harmonic mean p-value (HMP)</b> of two p-values is 2 ÷ (1/p1 + 1/p2). Small p-values make 1/p huge, so the result stays close to the smallest p-value: one strong signal is not watered down by a weak one. (The Methods list an R package called harmonicmeanp, version 3.0.)</p>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up).</b> Merge p = 0.001 and p = 0.5. The ordinary average is 0.25, but the harmonic mean is 2 ÷ (1000 + 2) ≈ 0.002. Merge two equal p-values of 0.04 and you get 0.04 back.</p>` },
    { k: 'plain', source: ['res-integration-p1', 'discussion-p3'], html:
      `<p>The authors judged TPP on their controls: the pan-hallmark ranking "outperforms common integration methods and individual screens in correctly classifying positive and neutral controls" (Figure 4B, the ROC curves of lesson E4). In the Discussion they call it a "simple yet robust" pipeline that balances effect size and significance.</p>` },
    { k: 'flag', source: ['m-hits-p4', 'm-data-p2'], html:
      `<p>Heads-up: the Methods give the TPP code as "https://doi.org/10.5281/zenodo.6912510", while the Data availability section says "Zenodo: 6912511". Two different record numbers are printed for the same code.</p>` },

    { k: 'h', text: 'Decoding real legends' },
    { k: 'bgnd', html:
      `<p>A legend is a compressed statistics report. Here are six real ones. For each: what it says in plain words, and what it leaves unsaid. (Lesson F4 turns this into a checklist.)</p>` },
    { k: 'paper', ref: 'fig4F', quote: 'in the KRAS+ samples from The Cancer Genome Atlas (TCGA) LUAD cohort (n = 101). Statistical significance was estimated by one-tailed Welch’s t test.' },
    { k: 'plain', source: ['fig4F'], html:
      `<p><b>Decoded:</b> screen hits are compared with all other screened lncRNAs on how much RNA they make in lung tumors; 101 is the size of the tumor cohort. Welch's t test compares two averages without assuming equal spread; one-tailed means only "hits higher" counts. <b>Left unsaid:</b> what one data point is (an lncRNA? an lncRNA in one tumor?), so you cannot tell how many values entered the test; and why one-tailed.</p>` },
    { k: 'paper', ref: 'fig2F', quote: 'Statistical significance: Wilcoxon test (pairwise comparisons) and Kruskal-Wallis (global differences).' },
    { k: 'plain', source: ['fig2F'], html:
      `<p><b>Decoded:</b> rank-based tests (lesson E3). Kruskal–Wallis asks one question about all groups together ("are they all alike?"); the Wilcoxon test compares chosen pairs. <b>Left unsaid:</b> which pairs, one- or two-sided, and whether the pairwise P values were corrected for making several comparisons.</p>` },
    { k: 'paper', ref: 'fig3C', quote: 'n = 3, error bars indicate SD statistical significance was estimated by Student’s t test at the last time point.' },
    { k: 'plain', source: ['fig3C'], html:
      `<p><b>Decoded:</b> three repeats; error bars show the standard deviation (the spread of the three values); the t test uses only the last time point of the curve. <b>Left unsaid:</b> which two lines are compared, one- or two-tailed, and what "n = 3" counts (separate experiments, or three wells of one).</p>` },
    { k: 'paper', ref: 'fig5F', quote: 'The error bars represent the variability of technical replicates, while the biological replicates are indicated on the bottom (n = 4 biological replicates; n > 3 technical replicates; error bars: SD; one-tailed Student’s t test).' },
    { k: 'plain', source: ['fig5F'], html:
      `<p><b>Decoded:</b> the paper separates technical repeats (the same sample measured again) from biological ones (independent samples, lesson E1). Here the error bars show the technical variation, and there are four independent biological replicates. <b>Left unsaid:</b> whether the P values come from the technical or the biological replicates. Technical repeats are not independent evidence, so it matters.</p>` },
    { k: 'paper', ref: 'fig6I', quote: '(p = 2.2 × 10−16; R = 0.8; statistical significance: Pearson correlation coefficient)' },
    { k: 'plain', source: ['fig6I', 'm-quant-p1'], html:
      `<p><b>Decoded:</b> R = 0.8 is a strong positive correlation (lesson E2). The paper used R software (m-quant-p1), which prints "2.2e-16" for any p-value too small to show, so read it as "smaller than that", not as an exact value. <b>Left unsaid:</b> how many points were correlated. With thousands of points even a weak correlation gets a tiny p; R, not p, tells you the strength.</p>` },
    { k: 'paper', ref: 'm-quant-p3', quote: 'For all analyses, p ≤ 0.05 is considered statistically significant unless otherwise specified. Specific details concerning statistical tests for individual experiments are noted in the relevant Figure legends.' },
    { k: 'plain', source: ['m-quant-p3', 'm-hits-p4'], html:
      `<p><b>Decoded:</b> the default bar is p ≤ 0.05; the screens specify FDR &lt; 0.2 instead (lesson E4); test details are promised in each legend. <b>Left unsaid:</b> I found no mention, in the legends or the Methods, of a correction for the many separate comparisons (apart from Benjamini–Hochberg for the screens), and some legends give no statistics at all (Figure 1F, lesson F4).</p>` },
  ],
  appears: [
    { ref: 'm-hits-p4', note: 'The TPP step by step: RRA, EBM, HMP, Benjamini–Hochberg, FDR < 0.2.' },
    { ref: 'fig4A', note: 'The paper\'s own flow chart of the TPP, with the TPP Pan and TPP pheno variants.' },
    { ref: 'res-integration-p1', note: 'Why TPP was built: balancing effect size and significance.' },
    { ref: 'discussion-p3', note: 'The authors\' verdict on TPP: simple yet robust, better than conventional approaches.' },
  ],
  checks: [
    { q: 'In the paper\'s TPP, what are RRA and EBM each used for?',
      options: [
        { t: 'RRA ranks targets by effect size (log2 fold change) across screens; EBM combines each target\'s p-values across screens', ok: true, why: 'Right (m-hits-p4): one route works on effect size, the other on significance, and the harmonic mean p-value then merges the two.' },
        { t: 'RRA combines p-values; EBM ranks targets by log2 fold change', ok: false, why: 'Reversed. RRA is the effect-size (ranking) route; EBM is the p-value route.' },
        { t: 'RRA corrects for multiple testing; EBM draws the ROC curves', ok: false, why: 'Neither does that. The Benjamini–Hochberg method does the correction, and the controls are used for the ROC curves.' },
      ], source: ['m-hits-p4'] },
    { q: 'You merge two p-values, 0.001 and 0.5, with the harmonic mean. Where does the result land?',
      options: [
        { t: 'Near the smaller p-value (about 0.002)', ok: true, why: 'Right: 2 ÷ (1/0.001 + 1/0.5) = 2 ÷ 1002 ≈ 0.002. Small p-values dominate the harmonic mean.' },
        { t: 'At the ordinary average (about 0.25)', ok: false, why: 'That is the arithmetic mean. The harmonic mean is much closer to the smallest value.' },
        { t: 'Near the larger p-value (about 0.5)', ok: false, why: 'The opposite happens: the larger p-value has little pull on a harmonic mean.' },
      ], bg: true },
    { q: 'Gene A: log2 fold change −2.0, p = 0.20. Gene B: log2 fold change −0.2, p = 0.0001. Which statement is correct?',
      options: [
        { t: 'A has the bigger effect size; B has the stronger significance', ok: true, why: 'Right: effect size is how big the change is, significance is how sure you are it is not chance. Different questions.' },
        { t: 'B has the bigger effect size because its p-value is smaller', ok: false, why: 'A p-value is not an effect size. A tiny p can go with a tiny effect when the measurement is precise.' },
        { t: 'A is more significant because its change is larger', ok: false, why: 'Significance depends on noise as well as size. A\'s large change is very uncertain, hence p = 0.20.' },
      ], bg: true },
    { q: 'A legend says "n = 4 biological replicates; n > 3 technical replicates; error bars: SD; one-tailed Student\'s t test". What does it leave unsaid?',
      options: [
        { t: 'Whether the P values were computed from the biological or the technical replicates', ok: true, why: 'Right (fig5F): technical replicates are repeat measurements of the same sample, so they should not be counted as independent evidence; the legend does not say which were used.' },
        { t: 'What the error bars show', ok: false, why: 'The legend says: SD (standard deviation).' },
        { t: 'Whether the t test was one-tailed or two-tailed', ok: false, why: 'It says one-tailed. What it does not say is why.' },
      ], source: ['fig5F'] },
  ],
});
