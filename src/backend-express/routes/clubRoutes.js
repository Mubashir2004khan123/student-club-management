import express from "express";
import { getClubs, createClub, getClubById, joinClub, leaveClub } from "../controllers/clubController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getClubs);
router.post("/", protect, admin, createClub);
router.get("/:id", protect, getClubById);
router.post("/:id/join", protect, joinClub);
router.post("/:id/leave", protect, leaveClub);

export default router;
