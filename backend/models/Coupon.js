// ============================================
// Coupon Model
// ============================================
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, 'Please add a coupon code'],
            unique: true,
            uppercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        discountType: {
            type: String,
            enum: ['percentage', 'fixed'],
            required: true,
            default: 'percentage',
        },
        discountValue: {
            type: Number,
            required: [true, 'Please add discount value'],
            min: [0, 'Discount cannot be negative'],
        },
        minPurchase: {
            type: Number,
            default: 0,
        },
        maxDiscount: {
            type: Number, // For percentage discounts
            default: null,
        },
        usageLimit: {
            type: Number,
            default: null, // null means unlimited
        },
        usedCount: {
            type: Number,
            default: 0,
        },
        validFrom: {
            type: Date,
            default: Date.now,
        },
        validUntil: {
            type: Date,
            required: [true, 'Please add expiry date'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        applicableCategories: [
            {
                type: String,
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Method to check if coupon is valid
couponSchema.methods.isValid = function () {
    const now = new Date();
    
    if (!this.isActive) return { valid: false, message: 'Coupon is inactive' };
    if (now < this.validFrom) return { valid: false, message: 'Coupon not yet valid' };
    if (now > this.validUntil) return { valid: false, message: 'Coupon has expired' };
    if (this.usageLimit && this.usedCount >= this.usageLimit) {
        return { valid: false, message: 'Coupon usage limit reached' };
    }
    
    return { valid: true, message: 'Coupon is valid' };
};

// Method to calculate discount
couponSchema.methods.calculateDiscount = function (orderTotal) {
    if (orderTotal < this.minPurchase) {
        return {
            discount: 0,
            message: `Minimum purchase of ₹${this.minPurchase} required`,
        };
    }

    let discount = 0;
    if (this.discountType === 'percentage') {
        discount = (orderTotal * this.discountValue) / 100;
        if (this.maxDiscount && discount > this.maxDiscount) {
            discount = this.maxDiscount;
        }
    } else {
        discount = this.discountValue;
    }

    return {
        discount: Math.min(discount, orderTotal),
        message: 'Discount applied successfully',
    };
};

module.exports = mongoose.model('Coupon', couponSchema);
