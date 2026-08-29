import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/data/seo';
import { HeroSection } from '@/components/HeroSection';
import { ProjectCard } from '@/components/ProjectCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { VastuMandala } from '@/components/VastuMandala';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/ScrollReveal';
import { projects } from '@/data/projects';
import { testimonials } from '@/data/testimonials';

const Eyebrow = ({ children }) => <span className="eyebrow">{children}</span>;

// Each promise sits in a true Vastu direction — the label carries the orientation,
// not decoration.
const vastuFeatures = [
  { sa: 'उत्तर', dir: 'N', title: 'North-Facing Entrances', desc: 'Thresholds opened to the north, where Vastu draws prosperity and light in.' },
  { sa: 'ईशान', dir: 'NE', title: 'Water in the Ishan Zone', desc: 'The sacred north-east reserved for water — the source of clarity and wealth.' },
  { sa: 'नैऋत्य', dir: 'SW', title: 'Mass in the South-West', desc: 'Weight and the master suite grounded in the south-west, for stability and rest.' },
  { sa: 'ब्रह्मस्थान', dir: 'Centre', title: 'An Open, Certified Core', desc: 'The Brahmasthan kept open and every plan certified by a Vastu specialist.' },
];

const standards = [
  { title: 'RERA Registered', desc: 'Every project fully registered, with complete legal transparency from booking to possession.' },
  { title: 'Smart Township Infrastructure', desc: 'Fibre connectivity, app-controlled security, and metered smart utilities throughout.' },
  { title: 'Vastu-Certified Design', desc: 'Layouts reviewed against the mandala and signed off by practising Vastu experts.' },
  { title: 'Premium Amenities', desc: 'Clubhouses, pools, landscaped parks, and curated community living as standard.' },
  { title: 'On-Time Delivery', desc: 'A record of possession handed over on the date promised, project after project.' },
  { title: 'Post-Possession Support', desc: 'A dedicated relationship team that stays with you long after you move in.' },
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
            <Eyebrow>The Portfolio</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-cream sm:text-4xl lg:text-5xl">
              Addresses built to outlast their owners.
            </h2>
            <p className="mt-5 max-w-xl font-body text-base text-silver">
              A curated set of townships, residences, and villas — each one a Vastu-aligned
              plan engineered for generational living across Bihar.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="goldOutline" size="xl">
              <Link to="/projects">View Every Plan <ArrowRight strokeWidth={1.5} className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* THE VASTU PROMISE — the sandstone band: the plan drawn on Mauryan parchment */}
      <section id="vastu" className="section-sand py-24 md:py-32">
        <div className="container-lux">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            {/* The mandala, rendered as an architect's drawing on paper */}
            <ScrollReveal className="min-w-0 lg:col-span-5">
              <div className="relative border border-sandstone-ink/15 bg-sandstone-2/60 p-8 sm:p-10">
                <VastuMandala variant="plan" className="mx-auto aspect-square w-full max-w-md" />
                <span className="lapidary absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.24em] text-sandstone-ink/45">
                  Paramasayika · 81 padas
                </span>
              </div>
            </ScrollReveal>

            <div className="min-w-0 lg:col-span-7 lg:pl-6">
              <ScrollReveal>
                <Eyebrow>One of our assurances · Vastu</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-cream sm:text-4xl lg:text-[2.9rem]">
                  Vastu-certified,<br className="hidden sm:block" /> down to the doorway.
                </h2>
                <p className="mt-5 max-w-lg font-body text-base leading-relaxed sand-muted">
                  Alongside RERA registration and on-time delivery, every Diarch layout is
                  reviewed against the nine-square mandala and signed off by a Vastu specialist —
                  so orientation is one less thing for your family to worry about.
                </p>
              </ScrollReveal>

              <StaggerGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                {vastuFeatures.map((f) => (
                  <StaggerItem key={f.title} className="border-t border-sandstone-ink/20 pt-4">
                    <div className="flex items-baseline gap-3">
                      <span className="disha text-base" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>{f.sa}</span>
                      <span className="lapidary text-[10px] uppercase tracking-[0.24em] text-sandstone-ink/50">{f.dir}</span>
                    </div>
                    <h3 className="mt-3 lapidary text-base uppercase tracking-[0.06em] text-cream">{f.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed sand-muted">{f.desc}</p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER'S VISION */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="mandala-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-lux relative">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="lapidary text-[11px] uppercase tracking-[0.3em] text-gold">The Founder's Vision</span>
            <p className="mt-8 font-display text-2xl font-medium italic leading-snug text-cream sm:text-3xl lg:text-[2.4rem] lg:leading-[1.25]">
              “We don't build homes. We build legacies — rooted in the land of Bihar,
              and made to outlast the families who raise them.”
            </p>
            <div className="mx-auto mt-9 h-px w-14 bg-gold/50" />
            <p className="mt-6 font-display text-lg italic text-silver">Ranjan Kumar Ojha</p>
            <p className="lapidary mt-2 text-[11px] uppercase tracking-[0.26em] text-gold">
              Founder · Diarch Group
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* THE DIARCH STANDARD */}
      <section className="py-20 md:py-28">
        <div className="container-lux">
          <ScrollReveal>
            <div className="max-w-2xl">
              <Eyebrow>The Diarch Standard</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-cream sm:text-5xl">
                Built to a standard,<br className="hidden sm:block" /> never to a budget.
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-px grid grid-cols-1 gap-px border-t border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {standards.map((d, i) => (
              <ScrollReveal
                key={d.title}
                delay={i * 0.07}
                className="bg-background px-2 py-10 sm:px-7"
              >
                <span className="counter text-sm text-gold/70">{String(i + 1).padStart(2, '0')}</span>
                <span className="mt-4 block h-px w-10 bg-gold/40" />
                <h3 className="mt-5 lapidary text-base uppercase tracking-[0.08em] text-cream">{d.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-silver">{d.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-lux">
          <ScrollReveal className="max-w-2xl">
            <Eyebrow>Client Stories</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-cream sm:text-4xl">
              Trusted by Bihar's most discerning families.
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
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 50% 130%, hsl(44 54% 54% / 0.12), transparent 60%)' }}
        />
        <div className="container-lux relative text-center">
          <ScrollReveal className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-tight text-cream sm:text-4xl lg:text-5xl">
              Begin your legacy.
            </h2>
            <p className="mt-5 font-body text-base text-silver">
              Book a private site visit or speak with a relationship manager — bring your
              questions about pricing, plans, and possession.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="gold" size="xl">
                <Link to="/contact">Book a Site Visit <ArrowRight strokeWidth={1.5} className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="emeraldOutline" size="xl">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle strokeWidth={1.5} className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
