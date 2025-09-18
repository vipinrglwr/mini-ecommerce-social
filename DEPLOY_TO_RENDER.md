# 🚀 Deploy Backend to Render

## Prerequisites
- ✅ MongoDB Atlas cluster created
- ✅ Backend tested locally
- ✅ GitHub repository: `vipinrglwr/mini-ecommerce-social`

## Step 1: Go to Render Dashboard
1. Visit [https://dashboard.render.com](https://dashboard.render.com)
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Web Service"**

## Step 2: Connect Repository
1. Connect GitHub repository: `vipinrglwr/mini-ecommerce-social`
2. Select the repository
3. Click **"Connect"**

## Step 3: Configure Build Settings
```
Name: mini-ecommerce-backend
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

## Step 4: Environment Variables
Add these environment variables in Render:

```
NODE_ENV = production
PORT = 5000
MONGODB_URI = mongodb+srv://admin:MiniEcommerce2024!@mini-ecommerce-cluster.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-jwt-key-here
CORS_ORIGIN = https://your-app.vercel.app
```

## Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Note your service URL: `https://mini-ecommerce-backend.onrender.com`

## Step 6: Test Backend
```bash
curl https://mini-ecommerce-backend.onrender.com/health
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

## Troubleshooting
- **Build failed**: Check Node.js version compatibility
- **Database connection failed**: Verify MongoDB Atlas connection string
- **CORS errors**: Update CORS_ORIGIN with your frontend URL
