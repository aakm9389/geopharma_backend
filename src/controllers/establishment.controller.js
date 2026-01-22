import Establishment from "../models/MedicalEstablishment.js";

/// ==========================
/// 📥 GET ALL (PUBLIC)
/// ==========================
export const getAll = async (req, res) => {
  try {
    const { city, type } = req.query;
    const filter = {};

    // ✅ City reçue comme STRING depuis Flutter
    if (city) {
      filter.city = city;
    }

    if (type) {
      filter.type = type;
    }

    const data = await Establishment.find(filter);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/// ==========================
/// ➕ CREATE (ADMIN)
/// ==========================
export const create = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      type,
      phone,
      latitude,
      longitude,
      hasLaboratory,
      hasImaging,
      hasDialysis,
      insurances,
    } = req.body;

    // ✅ Champs obligatoires
    if (!name || !latitude || !longitude) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const data = {
      name,
      address,
      city,
      type,
      phone,

      latitude,
      longitude,

      hasLaboratory: hasLaboratory === "true",
      hasImaging: hasImaging === "true",
      hasDialysis: hasDialysis === "true",

      // ✅ Flutter envoie: "assurance1,assurance2"
      insurances: insurances ? insurances.split(",") : [],
    };

    // ✅ Image facultative (PAS DE CRASH)
    const photo = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/establishments/${req.file.filename}`
      : null;

    data.photo = photo;

    const establishment = await Establishment.create(data);

    // ✅ RÉPONSE API PROPRE (OBLIGATOIRE)
    res.status(201).json({
      id: establishment._id,
      name: establishment.name,
      latitude: establishment.latitude,
      longitude: establishment.longitude,
      photo: establishment.photo, // null ou URL
    });
  } catch (e) {
    console.error("❌ create establishment:", e);
    res.status(500).json({ message: e.message });
  }
};

/// ==========================
/// ✏️ UPDATE (ADMIN)
/// ==========================
export const update = async (req, res) => {
  try {
    const data = { ...req.body };

    // ✅ Image facultative
    if (req.file) {
      data.photo = `${req.protocol}://${req.get("host")}/uploads/establishments/${req.file.filename}`;
    }

    // ✅ Correction insurances
    if (req.body.insurances) {
      data.insurances = req.body.insurances.split(",");
    }

    const establishment = await Establishment.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!establishment) {
      return res.status(404).json({ message: "Établissement introuvable" });
    }

    res.json({
      id: establishment._id,
      name: establishment.name,
      latitude: establishment.latitude,
      longitude: establishment.longitude,
      photo: establishment.photo,
    });
  } catch (e) {
    console.error("❌ update establishment:", e);
    res.status(500).json({ message: e.message });
  }
};

/// ==========================
/// 🗑️ DELETE (ADMIN)
/// ==========================
export const remove = async (req, res) => {
  try {
    await Establishment.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
