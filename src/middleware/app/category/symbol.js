'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');
const config = require('./config.json');

module.exports = function* getArticleListBySymbol(req, res, next) {
	const symbolValue = req.query.value;
	const {highLevel} = req.query;

	const queryParams = [];

	symbolValue ? queryParams.push(symbolValue) : undefined;

	config[highLevel] ? config[highLevel].forEach(item => {
		queryParams.push(item.name);
	}) : undefined;

	const Article = res.sequelize.model('ufwdArticle');
	const Category = res.sequelize.model('ufwdCategory');
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	
	const categoryList = yield Category.findAll({
		where: {
			symbol: {
				[Sequelize.Op.in]: queryParams
			}
		}
	});

	const list = categoryList.map(category => category.id);

	const articleList = yield Classification.findAll({
		where: {
			categoryId: {
				[Sequelize.Op.in]: list
			}
		},
		include: [{
			model: Article,
			where: {
				published: true,
				examine: true,
				thumbnail: {
					[Sequelize.Op.not]: null
				}
			}
		}],
		attributes: ['categoryId'],
		group:'articleId',
		order: [['created_at', 'desc']],
		limit: 3
	});

	res.data(articleList);

	next();
};