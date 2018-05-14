'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateWriter(req, res, next) {
	const Channel = res.sequelize.model('ufwdChannel');
	const Writer = res.sequelize.model('ufwdWriter');
	const id = req.body.channelId;
	const writer = res.data();

	const channel = yield Channel.findOne({
		where: {
			id
		}
	});

	const oldWriter = yield Writer.findOne({
		where: {
			accountId: writer.accountId,
			channelId: channel.id
		}
	});

	if (!channel) {
		throwError('The channel is not existed', 403);
	}

	if (oldWriter && writer.channelId !== channel.id) {
		throwError('The relation is existed', 403);
	}

	yield writer.update({
		channelId: channel.id
	});

	res.data(writer);

	next();
};