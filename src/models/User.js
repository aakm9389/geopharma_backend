import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: String,

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },

  // 🕒 Dernière connexion
  lastLoginAt: {
    type: Date,
    default: null,
  },

  // 🔒 Blocage utilisateur
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('User', userSchema);
