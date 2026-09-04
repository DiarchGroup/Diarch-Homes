// Centralised luxury imagery (frontend prototype assets), self-hosted so Vite
// fingerprints and long-caches them instead of fetching an uncached 3rd-party CDN.
//
// Static imports (not `new URL(x, import.meta.url)`) because the SSR build used
// for prerendering doesn't rewrite that pattern — it leaves a literal file://
// path in the prerendered HTML, breaking the image for crawlers and no-JS
// visitors. A plain import is hashed correctly by both the client and SSR builds.
import founder from './profileimg.webp';

// Vaidic Village Assets
import vaidicHero from '../assets/vaidic/vaidic-gate.jpg';
import vaidicAerial from '../assets/vaidic/vaidic-aerial.jpg';
import vaidicEntrance from '../assets/vaidic/vaidic-entrance-pro.jpg';
import vaidicRoad from '../assets/vaidic/vaidic-road-pro.jpg';
import vaidicGarden from '../assets/vaidic/vaidic-garden-pro.jpg';
import vaidicInterior from '../assets/vaidic/vaidic-interior-pro.jpg';
import vaidicDevelopment from '../assets/vaidic/vaidic-13.jpg';
import vaidicView14 from '../assets/vaidic/vaidic-14.jpg';
import vaidicView15 from '../assets/vaidic/vaidic-15.jpg';
import vaidicView16 from '../assets/vaidic/vaidic-16.jpg';
import vaidicView17 from '../assets/vaidic/vaidic-17.jpg';
import vaidicView18 from '../assets/vaidic/vaidic-18.jpg';
import vaidicSitePlan from '../assets/vaidic/vaidic-site-plan.webp';
import anandLok from '../assets/arch/anand-lok.jpg';
import archGarden from '../assets/arch/arch-garden.jpg';
import asavariGram from '../assets/arch/asavari-gram.jpg';
import policeColony from '../assets/arch/police-colony.jpg';
import vaidicPhase1Brochure from '../../Vaidic Phase 1 3000per sqft.pdf';
import vaidicPhase2Brochure from '../../Vaidic villge Phase 2 Brochure - 2026.pdf';

export const VAIDIC_IMAGES = {
  hero: vaidicHero,
  v1: vaidicHero,
  v2: vaidicEntrance,
  v3: vaidicRoad,
  v4: vaidicGarden,
  v5: vaidicInterior,
  sitePlan: vaidicSitePlan,
  gallery: [
    vaidicHero,
    vaidicAerial,
    vaidicEntrance,
    vaidicRoad,
    vaidicGarden,
    vaidicInterior,
    vaidicDevelopment,
    vaidicView14,
    vaidicView15,
    vaidicView16,
    vaidicView17,
    vaidicView18,
  ],
};

export const ARCH_IMAGES = {
  anandLok,
  archGarden,
  asavariGram,
  policeColony,
};

export const VAIDIC_BROCHURES = [
  {
    label: 'Phase 2 brochure',
    href: vaidicPhase2Brochure,
    downloadName: 'Vaidic-Village-Phase-2-Brochure-2026.pdf',
  },
  {
    label: 'Phase 1 brochure',
    href: vaidicPhase1Brochure,
    downloadName: 'Vaidic-Village-Phase-1-Brochure.pdf',
  },
];

// The main landing-page image set shares the same visual language as the
// Vaidic project gallery, so the public-facing experience stays cohesive.
export const IMAGES = {
  hero: vaidicHero,
  township: vaidicHero,
  residences: vaidicEntrance,
  villas: vaidicGarden,
  interior: vaidicInterior,
  founder,
  vaidic: VAIDIC_IMAGES,
  arch: ARCH_IMAGES,
};
