// ============================================
// Wishlist Controller — Add, Remove, Get
// ============================================
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate(
        'wishlist',
        'name price image rating numReviews category countInStock'
    );

    res.json({ success: true, data: user.wishlist });
});

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        res.status(400);
        throw new Error('Product ID is required');
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const user = await User.findById(req.user._id);

    // Check if already in wishlist
    if (user.wishlist.includes(productId)) {
        res.status(400);
        throw new Error('Product is already in your wishlist');
    }

    user.wishlist.push(productId);
    await user.save();

    // Return populated wishlist
    const updatedUser = await User.findById(req.user._id).populate(
        'wishlist',
        'name price image rating numReviews category countInStock'
    );

    res.status(201).json({ success: true, data: updatedUser.wishlist });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    const initialLength = user.wishlist.length;
    user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== req.params.productId
    );

    if (user.wishlist.length === initialLength) {
        res.status(404);
        throw new Error('Product not found in wishlist');
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id).populate(
        'wishlist',
        'name price image rating numReviews category countInStock'
    );

    res.json({ success: true, data: updatedUser.wishlist });
});

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
};
