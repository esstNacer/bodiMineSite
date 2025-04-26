// server/models/professionalPhotoModel.js
import pool from '../db.js'

export async function findByProfessional(professional_id) {
  const [rows] = await pool.query(
    `SELECT * 
     FROM professional_photos 
     WHERE professional_id = ?
     ORDER BY created_at DESC`,
    [professional_id]
  )
  return rows
}

export async function findAll() {
  const [rows] = await pool.query(
    `SELECT * 
     FROM professional_photos
     ORDER BY created_at DESC`
  )
  return rows
}

export async function create({ professional_id, photo_url, type }) {
  const [result] = await pool.query(
    `INSERT INTO professional_photos (professional_id, photo_url, type)
     VALUES (?, ?, ?)`,
    [professional_id, photo_url, type]
  )
  return { photo_id: result.insertId, professional_id, photo_url, type }
}
