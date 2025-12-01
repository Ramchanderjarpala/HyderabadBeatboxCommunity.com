import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';
import NodeCache from 'node-cache';
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import homeImageRoutes from './routes/homeImageRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();
connectDB();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Performance and security middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: ['https://hyderabad-beatbox-community-client.vercel.app', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize cache
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

// Cache middleware
const cacheMiddleware = (key) => (req, res, next) => {
  const cached = cache.get(key);
  if (cached) {
    return res.json(cached);
  }
  next();
};

// Routes with caching
app.use('/api/admin', adminRoutes);
app.use('/api/events', cacheMiddleware('events'), eventRoutes);
app.use('/api/gallery', cacheMiddleware('gallery'), galleryRoutes);
app.use('/api/videos', cacheMiddleware('videos'), videoRoutes);
app.use('/api/home-images', cacheMiddleware('home-images'), homeImageRoutes);
app.use('/api/blogs', blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Cache clear endpoint
app.post('/api/clear-cache', (req, res) => {
  cache.flushAll();
  res.json({ message: 'Cache cleared' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});