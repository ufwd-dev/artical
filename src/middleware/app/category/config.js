'use strict';

const {throwError} = require('error-standardize');
const config = require('./config.json');
const Sequelize = require('sequelize');

module.exports = function* getCategoryConfig(req, res, next) {
	const levelOne = req.query.item;

	if (!config[levelOne]) {
		throwError('The categoryList is not existed.', 404);
	}

	const item = config[levelOne];

	const Article = res.sequelize.model('ufwdArticle');
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	const Category = res.sequelize.model('ufwdCategory');

	const symbolList = item.map(category => category.name);

	const categoryList = yield Category.findAll({
		where: {
			symbol: {
				[Sequelize.Op.in]: symbolList
			}
		}
	});

	const articleList = yield Classification.findAll({
		include: [{
			model: Article,
			where: {
				published: true,
				examine: true,
				thumbnail: {
					[Sequelize.Op.not]: null
				}
			},
			attributes: ['thumbnail'],
			order: [['created_at', 'desc']]
		}],
		order: [['created_at', 'desc']]
	});

	categoryList.forEach(ele => {

		const article = articleList.find(article => {
			return article.categoryId === ele.id;
		});

		if (article && article.ufwdArticle.thumbnail) {
			ele.thumbnail = article.ufwdArticle.thumbnail;
		}

		item.forEach(category => {
			if (category.name === ele.symbol && category.categoryList.indexOf(ele.name) === -1) {
				category.categoryList.push(ele.name);

				if (ele.thumbnail) {

					category.thumbnail = ele.thumbnail;
				}

			}
		});
	});

	res.data(item);

	next();

};