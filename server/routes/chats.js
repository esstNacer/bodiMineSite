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
      SELECT DISTINCT p.professional_id, p.full_name, p.specialization
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

export default router;
