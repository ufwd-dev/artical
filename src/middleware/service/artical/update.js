'use strict';

module.exports = function* updateServiceArtical(req, res, next) {
	const artical = res.data();

	const result = yield artical.update(req.body);
	res.data(result);

	next();
};