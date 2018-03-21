'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getArticalContent(req, res, next) {
	const Artical = res.sequelize.model('ufwdArtical');
	const articalId = req.params.articalId;

	const artical = yield Artical.findOne({
		where: {
			id: articalId,
			published: 1,
			examine: 1
		}
	});

	if (!artical) {
		throwError('The artical is not existed.', 404);
	}

	const view = yield artical.update({
		view: artical.view + 1
	});

	res.data({
		content: artical.content,
		view: view.view
	});

	next();
};