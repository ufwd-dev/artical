'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deletelassification(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArtical');
	const Artical = res.sequelize.model('ufwdArtical');
	const { articalId, categoryId } = req.params;

	const classification = yield Classification.findOne({
		where: {
			articalId, categoryId
		},
		include: [{
			model: Artical,
			where: {
				published: 0
			}
		}]
	});

	if (!classification) {
		throwError('The classification is not existed.', 404);
	}

	const result = yield classification.destroy();

	res.data({
		destroyed: result
	});

	next();
};