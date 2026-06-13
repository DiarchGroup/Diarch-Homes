import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Compass, Droplets, BedDouble, FileCheck2, Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/HeroSection';
import { ProjectCard } from '@/components/ProjectCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { VastuCompass } from '@/components/VastuCompass';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/ScrollReveal';
import { projects } from '@/data/projects';
import { testimonials } from '@/data/testimonials';

const Eyebrow = ({ children }) => <span className="eyebrow">{children}</span>;

const vastuFeatures = [
  { icon: Compass, title: 'North-Facing Entrances', desc: 'Oriented for prosperity and the flow of positive energy.' },
  { icon: Droplets, title: 'Water in the Ishan (NE) Zone', desc: 'Sacred north-east water elements for harmony and wealth.' },
  { icon: BedDouble, title: 'Master Bedroom in South-West', desc: 'Grounded placement for stability and restful sleep.' },
  { icon: FileCheck2, title: 'Expert-Certified Floor Plans', desc: 'Every layout reviewed and certified by Vastu specialists.' },
];

const differences = [
  { title: 'RERA Registered & Transparent', desc: 'Every project is fully registered with complete legal transparency.' },
  { title: 'Smart Township Infrastructure', desc: 'Fibre connectivity, app-controlled security and smart utilities.' },
  { title: 'Vastu-Certified Design', desc: 'Cosmically aligned homes certified by Vastu experts.' },
  { title: 'Premium Amenities', desc: 'Clubhouses, pools, landscaped parks and curated living.' },
  { title: 'On-Time Delivery', desc: 'A track record of possession delivered as promised.' },
  { title: 'Post-Possession Support', desc: 'A dedicated relationship team, long after you move in.' },
];

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div>
      <HeroSection />

      {/* SIGNATURE PROJECTS */}
      <section className="py-20 md:py-28">
        <div className="container-lux">
          <ScrollReveal className="max-w-2xl">
            <Eyebrow>Signature Projects</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
              Where Architecture Meets Aspiration
            </h2>
            <p className="mt-4 font-body text-base text-silver">
              A curated portfolio of townships, residences and villas — each one a Vastu-aligned address built to endure generations.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="goldOutline" size="xl">
              <Link to="/projects">View All Projects <ArrowRight strokeWidth={1.5} className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* THE VASTU PROMISE */}
      <section id="vastu" className="py-20 md:py-28">
        <div className="container-lux">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <ScrollReveal className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-emerald p-10">
                <VastuCompass className="mx-auto aspect-square w-full max-w-sm" />
                <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 40%, hsl(218 65% 7% / 0.55))' }} />
              </div>
            </ScrollReveal>

            <div className="lg:col-span-6 lg:pl-6">
              <ScrollReveal>
                <Eyebrow>The Vastu Promise</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
                  Every Home, Cosmos-Aligned.
                </h2>
              </ScrollReveal>

              <StaggerGroup className="mt-8 space-y-6">
                {vastuFeatures.map((f) => (
                  <StaggerItem key={f.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                      <f.icon strokeWidth={1.5} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="subhead text-base">{f.title}</h3>
                      <p className="mt-1 font-body text-sm text-silver">{f.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER'S VISION */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: 'hsl(218 65% 7%)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 0%, hsl(44 54% 54% / 0.08), transparent 55%)' }} />
        <div className="container-lux relative">
          <ScrollReveal className="mx-auto max-w-4xl text-center">
            <span className="font-cormorant block text-[100px] leading-none text-gold/40 md:text-[120px]">“</span>
            <p className="-mt-10 font-display text-2xl font-medium leading-snug text-cream sm:text-3xl lg:text-4xl">
              We don’t build homes. We build legacies aligned with the cosmos and the land of Bihar.
            </p>
            <div className="mx-auto mt-8 h-px w-16 bg-gold/50" />
            <p className="mt-6 font-cormorant text-xl italic text-silver">— Ranjan Kumar Ojha</p>
            <p className="mt-2 font-mont text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Founder, Diarch Group
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* WHY DIARCH */}
      <section className="py-20 md:py-28">
        <div className="container-lux">
          {/* Asymmetric header */}
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-end gap-8">
              <div className="lg:col-span-3">
                <p className="font-mont text-[10px] uppercase tracking-[0.22em] text-silver">
                  02 / The Diarch Difference
                </p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl leading-tight">
                  Built to a standard,<br className="hidden sm:block" /> not a budget.
                </h2>
              </div>
            </div>
          </ScrollReveal>

          {/* Full-width hairline */}
          <div className="hairline mt-10 mb-0" />

          {/* 3-column × 2-row grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {differences.map((d, i) => (
              <ScrollReveal
                key={d.title}
                delay={i * 0.08}
                className={[
                  'pt-10 pb-12 pr-8 pl-0',
                  (i % 3 !== 2) ? 'border-r border-border/40' : '',
                  i >= 3 ? 'border-t border-border/40' : '',
                  i % 3 !== 0 ? 'pl-8' : '',
                ].join(' ')}
              >
                <p className="font-serif-italic text-2xl text-gold">
                  {['i.','ii.','iii.','iv.','v.','vi.'][i]}
                </p>
                <h3 className="mt-8 font-mont text-[11px] font-bold uppercase tracking-[0.14em] text-cream">{d.title}</h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-silver">{d.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28" style={{ background: 'hsl(215 55% 11%)' }}>
        <div className="container-lux">
          <ScrollReveal className="max-w-2xl">
            <Eyebrow>Client Stories</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
              Trusted by Bihar’s Finest Families
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <TestimonialCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 120%, hsl(44 54% 54% / 0.14), transparent 60%)' }} />
        <div className="container-lux relative text-center">
          <ScrollReveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
              Ready to Own Bihar’s Most Prestigious Address?
            </h2>
            <p className="mt-5 font-body text-base text-silver">
              Book a private site visit or speak with a relationship manager today — your legacy begins here.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="gold" size="xl">
                <Link to="/contact">Book a Site Visit <ArrowRight strokeWidth={1.5} className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="emeraldOutline" size="xl">
                <a href="https://wa.me/919229266955?text=Hello%20Diarch%20Real%20Estate" target="_blank" rel="noopener noreferrer">
                  <Quote strokeWidth={1.5} className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
