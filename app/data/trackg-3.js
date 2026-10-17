/* Track G study layer (part 3): res-mechanism, discussion, limitations, ack, contrib, decl */
window.TRACKG = window.TRACKG || { paras: {}, units: {} };

Object.assign(window.TRACKG.paras, {

  /* ------------------------------------------------------------------ res-mechanism */
  'res-mechanism-p1': {
    plain: `<p>Next, the authors asked <i>how</i> CHiLL1 and GCAWKR might work (their "modes of action"). CHiLL1's exons show no obvious functional elements (Figure S5E). GCAWKR, in contrast, contains many conserved sequences and structures (Figure 6A), which hints that it may carry functional elements.</p>` +
           `<p>Where an RNA sits in the cell gives important clues about how it works. Surprisingly, although the two lncRNAs have similar cancer-promoting roles, RNA-FISH showed opposite locations: CHiLL1 is found mainly in the cytoplasm, and GCAWKR in the nucleus (Figure 6B). The authors say the specificity of the FISH signal was validated by knockdown (Figure S5G), and that a second method, cell fractionation, backed up the result (Figure 6C).</p>` +
           `<p><b>Where to look.</b> Figure 6A is a gene map of GCAWKR: gray boxes are exons, and the rows underneath mark known features (for example conserved stretches) that overlap them. In Figure 6B, arrows mark RNA spots in the microscope images, and the bar chart gives a cytoplasm-to-nucleus (C/N) ratio: a bar above the horizontal line (a ratio of 1) means more RNA in the cytoplasm. In Figure 6C, a bar pointing left means more RNA in the nucleus (the axis is printed backwards); MALAT1 and GAPDH are the nuclear and cytosolic controls.</p>`,
    why: `This paragraph opens the "how do they work?" part of the paper. It uses where each RNA sits in the cell (cytoplasm or nucleus) as the first clue that the two lncRNAs work in different ways.`,
    memory: `Knowing where someone works (a head office or a street stall) hints at what they do, but does not prove it. The analogy breaks down because an RNA can sit in more than one place and have more than one job.`,
    flags: [
      `Figures S5E and S5G are supplementary and are not in your PDF, so the "no obvious functional elements" for CHiLL1 and the specificity check cannot be seen here.`,
      `Figure 6A is only a hint: the authors write "hinting at potential functional elements". The panel lines up public annotations with the gene; it does not test whether any element matters.`,
      `Check the sample sizes: Figure 6B prints "n=1" with no error bars or P values, and Figure 6C prints "n=2" with no P values; the legends do not say what "n" counts. The title inside Figure 6B is printed "Fluoscence in-situ hybridisation (FISH)" (sic).`,
    ],
    prereqs: ['B6', 'D9', 'F3'],
    sources: ['fig6B', 'fig6C'],
    checks: [
      { q: 'According to the FISH result described here, where do the two lncRNAs mainly sit?',
        options: [
          { t: 'CHiLL1 mainly in the cytoplasm, GCAWKR in the nucleus', ok: true, why: 'Right (Figure 6B). The authors call it surprising because both lncRNAs have similar cancer-promoting roles.' },
          { t: 'CHiLL1 in the nucleus, GCAWKR mainly in the cytoplasm', ok: false, why: 'This is reversed: CHiLL1 is the cytoplasmic one and GCAWKR the nuclear one.' },
          { t: 'Both mainly in the cytoplasm, matching their similar roles', ok: false, why: 'The paragraph says the patterns contrast "despite their similar oncogenic roles", so the locations differ.' },
          { t: 'Both mainly in the nucleus', ok: false, why: 'Only GCAWKR is mainly nuclear; CHiLL1 is mainly in the cytoplasm.' },
        ] },
      { q: 'In the cell fractionation of Figure 6C, why were MALAT1 and GAPDH measured as well?',
        options: [
          { t: 'They are controls for the fractionation: MALAT1 marks the nuclear fraction and GAPDH the cytosolic fraction, so you can see the compartments were separated', ok: true, why: 'Right: the legend says MALAT1 and GAPDH are used as nuclear and cytosolic controls, respectively.' },
          { t: 'They are two more lncRNAs that the authors found to promote cancer', ok: false, why: 'Here they are only reference RNAs; the two lncRNAs of interest are CHiLL1 and GCAWKR.' },
          { t: 'They are the RNAs that the ASOs were designed to knock down', ok: false, why: 'The ASOs target CHiLL1 and GCAWKR themselves; MALAT1 and GAPDH are not knockdown targets in this panel.' },
          { t: 'They show that equal numbers of cells were put into the nuclear and cytoplasmic fractions', ok: false, why: 'Fractionation controls check that nucleus and cytoplasm were properly separated, not how many cells were used.' },
        ], source: ['res-mechanism-p1', 'fig6C'] },
    ],
  },

  'res-mechanism-p2': {
    plain: `<p>To learn more about how CHiLL1 works, the authors used RNA-seq to measure the transcriptome (all the RNAs) of A549 cells treated with CHiLL1 ASOs. They call this "molecular phenotyping": looking at molecular changes, not only at growth. In control cells, CHiLL1 was at 8.3 transcripts per million (TPM). The authors say this equals about 4 molecules per cell and agrees with the FISH result.</p>` +
           `<p>RNA-seq also confirmed that the ASOs lowered CHiLL1 (Figures 6D and S6A). The changes in the transcriptome were highly correlated between the two ASOs. The authors read this as showing that most of the effects come from on-target perturbation of CHiLL1, that is, from losing CHiLL1 itself (Figure 6E). A similar correlation was seen in H460 cells (Figure S6B). They add that the CHiLL1-dependent changes were also correlated between A549 and H460, which further confirms that these changes are general (Figure S6C).</p>` +
           `<p><b>Where to look.</b> In Figure 6D, the box plots show CHiLL1 RNA in three replicates: the ASO1 boxes sit lower than the ASO control boxes. In Figure 6E, each dot is a gene; across is its fold change with ASO1 and up is its fold change with ASO2. Dots that follow the diagonal line mean the two ASOs moved the gene in the same way (R=0.75 is printed in the corner).</p>`,
    why: `Shows that CHiLL1 is a low-copy RNA and that two different ASOs change largely the same genes. This is the key evidence that the transcriptome changes come from losing CHiLL1 (on-target) and not from ASO side effects.`,
    memory: `Two witnesses with different backgrounds who tell the same story are more believable than one. Here the "witnesses" are two ASOs with different sequences. Where it breaks down: strong agreement is good support, not proof.`,
    flags: [
      `The paragraph does not explain how 8.3 TPM was turned into "∼4 molecules per cell"; read it as the authors' estimate.`,
      `The H460 results and the A549-versus-H460 comparison (Figures S6B and S6C) are supplementary and are not in your PDF.`,
    ],
    prereqs: ['D6', 'E2', 'D10'],
    sources: ['fig6E'],
    checks: [
      { q: 'Why does a high correlation between the gene changes caused by two different CHiLL1 ASOs support an on-target effect?',
        options: [
          { t: 'Two ASOs with different sequences are unlikely to share the same accidental side effects, so shared changes most likely come from losing CHiLL1 itself', ok: true, why: 'Right. This is the authors\' reasoning ("indicating that the majority of effects arise via on-target perturbation of CHiLL1"). It is strong support, not proof.' },
          { t: 'It proves that both ASOs knocked CHiLL1 down completely', ok: false, why: 'Knockdown was confirmed by measuring CHiLL1 RNA itself (Figure 6D). A correlation says something else: that the downstream changes agree.' },
          { t: 'It shows that CHiLL1 switches those genes on directly, like a transcription factor', ok: false, why: 'A correlation between ASOs says nothing about the mechanism, and the paragraph does not claim a direct action.' },
          { t: 'It shows that the ASOs entered every cell equally', ok: false, why: 'A correlation of gene changes is not a measure of delivery.' },
        ] },
      { q: 'In control cells CHiLL1 was at 8.3 TPM. What does the paragraph say this is equivalent to?',
        options: [
          { t: 'About 40 molecules per cell', ok: false, why: 'That would be ten times too high; the paper says about 4 molecules per cell.' },
          { t: 'About 4 molecules per cell, consistent with FISH', ok: true, why: 'Right: "equivalent to ∼4 molecules per cell and consistent with FISH". CHiLL1 is a low-copy RNA.' },
          { t: 'Less than one molecule per cell, too rare to be seen by FISH', ok: false, why: 'The paragraph says about 4 molecules per cell and that this is consistent with the FISH result.' },
          { t: 'About 8.3 molecules per cell, because TPM is a count per cell', ok: false, why: 'TPM is a relative measure (transcripts per million transcripts), not a count per cell; the paper converts it to about 4 molecules per cell.' },
        ] },
    ],
  },

  'res-mechanism-p3': {
    plain: `<p>Next, the authors asked which groups of related genes were over-represented among the genes that changed when CHiLL1 was knocked down. This is called enrichment analysis. To keep only the more reliable changes, they used a "high-confidence" set: genes that changed with both ASOs. With this set they found enriched KEGG terms (Figures 6F and S6D).</p>` +
           `<p>These terms fit the disease ("non-small cell lung cancer" is one of them) and also suggest possible mechanisms: the MAPK and PI3K-Akt pathways. The two cell backgrounds, A549 and H460, agreed closely, which again supports the idea that CHiLL1's effects are general across KRAS+ NSCLC cells.</p>` +
           `<p><b>Where to look.</b> In Figure 6F, each dot is one KEGG pathway: its position across shows how significant it is in A549, and its position up shows how significant it is in H460. The green labels mark the cancer-relevant pathways that are significant in both cell lines, for example "Non-small cell lung cancer", "MAPK signaling pathway" and "PI3K-Akt signaling pathway".</p>`,
    why: `Turns a long list of changed genes into a short list of pathways. It links CHiLL1 to the disease (non-small cell lung cancer) and to possible mechanisms (MAPK, PI3K-Akt), and it checks that two cell lines agree.`,
    flags: [
      `Figure S6D is supplementary and is not in your PDF.`,
      `Not stated here: what counts as a "changed" gene (the Methods use a q-value below 0.2, m-rnaseq-p2) and which enrichment test gave the adjusted P-values. The legend of Figure 6F only says "Statistical significance: Pearson correlation coefficient", which is a correlation measure (the panel prints R=0.48).`,
      `Both axes of Figure 6F are labeled "Adjusted P-value", yet the significant pathways sit at the top right, so higher must mean more significant (probably a minus-log10 scale, which the label does not say). The panel also prints "DEGs, H450 = 3015" (sic; H460 is the cell line used everywhere else).`,
    ],
    prereqs: ['D10', 'D11'],
    sources: ['fig6F', 'm-rnaseq-p2'],
    checks: [
      { q: 'Why did the authors build the enrichment analysis only from genes changed by both CHiLL1 ASOs?',
        options: [
          { t: 'Taking only the overlap makes the gene list longer, so pathways are easier to detect', ok: false, why: 'An overlap of two lists can only be shorter than either list, and the aim was reliability, not length.' },
          { t: 'A gene changed by two different ASOs is more likely to be a real CHiLL1 effect, so the list is "high-confidence"', ok: true, why: 'Right: the paragraph defines "high-confidence target gene subsets from the intersection of both ASOs".' },
          { t: 'The two ASOs target different lncRNAs, and the overlap shows what they share', ok: false, why: 'Both ASOs target CHiLL1; the overlap is used to filter out changes that only one ASO causes.' },
          { t: 'KEGG can only analyze genes that appear in two experiments', ok: false, why: 'KEGG has no such requirement; the overlap was the authors\' own choice to gain confidence.' },
        ] },
    ],
  },

  'res-mechanism-p4': {
    plain: `<p>A similar analysis with another gene-set collection, the Molecular Signatures Database (MSigDB), pointed to p53 and mTORC1 signaling (Figure S6E). Binding sites for many transcription factors (TFBS) are also enriched among the genes that change, including those of ZBTB7A, in both A549 and H460 (Figure S6F).</p>` +
           `<p>The authors add, as an interesting note, that ZBTB7A has been reported to act both as an oncogene and as a tumor suppressor, and to regulate processes such as apoptosis and glycolysis.</p>`,
    why: `Collects two more clues about what CHiLL1 may control: more pathways (p53, mTORC1) and a transcription factor (ZBTB7A). They are leads for future work, not proven mechanisms.`,
    flags: [
      `Both figures cited here (S6E and S6F) are supplementary and are not in your PDF, so there is nothing to look at in the main figures for this paragraph.`,
      `This is a lead, not a result. Because ZBTB7A has been reported as both oncogene and tumor suppressor, the clue does not tell you which way it acts here, and nothing in the main text tests ZBTB7A.`,
    ],
    prereqs: ['B8', 'D10', 'D11'],
    checks: [
      { q: 'Which pathways did the MSigDB analysis of the CHiLL1-responsive genes implicate?',
        options: [
          { t: 'MAPK and PI3K-Akt', ok: false, why: 'Those came from the KEGG analysis in the previous paragraph, not from MSigDB.' },
          { t: 'The G2-M checkpoint and cell migration', ok: false, why: 'Those are linked to GCAWKR later in this section, not to CHiLL1.' },
          { t: 'p53 and mTORC1 signaling', ok: true, why: 'Right: "implicated p53 and mTORC1 signaling (Figure S6E)".' },
          { t: 'Apoptosis only', ok: false, why: 'Apoptosis comes up in the next paragraph as an enriched KEGG pathway; MSigDB pointed to p53 and mTORC1 signaling.' },
        ] },
    ],
  },

  'res-mechanism-p5': {
    plain: `<p>One of the KEGG pathways that was enriched regardless of cell type (in both cell lines) was "apoptosis", programmed cell death (Figure 6F). Supporting this, knocking down CHiLL1, but not GCAWKR, caused a significant increase in early apoptotic cells (Figure 6G).</p>` +
           `<p><b>Where to look.</b> Figure 6G has two stacked-bar charts of percent of cells, 24 h after ASO transfection: CHiLL1 ASOs on the left and GCAWKR ASOs on the right, each in A549 and H460. The pale yellow part of each bar is the early-apoptotic cells. Compare the CHiLL1 ASO bars with the "ASO control" bar next to them.</p>`,
    why: `Tests a prediction from the pathway analysis with a real cell assay: if "apoptosis" is enriched, are the cells really dying more? It also shows a difference between the two lncRNAs, since only CHiLL1 knockdown pushed cells toward apoptosis.`,
    flags: [
      `The panel prints "n=2" but no error bars, P values or test names, so you cannot check the word "significant" from the figure itself. By eye, one GCAWKR bar (A549, ASO2) looks as if it has more early-apoptotic cells than its control, although the text says GCAWKR knockdown did not significantly raise them.`,
    ],
    prereqs: ['B1', 'D8'],
    sources: ['fig6G'],
    checks: [
      { q: 'What led the authors to test apoptosis after CHiLL1 knockdown, and what did they find?',
        options: [
          { t: '"Apoptosis" was enriched only for GCAWKR, and GCAWKR knockdown increased early apoptotic cells', ok: false, why: 'Reversed: the paragraph says CHiLL1 knockdown, "but not GCAWKR", increased early apoptotic cells.' },
          { t: 'Both knockdowns increased early apoptotic cells, so apoptosis is a shared effect', ok: false, why: 'The words "but not GCAWKR" make apoptosis a point where the two lncRNAs differ.' },
          { t: '"Apoptosis" was among the KEGG pathways enriched in both cell lines; CHiLL1 knockdown, but not GCAWKR knockdown, increased early apoptotic cells', ok: true, why: 'Right: the pathway result was the prediction, and the Annexin V assay (Figure 6G) was the test.' },
          { t: 'CHiLL1 knockdown decreased early apoptotic cells in both cell lines', ok: false, why: 'Wrong direction: early apoptotic cells went up, not down.' },
        ] },
    ],
  },

  'res-mechanism-p6': {
    plain: `<p>Now the authors turned to GCAWKR, which has a mean expression of 2.5 TPM (about 1 copy per cell). Using a single ASO, they saw effective knockdown and effects that did not depend on the cell type (Figures 6H, 6I and S6G).</p>` +
           `<p>The enrichment analysis gave terms that partly overlap with CHiLL1's (including the p53 pathway, cholesterol homeostasis and epithelial to mesenchymal transition). Among the terms specific to GCAWKR, several relate to progress through the cell cycle, including "G2-M checkpoint" (Figure 6J). Indeed, knocking down GCAWKR, but not CHiLL1, increased the share of cells in the G2 phase (Figure 6K). GCAWKR's targets are also enriched for migration genes, and knockdown reduced the cells' ability to migrate (Figure 6L).</p>` +
           `<p><b>Where to look.</b> Figure 6H: RNA-seq box plots, where the GCAWKR ASO2 boxes sit lower than the ASO control boxes. Figure 6I: each dot is a gene, comparing the fold change with ASO2 in A549 (across) and in H460 (up); R=0.8 is printed. Figure 6J: bars of enriched MSigDB terms (a longer bar means more significant). Figure 6K: percent of cells in G1, S and G2; the G2 bar for GCAWKR ASO2 (orange) is higher than the control, with the label P=0.009 (G1 has its own label, P=0.036), and the CHiLL1 bars are marked "ns". Figure 6L: crystal violet staining of cells that migrated; the GCAWKR ASO2 bar is lower than the control (P=0.002, n=4), and the images on the right show fewer stained cells.</p>`,
    why: `Shows that GCAWKR differs from CHiLL1: its target genes point to the cell cycle and migration (not apoptosis), and cell assays then support both. This difference backs the idea that the two lncRNAs act in different ways.`,
    flags: [
      `Only one ASO (ASO2) was used for the GCAWKR RNA-seq. For CHiLL1 the on-target argument compared two ASOs (Figure 6E); for GCAWKR, Figure 6I compares the same ASO in two cell lines instead.`,
      `The legend letters look shifted: (H) says "As for (C)" and (I) says "As for (D)", but the images match D and E (RNA-seq box plots and a scatter plot of fold changes).`,
      `Figure 6J: the legend says "y axis: adjusted p value (q value)", but in the image the horizontal axis is labeled "Significance" (ticks 0 to 8, scale not stated) and the terms are on the vertical axis. "Apoptosis" is also one of the terms listed for GCAWKR, yet GCAWKR knockdown did not raise early apoptosis in Figure 6G: an enriched term does not guarantee a matching cell phenotype.`,
      `Sample sizes and tests, from the legends: Figure 6K has n = 2 biological replicates (two-tailed Student's t test) and Figure 6L has n = 4 (one-tailed Student's t test). With only two replicates, a P value rests on very little data.`,
    ],
    prereqs: ['B1', 'D8', 'D10'],
    sources: ['fig6I', 'fig6J', 'fig6K', 'fig6L'],
    checks: [
      { q: 'Which statement about GCAWKR knockdown matches this paragraph?',
        options: [
          { t: 'It increased early apoptotic cells, like CHiLL1 knockdown', ok: false, why: 'The apoptosis result belongs to CHiLL1 only ("but not GCAWKR" in the previous paragraph).' },
          { t: 'It increased the share of cells in G2 and reduced migration; CHiLL1 knockdown did not increase G2 cells', ok: true, why: 'Right: "knockdown of GCAWKR, but not CHiLL1, led to an increase of cells in the G2 phase", and it "led to impaired cell migratory capability".' },
          { t: 'It reduced the share of cells in G2 and increased migration', ok: false, why: 'Both directions are reversed.' },
          { t: 'It increased G2 cells, and CHiLL1 knockdown did the same', ok: false, why: 'The paragraph says "but not CHiLL1": the cell-cycle effect separates the two lncRNAs.' },
        ] },
      { q: 'How is the GCAWKR RNA-seq evidence different from the CHiLL1 evidence?',
        options: [
          { t: 'For GCAWKR only one ASO was used, so there is no ASO-to-ASO comparison; the same ASO is compared in A549 and H460 instead', ok: true, why: 'Right: "using a single ASO", and Figure 6I compares the same ASO in the two cell lines.' },
          { t: 'For GCAWKR more ASOs were used than for CHiLL1', ok: false, why: 'It is the other way round: CHiLL1 had two ASOs in the RNA-seq comparison, GCAWKR one.' },
          { t: 'GCAWKR was studied only in A549 cells', ok: false, why: 'The paragraph reports "cell-type-independent effects", and Figure 6I compares A549 with H460.' },
          { t: 'No RNA-seq was done for GCAWKR, only for CHiLL1', ok: false, why: 'RNA-seq was done for GCAWKR too (Figures 6H and 6I); the enrichment terms come from it.' },
        ], source: ['res-mechanism-p6', 'res-mechanism-p2', 'fig6I'] },
    ],
  },

  'res-mechanism-p7': {
    plain: `<p>The authors also notice something interesting: knocking down GCAWKR led to a significant rise in CHiLL1, but knocking down CHiLL1 did not do the same to GCAWKR (Figure S6H). They say this explains the additive effect on cell viability that was seen when the CHiLL1 and GCAWKR ASOs were used together as a cocktail (Figure 5G).</p>` +
           `<p><b>Where to look.</b> Figure S6H is supplementary, so it is not in your PDF. Figure 5G is a line plot of relative growth over 72 h in A549 cells (n=4). Compare the Tier 3 cocktail (dark red line) with each single ASO: the total amount of ASO is the same in all of them, and two P values (P=0.021 and P=0.030) are printed beside the 72-hour points.</p>`,
    why: `Gives the authors' explanation for why the two-ASO cocktail worked better than either ASO alone. It links the mechanism section to the therapy section (cocktails).`,
    flags: [
      `Figure S6H is supplementary and is not in your PDF, so the upregulation itself cannot be seen here.`,
      `Wording: here the cocktail effect is "additive"; the Discussion says "greater than additive" (discussion-p6). The Results compare the cocktail with an equal dose of either ASO alone (res-aso-p8), which shows "better than each alone" but is not by itself a test of "more than the sum".`,
      `The paragraph says the one-way rise of CHiLL1 is "explaining" the cocktail effect but does not spell out how, and no experiment in the main text tests it. One possible reading (mine, not the paper's): after GCAWKR is knocked down, CHiLL1 rises, so the CHiLL1 ASO in the cocktail also removes that extra CHiLL1.`,
    ],
    prereqs: ['B7', 'D6'],
    sources: ['fig5G'],
    checks: [
      { q: 'What did the authors observe about the two lncRNAs, and what do they say it explains?',
        options: [
          { t: 'CHiLL1 knockdown raised GCAWKR, but not the other way round; this explains the additive effect', ok: false, why: 'The direction is reversed: it is GCAWKR knockdown that raised CHiLL1.' },
          { t: 'Neither knockdown changed the other lncRNA, which is why the cocktail effect was additive', ok: false, why: 'The paragraph reports a one-way effect: GCAWKR knockdown significantly raised CHiLL1.' },
          { t: 'GCAWKR knockdown raised CHiLL1, but CHiLL1 knockdown did not raise GCAWKR; they say this explains the additive effect of the ASO cocktail on cell viability', ok: true, why: 'Right (Figure S6H and Figure 5G). Note that "explaining" is the authors\' interpretation.' },
          { t: 'Each knockdown raised the other lncRNA, which explains why the cocktail was less effective than a single ASO', ok: false, why: 'The effect is one-way, and the cocktail was more effective than a single ASO at an equal dose (res-aso-p8).' },
        ], source: ['res-mechanism-p7', 'res-aso-p8'] },
    ],
  },

  'res-mechanism-p8': {
    plain: `<p>Taken together, the authors say, these data establish that CHiLL1 and GCAWKR promote cancer hallmarks through widespread downstream gene networks that do not overlap. They also say the data support the idea that the ASOs act on target, through their intended RNA.</p>`,
    why: `The closing summary of the mechanism section: the two lncRNAs work through different gene networks (so they are not redundant), and the ASO effects look on-target. It prepares the ground for the cocktail and therapy arguments in the Discussion.`,
    flags: [
      `"Non-overlapping" can confuse you: the same section reports partly overlapping enriched terms (p53, cholesterol homeostasis, epithelial to mesenchymal transition: res-mechanism-p6), and the Figure 6 title says "distinct but overlapping oncogenic pathways". The Discussion separates the two ideas: non-overlapping target genes that converge on shared pathways (discussion-p6).`,
      `The main Figure 6 has no panel that puts the CHiLL1 and GCAWKR gene lists side by side, so "non-overlapping" cannot be read off the figure.`,
    ],
    prereqs: ['D6', 'D10'],
    checks: [
      { q: 'Which statement is the conclusion the authors draw at the end of this section?',
        options: [
          { t: 'Both lncRNAs act through the same downstream genes, so one ASO would be enough', ok: false, why: 'The paragraph says the downstream gene networks are non-overlapping.' },
          { t: 'CHiLL1 and GCAWKR promote cancer hallmarks via widespread, non-overlapping downstream gene networks, and the data support on-target ASO activity', ok: true, why: 'Right: this is the paragraph almost word for word.' },
          { t: 'The ASO effects are mostly off-target, so the phenotypes cannot be trusted', ok: false, why: 'The paragraph says the data support the on-target basis for ASO activity.' },
          { t: 'CHiLL1 acts only in the nucleus and GCAWKR only in the cytoplasm', ok: false, why: 'The locations are the other way round (CHiLL1 mainly cytoplasm, GCAWKR nucleus), and this paragraph is about downstream gene networks, not location.' },
        ] },
    ],
  },

  /* ------------------------------------------------------------------ discussion */
  'discussion-p1': {
    plain: `<p>The authors say they have mapped which lncRNAs matter, across several cancer hallmarks and cell backgrounds, in the KRAS+ subtype of NSCLC (the most common subtype, as the Introduction says). This led them to lncRNA targets with pleiotropic oncogenic roles (cancer-promoting effects on more than one hallmark) across a range of 2D and 3D models from primary and metastatic tumors. They describe this as a promising foundation for future RNA therapeutics (RNATX).</p>`,
    why: `The Discussion's opening summary. It states the paper's main product (a map of functional lncRNAs, plus targets that act on several hallmarks) and frames it as a foundation for therapies, not as a finished therapy.`,
    flags: [
      `"A promising foundation for future RNA therapeutics" is the authors' outlook. The experiments were done in cultured cells and organoids, and the paper itself says (discussion-p5) that delivering the ASOs in vivo still needs future work.`,
    ],
    prereqs: ['A1', 'A3', 'D6'],
    checks: [
      { q: 'In this paper, what does "pleiotropic" mean for a lncRNA target?',
        options: [
          { t: 'It is active in more than one cell line', ok: false, why: 'That property is called background independent (effective regardless of the cell model), which is a separate requirement.' },
          { t: 'It affects more than one cancer hallmark', ok: true, why: 'Right: the Introduction defines pleiotropic as impacting multiple disease hallmarks.' },
          { t: 'It occurs in more than one type of cancer', ok: false, why: 'This study is about one cancer type (NSCLC); "pleiotropic" is about hallmarks, not cancer types.' },
          { t: 'It is switched on in both tumors and healthy tissue', ok: false, why: 'Pleiotropic says nothing about healthy tissue; non-transformed cells were tested separately, for toxicity.' },
        ], source: ['discussion-p1', 'intro-p5'] },
    ],
  },

  'discussion-p2': {
    plain: `<p>The authors argue that pooled CRISPR screening is becoming a powerful way to find targets for RNA therapeutics, because it is practical and versatile. It avoids the money and expertise that an arrayed screen needs. In an arrayed screen, a custom ASO library would have to be made for the lncRNAs expressed in each cell or disease model; this would be far too expensive at current market prices and could not keep up with the constantly changing lncRNA annotations.</p>` +
           `<p>CRISPR also gives improved perturbation and on-target rates compared with shRNA. CRISPR libraries can be made quickly, so projects can keep pace with the changing annotations and find new, disease-specific targets. Because CRISPR identifies lncRNAs directly by what they do in cells, it is a welcome addition to the indirect evidence that is widely used (survival, mutation, differential expression or evolutionary conservation). The authors found it encouraging that these signatures agreed with the screen hits. Still, important barriers remain, above all the lack of available screening libraries, which makes their libDECKO-NSCLC1 library a valuable resource for future discovery.</p>`,
    why: `Makes the case for the paper's method: a pooled CRISPR screen is the practical way to search for lncRNA drug targets, and the new library is itself a resource that other researchers can use.`,
    flags: [
      `These are arguments, not results of this paper: the cost and speed advantages of pooled CRISPR over arrayed ASO libraries, and its better perturbation and on-target rates than shRNA, are supported by cited literature and are not tested here.`,
    ],
    prereqs: ['C6', 'D3', 'D6'],
    checks: [
      { q: 'According to the authors, what is a main advantage of pooled CRISPR screening over an arrayed ASO screen for lncRNAs?',
        options: [
          { t: 'It tests every lncRNA in a separate well, which gives cleaner data', ok: false, why: 'That describes an arrayed screen, the approach the authors say they avoid.' },
          { t: 'It avoids building a custom ASO library for every cell or disease model, which would be very expensive and could not keep up with changing annotations', ok: true, why: 'Right: this is the argument in the paragraph (practicality and versatility).' },
          { t: 'ASOs cannot lower lncRNA levels, so only CRISPR can be used', ok: false, why: 'ASOs can lower lncRNA levels, and the paper uses them for follow-up; the argument is about cost and flexibility at screening scale.' },
          { t: 'It removes the need for any follow-up validation', ok: false, why: 'The paper still validates hits with ASOs, and the Limitations say ASO validation is what resolves CRISPR-del false positives.' },
        ] },
    ],
  },

  'discussion-p3': {
    plain: `<p>The authors say that, through its integrative strategy, this work "sets new standards". Earlier studies typically screened a single cell line, with a single hallmark (often proliferation) and in a single format (often dropout). The authors' own internal benchmarking showed the risk of that approach: it finds hits whose activity is specific to one cell background.</p>` +
           `<p>They reduced this risk with parallel screens in different but matched cell backgrounds, and the resulting hits could be validated in several additional models and mutational subtypes. To find pleiotropic hits, they screened several phenotypic dimensions, in both positive and negative formats. The latter gave only marginal improvements in accuracy, although this benefit should be weighed against the extra resources needed. The challenge of combining such different screen data was solved with the simple yet robust TPP pipeline, which balances effect size and significance. Overall, they say, combining multiple screens with TPP performed better than conventional approaches.</p>`,
    why: `Argues that the paper's design (matched cell backgrounds, several hallmarks, two formats, the TPP pipeline) fixes the weaknesses of earlier lncRNA screens. It is the authors' case for why their hits are more trustworthy.`,
    flags: [
      `"Sets new standards" and "improved performance" are the authors' own judgements. The evidence behind them is their internal benchmarking in the Results (res-integration-p1 and res-integration-p3, Figures 4B and 4E), not a comparison made by an independent group.`,
      `"Marginal improvements in accuracy" is given without a number here. "The latter" most likely means the use of both positive and negative formats (the last thing named in the previous sentence).`,
    ],
    prereqs: ['D4', 'D5', 'E5'],
    checks: [
      { q: 'Why did the authors run parallel screens in distinct but matched cell backgrounds?',
        options: [
          { t: 'To check that the TPP pipeline also works for a different cancer type', ok: false, why: 'The backgrounds are matched (the same cancer type); the aim was not to change the cancer type.' },
          { t: 'Because internal benchmarking showed that hits from one cell background tend to be specific to that background, so parallel screens help to find hits that work in more than one', ok: true, why: 'Right: this is the risk the paragraph describes, and the reason for the parallel design.' },
          { t: 'To double the number of lncRNAs in the library', ok: false, why: 'The library is the same; the backgrounds change where it is tested, not what it contains.' },
          { t: 'To make ASO validation unnecessary', ok: false, why: 'The paper still validates hits with ASOs and in additional models.' },
        ] },
    ],
  },

  'discussion-p4': {
    plain: `<p>The result, the authors say, is a unique functional "panorama" of lncRNAs in a single cancer type. Because there are very few global maps of lncRNA function, they call this dataset an invaluable resource for understanding both the basic biology of lncRNAs and their roles in cancer. Overall, their data implicate approximately 8% of lncRNAs with cell-level functions; they say this is comparable to the estimates of Liu and of Zhu (earlier studies cited in the paper). They add that the concept and the experimental set-up will have broad application for other diseases and biological systems.</p>`,
    why: `Takes stock of what the screens delivered: a map of functional lncRNAs in one cancer type, whose hit rate (about 8%) the authors present as consistent with earlier studies.`,
    flags: [
      `The "8%" matches the 80 pan-hallmark hits in the Results (about 8% of the lncRNAs screened); hallmark-specific integration gave 134 hits (about 13%) (res-integration-p2). So the percentage depends on how the screens are combined, and it refers to the lncRNAs screened, not to all lncRNAs.`,
      `"Unique", "invaluable" and "will have a broad application" are the authors' own judgements and predictions, not tested results. The paragraph gives no numbers for the Liu and Zhu estimates, so you cannot check "comparable" from this paper alone.`,
    ],
    prereqs: ['A2', 'E5'],
    sources: ['res-integration-p2'],
    checks: [
      { q: 'What share of lncRNAs do the authors say their data implicate with cell-level functions?',
        options: [
          { t: 'Approximately 13%', ok: false, why: 'That is the figure for hallmark-specific integration in the Results (134 hits), not the figure the Discussion quotes.' },
          { t: 'Approximately 8%', ok: true, why: 'Right: "approximately 8% of lncRNAs", matching the 80 pan-hallmark hits in the Results.' },
          { t: 'Approximately 80%', ok: false, why: 'Eighty is the number of pan-hallmark hits, not a percentage; as a share of the lncRNAs screened it is about 8%.' },
          { t: 'Approximately 67%', ok: false, why: 'That is the share of hits validated with ASOs in the Limitations (8 of 12), a different quantity.' },
        ], source: ['discussion-p4', 'res-integration-p2', 'limitations-p1'] },
    ],
  },

  'discussion-p5': {
    plain: `<p>The map let the authors narrow the list down to nine lncRNAs for ASO development. From these they identified a pair of oncogenic lncRNAs, CHiLL1 and GCAWKR, with particularly promising features as therapeutic targets. They give four reasons.</p>` +
           `<ul>` +
           `<li><b>First,</b> replication experiments with different ASO sequences and in different cell backgrounds strongly suggested that the cell and molecular effects happen on target (through the intended lncRNA).</li>` +
           `<li><b>Second,</b> the ASOs worked in both monolayer and 3D KRAS+ NSCLC models, and in several EGFR-mutant cell lines, which raises hope for more general use. The authors add that future work must refine the ASO sequences and chemistry and must find ways to deliver them effectively in vivo.</li>` +
           `<li><b>Third,</b> the effects were weaker in non-transformed cells, which points to less non-specific toxicity in vivo. This raises hope for less toxicity in healthy cells, which would allow not only higher doses but also combination therapies that suppress therapy resistance.</li>` +
           `<li><b>Finally,</b> CHiLL1 or GCAWKR are detected in the majority of KRAS+ NSCLC tumors, which suggests that the majority of patients might benefit from an eventual treatment.</li>` +
           `</ul>`,
    why: `The Discussion's main argument for translation: four reasons why CHiLL1 and GCAWKR make good drug targets (on-target action, activity in several models, weaker effects in normal cells, expression in most tumors). Each one is phrased as a hope or a suggestion.`,
    flags: [
      `Watch the hedges: "strongly suggested", "raising hope", "pointing to", "raises hopes", "suggesting", "might benefit". The paper itself says that refining the ASOs and delivering them in vivo are still future work.`,
      `The toxicity evidence comes from non-transformed lung cells in culture (res-aso-p3), so "reduced toxicity in vivo" is an extrapolation, not something measured in an animal.`,
      `"The majority of KRAS+ NSCLC tumors" rests on the Results: 78% of the 101 KRAS+ lung adenocarcinoma tumors in TCGA express at least one of the two lncRNAs (res-aso-p9, Figure 5H; "expression" is defined there as >0.5 FPKM). That is RNA detected in tumors, not a test of who would respond to treatment.`,
    ],
    prereqs: ['C4', 'C5', 'D6'],
    sources: ['res-aso-p9', 'fig5H'],
    checks: [
      { q: 'What do the authors conclude from the weaker ASO effects in non-transformed cells?',
        options: [
          { t: 'That the ASOs are proven to be non-toxic in patients', ok: false, why: 'The paper does not claim proof: it says "pointing to" and "raises hopes", and in vivo delivery is still future work.' },
          { t: 'That the ASOs work only in KRAS+ cells', ok: false, why: 'The paragraph says the ASOs were also effective in several EGFR-mutant cell lines.' },
          { t: 'That it points to reduced non-specific toxicity in vivo, which raises hope for fewer side effects in healthy cells', ok: true, why: 'Right. Note the hedged wording: it is a hope based on cell experiments, not a measurement in an animal.' },
          { t: 'That the ASO effects in cancer cells must be off-target', ok: false, why: 'The first reason in the paragraph says the effects strongly suggest on-target action; weaker effects in non-transformed cells are read as a sign of lower toxicity.' },
        ] },
    ],
  },

  'discussion-p6': {
    plain: `<p>On mechanism, the authors say the agreement between the CRISPR and ASO phenotypes indicates that both genes act through an RNA transcript, or at least through the production of that transcript. Both lncRNAs have profound effects on the cell's transcriptome: they affect hundreds of target genes, and these converge on many shared oncogenic pathways, which gave predictions that could be checked by experiment.</p>` +
           `<p>However, the authors say, the immediate molecular mechanisms are very different. As evidence they give the lncRNAs' distinct subcellular localization, their non-overlapping target genes, and the fact that mixing their ASOs gave greater than additive effects.</p>`,
    why: `Sums up the mechanism section: both lncRNAs act through their RNA (or its production) and affect many shared cancer pathways, yet they act through very different immediate mechanisms. This sets up the cocktail idea in the next paragraph.`,
    flags: [
      `Note the hedge "or at least the production thereof": overexpressing CHiLL1 or GCAWKR did not rescue the ASO phenotypes (res-aso-p3), and the authors offer cis-regulatory mechanisms or unannotated isoforms as possible reasons. So the data do not settle whether the finished RNA or the act of transcribing it is what matters.`,
      `Wording: the Results call the cocktail effect "additive" (res-mechanism-p7); here it is "greater than additive". The Results compare the cocktail with an equal dose of either ASO alone (res-aso-p8), which shows "better than each alone" but is not by itself a test of "more than the sum".`,
      `Size check: the Discussion says "hundreds of target genes", but Figure 6F prints "DEGs, A549 = 2006" and "DEGs, H450 = 3015" for CHiLL1 (thousands). The paper does not say how "hundreds" relates to these counts.`,
    ],
    prereqs: ['B6', 'D1', 'D6'],
    sources: ['fig6F'],
    checks: [
      { q: 'What do the authors say the agreement ("concordance") between CRISPR and ASO phenotypes indicates?',
        options: [
          { t: 'That both genes act only through DNA elements such as enhancers', ok: false, why: 'ASOs act on RNA, so a matching ASO phenotype points away from a purely DNA-dependent mechanism.' },
          { t: 'That both lncRNAs are translated into proteins', ok: false, why: 'Nothing in the paragraph says so, and the paper describes both as having low protein-coding potential (res-aso-p3).' },
          { t: 'That the CRISPR and ASO phenotypes differ, so the two methods disagree', ok: false, why: 'The word used is "concordance": the phenotypes agreed.' },
          { t: 'That both genes act via an RNA transcript, or at least via its production', ok: true, why: 'Right. CRISPR-del cuts the DNA while ASOs act on the RNA; the same phenotype with both points to the transcript (or its production). "Or at least" is a hedge.' },
        ], source: ['discussion-p6', 'res-aso-p3'] },
    ],
  },

  'discussion-p7': {
    plain: `<p>The authors say they have shown that ASO cocktails boosted efficacy without increasing toxicity, compared with equal doses of single ASOs. They say their findings open the possibility of using either fixed cocktails or cocktails tailored to the transcriptome of an individual patient's tumor, for a treatment that is potent, enduring, low in toxicity and personalized.</p>`,
    why: `Closes the Discussion by moving from a result (cocktails beat single ASOs at equal dose, with no added toxicity) to a vision (fixed or personalized cocktails). The first part is evidence; the second is an outlook.`,
    flags: [
      `Only the first sentence is a result (cocktail versus equal-dose single ASOs: Figure 5G, res-aso-p8). The "no extra toxicity" part rests on Figure S4L, a supplementary figure that is not in your PDF.`,
      `The second sentence is an outlook ("open the possibility"). The main text describes no test of long-lasting ("enduring") effects, of treatment in patients, or of cocktails matched to a patient's tumor transcriptome; Figure 5G follows the cells for 72 h.`,
    ],
    prereqs: ['C3', 'D6'],
    sources: ['fig5G'],
    checks: [
      { q: 'Which part of this paragraph is a result the authors say they have shown, and which part is an outlook?',
        options: [
          { t: 'Shown: fixed or personalized cocktails treat patients with low toxicity. Outlook: cocktails boost efficacy compared with single ASOs', ok: false, why: 'This reverses the two: the cocktail result is what was tested, while personalized treatment is only a possibility.' },
          { t: 'Both sentences are experimental results', ok: false, why: 'The second sentence says the findings "open the possibility", which is a vision, not a result.' },
          { t: 'Shown: cocktails boosted efficacy without more toxicity than equal doses of single ASOs. Outlook: fixed or tailored cocktails as potent, enduring, low-toxicity, personalized treatment', ok: true, why: 'Right: the first sentence reports the cocktail experiments; the second is a future possibility.' },
          { t: 'Neither: the paragraph only repeats what earlier papers found', ok: false, why: '"We have shown" refers to the authors\' own cocktail experiments (Figure 5G).' },
        ] },
    ],
  },

  /* ------------------------------------------------------------------ limitations */
  'limitations-p1': {
    plain: `<p>The authors name one important caveat of CRISPR-del, which it shares with CRISPRi: the risk of false-positive hits. A guide pair can unintentionally hit overlapping cis- or trans-acting elements, such as DNA regulatory regions or lncRNA genes on the opposite strand, so the phenotype may come from those and not from the lncRNA you meant to target. Fortunately, they say, such cases can be sorted out by ASO validation, which can show that the phenotype comes from RNA of the correct strand.</p>` +
           `<p>Their careful ASO validation showed that most screen hits do work through the intended lncRNA, but there were likely false positives: candidates 408 and 316 (Figure 5A). A similar strategy could also narrow down LINC00115 as the functional lncRNA in the bidirectional locus of candidate 205 (Figure 3A). Overall, they could validate 8 of 12 (67%) lncRNA hits using ASOs (9 for proliferation/cisplatin, 3 for migration). This suggests that around one-third of screen hits may act through DNA-dependent mechanisms.</p>` +
           `<p><b>Where to look.</b> In Figure 5A, find rows 408 and 316 in the A549 block: their colors are paler than the bluer rows at the top (the bluer a cell, the bigger the drop in viability). Figure 3A is the gene map of the candidate 205 locus, which holds two genes that run in opposite directions.</p>`,
    why: `Names the main weakness of the screening method (CRISPR-del can give false positives through overlapping DNA elements) and puts a number on it with the ASO follow-up. This is why the ASO step was needed.`,
    flags: [
      `The brackets "(9 for proliferation/cisplatin, 3 for migration)" seem to split the 12 hits that were tested (9 + 3 = 12). The paragraph does not list which 8 were validated.`,
      `"Around one-third ... may act via DNA-dependent mechanisms" is an inference. A hit that fails ASO validation is not proven to act through DNA, and at least the nine proliferation/cisplatin candidates were chosen by hand (res-aso-p1), so the fraction may not represent all hits.`,
      `The LINC00115 example was in fact carried out in the Results: two gene-specific ASOs pointed to LINC00115 and not to RP11-206L10.11 (res-validation-p4). Here the wording is "could also narrow down".`,
    ],
    prereqs: ['B4', 'D1', 'D6'],
    checks: [
      { q: 'The authors validated 8/12 (67%) of the lncRNA hits with ASOs. What do they conclude about the rest?',
        options: [
          { t: 'That one-third of the hits are proven false positives caused by off-target ASO effects', ok: false, why: 'The paper does not say this. It suggests (with "may") a DNA-dependent mechanism, and CRISPR-del false positives come from overlapping DNA elements, not from ASO off-targets.' },
          { t: 'That ASOs are unreliable, so the validated hits should be doubted', ok: false, why: 'The paper treats ASO validation as the way to resolve false positives ("Fortunately, these cases can be resolved by ASO validation").' },
          { t: 'That around one-third of screen hits may act via DNA-dependent mechanisms (for example through overlapping regulatory DNA)', ok: true, why: 'Right: "suggesting that around one-third of screen hits may act via DNA-dependent mechanisms". It is a suggestion, not a proof.' },
          { t: 'That the screen failed, because only two-thirds of the hits were real', ok: false, why: 'The authors say the majority of hits arise via the intended lncRNA-dependent mechanism; the rest is presented as a caveat, not as failure.' },
        ] },
    ],
  },

  'limitations-p2': {
    plain: `<p>The authors say several issues remain to be addressed. The study found known and new lncRNAs that promote NSCLC, but it clearly does not rule out that other lncRNAs also play important roles in the disease. They targeted a large catalog of 831 lncRNAs detected in A549 cells at a permissive expression cutoff. Even so, they think it is likely that they overlooked many valuable targets. They give two reasons: CRISPR-del is a relatively inefficient way to perturb a gene compared with ORF mutation, and lncRNA annotation is still incomplete, so some lncRNAs were either not screened or had their TSS targeted incorrectly.</p>` +
           `<p>For example, they correctly identified some lncRNAs known to be involved in lung cancer, such as PVT1, LINC00680 and PCAT7 (Figure 2H), but, surprisingly, not MALAT1 or MIAT. The reason for these false negatives is unclear. It may reflect their unusually high expression and/or the presence of alternative TSSs that compensate for the loss of the targeted promoter. This may be overcome in the future with complementary CRISPR perturbations that target RNA directly, such as Cas13.</p>` +
           `<p>They screened in two monolayer cell backgrounds; future screens should be run in parallel across the widest panel of mutationally matched 2D and 3D models. Finally, the screens found scores of lncRNAs that could not be followed up here, and the authors hope these will be a fertile source of new targets in the future.</p>`,
    why: `Lists what the study cannot claim: it is not a complete list of the lncRNAs that matter in lung cancer, it missed some known ones, and it used only two monolayer cell lines. It also says how future work could fix this (Cas13, more 2D and 3D models).`,
    flags: [
      `Figure 2H is a scatter plot comparing the A549 and H460 dropout screens. Its printed labels are positive-control gene names and candidate numbers; the names PVT1, LINC00680 and PCAT7 are not printed on the panel, so you cannot read their positions there.`,
      `The reasons offered for missing MALAT1 and MIAT are only possibilities ("unclear", "may reflect"), and the paper does not test them. Cas13 is suggested as a future remedy, not tested here.`,
    ],
    prereqs: ['C5', 'D1', 'D5'],
    checks: [
      { q: 'What reason do the authors give for why CRISPR-del may have missed MALAT1 and MIAT?',
        options: [
          { t: 'They are not expressed in A549 cells', ok: false, why: 'The paragraph says the reason may be their unusually high expression, not an absence of expression.' },
          { t: 'CRISPR-del fails for all known lung cancer lncRNAs', ok: false, why: 'PVT1, LINC00680 and PCAT7 were correctly identified, so it does not fail for all of them.' },
          { t: 'It is unclear; it may reflect their unusually high expression and/or alternative TSSs that compensate for the loss of the targeted promoter', ok: true, why: 'Right: the authors give possibilities ("may reflect"), not a proven reason.' },
          { t: 'They were left out of the library by design', ok: false, why: 'They are called false negatives, which means they were screened but not detected as hits. Annotation gaps are given as a separate reason for lncRNAs that were not screened.' },
        ] },
    ],
  },

  /* ------------------------------------------------------------------ back matter */
  'ack-p1': {
    plain: `<p>The authors thank members of the GOLD Lab and Roderic Guigó (CRG Barcelona, Spain) for insightful discussions. Thomas Marti and Renwang Peng (Department of BioMedical Research, DBMR, Bern, Switzerland) generously donated cell lines and advice on functional assays. Basak Ginsbourger (DMBR) is thanked for administrative support, and Willy Hofstetter and Patrick (DMBR) for logistical support. All computations ran on the Bern Interfaculty Bioinformatics Unit computing cluster, maintained by Rémy Bruggmann and Pierre Berthier.</p>` +
           `<p>Funding came from the Swiss National Science Foundation (through the NCCR "RNA & Disease", a project grant "The elements of long noncoding RNA function" and a Sinergia project on regenerative strategies for heart disease), the Medical Faculty of the University and University Hospital of Bern, the Helmut Horten Stiftung, the Swiss Cancer Research Foundation, and Science Foundation Ireland (Future Research Leaders award).</p>`,
    why: `Records who helped and who paid for the work, so readers can see where the support and the money came from.`,
    flags: [
      `The department's abbreviation is printed two ways: "DBMR" (for Thomas Marti and Renwang Peng) and "DMBR" (for the staff thanked later); they probably mean the same department.`,
      `"Willy Hofstetter and Patrick (DMBR)": the second name is printed without a surname.`,
    ],
    prereqs: ['C4', 'D8'],
    checks: [
      { q: 'Which funder supported the work through the NCCR "RNA & Disease" and the project "The elements of long noncoding RNA function"?',
        options: [
          { t: 'Science Foundation Ireland', ok: false, why: 'It is credited for a Future Research Leaders award, not for the NCCR or the project grant.' },
          { t: 'The Swiss National Science Foundation', ok: true, why: 'Right: the NCCR, the project funding and the Sinergia project are all listed under the Swiss National Science Foundation.' },
          { t: 'The Helmut Horten Stiftung', ok: false, why: 'It is listed as a separate funder, with no grant named.' },
          { t: 'The Swiss Cancer Research Foundation', ok: false, why: 'It is listed separately from the NCCR and project grants.' },
        ] },
    ],
  },

  'contrib-p1': {
    plain: `<p>This paragraph says who did what (initials exactly as printed).</p>` +
           `<ul>` +
           `<li><b>T.P., R.E. and R.J.:</b> conceived and designed the experimental procedure, analyzed and interpreted the data, and wrote the manuscript with input from all authors.</li>` +
           `<li><b>D.F.M.:</b> developed the TPP pipeline and did most of the bioinformatics analysis.</li>` +
           `<li><b>C.P.-Q.:</b> designed libDECKO-NSCLC1, with the help of S.H.</li>` +
           `<li><b>P.C.:</b> analyzed the RNA-seq data.</li>` +
           `<li><b>S.F. and M.R.:</b> established the patient-derived organoids.</li>` +
           `<li><b>P.S., A.K., G.B. and J.S.:</b> generated the stable Cas9-expressing cell lines and helped with validation.</li>` +
           `<li><b>E.S.R., I.M. and P.C.M.:</b> validated the results in additional cell lines.</li>` +
           `<li><b>D.H.:</b> analyzed the FISH images.</li>` +
           `<li><b>L.Z. and X.W.:</b> did the survival analysis from TCGA data.</li>` +
           `<li><b>A.V.:</b> provided the set of known cancer genes in NSCLC.</li>` +
           `<li><b>A.A., H.A.G.-R., P.P.M. and A.L.:</b> contributed to the bioinformatics analysis.</li>` +
           `<li><b>I.C.:</b> prepared the libraries for the NGS.</li>` +
           `<li><b>S.H., C.R. and A.F.O.:</b> provided key inputs and tools.</li>` +
           `</ul>`,
    why: `Shows which author did which part (design, bioinformatics, wet lab, patient data), so you can see that the study combines screening, computational analysis and several validation models.`,
    flags: [
      `The paragraph prints "the stably expressing Cas9 cell line lines" (a typo: "cell line lines").`,
    ],
    prereqs: ['C5', 'D3', 'E5'],
    checks: [
      { q: 'According to the paragraph, who developed the TPP pipeline and did most of the bioinformatics analysis?',
        options: [
          { t: 'C.P.-Q.', ok: false, why: 'C.P.-Q. designed the libDECKO-NSCLC1 library, with the help of S.H.' },
          { t: 'P.C.', ok: false, why: 'P.C. analyzed the RNA-seq data.' },
          { t: 'L.Z. and X.W.', ok: false, why: 'L.Z. and X.W. did the survival analysis from TCGA data.' },
          { t: 'D.F.M.', ok: true, why: 'Right: "D.F.M. developed the TPP pipeline and performed most of the bioinformatics analysis."' },
        ] },
    ],
  },

  'decl-p1': {
    defines: ['conflict-of-interest', 'patent-application'],
    plain: `<p>Three of the authors, T.P., R.E. and R.J., have filed a patent application (21202363.4) relating to the therapeutic targeting of the lncRNAs identified in this study. The applicant is the University of Bern. R.J. is also a paid consultant for NextRNA (USA).</p>` +
           `<p><b>Two terms in plain words (general background, not from the paper).</b> A patent application is a formal request to a patent office for exclusive legal rights to an invention for a limited time. A conflict of interest is a situation in which someone could gain something, such as money, from the way a result turns out, so readers are told about it in case it influences the work.</p>`,
    why: `Tells readers about possible financial interests (a patent application and paid consulting), so they can weigh the paper's therapeutic hopes with that in mind.`,
    flags: [
      `The paragraph does not say what NextRNA does, or whether the consultancy is linked to this project.`,
    ],
    prereqs: ['A3', 'D6'],
    checks: [
      { q: 'What does this declaration tell a reader?',
        options: [
          { t: 'That the data in the paper were found to be unreliable', ok: false, why: 'A declaration is only a disclosure; it makes no claim about the data.' },
          { t: 'That the company NextRNA paid for this study', ok: false, why: 'The paragraph only says that R.J. is a paid consultant for NextRNA; funders are listed separately in the Acknowledgments.' },
          { t: 'That some authors have possible financial interests in the therapeutic idea (a patent application and paid consulting), so readers can weigh the therapeutic hopes with that in mind', ok: true, why: 'Right: it is a disclosure so that readers can judge for themselves; it does not say the results are wrong.' },
          { t: 'That the authors personally own the lncRNAs CHiLL1 and GCAWKR', ok: false, why: 'The patent application concerns the therapeutic targeting of the lncRNAs, and the applicant is the University of Bern.' },
        ] },
    ],
  },

});

/* ------------------------------------------------------------------ units */
Object.assign(window.TRACKG.units, {
  'res-mechanism': {
    intro: `<p>This last Results section asks <b>how</b> the two final lncRNAs, CHiLL1 and GCAWKR, work. The authors check where each RNA sits in the cell, measure how the other RNAs in the cell change when each one is knocked down with ASOs, and use pathway analysis to guess what each one controls. They then test those guesses with cell assays (apoptosis, cell cycle, migration).</p>`,
    recap: `<p>CHiLL1 (about 4 molecules per cell) is found mainly in the cytoplasm and GCAWKR (about 1 copy per cell) in the nucleus, and they change different sets of genes. CHiLL1 knockdown raised early apoptosis; GCAWKR knockdown raised the share of cells in G2 and reduced migration. Knocking down GCAWKR also raised CHiLL1, which the authors offer as an explanation for the additive effect of the two-ASO cocktail.</p>`,
  },
  'discussion': {
    intro: `<p>The Discussion looks back and forward. It argues why pooled CRISPR screening suits lncRNA drug discovery, why the multi-screen design is better than earlier work, and why CHiLL1 and GCAWKR look promising as targets. Read it with care: much of it is the authors' <b>hopes and interpretations</b> (watch for "raising hope", "suggesting", "might", "open the possibility"), not new results.</p>`,
    recap: `<p>The authors claim a unique map of functional lncRNAs in one cancer type (about 8% of lncRNAs implicated), a screening design that avoids cell-line-specific hits, and two ASO-targetable lncRNAs that act by different mechanisms, work in several models, show weaker effects in non-transformed cells and are detected in most KRAS+ tumors. They suggest that ASO cocktails, fixed or personalized, could become a potent, low-toxicity treatment. Delivery in the body and further refinement of the ASOs are still future work.</p>`,
  },
  'limitations': {
    intro: `<p>Here the authors list what the study does not show. The first paragraph is about a flaw in the CRISPR deletion method (false positives) and how ASO validation reveals it. The second is about what the screens may have missed and what should be done next.</p>`,
    recap: `<p>CRISPR deletion can give false hits through overlapping DNA elements; ASO validation confirmed 8 of 12 (67%) lncRNA hits, so around one-third of hits may act through DNA. The screens are also not comprehensive: some known lncRNAs (MALAT1 and MIAT) were missed, annotations are incomplete, only two monolayer cell lines were used, and many hits were not followed up.</p>`,
  },
  'ack': {
    intro: `<p>The Acknowledgments thank colleagues, name the people who donated cell lines or looked after the computing cluster, and list the funders of the project. It does not change the science, but it shows who helped and who paid.</p>`,
    recap: `<p>Funding came mainly from the Swiss National Science Foundation, with extra support from the Medical Faculty and University Hospital of Bern, two foundations (the Helmut Horten Stiftung and the Swiss Cancer Research Foundation) and Science Foundation Ireland. The people named helped with discussions, cell lines, administration or computing.</p>`,
  },
  'contrib': {
    intro: `<p>This paragraph says which author did which part of the work, using initials. Three authors (T.P., R.E. and R.J.) designed the study and wrote the paper; the others did specific jobs such as bioinformatics, library design, validation and patient data analysis.</p>`,
    recap: `<p>The work was shared across computing and lab teams: for example, D.F.M. built the TPP pipeline, C.P.-Q. designed the library, P.C. analyzed the RNA-seq data, and S.F. and M.R. established the organoids. T.P., R.E. and R.J. wrote the manuscript with input from all the authors.</p>`,
  },
  'decl': {
    defines: ['conflict-of-interest', 'patent-application'],
    intro: `<p>Journals ask authors to state any links that could look like a conflict of interest. This short statement says that some authors filed a patent application and that one of them is a paid consultant for a company.</p>`,
    recap: `<p>T.P., R.E. and R.J. filed a patent application about the therapeutic targeting of the lncRNAs found here (applicant: University of Bern), and R.J. is a paid consultant for NextRNA (USA). This is a declaration, not a finding: it tells readers about possible financial interests so they can weigh the paper's therapeutic hopes.</p>`,
  },
});
