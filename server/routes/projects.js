// server/routes/projects.js
import express from 'express'
import * as ctrl from '../controllers/projectsController.js'

const router = express.Router()

router.get('/',      ctrl.getAll)
router.get('/:id',   ctrl.getOne)
router.post('/',     ctrl.createOne)
router.put('/:id',   ctrl.updateOne)
router.delete('/:id',ctrl.deleteOne)

export default router
