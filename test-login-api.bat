@echo off
echo Testing login API...
cd backend
node -e "
const axios = require('axios');

async function testLoginAPI() {
  try {
    console.log('🧪 Testing Login API...');
    console.log('');
    
    // Test with sample credentials
    const testCredentials = [
      { email: 'rajesh.kumar@gmail.com', password: 'password123' },
      { email: 'priya.sharma@gmail.com', password: 'password123' },
      { email: 'test@example.com', password: 'password123' }
    ];
    
    for (const credentials of testCredentials) {
      try {
        console.log(\`Testing login for: \${credentials.email}\`);
        
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        
        if (response.data.token) {
          console.log('✅ Login successful!');
          console.log('   Token:', response.data.token.substring(0, 20) + '...');
          console.log('   User:', response.data.user.username);
        } else {
          console.log('❌ Login failed - No token received');
        }
      } catch (error) {
        console.log('❌ Login failed:', error.response?.data?.message || error.message);
      }
      console.log('');
    }
    
    // Test registration
    console.log('🧪 Testing Registration API...');
    try {
      const newUser = {
        username: 'testuser' + Date.now(),
        email: 'test' + Date.now() + '@example.com',
        password: 'password123'
      };
      
      const response = await axios.post('http://localhost:5000/api/auth/register', newUser);
      
      if (response.data.token) {
        console.log('✅ Registration successful!');
        console.log('   Username:', response.data.user.username);
        console.log('   Email:', response.data.user.email);
        
        // Now test login with the new user
        console.log('🧪 Testing login with newly registered user...');
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
          email: newUser.email,
          password: newUser.password
        });
        
        if (loginResponse.data.token) {
          console.log('✅ Login with new user successful!');
        } else {
          console.log('❌ Login with new user failed');
        }
      } else {
        console.log('❌ Registration failed - No token received');
      }
    } catch (error) {
      console.log('❌ Registration failed:', error.response?.data?.message || error.message);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testLoginAPI();
"
pause
