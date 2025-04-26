// server/routes/professionalPhotos.js
import express from 'express'
import multer from 'multer'
import { authenticateProfessional } from '../middleware/auth.js'
import {
    getAllPhotos,
    getPhotosByProfessional,
    uploadPhoto,
    uploadPhotoPublic
} from '../controllers/professionalPhotosController.js'

const router = express.Router()
const upload = multer({ dest: './uploads' })

// ─── PUBLIC ───
// GET /api/photos/pro/:professionalId → liste des photos d'un pro (pas de token)
router.get('/pro/:professionalId', getPhotosByProfessional)

// POST /api/photos/public → Upload photo sans token (pour signup uniquement)
router.post('/public', upload.single('photo'), uploadPhotoPublic)

// ─── PROTECTED ───
router.use(authenticateProfessional)

// GET /api/photos → liste des photos du pro connecté
router.get('/', getAllPhotos)

// POST /api/photos → upload photo pour pro connecté
router.post('/', upload.single('photo'), uploadPhoto)

export default router
