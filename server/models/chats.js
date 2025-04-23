import pool from '../db.js';

export const Chats = {
  async findByChatParticipants(patientId, professionalId) {
    const [rows] = await pool.query(
      `SELECT * FROM chats
       WHERE patient_id = ? AND professional_id = ?
       ORDER BY timestamp ASC`,
      [patientId, professionalId]
    );
    return rows;
  },

  async create({ patient_id, professional_id, message }) {
    const [result] = await pool.query(
      `INSERT INTO chats (patient_id, professional_id, message)
       VALUES (?, ?, ?)`,
      [patient_id, professional_id, message]
    );
    return { insertId: result.insertId };
  }
};
