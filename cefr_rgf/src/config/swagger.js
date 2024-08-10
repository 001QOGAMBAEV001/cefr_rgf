const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'CEFR_RGF Ilovasi API',
        version: '1.0.0',
        description: 'CEFR_RGF Ilovasi API',
    },
    servers: [
        {
            url: 'https://localhost:3000',
            description: 'Development server',
        },
        {
            url: 'https://localhost:3002',
            description: 'Development server',
        },
        {
            url: 'https://kepket.uz/api/',
            description: 'Development server',
        },
    ],

    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{
        BearerAuth: [],
    }],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
    apiss: ['./src/models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;