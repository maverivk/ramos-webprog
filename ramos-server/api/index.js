const app = require("../index");

const mongoose = require("mongoose");

app.get("/db-test", async (req, res) => {
  try {
    const state = mongoose.connection.readyState;

    res.json({
      message: "MongoDB connection status",
      state,
      status:
        state === 1
          ? "connected"
          : state === 2
          ? "connecting"
          : "disconnected",
    });
  } catch (err) {
    res.status(500).json({
      message: "DB test failed",
      error: err.message,
    });
  }
});

module.exports = app;