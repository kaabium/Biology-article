// Screenshot a route of the app so authors can SEE their lessons / diagrams / panels.
//   node tools/preview.mjs '#/lesson/B7' out.png [--width 390] [--height 900] [--full] [--theme dark] [--examples] [--scroll 0.5]
// --examples also loads content/examples/*.js (gold-standard samples) before the app boots.
import { createRequire } from 'node:module';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const a = process.argv.slice(2);
const route = a[0] || '#/';
const out = a[1] || '/tmp/preview.png';
const opt = (n, d) => { const i = a.indexOf('--' + n); return i >= 0 ? a[i + 1] : d; };
const width = +opt('width', 390), height = +opt('height', 900);
const full = a.includes('--full');
const theme = opt('theme', 'light');
const browser = await pw.chromium.launch({ headless: true, executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: theme, isMobile: width < 700, hasTouch: width < 700 });
const page = await ctx.newPage();
const errs = [];
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
page.on('pageerror', (e) => errs.push(e.message));
if (a.includes('--examples')) {
  const code = readdirSync(join(ROOT, 'content', 'examples')).filter((f) => f.endsWith('.js')).map((f) => readFileSync(join(ROOT, 'content', 'examples', f), 'utf8'));
  await page.addInitScript((codes) => { document.addEventListener('DOMContentLoaded', () => codes.forEach((c) => { try { (0, eval)(c); } catch (e) { console.error('example error', e.message); } })); }, code);
}
await page.goto('file://' + join(ROOT, 'index.html') + route);
await page.waitForSelector('#app:not(.hidden)', { timeout: 15000 });
await page.waitForTimeout(700);
const sc = +opt('scroll', 0);
if (sc) { await page.evaluate((f) => window.scrollTo(0, document.body.scrollHeight * f), sc); await page.waitForTimeout(300); }
await page.screenshot({ path: out, fullPage: full });
console.log(errs.length ? 'console errors:\n' + errs.join('\n') : 'ok (no console errors)', '->', out);
await browser.close();
