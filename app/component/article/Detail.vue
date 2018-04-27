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
			<li class="breadcrumb-item active">Detail : {{articleId}}</li>
		</ol>
	</nav>

	<h3>Article detail</h3>
	<hr>

	<div class="row">
		<div class="col-8">

		</div>
		<div class="col-4">
			<div class="card">
				<div class="card-header">
					Info
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="">Examine</label>
						<div class="form-check">
							<input type="checkbox" class="form-check-input">
							<label for="" class="form-check-label">Yes</label>
						</div>
						<div class="form-check">
							<input type="checkbox" class="form-check-input">
							<label for="" class="form-check-label">No</label>
						</div>
					</div>
					<div class="form-group">
						<label for="">Category</label>
						<input type="text" class="form-control">
					</div>
					<div class="form-group">
						<label for="">Comment</label>
						<input type="text" class="form-control">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'article-detail',
	computed: {
		articleId() {
			return this.$route.params.id;
		}
	}
}
</script>
