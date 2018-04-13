'use strict';

module.exports = function* updateServiceArticle(req, res, next) {
	const article = res.data();

	const result = yield article.update(req.body);
	res.data(result);

	next();
};