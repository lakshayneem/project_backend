// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";   // ⬅️ NEW
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorAppointmentRoutes from "./routes/doctorAppointmentRoutes.js";
import patientAppointmentRoutes from "./routes/patientAppointmentRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);        // ⬅️ NEW
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctor/appointments", doctorAppointmentRoutes);
app.use("/api/patient/appointments", patientAppointmentRoutes);
app.use("/api/doctor/availability", availabilityRoutes);
app.use("/api/doctors", doctorRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Future_Builders API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
