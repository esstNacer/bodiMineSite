// routes/chats.routes.js
import express from 'express';
import pool    from '../db.js';
import { getMessages, sendMessage } from '../controllers/chatsController.js';

const router = express.Router();

/* -------------------------------------------------------------------- *
 *  Routes existantes                                                   *
 * -------------------------------------------------------------------- */
router.get('/',  getMessages);
router.post('/', sendMessage);

/* ==================================================================== *
 *  1) Médecins avec qui un PATIENT a déjà discuté                      *
 *  GET /api/chats/conversations/:patientId                             *
 * ==================================================================== */
router.get('/conversations/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT   p.professional_id,
               p.full_name,
               p.specialization,
               MAX(c.timestamp) AS last_message_at     -- dernière date
      FROM     chats c
      JOIN     professionals p ON p.professional_id = c.professional_id
      WHERE    c.patient_id = ?
      GROUP BY p.professional_id, p.full_name, p.specialization
      ORDER BY last_message_at DESC
      `,
      [patientId]
    );

    res.json(rows);        // ← 1 ligne = 1 professionnel
  } catch (err) {
    console.error('❌ Error fetching conversations (patient):', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ==================================================================== *
 *  2) Patients avec qui un PROFESSIONNEL a déjà discuté                *
 *  GET /api/chats/conversations/pro/:professionalId                    *
 * ==================================================================== */
router.get('/conversations/pro/:professionalId', async (req, res) => {
  try {
    const { professionalId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT   pa.patient_id,
               pa.first_name,
               pa.last_name,
               pa.photo_url,
               pa.favorite_specialization,
               MAX(c.timestamp) AS last_message_at     -- dernière date
      FROM     chats c
      JOIN     patients pa ON pa.patient_id = c.patient_id
      WHERE    c.professional_id = ?
      GROUP BY pa.patient_id,
               pa.first_name,
               pa.last_name,
               pa.photo_url,
               pa.favorite_specialization
      ORDER BY last_message_at DESC
      `,
      [professionalId]
    );

    res.json(rows);        // ← 1 ligne = 1 patient
  } catch (err) {
    console.error('❌ Error fetching conversations (pro):', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
