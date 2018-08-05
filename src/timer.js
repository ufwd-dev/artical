'use strict';

const { sequelize } = require('lemonitor-service');

const Subscribe = sequelize.model('ufwdSubscribe');
const Channel = sequelize.model('ufwdChannel');

const timer = setInterval(async function (){
	
	const accountList = await sequelize.query(
		"SELECT account.accountId AS accountId, channel.id AS channelId " + 
		"FROM ufwd_street AS street,ufwd_account AS account,ufwd_channel AS channel " + 
		"WHERE account.street = street.id AND NOT EXISTS( SELECT channel.name AS channelName FROM " +
		"ufwd_channel AS channel, ufwd_subscribe AS subscribe " + 
		"WHERE account.accountId = subscribe.accountId AND subscribe.channelId = channel.id AND channel.name = street.name) " +
		"AND channel.name = street.name",
	{ type: sequelize.QueryTypes.SELECT});

	const list = await sequelize.query(
		"SELECT account.accountId AS accountId, channel.id AS channelId " + 
		"FROM ufwd_account AS account,ufwd_channel AS channel " + 
		"WHERE channel.name = '西青区委统战部' AND NOT EXISTS( SELECT channel.name AS channelName FROM " +
		"ufwd_channel AS channel, ufwd_subscribe AS subscribe " + 
		"WHERE account.accountId = subscribe.accountId AND subscribe.channelId = channel.id AND channel.name = '西青区委统战部') ",
	{ type: sequelize.QueryTypes.SELECT});

	const createList = accountList.concat(list);

	await Subscribe.bulkCreate(createList);

}, 60000);