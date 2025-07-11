// src/controllers/ProfessionalsController.js
import  pool from '../db.js'; // adapte le chemin si besoin
import { Professionals } from '../models/professionals.js';
import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_ici';
const JWT_EXPIRES_IN  = '7d';

export async function getAll(req, res, next) {
  try {
    const rows = await Professionals.findAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
export async function getSubscriptions(req, res, next) {
  try {
    const rows = await Professionals.findSubscriptions();
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
export async function getDoctor(req, res, next) {
  try {
    const rows = await Professionals.findDoctor();
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const row = await Professionals.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

// controllers/professionalsController.js
export const filterProfessionals = async (req, res) => {
    try {
      const { query = '', location = '', speciality = '', country = '' } = req.query;
  
      const [rows] = await pool.query(
        `SELECT * FROM professionals WHERE
          (full_name LIKE ? OR email LIKE ?)
          AND (city LIKE ? OR ? = '')
          AND (specialization LIKE ? OR ? = '')
          AND (country LIKE ? OR ? = '')`,
        [
          `%${query}%`, `%${query}%`,
          `%${location}%`, location,
          `%${speciality}%`, speciality,
          `%${country}%`, country
        ]
      );
  
      res.json(rows);
    } catch (err) {
      console.error('❌ Error in filterProfessionals:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export const filterClinics = async (req, res) => {
    try {  
      const [rows] = await pool.query(
        `SELECT * FROM professionals WHERE
          (type = "clinic")`
      );
  
      res.json(rows);
    } catch (err) {
      console.error('❌ Error in filterProfessionals:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export async function loginProfessional(req, res, next) {
  try {
    const { email, password } = req.body;

    /* 1) Chercher le pro + hash en une seule requête */
    const [rows] = await pool.query(
      `SELECT professional_id          AS professional_id,
              full_name, clinic_name, city, country,
              email, phone_number, specialization,
              practice_tenure, practice_start_date,
              is_premium,
              type,
              password                   AS hashedPassword
       FROM professionals
       WHERE email = ?`,
      [email]
    );

    const row = rows[0];
    if (!row) return res.status(401).json({ error: 'Email ou mot de passe invalide' });

    /* 2) Comparer le mot de passe */
    const { hashedPassword, ...professional } = row;
    const valid = await bcrypt.compare(password, hashedPassword);
    if (!valid) return res.status(401).json({ error: 'Email ou mot de passe invalide' });

    /* 3) Générer le JWT */
    const token = jwt.sign(
      { sub: professional.professional_id, role: 'professional' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    /* 4) Répondre sans le hash */
    res.json({ token, professional });

  } catch (err) {
    next(err);
  }
}

export async function create(req, res) {
  try {
    // 1. Création dans la base
    const { insertId } = await Professionals.create(req.body);

    // 2. Récupérer le professionnel fraîchement créé
    const professional = await Professionals.findById(insertId);

    if (!professional) {
      return res.status(404).json({ error: 'Professional not found after creation' });
    }

    // 3. Créer un token JWT
    const token = jwt.sign(
      { sub: professional.professional_id, role: 'professional' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 4. Envoyer tout en réponse
    res.json({ token, professional });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating professional' });
  }
}

export async function update(req, res, next) {
  try {
    await Professionals.update(req.params.id, req.body);
    const updatedprofessional = await Professionals.findById(req.params.id);
    res.json(updatedprofessional); // ← retourne l'objet mis à jour  
    } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await Professionals.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
