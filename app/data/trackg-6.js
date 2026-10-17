window.TRACKG = window.TRACKG || { paras: {}, units: {} };
/* Track G: the key resources table (no paragraphs, only an introduction and a recap). */
Object.assign(window.TRACKG.units, {
  'm-krt': {
    intro: `<p>The key resources table is a shopping-and-software list. It names, in groups, everything the authors used: plasmids and viruses, chemicals, commercial kits, deposited data, cell lines, mice, DNA oligonucleotides (the guide library and the ASOs), software, and a few instruments. You do not need to memorize it. Use it when a Methods paragraph mentions a tool and you want to know which one, and to see which data sets the paper shares.</p>`,
    recap: `<p>The table groups the resources into nine headings. The rows that matter most for understanding the paper are the cell lines (A549, H460, the normal lung cells), the NSG mice used for the patient-derived models, the guide library (LibDECKO-NSCLC1) and ASOs, and the two data sets "This paper" deposited (the CRISPR screens and the RNA-seq after ASO treatment). Other authors' notes elsewhere in the app flag where the accession numbers and table names printed here differ from the Methods text.</p>`,
  },
});
