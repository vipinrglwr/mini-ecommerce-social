// Test CORS configuration for Netlify
const https = require('https');

function testNetlifyCORS() {
  const options = {
    hostname: 'mini-ecommerce-backend-ppue.onrender.com',
    port: 443,
    path: '/api/products/categories',
    method: 'GET',
    headers: {
      'Origin': 'https://your-app.netlify.app',
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    console.log('Status:', res.statusCode);
    console.log('CORS Origin:', res.headers['access-control-allow-origin']);
    
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

testNetlifyCORS();
