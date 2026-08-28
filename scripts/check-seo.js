// Smallest thing that fails if the prerender/SEO pipeline breaks.
// Run after `npm run build`: node scripts/check-seo.js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), 'dist');
const { ROUTES, SITE } = await import(
  path.join(path.dirname(dist), 'dist-ssr', 'entry-server.js')
);

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
assert.ok(fs.existsSync(path.join(dist, 'robots.txt')), 'robots.txt missing');

for (const route of Object.keys(ROUTES)) {
  const file = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html');
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  const url = SITE.url + (route === '/' ? '/' : route);
  const root = html.match(/<div id="root">([\s\S]*)<\/div>/)?.[1] ?? '';

  assert.ok(root.length > 2000, `${file}: root is empty — content not prerendered`);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${file}: needs exactly one h1`);
  assert.equal((html.match(/name="description"/g) ?? []).length, 1, `${file}: one meta description`);
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${file}: one canonical`);
  assert.ok(html.includes(`<link rel="canonical" href="${url}">`), `${file}: wrong canonical`);
  assert.ok(html.includes('og:image'), `${file}: missing Open Graph tags`);
  assert.ok(html.includes('RealEstateAgent'), `${file}: missing JSON-LD schema`);
  assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${route}: missing from sitemap.xml`);
}
console.log(`ok — ${Object.keys(ROUTES).length} routes prerendered with valid SEO head`);
