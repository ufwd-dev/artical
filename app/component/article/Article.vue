<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Article</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-8">
			<div class="input-group">
				<input type="text" class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
			</div>

			<h3 class="mt-4">The articles of {{categoryName}}</h3>
			<hr>
			
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Title</th>
						<th>Keywords</th>
						<th>Examine status</th>
						<th>Created time</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(article, index) in articleList"
						:key="index"
						@click="getArticleById(article.articalId)">
						<td>{{article.title}}</td>
						<td>{{article.keyword}}</td>
						<td>{{article.examine}}</td>
						<td>{{article.created_at}}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="col-4">
			<div class="list-group">
				<div class="list-group-item disabled">Category
					<router-link tag="a"
						to="/ufwd/article/category"
						class="float-right">Manage</router-link>
				</div>
				<a @click="categoryName = 'All'"
					class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">All<span
						class="badge badge-primary">{{articleNumberOfCategory}}</span>
				</a>
				<a @click="selectCategory(index)"
					v-for="(category, index) in categoryList"
					:key="index"
					class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">{{category.name}}<span
						class="badge badge-primary">{{articleNumberOfCategory}}</span>
				</a>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

const SERVICE_URL = '/api/ufwd/service';

export default {
	name: 'ufwd-article',
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
			articleNumberOfCategory: 0
		}
	},
	methods: {
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
			return axios.get(`${SERVICE_URL}/artical`)
				.then(res => {
					this.articleList = res.data.data;
					this.articleNumberOfCategory = this.articleList.length;
				})
		}
	},
	mounted() {
		this.getAllArticleList();
	}
}
</script>
