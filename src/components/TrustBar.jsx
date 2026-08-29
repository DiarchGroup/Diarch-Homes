import React from 'react';
import { motion } from 'framer-motion';
import { StatCounter } from '@/components/StatCounter';

const stats = [
  { value: 500, prefix: '₹', suffix: 'Cr+', label: 'Portfolio Value' },
  { value: 12, suffix: '', label: 'Signature Plans' },
  { value: 7, suffix: '', label: 'Project Listings' },
  { value: 3, suffix: '', label: 'Smart Townships' },
];

export const TrustBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
    className="w-full border-y border-gold/20"
  >
    <div className="grid grid-cols-2 md:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`px-5 py-6 md:px-7 md:py-7 ${i % 2 !== 0 ? 'border-l border-gold/15' : ''} ${i < 2 ? 'border-b border-gold/15 md:border-b-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
        >
          <div className="font-display text-3xl font-medium text-gold md:text-[2.1rem]">
            <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
          </div>
          <div className="mt-2 lapidary text-[10px] uppercase tracking-[0.14em] text-silver sm:text-[11px] sm:tracking-[0.2em]">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);
