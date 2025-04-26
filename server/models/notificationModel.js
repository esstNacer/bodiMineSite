import pool  from '../db.js'

/**
 * Récupère toutes les notifications,
 * avec info patient (first_name, last_name, photo_url).
 */
export async function findAll() {
  const [rows] = await pool.query(`
    SELECT
      n.*,
      p.patient_id,
      p.first_name,
      p.last_name,
      p.photo_url
    FROM notifications n
    JOIN mybody_projects pr ON n.project_id = pr.project_id
    JOIN patients p             ON pr.patient_id = p.patient_id
    ORDER BY n.created_at DESC
  `)
  return rows
}

/**
 * Récupère les notifications d'un pro,
 * avec info patient (first_name, last_name, photo_url).
 */
export async function findByProfessional(professional_id) {
  const [rows] = await pool.query(`
    SELECT
      n.*,
      p.patient_id,
      p.first_name,
      p.last_name,
      p.photo_url
    FROM notifications n
    JOIN mybody_projects pr ON n.project_id = pr.project_id
    JOIN patients p             ON pr.patient_id = p.patient_id
    WHERE n.professional_id = ?
    ORDER BY n.created_at DESC
  `, [professional_id])
  console.log(rows);
  return rows
}
export async function markAllRead(professional_id) {
    await pool.query(
      `UPDATE notifications
       SET \`read\` = 1
       WHERE professional_id = ? AND \`read\` = 0`,
      [professional_id]
    )
  }

/**
 * Récupère une notification par son ID,
 * avec info patient (first_name, last_name, photo_url).
 */
export async function findById(notification_id) {
  const [rows] = await pool.query(`
    SELECT
      n.*,
      p.patient_id,
      p.first_name,
      p.last_name,
      p.photo_url
    FROM notifications n
    JOIN mybody_projects pr ON n.project_id = pr.project_id
    JOIN patients p             ON pr.patient_id = p.patient_id
    WHERE n.notification_id = ?
  `, [notification_id])
  return rows[0]
}

/**
 * Crée une nouvelle notification.
 */
export async function create({ professional_id, project_id, message, read }) {
  const [result] = 
  await pool.query(`
    INSERT INTO notifications (professional_id, project_id, message,\`read\`)
    VALUES (?, ?, ?, ?)
  `, [professional_id, project_id, message, read])
  return { notification_id: result.insertId }
}

/**
 * Met à jour une notification (`read` ou `message`).
 */
export async function update(notification_id, fields) {
  const sets = []
  const params = []
  if (fields.read !== undefined) {
    sets.push('`read` = ?')
    params.push(fields.read ? 1 : 0)
  }
  if (fields.message !== undefined) {
    sets.push('message = ?')
    params.push(fields.message)
  }
  if (!sets.length) return
  params.push(notification_id)
  await pool.query(`
    UPDATE notifications
    SET ${sets.join(', ')}
    WHERE notification_id = ?
  `, params)
}

/**
 * Supprime une notification.
 */
export async function remove(notification_id) {
  await pool.query(`
    DELETE FROM notifications WHERE notification_id = ?
  `, [notification_id])
}
