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
    const photo = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/doctors/${req.file.filename}`
      : null; // ✅ photo facultative

    const doctor = await Doctor.create({
      ...req.body,
      photo,
    });

    // ✅ RÉPONSE API OBLIGATOIRE
    res.status(201).json({
      id: doctor._id,
      name: doctor.name,
      specialty: doctor.specialty,
      photo: doctor.photo, // null ou URL HTTPS
    });
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
      data.photo = `${req.protocol}://${req.get('host')}/uploads/doctors/${req.file.filename}`;
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Médecin introuvable' });
    }

    res.status(200).json({
      id: doctor._id,
      name: doctor.name,
      specialty: doctor.specialty,
      photo: doctor.photo,
    });
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
