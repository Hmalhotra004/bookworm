import express from "express";
import { addBook, getBooks } from "../controllers/book.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", protectRoute, addBook);
router.get("/", protectRoute, getBooks);

export default router;
