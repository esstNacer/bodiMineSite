// src/models/professionals.js
import pool from "../db.js";
import bcrypt from "bcryptjs";

const formatDate = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null);

export const Professionals = {
  /* -------- READ -------- */
 findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM professionals');
    return rows;
  },

  findSubscriptions: async () => {
    const [rows] = await pool.query(
      `/* ─── Professionals + abonnement actif OU, à défaut, le plus récent ─── */
SELECT
  pr.*,
  DATE_FORMAT(pr.practice_start_date, '%Y-%m-%d')           AS practice_start_date,
  ps.subscriptions_name                                     AS subscription_name,
  DATE_FORMAT(ps.end_date, '%Y-%m-%d')                      AS subscription_end,
  ps.value                                                  AS subscription_value
FROM professionals AS pr

/* sous-requête : choisi d’abord l’abonnement actif,
   sinon le dernier abonnement enregistré pour chaque pro */
LEFT JOIN (
  SELECT s1.*
  FROM premium_subscriptions AS s1
  JOIN (
        SELECT
          professional_id,
          /* date de l’abonnement actif s’il existe */
          MAX(CASE WHEN status = 'active' THEN start_date END) AS active_start,
          /* date du dernier abonnement (tous statuts confondus) */
          MAX(start_date)                                      AS last_start
        FROM premium_subscriptions
        GROUP BY professional_id
  ) AS pick
    ON pick.professional_id = s1.professional_id
   AND (
        /* on prend l’actif si présent … */
        (pick.active_start IS NOT NULL AND s1.start_date = pick.active_start)
        /* … sinon le plus récent (last_start) */
        OR
        (pick.active_start IS NULL      AND s1.start_date = pick.last_start)
       )
) AS ps
  ON ps.professional_id = pr.professional_id

ORDER BY pr.created_at DESC;
`
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
      delete data.photo_url; // 💥 Supprime ce champ virtuel

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
