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
			favorite: true
		}
	});

	if (!favorite) {
		throwError('The like is not existed.', 404);
	}

	const result = yield favorite.update({
		favorite: false
	});

	res.data(result);

	next();
};