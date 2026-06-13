import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoldParticles } from '@/components/GoldParticles';
import { TrustBar } from '@/components/TrustBar';
import { copy } from '@/data/content';
import { IMAGES } from '@/lib/images';

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const t = copy.en.hero;

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden isolate">
      {/* Parallax background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <img src={IMAGES.hero} alt="" className="h-[120%] w-full object-cover" />
      </motion.div>
      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/45 via-background/65 to-background" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(circle at 75% 20%, hsl(44 54% 54% / 0.18), transparent 45%)' }} />
      <div className="absolute inset-0 z-0 animate-shimmer" style={{ background: 'radial-gradient(ellipse at 30% 80%, hsl(50 70% 60% / 0.12), transparent 50%)' }} />
      <GoldParticles count={26} />

      <motion.div style={{ y: contentY, opacity: fade }} className="container-lux relative z-10 pt-28 pb-16">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="eyebrow"
          >
            {t.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-4xl font-bold leading-[1.1] text-cream sm:text-5xl lg:text-6xl"
          >
            {t.h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 font-cormorant text-2xl italic text-gold sm:text-3xl"
          >
            {t.h2}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="mt-6 max-w-xl font-body text-base leading-relaxed text-silver"
          >
            {t.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
                <Link to="/contact">{t.cta1} <ArrowRight strokeWidth={1.5} className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="goldOutline" size="xl" className="w-full sm:w-auto">
                <Download strokeWidth={1.5} className="h-4 w-4" /> {t.cta2}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-16 max-w-3xl">
          <TrustBar />
        </div>
      </motion.div>
    </section>
  );
};
