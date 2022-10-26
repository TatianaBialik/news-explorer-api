const { COMMON_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? COMMON_ERROR_MESSAGE
        : message,
    });
};
