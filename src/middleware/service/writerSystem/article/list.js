'use strict';

const Sequelize = require('sequelize');

module.exports = function* getOwnArticleList(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const accountId = req.session.accountId;
	const channelId = req.session.channel;

	const { keyword, examine, published} = req.query;
	const query = {
		where:{
			author: accountId,
			channel: channelId
		}
	};

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	examine ? (query.where.examine = (examine === 'true' ? true : false)) : undefined;
	published ? (query.where.published = (published === 'true' ? true : false)) : undefined;

	const articleList = yield Article.findAll(query);

	res.data(articleList);

	next();
};