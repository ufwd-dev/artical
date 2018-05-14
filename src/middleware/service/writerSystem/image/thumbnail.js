'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getThumbnail(req, res, next) {
	const {hash, regularName} = req.params;
	const {thumbnailRepository} = require('./repository');
	
	if (!(regularName in thumbnailRepository.regularList)) {
		throwError('The regular is not existed.', 403);
	}

	if (hash === 'null') {
		throwError('The hash is not existed.', 403);
	}

	res.set('Content-Type', 'image/png');

	const {data} = yield thumbnailRepository.read(hash, {
		regularName
	});
	
	if (!data) {
		throwError('The thumbnail is not existed.', 404);
	}


	res.send(data);
};