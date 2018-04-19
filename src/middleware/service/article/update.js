'use strict';

module.exports = function* updateServiceArticle(req, res, next) {
	const article = res.data();
	const { examine } = req.body;

	let result = yield article.update(req.body);

	if (!examine) {
		
		result = yield article.update({
			published: false
		});
	}

	res.data(result);

	next();
};