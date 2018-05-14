<template>

<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/ufwd/article/category">文章分类</router-link>
			</li>
			<li class="breadcrumb-item active">{{category.name}}</li>
		</ol>
	</nav>

	<h3>修改文章分类</h3>
	<hr>

	<el-form :model="category">
		<el-form-item label="名称">
			<el-input v-model="category.name"></el-input>
		</el-form-item>

		<el-form-item label="描述">
			<el-input
				type="textarea"
				rows="3"
				v-model="category.description"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary"
				@click="updateCategory()">更新</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
import axios from 'axios';

const CATEGORY_URL = '/api/ufwd/service/category';

export default {
	name: 'category-detail',
	computed: {
		categoryId() {
			return this.$route.params.id;
		}
	},
	data() {
		return {
			category: {}
		}
	},
	methods: {
		getCategory() {
			return axios.get(`${CATEGORY_URL}/${this.categoryId}`)
				.then(res => {
					this.category = res.data.data;
				});
		},
		updateCategory() {
			return axios.put(`${CATEGORY_URL}/${this.categoryId}`, {
				name: this.category.name,
				description: this.category.description
			}).then(() => {
					this.$notify({
						title: '成功',
						message: '文章分类修改成功！',
						type: 'success'
					});

					this.$router.go(-1);
				})
				.catch(err => {
					this.$notify.error({
						title: '失败',
						message: '文章分类修改失败。'
					})
				})
		}
	},
	mounted() {
		this.getCategory();
	}
}
</script>
