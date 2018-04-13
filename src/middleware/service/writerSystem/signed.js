'use strict';

const { throwError } = require('error-standardize');

module.exports = function isWriterSignedIn(req, res, next) {
	if (!req.session.accountId) {
		throwError('No account signed in.', 403);
	}

	if (!req.session.writer) {
		throwError('You have no permissions.', 403);
	}

	next();
};