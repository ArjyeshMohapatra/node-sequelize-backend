'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Password123!', 10);

    // 1. Seed users table
    await queryInterface.bulkInsert('users', [
      {
        id: 2,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_no: '9876543210',
        address: '123 Tech Street',
        status: 'active',
        salary: 75000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        phone_no: '9876543211',
        address: '456 Innovation Ave',
        status: 'active',
        salary: 85000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // 2. Seed linked user_authentications table
    await queryInterface.bulkInsert('user_authentications', [
      {
        user_id: 2,
        password: hashedPassword,
        refresh_token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        password: hashedPassword,
        refresh_token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Revert in reverse order to respect Foreign Key constraints
    await queryInterface.bulkDelete('user_authentications', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};