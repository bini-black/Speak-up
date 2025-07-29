import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import psychiatristRoutes from './routes/psychiatristRoutes.js';
import runSeedData from './seedData/seed.js';
import apiLimiter from './middlewares/rateLimiter.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Middleware
app.use(helmet()); // Add basic security headers
app.use(express.json()); // Parse incoming JSON
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); // HTTP request logger in dev mode
}

// CORS Configuration
const allowedOrigins = [CLIENT_URL];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error(`CORS policy does not allow access from ${origin}`), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy 🚀' });
});

app.use(apiLimiter); // Apply to all routes

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/psychiatrists', psychiatristRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

// Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    // Optionally seed data
    await runSeedData();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit the app on DB connection failure
  }
};

startServer();
