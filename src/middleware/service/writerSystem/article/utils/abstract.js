'use strict';

const jsdom = require('jsdom');

module.exports = function getAbstract(content) {
	const {JSDOM} = jsdom;

	const dom = (new JSDOM(content)).window.document;

	let paragraphContent;

	if (dom.querySelector('p')) {
		paragraphContent = dom.querySelector('p').textContent;
	}
	
	if (paragraphContent) {

		return paragraphContent; 
	}
};