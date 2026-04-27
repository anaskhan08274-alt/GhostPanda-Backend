import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/analyzeController.js";

const router = express.Router();

// 🔥 memory storage
const upload = multer({ storage: multer.memoryStorage() });

// 🔥 API route
router.post("/", upload.single("file"), analyzeResume);

export default router;