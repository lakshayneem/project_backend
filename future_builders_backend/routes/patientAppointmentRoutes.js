import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  getUpcomingAppointments,
  getPastAppointments,
  getLatestNotes
} from "../controllers/patientAppointmentController.js";

const router = express.Router();

router.use(protect, authorizeRoles("patient"));

router.get("/upcoming", getUpcomingAppointments);
router.get("/history", getPastAppointments);
router.get("/notes/latest", getLatestNotes);

export default router;
