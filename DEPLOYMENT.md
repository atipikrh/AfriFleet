# Guide de Déploiement AfriFleet

## 🚀 Déploiement sur Vercel

### Configuration actuelle

Le projet est configuré avec `vercel.json` pour le déploiement frontend uniquement.

### Étapes de déploiement

1. **Installer Vercel CLI** (optionnel)
```bash
npm i -g vercel
```

2. **Déployer depuis le dashboard Vercel**
   - Connectez votre repo GitHub à Vercel
   - Vercel détectera automatiquement la configuration
   - Le build se fera automatiquement

3. **Variables d'environnement à configurer dans Vercel**
   - `VITE_API_BASE` : URL de votre API backend
   - `NODE_ENV` : `production`

### Note importante

Le backend doit être déployé séparément car Vercel est optimisé pour les applications frontend. Options :

1. **Vercel Serverless Functions** : Convertir le backend en fonctions serverless
2. **Railway/Render** : Déployer le backend séparément
3. **Heroku** : Alternative pour le backend

## 🔧 Configuration Git

### Initialisation Git (si nécessaire)

```bash
# Initialiser le repo
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "feat: Intégration dépendances modernes (React Query, Router, Framer Motion, Radix UI, Recharts)"

# Ajouter le remote
git remote add origin <votre-repo-url>

# Push
git push -u origin main
```

### Branches recommandées

- `main` : Production
- `develop` : Développement
- `feature/*` : Nouvelles fonctionnalités

## 📦 Build pour production

### Frontend
```bash
cd frontend
npm run build
# Les fichiers seront dans frontend/dist/
```

### Backend
```bash
cd backend
npm run build
# Les fichiers seront dans backend/dist/
```

## 🌐 URLs locales

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001
- **Health Check** : http://localhost:3001/api/health

## ✅ Checklist avant déploiement

- [ ] Toutes les dépendances installées (`npm run install:all`)
- [ ] Variables d'environnement configurées
- [ ] Build testé localement (`npm run build`)
- [ ] Tests passés (si disponibles)
- [ ] `.gitignore` à jour
- [ ] `vercel.json` configuré
- [ ] README.md à jour

## 🔍 Vérification post-déploiement

1. Vérifier que l'application se charge
2. Tester les routes principales
3. Vérifier les appels API
4. Tester la PWA (si activée)
5. Vérifier les logs dans Vercel

## 🐛 Dépannage

### Erreur de build
- Vérifier les logs dans Vercel
- Tester le build localement : `npm run build`

### Erreurs CORS
- Vérifier la configuration CORS dans `backend/server.js`
- Ajouter l'URL Vercel dans les origines autorisées

### Erreurs de routing
- Vérifier les rewrites dans `vercel.json`
- S'assurer que toutes les routes sont gérées

