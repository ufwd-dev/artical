'use strict';

module.exports = function* createArticle(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const writerId = req.session.accountId;
	const channelId = req.session.channel;

	const construction = Object.assign({}, req.body, {author: writerId, channel: channelId});

	const article = yield Article.create(construction);

	res.data(article);

	next();
};