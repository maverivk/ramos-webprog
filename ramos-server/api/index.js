const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('../routes/userRoutes');

const app = express();

// Cache database connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }
  
  console.log('=> Creating new database connection');
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('MongoDB Connected');
};

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

// Connect to DB before each request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is running on Vercel!',
    timestamp: new Date().toISOString()
  });
});

// Your existing user routes
app.use('/api/users', userRoutes);

// Handle 404 - FIXED: Changed '*', to '/*'
app.use('/*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Error handler - FIXED: Changed '*', to '/*' (optional, but good practice)
app.use('/*', (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Export for Vercel (no app.listen!)
module.exports = app;