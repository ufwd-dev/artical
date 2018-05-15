'use strict';
import app from 'app';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.menu.addGroup('ufwdArticle.menu.article', [
	{
		label: 'ufwdArticle.article.articles',
		path: '/ufwd/article/list'
	},
	{
		label: 'ufwdArticle.article.category',
		path: '/ufwd/article/category'
	},
	{
		label: 'ufwdArticle.article.writer',
		path: '/ufwd/article/writer'
	},
	{
		label: 'ufwdArticle.article.channel',
		path: '/ufwd/article/channel'
	}
]);

import Home from 'app/component/Home.vue';

import Article from './component/article/Article.vue';
import Detail from './component/article/Detail.vue';
import Category from './component/category/Category.vue';
import CategoryDetail from './component/category/Detail.vue';
import Writer from './component/Writer.vue';
import Channel from './component/channel/Channel.vue';
import ChannelDetail from './component/channel/Detail.vue';

app.router.addRoutes([
	{
		path: '/ufwd/article',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'list',
				component: Article
			},
			{
				path: 'article/:id/detail',
				component: Detail
			},
			{
				path: 'category',
				component: Category
			},
			{
				path: 'category/:id/detail',
				component: CategoryDetail
			},
			{
				path: 'writer',
				component: Writer
			},
			{
				path: 'channel',
				component: Channel
			},
			{
				path: 'channel/:id/detail',
				component: ChannelDetail
			}
		]
	}
]);

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'zh';