#!/bin/bash

# FashionHub Quick Start Script
# This script helps you start the application quickly

echo "🛍️  FashionHub E-Commerce Platform"
echo "=================================="
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo "Please start MongoDB first:"
    echo "  - Windows: net start MongoDB"
    echo "  - macOS/Linux: sudo systemctl start mongod"
    echo ""
    read -p "Press Enter after starting MongoDB..."
fi

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Check if frontend dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found!"
    echo "Creating from template..."
    cp backend/.env.example backend/.env
    echo "✅ Please update backend/.env with your configuration"
fi

if [ ! -f ".env" ]; then
    echo "⚠️  Frontend .env file not found!"
    echo "Creating from template..."
    cp .env.example .env
    echo "✅ Please update .env with your configuration"
fi

# Ask if user wants to seed the database
echo ""
read -p "🌱 Do you want to seed the database? (y/n): " seed_choice
if [ "$seed_choice" = "y" ] || [ "$seed_choice" = "Y" ]; then
    echo "🌱 Seeding database..."
    cd backend
    npm run seed
    cd ..
fi

echo ""
echo "🚀 Starting FashionHub..."
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
cd backend && npm run dev &
BACKEND_PID=$!
cd ..
npm start &
FRONTEND_PID=$!

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
