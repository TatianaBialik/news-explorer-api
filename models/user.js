const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { INCORRECT_DATA_ERROR_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Invalid email',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INCORRECT_DATA_ERROR_MESSAGE));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INCORRECT_DATA_ERROR_MESSAGE));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
