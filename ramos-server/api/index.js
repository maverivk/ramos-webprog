const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('../config/db');  // Use the updated cached version
const userRoutes = require('../routes/userRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

// Connect to DB before each request (will use cached connection)
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
  res.status(404).json({ 
    message: `Cannot ${req.method} ${req.originalUrl}`,
    path: req.originalUrl
  });
});

module.exports = app;