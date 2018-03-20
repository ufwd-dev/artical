'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Category = sequelize.define('ufwdCategory', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	}
}, {
	paranoid: true
});

const Classification = sequelize.define('ufwdCategoryHasArtical', {

}, {
	paranoid: true
});

module.exports = { Category, Classification };