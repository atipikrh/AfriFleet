// Design Tokens - AfriFleet Design System
// Génération de tokens CSS à partir du design system

import { colors } from './colors';
import { gradients } from './gradients';
import { shadows } from './shadows';
import { typography } from './typography';
import { spacing } from './spacing';

/**
 * Génère les variables CSS pour le design system
 * Ces variables peuvent être injectées dans :root
 */
export function generateCSSTokens(): string {
  const tokens: string[] = [];

  // Couleurs
  tokens.push('/* Couleurs - Source: design-system/colors.ts */');
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      tokens.push(`  --color-${key}: ${value};`);
    } else {
      Object.entries(value).forEach(([shade, color]) => {
        const shadeName = shade === 'DEFAULT' ? '' : `-${shade}`;
        tokens.push(`  --color-${key}${shadeName}: ${color};`);
      });
    }
  });

  // Gradients
  tokens.push('\n  /* Gradients - Source: design-system/gradients.ts */');
  Object.entries(gradients).forEach(([key, value]) => {
    tokens.push(`  --gradient-${key}: ${value};`);
  });

  // Shadows
  tokens.push('\n  /* Shadows - Source: design-system/shadows.ts */');
  Object.entries(shadows).forEach(([key, value]) => {
    const shadowName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    tokens.push(`  --shadow-${shadowName}: ${value};`);
  });

  // Typography
  tokens.push('\n  /* Typography - Source: design-system/typography.ts */');
  tokens.push(`  --font-family-sans: ${typography.fontFamily.sans.join(', ')};`);

  // Spacing
  tokens.push('\n  /* Spacing - Source: design-system/spacing.ts */');
  Object.entries(spacing).forEach(([key, value]) => {
    tokens.push(`  --spacing-${key}: ${value};`);
  });

  return `:root {\n${tokens.join('\n')}\n}`;
}

/**
 * Tokens pour utilisation dans JavaScript/TypeScript
 */
export const tokens = {
  colors: {
    primary: {
      default: colors.primary.DEFAULT,
      '50': colors.primary[50],
      '100': colors.primary[100],
      '500': colors.primary[500],
      '600': colors.primary[600],
      '700': colors.primary[700],
    },
    secondary: {
      default: colors.secondary.DEFAULT,
      '50': colors.secondary[50],
      '100': colors.secondary[100],
      '500': colors.secondary[500],
      '600': colors.secondary[600],
      '700': colors.secondary[700],
    },
    accent: {
      default: colors.accent.DEFAULT,
      '50': colors.accent[50],
      '100': colors.accent[100],
      '500': colors.accent[500],
      '600': colors.accent[600],
      '700': colors.accent[700],
    },
    warning: colors.warning,
    danger: colors.danger,
    success: colors.success,
    light: colors.light,
    dark: colors.dark,
  },
  gradients,
  shadows,
  typography,
  spacing,
} as const;

