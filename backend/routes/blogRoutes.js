import express from 'express';
import Blog from '../models/Blog.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/blogs
// @desc    Create a new blog post
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { title, content, image, author } = req.body;
        const newBlog = new Blog({ title, content, image, author });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   GET /api/blogs
// @desc    Get all approved blog posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        let query = Blog.find({ status: 'approved' }).sort({ createdAt: -1 });

        if (limit && limit > 0) {
            query = query.limit(limit);
        }

        const blogs = await query;
        // Optimization: if list view, optionally truncate content here? 
        // For now, rely on limit and cache.
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/blogs/approved
// @desc    Get all approved blog posts
// @access  Public
router.get('/approved', async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'approved' }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/blogs/pending
// @desc    Get all pending blog posts
// @access  Protected
router.get('/pending', protect, async (req, res) => {
    try {
        const pendingBlogs = await Blog.find({ status: 'pending' }).sort({ createdAt: -1 });
        res.json(pendingBlogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/blogs/:id
// @desc    Get a single blog post by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/blogs/:id/approve
// @desc    Approve a blog post
// @access  Protected
router.put('/:id/approve', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            blog.status = 'approved';
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post
// @access  Protected
router.delete('/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            await blog.deleteOne();
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;