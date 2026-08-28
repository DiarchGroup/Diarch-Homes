# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## SEO build (prerendering)

`npm run build` runs three steps:

1. `vite build` — the client bundle.
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` — the server bundle.
3. `node scripts/prerender.js` — renders every route to static HTML in `dist/`,
   injects per-route head tags, and writes `dist/sitemap.xml`.

Crawlers therefore get the full page text, headings and metadata without running
JavaScript; the client hydrates the same markup (`src/index.jsx`).

Verify the output with:

```bash
node scripts/check-seo.js
```

### Where things live

- `src/data/seo.js` — titles, descriptions, NAP and JSON-LD. **Single source of
  truth**: edit here, not in individual components.
- `src/components/Seo.jsx` — keeps head tags correct during client-side navigation.
- `public/robots.txt`, `public/_redirects` — static; `_redirects` is Netlify
  syntax (use `vercel.json` redirects or `.htaccess` on other hosts).

### Adding a route

Add it to `App.jsx` and to `ROUTES` in `src/data/seo.js`. Prerendering and the
sitemap pick it up automatically.

### Hosting requirements

Serve `dist/` as static files with directory-index resolution (`/about` →
`dist/about/index.html`). Keep the SPA fallback *after* the static file lookup so
prerendered HTML wins.
