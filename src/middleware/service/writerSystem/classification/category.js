'use strict';

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

	res.data(categoryList);

	next();
};