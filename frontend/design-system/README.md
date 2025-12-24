# Design System - AfriFleet

Charte graphique centralisée du projet AfriFleet.

## Structure

- `colors.ts` - Palette de couleurs (primary, secondary, accent, warning, danger, success)
- `gradients.ts` - Dégradés utilisés dans l'application
- `shadows.ts` - Ombres et effets de lueur
- `typography.ts` - Configuration de la typographie (police Inter)
- `spacing.ts` - Espacements personnalisés
- `animations.ts` - Définitions d'animations CSS
- `tokens.ts` - Génération de tokens CSS et JavaScript
- `hooks.ts` - Hooks React pour utiliser le design system
- `utils.ts` - Fonctions utilitaires pour les composants
- `index.ts` - Export centralisé de tous les éléments

## Utilisation

### Dans TypeScript/React

#### Import direct

```typescript
import { colors, gradients, shadows } from './design-system';

// Utilisation des couleurs
const primaryColor = colors.primary.DEFAULT; // '#6366f1'

// Utilisation des gradients
const primaryGradient = gradients.primary;

// Utilisation des ombres
const glowEffect = shadows.glowPrimary;
```

#### Hooks React

```typescript
import { useColor, useGradient, useShadow, useButtonVariant } from './design-system';

function MyComponent() {
  const primaryColor = useColor('primary', 600);
  const gradient = useGradient('primary');
  const shadow = useShadow('glowPrimary');
  const buttonStyles = useButtonVariant('primary');
  
  return <div style={{ background: gradient, boxShadow: shadow }}>...</div>;
}
```

#### Utilitaires

```typescript
import { getGradientStyle, getShadowStyle, getGlassStyle, getStatusClasses } from './design-system';

// Styles inline
const gradientStyle = getGradientStyle('primary');
const shadowStyle = getShadowStyle('glowPrimary');
const glassStyle = getGlassStyle(0.7);

// Classes CSS
const statusClasses = getStatusClasses('success');
```

#### Couleurs sémantiques

```typescript
import { semanticColors, withOpacity } from './design-system';

// Couleurs sémantiques
const actionColor = semanticColors.action;
const textPrimary = semanticColors.textPrimary;

// Couleur avec opacité
const primaryWithOpacity = withOpacity(colors.primary.DEFAULT, 0.5);
```

### Synchronisation automatique avec CSS

Pour synchroniser automatiquement les valeurs du design system avec `index.css`, exécutez :

```bash
npm run generate:design-tokens
```

Ce script :
- Génère les variables CSS (`:root`) depuis `design-system/`
- Génère les animations `@keyframes` depuis `design-system/animations.ts`
- Met à jour automatiquement `src/index.css`

**Important** : Les sections générées automatiquement dans `index.css` sont marquées comme "NE PAS MODIFIER MANUELLEMENT". Modifiez plutôt les fichiers dans `design-system/` puis réexécutez le script.

### Dans Tailwind Config

Le fichier `tailwind.config.js` importe automatiquement les couleurs, typographie et espacements du design system. Les valeurs sont documentées avec des commentaires indiquant leur source.

### Dans CSS

Les variables CSS sont définies dans `src/index.css` et utilisent les valeurs du design system. Elles sont générées automatiquement via le script `generate:design-tokens`.

## Couleurs principales

- **Primary** : Indigo (#6366f1) - Couleur principale de l'application
- **Secondary** : Vert émeraude (#10b981) - Actions positives, succès
- **Accent** : Orange (#f97316) - Éléments d'accentuation
- **Warning** : Ambre (#f59e0b) - Avertissements
- **Danger** : Rouge (#ef4444) - Erreurs, actions destructives
- **Success** : Vert (#10b981) - Confirmations, succès

## Typographie

- **Police principale** : Inter (Google Fonts)
- **Fallback** : system-ui, sans-serif

## Animations

- `pulse` : Animation de pulsation pour les indicateurs
- `shimmer` : Effet de brillance
- `float` : Animation de flottement
- `spin` : Rotation
- `fadeIn` : Apparition en fondu
- `slideIn` : Glissement depuis la gauche

## Workflow recommandé

1. **Modifier le design system** : Éditez les fichiers dans `design-system/`
2. **Générer les tokens CSS** : Exécutez `npm run generate:design-tokens`
3. **Vérifier les changements** : Les variables CSS et animations sont automatiquement mises à jour dans `index.css`
4. **Utiliser dans les composants** : Importez depuis `design-system/` dans vos composants React
