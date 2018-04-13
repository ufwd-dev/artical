'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createChannel(req, res, next) {
	const Channel = res.sequelize.model('ufwdChannel');
	const { name, description } = req.body;

	const channel = yield Channel.findOne({
		where: {
			name: name
		}
	});

	if (channel) {
		throwError('The name is existed', 403);
	}

	const newChannel = yield Channel.create({
		name, description
	});

	res.data(newChannel);

	next();
};