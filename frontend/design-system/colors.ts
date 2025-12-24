// Palette de couleurs - AfriFleet Design System

/**
 * Palette de couleurs principale de l'application AfriFleet
 * Ces couleurs sont synchronisées avec la configuration Tailwind dans tailwind.config.js
 */

export type ColorScale = {
  DEFAULT: string;
  50: string;
  100: string;
  500: string;
  600: string;
  700: string;
  800?: string;
};

export type Colors = {
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  warning: string;
  danger: string;
  success: string;
  light: string;
  dark: string;
};

export const colors: Colors = {
  primary: {
    DEFAULT: '#6366f1',
    50: '#eef2ff',
    100: '#e0e7ff',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3', // Nouvelle nuance ajoutée
  },
  secondary: {
    DEFAULT: '#10b981',
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
  },
  accent: {
    DEFAULT: '#f97316',
    50: '#fff7ed',
    100: '#ffedd5',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
  },
  warning: '#f59e0b',
  danger: '#ef4444',
  success: '#10b981',
  light: '#f8fafc',
  dark: '#1e293b',
} as const;

/**
 * Couleurs sémantiques pour un usage plus expressif
 */
export const semanticColors = {
  // Actions principales
  action: colors.primary.DEFAULT,
  actionHover: colors.primary[600],
  actionActive: colors.primary[700],
  
  // Actions secondaires
  secondaryAction: colors.secondary.DEFAULT,
  secondaryActionHover: colors.secondary[600],
  
  // États
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
  info: colors.primary[500],
  
  // Arrière-plans
  background: colors.light,
  surface: '#ffffff',
  surfaceHover: '#f9fafb',
  
  // Texte
  textPrimary: colors.dark,
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  textInverse: '#ffffff',
  
  // Bordures
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  borderDark: '#cbd5e1',
} as const;

/**
 * Convertit une couleur hex en RGB
 * @param hex - Couleur hexadécimale (ex: '#6366f1')
 * @returns Objet avec r, g, b
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convertit une couleur hex en RGBA
 * @param hex - Couleur hexadécimale (ex: '#6366f1')
 * @param alpha - Opacité (0-1)
 * @returns Chaîne RGBA (ex: 'rgba(99, 102, 241, 0.5)')
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Obtient une couleur avec opacité
 * @param color - Couleur hexadécimale ou nom de couleur
 * @param opacity - Opacité (0-1)
 * @returns Chaîne RGBA
 */
export function withOpacity(color: string, opacity: number): string {
  // Si c'est déjà une couleur avec opacité, on la retourne telle quelle
  if (color.startsWith('rgba') || color.includes('rgb')) {
    return color;
  }
  
  // Si c'est une couleur du design system
  if (color in colors || color in semanticColors) {
    const colorValue = (colors as any)[color] || (semanticColors as any)[color];
    if (typeof colorValue === 'string') {
      return hexToRgba(colorValue, opacity);
    }
    if (colorValue?.DEFAULT) {
      return hexToRgba(colorValue.DEFAULT, opacity);
    }
  }
  
  // Sinon, on essaie de convertir directement
  return hexToRgba(color, opacity);
}

/**
 * Obtient une couleur d'une échelle de couleur
 * @param scale - Échelle de couleur (primary, secondary, accent)
 * @param shade - Nuance (50, 100, 500, 600, 700, ou 'DEFAULT')
 * @returns Couleur hexadécimale
 */
export function getColor(scale: 'primary' | 'secondary' | 'accent', shade: 50 | 100 | 500 | 600 | 700 | 'DEFAULT' = 'DEFAULT'): string {
  return colors[scale][shade];
}

