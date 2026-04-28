// ============================================
// Admin Controller — Dashboard & Management
// ============================================
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });

    // Calculate total revenue
    const orders = await Order.find({ paymentStatus: 'Paid' });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Recent orders
    const recentOrders = await Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(5);

    // Low stock products
    const lowStockProducts = await Product.find({ countInStock: { $lt: 10 } })
        .sort({ countInStock: 1 })
        .limit(5);

    res.json({
        stats: {
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenue.toFixed(2),
            pendingOrders,
        },
        recentOrders,
        lowStockProducts,
    });
});

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
});

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
        res.status(400);
        throw new Error('Cannot delete admin users');
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
});

/**
 * @desc    Update user role
 * @route   PUT /api/admin/users/:id/role
 * @access  Private/Admin
 */
const updateUserRole = asyncHandler(async (req, res) => {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
        res.status(400);
        throw new Error('Invalid role. Must be "user" or "admin"');
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    user.role = role;
    await user.save();

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
});

/**
 * @desc    Get all products (admin view)
 * @route   GET /api/admin/products
 * @access  Private/Admin
 */
const getAdminProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
});

/**
 * @desc    Create new product
 * @route   POST /api/admin/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        category,
        price,
        discount,
        description,
        image,
        countInStock,
        brand,
    } = req.body;

    // Validation
    if (!name || !category || !price) {
        res.status(400);
        throw new Error('Please provide name, category, and price');
    }

    const product = await Product.create({
        name,
        category,
        price,
        discount: discount || 0,
        description: description || '',
        image: image || '/images/product-1.jpg',
        countInStock: countInStock || 0,
        brand: brand || 'FashionHub',
        rating: 4.5,
        numReviews: 0,
    });

    res.status(201).json(product);
});

/**
 * @desc    Update product
 * @route   PUT /api/admin/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        category,
        price,
        discount,
        description,
        image,
        countInStock,
        brand,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Update fields
    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price !== undefined ? price : product.price;
    product.discount = discount !== undefined ? discount : product.discount;
    product.description = description || product.description;
    product.image = image || product.image;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.brand = brand || product.brand;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
});

/**
 * @desc    Delete product
 * @route   DELETE /api/admin/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
});

/**
 * @desc    Get all orders (admin view)
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate('user', 'name email phone')
        .sort({ createdAt: -1 });
    res.json(orders);
});

/**
 * @desc    Update order status
 * @route   PUT /api/admin/orders/:id/status
 * @access  Private/Admin
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderStatus } = req.body;

    const validStatuses = ['Pending', 'Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
    
    if (!validStatuses.includes(orderStatus)) {
        res.status(400);
        throw new Error(`Invalid order status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    order.orderStatus = orderStatus;

    // If delivered, mark as delivered
    if (orderStatus === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
});

module.exports = {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    updateUserRole,
    getAdminProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus,
};
