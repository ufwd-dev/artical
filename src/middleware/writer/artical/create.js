'use strict';

module.exports = function* createArtical(req, res, next) {
	const Artical = res.sequelize.model('ufwdArtical');
	const writerId = req.session.accountId;

	const construction = Object.assign({}, req.body, {author: writerId});

	const artical = yield Artical.create(construction);

	res.data(artical);

	next();
};