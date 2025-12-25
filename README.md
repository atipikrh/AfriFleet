# AfriFleet - Application de Gestion de Flotte

Application moderne de gestion de flotte avec React, TypeScript, Express et toutes les dépendances modernes intégrées.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Installer toutes les dépendances
npm run install:all
```

### Développement local

```bash
# Démarrer frontend + backend simultanément
npm run dev

# Ou séparément
npm run dev:frontend  # Frontend sur http://localhost:3000
npm run dev:backend   # Backend sur http://localhost:3001
```

## 📦 Technologies utilisées

### Frontend
- **React 18** avec TypeScript
- **React Query** (@tanstack/react-query) - Gestion de cache et requêtes
- **React Router DOM** - Routing avec lazy loading
- **Framer Motion** - Animations fluides
- **Radix UI** - Composants accessibles
- **Recharts** - Graphiques interactifs
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Express** avec TypeScript
- **Node-cache** - Cache en mémoire
- **Helmet** - Sécurité HTTP
- **Express-rate-limit** - Limitation de débit
- **Winston** - Logging structuré
- **Morgan** - Logging HTTP
- **Compression** - Compression de réponses

## 🏗️ Structure du projet

```
AfriFleet/
├── frontend/          # Application React
│   ├── src/
│   │   ├── app/      # Configuration (queryClient)
│   │   ├── components/  # Composants réutilisables
│   │   ├── hooks/    # Hooks React Query personnalisés
│   │   ├── pages/     # Pages de l'application
│   │   ├── routes/   # Configuration du routing
│   │   └── services/ # Services API
│   └── package.json
├── backend/           # API Express
│   ├── src/
│   │   ├── config/   # Configurations (cache, security, logging)
│   │   ├── routes/   # Routes API
│   │   └── services/ # Services métier
│   └── package.json
└── package.json       # Scripts racine
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine :

```env
# Backend
PORT=3001
NODE_ENV=development
LOG_LEVEL=info

# Frontend
VITE_API_BASE=http://localhost:3001/api
```

## 📝 Scripts disponibles

### Développement
- `npm run dev` - Démarrer frontend + backend
- `npm run dev:frontend` - Frontend uniquement
- `npm run dev:backend` - Backend uniquement

### Build
- `npm run build` - Build frontend
- `npm run build:frontend` - Build frontend
- `npm run build:backend` - Build backend

## 🌐 Déploiement

### Vercel

Le projet est configuré pour Vercel avec `vercel.json`.

1. Connectez votre repo GitHub à Vercel
2. Vercel détectera automatiquement la configuration
3. Les variables d'environnement doivent être configurées dans le dashboard Vercel

**Note** : Pour le backend, vous devrez peut-être utiliser Vercel Serverless Functions ou déployer le backend séparément.

### Git

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit: AfriFleet avec dépendances modernes"

# Ajouter le remote
git remote add origin <votre-repo-url>

# Push
git push -u origin main
```

## 🧪 Tests

Les tests peuvent être ajoutés avec :
- **Vitest** pour les tests unitaires
- **React Testing Library** pour les tests de composants
- **Supertest** pour les tests d'API

## 📚 Documentation

### React Query
Les hooks personnalisés sont dans `frontend/src/hooks/` :
- `useVehicles()` - Liste des véhicules
- `useVehicle(id)` - Détails d'un véhicule
- `useDrivers()` - Liste des conducteurs

### Routing
Les routes sont configurées dans `frontend/src/routes/AppRouter.tsx` avec lazy loading.

### Backend API
- Health check: `GET /api/health`
- Documentation: `GET /api`
- Routes: `/api/vehicles`, `/api/drivers`, `/api/auth`, etc.

## 🔒 Sécurité

- **Helmet** configuré pour les headers de sécurité
- **Rate limiting** : 100 req/15min général, 5 req/15min pour auth
- **CORS** configuré
- **Compression** activée

## 📊 Monitoring

- **Winston** pour les logs structurés
- **Morgan** pour les logs HTTP
- **React Query Devtools** disponible en développement

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Auteurs

Équipe AfriFleet

---

**Note** : Assurez-vous d'avoir installé toutes les dépendances avec `npm run install:all` avant de démarrer le projet.
