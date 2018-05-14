'use strict';

const appRouter = require('./app');
const serverRouter = require('./server');
const thirdPartyRouter = require('./thirdParty');

const {
	isAccountSignedIn
} = require('express-handler-loader')('all');

const router = module.exports = require('express').Router();

router.use('/app', appRouter);

router.use('/service', serverRouter);

router.use('/service/release', thirdPartyRouter);
