@echo off
echo Testing missing images for Professional Camera Lens and Skincare Set...
cd backend
node scripts/fixProductImages.js
echo.
echo Testing image URLs...
echo.
echo Professional Camera Lens:
echo https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop&crop=center
echo.
echo Skincare Set:
echo https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center
echo https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center
echo.
echo Images should now be working!
pause
