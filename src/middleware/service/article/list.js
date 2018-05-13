'use strict';

const Sequelize = require('sequelize');

module.exports = function* getServiceArticleList(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const { keyword, examine, favorite, like} = req.query;
	const query = {
		where:{
			published: true
		},
		include: [{
			model: AccountOperation,
		}]
	};
	const include = query.include[0];

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	examine ? (query.where.examine = (examine === 'true' ? true : false )) : undefined;
	favorite ? (include.where = {}, include.where.favorite = (favorite === 'true' ? true : false)) : undefined;
	favorite && like ? (include.where.like = (like === 'true' ? true : false)) : undefined;
	!favorite && like ? (include.where = {}, include.where.like = (like === 'true' ? true : false)) : undefined;

	const articleList = yield Article.findAll(query);

	res.data(articleList);

	next();
};