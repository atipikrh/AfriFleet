import { Router } from 'express';
import { DataService } from '../services/DataService.js';

const router = Router();

interface LoginRequest {
  identifier: string;
  password: string;
  role: string;
  rememberMe?: boolean;
}

router.post('/login', (req, res) => {
  try {
    const { identifier, password, role } = req.body as LoginRequest;

    if (!identifier || !password || !role) {
      return res.status(400).json({ 
        error: 'Identifiant, mot de passe et rôle requis' 
      });
    }

    const user = DataService.authenticateUser(identifier, password);

    if (!user) {
      return res.status(401).json({ 
        error: 'Identifiant ou mot de passe incorrect' 
      });
    }

    if (user.role !== role) {
      return res.status(403).json({ 
        error: 'Rôle incorrect pour cet utilisateur' 
      });
    }

    if (!user.actif) {
      return res.status(403).json({ 
        error: 'Compte utilisateur désactivé' 
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword,
      token: `token_${user.id}_${Date.now()}`,
    });
  } catch (error) {
    console.error('Erreur authentification:', error);
    res.status(500).json({ error: 'Erreur lors de l\'authentification' });
  }
});

export default router;

