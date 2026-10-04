import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, PhoneCall, X, Minus, ChevronUp, ZoomIn } from 'lucide-react';
import { IMAGES } from '@/lib/images';

export const MutationFloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  // Gentle delayed entrance so it doesn't feel jarring on instant page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('diarch_mutation_widget_dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
      setHasAppeared(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e) => {
    e?.stopPropagation?.();
    setIsDismissed(true);
    sessionStorage.setItem('diarch_mutation_widget_dismissed', 'true');
  };

  const handleMinimize = (e) => {
    e?.stopPropagation?.();
    setIsOpen(false);
  };

  const handleExpand = () => {
    setIsOpen(true);
  };

  if (!hasAppeared || isDismissed) return null;

  return (
    <>
      {/* Floating container */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-2.5rem)]">
        <AnimatePresence mode="wait">
          {isOpen ? (
            /* ── Expanded Elegant Card ── */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-[305px] overflow-hidden rounded-md border border-gold/35 bg-[#08101E]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gold/20 bg-surface/60 px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30">
                    <ShieldAlert className="h-3 w-3" />
                  </span>
                  <span className="font-mont text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                    Official Advisory
                  </span>
                </div>
                <div className="flex items-center gap-1 text-silver/60">
                  <button
                    onClick={handleMinimize}
                    aria-label="Minimise to pill"
                    title="Minimise"
                    className="flex h-6 w-6 items-center justify-center rounded hover:bg-gold/10 hover:text-gold transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={handleDismiss}
                    aria-label="Close permanently"
                    title="Close"
                    className="flex h-6 w-6 items-center justify-center rounded hover:bg-gold/10 hover:text-cream transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5">
                <div className="mb-2.5">
                  <p className="font-mont text-[11px] font-medium tracking-[0.04em] text-cream">
                    Land Mutation Notice
                  </p>
                  <p className="font-body text-[11px] leading-snug text-silver/80 mt-0.5">
                    For all plot title mutation (दाखिल-खारिज) inquiries, please reach out only to our authorized desk:
                  </p>
                </div>

                {/* Clickable Graphic Thumbnail */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="group relative cursor-zoom-in overflow-hidden rounded border border-gold/30 bg-background/50 shadow-inner"
                  title="Click to view full notice"
                >
                  <img
                    src={IMAGES.mutationNotice}
                    alt="Official Mutation Notice - Diarch Group - Amit Kumar 9031653902"
                    width={1254}
                    height={1254}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="inline-flex items-center gap-1 rounded bg-black/80 px-2.5 py-1 font-mont text-[10px] uppercase tracking-wider text-cream border border-gold/30">
                      <ZoomIn className="h-3 w-3 text-gold" /> Tap to Expand
                    </span>
                  </div>
                </div>

                {/* Contact strip & Direct dial CTA */}
                <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                  <div className="min-w-0">
                    <p className="font-display text-xs font-medium text-cream truncate">Amit Kumar</p>
                    <p className="font-mont text-[9px] uppercase tracking-[0.14em] text-silver/60 truncate">
                      Authorized Officer
                    </p>
                  </div>
                  <a
                    href="tel:+919031653902"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded border border-gold/50 bg-gold/10 px-3 py-1.5 font-mont text-[10px] font-semibold uppercase tracking-[0.14em] text-gold hover:bg-gold hover:text-[#060E1C] transition-all duration-200"
                  >
                    <PhoneCall className="h-3 w-3" />
                    Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Collapsed Unobtrusive Pill Badge (on Minimise) ── */
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-[#08101E]/95 pl-3.5 pr-2 py-1.5 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.85)] backdrop-blur-md"
            >
              <button
                onClick={handleExpand}
                className="flex items-center gap-2 text-left hover:opacity-90 transition-opacity"
                aria-label="Expand Land Mutation Advisory"
                title="Click to view Mutation Notice"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30">
                  <ShieldAlert className="h-3 w-3" />
                </span>
                <span className="font-mont text-[11px] font-medium tracking-[0.06em] text-cream">
                  Mutation Desk <span className="text-gold">· Amit Kumar</span>
                </span>
                <ChevronUp className="h-3.5 w-3.5 text-gold/80 ml-0.5" />
              </button>

              <span className="h-3.5 w-px bg-gold/25 mx-0.5" />

              <button
                onClick={handleDismiss}
                aria-label="Close widget completely"
                title="Close"
                className="flex h-5 w-5 items-center justify-center rounded-full text-silver/60 hover:bg-gold/15 hover:text-cream transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── High-Resolution Lightbox Modal ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[92vh] max-w-lg overflow-hidden rounded-lg border border-gold/40 bg-surface shadow-2xl p-3 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-cream border border-gold/30 hover:bg-gold hover:text-black transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative overflow-hidden rounded border border-gold/20">
                <img
                  src={IMAGES.mutationNotice}
                  alt="Diarch Group Official Mutation Notice - Full View"
                  width={1254}
                  height={1254}
                  className="max-h-[70vh] w-auto mx-auto object-contain"
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
                <div>
                  <p className="font-display text-base text-cream">Amit Kumar · Authorized Desk</p>
                  <p className="font-body text-xs text-silver">Diarch Group Official Title Mutation Notice</p>
                </div>
                <a
                  href="tel:+919031653902"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded border border-gold bg-gold px-5 py-2 font-mont text-xs font-semibold uppercase tracking-[0.14em] text-[#060E1C] hover:bg-gold-hover transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  Call 9031653902
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
