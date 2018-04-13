'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getArticleContent(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const articleId = req.params.articleId;

	const article = yield Article.findOne({
		where: {
			id: articleId,
			published: 1,
			examine: 1
		}
	});

	if (!article) {
		throwError('The article is not existed.', 404);
	}

	const view = yield article.update({
		view: article.view + 1
	});

	res.data({
		content: article.content,
		view: view.view
	});

	next();
};