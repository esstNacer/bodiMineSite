// server/controllers/bannerController.js
import * as model from '../models/bannerModel.js';

/**
 * GET /api/banners
 */
export async function getAllBanners(req, res) {
  try {
    const banners = await model.findAll();
    res.json(banners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
}

/**
 * GET /api/banners/:id
 */
export async function getBannerById(req, res) {
  try {
    const banner_id = parseInt(req.params.id, 10);
    const banner = await model.findById(banner_id);
    if (!banner) return res.status(404).json({ error: 'Banner not found' });
    res.json(banner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch banner' });
  }
}

/**
 * POST /api/banners
 * Corps multipart/form-data : fichier = 'image', description (optionnel)
 */
export async function createBanner(req, res) {
  try {
    if (!req.file)
      return res.status(400).json({ error: 'No image uploaded' });

    const image_url = `/uploads/${req.file.filename}`;
    const { description } = req.body;

    const newBanner = await model.create({ image_url, description });
    res.status(201).json(newBanner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create banner' });
  }
}

/**
 * PUT /api/banners/:id
 * Peut accepter un nouveau fichier image ou/et un nouveau texte.
 */
export async function updateBanner(req, res) {
  try {
    const banner_id = parseInt(req.params.id, 10);
    const data = {
      image_url: req.file ? `/uploads/${req.file.filename}` : undefined,
      description: req.body.description,
    };

    const updated = await model.update(banner_id, data);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update banner' });
  }
}

/**
 * DELETE /api/banners/:id
 */
export async function deleteBanner(req, res) {
  try {
    const banner_id = parseInt(req.params.id, 10);
    const result = await model.remove(banner_id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete banner' });
  }
}
