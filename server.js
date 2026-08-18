const express = require('express');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const helmet = require('helmet');
const cors = require('cors');
const v1Routes = require('./routes/v1');
const config = require('./config/config');

const app = express();
app.use(express.json());
app.use(cors({
    origin: config[process.env.NODE_ENV].client_url,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(helmet({
    hsts: process.env.NODE_ENV === 'production',
}));

// Health check route
app.get('/', (_req, res) => {
    res.send('API Server is running...');
});

// API Routes
app.use('/api/v1', v1Routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

startServer();

const shutdown = async () => {
    console.log('Closing HTTP server and database connection...');
    server.close(async () => {
        await sequelize.close();
        console.log('Cleanup finished. Exiting process.');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);