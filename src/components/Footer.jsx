import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
import { projects } from '@/data/projects';

const Diamond = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" className="text-gold" aria-hidden="true">
    <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="currentColor" />
  </svg>
);

export const Footer = () => (
  <footer className="bg-nav border-t border-gold/15">
    <div className="container-lux py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Diamond />
            <span className="font-display text-lg font-bold text-cream">
              DIARCH <span className="text-gold">REAL ESTATE</span>
            </span>
          </div>
          <p className="mt-4 font-body text-sm leading-relaxed text-silver">
            The luxury real estate division of Diarch Group — building Vastu-aligned legacies across Bihar.
          </p>
          <div className="mt-5 flex gap-3">
            {[InstagramIcon, FacebookIcon, LinkedinIcon].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold hover:bg-gold/10 transition-colors">
                <Icon strokeWidth={1.5} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="subhead text-sm mb-5 text-gold">Quick Links</h4>
          <ul className="space-y-3 font-body text-sm text-silver">
            {[['Home', '/'], ['About', '/about'], ['Vastu Promise', '/#vastu'], ['Contact', '/contact']].map(([l, to]) => (
              <li key={l}><Link to={to} className="hover:text-gold transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="subhead text-sm mb-5 text-gold">Projects</h4>
          <ul className="space-y-3 font-body text-sm text-silver">
            {projects.slice(0, 5).map((p) => (
              <li key={p.slug}><Link to={`/projects/${p.slug}`} className="hover:text-gold transition-colors">{p.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="subhead text-sm mb-5 text-gold">Contact</h4>
          <ul className="space-y-4 font-body text-sm text-silver">
            <li className="flex gap-3"><MapPin strokeWidth={1.5} className="h-5 w-5 shrink-0 text-gold" /> Diarch Tower, Bailey Road, Patna, Bihar 800001</li>
            <li className="flex gap-3"><Phone strokeWidth={1.5} className="h-5 w-5 shrink-0 text-gold" /> +91 92292 66955</li>
            <li className="flex gap-3"><Mail strokeWidth={1.5} className="h-5 w-5 shrink-0 text-gold" /> info@diarchgroup.com</li>
          </ul>
        </div>
      </div>

      <div className="hairline my-10" />

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-body text-xs text-silver">
          © {new Date().getFullYear()} Diarch Real Estate · A Diarch Group Company. All rights reserved.
        </p>
        <p className="font-body text-xs text-silver">
          RERA Registration: <span className="text-gold">BRERA-XXXX-XXXXX</span>
        </p>
      </div>
    </div>
  </footer>
);
