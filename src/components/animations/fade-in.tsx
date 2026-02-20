'use client';

import {motion} from 'framer-motion';
import {ReactNode} from 'react';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function FadeIn({children, delay = 0, y = 28, className}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{opacity: 0, y}}
      transition={{duration: 0.6, delay, ease: 'easeOut'}}
      viewport={{once: true, margin: '-80px'}}
      whileInView={{opacity: 1, y: 0}}
    >
      {children}
    </motion.div>
  );
}
