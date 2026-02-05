// backend/src/routes/admin.notification.routes.js
import express from 'express';
import Notification from '../models/Notification.js';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

/// 📤 Créer une notification (ADMIN UNIQUEMENT)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      message,
      targetRoles,
      targetProfessions,
      isGlobal,
    } = req.body;

    // Création notification
    const notification = await Notification.create({
      title,
      message,
      targetRoles: targetRoles || [],
      targetProfessions: targetProfessions || [],
      isGlobal: isGlobal || false,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: 'Notification créée avec succès',
      notification,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur création notification' });
  }
});

export default router;
