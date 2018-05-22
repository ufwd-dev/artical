'use strict';

const Sequelize = require('sequelize');

module.exports = function* getCategoryList(req, res, next) {
	const Category = res.sequelize.model('ufwdCategory');
	const query = {};
	const {keyword, symbol} = req.query;

	keyword ? query.where = {
		name: {
			[Sequelize.Op.like]: `%${keyword}%`
		},
		description: {
			[Sequelize.Op.like]: `%${keyword}%`
		}
	} : undefined;

	symbol ? query.where = {
		symbol
	} : undefined;

	const categoryList = yield Category.findAll(query);

	res.data(categoryList);

	next();
};