const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes/index');
const { dbserver } = require('./utils/constants');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(dbserver);

app.use(express.json());

app.use(requestLogger);
app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
