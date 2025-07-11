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
/**
 * POST /api/banners
 * Crée une nouvelle bannière avec image, description et URL cible
 */
export async function createBanner(req, res) {
  try {
    if (!req.file)
      return res.status(400).json({ error: 'No image uploaded' });

    const image_url = `/uploads/${req.file.filename}`;
    const { description, banner_url } = req.body;

    const newBanner = await model.create({ image_url, description, banner_url });
    res.status(201).json(newBanner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create banner' });
  }
}

/**
 * PUT /api/banners/:id
 * Met à jour une bannière existante. Peut changer l'image, la description, et l'URL cible.
 */
export async function updateBanner(req, res) {
  try {
    const banner_id = parseInt(req.params.id, 10);

    const data = {
      description: req.body.description,
      banner_url: req.body.banner_url,
    };

    // Ajoute l'image uniquement si un nouveau fichier est uploadé
    if (req.file) {
      data.image_url = `/uploads/${req.file.filename}`;
    }

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
