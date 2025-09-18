# 🌐 Deploy Frontend to Vercel

## Prerequisites
- ✅ Backend deployed to Render
- ✅ Frontend built successfully
- ✅ GitHub repository: `vipinrglwr/mini-ecommerce-social`

## Step 1: Go to Vercel Dashboard
1. Visit [https://vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"New Project"**

## Step 2: Import Repository
1. Select `vipinrglwr/mini-ecommerce-social`
2. Click **"Import"**

## Step 3: Configure Build Settings
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Step 4: Environment Variables
Add these environment variables in Vercel:

```
VITE_API_URL = https://mini-ecommerce-backend.onrender.com
```

## Step 5: Deploy
1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Note your frontend URL: `https://your-app.vercel.app`

## Step 6: Test Frontend
1. Visit your Vercel URL
2. Test user registration/login
3. Test product browsing
4. Test cart functionality

## Step 7: Update Backend CORS
1. Go to Render dashboard
2. Update environment variable:
   ```
   CORS_ORIGIN = https://your-app.vercel.app
   ```
3. Redeploy backend

## Troubleshooting
- **Build failed**: Check for TypeScript errors
- **API calls failed**: Verify VITE_API_URL is correct
- **CORS errors**: Update backend CORS_ORIGIN
