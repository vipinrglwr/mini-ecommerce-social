# 🚀 Deployment Guide

This guide will help you deploy the Mini E-Commerce + Social Feed application to production platforms.

## 📋 Prerequisites

- GitHub repository
- MongoDB Atlas account (for production database)
- Netlify/Vercel account (for frontend)
- Render/Heroku account (for backend)

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Choose a cloud provider and region close to your users

### 2. Configure Database
1. Create a database named `mini-ecommerce`
2. Create collections: `products`, `users`, `comments`
3. Set up database user with read/write permissions
4. Get your connection string

### 3. Network Access
1. Add your IP address to the whitelist
2. For production, add `0.0.0.0/0` to allow all IPs

## 🎨 Frontend Deployment

### Option 1: Netlify

#### Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Publish directory**: `frontend/dist`
3. Add environment variables:
   - `VITE_API_URL`: `https://your-api.onrender.com`
4. Deploy

#### Manual Deployment
```bash
# Build the frontend
cd frontend
npm install
npm run build

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=dist
```

### Option 2: Vercel

#### Automatic Deployment
1. Import your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variables:
   - `VITE_API_URL`: `https://your-api.onrender.com`
4. Deploy

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

## ⚙️ Backend Deployment

### Option 1: Render

#### Setup
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: Your frontend URL

#### Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your service URL

### Option 2: Heroku

#### Setup
1. Create a new Heroku app
2. Connect your GitHub repository
3. Add MongoDB Atlas addon
4. Set environment variables:
   - `JWT_SECRET`: A strong secret key
   - `NODE_ENV`: `production`

#### Deploy
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri

# Deploy
git push heroku main
```

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-api.onrender.com
VITE_APP_NAME=Mini E-Commerce Social
VITE_APP_VERSION=1.0.0
```

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=https://your-app.netlify.app
```

## 🧪 Testing Deployment

### 1. Health Check
```bash
# Check backend health
curl https://your-api.onrender.com/health

# Expected response:
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

### 2. API Endpoints
```bash
# Test products endpoint
curl https://your-api.onrender.com/api/products

# Test authentication
curl -X POST https://your-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rajesh.kumar@gmail.com","password":"password123"}'
```

### 3. Frontend
1. Visit your frontend URL
2. Test user registration
3. Test product browsing
4. Test cart functionality

## 🔍 Troubleshooting

### Common Issues

#### 1. CORS Errors
- Ensure `CORS_ORIGIN` includes your frontend URL
- Check that your frontend URL is in the allowed origins list

#### 2. Database Connection Issues
- Verify MongoDB Atlas connection string
- Check network access settings
- Ensure database user has correct permissions

#### 3. Build Failures
- Check Node.js version compatibility
- Ensure all dependencies are installed
- Check for TypeScript errors

#### 4. Environment Variables
- Verify all required environment variables are set
- Check for typos in variable names
- Ensure values are properly quoted

### Debug Commands

```bash
# Check backend logs
heroku logs --tail

# Check frontend build
npm run build

# Test API locally
curl http://localhost:5000/health
```

## 📊 Monitoring

### 1. Backend Monitoring
- Use Render/Heroku dashboard for server metrics
- Monitor MongoDB Atlas for database performance
- Set up error tracking (Sentry, etc.)

### 2. Frontend Monitoring
- Use Netlify/Vercel analytics
- Monitor Core Web Vitals
- Set up error tracking

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './frontend/dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        uses: render-actions/deploy@v1
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

## 🎯 Performance Optimization

### Frontend
- Enable gzip compression
- Optimize images
- Use CDN for static assets
- Implement lazy loading

### Backend
- Enable gzip compression
- Use Redis for caching
- Optimize database queries
- Implement rate limiting

## 🔒 Security Checklist

- [ ] Use HTTPS for all endpoints
- [ ] Set secure JWT secrets
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities

## 📈 Scaling Considerations

### Database
- Use MongoDB Atlas auto-scaling
- Implement database indexing
- Consider read replicas

### Backend
- Use load balancers
- Implement horizontal scaling
- Use Redis for session storage

### Frontend
- Use CDN for global distribution
- Implement service workers
- Optimize bundle size

---

## 🆘 Support

If you encounter issues during deployment:

1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Check application logs
4. Open an issue on GitHub

**Happy Deploying! 🚀**
