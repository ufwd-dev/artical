'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deletelassification(req, res, next) {
	const Classification = res.sequelize.model('ufwdCategoryHasArticle');
	const Article = res.sequelize.model('ufwdArticle');
	const { articleId, categoryId } = req.params;

	const classification = yield Classification.findOne({
		where: {
			articleId, categoryId
		},
		include: [{
			model: Article,
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