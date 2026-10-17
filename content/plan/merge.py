"""Lean curriculum. The fine-grained lessons in track_*.py (101 of them) are merged into 41 lessons of 8-10 minutes.
Each MERGES row: (new id, title, minutes, one-sentence goal, [old lesson ids merged, in teaching order]).
The terms, notes and prerequisites of the old lessons are carried over; every term's home lesson becomes the new lesson."""

MERGES = [
 ('A1', 'The whole study as a story, and its map', 8, 'Follow the whole paper from question to answer in plain words, and see the pipeline as one picture.', ['A1', 'A2']),
 ('A2', 'The funnel: 831 → 80 → 9 → 5 → 2', 6, 'Understand how 831 lncRNAs were narrowed to 80 hits, nine candidates, five reproducible ones and the final two (CHiLL1 and GCAWKR).', ['A3']),
 ('A3', 'Why it matters, and the cast of names', 8, 'Say why lung cancer, long noncoding RNAs and ASO medicines make this study worthwhile, and meet the names that keep reappearing.', ['A4', 'A5']),

 ('B1', 'Cells, the cell cycle and cell death', 10, 'Know what a cell is, how it grows and divides in a cycle, and how it dies (apoptosis vs necrosis).', ['B1', 'B2', 'B3']),
 ('B2', 'DNA, chromosomes, genes and the genome', 9, 'Explain DNA, bases and base pairing, and how genes sit on chromosomes inside a genome.', ['B4', 'B5']),
 ('B3', 'Genome coordinates, genome versions and strands', 8, 'Read a genome address (chromosome, position, strand), and know why genome versions (hg19 vs hg38) matter.', ['B6']),
 ('B4', 'From DNA to RNA: transcription, the TSS, exons and splicing', 10, 'Follow a gene being copied into RNA: promoter, transcription start site (TSS), exons, introns, splicing and isoforms.', ['B7', 'B8']),
 ('B5', 'Proteins, and coding vs noncoding RNA', 9, 'Explain how mRNA becomes protein, what an open reading frame is, and what makes an RNA "noncoding".', ['B9', 'B10']),
 ('B6', 'Long noncoding RNAs, and where RNAs live', 10, 'Say what lncRNAs are, how they might work, and why nucleus vs cytoplasm location is a clue to function.', ['B11', 'B12']),
 ('B7', 'Gene catalogs and gene expression', 10, 'Understand gene annotations (GENCODE, FANTOM CAT, BIGTranscriptome) and what "expressed", "up" and "down" mean.', ['B13', 'B14']),
 ('B8', 'Switches on the DNA and finding where a gene starts', 9, 'Know enhancers, transcription factors and chromatin, and the CAGE / DNase I / ChromHMM evidence used to locate a start site.', ['B15', 'B16']),

 ('C1', 'What is cancer? Hallmarks, oncogenes and tumor suppressors', 10, 'Explain cancer, its hallmarks, and the accelerator/brake idea of oncogenes and tumor suppressors.', ['C1', 'C2', 'C3']),
 ('C2', 'Mutations, copy number, lung cancer, KRAS and EGFR', 10, 'Know mutations and copy-number changes, the main kinds of lung cancer (NSCLC), and KRAS / EGFR.', ['C4', 'C5', 'C6']),
 ('C3', 'Chemotherapy, cisplatin and drug resistance', 8, 'Explain cisplatin, drug resistance, dose-response and IC20 / IC30 / IC80.', ['C7']),
 ('C4', 'Cell lines vs normal lung cells', 9, 'Know the cell lines in the paper (A549, H460, H441 ...) and the normal cells used as comparison, and why models matter.', ['C8']),
 ('C5', '2D, 3D, organoids and mouse models (PDX)', 9, 'Compare growing cells flat (2D), as spheroids/organoids (3D) and as patient-derived xenografts in mice.', ['C9', 'C10']),
 ('C6', 'Patient data collections, and tumor vs normal', 9, 'Know TCGA, TANRIC, PCAWG, CCLE and GEO, and what "tumor vs normal", survival and subtype comparisons mean.', ['C11', 'C12']),

 ('D1', 'CRISPR and paired-guide deletion (DECKO)', 10, 'Explain CRISPR-Cas9, guide RNAs, why the paper deletes the TSS with paired guides (DECKO), and how CRISPRi / Cas13 differ.', ['D1', 'D2', 'D3']),
 ('D2', 'Delivering CRISPR: plasmids, lentivirus, MOI and selection', 10, 'Explain how guides get into cells with lentivirus, why MOI 0.3, antibiotic selection, and fluorescent proteins.', ['D4', 'D5', 'D6']),
 ('D3', 'Flow cytometry, pooled screens and libraries', 10, 'Understand flow cytometry/FACS, what a pooled screen is, and library size, guides per target and coverage.', ['D7', 'D8', 'D9']),
 ('D4', 'From cells to counts, dropout and positive selection', 10, 'Follow DNA from screened cells to read counts, and tell dropout from positive selection.', ['D10', 'D11']),
 ('D5', 'The three screens and their controls', 10, 'Know the proliferation, cisplatin and migration screens, and the neutral / positive controls and ORF vs TSS guides.', ['D12', 'D13', 'D14', 'D15']),
 ('D6', 'ASOs: switching off an RNA, and using them well', 10, 'Explain how ASOs lower an RNA, and why two ASOs per target, a non-targeting control and knockdown % matter.', ['D16', 'D17']),
 ('D7', 'Checking the work: gels, qRT-PCR and the competition assay', 9, 'Read a genotyping gel, understand qRT-PCR with a housekeeping gene, and the competition assay.', ['D18', 'D19', 'D20']),
 ('D8', 'Cell assays: viability, Annexin V, cell cycle, migration', 10, 'Know what CellTiter-Glo, Annexin V, DAPI / Ki-67 and crystal violet each measure.', ['D21', 'D22', 'D23', 'D24']),
 ('D9', 'Where is it, and does it matter? FISH, fractionation, rescue', 9, 'Understand RNA-FISH, nuclear vs cytoplasmic fractionation, and overexpression / rescue experiments.', ['D25', 'D26', 'D27']),
 ('D10', 'RNA-seq, counting fairly and pathway enrichment', 10, 'Understand RNA-seq and differentially expressed genes, CPM / TPM / FPKM, and how enrichment analysis finds pathways.', ['D28', 'E1', 'D29']),
 ('D11', 'What the named pathways do', 8, 'Say in one or two sentences what each pathway named in the paper (p53, MAPK, PI3K-Akt, mTORC1 ...) is about.', ['D30']),

 ('E1', 'Fold change, log2, replicates and error bars', 10, 'Compute and read fold change and log2; know replicates, mean, median, SD, error bars and sample size n.', ['E2', 'E3']),
 ('E2', 'Correlation, z-scores and p-values', 10, 'Read a correlation line, a z-score, and a p-value (what "significant" and "ns" mean, scientific notation).', ['E4', 'E5', 'E6']),
 ('E3', 'Choosing a test: t-tests, rank tests, overlap tests', 10, 'Tell one- from two-tailed tests, Student vs Welch t tests, Wilcoxon / Mann-Whitney / Kruskal-Wallis, and Fisher / hypergeometric overlap tests.', ['E7', 'E8', 'E9']),
 ('E4', 'Many tests at once (FDR), and ROC / AUC', 10, 'Understand multiple testing and FDR (why FDR < 0.2), and ROC curves with AUC.', ['E10', 'E11']),
 ('E5', 'Combining screens, and decoding the legends', 10, 'Understand rank aggregation, Brown\'s method and the harmonic-mean p-value (TPP), and decode real legend statistics.', ['E12', 'E13']),

 ('F1', 'Bars, boxes, scatter plots and time courses', 9, 'Read bar charts with error bars, box and violin plots, scatter plots with a regression line, and time courses.', ['F1', 'F2', 'F3', 'F7']),
 ('F2', 'Contour, volcano, heatmap, ROC, ternary, UpSet and stacked plots', 10, 'Read the less common plots in the paper, each practised on a real panel.', ['F4', 'F5', 'F6', 'F8', 'F9', 'F10', 'F11']),
 ('F3', 'Genome tracks, gels, flow plots and microscopy', 10, 'Read genome-browser tracks, DNA gels, flow-cytometry plots and microscopy / FISH images.', ['F12', 'F13', 'F14', 'F15']),
 ('F4', 'The small print: n, error bars, P labels and "ns"', 7, 'Know what to check in every legend, and what the paper\'s legends leave unsaid.', ['F16']),

 ('H1', 'The paper\'s logic chain, and every control', 10, 'Chain each claim to its evidence and figure panel, and say what every control rules out.', ['H1', 'H2']),
 ('H2', 'DNA vs RNA effects, off-targets and cell-line effects', 10, 'Explain why ASOs were needed after CRISPR, how off-target effects are handled, and what cell-line specificity means.', ['H3', 'H4', 'H5']),
 ('H3', 'The limitations, the patent and the conflict of interest', 9, 'Read the limitations line by line, and know what the declared patent and conflict of interest mean.', ['H6', 'H7']),
 ('H4', 'Strengthening experiments, strengths vs weaknesses', 9, 'Suggest experiments that would strengthen the work and give a balanced strengths-vs-weaknesses answer.', ['H8', 'H9']),
]

PATH = (['A1', 'A2', 'A3'] + [f'B{i}' for i in range(1, 9)] + [f'C{i}' for i in range(1, 7)] +
        ['D1', 'D2', 'E1', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'E2', 'E3', 'E4', 'E5', 'D10', 'D11'] +
        [f'F{i}' for i in range(1, 5)] + ['G-main', 'G-back', 'G-methods'] + [f'H{i}' for i in range(1, 5)])


def apply(old):
    byid = {l['id']: l for l in old}
    old2new = {}
    for nid, _t, _m, _g, olds in MERGES:
        for o in olds:
            assert o in byid and o not in old2new, o
            old2new[o] = nid
    assert set(old2new) == set(byid), set(byid) ^ set(old2new)
    pos = {x: i for i, x in enumerate(PATH)}
    out = []
    for nid, title, minutes, goal, olds in MERGES:
        teaches, notes, pre = [], [], []
        for o in olds:
            l = byid[o]
            for t in l['teaches']:
                t = dict(t)
                t['taughtIn'] = nid
                teaches.append(t)
            if l.get('notes'):
                notes.append(f"[{o}] {l['notes']}")
            for p in l['prereqs']:
                q = old2new[p]
                if q != nid and q not in pre and pos[q] < pos[nid]:
                    pre.append(q)
        out.append({'id': nid, 'track': nid[0], 'title': title, 'minutes': minutes, 'prereqs': pre, 'goal': goal,
                    'teaches': teaches, 'notes': (' '.join(notes) + f" (Merged from the fine-grained lessons {', '.join(olds)}.)").strip()})
    out.sort(key=lambda l: pos[l['id']])
    return out, old2new
