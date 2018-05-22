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
	},
	symbol: {
		type: Sequelize.STRING
	}
});

const Classification = sequelize.define('ufwdCategoryHasArticle', {

});

module.exports = { Category, Classification };