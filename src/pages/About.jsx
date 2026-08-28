import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/ScrollReveal';
import { IMAGES } from '@/lib/images';

const timeline = [
  { year: '2014', title: 'The Foundation', desc: 'Diarch Group is founded in Bihar with a vision for ethical, quality construction.' },
  { year: '2016', title: 'First Township', desc: 'Launch of our first gated residential community, setting new regional standards.' },
  { year: '2018', title: 'Vastu Certification', desc: 'Introduced expert-certified Vastu design across the entire portfolio.' },
  { year: '2021', title: 'Smart Townships', desc: 'Pioneered integrated smart-city infrastructure in Bihar.' },
  { year: '2024', title: '₹500Cr+ Portfolio', desc: 'Crossed ₹500 crore in portfolio value across 12 signature projects.' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center overflow-hidden pt-24 isolate">
        <div className="absolute inset-0 z-0 bg-gradient-hero" />
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(circle at 75% 25%, hsl(44 54% 54% / 0.14), transparent 50%)' }} />
        <div className="container-lux relative z-10">
          <ScrollReveal className="max-w-3xl">
            <span className="eyebrow">About Diarch</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-6xl">
              A Legacy Built on Land, Trust & the Cosmos.
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 md:py-24">
        <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <ScrollReveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-gold/20">
              <img
                src={IMAGES.founder}
                alt="Ranjan Kumar Ojha, Founder and Chairman of Diarch Group, Patna"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="font-display text-xl font-bold text-cream">Ranjan Kumar Ojha</p>
                <p className="font-mont text-xs uppercase tracking-wider text-gold">Founder & Chairman, Diarch Group</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:col-span-7">
            <span className="eyebrow">Founder&rsquo;s Note</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">Building Bihar&rsquo;s Future</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-silver">
              From humble beginnings in Bihar, Ranjan Kumar Ojha built Diarch Group into one of the state&rsquo;s most respected conglomerates, spanning eleven business verticals. Diarch Real Estate is the embodiment of his lifelong belief: that a home is not merely a structure, but a vessel for prosperity, harmony and generational legacy.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-silver">
              Under his stewardship, every Diarch project marries modern luxury with ancient Vastu wisdom — delivering homes that are as aspirational as they are auspicious, and always registered, transparent, and built to last.
            </p>
            <p className="mt-6 font-cormorant text-2xl italic text-gold">
              “We build legacies aligned with the cosmos and the land of Bihar.”
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(215 55% 11%)' }}>
        <div className="container-lux">
          <ScrollReveal className="max-w-2xl">
            <span className="eyebrow">Our Journey</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">A Decade of Trust</h2>
          </ScrollReveal>

          <div className="relative mt-12 pl-8">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />
            <StaggerGroup className="space-y-10">
              {timeline.map((t) => (
                <StaggerItem key={t.year} className="relative">
                  <span className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gold bg-background">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  <p className="font-display text-2xl font-bold text-gold">{t.year}</p>
                  <h3 className="subhead mt-1 text-base">{t.title}</h3>
                  <p className="mt-2 max-w-xl font-body text-sm text-silver">{t.desc}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 md:py-24">
        <div className="container-lux">
          {/* Asymmetric header row */}
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-end gap-8">
              <div className="lg:col-span-3">
                <p className="font-mont text-[10px] uppercase tracking-[0.22em] text-silver">
                  01 / Mission &amp; Vision
                </p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl leading-tight">
                  The standard we hold<br className="hidden sm:block" /> every home to.
                </h2>
              </div>
            </div>
          </ScrollReveal>

          {/* Full-width hairline */}
          <div className="hairline mt-10 mb-0" />

          {/* Four-column principles grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: 'i.',
                title: 'Our Mission',
                text: 'To craft Vastu-aligned, RERA-transparent homes that elevate the standard of luxury living in Bihar — delivered on time, every time.',
              },
              {
                num: 'ii.',
                title: 'Our Vision',
                text: 'To be the most trusted name in Indian real estate, where every address is a symbol of prosperity, harmony, and enduring legacy.',
              },
              {
                num: 'iii.',
                title: 'Integrity Always',
                text: 'Every project is registered, transparent, and built with materials that meet our uncompromising quality standards. No shortcuts, ever.',
              },
              {
                num: 'iv.',
                title: 'Bihar First',
                text: 'We design for the people of Bihar — their aspirations, their culture, their future. Our roots are our competitive advantage.',
              },
            ].map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 0.1} className="pt-10 pb-12 pr-8 border-r border-border/40 last:border-r-0 pl-0 sm:[&:nth-child(odd)]:pl-0 sm:[&:nth-child(even)]:pl-8 lg:pl-8 lg:first:pl-0">
                <p className="font-serif-italic text-2xl text-gold">{p.num}</p>
                <h3 className="mt-8 font-mont text-[11px] font-bold uppercase tracking-[0.14em] text-cream">{p.title}</h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-silver">{p.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Group overview */}
      <section className="py-16 md:py-24">
        <div className="container-lux">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-emerald p-10 text-center md:p-16">
              <Building2 strokeWidth={1.5} className="mx-auto h-10 w-10 text-gold" />
              <h2 className="mt-5 font-display text-3xl font-bold text-cream sm:text-4xl">Part of the Diarch Group</h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-base text-silver">
                Diarch Real Estate is one of <span className="text-gold">11 business verticals</span> within the Diarch Group — a major Indian conglomerate headquartered in Bihar, spanning infrastructure, hospitality, energy, agriculture and more.
              </p>
              <Button asChild variant="gold" size="xl" className="mt-8">
                <Link to="/projects">Explore Our Projects <ArrowRight strokeWidth={1.5} className="h-4 w-4" /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
