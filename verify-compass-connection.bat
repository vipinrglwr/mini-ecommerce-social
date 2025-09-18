@echo off
echo Verifying MongoDB connection for Compass...
echo.
echo 1. First, make sure MongoDB is running:
echo    - Run start-mongodb.bat as Administrator
echo    - Or start MongoDB service manually
echo.
echo 2. Test connection:
cd backend
node -e "
const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-ecommerce');
    console.log('✅ MongoDB is running and accessible');
    console.log('✅ Connection string for Compass: mongodb://localhost:27017');
    console.log('✅ Database name: mini-ecommerce');
    console.log('✅ You can now open MongoDB Compass and connect!');
    process.exit(0);
  } catch (error) {
    console.log('❌ MongoDB is not running or not accessible');
    console.log('❌ Error:', error.message);
    console.log('❌ Please start MongoDB first using start-mongodb.bat');
    process.exit(1);
  }
}

testConnection();
"
echo.
echo If you see "✅ MongoDB is running", you can open Compass now!
pause
