const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/index');
const { dbserver } = require('./utils/constants');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(dbserver);

app.use(express.json());


app.use('/', router);

app.use(errorHandler);

app.listen(PORT);
