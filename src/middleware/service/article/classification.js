'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getServiceClassification(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	const Article = res.sequelize.model('ufwdArticle');
	const Category = res.sequelize.model('ufwdCategory');
	const categoryId = req.params.categoryId;

	const category = yield Category.findOne({
		where: {
			id: categoryId
		}
	});

	if (!category) {
		throwError('The category is not existed.', 404);
	}

	const articleList = yield Classification.findAll({
		where: {
			categoryId
		},
		include: [{
			model: Article,
			where: {
				published: true
			}
		}]
	});
	
	res.data(articleList);

	next();
};