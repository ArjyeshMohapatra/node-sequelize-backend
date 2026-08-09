const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       401:
 *         description: Unauthorized / Invalid Access Token
 */
router.get('/', authenticate, userController.getUsers);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Jane
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: jane.doe@example.com
 *               phone_no:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: 124 Tech Street, San Francisco
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *               salary:
 *                 type: string
 *                 example: "85000"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or email already exists
 *       401:
 *         description: Unauthorized / Invalid Access Token
 */
router.post('/', authenticate, userController.createUser);

module.exports = router;