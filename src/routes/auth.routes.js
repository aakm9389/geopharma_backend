import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },

  // ✅ PROFESSION (choisie au premier lancement)
  profession: {
    type: String,
    enum: ['doctor', 'pharmacist', 'student', 'other'],
    default: null, // 👈 très important
  },

  // 🔒 Blocage utilisateur
  isBlocked: {
    type: Boolean,
    default: false,
  },

  // 🕒 Dernière connexion
  lastLoginAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.model('User', userSchema);
