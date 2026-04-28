// FashionSite - 50 Products with Image-Matched Names
// Each product name matches its image accurately

export const allProductsData = [
    // Product 1 - Red/Floral Dress
    { id: 1, name: "Red Floral Summer Dress", category: "Women's", price: 1299, rating: 4.6, reviews: 342, image: "/images/product-1.jpg", discount: 28 },
    { id: 2, name: "Floral Maxi Dress", category: "Women's", price: 1599, rating: 4.7, reviews: 456, image: "/images/product-1.jpg", discount: 32 },
    { id: 3, name: "Summer Floral Dress", category: "Women's", price: 1399, rating: 4.5, reviews: 289, image: "/images/product-1.jpg", discount: 25 },
    
    // Product 2 - Black T-Shirt
    { id: 4, name: "Black Cotton T-Shirt", category: "Men's", price: 599, rating: 4.5, reviews: 523, image: "/images/product-2.jpg", discount: 20 },
    { id: 5, name: "Black Casual Tee", category: "Men's", price: 649, rating: 4.4, reviews: 412, image: "/images/product-2.jpg", discount: 18 },
    { id: 6, name: "Black Round Neck T-Shirt", category: "Men's", price: 699, rating: 4.6, reviews: 378, image: "/images/product-2.jpg", discount: 22 },
    
    // Product 3 - Formal Shirt
    { id: 7, name: "White Formal Shirt", category: "Men's", price: 899, rating: 4.6, reviews: 567, image: "/images/product-3.jpg", discount: 30 },
    { id: 8, name: "Blue Formal Shirt", category: "Men's", price: 949, rating: 4.5, reviews: 423, image: "/images/product-3.jpg", discount: 28 },
    { id: 9, name: "Light Blue Office Shirt", category: "Men's", price: 849, rating: 4.4, reviews: 312, image: "/images/product-3.jpg", discount: 24 },
    
    // Product 4 - Sunglasses/Accessories
    { id: 10, name: "Black Aviator Sunglasses", category: "Accessories", price: 999, rating: 4.7, reviews: 678, image: "/images/product-4.jpg", discount: 35 },
    { id: 11, name: "Classic Black Sunglasses", category: "Accessories", price: 899, rating: 4.6, reviews: 534, image: "/images/product-4.jpg", discount: 30 },
    { id: 12, name: "Polarized Sunglasses", category: "Accessories", price: 799, rating: 4.5, reviews: 445, image: "/images/product-4.jpg", discount: 28 },
    
    // Product 5 - Sweater/Cardigan
    { id: 13, name: "Grey Wool Sweater", category: "Women's", price: 1499, rating: 4.8, reviews: 423, image: "/images/product-5.jpg", discount: 35 },
    { id: 14, name: "Beige Knit Cardigan", category: "Women's", price: 1299, rating: 4.6, reviews: 356, image: "/images/product-5.jpg", discount: 30 },
    { id: 15, name: "Cozy Winter Sweater", category: "Women's", price: 1399, rating: 4.7, reviews: 489, image: "/images/product-5.jpg", discount: 32 },
    
    // Product 6 - Denim/Leather Jacket
    { id: 16, name: "Black Denim Jacket", category: "Men's", price: 1999, rating: 4.8, reviews: 612, image: "/images/product-6.jpg", discount: 38 },
    { id: 17, name: "Blue Denim Jacket", category: "Men's", price: 1899, rating: 4.7, reviews: 534, image: "/images/product-6.jpg", discount: 35 },
    { id: 18, name: "Classic Denim Jacket", category: "Men's", price: 1799, rating: 4.6, reviews: 445, image: "/images/product-6.jpg", discount: 32 },
    
    // Product 7 - Pants/Trousers
    { id: 19, name: "Beige Chino Pants", category: "Men's", price: 1099, rating: 4.5, reviews: 467, image: "/images/product-7.jpg", discount: 25 },
    { id: 20, name: "Black Formal Trousers", category: "Men's", price: 1299, rating: 4.6, reviews: 523, image: "/images/product-7.jpg", discount: 28 },
    { id: 21, name: "Navy Blue Pants", category: "Men's", price: 1199, rating: 4.5, reviews: 412, image: "/images/product-7.jpg", discount: 26 },
    
    // Product 8 - Sunglasses (Brown/Wayfarer style)
    { id: 22, name: "Brown Wayfarer Sunglasses", category: "Accessories", price: 899, rating: 4.6, reviews: 534, image: "/images/product-8.jpg", discount: 30 },
    { id: 23, name: "Tortoise Frame Sunglasses", category: "Accessories", price: 799, rating: 4.5, reviews: 445, image: "/images/product-8.jpg", discount: 28 },
    
    // Product 9 - Skirt
    { id: 24, name: "Black Pencil Skirt", category: "Women's", price: 999, rating: 4.5, reviews: 334, image: "/images/product-9.jpg", discount: 24 },
    { id: 25, name: "Formal Black Skirt", category: "Women's", price: 1199, rating: 4.6, reviews: 412, image: "/images/product-9.jpg", discount: 28 },
    { id: 26, name: "Office Wear Skirt", category: "Women's", price: 899, rating: 4.4, reviews: 289, image: "/images/product-9.jpg", discount: 20 },
    
    // Product 10 - Kids Wear
    { id: 27, name: "Kids Denim Overalls", category: "Kids", price: 899, rating: 4.7, reviews: 456, image: "/images/product-10.jpg", discount: 30 },
    { id: 28, name: "Kids Casual Outfit", category: "Kids", price: 799, rating: 4.6, reviews: 378, image: "/images/product-10.jpg", discount: 25 },
    
    // Product 11 - Boots/Formal Shoes
    { id: 29, name: "Brown Leather Boots", category: "Footwear", price: 2999, rating: 4.8, reviews: 645, image: "/images/product-11.jpg", discount: 38 },
    { id: 30, name: "Black Chelsea Boots", category: "Footwear", price: 2799, rating: 4.7, reviews: 567, image: "/images/product-11.jpg", discount: 35 },
    { id: 31, name: "Tan Ankle Boots", category: "Footwear", price: 2499, rating: 4.6, reviews: 489, image: "/images/product-11.jpg", discount: 32 },
    { id: 32, name: "Black Formal Shoes", category: "Footwear", price: 2299, rating: 4.7, reviews: 534, image: "/images/product-11.jpg", discount: 30 },
    
    // Product 12 - Jewelry/Accessories
    { id: 33, name: "Gold Hoop Earrings", category: "Accessories", price: 699, rating: 4.7, reviews: 523, image: "/images/product-12.jpg", discount: 30 },
    { id: 34, name: "Silver Necklace Set", category: "Accessories", price: 1299, rating: 4.8, reviews: 612, image: "/images/product-12.jpg", discount: 35 },
    { id: 35, name: "Pearl Bracelet", category: "Accessories", price: 899, rating: 4.6, reviews: 445, image: "/images/product-12.jpg", discount: 28 },
    
    // Product 13 - Hoodie/Sweatshirt
    { id: 36, name: "Grey Cotton Hoodie", category: "Men's", price: 1299, rating: 4.7, reviews: 589, image: "/images/product-13.jpg", discount: 32 },
    { id: 37, name: "Black Pullover Hoodie", category: "Men's", price: 1399, rating: 4.8, reviews: 645, image: "/images/product-13.jpg", discount: 35 },
    { id: 38, name: "Navy Blue Hoodie", category: "Men's", price: 1499, rating: 4.6, reviews: 512, image: "/images/product-13.jpg", discount: 30 },
    
    // Product 14 - Bags/Wallets/Belts
    { id: 39, name: "Brown Leather Wallet", category: "Accessories", price: 799, rating: 4.6, reviews: 467, image: "/images/product-14.jpg", discount: 25 },
    { id: 40, name: "Black Leather Belt", category: "Accessories", price: 599, rating: 4.5, reviews: 389, image: "/images/product-14.jpg", discount: 22 },
    { id: 41, name: "Canvas Backpack", category: "Accessories", price: 1299, rating: 4.7, reviews: 534, image: "/images/product-14.jpg", discount: 30 },
    
    // Product 15 - Sandals/Heels
    { id: 42, name: "Brown Leather Sandals", category: "Footwear", price: 1299, rating: 4.5, reviews: 423, image: "/images/product-15.jpg", discount: 26 },
    { id: 43, name: "Black High Heels", category: "Footwear", price: 1799, rating: 4.7, reviews: 534, image: "/images/product-15.jpg", discount: 32 },
    { id: 44, name: "Beige Wedge Sandals", category: "Footwear", price: 1499, rating: 4.6, reviews: 456, image: "/images/product-15.jpg", discount: 28 },
    
    // Product 16 - Hats/Caps
    { id: 45, name: "Black Baseball Cap", category: "Accessories", price: 399, rating: 4.4, reviews: 312, image: "/images/product-16.jpg", discount: 20 },
    { id: 46, name: "Brown Fedora Hat", category: "Accessories", price: 699, rating: 4.6, reviews: 423, image: "/images/product-16.jpg", discount: 25 },
    { id: 47, name: "Grey Wool Beanie", category: "Accessories", price: 499, rating: 4.5, reviews: 356, image: "/images/product-16.jpg", discount: 22 },
    
    // Product 17 - Beauty/Cosmetics
    { id: 48, name: "Vitamin C Face Serum", category: "Beauty", price: 799, rating: 4.8, reviews: 612, image: "/images/product-17.jpg", discount: 35 },
    { id: 49, name: "Hydrating Face Cream", category: "Beauty", price: 699, rating: 4.7, reviews: 534, image: "/images/product-17.jpg", discount: 30 },
    { id: 50, name: "Anti-Aging Night Cream", category: "Beauty", price: 899, rating: 4.6, reviews: 478, image: "/images/product-17.jpg", discount: 28 },
];

export const getAllProducts = () => allProductsData;
