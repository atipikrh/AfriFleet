// Hooks React pour utiliser le Design System - AfriFleet

import { useMemo } from 'react';
import { semanticColors, withOpacity, getColor } from './colors';
import { gradients } from './gradients';
import { shadows } from './shadows';

/**
 * Hook pour obtenir une couleur du design system
 */
export function useColor(scale: 'primary' | 'secondary' | 'accent', shade: 50 | 100 | 500 | 600 | 700 | 'DEFAULT' = 'DEFAULT') {
  return useMemo(() => getColor(scale, shade), [scale, shade]);
}

/**
 * Hook pour obtenir une couleur avec opacité
 */
export function useColorWithOpacity(color: string, opacity: number) {
  return useMemo(() => withOpacity(color, opacity), [color, opacity]);
}

/**
 * Hook pour obtenir un gradient
 */
export function useGradient(variant: 'primary' | 'secondary' | 'accent' = 'primary') {
  return useMemo(() => gradients[variant], [variant]);
}

/**
 * Hook pour obtenir une ombre
 */
export function useShadow(variant: 'glowPrimary' | 'glowSecondary' | 'glowAccent' = 'glowPrimary') {
  return useMemo(() => shadows[variant], [variant]);
}

/**
 * Hook pour obtenir une couleur sémantique
 */
export function useSemanticColor(key: keyof typeof semanticColors) {
  return useMemo(() => semanticColors[key], [key]);
}

/**
 * Hook pour obtenir les styles d'un variant de bouton
 */
export function useButtonVariant(variant: 'primary' | 'secondary' | 'accent' = 'primary') {
  return useMemo(() => {
    const gradient = gradients[variant];
    const shadow = variant === 'primary' ? shadows.glowPrimary : 
                   variant === 'secondary' ? shadows.glowSecondary : 
                   shadows.glowAccent;
    
    return {
      background: gradient,
      boxShadow: shadow,
    };
  }, [variant]);
}

