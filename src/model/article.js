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
		type: Sequelize.TINYINT,
		set(examine) {
			examine === 'true' ? this.setDataValue('examine', 1) : this.setDataValue('examine', 0);
		},
		get() {
			const examine = this.getDataValue('examine');

			return examine === 1 ? true : false;
		}
	},
	published: {
		type: Sequelize.TINYINT,
		defaultValue: 0,
		set(published) {
			published === 'true' ? this.setDataValue('published', 1) : this.setDataValue('published', 0);
		},
		get() {
			const published = this.getDataValue('published');

			return published === 1 ? true : false;
		}
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
		type: Sequelize.TINYINT,
		defaultValue: 0,
		get() {
			const favorite = this.getDataValue('favorite');

			return favorite === 1 ? true : false;
		}
	},
	like: {
		type: Sequelize.TINYINT,
		defaultValue: 0,
		get() {
			const like = this.getDataValue('like');

			return like === 1 ? true : false;
		}
	}
}, {
	paranoid: true
});

module.exports = { Article, AccountOperation };