'use strict';

module.exports = function* deleteServiceArtical(req, res, next) {
	const artical = res.data();

	const result = yield artical.destroy(req.body);
	res.data({
		destroyed: result
	});

	next();
};