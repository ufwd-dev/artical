'use strict';

const jsdom = require('jsdom');

module.exports = function getAbstract(content) {
	const {JSDOM} = jsdom;

	const dom = (new JSDOM(content)).window.document;

	const paragraphContent = dom.querySelector('p').textContent;
	
	if (paragraphContent) {

		return paragraphContent;
	}
};