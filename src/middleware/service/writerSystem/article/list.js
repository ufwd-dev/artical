'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getOwnArticleList(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const writerId = req.session.accountId;
	const { keyword, examine, published} = req.query;
	const query = {
		where:{
			author: writerId,
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