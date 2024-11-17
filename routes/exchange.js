const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
const authenticateToken = require('../middlewares/authMiddleware');
const User = require('../models/user');

// Create a new exchange request
router.post('/request', authenticateToken, async (req, res) => {
    try {
        const { bookId, ownerId } = req.body;
        const user = await User.findById(req.user.id);
        const owner = await User.findById(ownerId);

        const exchangeRequest = { requester: req.user.id, bookId };
        owner.exchangeRequests.push(exchangeRequest);
        await owner.save();

        res.status(201).json({ message: 'Exchange request created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get exchange requests for a user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('exchangeRequests.requester', 'username');
        res.json(user.exchangeRequests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Respond to an exchange request
router.put('/respond/:requestId', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findById(req.user.id);
        const request = user.exchangeRequests.id(req.params.requestId);
        request.status = status;
        await user.save();
        res.json({ message: `Exchange request ${status}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
