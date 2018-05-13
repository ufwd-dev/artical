<template>

<div>
	<el-breadcrumb class="mb-4">
		<el-breadcrumb-item to="/">Home</el-breadcrumb-item>
		<el-breadcrumb-item>Article</el-breadcrumb-item>
	</el-breadcrumb>

	<div class="row">
		<div class="col-sm-8">
			<h3 class="">The articles of {{categoryName}}</h3>
			<hr>

			<data-tables
				:data="articleList"
				:search-def="searchDef"
				:pagination-def="paginationDef"
				:col-not-row-click="disabledClickLabelList">
				<el-table-column
					label="Examine status"
					prop="status"
					width="140"
					align="center"
					:filters="[
						{text: 'Adopt', value: 'Adopt'},
						{text: 'Fail', value: 'Fail'}]"
					:filter-method="filterTag"
					filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag
							:type="scope.row.examine === 'Adopt' ? 'success' : 'danger'"
							close-transion>{{scope.row.examine}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column
					v-for="(column, index) in articleColumns"
					:key="index"
					align="center"
					:label="column.label"
					:prop="column.prop"
					:sortable="column.sortable"
					:width="column.width">
				</el-table-column>
				<el-table-column
					label="View"
					prop="view"
					align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							@click.native.prevent="getArticleById(scope.row.id)"><i
								class="fa fa-file-text-o"></i>
						</el-button>
					</template>
				</el-table-column>
			</data-tables>
		</div>

		<div class="col-sm-4">
			<el-card class="box-card" shadow="never">
				<div slot="header" class="clearfix">
					<span>Category</span>
					<router-link tag="button"
						class="pull-right el-button"
						style="padding: 3px 0;"
						to="/ufwd/article/category">Manage</router-link>
				</div>
				<ul class="list-group list-group-flush">
					<li class="list-group-item list-group-item-action clearfix">
						<a href="">All</a>
						<span class="badge badge-primary pull-right">0</span>
					</li>
					<li class="list-group-item"
						v-for="(category, index) in categoryList"
						:key="index">
						<a href="">{{category.name}}</a>
						<span class="badge badge-primary pull-right">{{articleNumberOfCategory}}</span>
					</li>
					<li class="list-group-item">All</li>
				</ul>
			</el-card>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import DataTables from 'vue-data-tables';

const SERVICE_URL = '/api/ufwd/service';

export default {
	name: 'ufwd-article',
	components: { DataTables },
	data() {
		return {
			categoryList: [
				// {
				// 	name: 'One',
				// 	number: '8'
				// },
				// {
				// 	name: 'Two',
				// 	number: '5'
				// }
			],
			categoryName: 'All',
			articleList: [],
			articleColumns: [
				{
					label: 'Title',
					prop: 'title',
					sortable: false,
					width: ''
				},
				// {
				// 	label: 'Examine status',
				// 	field: 'examine',
				// 	sortable: false,
				// 	width: '150'
				// },
				{
					label: 'Created time',
					prop: 'created_at',
					sortable: true,
					width: '250'
				}
			],
			disabledClickLabelList: [
				'Examine status', 'Created time', 'editor'
			],
			searchDef: {
				props: 'title',
				colProps: {
					span: 10
				},
				inputProps: {
					placeholder: 'Title name'
				}
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20]
			},
			articleNumberOfCategory: 0
		}
	},
	methods: {
		filterTag(value, row) {
			return row.examine === value;
		},
		selectCategory(index) {
			this.categoryName = this.categoryList[index].name;
		},
		getCategoryList() {
			return axios.get(`${SERVICE_URL}/category`)
				.then(res => {
					this.categoryList = res.data.data;
				})
		},
		getArticleWithCategory(id) {
			return axios.get(`${SERVICE_URL}/category/${id}/artical`)
				.then(res => {
					this.articleList = res.data.data;
					this.articleNumberOfCategory = this.articleList.length;
				})
		},
		getAllArticleList() {
			return axios.get(`${SERVICE_URL}/article`)
				.then(res => {
					let articleList = res.data.data;

					articleList.forEach(article => {
						article.examine = article.examine ? 'Adopt' : 'Fail';
					});

					this.articleList = articleList;

					this.articleNumberOfCategory = this.articleList.length;
				})
		},
		getArticleById(id) {
			this.$router.push(`article/${id}/detail`);
			console.log(id)
		}
	},
	mounted() {
		this.getAllArticleList();
	}
}
</script>
