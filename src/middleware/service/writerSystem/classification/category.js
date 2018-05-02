'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getClassificationList(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	const articleId = req.params.articleId;
	const Category = res.sequelize.model('ufwdCategory');

	const categoryList = yield Classification.findAll({
		where: {
			articleId
		},
		include: [{
			model: Category
		}]
	});

	if (!categoryList.length) {
		throwError('The category of article is not existed', 404);
	}

	res.data(categoryList);

	next();
};