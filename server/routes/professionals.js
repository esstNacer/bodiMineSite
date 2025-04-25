// src/routes/professionals.js
import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
  filterProfessionals,
  loginProfessional          // <── nouveau contrôleur
} from '../controllers/professionalsController.js';

const router = Router();

/* ───── filtres & CRUD ───── */
router.get ('/filter', filterProfessionals);
router.get ('/',        getAll);
router.get ('/:id',     getById);
router.post('/',        create);
router.put ('/:id',     update);
router.delete('/:id',   remove);

/* ───── authentification ───── */
router.post('/login',   loginProfessional);   // <-- nouvelle route

export default router;
