# 🚀 AfriFleet - Kit de Démarrage Full-Stack

Kit de démarrage Full-Stack prêt pour le codage, le prototypage rapide et la mise à l'échelle de production.

## 📋 Structure du Projet

```
AfriFleet/
├── backend/          # API Express + TypeScript
├── frontend/         # React + Vite + TypeScript
└── package.json      # Scripts de gestion globale
```

## 🛠️ Installation

```bash
# Installer toutes les dépendances
npm run install:all
```

## 🚀 Démarrage

```bash
# Démarrer le frontend et le backend simultanément avec rechargement automatique
npm run dev
```

- **Frontend**: http://localhost:3000 (Hot-reload activé avec Vite)
- **Backend**: http://localhost:3001 (Hot-reload activé avec tsx watch)

> 💡 **Rechargement automatique** : Les modifications dans le code sont automatiquement détectées et rechargées sans redémarrer les serveurs.

## 📝 Scripts Disponibles

### Développement
- `npm run dev` - Démarrer frontend + backend simultanément (rechargement automatique)
- `npm run dev:frontend` - Démarrer uniquement le frontend (port 3000)
- `npm run dev:backend` - Démarrer uniquement le backend (port 3001)
- `npm run dev:frontend-only` - Alias pour démarrer uniquement le frontend
- `npm run dev:backend-only` - Alias pour démarrer uniquement le backend

### Build
- `npm run build` - Construire le frontend et le backend pour la production
- `npm run build:frontend` - Construire uniquement le frontend
- `npm run build:backend` - Construire uniquement le backend

### Design System
- `npm run generate:design-tokens` - Générer les tokens CSS depuis le design system

### Installation
- `npm run install:all` - Installer toutes les dépendances (racine + backend + frontend)

## 🎯 Technologies

- **Backend**: Express, TypeScript, Node.js
- **Frontend**: React, Vite, TypeScript
- **Architecture**: Simple et minimaliste pour une meilleure scalabilité

## 📦 Dépendances Principales

### Backend
- Express
- CORS
- TypeScript

### Frontend
- React
- Vite
- TypeScript


