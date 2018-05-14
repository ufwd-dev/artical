'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAccountArticle(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const Channel = res.sequelize.model('ufwdChannel');
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

	yield article.update({
		view: article.view + 1
	});

	const mixedArticle = _.pick(article, [
		'id', 'title', 'content', 'created_at', 'abstract', 'view', 'channel'
	]);

	res.data(mixedArticle);

	next();
};