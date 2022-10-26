const router = require('express').Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const {
  validateArticle,
  validateHeaders,
  validateId,
} = require('../utils/validation');

router.get('/', validateHeaders, getArticles);
router.post('/', validateArticle, createArticle);
router.delete('/:articleId', validateId, deleteArticle);

module.exports = router;
