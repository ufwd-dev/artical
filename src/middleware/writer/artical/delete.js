'use strict';

module.exports = function* deleteOwnArtical(req, res, next) {
	const artical = res.data();

	const result = yield artical.destroy();
	res.data({
		destoryed: result
	});

	next();
};