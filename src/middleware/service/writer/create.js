'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createWriter(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const UfwdWriter = res.sequelize.model('ufwdWriter');
	const Channel = res.sequelize.model('ufwdChannel');
	const { accountName, channelName } = req.body;

	const ufwdAccount = yield UfwdAccount.findOne({
		include: [{
			model: Account,
			where: {
				name: accountName
			}
		}],
		where: {
			examine: true
		}
	});


	const channel = yield Channel.findOne({
		where: {
			name: channelName
		}
	});

	const writer = yield UfwdWriter.findOne({
		where: {
			accountId: ufwdAccount.accountId
		}
	});

	if (!ufwdAccount) {
		throwError('the account is not exist.', 404);
	}

	if (!channel) {
		throwError('the channel is not exist.', 404);
	}

	if (writer) {
		throwError('the writer has existed.', 403);
	}

	const newWriter = yield UfwdWriter.findOrCreate({
		where: {
			accountId: ufwdAccount.accountId,
			channelId: channel.id
		}
	});

	res.data(newWriter);
	
	next();
};