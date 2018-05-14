<template>

<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item active">文章分类</li>
		</ol>
	</nav>

	<h3>分类列表</h3>
	<hr>

	<div class="row">
		<div class="col-sm-9">
			<data-tables
				:data="categoryList"
				:search-def="searchDef"
				:pagination-def="paginationDef"
				style="margin-top: -20px;">
				<el-table-column
					v-for="(column, index) in categoryColumns"
					:key="index"
					align="center"
					:label="column.label"
					:prop="column.prop"
					:sortable="column.sortable"
					:width="column.width"
					:minWidth="column.minWidth">
				</el-table-column>
				<el-table-column
					label="操作"
					prop="view"
					align="center"
					width="140">
					<template slot-scope="scope">
						<el-button
							type="text"
							@click="getCategoryById(scope.row.id)">查看</el-button>
					</template>
				</el-table-column>
			</data-tables>
		</div>

		<div class="col-sm-3">
			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>添加新分类</span>
				</div>
				<el-form :model="categoryForm">
					<el-form-item label="名称" required>
						<el-input v-model="categoryForm.name"></el-input>
					</el-form-item>
					<el-form-item label="描述" required>
						<el-input
							type="textarea"
							rows="3"
							v-model="categoryForm.description"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
							@click="createCategory()">创建</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import DataTables from 'vue-data-tables';
import dateFormat from 'dateformat';

const CATEGORY_URL = '/api/ufwd/service/category';

export default {
	name: 'category-manage',
	components: { DataTables },
	data() {
		return {
			categoryList: [],
			categoryColumns: [
				{
					label: '分类名称',
					prop: 'name',
					width: '180'
				},
				{
					label: '分类描述',
					prop: 'description',
					minWidth: '200'
				},
				{
					label: '创建时间',
					prop: 'created_at',
					width: '180',
					sortable: 'custom'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20]
			},
			categoryForm: {}
		}
	},
	methods: {
		getCategoryList() {
			return axios.get(CATEGORY_URL)
				.then(res => {
					let categoryData = res.data.data;

					categoryData.forEach(category => {
						category.created_at = dateFormat(category.created_at, 'yyyy/mm/dd HH:MM');
					});

					this.categoryList = categoryData;
			})
		},
		createCategory() {
			return axios.post(CATEGORY_URL, this.categoryForm)
				.then(() => {
					this.$notify({
						title: '成功',
						message: '文章分类创建成功！',
						type: 'success'
					});

					this.getCategoryList();
				})
				.catch(err => {
					this.$notify.error({
						title: '错误',
						message: '文章分类创建失败。'
					})
				})
		},
		getCategoryById(id) {
			return this.$router.push(`category/${id}/detail`);
		}
	},
	mounted() {
		this.getCategoryList();
	}
}
</script>
