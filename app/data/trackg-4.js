window.TRACKG = window.TRACKG || { paras: {}, units: {} };

/* Track G study layer: STAR Methods part 1 (m-lead-contact ... m-hits). */
Object.assign(window.TRACKG.paras, {

  /* ------------------------------------------------------------------ Lead contact */
  'm-lead-contact-p1': {
    plain: `<p>If you want more information, or you want to ask for resources and reagents (the materials used in the study), you should contact one named person, the <b>lead contact</b>: Dr. Rory Johnson (rory.johnson@ucd.ie). The paragraph says the lead contact will fulfill such requests.</p>`,
    why: `In general, journals that use the STAR Methods format ask for one named lead contact, so that readers know exactly whom to ask about the methods, or for materials, after publication. Without a named person, questions and requests can go unanswered and the work is harder to check and repeat. This sentence is administrative; it contains no science.`,
    memory: `The single help desk of a big shop: you do not have to guess whom to ask.`,
    flags: [],
    prereqs: [],
    checks: [
      { q: `What is the job of the "lead contact" named in this paragraph?`,
        options: [
          { t: `To be the one person who answers questions about the study and fulfills requests for resources and reagents`, ok: true, why: `Right: the paragraph says further information and requests "should be directed to and will be fulfilled by" the lead contact.` },
          { t: `To credit the person who did most of the experiments`, ok: false, why: `Who did what is described in the author contributions, not here. The lead contact is a point of contact, not a credit.` },
          { t: `To say where the sequencing data and code are stored`, ok: false, why: `That is the job of the data and code availability statements, which come in a later section.` },
        ],
        source: ['m-lead-contact-p1'] },
    ],
  },

  /* ------------------------------------------------------------------ Materials availability */
  'm-materials-p1': {
    plain: `<p>Plasmids (small circular DNA molecules that carry genes or guides) and cell lines that were generated in this study are available from the corresponding author, "R.J.", if you ask. The paragraph then says that the study "did not generate new unique reagents" (reagents are the materials and tools used in experiments).</p>`,
    why: `In general, a materials-availability statement tells other labs how to get the tools used in a study, so that they can repeat or extend the experiments. "Upon request" means that you have to write to the author: no public plasmid repository is named in this paragraph.`,
    flags: [
      `The first sentence offers plasmids and cell lines "generated in this study", while the second says the study "did not generate new unique reagents". The paragraph does not say how both can be true or what "unique" means. One possible reading (a guess, not stated in the paper) is that the plasmids and cell lines were built from standard, existing parts.`,
      `"R.J." is given by initials only. The initials match the lead contact, Dr. Rory Johnson, named in the previous section, and the title page gives the same e-mail address for correspondence.`,
    ],
    prereqs: ['C4', 'D2'],
    checks: [
      { q: `What does "available from the corresponding author upon request" mean for the plasmids and cell lines made in this study?`,
        options: [
          { t: `You have to contact the corresponding author to get them`, ok: true, why: `Right: access is by asking the author (R.J.); the paragraph names no public store for them.` },
          { t: `They can be downloaded freely from a public website`, ok: false, why: `Data such as sequencing files can be deposited in a public archive (the next paragraphs do this), but physical plasmids and cell lines cannot be downloaded. Here you must ask.` },
          { t: `They are sold by a commercial supplier`, ok: false, why: `The paragraph names no supplier for the authors' own materials; it points to the corresponding author.` },
        ],
        source: ['m-materials-p1'] },
    ],
  },

  /* ------------------------------------------------------------------ Data and code availability */
  'm-data-p1': {
    plain: `<p>The data discussed in the paper were deposited in NCBI's <b>Gene Expression Omnibus (GEO)</b>, a public online archive for genomics data. They are publicly available from the date of publication, under the accession number GSE207229 (an accession number is the ID you search for to find a data set). The paragraph adds that accession numbers are listed in the key resources table.</p>`,
    why: `In general, depositing data in a public archive lets other scientists download and re-analyze them, which is how a paper's results can be checked and reused. An accession number is a permanent, searchable address for the data, so journals ask for it.`,
    flags: [
      `The key resources table lists two GEO numbers, "GEO: GSE207228" (pooled CRISPR screens in A549 and NCI-H460) and "GEO: GSE207227" (RNA-seq of A549 and NCI-H460 upon ASO treatment), not the GSE207229 printed here. The paragraph does not say which data sets are in GSE207229 or how the three numbers relate.`,
    ],
    sources: ['krt-28', 'krt-29'],
    prereqs: ['C6'],
    checks: [
      { q: `Why do journals ask authors to deposit their data in a public archive such as GEO and to give an accession number?`,
        options: [
          { t: `So that other scientists can find, download and re-analyze the data to check or extend the results`, ok: true, why: `Right: the paragraph says the data are "publicly available as of the date of publication", and the accession number is how you find them.` },
          { t: `To keep the data private to the authors' lab`, ok: false, why: `The paragraph says the opposite: the data are publicly available.` },
          { t: `To store the computer code of the analysis`, ok: false, why: `In this paper the code is deposited elsewhere, at Zenodo (next paragraph). GEO holds the data.` },
        ],
        source: ['m-data-p1'] },
    ],
  },

  'm-data-p2': {
    plain: `<p>The computer code for the <b>target prioritization pipeline (TPP)</b>, the method used to combine several screens, was deposited at Zenodo (a public archive that also accepts code) under the number 6912511. It is publicly available from the date of publication.</p>`,
    why: `In general, code matters as much as data: with both, other scientists can re-run the exact ranking method on the same counts and check how the hit list was obtained. The code here is the TPP, the paper's own method for combining screens (see the hit-identification section of the Methods).`,
    flags: [
      `The Zenodo number printed here is 6912511. The hit-identification paragraph (m-hits-p4) and the key resources table both print the code address as "zenodo.6912510" (the last digit is zero, not one). The paper does not say which is right.`,
    ],
    sources: ['m-hits-p4', 'krt-45'],
    prereqs: ['C6', 'E5'],
    checks: [
      { q: `Why would the authors deposit the TPP code in a public archive in addition to depositing the data?`,
        options: [
          { t: `So that other scientists can re-run the exact ranking method on the data and check how the hits were obtained`, ok: true, why: `Right: data and code together let others reproduce the analysis.` },
          { t: `Because the code alone is enough to reproduce the study`, ok: false, why: `Code works on data; without the data (deposited in GEO) it cannot recreate the results. The two complement each other.` },
          { t: `Because Zenodo reviews the code to certify that it is correct`, ok: false, why: `Zenodo is a storage archive that gives deposits a permanent number; it does not certify the code.` },
        ],
        source: ['m-data-p2'] },
    ],
  },

  'm-data-p3': {
    plain: `<p>Anything else that you would need in order to re-analyze the data reported in the paper can be obtained from the lead contact if you ask.</p>`,
    why: `In general, this is a catch-all sentence. The first two statements point to the public deposits (data in GEO, code in Zenodo); this one covers whatever else a reader might need to repeat the analysis but cannot find in those deposits.`,
    flags: [`The paragraph does not say what the "additional information" is.`],
    prereqs: ['C6'],
    checks: [
      { q: `What is the purpose of this sentence, given the two paragraphs before it?`,
        options: [
          { t: `It is a fallback: whatever else is needed to re-analyze the data, and is not in the public deposits, can be requested from the lead contact`, ok: true, why: `Right: it adds a route for extra information on top of GEO (data) and Zenodo (code).` },
          { t: `It says that the raw data themselves are available only on request`, ok: false, why: `The first paragraph says the data are publicly available in GEO; this sentence is about additional information.` },
          { t: `It replaces the GEO and Zenodo deposits`, ok: false, why: `It adds to them. The public deposits remain the main route.` },
        ],
        source: ['m-data-p3'] },
    ],
  },

  /* ------------------------------------------------------------------ Experimental model and subject details */
  'm-expmodel-p1': {
    plain: `<p>The paragraph lists the human cell lines used and, in brackets, the sex of the person each one came from. HEK293T (female), A549 (male), NCI-H460 (male), H441 (male) and CCD-16Lu (female) were a gift from the groups of Adrian Ochsenbein and Renwang Peng at the University Hospital of Bern, Switzerland. MRC-5 (male) cells were provided by the group of "Ronald Dijkmanthe" (as printed) at the Institute of Virology and Immunology, University of Bern. HBEC3-KT (female) cells, which are human bronchial (airway) epithelial cells, were bought from ATCC (the American Type Culture Collection).</p><p>All the cell lines were authenticated by STR profiling (a DNA fingerprint test) and tested negative for mycoplasma contamination.</p>`,
    why: `In general, journals ask where cell lines came from and how they were checked, because cell lines are easily mixed up or contaminated and a result is only as reliable as the cells it was measured in. STR profiling confirms that each line really is the line it is labeled as, and a negative mycoplasma test shows that the cultures were free of this common bacterial contaminant. The sex of the person each line came from is listed because journals ask for it. In this paper, A549 and NCI-H460 are the two lung cancer lines used in the screens, HEK293T cells are used to make virus (see the lentivirus section), and HBEC3-KT, MRC-5 and CCD-16Lu serve as normal lung cells for comparison (see the Results on ASOs).`,
    flags: [
      `Typos as printed: "Switerland" (for Switzerland) and "Ronald Dijkmanthe" (a stray "the" seems to be attached to the name).`,
      `Cell line names differ between sections. This paragraph lists "MRC-5" and "CCD-16Lu"; the Results (res-aso-p3) call the normal lung cells "MRC5-CV1" and "CCD-12Lu", and the 2D viability methods (m-viability-2d-p1) say "Mrc5-SV1" and "CCD-16LU". The paper does not explain the differences.`,
    ],
    prereqs: ['C4'],
    checks: [
      { q: `Why do the authors report STR profiling and a negative mycoplasma test for all the cell lines?`,
        options: [
          { t: `To show that each line really is the line it is labeled as and is free of a common contaminant, so the results can be trusted`, ok: true, why: `Right: STR profiling is a DNA fingerprint that identifies a human cell line, and mycoplasma is a common bacterial contaminant of cultures. Mix-ups and contamination can make results unreliable.` },
          { t: `To measure how fast each line grows`, ok: false, why: `Growth speed is measured by counting cells over time (the doubling time). STR profiling and mycoplasma tests are identity and contamination checks.` },
          { t: `To confirm that each line carries the KRAS mutation`, ok: false, why: `STR profiling compares a line's DNA fingerprint with a reference; it does not test for particular cancer mutations.` },
        ],
        source: ['m-expmodel-p1'] },
    ],
  },

  'm-expmodel-p2': {
    plain: `<p>Each cell line was grown in its own culture medium (the liquid "food" the cells sit in). A549 and HEK293T cells were kept in DMEM, MRC-5 in EMEM, and NCI-H460, H441 and CCD-16Lu in RPMI-1640. All of these media were supplemented with 10% fetal bovine serum (FBS), 1% L-glutamine and 1% penicillin-streptomycin. HBEC3-KT cells were kept in a special airway-cell medium (Airway Epithelial Cell Basal Medium) supplemented with a Bronchial Epithelial Cell Growth Kit (catalog details omitted — see the PAPER box).</p>`,
    why: `In general, different cell lines have different needs, so each is grown in the medium that suits it, and the same recipe is used every time so that growth conditions stay steady and experiments can be compared and repeated. FBS supplies growth factors, L-glutamine is a nutrient (an amino acid), and penicillin-streptomycin is an antibiotic mix that helps keep bacteria out of the dishes.`,
    flags: [],
    prereqs: ['C4'],
    checks: [
      { q: `Why do papers list the exact medium and supplements for every cell line?`,
        options: [
          { t: `Cells behave differently under different growth conditions, so others must be able to copy the conditions to repeat the work`, ok: true, why: `Right: the paragraph shows that the lines are grown in different media (DMEM, EMEM, RPMI-1640 or an airway-cell medium) with a defined set of supplements.` },
          { t: `Because the medium is what makes the cells cancerous`, ok: false, why: `Cancer cell lines are cancerous because of their own genetic changes; the medium only feeds them.` },
          { t: `Because all the lines must share one medium for the experiment to be valid`, ok: false, why: `The paragraph shows the opposite: the lines are grown in different media.` },
        ],
        source: ['m-expmodel-p2'] },
    ],
  },

  'm-expmodel-p3': {
    plain: `<p>All cells were "passed" (a part of the cells was moved to a fresh dish with fresh medium) every 2–3 days, and were kept at 37 °C in a humid atmosphere with 5% CO2.</p>`,
    why: `In general, passing cells regularly keeps them from running out of food and space, so they stay in steady, healthy growth. 37 °C is human body temperature; the CO2 helps keep the acidity (pH) of the medium steady, and the humidity stops the medium from drying out.`,
    flags: [],
    prereqs: ['B1', 'C4'],
    checks: [
      { q: `Why are the cells kept at 37 °C in a humid atmosphere with 5% CO2?`,
        options: [
          { t: `To copy the conditions of the human body so that human cells grow well: body temperature, a steady acidity of the medium and no drying out`, ok: true, why: `Right in general: 37 °C is body temperature, CO2 helps keep the medium's acidity steady, and humidity prevents evaporation.` },
          { t: `Because CO2 is the food that the cells eat`, ok: false, why: `Cells get their food (sugars, amino acids, serum) from the medium; CO2 helps keep the medium's acidity steady.` },
          { t: `Because 37 °C kills mycoplasma and other contaminants`, ok: false, why: `37 °C is also a good temperature for many microbes. Contamination is prevented with antibiotics and checked by testing (the first paragraph mentions a negative mycoplasma test).` },
        ],
        source: ['m-expmodel-p3'] },
    ],
  },

  'm-expmodel-p4': {
    plain: `<p>The mouse experiments were approved by the local committee for animal experiments of the Canton of Bern and were carried out according to Swiss animal-protection laws (approval number BE76/17). The analysis of samples was approved by the local ethics committee in Bern (number KEK 2018-01801). Written informed consent was collected from all patients involved in the study.</p>`,
    why: `In general, work with animals and with samples from people needs approval from an independent ethics committee, and patients must give informed consent (they are told what will be done with their samples and agree in writing). Journals expect these statements before they publish such work.`,
    flags: [
      `The paragraph does not say which experiments these approvals cover. The same sentences appear in the patient-derived organoid methods (m-pdx-p1 for the samples and consent, m-pdx-p2 for the mouse approval), which is where that work is described.`,
    ],
    prereqs: ['C5'],
    checks: [
      { q: `What does "written informed consent" from the patients mean?`,
        options: [
          { t: `The patients were told what would be done with their samples and agreed to it in writing`, ok: true, why: `Right: informed consent means a person agrees after being told what taking part involves. The paragraph says it was collected from all patients in the study.` },
          { t: `The patients agreed to receive the ASO treatment`, ok: false, why: `The paragraph links the ethics approval to the analysis of samples; it says nothing about treating patients.` },
          { t: `The animal committee gave consent on behalf of the patients`, ok: false, why: `The animal committee approved the mouse experiments. Consent for samples comes from the patients themselves, and the analysis of samples was approved by a separate ethics committee.` },
        ],
        source: ['m-expmodel-p4'] },
    ],
  },
});

Object.assign(window.TRACKG.paras, {

  /* ------------------------------------------------------------------ Lentivirus and stable cell line production */
  'm-lentivirus-p1': {
    plain: `<p>All plasmids used in the paper are listed in Data S3 (not in your PDF).</p><p>To produce lentivirus, HEK293T cells were given three plasmids at the same time (co-transfection, using the transfection reagent Lipofectamine2000): 12.5 µg of the Cas9 plasmid, which also carries blasticidin resistance, 7.5 µg of the psPAX2 plasmid, and 4 µg of the packaging plasmid pVsVg (catalog details omitted — see the PAPER box). One day (24 h) before the transfection, 2.5 × 10<sup>6</sup> HEK293T cells had been seeded in a 10 cm dish coated with Poly-L-Lysine (diluted 1:5 in 1X PBS).</p><p>The liquid above the cells, which contained the virus particles, was collected 24, 48 and 72 h after transfection. The particles were then concentrated 100-fold: 1 volume of cold PEG-it Virus Precipitation Solution was added for every four volumes of liquid. After 12 h at 4 °C, the mixture was spun in a centrifuge (1,500 × g for 30 min at 4 °C), the material was resuspended in 1X PBS, and it was stored at −80 °C until use.</p>`,
    why: `This step builds the virus that will carry Cas9 into the cancer cells (next paragraph). In general, lentivirus is made in "producer" cells: HEK293T cells are given the cargo plasmid (here Cas9) plus plasmids that supply the virus's building parts (here psPAX2 and pVsVg, called packaging plasmids). The result is virus particles that can enter a target cell once but cannot multiply, which is safer to handle. Collecting the liquid at 24, 48 and 72 h gathers more virus, concentrating it 100-fold gives a stronger stock (useful when many cells must be infected), and storage at −80 °C keeps it usable until needed. The coating of the dish helps the loosely attached HEK293T cells stay on the plastic (a common trick, not explained in the paragraph).`,
    memory: `A toy factory given three blueprints: one for the cargo (Cas9) and two for the delivery truck. The finished trucks can drop off the cargo once, but cannot build more trucks.`,
    flags: [
      `"2.5 × 106" is printed without its superscript; it is read here as 2.5 × 10<sup>6</sup> cells.`,
      `The paragraph says the virus was "concentrated 100-fold" but gives only the PEG-it ratio (1 volume to every four volumes of supernatant), not the volume in which the virus was finally resuspended, which is what would set the degree of concentration.`,
      `This paragraph calls the Cas9 plasmid "Cas9 plasmid with blasticidin resistance (Addgene #52962)" (the key resources table lists #52962 as "LentiCas9-Blast"), but the next paragraph names the virus "pLentiCas9-T2A-BFP". Neither paragraph says whether these are the same plasmid.`,
    ],
    prereqs: ['D1', 'D2'],
    checks: [
      { q: `Why are three different plasmids put into the HEK293T cells to make the virus?`,
        options: [
          { t: `One carries the cargo to be delivered (here Cas9) and the others supply virus parts, so the cells assemble virus particles that can deliver the cargo`, ok: true, why: `Right: the Cas9 plasmid is the cargo, and the other two are packaging plasmids that supply the virus's parts (the paragraph uses the word "packaging").` },
          { t: `Each plasmid is a different guide RNA that will cut a gene in the HEK293T cells`, ok: false, why: `No guides are involved at this stage, and the HEK293T cells only serve as a virus factory. The pooled guide library is made later (library cloning).` },
          { t: `The three plasmids are three versions of Cas9 that are compared in the experiment`, ok: false, why: `Only one of the three carries Cas9; the other two supply virus parts. Nothing is being compared here.` },
        ],
        source: ['m-lentivirus-p1'] },
    ],
  },

  'm-lentivirus-p2': {
    plain: `<p>To make cell lines that keep expressing Cas9 (stable Cas9-expressing cell lines), A549 and H460 cells were incubated for 24 h in culture medium containing the concentrated virus carrying pLentiCas9-T2A-BFP, together with 8 µg/mL polybrene. The infected cells were then selected for at least five days with blasticidin (8 µg/mL) and afterwards FACS-sorted two times, so that at least 60% of the cells were BFP-positive (BFP is a blue fluorescent protein).</p>`,
    why: `Cas9 has to be in every cell before the guide library arrives, because guides alone cut nothing. In general, a lentivirus inserts its cargo into the cell's own DNA, so the cells keep making Cas9 and pass it on when they divide (a "stable" line). Polybrene helps virus stick to cells, blasticidin kills cells that did not receive the resistance gene carried by the plasmid, and the blue color marker BFP lets FACS pick out cells that carry the construct; sorting twice raises the share of marked cells (here to at least 60% BFP-positive).`,
    flags: [
      `The 60% refers to BFP, a color marker. The paragraph does not describe any direct test of Cas9 cutting activity, and does not say why both blasticidin selection and sorting were needed.`,
    ],
    prereqs: ['D2', 'D3'],
    checks: [
      { q: `Why were the cells FACS-sorted after the blasticidin selection?`,
        options: [
          { t: `To raise the share of cells that show the BFP marker (at least 60%), so more of the cells carry the Cas9 construct`, ok: true, why: `Right: the paragraph says the cells were sorted two times "to have at least 60% BFP-positive cells".` },
          { t: `To kill the cells that did not receive the resistance gene`, ok: false, why: `That is what the blasticidin selection did (at least five days). FACS sorting separates cells by their color marker.` },
          { t: `To make the cells express guide RNAs`, ok: false, why: `Guides are delivered later, with the pDECKO library. This step only makes the Cas9 cell lines.` },
        ],
        source: ['m-lentivirus-p2'] },
    ],
  },

  /* ------------------------------------------------------------------ DECKO and lentiviral production */
  'm-decko-p1': {
    plain: `<p>For designing and cloning the DECKO plasmids, the authors followed a protocol they had described before. They give a web address (crispeta.crg.eu), whose name matches the guide-design software CRISPETa that appears in the library-design section.</p>`,
    why: `This paragraph is a pointer, not a description. In general, Methods sections refer to an earlier protocol to save space, but then the reader has to look up that earlier work to see exactly how the plasmids that hold each guide pair were designed and cloned.`,
    flags: [
      `The paragraph says "our previously-described protocol" but prints no citation, only a web address. The reference list contains the original DECKO paper (ref-30) and the CRISPETa paper (ref-92; the key resources table also gives 92 for CRISPETa), but the paragraph does not say which one is meant.`,
    ],
    sources: ['krt-41'],
    prereqs: ['D1', 'D3'],
    checks: [
      { q: `Why does this paragraph give so little detail about how the DECKO plasmids were designed and cloned?`,
        options: [
          { t: `Because it refers to a protocol the authors had already described, so the details are found there`, ok: true, why: `Right: "we used our previously-described protocol", plus a web address.` },
          { t: `Because the DECKO plasmids were bought ready-made`, ok: false, why: `The paragraph says the authors designed and cloned them ("For the design and cloning of DECKO plasmids, we used...").` },
          { t: `Because the plasmids were not designed by the authors`, ok: false, why: `The protocol is described as "our" protocol, so it is the authors' own earlier work.` },
        ],
        source: ['m-decko-p1'] },
    ],
  },

  'm-decko-p2': {
    plain: `<p>The paragraph says that all the pgRNA guides used for the CRISPR-del validations are reported in Data S4 (not in your PDF).</p>`,
    why: `In general, listing the exact guide sequences lets other labs repeat the validation experiments. In the Results, "validation" means follow-up tests of individual candidates (for example deleting one TSS and checking the effect), as opposed to the pooled screen itself.`,
    flags: [],
    prereqs: ['D1', 'D7'],
    checks: [
      { q: `Why does a paper list the exact pgRNA sequences used for its validation experiments?`,
        options: [
          { t: `So that other labs can order the same guides and repeat the experiments`, ok: true, why: `Right: without the sequences, nobody could repeat the deletions exactly.` },
          { t: `Because the guides are what the ASOs bind to`, ok: false, why: `ASOs bind RNA and guides steer Cas9 to DNA. They are two different tools used for two different experiments.` },
          { t: `Because the list of sequences proves that the deletions worked`, ok: false, why: `A list of sequences proves nothing about an outcome. Whether a deletion happened is checked experimentally (for example by PCR and a gel).` },
        ],
        source: ['m-decko-p2'] },
    ],
  },

  'm-decko-p3': {
    plain: `<p>To make lentivirus that carries the pDECKO plasmid, the authors followed "the same protocol". After cells were infected with these pDECKO viruses, they were selected with puromycin (2 µg/mL) for at least three days.</p>`,
    why: `The infected cells are kept alive by puromycin and the rest die. In general, puromycin kills any cell that does not carry a puromycin-resistance gene, so selection is needed because infection never reaches every cell, and cells without a guide pair would only add noise. (The paragraph implies, but does not state, that the plasmid carries the resistance gene.)`,
    flags: [
      `"The same protocol" could mean the previously described protocol (m-decko-p1) or the lentivirus production in m-lentivirus-p1; the paragraph does not say which.`,
      `The paragraph does not say which experiments it covers. For the pooled screens, the titer paragraph says puromycin selection (2 µg/mL) was kept for six days (m-titer-p1).`,
    ],
    prereqs: ['D2'],
    checks: [
      { q: `Why were the infected cells treated with puromycin for at least three days?`,
        options: [
          { t: `To kill the cells that did not take up the plasmid (and its resistance gene), so that only cells carrying the guides remain`, ok: true, why: `Right: puromycin selection leaves only the cells that were infected and carry resistance.` },
          { t: `To make the guides cut the DNA`, ok: false, why: `Cutting is done by Cas9 steered by the guides. Puromycin only kills cells that lack the resistance gene.` },
          { t: `To make the cells divide faster`, ok: false, why: `Puromycin is toxic to cells without resistance; it does not speed up growth.` },
        ],
        source: ['m-decko-p3'] },
    ],
  },

  /* ------------------------------------------------------------------ Library design */
  'm-library-design-p1': {
    plain: `<p>The authors downloaded gene annotations (lists of genes and where they sit on the genome) in GTF format from three sources: (i) GENCODE annotation release 19 (genome version GRCh37), (ii) the BIGTranscriptome annotation, and (iii) FANTOM CAT. They also generated a novel transcriptome assembly from A549 RNA-seq data with the program StringTie (version 1.3). All 4 annotations were then merged into one final annotation using StringTie's "-merge" option.</p>`,
    why: `The goal is a target list that is as complete as possible. In general, no single catalog lists every lncRNA and different catalogs include different ones, so merging three public catalogs plus a new assembly from the authors' own A549 RNA-seq data adds lncRNAs that may be missing from public lists, including ones expressed in this cell line. The Limitations section still admits that incomplete annotation means some lncRNAs were not screened.`,
    flags: [
      `The printed text reads "We alsma, lo generated a novel transcriptome assembly", which looks like a typesetting slip for "We also generated".`,
      `Only GENCODE is given a genome version (release 19, GRCh37). The paragraph does not say whether the other annotations use the same version or how they were matched before merging.`,
    ],
    prereqs: ['B7', 'D3'],
    checks: [
      { q: `Why did the authors merge several annotations, including one built from their own A549 RNA-seq data, into a single list?`,
        options: [
          { t: `No single annotation is complete, and an A549-specific assembly can add lncRNAs missing from the public lists, so the target list is more comprehensive`, ok: true, why: `Right: merging adds candidates. The Limitations section also says that incomplete annotation means some lncRNAs were not screened.` },
          { t: `To make the list shorter so that the library would be smaller`, ok: false, why: `Merging adds candidates; it is the filtering steps in the next paragraph that shrink the list.` },
          { t: `Because GENCODE contains no lncRNAs`, ok: false, why: `GENCODE does annotate lncRNAs (the Results call LINC00115 a "GENCODE-annotated" gene); the point of merging is completeness, not a gap in one source.` },
        ],
        source: ['m-library-design-p1', 'limitations-p2', 'res-validation-p2'] },
    ],
  },

  'm-library-design-p2': {
    plain: `<p>The merged list of lncRNAs was filtered in steps.</p><ul><li><b>First filter:</b> lncRNAs whose TSS overlaps a protein-coding gene exon, or lies less than 2 kb upstream or downstream of one (using the exons in the GENCODE annotation), were removed.</li><li><b>Second filter:</b> expression was calculated with RSEM v1.3, using the same A549 RNA-seq data that built the new assembly. Transcripts with FPKM below 0.1 were removed.</li><li><b>Clustering:</b> the remaining TSSs that were within 300 bp of each other were grouped into one "TSS cluster".</li><li><b>Evidence:</b> the TSS clusters were intersected with ENCODE evidence specific to A549 cells: CAGE, DNase I hypersensitivity sites, and ChromHMM marks (chromatin states named Active TSS, Flanking TSS, Promoter Downstream TSS, Flanking TSS Downstream, Genic enhancer 1, Genic enhancer 2, Active Enhancer 1, Active Enhancer 2, Weak Enhancer and Bivalent-Poised TSS).</li></ul><p>Candidate TSS clusters were then ranked by the number of evidence sources.</p>`,
    why: `The filters serve the paper's goal: a library of expressed lncRNAs whose start sites can be deleted cleanly. The paper says the 2 kb rule avoids false positives from unintended off-targeting (Results): a deletion close to a protein-coding exon could disturb that gene and make an lncRNA look important when it is not. In general, the expression filter removes lncRNAs that are barely active in A549 cells, because a screen can only detect the loss of something that was there; clustering nearby TSSs avoids targeting the same region twice; and CAGE, DNase I hypersensitivity and ChromHMM are three independent hints that a real start site or regulatory region is present, so ranking by the number of evidence sources puts the best-supported TSSs first.`,
    flags: [
      `The paragraph says candidates were "prioritised by the number of evidence sources" but not how many sources a cluster needed, nor how the list was cut down to the 998 TSSs reported in the Results (res-pipeline-p2). The Figure 1B legend speaks of selection "based on three evidence sources".`,
    ],
    sources: ['res-pipeline-p2'],
    prereqs: ['B4', 'B8', 'D10'],
    checks: [
      { q: `Why were lncRNAs with a TSS less than 2 kb from a protein-coding exon removed from the target list?`,
        options: [
          { t: `So that deleting the lncRNA's TSS is less likely to disturb a neighboring protein-coding gene and create a false hit`, ok: true, why: `Right: the Results say the 2 kb rule was used "to avoid the known issues of false-positive results that may occur via unintended off targeting".` },
          { t: `Because lncRNAs close to protein-coding genes are never expressed`, ok: false, why: `Expression is handled by a separate filter (FPKM), and nothing says that nearness to a gene means no expression.` },
          { t: `Because guides cannot be designed within 2 kb of an exon`, ok: false, why: `The stated reason is avoiding false positives from unintended targeting, not a technical limit on guide design.` },
        ],
        source: ['m-library-design-p2', 'res-pipeline-p2'] },
    ],
  },

  'm-library-design-p3': {
    plain: `<p>The authors designed <b>neutral control</b> pgRNAs aimed at genomic regions not expected to change cell behavior. They took 10 regions in the AAVS1 gene locus from a publication by Zhu and colleagues, and added 65 randomly chosen intergenic regions (more than 10 kb away from the nearest annotated gene) and 25 intronic regions (inside introns longer than 5 kb).</p><p>They also added protein-coding gene (PCG) controls with known roles in promoting or opposing cancer-cell growth and cisplatin resistance: 53 positive controls (genes that promote cell growth) and 50 negative controls (genes that oppose cell growth). These genes were picked by hand from the literature and taken from the Zhu paper. The complete list of genes in the library is in Table S1 (not in your PDF).</p>`,
    why: `A screen is only interpretable if you know what "no effect" and "a real effect" look like. In general, neutral controls (cuts in places expected to do nothing) show the background, and because cutting DNA can itself stress cells a little, they reveal how much of an effect comes from cutting alone. Positive controls (known growth-promoting genes) should drop out in a dropout screen, which shows that the screen can detect a real effect. The paper later uses the neutral controls to turn fold changes into Z scores (m-hits-p2) and uses the positive and neutral controls to judge the quality of the ranking (m-hits-p5).`,
    flags: [
      `The Results (res-multipheno-p6) speak of "the 109 positive controls included in the library", while this paragraph lists 53 positive and 50 negative protein-coding gene controls. The paper does not say how these counts relate.`,
      `The paragraph does not say how many pgRNAs were designed for each control region. No reference number is printed for "Zhu and colleagues"; the reference list contains Zhu et al. (2016), "Genome-scale deletion screening of human long non-coding RNAs using a paired-guide RNA CRISPR–Cas9 library" (ref-49), which is presumably the paper meant.`,
    ],
    sources: ['res-multipheno-p6', 'ref-49'],
    prereqs: ['D3', 'D5'],
    checks: [
      { q: `What is the purpose of the neutral control pgRNAs (in AAVS1, intergenic and intronic regions)?`,
        options: [
          { t: `They show what "no effect" looks like when DNA is cut in places not expected to matter, giving a baseline for the lncRNA targets`, ok: true, why: `Right: neutral controls are placed in "genomic regions not expected to affect cell phenotype".` },
          { t: `They are guides expected to kill the cells, so they prove the screen works`, ok: false, why: `That describes positive controls (known growth-promoting genes), not neutral ones.` },
          { t: `They target lncRNAs already known to promote lung cancer`, ok: false, why: `Neutral controls target regions that are not expected to affect the phenotype, not known cancer lncRNAs.` },
        ],
        source: ['m-library-design-p3'] },
    ],
  },

  'm-library-design-p4': {
    plain: `<p>For each candidate TSS cluster region, 10 unique pgRNAs were designed with the software CRISPETa, run with a list of settings (printed in the paper, for example "-du 1000 -dd 1000", but not explained there). The software's off-target filters were used during the design.</p><p>The design was repeated with less and less strict rules until 10 pgRNAs had been found for each target. In the first run, only pgRNAs without mismatches were allowed. If fewer than 10 pgRNAs per candidate were found, the settings were relaxed: in the second round, one off-target with 2 mismatches was allowed, and in the third round, the region searched for guides was made bigger, repeatedly. A summary is in Data S4 (not in your PDF).</p>`,
    why: `In general, a pooled screen wants several independent guide pairs per target, so that one weak or off-target pair cannot decide the result; here that "depth" is 10. Off-target cuts at look-alike sites can create false hits, so the designer starts strict and relaxes the rules only for targets where it cannot find 10 acceptable pairs. This keeps the library as clean as possible while giving every target the same number of pgRNAs.`,
    flags: [
      `The software settings (for example "-du 1000 -dd 1000" and "-v 0.4") are printed but not explained.`,
      `"Only pgRNAs without mismatches were allowed" is not spelled out; it presumably concerns look-alike (off-target) sites elsewhere in the genome, but the paragraph does not say.`,
      `The paragraph does not say how many targets needed the second or third round, or whether any ended with fewer than 10 pgRNAs; it points to Data S4 (not in your PDF) for a summary.`,
    ],
    prereqs: ['D1', 'D3'],
    checks: [
      { q: `Why did the authors repeat the guide design with "decreasing stringency"?`,
        options: [
          { t: `Some targets had fewer than 10 acceptable pgRNAs under the strictest rules, so the rules were relaxed step by step until every target had 10`, ok: true, why: `Right: the paragraph says the designs were repeated "until 10 pgRNAs for each target were identified".` },
          { t: `To make every guide cut the DNA more than once`, ok: false, why: `The relaxing concerns how many look-alike (off-target) sites are tolerated and how large the search region is, not how often a guide cuts.` },
          { t: `To get more than 10 pgRNAs for the easy targets`, ok: false, why: `The aim was exactly 10 per target; the repetition stopped once each target had 10.` },
        ],
        source: ['m-library-design-p4'] },
    ],
  },

  'm-library-design-p5': {
    plain: `<p>The final library design had 12,000 unique sequences, each 165 or 166 bp long, with overhangs (short end sequences) that are compatible with cloning into the pDECKO plasmid. The paragraph says the median distance between the pgRNAs is shown in Figure S1D (not in your PDF).</p>`,
    why: `This paragraph fixes the library size, 12,000 unique sequences, and later numbers depend on it: the library coverage in bacteria (66.7X) and in the screens (&gt;1,000x) is calculated against it. In general, each sequence is one pgRNA, i.e. one synthetic DNA piece that holds both guides of a pair (the Results also speak of 12,000 pgRNAs), and the matching overhangs are what allow the pool to be cloned into the plasmid.`,
    flags: [
      `Figure 1A prints "1,200 targets" with "Depth: 10 pgRNAs" (1,200 × 10 would give 12,000), but Figure 1B prints "1200 pgRNAs library including controls". The text here and the Results say 12,000 pgRNAs. The Figure 1B label is likely a slip, but the paper does not say so.`,
      `Figure S1D is cited here for the median distance between the pgRNAs, but the Results cite Figure S1D for the share of target regions with one, two or three promoters (res-pipeline-p2). The supplement is not in your PDF, so the labels cannot be checked.`,
    ],
    sources: ['m-library-cloning-p2', 'm-screens-p1', 'res-pipeline-p4', 'fig1A', 'fig1B'],
    derived: ['1200'],
    prereqs: ['D1', 'D3'],
    checks: [
      { q: `Why do the 165/166 bp library sequences carry "overhangs compatible with cloning into the pDECKO plasmid"?`,
        options: [
          { t: `So that each synthesized sequence can be joined into the cut pDECKO plasmid`, ok: true, why: `Right: the overhangs are matching ends that let the pool be cloned into the plasmid.` },
          { t: `So that the sequences can bind to the target lncRNA`, ok: false, why: `The guide part of each sequence finds its DNA target; the overhangs are only for joining the piece into the plasmid.` },
          { t: `So that Cas9 can recognize the sequence as a guide`, ok: false, why: `Cas9 works with the guide RNAs made from the plasmid; the overhangs have nothing to do with that.` },
        ],
        source: ['m-library-design-p5'] },
    ],
  },
});

Object.assign(window.TRACKG.paras, {

  /* ------------------------------------------------------------------ Library cloning */
  'm-library-cloning-p1': {
    plain: `<p>The library was synthesized by a commercial supplier as single-stranded DNA pieces (oligonucleotides). When they arrived, they were dissolved in a low-salt buffer (nuclease-free low Tris-EDTA, or TE) to a final concentration of 10 ng/µL.</p><p>The pieces were then copied by PCR with two primers, Oligo-Fw and Oligo-Rev (sequences printed in the paper; the paragraph refers to Data S4 for the reaction that turns single-stranded into double-stranded DNA). The program used 10 cycles of copying, with an initial step at 95 °C and a final step at 72 °C (the other temperatures and times are printed in the paragraph). The product was purified with a PCR purification kit (catalog details omitted — see the PAPER box). The correct size of the product (the amplicon) was checked on a 2% agarose gel.</p>`,
    why: `The library arrives as a tiny amount of single-stranded DNA: a mixed pool of 12,000 different sequences. In general, oligo pools share the same end sequences, so one primer pair can copy every member at once; PCR also makes the DNA double-stranded, which cloning needs, and produces enough material. Keeping the number of cycles low (10) limits the chance that some sequences are copied better than others, which would make the pool uneven (the paper does not state this reason). Checking the product size on a gel confirms that it has the expected length before it is used.`,
    flags: [],
    sources: ['m-library-design-p5'],
    prereqs: ['D3', 'D4'],
    checks: [
      { q: `What is the main job of the PCR step applied to the synthesized oligonucleotide library?`,
        options: [
          { t: `To turn the small amount of single-stranded synthetic DNA into enough double-stranded DNA for cloning`, ok: true, why: `Right: the paragraph says the library arrived as single-stranded oligonucleotides, was PCR amplified, and the "ssDNA to dsDNA" reaction is detailed in Data S4.` },
          { t: `To insert the guides into the genome of the cancer cells`, ok: false, why: `That happens later, when the lentivirus infects the cells. The PCR here is a test-tube copying step.` },
          { t: `To remove the sequences that have off-targets`, ok: false, why: `Off-target filtering was done earlier, at the design stage. PCR copies whatever it is given.` },
        ],
        source: ['m-library-cloning-p1'] },
    ],
  },

  'm-library-cloning-p2': {
    plain: `<p>Cloning follows "the low-throughput protocol described in" (the printed sentence stops there; the citation is missing).</p><p>In the first step, the pDECKO_mCherry plasmid was cut open (digested) using the conditions listed in Data S4. The amplified library was inserted into the cut plasmid with a Gibson Assembly mix (50 °C for 1 h; the amounts are printed in the paragraph). A small part of this reaction (1 µL) was put into 25 µL of electrocompetent bacteria (Endura cells) by electroporation, a brief electric pulse that lets DNA enter the bacteria (catalog details omitted — see the PAPER box).</p><p>The library coverage was 66.7X. It was estimated by counting the bacterial colonies obtained and dividing by the total number of different sequences in the designed library (12,000).</p><p>The intermediate plasmid made in this step contains the variable pgRNA sequences but still lacks the constant part of the first sgRNA and the H1 promoter (Figure S1B, not in your PDF).</p>`,
    why: `Cloning is done in two steps, which explains the last sentence: first the variable guide sequences go into the cut plasmid, and the constant parts are added in the second step (next paragraph). The bacteria step is also a bottleneck test. In general, each colony comes from one bacterium that took up one plasmid, so colonies divided by 12,000 sequences tells you how many times, on average, each sequence was captured; a value below one would mean that some sequences never entered the pool and could not be screened. Here 66.7X means roughly 800,000 colonies (my arithmetic: 66.7 × 12,000, not printed in the paragraph). The same idea (copies per sequence) is applied later to cells in the screens (m-screens-p1).`,
    flags: [
      `The first sentence ends in mid-thought: "follow the low-throughput protocol described in." The citation is missing from the printed text.`,
      `The reaction amounts are printed in a muddled way ("H2O up to 10 µL, 10 µL of Gibson mix 10 µL"), so the exact volumes cannot be read with certainty.`,
    ],
    derived: ['800000'],
    prereqs: ['D3', 'D4'],
    memory: `Like counting how many visitors each room of a museum received: if the average is high, almost no room was missed.`,
    checks: [
      { q: `What does the "library coverage of 66.7X" in this paragraph measure?`,
        options: [
          { t: `The number of bacterial colonies obtained divided by the 12,000 different sequences in the designed library: how many times, on average, each sequence was captured when the library was cloned`, ok: true, why: `Right: that is how the paragraph says the coverage was estimated.` },
          { t: `The number of cells per sequence that is kept during the screens`, ok: false, why: `That is the screen coverage (more than 1,000x), which counts cells, not bacterial colonies (see the screens section).` },
          { t: `The percentage of cloned sequences that are error-free`, ok: false, why: `Coverage counts colonies per designed sequence; it does not say whether the sequences are correct. Quality was checked by sequencing, described in the next paragraph.` },
        ],
        source: ['m-library-cloning-p2', 'm-screens-p1'] },
    ],
  },

  'm-library-cloning-p3': {
    plain: `<p>In the second cloning step, the intermediate plasmid was cut with an enzyme (printed as "BmsbI"). After purification, the constant insert was assembled by ligation (joining DNA pieces) using long synthetic oligos, as explained in Pulido-Quetglas C. et al. (the oligos are listed in Data S4). The ligation product was then put into electrocompetent Endura bacteria by electroporation as described above (catalog details omitted — see the PAPER box).</p><p>Clones (single bacterial colonies) were tested by colony PCR and by Sanger sequencing (primers and conditions in Data S4).</p><p>The overall library quality was evaluated by NGS. The plasmid pool containing the pgRNAs was PCR-amplified with primers for NGS sequencing (listed in Table S3) and purified. The purified product was sequenced by Illumina at a depth of 20M PE125 reads (20 million paired-end reads). The reads were aligned to the pgRNA library, and the read distribution of each pgRNA was determined with the Ineq package in R (version 3.5.3) to calculate the Lorenz curve and the Gini coefficient (Figure S1C).</p>`,
    why: `This paragraph finishes the cloning and then tests the result. In the second step the parts that are the same in every pgRNA (the constant part of the first sgRNA and the H1 promoter, missing after step one) are added. Individual clones are checked by colony PCR and Sanger sequencing, and the whole pool is checked by NGS. In general, a pooled screen needs a library that contains all the sequences in roughly even amounts: if a few guides dominate and many are rare, the rare ones cannot be measured well and the screen loses power. The Lorenz curve and the Gini coefficient summarize how uneven a pool is (a Gini coefficient of zero means perfectly even; values near one mean very uneven).`,
    flags: [
      `Figure labels do not line up. The Lorenz curve and Gini coefficient are cited here as Figure S1C, but the Results cite Figure S1C for the cloning scheme and Figure S1F for sequence quality (res-pipeline-p4), and the previous cloning paragraph cites Figure S1B for the scheme. The supplement is not in your PDF.`,
      `The Results report the library quality as "60.8% perfect match across both spacers" and 90th to 10th percentile count ratios of "4.6-fold" (res-pipeline-p4). This paragraph names the Lorenz curve and Gini coefficient instead and gives no Gini value in the text.`,
      `NGS primers are said to be in Table S3 here, but the key resources table says "NGS sequencing primers (see Table S2 for sequences)". The enzyme name is printed "BmsbI" (the letters look transposed). The supplement is not in your PDF, so the table labels cannot be checked.`,
    ],
    sources: ['res-pipeline-p4', 'krt-39'],
    prereqs: ['D3', 'D4'],
    checks: [
      { q: `Why was the finished plasmid library sequenced by NGS and summarized with a Lorenz curve and a Gini coefficient?`,
        options: [
          { t: `To check that all the pgRNAs are present in fairly even amounts, because a very uneven pool would make some guides hard to measure in the screen`, ok: true, why: `Right: the paragraph says the "overall library quality was evaluated by NGS" and the read distribution of each pgRNA was used to calculate the Lorenz curve and Gini coefficient.` },
          { t: `To measure how many cells survive cisplatin`, ok: false, why: `Cisplatin comes later, in the screens. Here only the plasmid pool is sequenced.` },
          { t: `To confirm that the lncRNAs are expressed in A549 cells`, ok: false, why: `Expression was assessed from RNA-seq during the library design (the FPKM filter). Sequencing the plasmids only counts guide sequences.` },
        ],
        source: ['m-library-cloning-p3'] },
    ],
  },

  /* ------------------------------------------------------------------ Lentiviral titer calculation and infection */
  'm-titer-p1': {
    plain: `<p>The aim was an MOI (multiplicity of infection) of 0.3–0.4, so the authors first ran a titration experiment in A549 and H460 cells. They plated 2 × 10<sup>6</sup> cells in each well of a 12-well plate with 8 µg/mL polybrene, added different amounts of virus to the wells (from 2.5 to 50 µL), and infected the cells by spin-infection (spinning the plate in a centrifuge), as described before. After the spin, the medium was replaced with fresh complete medium without polybrene and the cells were left overnight.</p><p>The next day the cells were counted and each well was split into two equal parts; one part was treated with 2 µg/mL puromycin. After 72 h, the MOI was calculated by dividing the number of surviving cells in the puromycin well by the number of cells in the puromycin-free well. An MOI of 0.3 was used for all the screening experiments.</p><p>For the large-scale screens, 120M (120 million) cells were seeded in 12-well plates at a density of 2M per well for spin-infection. The next day the cells were pooled and fresh medium containing puromycin (2 µg/mL) was added. Puromycin selection was kept up for six days until the phenotypic screens began.</p>`,
    why: `In general, every batch of virus has a different strength, so it is titrated: several amounts are tried and the infected fraction is measured, to find the amount that gives the wanted MOI. A low MOI means most cells get no virus and the infected ones mostly get just one, so each infected cell carries a single pgRNA and its phenotype can be linked to one target (the paper does not spell this reason out here). The puromycin-free half gives the total cell number and the puromycin half shows how many cells were infected, so their ratio is the infected fraction. Many cells are needed because most are not infected: by the paper's own calculation an MOI of 0.3 means about 30% survive, so 120M cells give about 36M infected cells (my arithmetic), or about 3,000 per library sequence out of 12,000, well above the &gt;1,000x coverage kept later.`,
    flags: [
      `The "MOI" here is the fraction of cells that survive puromycin (survivors divided by cells without puromycin). Strictly, that is the fraction of cells that received at least one virus, which is not exactly the average number of viruses per cell; the two are close when the fraction is small. The paragraph does not discuss this.`,
      `"2 × 106" is printed without its superscript; it is read as 2 × 10<sup>6</sup> cells per well, which matches the "2M per well" used for the large-scale screens.`,
      `The paragraph gives a target range of 0.3–0.4 but says that 0.3 was used for all the screens.`,
    ],
    sources: ['m-library-design-p5', 'm-screens-p1'],
    derived: ['30', '36', '3000'],
    prereqs: ['D2', 'D3'],
    memory: `Dosing a classroom with a few drops of ink: add so little that most pupils stay clean and the stained ones carry just one drop.`,
    checks: [
      { q: `Why is the MOI kept low (0.3) in a pooled screen?`,
        options: [
          { t: `So that most infected cells receive only one pgRNA, letting each cell's phenotype be linked to a single target`, ok: true, why: `Right in general: at a low MOI most cells get no virus (puromycin removes them) and the infected ones mostly get one.` },
          { t: `So that every cell receives at least one virus`, ok: false, why: `At an MOI of 0.3 most cells receive none. The uninfected cells are killed by puromycin; the aim is one pgRNA per infected cell.` },
          { t: `So that the cells survive puromycin better`, ok: false, why: `Survival under puromycin depends on the resistance gene, not on the MOI.` },
        ],
        source: ['m-titer-p1'] },
    ],
  },

  /* ------------------------------------------------------------------ CRISPR screens */
  'm-screens-p1': {
    plain: `<p>One week after infection is called time point 0 (T0). At T0 the cells were counted and the reference sample was collected: 16M (16 million) cells, which corresponds to a library coverage of more than 1,000x. For all screens, cells were grown in 150 mm culture-treated dishes and passed every 2–3 days.</p>`,
    why: `T0 is the "before" photograph. In general, a screen reads out how the abundance of each guide changes, so it needs a starting count to compare against (some screens also use other reference samples, described in the next paragraphs). Coverage above 1,000x means that, on average, every one of the 12,000 sequences was present in more than 1,000 cells (16M divided by 12,000 is about 1,300: my arithmetic), so the random loss of a few cells does not make a guide appear or vanish by chance.`,
    memory: `The "before" photo in a before-and-after comparison.`,
    flags: [],
    sources: ['m-library-design-p5'],
    derived: ['1300'],
    prereqs: ['D3', 'D4'],
    checks: [
      { q: `What does a "library coverage of more than 1,000x" mean for the 16M cells collected at T0?`,
        options: [
          { t: `On average, each unique library sequence is represented by more than 1,000 cells`, ok: true, why: `Right: the next paragraph defines coverage as the number of cells divided by the number of unique library sequences.` },
          { t: `Each cell carries more than 1,000 different guides`, ok: false, why: `Most infected cells carry a single pgRNA (that is what the low MOI is for). Coverage counts cells per sequence, not guides per cell.` },
          { t: `The T0 sample was sequenced more than 1,000 times`, ok: false, why: `That would describe sequencing depth (reads). Coverage here counts cells per library sequence.` },
        ],
        source: ['m-screens-p1', 'm-screen-prolif-p1'] },
    ],
  },

  'm-screen-prolif-p1': {
    plain: `<p><b>Dropout screens.</b> At T0, 16M cells were plated and passaged (split regularly) so that coverage stayed above 1,000X. Here coverage is defined as the number of cells divided by the number of unique library sequences. Cells were harvested at 14 and 21 days to extract genomic DNA (gDNA).</p><p><b>CFSE screens.</b> At T7, 16M cells were seeded and "starved" for 24 h in medium without FBS. They were then stained with the CFSE dye (catalog details omitted — see the PAPER box). One part of the stained cells was analyzed straight away by flow cytometry; the rest were plated in normal medium. Five days later (T5), the cells were sorted into two populations: the 20% brightest cells (slow-growing) and the 20% least bright cells (fast-growing). The two populations were plated separately and, five days later (T10), went through another round of staining and sorting.</p>`,
    why: `These are the two formats of the proliferation screen. In the dropout screen, cells whose guides delete a growth-promoting lncRNA grow slower, so their guides become rarer between T0 and the later samples; keeping coverage above 1,000X keeps counting noise low. In the CFSE screen (positive selection), in general the dye is shared out among daughter cells at each division, so fast dividers get dimmer and slow dividers stay bright; sorting the brightest and the least bright 20% reads growth directly from the dye. The Results say the two formats complement each other: adding the CFSE screens gave a modest but consistent gain in accuracy (A549 proliferation AUC 0.7 versus 0.67). The paragraph does not say why the cells were starved first; in general, serum starvation brings cells to a similar resting state so that they restart dividing together.`,
    memory: `A drop of ink shared between daughters at every division: the more a cell divides, the paler it gets.`,
    flags: [
      `T7, T5 and T10 are not defined here (T0 is defined in m-screens-p1 as one week after infection). "Five days later (T5)" suggests that T5 and T10 count days from the staining, but the paragraph does not say so. It also does not say what the 14 and 21 days of the dropout screen are counted from (presumably T0).`,
      `The paragraph does not say what the sorted CFSE populations were compared with (each other, or an unsorted reference), or how many replicates were done.`,
    ],
    sources: ['res-multipheno-p2'],
    prereqs: ['D3', 'D4', 'D5'],
    checks: [
      { q: `In the CFSE screens, why are the 20% brightest cells called "slow-growing" and the 20% least bright cells "fast-growing"?`,
        options: [
          { t: `Because the dye is diluted each time a cell divides, so cells that still look bright have divided less`, ok: true, why: `Right in general: CFSE is shared out between daughter cells at every division, so brightness falls with the number of divisions.` },
          { t: `Because bright cells are alive and dim cells are dead`, ok: false, why: `CFSE brightness tracks how often cells have divided, not whether they are dead. Dead cells are not what is being sorted here.` },
          { t: `Because the dye is made by the cells in response to the pgRNA`, ok: false, why: `The dye is added from outside (cells are stained with a kit); the cells do not make it.` },
        ],
        source: ['m-screen-prolif-p1'] },
    ],
  },

  'm-screen-cisplatin-p1': {
    plain: `<p><b>Choosing the doses.</b> The working cisplatin concentrations were chosen with a dose-response experiment and cell doubling times (Figure S2C, not in your PDF). For the dose-response, 3,000 A549 and H460 cells were plated in 96-well plates and treated with a range of cisplatin concentrations (0.5, 1, 2, 2.5, 5, 6.5, 8, 12.5, 25 and 50 µM). After 72 h, CellTiter-Glo 2.0 was added to the medium (1:1) and luminescence was recorded (a read-out of how many cells are alive; catalog details omitted — see the PAPER box). For the doubling time, 1M cells were plated in 10 cm plates, cisplatin was added at different concentrations, and living cells were counted every 2–3 days for up to 14 days.</p><p><b>Survival screen.</b> 48 and 96M cells were plated at T0 and treated with 6.5 and 25 µM cisplatin for A549 cells; these doses correspond to IC30 and IC80. Two doses were used to widen the dynamic range of the screens and to account for the diverging effects of different doses: a mild dose (IC30) decreases cell proliferation by about 30%, whereas high doses cause proliferative arrest or cell death. Cell pellets were collected after 14 and 21 days.</p><p><b>Death screen.</b> 144M cells were seeded and treated with cisplatin at 2 and 1 µM (IC20) for A549 (Figure S2C). Every 24 h, for five days, floating (dead) cells were collected and pooled for gDNA extraction.</p>`,
    why: `Cisplatin screens need doses that give a usable signal, so the doses are measured first (dose-response and doubling time with the drug) rather than guessed. The two screens read the response in opposite directions (Figure 2B legend). In the survival screen (dropout format), cells exposed to high doses (IC30 and IC80) are collected after 14 and 21 days, and the guides of resistance-promoting lncRNAs are depleted in the survivors. In the death screen (positive format), the floating dead cells from a low dose (IC20) are collected, and the enriched guides identify resistance-promoting lncRNAs. The paper's stated reason for two doses in the survival screen is to widen the dynamic range of the screens and to account for the different effects of mild and high doses.`,
    flags: [
      `The death screen gives two concentrations ("2 and 1 µM") but only one label, "(IC20)"; the Figure 2B legend speaks of one low concentration (IC20). The paragraph does not say which of the two is the IC20, or whether both were used.`,
      `Doses are given for A549 only. The dose-response was done in A549 and H460, but the paragraph gives no doses for H460.`,
      `"48 and 96M cells were plated at T0 and treated with 6.5 and 25 µM" does not say which cell number goes with which dose. The paragraph also does not say what the cisplatin-treated cells were compared with (for example untreated cells at the same time point, or the T0 sample).`,
    ],
    sources: ['fig2B'],
    prereqs: ['C3', 'D5', 'D8'],
    checks: [
      { q: `Why did the authors use two cisplatin doses (IC30 and IC80) in the survival screen?`,
        options: [
          { t: `To widen the dynamic range of the screen and to cover the different effects of a mild dose (slower growth) and a high dose (arrest or death)`, ok: true, why: `Right: the paragraph says two concentrations were used "to increase the dynamic range of the screens and account for diverging effects of different doses".` },
          { t: `Because IC30 is for A549 cells and IC80 is for H460 cells`, ok: false, why: `Both doses are given for A549 cells (6.5 and 25 µM); the paragraph does not assign them to different cell lines.` },
          { t: `To check that the cisplatin stock was active`, ok: false, why: `Nothing like that is stated; the paragraph gives the reason as widening the dynamic range and covering diverging dose effects.` },
        ],
        source: ['m-screen-cisplatin-p1'] },
    ],
  },

  'm-screen-migration-p1': {
    plain: `<p><b>Set-up.</b> To find the best conditions, a test experiment was done first: 0.5 M (half a million) A549 cells per well were seeded in 5 Boyden chambers (chambers whose two compartments are separated by a porous membrane; catalog details omitted — see the PAPER box). Each migration assay was stopped at a different time, from 5 h up to 48 h (Figure S2G, not in your PDF). 48 h was chosen for the real experiment.</p><p><b>Screen.</b> At T0, the infected cells (about 16M) were divided and seeded into the upper part of 32 transwell inserts (0.5 M cells per insert). The upper part was filled with medium without FBS and the lower part with medium containing 10% FBS. After 48 h, the cells in the upper part of the chamber (impaired migration) and in the lower part (accelerated migration) (Figure 2C) were detached with trypsin and plated separately for 48 h. After that, the cells were counted and collected for gDNA extraction. Control cells that did not go through the migration assay were harvested at the same time as a reference population.</p>`,
    why: `Migration is one of the cancer hallmarks the paper screens for. The design puts serum-free medium above a porous membrane and serum-containing medium (10% FBS) below, so that cells able to migrate move toward the serum. In general, collecting the cells that crossed and the cells that did not lets you ask which guides are enriched in each group. A migration-promoting lncRNA, when lost, makes cells less able to migrate, so its guides pile up in the impaired group: the Figure 2C legend says migration-promoting lncRNAs are identified through pgRNA enrichment in migration-impaired cells. The set-up test over several time points (5 h up to 48 h) was run to choose the duration, and 48 h was selected. The 16M infected cells match the 16M of the T0 sample (coverage above 1,000x, see the first screens paragraph). Control cells that skipped the assay serve as the reference, harvested at the same time so that the comparison is not distorted by culture time.`,
    flags: [
      `Two different 48 h periods appear: 48 h in the transwell, and then another 48 h of re-plating before counting and DNA extraction. The Results mention only the first (res-multipheno-p7), and the paragraph does not say why the cells were re-plated.`,
      `The upper cells are called "impaired migration" and the lower cells "accelerated migration". Hits in this screen are guides enriched in the impaired (upper) cells (Figure 2C legend), which can feel backward.`,
    ],
    sources: ['fig2C', 'res-multipheno-p7', 'm-screens-p1'],
    prereqs: ['C2', 'D5'],
    checks: [
      { q: `A pgRNA that deletes a migration-promoting lncRNA would be expected to be enriched in which group of cells?`,
        options: [
          { t: `The migration-impaired cells that stayed in the upper part of the transwell`, ok: true, why: `Right: losing a migration-promoting lncRNA makes cells less able to move, and the Figure 2C legend says migration-promoting lncRNAs are identified through pgRNA enrichment in migration-impaired cells.` },
          { t: `The accelerated-migration cells that reached the lower part`, ok: false, why: `That is the intuitive guess, but cells that lost a migration-promoting gene would be less, not more, likely to cross.` },
          { t: `The control cells that did not undergo the migration assay`, ok: false, why: `The control cells are the reference population used for comparison; they are not a selected group.` },
        ],
        source: ['m-screen-migration-p1', 'fig2C'] },
    ],
  },
});

Object.assign(window.TRACKG.paras, {

  /* ------------------------------------------------------------------ Genomic DNA preparation and sequencing */
  'm-gdna-p1': {
    plain: `<p>Genomic DNA (gDNA) was extracted from the collected cells with commercial kits: the Midi kit for samples of 5e6–3e07 cells (that is, 5,000,000 to 30,000,000 cells) and the Mini kit for samples of fewer than 5 × 10<sup>6</sup> cells (catalog details omitted — see the PAPER box), following the manufacturer's instructions. The DNA concentrations were then measured with a Nanodrop (an instrument that reads how much DNA is in a small drop of liquid).</p>`,
    why: `The guide sequences each cell carries are part of its DNA, so to count the guides you first have to purify the cells' genomic DNA. In general, the kit size is matched to the number of cells, and measuring the DNA concentration lets you use known amounts in the next step (the PCR in the next paragraph).`,
    flags: [
      `Screen samples ranged up to 144M cells at plating (m-screen-cisplatin-p1), above the Midi kit's stated range of 3e07 cells; the paragraph does not say whether larger samples were split over several preparations.`,
      `The cell ranges are printed in two styles ("5e6–3e07" and "5 × 106", the latter with its superscript lost).`,
    ],
    sources: ['m-screen-cisplatin-p1'],
    prereqs: ['D4'],
    checks: [
      { q: `Why does the workflow start by isolating genomic DNA (gDNA) from the collected cells?`,
        options: [
          { t: `The pgRNA sequences carried by each cell are part of its DNA, so the DNA is the starting material for counting the guides by PCR and sequencing`, ok: true, why: `Right: the screen's read-out is how often each pgRNA sequence is present, and the next paragraph amplifies and sequences it starting from the gDNA.` },
          { t: `To measure how much RNA each lncRNA makes`, ok: false, why: `RNA is not isolated here. A pooled screen counts guide sequences in DNA; it does not measure RNA levels.` },
          { t: `To check that the cells still express Cas9`, ok: false, why: `The gDNA is used to count guide sequences, not to test Cas9 expression.` },
        ],
        source: ['m-gdna-p1'] },
    ],
  },

  'm-gdna-p2': {
    plain: `<p>For the PCR, the gDNA was divided into 100 µL reactions, so that each well held at most 4 µg of gDNA. Each reaction contained the gDNA (plus water), a PCR master mix, 5 µL of the forward universal primer and 5 µL of a uniquely barcoded P7 primer (both from 10 µM stocks). The PCR ran for 22 cycles, with an initial 2 min at 95 °C and a final 5 min extension at 72 °C (the per-cycle temperatures and times are printed in the paragraph). The forward and reverse oligos for the PCR and NGS of the library are listed in Table S3 (not in your PDF).</p><p>The PCR products were purified with AMPure XP SPRI beads and quantified with a Qubit kit (catalog details omitted — see the PAPER box). The samples were sequenced on an Illumina HiSeq2000 with paired-end 150 bp reads, at a coverage of 40M reads per sample.</p>`,
    why: `This step turns "which guides are in the cells" into countable DNA. In general: primers that match the constant parts of the guide cassette copy it out of the whole genomic DNA; each sample gets its own barcode, so many samples can be sequenced together and sorted apart afterwards; the DNA is spread over many reactions with a cap of 4 µg each, because too much DNA in one tube hurts a PCR and because spreading it keeps the DNA of all the cells represented (a cell holds only a few picograms of DNA, so millions of cells need many reactions); and a modest 22 cycles limits PCR bias. Sequencing 40M reads per sample gives, by my arithmetic, about 3,300 reads per library sequence on average (40M divided by 12,000), enough to count each guide.`,
    memory: `A name tag on every sample: one mixed sequencing run can be sorted back into samples afterwards.`,
    flags: [
      `The paragraph does not say whether all the gDNA of a sample was amplified, or how many reactions each sample needed.`,
      `"Coverage" is used here for sequencing depth (40M reads per sample). Elsewhere in the same Methods it means colonies per library sequence (66.7X) or cells per library sequence (more than 1,000x).`,
      `NGS primers are said to be in Table S3; the key resources table says "NGS sequencing primers (see Table S2 for sequences)". The supplement is not in your PDF.`,
    ],
    sources: ['m-library-design-p5', 'm-library-cloning-p2', 'm-screens-p1', 'krt-39'],
    derived: ['3300'],
    prereqs: ['D4'],
    checks: [
      { q: `Why was a "uniquely barcoded P7 primer" used for each sample?`,
        options: [
          { t: `The barcode tags every read with its sample, so many samples can be pooled in one sequencing run and sorted apart afterwards`, ok: true, why: `Right: a unique barcode per sample lets the reads be assigned back to the sample they came from.` },
          { t: `The barcode switches on the guide inside the cell`, ok: false, why: `The barcode is added to the DNA copies in a test tube, after the cells have been collected; it has no effect on the cells.` },
          { t: `The barcode counts how many cells were in the sample`, ok: false, why: `The barcode only labels the sample. Counts come from how many reads each pgRNA gets.` },
        ],
        source: ['m-gdna-p2'] },
    ],
  },

  /* ------------------------------------------------------------------ Screen hit identification and prioritization */
  'm-hits-p1': {
    plain: `<p>The raw sequencing reads of each individual screen were analyzed with CASPR (an analysis pipeline). CASPR was also used to monitor the quality of all the NGS experiments with several metrics. Overall, 36% of the reads were usable, and recombination events affected only a low rate of reads (typically below 3%).</p><p>After the mapping step (matching each read to its pgRNA), the counts per million (cpm) of each pgRNA were filtered with the rule printed as "3 &gt; cpm&gt;666" (see the flags). Low-scoring guides were removed with GuideScan, and a batch-effect correction was applied with MageckFlute. After all these corrections, the count table went back to CASPR, which calculated the log2 fold change and the FDR-corrected p-values at the level of the target (not of each single guide).</p>`,
    why: `This paragraph turns raw reads into a table of effects per target. In general, each step guards against a specific problem: quality monitoring shows whether the sequencing can be trusted; the count filter drops guides whose counts are too unreliable to use; removing low-scoring guides (GuideScan; the paragraph does not say what the score measures) drops guides judged unreliable; batch-effect correction removes differences caused only by how or when samples were processed; and calculating results "at a target level" combines all the guides aimed at one target into a single answer with an FDR-corrected p-value, which is what the hit lists need.`,
    memory: `Like marking exam scripts: discard unreadable pages, correct for the scanner's quirks, then give each student one mark rather than one mark per page.`,
    flags: [
      `The filter is printed as "3 &gt; cpm&gt;666". As written, no number can satisfy both conditions (it cannot be below 3 and above 666 at once). The authors probably meant that guides with very low (below 3) or very high (above 666) counts per million were removed, but the paragraph does not say so.`,
      `Several terms are left undefined: "usable" reads (only 36% of the reads were usable, and the paragraph does not say why the others were not), "recombination events" (typically below 3% of reads) and the score cutoff used by GuideScan. CASPR itself is not spelled out either.`,
    ],
    prereqs: ['D4', 'E1', 'E4'],
    checks: [
      { q: `At what level are the log2 fold changes and FDR-corrected p-values calculated at the end of this paragraph?`,
        options: [
          { t: `At the level of the target: the guides aimed at the same target are combined`, ok: true, why: `Right: the paragraph says CASPR calculated them "at a target level".` },
          { t: `For each single guide only`, ok: false, why: `Guide-level values exist (they are used in the replicate correlations), but the final values are at the target level.` },
          { t: `Once per screen, giving one number for the whole screen`, ok: false, why: `Each target gets its own values in each screen; that is what allows individual hits to be picked out.` },
        ],
        source: ['m-hits-p1'] },
    ],
  },

  'm-hits-p2': {
    plain: `<p>To check that replicates agree, the authors used CASPR's intermediate files, which give normalized read counts for each replicate of each sample. They calculated the Pearson correlation between replicates at three levels:</p><ul><li>the log2-transformed read counts of all pgRNAs that target lncRNA regions (guide level), leaving out the controls;</li><li>the log2-transformed fold change (log2FC) of each guide, as treatment sample ("trt") divided by control sample ("ctr");</li><li>the log2-transformed fold change at gene level.</li></ul><p>The gene-level log2FC (calculated separately for each replicate) was taken as the median of the log2FC values of all the pgRNAs (filtered as described) that target the same genomic region, following CASPR and MAGeCK's method, or alternatively as the average of the top 3 guides, as in previous studies. The log2FC values were also Z-score scaled, using the mean and SD of the neutral control pgRNAs.</p>`,
    why: `Replicate agreement is the basic quality check of a screen: if two independent replicates do not agree, the "hits" would be noise. In general, checking at three levels shows where agreement is lost: raw counts (does the library behave the same way?), guide-level fold changes (is each guide's effect reproducible?) and target-level fold changes (is each target's effect reproducible?). Leaving out the controls shows that the agreement is not driven only by the obvious control genes; the Results say the same (the correlations hold "even when considering lncRNA candidates alone"). The median of several guides is a robust summary, because one odd guide cannot pull it far; the top-3 average is an alternative that concentrates on the strongest guides. Z-scores express each effect in units of the spread (SD) of the neutral controls, i.e. how unusual it is compared with cutting a place that should do nothing.`,
    flags: [
      `The paragraph gives two ways to get the gene-level log2FC (the median of the guides, or the average of the top 3 guides) but does not say which was used for which analysis.`,
      `No correlation values or acceptance threshold are given here; the Results say only that the replicate correlations were high (res-multipheno-p3), and the supplementary figures are not in your PDF.`,
    ],
    prereqs: ['E1', 'D4', 'E2'],
    checks: [
      { q: `Why does the replicate-correlation analysis leave out the control pgRNAs?`,
        options: [
          { t: `So that the agreement shown is not driven only by the strong, expected effects of the controls and also holds for the lncRNA targets themselves`, ok: true, why: `Right: the Results say the correlations are observed "even when considering lncRNA candidates alone and omitting positive-control targets".` },
          { t: `Because the control pgRNAs were not sequenced`, ok: false, why: `The controls are in the same pool and are sequenced with everything else; the neutral controls are even used later to scale the fold changes (Z scores).` },
          { t: `Because controls have no replicates`, ok: false, why: `They are present in every replicate. The point is that strong controls could inflate the correlation, so the lncRNA targets are checked on their own.` },
        ],
        source: ['m-hits-p2', 'res-multipheno-p3'] },
    ],
  },

  'm-hits-p3': {
    plain: `<p>For each screen on its own, hits were chosen with two rules. In the positive screens (CFSE, death and migration), a hit needs FDR &lt; 0.2 and LFC &gt; 0 (a log2 fold change above zero). In the dropout and cisplatin screens, a hit needs FDR &lt; 0.2 and LFC &lt; 0 (below zero).</p>`,
    why: `Two conditions together define a hit. FDR &lt; 0.2 says the change is unlikely to be just chance (in general, about one in five of the hits in such a list is expected to be false, a permissive cutoff that suits a first candidate list that is validated afterwards). The sign of the LFC says the change goes in the direction that marks the target as promoting the phenotype. In general, in a dropout or survival screen the guides of a helpful gene become rarer, so the LFC is negative; in the positive screens the guides are enriched in the collected cells (slow-growing, dead or migration-impaired cells, according to the Figure 2 legends), so the LFC is positive. Without the sign condition, a target whose guides rise in a dropout screen would also pass the FDR rule although it points the opposite way.`,
    memory: `Two keys open the "hit" door: a small enough FDR and the right sign.`,
    flags: [
      `The paragraph does not say why FDR &lt; 0.2 was chosen. For comparison, the Methods say p ≤ 0.05 is the general significance level "unless otherwise specified" (m-quant-p3); the hit rule is a looser, specified threshold.`,
      `The paragraph uses "cisplatin screens" for the survival screen; the death screen is listed among the positive screens. It also does not state which populations are compared in each screen (for example which cells count as "treatment" and which as "control" for CFSE or migration), which is what gives the LFC its sign.`,
    ],
    sources: ['m-quant-p3', 'fig2A', 'fig2B', 'fig2C'],
    prereqs: ['D4', 'D5', 'E4'],
    checks: [
      { q: `In the migration screen a hit needs LFC &gt; 0 rather than LFC &lt; 0. Why?`,
        options: [
          { t: `Because migration is a positive screen: guides against migration-promoting lncRNAs become more common (enriched) in the collected migration-impaired cells`, ok: true, why: `Right: the paragraph lists migration with the positive screens, and the Figure 2C legend says migration-promoting lncRNAs are identified through pgRNA enrichment in migration-impaired cells.` },
          { t: `Because migration-promoting lncRNAs are depleted in the screen`, ok: false, why: `Depletion (a negative LFC) is the signature of dropout and survival screens, not of the positive screens.` },
          { t: `Because FDR &lt; 0.2 already fixes the direction of the change`, ok: false, why: `The FDR says how likely a change is to be chance, not in which direction it goes; the sign of the LFC is a separate condition.` },
        ],
        source: ['m-hits-p3', 'fig2C'] },
    ],
  },

  'm-hits-p4': {
    plain: `<p>To combine several screens, the authors designed an integrative target prioritization pipeline (TPP). It uses two approaches in parallel. The first is Robust Rank Aggregation (RRA), which computes a ranking based on effect size (the CASPR log2FC) across the screens. The second is an empirical adaptation of Brown's method (EBM), which combines the significance values (the CASPR p-values) of each candidate across the screens.</p><p>The RRA scores were converted to exact p-values with the rho-score correction from the same R package. The harmonic mean p-value (HMP) was then calculated from the two significance scores, one from RRA and one from EBM. These p-values were corrected for multiple hypothesis testing with the Benjamini &amp; Hochberg method, and a cutoff of FDR &lt; 0.2 was used to define hits. The code is available at https://doi.org/10.5281/zenodo.6912510.</p>`,
    why: `One screen gives one list of effects, but the paper has several screens (dropout, CFSE, cisplatin survival and death, migration) and wants one ranking of targets. The Results say the TPP was built "to combine diverse screen results while balancing effect size and significance". In general, a target that is strong in several screens and statistically solid is more convincing than one that is strong in a single screen or only barely significant. So RRA ranks targets by effect size (log2FC) and EBM combines the p-values. The titles of the cited papers speak of combining dependent p-values (ref-103) and of the harmonic mean p-value for combining dependent tests (ref-104), which would fit screens run on the same cells and library (my reading; this paragraph does not state why these methods were chosen). The HMP merges the two scores into one p-value per target, and the Benjamini &amp; Hochberg method controls the false discovery rate across all targets.`,
    memory: `Two judges (how big, how sure), one verdict (the HMP), then a strictness check across all targets (Benjamini &amp; Hochberg).`,
    flags: [
      `The code address printed here is "zenodo.6912510" (the key resources table gives the same), but the data-availability paragraph (m-data-p2) says "Zenodo: 6912511". The paper does not say which is right.`,
      `"The same R package" is not named: the paragraph does not say which package it means. No citation numbers are printed in this paragraph either; the reference list contains papers with matching titles for RRA (ref-102), EBM (ref-103) and HMP (ref-104).`,
      `The paragraph does not say how screens whose hits point in opposite directions (negative LFC in the dropout and cisplatin screens, positive LFC in the CFSE, death and migration screens; see m-hits-p3) are put on a common footing before the effect-size ranking.`,
      `The Results say the TPP can be run on all screens ("pan-hallmark") or per hallmark ("hallmark-specific") and refer to the STAR Methods (res-integration-p1), but this paragraph does not describe the two versions separately, nor how the two scores are weighted in the HMP.`,
    ],
    sources: ['m-data-p2', 'krt-45'],
    prereqs: ['E1', 'E4', 'E5'],
    checks: [
      { q: `Why does the TPP run RRA (on effect size) and EBM (on p-values) in parallel and then combine them?`,
        options: [
          { t: `To balance how big an effect is (RRA, based on log2FC) with how statistically reliable it is (EBM, based on p-values) in one ranking of targets`, ok: true, why: `Right: the paragraph says RRA ranks by effect size and EBM combines significance values; the HMP then merges the two scores.` },
          { t: `Because RRA is used for dropout screens and EBM for positive screens`, ok: false, why: `Both are applied across screens; the paragraph does not split them by screen type.` },
          { t: `So that the same data are analyzed twice to double the number of hits`, ok: false, why: `The two scores are merged into one (the harmonic mean p-value) and then corrected for multiple testing; the aim is a balanced ranking, not more hits.` },
        ],
        source: ['m-hits-p4', 'res-integration-p1'] },
    ],
  },

  'm-hits-p5': {
    plain: `<p>To judge how good the final ranking was, the authors used the enrichment scores and nominal p-values (from a GSEA simulation, n = 10,000) of the positive-control and neutral-control genes, and also the fraction of detected genes that had previously been linked to lung cancer.</p><p>The positive-control and neutral-control genes were also used as "true positives/false negatives" and "false positives/true negatives", respectively, to calculate Receiver Operating Characteristics (ROC) curves and related statistics.</p>`,
    why: `A ranking is only useful if it puts known "real" things near the top and known "nothing" things away from the top, and the controls were built into the library for this purpose. In general, a GSEA-type enrichment score asks whether the positive controls pile up at the top of the ranked list more than chance would allow (the nominal p-value is estimated by repeated random shuffling; here the paper gives n = 10,000), while neutral controls should not pile up there. Using controls as an answer key turns the ranking into a classification test: positives that the ranking finds are true positives, positives it misses are false negatives, neutral controls it wrongly calls are false positives, and neutral controls it leaves alone are true negatives. The ROC curve and its AUC summarize that trade-off. The Results use this to claim that the pan-hallmark ranking "outperforms common integration methods and individual screens in correctly classifying positive and neutral controls".`,
    flags: [
      `"GSEA simulation, n = 10,000" is not explained: the paragraph does not say what n counts (in general, the number of random permutations used to estimate the p-value).`,
      `The paragraph names "the fraction of detected genes previously linked to lung cancer" as a quality indicator but gives no value or source for that gene list here.`,
      `Only positive and neutral controls are used here. The negative protein-coding gene controls (genes that oppose growth; m-library-design-p3) are not mentioned.`,
    ],
    prereqs: ['D5', 'E4', 'D10'],
    checks: [
      { q: `Why are the neutral control genes used as "false positives/true negatives" when ROC curves are drawn?`,
        options: [
          { t: `Because they are not expected to affect the phenotype, so calling one of them a hit counts as an error (a false positive) and not calling it is correct (a true negative)`, ok: true, why: `Right: neutral controls are the "nothing should happen here" set, which is what a ranking is tested against.` },
          { t: `Because they are the genes known to promote lung cancer`, ok: false, why: `That describes positive controls, which are treated as the "true positives/false negatives".` },
          { t: `Because their guides cut the DNA more efficiently than other guides`, ok: false, why: `Cutting efficiency has nothing to do with this role. Neutral controls are chosen for being expected to have no effect on the phenotype.` },
        ],
        source: ['m-hits-p5'] },
    ],
  },

  'm-hits-p6': {
    plain: `<p>Statistics and figures were made with R software, version 4.1.2, and these add-on R packages (the paragraph gives a version number for each): ggplot2, ggpubr, ggtern, ggrepel, ggbeeswarm, GGally, Gmedian, GSEABase, clusterProfiler, harmonicmeanp, metap, Hmisc, precrec, MASS, car, eulerr, SuperExactTest, UpSetR and metaRNASeq.</p>`,
    why: `This is a reproducibility statement: with the exact R and package versions, another person can rerun the analysis and get the same numbers. In general, the package names hint at what was done: ggplot2, ggpubr, ggbeeswarm and ggrepel for plots, ggtern for ternary plots, UpSetR for UpSet plots, eulerr and SuperExactTest for set overlaps, precrec for ROC curves, clusterProfiler and GSEABase for enrichment, and harmonicmeanp and metap for combining p-values (these purposes are general knowledge about the packages, not stated in the paragraph).`,
    flags: [
      `The Methods mention more software elsewhere: m-quant-p1 lists three R versions (3.5.3, 4.0.0 and 4.1.2) and extra packages, and the library-cloning paragraph names R version 3.5.3. This paragraph gives only 4.1.2, and the paper does not say which analysis used which version or package.`,
    ],
    sources: ['m-quant-p1'],
    prereqs: ['E1', 'F2'],
    checks: [
      { q: `What does this paragraph mainly tell you?`,
        options: [
          { t: `Which software produced the statistics and figures, so that the analysis can be reproduced`, ok: true, why: `Right: it names R and the packages with version numbers.` },
          { t: `Which statistical test was used for each figure panel`, ok: false, why: `The paragraph names software, not tests. The Methods say that the tests for individual experiments are given in the figure legends (m-quant-p3).` },
          { t: `Which screen hits were selected`, ok: false, why: `Hit selection is described in the earlier paragraphs of this section; this paragraph only lists tools.` },
        ],
        source: ['m-hits-p6', 'm-quant-p3'] },
    ],
  },
});

/* ---------------------------------------------------------------------- unit intros and recaps */
Object.assign(window.TRACKG.units, {
  'm-lead-contact': {
    intro: `<p>A one-sentence statement of who to contact about the study. It is not science, but journals that use the STAR Methods format ask for it.</p>`,
    recap: `<p>One named person, Dr. Rory Johnson, handles questions and requests for resources and reagents.</p>`,
  },
  'm-materials': {
    intro: `<p>A short statement on whether the authors' own plasmids and cell lines can be shared, and how to ask for them.</p>`,
    recap: `<p>Plasmids and cell lines made in the study can be requested from the corresponding author, R.J. The same paragraph says the study made no new unique reagents; read the two sentences together.</p>`,
  },
  'm-data': {
    intro: `<p>Where the data and code behind the paper are stored so that others can check and reuse them: data in GEO, the TPP code in Zenodo, and anything else from the lead contact.</p>`,
    recap: `<p>Data are in GEO (GSE207229); the code of the target prioritization pipeline is at Zenodo (6912511 here, while the hit-identification paragraph prints a different last digit). Anything else needed to re-analyze the data is available from the lead contact.</p>`,
  },
  'm-expmodel': {
    intro: `<p>The "who and what" of the experiments: which human cell lines were used and where they came from, how they were grown and kept, and the ethics approvals for the mouse and patient work.</p>`,
    recap: `<p>Seven human cell lines (lung cancer lines, normal lung cells and HEK293T for making virus) were authenticated and tested for mycoplasma, grown in their own media at 37 °C with 5% CO2, and passed every 2-3 days. The mouse and patient work was approved by Bern committees, with written informed consent from patients.</p>`,
  },
  'm-lentivirus': {
    intro: `<p>How lentivirus is made in HEK293T cells and used to build A549 and H460 cell lines that permanently carry Cas9. Cas9 has to be in the cells before the guides arrive.</p>`,
    recap: `<p>HEK293T cells made Cas9 virus from three plasmids; the virus was concentrated 100-fold and frozen. A549 and H460 cells were infected, selected with blasticidin and sorted twice for BFP, giving at least 60% BFP-positive Cas9 cells.</p>`,
  },
  'm-decko': {
    intro: `<p>Three short statements about the DECKO plasmids that carry the paired guides: where the protocol is described, where the validation guides are listed, and how the virus and the selection work.</p>`,
    recap: `<p>The paper points to an earlier protocol for DECKO design and cloning, lists the validation pgRNAs in Data S4 (not in your PDF), and selects infected cells with puromycin (2 µg/mL) for at least three days.</p>`,
  },
  'm-library-design': {
    intro: `<p>How the library of 12,000 sequences was designed: a complete list of lncRNAs is built and filtered down to expressed lncRNAs with well-supported start sites, control targets are added, and 10 pgRNAs are designed per target.</p>`,
    recap: `<p>Four annotations were merged and filtered (no TSS near protein-coding exons, FPKM of at least 0.1, TSSs within 300 bp clustered, ranking by evidence). Neutral and gene controls were added, 10 pgRNAs per target were designed by relaxing the off-target rules step by step, and the final design had 12,000 sequences.</p>`,
  },
  'm-library-cloning': {
    intro: `<p>How the synthesized pool of 12,000 sequences became a plasmid library: copy it, insert it into the pDECKO plasmid in two steps, and check that it is complete and even.</p>`,
    recap: `<p>The oligo pool was amplified by PCR, cloned in two steps and grown in bacteria (coverage 66.7X). The finished library was checked by colony PCR, Sanger sequencing and NGS, with a Lorenz curve and a Gini coefficient summarizing how even the pool is.</p>`,
  },
  'm-titer': {
    intro: `<p>How the authors made sure that only a minority of cells received a virus: they titrated the virus to reach an MOI of 0.3, then infected a large batch of cells and selected it with puromycin.</p>`,
    recap: `<p>A titration in A549 and H460 cells set the amount of virus for an MOI of 0.3 (cells surviving puromycin divided by cells without puromycin). For the screens, 120M cells were infected and kept in puromycin for six days.</p>`,
  },
  'm-screens': {
    intro: `<p>How the cells were grown and collected in each screen: the T0 reference, the dropout and CFSE proliferation screens, the cisplatin survival and death screens, and the migration screen.</p>`,
    recap: `<p>All screens start from a T0 reference (16M cells, coverage above 1,000x). Proliferation was read as dropout at 14 and 21 days and by CFSE sorting; cisplatin as survival (IC30, IC80) and death (IC20) screens; migration as cells that did or did not cross a membrane in 48 h.</p>`,
  },
  'm-gdna': {
    intro: `<p>How the guide sequences are read out from the collected cells: purify the genomic DNA, copy the guide region by PCR with a barcode for each sample, and sequence it.</p>`,
    recap: `<p>gDNA was extracted with Midi or Mini kits, amplified in 100 µL PCR reactions of at most 4 µg each (22 cycles, barcoded primers), cleaned, quantified and sequenced on an Illumina HiSeq2000 at 40M reads per sample.</p>`,
  },
  'm-hits': {
    intro: `<p>How counts become a list of hits: quality control and filtering with CASPR, replicate correlation, the rule for hits in each single screen, the TPP that combines screens, and the checks on the quality of the ranking.</p>`,
    recap: `<p>Reads were mapped and filtered, and fold changes and FDRs were computed per target. Single-screen hits need FDR below 0.2 and the right sign of the LFC. The TPP combined effect size (RRA) and significance (EBM) into one harmonic mean p-value, adjusted with Benjamini &amp; Hochberg (FDR below 0.2 defines hits). Controls were used to judge the ranking (GSEA, ROC). Several details are left vague; see the flags.</p>`,
  },
});
