'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAccountArticle(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const articleId = req.params.articleId;

	const article = yield Article.findOne({
		where: {
			id: articleId,
			published: true,
			examine: true
		}
	});

	if (!article) {
		throwError('The article is not existed.', 404);
	}

	res.data(article);

	next();
};