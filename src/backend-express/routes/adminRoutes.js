import express from "express";
import { getApplications, approveApplication, rejectApplication, getStudents } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/applications", protect, admin, getApplications);
router.put("/applications/:id/approve", protect, admin, approveApplication);
router.put("/applications/:id/reject", protect, admin, rejectApplication);
router.get("/students", protect, admin, getStudents);

export default router;
