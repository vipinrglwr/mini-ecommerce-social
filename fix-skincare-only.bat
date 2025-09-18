@echo off
echo Fixing Skincare Set images specifically...
cd backend
node -e "
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function fixSkincareSet() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-ecommerce');
    console.log('Connected to MongoDB');
    
    const result = await Product.updateOne(
      { name: 'Skincare Set' },
      { \$set: { 
        images: [
          'https://picsum.photos/500/500?random=100',
          'https://picsum.photos/500/500?random=101'
        ]
      }}
    );
    
    if (result.modifiedCount > 0) {
      console.log('✅ Updated Skincare Set images successfully!');
    } else {
      console.log('❌ Skincare Set not found or not updated');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixSkincareSet();
"
echo Skincare Set images fixed!
pause
