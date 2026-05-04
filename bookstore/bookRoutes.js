const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
    getAllBooks,
    showAddForm,
    addBook,
    showEditForm,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/add', showAddForm);
router.post('/add', upload.single('image'), addBook);
router.get('/edit/:id', showEditForm);
router.put('/edit/:id', upload.single('image'), updateBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;
