'use strict';

const markdownIt = require('markdown-it');
const axios = require('axios');
const sharp = require('sharp');

module.exports = function* getThumbnail(content) {
	const tokenList = markdownIt().parse(content);
	let index;

	const imageContainer = tokenList.find(token => {

		if (token.type === 'inline' && token.children !== null) {

			index = token.children.findIndex(element => {

				return element.type ==='image';
			});

			if (index !== -1) {
				return true;
			}
		} else {
			return false;
		}
	});
	
	if (imageContainer) {

		const url = imageContainer.children[index].attrs[0][1];
		const imageBuffer = yield axios.get(url, {
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