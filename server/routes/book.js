const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/book');

mongoose.connect('mongodb://localhost:27017/bookDB', { useNewUrlParser: true, useUnifiedTopology: true });

// POST /api/book - Create a new book
router.post('/', async (req, res) => {
  try {
    const { name, author, pages } = req.body;
    const book = new Book({ name, author, pages });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:bookName', async (req, res) => {
  try {
    const bookName = req.params.bookName;
    const book = await Book.findOne({ name: bookName });
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
