require('should');
const sinon = require('sinon');
const debug = require('debug')('app:bookController.test');
const bookController = require('../controllers/books.controller');

describe('Book controller test', () => {
  describe('Create book', () => {
    it('should not allow an empty title on post', () => {
      const Book = function mockBook() { this.save = () => {}; };
      debug('test');

      const req = {
        body: {
          author: 'Camilo'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = bookController(Book);
      controller.createBook(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
