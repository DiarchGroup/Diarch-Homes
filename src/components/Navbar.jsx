import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copy } from '@/data/content';

// 9-square mandala mark — the brand glyph
const MandalaMark = ({ className = '' }) => (
  <svg width="26" height="26" viewBox="0 0 30 30" className={`text-gold ${className}`} fill="none" stroke="currentColor" aria-hidden="true">
    <rect x="1" y="1" width="28" height="28" strokeWidth="1.4" />
    <line x1="11" y1="1" x2="11" y2="29" strokeWidth="0.8" strokeOpacity="0.6" />
    <line x1="20" y1="1" x2="20" y2="29" strokeWidth="0.8" strokeOpacity="0.6" />
    <line x1="1" y1="11" x2="29" y2="11" strokeWidth="0.8" strokeOpacity="0.6" />
    <line x1="1" y1="20" x2="29" y2="20" strokeWidth="0.8" strokeOpacity="0.6" />
    <rect x="11" y="11" width="9" height="9" fill="currentColor" fillOpacity="0.85" stroke="none" />
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
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/Diarch%20Homes%20Logo.png"
            alt="Diarch Homes"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="lapidary text-[13px] uppercase tracking-[0.2em] text-silver hover:text-gold transition-colors duration-300"
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
