import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";
import refreshTokenController from "../controllers/refreshTokenController.js";

router.post("/login", authController.login);
router.post("/refresh-token", refreshTokenController.refreshToken);

export default router;
