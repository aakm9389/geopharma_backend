import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    form: {
      type: String,
      enum: ['comprimé', 'sirop'],
      required: true,
    },

    amoCovered: {
      type: Boolean,
      default: false,
    },

    city: {
      type: String,
      required: true,
    },

    /// 🔗 LIAISON AVEC PHARMACIE
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pharmacy',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Medicine', medicineSchema);
