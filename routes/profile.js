const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
const authenticateToken = require('../middlewares/authMiddleware');
const User = require('../models/user');

// Get user profile
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user.profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user profile
router.put('/', authenticateToken, async (req, res) => {
    try {
        const { bio, location, favoriteGenres } = req.body;
        const user = await User.findById(req.user.id);
        user.profile = { bio, location, favoriteGenres };
        await user.save();
        res.json(user.profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
