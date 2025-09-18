@echo off
echo Fixing login issue...
echo.
echo 1. Stopping any running backend servers...
taskkill /f /im node.exe 2>nul
echo.
echo 2. Starting MongoDB...
start-mongodb.bat
timeout /t 3
echo.
echo 3. Testing database connection...
cd backend
node -e "
const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-ecommerce');
    console.log('✅ MongoDB connected successfully');
    
    // Check if users exist
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    console.log('👥 Users in database:', userCount);
    
    if (userCount === 0) {
      console.log('⚠️  No users found. Seeding database...');
      require('./scripts/seedData.js');
    }
    
    process.exit(0);
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
"
echo.
echo 4. Starting backend server...
start cmd /k "cd backend && npm start"
timeout /t 5
echo.
echo 5. Testing login API...
node -e "
const axios = require('axios');

async function testLogin() {
  try {
    // Test with seeded users
    const testUsers = [
      { email: 'rajesh.kumar@gmail.com', password: 'password123' },
      { email: 'priya.sharma@gmail.com', password: 'password123' }
    ];
    
    for (const user of testUsers) {
      try {
        console.log(\`Testing login for: \${user.email}\`);
        const response = await axios.post('http://localhost:5000/api/auth/login', user);
        
        if (response.data.token) {
          console.log('✅ Login successful!');
          console.log('   Username:', response.data.user.username);
        } else {
          console.log('❌ Login failed - No token');
        }
      } catch (error) {
        console.log('❌ Login failed:', error.response?.data?.message || error.message);
      }
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testLogin();
"
echo.
echo 6. Starting frontend...
cd ..
start cmd /k "cd frontend && npm run dev"
echo.
echo ✅ Fix complete! Try logging in now.
echo.
echo Test users:
echo - Email: rajesh.kumar@gmail.com, Password: password123
echo - Email: priya.sharma@gmail.com, Password: password123
echo.
pause
