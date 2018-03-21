'use strict';

module.exports = function* updateOwnArtical(req, res, next) {
	const artical = res.data();

	const newArtical = yield artical.update(req.body);

	res.data(newArtical);

	next();
};