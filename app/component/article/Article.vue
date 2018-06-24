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
		<b-col></b-col>
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
			<a :href="`#/ufwd/article/artical/${data.item.id}`">{{data.item.title}}</a>
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
