import express from 'express';
import cors from 'cors';
import vehiclesRouter from './src/routes/vehicles.js';
import driversRouter from './src/routes/drivers.js';
import assignmentsRouter from './src/routes/assignments.js';
import checklistsRouter from './src/routes/checklists.js';
import expensesRouter from './src/routes/expenses.js';
import aiRouter from './src/routes/ai.js';
import authRouter from './src/routes/auth.js';
import { logger } from './src/utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Middleware de logging pour les requêtes
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.request(req.method, req.path, res.statusCode);
    if (duration > 1000) {
      logger.warn(`Requête lente: ${duration}ms pour ${req.method} ${req.path}`);
    }
  });
  next();
});

// Routes de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend AfriFleet opérationnel' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenue sur AfriFleet API' });
});

// Routes API
app.use('/api/auth', authRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/checklists', checklistsRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  logger.success('Backend AfriFleet démarré');
  logger.info(`API disponible sur http://localhost:${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/api/health`);
  logger.info(`Documentation API: http://localhost:${PORT}/api`);
  console.log('');
});

