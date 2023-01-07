const router = require('express').Router();
const { validateHeaders } = require('../utils/validation');
const { getUser } = require('../controllers/users');

router.get('/me', validateHeaders, getUser);

module.exports = router;
