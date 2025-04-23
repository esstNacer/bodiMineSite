import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_ici';
const JWT_EXPIRES_IN = '2h';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // 1) Rechercher le patient avec tous ses champs utiles
    const [rows] = await pool.query(
      `SELECT patient_id, first_name, last_name, email, birth_date,
              address, city, country, phone_number, photo_url, gender,
              allergies_to_medicine, blood_group, height_cm, weight_kg, favorite_specialization
       FROM patients WHERE email = ?`,
      [email]
    );

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe invalide' });
    }

    // 2) Récupérer également le mot de passe haché
    const [[{ password: hashedPassword }]] = await pool.query(
      'SELECT password FROM patients WHERE patient_id = ?',
      [user.patient_id]
    );

    // 3) Vérifier le mot de passe
    const valid = await bcrypt.compare(password, hashedPassword);
    if (!valid) {
      return res.status(401).json({ error: 'Email ou mot de passe invalide' });
    }

    // 4) Générer le token
    const token = jwt.sign(
      { sub: user.patient_id, role: 'patient' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // 5) Envoyer token + infos utilisateur (sans mot de passe)
    res.json({ token, user });

  } catch (err) {
    next(err);
  }
}
