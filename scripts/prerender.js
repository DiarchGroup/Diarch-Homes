// Renders every route to static HTML after `vite build`, so crawlers and AI
// answer engines get real content, headings and meta tags without running JS.
// Also emits sitemap.xml from the same route list.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

const { render, ROUTES, SITE, organizationSchema } = await import(
  path.join(root, 'dist-ssr', 'entry-server.js')
);

// Normalising the template keeps a re-run over an already-prerendered dist correct.
const template = fs
  .readFileSync(path.join(dist, 'index.html'), 'utf8')
  .replace(/[ \t]*<!--seo:start-->[\s\S]*?<!--seo:end-->\n?/, '')
  .replace(/<div id="root">[\s\S]*<\/div>/, '<div id="root"></div>')
  // The template's own description/canonical are re-emitted per route.
  .replace(/\s*<meta\s+name="description"[\s\S]*?>/i, '')
  .replace(/\s*<link rel="canonical"[^>]*>/i, '');

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const headFor = (route, meta) => {
  const url = SITE.url + (route === '/' ? '/' : route);
  const image = meta.image || SITE.ogImage;
  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description;
  return [
    '<!--seo:start-->',
    `<meta name="description" content="${escape(meta.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${escape(ogTitle)}">`,
    `<meta property="og:description" content="${escape(ogDescription)}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escape(SITE.name)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escape(ogTitle)}">`,
    `<meta name="twitter:description" content="${escape(ogDescription)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`,
    '<!--seo:end-->',
  ].join('\n    ');
};

for (const [route, meta] of Object.entries(ROUTES)) {
  const body = render(route);
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('prerender: root placeholder not found in dist/index.html');
  }
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace('</head>', `  ${headFor(route, meta)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const file = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html');
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log('prerendered', file);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(ROUTES)
  .map((r) => `  <url><loc>${SITE.url}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml');
