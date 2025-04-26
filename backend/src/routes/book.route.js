import express from "express";
import { addBook } from "../controllers/book.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", protectRoute, addBook);

export default router;
