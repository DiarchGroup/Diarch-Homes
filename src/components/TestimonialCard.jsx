import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const TestimonialCard = ({ item, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="flex h-full flex-col rounded-xl border border-border bg-surface-2 p-8 transition-colors duration-500 hover:border-gold/40"
  >
    <Quote strokeWidth={1.5} className="h-8 w-8 text-gold/50" />
    <div className="mt-4 flex gap-1">
      {Array.from({ length: item.rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-gold text-gold" strokeWidth={1.5} />
      ))}
    </div>
    <p className="font-cormorant mt-5 text-xl italic leading-relaxed text-cream">
      “{item.quote}”
    </p>
    <div className="mt-auto pt-6">
      <p className="font-mont text-sm font-semibold uppercase tracking-wider text-gold">{item.name}</p>
      <p className="font-mont text-xs uppercase tracking-wider text-silver">{item.city}</p>
    </div>
  </motion.div>
);
