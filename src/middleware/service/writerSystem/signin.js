'use strict';

const { throwError } = require('error-standardize');

module.exports = function* writerSignin(req, res, next) {
	const account = res.data();
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const UfwdChannel = res.sequelize.model('ufwdChannel');
	const Writer = res.sequelize.model('ufwdWriter');

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


	req.session.accountId = account.id;
	req.session.writer = writer.id;
	
	res.data(writer);

	next();
};