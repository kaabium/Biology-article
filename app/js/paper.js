/* Paper engine: reading units, verbatim rendering, glossary term linking, tap popovers. */
(function () {
  'use strict';
  const P = (window.PP = {});
  const PAPER = () => window.PAPER;

  /* ---------- reading units (one page per unit) ---------- */
  let UNITS = null;
  P.units = () => {
    if (UNITS) return UNITS;
    const pp = PAPER();
    const bySec = {};
    pp.blocks.forEach((b) => (bySec[b.sec] = bySec[b.sec] || []).push(b));
    UNITS = [];
    let pending = [];
    let pendingSecs = [];
    pp.sections.forEach((s) => {
      const own = bySec[s.id] || [];
      const nonHead = own.filter((b) => !/^h\d$/.test(b.type));
      if (s.level === 4 && UNITS.length) {
        const u = UNITS[UNITS.length - 1];
        u.blocks.push(...own);
        u.secs.push(s.id);
        return;
      }
      if (!nonHead.length && !['m-krt', 'refs'].includes(s.id)) {
        pending.push(...own);
        pendingSecs.push(s.id);
        return;
      }
      UNITS.push({ id: s.id, title: s.title, level: s.level, kind: s.kind, parent: s.parent, blocks: pending.concat(own), secs: pendingSecs.concat([s.id]) });
      pending = [];
      pendingSecs = [];
    });
    return UNITS;
  };
  P.unitOf = (secOrBlockId) => {
    const pp = PAPER();
    const b = pp.blocks.find((x) => x.id === secOrBlockId);
    const sec = b ? b.sec : secOrBlockId;
    return P.units().find((u) => u.secs.includes(sec));
  };
  P.unitIndex = (id) => P.units().findIndex((u) => u.id === id);
  P.secTitle = (id) => {
    const s = PAPER().sections.find((x) => x.id === id);
    return s ? s.title : id;
  };
  P.block = (id) => PAPER().blocks.find((b) => b.id === id);
  P.figure = (id) => PAPER().figures.find((f) => f.id === id);
  P.panel = (pid) => {
    const f = P.figure(pid.replace(/[A-L]$/, ''));
    return f ? f.panels.find((p) => p.id === pid) : null;
  };
  P.pageLabel = (b) => (b.printed && b.printed.length ? 'p.' + b.printed.join('–') : '');

  /* ---------- glossary term linking ---------- */
  let TERMRE = null;
  let TERMMAP = null;
  P.termIndex = () => {
    if (TERMRE !== null) return { re: TERMRE, map: TERMMAP };
    const G = window.GLOSSARY || [];
    TERMMAP = new Map();
    const alts = [];
    G.forEach((g) => {
      const names = [g.term].concat(g.aliases || []);
      names.forEach((n) => {
        if (!n || n.length < 2) return;
        const key = g.cs ? n : n.toLowerCase();
        if (!TERMMAP.has(key)) TERMMAP.set(key, g);
        alts.push(n);
      });
    });
    alts.sort((a, b) => b.length - a.length);
    TERMRE = alts.length ? new RegExp(`(^|[^\\w-])(${alts.map(U.reEsc).join('|')})(s|es)?(?![\\w-])`, 'gi') : null;
    return { re: TERMRE, map: TERMMAP };
  };
  P.lookupTerm = (txt) => {
    const { map } = P.termIndex();
    if (map.has(txt)) return map.get(txt);
    const g = map.get(txt.toLowerCase());
    return g && !g.cs ? g : null;
  };
  P.termById = (id) => (window.GLOSSARY || []).find((g) => g.id === id);
  const SKIP = new Set(['A', 'BUTTON', 'SUP', 'SUB', 'CODE', 'SCRIPT', 'STYLE', 'TEXTAREA', 'MARK', 'H1', 'H2', 'H3', 'H4']);
  P.linkTerms = (root, opts) => {
    const { re } = P.termIndex();
    if (!re || !root) return;
    const once = opts && opts.once ? new Set() : null;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        let p = n.parentNode;
        while (p && p !== root) {
          if (SKIP.has(p.nodeName) || (p.classList && (p.classList.contains('term') || p.classList.contains('no-terms')))) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const text = node.nodeValue;
      re.lastIndex = 0;
      let m;
      let last = 0;
      const frag = document.createDocumentFragment();
      let changed = false;
      while ((m = re.exec(text))) {
        const pre = m[1];
        const word = m[2];
        const g = P.lookupTerm(word);
        if (!g || (once && once.has(g.id))) continue;
        const start = m.index + pre.length;
        const end = start + word.length + (m[3] ? m[3].length : 0);
        frag.appendChild(document.createTextNode(text.slice(last, start)));
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'term';
        b.dataset.term = g.id;
        b.textContent = text.slice(start, end);
        frag.appendChild(b);
        last = end;
        changed = true;
        if (once) once.add(g.id);
      }
      if (changed) {
        frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      }
    });
  };

  /* ---------- verbatim block rendering ---------- */
  P.renderBlock = (b, opts) => {
    opts = opts || {};
    const tools = opts.tools === false ? '' :
      `<div class="para-tools no-print"><span class="pid" title="Source ID">${b.id} · ${P.pageLabel(b)}</span>
        <button class="btn small ghost" data-ask="${b.id}" title="Copy a tutor prompt for this paragraph">🤖 Ask Claude</button>
        ${opts.studyLink && window.TRACKG && window.TRACKG.paras && window.TRACKG.paras[b.id] ? `<a class="btn small ghost" href="#/g/${P.unitOf(b.id).id}/${b.id}">🎓 Study this</a>` : ''}</div>`;
    if (b.type === 'h1') return `<h2 id="b-${b.id}" class="paper-h">${U.strip(b.html)}</h2>`;
    if (b.type === 'h2') return `<h3 id="b-${b.id}" class="paper-h">${b.html.replace(/<\/?b>/g, '')}</h3>`;
    if (b.type === 'h3' || b.type === 'h4') return `<h4 id="b-${b.id}" class="paper-h">${b.html.replace(/<\/?b>/g, '')}</h4>`;
    if (b.type === 'title') return `<h1 id="b-${b.id}" class="paper-title" style="font-family:var(--serif)">${b.html}</h1>`;
    if (b.type === 'figure') return P.renderFigureBlock(b.fig);
    const label = b.label ? `<div class="small muted" style="font-weight:700">${U.esc(b.label)}</div>` : '';
    const inner = b.type === 'li' ? `<div style="display:flex;gap:.5rem"><span aria-hidden="true">${b.level === 2 ? '○' : '●'}</span><div>${b.html}</div></div>` : b.html;
    return `<div class="para" id="b-${b.id}" data-id="${b.id}">${label}
      <div class="kind k-paper" style="margin:.5rem 0 .2rem${b.type === 'li' && b.level === 2 ? ';margin-left:1.4rem' : ''}">${opts.kindLabel ? `<div class="klabel">📄 Paper · verbatim · ${P.pageLabel(b)}</div>` : ''}<div class="ptext">${inner}</div></div>${tools}</div>`;
  };
  P.renderFigureBlock = (fid) => {
    const f = P.figure(fid);
    if (!f) return '';
    return `<div class="card" style="margin:1rem 0">
      <div class="row between"><b>Figure ${f.num}. ${U.esc(f.title)}</b><a class="btn small" href="#/figure/${f.id}">Open figure & panel guides →</a></div>
      <div class="zoom-slot" data-src="${window.FIGMETA[fid].img}" data-alt="Figure ${f.num}" style="margin-top:.6rem"></div>
      <p class="small muted">Tap a panel letter link in the text (e.g. “Figure ${f.num}A”) to see that panel with its legend.</p></div>`;
  };
  P.mountZooms = (root) => {
    U.$$('.zoom-slot', root).forEach((el) => {
      if (el.dataset.mounted) return;
      el.dataset.mounted = '1';
      const rect = el.dataset.rect ? JSON.parse(el.dataset.rect) : null;
      new window.Zoom(el, el.dataset.src, { alt: el.dataset.alt || '', rect, title: el.dataset.alt || '' });
    });
  };

  P.renderKRT = () => {
    const rows = [];
    PAPER().krt.forEach((c) => {
      rows.push(`<tr class="cat"><td colspan="3">${U.esc(c.category)}</td></tr>`);
      c.rows.forEach((r) => rows.push(`<tr id="b-${r.id}" data-id="${r.id}"><td>${r.cells[0]}</td><td>${r.cells[1]}</td><td>${r.cells[2]}</td></tr>`));
    });
    return `<div class="kind k-paper"><div class="klabel">📄 Paper · Key resources table · p.e1–e2</div>
      <div class="tablewrap"><table class="krt ptext no-terms"><thead><tr><th>REAGENT or RESOURCE</th><th>SOURCE</th><th>IDENTIFIER</th></tr></thead><tbody>${rows.join('')}</tbody></table></div></div>`;
  };
  P.renderRefs = () =>
    `<ol class="refs ptext">${PAPER().references.map((r) => `<li id="ref-${r.n}" value="${r.n}">${r.html}${r.doi ? '' : ''}</li>`).join('')}</ol>`;

  /* ---------- tap handling (delegated) ---------- */
  P.onClick = (e) => {
    const t = e.target;
    const cite = t.closest('.cite');
    if (cite) { e.preventDefault(); return P.showCites(cite.dataset.refs.split(',').map(Number), cite.dataset.unlinked); }
    const x = t.closest('a.xref');
    if (x) {
      e.preventDefault();
      if (x.classList.contains('fig')) return P.showFigRef(x.dataset.fig, x.dataset.panels, x.closest('[data-id]'));
      if (x.classList.contains('supp')) return P.showSupp(x.dataset.supp, x.dataset.panels, x.closest('[data-id]'), x.textContent);
      if (x.classList.contains('sec')) {
        const u = P.unitOf(x.dataset.sec);
        location.hash = `#/read/${u ? u.id : x.dataset.sec}`;
        return;
      }
    }
    const term = t.closest('.term');
    if (term) { e.preventDefault(); return P.showTerm(term.dataset.term); }
    const ask = t.closest('[data-ask]');
    if (ask) {
      e.preventDefault();
      const id = ask.dataset.ask;
      const S = U.sources()[id];
      if (S) {
        const what = S.kind === 'panel' ? 'figure panel (its legend, and what the figure shows)' : S.kind === 'ref' ? 'reference' : 'paragraph';
        U.askClaude({ what, where: S.label, text: S.kind === 'panel' ? `Legend: ${S.legend}` : S.text });
      }
    }
  };

  P.showCites = (nums, unlinked) => {
    const refs = PAPER().references;
    const body = nums.map((n) => {
      const r = refs[n - 1];
      return r ? `<div class="kind k-paper"><div class="klabel">Reference ${n}</div><div class="ptext">${r.html}</div></div>` : `<p>Reference ${n} not found.</p>`;
    }).join('') + (unlinked ? '<p class="small muted">Note: in the PDF this number is printed as a plain superscript (not a hyperlink). It is shown exactly as printed; see the QA notes in “About” for possible author citation slips.</p>' : '') +
      `<p class="small"><a href="#/refs/${nums[0]}" data-close>Open the full reference list →</a></p>`;
    U.modal({ title: nums.length > 1 ? `References ${nums.join(', ')}` : `Reference ${nums[0]}`, body });
  };

  P.showFigRef = (fid, panels, paraEl) => {
    const f = P.figure(fid);
    const meta = window.FIGMETA[fid];
    if (!f || !meta) return;
    const letters = (panels || '').split('').filter((l) => meta.panels[l]);
    let html = '';
    if (!letters.length) {
      html = `<div class="zoom-slot" data-src="${meta.img}" data-alt="Figure ${f.num}"></div>
        <p><b>Figure ${f.num}. ${U.esc(f.title)}</b></p>`;
    } else {
      html = letters.map((L) => {
        const p = f.panels.find((x) => x.letter === L);
        return `<div class="zoom-slot panelimg" data-src="${meta.panels[L].img}" data-alt="Figure ${f.num}${L}"></div>
          ${U.kind('paper', p ? p.legendHtml : '', { label: `📄 Paper · Figure ${f.num}${L} legend` })}
          <div class="row"><a class="btn small primary" href="#/panel/${fid}${L}" data-close>Panel guide →</a>
          <a class="btn small" href="#/figure/${fid}" data-close>Whole figure</a></div><hr>`;
      }).join('');
    }
    const m = U.modal({ title: `Figure ${f.num}${letters.join('')}`, body: html });
    P.mountZooms(m.body);
    P.linkTerms(m.body);
    m.body.addEventListener('click', P.onClick);
  };

  P.suppSentence = (paraEl, label) => {
    if (!paraEl) return '';
    const b = P.block(paraEl.dataset.id);
    if (!b) return '';
    const sents = b.text.split(/(?<=[.!?])\s+(?=[A-Z(])/);
    const key = label.replace(/^Figures?\s+/, '').trim();
    const hit = sents.find((s) => s.includes(key)) || '';
    return hit;
  };
  P.showSupp = (item, panels, paraEl, label) => {
    const sent = P.suppSentence(paraEl, label);
    U.modal({
      title: `${item}${panels || ''} · Supplementary`,
      body: `<div class="supp-note"><b>Supplementary: not in your PDF.</b> ${U.esc(item)} is part of the paper's online supplementary
        material, which is not included in this PDF (and no supplementary file is in this repository). This app only teaches
        what the main text says about it.</div>
        ${sent ? U.kind('paper', U.esc(sent), { label: '📄 What the main text says (verbatim sentence)' }) : ''}
        <p class="small muted">In exams, describe it the way the main text does — don't invent details about the supplementary panel.</p>`,
    });
  };

  P.showTerm = (id) => {
    const g = P.termById(id);
    if (!g) return;
    const kindLab = g.kind === 'paper' ? 'plain' : 'bgnd';
    const lesson = g.taughtIn && window.LESSON_INDEX && window.LESSON_INDEX[g.taughtIn];
    const body = `
      ${U.kind(kindLab, `<p><b>${U.esc(g.term)}</b>${g.full ? ` <span class="muted">(${U.esc(g.full)})</span>` : ''} — ${g.short}</p>`, { label: g.kind === 'paper' ? '💬 Plain English · how this paper uses it' : '📚 Background · not from the paper', source: g.source })}
      ${g.analogy ? U.kind('memory', `<p>${g.analogy}</p>`) : ''}
      <div class="row"><a class="btn small primary" href="#/term/${g.id}" data-close>Full entry →</a>
      ${lesson ? `<a class="btn small" href="#/lesson/${lesson.id}" data-close>Lesson: ${U.esc(lesson.title)}</a>` : ''}</div>`;
    U.modal({ title: g.term, body });
  };

  /* ---------- figure-legend helpers ---------- */
  P.legendNotes = (f) => f.notes.map((n) => U.kind('paper', n.html, { label: '📄 Paper · legend note' })).join('');
})();
