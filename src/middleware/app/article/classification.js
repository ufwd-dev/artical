'use strict';

const {throwError} = require('error-standardize');
const _ = require('lodash');

module.exports = function* getAccountClassification(req, res, next) {
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
				published: true,
				examine: true
			}
		}]
	});

	const list = articleList.map(category => {

		const newArticle = _.pick(category.ufwdArticle, ['id', 'title', 'abstract', 'author', 'channel', 'created_at', 'thumbnail', 'view', 'updated_at', 'examine']);

		return newArticle;
	});
	
	res.data(list);

	next();
};