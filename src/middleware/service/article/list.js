'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getServiceArticleList(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const { keyword, examine, favorite, like} = req.query;
	const query = {
		where:{
			published: 1
		},
		include: [{
			model: AccountOperation,
		}]
	};
	const include = query.include[0];

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	examine ? (query.where.examine = (examine === 'true' ? 1 : 0 )) : undefined;
	favorite ? (include.where = {}, include.where.favorite = (favorite === 'true' ? 1 : 0)) : undefined;
	favorite && like ? (include.where.like = (like === 'true' ? 1 : 0)) : undefined;
	!favorite && like ? (include.where = {}, include.where.like = (like === 'true' ? 1 : 0)) : undefined;

	const articleList = yield Article.findAll(query);

	if (articleList.length === 0) {
		throwError('The article is not existed.', 404);
	}

	res.data(articleList);

	next();
};