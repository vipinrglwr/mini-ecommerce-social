@echo off
echo 🚀 Complete App Setup with MongoDB Atlas
echo.

echo 📋 Step 1: MongoDB Atlas Setup
echo 1. Go to: https://cloud.mongodb.com
echo 2. Create free account
echo 3. Create M0 Sandbox cluster
echo 4. Create database user: admin / MiniEcommerce2024!
echo 5. Allow access from anywhere (0.0.0.0/0)
echo 6. Get connection string
echo.

echo 📋 Step 2: Update Backend
echo 1. Copy your connection string
echo 2. Replace <password> with: MiniEcommerce2024!
echo 3. Replace <dbname> with: mini-ecommerce
echo.

echo 📋 Step 3: Create .env file
echo Creating .env file in backend folder...
cd backend
echo MONGODB_URI=mongodb+srv://admin:MiniEcommerce2024!@cluster0.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority > .env
echo JWT_SECRET=your-super-secret-jwt-key-here >> .env
echo PORT=5000 >> .env
echo NODE_ENV=development >> .env
echo CORS_ORIGIN=http://localhost:3000 >> .env
echo.
echo ✅ .env file created! Please update with your actual connection string.
echo.

echo 📋 Step 4: Install Dependencies
echo Installing backend dependencies...
call npm install
echo.

echo 📋 Step 5: Seed Database
echo Seeding database with sample data...
call npm run seed
echo.

echo 📋 Step 6: Start Backend
echo Starting backend server...
start /B node server.js
echo.

echo 📋 Step 7: Start Frontend
echo Starting frontend...
cd ../frontend
call npm install
start /B npm run dev
echo.

echo ✅ App setup complete!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo 🗄️ Database: MongoDB Atlas (Cloud)
echo.
echo 📋 Next Steps:
echo 1. Update .env file with your actual MongoDB connection string
echo 2. Test the app at http://localhost:3000
echo 3. Register a new user
echo 4. Browse products
echo.
pause
