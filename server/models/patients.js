// src/models/patients.js
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_ici';
const JWT_EXPIRES_IN = '2h';

export const Patients = {
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM patients');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query(
      'SELECT * FROM patients WHERE patient_id = ?',
      [id]
    );
    return rows[0];
  },

  create: async (data) => {
    const {
      first_name, last_name, photo_url, birth_date,
      address, city, country, email, password,
      phone_number, allergies_to_medicine,
      blood_group, height_cm, weight_kg,
      gender, favorite_specialization
    } = data;
  
    // 1) Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // 2) Insérer l'utilisateur
    const [result] = await pool.query(
      `INSERT INTO patients
        (first_name, last_name, photo_url, birth_date,
         address, city, country, email, password,
         phone_number, allergies_to_medicine, blood_group,
         height_cm, weight_kg, gender, favorite_specialization)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        photo_url,
        birth_date,
        address,
        city,
        country,
        email,
        hashedPassword,
        phone_number,
        allergies_to_medicine,
        blood_group,
        height_cm,
        weight_kg,
        gender,
        favorite_specialization
      ]
    );
  
    // 3) Récupérer l'utilisateur créé
    const [rows] = await pool.query(
      'SELECT * FROM patients WHERE patient_id = ?',
      [result.insertId]
    );
    const user = rows[0];
  
    // 4) Générer un token JWT
    const token = jwt.sign(
      { sub: user.patient_id, role: 'patient' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  
    // 5) Retourner l'utilisateur + token (pas envoyer res.json ici)
    return { token, user };
  },
  

  update: async (id, data) => {
    const fields = [];
    const values = [];
  
    // Si on reçoit un nouveau password, on le hache aussi
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
  
    // 🔧 Corriger le format de la date
    if (data.birth_date && data.birth_date.includes('T')) {
      data.birth_date = data.birth_date.split('T')[0];
    }
  
    for (const [k, v] of Object.entries(data)) {
      fields.push(`${k} = ?`);
      values.push(v);
    }
  
    values.push(id);
  
    const [result] = await pool.query(
      `UPDATE patients SET ${fields.join(', ')} WHERE patient_id = ?`,
      values
    );
    return result;
  },
 updatePhoto: async (patient_id, photo_url) => {
  console.log(patient_id);
  await pool.query(
    `UPDATE patients
     SET first_name = ?
     WHERE patient_id = ?`,
    [photo_url, patient_id]
  );

  return { patient_id, photo_url };
},
  

  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM patients WHERE patient_id = ?',
      [id]
    );
    return result;
  }
};
