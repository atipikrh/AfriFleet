// Script pour générer automatiquement les variables CSS et animations depuis le design system
// Usage: npm run generate:design-tokens
// Note: Ce script nécessite tsx ou peut être exécuté avec node --loader tsx

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateCSSTokens } from '../design-system/tokens.js';
import { generateAllKeyframesCSS } from '../design-system/animations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const indexPath = join(rootDir, 'src', 'index.css');

/**
 * Génère et injecte les tokens CSS dans index.css
 */
function generateAndInjectTokens() {
  console.log('🎨 Génération des tokens CSS depuis le design system...');
  
  // Lire le fichier index.css actuel
  let cssContent = readFileSync(indexPath, 'utf-8');
  
  // Générer les tokens CSS
  const cssTokens = generateCSSTokens();
  const keyframesCSS = generateAllKeyframesCSS();
  
  // Remplacer la section :root avec les nouveaux tokens
  // Regex améliorée pour capturer tout le bloc :root avec commentaires
  const rootRegex = /\/\* ============================================\s*\n\s*CSS VARIABLES[\s\S]*?\*\/\s*:root\s*\{[^}]*\}/s;
  const newRootSection = `/* ============================================
   CSS VARIABLES
   Source: design-system/ (généré automatiquement - NE PAS MODIFIER MANUELLEMENT)
   Pour modifier, éditez les fichiers dans design-system/ puis exécutez: npm run generate:design-tokens
   ============================================ */
${cssTokens}`;
  
  if (rootRegex.test(cssContent)) {
    cssContent = cssContent.replace(rootRegex, newRootSection);
    console.log('✅ Variables CSS mises à jour');
  } else {
    // Fallback: chercher juste :root
    const simpleRootRegex = /:root\s*\{[^}]*\}/s;
    if (simpleRootRegex.test(cssContent)) {
      cssContent = cssContent.replace(simpleRootRegex, cssTokens);
      console.log('✅ Variables CSS mises à jour (format simple)');
    } else {
      // Si :root n'existe pas, l'ajouter après @tailwind utilities
      const insertPoint = cssContent.indexOf('@tailwind utilities;');
      if (insertPoint !== -1) {
        const insertIndex = insertPoint + '@tailwind utilities;'.length;
        cssContent = cssContent.slice(0, insertIndex) + '\n\n' + newRootSection + '\n' + cssContent.slice(insertIndex);
        console.log('✅ Variables CSS ajoutées');
      } else {
        console.warn('⚠️  Impossible de trouver le point d\'insertion pour les variables CSS');
      }
    }
  }
  
  // Remplacer les animations
  // Regex améliorée pour capturer toute la section animations
  const animationsRegex = /\/\* ============================================\s*\n\s*ANIMATIONS[\s\S]*?\*\/\s*@keyframes[\s\S]*?(?=\/\*|\.offline-indicator|$)/;
  const newAnimationsSection = `/* ============================================
   ANIMATIONS
   Source: design-system/animations.ts (généré automatiquement - NE PAS MODIFIER MANUELLEMENT)
   Pour modifier, éditez design-system/animations.ts puis exécutez: npm run generate:design-tokens
   ============================================ */
${keyframesCSS}

`;
  
  if (animationsRegex.test(cssContent)) {
    cssContent = cssContent.replace(animationsRegex, newAnimationsSection);
    console.log('✅ Animations CSS mises à jour');
  } else {
    // Fallback: chercher juste la section animations
    const simpleAnimationsRegex = /\/\* ============================================\s*\n\s*ANIMATIONS[\s\S]*?\*\/[\s\S]*?@keyframes[\s\S]*?(?=\/\*|\.offline-indicator|$)/;
    if (simpleAnimationsRegex.test(cssContent)) {
      cssContent = cssContent.replace(simpleAnimationsRegex, newAnimationsSection);
      console.log('✅ Animations CSS mises à jour (format simple)');
    } else {
      // Ajouter les animations après les variables CSS
      const rootEnd = cssContent.lastIndexOf('}');
      if (rootEnd !== -1) {
        cssContent = cssContent.slice(0, rootEnd + 1) + '\n\n' + newAnimationsSection + cssContent.slice(rootEnd + 1);
        console.log('✅ Animations CSS ajoutées après les variables');
      } else {
        console.warn('⚠️  Impossible de trouver le point d\'insertion pour les animations');
      }
    }
  }
  
  // Écrire le fichier mis à jour
  writeFileSync(indexPath, cssContent, 'utf-8');
  console.log('✨ index.css mis à jour avec succès !');
}

// Exécuter le script
try {
  generateAndInjectTokens();
  console.log('\n🎉 Génération terminée !');
} catch (error) {
  console.error('❌ Erreur lors de la génération:', error);
  process.exit(1);
}
