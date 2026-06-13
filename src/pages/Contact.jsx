import React, { useState } from 'react';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ScrollReveal } from '@/components/ScrollReveal';
import { projects } from '@/data/projects';

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
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', project: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    if (!form.firstName.trim() || !form.email.trim()) {
      toast.error('Please share your name and email.');
      return;
    }
    setSubmitted(true);
    toast.success('Enquiry received. Our team will reach out shortly.');
    setForm({ firstName: '', lastName: '', email: '', company: '', project: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="pt-24 min-h-screen">
      <section className="py-16 md:py-24">
        <div className="container-lux">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">

            {/* ── Left: form ── */}
            <ScrollReveal className="lg:col-span-7 lg:pr-20">
              <p className="font-mont text-[11px] uppercase tracking-[0.2em] text-silver">
                — Send Us a Note
              </p>

              <div className="mt-14 space-y-10">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">First Name</p>
                    <UnderlineInput value={form.firstName} onChange={set('firstName')} placeholder="" />
                  </div>
                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Last Name</p>
                    <UnderlineInput value={form.lastName} onChange={set('lastName')} placeholder="" />
                  </div>
                </div>

                <div>
                  <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Email</p>
                  <UnderlineInput value={form.email} onChange={set('email')} type="email" placeholder="" />
                </div>

                <div>
                  <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Company / Organisation</p>
                  <UnderlineInput value={form.company} onChange={set('company')} placeholder="" />
                </div>

                <div>
                  <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Inquiry Type</p>
                  <Select value={form.project} onValueChange={(v) => setForm((f) => ({ ...f, project: v }))}>
                    <SelectTrigger className="w-full bg-transparent border-0 border-b border-border/60 rounded-none px-0 pb-3 pt-1 font-body text-base text-cream focus:ring-0 focus:border-gold/60 h-auto shadow-none">
                      <SelectValue placeholder="General inquiry" className="text-silver/40" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General inquiry</SelectItem>
                      {projects.map((p) => (
                        <SelectItem key={p.slug} value={p.slug}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">How Can We Help?</p>
                  <UnderlineTextarea value={form.message} onChange={set('message')} placeholder="" />
                </div>
              </div>

              <div className="mt-12">
                <Button onClick={handleSubmit} variant="gold" size="xl" className="px-12">
                  {submitted ? (<><Check strokeWidth={1.5} className="h-4 w-4" /> Sent</>) : 'Send Message'}
                </Button>
              </div>
            </ScrollReveal>

            {/* ── Right: info panel ── */}
            <ScrollReveal delay={0.2} className="lg:col-span-5 mt-16 lg:mt-0">
              <div
                className="h-full min-h-120 p-10 lg:p-12"
                style={{
                  background: 'hsl(215 55% 11%)',
                  borderTop: '1px solid hsl(44 54% 54% / 0.7)',
                }}
              >
                <div className="space-y-10">
                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-5">Group Office</p>
                    <p className="font-display text-xl text-cream leading-relaxed">
                      H.N.-28, Vasant Vihar Colony<br />
                      Opp. Tapasaya Complex<br />
                      Boring Road, Patna<br />
                      Bihar – 800001, India
                    </p>
                  </div>

                  <div className="hairline" />

                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Email</p>
                    <a
                      href="mailto:info@diarchgroup.com"
                      className="font-body text-base text-gold underline underline-offset-4 hover:text-gold-hover transition-colors duration-200"
                    >
                      info@diarchgroup.com
                    </a>
                  </div>

                  <div>
                    <p className="font-mont text-[10px] uppercase tracking-[0.18em] text-silver mb-4">Phone</p>
                    <a
                      href="tel:+919229266955"
                      className="font-body text-base text-gold underline underline-offset-4 hover:text-gold-hover transition-colors duration-200"
                    >
                      +91 92292 66955
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
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
