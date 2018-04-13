'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getWriterList(req, res, next) {
	const Writer = res.sequelize.model('ufwdWriter');

	const writerList = yield Writer.findAll({
		where: req.query
	});

	if (!writerList.length) {
		throwError('the writer is not exist', 403);
	}

	res.data(writerList);

	next();
};