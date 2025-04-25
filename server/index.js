// src/index.js
import express from 'express';
import dotenv from 'dotenv';

// Charger les variables d’environnement
dotenv.config();

import patientsRouter      from './routes/patients.js';
import professionalsRouter from './routes/professionals.js';
import authRouter          from './routes/auth.js';  
import chatRoutes from './routes/chats.js';

const app = express();

// Parser JSON
app.use(express.json());

// Monter les routes sous /api/…
app.use('/api/auth', authRouter);
app.use('/api/patients',      patientsRouter);
app.use('/api/professional',      professionalsRouter);
app.use('/api/chats', chatRoutes);


// Gestionnaire d’erreur centralisé
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
);
