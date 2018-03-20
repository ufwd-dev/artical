'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Artical = sequelize.define('ufwdArtical', {
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
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0
	},
	published: {
		type: Sequelize.TINYINT,
		allowNull: false
	},
	comments: {
		type: Sequelize.TEXT
	},
	view: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	}
}, {
	paranoid: true
});

const AccountOperation = sequelize.define('ufwdAccountOperation', {
	favorite: {
		type: Sequelize.TINYINT,
		defaultValue: 0
	},
	like: {
		type: Sequelize.TINYINT,
		defaultValue: 0
	}
}, {
	paranoid: true
});

module.exports = { Artical, AccountOperation };