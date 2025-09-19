@echo off
echo 🔧 Fixing Database Connection Issue
echo.

echo 🚨 Issue: Backend trying to connect to local MongoDB instead of MongoDB Atlas
echo.

echo 📋 Step 1: Get MongoDB Atlas Connection String
echo 1. Go to https://cloud.mongodb.com
echo 2. Click "Connect" on your cluster
echo 3. Choose "Connect your application"
echo 4. Select "Node.js"
echo 5. Copy the connection string
echo.

echo 📋 Step 2: Update Render Environment Variables
echo 1. Go to https://dashboard.render.com
echo 2. Find your backend service
echo 3. Go to "Environment" tab
echo 4. Update MONGODB_URI with your Atlas connection string
echo.

echo 📋 Step 3: Correct MONGODB_URI Format
echo mongodb+srv://admin:MiniEcommerce2024!@mini-ecommerce-cluster.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
echo.
echo Replace "xxxxx" with your actual cluster URL
echo.

echo 📋 Step 4: Redeploy Backend
echo 1. After updating MONGODB_URI
echo 2. Click "Manual Deploy" in Render
echo 3. Wait for deployment to complete
echo 4. Check logs for "MongoDB Connected" message
echo.

echo ✅ This should fix the database connection issue!
echo.
pause
