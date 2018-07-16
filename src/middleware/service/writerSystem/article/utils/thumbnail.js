'use strict';

const jsdom = require('jsdom');
const axios = require('axios');
const sharp = require('sharp');

module.exports = function* getThumbnail(content) {
	const {JSDOM} = jsdom;

	const dom = (new JSDOM(content)).window.document;

	const imageContainer = dom.querySelector('img');
	
	if (imageContainer && imageContainer.src) {

		const imageBuffer = yield axios.get(imageContainer.src, {
			responseType: 'arraybuffer'
		});

		if (!imageBuffer) {
			return null;
		}

		const hash = yield pushThumbnail(imageBuffer.data);

		return hash;
	}

};

function pushThumbnail(imageBuffer) {
	const {thumbnailRepository} = require('../../image/repository');

	return sharp(imageBuffer)
		.resize(720, 540)
		.max()
		.png()
		.toBuffer()
		.then(buffer => {
			const entry = thumbnailRepository.push(buffer);

			return entry.meta.hash;
		}).catch(err => {
			throw new Error(err.message);
		});
}