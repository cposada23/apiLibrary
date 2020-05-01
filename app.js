const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Models
const Book = require('./models/bookModel');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

if (process.env.ENV === 'Test') {
  debug('Running test');
  mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
} else {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

const bookRouter = require('./routes/book.routes')(Book);


app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  debug(`app running on port ${chalk.greenBright(port)}`);
});

module.exports = app;
