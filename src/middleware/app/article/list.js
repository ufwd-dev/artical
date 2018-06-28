'use strict';

const Sequelize = require('sequelize');
const _ = require('lodash');

module.exports = function* getAccountArticleList(req, res, next) {
	const Article = res.sequelize.model('ufwdArticle');
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req. session.accountId;
	const { keyword, favorite, like, channel, offset, limit} = req.query;

	const acticleWhere = {
		published: true,
		examine: true
	};

	const opWhere = {};

	const query = {
		where: acticleWhere,
		include: [{
			model: AccountOperation,
			where: favorite || like ? opWhere : null
		}],
		order: [['created_at', 'desc']]
	};
	const include = query.include[0].where;

	Object.assign(acticleWhere, keyword ? {
		title: {
			[Sequelize.Op.like]: `%${keyword}%`
		}
	} : undefined, channel ? {
		channel:{
			[Sequelize.Op.in]: channel ? channel.split(',') : undefined
		}
	} : undefined);

	Object.assign(query, {
		offset: offset ? offset - 0 : undefined
	}, {
		limit: limit ?  limit - 0  : undefined
	});

	include ? Object.assign(include, favorite ? {
		favorite: favorite === 'true' ? true : false,
	} : undefined, like ? {
		like: like === 'true' ? true : false
	} : undefined, {
		accountId,
	}) : undefined;

	const articleList = yield Article.findAll(query);

	const list = articleList.map(article => {
		const newArticle = _.pick(article, ['id', 'title', 'abstract', 'author', 'channel', 'created_at', 'thumbnail', 'ufwdAccountOperations', 'view', 'updated_at', 'examine']);

		return newArticle;
	});

	res.data(list);

	next();
};