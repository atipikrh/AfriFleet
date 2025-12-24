import { Router } from 'express';
import { AIService } from '../services/AIService.js';

const router = Router();

router.get('/analyze-fuel/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const days = req.query.days ? parseInt(req.query.days as string) : 30;
    
    const analysis = await AIService.analyzeFuelExpenses(vehicleId, days);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'analyse des dépenses carburant' });
  }
});

router.get('/fleet-report', async (req, res) => {
  try {
    const report = await AIService.generateFleetReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la génération du rapport' });
  }
});

export default router;

