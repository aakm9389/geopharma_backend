import Doctor from '../models/Doctor.js';

/// =======================================
/// 👨‍⚕️ MÉDECINS PAR SPÉCIALITÉ (PUBLIC)
/// =======================================
export const getDoctorsBySpecialty = async (req, res) => {
  try {
    const { id } = req.params;

    const doctors = await Doctor.find({ specialty: id });
    res.status(200).json(doctors);
  } catch (error) {
    console.error('❌ getDoctorsBySpecialty:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/// ===============================
/// 🛠️ ADMIN — AJOUTER
/// ===============================
export const createDoctor = async (req, res) => {
  try {
    const data = {
      ...req.body,
      photo: req.file
        ? `${BASE_URL}/uploads/doctors/${req.file.filename}`
        : undefined,
    };

    const doctor = await Doctor.create(data);
    res.status(201).json(doctor);
  } catch (error) {
    console.error('❌ createDoctor:', error);
    res.status(400).json({ message: 'Création impossible' });
  }
};

/// ===============================
/// 🛠️ ADMIN — MODIFIER
/// ===============================
export const updateDoctor = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.file) {
      data.photo = `${BASE_URL}/uploads/doctors/${req.file.filename}`;
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Médecin introuvable' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error('❌ updateDoctor:', error);
    res.status(400).json({ message: 'Mise à jour impossible' });
  }
};

/// ===============================
/// 🛠️ ADMIN — SUPPRIMER
/// ===============================
export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Médecin supprimé' });
  } catch (error) {
    console.error('❌ deleteDoctor:', error);
    res.status(400).json({ message: 'Suppression impossible' });
  }
};
