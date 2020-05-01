const debug = require('debug')('app:books.controller');
const chalk = require('chalk');
const Book = require('../models/bookModel');

function bookController() {
  function midlewareGetBook(req, res, next) {
    const { id } = req.params;
    debug(`${chalk.bgCyanBright('MIDLEWARE')} Book id = ${id}`);

    Book.findById(id, (err, book) => {
      if (err) {
        debug(err);
        return res.send(err).status(400);
      }
      if (book) {
        debug(book);
        req.book = book;
        return next();
      }
      return res.status(404);
    });
  }

  function getAllBooks(req, res) {
    debug('get books');
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    debug('query');
    debug(query);
    Book.find(query, (err, books) => {
      if (err) {
        debug(chalk.red(err));
        return res.send(err).status(400);
      }
      return res.json(books);
    });
  }

  function createBook(req, res) {
    const book = new Book(req.body);
    debug(book);
    book.save();
    return res.status(201).json(book);
  }

  function getById(req, res) {
    return res.json(req.book);
  }

  function putBook(req, res) {
    debug('PUT book');
    const { book } = req;
    debug(book);
    const bookUpdated = book;
    bookUpdated.title = req.body.title;
    bookUpdated.genre = req.body.genre;
    bookUpdated.author = req.body.author;
    bookUpdated.read = req.body.read;

    bookUpdated.save();

    return res.json(book);
  }

  function patchBook(req, res) {
    const { book } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    debug(req.body);
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
    book.save((err) => {
      if (err) {
        debug(err);
        return res.send(err);
      }
      return res.send(book);
    });
  }

  function deleteBook(req, res) {
    req.book.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.send.status(204);
    });
  }

  return {
    getAllBooks,
    createBook,
    getById,
    putBook,
    patchBook,
    midlewareGetBook,
    deleteBook
  };
}

module.exports = bookController;
