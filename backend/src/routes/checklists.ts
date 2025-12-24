import { Router } from 'express';
import { DataService } from '../services/DataService.js';
import { Checklist } from '../models/Checklist.js';
import { SafetyBlockRule } from '../rules/SafetyBlockRule.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const withRelations = req.query.withRelations === 'true';
    const checklists = withRelations
      ? DataService.getChecklistsWithRelations()
      : DataService.getChecklists();
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des checklists' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const withRelations = req.query.withRelations === 'true';
    const checklist = withRelations
      ? DataService.getChecklistWithRelations(req.params.id)
      : DataService.getChecklistById(req.params.id);
    if (!checklist) {
      return res.status(404).json({ error: 'Checklist non trouvée' });
    }
    res.json(checklist);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la checklist' });
  }
});

router.get('/vehicle/:vehicleId', (req, res) => {
  try {
    const withRelations = req.query.withRelations === 'true';
    const checklists = withRelations
      ? DataService.getChecklistsByVehicleWithRelations(req.params.vehicleId)
      : DataService.getChecklistsByVehicle(req.params.vehicleId);
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des checklists' });
  }
});

router.post('/', (req, res) => {
  try {
    const checklist = req.body as Checklist;
    if (!checklist.id || !checklist.vehicle_id || !checklist.driver_id) {
      return res.status(400).json({ error: 'ID, vehicle_id et driver_id requis' });
    }
    
    const newChecklist = DataService.createChecklist(checklist);
    
    // Appliquer la règle de blocage sécurité
    SafetyBlockRule.checkAndBlockVehicle(checklist.vehicle_id, checklist);
    
    res.status(201).json(newChecklist);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la checklist' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const updates = req.body as Partial<Checklist>;
    const checklist = DataService.getChecklistById(req.params.id);
    if (!checklist) {
      return res.status(404).json({ error: 'Checklist non trouvée' });
    }
    
    const updated = DataService.updateChecklist(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Checklist non trouvée' });
    }
    
    // Réappliquer la règle de blocage sécurité
    SafetyBlockRule.checkAndBlockVehicle(updated.vehicle_id, updated);
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la checklist' });
  }
});

export default router;

