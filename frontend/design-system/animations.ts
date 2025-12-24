// Animations CSS - AfriFleet Design System

/**
 * Définitions des animations CSS utilisées dans l'application
 * Ces animations sont synchronisées avec les @keyframes dans frontend/src/index.css
 */

export type AnimationKeyframes = {
  [key: string]: {
    [property: string]: string | number;
  };
};

export const animations: Record<string, AnimationKeyframes> = {
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
  shimmer: {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  fadeIn: {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  slideIn: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },
} as const;

/**
 * Durées d'animation recommandées (en secondes)
 */
export const animationDurations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 1,
  slowest: 2,
} as const;

/**
 * Fonctions de timing recommandées
 */
export const animationTimingFunctions = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear',
} as const;

/**
 * Génère le CSS pour une animation keyframe
 * @param name - Nom de l'animation
 * @param keyframes - Définition des keyframes
 * @returns Chaîne CSS pour @keyframes
 */
export function generateKeyframesCSS(name: string, keyframes: AnimationKeyframes): string {
  const frames = Object.entries(keyframes)
    .map(([key, properties]) => {
      const props = Object.entries(properties)
        .map(([prop, value]) => `    ${prop}: ${value};`)
        .join('\n');
      return `  ${key} {\n${props}\n  }`;
    })
    .join('\n');

  return `@keyframes ${name} {\n${frames}\n}`;
}

/**
 * Génère toutes les animations CSS
 * @returns Chaîne CSS contenant toutes les @keyframes
 */
export function generateAllKeyframesCSS(): string {
  return Object.entries(animations)
    .map(([name, keyframes]) => generateKeyframesCSS(name, keyframes))
    .join('\n\n');
}

