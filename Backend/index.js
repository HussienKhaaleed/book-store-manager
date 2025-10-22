const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");  
require("dotenv").config({ quiet: true });

const bookRouter = require("./router/book.router");
const authRouter = require("./router/auth.router");
const userRouter = require("./router/user.router");
const customLogger = require("./Middleware/logging.midleware");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(customLogger); // Custom logging middleware

// Routes
app.use("/books", bookRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongoose Connected!");
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("❌ Connection error:", err.message);
    process.exit(1);
  });