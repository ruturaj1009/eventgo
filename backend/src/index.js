const express = require("express");
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const eventRoutes = require("./routes/event.routes");
const errorMiddleware = require("./middleware/error.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/events", eventRoutes);

app.use((req, res, next) => {
  const error = new Error(`Route Not Found`);
  res.status(404);
  next(error);
});

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 6060;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
