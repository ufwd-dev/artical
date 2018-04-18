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
					to="/ufwd/article">Article</router-link>
			</li>
			<li class="breadcrumb-item active">Category</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-8">
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
						<th>Number of article</th>
					</tr>
				</thead>
				<tbody>
					<tr @click="getCategory(index)"
						v-for="(category, index) in categoryList"
						:key="index">
						<td>{{category.name}}</td>
						<td>{{category.number}}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="col-4">
			<div class="card">
				<h5 class="card-header">Edit category</h5>
				<div class="card-body">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">Name</span>
						</div>
						<input type="text" class="form-control" :placeholder="categoryName">
					</div>
					<button class="btn btn-primary mt-3">Modify</button>
					<button class="btn btn-danger mt-3">Remove</button>
				</div>
			</div>

		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'category-manage',
	data() {
		return {
			categoryList: [
				{
					name: 'One',
					number: '8'
				},
				{
					name: 'Two',
					number: '5'
				}
			],
			categoryName: 'category name'
		}
	},
	methods: {
		getCategory(index) {
			this.categoryName = this.categoryList[index].name;
		}
	}
}
</script>
