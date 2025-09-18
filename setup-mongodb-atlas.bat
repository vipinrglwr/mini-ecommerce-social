@echo off
echo 🌐 Setting up MongoDB Atlas (Cloud Database)...
echo.

echo 📋 Step-by-step MongoDB Atlas setup:
echo.
echo 1. Go to https://cloud.mongodb.com
echo 2. Create a free account
echo 3. Create a new cluster (free tier)
echo 4. Choose a cloud provider and region
echo 5. Create a database user:
echo    - Username: admin
echo    - Password: (create a strong password)
echo 6. Add network access:
echo    - Add IP Address: 0.0.0.0/0 (allow all)
echo 7. Get connection string
echo.
echo 📋 Connection String Format:
echo mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
echo.
echo 📋 Next Steps:
echo 1. Copy your connection string
echo 2. Create .env file in backend folder
echo 3. Add: MONGODB_URI=your-connection-string
echo 4. Run: npm run dev
echo.
echo ✅ MongoDB Atlas setup guide complete!
pause
