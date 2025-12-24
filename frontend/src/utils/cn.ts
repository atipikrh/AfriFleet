import { clsx, type ClassValue } from 'clsx';

/**
 * Utilitaire pour combiner les classes CSS de manière conditionnelle
 * Combine clsx avec une gestion améliorée des classes Tailwind
 */
export const cn = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

