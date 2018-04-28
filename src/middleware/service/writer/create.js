'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createWriter(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const UfwdWriter = res.sequelize.model('ufwdWriter');
	const Channel = res.sequelize.model('ufwdChannel');
	const { accountId, channelId } = req.body;

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId,
			examine: true
		}
	});


	const channel = yield Channel.findOne({
		where: {
			id: channelId
		}
	});

	const writer = yield UfwdWriter.findOne({
		where: {
			accountId: accountId
		}
	});

	if (!ufwdAccount) {
		throwError('The account is not exist.', 404);
	}

	if (!channel) {
		throwError('The channel is not exist.', 404);
	}

	if (writer) {
		throwError('The writer has existed.', 403);
	}

	const newWriter = yield UfwdWriter.findOrCreate({
		where: {
			accountId: accountId,
			channelId: channelId
		}
	});

	res.data(newWriter);
	
	next();
};