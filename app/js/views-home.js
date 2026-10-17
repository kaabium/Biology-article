/* Views: home dashboard, more menu, about. Also builds the lesson index and the recommended path. */
(function () {
  'use strict';
  const V = (window.V = window.V || {});

  /* ---------- curriculum helpers (shared) ---------- */
  V.init = () => {
    const C = (window.CURRICULUM = window.CURRICULUM || { tracks: [], lessons: [], terms: [], path: [] });
    // 1. glossary = plan metadata (term, aliases, category, home lesson) + authored content
    const content = {};
    (window.GLOSSARY_CONTENT || []).forEach((e) => (content[e.id] = e));
    window.GLOSSARY = (C.terms || []).map((t) => Object.assign({ short: '(definition being written)', long: '', analogy: '' }, t, content[t.id] || {}, { id: t.id, term: t.term, aliases: t.aliases, cat: t.cat, kind: t.kind, cs: t.cs, taughtIn: t.taughtIn }));
    window.GLOSSARY_INDEX = {};
    window.GLOSSARY.forEach((g) => (window.GLOSSARY_INDEX[g.id] = g));
    // 2. lessons = plan metadata + authored content
    const lc = {};
    (window.LESSON_CONTENT || []).forEach((l) => (lc[l.id] = l));
    const L = (window.LESSONS = (C.lessons || []).map((m) => Object.assign({ body: [], appears: [], checks: [], defines: [], written: !!lc[m.id] }, m, lc[m.id] || {})));
    const idx = (window.LESSON_INDEX = {});
    L.forEach((l) => (idx[l.id] = l));
    // 3. Track G steps (one per reading unit); exempt units still open from the Track G index
    const units = window.PP.units();
    const byUnit = {};
    units.forEach((u) => (byUnit[u.id] = u));
    V.gSteps = [];
    V.gUnitIds = new Set();
    const addG = (uid, group) => {
      const u = byUnit[uid];
      if (!u) return;
      const paras = u.blocks.filter((b) => !/^h\d$/.test(b.type) && b.type !== 'figure' && b.type !== 'title');
      const step = { id: 'G-' + u.id, track: 'G', title: u.title, minutes: Math.max(4, Math.round(paras.length * 2.2)), href: `#/g/${u.id}`, unit: u.id, paras: paras.map((b) => b.id), group };
      idx[step.id] = step;
      V.gSteps.push(step);
      V.gUnitIds.add(uid);
    };
    (C.gMain || []).forEach((u) => addG(u, 'main'));
    (C.gBack || []).forEach((u) => addG(u, 'back'));
    (C.gMethods || []).forEach((u) => addG(u, 'methods'));
    const gOf = (g) => V.gSteps.filter((s) => s.group === g).map((s) => s.id);
    // 4. recommended path
    const path = [];
    (C.path || []).forEach((id) => {
      if (id === 'G-main') path.push(...gOf('main'));
      else if (id === 'G-back') path.push(...gOf('back'));
      else if (id === 'G-methods') path.push(...gOf('methods'));
      else if (idx[id]) path.push(id);
    });
    L.forEach((l) => { if (!path.includes(l.id)) path.push(l.id); });
    V.path = path;
    window.CARD_INDEX = {};
    (window.CARDS || []).forEach((c) => (window.CARD_INDEX[c.id] = c));
  };
  V.stepDone = (id) => {
    const s = window.LESSON_INDEX[id];
    if (!s) return false;
    if (s.track === 'G') return S.lessonDone(id) || (s.paras.length > 0 && s.paras.every((p) => S.seen(p)));
    return S.lessonDone(id);
  };
  V.stepHref = (id) => {
    const s = window.LESSON_INDEX[id];
    return s.href || `#/lesson/${id}`;
  };
  V.trackStats = () => {
    const out = {};
    (window.CURRICULUM ? window.CURRICULUM.tracks : []).forEach((t) => (out[t.id] = { done: 0, total: 0 }));
    V.path.forEach((id) => {
      const s = window.LESSON_INDEX[id];
      if (!s) return;
      const o = (out[s.track] = out[s.track] || { done: 0, total: 0 });
      o.total += 1;
      if (V.stepDone(id)) o.done += 1;
    });
    return out;
  };
  V.nextSteps = (n) => V.path.filter((id) => !V.stepDone(id)).slice(0, n || 3);

  /* cards due today (respecting the daily new-card limit and lesson unlocking) */
  V.cardPool = () => {
    const cards = window.CARDS || [];
    const st = S.get();
    const unlock = st.settings.unlockCards;
    return cards.filter((c) => !unlock || !c.lesson || V.stepDone(c.lesson) || S.card(c.id));
  };
  V.dueCards = () => {
    const today = U.dayNum();
    const pool = V.cardPool();
    const due = pool.filter((c) => S.card(c.id) && S.card(c.id).due <= today);
    const newLeft = Math.max(0, (S.get().settings.newPerDay || 20) - S.newToday());
    const fresh = pool.filter((c) => !S.card(c.id)).slice(0, newLeft);
    return { due, fresh, all: due.concat(fresh) };
  };

  /* weakest topics from answers (topics are lesson ids) */
  V.weakTopics = (n) => {
    const st = S.get();
    const agg = {};
    Object.values(st.answers).forEach((a) => {
      (a.t || []).forEach((t) => {
        const o = (agg[t] = agg[t] || { n: 0, wrong: 0 });
        o.n += a.n;
        o.wrong += a.wrong;
      });
    });
    Object.entries(st.cards).forEach(([id, c]) => {
      const card = (window.CARD_INDEX || {})[id];
      if (!card || !card.lesson) return;
      const o = (agg[card.lesson] = agg[card.lesson] || { n: 0, wrong: 0 });
      o.n += c.reps + c.lapses;
      o.wrong += c.lapses;
    });
    return Object.entries(agg)
      .filter(([t, o]) => o.n >= 2 && o.wrong > 0 && window.LESSON_INDEX[t])
      .map(([t, o]) => ({ id: t, acc: 1 - o.wrong / o.n, n: o.n }))
      .sort((a, b) => a.acc - b.acc)
      .slice(0, n || 4);
  };

  /* ---------- home ---------- */
  V.home = (root) => {
    const st = S.get();
    const tracks = (window.CURRICULUM && window.CURRICULUM.tracks) || [];
    const stats = V.trackStats();
    const total = V.path.length;
    const done = V.path.filter(V.stepDone).length;
    const due = V.dueCards();
    const weak = V.weakTopics(4);
    const next = V.nextSteps(4);
    const last = st.last && st.last.hash !== '#/' ? st.last : null;
    const streak = S.streak();
    const plan = st.plan && V.planToday ? V.planToday() : null;
    const panelsSeen = window.PAPER.figures.reduce((a, f) => a + f.panels.filter((p) => S.seen(p.id)).length, 0);
    root.innerHTML = `
      <div class="card hero">
        <div class="small" style="opacity:.9">Your study app for</div>
        <h1 style="margin:.2rem 0 .4rem;font-size:1.35rem">Multi-hallmark long noncoding RNA maps reveal non-small cell lung cancer vulnerabilities</h1>
        <div class="small" style="opacity:.92">Esposito, Polidori et al. · Cell Genomics 2, 100171 (2022)</div>
        <div class="row" style="margin-top:1rem">
          ${last ? `<a class="btn primary" href="${last.hash}">▶ Continue: ${U.esc(last.title.slice(0, 38))}</a>` : `<a class="btn primary" href="${next[0] ? V.stepHref(next[0]) : '#/learn'}">▶ Start learning</a>`}
          <a class="btn" href="#/cards">🃏 ${due.all.length} cards due</a>
        </div>
      </div>
      <div class="grid g4" style="margin-top:.85rem">
        <div class="card stat"><b>${done}/${total}</b><span>lessons & sections done</span></div>
        <div class="card stat"><b>${due.due.length} + ${due.fresh.length}</b><span>cards due + new today</span></div>
        <div class="card stat"><b>${panelsSeen}/49</b><span>figure panels studied</span></div>
        <div class="card stat"><b>${streak} 🔥</b><span>day study streak</span></div>
      </div>
      ${plan ? `<div class="card" style="margin-top:.85rem"><div class="row between"><h2 style="margin:0">🗓 Today's plan</h2><a class="small" href="#/planner">Open planner</a></div>${plan}</div>` : `<div class="card" style="margin-top:.85rem"><div class="row between"><div><b>🗓 Have an exam date?</b><div class="small muted">The planner builds a day-by-day schedule of lessons and reviews.</div></div><a class="btn small" href="#/planner">Make a plan</a></div></div>`}
      <div class="card" style="margin-top:.85rem">
        <h2>Recommended next</h2>
        <p class="small muted">In prerequisite order — nothing is used before it is taught. You can skip ahead any time.</p>
        ${next.length ? next.map((id, i) => { const s = window.LESSON_INDEX[id]; return `<a class="lesson-row" href="${V.stepHref(id)}"><span class="num" style="background:var(--t${s.track});color:#fff">${s.track}</span><span class="grow"><b>${U.esc(s.title)}</b><br><span class="meta">${s.minutes || 7} min${i === 0 ? ' · up next' : ''}</span></span><span aria-hidden="true">›</span></a>`; }).join('') : '<p>🎉 You have finished every lesson. Keep your memory fresh with flashcards and the mock exams.</p>'}
        <div class="row" style="margin-top:.5rem"><a class="btn small" href="#/learn">See the whole path</a></div>
      </div>
      <div class="card" style="margin-top:.85rem">
        <h2>Progress by track</h2>
        ${tracks.map((t) => { const s = stats[t.id] || { done: 0, total: 0 }; const p = U.pct(s.done, s.total); return `<a class="lesson-row" href="#/track/${t.id}"><span class="num" style="background:var(--t${t.id});color:#fff">${t.id}</span><span class="grow"><b>${U.esc(t.title)}</b>${U.bar(p)}<span class="meta">${s.done}/${s.total}</span></span></a>`; }).join('')}
      </div>
      <div class="card" style="margin-top:.85rem">
        <h2>Weakest topics</h2>
        ${weak.length ? `<ul class="weak">${weak.map((w) => `<li><a href="${V.stepHref(w.id)}">${U.esc(window.LESSON_INDEX[w.id].title)}</a> <span class="badge ${w.acc < 0.5 ? 'bad' : 'warn'}">${Math.round(w.acc * 100)}% right</span></li>`).join('')}</ul>` : '<p class="muted small">Answer some check questions, quizzes or flashcards and your weakest topics will appear here.</p>'}
      </div>
      <div class="grid g3" style="margin-top:.85rem">
        <a class="card" href="#/read/summary"><b>📄 Read the paper</b><p class="small muted">Verbatim text, tap any term.</p></a>
        <a class="card" href="#/figures"><b>🖼 Figures</b><p class="small muted">Zoom in, panel by panel.</p></a>
        <a class="card" href="#/exams"><b>⏱ Mock exams</b><p class="small muted">Two full practice exams.</p></a>
      </div>
      ${!S.storageOK() ? U.kind('flag', '<p>This browser is not letting the app save progress (private mode or blocked storage). Use <a href="#/settings">Export progress</a> to keep a copy.</p>') : ''}
      ${V.citeBox()}`;
    return { title: 'Home', track: false };
  };

  /* ---------- more (mobile menu) ---------- */
  V.more = (root) => {
    const items = [
      ['#/glossary', '🔤', 'Glossary', 'Every term, with a plain explanation and analogy'],
      ['#/numbers', '🔢', 'Key numbers', 'Every important number and where it comes from'],
      ['#/summary', '📝', 'One-page summary', 'The whole paper on one page'],
      ['#/cheatsheet', '🖨', 'Cheat sheet', 'Printable revision sheet'],
      ['#/planner', '🗓', 'Study planner', 'Day-by-day plan to your exam date'],
      ['#/search', '⌕', 'Search', 'Paper, glossary and lessons'],
      ['#/refs', '📚', 'References', 'The 118 references'],
      ['#/settings', '⚙', 'Progress & settings', 'Export / import progress, theme, reset'],
      ['#/about', 'ℹ', 'About this app', 'Sources, content kinds, license'],
    ];
    root.innerHTML = `<h1 class="page-title">More</h1><div class="card">${items.map(([h, ic, t, d]) => `<a class="lesson-row" href="${h}"><span class="num">${ic}</span><span class="grow"><b>${t}</b><br><span class="meta">${d}</span></span></a>`).join('')}</div>${V.citeBox()}`;
    return { title: 'More', track: false };
  };

  V.about = (root) => {
    const m = window.PAPER.meta;
    root.innerHTML = `<h1 class="page-title">About this app</h1>
      <div class="card stack">
        <p>This offline app helps a complete beginner master one paper:</p>
        <p style="font-family:var(--serif)">${U.esc(m.citation)}</p>
        <p class="small">${U.esc(m.license)} The PDF text and figures are reproduced unaltered (verbatim text, unmodified figure crops) for personal, non-commercial study.</p>
        <h3>Four kinds of content — always labelled</h3>
        ${U.kind('paper', '<p>The paper\'s own words, copied exactly (only PDF extraction glitches such as broken symbols were repaired — see extraction/QA.md).</p>')}
        ${U.kind('plain', '<p>A translation of the paper into simple words. It adds no new claims.</p>')}
        ${U.kind('bgnd', '<p>General textbook knowledge needed to understand the paper. It is <b>not</b> from the paper.</p>')}
        ${U.kind('memory', '<p>Analogies and mnemonics to help you remember. Not scientific claims.</p>')}
        <h3>Sources</h3>
        <p class="small">Every paper-specific fact in lessons, flashcards and quizzes stores a <b>source</b> (a paragraph ID such as <code>res-aso-p9</code>, or a panel ID such as <code>fig5H</code>). Tap it to jump to the exact place in the paper.</p>
        <h3>Supplementary material</h3>
        <p class="small">Figures S1–S6, Tables S1–S3 and Data S1–S4 are cited by the paper but are not in the PDF. Wherever they are cited you will see <span class="badge warn">Supplementary: not in your PDF</span>, and the app only teaches what the main text says about them.</p>
        <h3>Your data</h3>
        <p class="small">Progress is saved only in this browser (localStorage). Use <a href="#/settings">Export progress</a> to move it to another device.</p>
      </div>${V.citeBox()}`;
    return { title: 'About', track: false };
  };
})();
