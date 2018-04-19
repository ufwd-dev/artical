'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Article = sequelize.define('ufwdArticle', {
	title: {
		type: Sequelize.STRING
	},
	content: {
		type: Sequelize.TEXT
	},
	abstract: {
		type: Sequelize.TEXT
	},
	thumb: {
		type: Sequelize.STRING
	},
	examine: {
		type: Sequelize.BOOLEAN,
	},
	published: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	comments: {
		type: Sequelize.TEXT
	},
	view: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	channel: {
		type: Sequelize.INTEGER
	}
}, {
	paranoid: true
});

const AccountOperation = sequelize.define('ufwdAccountOperation', {
	favorite: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	like: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
}, {
	paranoid: true
});

module.exports = { Article, AccountOperation };