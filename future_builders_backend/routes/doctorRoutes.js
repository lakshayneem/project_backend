import express from "express";
import { getAllDoctors, getDoctorsBySpeciality } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/speciality/:speciality", getDoctorsBySpeciality);

export default router;
