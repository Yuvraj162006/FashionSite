#!/bin/bash

echo "🛡️  FashionHub Admin Panel Setup"
echo "=================================="
echo ""

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Error: backend directory not found!"
    exit 1
fi

# Navigate to backend
cd backend

echo "📦 Installing backend dependencies..."
npm install

echo ""
echo "🗄️  Creating admin user..."
node seedAdmin.js

echo ""
echo "✅ Admin Panel Setup Complete!"
echo ""
echo "📧 Admin Credentials:"
echo "   Email: admin@fashionhub.com"
echo "   Password: admin123456"
echo ""
echo "🚀 Next Steps:"
echo "   1. Start backend: cd backend && npm start"
echo "   2. Start frontend: npm start"
echo "   3. Login with admin credentials"
echo "   4. Access Admin Panel from Dashboard"
echo ""
echo "📖 Read ADMIN_PANEL_GUIDE.md for complete documentation"
echo ""
