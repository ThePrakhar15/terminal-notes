import express from "express";
import {createNote} from "../controllers/noteControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { getNotes } from "../controllers/getNotesController.js";

const router = express.Router();

router.post("/",authMiddleware,createNote);
router.get("/", authMiddleware,getNotes);

export default router;