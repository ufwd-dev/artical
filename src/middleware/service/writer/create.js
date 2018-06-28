'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

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

		const ufwdAccountList = yield UfwdAccount.findAll({
			where: {
				accountId: {
					[Sequelize.Op.in]: accountList
				},
				examine: true
			}
		});

		const existedAccountList = ufwdAccountList.map(account => account.accountId);

		const writerList = yield UfwdWriter.findAll({
			where: {
				accountId: {
					[Sequelize.Op.in]: existedAccountList
				},
				channelId
			}
		});

		const writer = writerList.map(writer => writer.accountId);

		const createWriter = existedAccountList.filter(account => {
			let isFilter = true;

			if (writer.indexOf(account) !== -1) {
				isFilter = false;
			}

			return isFilter;
		}).map(account => {
			return {
				accountId: account,
				channelId
			};
		});

		newWriter = yield UfwdWriter.bulkCreate(createWriter);
	}

	res.data(newWriter);
		
	next();
	

};