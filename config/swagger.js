const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Sequelize Authentication API',
      version: '1.0.0',
      description: 'RESTful API documentation with JWT authentication',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js', './routes/**/*.js'], // Scans JSDoc comments in route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;