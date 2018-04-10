'use strict';

const lemonitor = require('lemonitor-service');

const UfwdAccount = lemonitor.sequelize.model('ufwdAccount');

const { Artical, AccountOperation } = require('./artical');
const { Category, Classification } = require('./category');

Artical.belongsTo(UfwdAccount, {
	foreignKey: 'author'
});
UfwdAccount.hasMany(Artical, {
	foreignKey: 'author'
});

Artical.hasMany(AccountOperation, {
	foreignKey: 'articalId'
});
AccountOperation.belongsTo(Artical, {
	foreignKey: 'articalId'
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

Artical.hasMany(Classification, {
	foreignKey: 'articalId'
});
Classification.belongsTo(Artical, {
	foreignKey: 'articalId'
});