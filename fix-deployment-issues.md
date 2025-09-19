# 🔧 Fix Deployment Issues

## Common Backend Issues

### Issue 1: Build Failed
**Symptoms**: Backend not starting, 404 errors
**Fix**:
1. Check Render logs for build errors
2. Verify all dependencies are in package.json
3. Check Node.js version compatibility

### Issue 2: Database Connection Failed
**Symptoms**: Backend starts but can't connect to MongoDB
**Fix**:
1. Verify MONGODB_URI is correct
2. Check MongoDB Atlas network access
3. Ensure database user has correct permissions

### Issue 3: Environment Variables Missing
**Symptoms**: Backend crashes on startup
**Fix**:
1. Check all required environment variables are set
2. Verify variable names are correct (case-sensitive)
3. Check for typos in values

### Issue 4: CORS Issues
**Symptoms**: Frontend can't connect to backend
**Fix**:
1. Update CORS_ORIGIN with correct frontend URL
2. Check CORS configuration in backend

## Quick Fixes

### Fix 1: Update Environment Variables
```
NODE_ENV = production
PORT = 5000
MONGODB_URI = mongodb+srv://admin:MiniEcommerce2024!@mini-ecommerce-cluster.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
JWT_SECRET = MiniEcommerce2024_SuperSecretKey_Production
CORS_ORIGIN = https://your-app.vercel.app
```

### Fix 2: Check MongoDB Atlas
1. Go to MongoDB Atlas
2. Check cluster status
3. Verify network access (0.0.0.0/0)
4. Test connection string

### Fix 3: Redeploy Backend
1. Go to Render dashboard
2. Click "Manual Deploy"
3. Wait for deployment to complete
4. Check logs for errors
