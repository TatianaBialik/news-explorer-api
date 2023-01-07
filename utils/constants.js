const dbserver = 'mongodb://localhost:27017/news-explorer';

const ARTICLE_NOT_FOUND_ERROR_MESSAGE = 'Article not found';
const USER_NOT_FOUND_ERROR_MESSAGE = 'User not found';
const PERMISSION_DENIED_ERROR_MESSAGE = 'Permission denied';
const CONFLICT_ERROR_MESSAGE = 'User with such email address already exists';
const INCORRECT_DATA_ERROR_MESSAGE = 'Incorrect password or email';
const AUTHORIZATION_ERROR_MESSAGE = 'Authorization error';
const COMMON_ERROR_MESSAGE = 'An error occurred on the server';


module.exports = {
  dbserver,
  ARTICLE_NOT_FOUND_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  PERMISSION_DENIED_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  INCORRECT_DATA_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
};
