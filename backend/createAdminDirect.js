// ============================================
// Create Admin User Directly
// ============================================
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const createAdmin = async () => {
    try {
        await connectDB();

        const User = require('./models/User');

        // Delete existing admin
        await User.deleteOne({ email: 'admin@fashionhub.com' });
        console.log('🗑️  Deleted existing admin (if any)');

        // Hash password manually
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash('admin123456', salt);

        // Create admin directly
        const admin = new User({
            name: 'Admin User',
            email: 'admin@fashionhub.com',
            password: hashedPassword,
            role: 'admin',
            phone: '+91 9876543210',
        });

        // Save without triggering pre-save hook
        await admin.save({ validateBeforeSave: true });

        console.log('✅ Admin user created successfully!');
        console.log('\n📧 Admin Credentials:');
        console.log(`   Email: admin@fashionhub.com`);
        console.log(`   Password: admin123456`);
        console.log(`   Role: ${admin.role}`);
        console.log('\n🔐 Password is properly hashed in database\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        console.error(error);
        process.exit(1);
    }
};

createAdmin();
