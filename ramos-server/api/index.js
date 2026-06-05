const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const userRoutes = require("../routes/userRoutes");

const app = express();

let dbConnected = false;

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Database connection failed",
      error: err.message,
    });
  }
});

// IMPORTANT: REMOVE /api prefix (this is the real fix)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running on Vercel!",
  });
});

app.use("/users", userRoutes);

module.exports = app;