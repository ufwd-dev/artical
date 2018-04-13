'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteFavorite(req, res, next) {
	const article = res.data();
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req.session.accountId;

	const favorite = yield AccountOperation.findOne({
		where: {
			articleId: article.id,
			accountId,
			favorite: 1
		}
	});

	if (!favorite) {
		throwError('The like is not existed.', 404);
	}

	const result = yield favorite.update({
		favorite: 0
	});

	res.data(result);

	next();
};