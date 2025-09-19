@echo off
echo 🔧 Fixing MongoDB Connection String
echo.

echo 🚨 Issue: Connection string has placeholder "xxxxx" instead of real cluster URL
echo.

echo 📋 Step 1: Get Real MongoDB Atlas Connection String
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
echo 4. Update MONGODB_URI with REAL connection string
echo.

echo 📋 Step 3: Correct Format
echo Your connection string should look like:
echo mongodb+srv://admin:MiniEcommerce2024!@mini-ecommerce-cluster.abc123.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
echo.
echo NOT like:
echo mongodb+srv://admin:MiniEcommerce2024!@mini-ecommerce-cluster.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
echo.

echo 📋 Step 4: Redeploy
echo 1. After updating MONGODB_URI
echo 2. Click "Manual Deploy" in Render
echo 3. Wait for deployment
echo 4. Check logs for "MongoDB Connected"
echo.

echo ✅ This will fix the connection issue!
echo.
pause
