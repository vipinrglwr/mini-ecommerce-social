@echo off
echo 🚀 Testing App with MongoDB Atlas
echo.

echo 📋 Step 1: Update .env file
echo 1. Copy your MongoDB connection string
echo 2. Replace cluster0.xxxxx with your actual cluster URL
echo 3. Create .env file in backend folder
echo.

echo 📋 Step 2: Install Dependencies
echo Installing backend dependencies...
cd backend
call npm install
echo.

echo 📋 Step 3: Seed Database
echo Seeding database with sample data...
call npm run seed
echo.

echo 📋 Step 4: Start Backend
echo Starting backend server...
start /B node server.js
echo.

echo 📋 Step 5: Start Frontend
echo Starting frontend...
cd ../frontend
call npm install
start /B npm run dev
echo.

echo ✅ App should now be running!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo 🗄️ Database: MongoDB Atlas (Cloud)
echo.
echo 📋 Test Steps:
echo 1. Go to http://localhost:3000
echo 2. Register a new user
echo 3. Browse products
echo 4. Add items to cart
echo 5. Test checkout
echo.
pause
