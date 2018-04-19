'use strict';

module.exports = function* createLike(req, res, next) {
	const article = res.data();
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req.session.accountId;
	let operation;

	
	operation = yield AccountOperation.find({
		where: {
			articleId: article.id,
			accountId
		}
	});

	if (!operation) {
		operation = yield AccountOperation.create({
			articleId: article.id,
			accountId
		});
	}

	const like = yield operation.update({
		like: true
	});

	res.data(like);

	next();
};