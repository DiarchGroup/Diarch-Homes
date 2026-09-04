import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, getMeta } from '@/data/seo';

const upsert = (selector, create, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
};

const meta = (name, content) =>
  upsert(`meta[name="${name}"]`, () => document.createElement('meta'), { name, content });

const property = (prop, content) =>
  upsert(`meta[property="${prop}"]`, () => document.createElement('meta'), { property: prop, content });

// Keeps head tags in sync during client-side navigation.
// Build-time equivalents are injected by scripts/prerender.js so crawlers
// see the correct tags without executing JavaScript.
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const m = getMeta(pathname);
    const url = SITE.url + (pathname === '/' ? '/' : pathname);
    const image = m.image || SITE.ogImage;
    const ogTitle = m.ogTitle || m.title;
    const ogDescription = m.ogDescription || m.description;

    document.title = m.title;
    meta('description', m.description);
    upsert('link[rel="canonical"]', () => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      return el;
    }, { href: url });

    property('og:title', ogTitle);
    property('og:description', ogDescription);
    property('og:image', image);
    property('og:image:alt', `${m.title} — Diarch Homes`);
    property('og:url', url);
    property('og:type', 'website');
    meta('twitter:card', 'summary_large_image');
    meta('twitter:title', ogTitle);
    meta('twitter:description', ogDescription);
    meta('twitter:image', image);
    meta('twitter:image:alt', `${m.title} — Diarch Homes`);
  }, [pathname]);

  return null;
}

export const JsonLd = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
