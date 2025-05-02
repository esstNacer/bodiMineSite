import express from 'express';
import { getMessages, sendMessage } from '../controllers/chatsController.js';
import pool from '../db.js'; // <-- assure-toi que cette ligne est bien présente

const router = express.Router();

// Route existantes
router.get('/', getMessages);
router.post('/', sendMessage);

// ✅ Nouvelle route : récupérer les médecins avec qui le patient a discuté
router.get('/conversations/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const [rows] = await pool.query(`
      SELECT DISTINCT p.professional_id, p.full_name, p.specialization, c.timestamp
      FROM chats c
      JOIN professionals p ON p.professional_id = c.professional_id
      WHERE c.patient_id = ?
      ORDER BY c.timestamp DESC
    `, [patientId]);

    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching conversations:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// GET /api/chats/conversations/pro/:professionalId
router.get('/conversations/pro/:professionalId', async (req, res) => {
  try {
    const { professionalId } = req.params;

    /* ————— requête —————
       DISTINCT garantit un seul enregistrement par patient,
       mais on veut l’entrée la plus récente : on récupère d’abord
       les ids distincts triés par timestamp desc, puis on joint
       à nouveau sur patients pour les infos complètes.
       (MySQL 8+ : on pourrait utiliser ROW_NUMBER / GROUP BY avec ANY_VALUE) */
    const [rows] = await pool.query(
      `
      SELECT DISTINCT p.patient_id,
             p.first_name,
             p.last_name,
             p.photo_url,
             p.favorite_specialization,
             c.timestamp
      FROM   chats c
      JOIN   patients p ON p.patient_id = c.patient_id
      WHERE  c.professional_id = ?
      ORDER  BY c.timestamp DESC
      `,
      [professionalId]
    );

    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching conversations:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
