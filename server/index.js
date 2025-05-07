// src/index.js
import express from 'express';
import session from 'express-session';
import passport from './passport.js'; // Import ton passport configuré
import jwt from 'jsonwebtoken';  // <-- ajoute ça tout en haut si pas encore fait
import dotenv from 'dotenv';

// Charger les variables d’environnement
dotenv.config();

import patientsRouter      from './routes/patients.js';
import professionalsRouter from './routes/professionals.js';
import authRouter          from './routes/auth.js';  
import chatRoutes from './routes/chats.js';
//import paymentsRoutes from './routes/payments.js';
import notificationRoutes from './routes/notifications.js';
import projectRouter from './routes/projects.js';
import ProfessionalsPhotoRouter from './routes/professionalPhotos.js'
import path from 'path'

function generateJWT(user) {
  const payload = {
    email: user.email,
    name: user.name,
    // Tu peux ajouter plus de choses si besoin (id, role, etc.)
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d' // le token dure 7 jours par exemple
  });

  return token;
}


const app = express();

// Parser JSON
app.use(express.json());
app.use(
  '/uploads',
  express.static(
    path.join(process.cwd(), 'uploads')
  )
)
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Monter les routes sous /api/…
// Redirige vers Google
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback après login Google
import pool from './db.js';  // <- Ton fichier db.js qui gère ta connexion MySQL (comme tu fais ailleurs)
import bcrypt from 'bcryptjs'; // <- si tu ne l'as pas encore

// Callback après login Google
app.get('/api/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'https://bodymine.com/login' }),
  async (req, res, next) => {
    try {
      const { email } = req.user; // l'email récupéré de Google

      // Chercher l'utilisateur en base
      const [rows] = await pool.query(
        `SELECT patient_id, first_name, last_name, email, birth_date,
                address, city, country, phone_number, photo_url, gender,
                allergies_to_medicine, blood_group, height_cm, weight_kg, favorite_specialization
         FROM patients WHERE email = ?`,
        [email]
      );

      const user = rows[0];
      if (!user) {
        // Si aucun user trouvé → redirige vers login avec erreur
        return res.redirect('https://bodymine.com/login?error=user-not-found');
      }

      // Générer un vrai token basé sur son patient_id
      const token = jwt.sign(
        { sub: user.patient_id, role: 'patient' }, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' }
      );

      // Maintenant envoie proprement token + user au frontend
      // (propre pour ton context React)
      res.redirect(`https://bodymine.com/home?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
    } catch (err) {
      next(err);
    }
  }
);



app.use('/api/auth', authRouter);
app.use('/api/patients',      patientsRouter);
app.use('/api/professional',      professionalsRouter);
app.use('/api/chats', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/projects', projectRouter);
app.use('/api/photos', ProfessionalsPhotoRouter);
//app.use('/api/premium_subscriptions', paymentsRoutes);




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
  console.log(`🚀 Server listening on ${PORT}`)
);
