'use strict';

const Sequelize = require('sequelize');
const _ = require('lodash');

module.exports = function* getServiceArticleList(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	const Article = res.sequelize.model('ufwdArticle');
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const { keyword, examine, favorite, like} = req.query;
	const query = {
		where:{
			published: true
		},
		include: [{
			model: AccountOperation,
		}, {
			model: Classification
		}]
	};
	const include = query.include[0];

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	examine ? (query.where.examine = (examine === 'true' ? true : false )) : undefined;
	favorite ? (include.where = {}, include.where.favorite = (favorite === 'true' ? true : false)) : undefined;
	favorite && like ? (include.where.like = (like === 'true' ? true : false)) : undefined;
	!favorite && like ? (include.where = {}, include.where.like = (like === 'true' ? true : false)) : undefined;

	const articleList = yield Article.findAll(query);

	const list = articleList.map(article => {
		const category = article.ufwdCategoryHasArticles.filter(classification => classification.categoryId)
			.map(classification => classification.categoryId);

		const operation = article.ufwdAccountOperations.map(operation => {
			return {
				id: operation.id,
				favorite: operation.favorite,
				like: operation.like,
				accountId: operation.accountId
			};
		});

		const newArticle = _.pick(article, ['id', 'title', 'abstract', 'author', 'channel', 'created_at', 'thumbnail', 'view', 'updated_at', 'examine']);

		newArticle.category = category;

		newArticle.operation = operation;

		return newArticle;
	});

	res.data(list);

	next();
	
};