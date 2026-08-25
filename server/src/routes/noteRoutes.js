import express from "express";
import {createNote , getNotes , updateNote} from "../controllers/noteControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"


const router = express.Router();

router.post("/",authMiddleware,createNote);
router.get("/", authMiddleware,getNotes);
router.put("/:id", authMiddleware , updateNote);

export default router;