// Project data for Diarch Real Estate
import { VAIDIC_IMAGES } from '@/lib/images';

export const projects = [
  {
    slug: 'vaidic-village',
    name: 'Vaidic Village',
    location: 'Naubatpur, Patna',
    type: 'RESIDENTIAL PLOTS',
    status: 'Under Construction',
    category: 'Plotted Township',
    rera: 'Registration details pending verification',
    reraRegistered: false,
    priceRange: 'Price on request',
    area: '3BHK & 4BHK plot options',
    possession: 'On request',
    tagline: 'Residential plots in Naubatpur, Patna.',
    metaDescription:
      'Vaidic Village by Diarch Homes: residential plots in Naubatpur, Patna, with 3BHK and 4BHK plot options on a Vastu-planned layout.',
    image: VAIDIC_IMAGES.hero,
    gallery: VAIDIC_IMAGES.gallery,
    sitePlan: VAIDIC_IMAGES.sitePlan,
    description:
      'Vaidic Village is a plotted township in Naubatpur, Patna, offering 3BHK and 4BHK plot options on a Vastu-planned layout with wide internal roads and underground utilities, ready for you to build the home you envision.',
    highlights: [
      '3BHK & 4BHK plot configurations',
      'Vastu-planned plot demarcation',
      'Registration details to be confirmed before booking',
      'Gated, fully-developed layout',
    ],
    amenities: ['Wide Roads', 'Street Lighting', 'Park', 'Gated Entry', 'Underground Cabling', 'Water Supply', 'Drainage', 'Security'],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

