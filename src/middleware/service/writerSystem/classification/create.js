'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createClassification(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	const Article = res.sequelize.model('ufwdArticle');
	const Category = res.sequelize.model('ufwdCategory');
	const { articleId } = req.params;
	const list = req.body.list;
	const classificationList = [];

	const article = yield Article.findOne({
		where: {
			id: articleId,
			published: false
		}
	});

	if (!article) {
		throwError('The article is not existed.', 404);
	}

	for (let i = 0; i < list.length; i++) {
		
		const category = yield Category.findOne({
			where: {
				id: list[i]
			}
		});

		if (!category) {
			throwError('The category is not existed.', 404);
		}
		
		const classification = yield Classification.findOrCreate({
			where: {
				articleId,
				categoryId: category.id
			}
		});

		classificationList.push(classification);
	}	


	res.data(classificationList);

	next();
};