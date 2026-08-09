const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');

// Public routes
router.post('/signup', authController.register);
router.post('/signin', authController.login);
router.post('/refresh-token', authController.refreshToken);

// Protected routes (Requires Bearer Access Token)
router.post('/logout', authenticate, authController.logout);
router.delete('/delete-account', authenticate, authController.deleteAccount);

module.exports = router;