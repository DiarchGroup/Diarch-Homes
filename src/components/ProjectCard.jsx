import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export const ProjectCard = ({ project, index = 0 }) => {
  const fallback = 'linear-gradient(150deg, hsl(215 54% 14%), hsl(156 50% 16%))';
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col border border-border bg-gradient-card transition-colors duration-500 hover:border-gold/55"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden" style={{ background: fallback }}>
        {project.image && (
          <img
            src={project.image}
            alt={`${project.name}, ${project.type.toLowerCase()} in ${project.location}`}
            width={640}
            height={448}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
        <div className="absolute inset-x-4 top-4 flex items-start gap-2">
          <span
            title={project.reraRegistered ? 'RERA' : 'Registration to be confirmed'}
            className="flex min-w-0 flex-1 items-center gap-1 truncate border border-emerald/60 bg-emerald/85 px-2.5 py-1 lapidary text-[10px] uppercase tracking-[0.18em] text-foreground backdrop-blur-sm"
          >
            <ShieldCheck strokeWidth={1.5} className="h-3 w-3 shrink-0" />
            <span className="truncate">{project.reraRegistered ? 'RERA' : 'REGISTRATION TO BE CONFIRMED'}</span>
          </span>
          <span
            title={project.status}
            className="max-w-[44%] shrink-0 truncate border border-gold/25 bg-background/70 px-2.5 py-1 lapidary text-[10px] uppercase tracking-[0.18em] text-silver backdrop-blur-sm"
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="disha text-[10px] uppercase tracking-[0.22em]">{project.type}</span>
          <span className="counter text-[11px] text-gold/55">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-medium text-cream">{project.name}</h3>
        <p className="mt-2 flex items-center gap-1.5 lapidary text-[11px] uppercase tracking-[0.16em] text-silver">
          <MapPin strokeWidth={1.5} className="h-3.5 w-3.5" /> {project.location}
        </p>
        <p className="mt-4 font-body text-sm leading-relaxed text-silver/90">{project.tagline}</p>

        <div className="mt-5 border-t border-border/60 pt-4">
          <span className="font-display text-lg font-medium text-gold">{project.priceRange}</span>
        </div>

        <Link
          to={`/projects/${project.slug}`}
          aria-label={`Explore plan for ${project.name}`}
          className="group/link mt-5 inline-flex items-center gap-2 lapidary text-[11px] uppercase tracking-[0.2em] text-gold"
        >
          Explore Plan
          <ArrowRight strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};
