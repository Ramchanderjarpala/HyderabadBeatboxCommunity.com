import express from 'express';
import Video from '../models/Video.js';
import { protect } from '../middleware/authMiddleware.js';
import axios from 'axios';

const router = express.Router();

// Helper function to get YouTube video ID
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Public routes
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let query = Video.find({}).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(limit);
    }

    const videos = await query;
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected routes
router.post('/', protect, async (req, res) => {
  try {
    const { url, title } = req.body;
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    const video = await Video.create({
      url: embedUrl,
      title,
      thumbnail
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;