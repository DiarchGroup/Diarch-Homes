import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, ShieldCheck, Maximize2, X, CalendarClock,
  IndianRupee, Ruler, Compass, Check, Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/Seo';
import { projectBreadcrumbSchema, projectSchema } from '@/data/seo';
import { ScrollReveal } from '@/components/ScrollReveal';
import { getProjectBySlug, projects } from '@/data/projects';
import { IMAGES } from '@/lib/images';

const defaultGallery = [IMAGES.township, IMAGES.villas, IMAGES.residences, IMAGES.interior];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug) || projects[0];
  const [activeModalImage, setActiveModalImage] = useState(null);

  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : defaultGallery;

  const specs = [
    { icon: ShieldCheck, label: 'Configuration', value: project.area },
    { icon: IndianRupee, label: 'Price Range', value: project.priceRange },
    ...(project.bookingAmount ? [{ icon: IndianRupee, label: 'Booking Amount', value: project.bookingAmount }] : []),
    { icon: CalendarClock, label: 'Possession', value: project.possession },
    { icon: Ruler, label: 'Type', value: project.type },
    { icon: MapPin, label: 'Location', value: project.location },
    { icon: ShieldCheck, label: project.reraRegistered === false ? 'Registration' : 'RERA No.', value: project.rera },
  ];

  return (
    <div>
      <JsonLd data={projectSchema(project)} />
      <JsonLd data={projectBreadcrumbSchema(project)} />
      {/* Full-screen hero */}
      <section className="relative isolate flex min-h-[48vh] items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={`${project.name}, ${project.type.toLowerCase()} in ${project.location}`}
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="container-lux relative z-10 pb-16 pt-32">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mont text-xs uppercase tracking-wider text-gold">
              <Link to="/" className="hover:text-gold-hover">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/projects" className="inline-flex items-center gap-2 hover:text-gold-hover">
                <ArrowLeft strokeWidth={1.5} className="h-4 w-4" /> Projects
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="truncate text-silver">{project.name}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald/90 px-3 py-1 font-mont text-[10px] font-semibold uppercase tracking-wider text-foreground flex items-center gap-1">
                <ShieldCheck strokeWidth={1.5} className="h-3 w-3" /> {project.reraRegistered === false ? project.rera : `RERA ${project.rera}`}
              </span>
              <span className="font-mont text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">{project.type}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">{project.name}</h1>
            <p className="mt-3 flex items-center gap-2 font-mont text-sm uppercase tracking-wider text-silver">
              <MapPin strokeWidth={1.5} className="h-4 w-4" /> {project.location}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="py-12">
        <div className="container-lux">
          <div className="mb-4 flex items-center justify-between">
            <span className="eyebrow">Visual Gallery</span>
            <span className="font-mont text-xs uppercase tracking-wider text-silver">
              {gallery.length} Perspectives
            </span>
          </div>
          <div className="flex snap-x gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {gallery.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveModalImage({ src: g, alt: `${project.name} - View ${i + 1}`, title: `${project.name} (View ${i + 1} of ${gallery.length})` })}
                className="group relative h-56 w-80 shrink-0 snap-start overflow-hidden rounded-xl border border-border text-left focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <img
                  src={g}
                  alt={`${project.name} in ${project.location}, view ${i + 1}`}
                  width={640}
                  height={448}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <span className="rounded-full bg-background/80 px-3 py-1 font-mont text-[10px] uppercase tracking-wider text-gold backdrop-blur-sm flex items-center gap-1.5">
                    <Maximize2 strokeWidth={1.5} className="h-3 w-3" /> View Large
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + specs */}
      <section className="py-12">
        <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <span className="eyebrow">Overview</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream">{project.tagline}</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-silver">{project.description}</p>

            <h3 className="subhead mt-10 text-base text-gold">Key Highlights</h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <div key={h} className="flex gap-3 rounded-lg border border-border bg-surface p-4">
                  <Compass strokeWidth={1.5} className="h-5 w-5 shrink-0 text-gold" />
                  <span className="font-body text-sm text-cream">{h}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="lg:col-span-5">
            <div className="rounded-2xl border border-gold/20 bg-gradient-card p-7">
              <h3 className="subhead text-base text-gold">Project Details</h3>
              <div className="mt-5 divide-y divide-border">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-start gap-3 py-3.5">
                    <s.icon strokeWidth={1.5} className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div className="flex-1">
                      <p className="font-mont text-[11px] uppercase tracking-wider text-silver">{s.label}</p>
                      <p className="font-body text-sm text-cream">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="gold" size="xl" className="mt-6 w-full">
                <Link to="/contact">Book a Site Visit</Link>
              </Button>
              {project.brochures?.length > 0 && (
                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-mont text-[11px] uppercase tracking-wider text-silver">Download brochure</p>
                  <div className="mt-3 grid gap-2">
                    {project.brochures.map((brochure) => (
                      <a
                        key={brochure.downloadName}
                        href={brochure.href}
                        download={brochure.downloadName}
                        className="inline-flex items-center justify-between gap-3 rounded-md border border-gold/30 px-3 py-2.5 font-mont text-xs text-gold transition-colors hover:bg-gold/10"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Download strokeWidth={1.5} className="h-4 w-4" />
                          {brochure.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-silver">PDF</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Plot categories */}
      {project.plotCategories?.length > 0 && (
        <section className="py-12">
          <div className="container-lux">
            <span className="eyebrow">Plot Categories</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream">Choose your Vastu-optimised plot</h2>
            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              {project.plotCategories.map((category) => (
                <div key={category.name} className="rounded-2xl border border-gold/20 bg-gradient-card p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mont text-xs uppercase tracking-wider text-gold">{category.name}</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-cream">{category.tier}</h3>
                    </div>
                    <span className="rounded-full border border-border px-2.5 py-1 font-mont text-[10px] text-silver">{category.size}</span>
                  </div>
                  <div className="mt-5 space-y-3 border-t border-border pt-4 font-body text-sm text-silver">
                    <p><span className="text-cream">Orientation:</span> East / North / West</p>
                    <p><span className="text-cream">Vastu feature:</span> {category.vastu}</p>
                    <p><span className="text-cream">Ideal for:</span> {category.idealFor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floor plan / Master Layout */}
      <section className="py-12">
        <div className="container-lux">
          <span className="eyebrow">{project.sitePlan ? 'Master Plan' : 'Floor Plan'}</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream">
            {project.sitePlan ? 'Vastu-Planned Master Site Layout' : 'Thoughtfully Planned Spaces'}
          </h2>
          <button
            onClick={() => setActiveModalImage({
              src: project.sitePlan,
              isSvg: !project.sitePlan,
              alt: `${project.name} Site Plan`,
              title: `${project.name} - Master Site Plan`,
            })}
            className="group relative mt-7 flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2"
          >
            {project.sitePlan ? (
              <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-surface">
                <img
                  src={project.sitePlan}
                  alt={`${project.name} Master Site Plan`}
                  className="h-full w-full object-cover sm:object-contain transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            ) : (
              <>
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, hsl(221 58% 16%), hsl(218 65% 7%))' }} />
                <svg viewBox="0 0 400 240" className="relative h-44 text-gold/60">
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="20" y="20" width="360" height="200" />
                    <line x1="200" y1="20" x2="200" y2="220" />
                    <line x1="20" y1="120" x2="380" y2="120" />
                    <rect x="40" y="40" width="60" height="60" strokeOpacity="0.5" />
                    <rect x="300" y="140" width="60" height="60" strokeOpacity="0.5" />
                  </g>
                </svg>
              </>
            )}
            <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-background/80 px-3.5 py-2 font-mont text-[11px] uppercase tracking-wider text-gold backdrop-blur-md border border-gold/30">
              <Maximize2 strokeWidth={1.5} className="h-3.5 w-3.5" /> Click to expand plan
            </span>
          </button>
        </div>
      </section>

      {/* Amenities */}
      {project.amenities?.length > 0 && (
        <section className="py-12">
          <div className="container-lux">
            <span className="eyebrow">Amenities</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream">Curated for Premium Living</h2>
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {project.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
                  <Check strokeWidth={1.5} className="h-4 w-4 shrink-0 text-gold" />
                  <span className="font-body text-sm text-cream">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location */}
      <section className="py-12 pb-24">
        <div className="container-lux">
          <span className="eyebrow">Location</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream">{project.location}</h2>
          {project.distances?.length > 0 && (
            <div className="mt-7 rounded-2xl border border-gold/20 bg-gradient-card p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="eyebrow">Location Advantage</span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-cream">Key destinations nearby</h3>
                </div>
                <span className="font-mont text-xs uppercase tracking-wider text-silver">As mentioned in brochure</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {project.distances.map((distance) => (
                  <div key={distance.place} className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                    <span className="font-body text-sm text-silver">{distance.place}</span>
                    <span className="font-mont text-xs font-semibold text-gold">{distance.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-nav/95 p-3 backdrop-blur-md lg:hidden">
        <Button asChild variant="gold" className="h-12 w-full">
          <Link to="/contact">Book a Site Visit · {project.name.split(' ').slice(1).join(' ')}</Link>
        </Button>
      </div>

      {/* Zoom / Lightbox modal */}
      {activeModalImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'hsl(218 65% 7% / 0.94)', backdropFilter: 'blur(10px)' }}
          onClick={() => setActiveModalImage(null)}
        >
          <button
            className="absolute right-6 top-6 z-10 text-gold transition-colors hover:text-gold-hover p-2"
            aria-label="Close"
            onClick={() => setActiveModalImage(null)}
          >
            <X strokeWidth={2} className="h-7 w-7" />
          </button>
          
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-h-[90vh] max-w-6xl w-full rounded-2xl border border-gold/30 bg-surface-2 p-3 sm:p-5 flex flex-col items-center justify-center overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {activeModalImage.title && (
              <div className="w-full pb-3 mb-2 border-b border-border/60 flex items-center justify-between">
                <span className="font-display text-base sm:text-lg text-cream font-medium">
                  {activeModalImage.title}
                </span>
                <span className="font-mont text-[10px] uppercase tracking-wider text-gold">High Resolution</span>
              </div>
            )}
            
            <div className="w-full flex items-center justify-center max-h-[78vh] overflow-auto rounded-xl">
              {activeModalImage.isSvg ? (
                <svg viewBox="0 0 400 240" className="mx-auto h-80 text-gold">
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="20" y="20" width="360" height="200" />
                    <line x1="200" y1="20" x2="200" y2="220" />
                    <line x1="20" y1="120" x2="380" y2="120" />
                    <rect x="40" y="40" width="60" height="60" strokeOpacity="0.5" />
                    <rect x="300" y="140" width="60" height="60" strokeOpacity="0.5" />
                  </g>
                </svg>
              ) : (
                <img
                  src={activeModalImage.src}
                  alt={activeModalImage.alt || project.name}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-inner"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
