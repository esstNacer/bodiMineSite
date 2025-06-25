// 📁 src/models/clinics.js
import pool from '../db.js';
import geocodeAddress from '../utils/geocode.js';

export const Clinics = {
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM clinics');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM clinics WHERE clinic_id = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const { name, address, city, country, email, phone_number } = data;

    const fullAddress = `${address}, ${city}, ${country}`;
    const coords = await geocodeAddress(fullAddress);

    const [result] = await pool.query(
      `INSERT INTO clinics (name, address, city, country, email, phone_number, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        address,
        city,
        country,
        email,
        phone_number,
        coords?.latitude || null,
        coords?.longitude || null
      ]
    );

    const [rows] = await pool.query('SELECT * FROM clinics WHERE clinic_id = ?', [result.insertId]);
    return rows[0];
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    for (const [k, v] of Object.entries(data)) {
      fields.push(`${k} = ?`);
      values.push(v);
    }

    values.push(id);
    await pool.query(`UPDATE clinics SET ${fields.join(', ')} WHERE clinic_id = ?`, values);
    const [updated] = await pool.query('SELECT * FROM clinics WHERE clinic_id = ?', [id]);
    return updated[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM clinics WHERE clinic_id = ?', [id]);
  }
};