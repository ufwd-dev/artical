'use strict';

module.exports = function* getArticleFavorite(req, res, next) {
	const article = res.data();
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req.session.accountId;
	const result = {
		favorite: false
	};

	const operation = yield AccountOperation.find({
		where: {
			articleId: article.id,
			accountId,
			favorite: true
		}
	});

	if (operation) {
		result.favorite = true;
	}

	res.data(result);

	next();
};