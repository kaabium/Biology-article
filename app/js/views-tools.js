/* Views: glossary, term, key numbers, summary, cheat sheet, planner, search, settings. */
(function () {
  'use strict';
  const V = (window.V = window.V || {});
  const PP = window.PP;
  const G = () => window.GLOSSARY || [];
  const CATS = {
    biology: 'Biology', cancer: 'Cancer', lab: 'Lab tools', screen: 'CRISPR screens', aso: 'ASOs & validation',
    seq: 'Sequencing & data', stats: 'Numbers & statistics', paper: 'Paper-specific names', figures: 'Reading figures', general: 'General science',
  };

  /* where does a glossary term appear? (paragraph ids) */
  const termRe = (g) => new RegExp(`(^|[^\\w-])(${[g.term].concat(g.aliases || []).filter((x) => x && x.length > 1).map(U.reEsc).join('|')})(s|es)?(?![\\w-])`, g.cs ? 'g' : 'gi');
  V.termAppears = (g) => {
    const re = termRe(g);
    const out = [];
    window.PAPER.blocks.forEach((b) => { if (b.text && (re.lastIndex = 0, re.test(b.text))) out.push(b.id); });
    window.PAPER.figures.forEach((f) => f.panels.forEach((p) => { if ((re.lastIndex = 0, re.test(p.legend))) out.push(p.id); }));
    return out;
  };

  V.glossary = (root, args, query) => {
    const cat = query.get('cat') || '';
    root.innerHTML = `<h1 class="page-title">🔤 Glossary</h1>
      <p class="lead">${G().length} terms. Each has a one-line definition, a longer plain explanation, an analogy, and links to every paragraph that uses it.</p>
      <input type="search" id="gq" placeholder="Search terms… (e.g. ASO, FDR, TSS)" value="${U.esc(query.get('q') || '')}">
      <div class="chips" style="margin:.6rem 0">${[['', 'All']].concat(Object.entries(CATS)).filter(([k]) => !k || G().some((g) => g.cat === k)).map(([k, n]) => `<a class="chip ${cat === k ? 'on' : ''}" href="#/glossary${k ? '?cat=' + k : ''}">${n}</a>`).join('')}</div>
      <div class="card" id="glist"></div>`;
    const list = U.$('#glist', root);
    const draw = (q) => {
      q = (q || '').toLowerCase().trim();
      const items = G().filter((g) => (!cat || g.cat === cat) && (!q || [g.term, g.full || '', g.short, (g.aliases || []).join(' ')].join(' ').toLowerCase().includes(q)))
        .sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));
      list.innerHTML = items.map((g) => `<a class="lesson-row" href="#/term/${g.id}"><span class="grow"><b>${U.esc(g.term)}</b>${g.full ? ` <span class="muted small">(${U.esc(g.full)})</span>` : ''}<br><span class="meta">${U.strip(g.short)}</span></span><span class="tag">${CATS[g.cat] || ''}</span></a>`).join('') || '<p class="muted">No matching terms.</p>';
    };
    U.$('#gq', root).addEventListener('input', U.debounce((e) => draw(e.target.value), 120));
    draw(query.get('q'));
    return { title: 'Glossary' };
  };

  V.term = (root, [id]) => {
    const g = G().find((x) => x.id === id);
    if (!g) { root.innerHTML = '<p>Term not found.</p>'; return {}; }
    const apps = V.termAppears(g);
    const lesson = g.taughtIn && window.LESSON_INDEX[g.taughtIn];
    const usedIn = (window.LESSONS || []).filter((l) => l.id !== g.taughtIn && termRe(g).test(U.strip((l.body || []).map((b) => b.html || '').join(' '))));
    const isPaper = g.kind === 'paper';
    root.innerHTML = `<div class="crumbs"><a href="#/glossary">Glossary</a> › ${U.esc(g.term)}</div>
      <h1 class="page-title">${U.esc(g.term)}</h1>${g.full ? `<p class="lead">${U.esc(g.full)}</p>` : ''}
      <div class="row small"><span class="tag">${CATS[g.cat] || ''}</span>${lesson ? `<a class="chip" href="#/lesson/${lesson.id}">Taught in: ${U.esc(lesson.title)}</a>` : ''}</div>
      ${U.kind(isPaper ? 'plain' : 'bgnd', `<p><b>In one line:</b> ${g.short}</p>${g.long ? `<p>${g.long}</p>` : ''}`, { label: isPaper ? '💬 Plain English · as used in this paper' : '📚 Background · not from the paper', source: g.source })}
      ${g.analogy ? U.kind('memory', `<p>${g.analogy}</p>`) : ''}
      ${g.paperUse ? U.kind('paper', U.esc(g.paperUse.quote), { label: '📄 Paper · example of use', source: [g.paperUse.ref] }) : ''}
      ${(g.see || []).length ? `<p class="small"><b>Related:</b> ${g.see.map((s) => { const t = G().find((x) => x.id === s); return t ? `<a class="chip" href="#/term/${t.id}">${U.esc(t.term)}</a>` : ''; }).join(' ')}</p>` : ''}
      <div class="card"><h3>Where it appears in the paper (${apps.length})</h3><div class="appears small">${apps.map((pid) => { const S = U.sources()[pid]; return S ? `<a href="${S.href}">${U.esc(S.label)}</a>` : ''; }).join('') || '<span class="muted">Not used in the paper text itself (background term).</span>'}</div></div>
      ${usedIn.length ? `<div class="card"><h3>Lessons that use it</h3><div class="chips">${usedIn.map((l) => `<a class="chip" href="#/lesson/${l.id}">${U.esc(l.title)}</a>`).join('')}</div></div>` : ''}`;
    U.$$('.kind', root).forEach((k) => PP.linkTerms(k));
    return { title: `Term · ${g.term}` };
  };

  /* ---------- key numbers ---------- */
  V.numbers = (root) => {
    const N = window.NUMBERS || [];
    const groups = [];
    N.forEach((n) => { if (!groups.includes(n.group)) groups.push(n.group); });
    root.innerHTML = `<h1 class="page-title">🔢 Key numbers</h1>
      <p class="lead">Every important number, what it means, and exactly where it comes from. Where the paper gives different numbers for the same thing, both are shown — nothing is guessed.</p>
      <input type="search" id="nq" placeholder="Filter numbers…">
      <div id="nlist"></div>`;
    const draw = (q) => {
      q = (q || '').toLowerCase();
      U.$('#nlist', root).innerHTML = groups.map((gname) => {
        const items = N.filter((n) => n.group === gname && (!q || U.strip(n.value + ' ' + n.meaning + ' ' + (n.note || '')).toLowerCase().includes(q)));
        if (!items.length) return '';
        return `<div class="card"><h3>${U.esc(gname)}</h3>${items.map((n) => `<div class="result"><div class="row between"><b style="font-size:1.1rem">${n.value}</b>${n.conflict ? '<span class="badge warn">numbers differ in the paper</span>' : ''}</div>
          <div>${n.meaning}</div>${n.note ? `<div class="small" style="color:var(--warn)">⚠️ ${n.note}</div>` : ''}<div class="srcline">Source: ${U.srcLinks(n.source)}</div></div>`).join('')}</div>`;
      }).join('') || '<p class="muted">Nothing matches.</p>';
      PP.linkTerms(U.$('#nlist', root));
    };
    U.$('#nq', root).addEventListener('input', U.debounce((e) => draw(e.target.value), 150));
    draw('');
    return { title: 'Key numbers' };
  };

  /* ---------- summary & cheat sheet ---------- */
  V.summary = (root) => {
    const s = window.SUMMARY || {};
    root.innerHTML = `<h1 class="page-title">📝 One-page summary</h1>${V.kindLegend}<div class="summary-body">${s.onePage || '<p class="muted">Being written.</p>'}</div>
      <div class="row no-print"><button class="btn" onclick="window.print()">🖨 Print</button><a class="btn" href="#/cheatsheet">Cheat sheet →</a></div>${V.citeBox()}`;
    PP.mountZooms(root);
    U.$$('.summary-body .kind', root).forEach((k) => PP.linkTerms(k));
    return { title: 'One-page summary' };
  };
  V.cheatsheet = (root) => {
    const s = window.SUMMARY || {};
    root.className = 'wide';
    root.innerHTML = `<div class="row between no-print"><h1 class="page-title">🖨 Cheat sheet</h1><button class="btn primary" onclick="window.print()">Print / save as PDF</button></div>
      <div class="print-cols">${s.cheat || '<p class="muted">Being written.</p>'}</div>${V.citeBox()}`;
    return { title: 'Cheat sheet' };
  };

  /* ---------- planner (a living plan: recomputed from today's progress) ---------- */
  V.buildPlan = () => {
    const st = S.get();
    const p = st.plan;
    if (!p || !p.examDate) return null;
    const today = U.dayNum();
    const exam = U.dayNum(p.examDate);
    const nDays = exam - today; // study days: today .. exam-1
    if (nDays < 1) return { error: 'Your exam date is today or in the past. Pick a future date.' };
    const cap = Math.max(20, (p.minutes || 45) - 10);
    const steps = V.path.filter((id) => !V.stepDone(id) && !(p.skipMethods && window.LESSON_INDEX[id].methods));
    const quizIds = (window.QUIZZES || []).filter((q) => q.kind === 'figure').map((q) => q.id).filter((q) => !(st.quizzes[q]));
    const exams = (window.EXAMS || []).map((e) => e.id);
    const reserve = nDays >= 5 ? 2 : nDays >= 3 ? 1 : 0;
    const learnDays = Math.max(1, nDays - reserve);
    const days = [];
    for (let i = 0; i < nDays; i++) days.push({ date: U.fromDayNum(today + i), tasks: [] });
    // spread lessons evenly (by minutes) over the learning days
    const totalMin = steps.reduce((a, id) => a + (window.LESSON_INDEX[id].minutes || 7), 0);
    const perDay = Math.max(cap * 0.5, Math.min(cap * 1.6, totalMin / learnDays));
    let d = 0;
    let used = 0;
    steps.forEach((id) => {
      const s = window.LESSON_INDEX[id];
      const m = s.minutes || 7;
      if (used > 0 && used + m > perDay && d < learnDays - 1) { d += 1; used = 0; }
      days[d].tasks.push({ id: 'step:' + id, label: `${s.track === 'G' ? 'Paper: ' : ''}${s.title}`, href: V.stepHref(id), min: m, auto: true, done: V.stepDone(id) });
      used += m;
    });
    // figure quizzes go on the learning days after the paper sections that teach them
    quizIds.forEach((qid, k) => {
      const di = Math.min(learnDays - 1, Math.floor(((k + 1) * learnDays) / (quizIds.length + 1)));
      const q = window.QUIZZES.find((x) => x.id === qid);
      days[di].tasks.push({ id: 'quiz:' + qid, label: q.title, href: '#/quiz/' + qid, min: 10 });
    });
    days.forEach((day, i) => {
      day.tasks.unshift({ id: 'cards:' + day.date, label: 'Flashcards: review everything due', href: '#/cards/review', min: 10 });
      if (i >= learnDays) {
        const ex = exams[i - learnDays] || exams[exams.length - 1];
        if (ex) day.tasks.push({ id: 'exam:' + ex + ':' + day.date, label: `Mock exam: ${window.EXAMS.find((e) => e.id === ex).title}`, href: '#/exam/' + ex, min: 60 });
        day.tasks.push({ id: 'weak:' + day.date, label: 'Revisit your weakest topics (see Home)', href: '#/', min: 15 });
      }
      if (i === nDays - 1) day.tasks.push({ id: 'cheat:' + day.date, label: 'Read the one-page summary and cheat sheet', href: '#/summary', min: 15 });
    });
    return { days, exam: p.examDate, nDays, steps: steps.length };
  };
  const taskHtml = (t) => {
    const st = S.get();
    const done = t.auto ? t.done : !!(st.plan.done || {})[t.id];
    return `<div class="task"><input type="checkbox" data-task="${t.id}" ${done ? 'checked' : ''} ${t.auto ? 'disabled title="Ticks itself when you finish the lesson"' : ''}><a href="${t.href}">${U.esc(t.label)}</a><span class="tiny muted nowrap">~${t.min} min</span></div>`;
  };
  V.planToday = () => {
    const plan = V.buildPlan();
    if (!plan || plan.error) return null;
    const d = plan.days[0];
    return `<p class="small muted">${plan.nDays} day(s) until your exam on ${U.fmtDay(plan.exam)}.</p>${d.tasks.map(taskHtml).join('')}`;
  };
  V.planner = (root) => {
    const st = S.get();
    const p = st.plan || {};
    const plan = V.buildPlan();
    root.innerHTML = `<h1 class="page-title">🗓 Study planner</h1>
      <div class="card"><label class="field" for="ed">Exam date</label><input type="date" id="ed" value="${p.examDate || ''}" min="${U.today()}">
        <label class="field" for="mpd">Minutes per day</label><input type="number" id="mpd" min="15" max="300" step="5" value="${p.minutes || 45}">
        <label class="checklist"><label><input type="checkbox" id="skm" ${p.skipMethods ? 'checked' : ''}> Skip the STAR Methods sections in the plan (they stay available)</label></label>
        <div class="row"><button class="btn primary" id="mk">${p.examDate ? 'Update plan' : 'Build my plan'}</button>${p.examDate ? '<button class="btn ghost" id="clr">Remove plan</button>' : ''}</div>
        <p class="small muted">The plan is “living”: it is rebuilt from your real progress every time you open it, so falling behind or racing ahead never breaks it.</p></div>
      <div id="plan"></div>`;
    const show = () => {
      const pl = V.buildPlan();
      const el = U.$('#plan', root);
      if (!pl) { el.innerHTML = ''; return; }
      if (pl.error) { el.innerHTML = U.kind('flag', `<p>${pl.error}</p>`); return; }
      el.innerHTML = `<p><b>${pl.steps}</b> lessons/sections left · <b>${pl.nDays}</b> study day(s) · exam ${U.fmtDay(pl.exam)}</p>` +
        pl.days.map((d, i) => `<div class="day ${i === 0 ? 'today' : ''}"><b>${i === 0 ? 'Today' : U.fmtDay(d.date)}</b> <span class="tiny muted">~${d.tasks.reduce((a, t) => a + t.min, 0)} min</span>${d.tasks.map(taskHtml).join('')}</div>`).join('');
    };
    U.$('#mk', root).addEventListener('click', () => {
      const ed = U.$('#ed', root).value;
      if (!ed) { U.toast('Pick your exam date first'); return; }
      st.plan = Object.assign(st.plan || { done: {} }, { examDate: ed, minutes: +U.$('#mpd', root).value || 45, skipMethods: U.$('#skm', root).checked, created: Date.now() });
      S.save();
      window.App.route();
    });
    const clr = U.$('#clr', root);
    if (clr) clr.addEventListener('click', () => { st.plan = null; S.save(); window.App.route(); });
    root.addEventListener('change', (e) => {
      const t = e.target.closest('[data-task]');
      if (!t || t.disabled) return;
      st.plan.done = st.plan.done || {};
      if (t.checked) st.plan.done[t.dataset.task] = Date.now(); else delete st.plan.done[t.dataset.task];
      S.save();
    });
    show();
    return { title: 'Study planner' };
  };
  document.addEventListener('change', (e) => {
    const t = e.target.closest && e.target.closest('.card [data-task]');
    if (!t || t.disabled || !location.hash.match(/^#\/?$/)) return;
    const st = S.get();
    st.plan.done = st.plan.done || {};
    if (t.checked) st.plan.done[t.dataset.task] = Date.now(); else delete st.plan.done[t.dataset.task];
    S.save();
  });

  /* ---------- search ---------- */
  let INDEX = null;
  const buildIndex = () => {
    if (INDEX) return INDEX;
    INDEX = [];
    const src = U.sources();
    window.PAPER.blocks.forEach((b) => { if (b.text && b.type !== 'figure') INDEX.push({ type: 'Paper', title: src[b.id] ? src[b.id].label : b.id, text: b.text, href: `#/read/${PP.unitOf(b.id).id}/${b.id}` }); });
    window.PAPER.figures.forEach((f) => f.panels.forEach((p) => INDEX.push({ type: 'Figure legend', title: `Figure ${f.num}${p.letter}`, text: p.legend, href: `#/panel/${p.id}` })));
    window.PAPER.references.forEach((r) => INDEX.push({ type: 'Reference', title: `Reference ${r.n}`, text: r.text, href: `#/refs/${r.n}` }));
    G().forEach((g) => INDEX.push({ type: 'Glossary', title: g.term + (g.full ? ` (${g.full})` : ''), text: U.strip(`${g.short} ${g.long || ''} ${(g.aliases || []).join(' ')}`), href: `#/term/${g.id}`, boost: 3 }));
    (window.LESSONS || []).forEach((l) => INDEX.push({ type: 'Lesson', title: `${l.id} · ${l.title}`, text: U.strip((l.body || []).map((b) => b.html || '').join(' ') + ' ' + (l.goal || '')), href: `#/lesson/${l.id}`, boost: 2 }));
    Object.entries((window.TRACKG && window.TRACKG.paras) || {}).forEach(([id, L]) => { if (L.plain) INDEX.push({ type: 'Plain English', title: (src[id] || {}).label || id, text: U.strip(L.plain + ' ' + (L.why || '')), href: `#/g/${PP.unitOf(id).id}/${id}` }); });
    Object.entries(window.PANELS || {}).forEach(([id, g]) => INDEX.push({ type: 'Panel guide', title: (src[id] || {}).label || id, text: U.strip(`${g.question || ''} ${g.howToRead || ''} ${g.shows || ''}`), href: id === 'ga' ? '#/figure/ga' : `#/panel/${id}` }));
    (window.NUMBERS || []).forEach((n) => INDEX.push({ type: 'Key number', title: U.strip(n.value), text: U.strip(n.meaning + ' ' + (n.note || '')), href: '#/numbers' }));
    INDEX.forEach((x) => (x.low = (x.title + ' ' + x.text).toLowerCase()));
    return INDEX;
  };
  V.search = (root, args, query) => {
    const q0 = query.get('q') || '';
    root.innerHTML = `<h1 class="page-title">⌕ Search</h1><input type="search" id="sq" placeholder="Search the paper, glossary, lessons, figures…" value="${U.esc(q0)}" autofocus>
      <div class="chips" id="sf" style="margin:.6rem 0"></div><div id="sr"></div>`;
    let filter = '';
    const run = (q) => {
      const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 0);
      const res = U.$('#sr', root);
      if (!words.length) { res.innerHTML = '<p class="muted">Type a word, e.g. “cisplatin”, “TSS”, “FDR”, “CHiLL1”.</p>'; U.$('#sf', root).innerHTML = ''; return; }
      const hits = buildIndex().map((x) => {
        if (!words.every((w) => x.low.includes(w))) return null;
        let score = (x.boost || 1) * words.reduce((a, w) => a + (x.title.toLowerCase().includes(w) ? 5 : 0) + Math.min(5, x.low.split(w).length - 1), 0);
        if (x.low.includes(q.toLowerCase())) score += 4;
        return Object.assign({ score }, x);
      }).filter(Boolean).sort((a, b) => b.score - a.score);
      const types = [...new Set(hits.map((h) => h.type))];
      U.$('#sf', root).innerHTML = [''].concat(types).map((t) => `<button class="chip ${filter === t ? 'on' : ''}" data-f="${t}">${t || 'All'} (${t ? hits.filter((h) => h.type === t).length : hits.length})</button>`).join('');
      const shown = hits.filter((h) => !filter || h.type === filter).slice(0, 80);
      res.innerHTML = shown.map((h) => `<div class="result"><a href="${h.href}"><span class="tag">${h.type}</span> <span class="rt">${U.highlight(h.title, words)}</span><div class="small">${U.highlight(U.snippet(h.text, words), words)}</div></a></div>`).join('') || '<p class="muted">No results.</p>';
    };
    const inp = U.$('#sq', root);
    inp.addEventListener('input', U.debounce(() => { history.replaceState(null, '', '#/search?q=' + encodeURIComponent(inp.value)); run(inp.value); }, 160));
    U.$('#sf', root).addEventListener('click', (e) => { const b = e.target.closest('[data-f]'); if (b) { filter = b.dataset.f; run(inp.value); } });
    run(q0);
    setTimeout(() => inp.focus(), 50);
    return { title: 'Search', track: false };
  };

  /* ---------- settings / progress ---------- */
  V.settings = (root) => {
    const st = S.get();
    const nLessons = Object.keys(st.lessons).length;
    root.innerHTML = `<h1 class="page-title">⚙ Progress & settings</h1>
      <div class="card"><h3>Appearance</h3><label class="field" for="th">Theme</label>
        <select id="th"><option value="auto">Automatic (follow my device)</option><option value="light">Light</option><option value="dark">Dark</option></select></div>
      <div class="card"><h3>Move your progress to another device</h3>
        <p class="small muted">Progress lives only in this browser. Export it to a file (or copy the text), then import it on your other device.</p>
        <div class="row"><button class="btn primary" id="ex">⬇ Export to a file</button><button class="btn" id="excp">📋 Copy as text</button></div>
        <label class="field" for="imf">Import from a file</label><input type="file" id="imf" accept=".json,application/json,text/plain">
        <label class="field" for="imt">…or paste exported text</label><textarea id="imt" placeholder='{"app":"esposito-lncrna-study", …}'></textarea>
        <button class="btn" id="imb" style="margin-top:.5rem">Import pasted text</button></div>
      <div class="card"><h3>Your data</h3><p class="small">${nLessons} lessons done · ${Object.keys(st.cards).length} cards studied · ${Object.keys(st.answers).length} questions answered · ${Object.keys(st.seen).length} paragraphs/panels studied.</p>
        <p class="small">${S.storageOK() ? '✅ Saving works in this browser.' : '⚠️ This browser is blocking storage — export your progress regularly.'}</p>
        <button class="btn bad" id="rs">Reset all progress</button></div>`;
    U.$('#th', root).value = st.settings.theme;
    U.$('#th', root).addEventListener('change', (e) => { st.settings.theme = e.target.value; S.save(); window.App.applyTheme(); });
    U.$('#ex', root).addEventListener('click', () => {
      const blob = new Blob([S.export()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `lncrna-study-progress-${U.today()}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      U.toast('Progress file downloaded');
    });
    U.$('#excp', root).addEventListener('click', async () => {
      const ok = await U.copy(S.export());
      if (ok) U.toast('Progress copied — paste it into the import box on your other device');
      else U.modal({ title: 'Copy your progress', body: `<textarea style="min-height:50vh">${U.esc(S.export())}</textarea>` });
    });
    const doImport = (text) => {
      try { S.import(text); U.toast('Progress imported ✓'); window.App.applyTheme(); location.hash = '#/'; } catch (err) { U.toast('Import failed: ' + err.message, 5000); }
    };
    U.$('#imf', root).addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => doImport(r.result);
      r.readAsText(f);
    });
    U.$('#imb', root).addEventListener('click', () => doImport(U.$('#imt', root).value));
    U.$('#rs', root).addEventListener('click', () => { if (confirm('Delete ALL progress on this device? Export first if you want a backup.')) { S.reset(); location.hash = '#/'; window.App.route(); } });
    return { title: 'Settings', track: false };
  };
})();
