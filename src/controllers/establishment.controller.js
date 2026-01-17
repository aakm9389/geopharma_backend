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
    const { mapLocation } = req.body;

    // ✅ Validation légère latitude,longitude
    if (mapLocation && !mapLocation.includes(",")) {
      return res.status(400).json({
        message: "mapLocation doit être au format 'lat,lng'",
      });
    }

    const data = {
      name: req.body.name,
      type: req.body.type,
      city: req.body.city, // ✅ STRING (ex: "Bamako")
      address: req.body.address,
      phone: req.body.phone,

      hasLaboratory: req.body.hasLaboratory === "true",
      hasImaging: req.body.hasImaging === "true",
      hasDialysis: req.body.hasDialysis === "true",

      // ✅ Flutter envoie: "assurance1,assurance2"
      insurances: req.body.insurances
        ? req.body.insurances.split(",")
        : [],

      mapLocation,
    };

    // ✅ Image uploadée via multer
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const e = await Establishment.create(data);
    res.status(201).json(e);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/// ==========================
/// ✏️ UPDATE (ADMIN)
/// ==========================
export const update = async (req, res) => {
  try {
    const data = { ...req.body };

    // ✅ Validation légère latitude,longitude
    if (data.mapLocation && !data.mapLocation.includes(",")) {
      return res.status(400).json({
        message: "mapLocation doit être au format 'lat,lng'",
      });
    }

    // ✅ Correction insurances
    if (req.body.insurances) {
      data.insurances = req.body.insurances.split(",");
    }

    // ✅ Image optionnelle
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const e = await Establishment.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(e);
  } catch (e) {
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
