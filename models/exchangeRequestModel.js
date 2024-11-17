const mongoose = require('mongoose');

const exchangeRequestSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    terms: { type: String },
});

module.exports = mongoose.model('ExchangeRequest', exchangeRequestSchema);

