import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { SITE } from '@/data/seo';

export const Footer = () => (
  <footer className="bg-nav border-t border-gold/15">
    <div className="container-lux py-16 lg:py-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-16 items-start">
        {/* Brand column */}
        <div className="md:col-span-5 lg:col-span-5">
          <Link to="/" className="inline-block">
            <img
              src="/Diarch%20Homes%20Logo.png"
              alt="Diarch Homes"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-silver">
            The luxury real estate division of Diarch Group, creating Vastu-aligned plotted townships and residential legacies across Bihar.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-surface px-4 py-2 font-mont text-xs uppercase tracking-wider text-gold hover:border-gold hover:bg-gold/10 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-emerald" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Navigation & Projects */}
        <div className="md:col-span-3 lg:col-span-3">
          <h3 className="subhead text-xs uppercase tracking-[0.2em] mb-5 text-gold">Navigation</h3>
          <ul className="space-y-3 font-body text-sm text-silver">
            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">About Diarch</Link></li>
            <li><Link to="/projects/vaidic-village" className="hover:text-gold transition-colors">Vaidic Village</Link></li>
            <li><Link to="/#vastu" className="hover:text-gold transition-colors">Vastu Promise</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact & Enquiries</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="md:col-span-4 lg:col-span-4">
          <h3 className="subhead text-xs uppercase tracking-[0.2em] mb-5 text-gold">Corporate Office</h3>
          <ul className="space-y-4 font-body text-sm text-silver">
            <li className="flex gap-3 items-start">
              <MapPin strokeWidth={1.5} className="h-5 w-5 shrink-0 text-gold mt-0.5" />
              <span>{SITE.addressLines.join(', ')}</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone strokeWidth={1.5} className="h-4 w-4 shrink-0 text-gold" />
              <a href={SITE.phoneHref} className="hover:text-gold transition-colors">{SITE.phoneDisplay}</a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail strokeWidth={1.5} className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">{SITE.email}</a>
            </li>
          </ul>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-mont text-xs uppercase tracking-[0.16em] text-gold hover:text-gold-hover transition-colors"
            >
              Book a Site Visit <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="hairline my-10" />

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left">
        <p className="font-body text-xs text-silver/80">
          © {new Date().getFullYear()} Diarch Real Estate · A Diarch Group Company. All rights reserved.
        </p>
        <p className="font-body text-xs text-silver/80">
          Vaidic Village — Naubatpur, Patna · Registration details disclosed before booking.
        </p>
      </div>
    </div>
  </footer>
);
