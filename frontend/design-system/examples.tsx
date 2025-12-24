// Exemples d'utilisation du Design System - AfriFleet
// Ce fichier montre comment utiliser le design system dans vos composants React

import React from 'react';
import { 
  useColor, 
  useGradient, 
  useShadow, 
  useButtonVariant,
  useSemanticColor 
} from './hooks';
import { 
  getGradientStyle, 
  getShadowStyle, 
  getGlassStyle, 
  getStatusClasses 
} from './utils';
import { colors, semanticColors, withOpacity } from './colors';

/**
 * Exemple 1 : Utilisation des hooks
 */
export function ExampleWithHooks() {
  const primaryColor = useColor('primary', 600);
  const gradient = useGradient('primary');
  const shadow = useShadow('glowPrimary');
  const buttonStyles = useButtonVariant('primary');
  const actionColor = useSemanticColor('action');

  return (
    <div>
      <div style={{ color: primaryColor }}>Texte avec couleur primaire</div>
      <div style={{ background: gradient, boxShadow: shadow }}>
        Div avec gradient et ombre
      </div>
      <button style={buttonStyles}>Bouton avec variant</button>
      <div style={{ color: actionColor }}>Couleur sémantique</div>
    </div>
  );
}

/**
 * Exemple 2 : Utilisation des utilitaires
 */
export function ExampleWithUtils() {
  const gradientStyle = getGradientStyle('primary');
  const shadowStyle = getShadowStyle('glowPrimary');
  const glassStyle = getGlassStyle(0.7);
  const statusClasses = getStatusClasses('success');

  return (
    <div>
      <div style={gradientStyle}>Gradient avec style inline</div>
      <div style={shadowStyle}>Ombre avec style inline</div>
      <div style={glassStyle}>Effet glassmorphism</div>
      <div className={statusClasses}>Statut avec classes</div>
    </div>
  );
}

/**
 * Exemple 3 : Utilisation directe des couleurs
 */
export function ExampleWithDirectColors() {
  const primaryColor = colors.primary.DEFAULT;
  const primaryWithOpacity = withOpacity(primaryColor, 0.5);
  const textPrimary = semanticColors.textPrimary;
  const actionColor = semanticColors.action;

  return (
    <div>
      <div style={{ color: primaryColor }}>Couleur primaire</div>
      <div style={{ backgroundColor: primaryWithOpacity }}>
        Couleur avec opacité
      </div>
      <div style={{ color: textPrimary }}>Texte primaire</div>
      <button style={{ backgroundColor: actionColor }}>
        Bouton action
      </button>
    </div>
  );
}

/**
 * Exemple 4 : Composant avec design system intégré
 */
interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

export function CustomButton({ variant = 'primary', children }: CustomButtonProps) {
  const buttonStyles = useButtonVariant(variant);
  const shadow = useShadow(
    variant === 'primary' ? 'glowPrimary' : 
    variant === 'secondary' ? 'glowSecondary' : 
    'glowAccent'
  );

  return (
    <button
      style={{
        ...buttonStyles,
        boxShadow: shadow,
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </button>
  );
}

