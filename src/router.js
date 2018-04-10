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

router.get('/api/ufwd/service/artical', $testQuery({
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
}), isAdminiSignedIn, getServiceArticalList);

router.get('/api/ufwd/service/artical/:articalId', isAdminiSignedIn, getServiceArtical);

router.put('/api/ufwd/service/artical/:articalId', $testBody({
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
			pattern: '^(true|false)$'
		},
		like: {
			type: 'string',
			pattern: '^(true|false)$'
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