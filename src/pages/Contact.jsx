import React, { useState } from 'react';
import { toast } from 'sonner';
import { Check, PhoneCall, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SITE } from '@/data/seo';
import { IMAGES } from '@/lib/images';

const UnderlineInput = ({ value, onChange, placeholder, type = 'text', className = '' }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full bg-transparent border-b border-border/60 pb-3 pt-1 font-body text-base text-cream placeholder:text-silver/40 focus:border-gold/60 focus:outline-none transition-colors duration-200 ${className}`}
  />
);

const UnderlineTextarea = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={3}
    className="w-full bg-transparent border-b border-border/60 pb-3 pt-1 font-body text-base text-cream placeholder:text-silver/40 focus:border-gold/60 focus:outline-none transition-colors duration-200 resize-none"
  />
);

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', project: 'vaidic-village', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.firstName.trim()) {
      toast.error('Please enter your first name.');
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitted(true);
      toast.success('Enquiry received! Our team will contact you shortly.');
      setForm({ firstName: '', lastName: '', email: '', phone: '', company: '', project: 'vaidic-village', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Something went wrong. Please reach out via WhatsApp or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      <section className="py-16 md:py-24">
        <div className="container-lux">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">

            {/* ── Left: form ── */}
            <ScrollReveal className="lg:col-span-7 lg:pr-20">
              <p className="font-mont text-[11px] uppercase tracking-[0.2em] text-silver">
                Send Us a Note
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl">
                Contact Diarch Homes in Patna, Bihar
              </h1>
              <p className="mt-4 max-w-lg font-body text-base text-silver">
                Book a site visit, request project plans, or speak with our relationship managers about
                Vaidic Village in Naubatpur, Patna.
              </p>

              <div className="mt-14 space-y-10">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">First Name *</p>
                    <UnderlineInput value={form.firstName} onChange={set('firstName')} placeholder="" />
                  </div>
                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Last Name</p>
                    <UnderlineInput value={form.lastName} onChange={set('lastName')} placeholder="" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Email *</p>
                    <UnderlineInput value={form.email} onChange={set('email')} type="email" placeholder="" />
                  </div>
                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Phone Number</p>
                    <UnderlineInput value={form.phone} onChange={set('phone')} type="tel" placeholder="+91" />
                  </div>
                </div>

                <div>
                  <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Company / Organisation</p>
                  <UnderlineInput value={form.company} onChange={set('company')} placeholder="" />
                </div>

                <div>
                  <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Inquiry Type</p>
                  <Select value={form.project} onValueChange={(v) => setForm((f) => ({ ...f, project: v }))}>
                    <SelectTrigger className="w-full bg-transparent border-0 border-b border-border/60 rounded-none px-0 pb-3 pt-1 font-body text-base text-cream focus:ring-0 focus:border-gold/60 h-auto shadow-none">
                      <SelectValue placeholder="Select project" className="text-silver/40" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vaidic-village">Vaidic Village (Naubatpur, Patna)</SelectItem>
                      <SelectItem value="mutation">Mutation / Title Transfer Desk</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">How Can We Help?</p>
                  <UnderlineTextarea value={form.message} onChange={set('message')} placeholder="e.g. Interested in 3BHK/4BHK plot site visit on Sunday..." />
                </div>
              </div>

              <div className="mt-12">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  variant="gold"
                  size="xl"
                  className="px-12"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : submitted ? (
                    <><Check strokeWidth={1.5} className="h-4 w-4" /> Message Sent</>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </div>
            </ScrollReveal>

            {/* ── Right: info panel ── */}
            <ScrollReveal delay={0.2} className="lg:col-span-5 mt-16 lg:mt-0">
              <div
                className="h-full min-h-120 p-8 sm:p-10 lg:p-12"
                style={{
                  background: 'hsl(215 55% 11%)',
                  borderTop: '1px solid hsl(44 54% 54% / 0.7)',
                }}
              >
                <div className="space-y-10">
                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-5">Group Office</p>
                    <p className="font-display text-xl text-cream leading-relaxed">
                      {SITE.addressLines.map((line, i) => (
                        <React.Fragment key={line}>
                          {line}
                          {i < SITE.addressLines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>

                  <div className="hairline" />

                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Email</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="font-body text-base text-gold underline underline-offset-4 hover:text-gold-hover transition-colors duration-200"
                    >
                      {SITE.email}
                    </a>
                  </div>

                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Phone</p>
                    <a
                      href={SITE.phoneHref}
                      className="font-body text-base text-gold underline underline-offset-4 hover:text-gold-hover transition-colors duration-200"
                    >
                      {SITE.phoneDisplay}
                    </a>
                  </div>

                  <div className="hairline" />

                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-5">Follow Us</p>
                    <div className="flex gap-6">
                      <a
                        href="https://linkedin.com/company/diarchgroup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mont text-[11px] uppercase tracking-[0.15em] text-gold underline underline-offset-4 hover:text-gold-hover transition-colors duration-200"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://instagram.com/diarchgroup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mont text-[11px] uppercase tracking-[0.15em] text-gold underline underline-offset-4 hover:text-gold-hover transition-colors duration-200"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>

                  <div className="hairline" />

                  {/* Official Advisory: Land Mutation Desk */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-gold flex items-center gap-1.5">
                        <ShieldAlert className="h-3.5 w-3.5 text-gold shrink-0" />
                        Official Advisory · Mutation Desk
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] font-medium bg-gold/15 text-gold border border-gold/30">
                        Authorized
                      </span>
                    </div>
                    <p className="font-body text-xs text-silver/80 mb-3.5 leading-relaxed">
                      For all plot title mutation inquiries and assistance, please connect exclusively with our authorized representative:
                    </p>
                    <div className="relative overflow-hidden border border-gold/30 bg-background/60 p-2 shadow-elev transition-all hover:border-gold/60 group">
                      <a
                        href="tel:+919031653902"
                        className="block relative overflow-hidden"
                        title="Click to call Amit Kumar (+91 9031653902) for Mutation Work"
                      >
                        <img
                          src={IMAGES.mutationNotice}
                          alt="Diarch Group Official Mutation Notice - Amit Kumar 9031653902"
                          width={1254}
                          height={1254}
                          loading="lazy"
                          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      </a>
                    </div>
                    <div className="mt-3.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-display text-cream font-medium text-sm block">Amit Kumar</span>
                        <span className="font-mont text-[10px] uppercase tracking-[0.15em] text-silver/70">Authorized Officer</span>
                      </div>
                      <a
                        href="tel:+919031653902"
                        className="inline-flex items-center gap-1.5 font-mont text-[11px] uppercase tracking-[0.14em] text-gold border border-gold/40 px-3 py-1.5 hover:bg-gold/10 hover:border-gold transition-colors"
                      >
                        <PhoneCall className="h-3 w-3" />
                        9031653902
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
