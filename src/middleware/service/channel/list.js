'use strict';

const Sequelize = require('sequelize');
const {throwError} = require('error-standardize');

module.exports = function* getChannelList(req, res, next) {
	const Channel = res.sequelize.model('ufwdChannel');
	const query = {};

	req.query.name ? (query.name = {[Sequelize.Op.like]: `%${req.query.name}%`}) : undefined;

	const channelList = yield Channel.findAll({
		where: query
	});

	if (channelList.length === 0) {
		throwError('The channel is not exist.', 404);
	}

	res.data(channelList);

	next(); 
};