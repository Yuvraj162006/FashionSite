// ============================================
// Payment Controller — Stripe Integration
// ============================================
const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntent = asyncHandler(async (req, res) => {
    const { amount, currency } = req.body;

    if (!amount || amount <= 0) {
        res.status(400);
        throw new Error('Valid payment amount is required');
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects amount in smallest currency unit (paise/cents)
        currency: currency || 'inr',
        metadata: {
            userId: req.user._id.toString(),
            userEmail: req.user.email,
        },
    });

    res.json({
        success: true,
        data: {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        },
    });
});

// @desc    Get Stripe config (publishable key)
// @route   GET /api/payment/config
// @access  Public
const getStripeConfig = asyncHandler(async (req, res) => {
    res.json({
        success: true,
        data: {
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
        },
    });
});

module.exports = {
    createPaymentIntent,
    getStripeConfig,
};
