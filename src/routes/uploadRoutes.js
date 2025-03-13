import express from "express";
import { getPresignedUrl } from "../controllers/uploadController.js";

const router = express.Router();

/**
 * @swagger
 * /api/uploads/presigned-url:
 *   get:
 *     summary: Generate a presigned URL for S3 upload
 *     tags: [Uploads]
 *     parameters:
 *       - in: query
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique key for the uploaded file
 *     responses:
 *       200:
 *         description: Successfully generated presigned URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 presignedUrl:
 *                   type: string
 *                 publicUrl:
 *                   type: string
 */
router.get("/presigned-url", getPresignedUrl);

export default router;
