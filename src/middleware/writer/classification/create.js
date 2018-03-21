'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createClassification(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArtical');
	const Artical = res.sequelize.model('ufwdArtical');
	const Category = res.sequelize.model('ufwdCategory');
	const { articalId, categoryId } = req.params;

	const artical = yield Artical.findOne({
		where: {
			id: articalId
		}
	});

	const category = yield Category.findOne({
		where: {
			id: categoryId
		}
	});

	if (!artical) {
		throwError('The artical is not existed.', 404);
	}

	if (!category) {
		throwError('The category is not existed.', 404);
	}

	const classification = yield Classification.findOrCreate({
		where: {
			articalId, categoryId
		}
	});

	res.data(classification);

	next();
};