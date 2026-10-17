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
