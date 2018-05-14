'use strict';

module.exports = function* getOwnSubscribeList(req, res, next) {
	const Channel = res.sequelize.model('ufwdChannel');
	const Subscribe = res.sequelize.model('ufwdSubscribe');
	const accountId = req.session.accountId;

	const subscribeList = yield Subscribe.findAll({
		where: {
			accountId
		},
		include: [{
			model: Channel
		}]
	});

	res.data(subscribeList);

	next();
};