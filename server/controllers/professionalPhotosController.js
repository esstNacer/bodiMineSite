// server/controllers/professionalPhotosController.js
import * as model from '../models/professionalPhotoModel.js'

/**
 * GET /api/photos/pro/:professionalId
 * Récupère toutes les photos pour un pro.
 */
export async function getPhotosByProfessional(req, res) {
  try {
    const professional_id = parseInt(req.params.professionalId, 10)
    const photos = await model.findByProfessional(professional_id)
    res.json(photos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch photos' })
  }
}

/**
 * GET /api/photos
 * Récupère TOUTES les photos (si vous en avez besoin).
 */
export async function getAllPhotos(req, res) {
  try {
    const photos = await model.findAll()
    res.json(photos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch photos' })
  }
}

/**
 * POST /api/photos
 * uploadPhoto déjà en place dans votre snippet
 */
export async function uploadPhoto(req, res) {
  try {
    const professional_id = req.user.professional_id
    const type = req.body.type
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    const photo_url = `/uploads/${req.file.filename}`
    const newPhoto = await model.create({
      professional_id,
      photo_url,
      type
    })
    res.status(201).json(newPhoto)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to upload photo' })
  }
}
export async function uploadPhotoPublic(req, res) {
    try {
      const { professional_id, type } = req.body;
      console.log(req.body);
      if (!professional_id || !req.file) {
        return res.status(400).json({ error: 'Missing professional_id or file' });
      }
  
      const photo_url = `/uploads/${req.file.filename}`;
      const newPhoto = await model.create({ professional_id, photo_url, type: type || 'profile' });
  
      res.status(201).json(newPhoto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to upload photo publicly' });
    }
  }