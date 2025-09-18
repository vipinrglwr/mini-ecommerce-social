@echo off
echo 🚀 Deploying Backend to Render...
echo.

echo 1. Preparing backend for production...
cd backend
call npm install
echo ✅ Dependencies installed
echo.

echo 2. Testing backend locally...
start /B node server.js
timeout /t 3
curl http://localhost:5000/health
echo.
echo ✅ Backend test completed
echo.

echo 3. Backend Deployment Instructions:
echo.
echo 📋 Steps to deploy to Render:
echo.
echo 1. Go to https://dashboard.render.com
echo 2. Click "New +" → "Web Service"
echo 3. Connect GitHub repository: vipinrglwr/mini-ecommerce-social
echo 4. Configure:
echo    - Name: mini-ecommerce-backend
echo    - Environment: Node
echo    - Root Directory: backend
echo    - Build Command: npm install
echo    - Start Command: npm start
echo.
echo 5. Add Environment Variables:
echo    - NODE_ENV = production
echo    - PORT = 5000
echo    - MONGODB_URI = your-mongodb-atlas-uri
echo    - JWT_SECRET = your-jwt-secret
echo    - CORS_ORIGIN = https://your-app.vercel.app
echo.
echo 6. Click "Create Web Service"
echo 7. Wait for deployment
echo 8. Note your backend URL
echo.
echo 📋 Steps to update Vercel:
echo.
echo 1. Go to your Vercel project dashboard
echo 2. Go to Settings → Environment Variables
echo 3. Add/Update: VITE_API_URL = https://your-backend-url.onrender.com
echo 4. Redeploy frontend
echo.
echo ✅ Backend ready for deployment!
pause
