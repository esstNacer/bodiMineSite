// src/models/professionals.js
import pool from "../db.js";
import bcrypt from "bcryptjs";

const formatDate = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null);

export const Professionals = {
  /* -------- READ -------- */
  findAll: async () => {
    const [rows] = await pool.query(
      `SELECT *, DATE_FORMAT(practice_start_date, '%Y-%m-%d') AS practice_start_date
       FROM professionals`
    );
    return rows;
  },

  findDoctor: async () => {
    const [rows] = await pool.query(
      `SELECT *, DATE_FORMAT(practice_start_date, '%Y-%m-%d') AS practice_start_date
       FROM professionals WHERE type = 'Professional'`
    );
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query(
      `SELECT *, DATE_FORMAT(practice_start_date, '%Y-%m-%d') AS practice_start_date
       FROM professionals WHERE professional_id = ?`,
      [id]
    );
    return rows[0];
  },

  findOne: async (email) => {
    const [rows] = await pool.query(
      `SELECT *, DATE_FORMAT(practice_start_date, '%Y-%m-%d') AS practice_start_date
       FROM professionals WHERE email = ?`,
      [email]
    );
    return rows[0];
  },

  /* -------- CREATE -------- */
  create: async (data) => {
    const {
      full_name,
      clinic_name,       // <- renommé
      city,
      country,
      email,
      password,
      phone_number,
      specialization,
      practice_tenure,
      practice_start_date,
      is_premium = false,
      type,
    } = data;

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO professionals (
        full_name, clinic_name, city, country, email, password,
        phone_number, specialization, practice_tenure, practice_start_date,
        is_premium, type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        clinic_name,
        city,
        country,
        email,
        hashedPassword,
        phone_number,
        specialization,
        practice_tenure,
        formatDate(practice_start_date),   // <- date au bon format
        is_premium,
        type,
      ]
    );

    return { insertId: result.insertId };
  },

  /* -------- UPDATE -------- */
  update: async (id, data) => {
    // Hachage du mot de passe si présent
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Formatage de la date si présent
    if (data.practice_start_date) {
      data.practice_start_date = formatDate(data.practice_start_date);
    }

    /* Génère SET col = ?, col2 = ? … */
    const fields = [];
    const values = [];

    for (const [k, v] of Object.entries(data)) {
      fields.push(`${k} = ?`);
      values.push(v);
    }
    values.push(id);

    const [result] = await pool.query(
      `UPDATE professionals SET ${fields.join(", ")} WHERE professional_id = ?`,
      values
    );
    return result;
  },

  /* -------- DELETE (transactionnelle) -------- */
  delete: async (id) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query(
        "DELETE FROM notifications WHERE professional_id = ?",
        [id]
      );
      await connection.query(
        "DELETE FROM professional_photos WHERE professional_id = ?",
        [id]
      );
      await connection.query(
        "DELETE FROM premium_subscriptions WHERE professional_id = ?",
        [id]
      );
      await connection.query(
        "DELETE FROM chats WHERE professional_id = ?",
        [id]
      );
      await connection.query(
        "DELETE FROM promotions WHERE professional_id = ?",
        [id]
      );
      await connection.query(
        "DELETE FROM premium_subscriptions_with_discount WHERE professional_id = ?",
        [id]
      );

      const [result] = await connection.query(
        "DELETE FROM professionals WHERE professional_id = ?",
        [id]
      );

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};
