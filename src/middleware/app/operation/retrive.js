'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getArticle(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const articleId = req.params.articleId;
	const _ = require('lodash');

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

	const mixedArticle = _.pick(article, [
		'id', 'title', 'content', 'created_at', 'abstract', 'view', 'channel'
	]);

	res.data(mixedArticle);

	next();
};