const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorMiddleware = require('./middleware/error');

const authRoutes = require('./routes/authRoutes');
const streamRoutes = require('./routes/streamRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const learningRoutes = require('./routes/learningRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Swagger dokumentatsiyasi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routelar
app.use('/api/auth', authRoutes);
app.use('/api/streams', streamRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/tests', testRoutes);

// 404 xatosi uchun
app.all('*', (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// Xatolarni qayta ishlash
app.use(errorMiddleware);

module.exports = app;