'use strict';

module.exports = function uploadImage(req, res, next) {
	const content = req.body.data.data;
	const {config} = require('lemonitor-service');
	const domain = config.get('server.domain');
	const port = config.get('server.protocol.http.port');

	const imageBuffer = new Buffer(content);


	const {imageRepository} = require('./repository');

	const entry = imageRepository.push(imageBuffer);
	const hash = entry.meta.hash;

	res.data({
		default: `http://${domain}:${port}/static/ufwd/image/${hash}/regular/common`
	});
	
	next();
};