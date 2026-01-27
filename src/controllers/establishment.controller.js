import Establishment from "../models/MedicalEstablishment.js";

/// ==========================
/// 📥 GET ALL (PUBLIC)
/// ==========================
export const getAll = async (req, res) => {
  try {
    const { city, type } = req.query;
    const filter = {};

    if (city) filter.city = city;
    if (type) filter.type = type;

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
    if (!name || !city || !type || !latitude || !longitude) {
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

      // ✅ Conversion latitude/longitude → mapLocation
      mapLocation: `${latitude},${longitude}`,

      hasLaboratory: hasLaboratory === "true",
      hasImaging: hasImaging === "true",
      hasDialysis: hasDialysis === "true",

      insurances: insurances ? insurances.split(",") : [],
    };

    // ✅ Image facultative
    if (req.file) {
      data.image = `${req.protocol}://${req.get("host")}/uploads/establishments/${req.file.filename}`;
    }

    const establishment = await Establishment.create(data);

    res.status(201).json({
      id: establishment._id,
      name: establishment.name,
      mapLocation: establishment.mapLocation,
      image: establishment.image || null,
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
      data.image = `${req.protocol}://${req.get("host")}/uploads/establishments/${req.file.filename}`;
    }

    // ✅ mapLocation
    if (req.body.latitude && req.body.longitude) {
      data.mapLocation = `${req.body.latitude},${req.body.longitude}`;
    }

    // ✅ Correction insurances
        if (req.body.insurances !== undefined) {
      MedicalEstablishment.insurances = req.body.insurances;
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
      mapLocation: establishment.mapLocation,
      image: establishment.image || null,
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
