// src/routes/patients.js
import { Router } from 'express';
const router  = Router();
import { getAll, getById, create, update, remove } from '../controllers/patientsController.js';

router.get('/',     getAll);
router.get('/:id',  getById);
router.post('/',    create);
router.put('/:id',  update);
router.delete('/:id', remove);

export default router;
