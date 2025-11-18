import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  bookAppointment,
  patientUpcoming,
  patientHistory,
  cancelAppointment,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// -----------------------------
// PATIENT ROUTES
// -----------------------------

// Book appointment
router.post(
  "/book",
  protect,
  authorizeRoles("patient"),
  bookAppointment
);

// Patient upcoming appointments
router.get(
  "/patient/upcoming",
  protect,
  authorizeRoles("patient"),
  patientUpcoming
);

// Patient history
router.get(
  "/patient/history",
  protect,
  authorizeRoles("patient"),
  patientHistory
);

// Patient cancel appointment
router.put(
  "/cancel/:appointmentId",
  protect,
  authorizeRoles("patient"),
  cancelAppointment
);

// -----------------------------
// DOCTOR ROUTES
// -----------------------------

// Doctor accept appointment
router.put(
  "/doctor/accept/:appointmentId",
  protect,
  authorizeRoles("doctor"),
  acceptAppointment
);

// Doctor reject appointment
router.put(
  "/doctor/reject/:appointmentId",
  protect,
  authorizeRoles("doctor"),
  rejectAppointment
);

// Doctor complete appointment
router.put(
  "/doctor/complete/:appointmentId",
  protect,
  authorizeRoles("doctor"),
  completeAppointment
);

export default router;
