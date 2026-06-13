import React from 'react';
import { motion } from 'framer-motion';
import { StatCounter } from '@/components/StatCounter';

const stats = [
  { value: 500, prefix: '₹', suffix: 'Cr+', label: 'Portfolio Value' },
  { value: 12, suffix: '', label: 'Signature Projects' },
  { value: 100, suffix: '%', label: 'RERA Registered' },
  { value: 3, suffix: '', label: 'Smart Townships' },
];

export const TrustBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
    className="w-full"
  >
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-xl border border-gold/20 bg-gold/10 backdrop-blur-md">
      {stats.map((s, i) => (
        <div key={i} className="bg-surface/70 px-4 py-5 text-center md:px-6 md:py-6">
          <div className="font-display text-2xl md:text-3xl font-bold text-gold">
            <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
          </div>
          <div className="mt-1 font-mont text-[11px] md:text-xs uppercase tracking-[0.14em] text-silver">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);
