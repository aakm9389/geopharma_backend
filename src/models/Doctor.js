import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specialty',
      required: true,
    },

    // 🔹 Nouveau : téléphone du médecin
    phone: {
      type: String,
      required: false,
      trim: true,
    },

    // 🔹 Nouveau : email du médecin
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
