'use strict';

const appRouter = require('./app');
const serverRouter = require('./server');
const thirdPartyRouter = require('./thirdParty');

const {
	getImage,
	getThumbnail,
} = require('express-handler-loader')('ufwd_article');

const router = module.exports = require('express').Router();

router.use('/api/ufwd/app', appRouter);

router.use('/api/ufwd/service', serverRouter);

router.use('/api/ufwd/service/release', thirdPartyRouter);

router.get('/static/ufwd/image/:hash/regular/:regularName', getImage);

router.get('/static/ufwd/thumbnail/:hash/regular/:regularName', getThumbnail);
