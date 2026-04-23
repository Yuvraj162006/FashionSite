// ============================================
// Cart Controller — Get, Add, Update, Remove, Clear
// ============================================
const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
        'cartItems.product',
        'name price image countInStock'
    );

    if (!cart) {
        cart = await Cart.create({ user: req.user._id, cartItems: [] });
    }

    res.json({ success: true, data: cart });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId) {
        res.status(400);
        throw new Error('Product ID is required');
    }

    // Verify product exists and is in stock
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const qty = Number(quantity) || 1;

    if (qty > product.countInStock) {
        res.status(400);
        throw new Error(`Only ${product.countInStock} items available in stock`);
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, cartItems: [] });
    }

    // Check if product already exists in cart
    const existingIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
    );

    if (existingIndex > -1) {
        // Update quantity
        cart.cartItems[existingIndex].quantity += qty;
    } else {
        // Add new item
        cart.cartItems.push({ product: productId, quantity: qty });
    }

    await cart.save();

    // Return populated cart
    cart = await Cart.findOne({ user: req.user._id }).populate(
        'cartItems.product',
        'name price image countInStock'
    );

    res.status(201).json({ success: true, data: cart });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const qty = Number(quantity);

    if (!qty || qty < 1) {
        res.status(400);
        throw new Error('Quantity must be at least 1');
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === req.params.productId
    );

    if (itemIndex === -1) {
        res.status(404);
        throw new Error('Item not found in cart');
    }

    cart.cartItems[itemIndex].quantity = qty;
    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
        'cartItems.product',
        'name price image countInStock'
    );

    res.json({ success: true, data: updatedCart });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    const initialLength = cart.cartItems.length;
    cart.cartItems = cart.cartItems.filter(
        (item) => item.product.toString() !== req.params.productId
    );

    if (cart.cartItems.length === initialLength) {
        res.status(404);
        throw new Error('Item not found in cart');
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
        'cartItems.product',
        'name price image countInStock'
    );

    res.json({ success: true, data: updatedCart });
});

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = [];
        await cart.save();
    }

    res.json({ success: true, message: 'Cart cleared', data: { cartItems: [] } });
});

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
