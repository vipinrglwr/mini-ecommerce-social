@echo off
echo 🌐 MongoDB Atlas Quick Setup
echo.

echo 📋 Step 1: Create Account
echo 1. Go to: https://cloud.mongodb.com
echo 2. Click "Try Free"
echo 3. Sign up with your email
echo.

echo 📋 Step 2: Create Free Cluster
echo 1. Click "Build a Database"
echo 2. Choose "M0 Sandbox" (FREE)
echo 3. Select any cloud provider
echo 4. Choose closest region
echo 5. Click "Create Cluster"
echo.

echo 📋 Step 3: Database User
echo 1. Go to "Database Access"
echo 2. Click "Add New Database User"
echo 3. Username: admin
echo 4. Password: MiniEcommerce2024!
echo 5. Click "Add User"
echo.

echo 📋 Step 4: Network Access
echo 1. Go to "Network Access"
echo 2. Click "Add IP Address"
echo 3. Click "Allow Access from Anywhere"
echo 4. Click "Confirm"
echo.

echo 📋 Step 5: Get Connection String
echo 1. Go to "Database"
echo 2. Click "Connect" on your cluster
echo 3. Choose "Connect your application"
echo 4. Select "Node.js"
echo 5. Copy the connection string
echo.

echo 📋 Step 6: Update Your App
echo 1. Replace <password> with: MiniEcommerce2024!
echo 2. Replace <dbname> with: mini-ecommerce
echo 3. Create .env file in backend folder
echo 4. Add: MONGODB_URI=your-connection-string
echo.

echo ✅ Setup complete! Your connection string should look like:
echo mongodb+srv://admin:MiniEcommerce2024!@cluster0.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
echo.
pause
