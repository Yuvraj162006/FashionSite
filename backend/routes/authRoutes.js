// ============================================
// Auth Routes
// ============================================
const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    addAddress,
    getUsers,
    deleteUser,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validateMiddleware');

// Public routes
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

// Protected routes (logged-in users)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/address', protect, addAddress);

// Admin routes
router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);

module.exports = router;
