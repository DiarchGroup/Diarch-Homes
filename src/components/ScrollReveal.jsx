import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal = ({ children, delay = 0, y = 30, className = '', as = 'div' }) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export const StaggerGroup = ({ children, className = '', stagger = 0.12 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-80px' }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: stagger } },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '', y = 30 }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    }}
  >
    {children}
  </motion.div>
);
