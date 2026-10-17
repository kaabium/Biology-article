window.TRACKG = window.TRACKG || { paras: {}, units: {} };

/* ===== Track G study layer, STAR Methods part 2 (public RNA-seq, PCR, competition, PDX, ASO, viability) ===== */
Object.assign(window.TRACKG.paras, {

  'm-public-rnaseq-p1': {
    plain: `<p>The authors used two public collections of RNA-seq data from real lung tumors.</p>` +
      `<p>First, they downloaded 101 RNA-seq samples from TCGA. These are lung adenocarcinoma (LUAD) samples that carry a KRAS mutation ("KRAS+"). They picked them with three filters: the tumor type was adenocarcinoma, the sample was "not treated", and the tumor was KRAS mutated. How strongly each target gene was expressed was estimated with a program called HTSeq.</p>` +
      `<p>Second, they used another, independent group of LUAD RNA-seq data from tissue taken out of patients ("ex vivo"). It came from TANRIC and contains 87 tumor samples and 77 adjacent normal tissue samples.</p>`,
    why: `<p>In general, patient data show whether a gene found in cell lines is also active in real tumors. The paper argues that cancer-promoting lncRNAs are expected to be upregulated in tumors, so it asks whether the screen hits are expressed more highly than non-hits in KRAS+ tumors and in tumor versus adjacent normal tissue (see the Results on screen integration). In general, a second, independent cohort guards against a result that holds in only one data set.</p>`,
    memory: `A recipe tested in your own kitchen (cell lines) is more convincing if restaurants (real patients) also get the same result.`,
    flags: [
      `The paragraph says "adjacent normal tissue", while the Figure 4G legend calls the same cohort "healthy tissues". Adjacent normal tissue comes from the patient's own lung next to the tumor, which is not the same as tissue from a healthy donor.`,
      `The paragraph calls the TANRIC cohort "independent" but does not say where its samples were first collected. The citations printed next to it (see the PAPER box) are a 2012 lung adenocarcinoma study and the TANRIC platform paper.`,
    ],
    prereqs: ['C6', 'C2', 'D10'],
    sources: ['res-integration-p4', 'ref-61', 'ref-106', 'fig4G'],
    checks: [
      { q: `Why does the paper use a second, independent LUAD cohort that includes adjacent normal tissue, in addition to the 101 TCGA KRAS+ tumors?`,
        options: [
          { t: `To check whether the screen hits are also expressed more highly in tumors than in nearby normal tissue, in a data set separate from the first one`, ok: true, why: `Right. The Results say cancer-promoting lncRNAs are expected to be upregulated in tumors, and they compare tumors with adjacent tissue in this cohort.` },
          { t: `To measure how much each ASO lowers its target lncRNA`, ok: false, why: `Knockdown is measured in the cell lines (for example by qRT-PCR or RNA-seq of ASO-treated cells), not in public patient data.` },
          { t: `To replace the TCGA samples, because the filters left too few of them`, ok: false, why: `The paragraph says "another" cohort is used in addition. It does not say that the TCGA set was too small.` },
          { t: `To prove that these lncRNAs cause lung cancer in patients`, ok: false, why: `Expression data can show that a gene is higher in tumors, which fits an oncogenic role, but they cannot prove cause.` },
        ],
        source: ['m-public-rnaseq-p1', 'res-integration-p4'] },
    ],
  },

  'm-pcr-gdna-p1': {
    plain: `<p>The authors first purified genomic DNA (gDNA) from A549 cells that make Cas9 and had been "transduced" (infected with a virus) with pDECKO, the DECKO guide vector. A purification kit was used (catalog details omitted — see the PAPER box).</p>` +
      `<p>They then ran a PCR with primers that sit on both sides of the region that was meant to be deleted ("flanking" primers), as drawn in Figure 1E. The primer sequences are listed in Data S4 (a supplementary item, not in your PDF). The PCR used a high-fidelity DNA polymerase (2 U/µl; catalog details omitted — see the PAPER box). The product was run on a 1% agarose gel.</p>`,
    why: `<p>In general, if Cas9 and a pair of guides cut out a piece of DNA, you can prove it at the DNA level. Primers placed on both sides of the region give a shorter PCR product when the piece is gone and a longer one when the DNA is intact, and a gel separates the two by size. This is the direct check that the deletion method really deletes (Figure 1E marks the expected wild-type and deletion lengths), which matters because the whole screen assumes that the TSS region is removed. In general, a "high-fidelity" polymerase is chosen because it copies DNA with very few errors.</p>`,
    memory: `Two flags planted on either side of a gap in a road: if the stretch between them has been cut out, the distance between the flags gets shorter.`,
    flags: [
      `The Figure 1E legend says the cells were "transfected" with the pgRNA, while this paragraph says "pDECKO-transduced" cells. The paragraph does not explain the difference in wording.`,
      `The paragraph does not give the expected band sizes or mention the non-targeting control that was run next to the deletion sample. Both are in the Figure 1E legend.`,
    ],
    prereqs: ['D7', 'D4'],
    sources: ['fig1E'],
    checks: [
      { q: `Why were the PCR primers placed on both sides of the region that was meant to be deleted?`,
        options: [
          { t: `The PCR product is shorter when the region has been deleted than when the DNA is intact, so the band size on the gel shows whether the deletion happened`, ok: true, why: `Right. The Figure 1E legend marks the expected lengths of the wild-type and the deletion product.` },
          { t: `The primers measure how much RNA of the gene is left after the deletion`, ok: false, why: `That is what qRT-PCR on RNA does (Figure 1F). This PCR starts from genomic DNA and reports on the DNA itself.` },
          { t: `The primers guide Cas9 to cut at both ends of the region`, ok: false, why: `Cutting is done by the paired guide RNAs with Cas9. PCR primers only start the copying of DNA in the PCR.` },
        ],
        source: ['m-pcr-gdna-p1', 'fig1E'] },
    ],
  },

  'm-competition-p1': {
    plain: `<p>A549 cells were infected with DECKO lentiviruses that also carried genes for fluorescent proteins. The viruses with the control pgRNAs (aimed at AAVS1) also made green fluorescent protein (GFP; the label is printed as "pgRNAs-AASV1-GFP+"). The viruses with pgRNAs aimed at the candidate lncRNAs made mCherry (a red fluorescent protein) instead.</p>` +
      `<p>After infection, the cells were selected with puromycin (2 µg/mL) for seven days. Then GFP cells and mCherry cells were mixed 1:1 in a six-well plate (150,000 cells). The cells were counted and analyzed on a flow cytometer (an LSR II SORP instrument; catalog details omitted — see the PAPER box) and with the FlowJo software.</p>`,
    why: `<p>In general, a competition assay puts two cell populations in the same dish, so both face exactly the same conditions. If switching off a gene slows growth, the cells that carry that pgRNA make up a smaller and smaller share of the mix over time. The GFP-labeled AAVS1 cells are the yardstick (the control), mixing 1:1 gives a known starting ratio, and the two colors let the flow cytometer count each group. Puromycin selection first removes cells that never received a pgRNA, so only cells with a pgRNA are compared. In the Results, the cells with candidate pgRNAs were out-competed by the control cells, an effect comparable to inactivating the essential ribosomal gene RPS5 (the positive control).</p>`,
    memory: `Two kinds of seeds in the same pot, one dyed green (control) and one dyed red (test): if the red seeds grow more slowly, the red plants make up a smaller share of the pot as the weeks go by.`,
    flags: [
      `The label "pgRNAs-AASV1-GFP+" is printed with two letters swapped. The control target is written correctly as AAVS1 earlier in the same paragraph.`,
      `This paragraph gives no n, error bars or test. The Figure 3C legend says n = 3, error bars indicate SD, and significance was estimated by Student's t test at the last time point. Neither place says how many days the mixed cells were followed (the legend only says "over time (days)").`,
    ],
    prereqs: ['D7', 'D3'],
    sources: ['res-validation-p3', 'fig3C'],
    checks: [
      { q: `Why were the control cells labeled with GFP and mixed 1:1 with mCherry cells carrying a candidate pgRNA?`,
        options: [
          { t: `Both groups share one dish, so a change in the share of mCherry cells over time shows whether the candidate pgRNA gives a growth disadvantage compared with the control`, ok: true, why: `Right. A shrinking mCherry share means those cells are out-competed by the control cells.` },
          { t: `So that the mCherry protein can switch off the candidate lncRNA`, ok: false, why: `Fluorescent proteins are only labels. The pgRNAs (with Cas9) do the deleting.` },
          { t: `So that puromycin kills the GFP cells and only the mCherry cells remain`, ok: false, why: `Puromycin selection was done before mixing, to remove cells without a pgRNA. Both groups were kept for the mix.` },
          { t: `To measure how much RNA each pgRNA removes`, ok: false, why: `RNA levels are measured by qRT-PCR. The competition assay reads relative growth from counts of the two colors.` },
        ],
        source: ['m-competition-p1'] },
    ],
  },

  'm-pdx-p1': {
    plain: `<p>This paragraph explains where the KRAS+ patient-derived organoid BE874 came from.</p>` +
      `<p>Small pieces (about 1–2 cm3) of lung cancer tissue, provided by the Institute of Pathology at the University of Bern, were taken from a surgically removed lung cancer specimen, with the patients' informed consent. Parts of the sample (pieces of around 5 mm) were set aside and implanted under the skin of the flank of 6-week-old NSG mice (catalog details omitted — see the PAPER box) so that the cancer could engraft (take hold and grow). Once the engraftment had worked, the tumor-bearing mice were euthanized and the tumors were removed. The tumor tissue was broken up mechanically and with enzymes to get single cells, which were used to generate the BE874 organoids.</p>` +
      `<p>The BE874 organoids were genotyped at the Institute of Pathology, University of Bern, using KRAS-targeted Sanger sequencing. The KRAS c.34G&gt;T (p.Gly12Cys) mutation was found in both the BE874 organoids and the corresponding primary cancer. The analysis of the samples was approved by the Bern local ethical committee (KEK 2018-01801). Written informed consent was collected from all patients involved in the study.</p>`,
    why: `<p>In general, a patient-derived organoid keeps more of the original tumor than a long-established cell line, and growing the patient's tumor first in an immunodeficient mouse is one way to get enough tumor cells for the dish. The paper's stated reason for using such organoids is that they "recapitulate the therapy response of individual patients" (see the Results on ASO therapeutics). Finding the same KRAS mutation (G12C) in the organoids and in the original cancer is a simple identity check: it shows that the organoids come from the intended tumor and still carry its key mutation, so they can serve as a KRAS+ human model. The ethics statements show that the patient material was used with consent and approval.</p>`,
    memory: `Like growing a plant from a cutting: the patient's tumor is "grown on" in a mouse, and cells from the cutting are then moved to a dish as an organoid.`,
    flags: [
      `The paragraph does not say how many mice or tumors were used, or how long the tumor grew before it was removed. The Figure 5F legend says the BE874 organoids were grown from a single patient-derived xenograft.`,
    ],
    prereqs: ['C5', 'C2', 'D4'],
    sources: ['res-aso-p7', 'fig5F'],
    checks: [
      { q: `Why does the paragraph report KRAS sequencing of both the BE874 organoids and the corresponding primary cancer?`,
        options: [
          { t: `It shows that the organoids carry the same KRAS G12C mutation as the patient's original tumor, so they are a true KRAS+ model of that cancer`, ok: true, why: `Right. The mutation was detected in both, which is a simple identity check for the organoids.` },
          { t: `It shows that the mouse, not the patient, supplied the KRAS mutation`, ok: false, why: `The mutation was also found in the patient's primary cancer. The mice were only the place where the tumor was grown.` },
          { t: `It measures how strongly the ASOs lower KRAS in the organoids`, ok: false, why: `Sequencing reads the DNA letters of KRAS to find a mutation. It says nothing about ASOs, which target lncRNAs and were tested later.` },
        ],
        source: ['m-pdx-p1'] },
    ],
  },

  'm-pdx-p2': {
    plain: `<p>The NSG mice were housed under "specific pathogen-free" conditions, in isolated, ventilated cages, with a regular cycle of 12 hours of light and 12 hours of dark. They were fed "ad libitum" (as much as they wanted) and were regularly monitored for pathogens.</p>` +
      `<p>The mouse experiments were approved by the local experimental animal committee of the Canton of Bern and were carried out according to Swiss laws for animal protection (BE76/17).</p>`,
    why: `<p>In general, NSG mice have almost no working immune system, so even a small infection can harm them or spoil an experiment. That is why they live in clean, isolated cages and are checked for pathogens. A fixed light-dark cycle and unlimited food keep conditions the same from mouse to mouse. The approval sentence is a reporting requirement: it shows that the animal work followed an ethics review and Swiss law. In these Methods the mice are used to grow the patient's tumor (previous paragraph).</p>`,
    flags: [
      `The same approval sentence (the Canton of Bern committee and BE76/17) also appears in the Experimental model section.`,
      `The paragraph does not say how many mice were used or what was done to them beyond housing. The tumor-growth step is in the previous paragraph.`,
    ],
    prereqs: ['C5'],
    checks: [
      { q: `Why would NSG mice be kept in isolated ventilated cages under specific pathogen-free conditions and be monitored for pathogens?`,
        options: [
          { t: `NSG mice have a very weak immune system, so they are protected from infections that could harm them or spoil the experiment`, ok: true, why: `Right. A weak immune system makes infections more dangerous, so clean housing and monitoring protect the animals and the results.` },
          { t: `The pathogen-free cages are what stop the mice from rejecting the human tumor`, ok: false, why: `Rejection is prevented by the mice's immunodeficiency (the reason NSG mice are used), not by the cages. Clean housing protects the mice from infections.` },
          { t: `"Pathogen-free" means the mice are free of cancer cells until the tumor is implanted`, ok: false, why: `A pathogen is a disease-causing microbe such as a bacterium or virus, not a cancer cell. "Pathogen-free" refers to those microbes.` },
        ],
        source: ['m-pdx-p2', 'm-pdx-p1'] },
    ],
  },

});

/* ----- ASOs, 2D and 3D viability ----- */
Object.assign(window.TRACKG.paras, {

  'm-aso-p1': {
    plain: `<p>The ASOs were locked nucleic acid (LNA) ASOs, designed with a commercial custom LNA design tool (catalog details omitted — see the PAPER box). For each target, the authors designed from 3 to 5 different ASOs.</p>` +
      `<p>On the day of the transfection, 300,000 cells were counted and plated in a 6-well plate. The ASOs were transfected into the cells while they were still in suspension (floating in the liquid, not yet settled on the dish), using the transfection reagent Lipofectamine3000 and following the manufacturer's instructions (catalog details omitted — see the PAPER box). The final ASO concentration was 25 nM in 2 mL of medium for A549, H460, NCI-H441 and MRC5-CV1 cells, and 10 nM in 2 mL for HBEC3-KT and CCD-16LU cells.</p>`,
    why: `<p>In general, an ASO is a short, single-stranded stretch of nucleic acid that binds its target RNA letter by letter; "locked" (LNA) building blocks make the binding tighter and the ASO more stable, so a modest dose can lower the RNA. ASOs differ a lot in how well they work, so designing several per target lets the authors pick ones that really knock the RNA down. Two independent ASOs that give the same effect are the paper's test of an on-target effect: the Results ask for at least two independent ASOs with ≥40% knockdown and treat two distinct ASO sequences as a sign of on-target activity. In general, cell lines differ in how easily they take up and tolerate transfection, so doses are often tuned per cell type; the paragraph does not say why two lines got the lower dose.</p>`,
    memory: `Independent witnesses: one ASO could be a fluke, but two different ASOs aimed at the same RNA that tell the same story are much more believable.`,
    flags: [
      `The MRC fibroblast line has three spellings in the paper: "MRC5-CV1" here, "Mrc5-SV1" in the 2D viability paragraph and "MRC-5" in the Experimental model section. They appear to be the same line, but the paper does not say so.`,
      `The paragraph does not say why HBEC3-KT and CCD-16LU got 10 nM instead of 25 nM. The Results spell the second line "CCD-12Lu".`,
      `The paragraph says "LNA ASOs" but not their exact design (for example, whether they are built to recruit RNase H). How ASOs lower an RNA is background knowledge, not stated here.`,
    ],
    prereqs: ['D6', 'D2'],
    sources: ['res-aso-p1', 'res-aso-p2', 'res-aso-p3'],
    checks: [
      { q: `Why did the authors design 3 to 5 different ASOs for each target?`,
        options: [
          { t: `ASOs differ in how well they work, so several let the authors pick effective ones, and an effect seen with two independent ASOs is more likely to be on-target`, ok: true, why: `Right. The Results look for at least two independent ASOs with ≥40% knockdown and treat two distinct ASO sequences as a sign of on-target activity.` },
          { t: `Each ASO cuts a different part of the gene's DNA, and cutting several places gives a bigger deletion`, ok: false, why: `ASOs bind RNA, not DNA, and they do not delete anything. Deletions are made by paired guide RNAs with Cas9.` },
          { t: `All 3 to 5 ASOs were always mixed together in every experiment`, ok: false, why: `Mixtures ("cocktails") were made only for specific "cocktail experiments" (next paragraph), not in every experiment.` },
        ],
        source: ['m-aso-p1', 'm-aso-p2', 'res-aso-p1', 'res-aso-p2'] },
    ],
  },

  'm-aso-p2': {
    plain: `<p>For the "cocktail" experiments (mixtures of several ASOs), the final concentration of the whole ASO mix was kept at 25 nM. The medium was refreshed 24 h after transfection. Then the cells were either harvested, to check how well the gene had been knocked down, or sub-cultured (re-plated) for cell viability experiments.</p>` +
      `<p>The ASO target sequences are listed in Table S2 (a supplementary table, not in your PDF). To check that the ASOs get into cells ("penetration"), the authors used a control ASO ("control ASO A") that carries a fluorescent label (5′-FAM) and was supplied by the ASO manufacturer (catalog details omitted — see the PAPER box). It is cited as Figure S4J (a supplementary figure, not in your PDF).</p>`,
    why: `<p>In general, a cocktail should be compared with a single ASO at the same total dose; otherwise a stronger effect could simply mean "more ASO". The paper does exactly this: the 50:50 CHiLL1/GCAWKR cocktail had a greater effect on cell viability than an equal dose of either ASO alone, and the Figure 5G legend says that the total amount stayed at 25 nM with equal proportions of each ASO. In general, refreshing the medium at 24 h removes leftover transfection reagent and ASO that did not enter the cells. A fluorescent control ASO is a quick way to see whether ASOs get into cells; without such a check, "no effect" could simply mean that the ASO never entered.</p>`,
    flags: [
      `The paragraph points to Table S2 for the ASO sequences, but the key resources table says "Table S1" for the same sequences.`,
      `The paragraph says that penetration was checked but gives no result; the cited figure is a supplementary item that is not in your PDF.`,
    ],
    prereqs: ['D6', 'D2'],
    sources: ['res-aso-p8', 'fig5G', 'krt-38'],
    checks: [
      { q: `In the cocktail experiments the final concentration of the ASO mix was kept at 25 nM. Why?`,
        options: [
          { t: `So that a cocktail and a single ASO are compared at the same total dose; a bigger effect of the cocktail is then not just "more ASO"`, ok: true, why: `Right. The Results compare a 50:50 cocktail with an equal dose of either ASO alone.` },
          { t: `Because 25 nM is the highest dose that cells can survive`, ok: false, why: `The paragraphs give no such limit. Two cell lines even got a lower dose (10 nM) in the previous paragraph, but the paper does not explain why.` },
          { t: `Because each ASO in a cocktail needs 25 nM to be detected`, ok: false, why: `25 nM is the final concentration of the whole mix, not of each ASO. With equal proportions (Figure 5G legend), each ASO is present at a lower concentration.` },
        ],
        source: ['m-aso-p2', 'm-aso-p1', 'res-aso-p8', 'fig5G'] },
    ],
  },

  'm-viability-2d-p1': {
    plain: `<p>Cell viability was measured in ordinary flat (2D) cultures of cell lines with CellTiter-Glo 2.0 (catalog details omitted — see the PAPER box), following the manufacturer's protocol.</p>` +
      `<p>24 h after the transfection, cells of eight lines (A549, H460, NCI-H441, H1975, H157, WVU-Ma-0005A, H820 and H1650) were harvested and counted, and 3,500 cells per well were seeded, in triplicate, in 96-well plates. For three more lines the seeding numbers were different: Mrc5-SV1 3,000, HBEC3-KT 3,500 and CCD-16LU 1,000 cells per well, respectively.</p>` +
      `<p>The number of viable cells was estimated after 24, 48, 72, 96, and/or 144 h. On the day of the measurement, a 1:1 mix of medium and CellTiter-Glo was added to the plates and the luminescence was recorded on a plate reader (Tecan Infinite 200 Pro). The Student's t test was used to judge significance (p &lt; 0.05).</p>`,
    why: `<p>In general, CellTiter-Glo measures ATP, a molecule that only living cells keep making, and turns it into light, so more luminescence means more living cells. Reading plates at several time points shows growth over time: an ASO that slows growth appears as a gap that widens compared with the control. In general, seeding the same number of cells in every well, in triplicate, gives each condition the same starting point and averages out well-to-well noise; cell lines grow at different speeds, so seeding numbers are often tuned per line. The t test asks whether a difference from the control is larger than chance would explain, with p &lt; 0.05 as the usual cut-off.</p>`,
    memory: `A fuel gauge for cells: the more living cells, the more ATP "fuel", and the brighter the glow.`,
    flags: [
      `This paragraph says p &lt; 0.05, while the general statement at the end of the Methods says p ≤ 0.05. The two only differ for a p-value of exactly 0.05.`,
      `The paragraph does not say whether the t test was one- or two-tailed or how many independent experiments were run. The figure legends differ: the Figure 5C legend says "two-tailed" and the Figure 5E legend says "one-tailed" (n = 4 biological replicates in both). The triplicate wells are repeats within one experiment, not independent experiments.`,
      `"And/or" means that not every cell line was read at every time point; the paragraph does not say which was which.`,
      `Five of the lines here (H1975, H157, WVU-Ma-0005A, H820, H1650) are not listed in the Experimental model section. The Results only mention "additional KRAS+ and EGFR-mutant cell lines" without naming them. "Mrc5-SV1" is yet another spelling of the MRC fibroblast line (see the ASO paragraph).`,
    ],
    prereqs: ['D8', 'E3'],
    sources: ['m-quant-p3', 'fig5C', 'fig5E', 'res-aso-p3'],
    checks: [
      { q: `In this assay, what does much less luminescence in ASO-treated wells than in control wells most directly show?`,
        options: [
          { t: `Fewer viable cells in the ASO-treated wells (slower growth or more death)`, ok: true, why: `Right. CellTiter-Glo luminescence rises with the number of living cells.` },
          { t: `That the ASO has knocked down its target RNA less well`, ok: false, why: `Luminescence reports on viable cells, not on RNA levels. Knockdown is checked separately, for example by RT-qPCR.` },
          { t: `That more cells are in early apoptosis`, ok: false, why: `The light signal cannot tell apoptosis from other causes of fewer living cells. Early apoptosis is measured with a different assay (Annexin V).` },
        ],
        source: ['m-viability-2d-p1', 'm-aso-p2'] },
    ],
  },

  'm-viability-3d-p1': {
    plain: `<p>This paragraph describes the 3D (spheroid) viability test with NCI-H441 cells.</p>` +
      `<p>The cells were detached, counted, and 200,000 cells were plated in 24-well plates. The ASO–Lipofectamine3000 mix was added to the cells while they were in suspension, as described above (in the ASO paragraphs). After 24 h the cells were detached and counted again and seeded into a 96-well black plate with a clear round bottom and an ultra-low-attachment surface (a spheroid microplate; catalog details omitted — see the PAPER box). They were seeded in 20 µL "domes" made of Matrigel (catalog details omitted) mixed 1:1 with RPMI-1640 growth medium, at a density of 20,000 cells per dome.</p>` +
      `<p>The Matrigel with the cells was left to set for an hour in the incubator at 37°C. Then DMEM-F12 medium (catalog details omitted) was added on top: 40 µL for the wells meant for the first time point and 80 µL for the wells meant for the second. The spheroids grew in the incubator at 37°C in a humid atmosphere with 5% CO2.</p>` +
      `<p>After 4 h, the number of viable cells in the 3D culture was recorded as time point 0 (T0): the CellTiter-Glo 3D reagent was added, following the manufacturer's instructions (catalog details omitted), and the contents were moved to a 96-well flat clear-bottom white plate for reading on a plate reader (Tecan Infinite 200 Pro). After one week the measurement was repeated.</p>`,
    why: `<p>In general, 3D cultures are closer to a real tumor than cells growing as a flat layer; the Results say that "3D in vitro models represent a more faithful tumor model compared with monolayer cultures". Matrigel domes and an ultra-low-attachment plate (a surface that cells cannot stick to) push the cells to grow as a ball, a spheroid, instead of spreading on the plastic. Time point 0 (T0), read 4 h after seeding, is the baseline: it shows how many living cells each well started with, so the reading after one week can be interpreted as growth. In general, a dense spheroid is harder to reach than a flat layer, so a special "3D" version of the viability reagent is used.</p>`,
    memory: `A flat pancake versus a ball: every cell in a pancake is reached alike, but a ball of cells has an outside and an inside, a bit like a real tumor.`,
    flags: [
      `T0 is read 4 h after seeding for these H441 spheroids but 24 h after seeding for the BE874 organoids (two paragraphs further on), so "T0" is not the same moment in the two 3D models.`,
      `The paragraph does not give the ASO dose or the number of replicates. The Figure 5E legend says that the H441 spheroids were read 7 days after ASO transfection (25 nM), with n = 4 biological replicates, error bars SD and a one-tailed Student's t test.`,
    ],
    prereqs: ['C5', 'D8'],
    sources: ['res-aso-p6', 'fig5E'],
    checks: [
      { q: `Why is the viability of the spheroids also measured at time point 0 (4 h after seeding), and not only after one week?`,
        options: [
          { t: `T0 is the baseline: it shows how many living cells each well started with, so the one-week reading can be interpreted as growth`, ok: true, why: `Right. Without a starting reading, a one-week value could not be told apart from a different starting cell number.` },
          { t: `T0 is the negative control that replaces the non-targeting ASO`, ok: false, why: `A control is a separate sample (for example a non-targeting ASO). T0 is a time point read on the same samples, not a control.` },
          { t: `T0 measures how well the ASO lowered its target RNA`, ok: false, why: `CellTiter-Glo 3D counts viable cells. RNA knockdown is measured by RT-qPCR.` },
        ],
        source: ['m-viability-3d-p1'] },
    ],
  },

  'm-viability-3d-p2': {
    plain: `<p>The BE874 organoids were generated and expanded in a specially composed lung cancer organoid (LCO) medium. Its composition is given in Data S4 (a supplementary item, not in your PDF).</p>`,
    why: `<p>In general, patient-derived organoids are grown in a specially composed medium (a custom mix of nutrients and signaling factors), not in the standard media used for cell lines, such as the DMEM and RPMI media in the Experimental model section. The paragraph only names the medium and points to its recipe.</p>`,
    flags: [
      `The recipe is not in the main text: the paragraph points to Data S4, which is not in your PDF.`,
    ],
    prereqs: ['C5', 'C4'],
    checks: [
      { q: `What does this paragraph say about the medium used for the BE874 organoids?`,
        options: [
          { t: `They were generated and expanded in a specially composed lung cancer organoid (LCO) medium whose recipe is given in a supplementary file`, ok: true, why: `Right. The paragraph names the LCO medium and points to Data S4 for its composition.` },
          { t: `They were grown in the same DMEM medium with serum as the A549 cells`, ok: false, why: `The Experimental model section gives DMEM with serum for A549 and HEK293T cells. The organoids have their own LCO medium.` },
          { t: `They were grown only inside mice and never in a dish`, ok: false, why: `Cells from the mouse tumor were isolated to generate organoids, which were then expanded in medium and seeded in Matrigel domes for the viability tests.` },
        ],
        source: ['m-viability-3d-p2', 'm-expmodel-p2', 'm-pdx-p1', 'm-viability-3d-p3'] },
    ],
  },

  'm-viability-3d-p3': {
    plain: `<p>The BE874 organoids were transfected with ASOs in the same way as described for the NCI-H441 cells.</p>` +
      `<p>24 h after transfection, the cells were detached, counted and seeded into a 96-well flat clear-bottom white plate (catalog details omitted — see the PAPER box) in 20 µL domes of LCO growth medium and Matrigel (1:1), at a density of 20,000 cells per dome. The Matrigel domes with the PDX organoids were left to set for an hour in the incubator at 37°C, and then 80 µL of LCO growth medium was added on top. The organoids grew in the incubator at 37°C in a humid atmosphere with 5% CO2.</p>` +
      `<p>After 24 h, 100 µL of CellTiter-Glo 3D (catalog details omitted) was added to the wells meant for T0, and the luminescence was recorded on the plate reader. After three days, 80 µL of LCO medium was added to the wells to keep them from drying out. After one week, the medium was removed and replaced with fresh medium (80 µL) before the measurement with CellTiter-Glo 3D.</p>`,
    why: `<p>In general, patient-derived organoids sit closer to a patient's tumor than ordinary cell lines, so a loss of viability after CHiLL1 ASOs in them is stronger support that the ASOs could work in patients. The Results state that organoids from PDXs "recapitulate the therapy response of individual patients" and that CHiLL1 ASOs significantly reduced the viability of BE874 organoids. The set-up mirrors the spheroid test (ASOs first, Matrigel domes, a T0 reading and a one-week reading), so the two 3D models can be compared. Adding medium after three days and replacing it after a week keeps the wells from drying out during a week in culture, as the paragraph says.</p>`,
    flags: [
      `T0 is read 24 h after seeding here, but 4 h after seeding for the H441 spheroids (previous paragraphs), so "T0" is not the same moment in the two 3D models.`,
      `The ASO dose is not stated. This paragraph only refers back to the NCI-H441 procedure, and the earlier ASO paragraph lists 25 nM for NCI-H441 but gives no dose for BE874.`,
      `The Figure 5F legend gives the statistics: n = 4 biological replicates and n > 3 technical replicates, error bars SD, one-tailed Student's t test. It says the error bars "represent the variability of technical replicates".`,
    ],
    prereqs: ['C5', 'D8'],
    sources: ['res-aso-p7', 'm-viability-3d-p1', 'm-aso-p1', 'fig5F'],
    checks: [
      { q: `At what point after seeding was the T0 reading taken for the BE874 organoids?`,
        options: [
          { t: `After 24 h`, ok: true, why: `Right. The paragraph says "After 24 h, 100 µL of CellTiter-Glo 3D ... were added to the wells intended for the T0".` },
          { t: `After 4 h`, ok: false, why: `4 h is the T0 of the H441 spheroids in the first 3D paragraph, not of the organoids.` },
          { t: `After three days`, ok: false, why: `Three days is when extra medium (80 µL) was added to keep the wells from drying out. It is not a measurement point.` },
          { t: `After one week`, ok: false, why: `One week is the second reading, taken after the medium was replaced. T0 is the earlier baseline.` },
        ],
        source: ['m-viability-3d-p3', 'm-viability-3d-p1'] },
    ],
  },

});

/* ----- rescue, apoptosis, cell cycle, migration, RT-qPCR ----- */
Object.assign(window.TRACKG.paras, {

  'm-rescue-p1': {
    plain: `<p>To make cells overexpress CHiLL1 and GCAWKR, the full-length sequences of the two genes (transcript IDs ENST00000520840.1 and ENST00000558254.5, respectively) were synthesized by a gene-synthesis company and cloned into the pcDNA3.1 vector, which gave the overexpression plasmids. The empty pcDNA3.1 vector served as the control.</p>` +
      `<p>A549 cells were transfected with the plasmids using Lipofectamine 3000 (catalog details omitted — see the PAPER box). Cells that had been successfully transfected were selected with puromycin (2 µg/mL) for 96 h. The transfection efficiency was confirmed by RT-qPCR, and the cells were then collected for the following experiments.</p>`,
    why: `<p>In general, a rescue experiment asks whether the effect of knocking a gene down can be reversed by putting that gene's RNA back. If it can, the effect was really caused by losing that RNA (an on-target effect); if it cannot, something else may be involved. The empty-vector control shows that the plasmid and the transfection alone do not change the cells. In general, antibiotic selection keeps only the cells that took up a plasmid carrying the matching resistance gene, so the cells tested are the ones that carry the plasmid. The Results report that overexpression of neither CHiLL1 nor GCAWKR could rescue the ASO-induced phenotypes, and they offer two possible explanations: cis-regulatory mechanisms, or functional transcript isoforms that are unannotated and were not tested.</p>`,
    memory: `Switch a lamp off (knockdown) and put the bulb back (overexpression): if the room is bright again, the missing bulb was the cause. The empty vector is a dummy bulb, to show that just touching the fixture does not light the room.`,
    flags: [
      `The paragraph gives one transcript ID per lncRNA, but the Results say CHiLL1 has two annotated isoforms and GCAWKR four. The paragraph does not say which isoform was overexpressed.`,
      `The paragraph does not say which antibiotic-resistance gene the plasmid carries. Puromycin selection only works if the plasmid provides puromycin resistance.`,
      `Which phenotype was measured to judge the rescue is not described here. The Results cite a supplementary figure (Figure S5C) that is not in your PDF.`,
    ],
    prereqs: ['D9', 'D6', 'D2'],
    sources: ['res-aso-p3', 'res-aso-p4', 'res-aso-p5'],
    checks: [
      { q: `Why was an empty pcDNA3.1 vector used as a control in the rescue experiment?`,
        options: [
          { t: `To show that any change in the cells comes from the inserted lncRNA sequence and not from the plasmid or the transfection itself`, ok: true, why: `Right. The empty vector goes through the same steps but carries no lncRNA sequence.` },
          { t: `To knock down the lncRNA so that the effect of overexpression can be compared`, ok: false, why: `Knockdown is done with ASOs. The empty vector only carries the plasmid backbone, with no lncRNA sequence inserted.` },
          { t: `To increase how much CHiLL1 and GCAWKR RNA the cells make`, ok: false, why: `Overexpression comes from the plasmids that carry the lncRNA sequences. The empty vector has none, so it cannot raise the RNA level.` },
        ],
        source: ['m-rescue-p1'] },
    ],
  },

  'm-apoptosis-p1': {
    plain: `<p>Two stains were used: Annexin V to detect early apoptotic cells and a viability dye to detect dead cells.</p>` +
      `<p>24 h after the transfection, cells were counted and 150,000 cells were suspended in 100 µL of 1X PBS (a salt solution used for washing and suspending cells). The viability dye (catalog details omitted — see the PAPER box) was added at 1:5,000 in 100 µL of 1X PBS, and the cells were incubated for 30 min at 4°C. The cells were then washed once with 1X PBS and suspended in 100 µL of Annexin buffer, pH 7. Annexin V carrying the fluorescent label PE (1:200; catalog details omitted) was added and the cells were incubated for 30 min at 4°C. After a wash with 1X PBS, the cells were resuspended in 300 µL of Annexin buffer and run on a flow cytometer (an LSR Fortessa instrument). Unstained cells were used as a control.</p>`,
    why: `<p>In general, a cell that starts to die by apoptosis shows a particular fatty molecule on the outer surface of its membrane, and Annexin V sticks to it, so Annexin V marks cells in early apoptosis. A dead cell has a leaky membrane that lets the viability dye in, so that dye marks dead cells. With both stains in one tube, a flow cytometer can sort cells into healthy, early apoptotic and dead. In general, Annexin V needs calcium to bind, and the special Annexin buffer supplies it. Unstained cells show the cells' own background glow, so a real signal can be told apart from it. The Results use this assay to test a hint from the pathway analysis ("apoptosis" among the KEGG terms): knockdown of CHiLL1, but not GCAWKR, increased early apoptotic cells.</p>`,
    memory: `Annexin V is a "distress flag" stuck on cells that have started their self-destruct program. The viability dye only gets into cells whose wall is already broken (dead).`,
    flags: [
      `The paragraph does not say how many replicates were run or which test was used. The Figure 6G legend gives only the timing ("24 h after transfection") and the ASO targets, with no n, error bars or test.`,
      `The paragraph does not describe how the gates (the boxes that define "early apoptotic" and "dead") were set, apart from using unstained cells as a control.`,
    ],
    prereqs: ['D8', 'B1', 'D3'],
    sources: ['res-mechanism-p5', 'fig6G'],
    checks: [
      { q: `Why are two stains (Annexin V and a viability dye) used in the same tube?`,
        options: [
          { t: `Annexin V flags cells that have just started to die and the viability dye flags cells that are already dead, so one run separates early apoptotic from dead cells`, ok: true, why: `Right. The paragraph says Annexin V and the viability dye detect "early apoptotic and dead cells, respectively".` },
          { t: `Annexin V measures how many cells are in each cell-cycle phase, and the viability dye counts all cells`, ok: false, why: `Cell-cycle phases are read from DNA content (with the stain DAPI) in a different assay. Annexin V reports early apoptosis, and the viability dye marks dead cells.` },
          { t: `The viability dye corrects for the fluorescence of Annexin V, like a normalization gene`, ok: false, why: `The dye has its own job: marking dead cells. Correcting for loading differences is what a housekeeping gene does in RT-qPCR.` },
        ],
        source: ['m-apoptosis-p1'] },
    ],
  },

  'm-cellcycle-p1': {
    plain: `<p>Cells were transfected with ASOs using Lipofectamine3000, following the manufacturer's instructions. After 24 h the cells were harvested and fixed (preserved) with a commercial fixation and permeabilization solution for 30 min at room temperature (catalog details omitted — see the PAPER box). They were washed with a perm/wash buffer and resuspended in 1X PBS.</p>` +
      `<p>A Ki-67 antibody was added (1:100; catalog details omitted) and incubated for 30 min at 4°C. After another wash with the perm/wash buffer, DAPI (catalog details omitted) was added (1:10,000) in 100 µL of 1X PBS, left for 5 minutes at room temperature, and washed with 1X PBS. The data were collected on a flow cytometer (Fortessa) and analyzed with FlowJo. The different cell-cycle phases were determined according to the Dean-Jett Fox (DJF) model.</p>`,
    why: `<p>In general, DAPI binds DNA, so the amount of DAPI signal per cell tells how much DNA it has: cells in G1 have one set, cells in G2 (and mitosis) have a doubled set, and cells in S phase are in between. Ki-67 is a protein found in cells that are cycling and absent from resting cells, so it adds information on whether a cell is cycling at all. The cells must be fixed and permeabilized so that the antibody and dye can get inside, and fixation freezes the cells at the moment they were harvested. In general, the DJF model fits a curve to the DNA-content histogram to estimate the share of cells in each phase. In the Results, GCAWKR knockdown, but not CHiLL1 knockdown, increased the share of cells in G2, which fits the "G2-M checkpoint" term found for GCAWKR.</p>`,
    memory: `DAPI asks "how much DNA do you carry?" (one set or two). Ki-67 asks "are you awake?" (cycling or resting).`,
    flags: [
      `The Figure 6K legend says this assay was run with n = 2 biological replicates, error bars SD, and a two-tailed Student's t test. With only two replicates, each error bar rests on just two values.`,
      `The paragraph does not say how Ki-67 and DAPI were combined to assign cells to phases. It only says that the phases were determined with the DJF model.`,
    ],
    prereqs: ['D8', 'B1'],
    sources: ['res-mechanism-p6', 'fig6K'],
    checks: [
      { q: `Which pairing correctly describes what the two stains in this cell-cycle assay report?`,
        options: [
          { t: `DAPI reports how much DNA a cell has (separating G1 from S and G2); Ki-67 marks cells that are cycling`, ok: true, why: `Right. Together they place cells in cell-cycle stages; the DJF model then estimates the share in each phase.` },
          { t: `DAPI marks early apoptotic cells; Ki-67 marks dead cells`, ok: false, why: `That mixes this assay up with the apoptosis assay, where Annexin V and a viability dye do those jobs.` },
          { t: `DAPI counts how many cells crossed a membrane; Ki-67 counts living cells`, ok: false, why: `Cells that crossed a membrane are measured with crystal violet in the migration assay, and living cells are counted with CellTiter-Glo.` },
        ],
        source: ['m-cellcycle-p1'] },
    ],
  },

  'm-migration-assay-p1': {
    plain: `<p>The migration assay was done as previously described (the paragraph points to an earlier source). 24 h after ASO transfection, A549 cells were counted and seeded into the upper part of Boyden chambers (transwells) at 35,000 cells per transwell. The upper part of the transwell insert was filled with medium without FBS (serum), while the lower part had medium with 10% FBS, which was meant to induce the directional movement of the cells.</p>` +
      `<p>After 24 h the cells were washed three times with 1X PBS and stained with 300 µL of crystal violet 1% for 30 min, followed by three more washes with 1X PBS. The cells on the upper side of the membrane were removed with a cotton swab, and the chambers were left to dry overnight. The next day the crystal violet was dissolved in 1X PBS containing 1% SDS, and the absorbance at 595 nm was recorded on a plate reader (Tecan Infinite 200 Pro).</p>`,
    why: `<p>In general, a transwell is a small cup whose floor is a membrane with tiny pores. Cells are put on top in medium without serum, and the bottom holds medium with 10% serum, which acts as a lure; cells that migrate squeeze through the pores to the underside. Wiping the top side removes the cells that did not cross, so only migrated cells keep their stain. Dissolving the crystal violet and reading its absorbance turns "how many cells crossed" into a number: more stain means more cells (a relative readout, not an exact cell count). Without the serum gradient the cells would have no reason to move in one direction. In the Results, GCAWKR knockdown impaired migration, and ASO knockdown of three other hits impaired A549 migration.</p>`,
    memory: `A cat flap with a food bowl outside: the serum is the bowl, the pores are the flap, and only the cats that went through leave paw prints on the far side.`,
    flags: [
      `"As previously described" is followed by a reference mark (see the PAPER box). In the reference list, that entry is the ENCODE Project Consortium paper, which does not look like a migration protocol.`,
      `The paragraph gives no pore size and no number of repeats. The Figure 6L legend says n = 4 biological replicates, error bars SD, one-tailed Student's t test, with the crystal violet reading normalized to the non-targeting ASO.`,
      `In Figure 3F the axis label is printed "Cristal violet OD" (a typo for crystal violet).`,
    ],
    prereqs: ['D8', 'D5'],
    sources: ['res-mechanism-p6', 'res-validation-p5', 'fig6L', 'ref-108'],
    checks: [
      { q: `Why does the lower compartment contain medium with 10% FBS while the upper compartment contains none?`,
        options: [
          { t: `The serum below acts as an attractant, so cells move through the membrane toward it (directional movement)`, ok: true, why: `Right. The paragraph says the serum is there "to induce the directional movement of cells".` },
          { t: `The serum-free upper compartment keeps the cells alive and growing faster`, ok: false, why: `Taking serum away does not help growth. The serum below is the lure that makes cells cross the membrane.` },
          { t: `Serum is what stains the migrated cells so they can be read at 595 nm`, ok: false, why: `Staining is done with crystal violet after 24 h. Serum is not a stain.` },
        ],
        source: ['m-migration-assay-p1'] },
    ],
  },

  'm-qpcr-p1': {
    plain: `<p>Total RNA was purified from cultured cells with a commercial RNA kit, following the manufacturer's protocol (catalog details omitted — see the PAPER box). The RNA was reverse transcribed to make cDNA with a reverse-transcription kit (catalog details omitted). The cDNA was then used for qPCR to measure gene expression, with a qPCR master-mix kit (catalog details omitted). The expression of HPRT1 was used as an internal control for normalization. All the RT-qPCR primers are listed in Data S4 (a supplementary item, not in your PDF).</p>`,
    why: `<p>In general, PCR can only copy DNA, so RNA is first turned into DNA (cDNA) by reverse transcription. qPCR then copies the cDNA in cycles while a fluorescent signal builds up, and the more starting copies there were, the earlier the signal appears. That turns "how much of this RNA is in the cells" into a number, which is how the paper checks that an ASO or a deletion lowered its target. Normalizing to a housekeeping gene (an RNA expected to stay steady, here HPRT1) corrects for differences in how much RNA went into each tube. Without it, a lower signal could simply mean fewer cells or a poorer RNA preparation rather than a real drop in the target.</p>`,
    memory: `Weighing yourself on different scales: you check each scale with a known reference weight (the housekeeping gene), so you can tell whether you changed or the scale did.`,
    flags: [
      `The Methods name HPRT1 as the internal control, but the y-axis of Figure 1F reads "Normalised to GAPDH" (printed in the image), and GAPDH is used as the cytosolic marker in Figure 6C (a different purpose). The paragraph does not say whether HPRT1 was used in every experiment.`,
      `The paragraph does not say how relative expression was calculated or how many technical replicates were run per sample.`,
    ],
    prereqs: ['D7', 'D6'],
    sources: ['fig1F', 'fig6C'],
    checks: [
      { q: `Why was HPRT1 measured in every RT-qPCR sample?`,
        options: [
          { t: `As an internal control for normalization: it corrects for differences in the amount of RNA between samples, so changes in the target RNA can be compared fairly`, ok: true, why: `Right. A housekeeping gene is expected to stay steady, so it shows how much RNA went into each tube.` },
          { t: `Because HPRT1 is the lncRNA that the ASOs were designed to lower`, ok: false, why: `The ASO targets are lncRNAs such as CHiLL1 and GCAWKR. HPRT1 is a reference gene whose level is not expected to change.` },
          { t: `To show that the ASOs got into the cells`, ok: false, why: `Uptake was checked with a fluorescently labeled control ASO (see the ASO paragraphs), not with HPRT1.` },
        ],
        source: ['m-qpcr-p1', 'm-aso-p2'] },
    ],
  },

});

/* ----- RNA-seq, FISH and fractionation, ezTracks ----- */
Object.assign(window.TRACKG.paras, {

  'm-rnaseq-p1': {
    plain: `<p>24 h after ASO transfection, A549 and H460 cells were harvested and their total RNA was extracted as explained before. The quality of the RNA samples was checked on a Bioanalyzer (an instrument for checking RNA quality).</p>` +
      `<p>Sequencing libraries were prepared with the NEBNext Ultra RNA Library Prep Kit (catalog details omitted — see the PAPER box) and sequenced in "paired-end 150" format (each DNA fragment is read from both ends, with reads 150 letters long), to a depth of 30M reads (30 million reads) per sample.</p>`,
    why: `<p>In general, RNA-seq reads out all the RNAs in a sample, so it shows what happens to the whole transcriptome when a lncRNA is knocked down; the paper calls this "molecular phenotyping". The quality check matters because degraded RNA would give distorted counts. In general, sequencing depth (reads per sample) sets how precisely even rare RNAs can be counted, and this matters here because CHiLL1 is not abundant (about 4 molecules per cell, according to the Results). Using two cell lines, A549 and H460, lets the authors ask whether the changes are general across KRAS+ cells.</p>`,
    flags: [
      `The paragraph does not say how many replicates were sequenced. The Figure 6D legend mentions "three RNA-seq replicates" from A549 RNA, and the Results say that CHiLL1 was perturbed with two ASOs and GCAWKR with a single ASO.`,
    ],
    prereqs: ['D10', 'D4', 'B7'],
    sources: ['res-mechanism-p2', 'res-mechanism-p3', 'res-mechanism-p6', 'm-gdna-p2', 'fig6D'],
    checks: [
      { q: `What does "30M reads/sample" describe in this paragraph?`,
        options: [
          { t: `The sequencing depth: about 30 million reads for each RNA sample, which sets how precisely even rare RNAs can be counted`, ok: true, why: `Right. Depth is the amount of sequencing per sample.` },
          { t: `The length of each read`, ok: false, why: `Read length is given by the "150" in "paired-end 150" (150-letter reads, as in the genomic DNA sequencing paragraph).` },
          { t: `The number of ASOs transfected per sample`, ok: false, why: `The ASOs were transfected before harvest. "30M reads" counts sequence reads, not ASOs.` },
          { t: `The number of genes found to change after knockdown`, ok: false, why: `Changing genes are found later with Sleuth. Reads per sample only describe how much sequencing was done.` },
        ],
        source: ['m-rnaseq-p1', 'm-gdna-p2'] },
    ],
  },

  'm-rnaseq-p2': {
    plain: `<p>The reads were turned into RNA amounts ("transcript quantification") with the program Kallisto (v0.46.0), using the GENCODE v36 gene catalog as the list of known transcripts. Gene-level expression was then worked out by adding up (aggregating) the counts of all the isoforms of each gene.</p>` +
      `<p>Differentially expressed genes (genes that go up or down after knockdown) were found with the program Sleuth (v0.30). Genes with a q-value below 0.2 (an FDR-adjusted p-value) were called significant.</p>` +
      `<p>For CHiLL1, the authors selected the genes that were significantly up- and down-regulated with two different ASOs, that is, the genes changed with both (the Results call this "the intersection of both ASOs"). For GCAWKR, they selected the pool of common genes that were deregulated in both A549 and H460 cells.</p>`,
    why: `<p>In general, Kallisto estimates how many reads come from each known transcript by matching the reads to a transcript list (here GENCODE v36) rather than to the whole genome, which is fast. A gene can have several isoforms, so the transcript counts are added up to get one number per gene that can be compared between conditions. Sleuth then asks, for each gene, whether the difference between knockdown and control is bigger than the noise. Thousands of genes are tested at once, so the p-values are corrected for multiple testing: a q-value is such an adjusted value, and q &lt; 0.2 accepts that roughly one in five of the genes called significant (20%, computed from 0.2) may be false positives, a fairly lenient cut-off.</p>` +
      `<p>Keeping, for CHiLL1, only the genes changed by two different ASOs (and, for GCAWKR, the genes changed in two cell lines) keeps the changes that repeat across independent reagents or cell backgrounds, so they are unlikely to be an off-target effect of one ASO. The Results say that the changes were highly correlated between the two CHiLL1 ASOs, "indicating that the majority of effects arise via on-target perturbation of CHiLL1".</p>`,
    memory: `Kallisto is the counter (how many reads per transcript); Sleuth is the judge (is the before-and-after difference bigger than the noise?).`,
    flags: [
      `The 0.2 cut-off is an "otherwise specified" case under the general p ≤ 0.05 rule at the end of the Methods. The screen hits also use FDR &lt; 0.2.`,
      `The reference marks printed here for Kallisto and Sleuth (see the PAPER box) differ from the ones in the software list at the end of the Methods. In the reference list, the entries behind the marks printed here are CellProfiler and a paper on conserved RNA structures, while the marks in the software list lead to the Kallisto and Sleuth papers.`,
      `For GCAWKR only a single ASO is described in the Results, so its gene set rests on the overlap of two cell lines rather than of two ASOs.`,
    ],
    prereqs: ['D10', 'E4', 'D6'],
    sources: ['res-mechanism-p2', 'res-mechanism-p3', 'res-mechanism-p6', 'm-quant-p3', 'm-hits-p3'],
    derived: ['20'],
    checks: [
      { q: `Why does the analysis keep, for CHiLL1, only genes that change with two different ASOs?`,
        options: [
          { t: `A change seen with two independent ASOs is more likely to come from losing CHiLL1 itself than from an off-target effect of one ASO, so these genes are a high-confidence set`, ok: true, why: `Right. The Results call this the intersection of both ASOs and support it with the high correlation between the two ASOs.` },
          { t: `Sleuth can only analyze two ASOs at a time`, ok: false, why: `Nothing in the paragraph limits Sleuth. The overlap is a choice made to gain confidence.` },
          { t: `Because a q-value below 0.2 can only be reached when two ASOs agree`, ok: false, why: `The q-value cut-off (0.2) is applied to each comparison on its own. The overlap is a second, extra filter.` },
          { t: `To make the gene list larger by pooling every gene changed by either ASO`, ok: false, why: `Pooling would be a union. The paragraph selects genes changed with both ASOs (the "intersection" in the Results), which makes the list smaller and more reliable.` },
        ],
        source: ['m-rnaseq-p2', 'res-mechanism-p3'] },
    ],
  },

  'm-rnaseq-p3': {
    plain: `<p>The results were visualized in R 4.0.0 (a statistical programming language) using the ggplot2 package v3.3.2 (a plotting package).</p>` +
      `<p>Functional enrichment analysis (asking which known pathways or gene sets are over-represented among the changed genes) was performed with the enrichR package v2.1.</p>`,
    why: `<p>In general, a list of hundreds of changed genes is hard to read. Enrichment analysis asks whether genes from a known pathway or gene set show up in that list more often than chance would predict. That is how the paper moves from "many genes change" to named pathways (for example MAPK and PI3K-Akt for CHiLL1, and cell-cycle terms such as the "G2-M checkpoint" for GCAWKR). Naming the software and versions lets others repeat the plots and the analysis.</p>`,
    flags: [
      `The texts in brackets, such as "(R: The R Project for Statistical Computing, n.d.)", are reference-manager entries pasted into the sentence ("n.d." means "no date"). They carry no information about the analysis.`,
      `The paragraph says enrichR v2.1, but the reference-list entry behind the printed mark describes "R Package enrichR Version 3.0".`,
      `The paragraph does not say which gene-set collections were searched. The Results mention KEGG and MSigDB.`,
    ],
    prereqs: ['D10', 'D11'],
    sources: ['res-mechanism-p3', 'res-mechanism-p4', 'res-mechanism-p6', 'ref-109'],
    checks: [
      { q: `What question does a functional enrichment analysis (here run with the enrichR package) answer?`,
        options: [
          { t: `Whether genes from a known pathway or gene set are over-represented among the genes that changed, more than chance would predict`, ok: true, why: `Right. That is how a long gene list is turned into pathways such as MAPK or the G2-M checkpoint.` },
          { t: `Which ASO knocked down the lncRNA most strongly`, ok: false, why: `Knockdown strength is measured by qRT-PCR or by the lncRNA's own RNA-seq signal, not by enrichment analysis.` },
          { t: `How many reads were sequenced for each sample`, ok: false, why: `Sequencing depth (30M reads per sample in the first RNA-seq paragraph) is a property of the library and the sequencing run. It has nothing to do with enrichment.` },
        ],
        source: ['m-rnaseq-p3', 'm-rnaseq-p1'] },
    ],
  },

  'm-fish-p1': {
    plain: `<p>RNA-FISH (fluorescent in situ hybridization) was done on A549 cells, following the Stellaris protocol from the probe supplier (web link omitted). To detect CHiLL1 and GCAWKR at the single-cell level, pools of 25 and 48 FISH probes, respectively, were designed with the supplier's Stellaris probe-designer software.</p>` +
      `<p>Cells were grown on round glass coverslips (18 mm), fixed in 3.7% formaldehyde, and permeabilized in 70% ethanol overnight. Hybridization (the probes finding and binding their target RNA) was carried out overnight at 37°C in the Stellaris hybridization buffer. The cells were counterstained with DAPI and imaged on a DeltaVision microscope.</p>`,
    why: `<p>In general, where an RNA sits in the cell is a clue to what it does (the Results say that "subcellular localization yields important mechanistic clues for lncRNAs"), and the paper finds CHiLL1 mainly in the cytoplasm and GCAWKR in the nucleus. FISH shows individual cells. With many short fluorescent probes along one RNA, each RNA molecule lights up as a bright spot that stands out from the background, whereas a single probe would be too faint. Fixation preserves the RNA where it was, permeabilization lets the probes in, and DAPI marks the nucleus so that spots can be assigned to nucleus or cytoplasm. The Results add that specificity was validated by knockdown.</p>`,
    memory: `A string of tiny beads: one bead is too dim to see, but a whole string of 25 or 48 beads makes a dot you can spot.`,
    flags: [
      `The Figure 6B legend calls the images "confocal microscopy", while this paragraph names a "DeltaVision microscope". The paragraph does not say whether it was used in a confocal mode.`,
      `The paragraph does not say how many cells were imaged or how the nuclear/cytoplasmic ratio was computed. Figure 6B shows an N/C quantification, and the analysis pipeline is named in the next paragraph.`,
    ],
    prereqs: ['D9', 'B6'],
    sources: ['res-mechanism-p1'],
    checks: [
      { q: `Why are pools of many probes (25 for CHiLL1, 48 for GCAWKR) used for each RNA in FISH?`,
        options: [
          { t: `Many fluorescent probes binding along the same RNA add up to a bright spot that stands out from the background, so single RNA molecules can be seen`, ok: true, why: `Right. One probe alone would give too faint a signal.` },
          { t: `Each probe in a pool detects a different lncRNA, so one pool screens many lncRNAs at once`, ok: false, why: `The pools are separate for each lncRNA: one pool of 25 probes for CHiLL1 and one of 48 for GCAWKR.` },
          { t: `The probes silence the lncRNA so that its location can be seen`, ok: false, why: `FISH probes only detect RNA; they do not lower it. Silencing is done with ASOs (knockdown was used only to check that the FISH signal is specific).` },
        ],
        source: ['m-fish-p1', 'res-mechanism-p1'] },
    ],
  },

  'm-fish-p2': {
    plain: `<p>Nuclear and cytoplasmic fractionation (physically separating the nuclear and cytoplasmic parts of the cells) was carried out in A549 cells as described previously. The pipeline used to analyze the data was adapted from CellProfiler and is named "SpeckleCounting".</p>`,
    why: `<p>In general, fractionation gives a second, independent way to ask where an RNA lives: the cells are split into a nuclear and a cytoplasmic part, and the RNA in each part is measured (in this paper by qRT-PCR, with MALAT1 and GAPDH as nuclear and cytosolic markers). FISH looks at single cells, while fractionation averages over many cells, so agreement between the two makes the localization result more believable; the Results say the FISH results "were further corroborated by cell fractionation". In general, an automated image-analysis pipeline lets every image be measured in the same way instead of by eye.</p>`,
    flags: [
      `The paragraph says "the data" without saying which data (fractionation measurements or microscope images). CellProfiler is image-analysis software and the pipeline name suggests counting spots, so it was probably used on the FISH images, but the paragraph does not say so.`,
      `"As described previously" is followed by a reference mark (see the PAPER box). In the reference list, that entry is a paper about the ZBTB7A gene in lung cancer, not an obvious fractionation protocol.`,
    ],
    prereqs: ['D9', 'B6'],
    sources: ['res-mechanism-p1', 'fig6C', 'ref-80'],
    checks: [
      { q: `Why does the paper add nuclear/cytoplasmic fractionation to the FISH experiment?`,
        options: [
          { t: `It is a second, independent way to measure where each lncRNA sits, so agreement with FISH makes the localization result more believable`, ok: true, why: `Right. The Results say the FISH results were "further corroborated by cell fractionation".` },
          { t: `Fractionation is needed because FISH cannot be done on A549 cells`, ok: false, why: `FISH was done on A549 cells (previous paragraph). Fractionation was added as corroboration.` },
          { t: `Fractionation knocks the lncRNAs down so that the FISH signal can be checked`, ok: false, why: `Fractionation only splits cells into parts. The specificity of the FISH signal was checked by knockdown with ASOs.` },
        ],
        source: ['m-fish-p2', 'm-fish-p1', 'res-mechanism-p1'] },
    ],
  },

  'm-eztracks-p1': {
    plain: `<p>The authors collected "genomic tracks" (data layers that can be drawn along a stretch of the genome), all for the hg38 version of the human genome. Some were taken from their original publications: predicted neo-functionalized fragments of transposable elements (pieces of "jumping" DNA that seem to have gained a new function), also called RIDLs (repeat insertion domains of lncRNA); RNA structures conserved in vertebrates (CRS); and ENCODE candidate cis-regulatory elements.</p>` +
      `<p>Other tracks were downloaded from the UCSC Genome Browser: repeat-masked CpG islands; phastCons conserved elements from multiple alignments of 7, 20, 30 and 100 species ("7-, 20-, 30- and 100-way"); and repeat families from the RepeatMasker annotation.</p>`,
    why: `<p>In general, one way to guess which parts of a lncRNA might matter is to ask whether its DNA is conserved across species, comes from repeats, or can fold into a conserved structure. Each of these facts is a separate "track" drawn under the gene model, so a reader can see at a glance where along the exons such features lie. Using the same genome version (hg38) for all tracks keeps their positions comparable. In the paper, the tracks are used to look for functional-looking elements in the two lncRNAs: the Results say that CHiLL1 exons lack obvious functional elements, whereas GCAWKR contains numerous conserved sequences and structures.</p>`,
    memory: `Transparent map overlays on one base map: roads (the gene), parks (conserved regions), old ruins (repeats). The base map is the genome version (hg38), and every overlay must use the same one.`,
    flags: [
      `The paragraph lists where the tracks came from, not what they show. The findings are in the mechanism Results and in Figure 6A (and in a supplementary figure for CHiLL1 that is not in your PDF).`,
    ],
    prereqs: ['F3', 'B3'],
    sources: ['res-mechanism-p1'],
    checks: [
      { q: `Why are conservation (phastCons) and conserved RNA structure tracks drawn alongside a lncRNA's exons?`,
        options: [
          { t: `Conserved sequences and structures can hint at functional elements inside the lncRNA, such as the numerous ones the Results report for GCAWKR`, ok: true, why: `Right. The Results say GCAWKR "contains numerous conserved sequences and structures", hinting at potential functional elements.` },
          { t: `They measure how strongly the ASOs knock down the lncRNA`, ok: false, why: `Knockdown is measured by RT-qPCR or RNA-seq. Tracks are annotation layers of the genome and measure nothing in the cells.` },
          { t: `They show in which cells the lncRNA is expressed`, ok: false, why: `Conservation and repeat tracks describe the DNA sequence and its history, not where or when the lncRNA is expressed.` },
        ],
        source: ['m-eztracks-p1', 'res-mechanism-p1'] },
    ],
  },

  'm-eztracks-p2': {
    plain: `<p>The full gene annotations for the CHiLL1 locus (ENSG00000253616) and the GCAWKR locus (two gene IDs, ENSG00000272808 and ENSG00000232386) were taken from the GENCODE v36 GTF file (a file that lists genes and their exons).</p>` +
      `<p>Then all the exons of each locus were collapsed into a single "meta-transcript" and saved as a separate GTF file for each locus, using the "merge" function of BEDTools. Third, configuration files were prepared for each locus so that the program (ezTracks) could draw the meta-transcript annotation next to the genomic tracks.</p>`,
    why: `<p>In general, a lncRNA gene often has several isoforms with different exons. Collapsing all exons of all isoforms into one "meta-transcript" gives a single outline of everything the locus can transcribe, so the tracks can be compared with the whole exon territory in one picture. The paper describes two annotated isoforms for CHiLL1 and four for GCAWKR, and the Figure 6A legend says the GCAWKR plot "was generated with ezTracks".</p>`,
    flags: [
      `The paragraph lists two Ensembl IDs for GCAWKR, but the Results give only one ("ENSG00000272808; GCAWKR"). The paragraph does not say why a second ID was included.`,
      `The steps are labeled "Then" and "Third" (there is no "Second"), and the last sentence says "using the program" without naming it. The unit title and the reference mark identify it as ezTracks.`,
    ],
    prereqs: ['F3', 'B7'],
    sources: ['res-aso-p3', 'res-aso-p4', 'res-aso-p5', 'fig6A'],
    checks: [
      { q: `What is the "meta-transcript" made in this paragraph?`,
        options: [
          { t: `One merged outline made by collapsing all exons of all isoforms of a locus, so that a single gene model can be drawn next to the tracks`, ok: true, why: `Right. The paragraph says all the exons of each locus were collapsed into a meta-transcript.` },
          { t: `The longest single isoform of each gene`, ok: false, why: `The paragraph collapses all exons of the locus. It does not pick one isoform.` },
          { t: `A new transcript predicted from the RNA-seq data after ASO knockdown`, ok: false, why: `The meta-transcript is built from the existing GENCODE annotation (the GTF file), not from the RNA-seq data.` },
        ],
        source: ['m-eztracks-p2'] },
    ],
  },

});

/* ----- copy number, software and statistics ----- */
Object.assign(window.TRACKG.paras, {

  'm-cnv-p1': {
    plain: `<p>The copy number status of A549 and H460 cells (how many copies of each stretch of DNA the cells carry) was taken from CCLE, the Cancer Cell Line Encyclopedia. Then the authors intersected (overlapped) the hg19 coordinates of the pgRNAs with the hg19 coordinates of the CCLE copy number data.</p>`,
    why: `<p>In general, cancer cells often carry extra or missing copies of stretches of DNA, and the position of a pgRNA decides which copy-number value applies to it. Overlapping the pgRNA positions with the copy-number segments gives each candidate a copy-number value in A549 and H460. The paper's own reason for looking is that "screen hits tend to be amplified, but not depleted, in DNA from tumors ... and cell lines", which it counts as support for oncogenic roles. In general, copy number can also bias CRISPR cutting screens (more copies mean more cuts), which is another reason to check it. Both lists must use the same genome version (hg19), or the positions would not line up.</p>`,
    memory: `Copy number is how many photocopies of a page exist. CCLE is the catalog that lists the copy count for each page, and hg19 coordinates are the page numbers. Both lists must use the same edition (hg19) before you can match them.`,
    flags: [
      `This paragraph and the next one use hg19 coordinates, whereas the tracks and annotations in the ezTracks section use hg38. The paragraphs do not say why different genome versions were used.`,
      `The paragraph gives no definition of "amplified", "deleted" or "unaltered" for the cell lines (no threshold). The cell-line result is cited to a supplementary figure that is not in your PDF.`,
    ],
    prereqs: ['C2', 'C6', 'B3'],
    sources: ['res-integration-p4'],
    checks: [
      { q: `Why does the analysis intersect the pgRNA positions with the copy-number data using the same genome version (hg19) for both?`,
        options: [
          { t: `Positions only line up if both lists use the same genome version; otherwise the same coordinate points to different DNA`, ok: true, why: `Right. A genome version is a coordinate system, and two lists must share it to be overlapped.` },
          { t: `Because pgRNAs can only cut in the hg19 version of the genome`, ok: false, why: `A genome version is only a coordinate system. It does not change where a guide can cut. It just has to match the other list.` },
          { t: `Because the intersection converts copy number into RNA expression`, ok: false, why: `Copy number is a property of DNA. The intersection only looks up the copy-number value at each pgRNA's position.` },
        ],
        source: ['m-cnv-p1'] },
    ],
  },

  'm-cnv-p2': {
    plain: `<p>Copy number data for the TCGA lung adenocarcinoma samples (TCGA-LUAD) were downloaded as "log2 ratio segment means" (an average log2 ratio for each segment, or stretch, of DNA) using the R package TCGAbiolinks. They were converted to hg19 coordinates with liftOver (a tool that translates positions from one genome version to another). The values of each candidate were averaged across all TCGA-LUAD samples.</p>`,
    why: `<p>In general, a log2 ratio of about zero means "same as normal", positive values mean extra copies (a gain) and negative values mean lost copies. That is why the values can be averaged across patients to give one number per candidate lncRNA locus: a positive average means that the locus is, on average, gained in lung adenocarcinoma. liftOver is needed when data come in a different genome version from the one used for the pgRNA positions (the paragraph says the data were converted to hg19). The paper reports that screen hits tend to be amplified, but not depleted, in tumor DNA (see the Results on screen integration).</p>`,
    flags: [
      `Averaging across all samples gives one number per candidate but hides how many individual tumors carry a gain or a loss. The paragraph gives no threshold for calling a gain or a loss.`,
      `The paragraph says "all TCGA-LUAD samples" without giving their number. It is not stated whether this is the same set as the 101 KRAS+ samples used for expression.`,
    ],
    prereqs: ['C2', 'E1', 'B3'],
    sources: ['m-public-rnaseq-p1'],
    checks: [
      { q: `A candidate locus has a clearly positive average "log2 ratio segment mean" across the TCGA-LUAD samples. What does this suggest?`,
        options: [
          { t: `On average, the locus is present in extra copies (gained) in these tumors`, ok: true, why: `Right. A log2 ratio near zero means a normal copy number, so positive values mean gains.` },
          { t: `The lncRNA is more highly expressed in tumors than in normal tissue`, ok: false, why: `Copy number is a property of DNA, and expression is an RNA measurement. They often go together but are not the same thing.` },
          { t: `The locus is usually deleted in these tumors`, ok: false, why: `A deletion would give negative values. Positive log2 ratios mean more copies than normal.` },
        ],
        source: ['m-cnv-p2'] },
    ],
  },

  'm-cnv-p3': {
    plain: `<p>The authors downloaded pan-cancer genomic regions that are recurrently amplified or deleted from the ICGC Data Portal (a file from the GISTIC analysis; the file name is printed in the PAPER box). Then they searched for overlaps between each candidate and these recurrent copy-number-altered regions (the "Wide Peak Limits").</p>` +
      `<p>They tested the differences in the proportions of amplified, deleted, or non-copy-number-altered hits versus non-hits using Fisher's exact tests.</p>`,
    why: `<p>In general, the question here is: do the screen hits fall into recurrently amplified or deleted regions more or less often than the non-hits (the other lncRNAs in the library)? A Fisher's exact test compares two proportions using a table of counts with two rows (hit, non-hit) and two columns (in an altered region or not), and it works even when the counts are small. The non-hits are the control: without them, "a quarter of the hits are amplified" says little, because many genes lie in amplified regions anyway. The paper reports that screen hits tend to be amplified but not depleted, and the Figure 4H legend says the test was Fisher's exact test (one-sided).</p>`,
    memory: `Two jars of marbles, "hits" and "non-hits": the question is whether red marbles (amplified regions) make up a different share of one jar than of the other.`,
    flags: [
      `The paragraph does not say whether the Fisher tests were one- or two-sided. The Figure 4H legend says one-sided, which means that only one direction was tested.`,
      `The plural "Fisher's exact tests" suggests separate tests for amplified, deleted and non-altered hits, but the paragraph does not say whether the p-values were corrected for multiple testing, or which hits (for example, the pan-hallmark hits) were compared.`,
    ],
    prereqs: ['E3', 'C2'],
    sources: ['res-integration-p4', 'fig4H'],
    checks: [
      { q: `Which test fits comparing the proportion of amplified regions among hits with the proportion among non-hits?`,
        options: [
          { t: `Fisher's exact test, because it compares proportions between two groups using counts`, ok: true, why: `Right. The paragraph says the proportions of amplified, deleted or unaltered hits versus non-hits were tested with Fisher's exact tests.` },
          { t: `Pearson correlation, because it compares two groups`, ok: false, why: `Pearson correlation measures how two numeric measurements vary together. It is not a test of proportions in two groups.` },
          { t: `Welch's t test, because it compares two groups`, ok: false, why: `A t test compares the means of a continuous measurement. Here the data are counts in categories (amplified or not).` },
          { t: `Kruskal–Wallis test, because it compares groups`, ok: false, why: `Kruskal–Wallis compares ranks of continuous values across groups. It is not a test for proportions in a table of counts.` },
        ],
        source: ['m-cnv-p3'] },
    ],
  },

  'm-quant-p1': {
    plain: `<p>The statistical analysis, quantification and visualization were done with GraphPad Prism (a statistics and graphing program) and with R (a statistical programming language; versions 3.5.3, 4.0.0 and 4.1.2).</p>` +
      `<p>The R packages used were: ggplot2, ggpubr, ggtern, ggrepel, ggbeeswarm, GGally, Gmedian, GSEABase, clusterProfiler, harmonicmeanp, metap, Hmisc, TCGAbiolinks, liftOver, precrec, MASS, car, eulerr, SuperExactTest, UpSetR, metaRNASeq and enrichR. Version numbers are printed in the PAPER box (two versions of ggplot2 are listed, 3.3.2 and 3.3.5; TCGAbiolinks and liftOver have none).</p>`,
    why: `<p>In general, a software list lets other people repeat the analysis, and version numbers matter because different versions can give slightly different numbers. Different parts of the work used different R versions (for example, R 4.0.0 for the RNA-seq plots and R 4.1.2 for the screen analysis, see those paragraphs). What the packages are for, in general:</p>` +
      `<ul>` +
      `<li><b>Plots:</b> ggplot2 draws the plots; ggpubr, ggrepel (non-overlapping labels), ggbeeswarm (dot plots) and GGally add extras; ggtern draws three-corner (ternary) plots such as Figure 4C; UpSetR and eulerr draw overlaps between sets.</li>` +
      `<li><b>Pathways and gene sets:</b> GSEABase, clusterProfiler and enrichR (enrichment analysis).</li>` +
      `<li><b>Combining and testing p-values:</b> harmonicmeanp (the harmonic mean p-value), metap and metaRNASeq (combining significance values), SuperExactTest (tests of overlaps between sets).</li>` +
      `<li><b>Curves and summaries:</b> precrec draws ROC curves; Gmedian computes the geometric median (mentioned in the Figure 4E legend); Hmisc, MASS and car are general statistics toolboxes.</li>` +
      `<li><b>Data handling:</b> TCGAbiolinks downloads TCGA data; liftOver converts coordinates between genome versions.</li>` +
      `</ul>` +
      `<p>This paragraph lists software only. It does not say which test was used for which figure.</p>`,
    memory: `A workshop with labeled drawers: one for plotting tools, one for pathway tools, one for p-value tools, one for coordinates. The paragraph is just the inventory list.`,
    flags: [
      `Version numbers are missing for GraphPad Prism, TCGAbiolinks and liftOver. The paragraph does not say which analyses were done in Prism and which in R.`,
      `Two versions of ggplot2 and three versions of R are listed, so different figures may come from different versions. A very similar package list (with R 4.1.2) is printed again in the hit-identification section.`,
      `The list contains no tests or thresholds. Those are in the next paragraph and in the figure legends.`,
    ],
    prereqs: ['E1', 'E5'],
    sources: ['m-hits-p4', 'fig4C', 'fig4E'],
    checks: [
      { q: `The software list includes "harmonicmeanp". Which analysis in the paper does this package point to?`,
        options: [
          { t: `The harmonic mean p-value (HMP) that combined the two significance scores (from RRA and EBM) in the target prioritization pipeline`, ok: true, why: `Right, judging by the package name and purpose. The hit-identification paragraph says the HMP was calculated from the RRA and EBM scores. The paper does not link each package to each step line by line.` },
          { t: `The Benjamini–Hochberg correction used to set the FDR cut-off`, ok: false, why: `Benjamini–Hochberg is applied after the HMP is calculated, to correct the p-values for multiple testing. The harmonic mean p-value package is for the HMP itself.` },
          { t: `The empirical Brown's method (EBM) that combined the effect sizes across screens`, ok: false, why: `EBM combined significance values (p-values). Effect sizes were ranked with Robust Rank Aggregation (RRA), and the HMP then merged the two significance scores.` },
          { t: `The Fisher's exact tests on copy-number overlaps`, ok: false, why: `Those compare proportions of hits and non-hits in amplified or deleted regions (copy-number section). They do not involve the HMP.` },
        ],
        source: ['m-quant-p1', 'm-hits-p4'] },
    ],
  },

  'm-quant-p2': {
    plain: `<p>Further software used for quantification and statistical analysis was: StringTie (1.3), RSEM (1.3), CRISPETa, CASPR, GuideScan, MageckFlute, Kallisto (0.46.0), Sleuth (0.30), bedtools, and Excel (Microsoft).</p>`,
    why: `<p>In general, listing tools and versions lets others repeat the analysis. Most of these tools are explained where they were used in the paper:</p>` +
      `<ul>` +
      `<li>StringTie assembled a novel A549 transcriptome, and RSEM estimated expression for the library design.</li>` +
      `<li>CRISPETa designed the pgRNAs.</li>` +
      `<li>CASPR processed the screen reads and calculated log2 fold changes and FDR-corrected p-values; GuideScan removed low-scoring guides; MageckFlute corrected the batch effect.</li>` +
      `<li>Kallisto and Sleuth quantified the RNA-seq data and tested for differential expression.</li>` +
      `<li>bedtools (BEDTools) merged the exons of each lncRNA locus.</li>` +
      `<li>Excel is listed without saying what was calculated in it.</li>` +
      `</ul>`,
    flags: [
      `StringTie and RSEM carry the same printed reference mark (see the PAPER box). That mark leads to the RSEM paper, and StringTie has no entry of its own in the reference list.`,
      `The reference marks for Kallisto and Sleuth here differ from the ones printed next to them in the RNA-seq paragraph. The marks here lead to the Kallisto and Sleuth papers.`,
    ],
    prereqs: ['D4', 'D10'],
    sources: ['m-library-design-p1', 'm-library-design-p2', 'm-library-design-p4', 'm-hits-p1', 'm-rnaseq-p2', 'm-eztracks-p2'],
    checks: [
      { q: `In the screen analysis, which tool from this list removed low-scoring guides before the final log2 fold changes were calculated?`,
        options: [
          { t: `GuideScan`, ok: true, why: `Right. The hit-identification paragraph says "Low scoring guides were removed by GuideScan".` },
          { t: `MageckFlute`, ok: false, why: `MageckFlute was used for the batch effect correction, a different step.` },
          { t: `CRISPETa`, ok: false, why: `CRISPETa designed the pgRNAs for the library. It was not used on the screen read counts.` },
          { t: `Sleuth`, ok: false, why: `Sleuth tests for differential expression in the RNA-seq data, which is a separate analysis.` },
        ],
        source: ['m-quant-p2', 'm-hits-p1'] },
    ],
  },

  'm-quant-p3': {
    plain: `<p>For all analyses, a result with p ≤ 0.05 (p smaller than or equal to 0.05) is called statistically significant, unless a different cut-off is specified.</p>` +
      `<p>The specific details about the statistical tests used for individual experiments are given in the relevant figure legends. For the detailed statistics of the computational analyses, the reader is sent to the "Method Details" section.</p>`,
    why: `<p>In general, a p-value is the chance of seeing a difference at least this large if there were really no effect, and p ≤ 0.05 is the common convention for calling a result "significant". Here it is only the default: the paper often specifies another cut-off. The screens and the RNA-seq analysis use FDR &lt; 0.2 or q &lt; 0.2, because when thousands of genes are tested at once the cut-off is applied to p-values corrected for multiple testing, and a lenient 0.2 accepts about one in five false hits among the candidates (20%, computed from 0.2) in return for missing fewer real ones. Because the tests differ from figure to figure, the paragraph sends you to the legends for the test, n and error bars. The flags below list what the legends print.</p>`,
    memory: `A default setting on a camera: it works for most shots, but the screens and the RNA-seq analysis switch to another mode (0.2) on purpose.`,
    flags: [
      `The cut-off is written p ≤ 0.05 here but p &lt; 0.05 in the 2D viability paragraph. The two only differ for a p-value of exactly 0.05.`,
      `"Unless otherwise specified" matters: the screen hits use FDR &lt; 0.2, and the RNA-seq analysis uses a q-value below 0.2. These are not p ≤ 0.05 rules.`,
      `Tests named in the legends: Student's t test (one-tailed in Figures 3D, 3F, 5E, 5F and 6L; two-tailed in Figures 4G, 5C and 6K; the Figure 3C and 5B legends say only "Student's t test"), a one-tailed Welch's t test (Figure 4F), a one-tailed Mann-Whitney test (Figure 5G), Wilcoxon and Kruskal-Wallis tests (Figure 2F), Fisher's exact test, one-sided (Figure 4H), and Pearson correlation (Figures 2D, 2E, 2H, 6E and 6I).`,
      `What n counts differs. Most ASO panels say "biological replicates" (n = 4 in Figures 5C, 5E, 5G and 6L; n = 2 in Figure 6K). Figure 3F says "three independent biological replicates". Figures 3C and 3D give n = 3 and n = 4 without saying which kind. Figure 4F counts patients (n = 101). Figure 5F has n = 4 biological and n > 3 technical replicates, and its error bars "represent the variability of technical replicates". Where error bars are described they are SD. Several legends (for example Figures 3E, 6C and 6G) give no n, no error bars and no test.`,
      `One-tailed tests (used in many ASO panels) look for a change in one chosen direction only, which makes p ≤ 0.05 easier to reach than with a two-tailed test. The legends do not say that the direction was fixed in advance, or whether p-values were corrected when several ASOs were compared with the same control.`,
    ],
    prereqs: ['E2', 'E4', 'F4'],
    sources: ['m-viability-2d-p1', 'm-hits-p3', 'm-rnaseq-p2', 'fig2F', 'fig3C', 'fig3D', 'fig3F', 'fig4F', 'fig4G', 'fig4H', 'fig5B', 'fig5C', 'fig5E', 'fig5F', 'fig5G', 'fig6K', 'fig6L'],
    derived: ['20'],
    checks: [
      { q: `The paragraph says p ≤ 0.05 counts as significant "unless otherwise specified". Which statement is correct for this paper?`,
        options: [
          { t: `It is the default cut-off; some analyses state another one, for example FDR &lt; 0.2 for screen hits and q &lt; 0.2 for the RNA-seq genes`, ok: true, why: `Right. The screen hits and the RNA-seq analysis are the "otherwise specified" cases.` },
          { t: `It applies to every analysis, including how the screen hits were selected`, ok: false, why: `The screen hits were selected with FDR &lt; 0.2, not with p ≤ 0.05.` },
          { t: `It means that 95 out of 100 reported effects are real`, ok: false, why: `A p-value is not the probability that an effect is real. It is the chance of a difference at least this large if there were no effect.` },
          { t: `It means that every significant effect is large and biologically important`, ok: false, why: `Significance says an effect is unlikely to be chance. It does not say how big or important the effect is (that is the effect size).` },
        ],
        source: ['m-quant-p3', 'm-hits-p3', 'm-rnaseq-p2'] },
    ],
  },

});

/* ===== unit intros and recaps ===== */
Object.assign(window.TRACKG.units, {

  'm-public-rnaseq': {
    intro: `<p>This short section says which public patient RNA-seq data sets the authors used to ask whether their lncRNA candidates are also active in real lung tumors. It names the two collections (TCGA and TANRIC) and how many samples each one has.</p>`,
    recap: `<p>Two patient data sets were used: 101 KRAS+ untreated lung adenocarcinoma samples from TCGA (expression estimated with HTSeq), and an independent cohort from TANRIC with 87 tumor and 77 adjacent normal tissue samples. They are the patient evidence behind Figures 4F, 4G and 5H.</p>`,
  },

  'm-pcr-gdna': {
    intro: `<p>Before you trust a CRISPR deletion screen, you want proof that the deletion really happens in the DNA. This one-paragraph section describes the PCR-and-gel test used for that proof.</p>`,
    recap: `<p>Genomic DNA from Cas9-expressing A549 cells that received the guide pairs was copied by PCR with primers placed on both sides of the target region, and the product was run on a 1% agarose gel. The size of the band shows whether the region was deleted (Figure 1E).</p>`,
  },

  'm-competition': {
    intro: `<p>A competition assay tests whether switching off a gene puts cells at a growth disadvantage when they share a dish with control cells. This section explains how the two groups were labeled with fluorescent proteins and mixed.</p>`,
    recap: `<p>Control cells (AAVS1 pgRNAs, GFP) and test cells (candidate pgRNAs, mCherry) were selected with puromycin for seven days, mixed 1:1 and followed by flow cytometry. A shrinking mCherry share over time means that the deletion hurts growth, as seen for the validated candidates and for the essential-gene control RPS5 (Figure 3C).</p>`,
  },

  'm-pdx': {
    intro: `<p>One of the models in the paper is a patient-derived organoid called BE874. These two paragraphs describe where it came from (a patient's lung tumor grown first in immunodeficient mice) and how the mice were housed and approved.</p>`,
    recap: `<p>BE874 organoids were made from a surgically removed KRAS+ lung tumor that was first grown under the skin of NSG mice, and the KRAS G12C change was confirmed in both the organoids and the original cancer. The patient and mouse work had ethics approval.</p>`,
  },

  'm-aso': {
    intro: `<p>ASOs are the tool the paper uses to switch off a lncRNA's RNA product directly. This section says how the ASOs were designed, which doses were used for which cell lines, and how cocktails and cell uptake were handled.</p>`,
    recap: `<p>Three to five LNA ASOs were designed per target and delivered with a transfection reagent at 25 nM (10 nM for two normal lung cell lines). Cocktails kept the same total dose, the medium was refreshed after 24 h, and a fluorescent control ASO was used to check that ASOs get into cells.</p>`,
  },

  'm-viability-2d': {
    intro: `<p>This is the main growth test for ASO-treated cells grown flat in dishes. CellTiter-Glo measures how many cells are alive, so a slower-growing population shows up as less light.</p>`,
    recap: `<p>Eleven cell lines were seeded in triplicate in 96-well plates 24 h after transfection, and viable cells were read by luminescence at time points between 24 h and 144 h. Significance was judged with the Student's t test at p &lt; 0.05.</p>`,
  },

  'm-viability-3d': {
    intro: `<p>Cells in a dish are flat, but tumors are three-dimensional. These three paragraphs describe the 3D versions of the viability test: spheroids of H441 cells and organoids from a patient-derived xenograft (BE874).</p>`,
    recap: `<p>In both 3D models the ASOs were delivered first, the cells were then embedded in Matrigel domes (20,000 cells per dome), and CellTiter-Glo 3D was read at a starting time point (T0) and again after one week. The organoids needed their own special medium and extra feeding steps to keep the wells from drying out.</p>`,
  },

  'm-rescue': {
    intro: `<p>A rescue experiment asks whether putting a lncRNA back can undo the effect of knocking it down. This paragraph describes how CHiLL1 and GCAWKR were overexpressed in A549 cells.</p>`,
    recap: `<p>The full-length sequences of CHiLL1 and GCAWKR were cloned into the pcDNA3.1 plasmid, with the empty plasmid as the control, and transfected into A549 cells. The cells were selected with puromycin for 96 h and the transfection was confirmed by RT-qPCR. The Results report that neither lncRNA rescued the ASO phenotypes.</p>`,
  },

  'm-apoptosis': {
    intro: `<p>Apoptosis is a tidy form of cell suicide. This paragraph describes the two-stain flow-cytometry test used to ask whether knocking down CHiLL1 or GCAWKR pushes cells into early apoptosis.</p>`,
    recap: `<p>Cells were stained with Annexin V (early apoptotic cells) and a viability dye (dead cells) 24 h after transfection and measured by flow cytometry, with unstained cells as a control. In the Results, CHiLL1 knockdown, but not GCAWKR knockdown, raised the share of early apoptotic cells.</p>`,
  },

  'm-cellcycle': {
    intro: `<p>This paragraph describes the flow-cytometry test that sorts cells into cell-cycle phases by their DNA content (DAPI), with a second stain (Ki-67) for whether they are cycling at all.</p>`,
    recap: `<p>Cells were fixed 24 h after ASO transfection, stained with a Ki-67 antibody and DAPI, measured by flow cytometry and analyzed with FlowJo and the Dean-Jett Fox model. In the Results, GCAWKR knockdown, but not CHiLL1 knockdown, led to more cells in the G2 phase.</p>`,
  },

  'm-migration-assay': {
    intro: `<p>The migration screen was pooled. This section describes the small, one-ASO-at-a-time version used to check individual lncRNAs: cells crawl through a porous membrane toward serum, and the stain left on the underside is measured.</p>`,
    recap: `<p>A549 cells were seeded 24 h after ASO transfection in serum-free medium above a porous membrane, with 10% FBS below as the lure. After 24 h the cells that had crossed were stained with crystal violet, the cells on top were wiped off, and the dissolved stain was read at 595 nm.</p>`,
  },

  'm-qpcr': {
    intro: `<p>qRT-PCR is the paper's standard way to measure how much of a particular RNA is in cells, for example to confirm that an ASO lowered its target. This paragraph lists the steps and names the normalizing gene.</p>`,
    recap: `<p>RNA was purified, converted to cDNA by reverse transcription and measured by qPCR, with HPRT1 as the internal control for normalization. The primer sequences are in Data S4 (not in your PDF).</p>`,
  },

  'm-rnaseq': {
    intro: `<p>RNA-seq reads out the whole transcriptome, so it shows which genes change when CHiLL1 or GCAWKR is knocked down. These three paragraphs cover making and sequencing the libraries, the Kallisto and Sleuth analysis with its q-value cut-off, and the plotting and enrichment tools.</p>`,
    recap: `<p>RNA from ASO-treated A549 and H460 cells was sequenced to a depth of 30M reads per sample, quantified with Kallisto and tested with Sleuth, calling genes significant at q &lt; 0.2. For CHiLL1 the genes changed by both ASOs were kept, for GCAWKR the genes changed in both cell lines, and pathways were then found with enrichR.</p>`,
  },

  'm-fish': {
    intro: `<p>Where an RNA sits in the cell is a clue to what it does. These two paragraphs describe the two ways the paper looked at this: RNA-FISH under the microscope (single cells), and nuclear/cytoplasmic fractionation (cells split into parts).</p>`,
    recap: `<p>CHiLL1 and GCAWKR were detected in A549 cells with pools of 25 and 48 fluorescent probes, a DAPI counterstain and a DeltaVision microscope. The nuclear/cytoplasmic split was also measured by fractionation, and the data were analyzed with a CellProfiler-based pipeline named SpeckleCounting.</p>`,
  },

  'm-eztracks': {
    intro: `<p>Figure 6A shows which functional-looking features sit under the exons of GCAWKR. These paragraphs say where the feature tracks came from and how the lncRNA gene models were prepared for drawing with the ezTracks program.</p>`,
    recap: `<p>Feature tracks (RIDLs, conserved RNA structures, ENCODE regulatory elements, CpG islands, phastCons conservation and RepeatMasker repeats) were collected for hg38. The exons of each lncRNA locus were merged into one meta-transcript with BEDTools and drawn next to those tracks.</p>`,
  },

  'm-cnv': {
    intro: `<p>Cancer genomes often gain or lose pieces of DNA. These three paragraphs describe how the authors checked whether their screen hits sit in regions that are amplified or deleted: in cell lines (CCLE), in lung tumors (TCGA-LUAD) and across many cancer types (PCAWG data from the ICGC portal).</p>`,
    recap: `<p>Copy-number data from three sources were compared with the candidates: CCLE for A549 and H460 and TCGA-LUAD segment means averaged across samples (both matched to the candidates' positions in hg19 coordinates), and pan-cancer recurrent regions. Fisher's exact tests compared the proportions of amplified, deleted or unaltered hits with those of non-hits.</p>`,
  },

  'm-quant': {
    intro: `<p>This last Methods section lists the software behind the numbers and gives the paper's general rule for statistical significance. It is the place to check which cut-off the paper uses by default, and where to look for the test used in a particular figure.</p>`,
    recap: `<p>The analyses used GraphPad Prism, R (three versions) with many R packages, and further tools such as StringTie, RSEM, CRISPETa, CASPR, GuideScan, MageckFlute, Kallisto, Sleuth and bedtools. The default significance cut-off is p ≤ 0.05 unless otherwise specified (the screens and the RNA-seq analysis use FDR or q &lt; 0.2), and the test, n and error bars for each experiment are in its figure legend.</p>`,
  },

});
