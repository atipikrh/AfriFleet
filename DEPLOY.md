# Guide de Déploiement AfriFleet sur Vercel

## Configuration PWA

L'application est maintenant configurée comme Progressive Web App (PWA) avec :
- ✅ Service Worker automatique
- ✅ Cache intelligent (NetworkFirst pour API, CacheFirst pour assets)
- ✅ Support hors ligne
- ✅ Mise à jour automatique
- ✅ Installation sur appareils mobiles

## Déploiement sur Vercel

### Option 1 : Via l'interface web Vercel (Recommandé)

1. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub

2. **Importez le projet**
   - Cliquez sur "Add New Project"
   - Sélectionnez le dépôt `AfriFleet` depuis GitHub
   - Vercel détectera automatiquement la configuration

3. **Configuration du projet**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (racine)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`

4. **Variables d'environnement** (si nécessaire)
   - Ajoutez vos variables d'environnement dans les paramètres du projet
   - Exemple : `VITE_API_URL`, etc.

5. **Déployez**
   - Cliquez sur "Deploy"
   - Attendez la fin du déploiement (2-3 minutes)

### Option 2 : Via la CLI Vercel

```bash
# Installer la CLI Vercel globalement
npm install -g vercel

# Depuis la racine du projet
cd C:\Users\Admin\Documents\GitHub\AfriFleet

# Déployer
vercel

# Suivre les instructions interactives
# - Link to existing project? No (première fois) ou Yes
# - Project name: afrifleet
# - Directory: ./
# - Override settings? No
```

### Configuration automatique

Le fichier `vercel.json` est déjà configuré avec :
- **Build Command** : `cd frontend && npm install && npm run build`
- **Output Directory** : `frontend/dist`
- **Install Command** : `cd frontend && npm install`
- **Rewrites SPA** : Toutes les routes (`/(.*)`) redirigent vers `/index.html` pour le routing côté client React Router
- **Headers de cache** : Cache long (1 an) pour les assets statiques dans `/assets/`

Cette configuration permet :
- ✅ Le routing SPA fonctionne correctement (routes comme `/dashboard` et `/reports` accessibles directement)
- ✅ Les assets statiques sont mis en cache efficacement
- ✅ Le build est automatiquement détecté par Vercel

## Déploiement automatique

Une fois le projet connecté à Vercel via GitHub :

1. **Activation automatique** : Le déploiement automatique est activé par défaut lors de la connexion GitHub
2. **Déploiements sur push** : Chaque push sur la branche principale (`main`/`master`) déclenchera automatiquement un nouveau déploiement
3. **Preview deployments** : Les branches et pull requests créent automatiquement des preview deployments avec leur propre URL
4. **Détection automatique** : Vercel détecte automatiquement la configuration depuis `vercel.json` - aucune configuration manuelle nécessaire

### Étapes pour activer le déploiement automatique

1. **Créer et pousser vercel.json** (déjà fait) :
   ```bash
   git add vercel.json
   git commit -m "fix: SPA routing for Vercel (rewrite to index.html)"
   git push
   ```

2. **Connecter le projet sur Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub
   - Cliquez sur "Add New Project"
   - Sélectionnez le dépôt `AfriFleet`
   - Vercel détectera automatiquement `vercel.json` et configurera le projet

3. **Vérifier l'activation** :
   - Dans les paramètres du projet Vercel, section "Git"
   - Vérifiez que "Production Branch" est configurée (généralement `main` ou `master`)
   - Les déploiements automatiques sont activés par défaut

## Accès à l'application

Une fois déployé, Vercel vous fournira :
- **URL de production** : `https://afrifleet.vercel.app` (ou votre domaine personnalisé)
- **URL de prévisualisation** : Pour chaque commit/pull request (générée automatiquement)

## Tester le PWA

1. **Ouvrir l'application** sur votre ordinateur :
   - Allez sur l'URL fournie par Vercel
   - Ouvrez les DevTools (F12)
   - Onglet "Application" > "Service Workers" pour vérifier l'enregistrement

2. **Installer l'application** :
   - Sur Chrome/Edge : Cliquez sur l'icône d'installation dans la barre d'adresse
   - Sur mobile : Menu > "Ajouter à l'écran d'accueil"

3. **Tester le mode hors ligne** :
   - Installez l'application
   - Activez le mode avion
   - L'application devrait toujours fonctionner avec les données en cache

## Mise à jour automatique

Le PWA est configuré avec `autoUpdate`, donc :
- Les mises à jour sont détectées automatiquement
- Un prompt s'affiche pour informer l'utilisateur
- L'utilisateur peut choisir de mettre à jour immédiatement ou plus tard

## Vérification post-déploiement

✅ **Routing SPA** : Routes comme `/dashboard` et `/reports` accessibles directement (pas d'erreur 404)
✅ **Service Worker** : Enregistré et fonctionnel
✅ **Manifest.json** : Accessible et correctement configuré
✅ **Icônes PWA** : Chargées correctement
✅ **Cache** : Fonctionnel pour les assets statiques
✅ **Mode hors ligne** : Opérationnel avec les données en cache
✅ **Déploiements automatiques** : Actifs sur chaque push GitHub

## Support

Pour toute question ou problème :
- Vérifiez les logs Vercel dans le dashboard
- Consultez la console du navigateur
- Vérifiez que le Service Worker est actif dans DevTools

