'use strict';

module.exports = function uploadImage(req, res, next) {
	const content = req.body.data.data;

	const imageBuffer = new Buffer(content);


	const {imageRepository} = require('./repository');

	const entry = imageRepository.push(imageBuffer);
	const hash = entry.meta.hash;

	res.data({
		hash
	});
	
	next();
};