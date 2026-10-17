/* lessons-L8.js — E4, E5, F1, F2, F3, F4 (scope L8). Each lesson is one push() so the file can grow one lesson at a time. */

/* ============================================================================================== E4 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'E4',
  body: [
    { k: 'h', text: 'The problem: many tests, many flukes' },
    { k: 'bgnd', html:
      `<p>From lesson E2: a p-value below 0.05 is usually called "significant", meaning that if nothing were going on, a result this strong would turn up by luck about 1 time in 20.</p>` +
      `<p>A screen asks one question per target ("does switching this one off change growth?") and gets one p-value each. Even if <i>no</i> target mattered, about 1 test in 20 would still pass p &lt; 0.05. Running many tests at once is called <b>multiple testing</b>, and it needs a correction.</p>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up numbers).</b> Test 1,000 genes when none has any real effect. Each test has a 5% chance of a lucky p &lt; 0.05, so you expect 1,000 × 0.05 = <b>50</b> "significant" genes, all of them flukes. Even with only 20 independent tests, the chance of at least one fluke is 1 − 0.95<sup>20</sup> ≈ 64%.</p>` },
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
      `<ul><li><b>False discovery rate (FDR)</b>: flukes ÷ all the hits you called. "What share of my hit list is junk?"</li>` +
      `<li><b>True-positive rate</b>: real effects caught ÷ all real effects.</li>` +
      `<li><b>False-positive rate</b>: no-effect genes wrongly called ÷ all no-effect genes. (The ones correctly left alone are the <b>true negatives</b>.)</li></ul>` +
      `<p>The classic mistake is to mix up the FDR and the false-positive rate: here 20% versus under 1%.</p>` },

    { k: 'h', text: 'FDR, the Benjamini–Hochberg recipe, and q-values' },
    { k: 'bgnd', html:
      `<p>Instead of asking "how rare is this one result?", FDR control asks "how many flukes will I accept in my hit list?" At an FDR of 0.2, on average no more than about 1 hit in 5 is expected to be a fluke. The standard recipe is the <b>Benjamini–Hochberg procedure</b> (BH):</p>` +
      `<ul><li><b>1.</b> Sort the p-values from smallest to largest and number them: rank 1, 2, 3 … Call the number of tests m.</li>` +
      `<li><b>2.</b> The p-value allowed at each rank is (rank ÷ m) × q, where q is the FDR you accept.</li>` +
      `<li><b>3.</b> Find the <i>largest</i> rank whose p-value is at or below its allowed value.</li>` +
      `<li><b>4.</b> That item, and every item with a smaller p-value, is a hit.</li></ul>` +
      `<p>Each item also gets a <b>q-value</b> (adjusted p-value): the smallest FDR at which that item would still make the list. For rank i it is (m ÷ i) × p, tidied so that a larger p never gets a smaller q. Keep every item whose q-value is below your cut-off. Papers also call this an "FDR-corrected p-value".</p>` },
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
      `<p>For the integrated ranking, the combined p-values are corrected with the BH method, and a target counts as a hit when its FDR is below 0.2. Single screens use the same cut-off plus a direction: FDR &lt; 0.2 and a log2 fold change above zero for the positive screens (CFSE, death, migration), or below zero for the dropout and cisplatin screens. The pan-hallmark ranking gave 80 hits (about 8% of the lncRNAs screened) at FDR &lt; 0.2. If the procedure works as designed, up to about 16 of those 80 (0.2 × 80, my own arithmetic, not a number from the paper) could be flukes.</p>` },
    { k: 'flag', source: ['m-hits-p3', 'm-hits-p4', 'm-quant-p3'], html:
      `<p>The paper states this cut-off but never says why it chose 0.2 rather than the familiar 0.05 (its default: "p ≤ 0.05 is considered statistically significant unless otherwise specified"). The next paragraph is background, not the authors' words.</p>` },
    { k: 'bgnd', html:
      `<p>A common reason for a lenient cut-off in a discovery screen: the hit list is only a list of <i>candidates</i> that later experiments will re-test. A strict cut-off would throw away real hits (false negatives) before anyone could confirm them; a lenient one lets in some flukes, which the follow-up experiments are meant to remove.</p>` },

    { k: 'h', text: 'ROC curves and AUC: grading a ranking with an answer key' },
    { k: 'bgnd', html:
      `<p>To judge how <i>good</i> a ranking is at separating real effects from non-effects, you need an answer key: items known to be real (<b>positive controls</b>) and items known not to be (<b>neutral controls</b>). Rank everything by score and slide the cut-off from strict to lenient. At each position note the true-positive rate and the false-positive rate, and plot them (false-positive rate across, true-positive rate up). That line is the <b>ROC curve</b>.</p>` +
      `<p>A perfect ranking shoots up the left edge and across the top; a random one follows the diagonal. The <b>area under the curve (AUC)</b> squeezes the curve into one number: 1.0 is perfect, 0.5 is a coin flip. Plainly: pick one positive and one negative at random; the AUC is the chance that the positive ranks higher.</p>` },
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
        `<text x="170" y="214" class="mid s b">AUC = area</text><text x="170" y="232" class="mid s">dashed = random (0.5)</text>` +
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
  ],
  appears: [
    { ref: 'm-hits-p4', note: 'Benjamini–Hochberg correction and the FDR < 0.2 cut-off for the integrated ranking.' },
    { ref: 'm-hits-p3', note: 'The same cut-off for each single screen, plus the direction of the fold change.' },
    { ref: 'm-hits-p5', note: 'Positive and neutral controls used as the answer key for ROC curves.' },
    { ref: 'res-multipheno-p2', note: 'AUC values 0.7 versus 0.67 and 0.77 versus 0.73: complementary screens against dropout screens alone.' },
    { ref: 'res-validation-p1', note: 'FDR values (1.2 × 10−7 and 9.78 × 10−7) of the two hits chosen for follow-up, far below 0.2.' },
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
      ], source: ['m-hits-p4', 'm-quant-p3'], derived: ['0.15', '0.09'] },
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
      `<p><b>Worked example (made-up).</b> Three screens each rank 100 genes. By chance, a given gene lands in the top 5 of one list with probability 5/100 = 5%, and in the top 5 of all three with probability 0.05<sup>3</sup> ≈ 1 in 8,000. Gene W has ranks 1, 2 and 4: very unlikely by luck. Gene X has ranks 1, 40 and 77: being in the top 5 of at least one of the three lists happens to about 1 gene in 7 by chance. RRA turns this kind of reasoning into a score.</p>` },
    { k: 'bgnd', html:
      `<p><b>Empirical Brown's method (EBM)</b> merges several p-values for the same target into one. The simplest merging treats the tests as independent witnesses. Brown's method allows the tests to be related, and "empirical" means the relationship is estimated from the data itself.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> three witnesses who never spoke are strong evidence. Three witnesses who compared stories first are worth less, even though all three agree. Brown's method discounts the evidence when the "witnesses" (the tests) are related. The analogy breaks down in one way: the discount is a smooth number, not all-or-nothing.</p>` },
    { k: 'bgnd', html:
      `<p>The <b>harmonic mean p-value (HMP)</b> of two p-values is 2 ÷ (1/p1 + 1/p2). Small p-values make 1/p huge, so the result stays close to the smallest p-value: one strong signal is not watered down by a weak one.</p>` },
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
      `<p><b>Decoded:</b> screen hits are compared with all other screened lncRNAs on how much RNA they make in lung tumors; 101 is the size of the tumor cohort. Welch's t test compares two averages without assuming equal spread; one-tailed means only one direction of difference counts (the text's claim is that hits are higher). <b>Left unsaid:</b> what one data point is (an lncRNA? an lncRNA in one tumor?), so you cannot tell how many values entered the test; and why one-tailed.</p>` },
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
      `<p><b>Decoded:</b> R = 0.8 is a strong positive correlation (lesson E2). The paper used R software (m-quant-p1), which prints "&lt; 2.2e-16" for any p-value too small to show, so read it as "smaller than that", not as an exact value. <b>Left unsaid:</b> how many points were correlated. With thousands of points even a weak correlation gets a tiny p; R, not p, tells you the strength.</p>` },
    { k: 'paper', ref: 'm-quant-p3', quote: 'For all analyses, p ≤ 0.05 is considered statistically significant unless otherwise specified. Specific details concerning statistical tests for individual experiments are noted in the relevant Figure legends.' },
    { k: 'plain', source: ['m-quant-p3', 'm-hits-p4'], html:
      `<p><b>Decoded:</b> the default bar is p ≤ 0.05; the screens specify FDR &lt; 0.2 instead (lesson E4); test details are promised in each legend. <b>Left unsaid:</b> I found no mention, in the legends or the Methods, of a correction for the many separate comparisons (apart from Benjamini–Hochberg for the screens), and some legends give no statistics at all (Figure 1F, lesson F4).</p>` },
  ],
  appears: [
    { ref: 'm-hits-p4', note: 'The TPP step by step: RRA, EBM, HMP, Benjamini–Hochberg, FDR < 0.2.' },
    { ref: 'fig4A', note: 'The paper\'s own flow chart of the TPP, with the TPP Pan and TPP pheno variants.' },
    { ref: 'res-integration-p1', note: 'Why TPP was built: balancing effect size and significance.' },
    { ref: 'discussion-p3', note: 'The authors\' verdict on TPP: simple yet robust, better than conventional approaches.' },
    { ref: 'm-data-p2', note: 'The TPP code is deposited at Zenodo (its record number differs from the one printed in m-hits-p4).' },
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

/* ============================================================================================== F1 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'F1',
  body: [
    { k: 'h', text: 'A chart is a sentence in disguise' },
    { k: 'bgnd', html:
      `<p>"This bar is shorter than that one." "These two move together." "This curve bends after day 2." Every chart hides a sentence like that. Reading a chart means turning it back into a sentence and then checking the small print. Five questions work for almost every chart in this paper:</p>` +
      `<ul><li><b>1. Axes.</b> What is measured, in which units? Is the scale logarithmic? Does it start at zero?</li>` +
      `<li><b>2. Reference.</b> What is the control, and what value is it set to (often 1.0)?</li>` +
      `<li><b>3. Marks.</b> What does one bar, dot, box or line stand for: one cell, one gene, one experiment, an average?</li>` +
      `<li><b>4. Spread.</b> What do the error bars or boxes show, and what is n?</li>` +
      `<li><b>5. P labels.</b> Only now: which two things does each P compare?</li></ul>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a chart is a weather report. The bar or line is the headline ("30% chance of rain"), the error bar or box is the "give or take", and n is how many weather stations reported. A headline without its stations is just a claim.</p>` },

    { k: 'h', text: 'Bar charts with error bars' },
    { k: 'bgnd', html:
      `<p>A <b>bar chart</b> shows one summary number per group, usually the mean of n repeats (lesson E1). The whisker is the <b>error bar</b>: usually the standard deviation (SD) or the standard error of the mean (SEM), and only the legend says which. When one bar is the control and is set to 1.0, every other bar reads as "times the control".</p>` +
      `<p>Traps: bars hide the individual dots (a bar from n = 2 looks as solid as one from n = 20); error bars are often drawn only upward but are really symmetrical; and a bar chart should start at zero.</p>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up).</b> Four repeats: 8, 10, 12, 10. The mean is 10 and the SD is about 1.6. Some papers plot the SEM instead (SD ÷ √n = 1.6 ÷ 2 ≈ 0.8). Same data, an error bar half as tall, so always read the legend.</p>` },

    { k: 'h', text: 'Box plots and violin plots' },
    { k: 'bgnd', html:
      `<p>When each group has many values, show the shape, not just the average. A <b>box plot</b> draws a box from the 25th to the 75th percentile (the middle half of the values), a line at the median, whiskers for the rest of the usual range, and dots for outliers. A <b>violin plot</b> mirrors a smoothed outline of the values: wide where many values sit, narrow where few do, often with a small box inside.</p>` +
      `<p>Traps: the middle line is the median, not the mean; neither plot shows n unless a label or the legend does; and a violin's smoothed tails can reach past the real data.</p>` },
    { k: 'svg', caption: 'Made-up data. Left: bars with error bars. Middle: a box plot. Right: a violin plot with a small box inside.',
      svg: `<svg viewBox="0 0 480 266" role="img" aria-label="Three chart anatomies drawn with made-up data: a bar chart with a control bar set to 1.0 and a shorter bar with error bars, a box plot with median, whiskers and outlier dots, and a violin plot whose width shows how many values sit at each height">` +
        `<text x="84" y="22" class="mid b">Bar chart</text><text x="256" y="22" class="mid b">Box plot</text><text x="405" y="22" class="mid b">Violin plot</text>` +
        `<path d="M32 40 V210 H156" class="ln"/><path d="M32 110 H156" class="ln thin dash m"/>` +
        `<text x="28" y="214" class="s end">0</text><text x="28" y="114" class="s end">1.0</text>` +
        `<rect x="46" y="110" width="32" height="100" class="f-gray"/><path d="M62 96 V124 M55 96 H69 M55 124 H69" class="ln thin"/>` +
        `<rect x="100" y="160" width="32" height="50" class="f-blue"/><path d="M116 146 V174 M109 146 H123 M109 174 H123" class="ln thin"/>` +
        `<text x="116" y="138" class="mid s">error bar</text>` +
        `<text x="62" y="228" class="mid s">control</text><text x="116" y="228" class="mid s">ASO</text>` +
        `<path d="M186 40 V210" class="ln"/>` +
        `<rect x="213" y="100" width="44" height="52" class="f-green"/><path d="M213 124 H257" class="ln thick"/>` +
        `<path d="M235 100 V70 M225 70 H245 M235 152 V184 M225 184 H245" class="ln"/>` +
        `<circle cx="235" cy="52" r="3.5" class="solid-text"/><circle cx="235" cy="203" r="3.5" class="solid-text"/>` +
        `<text x="268" y="56" class="s">outlier</text><text x="268" y="74" class="s">whisker</text><text x="268" y="128" class="s">median</text><text x="268" y="207" class="s">outlier</text>` +
        `<path d="M346 40 V210" class="ln"/>` +
        `<path d="M405 46 C408 66 430 86 440 110 C446 126 444 140 434 158 C424 176 410 190 405 206 C400 190 386 176 376 158 C366 140 364 126 370 110 C380 86 402 66 405 46 Z" class="f-purple"/>` +
        `<rect x="398" y="112" width="14" height="40" class="f-none"/><path d="M398 130 H412" class="ln thick"/>` +
        `<text x="10" y="242" class="s m">bar = mean of n repeats</text><text x="10" y="258" class="s m">whisker = SD or SEM?</text>` +
        `<text x="176" y="242" class="s m">box = middle half</text><text x="176" y="258" class="s m">line = median</text>` +
        `<text x="340" y="242" class="s m">width = how many</text><text x="340" y="258" class="s m">values at that height</text></svg>` },

    { k: 'h', text: 'Scatter plots and the regression line' },
    { k: 'bgnd', html:
      `<p>In a <b>scatter plot</b> each dot is one item with two numbers: x and y. A rising cloud means the two go together (positive correlation, lesson E2). The straight <b>regression line</b> is the best-fit line through the cloud, and R says how tightly the dots follow it.</p>` +
      `<p>Traps: a tiny P says the relationship is unlikely to be exactly zero, not that it is strong; a few outliers can drag the line; thousands of overlapping dots melt into one blob; and a pattern is not a cause.</p>` },

    { k: 'h', text: 'Time courses' },
    { k: 'bgnd', html:
      `<p>A <b>time course</b> (or growth curve) follows the same samples over time: x is time, y is the measurement, and a line joins the points. Nothing was measured between the points, so the line is a guide, not data. Compare the <i>shapes</i> of the curves; after rescaling they usually start together at 1.0 or 100%.</p>` +
      `<p>Trap: a P label at the end of a curve compares the groups at one time point only. Check which one.</p>` },
    { k: 'svg', caption: 'Made-up data. Left: a scatter plot with a best-fit line. Right: a time course with error bars.',
      svg: `<svg viewBox="0 0 480 272" role="img" aria-label="A scatter plot with a rising cloud of dots and a best-fit line, and a time course in which a control line stays at 1.0 while a treated line falls over 72 hours, with error bars and a P bracket at the last time point">` +
        `<text x="128" y="22" class="mid b">Scatter + regression line</text><text x="378" y="22" class="mid b">Time course</text>` +
        `<path d="M34 40 V196 H228" class="ln"/>` +
        `<circle cx="52" cy="172" r="4" class="solid-blue"/><circle cx="64" cy="166" r="4" class="solid-blue"/><circle cx="72" cy="178" r="4" class="solid-blue"/><circle cx="84" cy="150" r="4" class="solid-blue"/>` +
        `<circle cx="94" cy="160" r="4" class="solid-blue"/><circle cx="104" cy="136" r="4" class="solid-blue"/><circle cx="112" cy="148" r="4" class="solid-blue"/><circle cx="122" cy="122" r="4" class="solid-blue"/>` +
        `<circle cx="132" cy="132" r="4" class="solid-blue"/><circle cx="142" cy="108" r="4" class="solid-blue"/><circle cx="152" cy="120" r="4" class="solid-blue"/><circle cx="162" cy="96" r="4" class="solid-blue"/>` +
        `<circle cx="172" cy="106" r="4" class="solid-blue"/><circle cx="184" cy="84" r="4" class="solid-blue"/><circle cx="194" cy="94" r="4" class="solid-blue"/><circle cx="88" cy="126" r="4" class="solid-blue"/>` +
        `<circle cx="148" cy="144" r="4" class="solid-blue"/><circle cx="60" cy="152" r="4" class="solid-blue"/><circle cx="176" cy="130" r="4" class="solid-blue"/>` +
        `<path d="M44 176 L208 76" class="ln thick s-red"/><text x="226" y="64" class="s end t-red b">best-fit line</text>` +
        `<text x="40" y="56" class="s">R = 0.9 (made up)</text>` +
        `<text x="130" y="216" class="mid s">x (e.g. replicate 1)</text><text transform="rotate(-90 14 118)" x="14" y="118" class="mid s">y (e.g. replicate 2)</text>` +
        `<path d="M290 40 V196 H470" class="ln"/>` +
        `<text x="286" y="200" class="s end">0</text><text x="286" y="140" class="s end">0.5</text><text x="286" y="80" class="s end">1.0</text>` +
        `<text transform="rotate(-90 250 118)" x="250" y="118" class="mid s">relative growth</text>` +
        `<path d="M300 76 H450" class="ln"/><circle cx="300" cy="76" r="3.5" class="solid-text"/><circle cx="350" cy="76" r="3.5" class="solid-text"/><circle cx="400" cy="76" r="3.5" class="solid-text"/><circle cx="450" cy="76" r="3.5" class="solid-text"/>` +
        `<path d="M350 70 V82 M400 70 V82 M450 70 V82" class="ln thin"/>` +
        `<path d="M300 76 L350 100 L400 122 L450 130" class="ln thick s-blue"/>` +
        `<path d="M350 90 V110 M345 90 H355 M345 110 H355 M400 112 V132 M395 112 H405 M395 132 H405 M450 118 V142 M445 118 H455 M445 142 H455" class="ln thin s-blue"/>` +
        `<circle cx="300" cy="76" r="4" class="solid-blue"/><circle cx="350" cy="100" r="4" class="solid-blue"/><circle cx="400" cy="122" r="4" class="solid-blue"/><circle cx="450" cy="130" r="4" class="solid-blue"/>` +
        `<text x="304" y="64" class="s">control (1.0)</text><text x="372" y="158" class="s t-blue b">treated</text>` +
        `<path d="M460 76 H468 V130 H460" class="ln thin"/><text x="471" y="106" class="s">P</text>` +
        `<text x="300" y="212" class="mid s">0</text><text x="350" y="212" class="mid s">24</text><text x="400" y="212" class="mid s">48</text><text x="450" y="212" class="mid s">72</text>` +
        `<text x="378" y="230" class="mid s">time (h)</text>` +
        `<text x="128" y="250" class="s m mid">each dot = one item;</text><text x="128" y="266" class="s m mid">R = how tightly they follow the line</text>` +
        `<text x="378" y="250" class="s m mid">points joined by lines;</text><text x="378" y="266" class="s m mid">P compares the lines at one time</text></svg>` },

    { k: 'h', text: 'See them in the paper' },
    { k: 'panel', id: 'fig3D', html:
      `<p>Left: <b>time courses</b>, one line per ASO, with growth followed over hours. Right: <b>bar charts</b> of RNA levels at 72 h. The legend gives n, says the error bars are SD, and names a one-tailed Student's t test. Coloured P labels or "ns" sit at the end of some curves. Compare the n printed inside each small plot with the legend (lesson F4 shows why).</p>` },
    { k: 'panel', id: 'fig4F', html:
      `<p>Two <b>violin plots</b> with a small box inside each: the RNA made by screen hits versus all other screened lncRNAs in KRAS+ tumors (n = 101). The vertical axis is a log scale: each major tick is a hundred times the one below. Compare the middles (the line in each box is the median), then read the P label.</p>` },
    { k: 'panel', id: 'fig2E', html:
      `<p>A <b>scatter plot</b> with a regression line. Each dot is one lncRNA candidate; x and y are the two biological replicates of the dropout screen in A549 cells, as z-scores of log2 fold change (T3/T0). A tight cloud around a rising line means the replicates agree. R and P come from the Pearson correlation named in the legend.</p>` },
  ],
  appears: [
    { ref: 'fig3D', note: 'Time courses and bar charts with error bars (ASO experiments).' },
    { ref: 'fig4F', note: 'Violin plots with inner boxes: expression of hits versus non-hits.' },
    { ref: 'fig2E', note: 'Scatter plot with a regression line: agreement between screen replicates.' },
    { ref: 'fig6D', note: 'Box plots drawn from RNA-seq replicates (the legend says they show the variance of inference using bootstraps).' },
  ],
  checks: [
    { q: 'Four repeats (8, 10, 12 and 10) are drawn as a bar with an error bar. Why should you read the legend before judging that error bar?',
      options: [
        { t: 'It could show the SD (about 1.6) or the SEM (about 0.8), so the same data give error bars of different heights', ok: true, why: 'Right: SEM = SD ÷ √n is always smaller than the SD. The legend must say which one is drawn.' },
        { t: 'Error bars always show the range from the smallest to the largest value', ok: false, why: 'That is only one possible choice (the range). Most papers use SD or SEM.' },
        { t: 'Error bars are only drawn when P is below 0.05', ok: false, why: 'Error bars show spread and exist whatever the P value is.' },
      ], bg: true },
    { q: 'What do the two violins in Figure 4F compare?',
      options: [
        { t: 'RNA made by pan-hallmark hits versus all other screened lncRNAs, in KRAS+ tumors', ok: true, why: 'Right (fig4F legend): "pan-hallmark hits compared with all other screened lncRNAs (non-hits)" in the KRAS+ samples.' },
        { t: 'Tumor versus normal tissue', ok: false, why: 'That comparison is in Figure 4G, which has four violins (tumor and non-tumor, hits and non-hits).' },
        { t: 'A549 cells versus H460 cells', ok: false, why: 'Figure 4F uses patient tumor data from TCGA, not cell lines.' },
      ], source: ['fig4F', 'fig4G'] },
    { q: 'In Figure 2E the dots form a tight cloud around a rising regression line. What does this tell you?',
      options: [
        { t: 'The two biological replicates of the dropout screen agree, so the screen is reproducible', ok: true, why: 'Right (res-multipheno-p3): the authors report "a high correlation between biologically independent replicates", and Figure 2E shows it for the lncRNA candidates.' },
        { t: 'Every lncRNA in the cloud is a hit', ok: false, why: 'Agreement between replicates says nothing about which lncRNAs are hits; most dots sit near zero.' },
        { t: 'R tells you the share of dots that sit exactly on the line', ok: false, why: 'R measures how tightly the dots follow a straight line, not how many lie on it.' },
      ], source: ['fig2E', 'res-multipheno-p3'] },
  ],
});

/* ============================================================================================== F2 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'F2',
  body: [
    { k: 'h', text: 'Seven plots, seven tricks' },
    { k: 'bgnd', html:
      `<p>These plots pack many numbers into one picture. Each has one trick; once you know it, the plot is easy. Think of maps: a contour plot is a hiking map where height lines become crowd lines, a ternary plot is a compass with three directions at once, and a heatmap is a weather map in which colour replaces numbers.</p>` },
    { k: 'memory', html:
      `<p><b>Memory aid:</b> for every unusual plot ask "what does <i>position</i> mean here, and what do <i>colour</i> and <i>size</i> add?" Position, colour and size almost always carry three different pieces of information.</p>` },

    { k: 'h', text: 'Contour, volcano and heatmap' },
    { k: 'bgnd', html:
      `<p><b>Contour plot (density).</b> When thousands of dots overlap, rings are drawn around the crowded places, like height lines on a hiking map. Inner rings mark the busiest spots. Read where the peak sits and on which side of zero. Trap: rings show where points are dense, not how big any one value is.</p>` +
      `<p><b>Volcano plot.</b> The effect goes on the x-axis (log2 fold change) and significance on the y-axis as −log10 of the FDR or p-value, so <i>higher means more significant</i>. Targets with a big change and a small FDR fly out to the top left or top right, like lava. A horizontal line marks the cut-off. Trap: each step up is a ten times smaller FDR.</p>` +
      `<p><b>Heatmap.</b> A table in which colour replaces numbers: rows and columns are the things compared, and each cell's colour is its value. Everything depends on the colour key (which colour is zero, which way is up). Trap: two heatmaps may use different colour scales, and rows are often ordered to put similar rows together.</p>` },
    { k: 'worked', html:
      `<p><b>Worked example.</b> −log10(0.2) ≈ 0.7, so an FDR cut-off of 0.2 is a line at height 0.7 on the y-axis. An FDR of 0.001 sits at height 3.</p>` },
    { k: 'svg', caption: 'Made-up data. Contour: rings around a crowded cloud. Volcano: effect across, significance up. Heatmap: colour is the value.',
      svg: `<svg viewBox="0 0 480 232" role="img" aria-label="Three plot anatomies with made-up data: a contour plot with rings around a crowded cloud of dots, a volcano plot with a red cut-off line and blue hits at the top left and right, and a heatmap grid with a blue, grey and orange colour key">` +
        `<text x="82" y="20" class="mid b">Contour</text><text x="240" y="20" class="mid b">Volcano</text><text x="398" y="20" class="mid b">Heatmap</text>` +
        `<rect x="8" y="30" width="148" height="154" class="ln thin"/><rect x="166" y="30" width="148" height="154" class="ln thin"/><rect x="324" y="30" width="148" height="154" class="ln thin"/>` +
        `<path d="M108 30 V184 M8 80 H156" class="ln thin dash m"/>` +
        `<ellipse cx="66" cy="126" rx="48" ry="34" class="ln thin s-teal"/><ellipse cx="66" cy="126" rx="32" ry="23" class="ln thin s-teal"/><ellipse cx="66" cy="126" rx="15" ry="11" class="ln thin s-teal"/>` +
        `<circle cx="52" cy="128" r="2.5" class="solid-gray"/><circle cx="60" cy="118" r="2.5" class="solid-gray"/><circle cx="68" cy="124" r="2.5" class="solid-gray"/><circle cx="74" cy="114" r="2.5" class="solid-gray"/>` +
        `<circle cx="80" cy="128" r="2.5" class="solid-gray"/><circle cx="64" cy="134" r="2.5" class="solid-gray"/><circle cx="58" cy="108" r="2.5" class="solid-gray"/><circle cx="90" cy="122" r="2.5" class="solid-gray"/>` +
        `<circle cx="44" cy="140" r="2.5" class="solid-gray"/><circle cx="76" cy="142" r="2.5" class="solid-gray"/><circle cx="98" cy="130" r="2.5" class="solid-gray"/><circle cx="50" cy="104" r="2.5" class="solid-gray"/>` +
        `<circle cx="84" cy="106" r="2.5" class="solid-gray"/><circle cx="66" cy="126" r="2.5" class="solid-gray"/><circle cx="40" cy="122" r="2.5" class="solid-gray"/><circle cx="72" cy="120" r="2.5" class="solid-gray"/>` +
        `<path d="M240 30 V184" class="ln thin dash m"/><path d="M166 146 H314" class="ln dash s-red"/><text x="310" y="141" class="s end t-red">cut-off</text>` +
        `<text transform="rotate(-90 178 108)" x="178" y="108" class="mid s">−log10 FDR</text>` +
        `<circle cx="232" cy="174" r="2.5" class="solid-gray"/><circle cx="240" cy="170" r="2.5" class="solid-gray"/><circle cx="248" cy="176" r="2.5" class="solid-gray"/><circle cx="236" cy="164" r="2.5" class="solid-gray"/>` +
        `<circle cx="244" cy="160" r="2.5" class="solid-gray"/><circle cx="228" cy="168" r="2.5" class="solid-gray"/><circle cx="252" cy="166" r="2.5" class="solid-gray"/><circle cx="240" cy="178" r="2.5" class="solid-gray"/>` +
        `<circle cx="222" cy="172" r="2.5" class="solid-gray"/><circle cx="258" cy="174" r="2.5" class="solid-gray"/><circle cx="214" cy="158" r="2.5" class="solid-gray"/><circle cx="268" cy="158" r="2.5" class="solid-gray"/>` +
        `<circle cx="246" cy="152" r="2.5" class="solid-gray"/><circle cx="234" cy="154" r="2.5" class="solid-gray"/>` +
        `<circle cx="220" cy="134" r="3.5" class="solid-blue"/><circle cx="212" cy="124" r="3.5" class="solid-blue"/><circle cx="206" cy="112" r="3.5" class="solid-blue"/><circle cx="200" cy="98" r="3.5" class="solid-blue"/>` +
        `<circle cx="194" cy="84" r="3.5" class="solid-blue"/><circle cx="190" cy="68" r="3.5" class="solid-blue"/><circle cx="260" cy="134" r="3.5" class="solid-blue"/><circle cx="268" cy="124" r="3.5" class="solid-blue"/>` +
        `<circle cx="274" cy="112" r="3.5" class="solid-blue"/><circle cx="280" cy="98" r="3.5" class="solid-blue"/><circle cx="286" cy="84" r="3.5" class="solid-blue"/><circle cx="292" cy="68" r="3.5" class="solid-blue"/>` +
        `<text x="362" y="46" class="mid s">1</text><text x="388" y="46" class="mid s">2</text><text x="414" y="46" class="mid s">3</text><text x="440" y="46" class="mid s">4</text>` +
        `<text x="344" y="69" class="s end">A</text><text x="344" y="95" class="s end">B</text><text x="344" y="121" class="s end">C</text><text x="344" y="147" class="s end">D</text>` +
        `<rect x="350" y="52" width="24" height="24" class="solid-blue" opacity="0.85"/><rect x="376" y="52" width="24" height="24" class="solid-blue" opacity="0.55"/><rect x="402" y="52" width="24" height="24" class="solid-blue" opacity="0.25"/><rect x="428" y="52" width="24" height="24" class="solid-gray" opacity="0.25"/>` +
        `<rect x="350" y="78" width="24" height="24" class="solid-blue" opacity="0.6"/><rect x="376" y="78" width="24" height="24" class="solid-blue" opacity="0.3"/><rect x="402" y="78" width="24" height="24" class="solid-gray" opacity="0.25"/><rect x="428" y="78" width="24" height="24" class="solid-orange" opacity="0.3"/>` +
        `<rect x="350" y="104" width="24" height="24" class="solid-gray" opacity="0.25"/><rect x="376" y="104" width="24" height="24" class="solid-gray" opacity="0.25"/><rect x="402" y="104" width="24" height="24" class="solid-orange" opacity="0.3"/><rect x="428" y="104" width="24" height="24" class="solid-orange" opacity="0.6"/>` +
        `<rect x="350" y="130" width="24" height="24" class="solid-blue" opacity="0.2"/><rect x="376" y="130" width="24" height="24" class="solid-gray" opacity="0.25"/><rect x="402" y="130" width="24" height="24" class="solid-orange" opacity="0.5"/><rect x="428" y="130" width="24" height="24" class="solid-orange" opacity="0.85"/>` +
        `<text x="82" y="204" class="mid s m">rings = how crowded;</text><text x="82" y="220" class="mid s m">inner ring = busiest</text>` +
        `<text x="240" y="204" class="mid s m">up = more significant;</text><text x="240" y="220" class="mid s m">sides = bigger change</text>` +
        `<text x="398" y="204" class="mid s m">colour = value; key:</text>` +
        `<rect x="350" y="210" width="12" height="12" class="solid-blue" opacity="0.85"/><text x="366" y="221" class="s">−</text><rect x="382" y="210" width="12" height="12" class="solid-gray" opacity="0.25"/><text x="398" y="221" class="s">0</text><rect x="414" y="210" width="12" height="12" class="solid-orange" opacity="0.85"/><text x="430" y="221" class="s">+</text></svg>` },

    { k: 'h', text: 'ROC, ternary and petal plots' },
    { k: 'bgnd', html:
      `<p><b>ROC curve (recap of lesson E4).</b> The closer a curve hugs the top-left corner, the better the ranking; the AUC is the area under it; the diagonal is random guessing. Compare curves by their AUC. See it in <a href="#/panel/fig4B">Figure 4B</a>.</p>` +
      `<p><b>Ternary plot.</b> Each item sits inside a triangle according to the <i>shares</i> of three parts that add up to 100%. A dot in a corner is all one part; a dot in the middle is an even mix. It shows balance, not size: two dots in the same spot can have very different totals.</p>` +
      `<p><b>Petal plot.</b> A flower-shaped chart: each petal points to one category and its length shows that category's value. It lets you compare a few categories for one item at a glance.</p>` },

    { k: 'h', text: 'UpSet plots and stacked bars' },
    { k: 'bgnd', html:
      `<p><b>UpSet plot.</b> A Venn diagram for many sets. The bars on the left give the size of each set. In the dot matrix, one dot means "only this set" and joined dots mean "exactly these sets together". The bar above each column counts the items with exactly that combination. Trap: each item is counted once on top but in every set it belongs to on the left, so the left bars add up to more than the number of different items.</p>` +
      `<p><b>Stacked bar chart.</b> Each bar is split into segments that add up to the whole. It is good for composition ("what share is each part?") and poor for comparing a middle segment between bars, because those segments do not start from the same line. Check whether a bar means percent (all bars reach 100) or counts.</p>` },
    { k: 'svg', caption: 'Made-up data. Ternary: shares of three parts. Stacked bars: parts of a whole. UpSet: items in exactly one combination of sets.',
      svg: `<svg viewBox="0 0 480 232" role="img" aria-label="Three plot anatomies with made-up data: a ternary triangle with a dot near corner A and a dot in the middle, two stacked bars with segments that add to 100 percent, and a small UpSet plot with set-size bars on the left, a dot matrix and intersection bars on top">` +
        `<text x="82" y="20" class="mid b">Ternary</text><text x="240" y="20" class="mid b">Stacked bars</text><text x="398" y="20" class="mid b">UpSet</text>` +
        `<rect x="8" y="30" width="148" height="154" class="ln thin"/><rect x="166" y="30" width="148" height="154" class="ln thin"/><rect x="324" y="30" width="148" height="154" class="ln thin"/>` +
        `<path d="M82 50 L16 164 H148 Z" class="f-gray"/>` +
        `<text x="82" y="44" class="mid b">A</text><text x="14" y="179" class="mid b">B</text><text x="150" y="179" class="mid b">C</text>` +
        `<circle cx="80" cy="76" r="5" class="solid-orange"/><text x="102" y="80" class="s">mostly A</text>` +
        `<circle cx="82" cy="126" r="5" class="solid-blue"/><text x="82" y="146" class="mid s">even mix</text>` +
        `<text x="240" y="54" class="mid s m">= 100%</text><path d="M176 172 H304" class="ln"/>` +
        `<rect x="186" y="117" width="40" height="55" class="f-blue"/><rect x="186" y="84" width="40" height="33" class="f-orange"/><rect x="186" y="62" width="40" height="22" class="f-green"/>` +
        `<rect x="254" y="139" width="40" height="33" class="f-blue"/><rect x="254" y="106" width="40" height="33" class="f-orange"/><rect x="254" y="62" width="40" height="44" class="f-green"/>` +
        `<path d="M226 117 L254 139 M226 84 L254 106" class="ln thin dash m"/>` +
        `<text x="206" y="149" class="mid s">50</text><text x="206" y="105" class="mid s">30</text><text x="206" y="77" class="mid s">20</text>` +
        `<text x="274" y="160" class="mid s">30</text><text x="274" y="127" class="mid s">30</text><text x="274" y="89" class="mid s">40</text>` +
        `<rect x="394" y="52" width="12" height="56" class="f-blue"/><rect x="414" y="80" width="12" height="28" class="f-blue"/><rect x="434" y="84" width="12" height="24" class="f-blue"/><rect x="454" y="96" width="12" height="12" class="f-blue"/>` +
        `<text x="400" y="48" class="mid s">14</text><text x="420" y="76" class="mid s">7</text><text x="440" y="80" class="mid s">6</text><text x="460" y="92" class="mid s">3</text>` +
        `<path d="M334 121 H368 V131 H334 Z" class="f-gray"/><path d="M354 141 H368 V151 H354 Z" class="f-gray"/><path d="M353 161 H368 V171 H353 Z" class="f-gray"/>` +
        `<text x="382" y="131" class="mid s">S1</text><text x="382" y="151" class="mid s">S2</text><text x="382" y="171" class="mid s">S3</text>` +
        `<circle cx="400" cy="126" r="4" class="solid-gray" opacity="0.35"/><circle cx="400" cy="146" r="4" class="solid-gray" opacity="0.35"/><circle cx="400" cy="166" r="4" class="solid-gray" opacity="0.35"/>` +
        `<circle cx="420" cy="126" r="4" class="solid-gray" opacity="0.35"/><circle cx="420" cy="146" r="4" class="solid-gray" opacity="0.35"/>` +
        `<circle cx="440" cy="166" r="4" class="solid-gray" opacity="0.35"/>` +
        `<path d="M440 126 V146 M460 126 V166" class="ln thick"/>` +
        `<circle cx="400" cy="126" r="5" class="solid-text"/><circle cx="420" cy="166" r="5" class="solid-text"/><circle cx="440" cy="126" r="5" class="solid-text"/><circle cx="440" cy="146" r="5" class="solid-text"/>` +
        `<circle cx="460" cy="126" r="5" class="solid-text"/><circle cx="460" cy="146" r="5" class="solid-text"/><circle cx="460" cy="166" r="5" class="solid-text"/>` +
        `<text x="82" y="204" class="mid s m">closer to a corner =</text><text x="82" y="220" class="mid s m">a bigger share of it</text>` +
        `<text x="240" y="204" class="mid s m">segments add up to</text><text x="240" y="220" class="mid s m">the whole (100%)</text>` +
        `<text x="398" y="204" class="mid s m">top bar = items with</text><text x="398" y="220" class="mid s m">exactly that combination</text></svg>` },

    { k: 'h', text: 'Practise on the real panels' },
    { k: 'bgnd', html:
      `<p>Two more to find yourself: the <b>stacked bars</b> of <a href="#/panel/fig4D">Figure 4D</a> (what the hit lists are made of), and the ROC curves of <a href="#/panel/fig4B">Figure 4B</a>.</p>` },
    { k: 'panel', id: 'fig4E', html:
      `<p>A <b>contour plot</b> drawn over dots. Each dot is a hit; x is its effect in A549 cells and y its effect in H460 cells. Left: hits from the dropout screens, with a separate cloud for each cell line. Right: the pan-hallmark hits. The arrows point to the geometric median of each group (the legend's words), a robust "centre" of the cloud. The text says dropout hits tend to be active in only one cell type, while pan-hallmark hits are active in both.</p>` },
    { k: 'panel', id: 'fig2G', html:
      `<p>A <b>volcano-style plot</b> of the A549 dropout screen: log2 fold change across, −log10 FDR up, so higher means more significant. The horizontal dashed line is the cut-off for hits at FDR &lt; 0.2. Red dots are positive controls; labelled lncRNAs were published before in NSCLC (green) or other cancers (blue). In a dropout screen the hits are above the line and on the negative side, where guides were depleted.</p>` },
    { k: 'panel', id: 'fig5A', html:
      `<p>A <b>heatmap</b>: rows are lncRNAs, columns are ASOs in different cell lines, and colour is the mean log2 fold change in viability relative to the control ASO. Blue means lower viability; the key at the top gives the scale. MALAT1 is the positive control. Look for rows that stay blue in the cancer cell lines but fade in the "Normal" columns on the right.</p>` },
    { k: 'panel', id: 'fig4C', html:
      `<p>Two plot types in one panel. The <b>ternary plot</b> places each significant hit (FDR &lt; 0.2) by the balance of three hallmark significances, one per corner; the legend says closeness to a corner is driven by the TPP significance for that hallmark. Dot colour says which screens flagged the hit, red rings mark positive controls, grey rings neutral controls, and bigger dots have smaller FDR. The three <b>petal plots</b> at the edges zoom in on selected lncRNAs; the key box on the left explains the petals.</p>` },
    { k: 'panel', id: 'fig2I', html:
      `<p>An <b>UpSet plot</b> of the hits (FDR &lt; 0.2) in the individual screens. Left bars: hits per screen. Matrix: a single dot means hits found in that screen only; joined dots mean hits shared by exactly those screens. Top bars count each combination; the light-blue part (the legend's "bat" is a typo for bar) is the share of previously known cancer lncRNAs. The tallest bars sit above single dots: most hits come from one screen only.</p>` },
  ],
  appears: [
    { ref: 'fig4C', note: 'Ternary plot and petal plots of the pan-hallmark hits.' },
    { ref: 'fig2G', note: 'Volcano-style plot of the A549 dropout screen with the FDR < 0.2 line.' },
    { ref: 'fig2I', note: 'UpSet plot of hits across the individual screens.' },
    { ref: 'm-hits-p6', note: 'The R packages behind these plots (ggtern, UpSetR, precrec, Gmedian …).' },
  ],
  checks: [
    { q: 'In the volcano-style plot of Figure 2G (a dropout screen), which dots are the most convincing hits?',
      options: [
        { t: 'Dots far above the horizontal line and on the left (guides depleted)', ok: true, why: 'Right: higher means a smaller FDR, and for a dropout screen hits need a negative log2 fold change (m-hits-p3). The dashed line marks the FDR < 0.2 cut-off.' },
        { t: 'Dots at the very bottom, close to the centre', ok: false, why: 'Low on the plot means a large FDR, i.e. no evidence of an effect.' },
        { t: 'Dots on the far right', ok: false, why: 'A positive log2 fold change means the guides became more common. Hits in a dropout screen are depleted, so they lie on the left.' },
        { t: 'Red dots, because red always marks significance', ok: false, why: 'In this panel red marks the positive-control genes, not significance. Position shows significance.' },
      ], source: ['fig2G', 'm-hits-p3'] },
    { q: 'In an UpSet plot like Figure 2I, what does a top bar with a single dot underneath count?',
      options: [
        { t: 'Hits found in that one screen only', ok: true, why: 'Right: a single dot means "only this set". Joined dots mean hits shared by exactly those screens.' },
        { t: 'Hits found in every screen', ok: false, why: 'A hit found in every screen would sit under a column with all dots joined.' },
        { t: 'All hits of that screen, including shared ones', ok: false, why: 'That total is the bar on the left side of the plot, not the bar above a column.' },
      ], source: ['fig2I'] },
    { q: 'In the ternary plot of Figure 4C, what does a dot lying very close to one corner mean?',
      options: [
        { t: 'That hallmark gives most of the dot\'s combined significance, relative to the other two', ok: true, why: 'Right: the legend says proximity to a corner is driven by the TPP significance calculated for each hallmark. The plot shows balance, not total size.' },
        { t: 'It is a hit in that one screen only', ok: false, why: 'Which screens flagged a hit is shown by the dot colour ("Hit in:"), not by position.' },
        { t: 'It has the smallest FDR of all dots', ok: false, why: 'FDR is shown by dot size. A dot in a corner can be small or large.' },
      ], source: ['fig4C'] },
    { q: 'The text says the pan-hallmark analysis gave 80 lncRNA hits, 73 not previously linked to NSCLC. In the Pan bar of Figure 4D, which segments make up the 80?',
      options: [
        { t: 'The novel lncRNAs (73) plus the lung cancer lncRNAs (7)', ok: true, why: 'Right (res-integration-p2): 73 + 7 = 80. The other two segments of the bar are control genes that also appear in the hit list.' },
        { t: 'Only the novel lncRNAs (73)', ok: false, why: 'The 73 are the hits not previously linked to NSCLC; the 80 also includes the previously known ones.' },
        { t: 'The positive and neutral controls', ok: false, why: 'Controls are not lncRNA hits; they are control genes that also passed the cut-off.' },
      ], source: ['res-integration-p2', 'fig4D'], derived: ['7'] },
  ],
});

/* ============================================================================================== F3 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'F3',
  body: [
    { k: 'h', text: 'Genome-browser tracks' },
    { k: 'bgnd', html:
      `<p>A <b>genome-browser track</b> figure is a map of a stretch of DNA. The ruler on top gives the position on one chromosome and, as in lesson B3, the genome version (hg19 or hg38). Below it, every row, called a <i>track</i>, shows one kind of annotation drawn at its position: a gene's exons (boxes), its introns (thin lines), its TSS (a bent arrow), and so on. All rows share the same ruler, so you can read straight down a column and ask "what else sits under this exon?"</p>` },
    { k: 'svg', caption: 'A made-up gene and four evidence tracks on one ruler. The shaded column shows how to read straight down.',
      svg: `<svg viewBox="0 0 480 232" role="img" aria-label="A made-up genome-browser view: a ruler with a chromosome and genome version, a gene with three exons and a bent TSS arrow, and tracks for conservation, repeats and a CpG island, with one exon highlighted by a shaded column running down through all tracks">` +
        `<rect x="215" y="48" width="30" height="134" class="f-orange"/>` +
        `<text x="6" y="34" class="s b">chr8 · hg19</text><path d="M118 30 H470" class="ln thin"/><path d="M140 26 V34 M260 26 V34 M380 26 V34" class="ln thin"/>` +
        `<text x="140" y="18" class="mid s">10,000</text><text x="260" y="18" class="mid s">20,000</text><text x="380" y="18" class="mid s">30,000</text>` +
        `<text x="6" y="68" class="s b">Gene</text>` +
        `<path d="M130 58 V50 H146" class="arrow s-red"/><text x="158" y="54" class="s t-red b">TSS</text>` +
        `<rect x="130" y="58" width="22" height="14" class="f-green"/><path d="M152 65 H215 M245 65 H330" class="ln thin"/><rect x="215" y="58" width="30" height="14" class="f-green"/><rect x="330" y="58" width="70" height="14" class="f-green"/>` +
        `<text x="185" y="69" class="s mid m">›</text><text x="287" y="69" class="s mid m">›</text><text x="365" y="54" class="mid s">exon</text><text x="287" y="54" class="mid s">intron</text>` +
        `<text x="6" y="104" class="s b">Conservation</text><path d="M118 108 H470" class="ln thin m"/>` +
        `<rect x="132" y="94" width="4" height="14" class="solid-teal"/><rect x="140" y="98" width="4" height="10" class="solid-teal"/><rect x="146" y="92" width="4" height="16" class="solid-teal"/>` +
        `<rect x="218" y="90" width="5" height="18" class="solid-teal"/><rect x="226" y="94" width="5" height="14" class="solid-teal"/><rect x="234" y="88" width="5" height="20" class="solid-teal"/>` +
        `<rect x="334" y="100" width="4" height="8" class="solid-teal"/><rect x="360" y="96" width="5" height="12" class="solid-teal"/><rect x="388" y="102" width="4" height="6" class="solid-teal"/>` +
        `<rect x="180" y="105" width="3" height="3" class="solid-teal"/><rect x="270" y="104" width="3" height="4" class="solid-teal"/><rect x="300" y="106" width="3" height="2" class="solid-teal"/>` +
        `<text x="6" y="144" class="s b">Repeats</text><path d="M118 140 H470" class="ln thin m"/>` +
        `<rect x="168" y="134" width="26" height="12" class="f-red"/><text x="181" y="131" class="mid s">LINE</text>` +
        `<rect x="272" y="134" width="12" height="12" class="f-red"/><text x="278" y="131" class="mid s">SINE</text>` +
        `<rect x="352" y="134" width="22" height="12" class="f-red"/><text x="363" y="131" class="mid s">LTR</text>` +
        `<text x="6" y="176" class="s b">CpG island</text><path d="M118 172 H470" class="ln thin m"/><rect x="124" y="166" width="34" height="12" class="f-purple"/>` +
        `<text x="240" y="204" class="mid s m">each row = one kind of annotation, all on the same ruler</text>` +
        `<text x="240" y="222" class="mid s m">shaded column: what else lies under this exon?</text></svg>` },
    { k: 'bgnd', html:
      `<ul><li><b>Conservation (phastCons).</b> A score for how similar a stretch of DNA is across many species. DNA that evolution has kept unchanged is more likely to matter. "N-way" names how many genomes were lined up.</li>` +
      `<li><b>Repeat elements.</b> A large part of the human genome is repeated sequence; much of it is copies of old "jumping" DNA (transposable elements). Families include LINE, SINE and LTR; "simple repeat" and "low complexity" regions are short repeated patterns.</li>` +
      `<li><b>CpG island.</b> A stretch rich in the letter pair C-then-G, often found at the start of genes.</li>` +
      `<li><b>RIDLs.</b> Pieces of repeat DNA predicted to have taken on a new function inside a lncRNA.</li>` +
      `<li><b>Conserved RNA structures (CRS).</b> RNA fold shapes (stems and loops) that stay the same across vertebrates.</li></ul>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a genome browser is a street map with transparent layers: roads (genes), historic districts (conserved DNA), branches of the same chain store (repeats). You look straight down through the layers.</p>` },
    { k: 'paper', ref: 'm-eztracks-p1', quote: 'predicted neo-functionalized fragments of transposable elements, also known as RIDLs (repeat insertion domains of lncRNA), RNA structures conserved in vertebrates (CRS), and ENCODE candidate cis-regulatory elements.' },
    { k: 'plain', source: ['m-eztracks-p1', 'm-eztracks-p2', 'res-mechanism-p1'], html:
      `<p>The authors collected tracks for these features and drew them with a program called <b>ezTracks</b>. They merged all exons of a locus into one "meta-transcript" (using BEDTools), so the picture covers every place that is an exon in any isoform. Their reading, for GCAWKR: it "contains numerous conserved sequences and structures (Figure 6A), hinting at potential functional elements". CHiLL1's exons, by contrast, "lack obvious functional elements" (Figure S5E, which is not in the PDF).</p>` },
    { k: 'flag', source: ['m-eztracks-p1', 'fig5D', 'fig6A'], html:
      `<p>Heads-up on coordinates: the Methods say the tracks use the hg38 assembly and Figure 6A is labelled GENCODE v36, whereas Figure 5D prints hg19 and GENCODE Version 19 for the same GCAWKR locus. Different genome versions give different coordinates for one gene (lesson B3).</p>` },
    { k: 'panel', id: 'fig6A', html:
      `<p>GCAWKR drawn with <b>ezTracks</b>. Top: the gene's exons (grey boxes) with the TSS arrow; pale orange columns run down from each exon through all the tracks. Rows below: RIDLs, phastCons conservation, conserved RNA structures (CRSs), repeats split by class (DNA, LINE, low complexity, LTR, simple repeat, SINE), a masked CpG island, and ENCODE candidate regulatory elements. The legend says strand is shown by the direction of each element. No scale bar or colour key is printed.</p>` },

    { k: 'h', text: 'DNA gels' },
    { k: 'bgnd', html:
      `<p>A DNA gel (lesson D7) sorts pieces of DNA by size. Each lane is one sample, loaded at the top; a current pulls the pieces down, and smaller pieces travel farther. A <b>ladder</b> lane of pieces of known size acts as a ruler. Read it in four steps: (1) what is in each lane; (2) use the ladder to read sizes; (3) compare bands between lanes; (4) check the controls: a water lane must be empty, and the control sample shows the unedited band.</p>` +
      `<p>Trap: a band's brightness is only a rough guide to how much DNA there is, and a faint extra band can simply be a few unedited copies.</p>` },
    { k: 'h', text: 'Flow-cytometry plots' },
    { k: 'bgnd', html:
      `<p>In flow cytometry (lesson D3) each dot is one cell. <b>FSC-A</b> (forward scatter) measures how much light a cell scatters forward as it passes the laser; it roughly tracks cell size. The other axis is usually a fluorescence channel on a log scale; "Pacific Blue" is a blue-light channel, here used to detect a blue fluorescent protein. Colours show how crowded the dots are. A <b>gate</b> is a box around the cells you want, and the percentage is the share of all measured cells inside it. Trap: authors draw the gate, so a trustworthy figure shows a negative control that justifies where it starts.</p>` },
    { k: 'svg', caption: 'Made-up data. Left: a gel with a ladder, a control, an edited sample and a water lane. Right: a flow plot with a gate.',
      svg: `<svg viewBox="0 0 480 262" role="img" aria-label="Left: a made-up DNA gel with four lanes, a size ladder, a control with one long band, an edited sample with a faint long band and a stronger short band, and an empty water lane. Right: a made-up flow plot with a grey cluster of cells on the left, a blue cluster on the right inside a red gate">` +
        `<text x="149" y="20" class="mid b">DNA gel</text><text x="387" y="20" class="mid b">Flow plot</text>` +
        `<rect x="46" y="54" width="206" height="146" class="f-gray"/>` +
        `<text x="72" y="46" class="mid s">ladder</text><text x="123" y="46" class="mid s">control</text><text x="175" y="46" class="mid s">edited</text><text x="226" y="46" class="mid s">water</text>` +
        `<rect x="59" y="57" width="26" height="4" class="solid-text"/><rect x="110" y="57" width="26" height="4" class="solid-text"/><rect x="162" y="57" width="26" height="4" class="solid-text"/><rect x="213" y="57" width="26" height="4" class="solid-text"/>` +
        `<rect x="58" y="74" width="28" height="3" class="solid-text"/><rect x="58" y="88" width="28" height="3" class="solid-text"/><rect x="58" y="130" width="28" height="3" class="solid-text"/><rect x="58" y="152" width="28" height="3" class="solid-text"/><rect x="58" y="172" width="28" height="3" class="solid-text"/>` +
        `<rect x="109" y="86" width="28" height="7" class="solid-text"/>` +
        `<rect x="161" y="87" width="28" height="4" class="solid-text" opacity="0.4"/><rect x="161" y="150" width="28" height="7" class="solid-text"/>` +
        `<text x="44" y="92" class="s end">3 kb</text><text x="44" y="134" class="s end">1 kb</text><text x="44" y="176" class="s end">250 bp</text>` +
        `<text x="149" y="220" class="mid s m">smaller pieces run farther down</text><text x="149" y="238" class="mid s m">water lane: no band = clean PCR</text>` +
        `<path d="M308 190 H466 M308 190 V54" class="ln"/><text x="288" y="122" class="mid s" transform="rotate(-90 288 122)">FSC-A</text>` +
        `<text x="308" y="206" class="s">low</text><text x="466" y="206" class="s end">high</text><text x="387" y="206" class="mid s">blue light</text>` +
        `<circle cx="336" cy="144" r="3" class="solid-gray"/><circle cx="346" cy="136" r="3" class="solid-gray"/><circle cx="354" cy="150" r="3" class="solid-gray"/><circle cx="342" cy="154" r="3" class="solid-gray"/>` +
        `<circle cx="358" cy="138" r="3" class="solid-gray"/><circle cx="330" cy="136" r="3" class="solid-gray"/><circle cx="350" cy="162" r="3" class="solid-gray"/><circle cx="364" cy="152" r="3" class="solid-gray"/>` +
        `<circle cx="432" cy="108" r="3" class="solid-blue"/><circle cx="440" cy="116" r="3" class="solid-blue"/><circle cx="448" cy="104" r="3" class="solid-blue"/><circle cx="438" cy="124" r="3" class="solid-blue"/>` +
        `<circle cx="426" cy="120" r="3" class="solid-blue"/><circle cx="454" cy="116" r="3" class="solid-blue"/><circle cx="444" cy="132" r="3" class="solid-blue"/><circle cx="434" cy="98" r="3" class="solid-blue"/>` +
        `<circle cx="420" cy="110" r="3" class="solid-blue"/><circle cx="458" cy="128" r="3" class="solid-blue"/><circle cx="446" cy="94" r="3" class="solid-blue"/><circle cx="430" cy="134" r="3" class="solid-blue"/>` +
        `<rect x="410" y="84" width="62" height="62" class="ln s-red"/><text x="441" y="78" class="mid s t-red b">gate: 70%</text>` +
        `<text x="380" y="238" class="mid s m">each dot = one cell;</text><text x="380" y="254" class="mid s m">% = share of cells in the gate</text></svg>` },
    { k: 'h', text: 'A gel and a flow plot in the paper' },
    { k: 'panel', id: 'fig1E', html:
      `<p>Top: a genome-browser view of DNMBP-AS1 with the PCR primers (F and R), the TSS target region and the ten library pgRNAs (red bars). Bottom: the gel. The legend says the PCR used DNA from cells given a non-targeting pgRNA (control) or pgRNA_9 (KO), and that the expected lengths of the wild-type and deletion products are marked. Read it: the control lane has one long band (wild type); the pgRNA_9 lane has a shorter band (the deletion) plus a faint long one (copies that were not cut); the water lane is empty.</p>` },
    { k: 'panel', id: 'fig1D', html:
      `<p>Each dot is one A549 cell that carries Cas9 and a blue fluorescent protein (BFP); more blue light puts a cell further right. The black box is the gate around the BFP-positive cells, and the legend says the boxed cells are the populations sorted and used in the screens. The number beside the box is the share of cells inside it. This panel does not show a negative control; the text also cites Figure S1E, which is not in the PDF.</p>` },

    { k: 'h', text: 'Microscopy and FISH images' },
    { k: 'bgnd', html:
      `<p>A microscope picture is evidence only if you can tell what is in it. Look for a <b>scale bar</b> (how big is this?), labels for each colour, and arrows (what the authors want you to see). "Representative" means one picture chosen from many, so the number beside it, from counting many cells, is the real result. In RNA-FISH (lesson D9), glowing probes stick to one RNA, and each bright spot is usually one RNA molecule. Counting spots in the cytoplasm versus the nucleus gives a ratio.</p>` },
    { k: 'panel', id: 'fig6B', html:
      `<p>Confocal pictures of RNA-FISH in A549 cells. Arrows mark selected lncRNA foci (spots). The bar chart counts spots in the cytoplasm versus the nucleus, and the text reads it so: CHiLL1 is located principally in the cytoplasm and GCAWKR in the nucleus. Mind the small print: the legend says "N/C" but the axis reads "Cytoplasmic/Nuclear ratio"; the bar chart carries a single n; and no scale bar is printed on the images (the spheroid photos in Figure 5E do carry one).</p>` },
  ],
  appears: [
    { ref: 'm-eztracks-p1', note: 'The feature tracks behind Figure 6A: RIDLs, CRSs, phastCons, repeats, CpG islands, ENCODE elements.' },
    { ref: 'm-eztracks-p2', note: 'Exons of each locus merged into a meta-transcript (BEDTools) and drawn beside the tracks.' },
    { ref: 'fig1E', note: 'A genome-browser view and a DNA gel proving the TSS deletion.' },
    { ref: 'fig1D', note: 'A flow plot (FSC-A against a blue channel) with a gate around BFP-positive cells.' },
    { ref: 'res-mechanism-p1', note: 'FISH shows CHiLL1 mainly in the cytoplasm and GCAWKR in the nucleus; GCAWKR has conserved sequences and structures.' },
  ],
  checks: [
    { q: 'In the gel of Figure 1E, the pgRNA_9 lane shows a shorter band that the control lane lacks. What does that band show?',
      options: [
        { t: 'In some copies of the DNA, the stretch between the two cuts was deleted, so the PCR product is shorter', ok: true, why: 'Right: the primers flank the deleted region (m-pcr-gdna-p1), so edited copies give a shorter product, and smaller pieces run farther down the gel.' },
        { t: 'It is the piece of DNA that was cut out, floating free', ok: false, why: 'The PCR only copies DNA between the two primers. The band is a product that spans the deletion, not the removed piece.' },
        { t: 'It shows that DNMBP-AS1 RNA is lower', ok: false, why: 'This gel is a PCR on genomic DNA. RNA levels were measured separately by qRT-PCR (Figure 1F).' },
      ], source: ['fig1E', 'm-pcr-gdna-p1'] },
    { q: 'In the flow plot of Figure 1D, what does the black box around the cells on the right stand for?',
      options: [
        { t: 'A gate around the BFP-positive cells that were sorted and used in the screens', ok: true, why: 'Right (fig1D legend): "Boxes indicated the sorted cell populations used in screens". The percentage is the share of all measured cells inside the gate.' },
        { t: 'The cells that died during sorting', ok: false, why: 'The plot has no death marker. Position shows blue fluorescence (x) and forward scatter (y).' },
        { t: 'A P value for the effect of Cas9', ok: false, why: 'A gate is a region of the plot, not a statistical result.' },
      ], source: ['fig1D'] },
    { q: 'What does the paper conclude from the tracks of GCAWKR in Figure 6A?',
      options: [
        { t: 'GCAWKR contains numerous conserved sequences and structures, hinting at potential functional elements', ok: true, why: 'Right (res-mechanism-p1). CHiLL1, by contrast, lacks obvious functional elements.' },
        { t: 'GCAWKR contains no conserved sequences', ok: false, why: 'The opposite: the paper says it contains "numerous conserved sequences and structures".' },
        { t: 'GCAWKR is a protein-coding gene', ok: false, why: 'Tracks of conservation and RNA structure do not show that. The paper treats GCAWKR as a lncRNA.' },
      ], source: ['res-mechanism-p1', 'fig6A'] },
    { q: 'What do the FISH images and their counting in Figure 6B show?',
      options: [
        { t: 'CHiLL1 is located principally in the cytoplasm and GCAWKR in the nucleus', ok: true, why: 'Right (res-mechanism-p1): "contrasting localization patterns", later backed up by cell fractionation.' },
        { t: 'CHiLL1 is in the nucleus and GCAWKR in the cytoplasm', ok: false, why: 'Reversed. Check the ratio in the bar chart: above the line means cytoplasm.' },
        { t: 'Both lncRNAs sit in the nucleus', ok: false, why: 'The paper stresses that despite similar oncogenic roles they show contrasting localization.' },
      ], source: ['res-mechanism-p1', 'fig6B'] },
  ],
});

/* ============================================================================================== F4 */
(window.LESSON_CONTENT = window.LESSON_CONTENT || []).push({
  id: 'F4',
  body: [
    { k: 'h', text: 'A panel is a claim; the legend is the small print' },
    { k: 'bgnd', html:
      `<p>A panel says "this treatment lowered growth". Whether you should believe it depends on small print: how many repeats, what the error bars mean, which test produced the P label. Good legends state all of it. Many legends, including some in this paper, leave parts out. This lesson is a checklist you can run on any panel.</p>` },
    { k: 'memory', html:
      `<p><b>Analogy:</b> a legend is the ingredients label on food. The picture is the appetising photo on the front; the label says what is really inside. A label with missing lines does not prove the food is bad, but you cannot check it.</p>` },
    { k: 'svg', caption: 'A made-up panel and the six questions to ask of it.',
      svg: `<svg viewBox="0 0 480 300" role="img" aria-label="A made-up bar chart with a control bar set to 1.0, two treated bars with error bars, an n label, a P label bracket and an ns bracket, with six numbered callouts matched to a checklist of six questions on the right">` +
        `<text x="130" y="20" class="mid b">A made-up panel</text><text x="376" y="20" class="mid b">Ask six questions</text>` +
        `<path d="M50 50 V230 H250" class="ln"/><path d="M50 110 H250" class="ln thin dash m"/>` +
        `<text x="44" y="234" class="s end">0</text><text x="44" y="174" class="s end">0.5</text><text x="44" y="114" class="s end">1.0</text>` +
        `<text transform="rotate(-90 12 140)" x="12" y="140" class="mid s">relative growth</text>` +
        `<rect x="70" y="110" width="30" height="120" class="f-gray"/><path d="M85 98 V122 M79 98 H91 M79 122 H91" class="ln thin"/>` +
        `<rect x="118" y="170" width="30" height="60" class="f-blue"/><path d="M133 156 V184 M127 156 H139 M127 184 H139" class="ln thin"/>` +
        `<rect x="166" y="122" width="30" height="108" class="f-blue"/><path d="M181 106 V138 M175 106 H187 M175 138 H187" class="ln thin"/>` +
        `<text x="85" y="248" class="mid s">control</text><text x="133" y="248" class="mid s">ASO 1</text><text x="181" y="248" class="mid s">ASO 2</text>` +
        `<text x="58" y="44" class="s">n = 3</text>` +
        `<path d="M85 92 V84 H133 V92" class="ln thin"/><text x="109" y="78" class="mid s">P = 0.02</text>` +
        `<path d="M85 60 V52 H181 V60" class="ln thin"/><text x="133" y="46" class="mid s">ns</text>` +
        `<circle cx="104" cy="38" r="9" class="f-orange"/><text x="104" y="43" class="mid s b">1</text>` +
        `<circle cx="153" cy="158" r="9" class="f-orange"/><text x="153" y="163" class="mid s b">2</text>` +
        `<circle cx="151" cy="72" r="9" class="f-orange"/><text x="151" y="77" class="mid s b">3</text>` +
        `<circle cx="156" cy="42" r="9" class="f-orange"/><text x="156" y="47" class="mid s b">4</text>` +
        `<circle cx="85" cy="152" r="9" class="f-orange"/><text x="85" y="157" class="mid s b">5</text>` +
        `<circle cx="28" cy="150" r="9" class="f-orange"/><text x="28" y="155" class="mid s b">6</text>` +
        `<circle cx="272" cy="44" r="9" class="f-orange"/><text x="272" y="49" class="mid s b">1</text><text x="288" y="42" class="s">n: how many, and of what?</text><text x="288" y="58" class="s">Legend and plot agree?</text>` +
        `<circle cx="272" cy="90" r="9" class="f-orange"/><text x="272" y="95" class="mid s b">2</text><text x="288" y="88" class="s">Error bars: SD, SEM or range?</text><text x="288" y="104" class="s">Only the legend can say.</text>` +
        `<circle cx="272" cy="136" r="9" class="f-orange"/><text x="272" y="141" class="mid s b">3</text><text x="288" y="134" class="s">P label: which two bars?</text><text x="288" y="150" class="s">Which test? One or two tails?</text>` +
        `<circle cx="272" cy="182" r="9" class="f-orange"/><text x="272" y="187" class="mid s b">4</text><text x="288" y="180" class="s">ns = not significant,</text><text x="288" y="196" class="s">not "no effect"</text>` +
        `<circle cx="272" cy="228" r="9" class="f-orange"/><text x="272" y="233" class="mid s b">5</text><text x="288" y="226" class="s">Reference: what equals 1.0?</text><text x="288" y="242" class="s">(here the control bar)</text>` +
        `<circle cx="272" cy="274" r="9" class="f-orange"/><text x="272" y="279" class="mid s b">6</text><text x="288" y="272" class="s">Axis: zero start? log scale?</text><text x="288" y="288" class="s">Units? Same scale throughout?</text></svg>` },
    { k: 'h', text: 'The six questions' },
    { k: 'bgnd', html:
      `<ul><li><b>1. n.</b> How many repeats, and of what: independent experiments (biological replicates), repeat measurements of one sample (technical replicates), cells, genes, patients? Does the n printed inside the plot match the legend?</li>` +
      `<li><b>2. Error bars.</b> SD, SEM or range? With a very small n the SD is itself very uncertain: with n = 2 it rests on two numbers.</li>` +
      `<li><b>3. P label.</b> Which two groups does it compare? Which test, one-tailed or two-tailed? Was anything done about running many comparisons (lesson E4)?</li>` +
      `<li><b>4. "ns" and asterisks.</b> "ns" means the result did not pass the significance threshold: the data could not rule out chance. It does not mean "no effect". More asterisks mean a smaller P, but each paper defines its own steps, so look for a key.</li>` +
      `<li><b>5. Reference.</b> What is the control, and what value is it set to?</li>` +
      `<li><b>6. Images.</b> A "representative" picture is one chosen from many. The measurement beside it is the evidence.</li></ul>` },
    { k: 'worked', html:
      `<p><b>Worked example (made-up).</b> The same data give a two-tailed P = 0.06: not significant at 0.05. If the authors had chosen a one-tailed test <i>and</i> the effect went in the predicted direction, the one-tailed P is half of that, 0.03, which passes. That is why a one-tailed test needs a reason fixed before the data are seen, and why you should look for it in the legend.</p>` },

    { k: 'h', text: 'The paper promises the details' },
    { k: 'paper', ref: 'm-quant-p3', quote: 'Specific details concerning statistical tests for individual experiments are noted in the relevant Figure legends.' },
    { k: 'plain', source: ['m-quant-p3', 'm-hits-p4'], html:
      `<p>The Methods set the default bar at p ≤ 0.05 (the screens use FDR &lt; 0.2 instead) and promise that each legend holds its test details. Below: what the legends leave unsaid, then three real panels to check for yourself.</p>` },
    { k: 'h', text: 'What the legends leave unsaid' },
    { k: 'plain', source: ['fig3D', 'fig3F', 'fig5E', 'fig5F', 'fig5G', 'fig6L', 'fig4H', 'fig5C', 'fig3C', 'fig5B', 'm-hits-p4'], html:
      `<ul><li><b>Why one-tailed?</b> Many legends name a one-tailed test (Figures 3D, 3F, 5E, 5F, 6L; a one-tailed Mann–Whitney test in 5G; a one-sided Fisher test in 4H). None says why.</li>` +
      `<li><b>Many comparisons.</b> Several bars are tested against one control (Figures 3F and 5E, for example). I found no mention of a correction for this in the legends or the Methods; the only correction named is Benjamini–Hochberg, for the screens.</li>` +
      `<li><b>Which n.</b> The legend of Figure 3F says the data come from "three independent biological replicates", but its qRT-PCR plot prints a smaller n than its migration plot.</li>` +
      `<li><b>Which time point, which stars.</b> Figure 5C prints asterisks and coloured P values on its curves, but its legend does not say which time point was tested; Figure 3C's legend does ("the last time point"). Only Figure 5B defines its asterisks ("****p &lt; 0.0001").</li></ul>` },
    { k: 'h', text: 'Check three real panels' },
    { k: 'panel', id: 'fig1F', html:
      `<p>The legend is one sentence about what was measured. It gives no n, no definition of the error bars and no test. The picture itself prints an n and P labels, with "ns" over two of the guides; the error bars stay undefined. Everything else has to be read off the picture.</p>` },
    { k: 'panel', id: 'fig3D', html:
      `<p>The legend gives "n = 4; error bars indicate SD" and a one-tailed Student's t test for the whole panel. But each small plot prints its own n, and the bar charts on the right print a smaller n than the curves on the left. P labels appear only on the curves. Which n applies where? The legend does not say.</p>` },
    { k: 'panel', id: 'fig6K', html:
      `<p>The legend says "n = 2 biological replicates, error bars: SD" with a two-tailed Student's t test. An SD computed from two numbers is very rough, and a t test with two repeats per group has little power. The plot shows P labels for some pairs and "ns" for others, but not the two values behind each bar.</p>` },
  ],
  appears: [
    { ref: 'm-quant-p3', note: 'The default threshold (p ≤ 0.05) and the promise that legends give the test details.' },
    { ref: 'fig1F', note: 'A legend with no n, error-bar definition or test.' },
    { ref: 'fig3D', note: 'One n in the legend, different n values printed inside the plots.' },
    { ref: 'fig6K', note: 'n = 2 biological replicates with SD error bars and t tests.' },
  ],
  checks: [
    { q: 'The legend of Figure 6K says "n = 2 biological replicates, error bars: SD" and names a two-tailed Student\'s t test. What is the main caution?',
      options: [
        { t: 'With only two repeats per group, the SD and the P values are very uncertain, and the plot hides the two values behind each bar', ok: true, why: 'Right: an SD from two numbers is very rough, and a t test on two repeats has little power.' },
        { t: 'Error bars cannot be drawn when n = 2', ok: false, why: 'They can; the point is that an SD from two numbers carries little information.' },
        { t: 'A two-tailed test is not allowed when n = 2', ok: false, why: 'A two-tailed test can be run. The concern is the tiny n, not the tails.' },
      ], source: ['fig6K'] },
    { q: 'The Methods say test details are given in the legends. What does the legend of Figure 1F contain?',
      options: [
        { t: 'Only what was measured (qRT-PCR of DNMBP-AS1 RNA after CRISPR-del): no n, no error-bar definition and no test', ok: true, why: 'Right (fig1F): the n, the P labels and "ns" appear only inside the picture, and the error bars are never defined.' },
        { t: 'The n, the meaning of the error bars and a one-tailed t test', ok: false, why: 'That is closer to the legends of Figures 3D, 5E or 5F, not 1F.' },
        { t: 'The test name but not the n', ok: false, why: 'The legend of Figure 1F names no test at all.' },
      ], source: ['fig1F', 'm-quant-p3'] },
    { q: 'Two bars in a panel are joined by "ns". Which reading is right?',
      options: [
        { t: 'The difference did not pass the significance threshold (p ≤ 0.05 by default in this paper); that does not prove the bars are equal', ok: true, why: 'Right: "ns" says the data could not rule out chance, which is weaker than "no difference". With a small n, real effects often come out "ns".' },
        { t: 'The two bars are equal', ok: false, why: '"ns" is about evidence, not equality. The bars can differ and still be "ns".' },
        { t: 'The test was not run', ok: false, why: 'The test was run; its result was above the threshold.' },
      ], source: ['m-quant-p3'] },
  ],
});
