'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteLike(req, res, next) {
	const artical = res.data();
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req.session.accountId;

	const like = yield AccountOperation.findOne({
		where: {
			articalId: artical.id,
			accountId,
			like: 1
		}
	});

	if (!like) {
		throwError('The like is not existed.', 404);
	}

	const result = yield like.update({
		like: 0
	});

	res.data(result);

	next();
};