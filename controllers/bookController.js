const Book = require('../../models/bookModel');

// Add a new book
const addBook = async (req, res) => {

    console.log('Request body:', req.body); // Log request body 
    console.log('Authenticated user:', req.user);
    const { title, author, genre, condition } = req.body;
    const user = req.user.id;

    try {
        const book = new Book({ title, author, genre, condition, user });
        await book.save();

        res.status(201).json(book);
    } catch (error) {
        //res.status(500).json({ message: 'Server error' });
        res.status(500).json({ message: error.message });
    }
};

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('user', 'name');
        res.json(books);
    } catch (error) {
       // res.status(500).json({ message: 'Server error' });
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBook, getBooks };

