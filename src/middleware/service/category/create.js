'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createCategory(req, res, next) {
	const Category = res.sequelize.model('ufwdCategory');
	const {name, description} = req.body;

	const category = yield Category.findOne({
		where: {
			name
		}
	});

	if (category) {
		throwError('The category is existed.', 403);
	}

	const newCategory = yield Category.create({
		name, description
	});

	res.data(newCategory);

	next();
};