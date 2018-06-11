'use strict';

const { throwError } = require('error-standardize');

module.exports = function* writerSignin(req, res, next) {
	const account = res.data();
	const Writer = res.sequelize.model('ufwdWriter');

	if (req.query.token) {
		throwError('You have signed in.', 403);
	}

	const writer = yield Writer.findOne({
		where: {
			accountId: account.id
		}
	});

	if (!writer) {
		throwError('No Authority', 404);
	}

	account.token = writer.token;

	res.data(account);

	next();
};