# 🛍️ FashionHub - Professional E-Commerce Platform

A full-stack, production-ready e-commerce application built with **React** (frontend) and **Node.js/Express/MongoDB** (backend).

![FashionHub](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Node](https://img.shields.io/badge/Node-18+-brightgreen)
![React](https://img.shields.io/badge/React-18+-61DAFB)

---

## ✨ Features

### 🎨 Frontend Features
- **Modern UI/UX** - Clean, responsive design with dark mode support
- **Product Catalog** - Browse products with advanced filtering and sorting
- **Search & Filter** - Real-time search with category and price filters
- **Shopping Cart** - Add, update, remove items with persistent storage
- **Wishlist** - Save favorite products for later
- **User Authentication** - Secure login/register with JWT
- **Checkout Process** - Multi-step checkout with address management
- **Order Tracking** - View order history and status
- **Product Reviews** - Rate and review products
- **Responsive Design** - Works perfectly on all devices

### 🚀 Backend Features
- **RESTful API** - Well-structured API endpoints
- **Authentication & Authorization** - JWT-based auth with role-based access
- **Product Management** - CRUD operations for products
- **Order Management** - Complete order lifecycle handling
- **Payment Integration** - Stripe payment gateway integration
- **Image Upload** - Cloudinary integration for product images
- **Advanced Filtering** - Search, sort, pagination, price range
- **Admin Dashboard** - Analytics and management tools
- **Security** - Rate limiting, input validation, error handling
- **Database** - MongoDB with Mongoose ODM

---

## 🛠️ Tech Stack

### Frontend
- React 18
- CSS3 (Custom styling)
- Context API (State management)
- Fetch API (HTTP client)

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- Bcrypt.js (Password hashing)
- Stripe (Payment processing)
- Cloudinary (Image storage)
- Express Validator (Input validation)
- Express Rate Limit (Security)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd fashionhub
```

### 2️⃣ Install Dependencies

#### Install Frontend Dependencies
```bash
npm install
```

#### Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3️⃣ Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
MONGO_URI=mongodb://localhost:27017/fashionhub

# JWT Secret (Change in production!)
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=30d

# Stripe Payment (Get from https://stripe.com)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Cloudinary (Get from https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file in the **root** directory for frontend:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4️⃣ Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows (if installed as service)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### 5️⃣ Seed the Database

Populate the database with sample data:

```bash
cd backend
npm run seed
```

This will create:
- **Admin Account**: admin@fashionhub.com / admin123
- **User Account**: john@example.com / password123
- **17 Sample Products** across multiple categories

### 6️⃣ Start the Application

#### Start Backend Server (Terminal 1)
```bash
cd backend
npm run dev
```
Backend will run on: **http://localhost:5000**

#### Start Frontend (Terminal 2)
```bash
npm start
```
Frontend will run on: **http://localhost:3000**

---

## 📱 Usage

### User Features
1. **Browse Products** - View all products on the homepage
2. **Search & Filter** - Use search bar and filters to find products
3. **Add to Cart** - Click "Add to Cart" on any product
4. **Wishlist** - Click the heart icon to save favorites
5. **Checkout** - Proceed to checkout and place orders
6. **Track Orders** - View order history in your profile

### Admin Features
1. **Login as Admin** - Use admin credentials
2. **Manage Products** - Add, edit, delete products
3. **Manage Orders** - Update order status
4. **View Analytics** - Dashboard with sales statistics
5. **Manage Users** - View and manage user accounts

---

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/profile        - Get user profile (Protected)
PUT    /api/auth/profile        - Update profile (Protected)
POST   /api/auth/address        - Add shipping address (Protected)
```

### Products
```
GET    /api/products            - Get all products (with filters)
GET    /api/products/:id        - Get single product
GET    /api/products/top        - Get top rated products
GET    /api/products/categories - Get all categories
POST   /api/products            - Create product (Admin)
PUT    /api/products/:id        - Update product (Admin)
DELETE /api/products/:id        - Delete product (Admin)
POST   /api/products/:id/reviews - Add review (Protected)
```

### Cart
```
GET    /api/cart                - Get user cart (Protected)
POST   /api/cart                - Add to cart (Protected)
PUT    /api/cart/:productId     - Update cart item (Protected)
DELETE /api/cart/:productId     - Remove from cart (Protected)
DELETE /api/cart                - Clear cart (Protected)
```

### Orders
```
POST   /api/orders              - Create order (Protected)
GET    /api/orders/myorders     - Get user orders (Protected)
GET    /api/orders/:id          - Get order by ID (Protected)
PUT    /api/orders/:id/pay      - Update to paid (Protected)
GET    /api/orders              - Get all orders (Admin)
PUT    /api/orders/:id/status   - Update order status (Admin)
```

### Wishlist
```
GET    /api/wishlist            - Get wishlist (Protected)
POST   /api/wishlist            - Add to wishlist (Protected)
DELETE /api/wishlist/:productId - Remove from wishlist (Protected)
```

### Payment
```
GET    /api/payment/config      - Get Stripe config
POST   /api/payment/create-payment-intent - Create payment (Protected)
```

### Admin
```
GET    /api/admin/stats         - Get dashboard stats (Admin)
GET    /api/auth/users          - Get all users (Admin)
DELETE /api/auth/users/:id      - Delete user (Admin)
```

---

## 📁 Project Structure

```
fashionhub/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   └── wishlistController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateMiddleware.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── productRoutes.js
│   │   └── wishlistRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   ├── seeder.js
│   └── server.js
├── src/
│   ├── components/
│   │   ├── CartModal.jsx
│   │   ├── CategorySection.jsx
│   │   ├── CheckoutModal.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── LoginModal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Panel.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── ProductsGrid.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Toast.jsx
│   │   └── WishlistModal.jsx
│   ├── context/
│   │   └── AppContext.js      # Global state management
│   ├── data/
│   │   └── products.js
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── App.js
│   └── index.js
├── public/
│   └── images/
├── .gitignore
├── package.json
└── README.md
```

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt with salt rounds
- **Rate Limiting** - Prevents brute-force attacks
- **Input Validation** - Express-validator for all inputs
- **CORS Protection** - Configured CORS policy
- **Error Handling** - Centralized error handling
- **Role-Based Access** - Admin and user roles

---

## 🎨 Customization

### Adding New Products
1. Login as admin
2. Navigate to admin panel
3. Click "Add Product"
4. Fill in product details
5. Upload images via Cloudinary

### Changing Theme Colors
Edit `src/styles/App.css` and modify CSS variables:
```css
:root {
    --primary-color: #ff9900;
    --secondary-color: #232f3e;
    /* Add your custom colors */
}
```

---

## 🧪 Testing

### Test User Accounts
```
Admin:
Email: admin@fashionhub.com
Password: admin123

User:
Email: john@example.com
Password: password123
```

### Test Payment
Use Stripe test cards:
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

---

## 📦 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Update MONGO_URI to production database
3. Change JWT_SECRET
4. Set NODE_ENV=production
5. Deploy using platform CLI

### Frontend Deployment (Vercel/Netlify)
1. Build the app: `npm run build`
2. Deploy the `build` folder
3. Set REACT_APP_API_URL to production API

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify MongoDB port (default: 27017)

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
npx kill-port 5000

# Kill process on port 3000 (Frontend)
npx kill-port 3000
```

### CORS Errors
- Ensure FRONTEND_URL in backend .env matches your frontend URL
- Check CORS configuration in server.js

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database
- Stripe for payment processing
- Cloudinary for image management

---

## 📞 Support

For support, email support@fashionhub.com or open an issue on GitHub.

---

**⭐ If you like this project, please give it a star on GitHub! ⭐**
#   F a s h i o n S i d e  
 