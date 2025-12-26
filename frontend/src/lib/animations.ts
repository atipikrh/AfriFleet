import { Variants } from 'framer-motion';

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const slideIn: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export const cardHover = {
  scale: 1.02,
  y: -8,
  transition: { duration: 0.2 },
};

export const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

