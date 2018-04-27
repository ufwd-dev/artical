<template>

<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/ufwd/article/category">Category</router-link>
			</li>
			<li class="breadcrumb-item active">Add category</li>
		</ol>
	</nav>

	<h3>New category</h3>
	<hr>

	<div class="form-group">
		<label for="">Name</label>
		<input type="text"
			id=""
			class="form-control"
			v-model="name">
	</div>
	<div class="form-group">
		<label for="">Description</label>
		<textarea type="text"
			id=""
			class="form-control"
			v-model="description"></textarea>
	</div>

	<button class="btn btn-primary"
		type="button"
		@click="createCategory()">Create</button>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'add-category',
	data() {
		return {
			name: '',
			description: ''
		}
	},
	methods: {
		createCategory() {
			return axios.post(`/api/ufwd/service/category`, {
				name: this.name,
				description: this.description
			}).then(() => {
				this.$router.go(-1);
			})
		}
	}
}
</script>
