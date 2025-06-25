// 📁 src/controllers/clinicsController.js
import { Clinics } from '../models/clinics.js';

export async function getAll(req, res, next) {
  try {
    const rows = await Clinics.findAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const row = await Clinics.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res) {
  try {
    const clinic = await Clinics.create(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
}

export async function update(req, res, next) {
  try {
    const clinic = await Clinics.update(req.params.id, req.body);
    res.json(clinic);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await Clinics.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}