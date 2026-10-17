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
