// ============================================
// Admin Stats Controller — Dashboard Analytics
// ============================================
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    // Total counts
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({});

    // Revenue stats
    const revenueResult = await Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // Orders by status
    const ordersByStatus = await Order.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Order.aggregate([
        { $match: { isPaid: true, createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                revenue: { $sum: '$totalPrice' },
                orders: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Top selling products (by total quantity sold)
    const topProducts = await Order.aggregate([
        { $unwind: '$orderItems' },
        {
            $group: {
                _id: '$orderItems.product',
                name: { $first: '$orderItems.name' },
                totalSold: { $sum: '$orderItems.qty' },
                revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.qty'] } },
            },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
    ]);

    // Recent orders
    const recentOrders = await Order.find({})
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(10);

    // Low stock products (less than 5 in stock)
    const lowStockProducts = await Product.find({ countInStock: { $lt: 5 } })
        .select('name countInStock price category')
        .sort({ countInStock: 1 })
        .limit(10);

    res.json({
        success: true,
        data: {
            overview: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue: totalRevenue.toFixed(2),
            },
            ordersByStatus,
            monthlyRevenue,
            topProducts,
            recentOrders,
            lowStockProducts,
        },
    });
});

module.exports = { getDashboardStats };
