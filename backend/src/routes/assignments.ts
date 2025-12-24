import { Router } from 'express';
import { DataService } from '../services/DataService.js';
import { Assignment } from '../models/Assignment.js';
import { AssignmentRule } from '../rules/AssignmentRule.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const withRelations = req.query.withRelations === 'true';
    const assignments = withRelations
      ? DataService.getAssignmentsWithRelations()
      : DataService.getAssignments();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des affectations' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const withRelations = req.query.withRelations === 'true';
    const assignment = withRelations
      ? DataService.getAssignmentWithRelations(req.params.id)
      : DataService.getAssignmentById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Affectation non trouvée' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'affectation' });
  }
});

router.get('/vehicle/:vehicleId', (req, res) => {
  try {
    const assignments = DataService.getActiveAssignmentsByVehicle(req.params.vehicleId);
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des affectations' });
  }
});

router.post('/', (req, res) => {
  try {
    const assignment = req.body as Assignment;
    
    // Appliquer la règle d'affectation
    const validation = AssignmentRule.validateAssignment(assignment.vehicle_id, assignment.driver_id, assignment.mode_double_equipage || false);
    
    if (!validation.valid) {
      return res.status(400).json({ error: validation.message });
    }
    
    if (!assignment.id || !assignment.vehicle_id || !assignment.driver_id) {
      return res.status(400).json({ error: 'ID, vehicle_id et driver_id requis' });
    }
    
    const newAssignment = DataService.createAssignment(assignment);
    
    // Mettre à jour le véhicule avec le conducteur actif
    DataService.updateVehicle(assignment.vehicle_id, {
      conducteur_actif_id: assignment.driver_id,
      mode_double_equipage: assignment.mode_double_equipage || false
    });
    
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'affectation' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const updates = req.body as Partial<Assignment>;
    const updated = DataService.updateAssignment(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Affectation non trouvée' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'affectation' });
  }
});

export default router;

