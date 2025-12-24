import { Router } from 'express';
import { DataService } from '../services/DataService.js';
import { BusinessRulesService } from '../services/BusinessRulesService.js';
import { Driver } from '../models/Driver.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    // Appliquer les règles métier avant de retourner les données
    BusinessRulesService.applyAllRules();
    const drivers = DataService.getDrivers();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des conducteurs' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const driver = DataService.getDriverById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Conducteur non trouvé' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du conducteur' });
  }
});

router.post('/', (req, res) => {
  try {
    const driver = req.body as Driver;
    if (!driver.id || !driver.nom) {
      return res.status(400).json({ error: 'ID et nom requis' });
    }
    const newDriver = DataService.createDriver(driver);
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du conducteur' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const updates = req.body as Partial<Driver>;
    const updated = DataService.updateDriver(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Conducteur non trouvé' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du conducteur' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deleted = DataService.deleteDriver(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Conducteur non trouvé' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du conducteur' });
  }
});

export default router;

