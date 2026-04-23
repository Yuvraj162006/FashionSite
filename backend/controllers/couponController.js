// ============================================
// Coupon Controller
// ============================================
const asyncHandler = require('express-async-handler');
const Coupon = require('../models/Coupon');

// @desc    Validate and apply coupon
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = asyncHandler(async (req, res) => {
    const { code, orderTotal } = req.body;

    if (!code || !orderTotal) {
        res.status(400);
        throw new Error('Please provide coupon code and order total');
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
        res.status(404);
        throw new Error('Invalid coupon code');
    }

    // Check if coupon is valid
    const validityCheck = coupon.isValid();
    if (!validityCheck.valid) {
        res.status(400);
        throw new Error(validityCheck.message);
    }

    // Calculate discount
    const discountResult = coupon.calculateDiscount(orderTotal);
    
    if (discountResult.discount === 0) {
        res.status(400);
        throw new Error(discountResult.message);
    }

    res.json({
        success: true,
        data: {
            code: coupon.code,
            description: coupon.description,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            discount: discountResult.discount,
            finalTotal: orderTotal - discountResult.discount,
            message: discountResult.message,
        },
    });
});

// @desc    Get all active coupons
// @route   GET /api/coupons
// @access  Public
const getActiveCoupons = asyncHandler(async (req, res) => {
    const now = new Date();
    
    const coupons = await Coupon.find({
        isActive: true,
        validFrom: { $lte: now },
        validUntil: { $gte: now },
    }).select('-createdBy -usedCount');

    res.json({
        success: true,
        count: coupons.length,
        data: coupons,
    });
});

// @desc    Create coupon (Admin)
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.create({
        ...req.body,
        createdBy: req.user._id,
    });

    res.status(201).json({
        success: true,
        data: coupon,
    });
});

// @desc    Update coupon (Admin)
// @route   PUT /api/coupons/:id
// @access  Private/Admin
const updateCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!coupon) {
        res.status(404);
        throw new Error('Coupon not found');
    }

    res.json({
        success: true,
        data: coupon,
    });
});

// @desc    Delete coupon (Admin)
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
        res.status(404);
        throw new Error('Coupon not found');
    }

    res.json({
        success: true,
        message: 'Coupon deleted successfully',
    });
});

module.exports = {
    validateCoupon,
    getActiveCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
};
