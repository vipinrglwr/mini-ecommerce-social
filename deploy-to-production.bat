@echo off
echo 🚀 Complete Production Deployment
echo.

echo 📋 Step 1: Deploy Backend to Render
echo 1. Go to: https://dashboard.render.com
echo 2. Sign up/Login with GitHub
echo 3. Click "New +" → "Web Service"
echo 4. Connect repository: vipinrglwr/mini-ecommerce-social
echo 5. Configure:
echo    - Name: mini-ecommerce-backend
echo    - Environment: Node
echo    - Root Directory: backend
echo    - Build Command: npm install
echo    - Start Command: npm start
echo.
echo 6. Add Environment Variables:
echo    - NODE_ENV = production
echo    - PORT = 5000
echo    - MONGODB_URI = your-mongodb-atlas-uri
echo    - JWT_SECRET = your-jwt-secret
echo    - CORS_ORIGIN = https://your-app.vercel.app
echo.
echo 7. Click "Create Web Service"
echo 8. Wait for deployment (5-10 minutes)
echo 9. Note your backend URL
echo.

echo 📋 Step 2: Deploy Frontend to Vercel
echo 1. Go to: https://vercel.com
echo 2. Sign up/Login with GitHub
echo 3. Click "New Project"
echo 4. Import repository: vipinrglwr/mini-ecommerce-social
echo 5. Configure:
echo    - Framework: Vite
echo    - Root Directory: frontend
echo    - Build Command: npm run build
echo    - Output Directory: dist
echo.
echo 6. Add Environment Variable:
echo    - VITE_API_URL = https://mini-ecommerce-backend.onrender.com
echo.
echo 7. Click "Deploy"
echo 8. Wait for deployment (2-3 minutes)
echo 9. Note your frontend URL
echo.

echo 📋 Step 3: Update Backend CORS
echo 1. Go to Render dashboard
echo 2. Update CORS_ORIGIN with your Vercel URL
echo 3. Redeploy backend
echo.

echo ✅ Deployment complete!
echo 🌐 Frontend: https://your-app.vercel.app
echo 🔧 Backend: https://mini-ecommerce-backend.onrender.com
echo 🗄️ Database: MongoDB Atlas (Cloud)
echo.
pause