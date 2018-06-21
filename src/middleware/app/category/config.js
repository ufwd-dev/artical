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
	const Category = res.sequelize.model('ufwdCategory');
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');

	for (let i = 0; i < item.length; i++) {
		const categoryList = yield Category.findAll({
			where: {
				symbol: item[i].name
			}
		});

		if (categoryList.length > 0) {

			const list = categoryList.map(category => category.name);
	
			item[i].categoryList = list;
	
	
			const articleList = yield Classification.findAll({
				where: {
					categoryId: {
						[Sequelize.Op.or]: categoryList.map(category => category.id)
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
					},
					attributes: ['thumbnail']
				}],
				group:'articleId',
				order: [['created_at', 'desc']],
				limit: 1
			});
	
			if (articleList.length > 0) {
				item[i].thumbnail = articleList[0].ufwdArticle.thumbnail;
			}
		}
	}

	res.data(item);

	next();

};