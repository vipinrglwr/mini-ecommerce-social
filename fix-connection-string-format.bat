@echo off
echo 🔧 Fixing MongoDB Connection String Format
echo.

echo 🚨 Issue: Connection string is duplicated and malformed
echo.

echo 📋 Step 1: Clean Connection String
echo Replace your current MONGODB_URI with:
echo.
echo mongodb+srv://admin:MiniEcommerce2024!@mini-ecommerce-cluster.mcrrff8.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
echo.

echo 📋 Step 2: Update Render
echo 1. Go to https://dashboard.render.com
echo 2. Find your backend service
echo 3. Go to "Environment" tab
echo 4. Update MONGODB_URI with clean string above
echo 5. Click "Save"
echo.

echo 📋 Step 3: Redeploy
echo 1. Go to "Deploy" tab
echo 2. Click "Manual Deploy"
echo 3. Wait for deployment
echo 4. Check logs for "MongoDB Connected"
echo.

echo ✅ This will fix the connection string format issue!
echo.
pause

