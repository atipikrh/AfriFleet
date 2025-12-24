// Utilitaires pour le Design System - AfriFleet

import { colors } from './colors';
import { gradients } from './gradients';
import { shadows } from './shadows';

/**
 * Obtient les classes Tailwind pour un variant de couleur
 */
export function getColorClasses(variant: 'primary' | 'secondary' | 'accent', shade: 50 | 100 | 500 | 600 | 700 | 'DEFAULT' = 'DEFAULT') {
  const shadeClass = shade === 'DEFAULT' ? '' : `-${shade}`;
  return `text-${variant}${shadeClass} bg-${variant}${shadeClass}`;
}

/**
 * Obtient les classes Tailwind pour un variant de gradient
 */
export function getGradientClasses(variant: 'primary' | 'secondary' | 'accent' = 'primary') {
  return `gradient-${variant}`;
}

/**
 * Obtient les styles inline pour un gradient
 */
export function getGradientStyle(variant: 'primary' | 'secondary' | 'accent' = 'primary') {
  return {
    background: gradients[variant],
  };
}

/**
 * Obtient les styles inline pour une ombre
 */
export function getShadowStyle(variant: 'glowPrimary' | 'glowSecondary' | 'glowAccent' = 'glowPrimary') {
  return {
    boxShadow: shadows[variant],
  };
}

/**
 * Obtient les classes CSS pour un composant glassmorphism
 */
export function getGlassClasses(opacity: 'light' | 'medium' | 'strong' = 'medium') {
  const opacityMap = {
    light: 'bg-white/60',
    medium: 'bg-white/70',
    strong: 'bg-white/80',
  };
  
  return `${opacityMap[opacity]} backdrop-blur-xl border border-white/40`;
}

/**
 * Obtient les styles inline pour un composant glassmorphism
 */
export function getGlassStyle(opacity: number = 0.7) {
  return {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  };
}

/**
 * Obtient les classes pour un statut (success, warning, danger)
 */
export function getStatusClasses(status: 'success' | 'warning' | 'danger' | 'info') {
  const statusMap = {
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    danger: 'bg-danger text-white',
    info: 'bg-primary-500 text-white',
  };
  
  return statusMap[status];
}

/**
 * Obtient les styles pour un statut
 */
export function getStatusStyle(status: 'success' | 'warning' | 'danger' | 'info') {
  const statusMap = {
    success: { backgroundColor: colors.success, color: '#ffffff' },
    warning: { backgroundColor: colors.warning, color: '#ffffff' },
    danger: { backgroundColor: colors.danger, color: '#ffffff' },
    info: { backgroundColor: colors.primary[500], color: '#ffffff' },
  };
  
  return statusMap[status];
}

