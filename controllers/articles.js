const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { ARTICLE_NOT_FOUND_ERROR_MESSAGE, PERMISSION_DENIED_ERROR_MESSAGE } = require('../utils/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      }

      next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => {
      throw new NotFoundError(ARTICLE_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(PERMISSION_DENIED_ERROR_MESSAGE);
      } else {
        Article.findByIdAndRemove(req.params.articleId)
          .then((item) => res.send(item))
          .catch(next);
      }
    })
    .catch(next);
};
