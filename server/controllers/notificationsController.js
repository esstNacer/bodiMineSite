// server/controllers/notificationsController.js
import * as model from '../models/notificationModel.js'

/** GET /api/notifications */
export async function getAll(req, res) {
  try {
    const data = await model.findAll()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch notifications' })
  }
}

/** GET /api/notifications/pro/:professionalId */
export async function getByProfessional(req, res) {
  try {
    const data = await model.findByProfessional(req.params.professionalId)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch notifications for professional' })
  }
}

/** GET /api/notifications/:id */
export async function getOne(req, res) {
  try {
    const notif = await model.findById(req.params.id)
    if (!notif) return res.status(404).json({ error: 'Not found' })
    res.json(notif)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch notification' })
  }
}

/** POST /api/notifications */
export async function createOne(req, res) {
  try {
    const { professional_id, project_id, message, read } = req.body
    const { notification_id } = await model.create({ professional_id, project_id, message , read})
    const newNotif = await model.findById(notification_id)
    res.status(201).json(newNotif)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create notification' })
  }
}

/** PUT /api/notifications/:id */
export async function updateOne(req, res) {
  try {
    const fields = {}
    if (req.body.read !== undefined) fields.read = req.body.read
    if (req.body.message !== undefined) fields.message = req.body.message
    await model.update(req.params.id, fields)
    const updated = await model.findById(req.params.id)
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update notification' })
  }
}

/** DELETE /api/notifications/:id */
export async function deleteOne(req, res) {
  try {
    await model.remove(req.params.id)
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete notification' })
  }
}
export async function markAllRead(req, res) {
    try {
      const proId = req.params.professionalId
      await model.markAllRead(proId)
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to mark all as read' })
    }
  }