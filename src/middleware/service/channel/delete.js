'use strict';

module.exports = function* deleteChannel(req, res, next) {
	const channel = res.data();
	const Subscribe = res.sequelize.model('ufwdSubscribe');
	const Writer = res.sequelize.model('ufwdWriter');

	yield Subscribe.destroy({
		where: {
			channelId: channel.id
		}
	});

	yield Writer.destroy({
		where: {
			channelId: channel.id
		}
	});

	const result = yield channel.destroy();

	res.data({
		destroyed: result
	});

	next();
};