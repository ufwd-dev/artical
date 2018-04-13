'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createClassification(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	const Article = res.sequelize.model('ufwdArticle');
	const Category = res.sequelize.model('ufwdCategory');
	const { articleId, categoryId } = req.params;

	const article = yield Article.findOne({
		where: {
			id: articleId,
			published: 0
		}
	});

	const category = yield Category.findOne({
		where: {
			id: categoryId
		}
	});

	if (!article) {
		throwError('The article is not existed.', 404);
	}

	if (!category) {
		throwError('The category is not existed.', 404);
	}

	const classification = yield Classification.findOrCreate({
		where: {
			articleId, categoryId
		}
	});

	res.data(classification);

	next();
};