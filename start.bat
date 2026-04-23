@echo off
REM FashionHub Quick Start Script for Windows
REM This script helps you start the application quickly

echo.
echo ============================================
echo   FashionHub E-Commerce Platform
echo ============================================
echo.

REM Check if MongoDB is running
echo Checking MongoDB...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo WARNING: MongoDB is not running!
    echo Please start MongoDB first:
    echo   net start MongoDB
    echo.
    pause
)

REM Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Check if frontend dependencies are installed
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

REM Check if .env files exist
if not exist "backend\.env" (
    echo WARNING: Backend .env file not found!
    echo Creating from template...
    copy backend\.env.example backend\.env
    echo Please update backend\.env with your configuration
)

if not exist ".env" (
    echo WARNING: Frontend .env file not found!
    echo Creating from template...
    copy .env.example .env
    echo Please update .env with your configuration
)

REM Ask if user wants to seed the database
echo.
set /p seed_choice="Do you want to seed the database? (y/n): "
if /i "%seed_choice%"=="y" (
    echo Seeding database...
    cd backend
    call npm run seed
    cd ..
)

echo.
echo ============================================
echo   Starting FashionHub...
echo ============================================
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start backend in new window
start "FashionHub Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "FashionHub Frontend" cmd /k "npm start"

echo.
echo Both servers are starting in separate windows...
echo Close those windows to stop the servers.
echo.
pause
