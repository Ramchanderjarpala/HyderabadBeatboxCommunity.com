import express from 'express';
import HomeImage from '../models/HomeImage.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', async (req, res) => {
    try {
        const images = await HomeImage.find({});
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Protected routes
router.post('/', protect, async (req, res) => {
    try {
        const { image } = req.body;
        const homeImage = await HomeImage.create({ image });
        res.status(201).json(homeImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        await HomeImage.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;