'use strict';

const {
	$testBody,
	$testQuery
} = require('express-handler-loader')('all');

const {
	isAdminiSignedIn
} = require('express-handler-loader')('ufwd');

const {
	createCategory,
	getCategoryList,
	getCategory,
	updateCategory,
	deleteCategory,
	getServiceArticleList,
	getServiceArticle,
	updateServiceArticle,
	deleteServiceArticle,
	getServiceClassification,
	createWriter,
	getWriterList,
	getWriter,
	updateWriter,
	deleteWriter,
	createChannel,
	getChannelList,
	getChannel,
	updateChannel,
	deleteChannel,
} = require('express-handler-loader')('ufwd_article');

const router = module.exports = require('express').Router();

router.post('/category', $testBody({
	properties: {
		name: {
			type: 'string'
		},
		description: {
			type: 'string'
		}
	},
	required: ['name', 'description'],
	additionalProperties: false
}), isAdminiSignedIn, createCategory);

router.get('/category', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getCategoryList);

router.get('/category/:categoryId', isAdminiSignedIn, getCategory);

router.put('/category/:categoryId', $testBody({
	properties: {
		name: {
			type: 'string'
		},
		description: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getCategory, updateCategory);

router.delete('/category/:categoryId', isAdminiSignedIn, getCategory, deleteCategory);

router.get('/article', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		examine: {
			type: 'string',
			pattern: '^(true|false)$'
		},
		favorite: {
			type: 'string',
			pattern: '^(true|false)$'
		},
		like: {
			type: 'string',
			pattern: '^(true|false)$'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getServiceArticleList);

router.get('/article/:articleId', isAdminiSignedIn, getServiceArticle);

router.put('/article/:articleId', $testBody({
	properties: {
		comments: {
			type: 'string'
		},
		examine: {
			type: 'string',
			pattern: '^(true|false)$'
		}
	},
	required: ['examine', 'comments'],
	additionalProperties: false
}), isAdminiSignedIn, getServiceArticle, updateServiceArticle);

router.delete('/article/:articleId', isAdminiSignedIn, getServiceArticle, deleteServiceArticle);

router.get('/category/:categoryId/article', isAdminiSignedIn, getServiceClassification);

router.post('/writer', $testBody({
	properties: {
		accountName: {
			type: 'string'
		},
		channelName: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['accountId', 'channelId']
}), isAdminiSignedIn, createWriter);

router.get('/writer', $testQuery({
	properties: {
		accountId: {
			type: 'string'
		},
		channelId: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getWriterList);

router.get('/writer/:writerId', isAdminiSignedIn, getWriter);

router.put('/writer/:writerId', $testBody({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getWriter, updateWriter);

router.delete('/writer/:writerId', isAdminiSignedIn, getWriter, deleteWriter);

router.post('/channel', $testBody({
	properties: {
		name: {
			type: 'string',
			minLength: 4
		},
		description: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['name', 'description']
}), isAdminiSignedIn, createChannel);

router.get('/channel', $testQuery({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getChannelList);

router.get('/channel/:channelId', isAdminiSignedIn, getChannel);

router.put('/channel/:channelId', $testBody({
	properties: {
		name: {
			type: 'string',
			minLength: 4
		},
		description: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getChannel, updateChannel);

router.delete('/channel/:channelId', isAdminiSignedIn, getChannel, deleteChannel);