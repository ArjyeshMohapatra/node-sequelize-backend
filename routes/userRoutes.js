const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', authenticate, userController.getUsers);
router.post('/', authenticate, userController.createUser);

module.exports = router;