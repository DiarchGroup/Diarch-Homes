import React from 'react';
import { motion } from 'framer-motion';

/**
 * The Vastu Purusha Mandala — the 9×9 cosmic grid every Diarch plan is laid on.
 * The signature element of the site. Renders as fine brass hairlines on ink
 * (variant="ink") or as a dark architect's plan on sandstone (variant="plan").
 *
 * The central 3×3 is the Brahmasthan (the sacred open core); the four corners
 * carry their true Vastu directional names. The labels encode real orientation
 * — north-east water, south-west mass — not decoration.
 */
const N = 9;
const SIZE = 480;
const STEP = SIZE / N;
const C = SIZE / 2;

// inner gridlines (skip the outer frame, drawn separately)
const innerLines = Array.from({ length: N - 1 }, (_, i) => (i + 1) * STEP);

// corner zones — Sanskrit name + the direction it governs
const corners = [
  { x: STEP * 0.5, y: STEP * 0.7, sa: 'वायव्य', dir: 'NW', anchor: 'start' },
  { x: SIZE - STEP * 0.5, y: STEP * 0.7, sa: 'ईशान', dir: 'NE', anchor: 'end' },
  { x: STEP * 0.5, y: SIZE - STEP * 0.35, sa: 'नैऋत्य', dir: 'SW', anchor: 'start' },
  { x: SIZE - STEP * 0.5, y: SIZE - STEP * 0.35, sa: 'आग्नेय', dir: 'SE', anchor: 'end' },
];

export const VastuMandala = ({ className = '', variant = 'ink', animate = true }) => {
  const isPlan = variant === 'plan';
  const lineColor = 'currentColor';
  const reveal = animate
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {};

  return (
    <div
      className={`relative ${className}`}
      style={{ color: isPlan ? 'hsl(var(--sandstone-ink))' : 'hsl(var(--gold))' }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-full w-full"
        {...reveal}
        transition={{ duration: 1 }}
      >
        {/* breathing glow at the Brahmasthan */}
        <rect
          className="animate-brahma"
          x={STEP * 3}
          y={STEP * 3}
          width={STEP * 3}
          height={STEP * 3}
          fill={isPlan ? 'hsl(var(--brass-deep) / 0.14)' : 'hsl(var(--gold) / 0.16)'}
          style={{ transformOrigin: `${C}px ${C}px` }}
        />

        {/* the 9×9 grid */}
        <g stroke={lineColor} fill="none">
          {innerLines.map((p) => (
            <line key={`v${p}`} x1={p} y1="0" x2={p} y2={SIZE} strokeWidth="0.75" strokeOpacity={isPlan ? 0.28 : 0.22} />
          ))}
          {innerLines.map((p) => (
            <line key={`h${p}`} x1="0" y1={p} x2={SIZE} y2={p} strokeWidth="0.75" strokeOpacity={isPlan ? 0.28 : 0.22} />
          ))}
          {/* outer frame */}
          <rect x="0.5" y="0.5" width={SIZE - 1} height={SIZE - 1} strokeWidth="1.5" strokeOpacity={isPlan ? 0.7 : 0.55} />
          {/* Brahmasthan frame (central 3×3) */}
          <rect x={STEP * 3} y={STEP * 3} width={STEP * 3} height={STEP * 3} strokeWidth="1.5" strokeOpacity={isPlan ? 0.85 : 0.9} />
          {/* inscribed orientation circle */}
          <circle cx={C} cy={C} r={C - STEP} strokeWidth="1" strokeOpacity={isPlan ? 0.5 : 0.4} />
          {/* the eight-direction rose */}
          <g strokeWidth="1" strokeOpacity={isPlan ? 0.4 : 0.32}>
            <line x1="0" y1="0" x2={SIZE} y2={SIZE} />
            <line x1={SIZE} y1="0" x2="0" y2={SIZE} />
            <line x1={C} y1="0" x2={C} y2={SIZE} />
            <line x1="0" y1={C} x2={SIZE} y2={C} />
          </g>
          {/* the central bindu */}
          <circle cx={C} cy={C} r="4" fill={lineColor} stroke="none" fillOpacity="0.9" className="animate-brahma" style={{ transformOrigin: `${C}px ${C}px` }} />
        </g>

        {/* cardinal markers — Marcellus lapidary caps */}
        <g fill={lineColor} fontFamily="'Playfair Display', serif" textAnchor="middle">
          <text x={C} y={STEP * 0.62} fontSize="17" letterSpacing="2">N</text>
          <text x={C} y={SIZE - STEP * 0.32} fontSize="17" letterSpacing="2">S</text>
          <text x={SIZE - STEP * 0.42} y={C + 6} fontSize="17" letterSpacing="2">E</text>
          <text x={STEP * 0.42} y={C + 6} fontSize="17" letterSpacing="2">W</text>
        </g>

        {/* corner Vastu zones */}
        <g fontFamily="'Playfair Display', serif">
          {corners.map((c) => (
            <g key={c.dir} fill={lineColor}>
              <text x={c.x} y={c.y} fontSize="13" textAnchor={c.anchor} style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                {c.sa}
              </text>
              <text x={c.x} y={c.y + 15} fontSize="9.5" letterSpacing="2.5" textAnchor={c.anchor} fillOpacity="0.7">
                {c.dir}
              </text>
            </g>
          ))}
        </g>
      </motion.svg>
    </div>
  );
};
