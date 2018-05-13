'use strict';

const Sequelize = require('sequelize');

module.exports = function* getChannelList(req, res, next) {
	const Channel = res.sequelize.model('ufwdChannel');
	const query = {};

	req.query.name ? (query.name = {[Sequelize.Op.like]: `%${req.query.name}%`}) : undefined;

	const channelList = yield Channel.findAll({
		where: query
	});

	res.data(channelList);

	next(); 
};