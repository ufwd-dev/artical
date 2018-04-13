'use strict';

const {
	isAccountSignedIn,
	$testQuery
} = require('express-handler-loader')('all');

const {
	getAccountArticleList,
	getAccountArticle,
	getArticleContent,
	createFavorite,
	deleteFavorite,
	createLike,
	deleteLike,
	getAccountClassification,
	createOwnSubscribe,
	getOwnSubscribeList,
	getOwnSubscribe,
	deleteOwnSubscribe
} = require('express-handler-loader')('ufwd_article');

const router = module.exports = require('express').Router();

router.get('/article', $testQuery({
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
		},
		channel: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAccountSignedIn, getAccountArticleList);

router.get('/article/:articleId', isAccountSignedIn, getAccountArticle);

router.get('/article/:articleId/content', isAccountSignedIn, getArticleContent);

router.get('/category/:categoryId/article', isAccountSignedIn, getAccountClassification);

router.post('/article/:articleId/favorite', isAccountSignedIn, getAccountArticle, createFavorite);

router.delete('/account/article/:articleId/favorite', isAccountSignedIn, getAccountArticle, deleteFavorite);

router.post('/article/:articleId/like', isAccountSignedIn, getAccountArticle, createLike);

router.delete('/account/article/:articleId/like', isAccountSignedIn, getAccountArticle, deleteLike);

router.post('/channel/:channelId', isAccountSignedIn, createOwnSubscribe);

router.get('/channel', isAccountSignedIn, getOwnSubscribeList);

router.get('/channel/:channelId', isAccountSignedIn, getOwnSubscribe);

router.delete('/channel/:channelId', isAccountSignedIn, getOwnSubscribe, deleteOwnSubscribe);