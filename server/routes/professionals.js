// src/routes/professionals.js
import { Router } from 'express';
const router  = Router();
import { getAll, getById, create, update, remove, filterProfessionals } from '../controllers/professionalsController.js';
router.get('/filter', filterProfessionals);
router.get('/',     getAll);
router.get('/:id',  getById);
router.post('/',    create);
router.put('/:id',  update);
router.delete('/:id', remove);
// routes/professionals.js



export default router;
