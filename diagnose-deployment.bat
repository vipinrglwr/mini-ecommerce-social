@echo off
echo 🔍 Diagnosing Deployment Issues
echo.

echo 📋 Step 1: Check Backend Status
echo Testing backend health endpoint...
curl https://mini-ecommerce-backend.onrender.com/health
echo.

echo 📋 Step 2: Check MongoDB Atlas
echo 1. Go to https://cloud.mongodb.com
echo 2. Check if your cluster is running
echo 3. Verify network access is set to 0.0.0.0/0
echo 4. Check if database user exists
echo.

echo 📋 Step 3: Check Render Dashboard
echo 1. Go to https://dashboard.render.com
echo 2. Check your service status
echo 3. Look for error messages in logs
echo 4. Verify environment variables are set
echo.

echo 📋 Step 4: Common Fixes
echo 1. Update MONGODB_URI with correct cluster URL
echo 2. Check JWT_SECRET is set
echo 3. Verify CORS_ORIGIN matches your frontend URL
echo 4. Redeploy the backend service
echo.

echo ✅ Diagnosis complete!
echo.
pause
