// server/models/projectModel.js
import pool from '../db.js'

/**
 * Récupère tous les projets.
 */
export async function findAll() {
  const [rows] = await pool.query(`
    SELECT *
    FROM mybody_projects
    ORDER BY created_at DESC
  `)
  return rows
}

/**
 * Récupère un projet par son ID.
 */
export async function findById(project_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM mybody_projects
    WHERE project_id = ?
  `, [project_id])
  return rows[0]
}

/**
 * Crée un nouveau projet.
 * @param {{ patient_id: number, title: string, date_line: string, budget: number, desired_surgery: string, interested_country: string, comments: string }} data
 */
export async function create(data) {
  const {
    patient_id,
    title,
    date_line,
    budget,
    desired_surgery,
    interested_country,
    comments
  } = data

  const [result] = await pool.query(`
    INSERT INTO mybody_projects
      (patient_id, title, date_line, budget, desired_surgery, interested_country, comments)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    patient_id,
    title,
    date_line,
    budget,
    desired_surgery,
    interested_country,
    comments
  ])

  return { project_id: result.insertId }
}

/**
 * Met à jour un projet.
 * @param {number} project_id
 * @param {Partial<{ patient_id: number, title: string, date_line: string, budget: number, desired_surgery: string, interested_country: string, comments: string }>} fields
 */
export async function update(project_id, fields) {
  const sets = []
  const params = []

  if (fields.patient_id !== undefined) {
    sets.push('patient_id = ?')
    params.push(fields.patient_id)
  }
  if (fields.title !== undefined) {
    sets.push('title = ?')
    params.push(fields.title)
  }
  if (fields.date_line !== undefined) {
    sets.push('date_line = ?')
    params.push(fields.date_line)
  }
  if (fields.budget !== undefined) {
    sets.push('budget = ?')
    params.push(fields.budget)
  }
  if (fields.desired_surgery !== undefined) {
    sets.push('desired_surgery = ?')
    params.push(fields.desired_surgery)
  }
  if (fields.interested_country !== undefined) {
    sets.push('interested_country = ?')
    params.push(fields.interested_country)
  }
  if (fields.comments !== undefined) {
    sets.push('comments = ?')
    params.push(fields.comments)
  }

  if (sets.length === 0) return

  params.push(project_id)
  await pool.query(`
    UPDATE mybody_projects
    SET ${sets.join(', ')}
    WHERE project_id = ?
  `, params)
}

/**
 * Supprime un projet.
 */
export async function remove(project_id) {
    // Utiliser une transaction pour garantir la cohérence
    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()
  
      // 1) Supprimer les notifications liées
      await conn.query(
        `DELETE FROM notifications WHERE project_id = ?`,
        [project_id]
      )
  
      // 2) Supprimer le projet
      await conn.query(
        `DELETE FROM mybody_projects WHERE project_id = ?`,
        [project_id]
      )
  
      await conn.commit()
    } catch (err) {
      await conn.rollback()
      throw err
    } finally {
      conn.release()
    }
  }
