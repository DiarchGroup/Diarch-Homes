import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, ShieldCheck, Maximize2, X, CalendarClock,
  IndianRupee, Ruler, Compass, Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/Seo';
import { projectSchema } from '@/data/seo';
import { ScrollReveal } from '@/components/ScrollReveal';
import { getProjectBySlug, projects } from '@/data/projects';
import { IMAGES } from '@/lib/images';

const gallery = [IMAGES.township, IMAGES.villas, IMAGES.residences, IMAGES.interior];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug) || projects[0];
  const [zoom, setZoom] = useState(false);

  const specs = [
    { icon: ShieldCheck, label: 'Configuration', value: project.area },
    { icon: IndianRupee, label: 'Price Range', value: project.priceRange },
    { icon: CalendarClock, label: 'Possession', value: project.possession },
    { icon: Ruler, label: 'Type', value: project.type },
    { icon: MapPin, label: 'Location', value: project.location },
    { icon: ShieldCheck, label: 'RERA No.', value: project.rera },
  ];

  return (
    <div>
      <JsonLd data={projectSchema(project)} />
      {/* Full-screen hero */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={project.image}
            alt={`${project.name} — ${project.type.toLowerCase()} in ${project.location}`}
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="container-lux pb-16 pt-32">
          <ScrollReveal>
            <Link to="/projects" className="mb-6 inline-flex items-center gap-2 font-mont text-xs uppercase tracking-wider text-gold hover:text-gold-hover">
              <ArrowLeft strokeWidth={1.5} className="h-4 w-4" /> All Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald/90 px-3 py-1 font-mont text-[10px] font-semibold uppercase tracking-wider text-foreground flex items-center gap-1">
                <ShieldCheck strokeWidth={1.5} className="h-3 w-3" /> RERA {project.rera}
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
          <div className="flex snap-x gap-4 overflow-x-auto pb-4">
            {gallery.map((g, i) => (
              <div key={i} className="relative h-56 w-80 shrink-0 snap-start overflow-hidden rounded-xl border border-border">
                <img
                  src={g}
                  alt={`${project.name} in ${project.location} — view ${i + 1}`}
                  width={640}
                  height={448}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
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

            <h3 className="subhead mt-10 text-base text-gold">Vastu Highlights</h3>
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
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Floor plan */}
      <section className="py-12">
        <div className="container-lux">
          <span className="eyebrow">Floor Plan</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream">Thoughtfully Planned Spaces</h2>
          <button
            onClick={() => setZoom(true)}
            className="group relative mt-7 flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2"
          >
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
            <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 font-mont text-[11px] uppercase tracking-wider text-gold backdrop-blur-sm">
              <Maximize2 strokeWidth={1.5} className="h-3.5 w-3.5" /> Click to zoom
            </span>
          </button>
        </div>
      </section>

      {/* Amenities */}
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

      {/* Location */}
      <section className="py-12 pb-24">
        <div className="container-lux">
          <span className="eyebrow">Location</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream">{project.location}</h2>
          <div className="relative mt-7 h-80 overflow-hidden rounded-2xl border border-border bg-surface-2">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(221 58% 16%), hsl(215 55% 11%))' }} />
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(hsl(44 54% 54% / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(44 54% 54% / 0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <MapPin strokeWidth={1.5} className="mx-auto h-10 w-10 text-gold" />
              <p className="mt-2 font-mont text-xs uppercase tracking-wider text-silver">Interactive Map Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-nav/95 p-3 backdrop-blur-md lg:hidden">
        <Button asChild variant="gold" className="h-12 w-full">
          <Link to="/contact">Book a Site Visit · {project.name.split(' ').slice(1).join(' ')}</Link>
        </Button>
      </div>

      {/* Zoom modal */}
      {zoom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'hsl(218 65% 7% / 0.9)', backdropFilter: 'blur(8px)' }}
          onClick={() => setZoom(false)}
        >
          <button className="absolute right-6 top-6 text-gold" aria-label="Close"><X strokeWidth={1.5} className="h-7 w-7" /></button>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-3xl rounded-2xl border border-gold/30 bg-surface-2 p-8">
            <svg viewBox="0 0 400 240" className="mx-auto h-80 text-gold">
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="20" y="20" width="360" height="200" />
                <line x1="200" y1="20" x2="200" y2="220" />
                <line x1="20" y1="120" x2="380" y2="120" />
                <rect x="40" y="40" width="60" height="60" strokeOpacity="0.5" />
                <rect x="300" y="140" width="60" height="60" strokeOpacity="0.5" />
              </g>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
