// Test CORS configuration
const https = require('https');

function testCORS() {
  const options = {
    hostname: 'mini-ecommerce-backend-ppue.onrender.com',
    port: 443,
    path: '/api/products/categories',
    method: 'GET',
    headers: {
      'Origin': 'https://your-app.vercel.app',
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Response:', data);
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  req.end();
}

testCORS();
