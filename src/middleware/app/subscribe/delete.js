'use strict';

module.exports = function* deleteOwnSubscribe(req, res, next) {
	const subscribe = res.data();

	const result = yield subscribe.destroy();
	res.data({
		destroyed: result
	});

	next();
};