const express = require('express');
const { sendExchangeRequest, getExchangeRequests } = require('../controllers/exchangeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, sendExchangeRequest);
router.get('/', authMiddleware, getExchangeRequests);

module.exports = router;

