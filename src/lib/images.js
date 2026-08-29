// Centralised luxury imagery (frontend prototype assets), self-hosted so Vite
// fingerprints and long-caches them instead of fetching an uncached 3rd-party CDN.
//
// Static imports (not `new URL(x, import.meta.url)`) because the SSR build used
// for prerendering doesn't rewrite that pattern — it leaves a literal file://
// path in the prerendered HTML, breaking the image for crawlers and no-JS
// visitors. A plain import is hashed correctly by both the client and SSR builds.
import hero from '../assets/hero.webp';
import township from '../assets/township.webp';
import residences from '../assets/residences.webp';
import villas from '../assets/villas.webp';
import interior from '../assets/interior.webp';
import founder from './profileimg.webp';

export const IMAGES = { hero, township, residences, villas, interior, founder };
