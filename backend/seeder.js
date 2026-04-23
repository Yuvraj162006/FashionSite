// ============================================
// Database Seeder — Populate with Sample Data
// ============================================
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');
const Coupon = require('./models/Coupon');
const moreProducts = require('./data/moreProducts');
const massiveProducts = require('./data/massiveProducts');

// Sample Users
const users = [
    {
        name: 'Admin User',
        email: 'admin@fashionhub.com',
        password: 'admin123',
        role: 'admin',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
    },
];

// Sample Products
const products = [
    {
        name: 'Classic White T-Shirt',
        brand: 'FashionHub Basics',
        image: '/images/product-1.jpg',
        images: ['/images/product-1.jpg'],
        description: 'Premium quality cotton t-shirt with a comfortable fit. Perfect for everyday wear.',
        category: 'Clothing',
        price: 29.99,
        countInStock: 50,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Denim Jeans - Slim Fit',
        brand: 'Urban Style',
        image: '/images/product-2.jpg',
        images: ['/images/product-2.jpg'],
        description: 'Stylish slim-fit denim jeans with stretch fabric for maximum comfort.',
        category: 'Clothing',
        price: 79.99,
        countInStock: 30,
        rating: 4.7,
        numReviews: 24,
    },
    {
        name: 'Leather Jacket',
        brand: 'Premium Leather Co.',
        image: '/images/product-3.jpg',
        images: ['/images/product-3.jpg'],
        description: 'Genuine leather jacket with modern design. Perfect for all seasons.',
        category: 'Clothing',
        price: 199.99,
        countInStock: 15,
        rating: 4.9,
        numReviews: 8,
    },
    {
        name: 'Running Shoes',
        brand: 'SportMax',
        image: '/images/product-4.jpg',
        images: ['/images/product-4.jpg'],
        description: 'Lightweight running shoes with excellent cushioning and support.',
        category: 'Footwear',
        price: 89.99,
        countInStock: 40,
        rating: 4.6,
        numReviews: 35,
    },
    {
        name: 'Casual Sneakers',
        brand: 'StreetWear',
        image: '/images/product-5.jpg',
        images: ['/images/product-5.jpg'],
        description: 'Trendy casual sneakers perfect for everyday wear.',
        category: 'Footwear',
        price: 69.99,
        countInStock: 60,
        rating: 4.4,
        numReviews: 18,
    },
    {
        name: 'Leather Wallet',
        brand: 'Luxury Goods',
        image: '/images/product-6.jpg',
        images: ['/images/product-6.jpg'],
        description: 'Premium leather wallet with multiple card slots and coin pocket.',
        category: 'Accessories',
        price: 49.99,
        countInStock: 100,
        rating: 4.8,
        numReviews: 42,
    },
    {
        name: 'Sunglasses - Aviator',
        brand: 'Vision Pro',
        image: '/images/product-7.jpg',
        images: ['/images/product-7.jpg'],
        description: 'Classic aviator sunglasses with UV protection.',
        category: 'Accessories',
        price: 39.99,
        countInStock: 75,
        rating: 4.3,
        numReviews: 15,
    },
    {
        name: 'Smart Watch',
        brand: 'TechWear',
        image: '/images/product-8.jpg',
        images: ['/images/product-8.jpg'],
        description: 'Feature-rich smartwatch with fitness tracking and notifications.',
        category: 'Electronics',
        price: 249.99,
        countInStock: 25,
        rating: 4.7,
        numReviews: 56,
    },
    {
        name: 'Wireless Earbuds',
        brand: 'AudioMax',
        image: '/images/product-9.jpg',
        images: ['/images/product-9.jpg'],
        description: 'Premium wireless earbuds with noise cancellation.',
        category: 'Electronics',
        price: 129.99,
        countInStock: 45,
        rating: 4.6,
        numReviews: 67,
    },
    {
        name: 'Backpack - Travel',
        brand: 'Adventure Gear',
        image: '/images/product-10.jpg',
        images: ['/images/product-10.jpg'],
        description: 'Durable travel backpack with multiple compartments.',
        category: 'Accessories',
        price: 59.99,
        countInStock: 35,
        rating: 4.5,
        numReviews: 28,
    },
    {
        name: 'Formal Shirt - Blue',
        brand: 'Business Attire',
        image: '/images/product-11.jpg',
        images: ['/images/product-11.jpg'],
        description: 'Professional formal shirt perfect for office wear.',
        category: 'Clothing',
        price: 44.99,
        countInStock: 55,
        rating: 4.4,
        numReviews: 19,
    },
    {
        name: 'Sports Cap',
        brand: 'Athletic Wear',
        image: '/images/product-12.jpg',
        images: ['/images/product-12.jpg'],
        description: 'Comfortable sports cap with adjustable strap.',
        category: 'Accessories',
        price: 19.99,
        countInStock: 80,
        rating: 4.2,
        numReviews: 11,
    },
    {
        name: 'Winter Jacket',
        brand: 'Cold Weather Co.',
        image: '/images/product-13.jpg',
        images: ['/images/product-13.jpg'],
        description: 'Warm winter jacket with insulated lining.',
        category: 'Clothing',
        price: 149.99,
        countInStock: 20,
        rating: 4.8,
        numReviews: 33,
    },
    {
        name: 'Yoga Mat',
        brand: 'Fitness Pro',
        image: '/images/product-14.jpg',
        images: ['/images/product-14.jpg'],
        description: 'Non-slip yoga mat with carrying strap.',
        category: 'Sports',
        price: 34.99,
        countInStock: 65,
        rating: 4.5,
        numReviews: 22,
    },
    {
        name: 'Gym Bag',
        brand: 'Athletic Gear',
        image: '/images/product-15.jpg',
        images: ['/images/product-15.jpg'],
        description: 'Spacious gym bag with shoe compartment.',
        category: 'Accessories',
        price: 39.99,
        countInStock: 40,
        rating: 4.3,
        numReviews: 16,
    },
    {
        name: 'Bluetooth Speaker',
        brand: 'SoundWave',
        image: '/images/product-16.jpg',
        images: ['/images/product-16.jpg'],
        description: 'Portable Bluetooth speaker with powerful bass.',
        category: 'Electronics',
        price: 79.99,
        countInStock: 50,
        rating: 4.6,
        numReviews: 44,
    },
    {
        name: 'Laptop Sleeve',
        brand: 'Tech Protect',
        image: '/images/product-17.jpg',
        images: ['/images/product-17.jpg'],
        description: 'Protective laptop sleeve for 15-inch laptops.',
        category: 'Accessories',
        price: 24.99,
        countInStock: 70,
        rating: 4.4,
        numReviews: 13,
    },
];

// Import data
const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Order.deleteMany();
        await Cart.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Coupon.deleteMany();

        console.log('🗑️  Existing data cleared');

        // Create users
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        console.log('✅ Users imported');

        // Add admin user reference to products
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Add more products
        const allProducts = [
            ...sampleProducts,
            ...moreProducts.map(p => ({ ...p, user: adminUser })),
            ...massiveProducts.map(p => ({ ...p, user: adminUser }))
        ];

        await Product.insertMany(allProducts);

        console.log(`✅ ${allProducts.length} Products imported`);

        // Create sample coupons
        const coupons = [
            {
                code: 'WELCOME10',
                description: 'Welcome discount - 10% off on first order',
                discountType: 'percentage',
                discountValue: 10,
                minPurchase: 500,
                maxDiscount: 200,
                usageLimit: 100,
                validFrom: new Date(),
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                isActive: true,
                createdBy: adminUser,
            },
            {
                code: 'SAVE50',
                description: 'Flat ₹50 off on orders above ₹1000',
                discountType: 'fixed',
                discountValue: 50,
                minPurchase: 1000,
                usageLimit: 50,
                validFrom: new Date(),
                validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
                isActive: true,
                createdBy: adminUser,
            },
            {
                code: 'MEGA20',
                description: 'Mega Sale - 20% off on all products',
                discountType: 'percentage',
                discountValue: 20,
                minPurchase: 1500,
                maxDiscount: 500,
                usageLimit: null, // Unlimited
                validFrom: new Date(),
                validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                isActive: true,
                createdBy: adminUser,
            },
        ];

        await Coupon.insertMany(coupons);

        console.log('✅ Coupons imported');
        console.log('\n🎉 Data Import Success!');
        console.log('\n📧 Admin Login:');
        console.log('   Email: admin@fashionhub.com');
        console.log('   Password: admin123\n');
        console.log('📧 User Login:');
        console.log('   Email: john@example.com');
        console.log('   Password: password123\n');
        console.log('🎟️  Available Coupons:');
        console.log('   WELCOME10 - 10% off (min ₹500)');
        console.log('   SAVE50 - ₹50 off (min ₹1000)');
        console.log('   MEGA20 - 20% off (min ₹1500)\n');

        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Destroy data
const destroyData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Cart.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Coupon.deleteMany();

        console.log('🗑️  All data destroyed');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Check command line arguments
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
