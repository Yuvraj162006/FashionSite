@echo off
echo.
echo 🛡️  FashionHub Admin Panel Setup
echo ==================================
echo.

REM Check if backend directory exists
if not exist "backend" (
    echo ❌ Error: backend directory not found!
    exit /b 1
)

REM Navigate to backend
cd backend

echo 📦 Installing backend dependencies...
call npm install

echo.
echo 🗄️  Creating admin user...
call node seedAdmin.js

echo.
echo ✅ Admin Panel Setup Complete!
echo.
echo 📧 Admin Credentials:
echo    Email: admin@fashionhub.com
echo    Password: admin123456
echo.
echo 🚀 Next Steps:
echo    1. Start backend: cd backend ^&^& npm start
echo    2. Start frontend: npm start
echo    3. Login with admin credentials
echo    4. Access Admin Panel from Dashboard
echo.
echo 📖 Read ADMIN_PANEL_GUIDE.md for complete documentation
echo.
pause
