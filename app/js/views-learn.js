/* Views: learn (tracks), track, lesson. */
(function () {
  'use strict';
  const V = (window.V = window.V || {});
  const PP = window.PP;

  V.learn = (root) => {
    const C = window.CURRICULUM || { tracks: [] };
    const stats = V.trackStats();
    const next = V.nextSteps(1)[0];
    root.innerHTML = `<h1 class="page-title">Learn</h1>
      <p class="lead">Eight tracks, in prerequisite order. Each lesson is 5–10 minutes and teaches one idea, with an analogy, a diagram, where it appears in the paper, and check questions.</p>
      ${next ? `<a class="btn primary" href="${V.stepHref(next)}">▶ Next on your path: ${U.esc(window.LESSON_INDEX[next].title)}</a>` : ''}
      <div class="grid g2" style="margin-top:1rem">
      ${C.tracks.map((t) => { const s = stats[t.id] || { done: 0, total: 0 }; return `<a class="card track-card" style="--tc:var(--t${t.id})" href="${t.id === 'G' ? '#/g' : '#/track/' + t.id}">
        <div class="row between"><b><span class="track-dot"></span>Track ${t.id}</b>${U.ring(U.pct(s.done, s.total), `${s.done}/${s.total}`, `var(--t${t.id})`)}</div>
        <h3 style="margin:.3rem 0">${U.esc(t.title)}</h3><p class="small muted">${t.desc}</p></a>`; }).join('')}
      </div>
      <div class="card" style="margin-top:1rem"><h2>The whole recommended path</h2>
      <p class="small muted">Ticked items are done. Skipping is allowed — tap anything.</p>
      ${V.path.map((id, i) => { const s = window.LESSON_INDEX[id]; const d = V.stepDone(id); return `<a class="lesson-row ${d ? 'done' : ''}" href="${V.stepHref(id)}"><span class="num">${d ? '✓' : i + 1}</span><span class="grow">${U.esc(s.title)}<br><span class="meta"><span class="track-dot" style="--tc:var(--t${s.track})"></span>Track ${s.track} · ${s.minutes || 7} min</span></span></a>`; }).join('')}
      </div>`;
    return { title: 'Learn', track: false };
  };

  V.track = (root, [tid]) => {
    const C = window.CURRICULUM || { tracks: [] };
    const t = C.tracks.find((x) => x.id === tid);
    if (tid === 'G') { location.hash = '#/g'; return {}; }
    const ls = V.path.filter((id) => window.LESSON_INDEX[id].track === tid);
    root.innerHTML = `<div class="crumbs"><a href="#/learn">Learn</a> › Track ${tid}</div>
      <h1 class="page-title"><span class="track-dot" style="--tc:var(--t${tid});width:14px;height:14px"></span>Track ${tid} · ${U.esc(t ? t.title : '')}</h1>
      <p class="lead">${t ? t.desc : ''}</p>
      <div class="card">${ls.map((id, i) => { const l = window.LESSON_INDEX[id]; const d = V.stepDone(id); return `<a class="lesson-row ${d ? 'done' : ''}" href="${V.stepHref(id)}"><span class="num">${d ? '✓' : l.id}</span><span class="grow"><b>${U.esc(l.title)}</b><br><span class="meta">${l.minutes || 7} min${l.goal ? ' · ' + U.esc(U.strip(l.goal)).slice(0, 90) : ''}</span></span></a>`; }).join('') || '<p class="muted">Lessons for this track are being written.</p>'}</div>`;
    return { title: `Track ${tid}` };
  };

  /* lesson body blocks */
  const quoteFrom = (ref, quote) => {
    const S = U.sources()[ref];
    if (!S) return `<span class="badge bad">missing source ${U.esc(ref)}</span>`;
    if (quote) return U.esc(quote);
    return S.html || U.esc(S.text);
  };
  V.renderLessonBlock = (b) => {
    switch (b.k) {
      case 'h': return `<h2>${b.text}</h2>`;
      case 'paper': return U.kind('paper', quoteFrom(b.ref, b.quote), { source: [b.ref], label: b.label });
      case 'svg': return `<figure class="diagram">${b.svg}<figcaption>📚 <b>Diagram (background, drawn for this app).</b> ${b.caption || ''}</figcaption></figure>`;
      case 'panel': {
        const fid = b.id.replace(/[A-L]$/, '');
        const L = b.id.slice(-1);
        const meta = window.FIGMETA[fid];
        const p = PP.panel(b.id);
        return `<div class="card"><div class="row between"><b>Real panel from the paper: Figure ${fid.slice(3)}${L}</b><a class="btn small" href="#/panel/${b.id}">Panel guide →</a></div>
          <div class="zoom-slot panelimg" data-src="${meta.panels[L].img}" data-alt="Figure ${fid.slice(3)}${L}" style="margin-top:.5rem"></div>
          ${p ? U.kind('paper', p.legendHtml, { label: '📄 Paper · legend' }) : ''}${b.html ? U.kind(b.kind || 'plain', b.html) : ''}</div>`;
      }
      case 'figure': {
        const meta = window.FIGMETA[b.id];
        return `<div class="card"><div class="zoom-slot" data-src="${meta.img}" data-alt="${U.esc(b.id)}"></div>${b.html ? U.kind(b.kind || 'plain', b.html) : ''}</div>`;
      }
      case 'html': return b.html;
      default: return U.kind(b.k, b.html, { source: b.source, label: b.label });
    }
  };

  /* consecutive blocks of the same kind share one label (the coloured bar stays) */
  V.renderLessonBody = (blocks) => {
    let prev = null;
    return blocks.map((b) => {
      let html = V.renderLessonBlock(b);
      const same = prev && prev === b.k && ['plain', 'bgnd', 'memory', 'why', 'flag', 'worked'].includes(b.k) && !b.label;
      if (same) html = html.replace(/<div class="klabel">.*?<\/div>/, '');
      prev = b.k;
      return html;
    }).join('');
  };

  V.lesson = (root, [id]) => {
    const l = window.LESSON_INDEX[id];
    if (!l || l.track === 'G') { if (l) location.hash = l.href; else root.innerHTML = '<p>Lesson not found.</p>'; return {}; }
    const C = window.CURRICULUM || { tracks: [] };
    const t = C.tracks.find((x) => x.id === l.track) || { title: '' };
    const i = V.path.indexOf(id);
    const nextId = V.path[i + 1];
    const prevId = V.path[i - 1];
    const pre = (l.prereqs || []).map((p) => window.LESSON_INDEX[p] ? `<a class="chip ${V.stepDone(p) ? 'on' : ''}" href="${V.stepHref(p)}">${V.stepDone(p) ? '✓ ' : ''}${U.esc(window.LESSON_INDEX[p].title)}</a>` : '').join('');
    const teaches = (window.GLOSSARY || []).filter((g) => g.taughtIn === id);
    const done = S.lessonDone(id);
    root.innerHTML = `<div class="crumbs"><a href="#/learn">Learn</a> › <a href="#/track/${l.track}">Track ${l.track}</a> › ${l.id}</div>
      <h1 class="page-title">${U.esc(l.title)}</h1>
      <div class="row small muted"><span class="badge track" style="background:var(--t${l.track})">Track ${l.track}</span><span>⏱ ${l.minutes || 7} min</span>${done ? '<span class="badge good">✓ done</span>' : ''}</div>
      ${l.goal ? `<p class="lead">${l.goal}</p>` : ''}
      ${pre ? `<div class="small" style="margin:.4rem 0"><b>Before this:</b> <span class="prereq-links">${pre}</span></div>` : ''}
      ${V.kindLegend}
      <div class="lesson-body">${(l.body || []).length ? V.renderLessonBody(l.body) : '<div class="card"><p class="muted">This lesson is still being written.</p></div>'}</div>
      ${teaches.length ? `<div class="card"><b>New words in this lesson</b><div class="chips" style="margin-top:.4rem">${teaches.map((g) => `<a class="chip" href="#/term/${g.id}">${U.esc(g.term)}</a>`).join('')}</div></div>` : ''}
      ${(l.appears || []).length ? `<div class="card"><h3>📍 Where this appears in the paper</h3><div class="appears">${l.appears.map((a) => { const S = U.sources()[a.ref]; return S ? `<a href="${S.href}"><b>${U.esc(S.label)}</b> — ${a.note}</a>` : ''; }).join('')}</div></div>` : ''}
      ${(l.checks || []).length ? `<h2>Check yourself</h2><p class="small muted">Explanations appear for the right answer <i>and</i> the wrong ones.</p>${l.checks.map((q, k) => V.checkHtml(q, `l:${id}:${k}`)).join('')}` : ''}
      <div class="card no-print" style="margin-top:1rem"><div class="row between">
        <div><b>${done ? 'Lesson complete ✓' : 'Finished?'}</b><div class="small muted"><span class="lesson-score"></span></div></div>
        <div class="row">${done ? '<button class="btn small ghost" data-undone>Mark not done</button>' : ''}<button class="btn good" data-done>✓ ${done ? 'Done' : 'Mark complete'}${nextId ? ' & next' : ''}</button></div></div></div>
      <div class="section-nav">${prevId ? `<a class="btn" href="${V.stepHref(prevId)}">← ${U.esc(window.LESSON_INDEX[prevId].title)}</a>` : '<span></span>'}${nextId ? `<a class="btn" href="${V.stepHref(nextId)}">${U.esc(window.LESSON_INDEX[nextId].title)} →</a>` : ''}</div>
      <div class="row no-print"><button class="btn small ghost" data-asklesson>🤖 Ask Claude to explain this lesson another way</button></div>`;
    PP.mountZooms(root);
    const seenTerms = new Set();
    U.$$('.lesson-body .kind', root).forEach((k) => PP.linkTerms(k, { once: true, seen: seenTerms }));
    let right = 0;
    let answered = 0;
    V.wireChecks(root, () => [id]);
    root.addEventListener('answered', (e) => {
      answered += 1;
      if (e.detail.ok) right += 1;
      U.$('.lesson-score', root).textContent = `Check questions: ${right}/${answered} right`;
    });
    root.querySelector('[data-done]').addEventListener('click', () => {
      S.markLesson(id, answered ? right / answered : null);
      U.toast('Lesson complete ✓ — its flashcards are now unlocked');
      if (nextId) location.hash = V.stepHref(nextId);
      else window.App.route();
    });
    const und = root.querySelector('[data-undone]');
    if (und) und.addEventListener('click', () => { S.unmarkLesson(id); window.App.route(); });
    root.querySelector('[data-asklesson]').addEventListener('click', () =>
      U.askClaude({ what: 'lesson (please teach it to me again in a different way)', where: `Lesson ${l.id}: ${l.title}`, text: U.strip((l.body || []).filter((b) => b.k !== 'svg').map((b) => b.html || b.text || '').join('\n\n')).slice(0, 6000) }));
    return { title: `${l.id} · ${l.title}` };
  };
})();
