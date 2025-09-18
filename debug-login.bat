@echo off
echo Debugging login issue...
cd backend
node -e "
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function debugLogin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-ecommerce');
    console.log('✅ Connected to MongoDB');
    console.log('');
    
    // Get all users
    const users = await User.find({});
    console.log('👥 Total users in database:', users.length);
    console.log('');
    
    // Show user details (without passwords)
    users.forEach((user, index) => {
      console.log(\`\${index + 1}. Username: \${user.username}\`);
      console.log(\`   Email: \${user.email}\`);
      console.log(\`   Password Hash: \${user.password.substring(0, 20)}...\`);
      console.log(\`   Created: \${user.createdAt}\`);
      console.log('');
    });
    
    // Test password comparison for first user
    if (users.length > 0) {
      const testUser = users[0];
      console.log('🔍 Testing password for:', testUser.username);
      
      // Test with common passwords
      const testPasswords = ['password123', 'password', '123456', 'admin'];
      
      for (const testPassword of testPasswords) {
        try {
          const isMatch = await testUser.comparePassword(testPassword);
          console.log(\`   Password '\${testPassword}': \${isMatch ? '✅ MATCH' : '❌ NO MATCH'}\`);
        } catch (error) {
          console.log(\`   Password '\${testPassword}': ❌ ERROR - \${error.message}\`);
        }
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

debugLogin();
"
pause
