// Single source of truth for per-route SEO metadata.
// Consumed twice: by <Seo/> at runtime (SPA navigation) and by
// scripts/prerender.js at build time (crawler-visible HTML).
import { projects } from '@/data/projects';

export const SITE = {
  url: 'https://www.diarchhomes.com',
  name: 'Diarch Homes Pvt. Ltd.',
  logo: 'https://www.diarchhomes.com/logo.png',
  ogImage: 'https://www.diarchhomes.com/og-image.jpg',
  // NAP per the SEO fix plan (27 Aug 2026). Keep identical here, on Google
  // Business Profile, Justdial and Facebook.
  email: 'info@diarchhomes.com',
  telephone: '+91-94310-06638',
  address: {
    streetAddress: 'H.N. 28, Vasant Vihar Colony, Opp. Tapasya Complex, Boring Road',
    addressLocality: 'Patna',
    addressRegion: 'Bihar',
    postalCode: '800001',
    addressCountry: 'IN',
  },
  // Same NAP, formatted for display. Keep these two in sync.
  addressLines: [
    'H.N.-28, Vasant Vihar Colony',
    'Opp. Tapasya Complex',
    'Boring Road, Patna',
    'Bihar – 800001, India',
  ],
  phoneDisplay: '+91 94310 06638',
  phoneHref: 'tel:+919431006638',
  whatsapp: 'https://wa.me/919431006638?text=Hello%20Diarch%20Homes',
  founded: '2014',
};

const staticRoutes = {
  '/': {
    title: 'Diarch · Luxury Homes & Townships in Bihar',
    // Verbatim from the fix plan (Steps 2 and 6).
    description:
      'Diarch Homes builds luxury townships and residential plots in Patna, Bihar. Explore Vaidic Village in Naubatpur — 3BHK & 4BHK plot options.',
    ogTitle: 'Diarch Homes | Luxury Townships & Plots in Patna, Bihar',
    ogDescription:
      'Residential townships and plots in Patna. Explore Vaidic Village in Naubatpur.',
  },
  '/projects': {
    title: 'Projects | Townships, Apartments & Plots in Bihar',
    description:
      'Explore Diarch Homes projects across Patna, Gaya, Muzaffarpur, Hajipur and Begusarai — Vastu-aligned townships, premium apartments, garden villas and residential plots.',
  },
  '/about': {
    title: 'About Diarch Homes | Property Developer in Patna, Bihar',
    description:
      'Diarch Homes is part of the Diarch Group, founded in 2014 — a Bihar developer of townships, residences and residential plots.',
  },
  '/contact': {
    title: 'Contact Diarch Homes | Book a Site Visit in Patna, Bihar',
    description:
      'Contact Diarch Homes — Boring Road, Patna. Book a site visit, request a brochure or discuss project registration details with a relationship manager.',
  },
};

const projectMeta = (p) => ({
  title: `${p.name} | ${p.type.toLowerCase()} in ${p.location} | Diarch Homes`,
  description:
    p.metaDescription ??
    `${p.tagline} ${p.area}. ${p.priceRange}. RERA ${p.rera}. Possession ${p.possession}.`,
  image: p.image,
});

export const ROUTES = {
  ...staticRoutes,
  ...Object.fromEntries(projects.map((p) => [`/projects/${p.slug}`, projectMeta(p)])),
};

export const getMeta = (pathname) => {
  const key = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
  return ROUTES[key] ?? staticRoutes['/'];
};

// RealEstateAgent schema — sitewide, emitted on every page.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: SITE.name,
  url: SITE.url,
  logo: SITE.logo,
  image: SITE.ogImage,
  email: SITE.email,
  telephone: SITE.telephone,
  areaServed: 'Patna, Bihar, India',
  address: { '@type': 'PostalAddress', ...SITE.address },
  parentOrganization: { '@type': 'Organization', name: 'Diarch Group' },
  foundingDate: SITE.founded,
};

// Residence schema for a project detail page.
export const projectSchema = (p) => ({
  '@context': 'https://schema.org',
  '@type': 'Residence',
  name: p.name,
  description: p.description,
  url: `${SITE.url}/projects/${p.slug}`,
  image: p.image,
  address: {
    '@type': 'PostalAddress',
    addressLocality: p.location.split(',')[0].trim(),
    addressRegion: 'Bihar',
    addressCountry: 'IN',
  },
  amenityFeature: p.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a })),
});

export const projectBreadcrumbSchema = (p) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE.url}/projects` },
    { '@type': 'ListItem', position: 3, name: p.name, item: `${SITE.url}/projects/${p.slug}` },
  ],
});
