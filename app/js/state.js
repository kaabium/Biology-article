/* Progress store (localStorage), spaced repetition, streaks, export/import. */
(function () {
  'use strict';
  const KEY = 'esposito-lncrna-study-v1';
  const S = (window.S = {});
  const blank = () => ({
    v: 1,
    created: Date.now(),
    lessons: {},     // id -> {done: ts, score}
    answers: {},     // questionId -> {ok, ts, n, wrong}
    cards: {},       // cardId -> {due, ivl, ease, reps, lapses, last}
    quizzes: {},     // quizId -> {best, last, ts}
    exams: {},       // examId -> {attempts: [{ts, score, max, mcq, short}]}
    explain: {},     // id -> {text, ticks: [], ts}
    seen: {},        // paragraph / panel id -> ts (Track G progress)
    last: null,      // {hash, title, ts}
    plan: null,      // {examDate, minutes, created, done: {taskId: ts}}
    settings: { theme: 'auto', newPerDay: 20, unlockCards: true },
    days: {},        // 'YYYY-MM-DD' -> activity count
    newSeen: {},     // 'YYYY-MM-DD' -> number of new cards introduced
  });
  let st;
  let storageOK = true;
  try {
    const raw = localStorage.getItem(KEY);
    st = raw ? Object.assign(blank(), JSON.parse(raw)) : blank();
  } catch (e) {
    storageOK = false;
    st = blank();
  }
  st.settings = Object.assign(blank().settings, st.settings || {});
  S.storageOK = () => storageOK;
  S.get = () => st;
  let saveTimer = null;
  S.save = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(st));
      } catch (e) {
        storageOK = false;
      }
    }, 150);
  };
  S.flush = () => {
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { storageOK = false; }
  };
  window.addEventListener('pagehide', S.flush);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') S.flush(); });

  S.activity = () => {
    const d = U.today();
    st.days[d] = (st.days[d] || 0) + 1;
    S.save();
  };
  S.streak = () => {
    let n = 0;
    let day = U.dayNum();
    if (!st.days[U.fromDayNum(day)]) day -= 1; // today not started yet: count from yesterday
    while (st.days[U.fromDayNum(day)]) { n++; day--; }
    return n;
  };

  /* ---------- lessons & paragraphs ---------- */
  S.lessonDone = (id) => !!(st.lessons[id] && st.lessons[id].done);
  S.markLesson = (id, score) => {
    st.lessons[id] = { done: Date.now(), score: score == null ? null : score };
    S.activity();
  };
  S.unmarkLesson = (id) => { delete st.lessons[id]; S.save(); };
  S.markSeen = (id) => {
    if (!st.seen[id]) { st.seen[id] = Date.now(); S.save(); }
  };
  S.seen = (id) => !!st.seen[id];

  /* ---------- answers (for weakest-topic stats) ---------- */
  S.answer = (qid, ok, topics) => {
    const a = st.answers[qid] || { n: 0, wrong: 0 };
    a.n += 1;
    if (!ok) a.wrong += 1;
    a.ok = ok;
    a.ts = Date.now();
    if (topics) a.t = topics;
    st.answers[qid] = a;
    S.activity();
  };

  /* ---------- spaced repetition (SM-2 style) ---------- */
  S.card = (id) => st.cards[id];
  S.isDue = (id, today) => {
    const c = st.cards[id];
    return !!c && c.due <= (today || U.dayNum());
  };
  S.rate = (id, grade) => {
    // grade: 0 again, 1 hard, 2 good, 3 easy
    const today = U.dayNum();
    const isNew = !st.cards[id];
    const c = st.cards[id] || { ivl: 0, ease: 2.5, reps: 0, lapses: 0 };
    if (isNew) st.newSeen[U.today()] = (st.newSeen[U.today()] || 0) + 1;
    if (grade === 0) {
      c.reps = 0; c.lapses += 1; c.ivl = 0; c.ease = Math.max(1.3, c.ease - 0.2);
    } else if (grade === 1) {
      c.ivl = Math.max(1, Math.round(c.ivl * 1.2)); c.ease = Math.max(1.3, c.ease - 0.15); c.reps += 1;
    } else if (grade === 2) {
      c.ivl = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.max(c.ivl + 1, Math.round(c.ivl * c.ease)); c.reps += 1;
    } else {
      c.ivl = c.reps === 0 ? 3 : Math.max(c.ivl + 2, Math.round(c.ivl * c.ease * 1.3)); c.ease += 0.15; c.reps += 1;
    }
    c.due = today + c.ivl;
    c.last = Date.now();
    st.cards[id] = c;
    S.activity();
    return c;
  };
  S.preview = (id, grade) => {
    const c = st.cards[id] || { ivl: 0, ease: 2.5, reps: 0 };
    if (grade === 0) return 0;
    if (grade === 1) return Math.max(1, Math.round(c.ivl * 1.2));
    if (grade === 2) return c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.max(c.ivl + 1, Math.round(c.ivl * c.ease));
    return c.reps === 0 ? 3 : Math.max(c.ivl + 2, Math.round(c.ivl * c.ease * 1.3));
  };
  S.newToday = () => st.newSeen[U.today()] || 0;

  /* ---------- quizzes & exams ---------- */
  S.quizResult = (id, score) => {
    const q = st.quizzes[id] || { best: 0 };
    q.best = Math.max(q.best || 0, score);
    q.last = score;
    q.ts = Date.now();
    st.quizzes[id] = q;
    S.activity();
  };
  S.examAttempt = (id, att) => {
    const e = st.exams[id] || { attempts: [] };
    e.attempts.push(Object.assign({ ts: Date.now() }, att));
    st.exams[id] = e;
    S.activity();
  };

  /* ---------- last place ---------- */
  S.setLast = (hash, title) => {
    st.last = { hash, title, ts: Date.now() };
    S.save();
  };

  /* ---------- export / import ---------- */
  S.export = () => JSON.stringify({ app: 'esposito-lncrna-study', exported: new Date().toISOString(), data: st }, null, 1);
  S.import = (text) => {
    const obj = JSON.parse(text);
    const data = obj && obj.data ? obj.data : obj;
    if (!data || data.v !== 1) throw new Error('This file is not a progress file from this app.');
    st = Object.assign(blank(), data);
    st.settings = Object.assign(blank().settings, st.settings || {});
    S.flush();
  };
  S.reset = () => {
    st = blank();
    S.flush();
  };
})();
