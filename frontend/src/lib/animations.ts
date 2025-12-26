import { Variants } from 'framer-motion';

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const slideIn: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
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

/**
 * Animation générique fade + slide
 * Utilisée pour pages, cartes, sections
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Animation fade simple (dialogs, tooltips)
 */
export const fade: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};

/**
 * Animation slide depuis la gauche (Sidebar)
 */
export const slideInLeft: Variants = {
  hidden: {
    x: -40,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

/**
 * Animation slide depuis la droite
 */
export const slideInRight: Variants = {
  hidden: {
    x: 40,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

/**
 * Animation scale (modals, cards focus)
 */
export const scaleIn: Variants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};

/**
 * Animation stagger container (listes, dashboards)
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

