@echo off
echo Reseeding database with Smart Home Speaker...
cd backend
node scripts/seedData.js
echo Database reseeded successfully!
pause
