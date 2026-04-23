// ============================================
// Coupon Routes
// ============================================
const express = require('express');
const router = express.Router();
const {
    validateCoupon,
    getActiveCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
} = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getActiveCoupons);
router.post('/validate', protect, validateCoupon);

// Admin routes
router.post('/create', protect, admin, createCoupon);
router.put('/:id', protect, admin, updateCoupon);
router.delete('/:id', protect, admin, deleteCoupon);

module.exports = router;
