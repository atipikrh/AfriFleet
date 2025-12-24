import express from 'express';
import cors from 'cors';
import vehiclesRouter from './src/routes/vehicles.js';
import driversRouter from './src/routes/drivers.js';
import assignmentsRouter from './src/routes/assignments.js';
import checklistsRouter from './src/routes/checklists.js';
import expensesRouter from './src/routes/expenses.js';
import aiRouter from './src/routes/ai.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend AfriFleet opérationnel' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenue sur AfriFleet API' });
});

// Routes API
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/checklists', checklistsRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});

