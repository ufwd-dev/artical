'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getChannel(req, res, next) {
	const Channel = res.sequelize.model('ufwdChannel');
	const channelId = req.params.channelId;

	const channel = yield Channel.findOne({
		where: {
			id: channelId
		}
	});

	if (!channel) {
		throwError('This channel is not exist.', 404);
	}

	res.data(channel);

	next();
};