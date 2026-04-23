// ============================================
// Massive Product Database - 200+ Products
// ============================================

const generateProducts = () => {
    const products = [];
    
    // Clothing - Men (50 products)
    const menClothing = [
        'T-Shirt', 'Shirt', 'Jeans', 'Trousers', 'Shorts', 'Jacket', 'Blazer', 
        'Sweater', 'Hoodie', 'Track Pants', 'Polo Shirt', 'Kurta', 'Sherwani',
        'Waistcoat', 'Cargo Pants', 'Chinos', 'Joggers', 'Tank Top'
    ];
    
    const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Grey', 'Navy', 'Brown', 'Beige', 'Olive'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const menBrands = ['Levi\'s', 'Nike', 'Adidas', 'Puma', 'H&M', 'Zara', 'Gap', 'Tommy Hilfiger', 'Calvin Klein', 'Ralph Lauren'];
    
    menClothing.forEach((item, idx) => {
        colors.slice(0, 3).forEach((color, cidx) => {
            products.push({
                name: `Men's ${color} ${item}`,
                brand: menBrands[idx % menBrands.length],
                category: 'Clothing',
                price: Math.floor(Math.random() * 3000) + 500,
                image: `/images/product-${(idx % 17) + 1}.jpg`,
                description: `Premium quality ${color.toLowerCase()} ${item.toLowerCase()} for men. Comfortable fit, durable fabric.`,
                countInStock: Math.floor(Math.random() * 100) + 10,
                rating: (Math.random() * 2 + 3).toFixed(1),
                numReviews: Math.floor(Math.random() * 200) + 10
            });
        });
    });
    
    // Clothing - Women (50 products)
    const womenClothing = [
        'Dress', 'Top', 'Jeans', 'Skirt', 'Kurti', 'Saree', 'Lehenga', 'Palazzo',
        'Jumpsuit', 'Blouse', 'Sweater', 'Cardigan', 'Shorts', 'Leggings', 'Shrug'
    ];
    
    const womenBrands = ['Zara', 'H&M', 'Forever 21', 'Mango', 'Vero Moda', 'Only', 'Biba', 'W', 'AND', 'FabIndia'];
    
    womenClothing.forEach((item, idx) => {
        colors.slice(0, 3).forEach((color, cidx) => {
            products.push({
                name: `Women's ${color} ${item}`,
                brand: womenBrands[idx % womenBrands.length],
                category: 'Clothing',
                price: Math.floor(Math.random() * 4000) + 600,
                image: `/images/product-${(idx % 17) + 1}.jpg`,
                description: `Stylish ${color.toLowerCase()} ${item.toLowerCase()} for women. Latest fashion, comfortable wear.`,
                countInStock: Math.floor(Math.random() * 80) + 15,
                rating: (Math.random() * 2 + 3).toFixed(1),
                numReviews: Math.floor(Math.random() * 150) + 20
            });
        });
    });
    
    // Footwear (40 products)
    const footwear = [
        'Running Shoes', 'Sneakers', 'Formal Shoes', 'Sandals', 'Slippers', 
        'Boots', 'Loafers', 'Sports Shoes', 'Casual Shoes', 'Heels', 'Flats'
    ];
    
    const footwearBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Bata', 'Woodland', 'Clarks', 'Skechers', 'Crocs', 'New Balance'];
    
    footwear.forEach((item, idx) => {
        colors.slice(0, 4).forEach((color) => {
            products.push({
                name: `${color} ${item}`,
                brand: footwearBrands[idx % footwearBrands.length],
                category: 'Footwear',
                price: Math.floor(Math.random() * 5000) + 800,
                image: `/images/product-${(idx % 17) + 1}.jpg`,
                description: `Comfortable ${color.toLowerCase()} ${item.toLowerCase()}. Perfect for daily wear.`,
                countInStock: Math.floor(Math.random() * 60) + 20,
                rating: (Math.random() * 2 + 3).toFixed(1),
                numReviews: Math.floor(Math.random() * 180) + 15
            });
        });
    });
    
    // Electronics (30 products)
    const electronics = [
        'Smartphone', 'Laptop', 'Tablet', 'Smartwatch', 'Earbuds', 'Headphones',
        'Speaker', 'Power Bank', 'Charger', 'Mouse', 'Keyboard', 'Webcam',
        'Monitor', 'Hard Drive', 'USB Hub'
    ];
    
    const electronicsBrands = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Sony', 'Dell', 'HP', 'Lenovo', 'JBL', 'Boat'];
    
    electronics.forEach((item, idx) => {
        [1, 2].forEach((variant) => {
            products.push({
                name: `${item} - Model ${variant}`,
                brand: electronicsBrands[idx % electronicsBrands.length],
                category: 'Electronics',
                price: Math.floor(Math.random() * 50000) + 2000,
                image: `/images/product-${(idx % 17) + 1}.jpg`,
                description: `Latest ${item.toLowerCase()} with advanced features. High performance guaranteed.`,
                countInStock: Math.floor(Math.random() * 40) + 5,
                rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                numReviews: Math.floor(Math.random() * 300) + 50
            });
        });
    });
    
    // Accessories (30 products)
    const accessories = [
        'Wallet', 'Belt', 'Watch', 'Sunglasses', 'Cap', 'Backpack', 'Handbag',
        'Sling Bag', 'Clutch', 'Scarf', 'Tie', 'Bow Tie', 'Cufflinks', 'Bracelet'
    ];
    
    const accessoryBrands = ['Fossil', 'Tommy Hilfiger', 'Titan', 'Fastrack', 'Wildcraft', 'American Tourister', 'Skybags', 'Lavie'];
    
    accessories.forEach((item, idx) => {
        [1, 2].forEach((variant) => {
            products.push({
                name: `${item} - Style ${variant}`,
                brand: accessoryBrands[idx % accessoryBrands.length],
                category: 'Accessories',
                price: Math.floor(Math.random() * 3000) + 500,
                image: `/images/product-${(idx % 17) + 1}.jpg`,
                description: `Premium ${item.toLowerCase()} with elegant design. Perfect accessory.`,
                countInStock: Math.floor(Math.random() * 70) + 15,
                rating: (Math.random() * 2 + 3).toFixed(1),
                numReviews: Math.floor(Math.random() * 120) + 10
            });
        });
    });
    
    return products;
};

module.exports = generateProducts();
