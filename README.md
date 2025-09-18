# 🛒 Mini E-Commerce + Social Feed

A modern, responsive e-commerce platform with social features built using React, Node.js, and MongoDB.

## ✨ Features

- **🔐 Authentication**: JWT-based login/register system
- **🛍️ E-Commerce**: Product browsing, cart, checkout
- **👥 Social Features**: Product likes, comments, social feed
- **🎨 Modern UI**: Material-UI components with dark/light mode
- **📱 Responsive**: Mobile-first design
- **🔍 Search**: Voice search and AI recommendations
- **♾️ Infinite Scroll**: Smooth product loading
- **💰 Multi-currency**: Indian Rupee support

## 🚀 Live Demo

- **Frontend**: [View on Netlify](https://your-app.netlify.app)
- **Backend API**: [View on Render](https://your-api.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Redux Toolkit** - State management
- **Material-UI** - Component library
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mini-ecommerce-social.git
   cd mini-ecommerce-social
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Frontend
   cd frontend
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🗄️ Database Setup

### Option 1: Local MongoDB
```bash
# Start MongoDB service
mongod

# Seed the database
cd backend
npm run seed
```

### Option 2: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `.env` file with your connection string

## 🚀 Deployment

### Frontend (Netlify/Vercel)

#### Netlify
1. Connect your GitHub repository
2. Set build command: `cd frontend && npm run build`
3. Set publish directory: `frontend/dist`
4. Add environment variables:
   - `VITE_API_URL`: Your backend API URL

#### Vercel
1. Import your GitHub repository
2. Set root directory: `frontend`
3. Add environment variables:
   - `VITE_API_URL`: Your backend API URL

### Backend (Render/Heroku)

#### Render
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production

#### Heroku
1. Create a new Heroku app
2. Connect your GitHub repository
3. Add MongoDB addon (MongoDB Atlas)
4. Set environment variables
5. Deploy from main branch

## 📁 Project Structure

```
mini-ecommerce-social/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js backend
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── services/            # Business logic
│   ├── scripts/             # Database scripts
│   ├── package.json
│   └── server.js
├── docs/                    # Documentation
├── .gitignore
└── README.md
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed the database
- `npm run test` - Run tests

## 🧪 Testing

### Test Accounts
- **Email**: rajesh.kumar@gmail.com
- **Password**: password123

- **Email**: priya.sharma@gmail.com
- **Password**: password123

### API Testing
```bash
# Test products endpoint
curl http://localhost:5000/api/products

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rajesh.kumar@gmail.com","password":"password123"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Material-UI for the component library
- Unsplash for product images
- MongoDB for the database
- All the open-source contributors

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact: your.email@example.com

---

⭐ **Star this repository if you found it helpful!**