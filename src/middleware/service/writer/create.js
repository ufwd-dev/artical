'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createWriter(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const UfwdWriter = res.sequelize.model('ufwdWriter');
	const Channel = res.sequelize.model('ufwdChannel');
	const { accountId, channelId, accountList } = req.body;
	let newWriter = [];

	const channel = yield Channel.findOne({
		where: {
			id: channelId
		}
	});

	
	if (!channel) {
		throwError('The channel is not exist.', 404);
	}

	if (accountId) {
		const ufwdAccount = yield UfwdAccount.findOne({
			where: {
				accountId,
				examine: true
			}
		});
	
		if (!ufwdAccount) {
			throwError('The account is not exist.', 404);
		}
		
		newWriter = yield UfwdWriter.findOrCreate({
			where: {
				accountId: accountId,
				channelId: channelId
			}
		});
	
	}

	if (accountList) {
		for (let i = 0; i < accountList.length; i++) {
			const ufwdAccount = yield UfwdAccount.findOne({
				where: {
					accountId: accountList[i],
					examine: true
				}
			});
		
			if (!ufwdAccount) {
				throwError('The account is not exist.', 404);
			}
	
			const writer = yield UfwdWriter.findOrCreate({
				where: {
					accountId: accountList[i],
					channelId: channelId
				}
			});

			newWriter.push(writer);
		}
	}

	res.data(newWriter);
		
	next();
	

};