const Book = require('../models/Book');


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        const totalBooks = books.length;
        const totalStock = books.reduce((sum, b) => sum + b.quantity, 0);
        const categories = [...new Set(books.map(b => b.category))].length;

        res.render('index', { books, totalBooks, totalStock, categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
};

const showAddForm = (req, res) => {
    res.render('add');
};

const addBook = async (req, res) => {
    try {
        const { title, author, category, price, quantity, description } = req.body;

        if (!title || !author || !category || !price || !quantity) {
            return res.render('add', { error: 'Please fill in all required fields' });
        }

        const newBook = new Book({
            title,
            author,
            category,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            description,
            image: req.file ? req.file.filename : ''
        });

        await newBook.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('add', { error: 'Failed to add book. Try again.' });
    }
};

const showEditForm = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.redirect('/');
        res.render('edit', { book });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

const updateBook = async (req, res) => {
    try {
        const { title, author, category, price, quantity, description } = req.body;
        const book = await Book.findById(req.params.id);

        if (!book) return res.redirect('/');

        book.title = title;
        book.author = author;
        book.category = category;
        book.price = parseFloat(price);
        book.quantity = parseInt(quantity);
        book.description = description;

        if (req.file) {
            book.image = req.file.filename;
        }

        await book.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

module.exports = { getAllBooks, showAddForm, addBook, showEditForm, updateBook, deleteBook };
