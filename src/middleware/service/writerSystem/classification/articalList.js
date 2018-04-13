'use strict';
const {throwError} = require('error-standardize');

module.exports = function* getArticleListOfCategory(req, res, next) {

	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	const Article = res.sequelize.model('ufwdArticle');
	const Category = res.sequelize.model('ufwdCategory');
	const categoryId = req.params.categoryId;
	const accountId = req.session.accountId;

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
				author: accountId
			}
		}]
	});
	
	if (articleList.length === 0) {
		throwError('The article is not existed.', 404);
	}
	
	res.data(articleList);

	next();
};