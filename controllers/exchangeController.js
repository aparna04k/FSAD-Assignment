const ExchangeRequest = require('../../models/exchangeRequestModel');

// Send a book exchange request
const sendExchangeRequest = async (req, res) => {
    const { book, terms } = req.body;
    const requester = req.user.id;

    try {
        const request = new ExchangeRequest({ book, requester, terms });
        await request.save();

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all exchange requests
const getExchangeRequests = async (req, res) => {
    try {
        const requests = await ExchangeRequest.find().populate('book requester', 'title name');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { sendExchangeRequest, getExchangeRequests };

