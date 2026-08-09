const userService = require('../services/userService');

// Handles GET /api/v1/users
const getUsers = async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error); // Forwards error to errorHandler
  }
};

// Handles POST /api/v1/users
const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ status: 'Success', message: 'New user created' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
};