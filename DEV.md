# 🔥 Guide de Développement - Rechargement Automatique

## 🚀 Démarrage Rapide

```bash
# 1. Installer toutes les dépendances (première fois uniquement)
npm run install:all

# 2. Démarrer les serveurs avec rechargement automatique
npm run dev
```

## ✨ Fonctionnalités de Rechargement Automatique

### Frontend (Vite)
- ✅ **Hot Module Replacement (HMR)** : Les modifications dans les fichiers React/TypeScript sont automatiquement rechargées
- ✅ **Rechargement instantané** : Pas besoin de rafraîchir la page manuellement
- ✅ **Conservation de l'état** : L'état de l'application est préservé lors du rechargement

### Backend (tsx watch)
- ✅ **Surveillance des fichiers** : Détection automatique des changements dans les fichiers `.ts`
- ✅ **Redémarrage automatique** : Le serveur redémarre automatiquement à chaque modification
- ✅ **Logs en temps réel** : Affichage des logs dans la console

## 📝 Commandes Utiles

```bash
# Démarrer tout (frontend + backend) - RECOMMANDÉ
npm run dev

# Démarrer uniquement le frontend
npm run dev:frontend
# ou
npm run dev:frontend-only

# Démarrer uniquement le backend
npm run dev:backend
# ou
npm run dev:backend-only

# Construire pour la production
npm run build

# Générer les tokens CSS depuis le design system
npm run generate:design-tokens
```

### Notes importantes

- **Pour démarrer l'application complète** : Utilisez `npm run dev` depuis la racine du projet
- **Les logs sont colorés** : Backend en rouge, Frontend en bleu pour faciliter l'identification
- **Hot-reload activé** : Les modifications sont automatiquement rechargées

## 🎯 Ports

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001

## 💡 Conseils

1. **Modifications Frontend** : Les changements sont visibles instantanément dans le navigateur
2. **Modifications Backend** : Le serveur redémarre automatiquement, attendez le message "🚀 Serveur backend démarré"
3. **Erreurs** : Consultez les logs dans les terminaux pour voir les erreurs éventuelles

## 🔧 Dépannage

Si le rechargement automatique ne fonctionne pas :

1. Vérifiez que les serveurs sont bien démarrés
2. Vérifiez les ports 3000 et 3001 (non utilisés par d'autres applications)
3. Redémarrez les serveurs avec `Ctrl+C` puis `npm run dev`

