'use strict';

module.exports = function* deleteOwnArticle(req, res, next) {
	const article = res.data();

	const result = yield article.destroy();

	res.data({
		destoryed: result
	});

	next();
};