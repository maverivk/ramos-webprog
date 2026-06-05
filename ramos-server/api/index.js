const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Debug: Check if routes file can be found
console.log('Current directory:', __dirname);
console.log('Looking for routes at:', require('path').resolve(__dirname, '../routes/userRoutes'));

let userRoutes;
try {
  userRoutes = require('../routes/userRoutes');
  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('❌ Failed to load routes:', error.message);
  // Create a fallback route for testing
  userRoutes = (req, res) => {
    res.status(500).json({ error: 'Routes not loaded', details: error.message });
  };
}

// Cache database connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }
  
  console.log('=> Creating new database connection');
  
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI environment variable is missing!');
    return;
  }
  
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('✅ MongoDB Connected');
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

// Handle 404
app.use('/*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Error handler
app.use('/*', (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;