@echo off
echo 🚀 Quick MongoDB Setup with Railway
echo.

echo 📋 Step 1: Create Railway Account
echo 1. Go to: https://railway.app
echo 2. Click "Sign Up"
echo 3. Choose "Sign up with GitHub"
echo 4. Authorize Railway
echo.

echo 📋 Step 2: Create MongoDB Database
echo 1. Click "New Project"
echo 2. Choose "MongoDB"
echo 3. Wait for database to be created
echo 4. Click on your MongoDB service
echo.

echo 📋 Step 3: Get Connection String
echo 1. Go to "Variables" tab
echo 2. Copy "MONGODB_URL" value
echo 3. It should look like: mongodb://mongo:password@containers-us-west-xxx.railway.app:xxxx/mini-ecommerce
echo.

echo 📋 Step 4: Update Your App
echo 1. Create .env file in backend folder
echo 2. Add: MONGODB_URI=your-railway-connection-string
echo 3. Add: JWT_SECRET=your-super-secret-jwt-key-here
echo 4. Add: PORT=5000
echo 5. Add: NODE_ENV=development
echo 6. Add: CORS_ORIGIN=http://localhost:3000
echo.

echo ✅ Railway setup complete!
echo 🗄️ Database: Railway MongoDB (Cloud)
echo 🌐 URL: https://railway.app
echo.
pause
