import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user with email verification
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *             required:
 *               - email
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message with instructions to check email
 *                 userId:
 *                   type: string
 *                   description: Firebase user ID
 *                 email:
 *                   type: string
 *                   description: User's email address
 *       400:
 *         description: Email is required
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post("/", userController.createUser);

export default router;
