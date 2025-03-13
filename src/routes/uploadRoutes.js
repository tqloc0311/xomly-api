import express from "express";
import { getPresignedUrl } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/presigned-url", getPresignedUrl);

export default router;
