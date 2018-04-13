'use strict';

module.exports = function* createArticle(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const Writer = res.sequelize.model('ufwdWriter');
	const writerId = req.session.accountId;

	const writer = yield Writer.findOne({
		where: {
			accountId: writerId
		}
	});

	const construction = Object.assign({}, req.body, {author: writerId, channel: writer.channelId});

	const article = yield Article.create(construction);

	res.data(article);

	next();
};