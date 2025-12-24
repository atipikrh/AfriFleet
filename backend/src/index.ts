import express from 'express';
import cors from 'cors';
import vehiclesRouter from './routes/vehicles.js';
import driversRouter from './routes/drivers.js';
import assignmentsRouter from './routes/assignments.js';
import checklistsRouter from './routes/checklists.js';
import expensesRouter from './routes/expenses.js';
import aiRouter from './routes/ai.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';

const app = express();
const PORT = 3001;

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
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/checklists', checklistsRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/ai', aiRouter);

// Exporter l'app pour usage serverless (Vercel)
export default app;

// Démarrer le serveur seulement si exécuté directement (développement local)
// Ne pas démarrer si importé comme module (pour serverless)
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  });
}


