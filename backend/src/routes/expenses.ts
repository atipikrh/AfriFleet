import { Router } from 'express';
import { DataService } from '../services/DataService.js';
import { Expense } from '../models/Expense.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const withRelations = req.query.withRelations === 'true';
    const expenses = withRelations
      ? DataService.getExpensesWithRelations()
      : DataService.getExpenses();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des dépenses' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const withRelations = req.query.withRelations === 'true';
    const expense = withRelations
      ? DataService.getExpenseWithRelations(req.params.id)
      : DataService.getExpenseById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Dépense non trouvée' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la dépense' });
  }
});

router.get('/vehicle/:vehicleId', (req, res) => {
  try {
    const withRelations = req.query.withRelations === 'true';
    const expenses = withRelations
      ? DataService.getExpensesByVehicleWithRelations(req.params.vehicleId)
      : DataService.getExpensesByVehicle(req.params.vehicleId);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des dépenses' });
  }
});

router.post('/', (req, res) => {
  try {
    const expense = req.body as Expense;
    if (!expense.id || !expense.vehicle_id || !expense.type || !expense.montant) {
      return res.status(400).json({ error: 'ID, vehicle_id, type et montant requis' });
    }
    const newExpense = DataService.createExpense(expense);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la dépense' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const updates = req.body as Partial<Expense>;
    const updated = DataService.updateExpense(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Dépense non trouvée' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la dépense' });
  }
});

export default router;

