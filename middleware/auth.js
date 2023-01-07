const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { AUTHORIZATION_ERROR_MESSAGE } = require('../utils/constants');

const { NODE_ENV = 'development', JWT_SECRET } = process.env;

const handleAuthError = (next) => next(new UnauthorizedError(AUTHORIZATION_ERROR_MESSAGE));

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return handleAuthError(next);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : 'dev-secret-key',
    );
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;
  return next();
};
