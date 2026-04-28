// ============================================
// Reset Admin User - Delete and Recreate
// ============================================
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const adminUser = {
    name: 'Admin User',
    email: 'admin@fashionhub.com',
    password: 'admin123456',
    role: 'admin',
    phone: '+91 9876543210',
};

const resetAdmin = async () => {
    try {
        await connectDB();

        // Delete existing admin if exists
        const existingAdmin = await User.findOne({ email: adminUser.email });
        if (existingAdmin) {
            await User.findByIdAndDelete(existingAdmin._id);
            console.log('🗑️  Deleted existing admin user');
        }

        // Create new admin user
        const admin = await User.create(adminUser);

        console.log('✅ Admin user created successfully!');
        console.log('\n📧 Admin Credentials:');
        console.log(`   Email: ${admin.email}`);
        console.log(`   Password: admin123456`);
        console.log(`   Role: ${admin.role}`);
        console.log('\n⚠️  Please change the password after first login!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error resetting admin:', error.message);
        process.exit(1);
    }
};

resetAdmin();
