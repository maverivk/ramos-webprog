const mongoose = require('mongoose');

// Cache the connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }
  
  try {
    console.log('=> Creating new database connection');
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Don't exit process in serverless - just throw error
    throw error;
  }
}

module.exports = connectDB;