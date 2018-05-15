'use strict';
const { bootstrap } = require('lemonitor-service');

require('./');

bootstrap(options => {
	options.forceSync = false;
});

module.exports = require('lemonitor-application/webpack.dev');