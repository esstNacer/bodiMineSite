// src/models/professionals.js
import pool from '../db.js';
import bcrypt from 'bcryptjs';

export const Professionals = {
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM professionals');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query(
      'SELECT * FROM professionals WHERE professional_id = ?',
      [id]
    );
    return rows[0];
  },

  findOne: async (email) => {
    const [rows] = await pool.query(
      'SELECT * FROM professionals WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  create: async (data) => {
    const {
      full_name,
      clinic_address,
      city,
      country,
      email,
      password,
      phone_number,
      specialization,
      practice_tenure,
      practice_start_date,
      is_premium = false  // valeur par défaut si non fournie
    } = data;
  
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Insertion dans la table professionals
    const [result] = await pool.query(
      `INSERT INTO professionals (
        full_name, clinic_address, city, country, email, password,
        phone_number, specialization, practice_tenure, practice_start_date, is_premium
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        clinic_address,
        city,
        country,
        email,
        hashedPassword,
        phone_number,
        specialization,
        practice_tenure,
        practice_start_date,
        is_premium
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
      `UPDATE professionals SET ${fields.join(', ')} WHERE professional_id = ?`,
      values
    );
    return result;
  },
  

  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM professionals WHERE professional_id = ?',
      [id]
    );
    return result;
  }
};
