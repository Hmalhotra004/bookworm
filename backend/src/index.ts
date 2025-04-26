import "dotenv/config";
import express from "express";
import { connectDB } from "./lib/db";
import authRoutes from "./routes/auth.route";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
