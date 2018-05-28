'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getArticleListBySymbol(req, res, next) {
	const symbolValue = req.query.value;

	const Article = res.sequelize.model('ufwdArticle');
	const Category = res.sequelize.model('ufwdCategory');
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	
	const categoryId = [];


	const categoryList = yield Category.findAll({
		where: {
			symbol: symbolValue
		}
	});

	categoryList.forEach(category => {
		categoryId.push(category.id);
	});

	const articleList = yield Classification.findAll({
		where: {
			categoryId: {
				[Sequelize.Op.or]: categoryId
			}
		},
		include: [{
			model: Article,
			where: {
				published: true,
				examine: true
			},
		}],
		attributes: ['categoryId'],
		group:'articleId',
		order: [['created_at', 'desc']],
		limit: 3
	});

	res.data(articleList);

	next();
};