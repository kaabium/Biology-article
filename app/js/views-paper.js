/* Views: paper reader, references, figures, panels, Track G (paper section by section). */
(function () {
  'use strict';
  const V = (window.V = window.V || {});
  const PP = window.PP;
  const PAPER = () => window.PAPER;
  const TG = () => window.TRACKG || { paras: {}, units: {} };

  const citeBox = () => {
    const m = PAPER().meta;
    return `<div class="citation-box"><b>Paper:</b> ${U.esc(m.citation)}<br>${U.esc(m.license)}</div>`;
  };
  V.citeBox = citeBox;

  const kindLegend = `<div class="legend-kinds" aria-label="Content kinds"><span class="lp">📄 Paper = verbatim</span><span class="ll">💬 Plain English</span><span class="lb">📚 Background</span><span class="lm">💡 Memory aid</span></div>`;
  V.kindLegend = kindLegend;

  const GROUPS = [
    ['Front matter', (u) => ['cover', 'front', 'summary'].includes(u.id)],
    ['Main text', (u) => u.kind === 'main' && !['cover', 'front', 'summary', 'starmethods-toc', 'suppinfo'].includes(u.id)],
    ['End matter', (u) => ['starmethods-toc', 'suppinfo'].includes(u.id) || u.kind === 'back'],
    ['STAR★Methods', (u) => u.kind === 'methods'],
  ];

  /* ---------- Paper table of contents ---------- */
  V.paper = (root) => {
    const units = PP.units();
    const tg = TG();
    const toc = GROUPS.map(([g, f]) => {
      const us = units.filter(f);
      return `<h3>${g}</h3><div class="toc">${us.map((u) => `<a class="l${Math.min(u.level, 3)}" href="#/read/${u.id}">${U.esc(u.title)}</a>`).join('')}</div>`;
    }).join('');
    root.innerHTML = `
      <div class="paper-head"><div class="crumbs">The paper</div>
      <h1 class="page-title">${U.esc(PAPER().meta.title)}</h1>
      <p class="lead">Esposito, Polidori, et al. · <i>Cell Genomics</i> 2, 100171 · September 14, 2022</p></div>
      <div class="grid g2">
        <a class="card" href="#/read/summary"><h3>📄 Read the paper</h3><p class="muted small">Exactly as published (verbatim), with tap-to-define terms, tappable citations and figure links.</p></a>
        <a class="card" href="#/g"><h3>🎓 Study it section by section</h3><p class="muted small">Track G: each paragraph with Plain English, Why it matters, prerequisites and check questions.</p></a>
        <a class="card" href="#/figures"><h3>🖼 Figures & panel guides</h3><p class="muted small">Graphical abstract + Figures 1–6, every panel cropped, with legend and a “how to read it” guide.</p></a>
        <a class="card" href="#/refs"><h3>📚 References</h3><p class="muted small">All 118 references, numbered as in the paper.</p></a>
      </div>
      <div class="card" style="margin-top:1rem"><h2>Contents</h2>${toc}</div>
      ${citeBox()}`;
    return { title: 'The paper' };
  };

  /* ---------- verbatim reader ---------- */
  const unitBody = (u, opts) => {
    let html = '';
    u.blocks.forEach((b) => (html += PP.renderBlock(b, opts)));
    if (u.id === 'm-krt') html += PP.renderKRT();
    if (u.id === 'refs') html += PP.renderRefs();
    if (u.id === 'cover') html = `<div class="card"><b>Graphical abstract</b><div class="zoom-slot" data-src="${window.FIGMETA.ga.img}" data-alt="Graphical abstract" style="margin-top:.5rem"></div><p class="small"><a href="#/figure/ga">Open the graphical abstract guide →</a></p></div>` + html;
    return html;
  };
  const prevNext = (u, base) => {
    const units = PP.units();
    const i = units.indexOf(u);
    const p = units[i - 1];
    const n = units[i + 1];
    return `<div class="section-nav no-print">${p ? `<a class="btn" href="#/${base}/${p.id}">← ${U.esc(p.title)}</a>` : '<span></span>'}${n ? `<a class="btn primary" href="#/${base}/${n.id}">${U.esc(n.title)} →</a>` : ''}</div>`;
  };
  V.read = (root, [id, para]) => {
    const u = PP.units().find((x) => x.id === id) || PP.unitOf(id);
    if (!u) { root.innerHTML = '<p>Section not found.</p>'; return {}; }
    root.innerHTML = `
      <div class="crumbs"><a href="#/paper">The paper</a> › ${U.esc(u.title)}</div>
      <div class="row between"><h1 class="page-title" style="font-family:var(--serif)">${U.esc(u.title)}</h1>
        ${TG().units && TG().units[u.id] ? `<a class="btn small" href="#/g/${u.id}">🎓 Study mode</a>` : ''}</div>
      <div class="kind k-paper"><div class="klabel">📄 Paper · verbatim</div><p class="small" style="margin:.2rem 0">Everything in grey boxes on this page is the paper's own text, exactly as printed. Dotted words open the glossary; blue numbers open references; “Figure” links open the panel.</p></div>
      <div class="paper-body">${unitBody(u, { studyLink: true })}</div>
      ${prevNext(u, 'read')}${citeBox()}`;
    PP.mountZooms(root);
    U.$$('.paper-body .para .ptext', root).forEach((el) => PP.linkTerms(el, { once: true }));
    if (para) {
      const el = document.getElementById('b-' + para) || document.getElementById(para);
      if (el) {
        el.setAttribute('data-scroll-target', '1');
        el.style.outline = '3px solid var(--warn)';
        el.style.borderRadius = '10px';
        setTimeout(() => el.scrollIntoView({ block: 'center' }), 80);
      }
    }
    return { title: `Paper · ${u.title}` };
  };

  V.refs = (root, [n]) => {
    root.innerHTML = `<div class="crumbs"><a href="#/paper">The paper</a> › References</div>
      <h1 class="page-title">References</h1>
      <p class="muted small">118 references, verbatim. Tap a blue citation number anywhere in the paper to see its reference.</p>
      <div class="kind k-paper"><div class="klabel">📄 Paper · verbatim</div>${PP.renderRefs()}</div>${citeBox()}`;
    if (n) {
      const li = document.getElementById('ref-' + n);
      if (li) { li.classList.add('flash'); setTimeout(() => li.scrollIntoView({ block: 'center' }), 60); }
    }
    return { title: 'References' };
  };

  /* ---------- figures ---------- */
  const figSeen = (f) => f.panels.filter((p) => S.seen(p.id)).length;
  V.figures = (root) => {
    const figs = PAPER().figures;
    const ga = window.FIGMETA.ga;
    root.className = 'wide';
    root.innerHTML = `<div class="crumbs"><a href="#/paper">The paper</a> › Figures</div>
      <h1 class="page-title">Figures & panel guides</h1>
      <p class="lead">Every figure at full resolution (pinch to zoom) and every lettered panel as its own image, with the verbatim legend and a step-by-step reading guide.</p>
      <div class="grid g3">
        <a class="card" href="#/figure/ga"><img src="${U.img(ga.img)}" alt="Graphical abstract" loading="lazy" style="background:#fff;border-radius:8px;aspect-ratio:1;object-fit:contain;width:100%"><h3>Graphical abstract</h3><p class="small muted">The whole study in one picture.</p></a>
        ${figs.map((f) => `<a class="card" href="#/figure/${f.id}"><img src="${U.img(window.FIGMETA[f.id].img)}" alt="Figure ${f.num}" loading="lazy" style="background:#fff;border-radius:8px;aspect-ratio:1;object-fit:contain;width:100%">
          <h3>Figure ${f.num}</h3><p class="small">${U.esc(f.title)}</p>${U.bar(U.pct(figSeen(f), f.panels.length))}<p class="tiny muted">${figSeen(f)}/${f.panels.length} panels studied</p></a>`).join('')}
      </div>${citeBox()}`;
    return { title: 'Figures' };
  };

  const citingParas = (fid, letter) => {
    const out = [];
    PAPER().blocks.forEach((b) => {
      const re = new RegExp(`data-fig="${fid}" data-panels="([A-L]*)"`, 'g');
      let m;
      while ((m = re.exec(b.html))) {
        if (!letter || !m[1] || m[1].includes(letter)) { out.push(b); break; }
      }
    });
    return out;
  };
  V.citingParas = citingParas;

  V.figure = (root, [fid]) => {
    if (fid === 'ga') return V.gaView(root);
    const f = PP.figure(fid);
    const meta = window.FIGMETA[fid];
    if (!f) { root.innerHTML = '<p>Figure not found.</p>'; return {}; }
    const quiz = (window.QUIZZES || []).find((q) => q.ref === fid);
    root.className = 'wide';
    root.innerHTML = `<div class="crumbs"><a href="#/figures">Figures</a> › Figure ${f.num}</div>
      <h1 class="page-title">Figure ${f.num}. ${U.esc(f.title)}</h1>
      <div class="zoom-slot" data-src="${meta.img}" data-alt="Figure ${f.num}"></div>
      <p class="small muted">Pinch or double-tap to zoom; ⛶ for full screen. On a computer: Ctrl/⌘ + scroll.</p>
      <div class="row no-print">${quiz ? `<a class="btn primary" href="#/quiz/${quiz.id}">✅ Figure ${f.num} quiz</a>` : ''}
        <button class="btn" data-askfig>🤖 Ask Claude about this figure</button></div>
      <h2>Panels</h2>
      <div class="panel-grid">${f.panels.map((p) => `<a class="panel-thumb ${S.seen(p.id) ? 'seen' : ''}" href="#/panel/${p.id}"><img src="${U.img(meta.panels[p.letter].img)}" alt="Panel ${p.letter}" loading="lazy"><b>${f.num}${p.letter}</b><span class="tiny">${U.esc(((window.PANELS || {})[p.id] || {}).short || p.legend.slice(4, 60))}</span></a>`).join('')}</div>
      <h2>Legend</h2>
      ${U.kind('paper', `<p><b>Figure ${f.num}. ${f.titleHtml}</b></p>${f.panels.map((p) => `<p>${p.legendHtml}</p>`).join('')}${f.notes.map((n) => `<p>${n.html}</p>`).join('')}`, { label: `📄 Paper · Figure ${f.num} legend · p.${f.pages.map((x) => x - 1).join('–')}` })}
      <h2>Where the text discusses it</h2>
      <div class="appears">${citingParas(fid).map((b) => `<a href="#/read/${PP.unitOf(b.id).id}/${b.id}">${U.esc(U.sources()[b.id].label)} — “${U.esc(b.text.slice(0, 90))}…”</a>`).join('')}</div>
      ${citeBox()}`;
    PP.mountZooms(root);
    PP.linkTerms(root.querySelector('.kind.k-paper'));
    root.querySelector('[data-askfig]').addEventListener('click', () =>
      U.askClaude({ what: 'figure (its title and legend)', where: `Figure ${f.num}`, text: `Figure ${f.num}. ${f.title}\n` + f.panels.map((p) => p.legend).join('\n') }));
    return { title: `Figure ${f.num}` };
  };

  V.gaView = (root) => {
    const g = (window.PANELS || {}).ga || {};
    root.innerHTML = `<div class="crumbs"><a href="#/figures">Figures</a> › Graphical abstract</div>
      <h1 class="page-title">Graphical abstract</h1>
      <div class="zoom-slot" data-src="${window.FIGMETA.ga.img}" data-alt="Graphical abstract"></div>
      ${U.kind('flag', '<p>The graphical abstract has no panel letters and no legend in the PDF. Its words (e.g. “Cancer Hallmark in Lung LncRNA”) are part of the picture.</p>')}
      ${guideHtml(g, 'ga')}${citeBox()}`;
    PP.mountZooms(root);
    PP.linkTerms(root.querySelector('.guide'));
    S.markSeen('ga');
    return { title: 'Graphical abstract' };
  };

  function guideHtml(g, pid) {
    if (!g || !g.question) return `<div class="card"><p class="muted">The reading guide for this panel is being written.</p></div>`;
    const kn = (g.keyNumbers || []).map((k) => `<li><b>${k.value}</b> — ${k.meaning} <span class="srcline">(${U.srcLinks(k.source || [pid])})</span></li>`).join('');
    return `<div class="guide">
      ${U.kind('plain', `<p><b>Question this panel answers:</b> ${g.question}</p>`)}
      ${U.kind('plain', `<p><b>How to read it</b></p>${g.howToRead}`, { label: '💬 Plain English · how to read it' })}
      ${U.kind('plain', `<p><b>What it shows</b></p>${g.shows}`, { label: '💬 Plain English · what it shows' })}
      ${kn ? U.kind('plain', `<p><b>Key numbers</b></p><ul>${kn}</ul>`, { label: '💬 Plain English · key numbers (with sources)' }) : ''}
      ${g.background ? U.kind('bgnd', g.background) : ''}
      ${g.memory ? U.kind('memory', `<p>${g.memory}</p>`) : ''}
      ${(g.flags || []).map((x) => U.kind('flag', `<p>${x}</p>`)).join('')}
      ${g.examQ ? `<div class="card"><b>🎓 Likely exam question</b><p>${g.examQ.q}</p><details><summary>Show a model answer</summary>${U.kind('plain', `<p>${g.examQ.a}</p>`, { label: '💬 Model answer' })}</details></div>` : ''}
      ${(g.chartTypes || []).length ? `<p class="small">Chart type: ${g.chartTypes.map((c) => { const l = window.LESSON_INDEX && window.LESSON_INDEX[c]; return l ? `<a class="chip" href="#/lesson/${l.id}">${U.esc(l.title)}</a>` : `<span class="chip">${U.esc(c)}</span>`; }).join(' ')}</p>` : ''}
    </div>`;
  }
  V.guideHtml = guideHtml;

  V.panel = (root, [pid]) => {
    const fid = pid.replace(/[A-L]$/, '');
    const letter = pid.slice(-1);
    const f = PP.figure(fid);
    const meta = window.FIGMETA[fid];
    const p = PP.panel(pid);
    if (!f || !p) { root.innerHTML = '<p>Panel not found.</p>'; return {}; }
    const g = (window.PANELS || {})[pid] || {};
    const i = f.panels.indexOf(p);
    const prev = f.panels[i - 1];
    const next = f.panels[i + 1];
    const cites = citingParas(fid, letter);
    root.innerHTML = `<div class="crumbs"><a href="#/figures">Figures</a> › <a href="#/figure/${fid}">Figure ${f.num}</a> › Panel ${letter}</div>
      <h1 class="page-title">Figure ${f.num}${letter}${g.short ? ` · ${U.esc(g.short)}` : ''}</h1>
      <div class="zoom-slot panelimg" data-src="${meta.panels[letter].img}" data-alt="Figure ${f.num}${letter}"></div>
      ${U.kind('paper', p.legendHtml, { label: `📄 Paper · legend for panel ${letter} · p.${p.pages.map((x) => x - 1).join('–')}` })}
      ${f.notes.length ? PP.legendNotes(f) : ''}
      <div class="row no-print"><button class="btn small" data-ask="${pid}">🤖 Ask Claude about this panel</button>
        <button class="btn small" data-showfull>🔍 Show it inside the whole figure</button></div>
      <h2>Panel guide</h2>
      ${guideHtml(g, pid)}
      <h2>Where the text cites it</h2>
      <div class="appears">${cites.length ? cites.map((b) => `<a href="#/read/${PP.unitOf(b.id).id}/${b.id}">${U.esc(U.sources()[b.id].label)} — “${U.esc(b.text.slice(0, 90))}…”</a>`).join('') : '<p class="muted small">Only the legend refers to this panel.</p>'}</div>
      <div class="section-nav">${prev ? `<a class="btn" href="#/panel/${prev.id}">← ${f.num}${prev.letter}</a>` : '<span></span>'}${next ? `<a class="btn primary" href="#/panel/${next.id}">${f.num}${next.letter} →</a>` : `<a class="btn primary" href="#/figure/${fid}">Back to Figure ${f.num}</a>`}</div>
      ${citeBox()}`;
    PP.mountZooms(root);
    U.$$('.kind', root).forEach((k) => PP.linkTerms(k));
    root.querySelector('[data-showfull]').addEventListener('click', () =>
      window.Zoom.fullscreen(meta.img, { title: `Figure ${f.num} (panel ${letter} highlighted)`, rect: meta.panels[letter].rect, focus: meta.panels[letter].rect }));
    S.markSeen(pid);
    return { title: `Figure ${f.num}${letter}` };
  };

  /* ---------- Track G: the paper, section by section ---------- */
  V.gIndex = (root) => {
    const tg = TG();
    const groups = [['main', 'Main text'], ['back', 'Declaration of interests, contributions, acknowledgments'], ['methods', 'STAR★Methods (every section has a plain-English layer)']];
    const row = (st) => {
      const seen = st.paras.filter((id) => S.seen(id)).length;
      const written = tg.units && tg.units[st.unit] && st.paras.every((id) => tg.paras[id] && tg.paras[id].plain);
      const done = st.paras.length && seen === st.paras.length;
      return `<a class="lesson-row ${done ? 'done' : ''}" href="#/g/${st.unit}"><span class="num">${done ? '✓' : st.paras.length}</span>
        <span class="grow"><b>${U.esc(st.title)}</b><br><span class="meta">${seen}/${st.paras.length} paragraphs studied${written ? '' : ' · study layer being written'}</span></span></a>`;
    };
    root.innerHTML = `<div class="crumbs"><a href="#/learn">Learn</a> › Track G</div>
      <h1 class="page-title">🎓 Track G · The paper, section by section</h1>
      <p class="lead">Each paragraph: the PAPER text, then a Plain-English translation, why it matters, links to the basics you need, and 1–2 check questions. Every figure panel has its own guide.</p>
      ${kindLegend}
      ${groups.map(([g, name]) => { const sts = V.gSteps.filter((x) => x.group === g); return sts.length ? `<div class="card" style="margin-top:1rem"><h2>${name}</h2>${sts.map(row).join('')}</div>` : ''; }).join('')}
      <div class="card" style="margin-top:1rem"><h2>Also in the paper</h2><p class="small muted">These parts need no extra explanation, but you can read them verbatim.</p>
      <a class="lesson-row" href="#/g/front"><span class="grow">Title, authors and affiliations</span></a>
      <a class="lesson-row" href="#/g/starmethods-toc"><span class="grow">STAR★Methods contents list</span></a>
      <a class="lesson-row" href="#/g/m-krt"><span class="grow">Key resources table</span></a>
      <a class="lesson-row" href="#/read/refs"><span class="grow">References</span></a></div>`;
    return { title: 'Track G · Paper section by section' };
  };

  const checkHtml = (q, qid) => {
    const opts = U.shuffle(q.options.map((o, i) => Object.assign({ i }, o)), qid);
    return `<div class="q card" data-qid="${qid}"><div class="qtext">✅ ${q.q}</div>
      <div class="opts">${opts.map((o) => `<button class="opt" data-ok="${o.ok ? 1 : 0}"><span>${o.t}</span><span class="why hidden">${o.ok ? '✔ ' : '✘ '}${o.why || ''}</span></button>`).join('')}</div>
      <div class="row" style="margin-top:.5rem"><button class="btn small ghost" data-askq>🤖 Ask Claude about this question</button>${q.source ? `<span class="srcline">Source: ${U.srcLinks(q.source)}</span>` : ''}</div></div>`;
  };
  V.checkHtml = checkHtml;
  V.wireChecks = (root, topicsFor) => {
    root.addEventListener('click', (e) => {
      const opt = e.target.closest('.opt');
      if (opt && !opt.disabled) {
        const box = opt.closest('.q');
        const ok = opt.dataset.ok === '1';
        U.$$('.opt', box).forEach((o) => {
          o.disabled = true;
          if (o.dataset.ok === '1') o.classList.add('correct');
          U.$('.why', o).classList.remove('hidden');
        });
        if (!ok) opt.classList.add('wrong');
        S.answer(box.dataset.qid, ok, topicsFor ? topicsFor(box.dataset.qid) : null);
        box.dispatchEvent(new CustomEvent('answered', { bubbles: true, detail: { ok } }));
        return;
      }
      const ask = e.target.closest('[data-askq]');
      if (ask) {
        const box = ask.closest('.q');
        const txt = U.$('.qtext', box).textContent.replace(/^✅\s*/, '') + '\nOptions:\n' + U.$$('.opt > span:first-child', box).map((s, i) => `${String.fromCharCode(65 + i)}) ${s.textContent}`).join('\n');
        U.askClaude({ what: 'quiz question (please explain why each option is right or wrong)', text: txt });
      }
    });
  };

  V.g = (root, [id, para]) => {
    const u = PP.units().find((x) => x.id === id) || PP.unitOf(id);
    if (!u) { root.innerHTML = '<p>Section not found.</p>'; return {}; }
    const tg = TG();
    const unitInfo = (tg.units && tg.units[u.id]) || {};
    let html = '';
    u.blocks.forEach((b) => {
      if (/^h\d$/.test(b.type) || b.type === 'title') { html += PP.renderBlock(b); return; }
      if (b.type === 'figure') { html += PP.renderFigureBlock(b.fig) + figurePanelLinks(b.fig); return; }
      const L = tg.paras[b.id] || {};
      const preIds = [...new Set((L.prereqs || []).concat(PP.autoPrereqs(b.text, 5)))];
      const pre = preIds.map((lid) => { const l = window.LESSON_INDEX && window.LESSON_INDEX[lid]; return l && l.track !== 'G' ? `<a class="chip" href="#/lesson/${lid}">${U.esc(l.id)} · ${U.esc(l.title)}</a>` : ''; }).join('');
      html += `<section class="card g-para" id="g-${b.id}" data-id="${b.id}">
        ${PP.renderBlock(b, { kindLabel: true })}
        ${L.plain ? U.kind('plain', L.plain, { source: [b.id] }) : (tg.units && tg.units[u.id] ? '' : '<p class="muted small">No separate plain-English layer: this part is administrative or already plain.</p>')}
        ${(L.flags || []).map((x) => U.kind('flag', `<p>${x}</p>`)).join('')}
        ${L.why ? U.kind('why', `<p>${L.why}</p>`) : ''}
        ${L.memory ? U.kind('memory', `<p>${L.memory}</p>`) : ''}
        ${pre ? `<div class="small"><b>Basics you need:</b> <span class="prereq-links">${pre}</span></div>` : ''}
        ${(L.checks || []).map((q, i) => checkHtml(q, `g:${b.id}:${i}`)).join('')}
      </section>`;
    });
    if (u.id === 'm-krt') html += PP.renderKRT();
    root.innerHTML = `<div class="crumbs"><a href="#/g">Track G</a> › ${U.esc(u.title)}</div>
      <div class="row between"><h1 class="page-title">${U.esc(u.title)}</h1><a class="btn small" href="#/read/${u.id}">📄 Plain reading view</a></div>
      ${kindLegend}
      ${unitInfo.intro ? U.kind('plain', unitInfo.intro, { label: '💬 Plain English · what this section is about' }) : ''}
      <div class="g-body">${html}</div>
      ${unitInfo.recap ? U.kind('plain', unitInfo.recap, { label: '💬 Plain English · section recap' }) : ''}
      <div class="row no-print" style="margin-top:1rem"><button class="btn good" data-markall>✓ Mark this section as studied</button></div>
      ${prevNext(u, 'g')}${citeBox()}`;
    PP.mountZooms(root);
    U.$$('.g-para .kind.k-paper .ptext', root).forEach((el) => PP.linkTerms(el, { once: true }));
    U.$$('.g-para .kind:not(.k-paper), .kind.k-plain', root).forEach((k) => PP.linkTerms(k, { once: true }));
    V.wireChecks(root, () => ['G-' + u.id]);
    root.querySelector('[data-markall]').addEventListener('click', () => {
      u.blocks.forEach((b) => S.markSeen(b.id));
      S.activity();
      U.toast('Section marked as studied ✓');
    });
    // mark paragraphs as seen when scrolled into view
    let io = null;
    if (window.IntersectionObserver) {
      io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) S.markSeen(en.target.dataset.id); }), { threshold: 0.6 });
      U.$$('.g-para', root).forEach((el) => io.observe(el));
    }
    if (para) {
      const el = document.getElementById('g-' + para);
      if (el) { el.setAttribute('data-scroll-target', '1'); el.style.outline = '3px solid var(--warn)'; }
    }
    return { title: `Track G · ${u.title}`, cleanup: () => io && io.disconnect() };
  };
  function figurePanelLinks(fid) {
    const f = PP.figure(fid);
    return `<div class="chips" style="margin:-.4rem 0 1rem">${f.panels.map((p) => `<a class="chip" href="#/panel/${p.id}">${f.num}${p.letter} guide</a>`).join('')}</div>`;
  }
})();
