<template>

<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Category</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-1">
			<router-link tag="button"
				to="/ufwd/article/add-category"
				class="btn btn-primary"
				>+ New</router-link>
			
		</div>
		<div class="col-7">
            <div class="input-group mb-3">
				<input type="text"
					class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
            </div>

			
        </div>
	</div>

	<h3>All category</h3>
	<hr>

	<div class="row">
		<div class="col-8">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Number of article</th>
					</tr>
				</thead>
				<tbody>
					<tr @click="getSelectedCategory(index)"
						v-for="(category, index) in categoryList"
						:key="index">
						<td>{{category.name}}</td>
						<td>{{category.description}}</td>
						<td>{{category.ariticleNumber}}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="col-4">
			<div class="card">
				<h5 class="card-header">Edit category</h5>
				<div class="card-body">
					<div class="form-group">
						<label for="">Name</label>
						<input type="text"
							class="form-control"
							v-model="categoryInfo.name">
					</div>
					<div class="form-group">
						<label for="">Description</label>
						<textarea type="text"
							class="form-control"
							v-model="categoryInfo.description"></textarea>
					</div>
					<button class="btn btn-primary mt-3"
						@click="modifyCategory()">Modify</button>
					<button class="btn btn-danger mt-3">Remove</button>
				</div>
			</div>

		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'category-manage',
	data() {
		return {
			categoryList: [],
			articleNumberOfCategory: 0,
			categoryInfo: {
				name: '',
				description: '',
				id: ''
			}
		}
	},
	methods: {
		getCategoryList() {
			return axios.get(`/api/ufwd/service/category`)
			.then(res => {
				this.categoryList = res.data.data;
				this.getSelectedCategory(0);
			}).then(() => {
				this.categoryList.forEach(category => {
					return axios.get(`/api/ufwd/service/category/${category.id}/artical`)
						.then(res => {
							category.ariticleNumber = res.data.data.length;
						})
					
				});
			})
		},
		getSelectedCategory(index) {
			this.categoryInfo = {
				name: this.categoryList[index].name,
				description: this.categoryList[index].description,
				id: this.categoryList[index].id
			}
		},
		modifyCategory() {
			return axios.put(`/api/ufwd/service/category/${this.categoryInfo.id}`, {
				name: this.categoryInfo.name,
				description: this.categoryInfo.description
			}).then(this.getCategoryList())
		}
	},
	mounted() {
		this.getCategoryList();
	}
}
</script>
