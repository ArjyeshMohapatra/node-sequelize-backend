const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const { authLimiter } = require('../../middlewares/rateLimiter');
const { registerSchema, loginSchema, refreshTokenSchema } = require('../../validators/authValidator');
const authController = require('../../controllers/authController');
const authenticate = require('../../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management endpoints
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Alex
 *               last_name:
 *                 type: string
 *                 example: Mercer
 *               email:
 *                 type: string
 *                 example: alex.mercer@example.com
 *               password:
 *                 type: string
 *                 example: SuperSecretPassword123!
 *               phone_no:
 *                 type: string
 *                 example: "+1987654321"
 *               address:
 *                 type: string
 *                 example: 456 Innovation Way, Tech City
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *               salary:
 *                 type: number
 *                 example: "95000"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already registered or invalid input
 */
router.post('/signup', authLimiter, validate(registerSchema), authController.register);

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Authenticate existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: alex.mercer@example.com
 *               password:
 *                 type: string
 *                 example: SuperSecretPassword123!
 *     responses:
 *       200:
 *         description: Successfully logged in and token pair generated
 *       401:
 *         description: Invalid email or password
 */
router.post('/signin', authLimiter, validate(loginSchema), authController.login);

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Refresh access and refresh tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "YOUR_REFRESH_TOKEN_HERE"
 *     responses:
 *       200:
 *         description: Fresh token pair issued successfully
 *       403:
 *         description: Invalid, expired, or revoked refresh token
 */
router.post('/refresh-token',authLimiter, validate(refreshTokenSchema), authController.refreshToken);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Log out user and revoke active session
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized / Token missing or invalid
 */
router.post('/logout', authLimiter, authenticate, authController.logout);

/**
 * @swagger
 * /api/v1/auth/delete-account:
 *   delete:
 *     summary: Permanently delete user account
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account permanently deleted
 *       401:
 *         description: Unauthorized / Token missing or invalid
 */
router.delete('/delete-account',authLimiter, authenticate, authController.deleteAccount);

module.exports = router;