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
      `<p>After infection, the cells were selected with puromycin (2 µg/mL) for seven days. Then GFP cells and mCherry cells were mixed 1:1 in a six-well plate (150,000 cells). The cells were counted and analyzed on a flow cytometer (an LSR II SORP instrument; vendor details omitted — see the PAPER box) and with the FlowJo software.</p>`,
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
      `<p>Small pieces (about 1–2 cm3) of lung cancer tissue, provided by the Institute of Pathology at the University of Bern, were taken from a surgically removed lung cancer specimen, with the patients' informed consent. Parts of the sample (pieces of around 5 mm) were set aside and implanted under the skin of the flank of 6-week-old NSG mice (supplier details omitted — see the PAPER box) so that the cancer could engraft (take hold and grow). Once the engraftment had worked, the tumor-bearing mice were euthanized and the tumors were removed. The tumor tissue was broken up mechanically and with enzymes to get single cells, which were used to generate the BE874 organoids.</p>` +
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
