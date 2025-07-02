// server/models/bannerModel.js
import db from '../db.js';

/**
 * Récupère toutes les bannières.
 */
export async function findAll() {
  const [rows] = await db.query('SELECT * FROM banners ORDER BY banner_id DESC');
  return rows;
}

/**
 * Récupère une bannière par son ID.
 * @param {number} banner_id
 */
export async function findById(banner_id) {
  const [[banner]] = await db.query('SELECT * FROM banners WHERE banner_id = ?', [banner_id]);
  return banner;
}

/**
 * Crée une nouvelle bannière.
 * @param {{ image_url: string, description?: string }} data
 */
export async function create({ image_url, description }) {
  const [result] = await db.query(
    'INSERT INTO banners (image_url, description) VALUES (?, ?)',
    [image_url, description || null]
  );
  return findById(result.insertId);
}

/**
 * Met à jour une bannière existante.
 * @param {number} banner_id
 * @param {{ image_url?: string, description?: string }} data
 */
export async function update(banner_id, { image_url, description }) {
  await db.query(
    `UPDATE banners 
     SET image_url = COALESCE(?, image_url),
         description = COALESCE(?, description)
     WHERE banner_id = ?`,
    [image_url, description, banner_id]
  );
  return findById(banner_id);
}

/**
 * Supprime une bannière.
 * @param {number} banner_id
 */
export async function remove(banner_id) {
  await db.query('DELETE FROM banners WHERE banner_id = ?', [banner_id]);
  return { message: 'Banner deleted', banner_id };
}
