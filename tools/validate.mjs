// Validation script for the study app's content.
//
//   node tools/validate.mjs                    # check everything that exists (no minimum-count checks)
//   node tools/validate.mjs --scope AH,B1      # only entries that live in lessons-AH/B1 + glossary-AH/B1 (authors' self-check)
//   node tools/validate.mjs --files trackg-3,panels-fig2
//   node tools/validate.mjs --final            # everything + completeness/minimum counts (used before release)
//   add --warn to also print warnings, --quiet to print only the summary
//
// FAILS (exit 1) when:
//  * a paper-specific fact has no valid source ID (paragraph / panel / figure / reference / table-row id)
//  * a number in a card / answer / explanation does not appear in its cited sources (see "numbers" below)
//  * a verbatim quote is not an exact substring of the cited paper text
//  * a lesson (or glossary entry / card / G paragraph) uses a glossary term before it is taught
//  * a figure panel is missing its image, legend, guide or transcribed figure text
//  * a referenced file / lesson / term / panel / route does not exist, or an SVG/HTML snippet is malformed
//
// Numbers: digits are compared as values (1,000 = 1000; 1.2 × 10⁻⁷ = 1.2e-7; 0.05 = .05; sign-aware for negatives;
// number words one…twelve in the SOURCE count as digits). Identifiers such as A549, IC20, p53, Cas9, Fig. 4C are ignored.
// A block / card / question may list `derived: ['8']` for numbers that are intentionally computed rather than quoted.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const FLAG = (n) => args.includes('--' + n);
const OPT = (n) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : null; };
const FINAL = FLAG('final') || OPT('scope') === 'all';
const SHOW_WARN = FLAG('warn');
const QUIET = FLAG('quiet');
const scopeArg = OPT('scope') && OPT('scope') !== 'all' ? OPT('scope').split(',') : null;
const filesArg = OPT('files') ? OPT('files').split(',') : null;

// ------------------------------------------------------------------------------------------------ load data
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scriptSrcs = [...indexHtml.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]).filter((s) => s.startsWith('app/data/'));
const problems = []; // {level, file, where, msg}
const add = (level, file, where, msg) => problems.push({ level, file, where, msg });
const err = (file, where, msg) => add('error', file, where, msg);
const warn = (file, where, msg) => add('warn', file, where, msg);

const win = {};
const ctx = vm.createContext({ window: win, console, document: undefined });
const ARR_KEYS = ['GLOSSARY_CONTENT', 'LESSON_CONTENT', 'CARDS', 'QUIZZES', 'EXAMS', 'EXPLAIN', 'NUMBERS'];
const MAP_KEYS = ['PANELS', 'FIGTEXT'];
const origin = new Map();       // item -> file stem
const keyOrigin = new Map();    // 'PANELS:fig1A' -> file stem
const fileStems = [];
const EXTRA = OPT('include') ? OPT('include').split(',') : [];
for (const src of scriptSrcs.concat(EXTRA)) {
  const abs = path.join(ROOT, src);
  if (!fs.existsSync(abs)) { err(src, 'index.html', `script file missing: ${src}`); continue; }
  const stem = path.basename(src, '.js');
  fileStems.push(stem);
  const before = {};
  ARR_KEYS.forEach((k) => (before[k] = (win[k] || []).length));
  const beforeKeys = {};
  MAP_KEYS.forEach((k) => (beforeKeys[k] = new Set(Object.keys(win[k] || {}))));
  const bg = new Set(Object.keys((win.TRACKG && win.TRACKG.paras) || {}));
  const bu = new Set(Object.keys((win.TRACKG && win.TRACKG.units) || {}));
  const bs = new Set(Object.keys(win.SUMMARY || {}));
  try {
    vm.runInContext(fs.readFileSync(abs, 'utf8'), ctx, { filename: src });
  } catch (e) {
    err(stem, src, `JavaScript error while loading: ${e.message}`);
    continue;
  }
  ARR_KEYS.forEach((k) => (win[k] || []).slice(before[k]).forEach((it) => origin.set(it, stem)));
  MAP_KEYS.forEach((k) => Object.keys(win[k] || {}).forEach((key) => { if (!beforeKeys[k].has(key)) keyOrigin.set(`${k}:${key}`, stem); }));
  if (win.TRACKG) {
    Object.keys(win.TRACKG.paras || {}).forEach((k) => { if (!bg.has(k)) keyOrigin.set(`TRACKG.paras:${k}`, stem); });
    Object.keys(win.TRACKG.units || {}).forEach((k) => { if (!bu.has(k)) keyOrigin.set(`TRACKG.units:${k}`, stem); });
  }
  Object.keys(win.SUMMARY || {}).forEach((k) => { if (!bs.has(k)) keyOrigin.set(`SUMMARY:${k}`, stem); });
}
const PAPER = win.PAPER, FIGMETA = win.FIGMETA, CUR = win.CURRICULUM;
if (!PAPER || !FIGMETA || !CUR) { console.error('FATAL: paper.js / figmeta.js / curriculum.js did not load'); process.exit(2); }

const inScope = (stem) => {
  if (FINAL || (!scopeArg && !filesArg)) return true;
  if (filesArg && filesArg.includes(stem)) return true;
  if (scopeArg) return scopeArg.some((s) => stem === `lessons-${s}` || stem === `glossary-${s}` || stem === s || stem.endsWith('-' + s));
  return false;
};

// ------------------------------------------------------------------------------------------------ helpers
const PLAN = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'plan.json'), 'utf8'));
const strip = (h) => String(h == null ? '' : h).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&[a-z]+;/g, ' ');
const norm = (s) => strip(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
const wordsOf = (s) => (norm(s).match(/[A-Za-z][A-Za-z'-]*/g) || []).length;

const paraText = {}; // id -> plain text
const blockSec = {};
PAPER.blocks.forEach((b) => { if (b.type !== 'figure' && b.text !== undefined) { paraText[b.id] = b.text; blockSec[b.id] = b.sec; } });
const refText = {};
PAPER.references.forEach((r) => (refText['ref-' + r.n] = r.text));
const krtText = {};
PAPER.krt.forEach((c) => c.rows.forEach((r) => (krtText[r.id] = r.text)));
const figById = {};
PAPER.figures.forEach((f) => (figById[f.id] = f));
const panelIds = [];
PAPER.figures.forEach((f) => f.panels.forEach((p) => panelIds.push(p.id)));
const figtext = (id) => (win.FIGTEXT || {})[id] || '';
// paragraphs that cite a panel (via the figure cross-reference links in the verbatim text)
const citing = {};
PAPER.blocks.forEach((b) => {
  if (!b.html) return;
  for (const m of b.html.matchAll(/data-fig="(fig\d)" data-panels="([A-L]*)"/g)) {
    const f = figById[m[1]];
    if (!f) continue;
    const letters = m[2] ? m[2].split('') : f.panels.map((p) => p.letter);
    letters.forEach((L) => (citing[m[1] + L] = citing[m[1] + L] || new Set()).add(b.id));
  }
});
const sourceText = (id) => {
  if (paraText[id] !== undefined) return paraText[id];
  if (refText[id]) return refText[id];
  if (krtText[id]) return krtText[id];
  if (id === 'ga') return figtext('ga') + ' Graphical abstract';
  if (figById[id]) { const f = figById[id]; return `${f.title} ${f.panels.map((p) => p.legend + ' ' + figtext(p.id)).join(' ')} ${f.notes.map((n) => n.text).join(' ')}`; }
  const m = id.match(/^(fig\d)([A-L])(-title)?$/);
  if (m && figById[m[1]]) {
    const f = figById[m[1]];
    const p = f.panels.find((x) => x.letter === m[2]);
    if (p) return `${p.legend} ${f.notes.map((n) => n.text).join(' ')} ${figtext(p.id)}`;
  }
  const t = id.match(/^(fig\d)-title$/);
  if (t && figById[t[1]]) return figById[t[1]].title;
  return null;
};
const validSource = (id) => sourceText(id) !== null;
const secIds = new Set(PAPER.sections.map((s) => s.id));

// ---- numbers
const WORDNUM = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, twenty: 20, hundred: 100, thousand: 1000 };
const IDLIKE = /(?:Figures?|Figs?\.?|Panels?|Tables?|Data|Files?|Tracks?|Lessons?|Steps?|Questions?|Question|Q|Supplementary)\s*S?\d+[A-L]?(?:\s*(?:[–-]|and|,)\s*S?\d*[A-L]?)*/g;
const canon = (x) => { const v = Number(x); return Number.isFinite(v) ? String(Number(v.toPrecision(7))) : String(x); };
const numbersIn = (html) => {
  let t = norm(html).replace(IDLIKE, ' ').replace(/\b(?:fig|res|ref|krt|intro|m|discussion|limitations|summary|ack|decl|contrib|cover|front)[-\w]*\d[-\w]*/g, ' ');
  const out = [];
  // scientific notation: 1.2 × 10−7, 1.2e-7, 4 x 10^-5
  t = t.replace(/(\d+(?:\.\d+)?)\s*(?:[×x*]\s*10\s*\^?\s*([−–-]?\s*\d+)|e\s*([−–-]?\d+))(?![\w])/gi, (m, mant, e1, e2) => {
    const e = (e1 || e2).replace(/[−–\s]/g, (c) => (c === ' ' ? '' : '-'));
    out.push(canon(`${mant}e${e}`));
    return ' ';
  });
  // thousands separators
  t = t.replace(/\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\b/g, (m) => { out.push(canon(m.replace(/,/g, ''))); return ' '; });
  const UNIT = '(?:x|X|h|d|s|k|K|M|nM|µM|µL|µg|mM|mL|ng|kb|Kb|bp|min|th|st|nd|rd|fold|-fold|%|°C|bp)?';
  const re = new RegExp(`(?<![A-Za-z0-9_.])([\\u2212-]\\s?)?(\\d+(?:\\.\\d+)?|\\.\\d+)${UNIT}(?![A-Za-z0-9])`, 'g');
  for (const m of t.matchAll(re)) {
    let v = m[2];
    if (v.startsWith('.')) v = '0' + v;
    out.push((m[1] ? '-' : '') + canon(v));
  }
  return out;
};
const sourceNumberSet = (texts) => {
  const set = new Set();
  texts.forEach((txt) => {
    numbersIn(txt).forEach((n) => { set.add(n); set.add(n.replace(/^-/, '')); });
    (norm(txt).toLowerCase().match(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|hundred|thousand)\b/g) || []).forEach((w) => set.add(String(WORDNUM[w])));
  });
  return set;
};
// check numbers of `html` against the cited sources; returns missing list
const missingNumbers = (html, sources, derived, extraTexts) => {
  const texts = [];
  for (const id of [].concat(sources || [])) { const s = sourceText(id); if (s !== null) texts.push(s); }
  (extraTexts || []).forEach((t) => texts.push(t));
  const set = sourceNumberSet(texts);
  (derived || []).forEach((d) => { set.add(canon(String(d).replace(/^-/, ''))); set.add(String(d)); });
  return [...new Set(numbersIn(html).filter((n) => !(set.has(n) || set.has(n.replace(/^-/, '')))))];
};
const PAPER_TOKENS = /\b(CHiLL1|GCAWKR|libDECKO|A549|H460|H441|BE874|Esposito|831|998|DNMBP-AS1|LINC00115|HEK293T)\b/;

// ---- HTML / SVG sanity
const VOID = new Set(['br', 'hr', 'img', 'input', 'path', 'circle', 'rect', 'line', 'ellipse', 'polygon', 'polyline', 'use', 'stop', 'animate', 'set']);
const tagBalance = (html) => {
  const stack = [];
  const re = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith('<!--')) continue;
    const name = m[1].toLowerCase();
    const closing = m[0].startsWith('</');
    const selfClose = m[3] === '/' || VOID.has(name) && !closing;
    if (!closing) { if (!selfClose) stack.push(name); }
    else {
      if (VOID.has(name)) continue;
      const top = stack.pop();
      if (top !== name) return `unbalanced tag: </${name}> closes <${top || 'nothing'}>`;
    }
  }
  return stack.length ? `unclosed tag <${stack[stack.length - 1]}>` : null;
};
const htmlProblems = (html) => {
  const out = [];
  if (/<script|<iframe|<object|<embed|\son\w+\s*=|javascript:/i.test(html)) out.push('scripts / event handlers are not allowed');
  if (/\b(?:src|srcset)\s*=\s*["']?(?:https?:)?\/\//i.test(html) || /url\(\s*["']?https?:/i.test(html)) out.push('external resource (offline app must not load anything from the internet)');
  const b = tagBalance(html);
  if (b) out.push(b);
  return out;
};
const checkSvg = (svg, file, where) => {
  const s = String(svg || '');
  if (!/^\s*<svg\b/i.test(s)) { err(file, where, 'svg block must start with <svg'); return; }
  if (!/viewBox="[\d.\s-]+"/.test(s)) err(file, where, 'svg needs a viewBox (e.g. viewBox="0 0 640 320")');
  if (!/role="img"/.test(s) || !(/aria-label="[^"]{8,}"/.test(s) || /<title>[^<]{8,}<\/title>/.test(s))) err(file, where, 'svg needs role="img" and an aria-label (or <title>) describing it');
  if (/<foreignObject|<script|<image\b|xlink:href\s*=\s*["']https?:|href\s*=\s*["']https?:/i.test(s)) err(file, where, 'svg contains a forbidden element (foreignObject/script/image/external href)');
  const b = tagBalance(s);
  if (b) err(file, where, 'svg is malformed: ' + b);
  const vb = s.match(/viewBox="([\d.\s-]+)"/);
  if (vb) { const [, , w, h] = vb[1].trim().split(/\s+/).map(Number); if (w > 720) err(file, where, `svg viewBox width ${w} is too wide: on a phone the text becomes unreadably small. Use width 480 (max 560) and font sizes ≥ 13`); else if (w > 560) warn(file, where, `svg viewBox width ${w}: prefer 480 so text stays readable on a phone`); if (w < 300) warn(file, where, `svg viewBox width ${w} is very narrow`); if (h > 520) warn(file, where, `svg viewBox height ${h} is tall`); }
  const fonts = [...s.matchAll(/font-size="(\d+(?:\.\d+)?)"/g)].map((m) => +m[1]);
  if (fonts.some((f) => f < 12)) warn(file, where, 'svg text smaller than 12 units is hard to read on a phone (the default 15 is right for most labels)');
  if (/\bwidth="\d+"/.test(s.match(/^<svg[^>]*>/)[0]) || /\bheight="\d+"/.test(s.match(/^<svg[^>]*>/)[0])) warn(file, where, 'omit width/height on <svg> (the app sizes it with CSS); keep only viewBox');
};

// ---- routes inside authored html
const routeOK = {
  lesson: (id) => PLAN.lessons.some((l) => l.id === id),
  term: (id) => PLAN.terms.some((t) => t.id === id),
  panel: (id) => panelIds.includes(id),
  figure: (id) => figById[id] || id === 'ga',
  read: (id) => secIds.has(id) || paraText[id] !== undefined || krtText[id] !== undefined,
  g: (id) => secIds.has(id) || paraText[id] !== undefined,
  quiz: (id) => (win.QUIZZES || []).some((q) => q.id === id),
  exam: (id) => (win.EXAMS || []).some((q) => q.id === id),
  explain: (id) => (win.EXPLAIN || []).some((q) => q.id === id),
  track: (id) => /^[A-H]$/.test(id),
  refs: (id) => /^\d+$/.test(id) && +id >= 1 && +id <= PAPER.references.length,
};
const checkLinks = (html, file, where) => {
  for (const m of String(html).matchAll(/href="#\/([a-z]+)(?:\/([\w-]+))?(?:\/([\w-]+))?"/g)) {
    const [, r, a, b] = m;
    if (['paper', 'learn', 'cards', 'quizzes', 'exams', 'glossary', 'numbers', 'summary', 'cheatsheet', 'planner', 'search', 'settings', 'more', 'about', 'figures', 'practice', 'refs'].includes(r) && !a) continue;
    if (r === 'cards' && a === 'review') continue;
    if (!routeOK[r]) { err(file, where, `unknown route #/${r}`); continue; }
    if (a && !routeOK[r](a)) err(file, where, `link target does not exist: #/${r}/${a}`);
    if (b && (r === 'read' || r === 'g') && !(paraText[b] !== undefined || krtText[b] !== undefined)) err(file, where, `link target paragraph does not exist: ${b}`);
  }
};
const checkHtmlField = (html, file, where) => {
  if (html == null) return;
  htmlProblems(String(html)).forEach((p) => err(file, where, p));
  checkLinks(html, file, where);
};

// ---- term index (same matching rules as the app)
const terms = PLAN.terms;
const termById = Object.fromEntries(terms.map((t) => [t.id, t]));
const pathPos = {};
PLAN.path.forEach((id, i) => (pathPos[id] = i));
const firstG = pathPos['G-main'];
const lessonPos = (id) => (pathPos[id] !== undefined ? pathPos[id] : -1);
const termKey = new Map();
const alts = [];
terms.forEach((t) => {
  [t.term, ...t.aliases].forEach((n) => {
    if (!n || n.length < 2) return;
    const k = t.cs ? n : n.toLowerCase();
    if (!termKey.has(k)) termKey.set(k, t);
    alts.push(n);
  });
});
alts.sort((a, b) => b.length - a.length);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const TERMRE = new RegExp(`(^|[^\\w-])(${alts.map(esc).join('|')})(s|es)?(?![\\w-])`, 'gi');
const lookupTerm = (w) => { if (termKey.has(w)) return termKey.get(w); const t = termKey.get(w.toLowerCase()); return t && !t.cs ? t : null; };
// terms used in `text` -> [{term, ctx}]
const termsIn = (text) => {
  const out = [];
  const t = norm(text);
  for (const m of t.matchAll(TERMRE)) {
    const term = lookupTerm(m[2]);
    if (!term) continue;
    const i = m.index + m[1].length;
    out.push({ term, ctx: t.slice(Math.max(0, i - 35), i + m[2].length + 25) });
  }
  return out;
};
// inline definitions: term id -> earliest path position at which it was defined inline
const definedAt = {};
const noteDefine = (ids, pos) => (ids || []).forEach((id) => { if (definedAt[id] === undefined || pos < definedAt[id]) definedAt[id] = pos; });
(win.LESSON_CONTENT || []).forEach((l) => noteDefine(l.defines, lessonPos(l.id)));
// G paragraphs / units may define terms inline too (e.g. 'patent' in the declaration of interests)
const gStepPos = {};
PLAN.path.forEach((id, i) => { if (id.startsWith('G-')) gStepPos[id] = i; });
const gUnitPos = (unit) => {
  const m = {};
  (PLAN.g.main || []).forEach((u, i) => (m[u] = firstG + i)); // approximate ordering inside G
  (PLAN.g.back || []).forEach((u, i) => (m[u] = firstG + 20 + i));
  (PLAN.g.methods || []).forEach((u, i) => (m[u] = firstG + 40 + i));
  return m[unit] !== undefined ? m[unit] : firstG;
};
const termAvailableAt = (term, pos) => {
  const home = lessonPos(term.taughtIn);
  if (home >= 0 && home <= pos) return true;
  return definedAt[term.id] !== undefined && definedAt[term.id] <= pos;
};
const checkTermOrder = (text, pos, file, where, ownTerms) => {
  const seen = new Set();
  termsIn(text).forEach(({ term, ctx: c }) => {
    if (seen.has(term.id)) return;
    seen.add(term.id);
    if (ownTerms && ownTerms.has(term.id)) return;
    if (!termAvailableAt(term, pos)) err(file, where, `uses "${term.term}" before it is taught (home lesson ${term.taughtIn}); rephrase in plain words or list "${term.id}" in \`defines\` and explain it inline — context: …${c}…`);
  });
};

// ---- text assembly of authored objects
const blockText = (b) => {
  if (!b) return '';
  switch (b.k) {
    case 'svg': return (String(b.svg || '').match(/>([^<>]+)</g) || []).map((x) => x.slice(1, -1)).join(' ') + ' ' + strip(b.caption || '');
    case 'h': return b.text || '';
    case 'paper': return '';
    case 'panel': case 'figure': return b.html || '';
    default: return b.html || '';
  }
};
const checkText = (q) => [q.q, ...(q.options || []).flatMap((o) => [o.t, o.why])].join(' ');

// ------------------------------------------------------------------------------------------------ item checks
const KINDS_SOURCED = new Set(['plain', 'why', 'flag']);
const KINDS_FREE = new Set(['bgnd', 'memory', 'worked']);
const validateQuestion = (q, file, where, opts) => {
  opts = opts || {};
  if (!q || typeof q !== 'object') { err(file, where, 'question must be an object'); return; }
  if (!q.q || strip(q.q).length < 8) err(file, where, 'question text missing');
  if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 5) { err(file, where, 'a multiple-choice question needs 3–5 options'); return; }
  const oks = q.options.filter((o) => o.ok);
  if (oks.length !== 1) err(file, where, `exactly one option must have ok:true (found ${oks.length})`);
  q.options.forEach((o, i) => {
    if (!o.t || !strip(o.t).trim()) err(file, where, `option ${i + 1} has no text`);
    if (!o.why || strip(o.why).length < 12) err(file, where, `option ${i + 1} needs an explanation (\`why\`) — explain right AND wrong answers`);
    checkHtmlField(o.t, file, `${where} option ${i + 1}`);
    checkHtmlField(o.why, file, `${where} option ${i + 1} why`);
  });
  checkHtmlField(q.q, file, where);
  const hasSrc = Array.isArray(q.source) && q.source.length;
  if (!hasSrc && !q.bg) err(file, where, 'question has neither `source:[ids]` (paper facts) nor `bg:true` (pure background knowledge)');
  if (hasSrc) {
    q.source.forEach((s) => { if (!validSource(s)) err(file, where, `invalid source id "${s}"`); });
    const stemMissing = missingNumbers(q.q, q.source, q.derived);
    if (stemMissing.length) err(file, where, `number(s) ${stemMissing.join(', ')} in the question are not in the cited source(s) ${q.source.join(', ')}`);
    q.options.forEach((o, i) => {
      const own = [q.q, o.t].filter(Boolean);
      const miss = missingNumbers(o.ok ? `${o.t} ${o.why}` : o.why, q.source, q.derived, o.ok ? [] : own);
      if (miss.length) err(file, where, `option ${i + 1}${o.ok ? ' (correct)' : ''}: number(s) ${miss.join(', ')} not found in the cited source(s) ${q.source.join(', ')} (add the right source, fix the number, or list it in \`derived\`)`);
    });
  } else if (q.bg && PAPER_TOKENS.test(checkText(q))) warn(file, where, 'bg:true question mentions paper-specific names/numbers — cite a source instead?');
  if (opts.pos !== undefined && opts.pos !== null) checkTermOrder(checkText(q), opts.pos, file, where);
};

const lessonIds = new Set(PLAN.lessons.map((l) => l.id));
const gStepIds = new Set([...(PLAN.g.main || []), ...(PLAN.g.back || []), ...(PLAN.g.methods || [])].map((u) => 'G-' + u));
const lessonRef = (id) => lessonIds.has(id) || gStepIds.has(id);
const posOfLessonRef = (id) => (lessonIds.has(id) ? lessonPos(id) : gStepIds.has(id) ? gUnitPos(id.slice(2)) : null);

// ---- glossary
{
  const seenIds = new Set();
  (win.GLOSSARY_CONTENT || []).forEach((e) => {
    const file = origin.get(e);
    if (!inScope(file)) return;
    const where = `glossary entry "${e.id}"`;
    const t = termById[e.id];
    if (!t) { err(file, where, 'id is not in content/plan.json terms'); return; }
    if (seenIds.has(e.id)) err(file, where, 'duplicate entry');
    seenIds.add(e.id);
    ['short', 'long', 'analogy'].forEach((f) => { if (!e[f] || strip(e[f]).length < (f === 'short' ? 15 : f === 'long' ? 60 : 20)) err(file, where, `missing or too short: ${f}`); });
    if (e.short && strip(e.short).length > 230) err(file, where, 'short must be one line (≤ 230 chars)');
    if (e.long && wordsOf(e.long) > 190) warn(file, where, `long explanation is ${wordsOf(e.long)} words — aim for 40–140`);
    ['short', 'long', 'analogy'].forEach((f) => checkHtmlField(e[f], file, `${where} ${f}`));
    (e.see || []).forEach((s) => { if (!termById[s]) err(file, where, `see: unknown term id "${s}"`); });
    const srcs = [].concat(e.source || []);
    srcs.forEach((s) => { if (!validSource(s)) err(file, where, `invalid source id "${s}"`); });
    if (t.kind === 'paper' && !srcs.length) err(file, where, 'paper-specific term needs `source:[ids]`');
    if (srcs.length) {
      const miss = missingNumbers(`${e.short} ${e.long} ${e.analogy}`, srcs, e.derived);
      if (miss.length) err(file, where, `number(s) ${miss.join(', ')} not found in cited source(s) ${srcs.join(', ')}`);
    } else if (t.kind === 'paper') {/* handled above */}
    if (e.paperUse) {
      const st = sourceText(e.paperUse.ref);
      if (st === null) err(file, where, `paperUse.ref invalid: ${e.paperUse.ref}`);
      else if (!quoteIn(e.paperUse.quote, st)) err(file, where, 'paperUse.quote is not an exact substring of the cited paragraph');
    }
    // terms used in the entry must be taught no later than the entry's own home lesson
    const pos = lessonPos(t.taughtIn);
    checkTermOrder(`${e.short} ${e.long} ${e.analogy}`, pos, file, where, new Set([e.id]));
  });
}
function quoteIn(quote, source) {
  const parts = String(quote || '').split(/\s*(?:…|\.\.\.)\s*/).map(norm).filter(Boolean);
  const s = norm(source);
  let from = 0;
  for (const p of parts) {
    const i = s.indexOf(p, from);
    if (i < 0) return false;
    from = i + p.length;
  }
  return parts.length > 0;
}

// ---- lessons
{
  const seen = new Set();
  (win.LESSON_CONTENT || []).forEach((l) => {
    const file = origin.get(l);
    if (!inScope(file)) return;
    const meta = PLAN.lessons.find((m) => m.id === l.id);
    const P = (w) => `lesson ${l.id} ${w}`;
    if (!meta) { err(file, P(''), 'id is not in content/plan.json lessons'); return; }
    if (seen.has(l.id)) err(file, P(''), 'duplicate lesson');
    seen.add(l.id);
    const pos = lessonPos(l.id);
    (l.defines || []).forEach((d) => { if (!termById[d]) err(file, P('defines'), `unknown term id "${d}"`); });
    const own = new Set(meta.teaches || []);
    const body = l.body || [];
    if (!body.length) err(file, P(''), 'empty body');
    let svgCount = 0, memCount = 0, words = 0;
    body.forEach((b, i) => {
      const where = P(`body[${i}] (${b.k})`);
      if (!b || !b.k) { err(file, where, 'block needs k'); return; }
      const known = ['h', 'plain', 'bgnd', 'memory', 'why', 'flag', 'worked', 'paper', 'svg', 'panel', 'figure', 'html'];
      if (!known.includes(b.k)) { err(file, where, `unknown block kind "${b.k}"`); return; }
      if (b.k === 'svg') { svgCount++; checkSvg(b.svg, file, where); if (!b.caption) warn(file, where, 'svg needs a caption'); }
      if (b.k === 'memory') memCount++;
      if (b.k === 'paper') {
        const st = sourceText(b.ref);
        if (st === null) err(file, where, `paper block: invalid ref "${b.ref}"`);
        else if (b.quote && !quoteIn(b.quote, st)) err(file, where, `paper quote is not an exact substring of ${b.ref}: "${b.quote.slice(0, 70)}…"`);
        else if (!b.quote && st.length > 900) warn(file, where, 'full paragraph shown; use `quote` to show only the relevant sentence');
        return;
      }
      if (b.k === 'panel' || b.k === 'figure') {
        const id = b.id;
        const ok = b.k === 'panel' ? panelIds.includes(id) : !!figById[id] || id === 'ga';
        if (!ok) err(file, where, `${b.k} block: unknown id "${id}"`);
        if (b.html) { checkHtmlField(b.html, file, where); }
        if (b.html && (b.kind || 'plain') === 'plain') {
          const miss = missingNumbers(b.html, [id], b.derived, panelIds.includes(id) ? [...(citing[id] || [])].map((x) => paraText[x]) : []);
          if (miss.length) err(file, where, `number(s) ${miss.join(', ')} not found in panel ${id} (legend / figtext / citing paragraphs)`);
        }
      }
      if (KINDS_SOURCED.has(b.k)) {
        if (!Array.isArray(b.source) || !b.source.length) err(file, where, `"${b.k}" blocks describe the paper and need \`source:[ids]\` (use "bgnd" for general knowledge)`);
        else {
          b.source.forEach((s) => { if (!validSource(s)) err(file, where, `invalid source id "${s}"`); });
          const miss = missingNumbers(b.html, b.source, b.derived);
          if (miss.length) err(file, where, `number(s) ${miss.join(', ')} not found in the cited source(s) ${b.source.join(', ')} (add the right source, fix the number, or list it in \`derived\`)`);
        }
      }
      if (KINDS_FREE.has(b.k) && PAPER_TOKENS.test(strip(b.html || ''))) warn(file, where, `"${b.k}" block mentions paper-specific names/numbers — if it states paper facts, use a sourced "plain" block`);
      const txt = blockText(b);
      words += wordsOf(txt);
      if (b.html) checkHtmlField(b.html, file, where);
      if (b.k === 'h') return;
      checkTermOrder(txt, pos, file, where, own);
    });
    checkTermOrder(meta.goal, pos, file, P('goal (from plan)'), own);
    if (!svgCount) err(file, P(''), 'every lesson needs at least one inline SVG diagram (k:"svg")');
    if (!memCount) err(file, P(''), 'every lesson needs a "memory" block (the everyday analogy)');
    if (words < 200) err(file, P(''), `lesson is only ${words} words of teaching text — too thin`);
    if (words > 1700) err(file, P(''), `lesson is ${words} words — too long for 5–10 minutes (split it or cut)`);
    else if (words > 1250) warn(file, P(''), `lesson is ${words} words (long for ${meta.minutes} min)`);
    if (!Array.isArray(l.appears) || !l.appears.length) err(file, P(''), '`appears` (where this appears in the paper) must list at least one {ref, note}');
    (l.appears || []).forEach((a, i) => {
      if (!validSource(a.ref)) err(file, P(`appears[${i}]`), `invalid ref "${a.ref}"`);
      if (!a.note || strip(a.note).length < 8) err(file, P(`appears[${i}]`), 'needs a note saying what appears there');
    });
    const ch = l.checks || [];
    if (ch.length < 3 || ch.length > 5) err(file, P('checks'), `needs 3–5 check questions (has ${ch.length})`);
    ch.forEach((q, i) => validateQuestion(q, file, P(`check ${i + 1}`), { pos }));
  });
}

// ---- Track G paragraphs and units
const exemptSecs = new Set(['cover', 'front', 'starmethods-toc', 'suppinfo', 'dates', 'refs', 'm-krt']);
{
  const TG = win.TRACKG || { paras: {}, units: {} };
  const paraIds = Object.keys(TG.paras || {});
  paraIds.forEach((id) => {
    const file = keyOrigin.get(`TRACKG.paras:${id}`);
    if (!inScope(file)) return;
    const L = TG.paras[id];
    const where = `G paragraph ${id}`;
    if (paraText[id] === undefined) { err(file, where, 'unknown paragraph id'); return; }
    if (exemptSecs.has(blockSec[id])) warn(file, where, 'this paragraph is exempt from the study layer');
    const unit = unitOfSec(blockSec[id]);
    const pos = Math.max(firstG - 0, 0);
    noteDefine(L.defines, gUnitPos(unit));
    const posAt = gUnitPos(unit);
    if (!L.plain || strip(L.plain).length < 30) err(file, where, '`plain` (Plain English) missing or too short');
    if (!L.why || strip(L.why).length < 20) err(file, where, '`why` (Why it matters) missing or too short');
    [['plain', L.plain], ['why', L.why], ['memory', L.memory]].forEach(([k, v]) => {
      if (!v) return;
      checkHtmlField(v, file, `${where} ${k}`);
      if (k !== 'memory') {
        const miss = missingNumbers(v, [id].concat(L.sources || []), L.derived);
        if (miss.length) err(file, `${where} ${k}`, `number(s) ${miss.join(', ')} not in the paragraph text (Plain English adds no new numbers; extra sources go in \`sources:[…]\`, computed ones in \`derived\`)`);
      }
      checkTermOrder(v, posAt, file, `${where} ${k}`);
    });
    (L.flags || []).forEach((f, i) => { checkHtmlField(f, file, `${where} flags[${i}]`); const miss = missingNumbers(f, [id].concat(L.sources || []), L.derived); if (miss.length) err(file, `${where} flags[${i}]`, `number(s) ${miss.join(', ')} not in the cited text`); checkTermOrder(f, posAt, file, `${where} flags[${i}]`); });
    if (!Array.isArray(L.prereqs)) err(file, where, '`prereqs` must be an array of lesson ids (may be empty; the app also adds links automatically)');
    (L.prereqs || []).forEach((p) => { if (!lessonIds.has(p)) err(file, where, `prereq "${p}" is not a lesson id`); else if (lessonPos(p) >= firstG) err(file, where, `prereq "${p}" comes after the paper in the path`); });
    (L.sources || []).forEach((s) => { if (!validSource(s)) err(file, where, `invalid extra source "${s}"`); });
    const ch = L.checks || [];
    if (ch.length < 1 || ch.length > 2) err(file, where, `needs 1–2 check questions (has ${ch.length})`);
    ch.forEach((q, i) => {
      if (!q.source) q.source = [id];
      validateQuestion(q, file, `${where} check ${i + 1}`, { pos: posAt });
    });
  });
  Object.keys(TG.units || {}).forEach((u) => {
    const file = keyOrigin.get(`TRACKG.units:${u}`);
    if (!inScope(file)) return;
    const U_ = TG.units[u];
    const where = `G unit ${u}`;
    if (!secIds.has(u)) err(file, where, 'unknown unit id');
    noteDefine(U_.defines, gUnitPos(u));
    ['intro', 'recap'].forEach((k) => {
      if (!U_[k] || strip(U_[k]).length < 40) err(file, where, `\`${k}\` missing or too short`);
      else { checkHtmlField(U_[k], file, `${where} ${k}`); checkTermOrder(U_[k], gUnitPos(u), file, `${where} ${k}`); }
    });
  });
}
function unitOfSec(sec) {
  // unit ids are section ids, except level-4 subsections that belong to their parent
  const s = PAPER.sections.find((x) => x.id === sec);
  if (s && s.level === 4) return s.parent;
  return sec;
}

// ---- panels / figtext
{
  const PANELS = win.PANELS || {};
  const FT = win.FIGTEXT || {};
  Object.keys(FT).forEach((id) => {
    const file = keyOrigin.get(`FIGTEXT:${id}`);
    if (!inScope(file)) return;
    if (!panelIds.includes(id) && id !== 'ga') err(file, `figtext ${id}`, 'unknown panel id');
    if (typeof FT[id] !== 'string' || FT[id].trim().length < 25) err(file, `figtext ${id}`, 'figtext must be a string (≥ 25 chars): the words and numbers printed INSIDE the panel image');
  });
  Object.keys(PANELS).forEach((id) => {
    const file = keyOrigin.get(`PANELS:${id}`);
    if (!inScope(file)) return;
    const g = PANELS[id];
    const where = `panel guide ${id}`;
    if (!panelIds.includes(id) && id !== 'ga') { err(file, where, 'unknown panel id'); return; }
    ['short', 'question', 'howToRead', 'shows'].forEach((f) => { if (!g[f] || strip(g[f]).length < (f === 'short' ? 6 : 25)) err(file, where, `missing or too short: ${f}`); });
    if (!g.examQ || !g.examQ.q || !g.examQ.a) err(file, where, 'examQ {q, a} required');
    if (!Array.isArray(g.keyNumbers)) err(file, where, 'keyNumbers must be an array (may be empty)');
    if (!Array.isArray(g.chartTypes)) err(file, where, 'chartTypes must be an array of lesson ids (e.g. ["F1"]) or short names');
    (g.chartTypes || []).forEach((c) => { if (/^[A-H]\d+$/.test(c) && !lessonIds.has(c)) err(file, where, `chartTypes: unknown lesson "${c}"`); });
    const allowedTexts = [...(citing[id] || [])].map((x) => paraText[x]);
    const srcIds = [id];
    const checkField = (field, html) => {
      if (!html) return;
      checkHtmlField(html, file, `${where} ${field}`);
      const miss = missingNumbers(html, srcIds, g.derived, allowedTexts);
      if (miss.length) err(file, `${where} ${field}`, `number(s) ${miss.join(', ')} not found in the panel's legend, FIGTEXT, or the paragraphs that cite it (add them to FIGTEXT if printed in the image, or fix)`);
      checkTermOrder(html, firstG, file, `${where} ${field}`);
    };
    ['question', 'howToRead', 'shows', 'background', 'memory'].forEach((f) => {
      if (f === 'background' || f === 'memory') { if (g[f]) { checkHtmlField(g[f], file, `${where} ${f}`); checkTermOrder(g[f], firstG, file, `${where} ${f}`); } }
      else checkField(f, g[f]);
    });
    (g.flags || []).forEach((f, i) => checkField(`flags[${i}]`, f));
    (g.keyNumbers || []).forEach((k, i) => {
      const w = `${where} keyNumbers[${i}]`;
      if (!k.value || !k.meaning) err(file, w, 'needs value and meaning');
      const src = [].concat(k.source || [id]);
      src.forEach((s) => { if (!validSource(s)) err(file, w, `invalid source "${s}"`); });
      const miss = missingNumbers(`${k.value} ${k.meaning}`, src.concat([id]), k.derived || g.derived, allowedTexts);
      if (miss.length) err(file, w, `number(s) ${miss.join(', ')} not found in source(s)`);
      checkTermOrder(`${k.value} ${k.meaning}`, firstG, file, w);
    });
    if (g.examQ) { checkField('examQ.q', g.examQ.q); checkField('examQ.a', g.examQ.a); }
  });
}

// ---- cards
{
  const DECKS = ['terms', 'abbr', 'numbers', 'why', 'figures', 'concepts'];
  const ids = new Set();
  (win.CARDS || []).forEach((c) => {
    const file = origin.get(c);
    if (!inScope(file)) return;
    const where = `card ${c.id || '(no id)'}`;
    if (!c.id) err(file, where, 'card needs an id');
    if (ids.has(c.id)) err(file, where, 'duplicate card id');
    ids.add(c.id);
    if (!DECKS.includes(c.deck)) err(file, where, `deck must be one of ${DECKS.join(', ')}`);
    if (!c.front || strip(c.front).length < 5) err(file, where, 'front missing');
    if (!c.back || strip(c.back).length < 2) err(file, where, 'back missing');
    if (!['paper', 'background', 'memory'].includes(c.kind)) err(file, where, 'kind must be paper | background | memory');
    if (!c.lesson || !lessonRef(c.lesson)) err(file, where, `lesson must be a lesson id or G-<unit> (got ${c.lesson}) — it controls when the card unlocks`);
    checkHtmlField(c.front, file, `${where} front`);
    checkHtmlField(c.back, file, `${where} back`);
    const srcs = [].concat(c.source || []);
    if (c.kind === 'paper' && !srcs.length) err(file, where, 'a paper card needs `source:[ids]`');
    srcs.forEach((s) => { if (!validSource(s)) err(file, where, `invalid source id "${s}"`); });
    if (srcs.length) {
      const miss = missingNumbers(`${c.front} ${c.back}`, srcs, c.derived);
      if (miss.length) err(file, where, `number(s) ${miss.join(', ')} not found in cited source(s) ${srcs.join(', ')}`);
    } else if (c.kind === 'background' && PAPER_TOKENS.test(strip(c.front + c.back))) warn(file, where, 'background card mentions paper-specific names/numbers');
    if (c.img) { const ok = panelIds.includes(c.img) || figById[c.img] || c.img === 'ga'; if (!ok) err(file, where, `img "${c.img}" is not a panel/figure id`); }
    if (c.deck === 'figures' && !c.img) err(file, where, 'figures-deck cards must have `img` (a panel id)');
    const pos = c.lesson && lessonRef(c.lesson) ? posOfLessonRef(c.lesson) : null;
    if (pos !== null) { const own = new Set(c.lesson && lessonIds.has(c.lesson) ? (PLAN.lessons.find((l) => l.id === c.lesson).teaches || []) : []); checkTermOrder(`${c.front} ${c.back}`, pos, file, where, own); }
  });
}

// ---- quizzes
{
  const ids = new Set();
  (win.QUIZZES || []).forEach((z) => {
    const file = origin.get(z);
    if (!inScope(file)) return;
    const where = `quiz ${z.id}`;
    if (!z.id || ids.has(z.id)) err(file, where, 'quiz id missing or duplicate');
    ids.add(z.id);
    if (!['figure', 'section', 'mixed'].includes(z.kind)) err(file, where, 'kind must be figure | section | mixed');
    if (!z.title) err(file, where, 'title missing');
    if (z.kind === 'figure' && !figById[z.ref]) err(file, where, `figure quiz needs ref: 'figN' (got ${z.ref})`);
    if (z.kind === 'section' && !secIds.has(z.ref)) err(file, where, `section quiz needs ref: <unit id> (got ${z.ref})`);
    const qs = z.questions || [];
    if (qs.length < 6 && !z._example) err(file, where, `needs at least 6 questions (has ${qs.length})`);
    qs.forEach((q, i) => {
      validateQuestion(q, file, `${where} Q${i + 1}`, { pos: q.lesson && lessonRef(q.lesson) ? posOfLessonRef(q.lesson) : firstG });
      if (q.img && !(panelIds.includes(q.img) || figById[q.img])) err(file, `${where} Q${i + 1}`, `img "${q.img}" is not a panel/figure id`);
      if (q.lesson && !lessonRef(q.lesson)) err(file, `${where} Q${i + 1}`, `unknown lesson "${q.lesson}"`);
    });
  });
}

// ---- exams
{
  const ids = new Set();
  (win.EXAMS || []).forEach((e) => {
    const file = origin.get(e);
    if (!inScope(file)) return;
    const where = `exam ${e.id}`;
    if (!e.id || ids.has(e.id)) err(file, where, 'exam id missing or duplicate');
    ids.add(e.id);
    if (!e.title || !e.minutes || !e.intro) err(file, where, 'needs title, minutes and intro');
    const qs = e.questions || [];
    if (qs.length < 30 && !e._example) err(file, where, `needs at least 30 questions (has ${qs.length})`);
    const kinds = {};
    qs.forEach((q, i) => {
      const w = `${where} Q${i + 1}`;
      kinds[q.type] = (kinds[q.type] || 0) + 1;
      if (!['mcq', 'short', 'figure', 'critique'].includes(q.type)) err(file, w, 'type must be mcq | short | figure | critique');
      if (q.img && !(panelIds.includes(q.img) || figById[q.img])) err(file, w, `img "${q.img}" is not a panel/figure id`);
      if (q.options) validateQuestion(q, file, w, { pos: null });
      else {
        if (!q.q) err(file, w, 'question text missing');
        if (!q.model || strip(q.model).length < 40) err(file, w, 'written questions need a `model` answer');
        if (!Array.isArray(q.checklist) || q.checklist.length < 3) err(file, w, 'written questions need a `checklist` of ≥ 3 key points');
        const src = [].concat(q.source || []);
        if (!src.length && !q.bg) err(file, w, 'needs `source:[ids]` (or bg:true)');
        src.forEach((s) => { if (!validSource(s)) err(file, w, `invalid source "${s}"`); });
        if (src.length) { const miss = missingNumbers(`${q.q} ${q.model} ${(q.checklist || []).join(' ')}`, src, q.derived); if (miss.length) err(file, w, `number(s) ${miss.join(', ')} not found in cited source(s) ${src.join(', ')}`); }
        checkHtmlField(q.q, file, w); checkHtmlField(q.model, file, w + ' model');
      }
    });
    if (qs.length >= 30 && !e._example) {
      ['mcq', 'short', 'figure', 'critique'].forEach((t) => { if (!kinds[t]) err(file, where, `exam must include "${t}" questions`); });
      if ((kinds.short || 0) < 5) err(file, where, 'include at least 5 short-answer questions');
      if ((kinds.critique || 0) < 4) err(file, where, 'include at least 4 explain/critique-the-design questions');
      if ((kinds.figure || 0) < 5) err(file, where, 'include at least 5 figure-interpretation questions');
    }
  });
}

// ---- explain / numbers / summary
{
  (win.EXPLAIN || []).forEach((x) => {
    const file = origin.get(x);
    if (!inScope(file)) return;
    const where = `explain ${x.id}`;
    if (!x.id || !x.title || !x.prompt || !x.model) err(file, where, 'needs id, title, prompt, model');
    if (!Array.isArray(x.checklist) || x.checklist.length < 4) err(file, where, 'needs a checklist of ≥ 4 key points');
    const src = [].concat(x.source || []);
    if (!src.length && !x.bg) err(file, where, 'needs source:[ids] (or bg:true)');
    src.forEach((s) => { if (!validSource(s)) err(file, where, `invalid source "${s}"`); });
    if (src.length) { const miss = missingNumbers(`${x.prompt} ${x.model} ${(x.checklist || []).join(' ')}`, src, x.derived); if (miss.length) err(file, where, `number(s) ${miss.join(', ')} not found in cited source(s)`); }
    [x.prompt, x.model].forEach((h) => checkHtmlField(h, file, where));
  });
  (win.NUMBERS || []).forEach((n, i) => {
    const file = origin.get(n);
    if (!inScope(file)) return;
    const where = `number "${strip(n.value).slice(0, 40)}"`;
    if (!n.group || !n.value || !n.meaning) err(file, where, 'needs group, value, meaning');
    const src = [].concat(n.source || []);
    if (!src.length) err(file, where, 'needs source:[ids]');
    src.forEach((s) => { if (!validSource(s)) err(file, where, `invalid source "${s}"`); });
    if (src.length) { const miss = missingNumbers(`${n.value} ${n.meaning} ${n.note || ''}`, src, n.derived); if (miss.length) err(file, where, `number(s) ${miss.join(', ')} not found in cited source(s) ${src.join(', ')}`); }
    [n.value, n.meaning, n.note].forEach((h) => checkHtmlField(h, file, where));
  });
  const S = win.SUMMARY || {};
  ['onePage', 'cheat'].forEach((k) => {
    if (S[k] === undefined) return;
    const file = keyOrigin.get(`SUMMARY:${k}`);
    if (!inScope(file)) return;
    checkHtmlField(S[k], file, `summary ${k}`);
    const w = wordsOf(S[k]);
    if (k === 'onePage' && (w < 250 || w > 800)) err(file, 'summary onePage', `one-page summary should be ~300–700 words (is ${w})`);
    if (k === 'cheat' && w < 350) err(file, 'summary cheat', `cheat sheet too short (${w} words)`);
  });
}

// ------------------------------------------------------------------------------------------------ global / final checks
// figure completeness — always checked for figures that already have guides; in --final for all
{
  const PANELS = win.PANELS || {};
  panelIds.forEach((id) => {
    const fid = id.replace(/[A-L]$/, '');
    const L = id.slice(-1);
    const m = FIGMETA[fid] && FIGMETA[fid].panels[L];
    if (!m) { err('figmeta', `panel ${id}`, 'no image metadata'); return; }
    if (!fs.existsSync(path.join(ROOT, m.img))) err('figmeta', `panel ${id}`, `image file missing: ${m.img}`);
    const p = figById[fid].panels.find((x) => x.letter === L);
    if (!p || !p.legend || p.legend.length < 10) err('paper', `panel ${id}`, 'legend missing');
    if (FINAL) {
      if (!PANELS[id]) err('panels', `panel ${id}`, 'missing panel guide (PANELS)');
      if (!(win.FIGTEXT || {})[id]) err('figtext', `panel ${id}`, 'missing FIGTEXT (transcribed in-image text)');
    }
  });
  Object.entries(FIGMETA).forEach(([fid, f]) => { if (!fs.existsSync(path.join(ROOT, f.img))) err('figmeta', fid, `image file missing: ${f.img}`); });
  if (FINAL) {
    if (!PANELS.ga) err('panels', 'ga', 'missing graphical-abstract guide');
    if (!(win.FIGTEXT || {}).ga) err('figtext', 'ga', 'missing FIGTEXT for the graphical abstract');
  }
}

// offline check: nothing in the app may load from the internet
{
  const files = [];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(js|css|html)$/.test(e.name)) files.push(p); });
  walk(path.join(ROOT, 'app'));
  files.push(path.join(ROOT, 'index.html'));
  files.forEach((f) => {
    const rel = path.relative(ROOT, f);
    if (rel.endsWith('data/paper.js')) return; // verbatim paper text contains external links as anchors
    const src = fs.readFileSync(f, 'utf8');
    if (/(?:src|href)\s*=\s*["']https?:\/\/[^"']*\.(?:js|css|woff2?|ttf|png|jpe?g|webp|svg)/i.test(src) || /@import\s+url\(\s*["']?https?:|url\(\s*["']?https?:|fetch\(\s*["']https?:|XMLHttpRequest/.test(src)) err(rel, 'offline', 'loads something from the internet');
  });
}

if (FINAL) {
  const GC = win.GLOSSARY_CONTENT || [];
  const have = new Set(GC.map((e) => e.id));
  terms.forEach((t) => { if (!have.has(t.id)) err('glossary', `term ${t.id}`, 'no glossary entry written'); });
  if (GC.length < 150) err('glossary', 'count', `need ≥ 150 glossary entries (have ${GC.length})`);
  const have2 = new Set((win.LESSON_CONTENT || []).map((l) => l.id));
  PLAN.lessons.forEach((l) => { if (!have2.has(l.id)) err('lessons', `lesson ${l.id}`, 'lesson content missing'); });
  const TG = win.TRACKG || { paras: {}, units: {} };
  const need = [];
  [...(PLAN.g.main || []), ...(PLAN.g.back || []), ...(PLAN.g.methods || [])].forEach((u) => {
    if (u === 'm-krt') { if (!TG.units[u]) err('trackg', `unit ${u}`, 'unit intro/recap missing'); return; }
    if (!TG.units[u]) err('trackg', `unit ${u}`, 'unit intro/recap missing');
    PAPER.blocks.forEach((b) => { if (b.type !== 'figure' && /-p\d+$/.test(b.id) && unitOfSec(b.sec) === u) need.push(b.id); });
  });
  need.forEach((id) => { if (!TG.paras[id]) err('trackg', `paragraph ${id}`, 'no study layer'); });
  if ((win.CARDS || []).length < 300) err('cards', 'count', `need ≥ 300 flashcards (have ${(win.CARDS || []).length})`);
  const decks = {};
  (win.CARDS || []).forEach((c) => (decks[c.deck] = (decks[c.deck] || 0) + 1));
  ['terms', 'abbr', 'numbers', 'why', 'figures', 'concepts'].forEach((d) => { if (!decks[d]) err('cards', `deck ${d}`, 'deck is empty'); });
  panelIds.forEach((id) => { if (!(win.CARDS || []).some((c) => c.deck === 'figures' && c.img === id)) err('cards', `panel ${id}`, 'no figure-panel card shows this panel'); });
  const whyReq = [[/TSS|promoter/i, /delet/i, 'why delete the TSS'], [/MOI/, /0\.3/, 'why MOI 0.3'], [/two ASO/i, null, 'why two ASOs per target'], [/two .*cell lines|A549 and H460/i, null, 'why two cell lines'], [/normal|non-transformed|non-cancer/i, /ASO|toxic/i, 'why test normal cells']];
  whyReq.forEach(([a, b, label]) => { if (!(win.CARDS || []).some((c) => c.deck === 'why' && a.test(strip(c.front)) && (!b || b.test(strip(c.front + c.back))))) err('cards', 'why deck', `missing required card: ${label}`); });
  const fq = (win.QUIZZES || []).filter((z) => z.kind === 'figure');
  PAPER.figures.forEach((f) => { if (!fq.some((z) => z.ref === f.id)) err('quizzes', f.id, `no figure quiz for Figure ${f.num}`); });
  if ((win.EXAMS || []).length < 2) err('exams', 'count', `need 2 mock exams (have ${(win.EXAMS || []).length})`);
  if ((win.EXPLAIN || []).length < 12) err('explain', 'count', `need ≥ 12 explain-it-back prompts (have ${(win.EXPLAIN || []).length})`);
  if ((win.NUMBERS || []).length < 60) err('numbers', 'count', `need ≥ 60 key numbers (have ${(win.NUMBERS || []).length})`);
  if (!(win.SUMMARY || {}).onePage || !(win.SUMMARY || {}).cheat) err('summary', 'content', 'one-page summary and cheat sheet are required');
}

// ------------------------------------------------------------------------------------------------ report
const shown = problems.filter((p) => (p.level === 'error' || SHOW_WARN) && (p.file === undefined || true));
const byFile = {};
shown.forEach((p) => (byFile[p.file] = byFile[p.file] || []).push(p));
const errors = problems.filter((p) => p.level === 'error');
const warns = problems.filter((p) => p.level === 'warn');
if (!QUIET) {
  Object.keys(byFile).sort().forEach((f) => {
    console.log(`\n=== ${f} ===`);
    byFile[f].forEach((p) => console.log(`${p.level === 'error' ? 'ERROR' : 'warn '} ${p.where}: ${p.msg}`));
  });
}
const counts = `glossary ${(win.GLOSSARY_CONTENT || []).length}/${terms.length} · lessons ${(win.LESSON_CONTENT || []).length}/${PLAN.lessons.length} · G paragraphs ${Object.keys((win.TRACKG || {}).paras || {}).length} · panel guides ${Object.keys(win.PANELS || {}).length}/50 · figtext ${Object.keys(win.FIGTEXT || {}).length}/50 · cards ${(win.CARDS || []).length} · quizzes ${(win.QUIZZES || []).length} · exams ${(win.EXAMS || []).length} · explain ${(win.EXPLAIN || []).length} · numbers ${(win.NUMBERS || []).length}`;
console.log(`\n${errors.length} error(s), ${warns.length} warning(s)${SHOW_WARN ? '' : ' (use --warn to list warnings)'}${FINAL ? ' [final mode]' : scopeArg || filesArg ? ` [scope: ${(scopeArg || filesArg).join(',')}]` : ''}\n${counts}`);
process.exit(errors.length ? 1 : 0);
