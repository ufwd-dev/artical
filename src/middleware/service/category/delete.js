'use strict';

module.exports = function* deleteCategory(req, res, next) {
	const category = res.data();

	const result = yield category.destroy();
	res.data({
		destroyed: result
	});

	next();
};