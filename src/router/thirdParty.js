'use strict';

const {
	isAccountUnsignedIn,
	signIn,
	getAccountByToken
} = require('express-handler-loader')('all');

const {
	writerSignin,
	writerSignout,
	isWriterSignedIn,
	createArticle,
	getOwnArticleList,
	getOwnArticle,
	updateOwnArticle,
	deleteOwnArticle,
	isPublished,
	createClassification,
	deletelassification,
	getArticleListOfCategory
} = require('express-handler-loader')('ufwd_article');

const router = module.exports = require('express').Router();

router.post('/account/session', isAccountUnsignedIn, signIn, writerSignin);

router.delete('/account/session', writerSignout);

router.post('/article', getAccountByToken, isWriterSignedIn, createArticle);

router.get('/article', getAccountByToken, isWriterSignedIn, getOwnArticleList);

router.get('/article/:articleId', getAccountByToken, isWriterSignedIn, getOwnArticle);

router.put('/article/:articleId', getAccountByToken, isWriterSignedIn, isPublished, updateOwnArticle);

router.delete('/article/:articleId', getAccountByToken, isWriterSignedIn, isPublished, deleteOwnArticle);

router.post('/article/:articleId/category/:categoryId', getAccountByToken, isWriterSignedIn, createClassification);

router.delete('/article/:articleId/category/:categoryId', getAccountByToken, isWriterSignedIn, deletelassification);

router.get('/category/:categoryId/article', getAccountByToken, isWriterSignedIn, getArticleListOfCategory);