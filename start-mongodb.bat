@echo off
echo Starting MongoDB service...
net start MongoDB
if %errorlevel% neq 0 (
    echo Failed to start MongoDB service. Please run as Administrator.
    echo Alternative: Start MongoDB manually from Services or use MongoDB Compass
    pause
) else (
    echo MongoDB service started successfully!
    echo Starting the application...
    cd backend
    npm run dev
)
