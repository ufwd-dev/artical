'use strict';

const {
	isAccountSignedIn,
	isAccountUnsignedIn,
	signOut,
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
	writerSignin,
	isWriterSignedIn,
	createArtical,
	getOwnArticalList,
	getOwnArtical,
	updateOwnArtical,
	deleteOwnArtical,
	isPublished,
	createClassification,
	deletelassification,
	getServiceArticalList,
	getServiceArtical,
	updateServiceArtical,
	deleteServiceArtical,
	getServiceClassification,
	getAccountArticalList,
	getAccountArtical,
	getArticalContent,
	createFavorite,
	deleteFavorite,
	createLike,
	deleteLike,
	getAccountClassification
} = require('express-handler-loader')('ufwd_artical');

const router = module.exports = require('express').Router();

router.post('/api/ufwd/service/category', $testBody({
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

router.get('/api/ufwd/service/category', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getCategoryList);

router.get('/api/ufwd/service/category/:categoryId', isAdminiSignedIn, getCategory);

router.put('/api/ufwd/service/category/:categoryId', $testBody({
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

router.delete('/api/ufwd/service/category/:categoryId', isAdminiSignedIn, getCategory, deleteCategory);

router.post('/api/ufwd/writer/account/session', isAccountUnsignedIn, writerSignin);

router.delete('/api/ufwd/writer/account/session', signOut);

router.post('/api/ufwd/writer/artical', $testBody({
	properties: {
		content: {
			type: 'string'
		},
		abstract: {
			type: 'string'
		},
		thumb: {
			type: 'string'
		},
		published: {
			type: 'number',
			minimum: 0,
			maximum: 1,
			multipleOf: 1
		}
	},
	required: ['content', 'published'],
	additionalProperties: false
}), isWriterSignedIn, createArtical);

router.get('/api/ufwd/writer/artical', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		published: {
			type: 'string',
			pattern: '(^0$|^1$)'
		},
		examine: {
			type: 'string',
			pattern: '(^0$|^1$)'
		}
	},
	additionalProperties: false
}), isWriterSignedIn, getOwnArticalList);

router.get('/api/ufwd/writer/artical/:articalId', isWriterSignedIn, getOwnArtical);

router.put('/api/ufwd/writer/artical/:articalId', $testBody({
	properties: {
		content: {
			type: 'string'
		},
		abstract: {
			type: 'string'
		},
		thumb: {
			type: 'string'
		},
		published: {
			type: 'number',
			minimum: 0,
			maximum: 1,
			multipleOf: 1
		}
	},
	additionalProperties: false
}), isWriterSignedIn, isPublished, updateOwnArtical);

router.delete('/api/ufwd/writer/artical/:articalId', isWriterSignedIn, isPublished, deleteOwnArtical);

router.post('/api/ufwd/writer/artical/:articalId/category/:categoryId', isWriterSignedIn, createClassification);

router.delete('/api/ufwd/writer/artical/:articalId/category/:categoryId', isWriterSignedIn, deletelassification);


router.get('/api/ufwd/service/artical', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		examine: {
			type: 'string',
			pattern: '(^0$|^1$)'
		},
		favorite: {
			type: 'string',
			pattern: '(^0$|^1$)'
		},
		like: {
			type: 'string',
			pattern: '(^0$|^1$)'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getServiceArticalList);

router.get('/api/ufwd/service/artical/:articalId', isWriterSignedIn, getServiceArtical);

router.put('/api/ufwd/service/artical/:articalId', $testBody({
	properties: {
		comments: {
			type: 'string'
		},
		examine: {
			type: 'number',
			minimum: 0,
			maximum: 1,
			multipleOf: 1
		}
	},
	required: ['examine', 'comments'],
	additionalProperties: false
}), isAdminiSignedIn, getServiceArtical, updateServiceArtical);

router.delete('/api/ufwd/service/artical/:articalId', isAdminiSignedIn, getServiceArtical, deleteServiceArtical);

router.get('/api/ufwd/service/category/:categoryId/artical', isAdminiSignedIn, getServiceClassification);

router.get('/api/ufwd/app/artical', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		favorite: {
			type: 'string',
			pattern: '(^0$|^1$)'
		},
		like: {
			type: 'string',
			pattern: '(^0$|^1$)'
		}
	},
	additionalProperties: false
}), isAccountSignedIn, getAccountArticalList);

router.get('/api/ufwd/app/artical/:articalId', isAccountSignedIn, getAccountArtical);

router.get('/api/ufwd/app/artical/:articalId/content', isAccountSignedIn, getArticalContent);

router.get('/api/ufwd/app/category/:categoryId/artical', isAccountSignedIn, getAccountClassification);

router.post('/api/ufwd/app/artical/:articalId/favorite', isAccountSignedIn, getAccountArtical, createFavorite);

router.delete('/api/ufwd/app/account/artical/:articalId/favorite', isAccountSignedIn, getAccountArtical, deleteFavorite);

router.post('/api/ufwd/app/artical/:articalId/like', isAccountSignedIn, getAccountArtical, createLike);

router.delete('/api/ufwd/app/account/artical/:articalId/like', isAccountSignedIn, getAccountArtical, deleteLike);