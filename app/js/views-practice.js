/* Views: practice hub, flashcards (spaced repetition), quizzes, mock exams, explain-it-back. */
(function () {
  'use strict';
  const V = (window.V = window.V || {});
  const PP = window.PP;
  const DECKS = {
    terms: ['🔤', 'Terms', 'What does this word mean?'],
    abbr: ['🔠', 'Abbreviations', 'What do the letters stand for?'],
    numbers: ['🔢', 'Key numbers', 'The numbers worth knowing'],
    why: ['❓', 'Why did they…?', 'Design choices and controls'],
    figures: ['🖼', 'Figure panels', 'What does this panel show?'],
    concepts: ['🧠', 'Concepts & results', 'The ideas and findings'],
  };

  const cardIndex = () => {
    if (!window.CARD_INDEX) {
      window.CARD_INDEX = {};
      (window.CARDS || []).forEach((c) => (window.CARD_INDEX[c.id] = c));
    }
    return window.CARD_INDEX;
  };

  V.practice = (root) => {
    const due = V.dueCards();
    const qz = window.QUIZZES || [];
    const ex = window.EXAMS || [];
    const xp = window.EXPLAIN || [];
    root.innerHTML = `<h1 class="page-title">Practice</h1>
      <p class="lead">Retrieval practice beats re-reading: test yourself, then check the explanation.</p>
      <div class="grid g2">
        <a class="card" href="#/cards"><h3>🃏 Flashcards</h3><p class="small muted">${(window.CARDS || []).length} cards with spaced repetition.</p><b>${due.all.length} due today</b></a>
        <a class="card" href="#/quizzes"><h3>✅ Quizzes</h3><p class="small muted">${qz.length} quizzes (every figure and section) + the check questions in every lesson.</p></a>
        <a class="card" href="#/exams"><h3>⏱ Mock exams</h3><p class="small muted">${ex.length} full exams with an optional timer, model answers and self-grading checklists.</p></a>
        <a class="card" href="#/explain"><h3>🗣 Explain it back</h3><p class="small muted">${xp.length} prompts: write it in your own words, then compare with a model answer.</p></a>
      </div>`;
    return { title: 'Practice', track: false };
  };

  /* ---------- flashcards ---------- */
  V.cards = (root) => {
    cardIndex();
    const all = window.CARDS || [];
    const st = S.get();
    const today = U.dayNum();
    const pool = V.cardPool();
    const due = V.dueCards();
    const deckRows = Object.entries(DECKS).map(([k, [ic, name, d]]) => {
      const cs = all.filter((c) => c.deck === k);
      if (!cs.length) return '';
      const unlocked = pool.filter((c) => c.deck === k);
      const learned = cs.filter((c) => S.card(c.id) && S.card(c.id).reps > 0).length;
      const dueN = cs.filter((c) => S.card(c.id) && S.card(c.id).due <= today).length;
      return `<div class="lesson-row"><span class="num">${ic}</span><span class="grow"><b>${name}</b> <span class="meta">· ${cs.length} cards · ${learned} learned · ${dueN} due${st.settings.unlockCards ? ` · ${unlocked.length} unlocked` : ''}</span><br><span class="meta">${d}</span></span><a class="btn small" href="#/cards/review/${k}">Study</a></div>`;
    }).join('');
    root.innerHTML = `<div class="crumbs"><a href="#/practice">Practice</a> › Flashcards</div>
      <h1 class="page-title">🃏 Flashcards</h1>
      <div class="card"><div class="row between"><div><b>${due.due.length} reviews + ${due.fresh.length} new cards today</b><div class="small muted">Spaced repetition: cards you know come back rarely; cards you miss come back soon.</div></div>
        <a class="btn primary ${due.all.length ? '' : 'disabled'}" href="#/cards/review">${due.all.length ? 'Start review' : 'All done for today'}</a></div></div>
      <div class="card"><h3>Decks</h3>${deckRows || '<p class="muted">Cards are being written.</p>'}</div>
      <div class="card"><h3>Settings</h3>
        <label class="field">New cards per day</label><input type="number" min="0" max="200" id="npd" value="${st.settings.newPerDay}">
        <label class="checklist"><label><input type="checkbox" id="unl" ${st.settings.unlockCards ? 'checked' : ''}> Only show cards for lessons I have completed (recommended for beginners)</label></label>
      </div>
      <div class="card"><h3>Browse all cards</h3><input type="search" id="cq" placeholder="Filter cards…"><div id="clist" class="small" style="margin-top:.5rem"></div></div>`;
    U.$('#npd', root).addEventListener('change', (e) => { st.settings.newPerDay = Math.max(0, +e.target.value || 0); S.save(); window.App.route(); });
    U.$('#unl', root).addEventListener('change', (e) => { st.settings.unlockCards = e.target.checked; S.save(); window.App.route(); });
    const list = U.$('#clist', root);
    const draw = (q) => {
      q = (q || '').toLowerCase();
      const cs = all.filter((c) => !q || U.strip(c.front + ' ' + c.back).toLowerCase().includes(q)).slice(0, 200);
      list.innerHTML = cs.map((c) => `<details class="result"><summary>${DECKS[c.deck] ? DECKS[c.deck][0] : ''} ${U.strip(c.front).slice(0, 140)}</summary><div>${c.back}<div class="srcline">${c.source ? 'Source: ' + U.srcLinks(c.source) : (c.kind === 'background' ? '📚 Background knowledge' : '')}</div></div></details>`).join('') || '<p class="muted">No cards match.</p>';
    };
    U.$('#cq', root).addEventListener('input', U.debounce((e) => draw(e.target.value), 200));
    draw('');
    return { title: 'Flashcards' };
  };

  V.review = (root, [deck]) => {
    cardIndex();
    const today = U.dayNum();
    let queue;
    if (deck) {
      const pool = V.cardPool().filter((c) => c.deck === deck);
      const due = pool.filter((c) => S.card(c.id) && S.card(c.id).due <= today);
      const fresh = pool.filter((c) => !S.card(c.id));
      queue = due.concat(fresh.slice(0, Math.max(10, (S.get().settings.newPerDay || 20))));
      if (!queue.length) queue = U.shuffle(pool, 'cram' + U.today()).slice(0, 20); // cram mode
    } else queue = V.dueCards().all;
    queue = queue.slice();
    const total = queue.length;
    let doneN = 0;
    let again = 0;
    const show = () => {
      if (!queue.length) {
        root.innerHTML = `<div class="crumbs"><a href="#/cards">Flashcards</a> › Review</div><div class="card center"><div class="score-big">🎉</div><h2>Session complete</h2><p>${doneN} reviews · ${again} “again”.</p><a class="btn primary" href="#/cards">Back to decks</a> <a class="btn" href="#/">Home</a></div>`;
        return;
      }
      const c = queue[0];
      const img = c.img ? (() => { const fid = c.img.replace(/[A-L]$/, ''); const L = c.img.slice(-1); const m = window.FIGMETA[fid]; return m ? `<div class="zoom-slot panelimg" data-src="${L.match(/[A-L]/) && m.panels[L] ? m.panels[L].img : m.img}" data-alt="${c.img}"></div>` : ''; })() : '';
      root.innerHTML = `<div class="crumbs"><a href="#/cards">Flashcards</a> › Review${deck ? ' · ' + DECKS[deck][1] : ''}</div>
        <div class="row between small muted"><span>${doneN}/${total} done</span><span>${DECKS[c.deck] ? DECKS[c.deck][0] + ' ' + DECKS[c.deck][1] : ''}</span></div>${U.bar(U.pct(doneN, total))}
        <div class="card flash-card" style="margin-top:.8rem" tabindex="0" id="fc">
          <div class="front">${c.front}</div>${img}
          <div class="back hidden">${U.kind(c.kind === 'background' ? 'bgnd' : c.kind === 'memory' ? 'memory' : 'plain', c.back, { source: c.source, label: c.kind === 'background' ? '📚 Background · not from the paper' : '💬 Answer' })}</div>
          <div class="small muted reveal-hint" style="margin-top:1rem">Tap the card (or press space) to show the answer</div>
        </div>
        <div class="rate hidden" id="rate">
          ${['Again', 'Hard', 'Good', 'Easy'].map((n, g) => `<button class="btn ${g === 0 ? 'bad' : g === 2 ? 'primary' : ''}" data-g="${g}">${n}<small>${g === 0 ? 'now' : S.preview(c.id, g) + ' d'}</small></button>`).join('')}
        </div>
        <div class="row" style="margin-top:.6rem"><button class="btn small ghost" data-askcard>🤖 Ask Claude about this card</button></div>`;
      PP.mountZooms(root);
      const fc = U.$('#fc', root);
      const reveal = () => {
        U.$('.back', fc).classList.remove('hidden');
        U.$('.reveal-hint', fc).classList.add('hidden');
        U.$('#rate', root).classList.remove('hidden');
        PP.linkTerms(U.$('.back', fc));
      };
      fc.addEventListener('click', (e) => { if (!e.target.closest('a,button,.zoom')) reveal(); });
      U.$('#rate', root).addEventListener('click', (e) => {
        const b = e.target.closest('[data-g]');
        if (!b) return;
        const g = +b.dataset.g;
        S.rate(c.id, g);
        queue.shift();
        if (g === 0) { queue.push(c); again += 1; } else doneN += 1;
        show();
      });
      U.$('[data-askcard]', root).addEventListener('click', () => U.askClaude({ what: 'flashcard', text: `Question: ${U.strip(c.front)}\nAnswer: ${U.strip(c.back)}` }));
      keyHandler = (e) => {
        if (e.target.matches('input,textarea')) return;
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); reveal(); }
        if (!U.$('#rate', root).classList.contains('hidden') && ['1', '2', '3', '4'].includes(e.key)) U.$(`[data-g="${+e.key - 1}"]`, root).click();
      };
    };
    let keyHandler = null;
    const onKey = (e) => keyHandler && keyHandler(e);
    document.addEventListener('keydown', onKey);
    show();
    return { title: 'Flashcard review', track: false, cleanup: () => document.removeEventListener('keydown', onKey) };
  };

  /* ---------- quizzes ---------- */
  V.quizzes = (root) => {
    const qz = window.QUIZZES || [];
    const st = S.get();
    const groups = [['figure', '🖼 Figure quizzes'], ['section', '📄 Section quizzes'], ['mixed', '🎲 Mixed / topic quizzes']];
    const lessonsWithChecks = V.path.map((id) => window.LESSON_INDEX[id]).filter((l) => l && l.checks && l.checks.length);
    root.innerHTML = `<div class="crumbs"><a href="#/practice">Practice</a> › Quizzes</div><h1 class="page-title">✅ Quizzes</h1>
      ${groups.map(([k, name]) => { const qs = qz.filter((q) => q.kind === k); return qs.length ? `<div class="card"><h3>${name}</h3>${qs.map((q) => { const r = st.quizzes[q.id]; return `<a class="lesson-row" href="#/quiz/${q.id}"><span class="num">${r ? Math.round(r.best * 100) + '%' : q.questions.length}</span><span class="grow"><b>${U.esc(q.title)}</b><br><span class="meta">${q.questions.length} questions${r ? ` · best ${Math.round(r.best * 100)}%` : ''}</span></span></a>`; }).join('')}</div>` : ''; }).join('')}
      <div class="card"><h3>📘 Lesson check questions</h3><p class="small muted">Every lesson ends with 3–5 questions.</p>${lessonsWithChecks.map((l) => `<a class="lesson-row" href="#/lesson/${l.id}"><span class="num" style="background:var(--t${l.track});color:#fff">${l.id}</span><span class="grow">${U.esc(l.title)}<br><span class="meta">${l.checks.length} questions</span></span></a>`).join('')}</div>`;
    return { title: 'Quizzes' };
  };

  V.quiz = (root, [id]) => {
    const q = (window.QUIZZES || []).find((x) => x.id === id);
    if (!q) { root.innerHTML = '<p>Quiz not found.</p>'; return {}; }
    root.innerHTML = `<div class="crumbs"><a href="#/quizzes">Quizzes</a> › ${U.esc(q.title)}</div>
      <h1 class="page-title">${U.esc(q.title)}</h1>${q.desc ? `<p class="lead">${q.desc}</p>` : ''}
      <div id="qs">${q.questions.map((x, i) => {
        const img = x.img ? (() => { const fid = x.img.replace(/[A-L]$/, ''); const L = x.img.slice(-1); const m = window.FIGMETA[fid]; return m && m.panels[L] ? `<div class="zoom-slot panelimg" data-src="${m.panels[L].img}" data-alt="${x.img}" style="margin:.4rem 0"></div>` : ''; })() : '';
        return `<div><div class="small muted" style="margin-top:1rem">Question ${i + 1} of ${q.questions.length}</div>${img}${V.checkHtml(x, `q:${id}:${i}`)}</div>`;
      }).join('')}</div>
      <div class="card" id="qres"><b>Score: <span id="qscore">0/${q.questions.length}</span></b><div class="small muted">Answer every question to save your result.</div></div>`;
    PP.mountZooms(root);
    U.$$('.qtext, .why', root).forEach((k) => PP.linkTerms(k));
    let right = 0;
    let n = 0;
    V.wireChecks(root, (qid) => { const i = +qid.split(':')[2]; const x = q.questions[i]; return [x.lesson || q.lesson || ('quiz-' + id)].filter(Boolean); });
    root.addEventListener('answered', (e) => {
      n += 1;
      if (e.detail.ok) right += 1;
      U.$('#qscore', root).textContent = `${right}/${q.questions.length}`;
      if (n === q.questions.length) {
        S.quizResult(id, right / n);
        U.toast(`Quiz saved: ${right}/${n}`);
      }
    });
    return { title: `Quiz · ${q.title}` };
  };

  /* ---------- mock exams ---------- */
  V.exams = (root) => {
    const ex = window.EXAMS || [];
    const st = S.get();
    root.innerHTML = `<div class="crumbs"><a href="#/practice">Practice</a> › Mock exams</div><h1 class="page-title">⏱ Mock exams</h1>
      <p class="lead">Mixed exams: multiple choice, short answers (model answer + checklist to grade yourself), figure interpretation, and “explain or critique the design”.</p>
      ${ex.map((e) => { const at = (st.exams[e.id] || { attempts: [] }).attempts; const best = at.length ? Math.max(...at.map((a) => a.score / a.max)) : null; return `<a class="card" href="#/exam/${e.id}"><div class="row between"><h3 style="margin:0">${U.esc(e.title)}</h3>${best != null ? U.ring(Math.round(best * 100)) : ''}</div><p class="small muted">${e.questions.length} questions · suggested time ${e.minutes} min${at.length ? ` · ${at.length} attempt(s)` : ''}</p></a>`; }).join('') || '<p class="muted">Exams are being written.</p>'}`;
    return { title: 'Mock exams' };
  };

  V.exam = (root, [id]) => {
    const ex = (window.EXAMS || []).find((x) => x.id === id);
    if (!ex) { root.innerHTML = '<p>Exam not found.</p>'; return {}; }
    let timerId = null;
    const answers = {};
    const start = (timed) => {
      const endAt = timed ? Date.now() + ex.minutes * 60000 : null;
      root.innerHTML = `<div class="crumbs"><a href="#/exams">Mock exams</a> › ${U.esc(ex.title)}</div>
        <div class="card" style="position:sticky;top:calc(var(--top-h) + 4px);z-index:5"><div class="row between"><b>${U.esc(ex.title)}</b>${timed ? '<span class="timer" id="timer"></span>' : '<span class="small muted">untimed</span>'}</div>
        <div class="small muted"><span id="answered">0</span>/${ex.questions.length} answered</div></div>
        ${ex.questions.map((q, i) => qHtml(q, i)).join('')}
        <button class="btn primary block" id="submit" style="margin:1rem 0">Submit and see results</button>`;
      PP.mountZooms(root);
      root.addEventListener('change', track);
      root.addEventListener('input', track);
      U.$('#submit', root).addEventListener('click', () => { if (confirm('Submit your answers?')) finish(); });
      if (timed) {
        const tick = () => {
          const left = Math.max(0, endAt - Date.now());
          const el = U.$('#timer', root);
          if (el) el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor((left % 60000) / 1000)).padStart(2, '0')}`;
          if (left <= 0) { clearInterval(timerId); U.toast('Time is up — submitting'); finish(); }
        };
        tick();
        timerId = setInterval(tick, 1000);
      }
    };
    const track = () => {
      ex.questions.forEach((q, i) => {
        if (q.options) {
          const c = root.querySelector(`input[name="x${i}"]:checked`);
          if (c) answers[i] = +c.value;
        } else {
          const t = root.querySelector(`textarea[data-i="${i}"]`);
          if (t && t.value.trim()) answers[i] = t.value;
        }
      });
      const el = U.$('#answered', root);
      if (el) el.textContent = Object.keys(answers).length;
    };
    const imgFor = (q) => {
      if (!q.img) return '';
      const fid = q.img.replace(/[A-L]$/, '');
      const L = q.img.slice(-1);
      const m = window.FIGMETA[fid];
      if (!m) return '';
      const src = /[A-L]/.test(L) && m.panels[L] ? m.panels[L].img : m.img;
      return `<div class="zoom-slot panelimg" data-src="${src}" data-alt="${q.img}" style="margin:.5rem 0"></div>`;
    };
    const qHtml = (q, i) => {
      const head = `<div class="small muted">Q${i + 1} · ${{ mcq: 'Multiple choice', short: 'Short answer', figure: 'Figure interpretation', critique: 'Explain / critique the design' }[q.type] || ''}${q.points ? ` · ${q.points} pt` : ''}</div>`;
      if (q.options) {
        const opts = q.options.map((o, k) => ({ o, k }));
        return `<div class="card q">${head}<div class="qtext">${q.q}</div>${imgFor(q)}<div class="opts">${opts.map(({ o, k }) => `<label class="opt"><input type="radio" name="x${i}" value="${k}"> ${o.t}</label>`).join('')}</div></div>`;
      }
      return `<div class="card q">${head}<div class="qtext">${q.q}</div>${imgFor(q)}<textarea data-i="${i}" placeholder="Write your answer…"></textarea></div>`;
    };
    const finish = () => {
      clearInterval(timerId);
      track();
      let mcq = 0;
      let mcqMax = 0;
      const shortMax = ex.questions.filter((q) => !q.options).reduce((a, q) => a + (q.checklist ? q.checklist.length : 1), 0);
      root.innerHTML = `<div class="crumbs"><a href="#/exams">Mock exams</a> › ${U.esc(ex.title)} · results</div>
        <div class="card center"><div class="score-big" id="tot"></div><div class="small muted">Multiple choice is marked automatically. Tick the checklist items your written answers covered to finish grading.</div></div>
        ${ex.questions.map((q, i) => {
          if (q.options) {
            mcqMax += 1;
            const pick = answers[i];
            const ok = pick != null && q.options[pick] && q.options[pick].ok;
            if (ok) mcq += 1;
            return `<div class="card q"><div class="small muted">Q${i + 1} · ${ok ? '<span class="badge good">correct</span>' : pick == null ? '<span class="badge warn">not answered</span>' : '<span class="badge bad">wrong</span>'}</div><div class="qtext">${q.q}</div>${imgFor(q)}
              <div class="opts">${q.options.map((o, k) => `<div class="opt ${o.ok ? 'correct' : k === pick ? 'wrong' : ''}">${o.t}<span class="why">${o.ok ? '✔ ' : '✘ '}${o.why || ''}</span></div>`).join('')}</div>
              <div class="row" style="margin-top:.5rem"><button class="btn small ghost" data-askx="${i}">🤖 Ask Claude about this question</button>${q.source ? `<span class="srcline">Source: ${U.srcLinks(q.source)}</span>` : ''}</div></div>`;
          }
          return `<div class="card q"><div class="small muted">Q${i + 1} · self-graded</div><div class="qtext">${q.q}</div>${imgFor(q)}
            ${U.kind('paper', U.esc(answers[i] || '(no answer)'), { label: '✍️ Your answer' }).replace('k-paper', 'k-paper no-terms')}
            ${U.kind('plain', q.model || '', { label: '💬 Model answer', source: q.source })}
            ${q.checklist ? `<div class="checklist"><b>Checklist — tick what your answer covered:</b>${q.checklist.map((c) => `<label><input type="checkbox" class="ck"> ${c}</label>`).join('')}</div>` : ''}
            <div class="row" style="margin-top:.5rem"><button class="btn small ghost" data-askx="${i}">🤖 Ask Claude to grade my answer</button></div></div>`;
        }).join('')}
        <div class="row"><button class="btn primary" id="save">Save this attempt</button><a class="btn" href="#/exams">Back to exams</a></div>`;
      PP.mountZooms(root);
      const upd = () => {
        const ticks = U.$$('.ck:checked', root).length;
        U.$('#tot', root).textContent = `${mcq + ticks} / ${mcqMax + shortMax}`;
        return ticks;
      };
      root.addEventListener('change', upd);
      root.addEventListener('click', (e) => {
        const b = e.target.closest('[data-askx]');
        if (!b) return;
        const i = +b.dataset.askx;
        const q = ex.questions[i];
        if (q.options) {
          const pick = answers[i];
          U.askClaude({
            what: 'exam question (please explain why each option is right or wrong, and why the correct answer is correct)',
            where: ex.title,
            text: `${U.strip(q.q)}\nOptions:\n${q.options.map((o, k) => `${String.fromCharCode(65 + k)}) ${U.strip(o.t)}`).join('\n')}`,
            extra: `My answer: ${pick != null ? String.fromCharCode(65 + pick) : '(none)'}. The correct answer is ${String.fromCharCode(65 + q.options.findIndex((o) => o.ok))}.`,
          });
        } else {
          U.askClaude({
            what: 'my answer to an exam question. Please grade it kindly against the key points and tell me what I missed',
            where: ex.title,
            text: `Question: ${U.strip(q.q)}\n\nMy answer: ${answers[i] || '(no answer)'}`,
            extra: `Key points to check:\n${(q.checklist || []).map((c) => '- ' + U.strip(c)).join('\n')}\n\nModel answer: ${U.strip(q.model || '')}`,
          });
        }
      });
      upd();
      U.$('#save', root).addEventListener('click', () => {
        const ticks = upd();
        S.examAttempt(id, { score: mcq + ticks, max: mcqMax + shortMax, mcq, mcqMax, short: ticks, shortMax });
        ex.questions.forEach((q, i) => { if (q.options) S.answer(`x:${id}:${i}`, !!(answers[i] != null && q.options[answers[i]].ok), q.lesson ? [q.lesson] : null); });
        U.toast('Attempt saved ✓');
      });
    };
    const at = (S.get().exams[id] || { attempts: [] }).attempts;
    root.innerHTML = `<div class="crumbs"><a href="#/exams">Mock exams</a> › ${U.esc(ex.title)}</div>
      <h1 class="page-title">${U.esc(ex.title)}</h1><p class="lead">${ex.intro || ''}</p>
      <div class="card"><p>${ex.questions.length} questions · suggested time <b>${ex.minutes} minutes</b>.</p>
      <label class="checklist"><label><input type="checkbox" id="timed" checked> Use a countdown timer</label></label>
      <button class="btn primary" id="go">Start</button></div>
      ${at.length ? `<div class="card"><h3>Previous attempts</h3>${at.map((a) => `<div>${new Date(a.ts).toLocaleString()} — <b>${a.score}/${a.max}</b> (${Math.round((100 * a.score) / a.max)}%)</div>`).join('')}</div>` : ''}`;
    U.$('#go', root).addEventListener('click', () => start(U.$('#timed', root).checked));
    return { title: `Exam · ${ex.title}`, cleanup: () => clearInterval(timerId) };
  };

  /* ---------- explain it back ---------- */
  V.explainList = (root) => {
    const xp = window.EXPLAIN || [];
    const st = S.get();
    root.innerHTML = `<div class="crumbs"><a href="#/practice">Practice</a> › Explain it back</div><h1 class="page-title">🗣 Explain it back</h1>
      <p class="lead">Explaining something in your own words is one of the best ways to learn it. Write first, then compare.</p>
      <div class="card">${xp.map((x, i) => { const r = st.explain[x.id]; return `<a class="lesson-row ${r && r.ticks && r.ticks.length ? 'done' : ''}" href="#/explain/${x.id}"><span class="num">${r && r.ticks ? r.ticks.filter(Boolean).length + '/' + x.checklist.length : i + 1}</span><span class="grow"><b>${U.esc(x.title)}</b><br><span class="meta">${U.esc(U.strip(x.prompt)).slice(0, 100)}</span></span></a>`; }).join('') || '<p class="muted">Prompts are being written.</p>'}</div>`;
    return { title: 'Explain it back' };
  };
  V.explain = (root, [id]) => {
    const x = (window.EXPLAIN || []).find((e) => e.id === id);
    if (!x) { root.innerHTML = '<p>Not found.</p>'; return {}; }
    const st = S.get();
    const rec = st.explain[id] || { text: '', ticks: [] };
    root.innerHTML = `<div class="crumbs"><a href="#/explain">Explain it back</a> › ${U.esc(x.title)}</div>
      <h1 class="page-title">${U.esc(x.title)}</h1>
      <div class="card"><b>Your task</b><p>${x.prompt}</p><textarea id="ans" placeholder="Explain it in your own words, as if to a friend…">${U.esc(rec.text || '')}</textarea>
      <div class="row" style="margin-top:.5rem"><button class="btn primary" id="show">Compare with the model answer</button><button class="btn small ghost" id="askx">🤖 Ask Claude to grade my answer</button></div></div>
      <div id="model" class="${rec.ticks && rec.ticks.length ? '' : 'hidden'}">
        ${U.kind('plain', x.model, { label: '💬 Model answer', source: x.source })}
        <div class="card checklist"><b>Checklist — tick each key point you included:</b>${x.checklist.map((c, i) => `<label><input type="checkbox" data-i="${i}" ${rec.ticks && rec.ticks[i] ? 'checked' : ''}> ${c}</label>`).join('')}
        <p class="small muted" id="xscore"></p></div></div>`;
    const save = () => {
      const ticks = U.$$('#model input', root).map((c) => c.checked);
      st.explain[id] = { text: U.$('#ans', root).value, ticks, ts: Date.now() };
      S.save();
      U.$('#xscore', root).textContent = `${ticks.filter(Boolean).length}/${x.checklist.length} key points covered.`;
    };
    U.$('#ans', root).addEventListener('input', U.debounce(save, 400));
    U.$('#show', root).addEventListener('click', () => { U.$('#model', root).classList.remove('hidden'); PP.linkTerms(U.$('#model', root)); save(); S.activity(); });
    root.addEventListener('change', (e) => { if (e.target.matches('#model input')) save(); });
    U.$('#askx', root).addEventListener('click', () => U.askClaude({ what: 'my answer to an "explain it back" exercise. Please grade it kindly against the key points and tell me what I missed', text: `Task: ${U.strip(x.prompt)}\n\nMy answer: ${U.$('#ans', root).value}\n\nKey points to check: ${x.checklist.map((c) => '- ' + U.strip(c)).join('\n')}` }));
    if (rec.ticks && rec.ticks.length) save();
    return { title: `Explain · ${x.title}` };
  };
})();
