import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import userService from "./services/userService.js";

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

const initializeApp = async () => {
  try {
    await userService.createDefaultUser();
    console.log("Default user check completed");
  } catch (error) {
    console.error("Error initializing default user:", error);
  }
};

initializeApp();

export default app;
