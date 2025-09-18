@echo off
echo 🗄️ Starting Local MongoDB...
echo.

echo 1. Starting MongoDB service...
net start MongoDB
echo.

echo 2. Testing connection...
timeout /t 2
echo.

echo 3. Starting backend server...
cd backend
start /B node server.js
echo.

echo 4. Testing API...
timeout /t 3
curl http://localhost:5000/health
echo.

echo ✅ MongoDB and Backend started!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo.
pause
