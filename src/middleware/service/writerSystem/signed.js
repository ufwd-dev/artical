'use strict';

const { throwError } = require('error-standardize');

module.exports = function* isWriterSignedIn(req, res, next) {
	const Writer = res.sequelize.model('ufwdWriter');
	const accountId = req.session.accountId;

	if (!accountId) {
		throwError('No account signed in.', 403);
	}

	if (!req.session.writer) {

		const writer = yield Writer.findOne({
			where: {
				accountId
			}
		});

		if (!writer) {
			throwError('No Authority', 404);
		}

		req.session.writer = writer.id;
	}

	next();
};