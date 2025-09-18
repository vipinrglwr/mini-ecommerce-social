# 🗄️ MongoDB Atlas Free Setup Guide

## Step 1: Create Account
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Click **"Try Free"** or **"Sign Up"**
3. Fill in your details:
   - **Email**: Your email address
   - **Password**: Strong password
   - **Account Name**: `mini-ecommerce-app` (or any name)

## Step 2: Create Free Cluster
1. Click **"Build a Database"**
2. Choose **"M0 Sandbox"** (FREE tier)
3. Select **Cloud Provider**: AWS, Google Cloud, or Azure
4. Choose **Region**: Closest to your location (e.g., US East, Asia Pacific)
5. Click **"Create Cluster"**

## Step 3: Set Up Database Access
1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create user:
   - **Username**: `admin`
   - **Password**: `MiniEcommerce2024!` (or create your own)
   - **Database User Privileges**: Read and write to any database
5. Click **"Add User"**

## Step 4: Set Up Network Access
1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

## Step 5: Get Connection String
1. Go to **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** driver
5. Copy the connection string

## Step 6: Update Your App
1. Replace `<password>` with your actual password
2. Replace `<dbname>` with `mini-ecommerce`
3. Your final connection string should look like:
   ```
   mongodb+srv://admin:MiniEcommerce2024!@cluster0.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
   ```

## Step 7: Test Connection
1. Create `.env` file in `backend` folder
2. Add: `MONGODB_URI=your-connection-string`
3. Run: `npm run dev`
4. Check console for "MongoDB Connected" message

## Free Tier Limits
- **Storage**: 512 MB
- **Connections**: 100 concurrent
- **Perfect for**: Development and small apps
- **No credit card required**

## Troubleshooting
- **Connection failed**: Check password and username
- **Network error**: Verify IP address is 0.0.0.0/0
- **Database not found**: Will be created automatically
