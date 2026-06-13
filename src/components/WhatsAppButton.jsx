import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WA_LINK = 'https://wa.me/919229266955?text=Hello%20Diarch%20Real%20Estate';

export const WhatsAppButton = () => (
  <motion.a
    href={WA_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-gold animate-pulse-orb"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
  >
    <MessageCircle strokeWidth={1.5} className="h-7 w-7" />
  </motion.a>
);
