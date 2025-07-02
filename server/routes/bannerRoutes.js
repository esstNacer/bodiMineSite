// server/routes/bannerRoutes.js
import { Router } from 'express';
import * as controller from '../controllers/bannerController.js';
import { uploadBanner } from '../middlewares/upload.js';

const router = Router();

// Liste et création
router
  .route('/')
  .get(controller.getAllBanners)           // GET /api/banners
  .post(uploadBanner, controller.createBanner); // POST /api/banners

// Détails, mise à jour, suppression
router
  .route('/:id')
  .get(controller.getBannerById)          // GET /api/banners/42
  .put(uploadBanner, controller.updateBanner)   // PUT /api/banners/42
  .delete(controller.deleteBanner);       // DELETE /api/banners/42

export default router;
