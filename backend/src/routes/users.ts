import { Router } from 'express';
import { DataService } from '../services/DataService.js';
import { User } from '../models/User.js';

const router = Router();

// GET / - Liste tous les utilisateurs (BUG 1 CORRIGÉ: exclut le champ password)
router.get('/', (req, res) => {
  try {
    const users = DataService.getUsers();
    // Exclure le champ password de tous les utilisateurs
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// GET /:id - Récupère un utilisateur par ID (exclut le champ password)
router.get('/:id', (req, res) => {
  try {
    const user = DataService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    // Exclure le champ password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
});

// POST / - Crée un nouvel utilisateur (BUG 2 CORRIGÉ: valide le champ actif)
router.post('/', (req, res) => {
  try {
    const user = req.body as User;
    
    // Validation de tous les champs requis incluant actif
    if (!user.id || !user.identifier || !user.password || !user.role || !user.nom) {
      return res.status(400).json({ 
        error: 'ID, identifiant, mot de passe, rôle et nom requis' 
      });
    }
    
    // Validation explicite du champ actif (booléen requis)
    if (user.actif === undefined || user.actif === null || typeof user.actif !== 'boolean') {
      return res.status(400).json({ 
        error: 'Le champ actif est requis et doit être un booléen (true ou false)' 
      });
    }
    
    const newUser = DataService.createUser(user);
    // Exclure le champ password dans la réponse
    const { password, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
});

// PUT /:id - Met à jour un utilisateur
router.put('/:id', (req, res) => {
  try {
    const updates = req.body as Partial<User>;
    const updated = DataService.updateUser(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    // Exclure le champ password dans la réponse
    const { password, ...userWithoutPassword } = updated;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
});

// DELETE /:id - Supprime un utilisateur
router.delete('/:id', (req, res) => {
  try {
    const deleted = DataService.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

export default router;

