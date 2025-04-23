// src/models/patients.js
import pool from '../db.js';
import bcrypt from 'bcryptjs';

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

    // 2) Insérer en base avec le mot de passe haché
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
        hashedPassword,          // ← on utilise le hash ici
        phone_number,
        allergies_to_medicine,
        blood_group,
        height_cm,
        weight_kg,
        gender,
        favorite_specialization
      ]
    );

    return { insertId: result.insertId };
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
  

  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM patients WHERE patient_id = ?',
      [id]
    );
    return result;
  }
};
