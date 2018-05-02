'use strict';

const {
	signIn
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
	getArticleListOfCategory,
	getWriterByToken,
	getCategoryList,
	getClassificationList
} = require('express-handler-loader')('ufwd_article');

const router = module.exports = require('express').Router();

router.use(getWriterByToken);

router.post('/account/session', signIn, writerSignin);

router.delete('/account/session', writerSignout);

router.post('/article', isWriterSignedIn, createArticle);

router.get('/article', isWriterSignedIn, getOwnArticleList);

router.get('/category', isWriterSignedIn, getCategoryList);

router.get('/article/:articleId', isWriterSignedIn, getOwnArticle);

router.put('/article/:articleId', isWriterSignedIn, isPublished, updateOwnArticle);

router.delete('/article/:articleId', isWriterSignedIn, isPublished, deleteOwnArticle);

router.post('/article/:articleId/category/:categoryId', isWriterSignedIn, createClassification);

router.get('/article/:articleId/category', isWriterSignedIn, getClassificationList);

router.delete('/article/:articleId/category/:categoryId', isWriterSignedIn, deletelassification);

router.get('/category/:categoryId/article', isWriterSignedIn, getArticleListOfCategory);