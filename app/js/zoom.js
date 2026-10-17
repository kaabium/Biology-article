/* Pinch-zoom / pan image viewer for figures (touch + mouse), with optional panel highlight. */
(function () {
  'use strict';
  class Zoom {
    constructor(host, src, opts) {
      this.o = Object.assign({ autoHeight: true, maxH: 0.72, wheel: false, alt: '', rect: null, focus: null, full: true }, opts || {});
      this.outer = host;
      host.innerHTML = '';
      host = document.createElement('div');
      this.outer.appendChild(host);
      if (this.o.stageStyle) host.style.cssText = this.o.stageStyle;
      this.host = host;
      host.classList.add('zoom');
      this.img = new Image();
      this.img.alt = this.o.alt;
      this.img.draggable = false;
      host.appendChild(this.img);
      if (this.o.rect) {
        this.hl = document.createElement('div');
        this.hl.className = 'hl';
        host.appendChild(this.hl);
      }
      const ctl = document.createElement('div');
      ctl.className = 'zoombar';
      ctl.innerHTML =
        '<button type="button" data-z="in" aria-label="Zoom in">+</button>' +
        '<button type="button" data-z="out" aria-label="Zoom out">−</button>' +
        '<button type="button" data-z="reset" aria-label="Fit to screen">⤢</button>' +
        (this.o.full ? '<button type="button" data-z="full" aria-label="Open full screen">⛶</button>' : '');
      this.hint = document.createElement('span');
      this.hint.className = 'hint';
      this.hint.textContent = this.o.wheel ? 'Pinch, double-click or scroll to zoom · drag to pan' : 'Pinch or double-tap to zoom · ⛶ full screen';
      ctl.prepend(this.hint);
      this.outer.appendChild(ctl);
      ctl.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        e.stopPropagation();
        const r = host.getBoundingClientRect();
        const z = b.dataset.z;
        if (z === 'in') this.zoomAt(1.6, r.width / 2, r.height / 2);
        else if (z === 'out') this.zoomAt(1 / 1.6, r.width / 2, r.height / 2);
        else if (z === 'reset') this.reset();
        else if (z === 'full') Zoom.fullscreen(src, this.o);
      });
      ctl.addEventListener('pointerdown', (e) => e.stopPropagation());
      this.s = 1; this.x = 0; this.y = 0; this.fit = 1;
      this.ptrs = new Map();
      this.lastTap = 0;
      this.img.onload = () => {
        this.nw = this.img.naturalWidth;
        this.nh = this.img.naturalHeight;
        if (this.o.autoHeight) {
          const w = host.clientWidth || 320;
          host.style.height = Math.round(Math.min(window.innerHeight * this.o.maxH, w * (this.nh / this.nw))) + 'px';
        }
        this.reset();
        if (this.o.focus) this.zoomToRect(this.o.focus);
      };
      this.img.src = U.img(src);
      this._bind();
      if (window.ResizeObserver) {
        this.ro = new ResizeObserver(() => { if (this.nw) this.reset(); });
        this.ro.observe(host);
      }
    }
    _bind() {
      const h = this.host;
      h.addEventListener('pointerdown', (e) => {
        if (e.button && e.button !== 0) return;
        h.setPointerCapture && h.setPointerCapture(e.pointerId);
        this.ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t: Date.now() });
        if (this.ptrs.size === 2) this._startPinch();
        h.classList.add('grabbing');
      });
      h.addEventListener('pointermove', (e) => {
        const p = this.ptrs.get(e.pointerId);
        if (!p) return;
        const dx = e.clientX - p.x;
        const dy = e.clientY - p.y;
        p.x = e.clientX; p.y = e.clientY;
        if (this.ptrs.size >= 2 && this.pinch) {
          const [a, b] = Array.from(this.ptrs.values());
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const r = h.getBoundingClientRect();
          const mx = (a.x + b.x) / 2 - r.left;
          const my = (a.y + b.y) / 2 - r.top;
          const ns = U.clamp(this.pinch.s * (dist / this.pinch.d), this.fit, this.max());
          this.x = mx - this.pinch.ix * ns;
          this.y = my - this.pinch.iy * ns;
          this.s = ns;
          this.apply();
          e.preventDefault();
        } else if (this.ptrs.size === 1 && (this.s > this.fit * 1.01 || e.pointerType === 'mouse')) {
          this.x += dx; this.y += dy;
          this.apply();
          e.preventDefault();
        }
      });
      const end = (e) => {
        const p = this.ptrs.get(e.pointerId);
        this.ptrs.delete(e.pointerId);
        if (this.ptrs.size < 2) this.pinch = null;
        if (!this.ptrs.size) h.classList.remove('grabbing');
        if (p && e.type === 'pointerup' && e.pointerType !== 'mouse') {
          const moved = Math.hypot(e.clientX - p.x0, e.clientY - p.y0);
          const now = Date.now();
          if (moved < 10 && now - p.t < 300) {
            if (now - this.lastTap < 320) {
              const r = h.getBoundingClientRect();
              this.toggle(e.clientX - r.left, e.clientY - r.top);
              this.lastTap = 0;
            } else this.lastTap = now;
          }
        }
      };
      h.addEventListener('pointerup', end);
      h.addEventListener('pointercancel', end);
      h.addEventListener('dblclick', (e) => {
        const r = h.getBoundingClientRect();
        this.toggle(e.clientX - r.left, e.clientY - r.top);
      });
      h.addEventListener('wheel', (e) => {
        if (!(this.o.wheel || e.ctrlKey || e.metaKey)) return;
        e.preventDefault();
        const r = h.getBoundingClientRect();
        this.zoomAt(Math.exp(-e.deltaY * 0.0018), e.clientX - r.left, e.clientY - r.top);
      }, { passive: false });
    }
    _startPinch() {
      const [a, b] = Array.from(this.ptrs.values());
      const r = this.host.getBoundingClientRect();
      const mx = (a.x + b.x) / 2 - r.left;
      const my = (a.y + b.y) / 2 - r.top;
      this.pinch = { d: Math.max(10, Math.hypot(a.x - b.x, a.y - b.y)), s: this.s, ix: (mx - this.x) / this.s, iy: (my - this.y) / this.s };
    }
    max() { return Math.max(this.fit * 8, 2.2); }
    toggle(cx, cy) {
      if (this.s > this.fit * 1.2) this.reset();
      else this.zoomAt(Math.min(3, this.max() / this.s), cx, cy);
    }
    zoomAt(f, cx, cy) {
      const ns = U.clamp(this.s * f, this.fit, this.max());
      this.x = cx - (cx - this.x) * (ns / this.s);
      this.y = cy - (cy - this.y) * (ns / this.s);
      this.s = ns;
      this.apply();
    }
    reset() {
      const cw = this.host.clientWidth;
      const ch = this.host.clientHeight;
      if (!this.nw || !cw || !ch) return;
      this.fit = Math.min(cw / this.nw, ch / this.nh);
      this.s = this.fit;
      this.x = (cw - this.nw * this.s) / 2;
      this.y = (ch - this.nh * this.s) / 2;
      this.apply();
    }
    zoomToRect(r) {
      const cw = this.host.clientWidth;
      const ch = this.host.clientHeight;
      const rw = (r[2] - r[0]) * this.nw;
      const rh = (r[3] - r[1]) * this.nh;
      this.s = U.clamp(Math.min(cw / (rw * 1.06), ch / (rh * 1.06)), this.fit, this.max());
      this.x = cw / 2 - (r[0] * this.nw + rw / 2) * this.s;
      this.y = ch / 2 - (r[1] * this.nh + rh / 2) * this.s;
      this.apply();
    }
    apply() {
      const cw = this.host.clientWidth;
      const ch = this.host.clientHeight;
      const W = this.nw * this.s;
      const H = this.nh * this.s;
      this.x = W <= cw ? (cw - W) / 2 : U.clamp(this.x, cw - W, 0);
      this.y = H <= ch ? (ch - H) / 2 : U.clamp(this.y, ch - H, 0);
      const t = `translate(${this.x}px,${this.y}px) scale(${this.s})`;
      this.img.style.transform = t;
      this.img.style.width = this.nw + 'px';
      this.img.style.height = this.nh + 'px';
      if (this.hl && this.o.rect) {
        const r = this.o.rect;
        this.hl.style.left = this.x + r[0] * this.nw * this.s + 'px';
        this.hl.style.top = this.y + r[1] * this.nh * this.s + 'px';
        this.hl.style.width = (r[2] - r[0]) * this.nw * this.s + 'px';
        this.hl.style.height = (r[3] - r[1]) * this.nh * this.s + 'px';
      }
      // at fit scale let one-finger swipes scroll the page; when zoomed, one finger pans the image
      this.host.style.touchAction = this.s > this.fit * 1.01 ? 'none' : 'pan-y';
    }
    destroy() { if (this.ro) this.ro.disconnect(); }
    static fullscreen(src, opts) {
      const box = document.createElement('div');
      box.style.cssText = 'flex:1;min-height:0;display:flex';
      const host = document.createElement('div');
      host.style.cssText = 'flex:1;display:flex;flex-direction:column;min-height:0';
      box.appendChild(host);
      const m = U.modal({ title: (opts && opts.title) || 'Figure', body: box, full: true });
      setTimeout(() => {
        const z = new Zoom(host, src, Object.assign({}, opts, { autoHeight: false, wheel: true, full: false, stageStyle: 'flex:1;min-height:0' }));
        m.el.addEventListener('remove', () => z.destroy());
      }, 30);
    }
  }
  window.Zoom = Zoom;
})();
