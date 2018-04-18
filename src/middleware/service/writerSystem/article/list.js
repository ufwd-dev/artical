'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getOwnArticleList(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const Writer = res.sequelize.model('ufwdWriter');
	const writerId = req.session.writer;

	const writer = yield Writer.findOne({
		where: {
			id: writerId
		}
	});

	const { keyword, examine, published} = req.query;
	const query = {
		where:{
			author: writer.accountId,
			channel: writer.channelId
		}
	};

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	examine ? (query.where.examine = (examine === 'true' ? 1 : 0)) : undefined;
	published ? (query.where.published = (published === 'true' ? 1 : 0)) : undefined;

	const articleList = yield Article.findAll(query);

	if (articleList.length === 0) {
		throwError('The article is not existed.', 404);
	}

	res.data(articleList);

	next();
};