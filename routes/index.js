const router = require('express').Router();
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');
const { validateRegistration, validateLogin } = require('../utils/validation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegistration, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

module.exports = router;
