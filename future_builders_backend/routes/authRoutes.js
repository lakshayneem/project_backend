import express from "express";
import {
  registerPatient,
  loginPatient,
  loginDoctor,
  loginAdmin,
} from "../controllers/authController.js";

const router = express.Router();

// PATIENT
router.post("/patient/register", registerPatient);
router.post("/patient/login", loginPatient);

// DOCTOR
router.post("/doctor/login", loginDoctor);

// ADMIN
router.post("/admin/login", loginAdmin);

export default router;
