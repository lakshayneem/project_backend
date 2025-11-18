import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  addUnavailableDate,
  addUnavailableSlot,
  getAvailability
} from "../controllers/availabilityController.js";

const router = express.Router();

// Only doctor can manage availability
router.use(protect, authorizeRoles("doctor"));

router.post("/date", addUnavailableDate);
router.post("/slot", addUnavailableSlot);
router.get("/", getAvailability);

export default router;
