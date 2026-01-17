import express from "express";
import cors from "cors";

/* 🔹 Upload & fichiers statiques */
import path from "path";
import { fileURLToPath } from "url";

/* 🔹 Middleware upload générique */
import { upload } from "./middlewares/upload.middleware.js";

/* Routes */
import authRoutes from "./routes/auth.routes.js";
import pharmacyRoutes from "./routes/pharmacy.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import establishmentRoutes from "./routes/establishment.routes.js";
import labRoutes from "./routes/lab.routes.js";
import homecareRoutes from "./routes/homecare.routes.js";
import imagingRoutes from "./routes/imaging.routes.js";
import specialtyRoutes from "./routes/specialty.routes.js";
import dentalRoutes from "./routes/dental.routes.js";
import cityRoutes from "./routes/city.routes.js";

import adminRoutes from "./routes/admin.routes.js";

// ...


const app = express();

/* 🔹 Résolution du chemin (ESM) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/// =======================
/// Middlewares globaux
/// =======================
app.use(cors());
app.use(express.json());

/* 🔹 Fichiers uploadés accessibles */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/// =======================
/// 📤 ROUTE UPLOAD IMAGE (générique)
/// =======================
app.post(
  "/api/upload",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "Aucun fichier reçu",
      });
    }
    
    res.status(200).json({
      url: `/uploads/${req.file.filename}`,
    });
  }
);

/// =======================
/// 🔐 Auth
/// =======================
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes);

/// =======================
/// 🌍 Données principales
/// =======================
app.use("/api/pharmacies", pharmacyRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/doctors", doctorRoutes);

/// 🏥 ÉTABLISSEMENTS MÉDICAUX (UNIFIÉ)
app.use("/api/establishments", establishmentRoutes);

/// 🧪 Laboratoires
app.use("/api/labs", labRoutes);

/// 🏠 Soins à domicile
app.use("/api/homecare", homecareRoutes);

/// 🖼️ Imagerie médicale
app.use("/api/imaging", imagingRoutes);

/// 👨‍⚕️ Spécialités
app.use("/api/specialties", specialtyRoutes);

/// 🦷 Cabinets dentaires
app.use("/api/dentals", dentalRoutes);

export default app;
