// src/controllers/patientsController.js
import { Patients } from '../models/patients.js';

export async function getAll(req, res, next) {
  try {
    const rows = await Patients.findAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const row = await Patients.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const result = await Patients.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    await Patients.update(req.params.id, req.body);
    const updatedPatient = await Patients.findById(req.params.id);
    res.json(updatedPatient); // ← retourne l'objet mis à jour  
    } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await Patients.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
