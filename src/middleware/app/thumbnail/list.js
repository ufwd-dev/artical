'use strict';

const Sequelize = require('sequelize');

module.exports = function* getThumbnailUrlList(req, res, next) {

	const {config} = require('lemonitor-service');
	const domain = config.get('server.domain');
	const port = config.get('server.protocol.http.port');
	const Article = res.sequelize.model('ufwdArticle');

	const articleList = yield Article.findAll({
		where: {
			published: true,
			examine: true,
			thumbnail: {
				[Sequelize.Op.ne]: null
			}
		},
		limit: 6,
		attributes: ['thumbnail'],
		order: [['created_at', 'desc']]
	});

	const urlList = [];

	articleList.forEach(article => {
		urlList.push(`http://${domain}:${port}/static/ufwd/image/${article.thumbnail}/regular/common`);
	});

	res.data(urlList);

	next();
};