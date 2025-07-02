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

export async function create(req, res) {
  try {
    const { token, user } = await Patients.create(req.body);
    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
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
export async function uploadProfilePhoto(req, res) {
  try {
    const patient_id = req.user.patient_id;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const photo_url = `/uploads/${req.file.filename}`;

    await Patients.updatePhoto(patient_id, photo_url);
    

    res.status(200).json({photo_url});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
}
export async function uploadProfilePhotoPublic(req, res) {
  try {
    const { patient_id } = req.body;

    if (!patient_id || !req.file) {
      return res
        .status(400)
        .json({ error: 'Missing patient_id or file' });
    }

    const photo_url = `/uploads/${req.file.filename}`;
    await Patients.updatePhoto(patient_id, photo_url);

    res.status(201).json({photo_url });  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload photo publicly' });
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
