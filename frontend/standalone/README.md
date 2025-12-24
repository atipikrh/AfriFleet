# AfriFleet - Version Standalone

Version standalone de l'application AfriFleet avec JavaScript vanilla (sans React).

## Structure

```
standalone/
├── index.html          # Point d'entrée HTML
├── styles/
│   └── main.css        # Styles CSS personnalisés
├── js/
│   ├── app.js          # Point d'entrée et initialisation
│   ├── navigation.js   # Gestion de la navigation entre écrans
│   ├── data.js         # Données de l'application (véhicules, checklist)
│   ├── ui.js           # Génération d'éléments UI
│   └── utils.js        # Fonctions utilitaires
└── README.md           # Documentation
```

## Architecture

### Modules JavaScript

- **app.js** : Point d'entrée principal, initialise l'application et gère les événements globaux
- **navigation.js** : Gère l'affichage des différents écrans et la synchronisation de la navigation
- **data.js** : Contient les données statiques (véhicules, items de checklist)
- **ui.js** : Fonctions pour générer dynamiquement les éléments UI (liste de véhicules, checklist)
- **utils.js** : Fonctions utilitaires réutilisables (formatage, gestion du statut en ligne/hors ligne)

### Styles

- **main.css** : Tous les styles personnalisés extraits du HTML original
- Utilise Tailwind CSS via CDN pour les classes utilitaires
- Variables CSS pour les gradients et ombres

## Utilisation

### Option 1 : Serveur HTTP local (recommandé)

Les modules ES6 nécessitent un serveur HTTP pour fonctionner. Vous pouvez utiliser :

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server -p 8000

# Avec PHP
php -S localhost:8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

### Option 2 : Extension de navigateur

Utilisez une extension comme "Live Server" dans VS Code ou une extension similaire dans votre éditeur.

## Fonctionnalités

- ✅ Navigation entre écrans (Dashboard, Véhicules, Checklist, Carburant, Rapports)
- ✅ Génération dynamique de la liste des véhicules
- ✅ Checklist interactive avec cases à cocher
- ✅ Navigation responsive (mobile et desktop)
- ✅ Simulation du statut en ligne/hors ligne
- ✅ Interface avec effets glassmorphism

## Dépendances externes

- **Tailwind CSS** : Via CDN (https://cdn.tailwindcss.com)
- **Font Awesome** : Via CDN (https://cdnjs.cloudflare.com)
- **Google Fonts** : Police Inter

## Notes techniques

- Utilise les modules ES6 (`import`/`export`)
- Compatible avec les navigateurs modernes supportant ES6
- Code organisé en modules pour une meilleure maintenabilité
- CSS et JavaScript séparés pour un meilleur cache navigateur

## Différences avec la version React

Cette version standalone :
- N'utilise pas de framework JavaScript
- Fonctionne directement dans le navigateur (avec un serveur HTTP)
- Code plus simple et léger
- Idéal pour le prototypage rapide ou les déploiements simples

La version React (dans `frontend/src/`) offre :
- Architecture plus robuste
- Gestion d'état avancée
- Hot-reload en développement
- Build optimisé pour la production

