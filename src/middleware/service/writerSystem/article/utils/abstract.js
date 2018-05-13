'use strict';

const markdownIt = require('markdown-it');

module.exports = function getAbstract(content) {
	const tokenList = markdownIt().parse(content);

	const paragraphIndex = tokenList.findIndex((token, index) => {

		return token.type === 'inline'
				&& token.children !== null
				&& token.children.length === 1
				&& token.children[0].type === 'text'
				&& tokenList[index - 1].type === 'paragraph_open';
	});
	
	if (paragraphIndex !== -1) {

		return tokenList[paragraphIndex].content;
	}
};