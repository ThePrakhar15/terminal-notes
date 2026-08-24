import express from "express";
import {createNote} from "../controllers/noteControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/",authMiddleware,createNote);

export default router;