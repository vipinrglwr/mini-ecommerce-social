@echo off
echo 🚀 Deploying to Production...
echo.

echo 1. Building frontend...
cd frontend
call npm install
call npm run build
echo ✅ Frontend built successfully
echo.

echo 2. Preparing backend...
cd ../backend
call npm install
echo ✅ Backend prepared
echo.

echo 3. Creating deployment package...
cd ..
if exist deploy-package rmdir /s /q deploy-package
mkdir deploy-package
xcopy frontend\dist deploy-package\frontend\dist /E /I
xcopy backend deploy-package\backend /E /I /EXCLUDE:exclude.txt
echo ✅ Deployment package created
echo.

echo 4. Deployment Instructions:
echo.
echo 📦 Frontend (Netlify/Vercel):
echo    - Upload deploy-package\frontend\dist
echo    - Set environment variable: VITE_API_URL=https://your-api.onrender.com
echo.
echo ⚙️ Backend (Render/Heroku):
echo    - Upload deploy-package\backend
echo    - Set environment variables:
echo      - MONGODB_URI=your-mongodb-atlas-uri
echo      - JWT_SECRET=your-jwt-secret
echo      - NODE_ENV=production
echo      - CORS_ORIGIN=https://your-app.netlify.app
echo.
echo 📋 Next Steps:
echo    1. Create MongoDB Atlas database
echo    2. Deploy backend to Render/Heroku
echo    3. Deploy frontend to Netlify/Vercel
echo    4. Update CORS_ORIGIN with frontend URL
echo    5. Test the deployed application
echo.
echo ✅ Deployment package ready in deploy-package folder
pause
