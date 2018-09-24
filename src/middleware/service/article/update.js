'use strict';

module.exports = function* updateServiceArticle(req, res, next) {
	const article = res.data();
	const { examine, comments } = req.body;

	let result = yield article.update({
		examine, comments
	}); 

	if (!examine) {
		
		result = yield article.update({
			published: false
		});
	}

	res.data(result);

	next();
};