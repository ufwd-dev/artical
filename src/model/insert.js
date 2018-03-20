'use strict';

const lemonitor = require('lemonitor-service');

const UfwdAccount = lemonitor.sequelize.model('ufwdAccount');
const Account = lemonitor.sequelize.model('account');
const Writer = lemonitor.sequelize.model('ufwdWriter');
const Channel = lemonitor.sequelize.model('ufwdChannel');
const Administrator = lemonitor.sequelize.model('ufwdAdministrator');

const { Artical, AccountOperation } = require('./artical');
const { Category, Classification } = require('./category');

function* insertValue() {

	yield Account.bulkCreate([
		{name: '11111', password: '123456'},
		{name: '22222', password: '123456'},
		{name: '33333', password: '123456'},
		{name: '44444', password: '123456'},
		{name: '55555', password: '123456'},
	]);
	
	yield UfwdAccount.bulkCreate([
		{accountId: 1, name: '一', sex: 'female', phone: '138111111', examine: true},
		{accountId: 2, name: '一', sex: 'female', phone: '138222222', examine: true},
		{accountId: 3, name: '一', sex: 'male', phone: '138333333', examine: false},
		{accountId: 4, name: '一', sex: 'male', phone: '138444444', examine: false},
		{accountId: 5, name: '一', sex: 'male', phone: '139555555', examine: true},
	]);

	yield Administrator.create({accountId: 1});

	yield Administrator.create({accountId: 2});

	yield Channel.bulkCreate([
		{name: '频道一', description: '频道一'},
		{name: '频道二', description: '频道二'},
		{name: '频道三', description: '频道三'},
		{name: '频道四', description: '频道四'},
		{name: '频道五', description: '频道五'}
	]);
	// yield Writer.bulkCreate([
	// 	{accountId: 1, channelId: 1},
	// 	{accountId: 2, channelId: 2},
	// 	{accountId: 3, channelId: 3},
	// 	{accountId: 4, channelId: 4},
	// 	{accountId: 5, channelId: 5},
	// ]);
	yield Writer.create({accountId: 3, channelId: 3});

	yield Writer.create({accountId: 4, channelId: 4});
	
	yield Artical.bulkCreate([
		{content: '111111111111', abstract: '1111111', thumb: '111111', examine: 0, published: 1, author: 3},
		{content: '111111111', abstract: '11111111', thumb: '1111111', examine: 0, published: 0, author: 3},
		{content: '1111111111', abstract: '1111111111', thumb: '1111', examine: 1, published: 1, author: 4},
		{content: '1111111111', abstract: '11111111111', thumb: '111111', examine: 1, published: 1, author: 4},
		{content: '11111111', abstract: '11111111111', thumb: '11111111111', examine: 1, published: 1, author: 3}
	]);
	
	yield AccountOperation.bulkCreate([
		{articalId: 3, accountId: 1,favorite: 0,like: 1},
		{articalId: 4, accountId: 1,favorite: 0,like: 1},
		{articalId: 3, accountId: 2,favorite: 1,like: 0},
		{articalId: 4, accountId: 2,favorite: 1,like: 0},
		{articalId: 3, accountId: 5,favorite: 1,like: 0},
		{articalId: 4, accountId: 5,favorite: 0,like: 1}
	]);
	
	yield Category.bulkCreate([
		{name: '分类一', description: '分类一'},
		{name: '分类二', description: '分类二'},
		{name: '分类三', description: '分类三'},
		{name: '分类四', description: '分类四'},
		{name: '分类五', description: '分类五'}
	]);
	
	yield Classification.bulkCreate([
		{articalId: 1,categoryId: 1},
		{articalId: 1,categoryId: 2},
		{articalId: 1,categoryId: 3},
		{articalId: 1,categoryId: 4},
		{articalId: 1,categoryId: 5},
		{articalId: 2,categoryId: 1},
		{articalId: 2,categoryId: 2},
		{articalId: 2,categoryId: 3},
		{articalId: 2,categoryId: 4},
		{articalId: 2,categoryId: 5},
		{articalId: 3,categoryId: 1},
		{articalId: 3,categoryId: 2},
		{articalId: 3,categoryId: 3},
		{articalId: 3,categoryId: 4},
		{articalId: 3,categoryId: 5},
		{articalId: 4,categoryId: 1},
		{articalId: 4,categoryId: 2},
		{articalId: 4,categoryId: 3},
		{articalId: 4,categoryId: 4},
		{articalId: 4,categoryId: 5},
		{articalId: 5,categoryId: 1},
		{articalId: 5,categoryId: 2},
		{articalId: 5,categoryId: 3},
		{articalId: 5,categoryId: 4},
		{articalId: 5,categoryId: 5}
	]);
}

const insert = insertValue();
insert.next();
insert.next();
insert.next();
insert.next();
insert.next();
insert.next();
insert.next();
insert.next();
insert.next();
insert.next();
insert.next();

