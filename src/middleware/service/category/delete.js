'use strict';

module.exports = function* deleteCategory(req, res, next) {
	const category = res.data();
	const Classification = res.sequelize.model('ufwdCategoryHasArtical');

	const classification = yield Classification.destroy({
		where: {
			categoryId: category.id
		}
	});

	const result = yield category.destroy();

	res.data({
		destroyed: result
	});

	next();
};