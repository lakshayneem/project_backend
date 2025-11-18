import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  getPendingAppointments,
  getAcceptedAppointments,
  getCompletedAppointments,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
} from "../controllers/doctorAppointmentController.js";

const router = express.Router();

// All doctor routes protected + doctor-only
router.use(protect, authorizeRoles("doctor"));

// View different appointment types
router.get("/pending", getPendingAppointments);
router.get("/accepted", getAcceptedAppointments);
router.get("/completed", getCompletedAppointments);

// Actions
router.put("/accept/:appointmentId", acceptAppointment);
router.put("/reject/:appointmentId", rejectAppointment);
router.put("/complete/:appointmentId", completeAppointment);

export default router;
