/* Router, navigation, theme, boot. */
(function () {
  'use strict';
  const V = window.V;
  const NAV = [
    { href: '#/', ic: '⌂', label: 'Home', match: /^#\/?$/ },
    { href: '#/learn', ic: '◎', label: 'Learn', match: /^#\/(learn|track|lesson)/ },
    { href: '#/paper', ic: '❏', label: 'Paper', match: /^#\/(paper|read|g\b|g\/|figures|figure|panel|refs)/ },
    { href: '#/practice', ic: '✎', label: 'Practice', match: /^#\/(practice|cards|quiz|quizzes|exam|exams|explain)/ },
    { href: '#/more', ic: '☰', label: 'More', match: /^#\/(more|glossary|term|numbers|summary|cheatsheet|planner|search|settings|about)/ },
  ];
  const SIDE = [
    ['Study', [['#/', '⌂ Home'], ['#/learn', '◎ Learn (tracks A–H)'], ['#/planner', '🗓 Study planner']]],
    ['The paper', [['#/paper', '❏ Read the paper'], ['#/g', '🎓 Paper, section by section'], ['#/figures', '🖼 Figures & panel guides'], ['#/refs', '📚 References']]],
    ['Practice', [['#/cards', '🃏 Flashcards'], ['#/quizzes', '✅ Quizzes'], ['#/exams', '⏱ Mock exams'], ['#/explain', '🗣 Explain it back']]],
    ['Tools', [['#/glossary', '🔤 Glossary'], ['#/numbers', '🔢 Key numbers'], ['#/summary', '📝 One-page summary'], ['#/cheatsheet', '🖨 Cheat sheet'], ['#/search', '⌕ Search'], ['#/settings', '⚙ Progress & settings'], ['#/about', 'ℹ About this app']]],
  ];
  const ROUTES = [
    [/^$/, 'home'], [/^learn$/, 'learn'], [/^track\/([A-H])$/, 'track'], [/^lesson\/([\w-]+)$/, 'lesson'],
    [/^paper$/, 'paper'], [/^read\/([\w-]+)(?:\/([\w-]+))?$/, 'read'], [/^g$/, 'gIndex'], [/^g\/([\w-]+)(?:\/([\w-]+))?$/, 'g'],
    [/^figures$/, 'figures'], [/^figure\/([\w-]+)$/, 'figure'], [/^panel\/([\w-]+)$/, 'panel'], [/^refs(?:\/(\d+))?$/, 'refs'],
    [/^practice$/, 'practice'], [/^cards$/, 'cards'], [/^cards\/review(?:\/([\w-]+))?$/, 'review'],
    [/^quizzes$/, 'quizzes'], [/^quiz\/([\w-]+)$/, 'quiz'], [/^exams$/, 'exams'], [/^exam\/([\w-]+)$/, 'exam'],
    [/^explain$/, 'explainList'], [/^explain\/([\w-]+)$/, 'explain'],
    [/^glossary$/, 'glossary'], [/^term\/([\w-]+)$/, 'term'], [/^numbers$/, 'numbers'], [/^summary$/, 'summary'],
    [/^cheatsheet$/, 'cheatsheet'], [/^planner$/, 'planner'], [/^search$/, 'search'], [/^settings$/, 'settings'],
    [/^more$/, 'more'], [/^about$/, 'about'],
  ];

  function renderNav() {
    const h = location.hash || '#/';
    U.$('#bottomnav').innerHTML = NAV.map((n) => `<a href="${n.href}" class="${n.match.test(h) ? 'active' : ''}"><span class="ic" aria-hidden="true">${n.ic}</span>${n.label}</a>`).join('');
    U.$('#sidenav').innerHTML = SIDE.map(([sec, items]) => `<div class="sec">${sec}</div>` + items.map(([href, lab]) => {
      const active = href === '#/' ? /^#\/?$/.test(h) : h === href || h.startsWith(href + '/') || (href === '#/learn' && /^#\/(track|lesson)/.test(h));
      return `<a href="${href}" class="${active ? 'active' : ''}">${lab}</a>`;
    }).join('')).join('');
  }

  let cleanup = null;
  function route() {
    const raw = (location.hash || '#/').replace(/^#\/?/, '');
    const [path, qs] = raw.split('?');
    const query = new URLSearchParams(qs || '');
    const root = U.$('#view');
    if (cleanup) { try { cleanup(); } catch (e) { /* ignore */ } cleanup = null; }
    root.className = '';
    let handled = false;
    for (const [re, name] of ROUTES) {
      const m = path.match(re);
      if (m && V[name]) {
        try {
          const res = V[name](root, m.slice(1).map((x) => (x ? decodeURIComponent(x) : x)), query) || {};
          cleanup = res.cleanup || null;
          if (res.title) document.title = `${res.title} · lncRNA paper study`;
          if (res.track !== false && res.title) S.setLast(location.hash, res.title);
        } catch (err) {
          console.error(err);
          root.innerHTML = `<div class="card"><h2>Something went wrong</h2><p class="muted">${U.esc(err.message)}</p><a class="btn" href="#/">Home</a></div>`;
        }
        handled = true;
        break;
      }
    }
    if (!handled) root.innerHTML = `<div class="card"><h2>Page not found</h2><p><a href="#/">Go home</a></p></div>`;
    renderNav();
    if (!query.get('keep')) {
      const target = root.querySelector('[data-scroll-target]');
      if (target) setTimeout(() => target.scrollIntoView({ block: 'start' }), 60);
      else window.scrollTo(0, 0);
    }
  }

  function applyTheme() {
    const t = S.get().settings.theme;
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }

  function boot() {
    if (!window.PAPER) {
      U.$('#boot').innerHTML = '<h2>Data files missing</h2><p>app/data/paper.js could not be loaded. Keep index.html next to the <code>app</code> folder, or use the single-file version in <code>dist/study-app.html</code>.</p>';
      return;
    }
    U.$('#boot').remove();
    U.$('#app').classList.remove('hidden');
    applyTheme();
    U.$('#themeBtn').addEventListener('click', () => {
      const st = S.get().settings;
      const dark = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      st.theme = dark ? 'light' : 'dark';
      S.save();
      applyTheme();
    });
    U.$('#view').addEventListener('click', (e) => window.PP.onClick(e));
    window.addEventListener('hashchange', route);
    window.V.init && window.V.init();
    route();
  }
  window.App = { route, applyTheme };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
