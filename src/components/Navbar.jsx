import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copy } from '@/data/content';

const Diamond = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" className="text-gold" aria-hidden="true">
    <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="currentColor" />
  </svg>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = copy.en.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t.home, to: '/' },
    { label: t.projects, to: '/projects' },
    { label: t.about, to: '/about' },
    { label: t.contact, to: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-lux flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Diamond />
          <span className="font-display text-lg md:text-xl font-bold tracking-wide text-cream">
            DIARCH <span className="text-gold">REAL ESTATE</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-mont text-[13px] uppercase tracking-[0.1em] text-silver hover:text-gold transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="gold" size="default">
            <Link to="/contact">{t.book}</Link>
          </Button>
        </div>

        <button
          className="lg:hidden flex h-12 w-12 items-center justify-center text-gold"
          onClick={() => setOpen((p) => !p)}
          aria-label="Menu"
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden glass-nav mt-3"
          >
            <div className="container-lux flex flex-col gap-1 py-5">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-mont text-sm uppercase tracking-wider text-cream hover:text-gold py-3 border-b border-border/60"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-4">
                <Button asChild variant="gold" className="flex-1 h-12">
                  <Link to="/contact">{t.book}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
