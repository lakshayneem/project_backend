import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js"
import { updateWellness, getTodayWellness,getWellnessHistory } from "../controllers/WellnessController.js";

const router = express.Router();

router.post("/update", protect, authorizeRoles("patient"), updateWellness);
router.get("/today", protect, authorizeRoles("patient"), getTodayWellness);
router.get("/history", protect, authorizeRoles("patient"), getWellnessHistory);


export default router;
