require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    access_secret: process.env.ACCESS_SECRET,
    refresh_secret: process.env.REFRESH_SECRET,
    log_level: process.env.LOG_LEVEL,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    access_secret: process.env.ACCESS_SECRET,
    refresh_secret: process.env.REFRESH_SECRET,
    log_level: process.env.LOG_LEVEL,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    access_secret: process.env.ACCESS_SECRET,
    refresh_secret: process.env.REFRESH_SECRET,
    log_level: process.env.LOG_LEVEL,
  }
};