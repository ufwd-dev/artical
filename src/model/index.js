'use strict';

const lemonitor = require('lemonitor-service');

const UfwdAccount = lemonitor.sequelize.model('ufwdAccount');

const { Article, AccountOperation } = require('./article');
const { Category, Classification } = require('./category');
const {Channel, Subscribe} = require('./channel');
const Writer = require('./writer');

Writer.belongsTo(UfwdAccount, {
	foreignKey: 'accountId',
});
Writer.belongsTo(Channel, {
	foreignKey: 'channelId',
});
UfwdAccount.hasMany(Writer, {
	foreignKey: 'accountId',
});
Channel.hasMany(Writer, {
	foreignKey: 'channelId',
});

Subscribe.belongsTo(UfwdAccount, {
	foreignKey: 'accountId',
});
Subscribe.belongsTo(Channel, {
	foreignKey: 'channelId',
});
UfwdAccount.hasMany(Subscribe, {
	foreignKey: 'accountId',
});
Channel.hasMany(Subscribe, {
	foreignKey: 'channelId',
});

Article.belongsTo(UfwdAccount, {
	foreignKey: 'author'
});
UfwdAccount.hasMany(Article, {
	foreignKey: 'author'
});

Article.hasMany(AccountOperation, {
	foreignKey: 'articleId'
});
AccountOperation.belongsTo(Article, {
	foreignKey: 'articleId'
});

UfwdAccount.hasMany(AccountOperation, {
	foreignKey: 'accountId'
});
AccountOperation.belongsTo(UfwdAccount, {
	foreignKey: 'accountId'
});

Category.hasMany(Classification, {
	foreignKey: 'categoryId'
});
Classification.belongsTo(Category, {
	foreignKey: 'categoryId'
});

Article.hasMany(Classification, {
	foreignKey: 'articleId'
});
Classification.belongsTo(Article, {
	foreignKey: 'articleId'
});