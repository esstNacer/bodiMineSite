import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

import patientsRouter      from './routes/patients.js';
import professionalsRouter from './routes/professionals.js';
import authRouter          from './routes/auth.js';  
import chatRoutes from './routes/chats.js';
import notificationRoutes from './routes/notifications.js';
import projectRouter from './routes/projects.js';
import ProfessionalsPhotoRouter from './routes/professionalPhotos.js';

const app = express();

app.use(express.json());

// 🔵 Autoriser le frontend Render
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(
  '/uploads',
  express.static(
    path.join(process.cwd(), 'uploads')
  )
);

// Monter les routes
app.use('/api/auth', authRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/professional', professionalsRouter);
app.use('/api/chats', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/projects', projectRouter);
app.use('/api/photos', ProfessionalsPhotoRouter);
// Gestionnaire d’erreur
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
