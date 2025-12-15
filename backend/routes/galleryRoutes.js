import express from 'express';
import Gallery from '../models/Gallery.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let query = Gallery.find({}).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(limit);
    }

    const images = await query;
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected routes
router.post('/', protect, async (req, res) => {
  try {
    const { image, title } = req.body;
    const gallery = await Gallery.create({ image, title });
    res.status(201).json(gallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;