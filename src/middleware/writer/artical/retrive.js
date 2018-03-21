'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getOwnArtical(req, res, next) {
	const Artical = res.sequelize.model('ufwdArtical');
	const writerId = req.session.accountId;
	const articalId = req.params.articalId;

	const artical = yield Artical.findOne({
		where: {
			id: articalId,
			author: writerId
		}
	});

	if (!artical) {
		throwError('The artical is not existed.', 404);
	}

	res.data(artical);

	next();
};