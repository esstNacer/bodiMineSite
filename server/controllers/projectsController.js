// server/controllers/projectsController.js
import * as model from '../models/projectModel.js'

/** GET /api/projects */
export async function getAll(req, res) {
  try {
    const data = await model.findAll()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
}

/** GET /api/projects/:id */
export async function getOne(req, res) {
  try {
    const project = await model.findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
}

/** POST /api/projects */
export async function createOne(req, res) {
  try {
    const data = req.body
    const { project_id } = await model.create(data)
    const newProject = await model.findById(project_id)
    res.status(201).json(newProject)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create project' })
  }
}

/** PUT /api/projects/:id */
export async function updateOne(req, res) {
  try {
    const fields = req.body
    await model.update(req.params.id, fields)
    const updated = await model.findById(req.params.id)
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update project' })
  }
}

/** DELETE /api/projects/:id */
export async function deleteOne(req, res) {
  try {
    await model.remove(req.params.id)
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete project' })
  }
}
