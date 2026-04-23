// ============================================
// Product Model
// ============================================
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        user: {
            // Admin who created the product
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add a product name'],
            trim: true,
        },
        brand: {
            type: String,
            default: 'Unbranded',
        },
        image: {
            type: String,
            required: [true, 'Please add an image URL'],
        },
        images: [
            {
                type: String, // Additional product images
            },
        ],
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: [0, 'Price cannot be negative'],
            default: 0,
        },
        countInStock: {
            type: Number,
            required: [true, 'Please add stock count'],
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 5,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Text index for search functionality (enables fast text search on name + description)
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
// Compound index for filtering
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model('Product', productSchema);
