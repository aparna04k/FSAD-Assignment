const express = require('express');
const Book = require('../models/book');
const User = require('../models/user');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
//const auth = require('../middleware/auth');

// // Add Book
// router.post('/add', async (req, res) => {
//   const { title, author, genre, condition, availabilityStatus, ownerId } = req.body;
//   const newBook = new Book({ title, author, genre, condition, availabilityStatus, owner: ownerId });
//   await newBook.save();
//   res.status(201).json(newBook);
// });

// Add a new book
//router.post('/add', auth, async (req, res) => {
router.post('/add', authenticateToken, async (req, res) => {
  try {
      const { title, author, genre, condition } = req.body;
      const book = { title, author, genre, condition };
      const user = await User.findById(req.user.id);
      user.books.push(book);
      await user.save();
      res.status(201).json({ message: 'Book added successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


// Get Books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Fetch a single book by ID
router.get('/:bookId', authenticateToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
      const book = user.books.id(req.params.bookId);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.json(book);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


// Update a book
router.put('/edit/:bookId', authenticateToken, async (req, res) => {
  try {
      const { title, author, genre, condition } = req.body;
      const user = await User.findById(req.user.id);
      const book = user.books.id(req.params.bookId);
      if (book) {
          book.title = title || book.title;
          book.author = author || book.author;
          book.genre = genre || book.genre;
          book.condition = condition || book.condition;
          await user.save();
          res.json({ message: 'Book updated successfully' });
      } else {
          res.status(404).json({ message: 'Book not found' });
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Delete a book
router.delete('/delete/:bookId', authenticateToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
      const book = user.books.id(req.params.bookId);
      if (book) {
          book.remove();
          await user.save();
          res.json({ message: 'Book deleted successfully' });
      } else {
          res.status(404).json({ message: 'Book not found' });
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


router.get('/search', authenticateToken, async (req, res) => {
  try {
      const { title, author, genre, condition } = req.query;
      let query = {};
      if (title) query.title = { $regex: title, $options: 'i' };
      if (author) query.author = { $regex: author, $options: 'i' };
      if (genre) query.genre = genre;
      if (condition) query.condition = condition;
      
      const user = await User.findById(req.user.id);
      const books = user.books.filter(book => {
          return (!title || book.title.match(query.title)) &&
                 (!author || book.author.match(query.author)) &&
                 (!genre || book.genre === genre) &&
                 (!condition || book.condition === condition);
      });
      
      res.json(books);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Add Pagination to Book List Endpoint
router.get('/', authenticateToken, async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.query;
      const user = await User.findById(req.user.id);
      const books = user.books.slice((page - 1) * limit, page * limit);
      res.json(books);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});



module.exports = router;


