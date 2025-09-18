const mongoose = require('mongoose');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();

// Updated product images with correct matching images
const productImageUpdates = [
  {
    name: "Wireless Bluetooth Headphones",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop&crop=center"
    ]
  },
  {
    name: "Vintage Denim Jacket",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&crop=center"
    ]
  },
  {
    name: "Smart Fitness Watch",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop&crop=center"
    ]
  },
  {
    name: "Organic Cotton T-Shirt",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop&crop=center"
    ]
  },
  {
    name: "Minimalist Desk Lamp",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop&crop=center"
    ]
  },
  {
    name: "Professional Camera Lens",
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop&crop=center"
    ]
  },
  {
    name: "Yoga Mat Premium",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&h=500&fit=crop&crop=center"
    ]
  },
  {
    name: "Skincare Set",
    images: [
      "https://picsum.photos/500/500?random=100",
      "https://picsum.photos/500/500?random=101"
    ]
  },
  {
    name: "Programming Book Collection",
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center"
    ]
  },
  {
    name: "Smart Home Speaker",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center"
    ]
  }
];

async function updateProductImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    for (const update of productImageUpdates) {
      const result = await Product.updateOne(
        { name: update.name },
        { $set: { images: update.images } }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`✅ Updated images for: ${update.name}`);
      } else {
        console.log(`❌ Product not found or not updated: ${update.name}`);
      }
    }

    console.log('✅ All product images updated!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating product images:', error);
    process.exit(1);
  }
}

updateProductImages();
