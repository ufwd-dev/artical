'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getImage(req, res, next) {
	const {hash, regularName} = req.params;
	const {imageRepository} = require('./repository');

	res.set('Content-Type', 'image/png');

	const {data} = yield imageRepository.read(hash, {
		regularName
	});
	
	if (!data) {
		throwError('The image is not existed.', 404);
	}

	res.end(data);
};