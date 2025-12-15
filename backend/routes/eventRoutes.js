import express from 'express';
import Event from '../models/Event.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let query = Event.find().sort({ date: 1 }); // Assuming we want nearest events first? or createdAt? Default was unsorted (natural)
    // Actually Event model has 'date' string. Sorting by string date might be wrong if format is not ISO. 
    // Let's stick to createdAt for consistency or natural order if date is messy. 
    // The model has { timestamps: true }.

    // User complaint: "load all events".
    // Let's use createdAt -1 for latest added, or just .find() if order matters.
    // Original was Event.find().
    // I'll adhere to minimal changes while adding limit.
    query = Event.find();

    if (limit && limit > 0) {
      query = query.limit(limit);
    }

    const events = await query;
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
});


router.post('/', protect, async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;