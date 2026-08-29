import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrustBar } from '@/components/TrustBar';
import { copy } from '@/data/content';
import { IMAGES } from '@/lib/images';

const rise = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
};

export const HeroSection = () => {
  const t = copy.en.hero;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-gradient-hero">
      {/* faint architectural drafting grid */}
      <div className="mandala-grid absolute inset-0 z-0 opacity-70" aria-hidden="true" />

      <div className="container-lux relative z-10 grid flex-1 grid-cols-1 items-center gap-10 pt-28 pb-8 lg:grid-cols-12 lg:gap-10 lg:pt-24">
        {/* Copy */}
        <div className="min-w-0 lg:col-span-6">
          <motion.div className="flex items-center gap-3" {...rise} transition={{ duration: 0.7, delay: 0.15 }}>
            <span className="h-px w-10 bg-gold/50" />
            <span className="eyebrow tracking-[0.2em]! sm:tracking-[0.28em]!">{t.eyebrow}</span>
          </motion.div>

          <motion.h1
            {...rise}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[2.6rem] font-medium leading-[1.04] tracking-tight text-cream sm:text-6xl lg:text-[4.1rem]"
          >
            Where Bihar
            <span className="block italic text-gold">builds its legacy.</span>
          </motion.h1>

          <motion.p
            {...rise}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-7 max-w-md font-body text-[1.05rem] leading-relaxed text-silver"
          >
            {t.body}
          </motion.p>

          <motion.div
            {...rise}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
              <Link to="/contact">{t.cta1} <ArrowRight strokeWidth={1.5} className="h-4 w-4" /></Link>
            </Button>
            <Button variant="goldOutline" size="xl" className="w-full sm:w-auto">
              <Download strokeWidth={1.5} className="h-4 w-4" /> {t.cta2}
            </Button>
          </motion.div>
        </div>

        {/* Framed architectural plate — luxury, front and centre */}
        <motion.div
          className="relative min-w-0 lg:col-span-6"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto max-w-xl border border-gold/25 p-2.5 shadow-elev lg:max-w-md">
            <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[3/2] lg:aspect-auto lg:h-[54svh]">
              <img
                src={IMAGES.hero}
                alt="Diarch Imperial Greens, a 42-acre luxury township in Patna, Bihar"
                width={1600}
                height={1000}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
            {/* property plate */}
            <div className="flex items-center justify-between px-3 py-3">
              <span className="lapidary text-[11px] uppercase tracking-[0.22em] text-cream">
                Diarch Imperial Greens
              </span>
              <span className="lapidary text-[11px] uppercase tracking-[0.22em] text-gold">
                Patna · 42 acres
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust strip pinned to the foot of the fold */}
      <div className="container-lux relative z-10 pb-6 lg:pb-8">
        <TrustBar />
      </div>
    </section>
  );
};
