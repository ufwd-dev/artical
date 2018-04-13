'use strict';

module.exports = function* deleteServiceArticle(req, res, next) {
	const article = res.data();

	const result = yield article.destroy(req.body);
	res.data({
		destroyed: result
	});

	next();
};