'use strict';

const { throwError } = require('error-standardize');

module.exports = function* createOwnSubscribe(req, res, next) {
	const Subscribe = res.sequelize.model('ufwdSubscribe');
	const Channel = res.sequelize.model('ufwdChannel');
	const channelId = req.params.channelId;
	const accountId = req.session.accountId;

	const channel = yield Channel.findOne({
		where: {
			id: channelId
		}
	});

	if (!channel) {
		throwError('The channel is not existed', 404);
	}

	const subscribe = yield Subscribe.findOrCreate({
		where: {
			accountId, channelId
		}
	});

	res.data(subscribe);

	next();
};