'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Writer = module.exports = sequelize.define('ufwdWriter', {
	accountId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	channelId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	token: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4
	}
});