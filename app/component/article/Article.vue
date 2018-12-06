<template>

<div>
	<b-breadcrumb :items="[
		{ text: $t('ufwd.home'), href: '#/'},
		{ text: '文章列表', active: true }
	]"/>

	<b-row>
		<b-col cols="auto">
			<b-form-select
				v-model="selectedCategoryId"
				:options="categoryOptions">
				<template slot="first">
					<option :value="null">全部</option>
				</template>
			</b-form-select>
		</b-col>
		<b-col>
            <a style="display: inline-block;line-height:33px;" :href="articleListCSV" download="download.csv"> 下载文章列表信息</a>
		</b-col>
		<b-col cols="auto">
			<b-pagination
				:limit="7"
				align="right"
				v-model="currentPage"
				:total-rows="totalRows"
				:per-page="10" />
		</b-col>
	</b-row>

	<b-table
		:fields="[
			{ key: 'examine', label: '审核?' },
			{ key: 'title', label: '标题' },
			{ key: 'created_at', label: '创建时间' },
		]"
		@filtered="updateTotalRows"
		:filter="filter"
		:current-page="currentPage"
		:per-page="10"
		:items="articleList">
		
		<template slot="examine" slot-scope="data">
			{{data.item.examine?'通过':'未通过'}}
		</template>

		<template slot="title" slot-scope="data">
			<a :href="`#/ufwd/article/article/${data.item.id}`">{{data.item.title}}</a>
		</template>

		<template slot="created_at" slot-scope="data">
			{{data.item.created_at|isoDateTime}}
		</template>
	</b-table>
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

const SERVICE_URL = '/api/ufwd/service';
const articleUrlPrefix = 'http://ufwd.tjxqtzb.gov.cn/#/ufwd/article/article/';

export default {
	name: 'ufwd-article',
	data() {
		return {
			totalRows: 0,
			selectedCategoryId: null,
			currentPage: 1,
			articleList: [],
			categoryList: [],
		}
	},
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
		}
	},
	computed: {
		categoryOptions() {
			return this.categoryList.map(category => {
				return {
					text: category.name,
					value: category.id
				};
			});
		},
		articleListCSV() {
			let resultStr = '标题,链接,分类,状态,创建时间';

			const categoryList = {};

			this.categoryList.map(item => {
				categoryList[item.id] = item.name
			})

			const resultList = this.articleList.map(item => {
				return {
					title: item.title,
					href: `${articleUrlPrefix}${item.id}`,
					category: item.category.map(item => categoryList[item]).join(' '),
					status: item.examine ? '通过' : '未通过',
					createdAt: `${dateFormat(item.created_at, 'yyyy-mm-dd HH:MM:ss')}`
				}
			}).forEach(ele => {
				resultStr = `${resultStr}\n${ele.title},${ele.href},${ele.category},${ele.status},${ele.createdAt}`;
			});

			return `data:text/csv;charset=utf-8,\ufeff${encodeURIComponent(resultStr)}`;
		}
	},
	methods: {
		updateTotalRows(filteredItems) {
			this.totalRows = filteredItems.length;
		},
		filter(item) {
			if (this.selectedCategoryId === null) {
				return true;
			}
			
			return item.category.includes(this.selectedCategoryId);
		},
		getCategoryList() {
			return axios.get(`${SERVICE_URL}/category`)
				.then(res => this.categoryList = res.data.data);
		},
		getArticleWithCategory(id) {
			return axios.get(`${SERVICE_URL}/category/${id}/article`).then(res => {					
				this.articleList = res.data.data;
			});
		},
		getAllArticleList() {
			return axios.get(`${SERVICE_URL}/article`)
				.then(res => this.articleList = res.data.data);
		},
		getArticleById(id) {
			this.$router.push(`article/${id}/detail`);
		}
	},
	mounted() {
		this.getAllArticleList();
		this.getCategoryList();
	}
}
</script>
