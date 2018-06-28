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
	getThumbnailUrlList,
	getCategoryList,
	getArticleListBySymbol,
	getArticleFavorite,
	getArticleLike,
	getCategoryConfig
} = require('express-handler-loader')('ufwd_article');

const router = module.exports = require('express').Router();

router.get('/thumbnail', getThumbnailUrlList);

router.get('/noop', (req, res, next) => {
	res.data({
		account: req.session.accountId
	});

	next();
});

router.get('/category', $testQuery({
	properties: {
		symbol: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getCategoryList);

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
		},
		offset: {
			type: 'string',
			pattern: '^([0-9]{1,})$'
		},
		limit: {
			type: 'string',
			pattern: '^([0-9]{1,})$'
		}
	},
	additionalProperties: false
}), getAccountArticleList);

router.get('/article/:articleId', getAccountArticle);

router.get('/article/:articleId/content', getArticleContent);

router.get('/category/:categoryId/article',  $testQuery({
	properties: {
		offset: {
			type: 'string',
			pattern: '^([0-9]{1,})$'
		},
		limit: {
			type: 'string',
			pattern: '^([0-9]{1,})$'
		}
	},
	additionalProperties: false
}), getAccountClassification);

router.get('/symbol/article', $testQuery({
	properties: {
		value: {
			type: 'string'
		},
		highLevel: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getArticleListBySymbol);

router.post('/article/:articleId/favorite', getAccountArticle, createFavorite);

router.get('/article/:articleId/favorite', getAccountArticle, getArticleFavorite);

router.delete('/account/article/:articleId/favorite', getAccountArticle, deleteFavorite);

router.post('/article/:articleId/like', getAccountArticle, createLike);

router.get('/article/:articleId/like', getAccountArticle, getArticleLike);

router.delete('/account/article/:articleId/like', getAccountArticle, deleteLike);

router.post('/account/channel/:channelId', createOwnSubscribe);

router.get('/account/channel', getOwnSubscribeList);

router.get('/channel/:channelId', getChannel);

router.get('/channel', getChannelList);

router.delete('/account/channel/:channelId', getOwnSubscribe, deleteOwnSubscribe);

router.get('/category/levelTwo', $testQuery({
	properties: {
		item: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getCategoryConfig);