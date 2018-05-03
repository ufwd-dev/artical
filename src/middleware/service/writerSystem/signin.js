'use strict';

const { throwError } = require('error-standardize');

module.exports = function* writerSignin(req, res, next) {
	const account = res.data();
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const UfwdChannel = res.sequelize.model('ufwdChannel');
	const Writer = res.sequelize.model('ufwdWriter');

	if (req.query.token) {
		throwError('You have signed in.', 403);
	}

	const writer = yield Writer.findOne({
		where: {
			accountId: account.id
		},
		include: [{
			model: UfwdAccount,
		}, {
			model: UfwdChannel
		}]
	});

	if (!writer) {
		throwError('No Authority', 404);
	}

	account.token = writer.token;

	res.data(account);

	next();
};