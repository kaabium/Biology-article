// Browser smoke test: opens index.html and dist/study-app.html (file://) at phone and desktop sizes,
// visits every route, fails on any console error / page error, and saves screenshots.
// Usage: node tools/smoke.mjs [outDir] [--quick]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : join(ROOT, 'tools', 'screens');
const QUICK = process.argv.includes('--quick');
mkdirSync(OUT, { recursive: true });
const ROUTES = ['#/', '#/learn', '#/paper', '#/read/summary', '#/read/res-pipeline', '#/read/m-krt', '#/read/refs', '#/refs/71',
  '#/g', '#/g/res-aso', '#/figures', '#/figure/fig2', '#/figure/ga', '#/panel/fig4C', '#/panel/fig6J', '#/practice', '#/cards', '#/cards/review',
  '#/quizzes', '#/exams', '#/explain', '#/glossary', '#/numbers', '#/summary', '#/cheatsheet', '#/planner', '#/search?q=cisplatin',
  '#/settings', '#/more', '#/about'];
const extra = (process.env.ROUTES || '').split(',').filter(Boolean);
const launchOpts = { headless: true };
try { launchOpts.executablePath = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'; } catch {}
const browser = await pw.chromium.launch(launchOpts);
const targets = [['index', 'file://' + join(ROOT, 'index.html')], ['dist', 'file://' + join(ROOT, 'dist', 'study-app.html')]];
const sizes = [['phone', { width: 390, height: 844 }, true], ['desktop', { width: 1280, height: 900 }, false]];
let failures = 0;
for (const [tname, url] of targets) {
  for (const [sname, vp, mobile] of sizes) {
    const ctx = await browser.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 });
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error') errs.push(`console: ${m.text()}`); });
    page.on('pageerror', (e) => errs.push(`pageerror: ${e.message}`));
    await page.goto(url + '#/');
    await page.waitForSelector('#app:not(.hidden)', { timeout: 15000 });
    const routes = QUICK ? ROUTES.slice(0, 6) : ROUTES.concat(extra);
    for (const r of routes) {
      const before = errs.length;
      await page.evaluate((h) => { location.hash = h; }, r);
      await page.waitForTimeout(r.includes('figure') || r.includes('panel') ? 500 : 220);
      const text = await page.locator('#view').innerText();
      if (/Something went wrong|Page not found/.test(text)) errs.push(`route ${r}: ${text.slice(0, 160)}`);
      if (errs.length > before) console.log(`  [${tname}/${sname}] ${r}:`, errs.slice(before).join(' | '));
      if (!QUICK && (sname === 'phone' || ['#/', '#/panel/fig4C', '#/g/res-aso', '#/read/res-pipeline'].includes(r)) && tname === 'index') {
        await page.screenshot({ path: join(OUT, `${sname}-${r.replace(/[#/?=]+/g, '_') || 'home'}.png`), fullPage: false });
      }
    }
    // horizontal overflow check on phone
    if (sname === 'phone') {
      for (const r of ['#/', '#/read/res-pipeline', '#/panel/fig5A', '#/glossary']) {
        await page.evaluate((h) => { location.hash = h; }, r);
        await page.waitForTimeout(300);
        const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (ov > 2) errs.push(`horizontal overflow ${ov}px on ${r}`);
      }
    }
    console.log(`${tname}/${sname}: ${errs.length ? 'FAIL' : 'ok'} (${errs.length} problems)`);
    if (errs.length) { failures += errs.length; errs.slice(0, 20).forEach((e) => console.log('   ', e)); }
    await ctx.close();
  }
}
await browser.close();
process.exit(failures ? 1 : 0);
