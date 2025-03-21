import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
app.use("/api/uploads", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;
