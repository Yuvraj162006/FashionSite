// ============================================
// FashionHub Backend — Server Entry Point
// ============================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// ── Route imports ──
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const couponRoutes = require('./routes/couponRoutes');

// ── Connect to MongoDB ──
connectDB();

const app = express();

// ── Global Middleware ──

// Rate limiting — prevent brute-force & DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, // Only 20 login/register attempts per 15 min
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later',
    },
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS — allow frontend to connect
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    })
);

// Cookie parser
app.use(cookieParser());

// HTTP request logger (only in development)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── API Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/coupons', couponRoutes);

// ── Health check ──
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'FashionHub API is running',
        version: '1.0.0',
        docs: '/api-docs (coming soon)',
    });
});

// ── Error handling ──
app.use(notFound);
app.use(errorHandler);

// ── Start server ──
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n🚀 FashionHub API Server`);
    console.log(`   Environment : ${process.env.NODE_ENV}`);
    console.log(`   Port        : ${PORT}`);
    console.log(`   URL         : http://localhost:${PORT}\n`);
});
