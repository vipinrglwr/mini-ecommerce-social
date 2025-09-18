@echo off
echo 🔗 Creating .env file for MongoDB connection
echo.

echo 📋 Step 1: Get your connection string from MongoDB Atlas
echo 1. Go to your cluster
echo 2. Click "Connect"
echo 3. Choose "Connect your application"
echo 4. Copy the connection string
echo.

echo 📋 Step 2: Update the connection string
echo Replace "xxxxx" with your actual cluster URL
echo.

echo 📋 Step 3: Create .env file
echo Creating .env file in backend folder...
cd backend

echo MONGODB_URI=mongodb+srv://admin:MiniEcommerce2024!@mini-ecommerce-cluster.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority > .env
echo JWT_SECRET=your-super-secret-jwt-key-here >> .env
echo PORT=5000 >> .env
echo NODE_ENV=development >> .env
echo CORS_ORIGIN=http://localhost:3000 >> .env

echo.
echo ✅ .env file created!
echo 📁 Location: backend\.env
echo.
echo 📋 Next Steps:
echo 1. Edit .env file
echo 2. Replace "xxxxx" with your actual cluster URL
echo 3. Run: npm run dev
echo.
pause
