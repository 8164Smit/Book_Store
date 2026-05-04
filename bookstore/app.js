const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes/bookRoutes'));

app.use((req, res) => {
    res.status(404).render('404');
});

const connectDB = require('./config/db');

connectDB();

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
