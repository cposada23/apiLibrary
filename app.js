const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const db = mongoose.connect(process.env.MONGO_URI);

const bookRouter = require('./routes/book.routes')();


app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  debug(`app running on port ${chalk.greenBright(port)}`);
});
