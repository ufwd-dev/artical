'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateCategory(req, res, next) {
	const Category = res.sequelize.model('ufwdCategory');
	const category = res.data();

	const oldCategory = yield Category.findOne({
		where: {
			name: req.body.name
		}
	});

	if (oldCategory && category.name !== req.body.name) {
		throwError('The category is existed', 403);
	}

	const newCategory = yield category.update(req.body);

	res.data(newCategory);

	next();
};