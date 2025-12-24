import { Router } from 'express';
import { DataService } from '../services/DataService.js';
import { BusinessRulesService } from '../services/BusinessRulesService.js';
import { Vehicle } from '../models/Vehicle.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    // Appliquer les règles métier avant de retourner les données
    BusinessRulesService.applyAllRules();
    const withRelations = req.query.withRelations === 'true';
    const vehicles = withRelations 
      ? DataService.getVehiclesWithRelations()
      : DataService.getVehicles();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des véhicules' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const withRelations = req.query.withRelations === 'true';
    const vehicle = withRelations
      ? DataService.getVehicleWithRelations(req.params.id)
      : DataService.getVehicleById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Véhicule non trouvé' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du véhicule' });
  }
});

router.post('/', (req, res) => {
  try {
    const vehicle = req.body as Vehicle;
    if (!vehicle.id || !vehicle.immatriculation) {
      return res.status(400).json({ error: 'ID et immatriculation requis' });
    }
    const newVehicle = DataService.createVehicle(vehicle);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du véhicule' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const updates = req.body as Partial<Vehicle>;
    const updated = DataService.updateVehicle(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Véhicule non trouvé' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du véhicule' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deleted = DataService.deleteVehicle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Véhicule non trouvé' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du véhicule' });
  }
});

export default router;

