import { Chats } from '../models/chats.js';
import pool from '../db.js';

export const getMessages = async (req, res) => {
  try {
    const { patientId, professionalId } = req.query;
    if (!patientId || !professionalId) {
      return res.status(400).json({ error: 'Missing patientId or professionalId' });
    }

    const messages = await Chats.findByChatParticipants(patientId, professionalId);
    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendMessage = async (req, res) => {
    const { patient_id, professional_id, message, sender } = req.body;
  
    try {
      // Vérifie si une discussion existe déjà
      const [existing] = await pool.query(
        `SELECT chat_id FROM chats 
         WHERE patient_id = ? AND professional_id = ?
         LIMIT 1`,
        [patient_id, professional_id]
      );
  
      // Si elle existe, on insère simplement le nouveau message
      if (existing.length > 0) {
        await pool.query(
          `INSERT INTO chats (patient_id, professional_id, message, sender) VALUES (?, ?, ?, ?)`,
          [patient_id, professional_id, message, sender]
        );
      } else {
        // Sinon on crée la première entrée (la discussion démarre)
        await pool.query(
          `INSERT INTO chats (patient_id, professional_id, message, sender) VALUES (?, ?, ?, ?)`,
          [patient_id, professional_id, message, sender]
        );
      }
  
      res.status(201).json({ message: 'Message sent or chat created.' });
    } catch (err) {
      console.error('❌ Error sending message:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
