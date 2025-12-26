# Variables d'environnement

## Configuration requise

Créez un fichier `.env` à la racine du dossier `frontend/` avec les variables suivantes :

### Sentry (Production uniquement)

```env
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

**Note** : Obtenez votre DSN depuis https://sentry.io/settings/[votre-organisation]/projects/[votre-projet]/keys/

Sentry ne s'initialisera qu'en mode production (`npm run build`). En développement, cette variable n'est pas nécessaire.

