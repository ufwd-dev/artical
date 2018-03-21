'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getOwnArticalList(req, res, next) {
	const Artical = res.sequelize.model('ufwdArtical');
	const writerId = req.session.accountId;
	const { keyword, examine, published} = req.query;
	const query = {
		where:{
			author: writerId
		}
	};

	keyword ? (query.where.content = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	examine ? (query.where.examine = examine) : undefined;
	published ? (query.where.published = published) : undefined;

	const articalList = yield Artical.findAll(query);

	if (articalList.length === 0) {
		throwError('The artical is not existed.', 404);
	}

	res.data(articalList);

	next();
};