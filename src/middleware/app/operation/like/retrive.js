'use strict';

module.exports = function* getArticleLike(req, res, next) {
	const article = res.data();
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req.session.accountId;
	const result = {
		like: false
	};
	
	const operation = yield AccountOperation.find({
		where: {
			articleId: article.id,
			accountId,
			like: true
		}
	});

	if (operation) {
		result.like = true;
	}

	res.data(result);

	next();
};