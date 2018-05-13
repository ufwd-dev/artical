'use strict';

module.exports = function* getAccountInformation(req, res, next) {
	const _ = require('lodash');

	const id = req.session.accountId;
	const Account = res.sequelize.model('account');
	const UfwdChannel = res.sequelize.model('ufwdChannel');
	const Writer = res.sequelize.model('ufwdWriter');

	const account = yield Account.findById(id);

	const writer = yield Writer.findOne({
		where: {
			accountId: id
		},
		include: [{
			model: UfwdChannel
		}]
	});

	const mixedAccount = _.pick(account, ['name']);

	mixedAccount.id = writer.id;
	mixedAccount.channel = writer.ufwdChannel.name;

	res.data(mixedAccount);

	next();
};