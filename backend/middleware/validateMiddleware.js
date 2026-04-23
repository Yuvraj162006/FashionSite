// ============================================
// Input Validation Middleware (express-validator)
// ============================================
const { body, validationResult } = require('express-validator');

/**
 * Processes validation results. If errors exist, returns 400 with details.
 * Use this AFTER the validation rules in a route chain.
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(
            errors
                .array()
                .map((e) => e.msg)
                .join(', ')
        );
    }
    next();
};

// ── Registration Validation ──
const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name cannot exceed 50 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    validate,
];

// ── Login Validation ──
const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
];

// ── Product Validation ──
const validateProduct = [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('countInStock')
        .notEmpty()
        .withMessage('Stock count is required')
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
    validate,
];

// ── Review Validation ──
const validateReview = [
    body('rating')
        .notEmpty()
        .withMessage('Rating is required')
        .isFloat({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required'),
    validate,
];

// ── Order Validation ──
const validateOrder = [
    body('orderItems')
        .isArray({ min: 1 })
        .withMessage('Order must contain at least one item'),
    body('shippingAddress.address')
        .trim()
        .notEmpty()
        .withMessage('Shipping address is required'),
    body('shippingAddress.city')
        .trim()
        .notEmpty()
        .withMessage('City is required'),
    body('shippingAddress.postalCode')
        .trim()
        .notEmpty()
        .withMessage('Postal code is required'),
    body('shippingAddress.country')
        .trim()
        .notEmpty()
        .withMessage('Country is required'),
    body('paymentMethod').trim().notEmpty().withMessage('Payment method is required'),
    validate,
];

module.exports = {
    validate,
    validateRegister,
    validateLogin,
    validateProduct,
    validateReview,
    validateOrder,
};
