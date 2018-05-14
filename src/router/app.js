'use strict';

const {
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
	deleteOwnSubscribe,
	getChannelList,
	getChannel,
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
}), getAccountArticleList);

router.get('/article/:articleId', getAccountArticle);

router.get('/article/:articleId/content', getArticleContent);

router.get('/category/:categoryId/article', getAccountClassification);

router.post('/article/:articleId/favorite', getAccountArticle, createFavorite);

router.delete('/account/article/:articleId/favorite', getAccountArticle, deleteFavorite);

router.post('/article/:articleId/like', getAccountArticle, createLike);

router.delete('/account/article/:articleId/like', getAccountArticle, deleteLike);

router.post('/account/channel/:channelId', createOwnSubscribe);

router.get('/account/channel', getOwnSubscribeList);

router.get('/channel/:channelId', getChannel);

router.get('/channel', getChannelList);

router.delete('/channel/:channelId', getOwnSubscribe, deleteOwnSubscribe);