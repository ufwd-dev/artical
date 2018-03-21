'use strict';

module.exports = function* createLike(req, res, next) {
	const artical = res.data();
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req.session.accountId;
	let operation;

	
	operation = yield AccountOperation.find({
		where: {
			articalId: artical.id,
			accountId
		}
	});

	if (!operation) {
		operation = yield AccountOperation.create({
			articalId: artical.id,
			accountId
		});
	}

	const like = yield operation.update({
		like: 1
	});

	res.data(like);

	next();
};