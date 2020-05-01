const express = require('express');
const bookController = require('../controllers/books.controller');

const bookRouter = express.Router();

function bookRoutes() {
  const {
    getAllBooks,
    createBook,
    getById,
    putBook,
    midlewareGetBook,
    patchBook,
    deleteBook
  } = bookController();

  bookRouter.use('/:id', midlewareGetBook);

  bookRouter.route('/')
    .post(createBook)
    .get(getAllBooks);
  bookRouter.route('/:id')
    .get(getById)
    .put(putBook)
    .patch(patchBook)
    .delete(deleteBook);

  return bookRouter;
}

module.exports = bookRoutes;
