'use strict';

module.exports = function* deleteWriter(req, res, next) {
	const writer = res.data();

	const result = yield writer.destroy();
	res.data({
		destroyed: result
	});

	next();
};