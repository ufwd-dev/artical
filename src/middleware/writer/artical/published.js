'use strict';

const {throwError} = require('error-standardize');

module.exports = function* isPublished(req, res, next) {
	const Artical = res.sequelize.model('ufwdArtical');
	const writerId = req.session.accountId;
	const articalId = req.params.articalId;

	const artical = yield Artical.findOne({
		where: {
			id: articalId,
			author: writerId,
			published: 0
		}
	});

	if (!artical) {
		throwError('The artical is not allowed to operation.', 404);
	}

	res.data(artical);

	next();
};