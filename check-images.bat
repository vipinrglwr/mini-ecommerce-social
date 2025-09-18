@echo off
echo Checking product images specifically...
cd backend
node -e "
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function checkImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-ecommerce');
    console.log('✅ Connected to MongoDB');
    console.log('');
    
    // Check products with missing or problematic images
    const productsToCheck = [
      'Skincare Set',
      'Professional Camera Lens',
      'Smart Home Speaker'
    ];
    
    for (const productName of productsToCheck) {
      const product = await Product.findOne({ name: productName });
      if (product) {
        console.log(\`🔍 \${productName}:\`);
        console.log(\`   Images (\${product.images.length}):\`);
        product.images.forEach((url, index) => {
          console.log(\`   \${index + 1}. \${url}\`);
        });
        console.log('');
      } else {
        console.log(\`❌ \${productName} not found!\`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkImages();
"
pause
