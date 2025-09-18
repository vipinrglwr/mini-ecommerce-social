@echo off
echo 🔐 Complete MongoDB Atlas Security Setup
echo.

echo 📋 Step 1: Database Access
echo 1. Go to "Database Access" in left sidebar
echo 2. Click "Add New Database User"
echo 3. Username: admin
echo 4. Password: MiniEcommerce2024!
echo 5. Choose "Read and write to any database"
echo 6. Click "Add User"
echo.

echo 📋 Step 2: Network Access
echo 1. Go to "Network Access" in left sidebar
echo 2. Click "Add IP Address"
echo 3. Choose "Allow Access from Anywhere"
echo 4. Click "Confirm"
echo.

echo 📋 Step 3: Get Connection String
echo 1. Go to "Database" in left sidebar
echo 2. Click "Connect" on your cluster
echo 3. Choose "Connect your application"
echo 4. Select "Node.js" driver
echo 5. Copy the connection string
echo.

echo 📋 Step 4: Update Your App
echo 1. Replace <password> with: MiniEcommerce2024!
echo 2. Replace <dbname> with: mini-ecommerce
echo 3. Create .env file in backend folder
echo 4. Add your connection string
echo.

echo ✅ Security setup complete!
echo 🗄️ Database: MongoDB Atlas (Cloud)
echo 🔐 Security: Password + SSL/TLS
echo 🌐 Network: All IPs allowed
echo.
pause
