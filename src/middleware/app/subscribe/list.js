'use strict';

module.exports = function* getOwnSubscribeList(req, res, next) {
	const Subscribe = res.sequelize.model('ufwdSubscribe');
	const accountId = req.session.accountId;

	const subscribeList = yield Subscribe.findAll({
		where: {
			accountId
		}
	});

	res.data(subscribeList);

	next();
};