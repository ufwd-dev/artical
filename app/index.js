'use strict';
import app from 'app';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.menu.addGroup('ufwdArticle.menu.article', [
	{
		label: 'ufwdArticle.article.articles',
		path: '/ufwd/article/article/list'
	},
	// {
	// 	label: 'ufwdArticle.article.category',
	// 	path: '/ufwd/article/category'
	// },
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
// import Category from './component/category/Category.vue';
// import CategoryDetail from './component/category/Detail.vue';
import Writer from './component/writer/Writer.vue';
// import AddWriter from  './component/writer/New.vue';
import Channel from './component/channel/Channel.vue';

app.router.addRoutes([
	{
		path: '/ufwd/article',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'article/list',
				component: Article
			},
			{
				path: 'article/:id',
				component: Detail
			},
			// {
			// 	path: 'category',
			// 	component: Category
			// },
			// {
			// 	path: 'category/:id/detail',
			// 	component: CategoryDetail
			// },
			{
				path: 'writer',
				component: Writer
			},
			// {
			// 	path: 'add-writer',
			// 	component: AddWriter
			// },
			{
				path: 'channel',
				component: Channel
			},
		]
	}
]);

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'zh';

app.store.subscribe(({type, payload}) => {
	if (type === 'system/setRestrict') {
		if (payload) {
			app.store.commit('menu/setGroupVisibility', {
				name: 'ufwdArticle.menu.article',
				show: false
			});
		}
	}
});