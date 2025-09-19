const mongoose = require('mongoose');
const Product = require('./backend/models/Product');
const User = require('./backend/models/User');

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 15999,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop&crop=center"
    ],
    category: "electronics",
    brand: "SoundMax",
    inStock: true,
    stockQuantity: 50,
    featured: true,
    tags: ["wireless", "bluetooth", "headphones", "noise-cancellation"]
  },
  {
    name: "Vintage Denim Jacket",
    description: "Classic vintage-style denim jacket perfect for any casual occasion.",
    price: 7199,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&crop=center"
    ],
    category: "clothing",
    brand: "DenimCo",
    inStock: true,
    stockQuantity: 25,
    featured: true,
    tags: ["denim", "jacket", "vintage", "casual"]
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking watch with heart rate monitor and GPS.",
    price: 23999,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop&crop=center"
    ],
    category: "electronics",
    brand: "FitTech",
    inStock: true,
    stockQuantity: 30,
    featured: true,
    tags: ["fitness", "watch", "smart", "gps", "heart-rate"]
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt in various colors.",
    price: 1999,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop&crop=center"
    ],
    category: "clothing",
    brand: "EcoWear",
    inStock: true,
    stockQuantity: 100,
    featured: false,
    tags: ["organic", "cotton", "sustainable", "t-shirt"]
  },
  {
    name: "Minimalist Desk Lamp",
    description: "Sleek and modern desk lamp with adjustable brightness and USB charging port.",
    price: 6399,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=500&fit=crop&crop=center"
    ],
    category: "home",
    brand: "ModernHome",
    inStock: true,
    stockQuantity: 40,
    featured: true,
    tags: ["lamp", "desk", "minimalist", "usb", "adjustable"]
  },
  {
    name: "Professional Camera Lens",
    description: "High-quality 50mm f/1.8 lens perfect for portrait photography.",
    price: 35999,
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop&crop=center"
    ],
    category: "electronics",
    brand: "PhotoPro",
    inStock: true,
    stockQuantity: 15,
    featured: false,
    tags: ["camera", "lens", "photography", "portrait", "professional"]
  },
  {
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with extra cushioning for all types of yoga practice.",
    price: 4799,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1506629905607-4b0a4b0b0b0b?w=500&h=500&fit=crop&crop=center"
    ],
    category: "sports",
    brand: "YogaLife",
    inStock: true,
    stockQuantity: 60,
    featured: false,
    tags: ["yoga", "mat", "fitness", "non-slip", "cushioning"]
  },
  {
    name: "Skincare Set",
    description: "Complete skincare routine set with cleanser, moisturizer, and serum.",
    price: 10399,
    images: [
      "https://picsum.photos/500/500?random=100",
      "https://picsum.photos/500/500?random=101"
    ],
    category: "beauty",
    brand: "GlowSkin",
    inStock: true,
    stockQuantity: 35,
    featured: true,
    tags: ["skincare", "beauty", "set", "cleanser", "moisturizer"]
  },
  {
    name: "Programming Book Collection",
    description: "Complete set of programming books covering JavaScript, React, and Node.js.",
    price: 7199,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center"
    ],
    category: "books",
    brand: "TechBooks",
    inStock: true,
    stockQuantity: 20,
    featured: false,
    tags: ["programming", "books", "javascript", "react", "nodejs"]
  },
  {
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with excellent sound quality and smart home integration.",
    price: 14399,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center"
    ],
    category: "electronics",
    brand: "SmartHome",
    inStock: true,
    stockQuantity: 45,
    featured: true,
    tags: ["smart", "speaker", "voice-control", "home", "ai"]
  }
];

const sampleUsers = [
  {
    username: "rajesh_kumar",
    email: "rajesh.kumar@gmail.com",
    password: "password123",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    username: "priya_sharma",
    email: "priya.sharma@gmail.com",
    password: "password123",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
  },
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  }
];

const seedProductionDatabase = async () => {
  try {
    // You need to replace this with your actual MongoDB Atlas connection string
    const mongoUri = process.env.MONGODB_URI || 'YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE';
    
    if (mongoUri === 'YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE') {
      console.log('❌ Please set your MongoDB Atlas connection string!');
      console.log('1. Get your connection string from MongoDB Atlas');
      console.log('2. Replace YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE in this file');
      console.log('3. Or set MONGODB_URI environment variable');
      process.exit(1);
    }
    
    console.log('Connecting to production database...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to production MongoDB Atlas');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`👥 Created ${users.length} users`);

    // Create sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`📦 Created ${products.length} products`);

    // Add some likes to products
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
      product.likes = randomUsers.map(user => user._id);
      product.likesCount = product.likes.length;
      product.sharesCount = Math.floor(Math.random() * 20);
      product.commentsCount = Math.floor(Math.random() * 15);
      await product.save();
    }

    console.log('🎉 Production database seeded successfully!');
    console.log(`✅ ${products.length} products created`);
    console.log(`✅ ${users.length} users created`);
    console.log('🌐 Your backend is now ready with data!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding production database:', error);
    process.exit(1);
  }
};

// Run the seeding
seedProductionDatabase();
