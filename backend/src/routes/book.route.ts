import express from "express";
import { addBook } from "../controllers/book.controller";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

router.post("/add", protectRoute, addBook);

export default router;
