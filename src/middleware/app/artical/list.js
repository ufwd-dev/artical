'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getAccountArticalList(req, res, next) {
	const Artical = res.sequelize.model('ufwdArtical');
	const AccountOperation = res.sequelize.model('ufwdAccountOperation');
	const accountId = req. session.accountId;
	const { keyword, favorite, like} = req.query;

	const query = {
		where:{
			published: 1,
			examine: 1
		},
		include: [{
			model: AccountOperation,
		}]
	};
	const include = query.include[0];

	keyword ? (query.where.content = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	favorite ? (include.where = {}, include.where.favorite = (favorite === 'true' ? 1 : 0), include.accountId = accountId) : undefined;
	favorite && like ? (include.where.like = (like === 'true' ? 1 : 0), include.accountId = accountId) : undefined;
	!favorite && like ? (include.where = {}, include.where.like = (like === 'true' ? 1 : 0), include.accountId = accountId) : undefined;

	const articalList = yield Artical.findAll(query);

	if (articalList.length === 0) {
		throwError('The artical is not existed.', 404);
	}

	res.data(articalList);

	next();
};