'use strict';

const {throwError} = require('error-standardize');

module.exports = function* isPublished(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const writerId = req.session.accountId;
	const channelId = req.session.channel;
	const articleId = req.params.articleId;

	const article = yield Article.findOne({
		where: {
			id: articleId,
			author: writerId,
			channel: channelId,
			published: 0
		}
	});

	if (!article) {
		throwError('The article is not allowed to operation.', 404);
	}

	res.data(article);

	next();
};