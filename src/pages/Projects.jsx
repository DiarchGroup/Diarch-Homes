import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { projects } from '@/data/projects';

const FILTERS = ['All', 'Under Construction', 'Plotted Townships'];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filtered = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Under Construction' || filter === 'Ready to Move') return p.status === filter;
    if (filter === 'Plotted Townships') return p.category === 'Plotted Township' || p.type.toLowerCase().includes('plot');
    return p.category === filter;
  });

  return (
    <div>
      {/* Compact hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden pt-24 isolate">
        <div className="absolute inset-0 z-0 bg-gradient-hero" />
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(circle at 80% 20%, hsl(44 54% 54% / 0.14), transparent 50%)' }} />
        <div className="container-lux relative z-10">
          <ScrollReveal className="max-w-3xl">
            <span className="eyebrow">Our Projects</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-6xl">
              Every Location. One Standard of Excellence.
            </h1>
            <p className="mt-5 max-w-xl font-body text-base text-silver">
              Explore our portfolio of Vastu-aligned townships, premium residences and garden villas across Bihar.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter bar + grid */}
      <section className="py-16 md:py-20">
        <div className="container-lux">
          <div className="flex flex-wrap gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-5 py-2.5 font-mont text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  filter === f
                    ? 'border-gold bg-gold text-primary-foreground'
                    : 'border-border bg-surface text-silver hover:border-gold/50 hover:text-gold'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-20 text-center font-cormorant text-2xl italic text-silver">
              No projects match this filter yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
