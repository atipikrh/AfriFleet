// Handler serverless pour Vercel
// Ce fichier gère toutes les routes /api/* via le backend Express

// Importer l'app Express depuis le backend compilé
// Le backend est compilé dans le buildCommand de vercel.json
import app from '../backend/dist/index.js';

// Vercel serverless function handler
// Vercel passe les requêtes directement à l'app Express
export default function handler(req, res) {
  return app(req, res);
}

