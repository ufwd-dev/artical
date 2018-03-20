'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getCategory(req, res, next) {
	const Category = res.sequelize.model('ufwdCategory');
	const id = req.params.categoryId;

	const category = yield Category.findOne({
		where: {
			id
		}
	});

	if (!category) {
		throwError('The category is not existed', 404);
	}

	res.data(category);

	next();
};