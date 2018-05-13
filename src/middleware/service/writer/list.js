'use strict';

module.exports = function* getWriterList(req, res, next) {
	const Writer = res.sequelize.model('ufwdWriter');

	const writerList = yield Writer.findAll({
		where: req.query
	});

	res.data(writerList);

	next();
};