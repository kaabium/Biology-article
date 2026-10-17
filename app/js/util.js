/* Shared helpers: DOM, escaping, images, modals, toasts, clipboard, source IDs. */
(function () {
  'use strict';
  const U = (window.U = {});

  U.$ = (s, r) => (r || document).querySelector(s);
  U.$$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  U.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  U.strip = (html) => {
    const d = document.createElement('div');
    d.innerHTML = String(html || '').replace(/<br\s*\/?>/gi, ' ');
    return d.textContent;
  };
  U.el = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  /* image path -> data URI in the single-file build, else the relative path */
  U.img = (p) => (window.IMG_DATA && window.IMG_DATA[p]) || p;
  U.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  U.debounce = (fn, ms) => {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  };
  U.pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
  U.plural = (n, w, pl) => `${n} ${n === 1 ? w : pl || w + 's'}`;

  /* local dates */
  U.today = (d) => {
    d = d || new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  U.dayNum = (iso) => {
    const [y, m, d] = (iso || U.today()).split('-').map(Number);
    return Math.round(Date.UTC(y, m - 1, d) / 86400000);
  };
  U.fromDayNum = (n) => {
    const d = new Date(n * 86400000);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  };
  U.fmtDay = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  };

  /* deterministic shuffle (seeded) so option order is stable per question */
  U.seeded = (seed) => {
    let h = 2166136261;
    for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return () => {
      h += 0x6d2b79f5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  U.shuffle = (arr, seed) => {
    const a = arr.slice();
    const rnd = seed == null ? Math.random : U.seeded(seed);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* ---------- toast ---------- */
  let toastTimer;
  U.toast = (msg, ms) => {
    let t = U.$('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.add('hidden'), ms || 2600);
  };

  /* ---------- modal sheet ---------- */
  U.modal = ({ title, body, full, onClose, actions }) => {
    const scrim = document.createElement('div');
    scrim.className = 'scrim';
    scrim.innerHTML = `<div class="sheet${full ? ' full' : ''}" role="dialog" aria-modal="true" aria-label="${U.esc(title || 'Details')}">
        <div class="sheet-head" ${full ? 'style="padding:.5rem .75rem;position:static"' : ''}>
          <h3>${title || ''}</h3>${actions || ''}
          <button class="icon-btn" data-close aria-label="Close">✕</button>
        </div>
        <div class="sheet-body"></div></div>`;
    const sheet = scrim.firstElementChild;
    const bodyEl = sheet.querySelector('.sheet-body');
    if (full) bodyEl.style.cssText = 'flex:1;display:flex;flex-direction:column;min-height:0';
    if (typeof body === 'string') bodyEl.innerHTML = body;
    else if (body) bodyEl.appendChild(body);
    const prevFocus = document.activeElement;
    const close = () => {
      scrim.remove();
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (onClose) onClose();
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    scrim.addEventListener('click', (e) => {
      if (e.target === scrim || e.target.closest('[data-close]')) close();
    });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(scrim);
    document.body.style.overflow = 'hidden';
    const closeBtn = sheet.querySelector('[data-close]');
    if (closeBtn) closeBtn.focus();
    return { el: sheet, body: bodyEl, close };
  };

  /* ---------- clipboard with fallbacks ---------- */
  U.copy = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) { /* fall through */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      ta.remove();
      if (ok) return true;
    } catch (e) { /* fall through */ }
    return false;
  };

  /* ---------- "Ask Claude" tutor prompt ---------- */
  U.CITATION = 'Esposito, Polidori et al. (2022), "Multi-hallmark long noncoding RNA maps reveal non-small cell lung cancer vulnerabilities", Cell Genomics 2, 100171';
  U.askClaude = async ({ what, where, text, extra }) => {
    const prompt =
      `I'm a complete beginner studying this paper: ${U.CITATION}.\n` +
      `I know nothing about biology, genetics, cancer, lab techniques or statistics.\n\n` +
      `Please help me understand the ${what || 'text'} below${where ? ` (${where})` : ''}:\n` +
      `1. Explain it in plain, simple English with short sentences.\n` +
      `2. Define every technical term the first time you use it.\n` +
      `3. Give me one everyday analogy.\n` +
      `4. Tell me why it matters for the paper's overall story.\n` +
      `5. Finish with 2 short questions to check that I understood (answers hidden at the end).\n` +
      `Please do not add facts about this paper that are not in the text; say so if something cannot be known from it.\n\n` +
      `"""\n${String(text || '').trim()}\n"""` + (extra ? `\n\n${extra}` : '');
    const ok = await U.copy(prompt);
    if (ok) {
      U.toast('Tutor prompt copied ✓ — paste it into the Claude app');
    } else {
      const m = U.modal({
        title: 'Copy this prompt',
        body: `<p class="small muted">Your viewer blocked automatic copying. Select all the text below and copy it, then paste it into the Claude app.</p>
               <textarea style="min-height:50vh">${U.esc(prompt)}</textarea>`,
      });
      const ta = m.body.querySelector('textarea');
      ta.focus();
      ta.select();
    }
  };

  /* ---------- content-kind blocks ---------- */
  const KIND = {
    paper: ['k-paper', '📄 Paper · verbatim'],
    plain: ['k-plain', '💬 Plain English'],
    bgnd: ['k-bgnd', '📚 Background · not from the paper'],
    memory: ['k-memory', '💡 Memory aid'],
    why: ['k-why', '🎯 Why it matters'],
    flag: ['k-flag', '⚠️ Heads-up'],
    worked: ['k-worked', '🧮 Worked example · background'],
  };
  U.kind = (k, html, opts) => {
    opts = opts || {};
    const [cls, label] = KIND[k] || KIND.plain;
    const src = opts.source ? `<div class="srcline">Source: ${U.srcLinks(opts.source)}</div>` : '';
    return `<div class="kind ${cls}"><div class="klabel">${opts.label || label}</div>${k === 'paper' ? `<div class="ptext">${html}</div>` : html}${src}</div>`;
  };

  /* ---------- source IDs (paragraphs, panels, figures, references, table rows) ---------- */
  let SRC = null;
  U.sources = () => {
    if (SRC) return SRC;
    SRC = {};
    const P = window.PAPER;
    if (!P) return SRC;
    const secTitle = {};
    P.sections.forEach((s) => (secTitle[s.id] = s.title));
    const count = {};
    P.blocks.forEach((b) => {
      if (b.type === 'figure') return;
      const n = (b.id.match(/-p(\d+)$/) || [])[1];
      const lab = `${secTitle[b.sec] || b.sec}${n ? ' ¶' + n : ''} · p.${b.printed[0]}`;
      SRC[b.id] = { kind: 'para', label: lab, href: `#/read/${b.sec}/${b.id}`, text: b.text, html: b.html, sec: b.sec };
      count[b.sec] = (count[b.sec] || 0) + 1;
    });
    P.figures.forEach((f) => {
      const notes = f.notes.map((n) => n.text).join(' ');
      SRC[f.id] = { kind: 'figure', label: `Figure ${f.num}`, href: `#/figure/${f.id}`, text: `Figure ${f.num}. ${f.title}. ${f.panels.map((p) => p.legend).join(' ')} ${notes}` };
      SRC[f.id + '-title'] = { kind: 'figure', label: `Figure ${f.num} title`, href: `#/figure/${f.id}`, text: f.title };
      f.panels.forEach((p) => {
        const ft = (window.FIGTEXT && window.FIGTEXT[p.id]) || '';
        SRC[p.id] = { kind: 'panel', label: `Fig ${f.num}${p.letter}`, href: `#/panel/${p.id}`, text: `${p.legend} ${notes} ${ft}`, legend: p.legend, figtext: ft };
      });
    });
    SRC.ga = { kind: 'figure', label: 'Graphical abstract', href: '#/figure/ga', text: (window.FIGTEXT && window.FIGTEXT.ga) || 'Graphical abstract' };
    P.references.forEach((r) => (SRC['ref-' + r.n] = { kind: 'ref', label: `Ref ${r.n}`, href: `#/refs/${r.n}`, text: r.text }));
    P.krt.forEach((c) => c.rows.forEach((r) => (SRC[r.id] = { kind: 'krt', label: `Key resources: ${U.strip(r.cells[0]).slice(0, 30)}`, href: `#/read/m-krt/${r.id}`, text: r.text })));
    return SRC;
  };
  U.srcLinks = (ids) => {
    const S = U.sources();
    return []
      .concat(ids || [])
      .map((id) => (S[id] ? `<a href="${S[id].href}">${U.esc(S[id].label)}</a>` : `<span class="badge bad" title="unknown source">${U.esc(id)}</span>`))
      .join(' · ');
  };

  /* ---------- small rendering helpers ---------- */
  U.ring = (p, label, color) =>
    `<div class="ring" style="--p:${U.clamp(p, 0, 100)};${color ? `--c:${color}` : ''}"><span>${label != null ? label : p + '%'}</span></div>`;
  U.bar = (p) => `<div class="progress" aria-label="${p}%"><i style="width:${U.clamp(p, 0, 100)}%"></i></div>`;
  U.trackColor = (t) => `var(--t${t})`;

  /* escape for use inside a RegExp */
  U.reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  /* highlight query words inside plain text (returns html) */
  U.highlight = (text, words) => {
    let h = U.esc(text);
    words.filter((w) => w.length > 1).forEach((w) => {
      h = h.replace(new RegExp(`(${U.reEsc(U.esc(w))})`, 'gi'), '<mark>$1</mark>');
    });
    return h;
  };
  U.snippet = (text, words, len) => {
    len = len || 180;
    const t = text.toLowerCase();
    let i = -1;
    for (const w of words) {
      i = t.indexOf(w.toLowerCase());
      if (i >= 0) break;
    }
    const start = Math.max(0, i - 60);
    return (start > 0 ? '…' : '') + text.slice(start, start + len) + (start + len < text.length ? '…' : '');
  };
})();
