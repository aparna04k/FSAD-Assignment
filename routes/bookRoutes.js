const express = require('express');
const { addBook, getBooks } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.post('/', authMiddleware, addBook);
// router.get('/', getBooks);


router.post('/add', authMiddleware, async (req, res) => {

    const { title, author, genre, condition } = req.body;
    const user = req.user.id;

    try {
        const book = new Book({ title, author, genre, condition, user });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', getBooks);


module.exports = router;

