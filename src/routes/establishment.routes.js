import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

import {
  getAll,
  create,
  update,
  remove,
} from "../controllers/establishment.controller.js";

const router = express.Router();

/// ==========================
/// 📥 GET — Public
/// ==========================
router.get("/", getAll);

/// ==========================
/// ➕ POST — Create establishment (ADMIN)
/// ⚠️ IMPORTANT :
/// upload.single("image")
/// 👉 le champ fichier DOIT s'appeler "image"
/// ==========================
router.post(
  "/",
  requireAuth,
  requireAdmin,
  upload.single("image"), // ✅ MATCH FLUTTER
  create
);

/// ==========================
/// ✏️ PUT — Update establishment (ADMIN)
/// ==========================
router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  upload.single("image"), // ✅ MATCH FLUTTER
  update
);

/// ==========================
/// 🗑️ DELETE — Remove establishment (ADMIN)
/// ==========================
router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  remove
);

export default router;
