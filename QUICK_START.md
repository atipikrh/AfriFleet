# 🚀 Démarrage Rapide AfriFleet

## Installation et démarrage en 3 étapes

### 1. Installer les dépendances
```bash
npm run install:all
```

### 2. Démarrer les serveurs
```bash
npm run dev
```

### 3. Ouvrir dans le navigateur
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001/api/health

## 📋 Commandes utiles

```bash
# Développement
npm run dev              # Frontend + Backend
npm run dev:frontend     # Frontend uniquement
npm run dev:backend      # Backend uniquement

# Build
npm run build            # Build frontend
npm run build:backend    # Build backend
```

## 🔍 Vérification

### Backend
Ouvrez http://localhost:3001/api/health dans votre navigateur.
Vous devriez voir : `{"status":"ok","message":"Backend AfriFleet opérationnel"}`

### Frontend
Ouvrez http://localhost:3000
L'application devrait se charger avec React Query Devtools disponible.

## 🐛 Problèmes courants

### Port déjà utilisé
Si le port 3000 ou 3001 est occupé :
- Frontend : Modifiez `PORT` dans `frontend/vite.config.ts`
- Backend : Modifiez `PORT` dans `backend/server.js` ou utilisez `PORT=3002 npm run dev:backend`

### Erreurs de dépendances
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

### Erreurs TypeScript
```bash
# Vérifier les types
cd frontend && npx tsc --noEmit
cd ../backend && npx tsc --noEmit
```

## 📚 Documentation complète

- **README.md** - Documentation générale
- **DEPLOYMENT.md** - Guide de déploiement

