# 🚀 Backend Deployment to Render

## Prerequisites
1. **Render Account**: Sign up at [render.com](https://render.com)
2. **MongoDB Atlas**: Set up database at [cloud.mongodb.com](https://cloud.mongodb.com)

## Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free account
3. Create a new cluster
4. Choose a cloud provider and region

### 1.2 Configure Database
1. Create a database named `mini-ecommerce`
2. Create collections: `products`, `users`, `comments`
3. Create a database user with read/write permissions
4. Get your connection string

### 1.3 Network Access
1. Add `0.0.0.0/0` to allow all IPs (for production)
2. Note your connection string

## Step 2: Deploy to Render

### 2.1 Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `vipinrglwr/mini-ecommerce-social`

### 2.2 Configure Build Settings
```
Name: mini-ecommerce-backend
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### 2.3 Environment Variables
Add these environment variables in Render:

```
NODE_ENV = production
PORT = 5000
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-jwt-key-here
CORS_ORIGIN = https://your-app.vercel.app
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your service URL (e.g., `https://mini-ecommerce-backend.onrender.com`)

## Step 3: Test Backend

### 3.1 Health Check
```bash
curl https://your-backend-url.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

### 3.2 Test API Endpoints
```bash
# Test products endpoint
curl https://your-backend-url.onrender.com/api/products

# Test authentication
curl -X POST https://your-backend-url.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rajesh.kumar@gmail.com","password":"password123"}'
```

## Step 4: Update Frontend

### 4.1 Update Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Add/Update:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```
4. Redeploy the frontend

### 4.2 Test Full Application
1. Visit your Vercel frontend URL
2. Test user registration/login
3. Test product browsing
4. Test cart functionality

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MongoDB Atlas connection string
   - Verify network access settings
   - Ensure database user has correct permissions

2. **CORS Errors**
   - Update CORS_ORIGIN with your frontend URL
   - Check that frontend URL is in allowed origins

3. **Build Failures**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json
   - Check for TypeScript errors

4. **Environment Variables**
   - Verify all required variables are set
   - Check for typos in variable names
   - Ensure values are properly quoted

## Next Steps

After successful deployment:
1. ✅ Backend deployed to Render
2. ✅ Frontend deployed to Vercel
3. ✅ Database connected to MongoDB Atlas
4. ✅ Environment variables configured
5. ✅ CORS settings updated
6. ✅ Full application tested

Your Mini E-Commerce + Social Feed app is now live! 🎉
