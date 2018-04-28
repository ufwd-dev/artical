'use strict';
const { throwError } = require('error-standardize');

module.exports = function* getWriterByToken(req, res, next) {
	const token = req.query.token;
	
	if (!token) {
		return next();
	}
	
	const Writer = res.sequelize.model('ufwdWriter');
	
	const writer = yield Writer.findOne({
		where: {
			token
		}
	});

	if (!writer) {
		throwError('No matched writer by token', 401);
	}
	
	const Account = res.sequelize.model('account');
	const account = yield Account.findById(writer.accountId);

	if (!account) {
		throwError('Account is NOT existed.', 404);
	}

	req.session.accountId = account.id;

	next();
};