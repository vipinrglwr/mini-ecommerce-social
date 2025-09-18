@echo off
echo Checking products in database...
cd backend
node -e "
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function checkProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-ecommerce');
    console.log('✅ Connected to MongoDB');
    console.log('');
    
    // Get all products
    const products = await Product.find({});
    console.log('📦 Total products in database:', products.length);
    console.log('');
    
    // Show all product names and image counts
    products.forEach((product, index) => {
      console.log(\`\${index + 1}. \${product.name}\`);
      console.log(\`   Images: \${product.images.length}\`);
      console.log(\`   Image URLs: \${product.images.join(', ')}\`);
      console.log('');
    });
    
    // Specifically check Skincare Set
    const skincareSet = await Product.findOne({ name: 'Skincare Set' });
    if (skincareSet) {
      console.log('🔍 SKINCARE SET DETAILS:');
      console.log('Name:', skincareSet.name);
      console.log('Price:', skincareSet.price);
      console.log('Category:', skincareSet.category);
      console.log('Images:', skincareSet.images);
      console.log('Featured:', skincareSet.featured);
    } else {
      console.log('❌ Skincare Set not found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkProducts();
"
pause
