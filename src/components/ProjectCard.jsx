import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export const ProjectCard = ({ project, index = 0 }) => {
  const fallback = 'linear-gradient(150deg, hsl(215 55% 13%), hsl(155 50% 18%))';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-gradient-card shadow-card transition-colors duration-500 hover:border-gold/60"
    >
      {/* Image area */}
      <div className="relative h-56 overflow-hidden" style={{ background: fallback }}>
        {project.image && (
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-emerald/90 px-3 py-1 font-mont text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm flex items-center gap-1">
          <ShieldCheck strokeWidth={1.5} className="h-3 w-3" /> RERA
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-background/70 px-3 py-1 font-mont text-[10px] font-semibold uppercase tracking-wider text-silver backdrop-blur-sm">
          {project.status}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="font-mont text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">{project.type}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-cream">{project.name}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 font-mont text-xs uppercase tracking-wider text-silver">
          <MapPin strokeWidth={1.5} className="h-3.5 w-3.5" /> {project.location}
        </p>
        <p className="mt-4 font-body text-sm leading-relaxed text-silver/90">{project.tagline}</p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-gold">{project.priceRange}</span>
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="mt-auto pt-6 inline-flex items-center gap-2 font-mont text-xs font-semibold uppercase tracking-[0.1em] text-gold group/link"
        >
          Explore Project
          <ArrowRight strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};
