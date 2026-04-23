// ============================================
// Product Controller — CRUD, Search, Filter, Reviews
// ============================================
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products (with pagination, search, filter, sort)
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;

    // ── Build filter object ──
    const filter = {};

    // Keyword search (name, description, brand via text index)
    if (req.query.keyword) {
        filter.$or = [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
            { brand: { $regex: req.query.keyword, $options: 'i' } },
        ];
    }

    // Category filter
    if (req.query.category) {
        filter.category = req.query.category;
    }

    // Brand filter
    if (req.query.brand) {
        filter.brand = req.query.brand;
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
        if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    // Rating filter (minimum rating)
    if (req.query.rating) {
        filter.rating = { $gte: Number(req.query.rating) };
    }

    // In-stock only
    if (req.query.inStock === 'true') {
        filter.countInStock = { $gt: 0 };
    }

    // ── Build sort object ──
    let sort = {};
    switch (req.query.sort) {
        case 'price-asc':
            sort = { price: 1 };
            break;
        case 'price-desc':
            sort = { price: -1 };
            break;
        case 'rating':
            sort = { rating: -1 };
            break;
        case 'newest':
            sort = { createdAt: -1 };
            break;
        case 'name':
            sort = { name: 1 };
            break;
        default:
            sort = { createdAt: -1 };
    }

    // ── Execute query ──
    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .sort(sort)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({
        success: true,
        data: products,
        page,
        pages: Math.ceil(count / pageSize),
        total: count,
    });
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
        'reviews.user',
        'name avatar'
    );

    if (product) {
        res.json({ success: true, data: product });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, images, category, brand, countInStock } = req.body;

    const product = await Product.create({
        user: req.user._id,
        name,
        price,
        description,
        image: image || '/images/sample.jpg',
        images: images || [],
        category,
        brand: brand || 'Unbranded',
        countInStock: countInStock || 0,
    });

    res.status(201).json({ success: true, data: product });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, images, category, brand, countInStock } =
        req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name ?? product.name;
        product.price = price ?? product.price;
        product.description = description ?? product.description;
        product.image = image ?? product.image;
        product.images = images ?? product.images;
        product.category = category ?? product.category;
        product.brand = brand ?? product.brand;
        product.countInStock = countInStock ?? product.countInStock;

        const updatedProduct = await product.save();
        res.json({ success: true, data: updatedProduct });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Product deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create / add a review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Check if user already reviewed this product
    const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
        res.status(400);
        throw new Error('You have already reviewed this product');
    }

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
    };

    product.reviews.push(review);

    // Recalculate average rating
    product.numReviews = product.reviews.length;
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    await product.save();
    res.status(201).json({ success: true, message: 'Review added successfully' });
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(6);
    res.json({ success: true, data: products });
});

// @desc    Get all unique categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category');
    res.json({ success: true, data: categories });
});

// @desc    Upload product image
// @route   POST /api/products/upload
// @access  Private/Admin
const uploadProductImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No image file provided');
    }

    res.json({
        success: true,
        data: {
            url: req.file.path,
            public_id: req.file.filename,
        },
    });
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
    getCategories,
    uploadProductImage,
};
