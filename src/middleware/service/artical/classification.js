'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getServiceClassification(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArtical');
	const Artical = res.sequelize.model('ufwdArtical');
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

	const articalList = yield Classification.findAll({
		where: {
			categoryId
		},
		include: {
			model: Artical,
			where: {
				published: 1
			}
		}
	});
	
	if (articalList.length === 0) {
		throwError('The artical is not existed.', 404);
	}
	
	res.data(articalList);

	next();
};