import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

const app = express();

/* =========================
   🔐 CORS GLOBAL
========================= */
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   📂 PATH (ESM)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   🖼️ FICHIERS STATIQUES (IMAGES)
========================= */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

/* =========================
   🔐 Auth & APIs
========================= */
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes);

app.use("/api/pharmacies", pharmacyRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/establishments", establishmentRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/homecare", homecareRoutes);
app.use("/api/imaging", imagingRoutes);
app.use("/api/specialties", specialtyRoutes);
app.use("/api/dentals", dentalRoutes);

export default app;
