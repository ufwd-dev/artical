'use strict';
import app from 'app';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.menu.addGroup('ufwd.article', [
	{
		label: 'item.all',
		path: '/ufwd/article/all'
	},
	{
		label: 'item.category',
		path: '/ufwd/article/category'
	}
]);

import Home from 'app/component/Home.vue';

import Article from './component/Article.vue';
import Category from './component/Category.vue';

app.router.addRoutes([
	{
		path: '/ufwd/article',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'all',
				alias: '/',
				component: Article
			},
			{
				path: 'category',
				component: Category
			}
		]
	}
]);

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'en';