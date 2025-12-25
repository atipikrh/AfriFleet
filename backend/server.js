import express from 'express';
import cors from 'cors';
import compression from 'compression';
import vehiclesRouter from './src/routes/vehicles.js';
import driversRouter from './src/routes/drivers.js';
import assignmentsRouter from './src/routes/assignments.js';
import checklistsRouter from './src/routes/checklists.js';
import expensesRouter from './src/routes/expenses.js';
import aiRouter from './src/routes/ai.js';
import authRouter from './src/routes/auth.js';
import { logger } from './src/utils/logger.js';
import { securityMiddleware, generalRateLimit, authRateLimit } from './src/config/security.js';
import { httpLogger } from './src/config/logging.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Sécurité et compression
app.use(securityMiddleware);
app.use(compression());

// CORS et parsing JSON
app.use(cors());
app.use(express.json());

// Logging HTTP avec Morgan
app.use(httpLogger);

// Rate limiting général
app.use('/api', generalRateLimit);

// Rate limiting pour l'authentification
app.use('/api/auth', authRateLimit);

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

