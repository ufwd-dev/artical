'use strict';

const {
	isAccountSignedIn,
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
	deleteCategory
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