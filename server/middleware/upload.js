// server/middlewares/upload.js
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);           // .jpg / .png …
    const name = crypto.randomBytes(16).toString('hex');    // Nom unique
    cb(null, `${name}${ext}`);
  },
});

export const uploadBanner = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(isValid ? null : new Error('Invalid file type'), isValid);
  },
}).single('image'); // le champ <input name="image" type="file">
