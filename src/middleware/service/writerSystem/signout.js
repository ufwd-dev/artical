'use strict';

module.exports = function writerSignout(req, res, next) {
	delete req.session.accountId;
	delete req.session.writer;
	delete req.session.channel;

	next(); 
};