'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define 1-to-1 association with UserAuthentication
      User.hasOne(models.UserAuthentication, {
        foreignKey: 'user_id',
        as: 'authentication',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_no: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.ENUM('active', 'inactive'),
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};