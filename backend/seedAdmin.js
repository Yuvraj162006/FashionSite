// ============================================
// Admin Seeder — Create Default Admin User
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

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminUser.email });

        if (existingAdmin) {
            console.log('❌ Admin user already exists!');
            console.log(`   Email: ${existingAdmin.email}`);
            console.log(`   Role: ${existingAdmin.role}`);
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create(adminUser);

        console.log('✅ Admin user created successfully!');
        console.log('\n📧 Admin Credentials:');
        console.log(`   Email: ${admin.email}`);
        console.log(`   Password: admin123456`);
        console.log(`   Role: ${admin.role}`);
        console.log('\n⚠️  Please change the password after first login!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
