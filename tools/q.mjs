// Query helper for content authors.
//   node tools/q.mjs show <id> [<id>…]      print the verbatim text of paragraphs / panel legends / refs
//   node tools/q.mjs unit <unit-id>         print every paragraph of a reading unit (e.g. res-aso, m-screens)
//   node tools/q.mjs panel <fig2G>          legend + figure notes + paragraphs that cite the panel + image path
//   node tools/q.mjs find <words…>          search paragraphs and legends (all words must occur)
//   node tools/q.mjs lesson <B7>            plan entry for a lesson + terms taught here + terms you may use (taught earlier)
//   node tools/q.mjs term <id|word>         plan entry of a glossary term (home lesson, aliases)
//   node tools/q.mjs units                  list reading units with their paragraph IDs
//   node tools/q.mjs path                   the recommended path
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = JSON.parse(fs.readFileSync(path.join(ROOT, 'extraction', 'paper.json'), 'utf8'));
const PLAN = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'plan.json'), 'utf8'));
const [cmd, ...rest] = process.argv.slice(2);
const para = {}; P.blocks.forEach((b) => { if (b.type !== 'figure' && b.text !== undefined) para[b.id] = b; });
const secTitle = Object.fromEntries(P.sections.map((s) => [s.id, s.title]));
const panels = {}; P.figures.forEach((f) => f.panels.forEach((p) => (panels[p.id] = { f, p })));
const citing = {};
P.blocks.forEach((b) => { for (const m of (b.html || '').matchAll(/data-fig="(fig\d)" data-panels="([A-L]*)"/g)) { const f = P.figures.find((x) => x.id === m[1]); if (!f) continue; (m[2] ? m[2].split('') : f.panels.map((p) => p.letter)).forEach((L) => ((citing[m[1] + L] = citing[m[1] + L] || new Set()).add(b.id))); } });
const unitOf = (sec) => { const s = P.sections.find((x) => x.id === sec); return s && s.level === 4 ? s.parent : sec; };
const out = (s) => console.log(s);
const clip = (s, n) => (s.length > n ? s.slice(0, n) + '…' : s);
if (cmd === 'show') {
  rest.forEach((id) => {
    if (para[id]) out(`[${id}] (${secTitle[para[id].sec]}, p.${para[id].printed.join('–')})\n${para[id].text}\n`);
    else if (panels[id]) out(`[${id}] legend: ${panels[id].p.legend}\n`);
    else if (/^ref-\d+$/.test(id)) out(`[${id}] ${P.references[+id.slice(4) - 1].text}\n`);
    else out(`[${id}] NOT FOUND`);
  });
} else if (cmd === 'unit') {
  rest.forEach((u) => {
    out(`=== unit ${u}: ${secTitle[u]} ===`);
    P.blocks.forEach((b) => { if (b.type !== 'figure' && b.text !== undefined && unitOf(b.sec) === u && !/^h\d$|^title$/.test(b.type)) out(`[${b.id}] ${b.text}\n`); });
    const figs = P.blocks.filter((b) => b.type === 'figure' && unitOf(b.sec) === u).map((b) => b.fig);
    if (figs.length) out(`(figures shown in this unit: ${figs.join(', ')})`);
  });
} else if (cmd === 'panel') {
  rest.forEach((id) => {
    const x = panels[id];
    if (!x) { out(`[${id}] NOT FOUND`); return; }
    out(`=== ${id} — Figure ${x.f.num}: ${x.f.title}\nIMAGE: app/img/panels/${id}.webp (view it with the Read tool)   whole figure: app/img/figures/${x.f.id}.webp\nLEGEND: ${x.p.legend}\nFIGURE NOTES: ${x.f.notes.map((n) => n.text).join(' | ') || '(none)'}\nOTHER PANELS: ${x.f.panels.map((p) => p.letter).join(' ')}\nPARAGRAPHS THAT CITE IT:`);
    [...(citing[id] || [])].forEach((pid) => out(`  [${pid}] ${para[pid].text}`));
    out('');
  });
} else if (cmd === 'find') {
  const words = rest.map((w) => w.toLowerCase());
  let n = 0;
  P.blocks.forEach((b) => { if (b.type !== 'figure' && b.text && words.every((w) => b.text.toLowerCase().includes(w))) { n++; out(`[${b.id}] ${clip(b.text, 220)}`); } });
  Object.entries(panels).forEach(([id, { p }]) => { if (words.every((w) => p.legend.toLowerCase().includes(w))) { n++; out(`[${id}] (legend) ${clip(p.legend, 220)}`); } });
  out(`${n} match(es)`);
} else if (cmd === 'lesson') {
  const id = rest[0];
  const l = PLAN.lessons.find((x) => x.id === id);
  if (!l) { out('unknown lesson'); process.exit(1); }
  const pos = PLAN.path.indexOf(id);
  const terms = PLAN.terms;
  out(`LESSON ${l.id} — ${l.title} (${l.minutes} min, track ${l.track}, path position ${pos + 1}/${PLAN.path.length})\nGOAL: ${l.goal}\nPREREQS: ${l.prereqs.join(', ') || '—'}`);
  out('TERMS TAUGHT HERE (write glossary entries for these; you may use them in this lesson):');
  terms.filter((t) => t.taughtIn === id).forEach((t) => out(`  - ${t.id}: ${t.term}  [${t.kind}; matches: ${t.aliases.join(', ')}]`));
  const avail = terms.filter((t) => PLAN.path.indexOf(t.taughtIn) >= 0 && PLAN.path.indexOf(t.taughtIn) < pos);
  out(`TERMS YOU MAY ALREADY USE (${avail.length}, taught earlier on the path):\n  ${avail.map((t) => t.term).join('; ')}`);
  const later = terms.filter((t) => PLAN.path.indexOf(t.taughtIn) > pos);
  out(`TERMS YOU MUST NOT USE (${later.length}, taught later) unless you explain them inline and list them in \`defines\`. A sample of the risky ones:\n  ${later.slice(0, 400).map((t) => t.aliases.concat([t.term]).filter((a) => a.length < 28)[0] || t.term).join('; ')}`);
} else if (cmd === 'term') {
  const q = rest.join(' ').toLowerCase();
  PLAN.terms.filter((t) => t.id === q || t.term.toLowerCase().includes(q) || t.aliases.some((a) => a.toLowerCase() === q)).forEach((t) => out(`${t.id}: ${t.term} | home ${t.taughtIn} | ${t.kind} | ${t.cat} | matches: ${t.aliases.join(', ')}`));
} else if (cmd === 'units') {
  const ids = {};
  P.blocks.forEach((b) => { if (b.type !== 'figure' && /-p\d+$/.test(b.id)) (ids[unitOf(b.sec)] = ids[unitOf(b.sec)] || []).push(b.id); });
  Object.entries(ids).forEach(([u, l]) => out(`${u} (${secTitle[u]}): ${l.join(' ')}`));
} else if (cmd === 'path') {
  out(PLAN.path.map((s, i) => `${i + 1}. ${s}`).join('\n'));
} else out('usage: node tools/q.mjs show|unit|panel|find|lesson|term|units|path …');
