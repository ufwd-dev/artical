'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getOwnSubscribe(req, res ,next) {
	const Subscribe = res.sequelize.model('ufwdSubscribe');
	const accountId = req.session.accountId;
	const channelId = req.params.channelId;

	const subscribe = yield Subscribe.findOne({
		where: {
			accountId, channelId
		}
	});

	if (!subscribe) {
		throwError('The subscribe is not existed.', 404);
	}

	res.data(subscribe);

	next();
};