import multer from 'multer';
import path from 'path';
import fs from 'fs';

/// ==========================
/// 📁 DOSSIERS (FIX ENOENT)
/// ==========================
const uploadRoot = 'uploads';
const dentalDir = path.join(uploadRoot, 'dentals');

// ✅ Créer uploads/
if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}

// ✅ Créer uploads/dentals/
if (!fs.existsSync(dentalDir)) {
  fs.mkdirSync(dentalDir, { recursive: true });
}

/// ==========================
/// 🦷 CABINETS DENTAIRES (ANCIEN — CONSERVÉ)
/// ==========================
const dentalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dentalDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `dental-${Date.now()}${ext}`);
  },
});

/// ==========================
/// 📦 STOCKAGE UNIFIÉ (NOUVEAU)
/// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadRoot);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

/// ==========================
/// 🛡️ FILTRE IMAGE (FLUTTER WEB FIX)
/// ==========================
const fileFilter = (req, file, cb) => {
  const allowedExt = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();

  // ✅ Flutter Web + Mobile compatible
  if (
    allowedExt.includes(ext) ||
    (file.mimetype && file.mimetype.startsWith('image/'))
  ) {
    cb(null, true);
  } else {
    cb(new Error('Fichier non autorisé'), false);
  }
};

/// ==========================
/// 📤 EXPORTS
/// ==========================

// ✅ Ancien upload dentaire (CONSERVÉ)
export const uploadDentalImage = multer({
  storage: dentalStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// ✅ Upload unifié (établissements médicaux)
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
