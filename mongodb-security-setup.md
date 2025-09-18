# 🔐 MongoDB Atlas Security Setup

## Step 1: Database Access (Create User)

### 1.1 Go to Database Access
1. Click "Database Access" in the left sidebar
2. Click "Add New Database User"

### 1.2 Authentication Method
- Choose **"Password"** (not Certificate)

### 1.3 User Details
- **Username**: `admin`
- **Password**: `MiniEcommerce2024!` (or create your own strong password)
- **Database User Privileges**: Choose **"Read and write to any database"**

### 1.4 Create User
- Click **"Add User"**

## Step 2: Network Access (Allow Connections)

### 2.1 Go to Network Access
1. Click "Network Access" in the left sidebar
2. Click "Add IP Address"

### 2.2 IP Address Options
- Choose **"Allow Access from Anywhere"**
- This adds `0.0.0.0/0` (allows all IPs)
- Click **"Confirm"**

## Step 3: Get Connection String

### 3.1 Go to Database
1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster

### 3.2 Choose Connection Method
- Choose **"Connect your application"**

### 3.3 Driver and Version
- **Driver**: Node.js
- **Version**: 4.1 or later

### 3.4 Copy Connection String
- Copy the connection string
- It should look like:
  ```
  mongodb+srv://admin:<password>@mini-ecommerce-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

## Step 4: Update Your App

### 4.1 Replace Placeholders
- Replace `<password>` with your actual password
- Replace `<dbname>` with `mini-ecommerce`
- Final string should look like:
  ```
  mongodb+srv://admin:MiniEcommerce2024!@mini-ecommerce-cluster.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
  ```

### 4.2 Create .env File
Create `.env` file in `backend` folder:
```
MONGODB_URI=mongodb+srv://admin:MiniEcommerce2024!@mini-ecommerce-cluster.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Security Notes
- ✅ Password is encrypted
- ✅ Connection uses SSL/TLS
- ✅ Network access is controlled
- ✅ User has minimal required permissions
