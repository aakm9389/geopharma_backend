import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

/* =======================
   LOGIN
======================= */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // ======================
    // 🔐 ADMIN
    // ======================
    if (role === 'admin' && password === '@dmin2025') {
      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          username: email,
          email,
          role: 'admin',
          password: await bcrypt.hash(password, 10),
        });
      }

      // ✅ MAJ dernière connexion
      user.lastLoginAt = new Date();
      await user.save();

      const token = jwt.sign(
        {
          id: user._id,
          role: 'admin',
          email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({
        token,
        role: 'admin',
        email,
      });
    }

    // ======================
    // 🔐 USER
    // ======================
    if (role === 'user' && password === 'user2025') {
      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          username: email,
          email,
          role: 'user',
          password: await bcrypt.hash(password, 10),
        });
      }

      // 🔒 NOUVELLE SÉCURITÉ — COMPTE BLOQUÉ
      if (user.isBlocked) {
        return res.status(403).json({
          message: 'Compte bloqué par l’administrateur',
        });
      }

      // ✅ MAJ dernière connexion
      user.lastLoginAt = new Date();
      await user.save();

      const token = jwt.sign(
        {
          id: user._id,
          role: 'user',
          email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({
        token,
        role: 'user',
        email,
      });
    }

    return res.status(401).json({
      message: 'Email ou mot de passe incorrect',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =======================
   REGISTER
======================= */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: 'Tous les champs sont obligatoires' });
    }

    // 🔒 mot de passe imposé selon le rôle
    if (role === 'admin' && password !== 'admin2025') {
      return res
        .status(403)
        .json({ message: 'Mot de passe administrateur invalide' });
    }

    if (role === 'user' && password !== 'user2025') {
      return res
        .status(403)
        .json({ message: 'Mot de passe utilisateur invalide' });
    }

    // ❌ Email déjà utilisé
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: email,
      email,
      password: hashedPassword,
      role,
      lastLoginAt: new Date(), // ✅ premier login
    });

    await user.save();

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      role,
      email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
