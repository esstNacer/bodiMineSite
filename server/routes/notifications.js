import express from 'express'
import * as ctrl from '../controllers/notificationsController.js'

const router = express.Router()

router.get('/',                         ctrl.getAll)
router.get('/pro/:professionalId',     ctrl.getByProfessional)
router.put('/pro/:professionalId/mark-read', ctrl.markAllRead)
router.get('/:id',                      ctrl.getOne)
router.post('/',                       ctrl.createOne)
router.put('/:id',                     ctrl.updateOne)
router.delete('/:id',                  ctrl.deleteOne)

export default router
