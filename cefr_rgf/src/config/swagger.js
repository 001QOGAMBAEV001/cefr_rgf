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
            url: 'http://localhost:3000/api',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;