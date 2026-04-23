// ============================================
// Extended Product Database - 100+ Products
// ============================================

const categories = {
    clothing: 'Clothing',
    footwear: 'Footwear',
    accessories: 'Accessories',
    electronics: 'Electronics',
    sports: 'Sports & Fitness',
    home: 'Home & Living',
    beauty: 'Beauty & Personal Care',
    books: 'Books & Media',
    toys: 'Toys & Games',
    jewelry: 'Jewelry & Watches'
};

const brands = [
    'Nike', 'Adidas', 'Puma', 'Reebok', 'Levi\'s', 'Zara', 'H&M', 'Gap',
    'Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo',
    'Fossil', 'Casio', 'Titan', 'Rolex', 'Omega',
    'L\'Oreal', 'Maybelline', 'MAC', 'Lakme', 'Nivea'
];

const moreProducts = [
    // Clothing - Men
    { name: 'Men\'s Formal Blazer', brand: 'Raymond', category: categories.clothing, price: 3999, image: '/images/product-1.jpg', description: 'Premium formal blazer for office and events', countInStock: 25, rating: 4.6, numReviews: 45 },
    { name: 'Men\'s Casual Shirt - Blue', brand: 'Peter England', category: categories.clothing, price: 899, image: '/images/product-2.jpg', description: 'Comfortable cotton casual shirt', countInStock: 50, rating: 4.3, numReviews: 78 },
    { name: 'Men\'s Denim Jacket', brand: 'Levi\'s', category: categories.clothing, price: 2499, image: '/images/product-3.jpg', description: 'Classic denim jacket with modern fit', countInStock: 30, rating: 4.7, numReviews: 92 },
    { name: 'Men\'s Track Pants', brand: 'Adidas', category: categories.clothing, price: 1299, image: '/images/product-4.jpg', description: 'Comfortable track pants for gym and casual wear', countInStock: 60, rating: 4.4, numReviews: 56 },
    { name: 'Men\'s Polo T-Shirt', brand: 'US Polo', category: categories.clothing, price: 799, image: '/images/product-5.jpg', description: 'Classic polo t-shirt in multiple colors', countInStock: 80, rating: 4.5, numReviews: 120 },
    
    // Clothing - Women
    { name: 'Women\'s Ethnic Kurti', brand: 'Biba', category: categories.clothing, price: 1299, image: '/images/product-6.jpg', description: 'Beautiful ethnic kurti for daily wear', countInStock: 45, rating: 4.6, numReviews: 89 },
    { name: 'Women\'s Maxi Dress', brand: 'Zara', category: categories.clothing, price: 2199, image: '/images/product-7.jpg', description: 'Elegant maxi dress for parties', countInStock: 35, rating: 4.7, numReviews: 67 },
    { name: 'Women\'s Jeans - Skinny Fit', brand: 'Levi\'s', category: categories.clothing, price: 1899, image: '/images/product-8.jpg', description: 'Comfortable skinny fit jeans', countInStock: 55, rating: 4.5, numReviews: 102 },
    { name: 'Women\'s Blazer', brand: 'H&M', category: categories.clothing, price: 2499, image: '/images/product-9.jpg', description: 'Professional blazer for office wear', countInStock: 28, rating: 4.4, numReviews: 43 },
    { name: 'Women\'s Saree', brand: 'FabIndia', category: categories.clothing, price: 3499, image: '/images/product-10.jpg', description: 'Traditional silk saree', countInStock: 20, rating: 4.8, numReviews: 76 },
    
    // Footwear - Men
    { name: 'Men\'s Running Shoes', brand: 'Nike', category: categories.footwear, price: 3999, image: '/images/product-11.jpg', description: 'Lightweight running shoes with air cushion', countInStock: 40, rating: 4.7, numReviews: 156 },
    { name: 'Men\'s Formal Shoes', brand: 'Clarks', category: categories.footwear, price: 2999, image: '/images/product-12.jpg', description: 'Premium leather formal shoes', countInStock: 32, rating: 4.6, numReviews: 89 },
    { name: 'Men\'s Sneakers', brand: 'Adidas', category: categories.footwear, price: 2499, image: '/images/product-13.jpg', description: 'Trendy sneakers for casual wear', countInStock: 65, rating: 4.5, numReviews: 134 },
    { name: 'Men\'s Sandals', brand: 'Woodland', category: categories.footwear, price: 1299, image: '/images/product-14.jpg', description: 'Comfortable leather sandals', countInStock: 50, rating: 4.3, numReviews: 67 },
    { name: 'Men\'s Sports Shoes', brand: 'Puma', category: categories.footwear, price: 3499, image: '/images/product-15.jpg', description: 'High-performance sports shoes', countInStock: 38, rating: 4.6, numReviews: 98 },
    
    // Footwear - Women
    { name: 'Women\'s Heels', brand: 'Steve Madden', category: categories.footwear, price: 2799, image: '/images/product-16.jpg', description: 'Elegant heels for parties', countInStock: 25, rating: 4.5, numReviews: 54 },
    { name: 'Women\'s Flats', brand: 'Bata', category: categories.footwear, price: 999, image: '/images/product-17.jpg', description: 'Comfortable flats for daily wear', countInStock: 70, rating: 4.4, numReviews: 112 },
    { name: 'Women\'s Sneakers', brand: 'Nike', category: categories.footwear, price: 3299, image: '/images/product-1.jpg', description: 'Stylish sneakers for active lifestyle', countInStock: 45, rating: 4.6, numReviews: 87 },
    { name: 'Women\'s Boots', brand: 'Timberland', category: categories.footwear, price: 4999, image: '/images/product-2.jpg', description: 'Durable boots for all weather', countInStock: 22, rating: 4.7, numReviews: 65 },
    { name: 'Women\'s Sandals', brand: 'Crocs', category: categories.footwear, price: 1499, image: '/images/product-3.jpg', description: 'Comfortable casual sandals', countInStock: 60, rating: 4.3, numReviews: 93 },
    
    // Electronics
    { name: 'Wireless Earbuds Pro', brand: 'Apple', category: categories.electronics, price: 24999, image: '/images/product-4.jpg', description: 'Premium wireless earbuds with ANC', countInStock: 15, rating: 4.8, numReviews: 234 },
    { name: 'Smart Watch Series 7', brand: 'Apple', category: categories.electronics, price: 39999, image: '/images/product-5.jpg', description: 'Advanced smartwatch with health tracking', countInStock: 12, rating: 4.9, numReviews: 456 },
    { name: 'Bluetooth Speaker', brand: 'JBL', category: categories.electronics, price: 4999, image: '/images/product-6.jpg', description: 'Portable speaker with powerful bass', countInStock: 35, rating: 4.6, numReviews: 178 },
    { name: 'Laptop - 15.6 inch', brand: 'Dell', category: categories.electronics, price: 54999, image: '/images/product-7.jpg', description: 'High-performance laptop for work', countInStock: 8, rating: 4.7, numReviews: 289 },
    { name: 'Tablet - 10 inch', brand: 'Samsung', category: categories.electronics, price: 29999, image: '/images/product-8.jpg', description: 'Versatile tablet for entertainment', countInStock: 18, rating: 4.5, numReviews: 156 },
    { name: 'Gaming Mouse', brand: 'Logitech', category: categories.electronics, price: 2999, image: '/images/product-9.jpg', description: 'Precision gaming mouse with RGB', countInStock: 42, rating: 4.6, numReviews: 234 },
    { name: 'Mechanical Keyboard', brand: 'Corsair', category: categories.electronics, price: 8999, image: '/images/product-10.jpg', description: 'RGB mechanical keyboard for gaming', countInStock: 28, rating: 4.7, numReviews: 167 },
    { name: 'Webcam HD', brand: 'Logitech', category: categories.electronics, price: 3499, image: '/images/product-11.jpg', description: '1080p webcam for video calls', countInStock: 33, rating: 4.4, numReviews: 89 },
    { name: 'Power Bank 20000mAh', brand: 'Mi', category: categories.electronics, price: 1999, image: '/images/product-12.jpg', description: 'High capacity power bank', countInStock: 55, rating: 4.5, numReviews: 312 },
    { name: 'USB-C Hub', brand: 'Anker', category: categories.electronics, price: 2499, image: '/images/product-13.jpg', description: 'Multi-port USB-C hub', countInStock: 40, rating: 4.3, numReviews: 76 },
    
    // Accessories
    { name: 'Leather Wallet - Brown', brand: 'Fossil', category: categories.accessories, price: 2499, image: '/images/product-14.jpg', description: 'Premium leather wallet', countInStock: 45, rating: 4.6, numReviews: 123 },
    { name: 'Sunglasses - Aviator', brand: 'Ray-Ban', category: categories.accessories, price: 8999, image: '/images/product-15.jpg', description: 'Classic aviator sunglasses', countInStock: 30, rating: 4.7, numReviews: 198 },
    { name: 'Backpack - 30L', brand: 'Wildcraft', category: categories.accessories, price: 2999, image: '/images/product-16.jpg', description: 'Durable backpack for travel', countInStock: 50, rating: 4.5, numReviews: 167 },
    { name: 'Belt - Leather', brand: 'Tommy Hilfiger', category: categories.accessories, price: 1499, image: '/images/product-17.jpg', description: 'Genuine leather belt', countInStock: 60, rating: 4.4, numReviews: 89 },
    { name: 'Cap - Baseball', brand: 'Nike', category: categories.accessories, price: 799, image: '/images/product-1.jpg', description: 'Adjustable baseball cap', countInStock: 75, rating: 4.3, numReviews: 145 },
    { name: 'Scarf - Wool', brand: 'Zara', category: categories.accessories, price: 1299, image: '/images/product-2.jpg', description: 'Warm wool scarf', countInStock: 40, rating: 4.5, numReviews: 67 },
    { name: 'Tie - Silk', brand: 'Van Heusen', category: categories.accessories, price: 899, image: '/images/product-3.jpg', description: 'Premium silk tie', countInStock: 55, rating: 4.4, numReviews: 54 },
    { name: 'Handbag - Leather', brand: 'Michael Kors', category: categories.accessories, price: 12999, image: '/images/product-4.jpg', description: 'Designer leather handbag', countInStock: 15, rating: 4.8, numReviews: 234 },
    { name: 'Clutch - Evening', brand: 'Guess', category: categories.accessories, price: 3999, image: '/images/product-5.jpg', description: 'Elegant evening clutch', countInStock: 25, rating: 4.6, numReviews: 87 },
    { name: 'Travel Bag - 50L', brand: 'American Tourister', category: categories.accessories, price: 4999, image: '/images/product-6.jpg', description: 'Spacious travel bag', countInStock: 35, rating: 4.5, numReviews: 156 },
    
    // Sports & Fitness
    { name: 'Yoga Mat - Premium', brand: 'Reebok', category: categories.sports, price: 1499, image: '/images/product-7.jpg', description: 'Non-slip yoga mat', countInStock: 50, rating: 4.6, numReviews: 234 },
    { name: 'Dumbbells Set - 10kg', brand: 'Kore', category: categories.sports, price: 2999, image: '/images/product-8.jpg', description: 'Adjustable dumbbell set', countInStock: 30, rating: 4.5, numReviews: 123 },
    { name: 'Resistance Bands', brand: 'Fitlastics', category: categories.sports, price: 799, image: '/images/product-9.jpg', description: 'Set of 5 resistance bands', countInStock: 65, rating: 4.4, numReviews: 189 },
    { name: 'Gym Bag', brand: 'Nike', category: categories.sports, price: 1999, image: '/images/product-10.jpg', description: 'Spacious gym bag with shoe compartment', countInStock: 45, rating: 4.5, numReviews: 98 },
    { name: 'Protein Shaker', brand: 'Boldfit', category: categories.sports, price: 399, image: '/images/product-11.jpg', description: 'Leak-proof protein shaker', countInStock: 80, rating: 4.3, numReviews: 267 },
    { name: 'Skipping Rope', brand: 'Cosco', category: categories.sports, price: 299, image: '/images/product-12.jpg', description: 'Adjustable skipping rope', countInStock: 90, rating: 4.2, numReviews: 145 },
    { name: 'Cricket Bat', brand: 'MRF', category: categories.sports, price: 3999, image: '/images/product-13.jpg', description: 'Professional cricket bat', countInStock: 20, rating: 4.7, numReviews: 87 },
    { name: 'Football - Size 5', brand: 'Adidas', category: categories.sports, price: 1299, image: '/images/product-14.jpg', description: 'Official size football', countInStock: 40, rating: 4.5, numReviews: 156 },
    { name: 'Badminton Racket', brand: 'Yonex', category: categories.sports, price: 2499, image: '/images/product-15.jpg', description: 'Lightweight badminton racket', countInStock: 35, rating: 4.6, numReviews: 112 },
    { name: 'Tennis Ball - Pack of 3', brand: 'Wilson', category: categories.sports, price: 599, image: '/images/product-16.jpg', description: 'Professional tennis balls', countInStock: 60, rating: 4.4, numReviews: 78 },
    
    // Home & Living
    { name: 'Bed Sheet Set - King', brand: 'Bombay Dyeing', category: categories.home, price: 2499, image: '/images/product-17.jpg', description: 'Premium cotton bed sheet set', countInStock: 30, rating: 4.5, numReviews: 234 },
    { name: 'Pillow - Memory Foam', brand: 'Sleepwell', category: categories.home, price: 1299, image: '/images/product-1.jpg', description: 'Ergonomic memory foam pillow', countInStock: 45, rating: 4.6, numReviews: 189 },
    { name: 'Curtains - Blackout', brand: 'IKEA', category: categories.home, price: 1999, image: '/images/product-2.jpg', description: 'Room darkening curtains', countInStock: 35, rating: 4.4, numReviews: 123 },
    { name: 'Table Lamp', brand: 'Philips', category: categories.home, price: 1499, image: '/images/product-3.jpg', description: 'LED table lamp with dimmer', countInStock: 50, rating: 4.5, numReviews: 167 },
    { name: 'Wall Clock', brand: 'Ajanta', category: categories.home, price: 899, image: '/images/product-4.jpg', description: 'Silent wall clock', countInStock: 60, rating: 4.3, numReviews: 98 },
    { name: 'Dinner Set - 24 pieces', brand: 'Corelle', category: categories.home, price: 3999, image: '/images/product-5.jpg', description: 'Complete dinner set', countInStock: 25, rating: 4.6, numReviews: 145 },
    { name: 'Cookware Set', brand: 'Prestige', category: categories.home, price: 4999, image: '/images/product-6.jpg', description: 'Non-stick cookware set', countInStock: 28, rating: 4.5, numReviews: 178 },
    { name: 'Vacuum Cleaner', brand: 'Eureka Forbes', category: categories.home, price: 8999, image: '/images/product-7.jpg', description: 'Powerful vacuum cleaner', countInStock: 15, rating: 4.7, numReviews: 234 },
    { name: 'Air Purifier', brand: 'Mi', category: categories.home, price: 9999, image: '/images/product-8.jpg', description: 'HEPA air purifier', countInStock: 18, rating: 4.6, numReviews: 267 },
    { name: 'Water Purifier', brand: 'Kent', category: categories.home, price: 14999, image: '/images/product-9.jpg', description: 'RO water purifier', countInStock: 12, rating: 4.7, numReviews: 312 },
    
    // Beauty & Personal Care
    { name: 'Face Cream - Anti-Aging', brand: 'L\'Oreal', category: categories.beauty, price: 1299, image: '/images/product-10.jpg', description: 'Anti-aging face cream', countInStock: 40, rating: 4.5, numReviews: 234 },
    { name: 'Lipstick - Matte', brand: 'MAC', category: categories.beauty, price: 1899, image: '/images/product-11.jpg', description: 'Long-lasting matte lipstick', countInStock: 55, rating: 4.6, numReviews: 345 },
    { name: 'Perfume - 100ml', brand: 'Calvin Klein', category: categories.beauty, price: 4999, image: '/images/product-12.jpg', description: 'Premium perfume', countInStock: 30, rating: 4.7, numReviews: 189 },
    { name: 'Hair Dryer', brand: 'Philips', category: categories.beauty, price: 2499, image: '/images/product-13.jpg', description: 'Professional hair dryer', countInStock: 35, rating: 4.5, numReviews: 156 },
    { name: 'Shampoo - 500ml', brand: 'Dove', category: categories.beauty, price: 399, image: '/images/product-14.jpg', description: 'Nourishing shampoo', countInStock: 70, rating: 4.4, numReviews: 267 },
    { name: 'Body Lotion', brand: 'Nivea', category: categories.beauty, price: 499, image: '/images/product-15.jpg', description: 'Moisturizing body lotion', countInStock: 65, rating: 4.3, numReviews: 198 },
    { name: 'Face Wash', brand: 'Garnier', category: categories.beauty, price: 299, image: '/images/product-16.jpg', description: 'Deep cleansing face wash', countInStock: 80, rating: 4.4, numReviews: 312 },
    { name: 'Makeup Kit', brand: 'Maybelline', category: categories.beauty, price: 2999, image: '/images/product-17.jpg', description: 'Complete makeup kit', countInStock: 25, rating: 4.6, numReviews: 234 },
    { name: 'Nail Polish Set', brand: 'Lakme', category: categories.beauty, price: 799, image: '/images/product-1.jpg', description: 'Set of 5 nail polishes', countInStock: 50, rating: 4.3, numReviews: 145 },
    { name: 'Hair Straightener', brand: 'Philips', category: categories.beauty, price: 1999, image: '/images/product-2.jpg', description: 'Ceramic hair straightener', countInStock: 32, rating: 4.5, numReviews: 178 },
    
    // Jewelry & Watches
    { name: 'Gold Plated Necklace', brand: 'Tanishq', category: categories.jewelry, price: 8999, image: '/images/product-3.jpg', description: 'Elegant gold plated necklace', countInStock: 15, rating: 4.7, numReviews: 89 },
    { name: 'Silver Earrings', brand: 'Giva', category: categories.jewelry, price: 2499, image: '/images/product-4.jpg', description: 'Sterling silver earrings', countInStock: 25, rating: 4.6, numReviews: 123 },
    { name: 'Men\'s Watch - Analog', brand: 'Fossil', category: categories.jewelry, price: 9999, image: '/images/product-5.jpg', description: 'Classic analog watch', countInStock: 20, rating: 4.7, numReviews: 234 },
    { name: 'Women\'s Watch - Digital', brand: 'Casio', category: categories.jewelry, price: 3999, image: '/images/product-6.jpg', description: 'Stylish digital watch', countInStock: 28, rating: 4.5, numReviews: 156 },
    { name: 'Bracelet - Gold', brand: 'Kalyan Jewellers', category: categories.jewelry, price: 12999, image: '/images/product-7.jpg', description: 'Designer gold bracelet', countInStock: 10, rating: 4.8, numReviews: 67 },
    { name: 'Ring - Diamond', brand: 'PC Jeweller', category: categories.jewelry, price: 24999, image: '/images/product-8.jpg', description: 'Diamond ring', countInStock: 8, rating: 4.9, numReviews: 45 },
    { name: 'Pendant - Silver', brand: 'Mia by Tanishq', category: categories.jewelry, price: 3499, image: '/images/product-9.jpg', description: 'Silver pendant with chain', countInStock: 22, rating: 4.6, numReviews: 98 },
    { name: 'Smartwatch - Fitness', brand: 'Fitbit', category: categories.jewelry, price: 14999, image: '/images/product-10.jpg', description: 'Fitness tracking smartwatch', countInStock: 18, rating: 4.7, numReviews: 267 },
    { name: 'Cufflinks - Silver', brand: 'Raymond', category: categories.jewelry, price: 1999, image: '/images/product-11.jpg', description: 'Elegant silver cufflinks', countInStock: 30, rating: 4.5, numReviews: 76 },
    { name: 'Anklet - Gold Plated', brand: 'Voylla', category: categories.jewelry, price: 1499, image: '/images/product-12.jpg', description: 'Traditional gold plated anklet', countInStock: 35, rating: 4.4, numReviews: 89 },
];

module.exports = moreProducts;
