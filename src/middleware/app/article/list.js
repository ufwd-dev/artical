'use strict';

const Sequelize = require('sequelize');
const _ = require('lodash');

module.exports = function* getAccountArticleList(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req. session.accountId;
	const { keyword, favorite, like, channel} = req.query;

	const query = {
		where:{
			published: true,
			examine: true
		},
		include: [{
			model: AccountOperation,
		}]
	};
	const include = query.include[0];

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	favorite ? (include.where = {}, include.where.favorite = (favorite === 'true' ? true : false), include.accountId = accountId) : undefined;
	favorite && like ? (include.where.like = (like === 'true' ? true : false), include.accountId = accountId) : undefined;
	!favorite && like ? (include.where = {}, include.where.like = (like === 'true' ? true : false), include.accountId = accountId) : undefined;
	channel ? (query.where.channel = {[Sequelize.Op.in]: channel.split(',')}) : undefined;

	const articleList = yield Article.findAll(query);

	const list = articleList.map(article => {
		const newArticle = _.pick(article, ['id', 'title', 'abstract', 'author', 'channel', 'created_at', 'thumbnail', 'ufwdAccountOperations', 'view', 'updated_at', 'examine']);

		return newArticle;
	});

	res.data(list);

	next();
};