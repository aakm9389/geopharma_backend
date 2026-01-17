import express from 'express';
import {
  getSpecialties,
  getDoctorsBySpecialty,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller.js';

import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/admin.middleware.js';

const router = express.Router();

/// ===============================
/// 📌 PUBLIC
/// ===============================

// 🔹 Liste des spécialités
router.get('/specialties', getSpecialties);

// 🔹 Liste des médecins par spécialité
router.get(
  '/specialties/:id/doctors',
  getDoctorsBySpecialty
);

/// ===============================
/// 🛠️ ADMIN
/// ===============================

// ➕ Ajouter un médecin
router.post('/', requireAuth, requireAdmin, createDoctor);

// ✏️ Modifier un médecin
router.put('/:id', requireAuth, requireAdmin, updateDoctor);

// ❌ Supprimer un médecin
router.delete('/:id', requireAuth, requireAdmin, deleteDoctor);

export default router;
