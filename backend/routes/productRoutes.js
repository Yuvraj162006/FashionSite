// ============================================
// Product Routes
// ============================================
const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
    getCategories,
    uploadProductImage,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateProduct, validateReview } = require('../middleware/validateMiddleware');
const { upload } = require('../config/cloudinary');

// Public routes (must be defined BEFORE /:id to avoid route conflict)
router.get('/top', getTopProducts);
router.get('/categories', getCategories);

// Public: list all / Admin: create new
router.route('/').get(getProducts).post(protect, admin, validateProduct, createProduct);

// Admin: upload product image
router.post('/upload', protect, admin, upload.single('image'), uploadProductImage);

// Public: get by ID / Admin: update, delete
router
    .route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

// Authenticated: add review
router.route('/:id/reviews').post(protect, validateReview, createProductReview);

module.exports = router;
