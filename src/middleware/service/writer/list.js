'use strict';

module.exports = function* getWriterList(req, res, next) {
	const _ = require('lodash');
	const Writer = res.sequelize.model('ufwdWriter');
	const Channel = res.sequelize.model('ufwdChannel');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Street = res.sequelize.model('ufwdStreet');
	const mixedWriterList = [];

	const streetList = yield Street.findAll();

	const writerList = yield Writer.findAll({
		where: req.query,
		include: [{
			model: UfwdAccount,
		}, {
			model: Channel
		}]
	});

	writerList.forEach(writer => {
		const mixedWriter = _.pick(writer.ufwdAccount, [
			'accountId', 'name', 'street'
		]);
		mixedWriter.id = writer.id;
		mixedWriter.channelId = writer.channelId;
		mixedWriter.channelName = writer.ufwdChannel.name;

		streetList.forEach(street => {
			if (mixedWriter.street === street.id) {
				mixedWriter.street = street.name;
			}
		});

		mixedWriterList.push(mixedWriter);
	});

	res.data(mixedWriterList);

	next();
};