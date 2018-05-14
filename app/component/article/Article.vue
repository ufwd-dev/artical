<template>

<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item active">文章列表</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-sm-9">
			<h3 class="">{{categoryName}}</h3>
			<hr>

			<data-tables
				:data="articleList"
				:search-def="searchDef"
				:pagination-def="paginationDef">
				<el-table-column
					label="审核"
					prop="status"
					width="140"
					align="center"
					:filters="[
						{text: '已通过', value: '已通过'},
						{text: '待审核', value: '待审核'}]"
					:filter-method="filterTag"
					filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag
							:type="scope.row.examine === '已通过' ? 'success' : 'danger'"
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
					:width="column.width"
					:minWidth="column.minWidth">
				</el-table-column>
				<el-table-column
					label="查看"
					prop="view"
					align="center"
					width="80">
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

		<div class="col-sm-3">
			<el-card class="box-card" shadow="never">
				<div slot="header" class="clearfix">
					<span>文章分类</span>
					<router-link tag="button"
						class="pull-right el-button el-button--text"
						style="padding: 3px 0;"
						to="/ufwd/article/category">管理</router-link>
				</div>

				<div class="list-group list-group-flush"
					style="margin: -20px;">
					<a class="list-group-item list-group-item-action"
						style="cursor: pointer;"
						@click="getAllArticleList()">全部</a>
					<a class="list-group-item list-group-item-action"
						style="cursor: pointer;"
						v-for="(category, index) in categoryList"
						:key="index"
						@click="getArticleWithCategory(category.id, category.name)">{{category.name}}</a>
				</div>
			</el-card>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import DataTables from 'vue-data-tables';
import dateFormat from 'dateformat';

const SERVICE_URL = '/api/ufwd/service';

export default {
	name: 'ufwd-article',
	components: { DataTables },
	data() {
		return {
			articleList: [],
			categoryList: [],
			categoryName: '全部',
			articleColumns: [
				{
					label: '标题',
					prop: 'title',
					minWidth: '200'
				},
				{
					label: '创建时间',
					prop: 'created_at',
					sortable: true,
					width: '180'
				}
			],
			searchDef: {
				props: 'title',
				colProps: {
					span: 10
				},
				inputProps: {
					placeholder: '文章标题'
				}
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20]
			}
		}
	},
	methods: {
		filterTag(value, row) {
			return row.examine === value;
		},
		getCategoryList() {
			return axios.get(`${SERVICE_URL}/category`)
				.then(res => {
					this.categoryList = res.data.data;
				})
		},
		getArticleWithCategory(id, name) {
			this.categoryName = name;

			return axios.get(`${SERVICE_URL}/category/${id}/article`)
				.then(res => {					
					const categoryArticleData = res.data.data;
					const articleData = [];

					categoryArticleData.forEach(category => {

						articleData.push(category.ufwdArticle);

						articleData.forEach(article => {
							article.examine = article.examine ? '已通过' : '待审核';
							article.created_at = dateFormat(article.created_at, 'yyyy/mm/dd HH:MM');
						});

					});

					this.articleList = articleData;
				})
		},
		getAllArticleList() {
			return axios.get(`${SERVICE_URL}/article`)
				.then(res => {
					let articleData = res.data.data;

					articleData.forEach(article => {
						article.examine = article.examine ? '已通过' : '待审核';
						article.created_at = dateFormat(article.created_at, 'yyyy/mm/dd HH:MM');
					});

					this.articleList = articleData;
				})
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
