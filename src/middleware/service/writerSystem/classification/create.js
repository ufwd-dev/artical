'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* createClassification(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	const Article = res.sequelize.model('ufwdArticle');
	const Category = res.sequelize.model('ufwdCategory');
	const { articleId } = req.params;
	const list = req.body.list;

	const article = yield Article.findOne({
		where: {
			id: articleId,
			published: false
		}
	});

	if (!article) {
		throwError('The article is not existed.', 404);
	}
	
	const categoryList = yield Category.findAll({
		where: {
			id: {
				[Sequelize.Op.in]: list
			}
		}
	});

	const queryCategoryList = categoryList.map(category => category.id);

	const classificationList = yield Classification.findAll({
		where: {
			categoryId: {
				[Sequelize.Op.in]: queryCategoryList
			},
			articleId
		}
	});

	const queryClassificationList = classificationList.map(classification => classification.categoryId);

	const createClassificationList = queryCategoryList.filter(category => {
		let isFilter = true;

		if (queryClassificationList.indexOf(category) !== -1) {
			isFilter = false;
		}
		
		return isFilter;
	}).map(category => {
		return {
			articleId,
			categoryId: category
		};
	});

	const classification = yield Classification.bulkCreate(createClassificationList);


	res.data(classification);

	next();
};