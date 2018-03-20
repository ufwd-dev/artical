'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getCategoryList(req, res, next) {
	const Category = res.sequelize.model('ufwdCategory');
	const query = {};
	const keyword = req.query.keyword;

	keyword ? query.where = {
		name: {
			[Sequelize.Op.like]: `%${keyword}%`
		},
		description: {
			[Sequelize.Op.like]: `%${keyword}%`
		}
	} : undefined;

	const categoryList = yield Category.findAll(query);

	if (!categoryList.length) {
		throwError('The category is not existed', 404);
	}

	res.data(categoryList);

	next();
};