# Node.js Sequelize Authentication API

A RESTful backend service built with Node.js, Express, and Sequelize ORM. Features a split-table user authentication system (Separate `Users` and `User_Authentications` tables linked via Foreign Keys) with JWT Access/Refresh Token rotation.

---

## 🛠 Tech Stack

* **Runtime:** Node.js (v22+)
* **Framework:** Express.js
* **ORM:** Sequelize (v6)
* **CLI:** Sequelize-CLI
* **Database:** MySQL / MariaDB (or PostgreSQL)
* **Authentication:** JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
* **Environment Management:** `dotenv`

---

## 🔑 Environment Variables (`.env`)

Create a `.env` file in the root directory of your project (do not commit this file to Git):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_NAME=demo_database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DIALECT=mysql

# JWT Authentication Secrets
ACCESS_SECRET=your_super_secret_access_key_123!
REFRESH_SECRET=your_super_secret_refresh_key_456!

# Install required dependencies
npm install

# Install key project dependencies manually if needed
npm install express sequelize mysql2 dotenv jsonwebtoken bcryptjs
npm install --save-dev nodemon sequelize-cli

# Run server in development mode with hot-reloading (Nodemon)
npm run dev

# Run server in production mode
npm start

# Initialize Sequelize project structure (config, models, migrations, seeders)
npx sequelize-cli init

# Run all pending migrations
npx sequelize-cli db:migrate

# Undo the last migration applied
npx sequelize-cli db:migrate:undo

# Undo all migrations back to the initial state
npx sequelize-cli db:migrate:undo:all

# Check migration execution status
npx sequelize-cli db:migrate:status

# 1. Generate User model and base migration
npx sequelize-cli model:generate --name User --attributes first_name:string,last_name:string,email:string,phone_no:string,address:string,status:enum,salary:string

# 2. Generate UserAuthentication model and migration for split-table design
npx sequelize-cli model:generate --name UserAuthentication --attributes user_id:integer,password:string,refresh_token:text

# Create the database directly from config.js
npx sequelize-cli db:create

# Drop the database
npx sequelize-cli db:drop

# Create a new seed file
npx sequelize-cli seed:generate --name demo-user

# Run all seeders
npx sequelize-cli db:seed:all

# Undo the last seeder
npx sequelize-cli db:seed:undo

+-------------------+        1-to-1        +-----------------------+
|       Users       |  ------------------  |  User_Authentications |
+-------------------+                      +-----------------------+
| id (PK)           | <--- FK: user_id --- | id (PK)               |
| first_name        |                      | user_id (FK, Unique)  |
| last_name         |                      | password (Hashed)     |
| email             |                      | refresh_token         |
| phone_no          |                      | createdAt             |
| address           |                      | updatedAt             |
| status            |                      +-----------------------+
| salary            |
| createdAt         |
| updatedAt         |
+-------------------+