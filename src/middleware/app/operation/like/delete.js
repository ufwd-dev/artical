'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteLike(req, res, next) {
	const article = res.data();
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req.session.accountId;

	const like = yield AccountOperation.findOne({
		where: {
			articleId: article.id,
			accountId,
			like: true
		}
	});

	if (!like) {
		throwError('The like is not existed.', 404);
	}

	const result = yield like.update({
		like: false
	});

	res.data(result);

	next();
};