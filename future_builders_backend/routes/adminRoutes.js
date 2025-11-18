// routes/adminRoutes.js
import express from "express";
import {
  createDoctor,
  getAllDoctors,
  getAllPatients,
  deleteDoctor,
  deletePatient,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// All admin routes are protected + admin-only
router.use(protect, authorizeRoles("admin"));

// Create doctor
router.post("/doctors", createDoctor);

// Get lists
router.get("/doctors", getAllDoctors);
router.get("/patients", getAllPatients);

// Delete doctor/patient by Mongo _id
router.delete("/doctors/:doctorId", deleteDoctor);
router.delete("/patients/:patientId", deletePatient);

export default router;
