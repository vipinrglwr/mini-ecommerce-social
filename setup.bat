@echo off
echo Setting up E-Commerce Social App...

echo.
echo 1. Installing backend dependencies...
cd backend
npm install

echo.
echo 2. Creating environment file...
if not exist .env (
    echo PORT=5000 > .env
    echo MONGODB_URI=mongodb://localhost:27017/ecommerce_social >> .env
    echo JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure >> .env
    echo NODE_ENV=development >> .env
    echo Environment file created!
) else (
    echo Environment file already exists.
)

echo.
echo 3. Installing frontend dependencies...
cd ..\frontend
npm install

echo.
echo 4. Seeding database...
cd ..\backend
node scripts/seedData.js

echo.
echo Setup complete! 
echo.
echo To start the application:
echo 1. Run start-mongodb.bat as Administrator (to start MongoDB)
echo 2. Or start MongoDB manually from Services
echo 3. Then run: npm run dev (from the root directory)
echo.
pause
