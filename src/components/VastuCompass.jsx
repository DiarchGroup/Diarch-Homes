import React from 'react';
import { motion } from 'framer-motion';

// Decorative gold compass / mandala motif
export const VastuCompass = ({ className = '' }) => (
  <div className={`relative ${className}`} aria-hidden="true">
    <motion.svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(50 80% 70%)" />
          <stop offset="100%" stopColor="hsl(40 49% 44%)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#goldStroke)" strokeWidth="1">
        <g className="animate-spin-slow" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="200" r="180" strokeOpacity="0.35" />
          <circle cx="200" cy="200" r="150" strokeOpacity="0.5" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * Math.PI) / 8;
            return (
              <line
                key={i}
                x1={200 + 150 * Math.cos(a)}
                y1={200 + 150 * Math.sin(a)}
                x2={200 + 180 * Math.cos(a)}
                y2={200 + 180 * Math.sin(a)}
                strokeOpacity="0.6"
              />
            );
          })}
        </g>
        <circle cx="200" cy="200" r="118" strokeOpacity="0.6" />
        <circle cx="200" cy="200" r="86" strokeOpacity="0.45" />
        {/* 8-direction mandala diamond */}
        <g strokeWidth="1.5">
          <polygon points="200,40 250,200 200,360 150,200" strokeOpacity="0.7" />
          <polygon points="40,200 200,150 360,200 200,250" strokeOpacity="0.7" />
          <polygon points="90,90 210,170 310,310 170,230" strokeOpacity="0.4" />
          <polygon points="310,90 230,210 90,310 170,190" strokeOpacity="0.4" />
        </g>
        <circle cx="200" cy="200" r="30" fill="hsl(44 54% 54% / 0.12)" strokeOpacity="0.9" />
      </g>
      {/* Cardinal letters */}
      <g fill="hsl(44 54% 54%)" fontFamily="Montserrat, sans-serif" fontSize="15" fontWeight="600" textAnchor="middle">
        <text x="200" y="26">N</text>
        <text x="200" y="388">S</text>
        <text x="384" y="206">E</text>
        <text x="16" y="206">W</text>
      </g>
    </motion.svg>
  </div>
);
