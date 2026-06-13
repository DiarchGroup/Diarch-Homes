import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SUGGESTIONS = [
  'Which projects are ready to move?',
  'Tell me about the Vastu Promise',
  'What is the price range in Patna?',
];

const BOT_REPLY =
  'Thank you for reaching out to Diarch Real Estate. A relationship manager will share curated, Vastu-aligned options for you shortly. Meanwhile, you can book a complimentary site visit anytime.';

export const AIChatOrb = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste 🙏 I’m Diya, your Diarch concierge. How may I help you find your prestigious address today?' },
  ]);
  const [input, setInput] = useState('');

  const send = (text) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages((m) => [...m, { role: 'user', text: msg }]);
    setInput('');
    setTimeout(() => setMessages((m) => [...m, { role: 'bot', text: BOT_REPLY }]), 700);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Open AI concierge"
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles strokeWidth={1.5} className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[460px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl border border-gold/25 shadow-card"
            style={{ background: 'hsl(221 58% 16% / 0.92)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex items-center justify-between border-b border-gold/15 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground">
                  <Sparkles strokeWidth={1.5} className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-cream">Diya · Concierge</p>
                  <p className="font-mont text-[10px] uppercase tracking-wider text-gold">Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-silver hover:text-gold">
                <X strokeWidth={1.5} className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-gold text-primary-foreground rounded-br-sm'
                        : 'bg-surface text-cream rounded-bl-sm border border-border'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {messages.length <= 1 && (
                <div className="flex flex-col gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-lg border border-gold/25 px-3 py-2 text-left font-body text-xs text-silver hover:border-gold/60 hover:text-gold transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-gold/15 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about projects, Vastu, pricing…"
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-2.5 font-body text-sm text-cream placeholder:text-silver/60 focus:border-gold/50 focus:outline-none"
              />
              <Button onClick={() => send()} variant="gold" size="icon" className="h-11 w-11 shrink-0" aria-label="Send">
                <Send strokeWidth={1.5} className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
