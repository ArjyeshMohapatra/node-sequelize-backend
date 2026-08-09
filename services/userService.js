const { User } = require('../models');

class UserService {
    async getAllUsers() {
        return await User.findAll();
    }

    async createUser(userData) {
        return await User.create(userData);
    }
}

module.exports = new UserService();