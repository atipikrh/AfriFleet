# Guide des Dépendances AfriFleet

Ce document décrit toutes les dépendances installées et leur utilisation dans le projet AfriFleet.

## 📦 Dépendances Frontend

### Routing et Navigation
- **react-router-dom** : Navigation déclarative avec lazy loading intégré
- **@tanstack/react-virtual** : Virtualisation pour optimiser les grandes listes

### State Management
- **@tanstack/react-query** : Gestion de cache, synchronisation, requêtes optimisées
  - Configuration dans `frontend/src/lib/react-query.ts`
  - Cache par défaut : 5 minutes
  - Réessai automatique en cas d'erreur
- **zustand** : State management léger et performant
- **immer** : Manipulation immuable simplifiée

### Animations et Transitions
- **framer-motion** : Animations fluides et performantes
- **react-spring** : Animations basées sur la physique
- **react-transition-group** : Transitions de composants

### UI Components
- **@radix-ui/react-*** : Composants accessibles et personnalisables
  - Dialog, Dropdown, Tooltip, Select, Popover, Tabs, Accordion
- **react-hook-form** : Gestion de formulaires performante
- **react-hot-toast** : Notifications toast élégantes
- **react-draggable** : Glisser-déposer

### Responsive et Adaptabilité
- **react-responsive** : Hooks pour media queries
- **react-device-detect** : Détection de device
- **@use-gesture/react** : Gestes tactiles avancés

### Visualisation de Données
- **recharts** : Graphiques React performants
- **react-chartjs-2** + **chart.js** : Wrapper Chart.js pour React

### Performance
- **react-window** : Virtualisation de fenêtres
- **@loadable/component** : Lazy loading avancé
- **workbox-window** : Gestion PWA améliorée

### Utilitaires
- **date-fns** : Manipulation de dates moderne
- **lodash-es** : Utilitaires fonctionnels (tree-shakeable)
- **clsx** : Gestion conditionnelle de classes
- **zod** : Validation de schémas TypeScript

## 🔧 Dépendances Backend

### Performance et Cache
- **node-cache** : Cache en mémoire simple
  - Configuration dans `backend/src/config/cache.ts`
  - TTL par défaut : 10 minutes
- **compression** : Compression de réponses HTTP

### Validation et Sécurité
- **zod** : Validation de schémas (partagé avec frontend)
- **helmet** : Sécurité HTTP (headers de sécurité)
  - Configuration dans `backend/src/config/security.ts`
- **express-rate-limit** : Limitation de débit
  - Limite générale : 100 requêtes / 15 min
  - Limite auth : 5 tentatives / 15 min

### Monitoring et Logging
- **winston** : Logging structuré
  - Configuration dans `backend/src/config/logging.ts`
- **morgan** : Logging HTTP

## 🛠️ Outils de Développement

### Visualisation d'Architecture
- **madge** : Graphique de dépendances
  - Utilisation : `npm run analyze:deps`
- **dependency-cruiser** : Analyse de dépendances avancée
  - Utilisation : `npm run visualize:architecture`
- **@mermaid-js/mermaid** : Diagrammes dans la documentation

### Qualité de Code
- **eslint-plugin-react-hooks** : Règles pour hooks React
- **prettier** : Formatage automatique

## 📁 Structure des Fichiers

### Frontend
```
frontend/src/
├── lib/              # Configurations centralisées
│   ├── react-query.ts    # Configuration React Query
│   └── router.tsx        # Configuration routing avec lazy loading
├── hooks/            # Hooks personnalisés réutilisables
│   ├── useMediaQuery.ts  # Media queries responsive
│   ├── useDebounce.ts    # Debounce de valeurs
│   └── useLocalStorage.ts # Gestion localStorage
└── utils/            # Utilitaires partagés
    ├── cn.ts             # Combinaison de classes CSS
    └── format.ts         # Formatage dates, nombres, devises
```

### Backend
```
backend/src/
└── config/           # Configurations centralisées
    ├── security.ts       # Helmet, rate limiting
    ├── cache.ts          # Cache en mémoire
    └── logging.ts        # Winston, Morgan
```

## 🚀 Scripts Disponibles

### Développement
- `npm run dev` : Démarrer frontend + backend
- `npm run dev:frontend` : Démarrer uniquement le frontend
- `npm run dev:backend` : Démarrer uniquement le backend

### Analyse
- `npm run analyze:deps` : Analyser les dépendances (génère deps.svg)
- `npm run visualize:architecture` : Visualiser l'architecture (génère architecture.svg)
- `npm run check:bundle` : Analyser la taille du bundle

## 💡 Utilisation

### React Query
```typescript
import { useQuery } from '@tanstack/react-query';
import { vehiclesApi } from '../services/vehiclesApi';

const { data, isLoading, error } = useQuery({
  queryKey: ['vehicles'],
  queryFn: () => vehiclesApi.getAll(),
});
```

### Hooks Personnalisés
```typescript
import { useIsMobile, useDebounce } from '../hooks';

const isMobile = useIsMobile();
const debouncedSearch = useDebounce(searchTerm, 500);
```

### Utilitaires
```typescript
import { cn, formatDate, formatCurrency } from '../utils';

const className = cn('base-class', isActive && 'active');
const date = formatDate(new Date(), 'dd/MM/yyyy');
const price = formatCurrency(10000, 'XOF');
```

### Backend - Cache
```typescript
import { cacheUtils } from '../config/cache';

const data = await cacheUtils.getOrSet(
  'vehicles',
  () => fetchVehiclesFromDB(),
  600 // TTL en secondes
);
```

## 🔄 Prochaines Étapes

1. Intégrer React Query dans les services API existants
2. Migrer vers le routing avec lazy loading
3. Ajouter les animations Framer Motion aux composants
4. Configurer les composants Radix UI
5. Intégrer les graphiques Recharts dans les rapports

