// src/controllers/ProfessionalsController.js
import  pool from '../db.js'; // adapte le chemin si besoin
import { Professionals } from '../models/professionals.js';

export async function getAll(req, res, next) {
  try {
    const rows = await Professionals.findAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const row = await Professionals.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

// controllers/professionalsController.js
export const filterProfessionals = async (req, res) => {
    try {
      const { query = '', location = '', speciality = '', country = '' } = req.query;
  
      const [rows] = await pool.query(
        `SELECT * FROM professionals WHERE
          (full_name LIKE ? OR email LIKE ?)
          AND (city LIKE ? OR ? = '')
          AND (specialization LIKE ? OR ? = '')
          AND (country LIKE ? OR ? = '')`,
        [
          `%${query}%`, `%${query}%`,
          `%${location}%`, location,
          `%${speciality}%`, speciality,
          `%${country}%`, country
        ]
      );
  
      res.json(rows);
    } catch (err) {
      console.error('❌ Error in filterProfessionals:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

export async function create(req, res, next) {
  try {
    const result = await Professionals.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    await Professionals.update(req.params.id, req.body);
    const updatedPatient = await Professionals.findById(req.params.id);
    res.json(updatedPatient); // ← retourne l'objet mis à jour  
    } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await Professionals.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
