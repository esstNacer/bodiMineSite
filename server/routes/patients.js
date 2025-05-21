// src/routes/patients.js
import { Router } from 'express';
const router  = Router();
import multer from 'multer';
import { authenticatePatient } from '../middleware/auth.js';
import { getAll, getById, create, update, remove, uploadProfilePhoto, uploadProfilePhotoPublic } from '../controllers/patientsController.js';
const upload = multer({ dest: './uploads' });

router.get('/',     getAll);
router.get('/:id',  getById);
router.post('/',    create);
router.put('/:id',  update);
router.delete('/:id', remove);

/* ───────── PUBLIC ───────── */
router.post(
  '/public',
  upload.single('photo'),
  uploadProfilePhotoPublic
);

/* ───────── PROTECTED ──────── */
router.use(authenticatePatient);

router.post(
  '/photo',
  upload.single('photo'),
  uploadProfilePhoto
);

export default router;
