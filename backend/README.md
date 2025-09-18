# E-Commerce Social Backend

Backend API for the Mini E-Commerce + Social Feed Web App built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based authentication with password hashing
- **Product Management**: CRUD operations for products with social features
- **Shopping Cart**: Full cart functionality with user-specific data
- **Comments System**: Social comments with likes and replies
- **Data Seeding**: Sample data for development and testing

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```

3. **Configure environment variables**
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce_social
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/ecommerce_social`

5. **Seed the database** (optional)
   ```bash
   node scripts/seedData.js
   ```

6. **Start the server**
   ```bash
   npm run dev
   ```

The server will start on http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=10&category=electronics&search=phone&sortBy=price&sortOrder=asc
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Like/Unlike Product
```http
POST /api/products/:id/like
Authorization: Bearer <jwt_token>
```

#### Share Product
```http
POST /api/products/:id/share
```

#### Get Featured Products
```http
GET /api/products/featured
```

#### Get Categories
```http
GET /api/products/categories
```

### Cart Endpoints

#### Get User's Cart
```http
GET /api/cart
Authorization: Bearer <jwt_token>
```

#### Add Item to Cart
```http
POST /api/cart
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /api/cart/:productId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove Item from Cart
```http
DELETE /api/cart/:productId
Authorization: Bearer <jwt_token>
```

#### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <jwt_token>
```

### Comment Endpoints

#### Get Product Comments
```http
GET /api/comments/:productId?page=1&limit=10
```

#### Add Comment
```http
POST /api/comments/:productId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "text": "Great product!",
  "parentCommentId": "optional_parent_comment_id"
}
```

#### Like/Unlike Comment
```http
POST /api/comments/:commentId/like
Authorization: Bearer <jwt_token>
```

#### Delete Comment
```http
DELETE /api/comments/:commentId
Authorization: Bearer <jwt_token>
```

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (required, unique)
  email: String (required, unique)
  password: String (required, hashed)
  profilePicture: String
  likedProducts: [ObjectId] (ref: Product)
  cart: [{
    product: ObjectId (ref: Product)
    quantity: Number
  }]
  createdAt: Date
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String (required)
  description: String (required)
  price: Number (required)
  images: [String] (required)
  category: String (required, enum)
  brand: String
  inStock: Boolean
  stockQuantity: Number
  likes: [ObjectId] (ref: User)
  likesCount: Number
  sharesCount: Number
  commentsCount: Number
  tags: [String]
  featured: Boolean
  createdAt: Date
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  product: ObjectId (ref: Product, required)
  user: ObjectId (ref: User, required)
  text: String (required, max 500 chars)
  likes: [ObjectId] (ref: User)
  likesCount: Number
  parentComment: ObjectId (ref: Comment)
  replies: [ObjectId] (ref: Comment)
  createdAt: Date
  updatedAt: Date
}
```

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### CORS Configuration
The server is configured to accept requests from:
- `http://localhost:3000` (development frontend)
- Any origin in production (configure as needed)

## 🧪 Testing

### Test the API
```bash
# Test all endpoints
npm run test

# Test specific endpoint
curl -X GET http://localhost:5000/api/products
```

### Sample Data
The seed script creates:
- 3 sample users
- 10 sample products with various categories
- Random likes and social interactions

## 🚀 Deployment

### Environment Setup
1. Set production environment variables
2. Configure MongoDB Atlas or production MongoDB
3. Set up proper CORS for your frontend domain

### Deployment Options
- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern deployment platform
- **DigitalOcean**: VPS deployment
- **AWS**: EC2 with RDS or DocumentDB

### Production Checklist
- [ ] Set secure JWT secret
- [ ] Configure production MongoDB
- [ ] Set up CORS for frontend domain
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup strategy

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Rate limiting (recommended for production)

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `node scripts/seedData.js` - Seed database with sample data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the API documentation
- Review the code comments

---

**Happy Coding! 🚀**
