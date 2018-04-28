'use strict';
import app from 'app';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.menu.addGroup('article.menu', [
	{
		label: 'article.group.article',
		path: '/ufwd/article/list'
	},
	{
		label: 'article.group.category',
		path: '/ufwd/article/category'
	}
]);

import Home from 'app/component/Home.vue';

import Article from './component/article/Article.vue';
import Detail from './component/article/Detail.vue';
import Category from './component/category/Category.vue';
import AddCategory from './component/category/Create.vue';

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
				path: 'add-category',
				component: AddCategory
			}
		]
	}
]);

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'en';