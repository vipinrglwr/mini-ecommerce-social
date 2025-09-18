@echo off
echo Fixing product images to match product names...
cd backend
node scripts/fixProductImages.js
echo Product images fixed successfully!
pause
