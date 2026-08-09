'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserAuthentication extends Model {
    static associate(models) {
      // Define 1-to-1 association pointing back to User
      UserAuthentication.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }

  UserAuthentication.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'UserAuthentication',
    tableName: 'User_Authentications',
  });

  return UserAuthentication;
};